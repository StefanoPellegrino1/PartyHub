
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ifbbuhhpgvjwlncgluhv.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmYmJ1aGhwZ3Zqd2xuY2dsdWh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTcwMTc3OSwiZXhwIjoyMDE3Mjc3Nzc5fQ.e7385PVLQo05j26b15i-xTZsm8YWRUq9RO1PL8rtX6c`

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase



