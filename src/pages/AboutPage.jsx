export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="relative bg-black text-white py-28 px-6 text-center overflow-hidden">

        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')] bg-cover bg-center"></div>

        <div className="relative max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-6xl font-black">
            À Propos de Destination Kongo
          </h1>

          <p className="mt-6 text-white/80 text-lg leading-7">
            La plateforme qui connecte les voyageurs aux hôtels, restaurants et sites touristiques de la République Démocratique du Congo.
          </p>

        </div>

      </div>

      {/* STORY SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-black mb-6">
          Notre histoire
        </h2>

        <p className="text-gray-600 leading-8 text-lg">
          Destination Kongo est née d’une vision simple : rendre le tourisme en RDC
          plus accessible, moderne et digitalisé. Trop de lieux incroyables restent
          invisibles. Nous avons décidé de changer cela en créant une plateforme unique
          qui centralise les hôtels, restaurants et sites touristiques.
        </p>

        <p className="text-gray-600 leading-8 text-lg mt-6">
          Aujourd’hui, nous construisons un écosystème complet pour permettre aux voyageurs
          de découvrir facilement le Congo, et aux établissements locaux de se développer
          grâce au digital.
        </p>

      </div>

      {/* VALUES */}
      <div className="bg-gray-50 py-16">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-black mb-2">🎯 Mission</h3>
            <p className="text-gray-600">
              Digitaliser le tourisme en RDC et simplifier l’accès aux établissements locaux.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-black mb-2">🌍 Vision</h3>
            <p className="text-gray-600">
              Devenir la plateforme leader du tourisme en Afrique centrale.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-black mb-2">⚡ Impact</h3>
            <p className="text-gray-600">
              Créer de la visibilité, des revenus et des emplois pour les acteurs locaux.
            </p>
          </div>

        </div>

      </div>

      {/* NUMBERS SECTION */}
      <div className="bg-black text-white py-16">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 text-center gap-10">

          <div>
            <h2 className="text-5xl font-black">+1000</h2>
            <p className="text-white/70 mt-2">Établissements référencés</p>
          </div>

          <div>
            <h2 className="text-5xl font-black">24/7</h2>
            <p className="text-white/70 mt-2">Support client</p>
          </div>

          <div>
            <h2 className="text-5xl font-black">100%</h2>
            <p className="text-white/70 mt-2">Made in RDC</p>
          </div>

        </div>

      </div>

      {/* CTA */}
      <div className="py-20 text-center px-6">

        <h2 className="text-3xl font-black mb-4">
          Rejoignez la révolution du tourisme en RDC
        </h2>

        <p className="text-gray-600 mb-8">
          Voyageurs, hôtels, restaurants — tout le monde est connecté au même écosystème.
        </p>

        <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
          Commencer maintenant
        </button>

      </div>

    </div>
  );
}
