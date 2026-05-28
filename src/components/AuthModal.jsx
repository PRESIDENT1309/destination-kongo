import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ setShowAuthModal, setCurrentUser }) {
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authNom, setAuthNom] = useState('');
  const [authPostnom, setAuthPostnom] = useState('');
  const [authPrenom, setAuthPrenom] = useState('');
  const [authTelephone, setAuthTelephone] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative my-8 border border-gray-100">
        <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-black text-lg">✕</button>

        <div className="text-center mb-6">
          <span className="text-4xl">🇨🇩</span>
          <h2 className="text-2xl font-black text-blue-950 mt-2">{isSignUp ? "Créer un profil royal" : "Accès à votre espace"}</h2>
          <p className="text-gray-500 text-xs mt-1">Rejoignez l'élite des voyageurs sur Destination Kongo</p>
        </div>

        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                  email: authEmail,
                  password: authPassword,
                  options: {
                    data: {
                      last_name: authNom,
                      post_name: authPostnom,
                      first_name: authPrenom,
                      phone_number: authTelephone
                    }
                  }
                });
                if (error) throw error;
                alert("Inscription impériale enregistrée avec succès !");
                setCurrentUser(data.user);
              } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                  email: authEmail,
                  password: authPassword
                });
                if (error) throw error;
                setCurrentUser(data.user);
              }
              setShowAuthModal(false);
            } catch (error) {
              alert("Alerte système : " + error.message);
            }
          }} 
          className="space-y-4"
        >
          {isSignUp && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Nom</label>
                  <input type="text" required className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500" value={authNom} onChange={(e) => setAuthNom(e.target.value)} placeholder="KADIMA" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Post-nom</label>
                  <input type="text" required className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500" value={authPostnom} onChange={(e) => setAuthPostnom(e.target.value)} placeholder="KAPUYA" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Prénom</label>
                  <input type="text" required className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500" value={authPrenom} onChange={(e) => setAuthPrenom(e.target.value)} placeholder="Patrick" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Téléphone</label>
                  <input type="tel" required className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500" value={authTelephone} onChange={(e) => setAuthTelephone(e.target.value)} placeholder="+243..." />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Adresse Email</label>
            <input type="email" required className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} placeholder="patrick@kongo.cd" />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Mot de passe (Min. 6 caractères)</label>
            <input type="password" required className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white font-black py-3.5 rounded-xl shadow-lg text-sm mt-2 transition">
            {isSignUp ? "Finaliser la création de mon compte" : "Se connecter"}
          </button>

          <div className="text-center pt-3 border-t border-gray-100 mt-4">
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-amber-600 hover:underline"
            >
              {isSignUp ? "Déjà membre ? Connectez-vous" : "Nouveau profil ? S'enregistrer ici"}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}
