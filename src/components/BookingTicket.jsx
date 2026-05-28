export default function BookingTicket({ booking, onClose }) {
  if (!booking) return null;

  const typeLabel = (booking.type || "booking").toUpperCase();

  const fullPhone =
    `${booking.country_code || ""} ${booking.phone || ""}`.trim();

  const fullName = [
    booking.nom,
    booking.postnom,
    booking.prenom
  ]
    .filter(Boolean)
    .join(" ");

  const qrPayload =
    booking.qr_payload ||
    booking.code ||
    `${booking.place || "booking"}-${booking.phone || ""}`;

  const qrUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(qrPayload)}`;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

        {/* HEADER PREMIUM */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white p-6 relative overflow-hidden">

          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_70%)]"></div>

          <h2 className="text-xl font-bold tracking-widest relative z-10">
            IMPERIAL BOOKING PASS
          </h2>

          <p className="text-sm opacity-70 relative z-10">
            Confirmation officielle de réservation
          </p>

        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">

          {/* CODE + TYPE */}
          <div className="flex justify-between items-center">

            <div>
              <p className="text-gray-500 text-sm">Code réservation</p>
              <p className="text-2xl font-black tracking-[0.3em]">
                {booking.code || "----"}
              </p>
            </div>

            <span className="px-4 py-2 bg-black text-white rounded-full text-xs tracking-widest">
              {typeLabel}
            </span>

          </div>

          <hr />

          {/* CLIENT */}
          <div className="grid grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-gray-500">Nom complet</p>
              <p className="font-semibold">
                {fullName || "Non renseigné"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Téléphone</p>
              <p className="font-semibold">
                {fullPhone || "Non renseigné"}
              </p>
            </div>

          </div>

          <hr />

          {/* LIEU */}
          <div>
            <p className="text-gray-500">Établissement</p>
            <p className="font-bold text-lg">
              {booking.place || "Inconnu"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Statut : {booking.status || "pending"}
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src={qrUrl}
              alt={`QR code ${booking.code || ""}`}
              className="w-32 h-32 border rounded-xl p-2 bg-white"
            />
          </div>

          {/* DETAILS */}
          <div className="bg-gray-50 p-4 rounded-2xl text-sm space-y-2 border">

            {booking.check_in && (
              <p>📅 Check-in : {booking.check_in}</p>
            )}

            {booking.check_out && (
              <p>📅 Check-out : {booking.check_out}</p>
            )}

            {booking.date && (
              <p>📅 Date : {booking.date}</p>
            )}

            {booking.visit_date && (
              <p>📅 Visite : {booking.visit_date}</p>
            )}

            {booking.guests && (
              <p>👥 Personnes : {booking.guests}</p>
            )}

            {booking.participants && (
              <p>👥 Participants : {booking.participants}</p>
            )}

          </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 flex gap-3 bg-white">

          <button className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-bold transition">
            Télécharger PDF
          </button>

          <button
            onClick={onClose}
            className="flex-1 border py-3 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            Fermer
          </button>

        </div>

      </div>
    </div>
  );
}
