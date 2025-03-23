import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://eycbyjnpxkhhoqtzcuok.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5Y2J5am5weGtoaG9xdHpjdW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTI4OTgsImV4cCI6MjA1NzM2ODg5OH0.9Pzw6Lv2xp9tJHXyq_m0S0u5qRh7YwyX8017FrpkvJg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth : {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});