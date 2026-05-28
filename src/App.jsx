import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import HotelDashboard from "./pages/HotelDashboard";

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingModal from './components/BookingModal';
import DetailsModal from './components/DetailsModal';
import AuthModal from './components/AuthModal';
import HomeView from './components/HomeView';
import Footer from './components/Footer';

// Views
import HotelsView from './components/HotelsView';
import RestaurantsView from './components/RestaurantsView';
import SitesView from './components/SitesView';

// Ticket
import BookingTicket from "./components/BookingTicket";

// Pages
import PartnerPage from "./pages/PartnerPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {

  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Toutes');

  const [establishments, setEstablishments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewedPlace, setViewedPlace] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [booking, setBooking] = useState(null);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    setSearchQuery('');
    setSelectedCity('Toutes');
  }, []);

  useEffect(() => {

    async function fetchEstablishments() {
      setLoading(true);

      try {

        const { data, error } =
          await supabase
            .from('establishments')
            .select('*');

        if (error) throw error;

        setEstablishments(data || []);

      } catch (error) {

        console.error(
          "Erreur chargement :",
          error.message
        );

      } finally {
        setLoading(false);
      }
    }

    fetchEstablishments();

    supabase.auth
      .getSession()
      .then(({ data:{session} }) => {

        if(session){
          setCurrentUser(session.user);
        }

      });

  }, []);

  return (

    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">

      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setShowAuthModal={setShowAuthModal}
      />

      {currentPage === "home" && (

<Hero
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  setCurrentPage={handlePageChange}
/>

      )}

      <main className="flex-grow w-full">

        {loading ? (

          <div className="flex flex-col items-center justify-center py-24">

            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

            <p className="mt-4">
              Chargement...
            </p>

          </div>

        ) : (

          <>

            {currentPage === 'home' && (

              <div className="max-w-7xl mx-auto px-4 py-16">

                <HomeView
                  establishments={establishments}
                  setCurrentPage={handlePageChange}
                  setViewedPlace={setViewedPlace}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                />

              </div>

            )}

            {currentPage === 'hotels' && (

              <HotelsView
                establishments={establishments}
                setViewedPlace={setViewedPlace}
                setSelectedPlace={setSelectedPlace}
              />

            )}

            {currentPage === "admin-hotel" && (
  <HotelDashboard hotelId={currentUser?.id} />
)}

            {currentPage === 'restaurants' && (

              <div className="max-w-7xl mx-auto px-4 py-16">

                <RestaurantsView
                  establishments={establishments}
                  searchQuery={searchQuery}
                  selectedCity={selectedCity}
                  setViewedPlace={setViewedPlace}
                  setSelectedPlace={setSelectedPlace}
                />

              </div>

            )}

            {currentPage === 'sites' && (

              <div className="max-w-7xl mx-auto px-4 py-16">

                <SitesView
                  establishments={establishments}
                  searchQuery={searchQuery}
                  selectedCity={selectedCity}
                  setViewedPlace={setViewedPlace}
                  setSelectedPlace={setSelectedPlace}
                />

              </div>

            )}

            {currentPage === "partner" && (
              <PartnerPage />
            )}

            {currentPage === "about" && (
              <AboutPage />
            )}

            {currentPage === "contact" && (
              <ContactPage />
            )}

          </>

        )}

      </main>

      <Footer
        currentPage={currentPage}
        onNavigate={handlePageChange}
      />

      {selectedPlace && (

        <BookingModal
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          setBooking={setBooking}
        />

      )}

      {viewedPlace && (

        <DetailsModal
          viewedPlace={viewedPlace}
          setViewedPlace={setViewedPlace}
          setSelectedPlace={setSelectedPlace}
        />

      )}

      {showAuthModal && (

        <AuthModal
          setShowAuthModal={setShowAuthModal}
          setCurrentUser={setCurrentUser}
        />

      )}

      {booking && (

        <BookingTicket
          booking={booking}
          onClose={() => setBooking(null)}
        />

      )}

    </div>

  );
}

export default App;
