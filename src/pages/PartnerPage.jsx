import { useState } from "react";
import { BarChart3, ShieldCheck, TrendingUp, WalletCards } from "lucide-react";

const INITIAL_FORM = {
  establishment_name: "",
  city: "",
  professional_email: "",
  description: "",
};

export default function PartnerPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatusMessage("Demande préparée. Aucun enregistrement en base n'a été effectué.");
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/78 to-gray-950/20" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
            Partenaires
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Devenez Partenaire
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/74">
            Rejoignez Destination Kongo et faites découvrir votre établissement à des milliers de voyageurs chaque jour.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-gray-950">
            Pourquoi nous rejoindre ?
          </h2>

          <div className="mt-6 grid gap-3">
            {[
              [TrendingUp, "Visibilité", "Visibilité nationale et internationale."],
              [BarChart3, "Réservations", "Système de réservation intelligent."],
              [WalletCards, "Paiements", "Paiements sécurisés (Mobile Money & Carte)."],
              [ShieldCheck, "Dashboard", "Dashboard partenaire complet."],
            ].map(([Icon, title, text]) => (
              <div key={title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <Icon className="text-blue-700" size={22} />
                <h3 className="mt-3 font-black text-gray-950">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-gray-950">
            Demande de partenariat
          </h2>

          <div className="mt-6 space-y-4">
            <input
              name="establishment_name"
              value={form.establishment_name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 p-4 text-sm font-semibold outline-none focus:border-blue-500"
              placeholder="Nom de l'établissement"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 p-4 text-sm font-semibold outline-none focus:border-blue-500"
              placeholder="Ville"
            />

            <input
              name="professional_email"
              type="email"
              value={form.professional_email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 p-4 text-sm font-semibold outline-none focus:border-blue-500"
              placeholder="Email professionnel"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="h-28 w-full rounded-lg border border-gray-200 p-4 text-sm font-semibold outline-none focus:border-blue-500"
              placeholder="Décrivez votre établissement..."
            />

            <button className="w-full rounded-lg bg-gray-950 py-4 font-black text-white transition hover:bg-blue-800">
              Envoyer la demande
            </button>

            {statusMessage && (
              <p className="rounded-lg bg-gray-50 p-3 text-sm font-semibold text-gray-700">
                {statusMessage}
              </p>
            )}
          </div>
        </form>
      </section>

      <section className="bg-gray-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 text-center sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["+1000", "Établissements potentiels"],
            ["24/7", "Support partenaire"],
            ["RDC", "Couverture nationale"],
          ].map(([value, label]) => (
            <div key={label}>
              <h3 className="text-3xl font-black">{value}</h3>
              <p className="mt-1 text-sm font-semibold text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
