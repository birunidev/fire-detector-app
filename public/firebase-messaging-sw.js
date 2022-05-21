/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAnJ5fVlXSkOWlVWp0HwNRVfMU93FhTGyA",
  authDomain: "fire-alarm-security-device.firebaseapp.com",
  databaseURL: "https://fire-alarm-security-device-default-rtdb.firebaseio.com",
  projectId: "fire-alarm-security-device",
  storageBucket: "fire-alarm-security-device.appspot.com",
  messagingSenderId: "1065354230979",
  appId: "1:1065354230979:web:a423eb5e64be397dbcb676",
}; // firebaseConfig is required

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (event) => {
  if (event.action) {
    clients.openWindow(event.action);
  }
  event.notification.close();
});
