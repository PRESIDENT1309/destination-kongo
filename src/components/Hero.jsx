import React from "react";

export default function Hero({
  currentPage,
  setCurrentPage,
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity
}){

  return (
    <header className="relative h-[85vh] flex items-center justify-center overflow-hidden">

      {/* IMAGE BACKGROUND */}
      <img
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* OVERLAY PREMIUM */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 text-center text-white max-w-3xl px-6">

        {/* BRAND */}
        <p className="text-sm tracking-[0.3em] text-white/70 uppercase">
          Destination Kongo
        </p>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-black mt-6 leading-tight">
          Explorez la RDC autrement
        </h1>

        <p className="text-white/70 mt-4 text-lg">
          Hôtels, restaurants et sites touristiques réunis dans une seule plateforme.
        </p>

        {/* SIMPLE SEARCH */}
        <div className="mt-10 bg-white rounded-2xl p-2 flex items-center max-w-xl mx-auto">

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un lieu, hôtel ou restaurant..."
            className="flex-1 px-4 py-3 outline-none text-black"
          />

          <button
            onClick={() => setCurrentPage("hotels")}
            className="bg-black text-white px-6 py-3 rounded-xl font-bold"
          >
            Explorer
          </button>

        </div>

        {/* QUICK ACTIONS */}
        <div className="flex justify-center gap-3 mt-6 flex-wrap">

          <button
            onClick={() => setCurrentPage("hotels")}
            className="bg-white/10 backdrop-blur px-5 py-2 rounded-full"
          >
            Hôtels
          </button>

          <button
            onClick={() => setCurrentPage("restaurants")}
            className="bg-white/10 backdrop-blur px-5 py-2 rounded-full"
          >
            Restaurants
          </button>

          <button
            onClick={() => setCurrentPage("sites")}
            className="bg-white/10 backdrop-blur px-5 py-2 rounded-full"
          >
            Sites
          </button>

        </div>

      </div>
    </header>
  );
}