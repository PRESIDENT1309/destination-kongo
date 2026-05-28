export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO */}
      <div className="bg-black text-white py-24 text-center px-6">

        <h1 className="text-5xl font-black">
          Contactez-nous
        </h1>

        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          Une question, une collaboration ou un partenariat ? Notre équipe vous répond rapidement.
        </p>

      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

        {/* INFO */}
        <div>

          <h2 className="text-3xl font-black mb-6">
            Entrer en contact
          </h2>

          <div className="space-y-4 text-gray-600">

            <div className="bg-white p-5 rounded-2xl shadow">
              📍 Kinshasa, République Démocratique du Congo
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              📧 contact@destinationkongo.com
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              📞 +243 XXX XXX XXX
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              🕒 Support 24/7 pour partenaires
            </div>

          </div>

        </div>

        {/* FORM */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl border">

          <h2 className="text-2xl font-black mb-6">
            Envoyer un message
          </h2>

          <div className="space-y-4">

            <input className="w-full border p-4 rounded-xl" placeholder="Nom complet" />

            <input className="w-full border p-4 rounded-xl" placeholder="Email" />

            <input className="w-full border p-4 rounded-xl" placeholder="Sujet" />

            <textarea className="w-full border p-4 rounded-xl h-32" placeholder="Votre message..." />

            <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition">
              Envoyer
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
