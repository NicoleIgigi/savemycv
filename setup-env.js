const fs = require('fs');

const envContent = `NEXT_PUBLIC_SUPABASE_URL=https://cwxwwbrzfmznfqkoyphr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3eHd3YnJ6Zm16bmZxa295cGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTAzOTEsImV4cCI6MjA2ODU4NjM5MX0.CsMgpRH8JUsn8PS-nf04NQN9LCnLAK2aYtCdQPyE6iY
ADMIN_EMAIL=nii.alumni.cmu@gmail.com`;

fs.writeFileSync('.env.local', envContent);
console.log('✅ Environment file updated with correct email!');
console.log('🚀 Your CMS is ready to use at:');
console.log('   Login: http://localhost:3000/admin/login');
console.log('   Dashboard: http://localhost:3000/admin/dashboard');
console.log('');
console.log('📝 Next steps:');
console.log('1. Run database/fix-policies.sql in Supabase SQL Editor');
console.log('2. Create admin account with email: nii.alumni.cmu@gmail.com');
console.log('3. Access your CMS dashboard!'); 