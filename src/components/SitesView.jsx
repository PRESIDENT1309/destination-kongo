import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Heart,
  BookOpen,
  Compass,
} from "lucide-react";

export default function SitesView({
  establishments = [],
  setViewedPlace,
}) {

  // 🔥 FILTRAGE SITES (SAFE)
  const sites = useMemo(() => {
    if (!Array.isArray(establishments)) return [];

    return establishments.filter((item) => {
      const type = (item?.type || "").trim().toLowerCase();
      return type === "site" || type === "tourist_site";
    });
  }, [establishments]);

  // 🔍 SEARCH
  const [search, setSearch] = useState("");

  // 🌍 CITY FILTER
  const [selectedCity, setSelectedCity] =
    useState("Toutes");

  // 📦 PAGINATION
  const [visibleCount, setVisibleCount] =
    useState(9);

  // 🏙️ CITIES LIST (SAFE)
  const cities = useMemo(() => {
    const list = sites
      .map((s) => s?.city)
      .filter(Boolean);

    return ["Toutes", ...new Set(list)];
  }, [sites]);

  // 🔎 GLOBAL FILTER
  const filteredSites = useMemo(() => {
    const q = search.toLowerCase();

    return sites.filter((site) => {

      const matchSearch =
        (site?.name || "").toLowerCase().includes(q) ||
        (site?.description || "").toLowerCase().includes(q) ||
        (site?.story || "").toLowerCase().includes(q) ||
        (site?.city || "").toLowerCase().includes(q) ||
        (site?.address || "").toLowerCase().includes(q) ||
        (site?.specialty || "").toLowerCase().includes(q);

      const matchCity =
        selectedCity === "Toutes" ||
        site?.city === selectedCity;

      return matchSearch && matchCity;
    });
  }, [sites, search, selectedCity]);

  const displayedSites =
    filteredSites.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* HERO */}
      <div className="relative h-[420px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5"
          className="w-full h-full object-cover"
          alt="sites"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center justify-center p-6">

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[35px] p-8 w-full max-w-5xl">

            <h1 className="text-white text-5xl md:text-6xl font-black text-center">
              Explorez la RDC
            </h1>

            <p className="text-white/80 text-center mt-3">
              Découvrez les sites touristiques du pays
            </p>

            {/* SEARCH + FILTER */}
            <div className="mt-8 flex flex-col md:flex-row gap-4">

              <div className="flex-1 bg-white rounded-2xl px-4 py-3 flex items-center">

                <Search size={18} />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Rechercher un site..."
                  className="ml-3 w-full outline-none"
                />

              </div>

              <select
                value={selectedCity}
                onChange={(e) =>
                  setSelectedCity(e.target.value)
                }
                className="rounded-2xl px-5"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="flex justify-between mb-10">

          <h2 className="text-3xl font-black">
            Sites touristiques
          </h2>

          <span className="text-gray-500">
            {filteredSites.length} résultats
          </span>

        </div>

        {/* EMPTY STATE */}
        {displayedSites.length === 0 && (
          <div className="text-center py-20">

            <Compass
              size={60}
              className="mx-auto text-gray-300"
            />

            <h3 className="text-xl font-bold mt-4">
              Aucun site trouvé
            </h3>

            <p className="text-gray-400">
              Vérifie tes données Supabase
            </p>

          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {displayedSites.map((site) => (
            <div
              key={site.id}
              className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition"
            >

              {/* IMAGE */}
              <div className="h-[260px] relative overflow-hidden">

                <img
                  src={
                    site?.images?.[0] ||
                    "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  }
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  alt={site?.name}
                />

                <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-3 rounded-full text-white">
                  <Heart size={18} />
                </button>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <div className="flex items-center text-gray-500">
                  <MapPin size={15} />
                  <span className="ml-2">
                    {site?.city || "Ville inconnue"}
                  </span>
                </div>

                <h3 className="text-xl font-black mt-2">
                  {site?.name}
                </h3>

                <p className="text-gray-500 mt-3 line-clamp-3">
                  {site?.description || "Pas de description"}
                </p>

                {/* STORY */}
                <div className="mt-4 bg-gray-100 p-4 rounded-2xl">

                  <div className="flex items-center">
                    <BookOpen size={15} />
                    <span className="ml-2 font-bold">
                      Histoire
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-4">
                    {site?.story ||
                      site?.description ||
                      "Aucune histoire disponible"}
                  </p>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    setViewedPlace?.(site)
                  }
                  className="mt-5 w-full bg-black text-white py-3 rounded-2xl"
                >
                  Voir détails
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* LOAD MORE */}
        {visibleCount < filteredSites.length && (
          <div className="text-center mt-12">

            <button
              onClick={() =>
                setVisibleCount((p) => p + 9)
              }
              className="bg-black text-white px-6 py-3 rounded-2xl"
            >
              Charger plus
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
