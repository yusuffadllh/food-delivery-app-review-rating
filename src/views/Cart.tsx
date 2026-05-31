import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ChevronRight, Tag } from 'lucide-react';
import { View } from '../types';

interface CartViewProps {
  onNavigate: (view: View) => void;
  cartItems: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function CartView({ onNavigate, cartItems, setCartItems }: CartViewProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Cart Section */}
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-12">
            <button 
              onClick={() => onNavigate('home')}
              className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary hover:shadow-soft transition-all cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl font-black">Keranjang Saya</h1>
          </div>

          <div className="bg-white rounded-[40px] p-8 shadow-soft border border-slate-50 relative overflow-hidden">
            <div className="space-y-12">
              {/* Restaurant Header */}
              <div className="flex items-center justify-between pb-8 border-b border-slate-50">
                <div className="flex items-center gap-6">
                  <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=120" 
                    alt="Resto" 
                    className="w-20 h-20 rounded-3xl object-cover shadow-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-black">Pizza Hut - Sudirman</h2>
                    <p className="text-slate-400 text-sm font-semibold">1.2 km dari lokasimu</p>
                  </div>
                </div>
                <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline">Tambah Item</button>
              </div>

              {/* Items */}
              <div className="space-y-10">
                {[1, 2].map((item) => (
                  <div key={item} className="flex flex-col md:flex-row items-center gap-8 group">
                    <img 
                      src={item === 1 ? 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=200' : 'https://images.unsplash.com/photo-1512058560366-cd2429598632?auto=format&fit=crop&q=80&w=200'} 
                      alt="Item" 
                      className="w-32 h-32 rounded-3xl object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">{item === 1 ? 'Meat Lovers Pizza' : 'Chicken Katsu Curry'}</h3>
                      <p className="text-slate-400 text-xs font-semibold leading-relaxed max-w-md">Ekstra Keju, Pinggiran Stuffed Crust, Ukuran Large.</p>
                      <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                        <button className="w-10 h-10 rounded-xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all active:scale-90"><Minus className="w-4 h-4" /></button>
                        <span className="text-lg font-black w-8 text-center">1</span>
                        <button className="w-10 h-10 rounded-xl border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all active:scale-90"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-4">
                      <span className="text-2xl font-black text-on-surface">Rp {item === 1 ? '145.000' : '68.000'}</span>
                      <button className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Summary Sidebar */}
        <aside className="w-full lg:w-[450px]">
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Promo Card */}
            <section className="bg-primary/5 rounded-[40px] p-8 border-2 border-primary/10 group cursor-pointer hover:bg-primary/[0.08] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Tag className="w-8 h-8 fill-white/20" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">Gunakan Promo?</h3>
                    <p className="text-slate-500 text-xs font-semibold">Ada 3 voucher menunggu kamu!</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-primary" />
              </div>
            </section>

            {/* Total Balance Card */}
            <section className="bg-white rounded-[40px] p-10 shadow-2xl border border-slate-50 overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-10">Ringkasan Biaya</h3>
                
                <div className="space-y-6 pt-2">
                  <div className="flex justify-between items-center text-slate-500 font-semibold">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-base text-on-surface font-black">Rp 213.000</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500 font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Ongkos Kirim</span>
                      <span className="bg-primary-container/30 text-primary text-[8px] px-1.5 py-0.5 rounded font-black">DISKON</span>
                    </div>
                    <span className="text-base text-on-surface font-black">Rp 12.000</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 font-semibold">
                    <span className="text-sm">Biaya Layanan</span>
                    <span className="text-base font-black">Rp 3.000</span>
                  </div>
                  
                  <div className="border-t border-dashed border-slate-100 my-8 pt-8 flex justify-between items-center">
                    <span className="text-lg font-black">Total Akhir</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-primary block">Rp 228.000</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">PPN Termasuk</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => onNavigate('checkout')}
                  className="w-full bg-primary text-white py-6 rounded-[32px] font-black text-xl shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-10 cursor-pointer shadow-primary/20"
                >
                  Checkout <ChevronRight className="w-6 h-6 border-2 border-white/20 rounded-full" />
                </button>
              </div>
              
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            </section>

            {/* Empty Cart Message (Reference) */}
            <div className="hidden flex flex-col items-center py-20 text-center">
              <div className="w-32 h-32 bg-surface-container rounded-full flex items-center justify-center text-slate-300 mb-8">
                <ShoppingBag className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-black mb-4">Keranjang Kosong</h3>
              <p className="text-slate-400 mb-8">Sepertinya perutmu sedang berbunyi. Ayo mulai memesan!</p>
              <button 
                onClick={() => onNavigate('home')}
                className="bg-primary text-white px-12 py-4 rounded-3xl font-bold shadow-lg"
              >
                Cari Makan
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
