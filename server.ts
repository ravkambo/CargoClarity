import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET || 'fallback-secret';

app.use(express.json());
app.use(cors());

// --- Database Initialization ---
const db = new Database(process.env.DATABASE_PATH || 'database.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )
`);

// --- Types ---
interface User {
  id: number;
  username: string;
  role: string;
}

interface AuthRequest extends Request {
  user?: User;
}

// --- Middleware ---

// JWT Verification Middleware
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user as User;
    next();
  });
};

// RBAC Middleware
const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
    }
    next();
  };
};

// --- Routes ---

// Register
app.post('/api/auth/register', async (req: Request, res: Response) => {
  const { username, password, role } = req.body;
  
  // Validation (basic)
  if (!username || !password) return res.status(400).json({ message: 'Missing username or password' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const userRole = role === 'admin' ? 'admin' : 'user';

  try {
    const insert = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');
    const result = insert.run(username, hashedPassword, userRole);
    res.status(201).json({ id: result.lastInsertRowid, username, role: userRole });
  } catch (err: any) {
    if (err.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      res.status(500).json({ message: 'Error creating user' });
    }
  }
});

// Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  const user: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secret,
    { expiresIn: '24h' }
  );

  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

// Protected Profile Route (any logged in user)
app.get('/api/profile', authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({ message: 'Welcome to your profile!', user: req.user });
});

// Admin-Only Route
app.get('/api/admin/dashboard', authenticateToken, authorize(['admin']), (req: AuthRequest, res: Response) => {
  res.json({ 
    message: 'Welcome to the Admin Dashboard!', 
    stats: {
      totalUsers: db.prepare('SELECT count(*) as count FROM users').get(),
      systemStatus: 'Optimal'
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
