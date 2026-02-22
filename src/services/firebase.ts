import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Only initialize if we have the minimum required config and they are not empty strings
const isConfigured = !!(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.databaseURL &&
  firebaseConfig.apiKey !== "" &&
  firebaseConfig.projectId !== "" &&
  firebaseConfig.databaseURL !== ""
);

let app: FirebaseApp | undefined;
let db: Database | undefined;

if (isConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    // Explicitly pass the database URL to getDatabase to prevent "Can't determine URL" errors
    db = getDatabase(app, firebaseConfig.databaseURL);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export { db, isConfigured };
