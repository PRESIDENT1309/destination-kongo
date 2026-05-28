import { useMemo, useState } from "react";
import { Search, MapPin, Heart, Utensils } from "lucide-react";

export default function RestaurantsView({
  establishments = [],
  setViewedPlace,
}) {

  // 🔥 filtrer restaurants
  const restaurants = useMemo(() => {
    if (!Array.isArray(establishments)) return [];

    return establishments.filter((item) =>
      (item?.type || "").trim().toLowerCase() === "restaurant"
    );
  }, [establishments]);

  // 🔍 search
  const [search, setSearch] = useState("");

  // 🌍 city filter
  const [selectedCity, setSelectedCity] =
    useState("Toutes");

  // 📦 pagination
  const [visibleCount, setVisibleCount] =
    useState(9);

  // villes
  const cities = useMemo(() => {
    const list = restaurants
      .map((r) => r?.city)
      .filter(Boolean);

    return ["Toutes", ...new Set(list)];
  }, [restaurants]);

  // 🔎 filtre global
  const filteredRestaurants = useMemo(() => {
    const q = search.toLowerCase();

    return restaurants.filter((r) => {

      const matchSearch =
        (r?.name || "").toLowerCase().includes(q) ||
        (r?.description || "").toLowerCase().includes(q) ||
        (r?.specialty || "").toLowerCase().includes(q) ||
        (r?.city || "").toLowerCase().includes(q) ||
        (r?.address || "").toLowerCase().includes(q);

      const matchCity =
        selectedCity === "Toutes" ||
        r?.city === selectedCity;

      return matchSearch && matchCity;
    });
  }, [restaurants, search, selectedCity]);

  const displayedRestaurants =
    filteredRestaurants.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* HERO */}
      <div className="relative h-[420px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
          className="w-full h-full object-cover"
          alt="restaurants"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center justify-center p-6">

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[35px] p-8 w-full max-w-5xl">

            <h1 className="text-white text-5xl md:text-6xl font-black text-center">
              Restaurants du Kongo
            </h1>

            <p className="text-white/80 text-center mt-3">
              Découvrez les meilleurs restaurants près de vous
            </p>

            {/* SEARCH + FILTER */}
            <div className="mt-8 flex flex-col md:flex-row gap-4">

              <div className="flex-1 bg-white rounded-2xl px-4 py-3 flex items-center">

                <Search size={18} />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher restaurant, spécialité..."
                  className="ml-3 w-full outline-none"
                />

              </div>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
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
            Restaurants
          </h2>

          <span className="text-gray-500">
            {filteredRestaurants.length} résultats
          </span>

        </div>

        {/* EMPTY */}
        {displayedRestaurants.length === 0 && (
          <div className="text-center py-20">
            <Utensils size={60} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-bold mt-4">
              Aucun restaurant trouvé
            </h3>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {displayedRestaurants.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition"
            >

              {/* IMAGE */}
              <div className="h-[260px] relative overflow-hidden">

                <img
                  src={
                    r?.images?.[0] ||
                    "https://images.unsplash.com/photo-1552566626-52f8b828add9"
                  }
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  alt={r?.name}
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
                    {r?.city || "Ville inconnue"}
                  </span>
                </div>

                <h3 className="text-xl font-black mt-2">
                  {r?.name}
                </h3>

                <p className="text-gray-500 mt-2 line-clamp-3">
                  {r?.description}
                </p>

                <div className="mt-3 text-sm text-gray-500">
                  🍽️ {r?.specialty || "Spécialité non définie"}
                </div>

                {/* BUTTON */}
                <button
                  onClick={() => setViewedPlace?.(r)}
                  className="mt-5 w-full bg-black text-white py-3 rounded-2xl"
                >
                  Voir détails
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* LOAD MORE */}
        {visibleCount < filteredRestaurants.length && (
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
