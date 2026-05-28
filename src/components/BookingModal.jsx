import { useState } from "react";
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

  // CODE RESERVATION
  function generateBookingCode() {
    const place = selectedPlace?.name || "XX";

    const placeCode = place
      .split(" ")
      .map((w) => w?.[0] || "")
      .join("")
      .toUpperCase()
      .slice(0, 3);

    const first =
      form?.prenom?.[0]?.toUpperCase() || "X";

    const last =
      form?.nom?.[0]?.toUpperCase() || "X";

    const numbers =
      Math.floor(
        1000 + Math.random() * 9000
      );

    return `${placeCode}${first}${last}${numbers}`;
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function isMissingColumnError(error) {
    return error?.message?.toLowerCase().includes("column");
  }

  async function createBooking(bookingPayload, legacyPayload) {
    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingPayload])
      .select("*")
      .maybeSingle();

    if (!error) return data || bookingPayload;

    if (!isMissingColumnError(error)) throw error;

    const fallback = await supabase
      .from("bookings")
      .insert([legacyPayload])
      .select("*")
      .maybeSingle();

    if (fallback.error) throw fallback.error;

    return fallback.data || legacyPayload;
  }

  async function notifyEstablishment(savedBooking, message) {
    const ownerId = selectedPlace?.owner_id;

    if (!ownerId) return;

    await Promise.allSettled([
      supabase
        .from("notifications")
        .insert([{
          recipient_id: ownerId,
          type: "booking",
          title: "Nouvelle réservation",
          message: `${savedBooking?.place || selectedPlace?.name} a reçu une nouvelle demande.`,
          status: "unread",
          booking_id: savedBooking?.id ? String(savedBooking.id) : null,
          establishment_id: selectedPlace?.id ? String(selectedPlace.id) : null,
        }]),
      supabase
        .from("messages")
        .insert([{
          sender_name: `${form.prenom || ""} ${form.nom || ""}`.trim() || "Client",
          recipient_id: ownerId,
          establishment_id: selectedPlace?.id ? String(selectedPlace.id) : null,
          booking_id: savedBooking?.id ? String(savedBooking.id) : null,
          channel: "booking",
          content: message || "Nouvelle demande de réservation.",
        }]),
    ]);
  }

 async function handleSubmit(e) {
  e.preventDefault();
  setSaving(true);

  const code = generateBookingCode();

const booking = {
  code,
  establishment_id: selectedPlace?.id || selectedPlace?.owner_id,
  establishment_owner_id: selectedPlace?.owner_id || null,
  type: selectedPlace?.type,
  place: selectedPlace?.name,
  amount: selectedPlace?.price_per_night || selectedPlace?.price || 0,

  nom: form.nom,
  postnom: form.postnom,
  prenom: form.prenom,

  email: form.email,
  phone: `${form.country_code || "+243"}${form.phone}`,
  message: form.message || "",

  check_in: form.check_in || null,
  check_out: form.check_out || null,

  status: "pending",
  payment_status: "pending",
  qr_payload: code
};

const legacyBooking = {
  code,
  establishment_id: selectedPlace?.owner_id || selectedPlace?.id,
  type: selectedPlace?.type,
  place: selectedPlace?.name,

  nom: form.nom,
  postnom: form.postnom,
  prenom: form.prenom,

  email: form.email,
  phone: `${form.country_code || "+243"}${form.phone}`,

  check_in: form.check_in || null,
  check_out: form.check_out || null,

  status: "pending"
};

  try {
    // 🔥 ENVOI SUPABASE
    const savedBooking = await createBooking(booking, legacyBooking);

    await notifyEstablishment(savedBooking, form.message);

    setBooking({
      ...booking,
      ...savedBooking,
      code,
    });
    setSelectedPlace(null);

    alert(`Réservation confirmée 🎉\nCode: ${code}`);

  } catch (err) {
    console.error("Booking error:", err.message);
    alert("Erreur lors de la réservation");
  } finally {
    setSaving(false);
  }
}

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">

        <div className="mb-6">

          <h2 className="text-3xl font-black">
            Réservation {type}
          </h2>

          <p className="text-gray-500">
            {selectedPlace.name}
          </p>

        </div>

        <button
          onClick={() =>
            setSelectedPlace(null)
          }
          className="absolute top-5 right-5 text-xl"
        >
          ✕
        </button>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div className="grid grid-cols-3 gap-3">

            <input
              name="nom"
              placeholder="Nom"
              required
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="postnom"
              placeholder="Postnom"
              required
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="prenom"
              placeholder="Prénom"
              required
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

          </div>

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl"
          />

          <div className="flex gap-2">

            <select
              name="country_code"
              defaultValue="+243"
              onChange={handleChange}
              className="border p-3 rounded-xl w-1/3"
            >
              <option value="+243">
                🇨🇩 +243
              </option>

              <option value="+33">
                🇫🇷 +33
              </option>

            </select>

            <input
              name="phone"
              placeholder="Numéro"
              required
              onChange={handleChange}
              className="border p-3 rounded-xl w-2/3"
            />

          </div>

          {type === "hotel" && (
            <>
              <div className="grid grid-cols-2 gap-3">

                <input
                  type="date"
                  name="check_in"
                  required
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                />

                <input
                  type="date"
                  name="check_out"
                  required
                  onChange={handleChange}
                  className="border p-3 rounded-xl"
                />

              </div>
            </>
          )}

          <textarea
            name="message"
            placeholder="Message ou demande spéciale"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl h-24"
          />

          <button
            disabled={saving}
            className="w-full bg-black text-white p-4 rounded-xl"
          >
            {
              saving
              ? "Enregistrement..."
              : "Confirmer la réservation"
            }
          </button>

        </form>

      </div>

    </div>
  );
}
