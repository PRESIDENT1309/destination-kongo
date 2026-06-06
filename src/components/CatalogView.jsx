import { useMemo, useState } from "react";
import { ArrowRight, Heart, MapPin, Search, SlidersHorizontal, Star } from "lucide-react";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1501117716987-c8e1ecb2105a?auto=format&fit=crop&w=900&q=80";

export default function CatalogView({
  establishments = [],
  types = [],
  title,
  eyebrow,
  description,
  heroImage,
  searchPlaceholder,
  emptyTitle,
  emptyText,
  emptyIcon: EmptyIcon,
  initialSearch = "",
  setViewedPlace,
  setSelectedPlace,
  bookingEnabled = true,
}) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const [visibleCount, setVisibleCount] = useState(9);

  const normalizedTypes = types.map((type) => type.toLowerCase());

  const items = useMemo(() => {
    if (!Array.isArray(establishments)) return [];

    return establishments.filter((item) => (
      normalizedTypes.includes((item?.type || "").trim().toLowerCase())
    ));
  }, [establishments, normalizedTypes]);

  const cities = useMemo(() => {
    const list = items
      .map((item) => item?.city)
      .filter(Boolean);

    return ["Toutes", ...new Set(list)];
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const searchable = [
        item?.name,
        item?.description,
        item?.specialty,
        item?.amenities,
        item?.story,
        item?.city,
        item?.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchable.includes(query);
      const matchesCity = selectedCity === "Toutes" || item?.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [items, search, selectedCity]);

  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gray-950 pt-24 text-white">
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.76),rgba(2,6,23,0.94))]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              {description}
            </p>
          </div>

          <div className="mt-8 grid gap-3 rounded-lg border border-white/10 bg-white p-2 shadow-xl shadow-black/20 md:grid-cols-[1fr_auto]">
            <label className="flex min-h-12 items-center gap-3 rounded-md bg-gray-50 px-4 text-gray-700">
              <Search size={18} className="text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-gray-400"
                placeholder={searchPlaceholder}
              />
            </label>

            <label className="flex min-h-12 items-center gap-3 rounded-md border border-gray-200 bg-white px-4 text-gray-700">
              <SlidersHorizontal size={18} className="text-gray-400" />
              <select
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
                className="min-w-40 bg-transparent text-sm font-bold outline-none"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              {filteredItems.length} résultat{filteredItems.length > 1 ? "s" : ""}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              Sélection disponible
            </h2>
          </div>
        </div>

        {visibleItems.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            {EmptyIcon && <EmptyIcon size={48} className="mx-auto text-gray-300" />}
            <h3 className="mt-4 text-xl font-black text-gray-950">{emptyTitle}</h3>
            <p className="mt-2 text-sm text-gray-500">{emptyText}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item, index) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-gray-200">
                  <img
                    src={item?.images?.[0] || DEFAULT_IMAGE}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    alt={item?.name || title}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/92 px-2.5 py-1 text-xs font-black text-gray-900 shadow-sm">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    Vérifié
                  </div>
                  <button
                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/20 text-white backdrop-blur transition hover:bg-white hover:text-gray-950"
                    aria-label="Ajouter aux favoris"
                  >
                    <Heart size={17} />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.14em] text-gray-500">
                    <MapPin size={14} />
                    {item?.city || "RDC"}
                  </div>
                  <h3 className="mt-2 text-xl font-black tracking-tight text-gray-950">
                    {item?.name || "Destination Kongo"}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {item?.description || item?.story || "Informations bientôt disponibles."}
                  </p>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <button
                      onClick={() => setViewedPlace?.(item)}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-3 text-sm font-black text-gray-800 transition hover:bg-gray-50"
                    >
                      Détails
                      <ArrowRight size={16} />
                    </button>
                    {bookingEnabled && (
                      <button
                        onClick={() => setSelectedPlace?.(item)}
                        className="rounded-md bg-gray-950 px-4 py-3 text-sm font-black text-white transition hover:bg-blue-800"
                      >
                        Réserver
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {visibleCount < filteredItems.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((count) => count + 9)}
              className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-800"
            >
              Charger plus
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
