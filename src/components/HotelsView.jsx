import React, { useMemo, useState } from "react";
import { Search, MapPin, Heart, Hotel } from "lucide-react";

export default function HotelsView({
  establishments = [],
  setViewedPlace,
}) {

  // 🔥 DATA HOTELS
  const hotels = useMemo(() => {
    if (!Array.isArray(establishments)) return [];

    return establishments.filter((item) => {
      return (
        item?.type?.toString().trim().toLowerCase() === "hotel"
      );
    });
  }, [establishments]);

  // 🔍 LOCAL FILTER
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [visibleCount, setVisibleCount] = useState(9);

  // 🌍 villes uniques
  const cities = useMemo(() => {
    const list = hotels
      .map((h) => h?.city)
      .filter(Boolean);

    return ["Toutes", ...new Set(list)];
  }, [hotels]);

  // 🔎 FILTER FINAL
  const filteredHotels = useMemo(() => {
    return hotels.filter((h) => {
      const q = search.toLowerCase();

      const matchSearch =
        (h?.name || "").toLowerCase().includes(q) ||
        (h?.description || "").toLowerCase().includes(q) ||
        (h?.city || "").toLowerCase().includes(q);

      const matchCity =
        selectedCity === "Toutes" ||
        (h?.city || "") === selectedCity;

      return matchSearch && matchCity;
    });
  }, [hotels, search, selectedCity]);

  const displayedHotels = filteredHotels.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* HERO SECTION */}
      <div className="relative h-[420px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
          className="w-full h-full object-cover"
          alt="hotels"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center justify-center p-6">

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[30px] p-8 w-full max-w-4xl">

            <h1 className="text-white text-4xl md:text-5xl font-black text-center">
              Hôtels du Kongo
            </h1>

            <p className="text-white/80 text-center mt-3">
              Trouvez un hébergement adapté à votre voyage
            </p>

            {/* SEARCH */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">

              <div className="flex-1 bg-white rounded-2xl px-4 py-3 flex items-center">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher hôtel..."
                  className="ml-3 w-full outline-none"
                />
              </div>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="rounded-2xl px-5"
              >
                {cities.map((city, i) => (
                  <option key={i} value={city}>
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
          <h2 className="text-3xl font-black">Hôtels</h2>
          <span className="text-gray-500">
            {filteredHotels.length} résultats
          </span>
        </div>

        {/* EMPTY STATE */}
        {displayedHotels.length === 0 && (
          <div className="text-center py-20">
            <Hotel size={60} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold mt-4">
              Aucun hôtel trouvé
            </h3>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {displayedHotels.map((h) => (
            <div
              key={h?.id}
              className="bg-white rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition"
            >

              <div className="h-[240px] relative">
                <img
                  src={
                    h?.images?.[0] ||
                    "https://images.unsplash.com/photo-1501117716987-c8e1ecb2105a"
                  }
                  className="w-full h-full object-cover"
                  alt={h?.name || "hotel"}
                />

                <button className="absolute top-4 right-4 bg-white/20 p-3 rounded-full text-white">
                  <Heart size={18} />
                </button>
              </div>

              <div className="p-6">

                <div className="flex items-center text-gray-500">
                  <MapPin size={15} />
                  <span className="ml-2">
                    {h?.city || "Ville inconnue"}
                  </span>
                </div>

                <h3 className="text-xl font-black mt-2">
                  {h?.name}
                </h3>

                <p className="text-gray-500 mt-2 line-clamp-3">
                  {h?.description}
                </p>

                <button
                  onClick={() => setViewedPlace?.(h)}
                  className="mt-5 w-full bg-black text-white py-3 rounded-2xl"
                >
                  Voir détails
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* LOAD MORE */}
        {visibleCount < filteredHotels.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleCount((p) => p + 9)}
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