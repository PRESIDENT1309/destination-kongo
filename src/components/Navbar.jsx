import { useState } from 'react';
import { LogOut, Menu, UserRound, X } from 'lucide-react';
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
    { id: 'sites', label: 'Sites' },
    { id: 'partner', label: 'Partenaires' },
    { id: 'about', label: 'À propos' },
    { id: 'contact', label: 'Contact' },
  ];

  function navigate(page) {
    setCurrentPage(page);
    setIsMenuOpen(false);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-4">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-3 text-left"
            aria-label="Destination Kongo"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
              <img
                src="/favicon.svg"
                alt="Destination Kongo"
                className="h-9 w-9 object-contain"
              />
            </span>
            <span>
              <span className="block text-base font-black tracking-tight text-gray-950">
                Destination Kongo
              </span>
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 sm:block">
                L'hospitalité royale au cœur de l'afrique
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  currentPage === item.id
                    ? 'bg-gray-950 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {currentUser ? (
              <>
                <button
                  onClick={() => navigate('admin-hotel')}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50"
                >
                  <UserRound size={16} />
                  Dashboard
                </button>
                <span className="max-w-40 truncate text-sm font-semibold text-gray-500">
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-red-600 hover:bg-red-50"
                  aria-label="Déconnexion"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
              >
                <UserRound size={16} />
                Se connecter
              </button>
            )}
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-800 lg:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-bold ${
                  currentPage === item.id
                    ? 'bg-gray-950 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {currentUser ? (
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <button
                  onClick={() => navigate('admin-hotel')}
                  className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-left text-sm font-bold text-gray-800"
                >
                  Dashboard établissement
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full rounded-lg px-4 py-3 text-left text-sm font-bold text-red-600"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setIsMenuOpen(false);
                }}
                className="mt-3 block w-full rounded-lg bg-gray-950 px-4 py-3 text-left text-sm font-bold text-white"
              >
                Se connecter
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
