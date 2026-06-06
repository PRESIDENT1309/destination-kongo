import { useState } from "react";
import { CalendarDays, Loader2, MessageSquare, Phone, UserRound, X } from "lucide-react";
import { supabase } from "../supabaseClient";

export default function BookingModal({
  selectedPlace,
  setSelectedPlace,
  setBooking
}) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  if (!selectedPlace) return null;

  const type = selectedPlace?.type || "unknown";

  function generateBookingCode() {
    const place = selectedPlace?.name || "XX";
    const placeCode = place
      .split(" ")
      .map((word) => word?.[0] || "")
      .join("")
      .toUpperCase()
      .slice(0, 3);
    const first = form?.prenom?.[0]?.toUpperCase() || "X";
    const last = form?.nom?.[0]?.toUpperCase() || "X";
    const numbers = Math.floor(1000 + Math.random() * 9000);

    return `${placeCode}${first}${last}${numbers}`;
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    const code = generateBookingCode();
    const phone = `${form.country_code || "+243"}${form.phone}`;

    const booking = {
      code,
      establishment_id: selectedPlace?.owner_id,
      type: selectedPlace?.type,
      place: selectedPlace?.name,
      nom: form.nom,
      postnom: form.postnom,
      prenom: form.prenom,
      email: form.email,
      phone,
      check_in: form.check_in || null,
      check_out: form.check_out || null,
      status: "pending"
    };

    try {
      const { error } = await supabase
        .from("bookings")
        .insert([booking]);

      if (error) throw error;

      setBooking(booking);
      setSelectedPlace(null);
      alert(`Réservation confirmée\nCode: ${code}`);
    } catch (err) {
      console.error("Booking error:", err.message);
      alert("Erreur lors de la réservation");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-950/76 p-4 backdrop-blur-md">
      <div className="my-8 w-full max-w-2xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">
              Réservation
            </p>
            <h2 className="mt-2 text-2xl font-black text-gray-950">
              {selectedPlace.name}
            </h2>
            <p className="mt-1 text-sm font-semibold text-gray-500">
              {type}
            </p>
          </div>

          <button
            onClick={() => setSelectedPlace(null)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="relative">
              <UserRound className="absolute left-3 top-3.5 text-gray-400" size={17} />
              <input
                name="nom"
                placeholder="Nom"
                required
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm font-semibold outline-none focus:border-blue-500"
              />
            </label>

            <input
              name="postnom"
              placeholder="Postnom"
              required
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            />

            <input
              name="prenom"
              placeholder="Prénom"
              required
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            />
          </div>

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold outline-none focus:border-blue-500"
          />

          <div className="grid gap-3 sm:grid-cols-[0.35fr_0.65fr]">
            <select
              name="country_code"
              defaultValue="+243"
              onChange={handleChange}
              className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-bold outline-none focus:border-blue-500"
            >
              <option value="+243">+243 RDC</option>
              <option value="+33">+33 France</option>
            </select>

            <label className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={17} />
              <input
                name="phone"
                placeholder="Numéro"
                required
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm font-semibold outline-none focus:border-blue-500"
              />
            </label>
          </div>

          {type === "hotel" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="relative">
                <CalendarDays className="absolute left-3 top-3.5 text-gray-400" size={17} />
                <input
                  type="date"
                  name="check_in"
                  required
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm font-semibold outline-none focus:border-blue-500"
                />
              </label>

              <label className="relative">
                <CalendarDays className="absolute left-3 top-3.5 text-gray-400" size={17} />
                <input
                  type="date"
                  name="check_out"
                  required
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm font-semibold outline-none focus:border-blue-500"
                />
              </label>
            </div>
          )}

          <label className="relative block">
            <MessageSquare className="absolute left-3 top-3.5 text-gray-400" size={17} />
            <textarea
              name="message"
              placeholder="Message ou demande spéciale"
              onChange={handleChange}
              className="h-24 w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm font-semibold outline-none focus:border-blue-500"
            />
          </label>

          <button
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-4 text-sm font-black text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {saving && <Loader2 size={17} className="animate-spin" />}
            {saving ? "Enregistrement..." : "Confirmer la réservation"}
          </button>
        </form>
      </div>
    </div>
  );
}
