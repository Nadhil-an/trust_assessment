/* ─── app.js — Shared Utilities ───────────────────────────── */

/* ── User Session ──────────────────────────────────────── */
function getUser() {
  try { return JSON.parse(localStorage.getItem('trust_user')); }
  catch { return null; }
}
function saveUser(user) {
  localStorage.setItem('trust_user', JSON.stringify(user));
}
function clearUser() {
  localStorage.removeItem('trust_user');
}
function requireUser() {
  const u = getUser();
  if (!u) { window.location.href = 'index.html'; return null; }
  return u;
}

/* ── Toast ─────────────────────────────────────────────── */
function showToast(msg, type = 'info', duration = 3200) {
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  const icon = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }[type] || 'ℹ️';
  el.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  c.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; el.style.transition = 'all .3s'; setTimeout(() => el.remove(), 300); }, duration);
}

/* ── Loading ────────────────────────────────────────────── */
function showLoading(text) {
  const o = document.getElementById('loadingOverlay');
  if (!o) return;
  o.classList.add('show');
  const p = o.querySelector('p');
  if (p && text) p.textContent = text;
}
function hideLoading() {
  const o = document.getElementById('loadingOverlay');
  if (o) o.classList.remove('show');
}

/* ── Compress Image ─────────────────────────────────────── */
function compressImage(file, maxW = 1024, maxH = 1024, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width: w, height: h } = img;
      if (w > maxW) { h = (h * maxW) / w; w = maxW; }
      if (h > maxH) { w = (w * maxH) / h; h = maxH; }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = reject;
    img.src = url;
  });
}

/* ── GPS + Reverse Geocode ─────────────────────────────── */
async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('GPS not supported')); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords;
        let address = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          if (data.display_name) address = data.display_name;
        } catch (e) { /* use coordinates if geocoding fails */ }
        resolve({ lat, lng, accuracy, address });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  });
}

/* ── Format Date ────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatDateTime(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  if (isNaN(d)) return '';
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function isToday(ts) {
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const n = new Date();
  return d.toDateString() === n.toDateString();
}
function isThisWeek(ts) {
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const n = new Date();
  const diff = (n - d) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff < 7;
}
function isThisMonth(ts) {
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const n = new Date();
  return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
}

/* ── Severity Label & Color ─────────────────────────────── */
function sevLabel(level) {
  const labels = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High', 5: 'Critical' };
  return labels[level] || 'Unknown';
}
function sevColor(level) {
  const colors = { 1: '#27AE60', 2: '#F39C12', 3: '#E67E22', 4: '#E74C3C', 5: '#8E44AD' };
  return colors[level] || '#999';
}

/* ── Export to CSV ──────────────────────────────────────── */
function exportToCSV(assessments) {
  const rows = [['Date', 'Staff Name', 'Staff Phone', 'Person Name', 'Age', 'Address', 'Village', 'Categories', 'Location', 'Photos']];
  assessments.forEach(a => {
    const cats = (a.categories || []).map(c => c.label).join('; ');
    const date = a.submittedAt ? formatDateTime(a.submittedAt) : (a.localDate || '');
    rows.push([
      date, a.staffName || '', a.staffPhone || '',
      a.personName || '', a.age || '', a.address || '', a.village || '',
      cats, a.locationAddress || '', (a.photos || []).length
    ]);
  });
  const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `assessments_${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

/* ── Init PWA / SW ──────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

/* ── Init Firebase on load ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initFirebase === 'function') initFirebase();
  if (typeof flushOfflineQueue === 'function') flushOfflineQueue();
});
