
import { supabase } from './supabase.js'

// --- Styles for Auth Modal & Dropdown ---
const authStyles = `
<style>
  /* Modal Styles */
  .auth-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    z-index: 10000;
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
    padding: 2.5rem;
    border-radius: 24px;
    width: 90%;
    max-width: 420px;
    position: relative;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    transform: translateY(20px);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    border: 1px solid var(--border-color, rgba(0,0,0,0.1));
  }

  .auth-modal-overlay.active .auth-modal {
    transform: translateY(0);
  }

  .auth-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-muted, #666);
    transition: color 0.2s;
  }
  
  .auth-close:hover {
    color: var(--text-color, #000);
  }

  .auth-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    text-align: center;
    font-family: 'Playfair Display', serif;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .auth-input {
    padding: 1rem;
    border: 1px solid var(--border-color, #e5e7eb);
    border-radius: 12px;
    font-size: 1rem;
    background: var(--input-bg, #f9fafb);
    color: var(--text-color, #333);
    transition: all 0.2s;
  }
  
  .auth-input:focus {
    outline: none;
    border-color: var(--primary-color, #000);
    background: var(--bg-color, #fff);
    box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
  }

  .auth-btn {
    background: var(--primary-color, #000);
    color: #fff;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
    margin-top: 0.5rem;
  }

  .auth-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  .auth-btn:active {
    transform: translateY(0);
  }

  .auth-switch {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.95rem;
    color: var(--text-muted, #666);
  }

  .auth-switch a {
    color: var(--primary-color, #000);
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    margin-left: 0.25rem;
  }
  
  .auth-switch a:hover {
    text-decoration: underline;
  }

  .auth-error {
    background-color: #fef2f2;
    color: #ef4444;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 1rem;
    display: none;
    border: 1px solid #fee2e2;
  }
  
  /* Dropdown Styles */
  .account-dropdown-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .account-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50px;
    transition: background-color 0.2s;
  }
  
  .account-btn:hover {
    background-color: rgba(0,0,0,0.05);
  }
  
  body.dark-mode .account-btn:hover {
    background-color: rgba(255,255,255,0.1);
  }
  
  .account-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f3f4f6;
    background-size: cover;
    background-position: center;
    border: 2px solid var(--border-color, #e5e7eb);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }
  
  .account-label {
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--text-color, #333);
    display: none; /* Hidden on mobile/default, shown if needed */
  }
  
  @media (min-width: 768px) {
    .account-label {
      display: block;
    }
  }
  
  .dropdown-menu {
    position: absolute;
    top: 120%;
    right: 0;
    width: 240px;
    background: var(--bg-color, #ffffff);
    border-radius: 16px;
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.15);
    border: 1px solid var(--border-color, rgba(0,0,0,0.05));
    padding: 0.5rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 100;
  }
  
  .dropdown-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .dropdown-header {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color, #f3f4f6);
    margin-bottom: 0.5rem;
  }
  
  .dropdown-user-name {
    font-weight: 600;
    color: var(--text-color, #111);
    font-size: 0.95rem;
    display: block;
  }
  
  .dropdown-user-email {
    color: var(--text-muted, #666);
    font-size: 0.85rem;
    margin-top: 0.25rem;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: var(--text-color, #333);
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.2s;
    cursor: pointer;
    font-size: 0.95rem;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }
  
  .dropdown-item:hover {
    background-color: var(--hover-bg, #f9fafb);
  }
  
  .dropdown-divider {
    height: 1px;
    background-color: var(--border-color, #f3f4f6);
    margin: 0.5rem 0;
  }
  
  .dropdown-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }
  
  /* Toggle Switch for Dark Mode */
  .toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    background-color: #e5e7eb;
    border-radius: 24px;
    transition: background-color 0.3s;
    margin-left: auto;
  }
  
  .toggle-switch::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  body.dark-mode .toggle-switch {
    background-color: var(--primary-color, #3b82f6);
  }
  
  body.dark-mode .toggle-switch::after {
    transform: translateX(20px);
  }
  
  /* Login Button Style */
  .login-btn-header {
    background-color: var(--primary-color, #000);
    color: #fff;
    padding: 0.5rem 1.25rem;
    border-radius: 50px;
    font-weight: 500;
    font-size: 0.9rem;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  
  .login-btn-header:hover {
    opacity: 0.9;
  }
  
  body.dark-mode .login-btn-header {
    background-color: #fff;
    color: #000;
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
      <div class="name-fields" id="nameFields" style="display: none; gap: 1rem;">
        <input type="text" class="auth-input" id="authFirstName" placeholder="First Name">
        <input type="text" class="auth-input" id="authLastName" placeholder="Last Name">
      </div>
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
  if (!document.getElementById('auth-styles')) {
    document.head.insertAdjacentHTML('beforeend', authStyles);
    document.body.insertAdjacentHTML('beforeend', authModalHTML);
  }

  // DOM Elements
  const modal = document.getElementById('authModalOverlay');
  const closeBtn = document.getElementById('authClose');
  const form = document.getElementById('authForm');
  const switchLink = document.getElementById('authSwitchLink');
  const title = document.getElementById('authTitle');
  const submitBtn = document.getElementById('authSubmitBtn');
  const switchText = document.getElementById('authSwitchText');
  const errorMsg = document.getElementById('authError');
  const nameFields = document.getElementById('nameFields');
  const firstNameInput = document.getElementById('authFirstName');
  const lastNameInput = document.getElementById('authLastName');

  // Open/Close Logic
  window.openAuthModal = () => {
    modal.classList.add('active');
  };
  
  window.closeAuthModal = () => {
    modal.classList.remove('active');
    errorMsg.style.display = 'none';
    form.reset();
    // Reset to login mode on close if desired, or keep last state
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
      nameFields.style.display = 'none';
      firstNameInput.required = false;
      lastNameInput.required = false;
    } else {
      title.textContent = 'Create Account';
      submitBtn.textContent = 'Sign Up';
      switchText.textContent = "Already have an account?";
      switchLink.textContent = 'Log In';
      nameFields.style.display = 'flex';
      firstNameInput.required = true;
      lastNameInput.required = true;
    }
    errorMsg.style.display = 'none';
  });

  // Form Submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    
    errorMsg.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.closeAuthModal();
      } else {
        // Sign Up with Metadata
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              full_name: `${firstName} ${lastName}`.trim()
            }
          }
        });
        
        if (error) throw error;

        // Manually insert into profiles if trigger doesn't handle it or just to be safe/explicit
        if (data?.user) {
             await supabase.from('profiles').upsert({
                id: data.user.id,
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`.trim(),
                updated_at: new Date()
            });
        }

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
  
  // Replace existing toggle with new dropdown
  replaceDarkModeToggle();
}

function replaceDarkModeToggle() {
    const existingToggle = document.getElementById('darkModeToggle');
    if (existingToggle) {
        // We'll hide it or remove it, but we need its container
        // Actually, we'll insert the new auth container where the toggle was
        // or just append it to the nav if we want to keep layout clean
        
        // Let's find the nav
        const nav = document.getElementById('nav');
        if (!nav) return;
        
        // Create container for our new auth UI
        const authContainer = document.createElement('div');
        authContainer.id = 'auth-container';
        authContainer.className = 'auth-container';
        
        // Insert it at the end of nav, effectively replacing the position of the toggle
        // We will remove the old toggle in updateHeader or here
        existingToggle.style.display = 'none'; // Hide original toggle
        nav.appendChild(authContainer);
    }
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
        .select('visited_countries, passport_stamps')
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
        if (typeof window.visitedCountries !== 'undefined') {
            window.visitedCountries = merged;
        }
        window.dispatchEvent(new Event('visitedCountriesUpdated'));
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
    
    // 5. Sync Passport Stamps
    if (profile?.passport_stamps) {
        const remoteStamps = profile.passport_stamps;
        localStorage.setItem('passportStamps', JSON.stringify(remoteStamps));
        // Notify passport manager if it exists
        if (window.passportManager) {
            window.passportManager.dynamicStamps = remoteStamps;
            window.passportManager.renderStamps(remoteStamps);
        }
    }
}


function updateHeader(user) {
  const nav = document.getElementById('nav');
  const existingToggle = document.getElementById('darkModeToggle');
  if (existingToggle) existingToggle.style.display = 'none'; // Ensure hidden

  // Remove existing auth elements if any
  const existingAuth = document.getElementById('auth-dropdown-wrapper');
  if (existingAuth) existingAuth.remove();

  const wrapper = document.createElement('div');
  wrapper.id = 'auth-dropdown-wrapper';
  wrapper.className = 'account-dropdown-container';

  // Check Dark Mode State
  const isDarkMode = document.body.classList.contains('dark-mode');

  if (user) {
    // LOGGED IN STATE
    const avatarUrl = user.user_metadata?.avatar_url;
    const initials = user.email ? user.email[0].toUpperCase() : 'U';
    
    const firstName = user.user_metadata?.first_name || 'Traveler';
    
    wrapper.innerHTML = `
      <button class="account-btn" id="accountBtn">
        <div class="account-avatar" style="${avatarUrl ? `background-image: url('${avatarUrl}')` : ''}">
          ${!avatarUrl ? initials : ''}
        </div>
        <span class="account-label">Account</span>
        <span style="font-size: 0.8rem; opacity: 0.7;">▼</span>
      </button>
      
      <div class="dropdown-menu" id="accountDropdown">
        <div class="dropdown-header">
          <span class="dropdown-user-name">Hello, ${firstName}</span>
          <span class="dropdown-user-email">${user.email}</span>
        </div>
        
        <a href="profile.html" class="dropdown-item">
          <span class="dropdown-icon">👤</span>
          Account Details
        </a>
        
        <button class="dropdown-item" id="dropdownDarkMode">
          <span class="dropdown-icon">🌙</span>
          Dark Mode
          <div class="toggle-switch"></div>
        </button>
        
        <div class="dropdown-divider"></div>
        
        <button class="dropdown-item" id="logoutBtn" style="color: #ef4444;">
          <span class="dropdown-icon">🚪</span>
          Log Out
        </button>
      </div>
    `;
  } else {
    // LOGGED OUT STATE
    wrapper.innerHTML = `
      <button class="account-btn" id="accountBtn">
        <div class="account-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <span class="account-label">Menu</span>
        <span style="font-size: 0.8rem; opacity: 0.7;">▼</span>
      </button>
      
      <div class="dropdown-menu" id="accountDropdown">
        <button class="dropdown-item" onclick="window.openAuthModal()">
          <span class="dropdown-icon">✨</span>
          Login / Sign Up
        </button>
        
        <div class="dropdown-divider"></div>
        
        <button class="dropdown-item" id="dropdownDarkMode">
          <span class="dropdown-icon">🌙</span>
          Dark Mode
          <div class="toggle-switch"></div>
        </button>
      </div>
    `;
  }

  nav.appendChild(wrapper);
  
  // Event Listeners for Dropdown
  const btn = wrapper.querySelector('#accountBtn');
  const dropdown = wrapper.querySelector('#accountDropdown');
  const logoutBtn = wrapper.querySelector('#logoutBtn');
  const darkModeBtn = wrapper.querySelector('#dropdownDarkMode');
  
  // Toggle Dropdown
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
  
  // Logout Logic
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await supabase.auth.signOut();
      window.location.reload();
    });
  }
  
  // Dark Mode Logic
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Keep dropdown open
        document.body.classList.toggle('dark-mode');
        document.documentElement.classList.toggle('dark-mode');
        
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        
        // Update logos (using function from script.js if available, or manually)
        const headerLogo = document.querySelector('.logo-img');
        const footerLogo = document.querySelector('.footer-logo-img');
        const logoSrc = isDark ? 'Media/EB2 White Logo.png' : 'Media/EB2 LOGO.png';
        if (headerLogo) headerLogo.src = logoSrc;
        if (footerLogo) footerLogo.src = logoSrc;
    });
  }
}

// Auto-init if running in browser
if (typeof window !== 'undefined') {
  // Expose supabase globally for other scripts (like passport-stamps.js)
  window.supabase = supabase;
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
  } else {
    initAuth();
  }
}
