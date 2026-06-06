import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer({ currentPage, onNavigate }) {
  const navLinks = [
    ["home", "Accueil"],
    ["hotels", "Hôtels"],
    ["restaurants", "Restaurants"],
    ["sites", "Sites touristiques"],
  ];

  const companyLinks = [
    ["about", "Notre mission"],
    ["partner", "Devenir partenaire"],
    ["contact", "Contact"],
  ];

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <button
            className="text-left"
            onClick={() => onNavigate("home")}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
                <img src="/favicon.svg" alt="Destination Kongo" className="h-10 w-10 object-contain" />
              </span>
              <div>
                <h3 className="text-lg font-black text-gray-950">Destination Kongo</h3>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                  L'hospitalité royale au cœur de l'afrique
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-600">
              L'hospitalité royale au cœur de l'afrique
            </p>
          </button>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-gray-950">Navigation</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map(([page, label]) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className={currentPage === page ? "font-bold text-blue-700" : "font-semibold text-gray-500 hover:text-gray-950"}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-gray-950">Plateforme</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {companyLinks.map(([page, label]) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className={currentPage === page ? "font-bold text-blue-700" : "font-semibold text-gray-500 hover:text-gray-950"}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-gray-950">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-gray-600">
              <li className="flex items-center gap-2"><MapPin size={16} /> Kinshasa, RDC</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +243 97 13 47 427</li>
              <li className="flex items-center gap-2"><Mail size={16} /> contact@destinationkongo.cd</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gray-200 pt-6 text-sm font-semibold text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Destination Kongo. Tous droits réservés.</p>
          <p>L'hospitalité royale au cœur de l'afrique</p>
        </div>
      </div>
    </footer>
  );
}
