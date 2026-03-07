import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Activity, 
  FileText, 
  CheckCircle2, 
  Link as LinkIcon, 
  BrainCircuit, 
  ClipboardCheck,
  Star,
  Menu,
  ChevronRight,
  Twitter,
  Linkedin,
  Facebook
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-8 hover:border-primary/50 transition-colors group"
  >
    <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </motion.div>
);

const Step = ({ number, icon: Icon, title, description, isLast = false }: { number: string, icon: any, title: string, description: string, isLast?: boolean }) => (
  <div className="flex gap-6">
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-primary/10 z-10">
        <Icon size={18} />
      </div>
      {!isLast && <div className="w-0.5 bg-white/10 flex-grow my-2" />}
    </div>
    <div className={isLast ? "pb-0" : "pb-12"}>
      <h4 className="text-xl font-bold mb-1">{title}</h4>
      <p className="text-slate-400">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ quote, author, role, image, rating }: { quote: string, author: string, role: string, image: string, rating: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass-card p-8"
  >
    <div className="flex gap-1 text-yellow-400 mb-4">
      {[...Array(rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="italic text-lg mb-6 leading-relaxed text-slate-200">"{quote}"</p>
    <div className="flex items-center gap-4">
      <img 
        src={image} 
        alt={author} 
        className="w-12 h-12 rounded-full object-cover grayscale hover:grayscale-0 transition-all"
        referrerPolicy="no-referrer"
      />
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 px-6 py-4 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-xl font-black tracking-tighter">SafeGuard Logistics</h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {["Compliance", "Features", "Process", "Testimonials"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="btn-primary hidden sm:block">Self Audit Now</button>
            <div className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden cursor-pointer hover:border-primary transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facepad&padding=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="md:hidden text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-20 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                  FMCSA Compliance <br/>
                  <span className="text-primary">Made Simple</span>
                </h1>
                <p className="text-slate-400 text-xl max-w-xl leading-relaxed">
                  Navigate safety regulations with confidence. Our automated tools ensure your fleet stays compliant and road-ready.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary h-14 px-8 text-lg shadow-lg shadow-primary/20">
                  Self Audit Now
                </button>
                <button className="btn-secondary h-14 px-8 text-lg">
                  View Demo
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2000" 
                  alt="Dashboard Preview" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-medium">System Status: Compliant</span>
                  </div>
                  <div className="text-xs text-slate-400">Last Audit: 2 mins ago</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white/[0.02] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <div className="max-w-2xl mb-16">
              <h2 className="text-4xl font-bold tracking-tight mb-4">Comprehensive Safety Features</h2>
              <p className="text-slate-400 text-lg">
                Everything you need to manage your logistics compliance in one place, from ELD monitoring to automated driver records.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Activity}
                title="Real-time Monitoring"
                description="Track fleet safety scores instantly and identify potential issues before they become violations."
              />
              <FeatureCard 
                icon={FileText}
                title="Automated Logs"
                description="Eliminate manual paperwork errors with intelligent syncing between ELD data and record-keeping systems."
              />
              <FeatureCard 
                icon={ClipboardCheck}
                title="Audit Readiness"
                description="Prepare for inspections with one click. Generate comprehensive reports formatted for FMCSA requirements."
              />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-24 max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-12">Our 3-Step Process</h2>
              <div className="space-y-0">
                <Step 
                  icon={LinkIcon}
                  title="Connect Fleet Data"
                  description="Securely sync your ELD provider and driver qualification files into our centralized platform."
                  number="01"
                />
                <Step 
                  icon={BrainCircuit}
                  title="Run Automated Audit"
                  description="Our proprietary AI engine scans every record for potential violations and safety gaps."
                  number="02"
                />
                <Step 
                  icon={CheckCircle2}
                  title="Get Compliance Report"
                  description="Receive actionable insights and a step-by-step remediation plan to maintain a perfect safety score."
                  number="03"
                  isLast
                />
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
                <div className="space-y-6 relative">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="font-bold">Compliance Score</span>
                    <span className="text-emerald-500 font-black text-2xl">98/100</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Driver Logs", status: "Verified", color: "text-emerald-500" },
                      { label: "Vehicle Maintenance", status: "Up to date", color: "text-emerald-500" },
                      { label: "Drug & Alcohol Clearinghouse", status: "Checked", color: "text-emerald-500" },
                      { label: "Insurance Coverage", status: "Active", color: "text-emerald-500" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">{item.label}</span>
                        <span className={item.color}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full btn-primary mt-4 flex items-center justify-center gap-2">
                    Download Full Report <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-white/[0.02] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Trusted by 500+ Fleets</h2>
              <p className="text-slate-400 text-lg">See how carriers are staying road-ready and audit-proof.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard 
                quote="SafeGuard Logistics transformed our compliance process. We went from manual spreadsheets to automated audits in just a weekend. Highly recommended for any growing carrier."
                author="Robert Chen"
                role="CEO, Chen Transport Systems"
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                rating={5}
              />
              <TestimonialCard 
                quote="The peace of mind during our last DOT inspection was worth every penny. Everything was organized and ready. We didn't get a single violation."
                author="Sarah Jenkins"
                role="Safety Director, Peak Logistics"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                rating={5}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 lg:px-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto bg-primary rounded-3xl p-12 lg:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl lg:text-6xl font-black text-white">Ready to secure your safety score?</h2>
              <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
                Join hundreds of fleets that have simplified their FMCSA compliance with our intelligent audit platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary hover:bg-slate-100 font-bold h-14 px-10 rounded-xl text-lg transition-all shadow-xl">
                  Self Audit Now
                </button>
                <button className="bg-primary/20 hover:bg-primary/30 border border-white/20 text-white font-bold h-14 px-10 rounded-xl text-lg transition-all">
                  Talk to an Expert
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <ShieldCheck size={28} className="text-primary" />
                <span className="font-black text-2xl tracking-tighter">SafeGuard</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Simplifying logistics compliance for the modern carrier. Secure, efficient, and audit-ready.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-slate-500 hover:text-white transition-colors"><Facebook size={20} /></a>
              </div>
            </div>
            
            {[
              { 
                title: "Product", 
                links: ["Safety Audits", "ELD Monitoring", "Driver Files", "Pricing"] 
              },
              { 
                title: "Company", 
                links: ["About Us", "Blog", "Careers", "Contact"] 
              },
              { 
                title: "Legal", 
                links: ["Privacy Policy", "Terms of Service", "Compliance Guide"] 
              }
            ].map((col) => (
              <div key={col.title}>
                <h5 className="font-bold text-white mb-6">{col.title}</h5>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs">
            <p>© {new Date().getFullYear()} SafeGuard Logistics. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Security</a>
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
