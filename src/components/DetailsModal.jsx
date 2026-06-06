import { ArrowRight, CheckCircle2, MapPin, X } from "lucide-react";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

export default function DetailsModal({ viewedPlace, setViewedPlace, setSelectedPlace }) {
  const detailTitle = viewedPlace.type === "restaurant"
    ? "Spécialités"
    : viewedPlace.type === "tourist_site" || viewedPlace.type === "site"
      ? "Infos pratiques"
      : "Commodités";

  const detailText =
    viewedPlace.specialty ||
    viewedPlace.activities ||
    viewedPlace.amenities ||
    "Informations détaillées bientôt disponibles pour cet établissement.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/78 p-4 backdrop-blur-md">
      <div className="my-8 w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl">
        <div className="relative h-72 bg-gray-200 sm:h-88">
          <img
            src={viewedPlace.images?.[0] || DEFAULT_IMAGE}
            alt={viewedPlace.name}
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/88 via-gray-950/20 to-transparent" />

          <button
            onClick={() => setViewedPlace(null)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/92 text-gray-900 shadow-lg transition hover:bg-white"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/12 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur">
              <CheckCircle2 size={14} />
              Sélection Destination Kongo
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {viewedPlace.name}
            </h2>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/75">
              <MapPin size={16} />
              {viewedPlace.city || "RDC"} {viewedPlace.address ? `· ${viewedPlace.address}` : ""}
            </p>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1fr_0.75fr] md:p-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
              Aperçu
            </p>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {viewedPlace.description || "Un lieu référencé pour accompagner les voyageurs avec une information claire et une réservation simple."}
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
            <h3 className="text-sm font-black text-gray-950">{detailTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{detailText}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <button
            onClick={() => {
              setViewedPlace(null);
              setSelectedPlace(viewedPlace);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-800"
          >
            Initier la réservation
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
