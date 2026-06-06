import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <section className="bg-gray-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-200">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl">
            Contactez-nous
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
            Une question, une collaboration ou un partenariat ? Notre équipe vous répond rapidement.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="space-y-3">
          {[
            [MapPin, "Adresse", "Kinshasa, République Démocratique du Congo"],
            [Mail, "Email", "contact@destinationkongo.com"],
            [Phone, "Téléphone", "+243 XXX XXX XXX"],
            [MessageSquare, "Support", "Assistance utilisateurs et partenaires"],
          ].map(([Icon, label, value]) => (
            <div key={label} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <Icon className="text-blue-700" size={22} />
              <p className="mt-3 text-sm font-black uppercase tracking-[0.14em] text-gray-500">{label}</p>
              <p className="mt-1 font-bold text-gray-950">{value}</p>
            </div>
          ))}
        </div>

        <form className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-gray-950">Envoyer un message</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" placeholder="Nom complet" />
            <input className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500" placeholder="Email" />
            <input className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 sm:col-span-2" placeholder="Sujet" />
            <textarea className="h-36 rounded-lg border border-gray-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 sm:col-span-2" placeholder="Votre message..." />
          </div>
          <button className="mt-5 w-full rounded-lg bg-gray-950 py-4 text-sm font-black text-white transition hover:bg-blue-800">
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}
