import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hilzyiznhtqjltuawalc.supabase.co';

const supabaseAnonKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbHp5aXpuaHRxamx0dWF3YWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5ODI1MDYsImV4cCI6MjA5NDU1ODUwNn0.g4xtSfQ5hIlckwzQlQatscfOvPQnb5O3i1fF2QVQIpM';

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);