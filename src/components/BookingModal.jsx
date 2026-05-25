import React, { useState } from "react";
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

 async function handleSubmit(e) {
  e.preventDefault();

  const code = generateBookingCode();

const booking = {
  establishment_id: selectedPlace?.owner_id,
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
    const { error } = await supabase
      .from("bookings")
      .insert([booking]);

    if (error) throw error;

    setBooking(booking);
    setSelectedPlace(null);

    alert(`Réservation confirmée 🎉\nCode: ${code}`);

  } catch (err) {
    console.error("Booking error:", err.message);
    alert("Erreur lors de la réservation");
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