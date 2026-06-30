-- ============================================================
-- Wig Repair Portal — Database Schema
-- ============================================================

-- profiles (admin users only)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin',
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Admin reads own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admin updates own profile" on public.profiles for update using (auth.uid() = id);

-- requests
create table public.requests (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  service_type text not null check (service_type in ('repair', 'new_wig')),
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  customer_city_state text,
  issue_type text,
  wig_for text,
  style_requested text,
  budget_range text,
  customer_notes text,
  customer_visible_notes text,
  status text not null default 'Request Received',
  quote_amount numeric,
  deposit_amount numeric,
  final_balance numeric,
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','deposit_paid','paid_in_full','refunded')),
  shipping_tracking_in text,
  shipping_tracking_out text,
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.requests enable row level security;

-- Admin can do everything; public can only insert (via service role in API)
create policy "Admin full access to requests" on public.requests
  for all using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- No public select/update/delete — submissions go through service-role API routes only

-- request_photos
create table public.request_photos (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  photo_type text not null,
  file_url text not null,
  storage_path text not null,
  created_at timestamptz default now()
);
alter table public.request_photos enable row level security;
create policy "Admin full access to photos" on public.request_photos
  for all using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- status_history
create table public.status_history (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  status text not null,
  note text,
  created_at timestamptz default now()
);
alter table public.status_history enable row level security;
create policy "Admin full access to history" on public.status_history
  for all using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- gallery_items
create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  before_image_url text,
  after_image_url text,
  before_storage_path text,
  after_storage_path text,
  title text,
  description text,
  service_type text,
  is_published boolean not null default false,
  created_at timestamptz default now()
);
alter table public.gallery_items enable row level security;
create policy "Admin full access to gallery" on public.gallery_items
  for all using ((select role from public.profiles where id = auth.uid()) = 'admin');
create policy "Public can view published gallery" on public.gallery_items
  for select using (is_published = true);

-- Indexes
create index idx_requests_order_number on public.requests(order_number);
create index idx_requests_status on public.requests(status);
create index idx_requests_service_type on public.requests(service_type);
create index idx_requests_created_at on public.requests(created_at desc);
create index idx_request_photos_request_id on public.request_photos(request_id);
create index idx_status_history_request_id on public.status_history(request_id);
create index idx_gallery_published on public.gallery_items(is_published);

-- Auto-create profile on new auth user
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Track order: security definer function — safe public lookup
-- Returns ONLY safe fields, never admin_notes, never other customers' data
create or replace function public.track_order(p_order_number text, p_contact text)
returns table (
  order_number text,
  service_type text,
  customer_name text,
  status text,
  quote_amount numeric,
  payment_status text,
  shipping_tracking_in text,
  shipping_tracking_out text,
  customer_visible_notes text,
  created_at timestamptz
)
language plpgsql security definer set search_path = public as $$
begin
  -- Require BOTH order_number AND matching phone/email
  return query
  select
    r.order_number,
    r.service_type,
    split_part(r.customer_name, ' ', 1) as customer_name, -- first name only
    r.status,
    r.quote_amount,
    r.payment_status,
    r.shipping_tracking_in,
    r.shipping_tracking_out,
    r.customer_visible_notes,
    r.created_at
  from public.requests r
  where r.order_number = upper(trim(p_order_number))
    and (
      lower(trim(r.customer_phone)) = lower(trim(p_contact))
      or lower(trim(r.customer_email)) = lower(trim(p_contact))
    );
end;
$$;
