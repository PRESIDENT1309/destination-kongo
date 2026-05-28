const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80';

export default function DetailsModal({ viewedPlace, setViewedPlace, setSelectedPlace }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden my-8 border border-gray-100">
        <button 
          onClick={() => setViewedPlace(null)} 
          className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center text-gray-800 font-black shadow-md z-10 transition"
        >
          ✕
        </button>

        <div className="h-72 bg-gray-200 relative">
          <img 
            src={viewedPlace.images && viewedPlace.images[0] ? viewedPlace.images[0] : DEFAULT_IMAGE} 
            alt={viewedPlace.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
            <span className="bg-amber-500 text-white font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-md w-fit mb-2">🇨🇩 CATALOGUE ROYAL</span>
            <h2 className="text-3xl font-black text-white tracking-tight">{viewedPlace.name}</h2>
            <p className="text-amber-400 font-bold text-sm mt-1">{viewedPlace.city} • {viewedPlace.address}</p>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h3 className="text-sm font-black text-blue-950 uppercase tracking-wider mb-2">Chronique des lieux</h3>
            <p className="text-gray-600 leading-relaxed text-sm font-medium">{viewedPlace.description || "Un établissement d'exception sélectionné pour sa conformité aux critères d'élégance de notre charte."}</p>
          </div>

          {viewedPlace.type === 'restaurant' ? (
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h3 className="text-amber-800 font-black text-sm mb-2 flex items-center gap-2">🍽️ Spécialités Gastronomiques</h3>
              <p className="text-amber-950 text-sm font-medium leading-relaxed">
                {viewedPlace.specialty || "Poissons frais du Fleuve Congo (Capitaine braisé), Liboke traditionnel, Kamundele impériaux."}
              </p>
            </div>
          ) : viewedPlace.type === 'tourist_site' ? (
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <h3 className="text-emerald-800 font-black text-sm mb-2 flex items-center gap-2">🌿 Infos Pratiques & Activités</h3>
              <p className="text-emerald-950 text-sm font-medium leading-relaxed">
                {viewedPlace.activities || "Visites guidées éco-responsables, observation de la faune endémique (Okapis, Gorilles de montagne), randonnées pédestres et reportages photo."}
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h3 className="text-blue-900 font-black text-sm mb-2 flex items-center gap-2">🐆 Privilèges & Commodités</h3>
              <p className="text-blue-950 text-sm font-medium leading-relaxed">
                {viewedPlace.amenities || "Sécurité renforcée 24h/24, connectivité haut débit, alimentation énergétique stable."}
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setViewedPlace(null);
              setSelectedPlace(viewedPlace); 
            }}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-4 rounded-xl shadow-lg transition-all"
          >
            Initier la réservation
          </button>
        </div>
      </div>
    </div>
  );
}
