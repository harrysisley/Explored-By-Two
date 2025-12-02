# Supabase Setup Instructions

To get the backend working (Authentication, Comments, Profile, Map Sync), follow these steps:

1.  **Create a Supabase Project**

    - Go to [supabase.com](https://supabase.com) and create a new project.

2.  **Get API Keys**

    - Go to **Project Settings -> API**.
    - Copy the `URL` and `anon` (public) key.
    - Open `src/supabase.js` and replace the placeholder values with these keys.

3.  **Run SQL Setup**

    - Go to the **SQL Editor** in your Supabase dashboard.
    - Copy the contents of `supabase_setup.sql` (in your project root) and paste it into the editor.
    - Click **Run**.

4.  **Create Storage Bucket**

    - Go to **Storage** in the dashboard.
    - Create a new bucket named `avatars`.
    - Make it **Public**.

5.  **Test It!**
    - Run your site (`npm run dev` or open `index.html`).
    - Click "Login/Sign up" in the header.
    - Sign up with an email (check your email for the confirmation link, or disable email confirmation in Supabase Auth settings for testing).
