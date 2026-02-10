-- =============================================
-- Okis Garage Sale - Database Schema
-- =============================================

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- 2. Create Profiles Table (Users)
-- This table automatically links to Supabase Auth users
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  name text,
  avatar_url text,
  phone text,
  location text,
  bio text,
  rating numeric default 0,
  total_sales integer default 0,
  total_purchases integer default 0,
  verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Categories Table
create table public.categories (
  id text primary key, -- e.g. 'electronics', 'fashion'
  name text not null,
  slug text not null,
  icon text not null, -- Icon name for the UI
  description text,
  parent_id text references public.categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Products Table
create type product_condition as enum ('new', 'like_new', 'good', 'fair', 'poor');
create type product_status as enum ('available', 'sold', 'reserved', 'inactive');

create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  price numeric not null check (price >= 0),
  original_price numeric check (original_price >= 0),
  images text[] default array[]::text[],
  category text references public.categories(id) not null,
  subcategory text,
  condition product_condition not null,
  status product_status default 'available' not null,
  seller_id uuid references public.profiles(id) not null,
  location text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create Favorites Table
create table public.favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  product_id uuid references public.products(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.favorites enable row level security;

-- PROFILES Policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- CATEGORIES Policies
create policy "Categories are viewable by everyone"
  on public.categories for select
  using ( true );

create policy "Only service role can manage categories"
  on public.categories for all
  using ( auth.role() = 'service_role' );

-- PRODUCTS Policies
create policy "Products are viewable by everyone"
  on public.products for select
  using ( true );

create policy "Authenticated users can insert products"
  on public.products for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update their own products"
  on public.products for update
  using ( auth.uid() = seller_id );

create policy "Users can delete their own products"
  on public.products for delete
  using ( auth.uid() = seller_id );

-- FAVORITES Policies
create policy "Users can view their own favorites"
  on public.favorites for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own favorites"
  on public.favorites for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete their own favorites"
  on public.favorites for delete
  using ( auth.uid() = user_id );

-- =============================================
-- Triggers and Functions
-- =============================================

-- Function to handle new user creation matching Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on sign up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed Categories
insert into public.categories (id, name, slug, icon) values
('electronics', 'Elektronik', 'elektronik', 'phone'),
('fashion', 'Fashion', 'fashion', 'shirt'),
('home', 'Rumah Tangga', 'rumah-tangga', 'home'),
('sports', 'Olahraga', 'olahraga', 'bolt'),
('hobbies', 'Hobi & Koleksi', 'hobi-koleksi', 'gamepad'),
('vehicles', 'Kendaraan', 'kendaraan', 'car'),
('books', 'Buku & Alat Tulis', 'buku-alat-tulis', 'book'),
('baby', 'Perlengkapan Bayi', 'perlengkapan-bayi', 'baby'),
('beauty', 'Kecantikan', 'kecantikan', 'sparkles'),
('others', 'Lainnya', 'lainnya', 'package');
