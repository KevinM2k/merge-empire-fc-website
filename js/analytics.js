/* --- Firebase Analytics + cookie consent ---------------------------------
   Analytics SDK is only loaded AFTER the visitor accepts. Choice is stored in
   localStorage so the banner shows only once. Used by index.html and
   privacy-policy.html via <script type="module" src="js/analytics.js">. */

const CONSENT_KEY = 'analytics-consent';

const firebaseConfig = {
  apiKey: "AIzaSyA1jsF17_Q-wHESG0MqagAuEbDyjqoB5HQ",
  authDomain: "merge-empire-fc.firebaseapp.com",
  projectId: "merge-empire-fc",
  storageBucket: "merge-empire-fc.firebasestorage.app",
  messagingSenderId: "500974365483",
  appId: "1:500974365483:web:71d291492377a24506f36e",
  measurementId: "G-32J7EDZMSM"
};

async function loadAnalytics() {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js");
  const { getAnalytics } = await import("https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js");
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}

function injectStyles() {
  const css = `
    .cc-banner {
      position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 9999;
      max-width: 560px; margin: 0 auto;
      background: #0f1f38; color: #e8eef7;
      border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;
      padding: 12px 16px; box-shadow: 0 10px 32px rgba(0,0,0,0.4);
      display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
      font-family: 'Inter', system-ui, sans-serif; font-size: 13px; line-height: 1.45;
      transform: translateY(160%); transition: transform .3s ease;
    }
    .cc-banner.cc-show { transform: translateY(0); }
    .cc-banner p { margin: 0; flex: 1 1 220px; color: #c7d2e2; }
    .cc-banner a { color: #6ea8fe; }
    .cc-actions { display: flex; gap: 8px; flex: 0 0 auto; margin-left: auto; }
    .cc-btn {
      border: 0; border-radius: 8px; padding: 7px 14px; cursor: pointer;
      font-weight: 700; font-size: 12px; font-family: inherit;
    }
    .cc-accept { background: #2f7bff; color: #fff; }
    .cc-accept:hover { background: #1f6bf0; }
    .cc-decline { background: rgba(255,255,255,0.08); color: #c7d2e2; }
    .cc-decline:hover { background: rgba(255,255,255,0.16); }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

function showBanner() {
  injectStyles();
  const banner = document.createElement('div');
  banner.className = 'cc-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <p>We use cookies for anonymous analytics.
      <a href="privacy-policy.html">Learn more</a>.</p>
    <div class="cc-actions">
      <button class="cc-btn cc-decline" type="button">Decline</button>
      <button class="cc-btn cc-accept" type="button">Accept</button>
    </div>`;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('cc-show'));

  banner.querySelector('.cc-accept').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    hide(banner);
    loadAnalytics();
  });
  banner.querySelector('.cc-decline').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    hide(banner);
  });
}

function hide(banner) {
  banner.classList.remove('cc-show');
  setTimeout(() => banner.remove(), 300);
}

const consent = localStorage.getItem(CONSENT_KEY);
if (consent === 'granted') {
  loadAnalytics();
} else if (consent !== 'denied') {
  if (document.body) showBanner();
  else document.addEventListener('DOMContentLoaded', showBanner);
}
