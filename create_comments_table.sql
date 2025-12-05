-- Create comments table
create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  post_slug text not null,
  user_id uuid references auth.users not null,
  content text not null,
  user_name text,
  user_avatar text
);

-- Set up RLS (Row Level Security)
alter table public.comments enable row level security;

-- Policy: Everyone can read comments
create policy "Comments are public"
  on public.comments for select
  using ( true );

-- Policy: Authenticated users can insert comments
create policy "Authenticated users can comment"
  on public.comments for insert
  with check ( auth.uid() = user_id );

-- Policy: Users can delete their own comments
create policy "Users can delete own comments"
  on public.comments for delete
  using ( auth.uid() = user_id );
