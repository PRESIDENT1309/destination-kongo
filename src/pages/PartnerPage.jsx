export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO SECTION */}
      <div className="relative bg-black text-white overflow-hidden">

        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')] bg-cover bg-center"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">

          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            Devenez Partenaire
          </h1>

          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            Rejoignez Destination Kongo et faites découvrir votre établissement à des milliers de voyageurs chaque jour.
          </p>

          <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
            Commencer maintenant
          </button>

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div>

          <h2 className="text-3xl font-black mb-6">
            Pourquoi nous rejoindre ?
          </h2>

          <div className="space-y-4">

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              ✔ Visibilité nationale et internationale
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              ✔ Système de réservation intelligent
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              ✔ Paiements sécurisés (Mobile Money & Carte)
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              ✔ Dashboard partenaire complet
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border">

          <h2 className="text-2xl font-black mb-6">
            Demande de partenariat
          </h2>

          <div className="space-y-4">

            <input
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Nom de l'établissement"
            />

            <input
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Ville"
            />

            <input
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email professionnel"
            />

            <textarea
              className="w-full border p-4 rounded-xl h-28 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Décrivez votre établissement..."
            />

            <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition">
              Envoyer la demande
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER BENEFITS */}
      <div className="bg-black text-white py-16 mt-10">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">

          <div>
            <h3 className="text-2xl font-black">+1000</h3>
            <p className="text-white/70">Établissements potentiels</p>
          </div>

          <div>
            <h3 className="text-2xl font-black">24/7</h3>
            <p className="text-white/70">Support partenaire</p>
          </div>

          <div>
            <h3 className="text-2xl font-black">RDC</h3>
            <p className="text-white/70">Couverture nationale</p>
          </div>

        </div>

      </div>

    </div>
  );
}
