import { useEffect, useState } from 'react';
import { Star, Camera, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { View } from '../types';

interface ReviewViewProps {
  onNavigate: (view: View) => void;
}

export default function ReviewView({ onNavigate }: ReviewViewProps) {
  const [rating, setRating] = useState(4);
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [deliveryRating, setDeliveryRating] = useState(5);

  useEffect(() => {
  const orderId =
    localStorage.getItem("reviewOrderId");

  if (!orderId) return;

  const loadOrder = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reviews/${orderId}`
      );

      const data = await res.json();

      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  };

  loadOrder();
  }, []);

  if (!order) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
    }

  if (submitted) {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black mb-4">Ulasan Terkirim!</h1>
        <p className="text-slate-500 mb-12">Terima kasih telah berbagi pengalaman Anda bersama GrabMakan.</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-primary text-white px-8 py-4 rounded-3xl font-bold shadow-xl hover:brightness-110 active:scale-95 transition-all text-base cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 py-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-soft mb-8 flex flex-col md:flex-row items-center gap-8">
        <img 
          src={order[0]?.gambar_restoran}
          alt={order[0]?.nama_restoran}
          className="w-24 h-24 rounded-2xl object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-black text-[10px] uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4 fill-primary text-white" /> Pesanan Selesai
          </div>
          <h1 className="text-2xl font-black mb-1">{order[0]?.nama_restoran}</h1>
          <p className="text-slate-400 text-sm italic">Order ID: #{order[0]?.id_pesanan}{" • "}{new Date(order[0]?.waktu_pesan).toLocaleString("id-ID")}</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Restaurant Rating */}
        <section className="bg-white rounded-3xl p-8 shadow-soft">
          <h2 className="text-xl font-bold mb-6">Penilaian Restoran</h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex gap-3">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  onClick={() => setDeliveryRating(star)}
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= deliveryRating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['Rasa Enak', 'Porsi Pas', 'Kemasan Rapi'].map((tag) => (
                <button key={tag} className="px-5 py-2.5 rounded-full border border-outline-variant text-sm font-bold hover:bg-primary hover:text-white transition-all cursor-pointer">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Rating */}
        <section className="bg-white rounded-3xl p-8 shadow-soft">
          <h2 className="text-xl font-bold mb-6">Penilaian Pengiriman</h2>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className={`w-10 h-10 ${star <= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold">Sangat Cepat</span>
              {['Ramah', 'Sesuai Prokes'].map((tag) => (
                <button key={tag} className="px-5 py-2.5 rounded-full border border-outline-variant text-sm font-bold hover:bg-primary hover:text-white transition-all cursor-pointer">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Itemized Rating */}
        <section className="bg-white rounded-3xl p-8 shadow-soft">
          <h2 className="text-xl font-bold mb-8">Penilaian Menu</h2>
          <div className="space-y-8">
            {order.map((item:any,index:number) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6 pb-6 border-b border-slate-50 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-6">

              <img
                src="https://via.placeholder.com/80"
                alt={item.nama_menu}
                className="w-16 h-16 rounded-2xl object-cover"
              />

              <div>
                <h3 className="font-bold text-sm mb-1">
                  {item.nama_menu}
                </h3>

                <p className="text-slate-400 text-xs font-semibold">
                  Rp {Number(item.subtotal).toLocaleString("id-ID")}
                </p>
              </div>

            </div>

            <div className="flex gap-1">
              {[1,2,3,4,5].map((star) => (
                <Star
                  key={star}
                  className="w-5 h-5 text-slate-200"
                />
              ))}
            </div>

          </div>
        ))}
          </div>
        </section>

        {/* Comments */}
        <section className="bg-white rounded-3xl p-8 shadow-soft">
          <label className="flex items-center gap-3 text-xl font-bold mb-6">
            <MessageSquare className="w-6 h-6 text-primary" /> Ulasan Lengkap
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-surface-container-low rounded-2xl border-none p-6 text-sm focus:ring-2 focus:ring-primary h-32 transition-all"
            placeholder="Bagikan pengalamanmu lebih detail di sini..."
          />
          <div className="mt-8 flex flex-col md:flex-row gap-6 items-center justify-between">
            <button className="flex items-center gap-3 text-slate-400 font-bold text-sm hover:text-primary transition-colors cursor-pointer">
              <Camera className="w-6 h-6" /> Tambah Foto (Opsional)
            </button>
            <button
                onClick={async () => {
                  try {

                    await fetch(
                      "http://localhost:5000/api/reviews",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          id_pesanan: order[0].id_pesanan,
                          id_pelanggan: 3,
                          rating_restoran: rating,
                          rating_pengiriman: deliveryRating,
                          komentar: comment
                        })
                      }
                    );

                    setSubmitted(true);

                  } catch (err) {
                    console.log(err);
                  }
                }}
                className="w-full md:w-auto bg-primary text-white px-12 py-4 rounded-3xl font-bold text-lg shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Kirim Ulasan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
