-- =========================================================
-- JoES — Supabase Schema & Security Policies (RLS)
-- Paste this entire file into Supabase SQL Editor and Run.
-- =========================================================

-- 1. Site Settings (single row id=1)
create table if not exists public.site_settings (
  id int primary key default 1,
  abbr text default 'JoES',
  name_en text not null,
  name_ar text not null,
  subtitle_en text,
  subtitle_ar text,
  banner_enabled boolean default true,
  banner_text_en text,
  banner_text_ar text,
  banner_date text default '2026-12-25T00:00:00',
  whatsapp text,
  phone text,
  email text,
  website text,
  auto_approve_comments boolean default false
);

-- 2. Volumes
create table if not exists public.volumes (
  id text primary key,
  number int not null,
  title_en text not null,
  title_ar text not null,
  sort_order int default 1
);

-- 3. Issues
create table if not exists public.issues (
  id text primary key,
  volume_id text references public.volumes(id) on delete cascade,
  edition int default 1,
  pub_date text,
  title_en text not null,
  title_ar text not null,
  cover_url text,
  pdf_en_url text,
  pdf_ar_url text,
  created_at timestamptz default now()
);

-- 4. Editorial Board & Reviewers
create table if not exists public.board_members (
  id text primary key,
  "group" text not null, -- 'leadership' | 'editors' | 'reviewers'
  role_en text not null,
  role_ar text not null,
  name_en text not null,
  name_ar text not null,
  affiliation_en text,
  affiliation_ar text,
  sort_order int default 1
);

-- 5. Pages
create table if not exists public.pages (
  slug text primary key,
  title_en text not null,
  title_ar text not null,
  subtitle_en text,
  subtitle_ar text,
  body_en text,
  body_ar text
);

-- 6. Videos
create table if not exists public.videos (
  id text primary key,
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  url text not null,
  category text default 'both', -- 'featured' | 'lectures' | 'both'
  created_at timestamptz default now()
);

-- 7. Important Links
create table if not exists public.important_links (
  id text primary key,
  title_en text not null,
  title_ar text not null,
  description_en text,
  description_ar text,
  url text not null,
  sort_order int default 1
);

-- 8. Comments
create table if not exists public.comments (
  id text primary key,
  issue_id text references public.issues(id) on delete cascade,
  author_name text not null,
  body text not null,
  approved boolean default false,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.site_settings enable row level security;
alter table public.volumes enable row level security;
alter table public.issues enable row level security;
alter table public.board_members enable row level security;
alter table public.pages enable row level security;
alter table public.videos enable row level security;
alter table public.important_links enable row level security;
alter table public.comments enable row level security;

-- Public Read Policies
create policy "Public read settings" on public.site_settings for select using (true);
create policy "Public read volumes" on public.volumes for select using (true);
create policy "Public read issues" on public.issues for select using (true);
create policy "Public read board" on public.board_members for select using (true);
create policy "Public read pages" on public.pages for select using (true);
create policy "Public read videos" on public.videos for select using (true);
create policy "Public read links" on public.important_links for select using (true);
create policy "Public read approved comments" on public.comments for select using (approved = true or auth.role() = 'authenticated');

-- Public Insert Comment
create policy "Public insert comments" on public.comments for insert with check (true);

-- Authenticated Admin Full Access
create policy "Admin all settings" on public.site_settings for all using (auth.role() = 'authenticated');
create policy "Admin all volumes" on public.volumes for all using (auth.role() = 'authenticated');
create policy "Admin all issues" on public.issues for all using (auth.role() = 'authenticated');
create policy "Admin all board" on public.board_members for all using (auth.role() = 'authenticated');
create policy "Admin all pages" on public.pages for all using (auth.role() = 'authenticated');
create policy "Admin all videos" on public.videos for all using (auth.role() = 'authenticated');
create policy "Admin all links" on public.important_links for all using (auth.role() = 'authenticated');
create policy "Admin all comments" on public.comments for all using (auth.role() = 'authenticated');

-- Storage Buckets (covers & pdfs)
insert into storage.buckets (id, name, public) values ('covers', 'covers', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('pdfs', 'pdfs', true) on conflict do nothing;

create policy "Public read covers" on storage.objects for select using (bucket_id in ('covers', 'pdfs'));
create policy "Admin upload covers/pdfs" on storage.objects for insert with check (bucket_id in ('covers', 'pdfs') and auth.role() = 'authenticated');
create policy "Admin delete covers/pdfs" on storage.objects for delete using (bucket_id in ('covers', 'pdfs') and auth.role() = 'authenticated');

-- Initial Volumes
insert into public.volumes (id, number, title_en, title_ar, sort_order) values
  ('vol-1', 1, 'Volume 1', 'المجلد الأول (Volume 1)', 1),
  ('vol-2', 2, 'Volume 2', 'المجلد الثاني (Volume 2)', 2),
  ('vol-3', 3, 'Volume 3', 'المجلد الثالث (Volume 3)', 3),
  ('vol-4', 4, 'Volume 4', 'المجلد الرابع (Volume 4)', 4)
on conflict do nothing;
