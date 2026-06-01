import { useEffect, useState } from 'react';
import { Search, ShoppingBag, User, ChevronRight, Star, Wallet, ArrowRight, CheckCircle2 } from 'lucide-react';
import { View, Order } from '../types';

interface HistoryViewProps {
  onNavigate: (view: View) => void;
}

export default function HistoryView({ onNavigate }: HistoryViewProps) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const userId = 3;

        const res = await fetch(
          `http://localhost:5000/api/orders/history/${userId}`
        );

        const data = await res.json();

        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadOrders();
  }, []);

  const favorites = [...new Set(
  orders.map(order => order.nama_restoran)
  )].slice(0, 3);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-8">Riwayat Pesanan</h1>
        <div className="flex gap-2 bg-surface-container-low p-1.5 rounded-2xl w-fit">
          {['Semua', 'Sedang Diproses', 'Selesai'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeFilter === filter ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Order List */}
        <div className="lg:col-span-8 space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id_pesanan}
              className="bg-white rounded-3xl p-6 shadow-soft border border-transparent hover:border-slate-100 transition-all group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={order.gambar_restoran} alt={order.gambar_restoran} className={`w-full h-full object-cover ${order.status_pesanan === 'Dibatalkan' ? 'grayscale opacity-60' : ''}`} />
                </div>
                
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{order.nama_restoran}</h3>
                      <p className="text-slate-400 text-xs mt-1">{new Date(order.waktu_pesan).toLocaleString("id-ID")}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      order.status_pesanan === 'Selesai' ? 'bg-primary-container text-on-primary-container' : 
                      order.status_pesanan === 'Dibatalkan' ? 'bg-red-100 text-red-600' : 
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {order.status_pesanan}
                    </span>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex flex-wrap justify-between items-end gap-6">
                    <div>
                      <p className="text-slate-600 text-sm">{order.items ?.map((item:any) => `${item.jumlah}x ${item.nama_menu}`).join(", ")}</p>
                      <p className="text-xl font-black mt-1">Rp {Number(order.total_harga).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {localStorage.setItem("reviewOrderId",order.id_pesanan); onNavigate('review')}}
                        className="px-6 py-2.5 rounded-xl text-primary font-bold text-sm border-2 border-primary hover:bg-primary/5 transition-all cursor-pointer"
                      >
                        Detail
                      </button>
                      <button 
                        onClick={() => onNavigate('restaurant')}
                        className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 shadow-lg active:scale-95 transition-all cursor-pointer"
                      >
                        Pesan Lagi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Stats Card */}
          <div className="bg-primary-container rounded-3xl p-8 text-on-primary-container shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Total Pesanan Bulan Ini</p>
              <h2 className="text-4xl font-black">{orders.length} Pesanan</h2>
              <div className="mt-8 flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-on-primary-container">
                  <Wallet className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold leading-tight">Hemat Rp 45.000 dengan GrabUnlimited</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          {/* Favorites */}
          <div className="bg-white rounded-3xl p-8 shadow-soft border border-slate-50">
            <h4 className="text-lg font-bold mb-6">Pesan lagi dari favoritmu?</h4>
            <div className="space-y-6">
              {favorites.map((fav) => (
                <div
                  key={fav}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100" />

                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {fav}
                    </p>

                    <p className="text-slate-400 text-[10px] font-semibold">
                      Pernah dipesan
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="bg-surface-container-highest rounded-3xl p-8 relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-[10px] font-black uppercase mb-4 inline-block">PROMO</span>
              <h4 className="text-xl font-bold mb-2">Voucher Makan 30%</h4>
              <p className="text-slate-500 text-sm mb-6">Gunakan di restoran pilihan hari ini!</p>
              <button className="text-primary font-black text-sm flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Klaim Sekarang <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
