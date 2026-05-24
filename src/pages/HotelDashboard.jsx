import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js"; // Un seul point "."

export default function HotelDashboard({ hotelId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    paid: 0,
    revenue: 0
  });

  // =========================
  // LOAD BOOKINGS
  // =========================
  async function loadBookings() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("establishment_id", hotelId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
      computeStats(data || []);
    } catch (err) {
      console.error(
        "Erreur chargement dashboard:",
        err.message
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // STATS
  // =========================
  function computeStats(data) {
    const total = data.length;

    const pending = data.filter(
      b => b?.status === "pending"
    ).length;

    const paid = data.filter(
      b => b?.payment_status === "paid"
    ).length;

    const revenue = data
      .filter(
        b => b?.payment_status === "paid"
      )
      .reduce(
        (sum, b) => sum + Number(b?.amount || 0),
        0
      );

    setStats({
      total,
      pending,
      paid,
      revenue
    });
  }

  useEffect(() => {
    if (hotelId) {
      loadBookings();
    } else {
      setLoading(false);
    }
  }, [hotelId]);

  // =========================
  // UPDATE STATUS
  // =========================
  async function updateStatus(id, status) {
    try {
      await supabase
        .from("bookings")
        .update({
          status
        })
        .eq("id", id);

      loadBookings();
    } catch (err) {
      console.error(
        err.message
      );
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-black">
          Dashboard Hôtel
        </h1>
        <p className="text-gray-500">
          Gestion des réservations
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Total</p>
          <h2 className="text-2xl font-bold">{stats.total}</h2>
        </div>

        <div className="bg-yellow-100 p-5 rounded-2xl">
          <p className="text-gray-600">En attente</p>
          <h2 className="text-2xl font-bold">{stats.pending}</h2>
        </div>

        <div className="bg-green-100 p-5 rounded-2xl">
          <p className="text-gray-600">Confirmées</p>
          <h2 className="text-2xl font-bold">{stats.paid}</h2>
        </div>

        <div className="bg-black text-white p-5 rounded-2xl">
          <p className="opacity-70">Revenus</p>
          <h2 className="text-2xl font-bold">{stats.revenue} CDF</h2>
        </div>
      </div>

      {/* LISTE */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4">Chargement...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-3xl shadow p-10 text-center">
          <h2 className="text-xl font-bold">Aucune réservation</h2>
          <p className="text-gray-500 mt-2">Les réservations apparaîtront ici</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-5 rounded-2xl shadow flex flex-col md:flex-row justify-between md:items-center gap-4"
            >
              {/* INFOS */}
              <div>
                <h3 className="font-bold text-lg">
                  {b?.code || "CODE"}
                </h3>
                <p className="text-sm text-gray-500">
                  {b?.nom || ""} {b?.postnom || ""} {b?.prenom || ""}
                </p>
                <p className="text-sm text-gray-400">
                  {b?.amount || 0} CDF • {b?.status || "pending"}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(b.id, "confirmed")}
                  className="bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Accepter
                </button>
                <button
                  onClick={() => updateStatus(b.id, "rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Refuser
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}