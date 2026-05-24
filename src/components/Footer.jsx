export default function Footer({ currentPage, onNavigate }) {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo et Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">DK</span>
              </div>
              <h3 className="text-lg font-bold">Destination Kongo</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              L'hospitalité royale au cœur de l'afrique
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className={currentPage === 'home' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}>
                  Accueil
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className={currentPage === 'hotels' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}>
                  Hôtels
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('restaurants')} className={currentPage === 'restaurants' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}>
                  Restaurants
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sites')} className={currentPage === 'sites' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}>
                  Sites Touristiques
                </button>
              </li>
            </ul>
          </div>

          {/* À Propos */}
          <div>
            <h4 className="font-semibold mb-4 text-white">À Propos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className={currentPage === 'about' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}>
                  Notre Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('partner')} className={currentPage === 'partner' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}>
                  Devenir Partenaire
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className={currentPage === 'contact' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}>
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>📍 Kinshasa, RDC</li>
              <li>📞 +243 97 13 47 427</li>
              <li>✉️ contact@destinationkongo.cd</li>
            </ul>
            <div className="flex space-x-4 mt-4 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-500 transition-colors">Facebook</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Instagram</a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Destination Kongo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}