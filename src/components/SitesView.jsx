import { Compass } from "lucide-react";
import CatalogView from "./CatalogView";

export default function SitesView({
  establishments = [],
  searchQuery = "",
  setViewedPlace,
  setSelectedPlace,
}) {
  return (
    <CatalogView
      establishments={establishments}
      types={["site", "tourist_site"]}
      title="Sites touristiques"
      eyebrow="Découverte"
      description="Parcourez les lieux naturels, culturels et historiques de la RDC avec des informations claires pour organiser votre visite."
      heroImage="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=80"
      searchPlaceholder="Rechercher un site, une ville ou une activité"
      emptyTitle="Aucun site trouvé"
      emptyText="Vérifiez les données disponibles ou essayez une autre recherche."
      emptyIcon={Compass}
      initialSearch={searchQuery}
      setViewedPlace={setViewedPlace}
      setSelectedPlace={setSelectedPlace}
    />
  );
}
