import { useEffect, useState } from 'react';
import { Star, MapPin, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { View } from '../types';

interface RestaurantDetailViewProps {
  onNavigate: (view: View) => void;
  restaurant: any;
  cartItems: any[];
  setCartItems: any;
}

export default function RestaurantDetailView({ onNavigate, restaurant, cartItems, setCartItems }: RestaurantDetailViewProps) {

  const [activeTab, setActiveTab] = useState('Populer');
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const addToCart = (item: any) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id_menu === item.id_menu);
    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id_menu === item.id_menu
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...item,
          quantity: 1
        }
      ]);
    }
  };

  useEffect(() => {
    if (!restaurant) return;
    fetch(`http://localhost:5000/api/menu/${restaurant.id_restoran}`)
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
      })
      .catch((err) => console.log(err));
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Restoran tidak ditemukan
          </h1>
          <button onClick={() => onNavigate('home')} className="bg-primary text-white px-4 py-2 rounded-lg">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cartItems.reduce((total, item) => total + item.harga * item.quantity, 0);
  const total = subtotal + 15000;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200" alt="Restaurant Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:px-24 pb-12">
          <div className="max-w-[1440px] mx-auto w-full">
            <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-white/80 text-xs font-semibold mb-6 hover:text-white transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Beranda / Restoran / {restaurant.nama_restoran}
            </button>
            <h1 className="text-white text-3xl md:text-5xl font-black mb-4">
              {restaurant.nama_restoran}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white text-sm font-semibold">
              <div className="flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-2" />
                <span>{restaurant.rating_avg}</span>
                <span className="text-white/70 ml-2 font-normal">(500+ Rating)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-container" />
                <span>{restaurant.alamat}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">

        {/* Menu Content */}
        <div className="flex-1">

          {/* Tab Navigation */}
          <div className="sticky top-16 bg-surface z-40 border-b border-outline-variant mb-12 flex overflow-x-auto scrollbar-hide">
            {['Populer', 'Paket Hemat', 'Sampingan', 'Minuman'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-sm font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${activeTab === tab ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-primary'}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Menu Sections */}
          <div className="space-y-16">
            <section>
              <h2 className="text-2xl font-black mb-8">{activeTab}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map((item) => (
                  <div key={item.id_menu} className="bg-white p-4 rounded-2xl shadow-soft border border-transparent hover:border-primary/10 transition-all flex gap-4 group">
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {item.nama_menu}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                        {item.deskripsi}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="text-lg font-black">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.harga)}
                        </span>
                        <button onClick={() => addToCart(item)} className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400" alt={item.nama_menu} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar: Cart Summary */}
        <aside className="w-full lg:w-[400px]">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-primary-container p-6">
                <div className="flex items-center justify-between text-on-primary-container">
                  <h3 className="text-xl font-bold">
                    Keranjang Belanja
                  </h3>
                  <div className="bg-on-primary-container text-primary-container px-3 py-1 rounded-lg font-black text-xs">
                    {cartItems.length} Item
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-6">

                {/* Cart Items */}
                {cartItems.length === 0 ? (

                  <p className="text-sm text-slate-500">
                    Keranjang masih kosong
                  </p>

                ) : (

                  cartItems.map((item) => (

                    <div key={item.id_menu} className="flex justify-between items-start gap-4 pb-6 border-b border-slate-50">
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{item.nama_menu}</h4>
                        <div className="flex items-center gap-4 mt-3">
                          <button className="w-7 h-7 border border-outline-variant rounded-lg flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="w-7 h-7 border border-outline-variant rounded-lg flex items-center justify-center text-primary hover:bg-primary/5 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <span className="text-sm font-bold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.harga * item.quantity)}
                      </span>
                    </div>
                  ))
                )}

                {/* Pricing Summary */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Subtotal</span>
                    <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-sm">
                    <span>Biaya Pengiriman</span>
                    <span>Rp 15.000</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-black pt-4 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-primary">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total)}</span>
                  </div>
                </div>

                <button onClick={() => onNavigate('checkout')} className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2">
                  Konfirmasi Pesanan
                </button>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-amber-100/50 border border-amber-200 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900">Hemat Rp 20.000!</p>
                <p className="text-xs text-amber-700/80">Gunakan voucher MAKANHEMAT</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}