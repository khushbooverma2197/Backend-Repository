console.log('========================================');
console.log('🔍 TESTING SUPABASE CONNECTION');
console.log('========================================\n');

// Step 1: Check if dotenv is loaded
console.log('Step 1: Loading environment variables...');
require('dotenv').config();
console.log('✅ dotenv loaded\n');

// Step 2: Check environment variables
console.log('Step 2: Checking environment variables...');
console.log('PORT:', process.env.PORT || 'NOT SET');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL || '❌ NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', 
  process.env.SUPABASE_SERVICE_ROLE_KEY 
    ? `✅ SET (length: ${process.env.SUPABASE_SERVICE_ROLE_KEY.length} chars)` 
    : '❌ NOT SET'
);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('\n❌ ERROR: Environment variables not set properly!');
  console.log('\nPlease check your .env file has:');
  console.log('SUPABASE_URL=https://xxxxx.supabase.co');
  console.log('SUPABASE_SERVICE_ROLE_KEY=eyJhbG...');
  process.exit(1);
}

console.log('✅ Environment variables loaded\n');

// Step 3: Load Supabase client
console.log('Step 3: Loading Supabase client...');
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
console.log('✅ Supabase client created\n');

// Step 4: Test connection
console.log('Step 4: Testing database connection...');
console.log('Fetching destinations from database...\n');

async function testConnection() {
  try {
    const { data, error } = await supabase.from('destinations').select('*');
    
    if (error) {
      console.error('❌ DATABASE ERROR:', error.message);
      console.error('\nError details:', error);
      console.log('\n🔧 TROUBLESHOOTING TIPS:');
      console.log('1. Make sure you ran database-schema.sql in Supabase SQL Editor');
      console.log('2. Check if "destinations" table exists in Supabase Table Editor');
      console.log('3. Verify your SUPABASE_SERVICE_ROLE_KEY is correct (not anon key)');
      process.exit(1);
    } else {
      console.log('✅ ✅ ✅ SUCCESS! ✅ ✅ ✅');
      console.log('\n📊 Database Connection Working!');
      console.log('─────────────────────────────────');
      console.log('Found', data.length, 'destinations in database');
      
      if (data.length > 0) {
        console.log('\n📍 Sample destinations:');
        data.slice(0, 3).forEach((dest, index) => {
          console.log(`   ${index + 1}. ${dest.name} - $${dest.avg_daily_cost}/day`);
        });
      } else {
        console.log('\n⚠️  WARNING: No destinations found in database');
        console.log('Run the INSERT statements from database-schema.sql to add sample data');
      }
      
      console.log('\n✅ Your backend should work now!');
      console.log('Try the Postman request again: GET http://localhost:5000/api/destinations');
    }
  } catch (err) {
    console.error('\n❌ EXCEPTION:', err.message);
    console.error('Stack trace:', err.stack);
    process.exit(1);
  }
}

// Add timeout
const timeout = setTimeout(() => {
  console.error('\n❌ TIMEOUT: Request took too long (>10 seconds)');
  console.log('This might mean:');
  console.log('1. No internet connection');
  console.log('2. Firewall blocking Supabase');
  console.log('3. Wrong SUPABASE_URL');
  process.exit(1);
}, 10000);

testConnection().then(() => {
  clearTimeout(timeout);
  process.exit(0);
}).catch(err => {
  clearTimeout(timeout);
  console.error('\n❌ Unhandled error:', err);
  process.exit(1);
});