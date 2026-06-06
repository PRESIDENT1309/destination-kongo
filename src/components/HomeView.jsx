import {
  ArrowRight,
  BadgeCheck,
  Hotel,
  MapPin,
  Mountain,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Utensils,
} from "lucide-react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1501117716987-c8e1ecb2105a?auto=format&fit=crop&w=900&q=80";

export default function HomeView({
  establishments = [],
  setCurrentPage,
  setViewedPlace
}) {
  const hotelsCount = establishments.filter((e) => e.type === "hotel").length;
  const restaurantsCount = establishments.filter((e) => e.type === "restaurant").length;
  const sitesCount = establishments.filter((e) => e.type === "site" || e.type === "tourist_site").length;

  const categories = [
    {
      title: "Hôtels",
      count: `${hotelsCount} établissements`,
      page: "hotels",
      icon: Hotel,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Restaurants",
      count: `${restaurantsCount} adresses`,
      page: "restaurants",
      icon: Utensils,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Sites touristiques",
      count: `${sitesCount} lieux`,
      page: "sites",
      icon: Mountain,
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const popular = establishments.slice(0, 6);

  return (
    <div className="bg-gray-50">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
              Explorer
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              Choisissez votre expérience
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-gray-600">
            Des catégories claires, des fiches lisibles et des actions directes pour réserver plus vite sur mobile comme sur desktop.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {categories.map(({ title, count, page, icon: Icon, image }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                <img
                  src={image}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  alt={title}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-700 shadow">
                  <Icon size={20} />
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-950">{title}</h3>
                    <p className="mt-1 text-sm font-semibold text-gray-500">{count}</p>
                  </div>
                  <ArrowRight className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-blue-700" size={20} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
              Sélection
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
              Destinations populaires
            </h2>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Une vitrine rapide pour consulter les lieux récemment référencés et ouvrir une fiche sans perdre le fil.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {(popular.length > 0 ? popular : categories).map((item, index) => {
              const isPlace = Boolean(item.id);
              const image = isPlace ? item?.images?.[0] || FALLBACK_IMAGE : item.image;
              const title = isPlace ? item.name : item.title;
              const city = isPlace ? item.city || "RDC" : "Destination Kongo";

              return (
                <button
                  key={item.id || item.page}
                  onClick={() => isPlace ? setViewedPlace?.(item) : setCurrentPage(item.page)}
                  className="group rounded-lg border border-gray-200 bg-gray-50 p-2 text-left transition hover:border-blue-200 hover:bg-white hover:shadow-lg"
                >
                  <img
                    src={image}
                    className="aspect-[4/3] w-full rounded-md object-cover"
                    alt={title}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="p-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                      <MapPin size={13} />
                      {city}
                    </div>
                    <h3 className="mt-2 line-clamp-2 font-black text-gray-950">{title}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-lg border border-gray-200 bg-gray-950 text-white md:grid-cols-4">
          {[
            [establishments.length, "Établissements"],
            [26, "Provinces"],
            ["1000+", "Voyageurs"],
            ["24/7", "Support"],
          ].map(([value, label]) => (
            <div key={label} className="border-b border-white/10 p-6 text-center md:border-b-0 md:border-r last:border-r-0">
              <p className="text-3xl font-black">{value}</p>
              <p className="mt-1 text-sm font-semibold text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            Fiabilité
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
            Une expérience pensée pour décider vite
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            [ShieldCheck, "Sécurité", "Comptes, réservations et paiements suivis."],
            [BadgeCheck, "Validation", "Contrôle admin pour les partenaires."],
            [TrendingUp, "Croissance locale", "Visibilité pour les acteurs du tourisme."],
            [Sparkles, "Découverte", "Une sélection simple à parcourir."],
          ].map(([Icon, title, text]) => (
            <div key={title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <Icon className="text-blue-700" size={22} />
              <h3 className="mt-4 font-black text-gray-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
