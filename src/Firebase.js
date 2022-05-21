import React from "react";
import { FirebaseProvider } from "@useweb/use-firebase";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAnJ5fVlXSkOWlVWp0HwNRVfMU93FhTGyA",
  authDomain: "fire-alarm-security-device.firebaseapp.com",
  databaseURL: "https://fire-alarm-security-device-default-rtdb.firebaseio.com",
  projectId: "fire-alarm-security-device",
  storageBucket: "fire-alarm-security-device.appspot.com",
  messagingSenderId: "1065354230979",
  appId: "1:1065354230979:web:a423eb5e64be397dbcb676",
}; // firebaseConfig is required

export const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const envIsDev = process.env.NODE_ENV === "development";

const vapidKey =
  "BEXdDv1Xcjny5mea1C9OB-6RW-CGyXP142XaC7T5zaSZmQo9LUUTbW-ThX4VWBOxHEk18aidQd3HKyHdPHm174w"; // vapidKey is required

export default function Firebase({ children }) {
  return (
    <FirebaseProvider
      firebaseConfig={firebaseConfig}
      firebaseApp={firebaseApp}
      envIsDev={envIsDev}
      messaging={messaging}
      messagingOptions={{
        vapidKey,
      }}
    >
      {children}
    </FirebaseProvider>
  );
}
