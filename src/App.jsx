import { Eye, TrendingUp, AlertTriangle, Users, Activity, Lock, Check } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1607330289024-ade12d8a4e5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWFuJTIwaW5kaWFuJTIwYnJlYWQlMjBidXR0ZXJ8ZW58MXx8fHwxNzcwNzk4MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stock: 16,
      demand: 7.3,
      badge: 'FRESH',
      description: 'Soft tandoor-baked bread with butter'
    }
  ]);

  const [selectedProductId, setSelectedProductId] = useState(0);
  const [lockedPrices, setLockedPrices] = useState({});
  const [showLockNotification, setShowLockNotification] = useState(false);
  const [lastLockedProduct, setLastLockedProduct] = useState(null);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Simulate real-time price fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(prevProducts => 
        prevProducts.map(product => {
          const fluctuation = (Math.random() - 0.48) * 10;
          const newPrice = Math.max(
            product.basePrice,
            Math.round(product.price + fluctuation)
          );
          
          const flash = Math.abs(newPrice - product.price) > 5;
          
          return {
            ...product,
            price: newPrice,
            flash: flash
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Clear flash effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProducts(prevProducts =>
        prevProducts.map(product => ({
          ...product,
          flash: false
        }))
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [products]);

  const handleLockPrice = () => {
    setLockedPrices(prev => ({
      ...prev,
      [selectedProduct.id]: {
        price: selectedProduct.price,
        timestamp: new Date().toISOString(),
        productName: selectedProduct.name
      }
    }));
    setLastLockedProduct(selectedProduct);
    setShowLockNotification(true);
    
    setTimeout(() => {
      setShowLockNotification(false);
    }, 3000);
  };

  const isLocked = lockedPrices[selectedProduct?.id];

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      {/* Lock Notification */}
      {showLockNotification && (
        <div className="fixed top-4 right-4 z-50 bg-[#00ff88] text-black px-6 py-4 rounded-lg shadow-lg animate-slide-in flex items-center space-x-3">
          <Check className="w-6 h-6" />
          <div>
            <div className="font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              PRICE LOCKED!
            </div>
            <div className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {lastLockedProduct?.name} at ₹{lockedPrices[lastLockedProduct?.id]?.price}
            </div>
          </div>
        </div>
      )}

      <header className="border-b border-[#1f1f28] bg-[#0f0f14] sticky top-0 z-40 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#ff2b47] to-[#ff6b00] p-2 rounded-lg">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  CANTEEN STOCK MARKET
                </h1>
                <p className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Real-time dynamic pricing
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-[#1a1a24] px-3 py-2 rounded-lg border border-[#2a2a38]">
                <Activity className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs text-[#888899]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  LIVE
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-[#1a1a24] px-3 py-2 rounded-lg border border-[#2a2a38]">
                <Eye className="w-4 h-4 text-[#ff6b00]" />
                <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {Math.floor(Math.random() * 50) + 120}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-[#666677] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <AlertTriangle className="w-4 h-4 text-[#ff6b00]" />
            <span>PRICES UPDATE EVERY 3 SECONDS</span>
          </div>
          <h2 className="text-3xl font-black mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            FEATURED PRODUCT
          </h2>
          <p className="text-[#888899] text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {selectedProduct.description}
          </p>
        </div>

        {/* Hero Product Card */}
        <div className="bg-[#151520] border border-[#2a2a38] rounded-2xl overflow-hidden shadow-2xl mb-8">
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden group">
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
                      {isLocked ? 'LOCKED PRICE' : 'CURRENT PRICE'}
                    </span>
                    {!isLocked && (
                      <div className="flex items-center space-x-1 text-[#ff2b47]">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          +{Math.round(((selectedProduct.price - selectedProduct.basePrice) / selectedProduct.basePrice) * 100)}%
                        </span>
                      </div>
                    )}
                    {isLocked && (
                      <div className="flex items-center space-x-1 text-[#00ff88]">
                        <Lock className="w-5 h-5" />
                        <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          SECURED
                        </span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`font-black tracking-tighter transition-all duration-300 ${
                      selectedProduct.flash && !isLocked ? 'scale-105' : 'scale-100'
                    } ${isLocked ? 'text-[#00ff88]' : 'text-[#ff2b47]'}`}
                    style={{ 
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(4rem, 12vw, 8rem)',
                      lineHeight: '1',
                      textShadow: isLocked 
                        ? '0 0 50px rgba(0, 255, 136, 0.8)' 
                        : selectedProduct.flash 
                          ? '0 0 50px rgba(255, 43, 71, 0.8)' 
                          : '0 0 30px rgba(255, 43, 71, 0.5)'
                    }}
                  >
                    ₹{isLocked ? lockedPrices[selectedProduct.id].price : selectedProduct.price}
                  </div>
                  <div className="flex items-center space-x-3 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <span className="text-[#666677]">BASE PRICE:</span>
                    <span className="line-through text-[#444455]">₹{selectedProduct.basePrice}</span>
                    {isLocked ? (
                      <span className="text-[#00ff88] font-bold">🔒 LOCKED</span>
                    ) : (
                      <span className="text-[#ff2b47] font-bold">↑ ₹{selectedProduct.price - selectedProduct.basePrice}</span>
                    )}
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

                <button 
                  onClick={handleLockPrice}
                  disabled={isLocked}
                  className={`w-full font-black py-6 rounded-xl transition-all duration-200 transform shadow-lg ${
                    isLocked 
                      ? 'bg-[#1a1a24] border-2 border-[#00ff88] text-[#00ff88] cursor-not-allowed'
                      : 'bg-[#00ff88] hover:bg-[#00cc6e] text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]'
                  }`}
                >
                  <span className="text-2xl tracking-wide flex items-center justify-center space-x-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {isLocked ? (
                      <>
                        <Lock className="w-6 h-6" />
                        <span>PRICE LOCKED</span>
                      </>
                    ) : (
                      <span>LOCK PRICE NOW</span>
                    )}
                  </span>
                </button>

                <div className="bg-[#1a1a24] border border-[#2a2a38] rounded-lg p-3">
                  <p className="text-xs text-[#888899]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {isLocked 
                      ? `✅ PRICE SECURED: Your price is locked at ₹${lockedPrices[selectedProduct.id].price}. Complete your order to finalize.`
                      : '⚠️ PRICE VOLATILITY: Prices may change based on real-time demand. Lock your order to secure current pricing.'
                    }
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
              const isProductLocked = lockedPrices[product.id];
              
              return (
                <button
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`w-full flex items-center justify-between py-3 px-2 transition-all duration-300 hover:bg-[#1a1a24] rounded-lg cursor-pointer ${
                    index < filteredArray.length - 1 ? 'border-b border-[#2a2a38]' : ''
                  } ${product.flash ? 'bg-[#ff2b47]/10' : ''} ${isProductLocked ? 'bg-[#00ff88]/5' : ''}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {product.name}
                    </span>
                    <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      SKU: {product.sku}
                    </span>
                    {isProductLocked && (
                      <Lock className="w-3 h-3 text-[#00ff88]" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span 
                      className={`text-sm font-bold transition-all duration-300 ${
                        product.flash && !isProductLocked ? 'scale-110' : 'scale-100'
                      } ${isProductLocked ? 'text-[#00ff88]' : ''}`}
                      style={{ 
                        fontFamily: "'JetBrains Mono', monospace",
                        textShadow: product.flash && !isProductLocked ? '0 0 10px rgba(255, 43, 71, 0.6)' : 'none'
                      }}
                    >
                      ₹{isProductLocked ? lockedPrices[product.id].price : product.price}
                    </span>
                    {!isProductLocked && (
                      <span 
                        className={`text-xs flex items-center space-x-1 ${
                          isHighSurge ? 'text-[#ff2b47]' : 'text-[#00ff88]'
                        }`}
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <TrendingUp className="w-3 h-3" />
                        <span>{isPositive ? '+' : ''}{percentChange}%</span>
                      </span>
                    )}
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
