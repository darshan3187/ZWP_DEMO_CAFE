import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Leaf, 
  Menu as MenuIcon, 
  X, 
  ChevronDown, 
  Clock, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram,
  Coffee,
  ArrowRight
} from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'

// --- Animation Variants ---
const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}

const wordReveal = {
  hidden: { opacity: 0, y: 10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-cream/90 backdrop-blur-md border-b border-cborder shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-20 md:h-24">
        <a href="#" className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-mocha rounded-full outline-none px-2 py-1 -ml-2">
          <div className="bg-mocha/10 p-2 rounded-full transition-colors group-hover:bg-mocha/20">
            <Leaf className="text-mocha w-5 h-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
          </div>
          <span className="font-heading text-espresso text-xl md:text-2xl tracking-tight">Sip & Soul</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-muted hover:text-espresso transition-all duration-300 text-[10px] uppercase tracking-[0.2em] font-bold"
            >
              {link.name}
            </a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-espresso text-cream px-6 py-2 rounded-full text-sm font-medium"
          >
            Reserve Table
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-espresso p-2 focus-visible:ring-2 focus-visible:ring-mocha rounded-lg outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-cborder overflow-hidden"
          >
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col p-4"
            >
              {navLinks.map((link) => (
                <motion.a 
                  variants={staggerItem}
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-4 border-b border-cborder text-espresso font-medium last:border-0"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button 
                variants={staggerItem}
                className="mt-4 bg-espresso text-cream w-full py-4 rounded-full font-medium"
              >
                Reserve Table
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

const Hero = () => {
  const title = "Where Every Cup Tells a Story".split(" ")

  return (
    <section className="min-h-screen bg-cream flex items-center pt-24 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center gap-16 lg:gap-24">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-3 mb-8"
          >
            <span className="w-8 h-[1px] bg-mocha/40" />
            <p className="text-mocha text-[10px] tracking-[0.3em] uppercase font-bold">
              Specialty Coffee · Ahmedabad
            </p>
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-heading text-espresso leading-[1.05] mb-8">
            {title.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="show"
                variants={wordReveal}
                className={`inline-block mr-3 md:mr-4 ${word.toLowerCase() === 'cup' ? 'italic text-mocha font-normal serif-alt' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-muted text-lg md:text-xl mb-12 max-w-sm mx-auto md:mx-0 leading-relaxed font-light"
          >
            Ahmedabad's cozy corner for those who appreciate craft brews and homemade food.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mb-16"
          >
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-espresso text-cream px-12 py-5 rounded-full font-medium text-center shadow-lg shadow-espresso/5 min-w-[200px] focus-visible:ring-2 focus-visible:ring-mocha focus-visible:ring-offset-2 outline-none"
            >
              Explore Menu
            </motion.button>
            <motion.button 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-2 text-espresso font-medium py-5 px-4 focus-visible:underline outline-none"
            >
              <span>Find Us</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-amber-600 text-xs" aria-hidden="true">★</span>
              <span className="text-[10px] text-espresso uppercase tracking-widest font-bold">4.7 Google</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 text-xs" aria-hidden="true">★</span>
              <span className="text-[10px] text-espresso uppercase tracking-widest font-bold">4.5 Zomato</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-mocha/40 rounded-full" aria-hidden="true" />
              <span className="text-[10px] text-espresso uppercase tracking-widest font-bold">340+ Reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full md:w-1/2 relative"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-warm rounded-3xl aspect-[4/5] w-full overflow-hidden shadow-2xl shadow-espresso/5 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
              alt="Sip & Soul Interior"
              className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
            />
            <div className="absolute inset-0 bg-espresso/5 pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-cborder shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-mocha font-heading text-lg">Fresh Daily</p>
                  <p className="text-muted text-[10px] uppercase tracking-widest font-bold">No Shortcuts</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-cborder flex items-center justify-center">
                   <ArrowRight size={14} className="text-mocha" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted/50 hidden md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll down</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  )
}

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center gap-16">
        {/* Left: Image Grid */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <motion.div 
            {...sectionReveal}
            className="aspect-square bg-warm rounded-2xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover" 
              alt="Close up of a freshly brewed cup of coffee with latte art" 
              loading="lazy"
            />
          </motion.div>
          <motion.div 
            {...sectionReveal}
            className="aspect-square bg-warm rounded-2xl overflow-hidden mt-8"
          >
            <img 
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover" 
              alt="Barista carefully pouring hot water over coffee grounds" 
              loading="lazy"
            />
          </motion.div>
          <motion.div 
            {...sectionReveal}
            className="aspect-square bg-warm rounded-2xl overflow-hidden -mt-8"
          >
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover" 
              alt="Interior view of our cozy cafe with sunlight streaming through the window" 
              loading="lazy"
            />
          </motion.div>
          <motion.div 
            {...sectionReveal}
            className="aspect-square bg-warm rounded-2xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600" 
              className="w-full h-full object-cover" 
              alt="Detail of our professional espresso machine" 
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2">
          <motion.div {...sectionReveal} className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-mocha" />
            <span className="text-mocha text-xs tracking-[0.3em] font-bold uppercase">OUR STORY</span>
          </motion.div>
          <motion.h2 {...sectionReveal} className="text-4xl md:text-6xl font-heading text-espresso mb-10 leading-[1.1]">
            Born From a Love of Slow Mornings
          </motion.h2>
          <motion.p {...sectionReveal} className="text-muted text-lg md:text-xl mb-12 max-w-xl leading-relaxed font-light">
            Sip & Soul is Ahmedabad's cozy corner for those who appreciate craft brews and homemade food. Every item on our menu is made fresh daily — no shortcuts, no compromises.
          </motion.p>
          
          <motion.div 
            {...sectionReveal}
            className="grid grid-cols-3 gap-8 border-t border-cborder pt-10"
          >
            <div>
              <p className="text-espresso font-heading text-3xl mb-1">5+</p>
              <p className="text-muted text-[10px] uppercase tracking-widest font-bold">Years of Craft</p>
            </div>
            <div>
              <p className="text-espresso font-heading text-3xl mb-1">340</p>
              <p className="text-muted text-[10px] uppercase tracking-widest font-bold">Happy Guests</p>
            </div>
            <div>
              <p className="text-espresso font-heading text-3xl mb-1">100%</p>
              <p className="text-muted text-[10px] uppercase tracking-widest font-bold">Natural</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Menu = () => {
  const [activeTab, setActiveTab] = useState('Hot')

  const menuData = {
    Hot: [
      { name: "Classic Espresso", price: "₹99", desc: "Pure intense coffee shot", tag: "Strong" },
      { name: "Cappuccino", price: "₹129", desc: "Perfectly frothed milk", tag: "Bestseller" },
      { name: "Cafe Latte", price: "₹139", desc: "Smooth and creamy texture", tag: null },
      { name: "Masala Chai", price: "₹79", desc: "Traditional spiced tea", tag: "Classic" },
    ],
    Cold: [
      { name: "Cold Brew", price: "₹159", desc: "12-hour steeped specialty beans", tag: "Must Try" },
      { name: "Iced Matcha Latte", price: "₹169", desc: "Ceremonial grade matcha", tag: "Healthy" },
      { name: "Mango Cold Foam", price: "₹179", desc: "Fresh seasonal mango blend", tag: "New" },
      { name: "Classic Cold Coffee", price: "₹129", desc: "Rich and blended with ice-cream", tag: null },
    ],
    Food: [
      { name: "Avocado Toast", price: "₹199", desc: "Sourdough, smashed avo, chili flakes", tag: "Bestseller" },
      { name: "Croissant Sandwich", price: "₹229", desc: "Buttery, flaky with ham & cheese", tag: "Fresh" },
      { name: "Loaded Waffles", price: "₹249", desc: "Berries, maple syrup, whipped cream", tag: "Sweet" },
      { name: "French Toast", price: "₹189", desc: "Brioche soaked in cinnamon custard", tag: null },
    ]
  }

  return (
    <section id="menu" className="py-20 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 text-center">
        <motion.h2 {...sectionReveal} className="text-3xl md:text-5xl font-heading text-espresso mb-4 font-normal">What We Brew</motion.h2>
        <motion.p {...sectionReveal} className="text-muted mb-10 md:mb-16">Everything made fresh, every single day</motion.p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16">
          {['Hot', 'Cold', 'Food'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 md:px-8 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeTab === tab ? 'bg-espresso text-cream shadow-sm' : 'text-muted hover:text-espresso'
              }`}
            >
              {tab === 'Hot' ? 'Hot Beverages' : tab === 'Cold' ? 'Cold Beverages' : 'Fresh Food'}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="min-h-[400px]"> {/* Prevent layout jump */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left"
            >
              {menuData[activeTab].map((item) => (
                <motion.div
                  key={item.name}
                  variants={staggerItem}
                  className="group relative pb-8 border-b border-cborder last:border-0 md:last:border-b"
                >
                  <div className="flex items-baseline mb-2 group/line">
                    <div className="flex items-center gap-3">
                      <h3 className="font-heading text-xl md:text-2xl text-espresso group-hover:text-mocha transition-colors duration-300">{item.name}</h3>
                      {item.tag && (
                        <span className="text-mocha text-[9px] px-2 py-0.5 rounded-full border border-mocha/20 font-bold uppercase tracking-wider">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex-grow border-b border-dotted border-cborder mx-4 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="text-espresso font-medium font-body text-lg">{item.price}</span>
                  </div>
                  <p className="text-muted text-sm md:text-base max-w-md leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Happy Hours Banner */}
        <motion.div 
          {...sectionReveal}
          className="mt-12 md:mt-20 bg-espresso text-cream rounded-2xl p-6 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Coffee size={120} />
          </div>
          <p className="text-mocha text-[10px] tracking-[0.3em] uppercase mb-4 font-bold">LIMITED TIME OFFER</p>
          <h4 className="text-xl md:text-3xl font-heading mb-3 md:mb-4">☕ Happy Hours 3 PM – 5 PM</h4>
          <p className="text-cream/80 text-base md:text-lg">20% off on all beverages • Daily</p>
        </motion.div>
      </div>
    </section>
  )
}

const Gallery = () => {
  const images = [
    { span: 'aspect-square', color: 'bg-warm', label: 'OUR SPACE', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600' },
    { span: 'aspect-[4/5]', color: 'bg-warm', label: 'OUR COFFEE', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600' },
    { span: 'aspect-square', color: 'bg-warm', label: 'OUR PEOPLE', src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600' },
    { span: 'aspect-square', color: 'bg-warm', label: 'THE RITUAL', src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1200' },
    { span: 'aspect-square', color: 'bg-warm', label: 'CRAFT', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600' },
    { span: 'aspect-square', color: 'bg-warm', label: 'MOMENTS', src: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=600' },
  ]

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h2 {...sectionReveal} className="text-4xl font-heading text-center mb-16 text-espresso">Captured Moments</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              {...sectionReveal}
              transition={{ delay: i * 0.1 }}
              className={`${img.span} relative group rounded-2xl overflow-hidden ${img.color}`}
            >
              <img 
                src={img.src} 
                alt={img.label} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-espresso/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs tracking-[0.4em] font-bold">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SpecialOffers = () => {
  return (
    <section className="py-24 md:py-32 bg-espresso text-cream overflow-hidden relative">
      {/* Decorative grain/noise pattern already on body, but adding a subtle accent here */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="max-w-6xl mx-auto px-4 md:px-12 relative z-10">
        <motion.div {...sectionReveal} className="text-center mb-20">
          <span className="text-mocha text-xs tracking-[0.4em] font-bold uppercase mb-4 block">EXCLUSIVES</span>
          <h2 className="text-4xl md:text-6xl font-heading">Special Moments</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Card 1 */}
          <motion.div 
            {...sectionReveal}
            className="flex flex-col items-center md:items-start text-center md:text-left group"
          >
            <div className="w-16 h-16 rounded-full border border-mocha/30 flex items-center justify-center mb-8 group-hover:bg-mocha/10 transition-colors duration-500">
              <Clock className="text-mocha w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading mb-4">Golden Hours</h3>
            <p className="text-cream/60 mb-8 max-w-sm leading-relaxed font-light">
              Unwind your afternoons with our signature brews. 20% off on all beverages, every day between 3 PM and 5 PM.
            </p>
            <div className="h-[1px] w-12 bg-mocha" />
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            {...sectionReveal}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center md:items-start text-center md:text-left group"
          >
            <div className="w-16 h-16 rounded-full border border-mocha/30 flex items-center justify-center mb-8 group-hover:bg-mocha/10 transition-colors duration-500">
              <Heart className="text-mocha w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading mb-4">Loyalty Ritual</h3>
            <p className="text-cream/60 mb-8 max-w-sm leading-relaxed font-light">
              Because a good habit should be rewarded. Buy 9 coffees and your 10th one is on us. Ask for your card today.
            </p>
            <div className="h-[1px] w-12 bg-mocha" />
          </motion.div>
        </div>
        
        <motion.div 
          {...sectionReveal}
          className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center gap-6"
        >
          <p className="text-cream/40 text-[10px] tracking-[0.4em] uppercase font-bold">Follow the journey</p>
          <div className="flex items-center gap-4">
             <span className="text-mocha text-lg">@sipandsoulcafe</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Testimonials = () => {
  const reviews = [
    { name: "Priya S.", text: "Best cold brew in the city. The ambiance is perfect for working or catching up with friends.", stars: 5 },
    { name: "Rahul M.", text: "Came for coffee, stayed for the food. The avocado toast is absolutely divine.", stars: 5 },
    { name: "Ananya K.", text: "My go-to cafe for weekend brunches. Never disappoints.", stars: 5 },
  ]

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div {...sectionReveal} className="text-center mb-20">
          <span className="text-mocha text-xs tracking-[0.3em] font-bold uppercase mb-4 block">GUEST STORIES</span>
          <h2 className="text-4xl md:text-6xl font-heading text-espresso">What Our Guests Say</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              {...sectionReveal}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-8 relative"
            >
              <div className="text-mocha/20 absolute -top-4 -left-4 text-6xl font-serif" aria-hidden="true">“</div>
              <p className="text-espresso font-heading italic text-xl md:text-2xl leading-relaxed z-10">
                {rev.text}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-cborder">
                <div className="w-10 h-10 rounded-full bg-warm border border-cborder flex items-center justify-center text-mocha font-bold text-xs uppercase" aria-hidden="true">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <span className="block font-bold text-espresso text-sm tracking-wide">{rev.name}</span>
                  <div className="flex gap-1 mt-1" aria-label={`${rev.stars} star rating`}>
                    {[...Array(rev.stars)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-mocha/40 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  const [formStatus, setFormStatus] = useState('idle') // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setTimeout(() => setFormStatus('idle'), 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-20">
        {/* Left: Contact Info */}
        <div className="w-full md:w-1/2">
          <motion.span {...sectionReveal} className="text-mocha text-xs tracking-widest font-bold block mb-4">VISIT US</motion.span>
          <motion.h2 {...sectionReveal} className="text-3xl md:text-5xl font-heading text-espresso mb-10 md:mb-12">Come Say Hello</motion.h2>
          
          <div className="space-y-8 md:space-y-12">
            <motion.div {...sectionReveal} className="flex gap-4">
              <MapPin className="text-mocha shrink-0" size={20} aria-hidden="true" />
              <div>
                <p className="font-bold text-espresso mb-1 text-sm md:text-base">Our Location</p>
                <p className="text-muted text-xs md:text-sm leading-relaxed max-w-[240px] md:max-w-none">Shop 12, Nexus Mall Road, Vastrapur, Ahmedabad</p>
              </div>
            </motion.div>

            <motion.div {...sectionReveal} className="flex gap-4">
              <Clock className="text-mocha shrink-0" size={20} aria-hidden="true" />
              <div>
                <p className="font-bold text-espresso mb-1 text-sm md:text-base">Opening Hours</p>
                <div className="text-muted text-xs md:text-sm space-y-1">
                  <div className="flex justify-between w-40 md:w-56"><span>Mon–Fri</span> <span>8AM – 10PM</span></div>
                  <div className="flex justify-between w-40 md:w-56"><span>Sat–Sun</span> <span>9AM – 11PM</span></div>
                </div>
              </div>
            </motion.div>

            <motion.div {...sectionReveal} className="flex flex-wrap gap-6 pt-4">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-espresso hover:text-mocha transition-colors focus-visible:underline outline-none" aria-label="Call us at +91 98765 43210">
                <Phone size={18} className="text-mocha" aria-hidden="true" />
                <span className="text-sm font-medium">+91 98765 43210</span>
              </a>
              <a href="mailto:hello@sipandsoul.in" className="flex items-center gap-2 text-espresso hover:text-mocha transition-colors focus-visible:underline outline-none" aria-label="Email us at hello@sipandsoul.in">
                <Mail size={18} className="text-mocha" aria-hidden="true" />
                <span className="text-sm font-medium">hello@sipandsoul.in</span>
              </a>
            </motion.div>

            <motion.div {...sectionReveal} className="bg-warm rounded-2xl h-64 w-full relative overflow-hidden shadow-sm border border-cborder">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover grayscale opacity-60" 
                alt="Stylized map showing Vastrapur area" 
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a href="#" className="bg-white px-6 py-3 rounded-full text-espresso text-sm font-medium flex items-center gap-2 shadow-sm border border-cborder hover:bg-espresso hover:text-cream transition-all group outline-none focus-visible:ring-2 focus-visible:ring-mocha">
                  View on Google Maps <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2">
          <motion.div 
            {...sectionReveal}
            className="bg-white border border-cborder rounded-[2rem] p-8 md:p-12 shadow-sm"
          >
            <h3 className="text-2xl md:text-3xl font-heading text-espresso mb-8">Leave a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b border-cborder py-4 text-sm focus:outline-none focus:border-mocha transition-colors placeholder:text-muted/50"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative">
                  <label htmlFor="phone" className="sr-only">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel" 
                    placeholder="Phone"
                    className="w-full bg-transparent border-b border-cborder py-4 text-sm focus:outline-none focus:border-mocha transition-colors placeholder:text-muted/50"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    required
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-cborder py-4 text-sm focus:outline-none focus:border-mocha transition-colors placeholder:text-muted/50"
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  placeholder="Message"
                  className="w-full bg-transparent border-b border-cborder py-4 text-sm focus:outline-none focus:border-mocha transition-colors resize-none placeholder:text-muted/50"
                />
              </div>
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus !== 'idle'}
                className="w-full bg-espresso text-cream py-6 rounded-full font-bold shadow-xl shadow-espresso/10 tracking-widest text-xs uppercase disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-mocha"
              >
                {formStatus === 'idle' && 'Send Message'}
                {formStatus === 'sending' && 'Sending...'}
                {formStatus === 'success' && 'Message Sent!'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="bg-espresso text-cream pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="text-mocha w-6 h-6" />
              <span className="font-heading text-2xl">Sip & Soul</span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-8 max-w-xs">
              Where Every Cup Tells a Story. Ahmedabad's favorite neighborhood corner for craft coffee.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-mocha hover:border-mocha transition-all outline-none focus-visible:ring-2 focus-visible:ring-mocha" aria-label="Follow us on Instagram">
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-mocha hover:border-mocha transition-all outline-none focus-visible:ring-2 focus-visible:ring-mocha" aria-label="Send us an email">
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-heading text-xl mb-8">Quick Links</h4>
            <div className="flex flex-col gap-4">
              {['Home', 'Menu', 'About', 'Gallery', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-cream/60 hover:text-white transition-colors text-sm font-medium w-fit">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-heading text-xl mb-8">Contact Info</h4>
            <div className="space-y-4 text-sm text-cream/60">
              <p className="flex gap-3"><MapPin size={16} className="text-mocha shrink-0" /> Shop 12, Nexus Mall Road, Ahmedabad</p>
              <p className="flex gap-3"><Clock size={16} className="text-mocha shrink-0" /> Mon–Fri: 8AM–10PM | Sat–Sun: 9AM–11PM</p>
              <p className="flex gap-3"><Phone size={16} className="text-mocha shrink-0" /> +91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-cream/30">
          <p>© 2026 Sip & Soul Cafe · Ahmedabad</p>
          <div className="flex items-center gap-2">
            <span>Website by</span>
            <span className="text-cream/60 font-bold hover:text-mocha transition-colors cursor-pointer">ZwP Studio</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="selection:bg-mocha/20 selection:text-espresso">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <SpecialOffers />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
