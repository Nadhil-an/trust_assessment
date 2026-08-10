/* ─── i18n.js — Bilingual: English + Malayalam ─────────── */

const TRANSLATIONS = {
  en: {
    appName: "Sree Lakshmi Trust",
    tagline: "Field Assessment Tool",
    welcome: "Welcome!",
    registerTitle: "Tell us who you are",
    registerSub: "You only need to do this once",
    nameLabel: "Your Full Name",
    namePlaceholder: "Enter your full name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "e.g. 9876543210",
    registerBtn: "Start →",
    homeGreeting: "Hello,",
    homeSubtitle: "Ready for today's assessment?",
    newAssessment: "New Assessment",
    newAssessmentSub: "Record a new field visit",
    myReports: "My Reports",
    myReportsSub: "View your submissions",
    changeProfile: "Change Profile",
    adminLink: "Admin Dashboard →",

    formTitle: "New Assessment",
    step1Title: "Basic Information",
    step1Sub: "Tell us about the person / household you visited",
    step2Title: "Issues Observed",
    step2Sub: "Select all issues you found — tap to select",
    step3Title: "Issue Details",
    step3Sub: "Describe severity and notes for each selected issue",
    step4Title: "Add Photos",
    step4Sub: "Attach photos you took during the visit (optional)",
    step5Title: "Location",
    step5Sub: "Capture your current location for this visit",
    step6Title: "Review & Submit",
    step6Sub: "Check your information before submitting",

    patientName: "Person / Household Name",
    patientNamePh: "Name of person visited",
    ageLabel: "Age",
    agePh: "Age in years",
    addressLabel: "Address",
    addressPh: "House / Street address",
    villageLabel: "Village / Ward / Panchayat",
    villagePh: "Village or ward name",
    dateLabel: "Visit Date",

    catSelectHint: "Tap cards to select issues",
    addCustomCat: "+ Add New Category",
    customCatPh: "Type new category name",
    customCatLabel: "New Category Name",

    severityLabel: "Severity",
    sev1: "Low", sev2: "Medium", sev3: "High", sev4: "Very High", sev5: "Critical",
    notesLabel: "Notes / Description",
    notesPh: "Describe the issue in detail...",
    recordVoice: "🎤 Record Voice (Malayalam)",
    stopRecording: "⏹ Stop Recording",
    listening: "🔴 Listening in Malayalam...",
    voiceHint: "Tap to speak in Malayalam. Words will appear in the notes.",

    addPhotoBtn: "📷 Take / Add Photo",
    photoHint: "You can add up to 5 photos",
    noPhotos: "No photos added yet",

    getLocationBtn: "📍 Get My Location",
    locationFound: "✅ Location captured",
    locationError: "Could not get location. Please enable GPS and try again.",
    locationHint: "Tap to capture GPS location with address",
    locationLabel: "Location",
    gettingLocation: "Getting your location...",

    reviewBasicInfo: "Basic Information",
    reviewCategories: "Issues Found",
    reviewPhotos: "Photos",
    reviewLocation: "Location",
    photosCount: "photo(s) attached",
    noLocation: "Location not captured",

    submitBtn: "✅ Submit Assessment",
    submitting: "Submitting...",
    successTitle: "Submitted Successfully!",
    successMsg: "Your assessment has been saved to the dashboard.",
    newAssessmentAfter: "New Assessment",
    viewReports: "View My Reports",

    myReportsTitle: "My Reports",
    noReports: "No reports submitted yet",
    report: "report",
    reports: "reports",
    totalReports: "total reports",

    adminTitle: "Admin Dashboard",
    adminLoginTitle: "Admin Access",
    adminPassLabel: "Admin Password",
    adminPassPh: "Enter admin password",
    adminLoginBtn: "Login →",
    adminWrongPass: "⚠️ Incorrect password. Please try again.",

    totalRep: "Total Reports",
    todayRep: "Today",
    weekRep: "This Week",
    staffCount: "Staff Members",

    staffPanel: "Staff Members",
    reportsPanel: "Assessments",
    viewAll: "View All",
    exportCSV: "📥 Export CSV",
    logoutAdmin: "Logout",
    filterAll: "All Time",
    filterToday: "Today",
    filterWeek: "This Week",
    filterMonth: "This Month",
    clickStaff: "Click a staff member above to see their reports",
    allReports: "All Reports",
    searchPlaceholder: "Search reports...",

    next: "Next →",
    back: "← Back",
    cancel: "Cancel",
    close: "Close",
    loading: "Loading...",
    saving: "Saving...",
    error: "Something went wrong. Please try again.",
    required: "This field is required",
    invalidPhone: "Please enter a valid 10-digit phone number",
    confirmSubmit: "Submit this assessment?",
    yes: "Yes, Submit",
    no: "Cancel",
    noData: "No data found",
    delete: "Delete",
    village: "Village",
    address: "Address",
    age: "Age",
    phone: "Phone",
    date: "Date",
    name: "Name",
    location: "Location",
    staff: "Staff",
    categories: "Categories",
    notes: "Notes",
    severity: "Severity",
    photos: "Photos",
    years: "years",
    na: "Not specified",
  },

  ml: {
    appName: "ശ്രീ ലക്ഷ്മി ട്രസ്റ്റ്",
    tagline: "ഫീൽഡ് അസസ്മെന്റ് ടൂൾ",
    welcome: "സ്വാഗതം!",
    registerTitle: "നിങ്ങളെ കുറിച്ച് പറയൂ",
    registerSub: "ഇത് ഒരു തവണ മാത്രം ചെയ്‌താൽ മതി",
    nameLabel: "നിങ്ങളുടെ മുഴുവൻ പേര്",
    namePlaceholder: "പേര് ഇവിടെ നൽകുക",
    phoneLabel: "ഫോൺ നമ്പർ",
    phonePlaceholder: "ഉദാ: 9876543210",
    registerBtn: "ആരംഭിക്കുക →",
    homeGreeting: "ഹലോ,",
    homeSubtitle: "ഇന്നത്തെ വിലയിരുത്തലിന് തയ്യാറോ?",
    newAssessment: "പുതിയ വിലയിരുത്തൽ",
    newAssessmentSub: "ഒരു പുതിയ ഫീൽഡ് സന്ദർശനം രേഖപ്പെടുത്തുക",
    myReports: "എന്റെ റിപ്പോർട്ടുകൾ",
    myReportsSub: "നിങ്ങളുടെ സമർപ്പണങ്ങൾ കാണുക",
    changeProfile: "പ്രൊഫൈൽ മാറ്റുക",
    adminLink: "അഡ്മിൻ ഡാഷ്‌ബോർഡ് →",

    formTitle: "പുതിയ വിലയിരുത്തൽ",
    step1Title: "അടിസ്ഥാന വിവരങ്ങൾ",
    step1Sub: "സന്ദർശിച്ച വ്യക്തി / കുടുംബത്തെ കുറിച്ച് പറയൂ",
    step2Title: "നിരീക്ഷിച്ച പ്രശ്നങ്ങൾ",
    step2Sub: "കണ്ടെത്തിയ എല്ലാ പ്രശ്നങ്ങളും തിരഞ്ഞെടുക്കുക",
    step3Title: "പ്രശ്ന വിശദാംശങ്ങൾ",
    step3Sub: "ഓരോ പ്രശ്നത്തിന്റെയും തീവ്രതയും വിവരണവും നൽകുക",
    step4Title: "ഫോട്ടോകൾ",
    step4Sub: "സന്ദർശന വേളയിൽ എടുത്ത ഫോട്ടോകൾ ചേർക്കുക (ഐഛികം)",
    step5Title: "സ്ഥാനം",
    step5Sub: "ഈ സന്ദർശനത്തിന്റെ GPS സ്ഥാനം ക്യാപ്‌ചർ ചെയ്യുക",
    step6Title: "അവലോകനം & സമർപ്പിക്കൽ",
    step6Sub: "സമർപ്പിക്കുന്നതിന് മുൻപ് വിവരങ്ങൾ പരിശോധിക്കുക",

    patientName: "വ്യക്തി / കുടുംബ പേര്",
    patientNamePh: "സന്ദർശിച്ച വ്യക്തിയുടെ പേര്",
    ageLabel: "പ്രായം",
    agePh: "വർഷങ്ങളിൽ",
    addressLabel: "വിലാസം",
    addressPh: "വീട് / തെരുവ് വിലാസം",
    villageLabel: "ഗ്രാമം / വാർഡ് / പഞ്ചായത്ത്",
    villagePh: "ഗ്രാമം അല്ലെങ്കിൽ വാർഡ്",
    dateLabel: "സന്ദർശന തീയതി",

    catSelectHint: "കാർഡ് ടാപ്പ് ചെയ്ത് പ്രശ്നങ്ങൾ തിരഞ്ഞെടുക്കുക",
    addCustomCat: "+ പുതിയ വിഭാഗം ചേർക്കുക",
    customCatPh: "പുതിയ വിഭാഗം ടൈപ്പ് ചെയ്യുക",
    customCatLabel: "പുതിയ വിഭാഗം പേര്",

    severityLabel: "തീവ്രത",
    sev1: "കുറഞ്ഞ", sev2: "ഇടത്തരം", sev3: "ഉയർന്ന", sev4: "വളരെ ഉയർന്ന", sev5: "അതിഗുരുതരം",
    notesLabel: "കുറിപ്പുകൾ / വിവരണം",
    notesPh: "പ്രശ്നം വിശദമായി വർണ്ണിക്കുക...",
    recordVoice: "🎤 ശബ്ദം റെക്കോർഡ് ചെയ്യുക (മലയാളം)",
    stopRecording: "⏹ നിർത്തുക",
    listening: "🔴 മലയാളം കേൾക്കുന്നു...",
    voiceHint: "മലയാളത്തിൽ സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക. വാക്കുകൾ കുറിപ്പ് ഫീൽഡിൽ ദൃശ്യമാകും.",

    addPhotoBtn: "📷 ഫോട്ടോ എടുക്കുക / ചേർക്കുക",
    photoHint: "5 ഫോട്ടോ വരെ ചേർക്കാം",
    noPhotos: "ഇതുവരെ ഫോട്ടോ ചേർത്തിട്ടില്ല",

    getLocationBtn: "📍 എന്റെ സ്ഥാനം കണ്ടെത്തുക",
    locationFound: "✅ സ്ഥാനം ക്യാപ്‌ചർ ചെയ്തു",
    locationError: "സ്ഥാനം ലഭിച്ചില്ല. GPS ഓൺ ആണോ എന്ന് ഉറപ്പ് വരുത്തി വീണ്ടും ശ്രമിക്കുക.",
    locationHint: "GPS ഉപയോഗിച്ച് സ്ഥാനം ഓട്ടോ ക്യാപ്‌ചർ ചെയ്യുക",
    locationLabel: "സ്ഥലം",
    gettingLocation: "സ്ഥാനം കണ്ടെത്തുന്നു...",

    reviewBasicInfo: "അടിസ്ഥാന വിവരങ്ങൾ",
    reviewCategories: "കണ്ടെത്തിയ പ്രശ്നങ്ങൾ",
    reviewPhotos: "ഫോട്ടോകൾ",
    reviewLocation: "സ്ഥാനം",
    photosCount: "ഫോട്ടോ(കൾ)",
    noLocation: "സ്ഥാനം ക്യാപ്‌ചർ ചെയ്‌തിട്ടില്ല",

    submitBtn: "✅ വിലയിരുത്തൽ സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുന്നു...",
    successTitle: "വിജയകരമായി സമർപ്പിച്ചു!",
    successMsg: "നിങ്ങളുടെ വിലയിരുത്തൽ ഡാഷ്‌ബോർഡിൽ സേവ് ചെയ്‌തിരിക്കുന്നു.",
    newAssessmentAfter: "പുതിയ വിലയിരുത്തൽ",
    viewReports: "എന്റെ റിപ്പോർട്ടുകൾ",

    myReportsTitle: "എന്റെ റിപ്പോർട്ടുകൾ",
    noReports: "ഇതുവരെ റിപ്പോർട്ടുകൾ ഇല്ല",
    report: "റിപ്പോർട്ട്",
    reports: "റിപ്പോർട്ടുകൾ",
    totalReports: "ആകെ റിപ്പോർട്ടുകൾ",

    adminTitle: "അഡ്മിൻ ഡാഷ്‌ബോർഡ്",
    adminLoginTitle: "അഡ്മിൻ ആക്സസ്",
    adminPassLabel: "അഡ്മിൻ പാസ്‌വേഡ്",
    adminPassPh: "പാസ്‌വേഡ് നൽകുക",
    adminLoginBtn: "ലോഗിൻ →",
    adminWrongPass: "⚠️ തെറ്റായ പാസ്‌വേഡ്. വീണ്ടും ശ്രമിക്കുക.",

    totalRep: "ആകെ റിപ്പോർട്ടുകൾ",
    todayRep: "ഇന്ന്",
    weekRep: "ഈ ആഴ്ച",
    staffCount: "ജീവനക്കാർ",

    staffPanel: "ജീവനക്കാർ",
    reportsPanel: "അസസ്മെന്റുകൾ",
    viewAll: "എല്ലാം കാണുക",
    exportCSV: "📥 CSV ഡൗൺലോഡ്",
    logoutAdmin: "ലോഗൗട്ട്",
    filterAll: "എല്ലാ കാലവും",
    filterToday: "ഇന്ന്",
    filterWeek: "ഈ ആഴ്ച",
    filterMonth: "ഈ മാസം",
    clickStaff: "ആ ജീവനക്കാരന്റെ റിപ്പോർട്ടുകൾ കാണാൻ മുകളിൽ ക്ലിക്ക് ചെയ്യുക",
    allReports: "എല്ലാ റിപ്പോർട്ടുകളും",
    searchPlaceholder: "റിപ്പോർട്ടുകൾ തിരയുക...",

    next: "അടുത്തത് →",
    back: "← മടങ്ങുക",
    cancel: "റദ്ദാക്കുക",
    close: "അടയ്ക്കുക",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    saving: "സേവ് ചെയ്യുന്നു...",
    error: "ഒരു പ്രശ്നം സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക.",
    required: "ഈ ഫീൽഡ് ആവശ്യമാണ്",
    invalidPhone: "ദയവായി 10 അക്കമുള്ള ഫോൺ നമ്പർ നൽകുക",
    confirmSubmit: "ഈ വിലയിരുത്തൽ സമർപ്പിക്കണോ?",
    yes: "അതെ, സമർപ്പിക്കുക",
    no: "റദ്ദാക്കുക",
    noData: "ഡാറ്റ കണ്ടെത്തിയില്ല",
    delete: "ഇല്ലാതാക്കുക",
    village: "ഗ്രാമം",
    address: "വിലാസം",
    age: "പ്രായം",
    phone: "ഫോൺ",
    date: "തീയതി",
    name: "പേര്",
    location: "സ്ഥലം",
    staff: "ജീവനക്കാരൻ",
    categories: "വിഭാഗങ്ങൾ",
    notes: "കുറിപ്പുകൾ",
    severity: "തീവ്രത",
    photos: "ഫോട്ടോകൾ",
    years: "വർഷം",
    na: "നൽകിയിട്ടില്ല",
  }
};

/* Built-in categories with icon, color, EN label, ML label */
const CATEGORIES = [
  { id: 'cancer',      icon: '🎗️', color: '#E91E63', en: 'Cancer Patient Visit',     ml: 'കാൻസർ രോഗി സന്ദർശനം' },
  { id: 'home',        icon: '🏠', color: '#795548', en: 'Home Condition / Damage',   ml: 'വീടിന്റെ അവസ്ഥ' },
  { id: 'pathway',     icon: '🛣️', color: '#607D8B', en: 'Pathway / Accessibility',   ml: 'വഴി / പ്രവേശനക്ഷമത' },
  { id: 'health',      icon: '🏥', color: '#F44336', en: 'Health Issues',             ml: 'ആരോഗ്യ പ്രശ്നങ്ങൾ' },
  { id: 'food',        icon: '🍚', color: '#FF9800', en: 'Food & Nutrition',           ml: 'ഭക്ഷണം & പോഷകം' },
  { id: 'education',   icon: '📚', color: '#2196F3', en: 'Education',                 ml: 'വിദ്യാഭ്യാസം' },
  { id: 'medicine',    icon: '💊', color: '#9C27B0', en: 'Medicine / Treatment',      ml: 'മരുന്ന് / ചികിത്സ' },
  { id: 'mental',      icon: '🧠', color: '#673AB7', en: 'Mental Health',             ml: 'മാനസിക ആരോഗ്യം' },
  { id: 'water',       icon: '💧', color: '#00BCD4', en: 'Water & Sanitation',        ml: 'വെള്ളം & ശുചിത്വം' },
  { id: 'livelihood',  icon: '💼', color: '#4CAF50', en: 'Livelihood / Income',       ml: 'ഉപജീവനം / വരുമാനം' },
  { id: 'disability',  icon: '♿', color: '#009688', en: 'Disability Support',        ml: 'ഭിന്നശേഷി' },
  { id: 'women',       icon: '👩', color: '#E91E63', en: "Women's Issues",            ml: 'സ്ത്രീ പ്രശ്നങ്ങൾ' },
  { id: 'children',    icon: '👶', color: '#FF5722', en: "Children's Welfare",        ml: 'കുട്ടികളുടെ ക്ഷേമം' },
  { id: 'elder',       icon: '👴', color: '#8D6E63', en: 'Elder Care',               ml: 'വൃദ്ധ സംരക്ഷണം' },
  { id: 'govt',        icon: '🏛️', color: '#3F51B5', en: 'Government Scheme',        ml: 'സർക്കാർ പദ്ധതി' },
  { id: 'social',      icon: '🤝', color: '#009688', en: 'Social Issues',            ml: 'സാമൂഹിക പ്രശ്നങ്ങൾ' },
  { id: 'electricity', icon: '⚡', color: '#FFC107', en: 'Electricity Issues',       ml: 'വൈദ്യുതി പ്രശ്നങ്ങൾ' },
  { id: 'disaster',    icon: '🌊', color: '#0288D1', en: 'Flood / Disaster',         ml: 'പ്രളയ / ദുരന്തം' },
];

let currentLang = localStorage.getItem('trust_lang') || 'en';

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS['en']?.[key] ?? key;
}

function getCatLabel(cat) {
  return currentLang === 'ml' ? cat.ml : cat.en;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('trust_lang', lang);
  document.documentElement.lang = lang === 'ml' ? 'ml' : 'en';
  applyTranslations();
  if (typeof onLangChange === 'function') onLangChange(lang);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = t(el.dataset.i18n);
    if (v) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = t(el.dataset.i18nPh);
    if (v) el.placeholder = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = t(el.dataset.i18nHtml);
    if (v) el.innerHTML = v;
  });
  // update lang buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
  document.querySelectorAll('.ad-lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
}
