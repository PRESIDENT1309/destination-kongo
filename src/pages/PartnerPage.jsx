import { useState } from "react";
import { supabase } from "../supabaseClient";

const INITIAL_FORM = {
  establishment_name: "",
  city: "",
  professional_email: "",
  description: "",
  rccm_url: "",
  id_nat_url: "",
  licence_url: "",
  photos_url: "",
};

export default function PartnerPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setStatusMessage("");

    try {
      const payload = {
        establishment_name: form.establishment_name,
        city: form.city,
        professional_email: form.professional_email,
        description: form.description,
        rccm_url: form.rccm_url || null,
        id_nat_url: form.id_nat_url || null,
        licence_url: form.licence_url || null,
        photos_url: form.photos_url || null,
        status: "pending",
      };

      const fallbackPayload = {
        establishment_name: form.establishment_name,
        city: form.city,
        professional_email: form.professional_email,
        description: form.description,
        status: "pending",
      };

      const { error } = await supabase
        .from("partner_applications")
        .insert([payload]);

      if (error?.message?.toLowerCase().includes("column")) {
        const retry = await supabase
          .from("partner_applications")
          .insert([fallbackPayload]);

        if (retry.error) throw retry.error;
      } else if (error) {
        throw error;
      }

      setForm(INITIAL_FORM);
      setStatusMessage("Demande envoyée à l'administration.");
    } catch (error) {
      console.error("Partner application error:", error.message);
      setStatusMessage("Impossible d'enregistrer la demande. Vérifie la table partner_applications dans Supabase.");
    } finally {
      setSaving(false);
    }
  }

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
              Visibilité nationale et internationale
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              Système de réservation intelligent
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              Paiements sécurisés (Mobile Money & Carte)
            </div>

            <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
              Dashboard partenaire connecté à l'administration
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 border">

          <h2 className="text-2xl font-black mb-6">
            Demande de partenariat
          </h2>

          <div className="space-y-4">

            <input
              name="establishment_name"
              value={form.establishment_name}
              onChange={handleChange}
              required
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Nom de l'établissement"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Ville"
            />

            <input
              name="professional_email"
              type="email"
              value={form.professional_email}
              onChange={handleChange}
              required
              className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email professionnel"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border p-4 rounded-xl h-28 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Décrivez votre établissement..."
            />

            <div className="grid sm:grid-cols-2 gap-3">
              <input
                name="rccm_url"
                value={form.rccm_url}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Lien RCCM"
              />

              <input
                name="id_nat_url"
                value={form.id_nat_url}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Lien ID Nat"
              />

              <input
                name="licence_url"
                value={form.licence_url}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Lien licence"
              />

              <input
                name="photos_url"
                value={form.photos_url}
                onChange={handleChange}
                className="w-full border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Lien photos"
              />
            </div>

            <button
              disabled={saving}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-60"
            >
              {saving ? "Envoi..." : "Envoyer la demande"}
            </button>

            {statusMessage && (
              <p className="text-sm font-semibold text-gray-700">
                {statusMessage}
              </p>
            )}

          </div>

        </form>

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
