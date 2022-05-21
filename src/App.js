import React, { useEffect, useState } from "react";
import useFirebaseMessaging from "@useweb/use-firebase-messaging";
import { getDatabase, ref, onValue, set } from "firebase/database";
import "./App.css";
import { firebaseApp } from "./Firebase";

const database = getDatabase(firebaseApp);

function App() {
  const [btnStatus, setBtnStatus] = useState(0);
  const [fcmToken, setFcmToken] = useState("");

  const firebaseMessaging = useFirebaseMessaging({
    onMessage: (message) => {
      console.log(`Received foreground message`, message);
    },
  });

  useEffect(() => {
    const onOffRef = ref(database, "turn_on_off/");
    onValue(onOffRef, (snapshot) => {
      const data = snapshot.val();
      setBtnStatus(data);
      console.log(data);
    });
  });

  useEffect(() => {
    firebaseMessaging.init();
    setFcmToken(firebaseMessaging.fcmRegistrationToken);
  }, [firebaseMessaging]);

  const fetchNotif = async (token) => {
    try {
      const res = await fetch(
        "https://fire-detector-server.herokuapp.com/" + token
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnClick = () => {
    const onOffRef = ref(database, "turn_on_off/");
    if (btnStatus === 0) {
      setBtnStatus(1);
      set(onOffRef, 1).then((res) => alert("System has been turned on"));
    } else if (btnStatus === 1) {
      setBtnStatus(0);
      set(onOffRef, 0).then((res) => alert("System has been turned off"));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotif(fcmToken);
    }, 1000);
    return () => clearInterval(interval);
  }, [fcmToken]);

  return (
    <div className="app">
      <div className="header">
        <h1>Fire Detector App</h1>
      </div>
      <div className="container">
        <h3 className="title">On/Off Switch</h3>
        <p className="device-status">
          Device Status: {btnStatus === 0 ? "OFF" : "ON"}
        </p>
        <button onClick={handleBtnClick} className="btn-status">
          {btnStatus === 0 ? "ON" : "OFF"}
        </button>
        <p className="fire-status">Fire Status: No Fire Detected</p>
      </div>
    </div>
  );
}

export default App;
