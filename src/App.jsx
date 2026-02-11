import { Eye, TrendingUp, AlertTriangle, Users, Activity } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useState, useEffect } from 'react';

export default function App() {
  // All products including hero product
  const [products, setProducts] = useState([
    { 
      id: 0, 
      name: 'SPICY MAGGI', 
      sku: 'MGGI-2024-SP', 
      lot: 'A-127',
      price: 120, 
      basePrice: 48, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1713780131281-61ec701ebb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMG1hZ2dpJTIwbm9vZGxlcyUyMGJvd2wlMjBzdGVhbXxlbnwxfHx8fDE3NzA3OTMyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 7,
      demand: 9.4,
      badge: 'HOT ITEM',
      description: 'Spicy instant noodles with extra masala'
    },
    { 
      id: 1, 
      name: 'COLD COFFEE', 
      sku: 'CFEE-2024', 
      lot: 'B-089',
      price: 85, 
      basePrice: 60, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1595520519701-eb1b0effe7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xkJTIwY29mZmVlJTIwZ2xhc3MlMjBpY2V8ZW58MXx8fHwxNzcwNzk3MDAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 12,
      demand: 7.8,
      badge: 'POPULAR',
      description: 'Refreshing iced coffee with milk'
    },
    { 
      id: 2, 
      name: 'SAMOSA (2PC)', 
      sku: 'SMSA-2024', 
      lot: 'C-214',
      price: 32, 
      basePrice: 25, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1767469576715-a4eb8bcfa204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBpbmRpYW4lMjBmcmllZCUyMHNuYWNrfGVufDF8fHx8MTc3MDc5NzAwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 18,
      demand: 6.5,
      badge: 'CLASSIC',
      description: 'Crispy fried potato and peas pastry'
    },
    { 
      id: 3, 
      name: 'PANI PURI', 
      sku: 'PURI-2024', 
      lot: 'D-156',
      price: 25, 
      basePrice: 13, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1769019401093-38f564d6408a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5pJTIwcHVyaSUyMGdvbGdhcHBhJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NzA3MDgyOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 5,
      demand: 8.9,
      badge: 'TRENDING',
      description: 'Crispy puri filled with spicy tangy water'
    },
    { 
      id: 4, 
      name: 'VADA PAV', 
      sku: 'VADA-2024', 
      lot: 'E-092',
      price: 28, 
      basePrice: 15, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1554978991-33ef7f31d658?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWRhJTIwcGF2JTIwbXVtYmFpJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NzA3OTgyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 15,
      demand: 7.2,
      badge: 'STREET FAV',
      description: 'Mumbai street style potato fritter in bun'
    },
    { 
      id: 5, 
      name: 'MASALA CHAI', 
      sku: 'CHAI-2024', 
      lot: 'F-203',
      price: 22, 
      basePrice: 10, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1628702774354-f09e4a167a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBjaGFpJTIwdGVhJTIwaW5kaWFufGVufDF8fHx8MTc3MDc5ODIwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 25,
      demand: 8.1,
      badge: 'BEST SELLER',
      description: 'Spiced tea with aromatic herbs'
    },
    { 
      id: 6, 
      name: 'PAKORA (5PC)', 
      sku: 'PAKO-2024', 
      lot: 'G-147',
      price: 45, 
      basePrice: 30, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1767114915965-7abe87d7c7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWtvcmElMjBmcml0dGVycyUyMGluZGlhbiUyMHNuYWNrfGVufDF8fHx8MTc3MDc5ODIwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 9,
      demand: 6.8,
      badge: 'RAINY SPECIAL',
      description: 'Crispy vegetable fritters with chutney'
    },
    { 
      id: 7, 
      name: 'MASALA DOSA', 
      sku: 'DOSA-2024', 
      lot: 'H-281',
      price: 95, 
      basePrice: 55, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1694849789325-914b71ab4075?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBkb3NhJTIwY3Jpc3B5JTIwaW5kaWFufGVufDF8fHx8MTc3MDc5ODIwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 6,
      demand: 9.1,
      badge: 'PREMIUM',
      description: 'Crispy rice crepe with potato filling'
    },
    { 
      id: 8, 
      name: 'ALOO PARATHA', 
      sku: 'PARA-2024', 
      lot: 'I-165',
      price: 68, 
      basePrice: 40, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1710173856676-ccdb9b297d35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9vJTIwcGFyYXRoYSUyMGZsYXRicmVhZCUyMGluZGlhbnxlbnwxfHx8fDE3NzA3OTgyMDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 11,
      demand: 7.5,
      badge: 'HEARTY',
      description: 'Stuffed flatbread with spiced potato'
    },
    { 
      id: 9, 
      name: 'BHEL PURI', 
      sku: 'BHEL-2024', 
      lot: 'J-192',
      price: 38, 
      basePrice: 20, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1769019401093-38f564d6408a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaGVsJTIwcHVyaSUyMGNoYWF0JTIwc25hY2t8ZW58MXx8fHwxNzcwNzk4MjA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 14,
      demand: 6.9,
      badge: 'TANGY',
      description: 'Puffed rice mix with tamarind sauce'
    },
    { 
      id: 10, 
      name: 'VEG SANDWICH', 
      sku: 'SAND-2024', 
      lot: 'K-234',
      price: 55, 
      basePrice: 35, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1676300187347-6f60002fd83e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGdyaWxsZWQlMjB2ZWdldGFibGV8ZW58MXx8fHwxNzcwNzk4MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 20,
      demand: 7.7,
      badge: 'HEALTHY',
      description: 'Grilled sandwich with fresh vegetables'
    },
    { 
      id: 11, 
      name: 'BUTTER NAAN', 
      sku: 'NAAN-2024', 
      lot: 'L-176',
      price: 42, 
      basePrice: 25, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1667203808951-4b558e12c4a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBuYWFuJTIwYnJlYWQlMjBpbmRpYW58ZW58MXx8fHwxNzcwNzk4MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 16,
      demand: 6.3,
      badge: 'FRESH',
      description: 'Soft tandoor bread with melted butter'
    },
    { 
      id: 12, 
      name: 'FRENCH FRIES', 
      sku: 'FRIE-2024', 
      lot: 'M-298',
      price: 52, 
      basePrice: 30, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1734774797087-b6435057a15e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllcyUyMGdvbGRlbiUyMGNyaXNweXxlbnwxfHx8fDE3NzA3NTA2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 22,
      demand: 8.5,
      badge: 'CRISPY',
      description: 'Golden crispy potato fries with salt'
    },
    { 
      id: 13, 
      name: 'VEG BURGER', 
      sku: 'BURG-2024', 
      lot: 'N-245',
      price: 88, 
      basePrice: 50, 
      flash: false,
      image: 'https://images.unsplash.com/photo-1633070962060-6fae2bc680fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjB2ZWdldGFibGUlMjBpbmRpYW58ZW58MXx8fHwxNzcwNzk4MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 8,
      demand: 9.2,
      badge: 'LOADED',
      description: 'Juicy veggie patty with cheese and sauces'
    }
  ]);

  const [selectedProductId, setSelectedProductId] = useState(0);

  // Get the currently selected product
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Simulate price changes for market ticker products
  useEffect(() => {
    const intervals = products.map((product) => {
      return setInterval(() => {
        setProducts(prevProducts => 
          prevProducts.map(p => {
            if (p.id === product.id) {
              const priceChange = Math.random() > 0.5 ? 1 : -1;
              const minPrice = Math.floor(p.basePrice * 0.8);
              const maxPrice = Math.floor(p.basePrice * 2.5);
              const newPrice = Math.max(minPrice, Math.min(maxPrice, p.price + priceChange));
              
              // Trigger flash off after short delay
              setTimeout(() => {
                setProducts(prev => 
                  prev.map(item => item.id === product.id ? { ...item, flash: false } : item)
                );
              }, 300);
              
              return { ...p, price: newPrice, flash: true };
            }
            return p;
          })
        );
      }, Math.random() * 4000 + 3000); // Random between 3-7 seconds
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-[#1f1f28] bg-[#0f0f14]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00cc6e] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">CANTEEN STOCK MARKET</h1>
                <p className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  LIVE TRADING FLOOR
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-[#1a1a24] rounded-lg border border-[#2a2a38]">
                <Activity className="w-4 h-4 text-[#00ff88]" />
                <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  MARKET OPEN
                </span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#1a1a24] rounded-lg border border-[#2a2a38]">
                <Users className="w-4 h-4 text-[#666677]" />
                <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  247 ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Product Card */}
        <div className="relative bg-gradient-to-br from-[#151520] to-[#0f0f14] border-2 border-[#ff2b47] rounded-2xl overflow-hidden shadow-2xl">
          {/* Flash Effect */}
          <div 
            className={`absolute inset-0 bg-[#ff2b47] pointer-events-none transition-opacity duration-300 ${
              selectedProduct.flash ? 'opacity-20' : 'opacity-0'
            }`}
          ></div>
          
          {/* Live Viewers Badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="flex items-center space-x-2 px-4 py-2 bg-[#ff2b47] rounded-full shadow-lg animate-pulse">
              <Eye className="w-5 h-5 text-white" />
              <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                42 Students Watching
              </span>
            </div>
          </div>

          {/* Warning Labels */}
          <div className="absolute top-4 left-4 z-20 flex space-x-2">
            <div className="px-3 py-1.5 bg-[#ff2b47] rounded-lg animate-pulse">
              <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                DEMAND HIGH!
              </span>
            </div>
            <div className="px-3 py-1.5 bg-[#ff6b00] rounded-lg">
              <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                SURGE PRICING ACTIVE
              </span>
            </div>
          </div>

          <div className="relative p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Product Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff2b47] to-[#ff6b00] opacity-20 blur-3xl"></div>
                <div className="relative rounded-xl overflow-hidden border-4 border-[#2a2a38] shadow-2xl">
                  <ImageWithFallback
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-[300px] lg:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-[#ff2b47] rounded-md mb-3">
                    <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {selectedProduct.badge}
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-[#888899] text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    SKU: {selectedProduct.sku} | LOT: {selectedProduct.lot}
                  </p>
                </div>

                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[#666677] text-lg" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      CURRENT PRICE
                    </span>
                    <div className="flex items-center space-x-1 text-[#ff2b47]">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        +{Math.round(((selectedProduct.price - selectedProduct.basePrice) / selectedProduct.basePrice) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div 
                    className={`text-[#ff2b47] font-black tracking-tighter transition-all duration-300 ${
                      selectedProduct.flash ? 'scale-105' : 'scale-100'
                    }`}
                    style={{ 
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(4rem, 12vw, 8rem)',
                      lineHeight: '1',
                      textShadow: selectedProduct.flash ? '0 0 50px rgba(255, 43, 71, 0.8)' : '0 0 30px rgba(255, 43, 71, 0.5)'
                    }}
                  >
                    ₹{selectedProduct.price}
                  </div>
                  <div className="flex items-center space-x-3 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <span className="text-[#666677]">BASE PRICE:</span>
                    <span className="line-through text-[#444455]">₹{selectedProduct.basePrice}</span>
                    <span className="text-[#ff2b47] font-bold">↑ ₹{selectedProduct.price - selectedProduct.basePrice}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1a24] border border-[#2a2a38] rounded-lg p-4">
                    <div className="text-[#666677] text-xs mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      STOCK LEFT
                    </div>
                    <div className="text-2xl font-bold text-[#ff2b47]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {selectedProduct.stock.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[#666677] text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      units remaining
                    </div>
                  </div>
                  <div className="bg-[#1a1a24] border border-[#2a2a38] rounded-lg p-4">
                    <div className="text-[#666677] text-xs mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      DEMAND LEVEL
                    </div>
                    <div className="text-2xl font-bold text-[#ff6b00]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {selectedProduct.demand.toFixed(1)}
                    </div>
                    <div className="text-[#666677] text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      out of 10
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#00ff88] hover:bg-[#00cc6e] text-black font-black py-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]">
                  <span className="text-2xl tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    LOCK PRICE NOW
                  </span>
                </button>

                <div className="bg-[#1a1a24] border border-[#2a2a38] rounded-lg p-3">
                  <p className="text-xs text-[#888899]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    ⚠️ PRICE VOLATILITY: Prices may change based on real-time demand. Lock your order to secure current pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Ticker */}
        <div className="mt-8 bg-[#151520] border border-[#2a2a38] rounded-xl p-6">
          <h3 className="text-sm text-[#666677] mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            LIVE MARKET UPDATES
          </h3>
          <div className="space-y-3">
            {products.filter(p => p.id !== selectedProductId).map((product, index, filteredArray) => {
              const percentChange = Math.round(((product.price - product.basePrice) / product.basePrice) * 100);
              const isPositive = percentChange >= 0;
              const isHighSurge = percentChange >= 70;
              
              return (
                <button
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`w-full flex items-center justify-between py-3 px-2 transition-all duration-300 hover:bg-[#1a1a24] rounded-lg cursor-pointer ${
                    index < filteredArray.length - 1 ? 'border-b border-[#2a2a38]' : ''
                  } ${product.flash ? 'bg-[#ff2b47]/10' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {product.name}
                    </span>
                    <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      SKU: {product.sku}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span 
                      className={`text-sm font-bold transition-all duration-300 ${
                        product.flash ? 'scale-110' : 'scale-100'
                      }`}
                      style={{ 
                        fontFamily: "'JetBrains Mono', monospace",
                        textShadow: product.flash ? '0 0 10px rgba(255, 43, 71, 0.6)' : 'none'
                      }}
                    >
                      ₹{product.price}
                    </span>
                    <span 
                      className={`text-xs flex items-center space-x-1 ${
                        isHighSurge ? 'text-[#ff2b47]' : 'text-[#00ff88]'
                      }`}
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      <span>{isPositive ? '+' : ''}{percentChange}%</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#1f1f28] bg-[#0f0f14] mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <p className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              © 2026 CANTEEN STOCK MARKET. All prices subject to real-time fluctuation.
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                SYSTEM OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}