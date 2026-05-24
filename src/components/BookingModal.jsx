import React, { useState } from "react";

export default function BookingModal({
  selectedPlace,
  setSelectedPlace,
  setBooking
}) {

  const [form, setForm] = useState({});

  if (!selectedPlace) return null;

  const type = selectedPlace?.type || "unknown";

  // ===============================
  // 🔐 CODE RESERVATION INTELLIGENT
  // ===============================
  function generateBookingCode() {

    const place = selectedPlace?.name || "XX";

    const placeCode = place
      .split(" ")
      .map(w => w?.[0] || "")
      .join("")
      .toUpperCase()
      .slice(0, 3);

    const first = form.prenom?.[0]?.toUpperCase() || "X";
    const last = form.nom?.[0]?.toUpperCase() || "X";

    const numbers = Math.floor(1000 + Math.random() * 9000);

    return `${placeCode}${first}${last}${numbers}`;
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const code = generateBookingCode();

    const booking = {
      code,
      type,
      place: selectedPlace.name,

      // 🔥 NORMALISATION TEL INTERNATIONAL
      phone: `${form.country_code || "+243"}${form.phone}`,

      ...form
    };

    console.log("BOOKING:", booking);

    // ✅ SAFE UPDATE PARENT
    if (typeof setBooking === "function") {
      setBooking(booking);
    }

    setSelectedPlace(null);

    alert(`Réservation confirmée 🎉\nCode: ${code}`);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto">

        {/* HEADER PREMIUM */}
        <div className="mb-6">
          <h2 className="text-3xl font-black">
            Réservation {type === "hotel" ? "Hôtel" : type === "restaurant" ? "Restaurant" : "Site"}
          </h2>

          <p className="text-gray-500">
            {selectedPlace.name}
          </p>
        </div>

        {/* CLOSE */}
        <button
          onClick={() => setSelectedPlace(null)}
          className="absolute top-5 right-5 text-xl"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* IDENTITÉ */}
          <div className="grid grid-cols-3 gap-3">

            <input name="nom" placeholder="Nom" required className="border p-3 rounded-xl" onChange={handleChange} />
            <input name="postnom" placeholder="Postnom" required className="border p-3 rounded-xl" onChange={handleChange} />
            <input name="prenom" placeholder="Prénom" required className="border p-3 rounded-xl" onChange={handleChange} />

          </div>

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          {/* TEL INTERNATIONAL */}
          <div className="flex gap-2">

            <select
              name="country_code"
              className="border p-3 rounded-xl w-1/3"
              onChange={handleChange}
              defaultValue="+243"
            >
              <option value="+243">🇨🇩 +243</option>
              <option value="+237">🇨🇲 +237</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+86">🇨🇳 +86</option>
              <option value="+91">🇮🇳 +91</option>
            </select>

            <input
              name="phone"
              placeholder="Numéro"
              required
              className="border p-3 rounded-xl w-2/3"
              onChange={handleChange}
            />

          </div>

          {/* HOTEL */}
          {type === "hotel" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" name="check_in" required className="border p-3 rounded-xl" onChange={handleChange} />
                <input type="date" name="check_out" required className="border p-3 rounded-xl" onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="adults" required placeholder="Adultes" className="border p-3 rounded-xl" onChange={handleChange} />
                <input type="number" name="children" required placeholder="Enfants" className="border p-3 rounded-xl" onChange={handleChange} />
              </div>
            </>
          )}

          {/* RESTAURANT */}
          {type === "restaurant" && (
            <>
              <input type="date" name="date" required className="w-full border p-3 rounded-xl" onChange={handleChange} />
              <input type="time" name="time" required className="w-full border p-3 rounded-xl" onChange={handleChange} />
              <input type="number" name="guests" required placeholder="Nombre de personnes" className="w-full border p-3 rounded-xl" onChange={handleChange} />
            </>
          )}

          {/* SITE */}
          {type === "site" && (
            <>
              <input type="date" name="visit_date" required className="w-full border p-3 rounded-xl" onChange={handleChange} />
              <input type="number" name="participants" required placeholder="Participants" className="w-full border p-3 rounded-xl" onChange={handleChange} />
            </>
          )}

          {/* BUTTON */}
          <button className="w-full bg-gradient-to-r from-black to-gray-800 text-white p-4 rounded-xl font-bold hover:scale-[1.02] transition">
            Confirmer la réservation
          </button>

        </form>

      </div>
    </div>
  );
}