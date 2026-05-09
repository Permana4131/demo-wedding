// ============ NAMA TAMU DARI URL ============
// Pakai: index.html?to=Nama%20Tamu
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to') || urlParams.get('kepada') || 'Tamu Undangan';
document.getElementById('guestNameDisplay').textContent = decodeURIComponent(guestName);

// ============ BUKA UNDANGAN ============
const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
const btnOpen = document.getElementById('btnOpen');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

btnOpen.addEventListener('click', () => {
  cover.classList.add('hide');
  mainContent.classList.remove('hidden');
  musicToggle.classList.add('show');

  // play music
  bgMusic.volume = 0.5;
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicToggle.classList.add('playing');
    }).catch(() => {
      // autoplay diblok — user bisa klik tombol musik
    });
  }

  setTimeout(() => cover.style.display = 'none', 800);
  window.scrollTo({ top: 0 });
});

// ============ MUSIC TOGGLE ============
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.add('playing');
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
  }
});

// ============ COUNTDOWN ============
const weddingDate = new Date('2026-06-20T08:00:00+07:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ============ RSVP / UCAPAN (LocalStorage) ============
const STORAGE_KEY = 'wedding_messages_dimas_sari';
const form = document.getElementById('rsvpForm');
const container = document.getElementById('messagesContainer');

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveMessages(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function statusClass(status) {
  if (status === 'Hadir') return 'hadir';
  if (status === 'Tidak Hadir') return 'tidak';
  return '';
}

function timeAgo(ts) {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return 'baru saja';
  if (diff < 3600) return Math.floor(diff / 60) + ' menit lalu';
  if (diff < 86400) return Math.floor(diff / 3600) + ' jam lalu';
  return new Date(ts).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function renderMessages() {
  const list = loadMessages();
  if (!list.length) {
    container.innerHTML = '<p class="no-messages">Jadilah yang pertama memberi ucapan ✨</p>';
    return;
  }
  container.innerHTML = list
    .slice()
    .reverse()
    .map(m => `
      <div class="message-item">
        <div class="message-header">
          <span class="message-name">${escapeHtml(m.name)}</span>
          <span class="message-status ${statusClass(m.attend)}">${escapeHtml(m.attend)}</span>
        </div>
        <p class="message-text">${escapeHtml(m.message)}</p>
        <p class="message-time">${timeAgo(m.time)}</p>
      </div>
    `).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('inputName').value.trim();
  const attend = document.getElementById('inputAttend').value;
  const message = document.getElementById('inputMessage').value.trim();
  if (!name || !attend || !message) return;

  const list = loadMessages();
  list.push({ name, attend, message, time: Date.now() });
  saveMessages(list);

  form.reset();
  renderMessages();

  // scroll ke list ucapan
  document.getElementById('messagesList').scrollIntoView({ behavior: 'smooth' });
});

renderMessages();

// Auto-fill nama tamu ke input RSVP
if (guestName && guestName !== 'Tamu Undangan') {
  document.getElementById('inputName').value = decodeURIComponent(guestName);
}
