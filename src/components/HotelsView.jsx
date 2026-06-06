import { Hotel } from "lucide-react";
import CatalogView from "./CatalogView";

export default function HotelsView({
  establishments = [],
  searchQuery = "",
  setViewedPlace,
  setSelectedPlace,
}) {
  return (
    <CatalogView
      establishments={establishments}
      types={["hotel"]}
      title="Hôtels du Kongo"
      eyebrow="Séjours"
      description="Trouvez un hébergement fiable, confortable et adapté à votre voyage, avec une réservation simple depuis votre téléphone."
      heroImage="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80"
      searchPlaceholder="Rechercher un hôtel, une ville ou une adresse"
      emptyTitle="Aucun hôtel trouvé"
      emptyText="Essayez une autre ville ou un autre mot-clé."
      emptyIcon={Hotel}
      initialSearch={searchQuery}
      setViewedPlace={setViewedPlace}
      setSelectedPlace={setSelectedPlace}
    />
  );
}
