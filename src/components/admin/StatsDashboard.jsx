import React, { useEffect, useState } from "react";

export default function StatsDashboard({ hotelId }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/stats/revenue/${hotelId}`)
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, [hotelId]);

  if (!stats) {
    return <div className="p-6">Chargement statistiques...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

      {/* TOTAL REVENUE */}
      <div className="bg-black text-white p-6 rounded-2xl">
        <h3 className="text-sm opacity-70">Revenus totaux</h3>
        <p className="text-3xl font-bold">
          {stats.total_revenue} CDF
        </p>
      </div>

      {/* BOOKINGS */}
      <div className="bg-green-600 text-white p-6 rounded-2xl">
        <h3 className="text-sm opacity-70">
          Réservations payées
        </h3>

        <p className="text-3xl font-bold">
          {stats.total_bookings}
        </p>
      </div>

      {/* TODAY */}
      <div className="bg-blue-600 text-white p-6 rounded-2xl">
        <h3 className="text-sm opacity-70">
          Revenus aujourd’hui
        </h3>

        <p className="text-3xl font-bold">
          {stats.today_revenue} CDF
        </p>
      </div>

    </div>
  );
}