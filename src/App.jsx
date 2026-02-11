import { Eye, TrendingUp, AlertTriangle, Users, Activity, Clock, BarChart3, Trophy, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useState, useEffect, useRef } from 'react';

export default function App() {
  // ===== PRICE & MARKET STATE =====
  const [price, setPrice] = useState(120);
  const [priceFlash, setPriceFlash] = useState(false);
  const [priceHistory, setPriceHistory] = useState([120]);
  const [viewers, setViewers] = useState(42);
  const [stockLeft, setStockLeft] = useState(7);
  const [demandLevel, setDemandLevel] = useState(9.4);
  
  // ===== PURCHASE STATE =====
  const [isPurchased, setIsPurchased] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  // ===== TRACKING STATE =====
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalIncrease, setTotalIncrease] = useState(0);
  const [peakPrice, setPeakPrice] = useState(120);
  const [priceChanges, setPriceChanges] = useState(0);
  
  const basePrice = useRef(120);
  const startTime = useRef(Date.now());

  // ===== TIMER (1 second intervals) =====
  useEffect(() => {
    if (!isPurchased) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime.current) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPurchased]);

  // ===== PRICE SURGE ENGINE =====
  useEffect(() => {
    if (isPurchased) return;

    const interval = setInterval(() => {
      // Random price change: mostly increases, occasionally decreases
      const changeDirection = Math.random() > 0.3 ? 1 : -1; // 70% chance of increase
      const changeAmount = Math.floor(Math.random() * 8) + 2; // 2-10 rupees
      const priceChange = changeDirection * changeAmount;
      
      setPrice(prev => {
        const newPrice = Math.max(100, Math.min(200, prev + priceChange)); // Keep between 100-200
        
        // Update price history (keep last 20)
        setPriceHistory(prevHistory => [...prevHistory.slice(-19), newPrice]);
        
        // Update peak price
        setPeakPrice(prevPeak => Math.max(prevPeak, newPrice));
        
        // Update total increase
        setTotalIncrease(newPrice - basePrice.current);
        
        // Track price changes count
        setPriceChanges(prev => prev + 1);
        
        return newPrice;
      });

      // Update viewers (random between 30-80)
      setViewers(Math.floor(Math.random() * 51) + 30);

      // Occasionally decrease stock
      if (Math.random() > 0.7 && stockLeft > 2) {
        setStockLeft(prev => prev - 1);
      }

      // Update demand level based on price
      setDemandLevel(prev => {
        const newDemand = Math.min(10, Math.max(7, prev + (Math.random() - 0.5)));
        return Math.round(newDemand * 10) / 10;
      });

      // Flash effect
      setPriceFlash(true);
      setTimeout(() => setPriceFlash(false), 300);

    }, Math.random() * 2000 + 4000); // Random between 4-6 seconds

    return () => clearInterval(interval);
  }, [isPurchased, stockLeft]);

  // ===== PURCHASE HANDLER =====
  const handlePurchase = () => {
    setPurchasePrice(price);
    setIsPurchased(true);
    setShowPurchaseModal(true);
  };

  // ===== RESET SIMULATION =====
  const resetSimulation = () => {
    setPrice(120);
    setPriceHistory([120]);
    setViewers(42);
    setStockLeft(7);
    setDemandLevel(9.4);
    setIsPurchased(false);
    setPurchasePrice(0);
    setShowPurchaseModal(false);
    setTimeElapsed(0);
    setTotalIncrease(0);
    setPeakPrice(120);
    setPriceChanges(0);
    startTime.current = Date.now();
  };

  // ===== MARKET CRASH (Happy Hour) =====
  const triggerHappyHour = () => {
    setPrice(80);
    setPriceHistory([80]);
    setDemandLevel(5.0);
    alert('🎉 HAPPY HOUR ACTIVATED! Prices crashed!');
  };

  // ===== HELPER FUNCTIONS =====
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVerdict = () => {
    const diff = purchasePrice - basePrice.current;
    const percentIncrease = ((diff / basePrice.current) * 100).toFixed(0);
    
    if (diff <= 0) return { emoji: '🎉', text: 'AMAZING DEAL!', color: '#00ff88' };
    if (diff <= 10) return { emoji: '✅', text: 'GOOD TIMING', color: '#00ff88' };
    if (diff <= 30) return { emoji: '😬', text: 'COULD BE BETTER', color: '#ff6b00' };
    return { emoji: '😰', text: 'YOU OVERPAID', color: '#ff2b47' };
  };

  const getSavingsMessage = () => {
    const diff = purchasePrice - basePrice.current;
    if (diff > 0) return `You paid ₹${diff} extra (${((diff/basePrice.current)*100).toFixed(0)}% more)`;
    return `You saved ₹${Math.abs(diff)}!`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Purchase Success Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151520] border-2 border-[#00ff88] rounded-2xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setShowPurchaseModal(false)}
              className="absolute top-4 right-4 text-[#666677] hover:text-white"
            >
              ✕
            </button>
            
            <div className="text-center space-y-6">
              <div className="text-6xl">{getVerdict().emoji}</div>
              
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: getVerdict().color }}>
                  {getVerdict().text}
                </h2>
                <p className="text-[#888899]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ORDER CONFIRMED
                </p>
              </div>

              <div className="bg-[#1a1a24] border border-[#2a2a38] rounded-lg p-6 space-y-3">
                <div className="flex justify-between text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[#666677]">Base Price:</span>
                  <span className="text-white font-bold">₹{basePrice.current}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[#666677]">Your Price:</span>
                  <span className="text-white font-bold">₹{purchasePrice}</span>
                </div>
                <div className="flex justify-between text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <span className="text-[#666677]">Peak Price:</span>
                  <span className="text-white font-bold">₹{peakPrice}</span>
                </div>
                <div className="border-t border-[#2a2a38] pt-3">
                  <div className="flex justify-between text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <span className="text-[#666677]">Time Waited:</span>
                    <span className="text-white font-bold">{formatTime(timeElapsed)}</span>
                  </div>
                </div>
                <div className="bg-[#0f0f14] rounded p-3">
                  <p className="text-xs text-[#888899]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {getSavingsMessage()}
                  </p>
                </div>
              </div>

              <button 
                onClick={resetSimulation}
                className="w-full bg-[#00ff88] hover:bg-[#00cc6e] text-black font-bold py-4 rounded-xl transition-all"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[#1f1f28] bg-[#0f0f14]">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00cc6e] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">JIMS CANTEEN STOCK MARKET</h1>
                <p className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  LIVE TRADING FLOOR
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap gap-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#1a1a24] rounded-lg border border-[#2a2a38]">
                <Clock className="w-4 h-4 text-[#00ff88]" />
                <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {formatTime(timeElapsed)}
                </span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#1a1a24] rounded-lg border border-[#2a2a38]">
                <Users className="w-4 h-4 text-[#666677]" />
                <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {viewers} ONLINE
                </span>
              </div>
              {!isPurchased && (
                <button
                  onClick={resetSimulation}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-[#2a2a38] hover:bg-[#3a3a48] rounded-lg border border-[#3a3a48] transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    RESET
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Dashboard */}
        {!isPurchased && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#151520] border border-[#2a2a38] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#ff2b47]" />
                <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  SURGE
                </span>
              </div>
              <div className="text-xl font-bold text-[#ff2b47]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                +₹{totalIncrease}
              </div>
              <div className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {totalIncrease >= 0 ? '+' : ''}{((totalIncrease / basePrice.current) * 100).toFixed(0)}%
              </div>
            </div>

            <div className="bg-[#151520] border border-[#2a2a38] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="w-4 h-4 text-[#ff6b00]" />
                <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  PEAK
                </span>
              </div>
              <div className="text-xl font-bold text-[#ff6b00]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                ₹{peakPrice}
              </div>
              <div className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                highest seen
              </div>
            </div>

            <div className="bg-[#151520] border border-[#2a2a38] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  CHANGES
                </span>
              </div>
              <div className="text-xl font-bold text-[#00ff88]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {priceChanges}
              </div>
              <div className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                price updates
              </div>
            </div>

            <div className="bg-[#151520] border border-[#2a2a38] rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-[#666677]" />
                <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  STATUS
                </span>
              </div>
              <div className="text-xl font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {totalIncrease > 20 ? '🔥' : totalIncrease > 10 ? '📈' : '↗️'}
              </div>
              <div className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {totalIncrease > 20 ? 'EXTREME' : totalIncrease > 10 ? 'HIGH' : 'MODERATE'}
              </div>
            </div>
          </div>
        )}

        {/* Hero Product Card */}
        <div className={`relative bg-gradient-to-br from-[#151520] to-[#0f0f14] rounded-2xl overflow-hidden shadow-2xl transition-all ${
          isPurchased ? 'border-2 border-[#00ff88]' : 'border-2 border-[#ff2b47]'
        }`}>
          {/* Flash Effect */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
              priceFlash ? 'opacity-20' : 'opacity-0'
            }`}
            style={{ backgroundColor: isPurchased ? '#00ff88' : '#ff2b47' }}
          ></div>

          {/* Purchase Badge */}
          {isPurchased && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="px-6 py-3 bg-[#00ff88] rounded-full shadow-lg">
                <span className="text-lg font-bold text-black" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ✅ LOCKED AT ₹{purchasePrice}
                </span>
              </div>
            </div>
          )}
          
          {/* Live Viewers Badge */}
          {!isPurchased && (
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center space-x-2 px-4 py-2 bg-[#ff2b47] rounded-full shadow-lg animate-pulse">
                <Eye className="w-5 h-5 text-white" />
                <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {viewers} WATCHING
                </span>
              </div>
            </div>
          )}

          {/* Warning Badges */}
          {!isPurchased && (
            <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#ff2b47] rounded-lg">
                <AlertTriangle className="w-4 h-4 text-white" />
                <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  DEMAND HIGH!
                </span>
              </div>
              <div className="px-3 py-1.5 bg-[#ff6b00] rounded-lg">
                <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  SURGE ACTIVE
                </span>
              </div>
            </div>
          )}

          <div className="relative p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Product Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff2b47] to-[#ff6b00] opacity-20 blur-3xl"></div>
                <div className="relative rounded-xl overflow-hidden border-4 border-[#2a2a38] shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1713780131281-61ec701ebb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMG1hZ2dpJTIwbm9vZGxlcyUyMGJvd2wlMjBzdGVhbXxlbnwxfHx8fDE3NzA3OTMyNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Spicy Maggi"
                    className="w-full h-[300px] lg:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                
                {/* Price History Mini Chart */}
                {priceHistory.length > 1 && !isPurchased && (
                  <div className="mt-4 bg-[#1a1a24] border border-[#2a2a38] rounded-lg p-4">
                    <div className="text-xs text-[#666677] mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      📊 PRICE MOVEMENT
                    </div>
                    <div className="flex items-end justify-between h-16 gap-1">
                      {priceHistory.slice(-15).map((p, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-gradient-to-t from-[#ff2b47] to-[#ff6b00] rounded-t transition-all"
                          style={{
                            height: `${(p / Math.max(...priceHistory)) * 100}%`,
                            opacity: idx === priceHistory.length - 1 && priceFlash ? 1 : 0.7
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-[#ff2b47] rounded-md mb-3">
                    <span className="text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      HOT ITEM
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2">SPICY MAGGI</h2>
                  <p className="text-[#888899] text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    SKU: MGGI-2024-SP | LOT: A-127
                  </p>
                </div>

                {/* Price Section */}
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[#666677] text-lg" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {isPurchased ? 'LOCKED PRICE' : 'CURRENT PRICE'}
                    </span>
                    {!isPurchased && (
                      <div className="flex items-center space-x-1 text-[#ff2b47]">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                          +{((totalIncrease / basePrice.current) * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div 
                    className={`font-black tracking-tighter transition-all duration-300 ${
                      priceFlash && !isPurchased ? 'scale-105' : 'scale-100'
                    }`}
                    style={{ 
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(4rem, 12vw, 8rem)',
                      lineHeight: '1',
                      color: isPurchased ? '#00ff88' : '#ff2b47',
                      textShadow: priceFlash && !isPurchased 
                        ? '0 0 50px rgba(255, 43, 71, 0.8)' 
                        : isPurchased 
                        ? '0 0 30px rgba(0, 255, 136, 0.5)'
                        : '0 0 30px rgba(255, 43, 71, 0.5)'
                    }}
                  >
                    ₹{isPurchased ? purchasePrice : price}
                  </div>
                  <div className="flex items-center space-x-3 text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <span className="text-[#666677]">BASE PRICE:</span>
                    <span className="line-through text-[#444455]">₹{basePrice.current}</span>
                    {!isPurchased && (
                      <span className="text-[#ff2b47] font-bold">↑ ₹{totalIncrease}</span>
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
                      {stockLeft < 10 ? '0' : ''}{stockLeft}
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
                      {demandLevel.toFixed(1)}
                    </div>
                    <div className="text-[#666677] text-xs mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      out of 10
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {!isPurchased ? (
                  <button 
                    onClick={handlePurchase}
                    className="w-full bg-[#00ff88] hover:bg-[#00cc6e] text-black font-black py-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]"
                  >
                    <span className="text-2xl tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      LOCK PRICE NOW
                    </span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-[#00ff88] text-black font-black py-6 rounded-xl text-center">
                      <span className="text-2xl tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        ✅ ORDER CONFIRMED
                      </span>
                    </div>
                    <button 
                      onClick={resetSimulation}
                      className="w-full bg-[#2a2a38] hover:bg-[#3a3a48] text-white font-bold py-4 rounded-xl transition-all"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      TRY AGAIN
                    </button>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-[#1a1a24] border border-[#2a2a38] rounded-lg p-3">
                  <p className="text-xs text-[#888899]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {isPurchased 
                      ? `✅ Your order is locked. ${getSavingsMessage()}`
                      : '⚠️ PRICE VOLATILITY: Prices change every 4-6 seconds based on demand. Lock now to secure current price.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Ticker */}
        <div className="mt-8 bg-[#151520] border border-[#2a2a38] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              LIVE MARKET UPDATES
            </h3>
            {!isPurchased && (
              <button
                onClick={triggerHappyHour}
                className="text-xs px-3 py-1.5 bg-[#ff6b00] hover:bg-[#ff5500] rounded-lg transition-all"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                📉 HAPPY HOUR
              </button>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a38]">
              <div className="flex items-center space-x-3">
                <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  COLD COFFEE
                </span>
                <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  SKU: CFEE-2024
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ₹{Math.floor(price * 0.7)}
                </span>
                <span className="text-xs text-[#00ff88] flex items-center space-x-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <TrendingUp className="w-3 h-3" />
                  <span>+45%</span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a38]">
              <div className="flex items-center space-x-3">
                <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  SAMOSA (2PC)
                </span>
                <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  SKU: SMSA-2024
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ₹{Math.floor(price * 0.27)}
                </span>
                <span className="text-xs text-[#00ff88] flex items-center space-x-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <TrendingUp className="w-3 h-3" />
                  <span>+28%</span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <span className="text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  PANI PURI
                </span>
                <span className="text-xs text-[#666677]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  SKU: PURI-2024
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ₹{Math.floor(price * 0.21)}
                </span>
                <span className="text-xs text-[#ff2b47] flex items-center space-x-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <TrendingUp className="w-3 h-3" />
                  <span>+92%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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