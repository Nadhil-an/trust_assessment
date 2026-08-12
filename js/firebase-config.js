/* ─── firebase-config.js ──────────────────────────────────
   Replace the config below with YOUR Firebase project config.
   See SETUP.md for step-by-step instructions.
   ────────────────────────────────────────────────────────── */

// ⚠️ REPLACE THIS WITH YOUR OWN FIREBASE CONFIG
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyArqiMNp9M6wmd4aoqc8EtXEAgbRQ3GuPo",
  authDomain: "sreelakshmi-chits.firebaseapp.com",
  projectId: "sreelakshmi-chits",
  storageBucket: "sreelakshmi-chits.firebasestorage.app",
  messagingSenderId: "450563211318",
  appId: "1:450563211318:web:6906edd169fcf018819897",
  measurementId: "G-T4H3Y12BP1"
};

// Admin password — change this to something secure!
const ADMIN_PASSWORD = "Trust@2025";

let db = null;
let storage = null;
let firebaseReady = false;

function initFirebase() {
  try {
    if (FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") {
      console.warn("⚠️ Firebase not configured. Using local storage only. See SETUP.md.");
      return;
    }
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    db = firebase.firestore();
    storage = firebase.storage();
    firebaseReady = true;
    console.log("✅ Firebase initialized");
  } catch (err) {
    console.warn("Firebase init error:", err.message);
  }
}

/* ─── Firestore Helpers ─────────────────────────────────── */

async function fbSaveUser(user) {
  if (!db) return;
  try {
    const promise = db.collection("users").doc(user.phone).set({
      name: user.name,
      phone: user.phone,
      registeredAt: firebase.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    await Promise.race([ promise, new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000)) ]);
  } catch (e) { console.warn("fbSaveUser:", e.message); }
}

async function fbSaveAssessment(data) {
  if (!db) {
    // Offline: store in localStorage queue
    const queue = JSON.parse(localStorage.getItem('trust_queue') || '[]');
    queue.push(data);
    localStorage.setItem('trust_queue', JSON.stringify(queue));
    return { id: 'local_' + Date.now() };
  }
  try {
    const promise = db.collection("assessments").add({
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const ref = await Promise.race([ promise, new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000)) ]);
    
    // Try to flush offline queue
    flushOfflineQueue();
    return { id: ref.id };
  } catch (e) {
    console.warn("fbSaveAssessment:", e.message);
    // Store in queue
    const queue = JSON.parse(localStorage.getItem('trust_queue') || '[]');
    queue.push(data);
    localStorage.setItem('trust_queue', JSON.stringify(queue));
    return { id: 'local_' + Date.now() };
  }
}

async function flushOfflineQueue() {
  if (!db) return;
  const queue = JSON.parse(localStorage.getItem('trust_queue') || '[]');
  if (!queue.length) return;
  for (const item of queue) {
    try {
      await db.collection("assessments").add({
        ...item,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        syncedFromOffline: true,
      });
    } catch(e) { return; } // stop if fails
  }
  localStorage.removeItem('trust_queue');
  console.log("✅ Offline queue flushed");
}

async function fbGetMyAssessments(phone) {
  if (!db) {
    return JSON.parse(localStorage.getItem('trust_my_reports') || '[]');
  }
  try {
    const snap = await db.collection("assessments")
      .where("staffPhone", "==", phone)
      .orderBy("submittedAt", "desc")
      .get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("fbGetMyAssessments:", e.message);
    return JSON.parse(localStorage.getItem('trust_my_reports') || '[]');
  }
}

async function fbGetAllAssessments() {
  if (!db) {
    // Return all locally saved reports (demo mode)
    return JSON.parse(localStorage.getItem('trust_all_reports') || '[]');
  }
  try {
    const snap = await db.collection("assessments")
      .orderBy("submittedAt", "desc")
      .get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("fbGetAllAssessments:", e.message);
    return JSON.parse(localStorage.getItem('trust_all_reports') || '[]');
  }
}

function fbListenAllAssessments(callback) {
  if (!db) {
    callback(JSON.parse(localStorage.getItem('trust_all_reports') || '[]'));
    return () => {};
  }
  return db.collection("assessments")
    .orderBy("submittedAt", "desc")
    .onSnapshot(snap => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.warn("fbListenAllAssessments:", err.message));
}

async function fbGetAssessmentById(id) {
  if (!db) {
    const all = JSON.parse(localStorage.getItem('trust_all_reports') || '[]');
    return all.find(a => a.id === id) || null;
  }
  try {
    const doc = await db.collection("assessments").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch(e) {
    console.warn("fbGetAssessmentById:", e.message);
    return null;
  }
}

async function fbUpdateAssessment(id, data) {
  if (!db) {
    let all = JSON.parse(localStorage.getItem('trust_all_reports') || '[]');
    const idx = all.findIndex(a => a.id === id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...data };
      localStorage.setItem('trust_all_reports', JSON.stringify(all));
    }
    return true;
  }
  try {
    await db.collection("assessments").doc(id).update({
      ...data,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch(e) {
    console.warn("fbUpdateAssessment:", e.message);
    return false;
  }
}

async function fbDeleteAssessment(id) {
  if (!db) {
    let all = JSON.parse(localStorage.getItem('trust_all_reports') || '[]');
    all = all.filter(a => a.id !== id);
    localStorage.setItem('trust_all_reports', JSON.stringify(all));
    return true;
  }
  try {
    await db.collection("assessments").doc(id).delete();
    return true;
  } catch(e) {
    console.warn("fbDeleteAssessment:", e.message);
    return false;
  }
}

async function fbGetAllUsers() {
  if (!db) return [];
  try {
    const snap = await db.collection("users").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("fbGetAllUsers:", e.message);
    return [];
  }
}

async function fbDeleteUser(phone) {
  if (!db) return false;
  try {
    await db.collection("users").doc(phone).delete();
    return true;
  } catch (e) {
    console.warn("fbDeleteUser:", e.message);
    return false;
  }
}

async function fbGetMembershipById(id) {
  if (!db) {
    const local = JSON.parse(localStorage.getItem('trust_memberships') || '[]');
    return local.find(m => m.id === id) || null;
  }
  try {
    const doc = await db.collection("memberships").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch(e) {
    console.warn("fbGetMembershipById:", e.message);
    return null;
  }
}

function fbListenAllUsers(callback) {
  if (!db) { callback([]); return () => {}; }
  return db.collection("users")
    .onSnapshot(
      snap => {
        const users = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Sort client-side so missing registeredAt docs still appear
        users.sort((a, b) => {
          const ta = a.registeredAt?.toMillis ? a.registeredAt.toMillis() : 0;
          const tb = b.registeredAt?.toMillis ? b.registeredAt.toMillis() : 0;
          return tb - ta;
        });
        callback(users);
      },
      err => console.warn("fbListenAllUsers:", err.message)
    );
}

/* ─── Membership Helpers ────────────────────────────────────── */
async function fbSaveMembership(data) {
  if (!db) {
    const q = JSON.parse(localStorage.getItem('trust_mem_queue') || '[]');
    q.push(data); localStorage.setItem('trust_mem_queue', JSON.stringify(q));
    return { id: 'local_' + Date.now() };
  }
  try {
    const promise = db.collection("memberships").add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    const ref = await Promise.race([ promise, new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000)) ]);
    return { id: ref.id };
  } catch(e) {
    console.warn("fbSaveMembership:", e.message);
    const q = JSON.parse(localStorage.getItem('trust_mem_queue') || '[]');
    q.push(data); localStorage.setItem('trust_mem_queue', JSON.stringify(q));
    return { id: 'local_' + Date.now() };
  }
}

async function fbDeleteMembership(id) {
  if (!db) return false;
  try {
    await db.collection("memberships").doc(id).delete();
    return true;
  } catch (e) {
    console.warn("fbDeleteMembership:", e.message);
    return false;
  }
}

async function fbGetMyMemberships(phone) {
  if (!db) return JSON.parse(localStorage.getItem('trust_memberships') || '[]');
  try {
    const snap = await db.collection("memberships").where("staffPhone","==",phone).orderBy("submittedAt","desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return JSON.parse(localStorage.getItem('trust_memberships') || '[]'); }
}

async function fbGetAllMemberships() {
  if (!db) return JSON.parse(localStorage.getItem('trust_memberships') || '[]');
  try {
    const snap = await db.collection("memberships").orderBy("submittedAt","desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return JSON.parse(localStorage.getItem('trust_memberships') || '[]'); }
}

function fbListenAllMemberships(callback) {
  if (!db) {
    callback(JSON.parse(localStorage.getItem('trust_memberships') || '[]'));
    return () => {};
  }
  return db.collection("memberships")
    .orderBy("submittedAt", "desc")
    .onSnapshot(snap => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.warn("fbListenAllMemberships:", err.message));
}

/* ─── Donation Helpers ──────────────────────────────────────── */
async function fbSaveDonation(data) {
  if (!db) {
    const q = JSON.parse(localStorage.getItem('trust_don_queue') || '[]');
    q.push(data); localStorage.setItem('trust_don_queue', JSON.stringify(q));
    return { id: 'local_' + Date.now() };
  }
  try {
    const promise = db.collection("donations").add({ ...data, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    const ref = await Promise.race([ promise, new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4000)) ]);
    return { id: ref.id };
  } catch(e) {
    console.warn("fbSaveDonation:", e.message);
    const q = JSON.parse(localStorage.getItem('trust_don_queue') || '[]');
    q.push(data); localStorage.setItem('trust_don_queue', JSON.stringify(q));
    return { id: 'local_' + Date.now() };
  }
}

async function fbDeleteDonation(id) {
  if (!db) return false;
  try {
    await db.collection("donations").doc(id).delete();
    return true;
  } catch (e) {
    console.warn("fbDeleteDonation:", e.message);
    return false;
  }
}

async function fbGetDonationById(id) {
  if (!db) {
    const local = JSON.parse(localStorage.getItem('trust_donations') || '[]');
    return local.find(d => d.id === id) || null;
  }
  try {
    const doc = await db.collection("donations").doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch(e) {
    console.warn("fbGetDonationById:", e.message);
    return null;
  }
}

async function fbGetMyDonations(phone) {
  if (!db) return JSON.parse(localStorage.getItem('trust_donations') || '[]');
  try {
    const snap = await db.collection("donations").where("staffPhone","==",phone).orderBy("submittedAt","desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return JSON.parse(localStorage.getItem('trust_donations') || '[]'); }
}

async function fbGetAllDonations() {
  if (!db) return JSON.parse(localStorage.getItem('trust_donations') || '[]');
  try {
    const snap = await db.collection("donations").orderBy("submittedAt","desc").get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch(e) { return JSON.parse(localStorage.getItem('trust_donations') || '[]'); }
}

function fbListenAllDonations(callback) {
  if (!db) {
    callback(JSON.parse(localStorage.getItem('trust_donations') || '[]'));
    return () => {};
  }
  return db.collection("donations")
    .orderBy("submittedAt", "desc")
    .onSnapshot(snap => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.warn("fbListenAllDonations:", err.message));
}

/* ─── Firebase Storage — Photo Upload ─────────────────────── */
async function uploadPhoto(base64DataUrl, filename) {
  if (!storage) return base64DataUrl; // Return base64 if no storage
  try {
    const res = await fetch(base64DataUrl);
    const blob = await res.blob();
    const ref = storage.ref(`photos/${Date.now()}_${filename}`);
    
    const uploadTask = ref.put(blob).then(() => ref.getDownloadURL());
    const finalUrl = await Promise.race([
      uploadTask,
      new Promise((_, r) => setTimeout(() => r(new Error('timeout')), 4500))
    ]);
    return finalUrl;
  } catch (e) {
    console.warn("uploadPhoto fallback:", e.message);
    return base64DataUrl; // Fallback to base64
  }
}

/* ─── Voucher Helpers ────────────────────────────────────────── */
async function fbGetVoucherSettings(phone) {
  if (!db) {
    return JSON.parse(localStorage.getItem(`trust_voucher_${phone}`)) || null;
  }
  try {
    const doc = await db.collection("voucher_settings").doc(phone).get();
    if (doc.exists) return doc.data();
    return null;
  } catch(e) {
    console.warn("fbGetVoucherSettings:", e.message);
    return JSON.parse(localStorage.getItem(`trust_voucher_${phone}`)) || null;
  }
}

async function fbUpdateVoucherSettings(phone, data) {
  if (!db) {
    localStorage.setItem(`trust_voucher_${phone}`, JSON.stringify(data));
    return true;
  }
  try {
    await db.collection("voucher_settings").doc(phone).set(data, { merge: true });
    return true;
  } catch(e) {
    console.warn("fbUpdateVoucherSettings:", e.message);
    return false;
  }
}

async function fbIncrementVoucher(phone) {
  if (!db) {
    const local = JSON.parse(localStorage.getItem(`trust_voucher_${phone}`));
    if (local && local.currentPage) {
      local.currentPage = parseInt(local.currentPage) + 1;
      localStorage.setItem(`trust_voucher_${phone}`, JSON.stringify(local));
    }
    return true;
  }
  try {
    await db.collection("voucher_settings").doc(phone).update({
      currentPage: firebase.firestore.FieldValue.increment(1)
    });
    return true;
  } catch(e) {
    console.warn("fbIncrementVoucher:", e.message);
    return false;
  }
}

function fbListenMyAssessments(phone, callback) {
  if (!db) {
    callback(JSON.parse(localStorage.getItem('trust_reports') || '[]'));
    return () => {};
  }
  return db.collection("assessments")
    .where("staffPhone", "==", phone)
    .orderBy("submittedAt", "desc")
    .onSnapshot(snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      localStorage.setItem('trust_reports', JSON.stringify(data));
      callback(data);
    }, err => console.warn("fbListenMyAssessments:", err.message));
}

function fbListenMyMemberships(phone, callback) {
  if (!db) {
    callback(JSON.parse(localStorage.getItem('trust_memberships') || '[]'));
    return () => {};
  }
  return db.collection("memberships")
    .where("staffPhone", "==", phone)
    .orderBy("submittedAt", "desc")
    .onSnapshot(snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      localStorage.setItem('trust_memberships', JSON.stringify(data));
      callback(data);
    }, err => console.warn("fbListenMyMemberships:", err.message));
}

function fbListenMyDonations(phone, callback) {
  if (!db) {
    callback(JSON.parse(localStorage.getItem('trust_donations') || '[]'));
    return () => {};
  }
  return db.collection("donations")
    .where("staffPhone", "==", phone)
    .orderBy("submittedAt", "desc")
    .onSnapshot(snap => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      localStorage.setItem('trust_donations', JSON.stringify(data));
      callback(data);
    }, err => console.warn("fbListenMyDonations:", err.message));
}
