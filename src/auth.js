
import { supabase } from './supabase.js'

// --- Styles for Auth Modal ---
const authStyles = `
<style>
  .auth-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: none;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .auth-modal-overlay.active {
    display: flex;
    opacity: 1;
  }

  .auth-modal {
    background: var(--bg-color, #ffffff);
    color: var(--text-color, #333);
    padding: 2rem;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;
    position: relative;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(20px);
    transition: transform 0.3s ease;
  }

  .auth-modal-overlay.active .auth-modal {
    transform: translateY(0);
  }

  .auth-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted, #666);
  }

  .auth-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    font-family: 'Playfair Display', serif;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .auth-input {
    padding: 0.75rem;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 8px;
    font-size: 1rem;
    background: var(--input-bg, #fff);
    color: var(--text-color, #333);
  }

  .auth-btn {
    background: var(--primary-color, #000);
    color: #fff;
    padding: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .auth-btn:hover {
    opacity: 0.9;
  }

  .auth-switch {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-muted, #666);
  }

  .auth-switch a {
    color: var(--primary-color, #000);
    text-decoration: underline;
    cursor: pointer;
  }

  .auth-error {
    color: #ef4444;
    font-size: 0.9rem;
    text-align: center;
    display: none;
  }
  
  /* Header Profile Styles */
  .nav-profile-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .profile-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f3f4f6;
    background-size: cover;
    background-position: center;
    border: 2px solid var(--border-color, #ddd);
    cursor: pointer;
    position: relative;
    display: none; /* Hidden by default */
  }
  
  .login-link {
    cursor: pointer;
    font-weight: 500;
  }
</style>
`

// --- HTML Template ---
const authModalHTML = `
<div class="auth-modal-overlay" id="authModalOverlay">
  <div class="auth-modal">
    <button class="auth-close" id="authClose">&times;</button>
    <h2 class="auth-title" id="authTitle">Welcome Back</h2>
    <div class="auth-error" id="authError"></div>
    <form class="auth-form" id="authForm">
      <input type="email" class="auth-input" id="authEmail" placeholder="Email address" required>
      <input type="password" class="auth-input" id="authPassword" placeholder="Password" required>
      <button type="submit" class="auth-btn" id="authSubmitBtn">Log In</button>
    </form>
    <div class="auth-switch">
      <span id="authSwitchText">Don't have an account?</span>
      <a id="authSwitchLink">Sign Up</a>
    </div>
  </div>
</div>
`

// --- Logic ---
let isLoginMode = true;

export function initAuth() {
  // Inject Styles and HTML
  document.head.insertAdjacentHTML('beforeend', authStyles);
  document.body.insertAdjacentHTML('beforeend', authModalHTML);

  // DOM Elements
  const modal = document.getElementById('authModalOverlay');
  const closeBtn = document.getElementById('authClose');
  const form = document.getElementById('authForm');
  const switchLink = document.getElementById('authSwitchLink');
  const title = document.getElementById('authTitle');
  const submitBtn = document.getElementById('authSubmitBtn');
  const switchText = document.getElementById('authSwitchText');
  const errorMsg = document.getElementById('authError');

  // Open/Close Logic
  window.openAuthModal = () => {
    modal.classList.add('active');
  };
  
  window.closeAuthModal = () => {
    modal.classList.remove('active');
    errorMsg.style.display = 'none';
    form.reset();
  };

  closeBtn.addEventListener('click', window.closeAuthModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeAuthModal();
  });

  // Switch Mode Logic
  switchLink.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
      title.textContent = 'Welcome Back';
      submitBtn.textContent = 'Log In';
      switchText.textContent = "Don't have an account?";
      switchLink.textContent = 'Sign Up';
    } else {
      title.textContent = 'Create Account';
      submitBtn.textContent = 'Sign Up';
      switchText.textContent = "Already have an account?";
      switchLink.textContent = 'Log In';
    }
    errorMsg.style.display = 'none';
  });

  // Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    
    errorMsg.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.closeAuthModal();
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
        window.closeAuthModal();
      }
    } catch (err) {
      errorMsg.textContent = err.message;
      errorMsg.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isLoginMode ? 'Log In' : 'Sign Up';
    }
  });

  // Initialize Header State
  setupAuthListener();
  setupMapSync();
}

function setupAuthListener() {
  supabase.auth.onAuthStateChange((event, session) => {
    updateHeader(session?.user);
    if (session?.user) {
        syncVisitedCountries(session.user);
    }
  });
}

// --- Map Data Sync ---
function setupMapSync() {
    // Listen for local updates to push to DB
    window.addEventListener('visitedCountriesUpdated', async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const visited = JSON.parse(localStorage.getItem('visitedCountries') || '[]');
            await supabase.from('profiles').upsert({
                id: user.id,
                visited_countries: visited,
                updated_at: new Date()
            });
        }
    });
}

async function syncVisitedCountries(user) {
    // 1. Fetch remote data
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('visited_countries')
        .eq('id', user.id)
        .single();
        
    if (error && error.code !== 'PGRST116') { // PGRST116 is 'not found'
        console.error('Error fetching profile:', error);
        return;
    }
    
    const remoteVisited = profile?.visited_countries || [];
    const localVisited = JSON.parse(localStorage.getItem('visitedCountries') || '[]');
    
    // 2. Merge (Union)
    const merged = [...new Set([...remoteVisited, ...localVisited])];
    
    // 3. Update Local
    if (JSON.stringify(merged) !== JSON.stringify(localVisited)) {
        localStorage.setItem('visitedCountries', JSON.stringify(merged));
        // Update global variable if it exists (script.js)
        if (typeof window.visitedCountries !== 'undefined') {
            window.visitedCountries = merged;
        }
        // Trigger UI update
        window.dispatchEvent(new Event('visitedCountriesUpdated'));
        // Also reload page if needed to refresh map, but event might be enough if map listens to it
        // script.js listens to it? No, script.js dispatches it. 
        // We might need to manually trigger map update if script.js doesn't listen.
        // Looking at script.js, it doesn't seem to listen to the event to update itself, 
        // it only dispatches it for React Globe.
        // So we might need to force a reload or manually update the DOM elements.
        // For now, let's just update localStorage.
        
        // If script.js has `updateVisitedCounter`, call it.
        if (typeof window.updateVisitedCounter === 'function') {
            window.updateVisitedCounter();
        }
    }
    
    // 4. Update Remote
    if (JSON.stringify(merged) !== JSON.stringify(remoteVisited)) {
        await supabase.from('profiles').upsert({
            id: user.id,
            visited_countries: merged,
            updated_at: new Date()
        });
    }
}


function updateHeader(user) {
  const nav = document.getElementById('nav');
  // Remove existing auth elements if any to prevent duplicates
  const existingAuth = document.getElementById('auth-nav-item');
  if (existingAuth) existingAuth.remove();

  const authItem = document.createElement('div');
  authItem.id = 'auth-nav-item';
  authItem.className = 'nav-profile-container';

  if (user) {
    // Logged In
    const profileBtn = document.createElement('a');
    profileBtn.href = 'profile.html';
    profileBtn.className = 'profile-btn';
    profileBtn.style.display = 'block';
    // Use a default avatar or user metadata avatar
    const avatarUrl = user.user_metadata?.avatar_url || 'Media/default-avatar.png'; 
    profileBtn.style.backgroundImage = `url('${avatarUrl}')`;
    
    // Fallback if image fails or is missing
    if (!user.user_metadata?.avatar_url) {
        profileBtn.textContent = user.email[0].toUpperCase();
        profileBtn.style.display = 'flex';
        profileBtn.style.alignItems = 'center';
        profileBtn.style.justifyContent = 'center';
        profileBtn.style.color = '#333';
        profileBtn.style.fontWeight = 'bold';
        profileBtn.style.textDecoration = 'none';
    }

    authItem.appendChild(profileBtn);
  } else {
    // Logged Out
    const loginLink = document.createElement('a');
    loginLink.className = 'nav-link login-link';
    loginLink.textContent = 'Login/Sign up';
    loginLink.onclick = (e) => {
        e.preventDefault();
        window.openAuthModal();
    };
    authItem.appendChild(loginLink);
  }

  // Append to nav
  nav.appendChild(authItem);
}

// Auto-init if running in browser
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initAuth);
}
