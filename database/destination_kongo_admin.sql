-- Destination Kongo admin/account schema for Supabase.
-- Run this file in the Supabase SQL editor after reviewing RLS policies.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user', 'partner', 'admin')),
  status text not null default 'active' check (status in ('active', 'suspended', 'blocked')),
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and status = 'active'
  );
$$;

alter table if exists public.establishments
  add column if not exists owner_id uuid references auth.users(id),
  add column if not exists approval_status text not null default 'pending',
  add column if not exists status text not null default 'active',
  add column if not exists verified boolean not null default false,
  add column if not exists reviewed_by uuid references auth.users(id),
  add column if not exists reviewed_at timestamptz;

alter table if exists public.bookings
  add column if not exists code text,
  add column if not exists establishment_owner_id uuid references auth.users(id),
  add column if not exists amount numeric not null default 0,
  add column if not exists payment_status text not null default 'pending',
  add column if not exists message text,
  add column if not exists qr_payload text,
  add column if not exists invoice_url text;

create table if not exists public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  establishment_name text not null,
  city text not null,
  professional_email text not null,
  description text,
  rccm_url text,
  id_nat_url text,
  licence_url text,
  photos_url text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table if exists public.partner_applications
  add column if not exists rccm_url text,
  add column if not exists id_nat_url text,
  add column if not exists licence_url text,
  add column if not exists photos_url text;

create table if not exists public.verification_documents (
  id uuid primary key default gen_random_uuid(),
  establishment_id text,
  owner_id uuid references auth.users(id),
  document_type text not null,
  file_url text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references auth.users(id),
  sender_name text,
  recipient_id uuid references auth.users(id),
  establishment_id text,
  booking_id text,
  channel text not null default 'chat',
  content text not null,
  status text not null default 'sent' check (status in ('sent', 'read', 'archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid references auth.users(id),
  type text not null,
  title text not null,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read')),
  booking_id text,
  establishment_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  subject text not null,
  category text not null default 'support',
  status text not null default 'open' check (status in ('open', 'in_progress', 'closed')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),
  booking_id text,
  opened_by uuid references auth.users(id),
  subject text not null,
  status text not null default 'open' check (status in ('open', 'in_review', 'closed')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  audience text not null default 'all' check (audience in ('all', 'users', 'partners')),
  status text not null default 'draft' check (status in ('draft', 'sent', 'archived')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  action text not null,
  entity_table text,
  entity_id uuid,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.partner_applications enable row level security;
alter table public.verification_documents enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.support_tickets enable row level security;
alter table public.disputes enable row level security;
alter table public.announcements enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles for update
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self"
on public.profiles for insert
with check (id = auth.uid());

drop policy if exists "partner_applications_insert_public" on public.partner_applications;
create policy "partner_applications_insert_public"
on public.partner_applications for insert
with check (true);

drop policy if exists "partner_applications_admin_all" on public.partner_applications;
create policy "partner_applications_admin_all"
on public.partner_applications for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin_all_documents" on public.verification_documents;
create policy "admin_all_documents"
on public.verification_documents for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "owner_select_documents" on public.verification_documents;
create policy "owner_select_documents"
on public.verification_documents for select
using (owner_id = auth.uid() or public.is_admin());

drop policy if exists "message_participants_select" on public.messages;
create policy "message_participants_select"
on public.messages for select
using (sender_id = auth.uid() or recipient_id = auth.uid() or public.is_admin());

drop policy if exists "message_participants_insert" on public.messages;
create policy "message_participants_insert"
on public.messages for insert
with check (sender_id = auth.uid() or recipient_id is not null or public.is_admin());

drop policy if exists "notification_recipient_select" on public.notifications;
create policy "notification_recipient_select"
on public.notifications for select
using (recipient_id = auth.uid() or public.is_admin());

drop policy if exists "notification_insert_authenticated" on public.notifications;
create policy "notification_insert_authenticated"
on public.notifications for insert
with check (auth.uid() is not null or recipient_id is not null);

drop policy if exists "support_owner_or_admin" on public.support_tickets;
create policy "support_owner_or_admin"
on public.support_tickets for all
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "disputes_owner_or_admin" on public.disputes;
create policy "disputes_owner_or_admin"
on public.disputes for all
using (opened_by = auth.uid() or public.is_admin())
with check (opened_by = auth.uid() or public.is_admin());

drop policy if exists "announcements_select_all" on public.announcements;
create policy "announcements_select_all"
on public.announcements for select
using (status = 'sent' or public.is_admin());

drop policy if exists "announcements_admin_all" on public.announcements;
create policy "announcements_admin_all"
on public.announcements for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "audit_logs_admin_select" on public.audit_logs;
create policy "audit_logs_admin_select"
on public.audit_logs for select
using (public.is_admin());
