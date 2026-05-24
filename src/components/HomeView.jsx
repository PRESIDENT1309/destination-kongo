import React from "react";
import {
  Hotel,
  Utensils,
  Mountain,
  TrendingUp,
  MapPin
} from "lucide-react";

export default function HomeView({
  establishments = [],
  setCurrentPage
}) {

  const hotelsCount = establishments.filter(e => e.type === "hotel").length;
  const restaurantsCount = establishments.filter(e => e.type === "restaurant").length;
  const sitesCount = establishments.filter(e => e.type === "site" || e.type === "tourist_site").length;

  const popular = establishments.slice(0, 6);

  return (
    <div className="bg-[#f8f8f8]">

      {/* SECTION 1 - 3 GRANDS BLOCS CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-black mb-10">
          Explorer par catégorie
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* HOTELS */}
          <div
            onClick={() => setCurrentPage("hotels")}
            className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
              className="h-52 w-full object-cover"
            />

            <div className="p-6">
              <Hotel className="mb-3" />
              <h3 className="text-xl font-black">Hôtels</h3>
              <p className="text-gray-500">
                {hotelsCount} établissements disponibles
              </p>
            </div>
          </div>

          {/* RESTAURANTS */}
          <div
            onClick={() => setCurrentPage("restaurants")}
            className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
              className="h-52 w-full object-cover"
            />

            <div className="p-6">
              <Utensils className="mb-3" />
              <h3 className="text-xl font-black">Restaurants</h3>
              <p className="text-gray-500">
                {restaurantsCount} restaurants disponibles
              </p>
            </div>
          </div>

          {/* SITES */}
          <div
            onClick={() => setCurrentPage("sites")}
            className="bg-white rounded-[30px] overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              className="h-52 w-full object-cover"
            />

            <div className="p-6">
              <Mountain className="mb-3" />
              <h3 className="text-xl font-black">Sites touristiques</h3>
              <p className="text-gray-500">
                {sitesCount} lieux à découvrir
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 - DESTINATIONS POPULAIRES */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-black mb-6">
          Destinations populaires
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {popular.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >

              <img
                src={item?.images?.[0] || "https://images.unsplash.com/photo-1501117716987-c8e1ecb2105a"}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">
                <div className="flex items-center text-gray-500">
                  <MapPin size={14} />
                  <span className="ml-2 text-sm">{item.city}</span>
                </div>

                <h3 className="font-bold mt-2">{item.name}</h3>
              </div>

            </div>
          ))}

        </div>

      </section>

      {/* SECTION 3 - STATS */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="bg-blue-600 text-white rounded-[30px] grid md:grid-cols-4 text-center p-10">

          <div>
            <h1 className="text-4xl font-black">{establishments.length}</h1>
            <p>Établissements</p>
          </div>

          <div>
            <h1 className="text-4xl font-black">26</h1>
            <p>Provinces</p>
          </div>

          <div>
            <h1 className="text-4xl font-black">1000+</h1>
            <p>Voyageurs</p>
          </div>

          <div>
            <h1 className="text-4xl font-black">24/7</h1>
            <p>Support</p>
          </div>

        </div>

      </section>

      {/* SECTION 4 - WHY DESTINATION KONGO */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-2xl font-black mb-6">
          Pourquoi Destination Kongo ?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <TrendingUp />
            <h3 className="font-bold mt-3">Croissance locale</h3>
            <p className="text-gray-500 text-sm mt-2">
              Nous valorisons les établissements du Congo.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <Hotel />
            <h3 className="font-bold mt-3">Réservation simple</h3>
            <p className="text-gray-500 text-sm mt-2">
              Un seul système pour tous les lieux.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <MapPin />
            <h3 className="font-bold mt-3">Découverte locale</h3>
            <p className="text-gray-500 text-sm mt-2">
              Explorez les trésors cachés du pays.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}