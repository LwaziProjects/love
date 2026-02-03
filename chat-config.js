// Supabase Configuration - FREE FOREVER (up to 500MB)
// Steps to set up (takes 2 minutes):
// 1. Go to https://supabase.com
// 2. Sign up (free)
// 3. Create new project
// 4. Go to Settings > API Keys
// 5. Copy your ANON_KEY and PROJECT_URL below
// 6. In SQL Editor, run: CREATE TABLE chat (id uuid primary key default gen_random_uuid(), room_id text, sender text, text text, timestamp timestamp default now());
// 7. Enable RLS - set policy to allow all for now (or restrict as needed)

const SUPABASE_URL = "https://icuxopfcbzoveiqcqgfi.supabase.co"; // Your project URL
const SUPABASE_ANON_KEY = "sb_publishable_sasATKVDlQPfHGeuPOdEmw_2Zh1auQX"; // Your public key (safe for browser)

// Alternative: Use Firebase (also free)
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_PROJECT.firebaseapp.com",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_PROJECT.appspot.com",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };

