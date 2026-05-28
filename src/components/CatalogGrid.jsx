const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80';

export default function CatalogGrid({ establishments, currentPage, setCurrentPage, searchQuery, selectedCity, setViewedPlace, setSelectedPlace, loading }) {
  
  // Filtrage intelligent selon la page en cours
  const filteredEstablishments = establishments
    .filter((place) => {
      const matchesCity = selectedCity === 'Toutes' || (place.city && place.city.toLowerCase() === selectedCity.toLowerCase());
      const matchesSearch =
        (place.name && place.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (place.address && place.address.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCity && matchesSearch;
    })
    .filter((place) => {
      if (currentPage === 'home') return true; 
      return place.type === currentPage;      
    });

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-black text-blue-950 tracking-tight">
            {currentPage === 'home' && "🏛️ Splendeurs du Grand Kongo"}
            {currentPage === 'hotel' && "🏨 Complexes Hôteliers de Prestige"}
            {currentPage === 'kongo_home' && "🏡 Résidences & Lodges Insolites"}
            {currentPage === 'tourist_site' && "🌿 Sites Touristiques & Parcs Naturels"}
            {currentPage === 'restaurant' && "🍽️ Escapades Gastronomiques"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">Établissements audités et certifiés conformes.</p>
        </div>
        {currentPage !== 'home' && (
          <button 
            onClick={() => setCurrentPage('home')} 
            className="mt-4 md:mt-0 text-sm font-black text-blue-900 hover:text-amber-600 flex items-center gap-1.5 transition"
          >
            ← Retourner à l'accueil global
          </button>
        )}
      </div>

      {/* AFFICHAGE DES CARTES */}
      {loading ? (
        <div className="text-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-gray-500 font-bold mt-4">Ouverture des registres...</p>
        </div>
      ) : filteredEstablishments.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 p-8 max-w-xl mx-auto shadow-inner">
          <span className="text-4xl">🇨🇩</span>
          <p className="text-gray-500 font-bold mt-3">Aucun complexe disponible pour le moment sous ces critères.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEstablishments.map((place) => (
            <div 
              key={place.id} 
              onClick={() => setViewedPlace(place)} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={place.images && place.images[0] ? place.images[0] : DEFAULT_IMAGE} 
                    alt={place.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                    {place.type === 'kongo_home' ? 'Kongo Home' : place.type === 'tourist_site' ? 'Site Touristique' : place.type}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase tracking-wider">
                    <span>📍</span> {place.city}
                  </div>
                  <h3 className="text-xl font-black text-blue-950 mt-1.5 leading-snug group-hover:text-blue-800 transition">
                    {place.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 font-medium">{place.address}</p>
                </div>
              </div>
              
              <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-50 mt-4">
                <div>
                  <span className="text-2xl font-black text-blue-900">
                    {place.price_per_night ? `${place.price_per_night}$` : 'Accès Libre'}
                  </span>
                  {place.type !== 'restaurant' && place.type !== 'tourist_site' && <span className="text-[10px] font-bold text-gray-400 block">/ la nuit</span>}
                  {place.type === 'tourist_site' && <span className="text-[10px] font-bold text-gray-400 block">/ l'entrée</span>}
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedPlace(place); }}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-black px-5 py-2.5 rounded-xl text-xs transition shadow-md hover:shadow-lg"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
