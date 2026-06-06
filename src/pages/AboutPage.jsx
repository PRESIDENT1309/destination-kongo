import { BadgeCheck, Globe2, ShieldCheck, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const values = [
    [ShieldCheck, "Confiance", "Des établissements vérifiés et un suivi clair des réservations."],
    [Globe2, "Découverte", "Une vitrine moderne pour les destinations de la RDC."],
    [TrendingUp, "Impact", "Plus de visibilité et de revenus pour les acteurs locaux."],
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80"
          alt="Paysage de voyage"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/78 to-gray-950/35" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
            À propos
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            À Propos de Destination Kongo
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/74">
            La plateforme qui connecte les voyageurs aux hôtels, restaurants et sites touristiques de la République Démocratique du Congo.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">
            Notre histoire
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-950">
            Rendre les lieux visibles, réservables et fiables.
          </h2>
        </div>

        <div className="space-y-5 text-base leading-8 text-gray-600">
          <p>
            Destination Kongo est née d’une vision simple : rendre le tourisme en RDC plus accessible, moderne et digitalisé.
          </p>
          <p>
            La plateforme centralise les hôtels, restaurants et sites touristiques, tout en donnant aux partenaires les outils nécessaires pour suivre les réservations, les documents et la relation client.
          </p>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {values.map(([Icon, title, text]) => (
            <div key={title} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <Icon className="text-blue-700" size={24} />
              <h3 className="mt-4 text-lg font-black text-gray-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-lg bg-gray-950 text-white md:grid-cols-3">
          {[
            ["+1000", "Établissements potentiels"],
            ["24/7", "Support client"],
            ["100%", "Made in RDC"],
          ].map(([value, label]) => (
            <div key={label} className="border-b border-white/10 p-8 text-center md:border-b-0 md:border-r last:border-r-0">
              <p className="text-4xl font-black">{value}</p>
              <p className="mt-2 text-sm font-semibold text-white/60">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-blue-100 bg-blue-50 p-6 sm:p-8">
          <BadgeCheck className="text-blue-700" size={28} />
          <h2 className="mt-4 text-2xl font-black text-gray-950">
            Une seule plateforme pour tous les comptes.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            Voyageurs, hôtels, restaurants — tout le monde est connecté au même écosystème.
          </p>
        </div>
      </section>
    </div>
  );
}
