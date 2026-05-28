import { useEffect, useState } from "react";

export default function HotelAdminDashboard({ hotelId }) {

  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    revenue: 0,
    paid: 0,
  });

  // 📦 charger réservations
  useEffect(() => {
    fetch(`http://localhost:3001/admin/bookings/${hotelId}`)
      .then(res => res.json())
      .then(data => {
        setBookings(data || []);

        // 📊 calcul stats
        const paidBookings = data.filter(b => b.status === "paid");

        const revenue = paidBookings.reduce(
          (sum, b) => sum + Number(b.amount),
          0
        );

        setStats({
          total: data.length,
          paid: paidBookings.length,
          revenue
        });
      });
  }, [hotelId]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* HEADER */}
      <h1 className="text-3xl font-black mb-6">
        🧑‍💼 Dashboard Hôtel
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Réservations</h2>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Payées</h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.paid}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Revenus</h2>
          <p className="text-3xl font-bold text-blue-600">
            {stats.revenue} CDF
          </p>
        </div>

      </div>

      {/* TABLE RESERVATIONS */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th>Montant</th>
              <th>Dates</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>

            {bookings.map((b) => (
              <tr key={b.id} className="border-t">

                <td className="p-3 font-medium">
                  {b.user_name}
                </td>

                <td>
                  {b.amount} CDF
                </td>

                <td>
                  {b.check_in} → {b.check_out}
                </td>

                <td>
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${
                    b.status === "paid"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}>
                    {b.status}
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
