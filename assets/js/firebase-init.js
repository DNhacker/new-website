// /assets/js/firebase-init.js

// Firebase config
// enter your firebase config 
  
  // Initialize Firebase only once
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Export reusable Firebase services
  const auth = firebase.auth();
  const db = firebase.database();
  const storage = firebase.storage();
  