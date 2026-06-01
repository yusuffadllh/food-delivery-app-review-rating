import { MapPin, Clock, Star, Pizza, UtensilsCrossed, Cherry, IceCream, Fish, Coffee } from 'lucide-react';
import { View } from '../types';
import { useEffect, useState } from 'react';

const POPULAR_CATEGORIES = [
  { name: 'Pizza', icon: <Pizza className="w-6 h-6" /> },
  { name: 'Mie', icon: <UtensilsCrossed className="w-6 h-6" /> },
  { name: 'Burger', icon: <Cherry className="w-6 h-6" /> },
  { name: 'Es Krim', icon: <IceCream className="w-6 h-6" /> },
  { name: 'Ikan', icon: <Fish className="w-6 h-6" /> },
  { name: 'Kopi', icon: <Coffee className="w-6 h-6" /> },
];

interface HomeViewProps {
  onNavigate: (view: View) => void;
  setSelectedRestaurant: (restaurant: any) => void;
}

export default function HomeView({ onNavigate, setSelectedRestaurant }: HomeViewProps) {

  const [restaurants, setRestaurants] = useState<any[]>([]);

useEffect(() => {
  fetch("http://localhost:5000/api/restaurants")
    .then((res) => res.json())
    .then((data) => {
      console.log("Restaurants:", data);
      setRestaurants(data);
    })
    .catch((err) => console.error(err));
}, []);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24 space-y-8">

            <section>
              <h3 className="text-lg font-bold mb-4">Kategori</h3>
              <div className="space-y-3">
                {['Indonesia', 'Barat', 'Jepang', 'Sehat'].map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="rounded border-outline-variant text-primary focus:ring-primary h-5 w-5"/>
                    <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">Harga</h3>
              <div className="flex gap-2">
                {['Rp', 'RpRp', 'RpRpRp'].map((price) => (
                  <button
                    key={price}
                    className="flex-1 py-2 px-1 border border-outline-variant rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors">
                    {price}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Banner */}
          <section className="mb-12 relative rounded-3xl overflow-hidden aspect-[21/9] bg-primary">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1400"
              alt="Promo"
              className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 md:px-16">
              <div className="max-w-md text-white">
                <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                  Diskon Gila-Gilaan Hingga 50%!
                </h2>
                <p className="text-sm md:text-lg mb-8 text-white/90">
                  Pesan menu favoritmu dari restoran pilihan dan nikmati gratis ongkir hari ini.
                </p>
                <button
                  onClick={() => {
                      if (restaurants.length > 0) {
                        setSelectedRestaurant(restaurants[0]);
                        onNavigate('restaurant');
                      }
                    }}          
                  className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer">
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Kategori Populer
            </h2>
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">

              {POPULAR_CATEGORIES.map((cat) => (
                <div
                  key={cat.name}
                  className="flex flex-col items-center gap-3 min-w-[80px] group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    {cat.icon}
                  </div>
                  <span className="text-sm font-semibold">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>

          </section>
          {/* Restaurants */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold">
                Restoran Terdekat
              </h2>
              <button className="text-primary font-bold text-sm hover:underline cursor-pointer">
                Lihat Semua
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {restaurants.map((resto) => (
                <article
                  key={resto.id_restoran}
                    onClick={() => {
                        setSelectedRestaurant(resto);
                        onNavigate('restaurant');
                      }}
                  className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all cursor-pointer group border border-slate-50"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={resto.foto_restoran}
                      alt={resto.nama_restoran}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        Promo
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/95 backdrop-blur-md text-on-surface px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {resto.rating_avg}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold truncate group-hover:text-primary transition-colors">
                        {resto.nama_restoran}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                          resto.status_buka
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        > {resto.status_buka ? "Buka" : "Tutup"}
                      </span>
                    </div>
                    <p className="text-sm text-outline mb-4">
                      {resto.kategori}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        1.2 km
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        20-30 min
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}