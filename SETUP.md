# 🌿 Trust Field Assessment — Setup Guide

## Step 1: Create a Firebase Project (Free)

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name it: `trust-field-assessment` (or anything you like)
4. Disable Google Analytics (optional, click Continue)
5. Click **"Create project"** → wait 30 seconds

---

## Step 2: Enable Firestore Database

1. In your Firebase project, click **"Firestore Database"** (left menu)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for now)
4. Select a location closest to you (e.g., `asia-south1` for India)
5. Click **"Done"**

---

## Step 3: Enable Firebase Storage (for photos)

1. Click **"Storage"** (left menu)
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **"Done"**

---

## Step 4: Get Your Firebase Config

1. Click the **gear icon** ⚙️ → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click the **`</>`** (Web) icon
4. Register your app with a name (e.g., "Trust Assessment Web")
5. Copy the config object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## Step 5: Paste Config into the App

Open the file: `js/firebase-config.js`

Replace the `FIREBASE_CONFIG` block at the top with your actual config:

```javascript
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",      // ← your actual key
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
};
```

---

## Step 6: Change the Admin Password (Recommended)

In `js/firebase-config.js`, find this line and set your own password:

```javascript
const ADMIN_PASSWORD = "TrustAdmin@2024";  // ← Change this!
```

---

## Step 7: Deploy to Firebase Hosting (Go Live)

### Install Firebase CLI (one time):
```bash
npm install -g firebase-tools
```

### Login:
```bash
firebase login
```

### Initialize hosting (in the Assessment folder):
```bash
cd "c:\Users\NADIL\OneDrive\Desktop\Assessment"
firebase init hosting
```
- Choose your project
- Set public directory: `.` (dot = current folder)
- Single page app: **No**
- Overwrite index.html: **No**

### Deploy:
```bash
firebase deploy
```

✅ You'll get a live URL like: `https://trust-field-assessment.web.app`

---

## 🚀 Alternative: Deploy to Netlify (Even Faster)

1. Go to [https://netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop the entire **Assessment** folder onto the Netlify dashboard
3. ✅ You'll get a live URL instantly (e.g., `https://random-name.netlify.app`)

> ⚠️ Note: With Netlify, you still need Firebase for the database. Netlify only hosts your files.

---

## 📱 Share with Staff

Once deployed, share the URL with your 20+ field staff:
- They open it on their phone browser (Chrome recommended)
- First time: enter their name + phone number
- They can "Add to Home Screen" for app-like experience

### Admin Dashboard:
- Go to: `https://your-url/admin.html`
- Default password: `TrustAdmin@2024` (change this in `firebase-config.js`)

---

## 🔒 Security (After Testing)

Once you're satisfied, update Firestore security rules:

In Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow write: if true;
      allow read: if true;
    }
    match /assessments/{docId} {
      allow write: if true;
      allow read: if true;
    }
  }
}
```

---

## 📋 Features Summary

| Feature | How It Works |
|---|---|
| **Registration** | First time: enter name + phone. Remembered on device. |
| **18+ Categories** | Tap to select, includes: Cancer, Health, Home, Food, Education, etc. |
| **Custom Categories** | Tap "➕ Add New Category" on Step 2 |
| **Voice Recording** | Tap 🎤 button — speaks Malayalam → converted to Malayalam text |
| **Photos** | Up to 5 photos, compressed & uploaded to Firebase Storage |
| **GPS Location** | Optional — captures coordinates + human-readable address |
| **Offline Mode** | Works without internet, syncs when connected |
| **Admin Dashboard** | Password protected, shows all staff + their reports |
| **Staff Filter** | Click any staff member to see only their reports |
| **Date Filter** | Today / This Week / This Month |
| **Search** | Search by person name, staff name, village, category |
| **Export CSV** | Download all data as Excel-compatible CSV |
| **Bilingual** | Toggle EN ↔ Malayalam at top of every page |

---

## 📞 Voice Recording Notes

- Works best on **Chrome browser on Android**
- May not work on older iOS Safari
- Language auto-sets to **Malayalam (ml-IN)** when app is in Malayalam mode
- If it doesn't work: try Chrome, allow microphone permission

---

## ❓ Common Issues

**Q: Data not syncing to admin?**
→ Check Firebase config in `js/firebase-config.js`

**Q: Voice not working?**
→ Use Chrome on Android. Allow microphone when asked.

**Q: GPS not capturing?**
→ Allow location permission. Works best outdoors with clear sky.

**Q: Photos too slow?**
→ Photos are auto-compressed. Large photos may take a few seconds.
