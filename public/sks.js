// Import the Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDQnA1-Qed1K_n3KS03rQuTtcHMi21ht2E",
  authDomain: "wowfy-dde3b.firebaseapp.com",
  projectId: "wowfy-dde3b",
  storageBucket: "wowfy-dde3b.appspot.com",
  messagingSenderId: "863118669104",
  appId: "1:863118669104:web:18d3efae6c2a3e4563c4f5",
  measurementId: "G-DKMP048NXW",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
