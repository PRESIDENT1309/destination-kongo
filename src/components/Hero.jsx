import { ArrowRight, Hotel, MapPin, Mountain, Search, Utensils } from "lucide-react";
import heroImage from "../assets/hero.png";

export default function Hero({
  setCurrentPage,
  searchQuery,
  setSearchQuery,
}) {
  const quickLinks = [
    { label: "Hôtels", page: "hotels", icon: Hotel },
    { label: "Restaurants", page: "restaurants", icon: Utensils },
    { label: "Sites", page: "sites", icon: Mountain },
  ];

  return (
    <header className="relative min-h-[92svh] overflow-hidden bg-gray-950 pt-24 text-white">
      <img
        src={heroImage}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        alt="Destination touristique en RDC"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92),rgba(15,23,42,0.62),rgba(15,23,42,0.18))]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(92svh-6rem)] max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <MapPin size={14} />
            République Démocratique du Congo
          </div>

          <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl lg:text-7xl">
            Explorez la RDC autrement
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
            Hôtels, restaurants et sites touristiques réunis dans une seule plateforme.
          </p>

          <div className="mt-8 w-full max-w-2xl rounded-lg border border-white/15 bg-white p-2 shadow-2xl shadow-black/20">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex min-h-12 flex-1 items-center gap-3 rounded-md bg-gray-50 px-4 text-gray-700">
                <Search size={18} className="text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un hôtel, restaurant ou site"
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400"
                />
              </label>

              <button
                onClick={() => setCurrentPage("hotels", { preserveFilters: true })}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 text-sm font-black text-white transition hover:bg-blue-800"
              >
                Explorer
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickLinks.map(({ label, page, icon: Icon }) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page, { preserveFilters: true })}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-gray-950"
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-white/15 rounded-lg border border-white/15 bg-white/10 p-4 text-center backdrop-blur">
            <div>
              <dt className="text-2xl font-black">26</dt>
              <dd className="text-xs font-semibold text-white/65">Provinces</dd>
            </div>
            <div>
              <dt className="text-2xl font-black">24/7</dt>
              <dd className="text-xs font-semibold text-white/65">Support</dd>
            </div>
            <div>
              <dt className="text-2xl font-black">DK</dt>
              <dd className="text-xs font-semibold text-white/65">RDC locale</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  );
}
