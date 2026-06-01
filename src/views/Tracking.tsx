import { useEffect, useState } from 'react';
import { MapPin, Clock, Phone, MessageCircle, ChevronRight, CheckCircle2, Navigation } from 'lucide-react';
import { View } from '../types';

interface TrackingViewProps {
  onNavigate: (view: View) => void;
}

export default function TrackingView({ onNavigate }: TrackingViewProps) {
  const [order, setOrder] = useState<any>(null);
  useEffect(() => {
  const orderId =
    localStorage.getItem("currentOrderId");
  if (!orderId) return;
  const loadOrder = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${orderId}`
      );
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  };
  loadOrder();
  const interval = setInterval(
    loadOrder,
    5000
  );
  return () => clearInterval(interval);
  }, []);
  if (!order) {
  return (
    <div className="p-10 text-center">
      Loading...
    </div>
  );
  }
  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Map & Status */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-50 relative aspect-[16/10] group">
            {/* Mock Map Image */}
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
              alt="Map" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
            {/* Map Overlay UI */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
            
            {/* Driver Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-2xl animate-bounce">
              <div className="bg-primary p-3 rounded-full text-white">
                <Navigation className="w-6 h-6 rotate-45" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg text-[10px] font-black shadow-lg whitespace-nowrap">
                Kurir sedang menuju restoran
              </div>
            </div>

            {/* Destination Pin */}
            <div className="absolute top-[30%] right-[30%] bg-white p-2 rounded-full shadow-xl">
              <div className="bg-amber-500 p-2 rounded-full text-white">
                <MapPin className="w-5 h-5" />
              </div>
            </div>

            {/* Float Menu */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 flex gap-8 items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimasi Tiba</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-black">15 - 20 Ment</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Jarak</span>
                  <span className="text-2xl font-black">1.2 KM</span>
                </div>
              </div>
            </div>
          </section>

          {/* Status Timeline */}
          <section className="bg-white rounded-[40px] p-10 shadow-soft">
            <h2 className="text-2xl font-black mb-10">Status Pesanan #{order.id_pesanan}</h2>
            <div className="space-y-12 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-1 before:bg-slate-50">
              <div className="flex gap-8 relative items-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ring-8 ring-primary/10 z-10 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Menuju Restoran</h3>
                  <p className="text-slate-500 text-sm">Pesanan Anda telah diterima dan kurir sedang dalam perjalanan mengambil pesanan.</p>
                  <p className="text-primary font-black text-[10px] mt-2">12:45 PM</p>
                </div>
              </div>
              <div className="flex gap-8 relative items-start opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-white z-10 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Pesanan Sedang Diproses</h3>
                  <p className="text-slate-500 text-sm">Restoran sedang menyiapkan makanan lezat Anda.</p>
                </div>
              </div>
              <div className="flex gap-8 relative items-start opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-white z-10 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Pesanan Selesai</h3>
                  <p className="text-slate-500 text-sm">Selamat menikmati makanan Anda!</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Driver & Details */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Driver Card */}
          <section className="bg-white rounded-[40px] p-8 shadow-soft border border-slate-50">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200" 
                  alt="Driver" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/10"
                />
                <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-lg">
                  <div className="bg-primary p-1.5 rounded-full text-white">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-black">{order.driver?.nama_kurir}</h3>
              <p className="text-slate-400 text-sm font-bold mt-1">{order.driver?.kendaraan}r</p>
              
              <div className="mt-8 flex gap-4 w-full">
                <button className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer">
                  <Phone className="w-5 h-5 fill-white" /> {order.driver?.no_hp}
                </button>
                <button className="flex-1 bg-surface-container-high text-on-surface py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer">
                  <MessageCircle className="w-5 h-5" /> Chat
                </button>
              </div>
            </div>
          </section>

          {/* Items Summary */}
          <section className="bg-white rounded-[40px] p-8 shadow-soft border border-slate-50">
            <h4 className="text-xl font-black mb-8">Detail Pesanan</h4>
            <div className="space-y-6">
              {order.items?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-4"
                >
                  <div className="flex gap-4">
                    <span className="font-bold text-primary">
                      {item.jumlah}x
                    </span>

                    <div className="text-sm font-bold">
                      {item.nama_menu}
                    </div>
                  </div>

                  <span className="text-sm font-bold">
                    Rp {Number(item.subtotal).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-50 my-8 pt-8 flex justify-between items-center">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-none">Total Pembayaran</span>
              <span className="text-2xl font-black text-primary">Rp {Number(order.total_harga).toLocaleString('id-ID')}</span>
            </div>

            <button 
              onClick={() => onNavigate('history')}
              className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-all group cursor-pointer"
            >
              <span className="font-bold text-sm">Lihat Riwayat Pesanan</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
            </button>
          </section>

          {/* Support */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4 items-center">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <p className="text-xs text-amber-900 font-medium italic">
              Ada kendala dengan pesanan Anda? <button className="font-black underline">Hubungi Bantuan</button>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
