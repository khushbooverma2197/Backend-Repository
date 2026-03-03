const { createClient } = require('@supabase/supabase-js');
const supabaseAdmin = require('../config/supabase'); // service_role client

// Anon client – used for signInWithPassword so the returned session is a
// regular user session (not a service-role session)
const supabaseAnon = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * POST /api/auth/signup
 * Body: { email, password, name }
 * Creates the user via the admin API (auto-confirms email) then signs them in
 * so a full session is returned to the frontend.
 */
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Create user with email_confirm: true so no confirmation email is needed
    const { data: adminData, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name: name || '' },
    });

    if (adminError) {
      return res.status(400).json({ error: adminError.message });
    }

    // Sign-in to get a proper session token pair
    const { data: sessionData, error: signInError } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return res.status(400).json({ error: signInError.message });
    }

    return res.status(200).json({
      user: sessionData.user,
      session: {
        access_token: sessionData.session.access_token,
        refresh_token: sessionData.session.refresh_token,
        expires_at: sessionData.session.expires_at,
      },
    });
  } catch (err) {
    console.error('signup error:', err);
    return res.status(500).json({ error: 'Internal server error during signup.' });
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const { data, error } = await supabaseAnon.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      user: data.user,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
};

/**
 * POST /api/auth/logout
 * Authorization: Bearer <access_token>
 * Invalidates the session on Supabase side.
 */
exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      // Sign out by setting the session then calling signOut
      await supabaseAnon.auth.setSession({
        access_token: token,
        refresh_token: '',
      });
      await supabaseAnon.auth.signOut();
    }
    return res.status(200).json({ message: 'Logged out successfully.' });
  } catch (err) {
    console.error('logout error:', err);
    return res.status(200).json({ message: 'Logged out.' }); // always succeed from client's view
  }
};
