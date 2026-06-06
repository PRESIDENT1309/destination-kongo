import { Utensils } from "lucide-react";
import CatalogView from "./CatalogView";

export default function RestaurantsView({
  establishments = [],
  searchQuery = "",
  setViewedPlace,
  setSelectedPlace,
}) {
  return (
    <CatalogView
      establishments={establishments}
      types={["restaurant"]}
      title="Restaurants du Kongo"
      eyebrow="Gastronomie"
      description="Découvrez les meilleures tables, spécialités locales et adresses à proximité pour vos sorties et réservations."
      heroImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
      searchPlaceholder="Rechercher un restaurant, une spécialité ou une ville"
      emptyTitle="Aucun restaurant trouvé"
      emptyText="Essayez une autre spécialité ou une autre ville."
      emptyIcon={Utensils}
      initialSearch={searchQuery}
      setViewedPlace={setViewedPlace}
      setSelectedPlace={setSelectedPlace}
    />
  );
}
