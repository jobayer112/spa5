import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  ChevronDown, 
  Menu, 
  X, 
  Clock, 
  Star, 
  ChevronRight,
  ChevronLeft,
  Globe,
  MessageCircle,
  Send,
  Bot,
  Sparkles,
  LayoutDashboard,
  Scissors,
  FileText,
  HelpCircle,
  LogOut,
  Plus,
  Settings as SettingsIcon,
  Trash2,
  Edit3,
  Calendar,
  Check,
  Search,
  Image
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { Service, BlogPost, FAQ, Booking, Testimonial, GalleryImage } from './types';

// --- Components ---

const TopBar = ({ settings }: { settings: any }) => (
  <div className="bg-[#1A1A1A] text-white py-2 px-4 hidden md:block border-b border-white/10">
    <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] uppercase tracking-widest">
      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-spa-accent" />
          <span>{settings.contact_address || 'RM Center, 101 Gulshan Avenue, Dhaka 1212'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={12} className="text-spa-accent" />
          <span>{settings.contact_phone || '+8801611808281'}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={12} className="text-spa-accent" />
          <span>{settings.contact_email || 'info@frozenthaispa.com'}</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <a href={settings.facebook_url || "#"} target="_blank" rel="noopener noreferrer">
          <Facebook size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
        <a href={settings.twitter_url || "#"} target="_blank" rel="noopener noreferrer">
          <Twitter size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
        <a href={settings.instagram_url || "#"} target="_blank" rel="noopener noreferrer">
          <Instagram size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
        <a href={settings.linkedin_url || "#"} target="_blank" rel="noopener noreferrer">
          <Linkedin size={14} className="hover:text-spa-accent cursor-pointer transition-colors" />
        </a>
      </div>
    </div>
  </div>
);

const Navbar = ({ onBookClick }: { onBookClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <a href="/">
            <img 
              src="https://frozenthaispa.com/wp-content/uploads/2024/11/logo.webp" 
              alt="Frozen Thai Spa" 
              className="h-12 md:h-16 object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-spa-dark">
          <a href="#" className="hover:text-spa-accent transition-colors">Spa in Gulshan</a>
          <a href="#about" className="hover:text-spa-accent transition-colors">About</a>
          <a href="#services" className="hover:text-spa-accent transition-colors">Services</a>
          <a href="#gallery" className="hover:text-spa-accent transition-colors">Gallery</a>
          <div className="group relative cursor-pointer flex items-center gap-1">
            <span>Pages</span>
            <ChevronDown size={14} />
            <div className="absolute top-full left-0 bg-white shadow-xl py-4 px-6 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-2 border-spa-brown">
              <a href="#services" className="block py-2 hover:text-spa-brown">Services</a>
              <a href="#pricing" className="block py-2 hover:text-spa-brown">Pricing</a>
              <a href="#faq" className="block py-2 hover:text-spa-brown">FAQ</a>
            </div>
          </div>
          <a href="#blog" className="hover:text-spa-accent transition-colors">Our Blog</a>
          <a href="#contact" className="hover:text-spa-accent transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onBookClick}
            className="hidden md:block bg-spa-brown text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-spa-dark transition-all"
          >
            Book
          </button>
          <button className="lg:hidden text-spa-dark" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
          <div className="hidden lg:block cursor-pointer">
            <Menu size={32} className="text-spa-dark" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white absolute top-full left-0 w-full shadow-xl py-8 px-4 flex flex-col gap-6 text-center uppercase tracking-widest text-sm font-medium border-t border-gray-100"
          >
            <a href="#" onClick={() => setIsOpen(false)}>Spa in Gulshan</a>
            <a href="#about" onClick={() => setIsOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a>
            <a href="#blog" onClick={() => setIsOpen(false)}>Our Blog</a>
            <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
            <button onClick={() => { setIsOpen(false); onBookClick(); }} className="bg-spa-brown text-white py-4 mt-4">Book Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onBookClick }: { onBookClick: () => void }) => (
  <section className="relative h-[80vh] md:h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
        className="w-full h-full object-cover"
        alt="Luxury Spa Experience"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-white"
      >
        <span className="text-spa-accent uppercase tracking-[0.3em] text-sm font-bold mb-6 block drop-shadow-lg">Welcome to Frozen Thai Spa</span>
        <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight drop-shadow-2xl">
          Experience <br/>
          <span className="italic text-spa-accent">Pure Bliss</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/90 leading-relaxed max-w-xl drop-shadow-md">
          Indulge in a unique wellness journey at Frozen Thai Spa - Spa in Gulshan, Banani & Dhaka.
        </p>
        <div className="flex flex-wrap gap-6">
          <button onClick={onBookClick} className="btn-primary">Make Appointment</button>
          <a href="#services" className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-spa-dark transition-all">
            Our Services
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 px-4 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          <img 
            src="https://frozenthaispa.com/wp-content/uploads/2023/07/ab-10-1.jpg" 
            className="w-full h-[400px] object-cover rounded-sm shadow-xl"
            alt="Spa Treatment"
            referrerPolicy="no-referrer"
          />
          <img 
            src="https://frozenthaispa.com/wp-content/uploads/2023/07/ab-10-2.jpg" 
            className="w-full h-[400px] object-cover rounded-sm shadow-xl mt-12"
            alt="Spa Massage"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-2xl hidden lg:block">
          <div className="text-5xl font-serif text-spa-brown font-bold">{new Date().getFullYear() - 2018}+</div>
          <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">Years of<br/>Experience</div>
        </div>
      </div>
      <div>
        <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Learn About Us</span>
        <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">We Have <span className="text-spa-brown">{new Date().getFullYear() - 2018}+ Years</span> Of Experience</h2>
        
        <div className="flex gap-6 mb-8 p-6 border-l-4 border-spa-brown bg-spa-beige/30">
          <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/ab-5-2.jpg" className="w-20 h-20 object-cover rounded-sm" alt="Spa Media" />
          <p className="text-gray-600 italic">
            Spa in Gulshan is A range of different massage techniques, reflexology, body scrubs and facial are available on site which will help you unwind.
          </p>
        </div>

        <p className="text-gray-600 leading-relaxed mb-10">
          Escape the hustle and bustle of everyday life and step into a haven of tranquility at our luxurious spa. Located in the heart of Dhaka, we are your ultimate destination for relaxation, rejuvenation, and self-care. From traditional massages to modern wellness treatments, we provide an unmatched spa experience tailored to your needs.
        </p>
        
        <div className="flex flex-wrap gap-6">
          <a href="#contact" className="btn-primary">Appointment</a>
          <button className="flex items-center gap-3 px-8 py-4 border border-gray-200 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
            <Phone size={16} className="text-spa-brown" />
            Make A Call
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Services = ({ services }: { services: Service[] }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 px-4 bg-[#FDF8F5] relative overflow-hidden">
      {/* Decorative Flowers */}
      <div className="absolute top-0 right-0 w-64 opacity-20 pointer-events-none">
        <img src="https://picsum.photos/seed/flower1/400/400" alt="decor" className="w-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-64 opacity-20 pointer-events-none">
        <img src="https://picsum.photos/seed/flower2/400/400" alt="decor" className="w-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">What We Offer</span>
          <h2 className="text-5xl md:text-6xl font-serif">Our Services</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <motion.div 
              key={s.id} 
              whileHover={{ y: -10 }}
              onClick={() => setSelectedService(s)}
              className="bg-white group cursor-pointer border border-spa-brown/5 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm overflow-hidden flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/spa-service-${s.id}/800/600`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={s.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-lg">
                  <img src={s.image || "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/sr-7-1.svg"} className="w-6 h-6 object-contain" alt="icon" />
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif mb-4 group-hover:text-spa-brown transition-colors">{s.name}</h3>
                <div className="flex items-center gap-2 mb-6 text-xs uppercase tracking-widest text-spa-accent font-bold">
                  <Clock size={12} /> {s.duration}
                </div>
                <p className="text-sm leading-relaxed line-clamp-3 mb-8 text-gray-500">
                  {s.description}
                </p>
                <div className="flex justify-between items-center mt-auto pt-6 border-t border-gray-50">
                  <span className="text-xl font-serif text-spa-brown">৳{s.price}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-spa-dark opacity-60 group-hover:opacity-100">View Details</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white max-w-2xl w-full rounded-sm overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64">
                <img 
                  src={selectedService.image || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"} 
                  className="w-full h-full object-cover"
                  alt={selectedService.name}
                />
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-spa-brown hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-4xl font-serif mb-2">{selectedService.name}</h2>
                    <div className="flex items-center gap-4 text-spa-accent font-bold uppercase tracking-widest text-xs">
                      <span className="flex items-center gap-1"><Clock size={14} /> {selectedService.duration}</span>
                      <span className="w-1 h-1 bg-spa-accent rounded-full" />
                      <span>Authentic Therapy</span>
                    </div>
                  </div>
                  <div className="text-3xl font-serif text-spa-brown">৳{selectedService.price}</div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                  {selectedService.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary flex-1"
                  >
                    Book This Service
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="px-8 py-3 border border-gray-200 font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Gallery = ({ images }: { images: GalleryImage[] }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Facilities', 'Treatment Rooms', 'Ambiance'];
  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Our Ambiance</span>
          <h2 className="text-5xl md:text-6xl font-serif mb-8">Visual Tour</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 text-xs uppercase tracking-widest font-bold transition-all border-b-2 ${filter === cat ? 'border-spa-brown text-spa-brown' : 'border-transparent text-gray-400 hover:text-spa-dark'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div 
                key={img.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="relative h-80 overflow-hidden group cursor-pointer rounded-sm shadow-lg"
              >
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={img.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <span className="text-white font-serif text-2xl border-b border-white/30 pb-2 mb-2">{img.title}</span>
                  <span className="text-white/60 text-[10px] uppercase tracking-widest">{img.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: "You are the AI concierge for Frozen Thai Spa, the best spa in Gulshan, Dhaka. You are helpful, polite, and knowledgeable about spa treatments like Thai Massage, Nuru Massage, and Aromatherapy. You encourage users to book an appointment. Keep responses concise and elegant."
        }
      });

      const modelText = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting right now. Please try again later or call us directly!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-[350px] md:w-[400px] h-[500px] shadow-2xl rounded-2xl overflow-hidden flex flex-col border border-gray-100 mb-4"
          >
            <div className="bg-spa-dark p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-spa-accent flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <div className="font-bold text-sm">Spa Concierge</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60">Online</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-spa-beige/10">
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <Sparkles className="mx-auto text-spa-accent mb-4" size={32} />
                  <p className="text-gray-500 text-sm">Hello! I'm your Frozen Thai Spa assistant. How can I help you relax today?</p>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-spa-brown text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'}`}>
                    <div className="markdown-body">
                      <Markdown>{m.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <div className="w-1.5 h-1.5 bg-spa-accent rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-spa-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-spa-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ask about our services..." 
                  className="flex-1 bg-gray-50 border-none rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-spa-brown outline-none"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  className="w-12 h-12 rounded-full bg-spa-brown text-white flex items-center justify-center hover:bg-spa-accent transition-colors shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-spa-dark text-white flex items-center justify-center shadow-2xl relative group"
      >
        <div className="absolute inset-0 rounded-full bg-spa-accent opacity-0 group-hover:opacity-20 animate-ping" />
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

const OfferBanner = ({ onBookClick }: { onBookClick: () => void }) => (
  <section className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden">
      <div className="md:w-1/2 relative h-[400px] md:h-auto">
        <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/bg-cta-3-1.jpg" className="w-full h-full object-cover" alt="Offer Background" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div className="md:w-1/2 bg-[#E3F2FD] p-12 md:p-20 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Leaf */}
        <div className="absolute top-0 right-0 w-64 opacity-10 pointer-events-none">
          <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/banner-cta-3-1.jpg" alt="decor" className="w-full" />
        </div>
        
        <div className="relative z-10">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Frozen Spa in Gulshan Offer</span>
          <h2 className="text-5xl font-serif mb-8 leading-tight">Relax your body & <br/> get upto <span className="text-spa-brown">10% discount!</span></h2>
          <button onClick={onBookClick} className="btn-primary">Make Appointment</button>
        </div>
      </div>
    </div>
  </section>
);

const BookingSection = ({ services, settings }: { services: Service[], settings: any }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', service: '', date: '', time: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row shadow-2xl rounded-sm overflow-hidden">
        <div className="lg:w-1/2 bg-[#FDF8F5] p-12 md:p-20">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Make Appointment</span>
          <h2 className="text-5xl font-serif mb-12">Get relax any day at any place</h2>
          
          {success ? (
            <div className="bg-green-100 text-green-800 p-6 rounded-sm mb-8" role="alert">
              <h3 className="font-bold mb-2">Appointment Requested!</h3>
              <p>We will contact you shortly to confirm your booking.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 text-sm underline">Book another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-xs uppercase tracking-widest font-bold text-spa-dark/60">First Name</label>
                  <input 
                    id="firstName"
                    type="text" placeholder="e.g. John" required
                    aria-required="true"
                    className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                    value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-xs uppercase tracking-widest font-bold text-spa-dark/60">Last Name</label>
                  <input 
                    id="lastName"
                    type="text" placeholder="e.g. Doe" required
                    aria-required="true"
                    className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                    value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-spa-dark/60">Email Address</label>
                  <input 
                    id="email"
                    type="email" placeholder="john@example.com" required
                    aria-required="true"
                    className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold text-spa-dark/60">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel" placeholder="+880..." required
                    aria-required="true"
                    className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                    value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="text-xs uppercase tracking-widest font-bold text-spa-dark/60">Select Service</label>
                <select 
                  id="service"
                  required aria-required="true"
                  className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown appearance-none"
                  value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                >
                  <option value="">Choose a treatment</option>
                  {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="text-xs uppercase tracking-widest font-bold text-spa-dark/60">Appointment Date</label>
                  <input 
                    id="date"
                    type="date" required aria-required="true"
                    className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown"
                    value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="time" className="text-xs uppercase tracking-widest font-bold text-spa-dark/60">Preferred Time</label>
                  <select 
                    id="time"
                    required aria-required="true"
                    className="w-full p-4 bg-white border border-gray-100 outline-none focus:border-spa-brown appearance-none"
                    value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="">Select Time</option>
                    <option>10:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:00 PM</option>
                    <option>04:00 PM</option>
                    <option>06:00 PM</option>
                    <option>08:00 PM</option>
                  </select>
                </div>
              </div>
              <button 
                disabled={loading} 
                type="submit" 
                className="btn-primary w-full md:w-auto px-12 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={loading}
              >
                {loading ? 'Processing...' : 'Make Appointment'}
              </button>
            </form>
          )}
        </div>
        
        <div className="lg:w-1/2 bg-[#E3F2FD] relative p-12 md:p-20 flex flex-col justify-center items-center text-center">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://frozenthaispa.com/wp-content/uploads/2023/07/schedule-img-1-1.jpg" className="w-full h-full object-cover" alt="bg" />
          </div>
          <div className="relative z-10">
            <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Time Schedule</span>
            <h2 className="text-5xl font-serif mb-12">Opening Hours</h2>
            <div className="space-y-4 text-lg text-spa-dark/80">
              <p className="flex justify-between gap-12 border-b border-spa-dark/10 pb-2">
                <span>Mon-Fri:</span>
                <span className="font-bold">{settings.opening_hours_mon_fri || '9 AM – 10:30 PM'}</span>
              </p>
              <p className="flex justify-between gap-12 border-b border-spa-dark/10 pb-2">
                <span>Saturday:</span>
                <span className="font-bold">{settings.opening_hours_sat_sun || '10 AM – 10 PM'}</span>
              </p>
              <p className="flex justify-between gap-12 border-b border-spa-dark/10 pb-2">
                <span>Sunday:</span>
                <span className="font-bold">{settings.opening_hours_sat_sun || '10 AM – 10 PM'}</span>
              </p>
            </div>
            <div className="mt-12">
              <img src="https://picsum.photos/seed/spa-bowl/300/300" className="w-48 h-48 object-cover rounded-full border-8 border-white shadow-xl mx-auto" alt="Spa" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-serif">Client's Feedback</h2>
          <p className="text-gray-500 mt-6 max-w-4xl mx-auto leading-relaxed">
            Spa in Gulshan offers a serene escape in the heart of the city, combining luxurious treatments with a tranquil ambiance.
          </p>
        </div>

        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="grid md:grid-cols-2 gap-16 items-center"
            >
              <div className="relative">
                <motion.img 
                  layoutId={`testimonial-img-${t.id}`}
                  src={t.photo || `https://picsum.photos/seed/client-${t.id}/600/600`} 
                  className="w-full aspect-square object-cover rounded-sm shadow-2xl"
                  alt={t.name}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 pointer-events-none hidden lg:block">
                  <img src="https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/leaf-1-9.png" alt="decor" className="w-full" />
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="bg-[#FDF8F5] p-12 relative shadow-sm border border-spa-brown/5">
                  <div className="text-spa-accent mb-6 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        fill={i < t.rating ? "currentColor" : "none"} 
                        className={i < t.rating ? "text-spa-accent" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl italic text-gray-600 leading-relaxed mb-8 font-serif">
                    "{t.message}"
                  </p>
                  <div>
                    <div className="font-serif text-2xl text-spa-dark">{t.name}</div>
                    <div className="text-spa-accent uppercase tracking-widest text-xs mt-1 font-bold">Verified Client</div>
                  </div>
                  
                  <div className="absolute bottom-10 right-10 text-9xl font-serif text-spa-brown/5 pointer-events-none select-none">”</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-8">
              <div className="flex gap-3">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > current ? 1 : -1);
                      setCurrent(idx);
                    }}
                    className={`h-2 transition-all duration-300 rounded-full ${idx === current ? 'w-12 bg-spa-brown' : 'w-2 bg-gray-200 hover:bg-spa-brown/40'}`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => paginate(-1)}
                  className="w-14 h-14 rounded-full border border-spa-brown/20 flex items-center justify-center hover:bg-spa-brown hover:text-white transition-all duration-300 group"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => paginate(1)}
                  className="w-14 h-14 rounded-full border border-spa-brown/20 flex items-center justify-center hover:bg-spa-brown hover:text-white transition-all duration-300 group"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ services }: { services: Service[] }) => (
  <section id="pricing" className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Pricing Plan</span>
        <h2 className="text-5xl md:text-6xl font-serif">Our Packages</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
        {services.map((s, idx) => (
          <div key={s.id} className={`p-8 flex gap-6 items-center transition-all duration-300 border border-transparent hover:border-spa-brown/20 ${idx === 1 ? 'bg-spa-brown text-white shadow-xl' : 'bg-[#FDF8F5]'}`}>
            <div className={`w-16 h-16 shrink-0 flex items-center justify-center border border-spa-brown/20 ${idx === 1 ? 'invert' : ''}`}>
              <img src={s.image || "https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/07/pack-i-1-1.svg"} className="w-10 h-10" alt="icon" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-serif">{s.name}</h3>
                <div className="flex-1 border-b border-dotted border-spa-brown/30 mx-4" />
                <div className="text-lg font-bold">Only ৳{s.price}</div>
              </div>
              <p className={`text-sm line-clamp-2 ${idx === 1 ? 'text-white/80' : 'text-gray-500'}`}>
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQSection = ({ faqs }: { faqs: FAQ[] }) => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img 
            src="https://frozenthaispa.com/wp-content/uploads/2023/03/about-1-1.png" 
            className="w-full h-auto object-contain"
            alt="FAQ"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Why Choose Us</span>
          <h2 className="text-5xl font-serif mb-8">Featured Questions</h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Choosing Frozen Thai Spa – Spa in Gulshan means opting for a sanctuary of relaxation and rejuvenation where every detail is designed to provide you with an unparalleled wellness experience. Here’s why Frozen Thai Spa – Spa in Dhaka stands out:
          </p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.id} className="border border-gray-100 rounded-sm overflow-hidden">
                <button 
                  onClick={() => setActive(active === idx ? null : idx)}
                  className="w-full p-6 flex justify-between items-center text-left font-serif text-lg hover:bg-gray-50 transition-colors"
                >
                  {faq.question}
                  <ChevronRight size={20} className={`transition-transform ${active === idx ? 'rotate-90' : ''}`} />
                </button>
                <AnimatePresence>
                  {active === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 px-4 bg-[#FDF8F5]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-spa-accent uppercase tracking-widest text-sm font-medium mb-4 block">Our Blog</span>
          <h2 className="text-5xl md:text-6xl font-serif">Our News Feeds</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <div key={p.id} className="bg-white group overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedPost(p)}>
                <img 
                  src={p.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={p.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <ChevronRight size={24} />
                  </div>
                </div>
              </div>
              <div className="p-8 relative flex-1 flex flex-col">
                <div className="absolute -top-12 left-6 right-6 bg-white p-6 shadow-lg border border-gray-50 group-hover:border-spa-brown transition-colors flex flex-col min-h-[220px]">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-spa-accent font-bold mb-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {p.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>By {p.author}</span>
                  </div>
                  <h3 
                    className="text-xl font-serif mb-4 group-hover:text-spa-brown transition-colors line-clamp-2 cursor-pointer"
                    onClick={() => setSelectedPost(p)}
                  >
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">{p.content}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <button 
                      onClick={() => setSelectedPost(p)}
                      className="inline-flex items-center gap-2 text-spa-brown font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all"
                    >
                      Read Full Story <ChevronRight size={14} />
                    </button>
                    
                    <div className="flex gap-3">
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-spa-brown hover:text-white hover:border-spa-brown transition-all"
                        title="Share on Facebook"
                      >
                        <Facebook size={14} />
                      </a>
                      <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(p.title)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-spa-brown hover:text-white hover:border-spa-brown transition-all"
                        title="Share on Twitter"
                      >
                        <Twitter size={14} />
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-spa-brown hover:text-white hover:border-spa-brown transition-all"
                        title="Share on LinkedIn"
                      >
                        <Linkedin size={14} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="h-56" /> {/* Spacer for absolute box */}
              </div>
            </div>
          ))}
        </div>

        {/* Blog Detail Modal */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 40, opacity: 0 }}
                className="bg-white max-w-5xl w-full max-h-[90vh] overflow-auto rounded-sm relative shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 z-20 bg-white/90 p-3 rounded-full hover:bg-spa-brown hover:text-white transition-all shadow-lg group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
                </button>
                
                <div className="relative h-[40vh] md:h-[50vh]">
                  <img 
                    src={selectedPost.image} 
                    className="w-full h-full object-cover"
                    alt={selectedPost.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold mb-4">
                      <span className="flex items-center gap-2"><Clock size={14} /> {selectedPost.date}</span>
                      <span className="w-8 h-[1px] bg-white/30" />
                      <span>By {selectedPost.author}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif leading-tight">{selectedPost.title}</h2>
                  </div>
                </div>

                <div className="p-12 md:p-20">
                  <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap font-sans text-lg">
                    {selectedPost.content}
                  </div>
                  
                  <div className="mt-16 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-spa-beige flex items-center justify-center text-spa-brown font-bold">
                        {selectedPost.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Written By</div>
                        <div className="font-serif text-lg">{selectedPost.author}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">Share This Story</div>
                      <div className="flex gap-3">
                        <a 
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-spa-brown hover:text-white hover:border-spa-brown transition-all"
                        >
                          <Facebook size={18} />
                        </a>
                        <a 
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(selectedPost.title)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-spa-brown hover:text-white hover:border-spa-brown transition-all"
                        >
                          <Twitter size={18} />
                        </a>
                        <a 
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-spa-brown hover:text-white hover:border-spa-brown transition-all"
                        >
                          <Linkedin size={18} />
                        </a>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedPost(null)}
                      className="btn-outline"
                    >
                      Back to News
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Partner Logos */}
        <div className="mt-24 pt-24 border-t border-gray-100 flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
          {[
            { name: 'Spa in Dhaka', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/spaindhaka-150x150.webp' },
            { name: 'Afrin Love Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Afrin-Love-150x150.webp' },
            { name: 'S Thai', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/S-Thai-150x150.webp' },
            { name: 'Afia Thai Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Afia-Thai-Spa-150x150.webp' },
            { name: 'Eternal Bliss Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Eternal-Bliss-Spa-150x150.webp' },
            { name: 'Frozen Thai Spa Massage', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Frozen-Thai-Spa-150x150.png' },
            { name: 'Desert Lily Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Desert-Lily-Spa-150x150.webp' },
            { name: 'Luxury Thai Spa', url: 'https://frozenthaispa.com/wp-content/uploads/2025/01/Luxury-Thai-Spa-150x150.webp' }
          ].map((partner, idx) => (
            <img 
              key={idx} 
              src={partner.url} 
              className="h-16 md:h-20 object-contain" 
              alt={partner.name} 
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ settings }: { settings: any }) => (
  <footer id="contact" className="bg-[#FDF8F5] pt-24 pb-12 px-4 relative overflow-hidden">
    {/* Decorative Flowers */}
    <div className="absolute bottom-0 left-0 w-64 opacity-20 pointer-events-none">
      <img src="https://picsum.photos/seed/flower3/400/400" alt="decor" className="w-full" />
    </div>
    <div className="absolute bottom-0 right-0 w-64 opacity-20 pointer-events-none">
      <img src="https://picsum.photos/seed/flower4/400/400" alt="decor" className="w-full" />
    </div>

    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <img 
              src="https://frozenthaispa.com/wp-content/uploads/2024/11/logo.webp" 
              alt="Frozen Thai Spa" 
              className="h-12 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Discover the ultimate relaxation at our Frozen Thai Spa, where traditional techniques meet modern luxury. Experience rejuvenating treatments in a serene environment.
          </p>
          <div className="flex gap-6 items-center">
            <a href={settings.facebook_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Facebook size={20} />
            </a>
            <a href={settings.twitter_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Twitter size={20} />
            </a>
            <a href={settings.instagram_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Instagram size={20} />
            </a>
            <a href={settings.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-spa-accent transition-all">
              <Linkedin size={20} />
            </a>
          </div>
          <button className="btn-primary">About Us</button>
        </div>
        
        <div>
          <h4 className="text-spa-accent font-serif text-xl mb-8 border-b border-spa-accent/20 pb-2 inline-block uppercase tracking-widest">IMPORTANT LINKS</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-bold">
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> SERVICES
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> ABOUT US
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> PRICE PLAN
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> CONTACT
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> OUR BLOG
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-spa-accent font-serif text-xl mb-8 border-b border-spa-accent/20 pb-2 inline-block invisible md:visible">.</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-bold">
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> DRY MASSAGE
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> OIL MASSAGE
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> HOT OIL MASSAGE
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> AROMA SPA
            </li>
            <li className="flex items-center gap-2 hover:text-spa-brown transition-colors cursor-pointer">
              <ChevronRight size={14} className="text-spa-brown" /> NURU MASSAGE
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-spa-accent font-serif text-xl mb-8 border-b border-spa-accent/20 pb-2 inline-block uppercase tracking-widest">Contact Info</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-spa-brown rounded-full flex items-center justify-center text-white shrink-0">
                <MapPin size={18} />
              </div>
              <div className="text-sm text-gray-500 font-bold">
                {settings.contact_address || 'RM Center, 101 Gulshan Avenue, Dhaka 1212'}
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-spa-brown rounded-full flex items-center justify-center text-white shrink-0">
                <Phone size={18} />
              </div>
              <div className="text-sm text-gray-500 font-bold">
                Phone No: {settings.contact_phone || '+8801611808281'}
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 bg-spa-brown rounded-full flex items-center justify-center text-white shrink-0">
                <Mail size={18} />
              </div>
              <div className="text-sm text-gray-500 font-bold">
                Email Address:<br/>{settings.contact_email || 'info@frozenthaispa.com'}
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
        <div>© {new Date().getFullYear()} Frozen Thai Spa. All Rights Reserved.</div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="text-gray-500">
            Developed By <a href="https://zobaer-portfolio.lovable.app" target="_blank" rel="noopener noreferrer" className="text-spa-brown hover:underline">Md Zobaer Hasan</a>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-spa-brown transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-spa-brown transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const FloatingBar = ({ settings }: { settings: any }) => (
  <div className="fixed bottom-0 left-0 w-full md:hidden z-50 flex h-16 shadow-2xl">
    <a 
      href={`tel:${settings.contact_phone || '8801611808281'}`} 
      className="flex-1 bg-spa-brown text-white flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
    >
      <Phone size={18} /> Call
    </a>
    <a 
      href={`https://wa.me/${settings.contact_whatsapp || '8801777909009'}?text=Hello%20Frozen%20Thai%20Spa,%20I%20want%20to%20book%20an%20appointment.`} 
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 bg-green-600 text-white flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
    >
      <MessageCircle size={18} /> WhatsApp
    </a>
  </div>
);

// --- Admin Panel ---

const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'blog' | 'seo' | 'testimonials' | 'faq' | 'gallery'>('bookings');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [seoSettings, setSeoSettings] = useState({
    seo_home_title: '',
    seo_home_description: '',
    seo_home_keywords: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    contact_whatsapp: '',
    opening_hours_mon_fri: '',
    opening_hours_sat_sun: ''
  });
  const [saving, setSaving] = useState(false);
  
  // Blog Form State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    image: '',
    author: 'Admin',
    date: new Date().toLocaleDateString()
  });

  // FAQ Form State
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: ''
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    duration: '',
    price: 0,
    description: '',
    image: ''
  });

  // Testimonial Form State
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    rating: 5,
    message: '',
    photo: ''
  });

  // Gallery Form State
  const [editingGallery, setEditingGallery] = useState<GalleryImage | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    url: '',
    title: '',
    category: 'Facilities'
  });

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then(res => res.json())
      .then(setBookings);
    
    fetch('/api/services')
      .then(res => res.json())
      .then(setServices);

    fetch('/api/faq')
      .then(res => res.json())
      .then(setFaqs);

    fetch('/api/blog')
      .then(res => res.json())
      .then(setPosts);

    fetch('/api/testimonials')
      .then(res => res.json())
      .then(setTestimonials);

    fetch('/api/gallery')
      .then(res => res.json())
      .then(setGallery);
    
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSeoSettings({
          seo_home_title: data.seo_home_title || '',
          seo_home_description: data.seo_home_description || '',
          seo_home_keywords: data.seo_home_keywords || '',
          contact_phone: data.contact_phone || '',
          contact_email: data.contact_email || '',
          contact_address: data.contact_address || '',
          contact_whatsapp: data.contact_whatsapp || '',
          opening_hours_mon_fri: data.opening_hours_mon_fri || '',
          opening_hours_sat_sun: data.opening_hours_sat_sun || ''
        });
      });
  }, []);

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingService ? `/api/admin/services/${editingService.id}` : '/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceForm)
      });
      
      if (res.ok) {
        const updatedServices = await fetch('/api/services').then(r => r.json());
        setServices(updatedServices);
        setIsServiceModalOpen(false);
        setEditingService(null);
        setServiceForm({ name: '', duration: '', price: 0, description: '', image: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingTestimonial ? `/api/admin/testimonials/${editingTestimonial.id}` : '/api/admin/testimonials';
      const method = editingTestimonial ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialForm)
      });
      
      if (res.ok) {
        const updated = await fetch('/api/testimonials').then(r => r.json());
        setTestimonials(updated);
        setIsTestimonialModalOpen(false);
        setEditingTestimonial(null);
        setTestimonialForm({ name: '', rating: 5, message: '', photo: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : '/api/admin/blog';
      const method = editingPost ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogForm)
      });
      if (res.ok) {
        const updated = await fetch('/api/blog').then(r => r.json());
        setPosts(updated);
        setIsBlogModalOpen(false);
        setEditingPost(null);
        setBlogForm({ title: '', content: '', image: '', author: 'Admin', date: new Date().toLocaleDateString() });
      }
    } catch (err) { console.error(err); } finally { setSaving(false); }
  };

  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingFaq ? `/api/admin/faq/${editingFaq.id}` : '/api/admin/faq';
      const method = editingFaq ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqForm)
      });
      if (res.ok) {
        const updated = await fetch('/api/faq').then(r => r.json());
        setFaqs(updated);
        setIsFaqModalOpen(false);
        setEditingFaq(null);
        setFaqForm({ question: '', answer: '' });
      }
    } catch (err) { console.error(err); } finally { setSaving(false); }
  };

  const deleteBlog = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    if (res.ok) setPosts(posts.filter(p => p.id !== id));
  };

  const deleteFaq = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    const res = await fetch(`/api/admin/faq/${id}`, { method: 'DELETE' });
    if (res.ok) setFaqs(faqs.filter(f => f.id !== id));
  };

  const openEditService = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description,
      image: service.image
    });
    setIsServiceModalOpen(true);
  };

  const openEditTestimonial = (t: Testimonial) => {
    setEditingTestimonial(t);
    setTestimonialForm({
      name: t.name,
      rating: t.rating,
      message: t.message,
      photo: t.photo || ''
    });
    setIsTestimonialModalOpen(true);
  };

  const handleSeoSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seoSettings)
      });
      alert('SEO Settings saved successfully!');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingGallery ? `/api/admin/gallery/${editingGallery.id}` : '/api/admin/gallery';
      const method = editingGallery ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(galleryForm)
      });
      if (res.ok) {
        const updated = await fetch('/api/gallery').then(r => r.json());
        setGallery(updated);
        setIsGalleryModalOpen(false);
        setEditingGallery(null);
        setGalleryForm({ url: '', title: '', category: 'Facilities' });
      }
    } catch (err) { console.error(err); } finally { setSaving(false); }
  };

  const deleteGallery = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGallery(gallery.filter(g => g.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setBookings(bookings.map(b => b.id === id ? { ...b, status: status as any } : b));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-spa-dark text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-spa-accent flex items-center justify-center shadow-lg shadow-spa-accent/20">
              <LayoutDashboard size={20} className="text-spa-dark" />
            </div>
            <h2 className="text-xl font-serif tracking-tight">Frozen Admin</h2>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Management Suite</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'services', label: 'Services', icon: Scissors },
            { id: 'gallery', label: 'Gallery', icon: Image },
            { id: 'blog', label: 'Journal', icon: FileText },
            { id: 'faq', label: 'Support', icon: HelpCircle },
            { id: 'testimonials', label: 'Reviews', icon: Star },
            { id: 'seo', label: 'Settings', icon: SettingsIcon },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-spa-brown text-white shadow-lg shadow-spa-brown/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-white/40 group-hover:text-white'} />
              {item.label}
              {activeTab === item.id && (
                <motion.div layoutId="activeTab" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onLogout} 
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 md:px-12 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-serif text-spa-dark capitalize">{activeTab}</h1>
            <div className="h-4 w-px bg-gray-200" />
            <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">Overview</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-spa-dark">Administrator</div>
              <div className="text-[10px] text-spa-accent uppercase tracking-widest font-bold">Full Access</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-spa-beige flex items-center justify-center text-spa-brown font-bold border-2 border-white shadow-sm">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'bookings' && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Bookings', value: bookings.length, color: 'bg-blue-500' },
                      { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'bg-green-500' },
                      { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'bg-yellow-500' },
                      { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, color: 'bg-red-500' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">{stat.label}</div>
                        <div className="flex items-end justify-between">
                          <div className="text-3xl font-serif text-spa-dark">{stat.value}</div>
                          <div className={`w-8 h-1 rounded-full ${stat.color}`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                      <h3 className="font-serif text-lg">Recent Appointments</h3>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-spa-dark transition-colors">Export CSV</button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-gray-50/50 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                          <tr>
                            <th className="px-8 py-4">Client Information</th>
                            <th className="px-8 py-4">Requested Service</th>
                            <th className="px-8 py-4">Schedule</th>
                            <th className="px-8 py-4">Status</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {bookings.map(b => (
                            <tr key={b.id} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="px-8 py-5">
                                <div className="font-bold text-spa-dark">{b.firstName} {b.lastName}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{b.phone}</div>
                              </td>
                              <td className="px-8 py-5">
                                <span className="px-3 py-1 bg-spa-beige/30 text-spa-brown text-[10px] font-bold uppercase tracking-widest rounded-full">
                                  {b.service}
                                </span>
                              </td>
                              <td className="px-8 py-5">
                                <div className="text-sm font-medium text-gray-600">{b.date}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{b.time}</div>
                              </td>
                              <td className="px-8 py-5">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                  b.status === 'confirmed' ? 'bg-green-50 text-green-600' : 
                                  b.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    b.status === 'confirmed' ? 'bg-green-600' : 
                                    b.status === 'cancelled' ? 'bg-red-600' : 'bg-yellow-600'
                                  }`} />
                                  {b.status}
                                </div>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => updateStatus(b.id, 'confirmed')} 
                                    className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                                    title="Confirm Booking"
                                  >
                                    <Check size={16} />
                                  </button>
                                  <button 
                                    onClick={() => updateStatus(b.id, 'cancelled')} 
                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                                    title="Cancel Booking"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-2xl text-spa-dark">Service Catalog</h3>
                      <p className="text-sm text-gray-400">Manage your spa treatments and pricing</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingService(null);
                        setServiceForm({ name: '', duration: '', price: 0, description: '', image: '' });
                        setIsServiceModalOpen(true);
                      }}
                      className="flex items-center gap-2 bg-spa-brown text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-spa-brown/20 hover:scale-105 transition-transform"
                    >
                      <Plus size={16} />
                      Add Treatment
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(s => (
                      <div key={s.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={s.image || `https://picsum.photos/seed/spa-service-${s.id}/800/600`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            alt={s.name}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                            <div className="text-white">
                              <div className="text-[10px] uppercase tracking-widest font-bold opacity-70">{s.duration}</div>
                              <div className="font-serif text-lg">{s.name}</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white font-bold text-sm">
                              ৳{s.price}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-6">{s.description}</p>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => openEditService(s)} 
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-100 text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              <Edit3 size={14} /> Edit
                            </button>
                            <button 
                              onClick={() => deleteService(s.id)} 
                              className="w-12 flex items-center justify-center py-2.5 rounded-xl border border-red-50 text-red-400 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-2xl text-spa-dark">Client Reviews</h3>
                      <p className="text-sm text-gray-400">Feedback from your valued guests</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingTestimonial(null);
                        setTestimonialForm({ name: '', rating: 5, message: '', photo: '' });
                        setIsTestimonialModalOpen(true);
                      }}
                      className="flex items-center gap-2 bg-spa-brown text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-spa-brown/20 hover:scale-105 transition-transform"
                    >
                      <Plus size={16} />
                      Add Review
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map(t => (
                      <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-spa-beige flex items-center justify-center text-spa-brown font-bold shrink-0">
                            {t.photo ? <img src={t.photo} className="w-full h-full rounded-full object-cover" alt={t.name} /> : t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-spa-dark">{t.name}</div>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className={i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'} />
                              ))}
                            </div>
                          </div>
                          <div className="ml-auto flex gap-2">
                            <button onClick={() => openEditTestimonial(t)} className="p-2 hover:bg-gray-50 text-gray-400 hover:text-spa-brown rounded-lg transition-colors">
                              <Edit3 size={14} />
                            </button>
                            <button onClick={() => deleteTestimonial(t.id)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 italic leading-relaxed">"{t.message}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="max-w-4xl space-y-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="font-serif text-2xl text-spa-dark">Global Configuration</h3>
                      <p className="text-sm text-gray-400">SEO, Contact, and Operational settings</p>
                    </div>
                  </div>

                  <form onSubmit={handleSeoSave} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* SEO Column */}
                      <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                            <Search size={16} />
                          </div>
                          <h4 className="font-serif text-lg">Search Engine Optimization</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Meta Title</label>
                            <input 
                              type="text" 
                              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                              value={seoSettings.seo_home_title}
                              onChange={e => setSeoSettings({...seoSettings, seo_home_title: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Meta Description</label>
                            <textarea 
                              rows={4}
                              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                              value={seoSettings.seo_home_description}
                              onChange={e => setSeoSettings({...seoSettings, seo_home_description: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Keywords</label>
                            <input 
                              type="text" 
                              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                              value={seoSettings.seo_home_keywords}
                              onChange={e => setSeoSettings({...seoSettings, seo_home_keywords: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Column */}
                      <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                            <Phone size={16} />
                          </div>
                          <h4 className="font-serif text-lg">Contact Information</h4>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Phone</label>
                              <input 
                                type="text" 
                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                                value={seoSettings.contact_phone}
                                onChange={e => setSeoSettings({...seoSettings, contact_phone: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">WhatsApp</label>
                              <input 
                                type="text" 
                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                                value={seoSettings.contact_whatsapp}
                                onChange={e => setSeoSettings({...seoSettings, contact_whatsapp: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Email Address</label>
                            <input 
                              type="email" 
                              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                              value={seoSettings.contact_email}
                              onChange={e => setSeoSettings({...seoSettings, contact_email: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Physical Address</label>
                            <input 
                              type="text" 
                              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                              value={seoSettings.contact_address}
                              onChange={e => setSeoSettings({...seoSettings, contact_address: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                            <div>
                              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Mon-Fri Hours</label>
                              <input 
                                type="text" 
                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                                value={seoSettings.opening_hours_mon_fri}
                                onChange={e => setSeoSettings({...seoSettings, opening_hours_mon_fri: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Sat-Sun Hours</label>
                              <input 
                                type="text" 
                                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-spa-brown transition-colors text-sm"
                                value={seoSettings.opening_hours_sat_sun}
                                onChange={e => setSeoSettings({...seoSettings, opening_hours_sat_sun: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      disabled={saving} 
                      type="submit" 
                      className="w-full bg-spa-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-spa-dark/10 hover:bg-spa-brown transition-all disabled:opacity-50"
                    >
                      {saving ? 'Synchronizing Data...' : 'Save All Configurations'}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-2xl text-spa-dark">Visual Tour Management</h3>
                      <p className="text-sm text-gray-400">Manage your spa's gallery images</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingGallery(null);
                        setGalleryForm({ url: '', title: '', category: 'Facilities' });
                        setIsGalleryModalOpen(true);
                      }}
                      className="flex items-center gap-2 bg-spa-brown text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-spa-brown/20 hover:scale-105 transition-transform"
                    >
                      <Plus size={16} />
                      Add Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map(img => (
                      <div key={img.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                        <div className="relative h-48 overflow-hidden">
                          <img src={img.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={img.title} />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <button 
                              onClick={() => {
                                setEditingGallery(img);
                                setGalleryForm({ url: img.url, title: img.title, category: img.category });
                                setIsGalleryModalOpen(true);
                              }}
                              className="w-8 h-8 bg-white/90 backdrop-blur shadow-sm rounded-lg flex items-center justify-center text-spa-brown hover:bg-spa-brown hover:text-white transition-all"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button 
                              onClick={() => deleteGallery(img.id)}
                              className="w-8 h-8 bg-white/90 backdrop-blur shadow-sm rounded-lg flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="absolute bottom-3 left-3">
                            <span className="px-3 py-1 bg-spa-dark/80 backdrop-blur text-white text-[10px] uppercase tracking-widest font-bold rounded-full">
                              {img.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-spa-dark truncate">{img.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'blog' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-2xl text-spa-dark">Spa Journal</h3>
                      <p className="text-sm text-gray-400">Share stories and wellness tips</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingPost(null);
                        setBlogForm({ title: '', content: '', image: '', author: 'Admin', date: new Date().toLocaleDateString() });
                        setIsBlogModalOpen(true);
                      }}
                      className="flex items-center gap-2 bg-spa-brown text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-spa-brown/20 hover:scale-105 transition-transform"
                    >
                      <Plus size={16} />
                      New Article
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-gray-50/50 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                          <tr>
                            <th className="px-8 py-4">Article</th>
                            <th className="px-8 py-4">Author</th>
                            <th className="px-8 py-4">Date</th>
                            <th className="px-8 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {posts.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                                    <img src={p.image || `https://picsum.photos/seed/blog-${p.id}/100/100`} className="w-full h-full object-cover" alt={p.title} />
                                  </div>
                                  <div className="font-bold text-spa-dark">{p.title}</div>
                                </div>
                              </td>
                              <td className="px-8 py-5 text-sm text-gray-500">{p.author}</td>
                              <td className="px-8 py-5 text-sm text-gray-400">{p.date}</td>
                              <td className="px-8 py-5 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => {
                                      setEditingPost(p);
                                      setBlogForm({ title: p.title, content: p.content, image: p.image, author: p.author, date: p.date });
                                      setIsBlogModalOpen(true);
                                    }}
                                    className="p-2 hover:bg-spa-beige/30 text-spa-brown rounded-lg transition-colors"
                                  >
                                    <Edit3 size={16} />
                                  </button>
                                  <button onClick={() => deleteBlog(p.id)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors">
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-2xl text-spa-dark">Support Center</h3>
                      <p className="text-sm text-gray-400">Manage frequently asked questions</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingFaq(null);
                        setFaqForm({ question: '', answer: '' });
                        setIsFaqModalOpen(true);
                      }}
                      className="flex items-center gap-2 bg-spa-brown text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-spa-brown/20 hover:scale-105 transition-transform"
                    >
                      <Plus size={16} />
                      Add FAQ
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {faqs.map(f => (
                      <div key={f.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm group hover:border-spa-brown/20 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="font-bold text-spa-dark mb-2 flex items-center gap-2">
                              <HelpCircle size={14} className="text-spa-accent" />
                              {f.question}
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">{f.answer}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={() => {
                                setEditingFaq(f);
                                setFaqForm({ question: f.question, answer: f.answer });
                                setIsFaqModalOpen(true);
                              }}
                              className="p-2 hover:bg-spa-beige/30 text-spa-brown rounded-lg transition-colors"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button onClick={() => deleteFaq(f.id)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {isServiceModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                <button onClick={() => setIsServiceModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleServiceSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Service Name</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.name} onChange={e => setServiceForm({...serviceForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Duration (e.g. 60 min)</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.duration} onChange={e => setServiceForm({...serviceForm, duration: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Price (৳)</label>
                    <input 
                      type="number" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.price} onChange={e => setServiceForm({...serviceForm, price: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Image URL</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={serviceForm.image} onChange={e => setServiceForm({...serviceForm, image: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Description</label>
                  <textarea 
                    rows={4} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {isTestimonialModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                <button onClick={() => setIsTestimonialModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Client Name</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Rating (1-5)</label>
                    <input 
                      type="number" min="1" max="5" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={testimonialForm.rating} onChange={e => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Photo URL (Optional)</label>
                    <input 
                      type="text"
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={testimonialForm.photo} onChange={e => setTestimonialForm({...testimonialForm, photo: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Message</label>
                  <textarea 
                    rows={4} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={testimonialForm.message} onChange={e => setTestimonialForm({...testimonialForm, message: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Blog Modal */}
      <AnimatePresence>
        {isBlogModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingPost ? 'Edit Post' : 'Add Post'}</h2>
                <button onClick={() => setIsBlogModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Title</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Image URL</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Author</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={blogForm.author} onChange={e => setBlogForm({...blogForm, author: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Date</label>
                    <input 
                      type="text" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Content</label>
                  <textarea 
                    rows={6} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Modal */}
      <AnimatePresence>
        {isFaqModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingFaq ? 'Edit FAQ' : 'Add FAQ'}</h2>
                <button onClick={() => setIsFaqModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleFaqSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Question</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Answer</label>
                  <textarea 
                    rows={6} required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})}
                  />
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingFaq ? 'Update FAQ' : 'Create FAQ'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 max-w-2xl w-full rounded-sm max-h-[90vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif">{editingGallery ? 'Edit Photo' : 'Add Photo'}</h2>
                <button onClick={() => setIsGalleryModalOpen(false)}><X /></button>
              </div>
              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Photo Title</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={galleryForm.title} onChange={e => setGalleryForm({...galleryForm, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Image URL</label>
                  <input 
                    type="text" required
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={galleryForm.url} onChange={e => setGalleryForm({...galleryForm, url: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-bold">Category</label>
                  <select 
                    className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                    value={galleryForm.category} onChange={e => setGalleryForm({...galleryForm, category: e.target.value})}
                  >
                    <option value="Facilities">Facilities</option>
                    <option value="Treatment Rooms">Treatment Rooms</option>
                    <option value="Ambiance">Ambiance</option>
                  </select>
                </div>
                <button disabled={saving} type="submit" className="btn-primary w-full">
                  {saving ? 'Saving...' : editingGallery ? 'Update Photo' : 'Add Photo'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to server');
    }
  };

  return (
    <section className="py-20 bg-spa-brown text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif mb-8">Subscribe for updates</h2>
        {status === 'success' ? (
          <div className="bg-white/20 p-6 rounded-sm">
            <p className="font-bold">Thank you for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              required
              placeholder="Enter your email..." 
              className="flex-1 bg-white/10 border border-white/20 p-4 outline-none focus:bg-white/20"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button 
              disabled={status === 'loading'}
              className="btn-primary bg-white text-spa-brown hover:bg-spa-beige"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="mt-4 text-red-200 text-sm">{message}</p>}
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    fetch('/api/services').then(res => res.json()).then(setServices);
    fetch('/api/faq').then(res => res.json()).then(setFaqs);
    fetch('/api/blog').then(res => res.json()).then(setPosts);
    fetch('/api/testimonials').then(res => res.json()).then(setTestimonials);
    fetch('/api/gallery').then(res => res.json()).then(setGalleryImages);
    fetch('/api/settings').then(res => res.json()).then(setSettings);
  }, [isAdmin]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: adminEmail, password: adminPassword })
    });
    if (res.ok) {
      setIsAdmin(true);
      setShowAdminLogin(false);
    } else {
      alert('Invalid credentials');
    }
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isAdmin) {
    return <AdminPanel onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <HelmetProvider>
      <div className="relative min-h-screen">
        <Helmet>
          <title>{settings.seo_home_title || 'Frozen Thai Spa'}</title>
          <meta name="description" content={settings.seo_home_description || ''} />
          <meta name="keywords" content={settings.seo_home_keywords || ''} />
        </Helmet>
        <TopBar settings={settings} />
        <Navbar onBookClick={scrollToBooking} />
        
        <main>
          <Hero onBookClick={scrollToBooking} />
          <About />
          <Services services={services} />
          <Gallery images={galleryImages} />
          <OfferBanner onBookClick={scrollToBooking} />
          <BookingSection services={services} settings={settings} />
          <Testimonials testimonials={testimonials} />
          <Pricing services={services} />
          <FAQSection faqs={faqs} />
          <Blog posts={posts} />
          
          <ChatBot />
          
          {/* Map Section */}
          <section className="h-[450px] w-full relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.156382961058!2d90.4125433154316!3d23.77744549360585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0x2ad1c151392a566a!2sGulshan%20Avenue%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1647854321000!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>

          <SubscribeSection />
        </main>

        <Footer settings={settings} />
        <FloatingBar settings={settings} />

        {/* Hidden Admin Entry */}
        <button 
          onClick={() => setShowAdminLogin(true)}
          className="fixed bottom-20 right-4 md:bottom-4 md:right-4 opacity-20 hover:opacity-100 transition-opacity z-50 text-2xl"
          title="Admin Login"
        >
          🌐
        </button>

        {/* Admin Login Modal */}
        <AnimatePresence>
          {showAdminLogin && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-8 max-w-md w-full rounded-sm"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-serif">Admin Login</h2>
                  <button onClick={() => setShowAdminLogin(false)}><X /></button>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">Email</label>
                    <input 
                      type="email" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={adminEmail} onChange={e => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">Password</label>
                    <input 
                      type="password" required
                      className="w-full p-3 border border-gray-200 outline-none focus:border-spa-brown"
                      value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full">Login</button>
                </form>
                <div className="mt-6 text-[10px] text-gray-400 text-center uppercase tracking-widest">
                  Protected Area - Authorized Personnel Only
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </HelmetProvider>
  );
}
