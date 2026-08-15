  import { useState, useEffect } from 'react'

/* ─── Types ────────────────────────────────────────────────── */
interface Character {
  id: number
  name: string
  role: string
  crew: string
  rarity: 'common' | 'rare' | 'epic' | 'legend'
  power: string
  price: number
  rating: number
  img: string
  badge: string
  bounty: string
  description: string
}

interface CartItem extends Character { qty: number }

/* ─── Data ──────────────────────────────────────────────────── */
const CHARACTERS: Character[] = [
  {
    id: 1,
    name: 'Monkey D. Luffy',
    role: 'Captain · Straw Hat Pirates',
    crew: 'Straw Hat Pirates',
    rarity: 'legend',
    power: 'Gear 5 · Nika',
    price: 49.99,
    rating: 5,
    bounty: '3,000,000,000',
    badge: 'LEGEND',
    img: 'https://images.unsplash.com/photo-1765633358974-cde0829a0e42?w=480&h=600&fit=crop&auto=format',
    description: 'The future King of Pirates. Ate the Hito Hito no Mi, Model: Nika.',
  },
  {
    id: 2,
    name: 'Roronoa Zoro',
    role: 'Swordsman · First Mate',
    crew: 'Straw Hat Pirates',
    rarity: 'epic',
    power: 'Three-Sword Style · Enma',
    price: 44.99,
    rating: 5,
    bounty: '1,111,000,000',
    badge: 'EPIC',
    img: 'https://images.unsplash.com/photo-1764818770400-6979b3fed680?w=480&h=600&fit=crop&auto=format',
    description: 'World\'s greatest swordsman in the making. Wields three legendary blades.',
  },
  {
    id: 3,
    name: 'Portgas D. Ace',
    role: 'Commander · Whitebeard Pirates',
    crew: 'Whitebeard Pirates',
    rarity: 'legend',
    power: 'Mera Mera no Mi · Flames',
    price: 52.99,
    rating: 5,
    bounty: '550,000,000',
    badge: 'LEGEND',
    img: 'https://images.unsplash.com/photo-1778129881741-99420055eb3b?w=480&h=600&fit=crop&auto=format',
    description: 'Son of the Pirate King. Commands unstoppable fire with his Devil Fruit.',
  },
  {
    id: 4,
    name: 'Anime Swordmaster',
    role: 'Elite Swordsman · Independent',
    crew: 'Independent',
    rarity: 'rare',
    power: 'Ancient Blade Techniques',
    price: 34.99,
    rating: 4,
    bounty: '300,000,000',
    badge: 'RARE',
    img: 'https://images.unsplash.com/photo-1768268768362-00b5c53bd273?w=480&h=600&fit=crop&auto=format',
    description: 'Master of ancient sword arts, feared across the Grand Line.',
  },
  {
    id: 5,
    name: 'White-Haired Warrior',
    role: 'Division Commander',
    crew: 'Grand Fleet',
    rarity: 'epic',
    power: 'Haki of the Supreme King',
    price: 39.99,
    rating: 4,
    bounty: '620,000,000',
    badge: 'EPIC',
    img: 'https://images.unsplash.com/photo-1777898475327-cfc45cd36ed8?w=480&h=600&fit=crop&auto=format',
    description: 'A fearsome commander with overwhelming Conqueror\'s Haki.',
  },
  {
    id: 6,
    name: 'Nami',
    role: 'Navigator · Straw Hat Pirates',
    crew: 'Straw Hat Pirates',
    rarity: 'rare',
    power: 'Clima-Tact · Zeus',
    price: 32.99,
    rating: 4,
    bounty: '366,000,000',
    badge: 'RARE',
    img: 'https://images.unsplash.com/photo-1621478374422-35206faeddfb?w=480&h=600&fit=crop&auto=format',
    description: 'The Cat Burglar and brilliant navigator of the Straw Hat crew.',
  },
  {
    id: 7,
    name: 'Grand Line Pirate',
    role: 'Crew Member · Free Spirit',
    crew: 'Various',
    rarity: 'common',
    power: 'Devil Fruit Unknown',
    price: 24.99,
    rating: 3,
    bounty: '80,000,000',
    badge: 'COMMON',
    img: 'https://images.unsplash.com/photo-1667419674907-879b29550e12?w=480&h=600&fit=crop&auto=format',
    description: 'A brave soul sailing the treacherous Grand Line.',
  },
  {
    id: 8,
    name: 'Straw Hat Collector Set',
    role: 'Full Crew · Limited Edition',
    crew: 'Straw Hat Pirates',
    rarity: 'legend',
    power: 'All Devil Fruits · All Haki',
    price: 199.99,
    rating: 5,
    bounty: '5,000,000,000+',
    badge: 'LEGEND',
    img: 'https://images.unsplash.com/photo-1734517709196-48873cca9599?w=480&h=600&fit=crop&auto=format',
    description: 'The complete Straw Hat Pirates collection — all 10 members in one set.',
  },
]

const RARITY_BADGE: Record<string, string> = {
  common: 'badge-common',
  rare:   'badge-rare',
  epic:   'badge-epic',
  legend: 'badge-legend',
}

/* ─── Helpers ───────────────────────────────────────────────── */
function Stars({ n }: { n: number }) {
  return (
    <div className="star-rating flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= n ? '#fbbf24' : '#4b2a00', fontSize: 13 }}>★</span>
      ))}
    </div>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar({ cartCount, onCartClick, onSearch, search }: {
  cartCount: number
  onCartClick: () => void
  onSearch: (s: string) => void
  search: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = ['Home', 'Characters', 'Collection', 'About', 'Contact']

  return (
    <nav className="sticky top-0 z-50 bg-flame mirror-bg border-b-2 border-yellow-400/40 shadow-lg shadow-black/50">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4 shrink-0">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-yellow-200 shadow-lg shadow-yellow-500/50">
            <span className="text-red-900 font-bold text-lg leading-none">☠</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-pirata text-yellow-300 text-xl tracking-widest drop-shadow-lg">ONE PIECE</span>
            <p className="text-yellow-200/70 text-[9px] tracking-[0.2em] uppercase -mt-0.5">Grand Line Store</p>
          </div>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 flex-1">
          {links.map(l => (
            <a key={l} href="#" className="nav-link text-yellow-100 font-semibold text-sm hover:text-yellow-300 transition-colors tracking-wide">
              {l}
            </a>
          ))}
        </div>

        {/* Search bar */}
        <div className="flex-1 md:flex-none md:w-56 relative">
          <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            className="w-full bg-black/30 border border-yellow-400/40 text-yellow-100 placeholder:text-yellow-200/40 text-sm rounded-full px-4 py-1.5 pl-8 focus:outline-none focus:border-yellow-400 transition-colors backdrop-blur-sm"
          />
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-yellow-300/70 text-sm">🔍</span>
        </div>

        {/* Cart */}
        <button
          onClick={onCartClick}
          className="relative bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold px-3 py-1.5 rounded-full flex items-center gap-2 text-sm transition-colors shadow-lg"
        >
          <span>🛒</span>
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-yellow-400">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-yellow-300 text-2xl">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden relative z-10 bg-black/80 backdrop-blur-md border-t border-yellow-400/20 px-4 py-4 flex flex-col gap-3">
          {links.map(l => (
            <a key={l} href="#" onClick={() => setMenuOpen(false)} className="text-yellow-200 font-semibold text-base py-1 border-b border-yellow-400/10">
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─── Character Card ─────────────────────────────────────────── */
function CharacterCard({ char, onBuy, onAddToCart }: {
  char: Character
  onBuy: (c: Character) => void
  onAddToCart: (c: Character) => void
}) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAddToCart(char)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card-glow relative rounded-2xl overflow-hidden border border-yellow-400/20 bg-gradient-to-b from-[#1a0505] to-[#0d0000] flex flex-col group">
      {/* Rarity badge */}
      <div className={`absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest text-white ${RARITY_BADGE[char.rarity]}`}>
        {char.badge}
      </div>

      {/* Bounty tag */}
      <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-sm border border-yellow-400/30 px-2 py-0.5 rounded text-[9px] font-mono text-yellow-300 tracking-wide">
        ฿ {char.bounty}
      </div>

      {/* Image */}
      <div className="relative h-64 bg-gradient-to-b from-red-950 to-black overflow-hidden">
        <img
          src={char.img}
          alt={char.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0000] via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-cinzel text-yellow-300 text-base font-bold leading-tight">{char.name}</h3>
          <p className="text-red-300/80 text-xs mt-0.5">{char.role}</p>
        </div>

        <p className="text-yellow-100/60 text-xs leading-relaxed">{char.description}</p>

        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="text-yellow-200/40 text-[9px] tracking-widest uppercase mb-0.5">Power</p>
            <p className="text-orange-300 font-semibold">{char.power}</p>
          </div>
          <Stars n={char.rating} />
        </div>

        {/* Price + Buttons */}
        <div className="mt-auto pt-3 border-t border-yellow-400/10">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-yellow-200/40 text-[9px] tracking-widest uppercase">Price</p>
              <p className="text-yellow-400 font-bold text-xl font-mono">${char.price.toFixed(2)}</p>
            </div>
            <span className="text-[9px] text-green-400 font-semibold uppercase tracking-wide bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">
              In Stock
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onBuy(char)}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs py-2.5 rounded-lg transition-all shadow-lg shadow-red-500/30 tracking-wide"
            >
              BUY NOW
            </button>
            <button
              onClick={handleAdd}
              className={`flex-1 border font-bold text-xs py-2.5 rounded-lg transition-all tracking-wide ${
                added
                  ? 'bg-yellow-400 border-yellow-400 text-red-900'
                  : 'border-yellow-400/50 text-yellow-300 hover:bg-yellow-400/10'
              }`}
            >
              {added ? '✓ Added!' : '+ Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Cart Drawer ─────────────────────────────────────────────── */
function CartDrawer({ items, onClose, onRemove, onQty }: {
  items: CartItem[]
  onClose: () => void
  onRemove: (id: number) => void
  onQty: (id: number, delta: number) => void
}) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-sm bg-[#0d0000] border-l border-yellow-400/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-flame mirror-bg px-5 py-4 flex items-center justify-between border-b border-yellow-400/30">
          <div className="relative z-10 flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="font-cinzel text-yellow-300 font-bold">Your Cart</span>
          </div>
          <button onClick={onClose} className="relative z-10 text-yellow-300 hover:text-yellow-100 text-2xl leading-none transition-colors">×</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-3">🏴‍☠️</p>
              <p className="text-yellow-200/50 text-sm">Your cart is empty, pirate!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-white/5 border border-yellow-400/10 rounded-xl p-3">
                <img src={item.img} alt={item.name} className="w-14 h-14 rounded-lg object-cover object-top shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-cinzel text-yellow-300 text-xs font-bold truncate">{item.name}</p>
                  <p className="text-yellow-400 font-bold text-sm">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => onQty(item.id, -1)} className="w-5 h-5 bg-red-700 text-white rounded text-xs font-bold hover:bg-red-600 transition-colors">−</button>
                    <span className="text-yellow-100 text-sm font-mono w-4 text-center">{item.qty}</span>
                    <button onClick={() => onQty(item.id, +1)} className="w-5 h-5 bg-green-700 text-white rounded text-xs font-bold hover:bg-green-600 transition-colors">+</button>
                    <button onClick={() => onRemove(item.id)} className="ml-auto text-red-400/60 hover:text-red-400 text-xs transition-colors">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 py-4 border-t border-yellow-400/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-yellow-200/60 text-sm">Total</span>
              <span className="font-cinzel text-yellow-400 text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-red-900 font-bold py-3 rounded-xl text-sm tracking-widest hover:from-yellow-300 hover:to-orange-300 transition-all shadow-lg shadow-yellow-500/30">
              ☠ CHECKOUT NOW ☠
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Hero Section ────────────────────────────────────────────── */
function Hero({ onShop }: { onShop: () => void }) {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center justify-center bg-flame mirror-bg">
      {/* Decorative skull/wave pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #fbbf24 0, #fbbf24 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
      }} />

      {/* Side images */}
      <div className="absolute left-0 top-0 bottom-0 w-64 hidden lg:block overflow-hidden opacity-30">
        <img
          src="https://images.unsplash.com/photo-1766062996151-e247dc21c1cf?w=300&h=700&fit=crop&auto=format"
          alt="Luffy"
          className="w-full h-full object-cover float-anim"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#b91c1c]" />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-64 hidden lg:block overflow-hidden opacity-30">
        <img
          src="https://images.unsplash.com/photo-1764818770400-6979b3fed680?w=300&h=700&fit=crop&auto=format"
          alt="Zoro"
          className="w-full h-full object-cover float-anim"
          style={{ animationDelay: '1.5s' }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#b91c1c]" />
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center px-6 py-20">
        <div className="mb-4 text-6xl float-anim">☠️</div>
        <div className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-mono tracking-[0.3em] uppercase px-4 py-1 rounded-full mb-6 backdrop-blur-sm">
          Grand Line Official Store
        </div>
        <h1 className="font-pirata text-yellow-300 text-8xl md:text-[10rem] leading-none drop-shadow-2xl tracking-wide mb-2"
          style={{ textShadow: '0 0 60px rgba(251,191,36,0.6), 0 4px 20px rgba(0,0,0,0.8)' }}>
          ONE PIECE
        </h1>
        <p className="font-cinzel text-yellow-100/80 text-base md:text-xl tracking-[0.25em] uppercase mb-2">
          Collector Cards &amp; Figures
        </p>
        <p className="text-yellow-200/60 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          Sail the Grand Line with our premium character collection. From Luffy to the Yonko —
          every legend awaits. Own a piece of the greatest adventure.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onShop}
            className="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold px-8 py-3.5 rounded-full text-sm tracking-widest transition-all shadow-2xl shadow-yellow-500/40 hover:scale-105"
          >
            ⚓ SHOP NOW
          </button>
          <button className="border-2 border-yellow-400/50 text-yellow-300 hover:border-yellow-400 hover:bg-yellow-400/10 font-bold px-8 py-3.5 rounded-full text-sm tracking-widest transition-all">
            VIEW COLLECTION
          </button>
        </div>
        {/* Stats */}
        <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-yellow-400/20">
          {[['100+', 'Characters'], ['50K+', 'Pirates'], ['#1', 'Anime Store']].map(([v, l]) => (
            <div key={l} className="text-center">
              <p className="font-pirata text-yellow-400 text-2xl">{v}</p>
              <p className="text-yellow-200/50 text-xs tracking-wider uppercase">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Filter Bar ─────────────────────────────────────────────── */
function FilterBar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const filters = ['All', 'Legend', 'Epic', 'Rare', 'Common']
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => setActive(f)}
          className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${
            active === f
              ? 'bg-yellow-400 border-yellow-400 text-red-900 shadow-lg shadow-yellow-500/30'
              : 'border-yellow-400/30 text-yellow-300 hover:border-yellow-400/60 hover:bg-yellow-400/10'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <footer className="relative bg-[#0a0000] border-t border-yellow-400/20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1741825209068-ffb66c82e302?w=1400&h=600&fit=crop&auto=format"
          alt="One Piece manga"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/80 to-[#0a0000]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Email contact bar */}
        <div className="bg-flame mirror-bg rounded-2xl p-8 mb-14 text-center border border-yellow-400/20 shadow-xl shadow-red-900/30">
          <div className="relative z-10">
            <p className="font-pirata text-yellow-300 text-3xl mb-2">Join the Crew</p>
            <p className="text-yellow-100/70 text-sm mb-6">Get exclusive bounty deals, new arrivals & collector news</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 bg-black/40 border border-yellow-400/40 text-yellow-100 placeholder:text-yellow-200/30 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:border-yellow-400 backdrop-blur-sm transition-colors"
              />
              <button
                onClick={() => { if (email) { setSubmitted(true); setEmail('') } }}
                className="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold px-6 py-2.5 rounded-full text-sm tracking-widest transition-all whitespace-nowrap"
              >
                {submitted ? '✓ Subscribed!' : '⚓ Subscribe'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center border-2 border-yellow-200">
                <span className="text-red-900 font-bold text-lg">☠</span>
              </div>
              <span className="font-pirata text-yellow-300 text-xl">ONE PIECE</span>
            </div>
            <p className="text-yellow-200/50 text-xs leading-relaxed">
              The world's greatest One Piece collector card and figure store. Sail with us!
            </p>
            <div className="flex gap-3 mt-4">
              {['𝕏', 'IG', 'YT', 'DC'].map(s => (
                <button key={s} className="w-8 h-8 rounded-full border border-yellow-400/30 text-yellow-300 text-xs hover:bg-yellow-400/10 hover:border-yellow-400 transition-colors font-bold">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Characters */}
          <div>
            <h4 className="font-cinzel text-yellow-400 font-bold text-sm mb-4 tracking-wide">Characters</h4>
            <ul className="space-y-2">
              {['Monkey D. Luffy', 'Roronoa Zoro', 'Nami', 'Sanji', 'Usopp', 'Boa Hancock'].map(c => (
                <li key={c}><a href="#" className="text-yellow-200/50 text-xs hover:text-yellow-300 transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Store */}
          <div>
            <h4 className="font-cinzel text-yellow-400 font-bold text-sm mb-4 tracking-wide">Store</h4>
            <ul className="space-y-2">
              {['New Arrivals', 'Legend Cards', 'Epic Collection', 'Rare Finds', 'Bundle Deals', 'Gift Cards'].map(c => (
                <li key={c}><a href="#" className="text-yellow-200/50 text-xs hover:text-yellow-300 transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-yellow-400 font-bold text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-2 text-yellow-200/50 text-xs">
              <li className="flex items-start gap-2"><span>📍</span><span>Grand Line HQ, New World</span></li>
              <li className="flex items-start gap-2"><span>✉️</span><span>crew@onepiecestore.com</span></li>
              <li className="flex items-start gap-2"><span>📞</span><span>+1 (800) LUFFY-OP</span></li>
              <li className="flex items-start gap-2"><span>⏰</span><span>Mon–Sat · 9am – 8pm</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-yellow-400/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-pirata text-yellow-400/60 text-2xl tracking-widest">ONE PIECE</p>
          <p className="text-yellow-200/30 text-xs text-center">
            © 2026 One Piece Store. Fan-made. One Piece © Eiichiro Oda / Shueisha.
          </p>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Shipping'].map(l => (
              <a key={l} href="#" className="text-yellow-200/30 text-xs hover:text-yellow-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main App ─────────────────────────────────────────────────── */
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [buyMsg, setBuyMsg] = useState<string | null>(null)

  const shopRef = { scrollTo: () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }) }

  function addToCart(c: Character) {
    setCart(prev => {
      const ex = prev.find(i => i.id === c.id)
      return ex ? prev.map(i => i.id === c.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...c, qty: 1 }]
    })
  }

  function removeFromCart(id: number) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  function changeQty(id: number, delta: number) {
    setCart(prev => prev.flatMap(i => i.id === id
      ? i.qty + delta <= 0 ? [] : [{ ...i, qty: i.qty + delta }]
      : [i]
    ))
  }

  function handleBuy(c: Character) {
    addToCart(c)
    setBuyMsg(`${c.name} added to cart!`)
    setTimeout(() => setBuyMsg(null), 2000)
    setCartOpen(true)
  }

  const displayed = CHARACTERS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.crew.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || c.rarity === filter.toLowerCase()
    return matchSearch && matchFilter
  })

  // prevent body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  return (
    <div className="min-h-screen bg-[#0a0000] text-white">
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.qty, 0)}
        onCartClick={() => setCartOpen(true)}
        onSearch={setSearch}
        search={search}
      />

      <Hero onShop={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />

      {/* Toast notification */}
      {buyMsg && (
        <div className="fixed top-20 right-4 z-40 bg-yellow-400 text-red-900 font-bold text-sm px-4 py-2.5 rounded-xl shadow-2xl shadow-yellow-500/30 border-2 border-yellow-300 animate-pulse">
          ✓ {buyMsg}
        </div>
      )}

      {/* Cards section */}
      <section id="shop" className="py-20 px-4 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-yellow-400/60 font-mono text-xs tracking-[0.3em] uppercase mb-3">Premium Collection</p>
          <h2 className="font-cinzel text-yellow-300 text-4xl md:text-5xl font-black mb-4 drop-shadow-lg">
            Character Cards
          </h2>
          <p className="text-yellow-200/50 max-w-xl mx-auto text-sm leading-relaxed">
            Own your favorite Straw Hat pirates, Warlords, and Yonko in stunning collector card format.
            Each card is individually numbered and authenticated.
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-6" />
        </div>

        <FilterBar active={filter} setActive={setFilter} />

        {displayed.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🏴‍☠️</p>
            <p className="text-yellow-200/40 text-lg">No characters found, pirate!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayed.map(c => (
              <CharacterCard key={c.id} char={c} onBuy={handleBuy} onAddToCart={addToCart} />
            ))}
          </div>
        )}
      </section>

      {/* Mid-page banner */}
      <div className="bg-flame mirror-bg py-12 px-6 text-center border-y border-yellow-400/20">
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="font-pirata text-yellow-300 text-5xl mb-2 drop-shadow-xl">
            Will You Find the ONE PIECE?
          </p>
          <p className="text-yellow-100/70 text-sm mb-6">
            Join over 50,000 pirates collecting the greatest anime cards in history
          </p>
          <button
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-400 hover:bg-yellow-300 text-red-900 font-bold px-10 py-3 rounded-full text-sm tracking-widest transition-all hover:scale-105 shadow-xl shadow-yellow-500/30"
          >
            START YOUR COLLECTION
          </button>
        </div>
      </div>

      <Footer />

      {cartOpen && (
        <CartDrawer items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQty={changeQty} />
      )}
    </div>
  )
}
