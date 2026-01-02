 // firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "api key",
  authDomain: "ai-hair-assistant.firebaseapp.com",
  projectId: "ai-hair-assistant",
  storageBucket: "ai-hair-assistant.firebasestorage.app",
  messagingSenderId: "1098503832362",
  appId: "1:1098503832362:web:74413289c13dc2812cd453",
  measurementId: "G-9M2K7BMEED"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };




