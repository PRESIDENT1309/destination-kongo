import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Building2,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  Megaphone,
  MessageSquare,
  ShieldCheck,
  TicketCheck,
  UserX,
  Users,
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { isAdminUser } from '../lib/account';

const EMPTY_DATA = {
  establishments: [],
  bookings: [],
  profiles: [],
  documents: [],
  disputes: [],
  supportTickets: [],
  announcements: [],
  messages: [],
  notifications: [],
  partnerApplications: [],
};

const OPTIONAL_TABLES = {
  profiles: 'profiles',
  documents: 'verification_documents',
  disputes: 'disputes',
  supportTickets: 'support_tickets',
  announcements: 'announcements',
  messages: 'messages',
  notifications: 'notifications',
  partnerApplications: 'partner_applications',
};

function getStatus(row) {
  return row?.approval_status || row?.status || row?.payment_status || 'pending';
}

function sortRecent(rows) {
  return [...rows].sort((a, b) => {
    const left = new Date(a?.created_at || a?.updated_at || 0).getTime();
    const right = new Date(b?.created_at || b?.updated_at || 0).getTime();
    return right - left;
  });
}

async function fetchTable(table) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .limit(100);

  return { data: sortRecent(data || []), error };
}

async function updateWithFallback(table, id, payloads) {
  let lastError = null;

  for (const payload of payloads) {
    const { error } = await supabase
      .from(table)
      .update(payload)
      .eq('id', id);

    if (!error) return;
    lastError = error;
  }

  throw lastError;
}

function StatCard({ icon: Icon, label, value, tone = 'bg-white text-gray-900' }) {
  return (
    <div className={`${tone} rounded-2xl p-5 shadow-sm border border-gray-100`}>
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-70">{label}</p>
        <Icon size={20} />
      </div>
      <p className="mt-3 text-3xl font-black">{value}</p>
    </div>
  );
}

export default function AdminDashboard({ currentUser, currentProfile, onRequireAuth }) {
  const isAdmin = isAdminUser(currentUser, currentProfile);
  const [activeTab, setActiveTab] = useState('control');
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [actionMessage, setActionMessage] = useState('');
  const [announcement, setAnnouncement] = useState({
    title: '',
    message: '',
    audience: 'all',
  });

  const loadDashboard = useCallback(async () => {
    if (!isAdmin) return;

    setLoading(true);
    setErrors([]);

    const coreResults = await Promise.all([
      fetchTable('establishments'),
      fetchTable('bookings'),
    ]);

    const optionalResults = await Promise.all(
      Object.entries(OPTIONAL_TABLES).map(async ([key, table]) => {
        const result = await fetchTable(table);
        return [key, result];
      })
    );

    const nextErrors = [];
    const nextData = {
      ...EMPTY_DATA,
      establishments: coreResults[0].data || [],
      bookings: coreResults[1].data || [],
    };

    if (coreResults[0].error) nextErrors.push(`establishments: ${coreResults[0].error.message}`);
    if (coreResults[1].error) nextErrors.push(`bookings: ${coreResults[1].error.message}`);

    optionalResults.forEach(([key, result]) => {
      nextData[key] = result.data || [];
      if (result.error) nextErrors.push(`${OPTIONAL_TABLES[key]}: ${result.error.message}`);
    });

    setData(nextData);
    setErrors(nextErrors);
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadDashboard();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadDashboard]);

  const stats = useMemo(() => {
    const pendingEstablishments = data.establishments.filter((item) => {
      const status = getStatus(item);
      return ['pending', 'review', 'in_review'].includes(status);
    }).length;

    const paidBookings = data.bookings.filter((booking) => (
      booking?.payment_status === 'paid' || booking?.status === 'paid'
    ));

    const revenue = paidBookings.reduce(
      (sum, booking) => sum + Number(booking?.amount || 0),
      0
    );

    return {
      establishments: data.establishments.length,
      pendingEstablishments,
      accounts: data.profiles.length,
      suspendedAccounts: data.profiles.filter((profile) => profile?.status === 'suspended').length,
      pendingDocuments: data.documents.filter((document) => getStatus(document) === 'pending').length,
      pendingPartners: data.partnerApplications.filter((application) => getStatus(application) === 'pending').length,
      openDisputes: data.disputes.filter((dispute) => getStatus(dispute) !== 'closed').length,
      bookings: data.bookings.length,
      revenue,
      unreadNotifications: data.notifications.filter((notification) => (
        getStatus(notification) === 'unread'
      )).length,
    };
  }, [data]);

  async function runAction(action) {
    setActionMessage('');

    try {
      await action();
      await loadDashboard();
      setActionMessage('Action enregistrée dans la base de données.');
    } catch (error) {
      setActionMessage(`Action impossible: ${error.message}`);
    }
  }

  function updateEstablishment(id, status) {
    const payloads = status === 'approved'
      ? [
        { approval_status: 'approved', status: 'active', verified: true },
        { approval_status: 'approved', status: 'active' },
        { approval_status: 'approved' },
        { status: 'active' },
      ]
      : [
        { approval_status: status, status, verified: false },
        { approval_status: status, status },
        { approval_status: status },
        { status },
      ];

    return runAction(() => updateWithFallback('establishments', id, payloads));
  }

  function updateProfile(id, status) {
    return runAction(() => updateWithFallback('profiles', id, [
      { status },
      { account_status: status },
    ]));
  }

  function updateDocument(id, status) {
    return runAction(() => updateWithFallback('verification_documents', id, [
      { status, reviewed_by: currentUser.id },
      { status },
    ]));
  }

  function updatePartnerApplication(id, status) {
    return runAction(() => updateWithFallback('partner_applications', id, [
      { status, reviewed_by: currentUser.id, reviewed_at: new Date().toISOString() },
      { status },
    ]));
  }

  function updatePayment(id, status) {
    return runAction(() => updateWithFallback('bookings', id, [
      { payment_status: status, status },
      { payment_status: status },
      { status },
    ]));
  }

  async function sendAnnouncement(event) {
    event.preventDefault();

    if (!announcement.title.trim() || !announcement.message.trim()) return;

    await runAction(async () => {
      const { error } = await supabase
        .from('announcements')
        .insert([{
          title: announcement.title.trim(),
          message: announcement.message.trim(),
          audience: announcement.audience,
          status: 'sent',
          created_by: currentUser.id,
        }]);

      if (error) throw error;
      setAnnouncement({ title: '', message: '', audience: 'all' });
    });
  }

  if (!currentUser) {
    return (
      <section className="min-h-screen bg-gray-50 px-6 py-28">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border">
          <ShieldCheck className="text-blue-700" size={32} />
          <h1 className="mt-4 text-3xl font-black">Administration Destination Kongo</h1>
          <p className="mt-2 text-gray-600">Connexion requise pour accéder au centre de contrôle.</p>
          <button
            onClick={onRequireAuth}
            className="mt-6 bg-black text-white px-5 py-3 rounded-xl font-bold"
          >
            Se connecter
          </button>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="min-h-screen bg-gray-50 px-6 py-28">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border">
          <UserX className="text-red-600" size={32} />
          <h1 className="mt-4 text-3xl font-black">Accès administration refusé</h1>
          <p className="mt-2 text-gray-600">
            Ce compte doit avoir le rôle <span className="font-bold">admin</span> dans la table profiles ou dans les metadata Supabase.
          </p>
        </div>
      </section>
    );
  }

  const tabs = [
    { id: 'control', label: 'Contrôle' },
    { id: 'validation', label: 'Validation' },
    { id: 'communication', label: 'Communication' },
    { id: 'support', label: 'Support' },
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-bold text-blue-700 uppercase">Compte Administration</p>
            <h1 className="text-4xl font-black text-gray-950">Destination Kongo Control Center</h1>
            <p className="text-gray-600 mt-2">Monitoring, validation, paiements et communication officielle.</p>
          </div>

          <button
            onClick={loadDashboard}
            className="bg-black text-white px-5 py-3 rounded-xl font-bold disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Synchronisation...' : 'Actualiser'}
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <p className="font-bold">Tables à vérifier dans Supabase</p>
            <p className="mt-1">
              Applique le fichier <span className="font-bold">database/destination_kongo_admin.sql</span> pour activer toutes les données admin.
            </p>
          </div>
        )}

        {actionMessage && (
          <div className="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-950">
            {actionMessage}
          </div>
        )}

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Building2} label="Établissements" value={stats.establishments} />
          <StatCard icon={FileCheck2} label="Validations en attente" value={stats.pendingEstablishments + stats.pendingDocuments + stats.pendingPartners} />
          <StatCard icon={Users} label="Comptes" value={stats.accounts} />
          <StatCard icon={CreditCard} label="Revenus payés" value={`${stats.revenue} CDF`} tone="bg-gray-950 text-white" />
        </div>

        <div className="bg-white rounded-2xl border shadow-sm mb-8 p-2 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'control' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck size={20} /> Comptes
              </h2>
              <div className="space-y-3">
                {data.profiles.slice(0, 8).map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between gap-4 border rounded-xl p-3">
                    <div>
                      <p className="font-bold">{profile.full_name || profile.email || 'Compte'}</p>
                      <p className="text-xs text-gray-500">{profile.role || 'user'} · {profile.status || 'active'}</p>
                    </div>
                    <button
                      onClick={() => updateProfile(profile.id, profile.status === 'suspended' ? 'active' : 'suspended')}
                      className="px-3 py-2 rounded-lg bg-gray-950 text-white text-xs font-bold"
                    >
                      {profile.status === 'suspended' ? 'Réactiver' : 'Suspendre'}
                    </button>
                  </div>
                ))}
                {data.profiles.length === 0 && <p className="text-gray-500">Aucun compte synchronisé.</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <CreditCard size={20} /> Paiements
              </h2>
              <div className="space-y-3">
                {data.bookings.slice(0, 8).map((booking) => (
                  <div key={booking.id || booking.code} className="flex items-center justify-between gap-4 border rounded-xl p-3">
                    <div>
                      <p className="font-bold">{booking.code || booking.place || 'Réservation'}</p>
                      <p className="text-xs text-gray-500">{booking.amount || 0} CDF · {getStatus(booking)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updatePayment(booking.id, 'paid')}
                        className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-bold"
                      >
                        Payé
                      </button>
                      <button
                        onClick={() => updatePayment(booking.id, 'failed')}
                        className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
                      >
                        Échec
                      </button>
                    </div>
                  </div>
                ))}
                {data.bookings.length === 0 && <p className="text-gray-500">Aucun paiement enregistré.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'validation' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Building2 size={20} /> Établissements
              </h2>
              <div className="space-y-3">
                {data.establishments.slice(0, 10).map((item) => (
                  <div key={item.id} className="border rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold">{item.name || 'Établissement'}</p>
                        <p className="text-xs text-gray-500">{item.type || 'type'} · {item.city || 'ville'} · {getStatus(item)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        <button
                          onClick={() => updateEstablishment(item.id, 'approved')}
                          className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-bold"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => updateEstablishment(item.id, 'suspended')}
                          className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
                        >
                          Suspendre
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {data.establishments.length === 0 && <p className="text-gray-500">Aucun établissement trouvé.</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <FileCheck2 size={20} /> Documents
              </h2>
              <div className="space-y-3">
                {data.documents.slice(0, 10).map((document) => (
                  <div key={document.id} className="flex items-center justify-between gap-4 border rounded-xl p-3">
                    <div>
                      <p className="font-bold">{document.document_type || document.title || 'Document'}</p>
                      <p className="text-xs text-gray-500">{getStatus(document)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateDocument(document.id, 'approved')}
                        className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-bold"
                      >
                        Valider
                      </button>
                      <button
                        onClick={() => updateDocument(document.id, 'rejected')}
                        className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
                {data.documents.length === 0 && <p className="text-gray-500">Aucun document en attente.</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6 lg:col-span-2">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Users size={20} /> Demandes partenaires
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {data.partnerApplications.slice(0, 8).map((application) => (
                  <div key={application.id} className="border rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <p className="font-bold">{application.establishment_name || 'Partenaire'}</p>
                        <p className="text-xs text-gray-500">
                          {application.city || 'ville'} · {application.professional_email || 'email'} · {getStatus(application)}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {application.description || 'Aucune description'}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {[
                            ['RCCM', application.rccm_url],
                            ['ID Nat', application.id_nat_url],
                            ['Licence', application.licence_url],
                            ['Photos', application.photos_url],
                          ].filter(([, url]) => Boolean(url)).map(([label, url]) => (
                            <a
                              key={label}
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg"
                            >
                              {label}
                            </a>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updatePartnerApplication(application.id, 'approved')}
                          className="px-3 py-2 rounded-lg bg-green-600 text-white text-xs font-bold"
                        >
                          Approuver
                        </button>
                        <button
                          onClick={() => updatePartnerApplication(application.id, 'rejected')}
                          className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-bold"
                        >
                          Refuser
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {data.partnerApplications.length === 0 && <p className="text-gray-500">Aucune demande partenaire.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
            <form onSubmit={sendAnnouncement} className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Megaphone size={20} /> Annonce officielle
              </h2>
              <div className="space-y-3">
                <input
                  value={announcement.title}
                  onChange={(event) => setAnnouncement((current) => ({ ...current, title: event.target.value }))}
                  className="w-full border rounded-xl p-3"
                  placeholder="Titre"
                />
                <select
                  value={announcement.audience}
                  onChange={(event) => setAnnouncement((current) => ({ ...current, audience: event.target.value }))}
                  className="w-full border rounded-xl p-3"
                >
                  <option value="all">Tous</option>
                  <option value="users">Utilisateurs</option>
                  <option value="partners">Partenaires</option>
                </select>
                <textarea
                  value={announcement.message}
                  onChange={(event) => setAnnouncement((current) => ({ ...current, message: event.target.value }))}
                  className="w-full border rounded-xl p-3 h-32"
                  placeholder="Message"
                />
                <button className="w-full bg-black text-white rounded-xl py-3 font-bold">
                  Envoyer
                </button>
              </div>
            </form>

            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <Bell size={20} /> Flux communication
              </h2>
              <div className="grid sm:grid-cols-3 gap-3 mb-4">
                <StatCard icon={Megaphone} label="Annonces" value={data.announcements.length} />
                <StatCard icon={MessageSquare} label="Messages" value={data.messages.length} />
                <StatCard icon={Bell} label="Notifications" value={stats.unreadNotifications} />
              </div>
              <div className="space-y-3">
                {data.announcements.slice(0, 5).map((item) => (
                  <div key={item.id} className="border rounded-xl p-3">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.audience || 'all'} · {item.status || 'sent'}</p>
                  </div>
                ))}
                {data.announcements.length === 0 && <p className="text-gray-500">Aucune annonce enregistrée.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <TicketCheck size={20} /> Support
              </h2>
              <div className="space-y-3">
                {data.supportTickets.slice(0, 10).map((ticket) => (
                  <div key={ticket.id} className="border rounded-xl p-3">
                    <p className="font-bold">{ticket.subject || 'Ticket support'}</p>
                    <p className="text-xs text-gray-500">{ticket.category || 'support'} · {getStatus(ticket)}</p>
                  </div>
                ))}
                {data.supportTickets.length === 0 && <p className="text-gray-500">Aucun ticket support.</p>}
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-black mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} /> Litiges
              </h2>
              <div className="space-y-3">
                {data.disputes.slice(0, 10).map((dispute) => (
                  <div key={dispute.id} className="border rounded-xl p-3">
                    <p className="font-bold">{dispute.subject || 'Litige'}</p>
                    <p className="text-xs text-gray-500">{dispute.priority || 'normal'} · {getStatus(dispute)}</p>
                  </div>
                ))}
                {data.disputes.length === 0 && <p className="text-gray-500">Aucun litige ouvert.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
