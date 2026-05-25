import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Navbar({
  currentPage,
  setCurrentPage,
  currentUser,
  setCurrentUser,
  setShowAuthModal
}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'hotels', label: 'Hôtels' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'sites', label: 'Sites Touristiques' },
    { id: 'partner', label: 'Devenir Partenaire' },
    { id: 'about', label: 'À Propos' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">DK</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Destination Kongo
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                L'hospitalité royale au cœur de l'afrique
              </p>
            </div>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center space-x-8">

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* AUTH */}
            {currentUser ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
                  👤 {currentUser.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Se connecter
              </button>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden px-3 py-2 border rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* ADMIN */}
            <button
              onClick={() => setCurrentPage("admin-hotel")}
              className="block w-full text-left px-4 py-2 text-gray-700"
            >
              Dashboard Hôtel
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}