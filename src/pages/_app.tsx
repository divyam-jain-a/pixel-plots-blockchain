import "../styles/globals.css";
import type { AppProps } from "next/app";
import "nes.css/css/nes.min.css";
import { Press_Start_2P } from 'next/font/google'
import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBDRlNH25v08U8qFTI6K8VfAWDTbgtkobc",
  authDomain: "pixelplots-78864.firebaseapp.com",
  projectId: "pixelplots-78864",
  storageBucket: "pixelplots-78864.appspot.com",
  messagingSenderId: "795568128731",
  appId: "1:795568128731:web:6fc852e66eb7a3cb7542fe",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
// Sign in and sign out functins
const signIn = () => auth.signInWithPopup(provider);
const signOut = () => auth.signOut();

const inter = Press_Start_2P({weight: "400", subsets: ['latin']});

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => setUser(user));
  }, []);
  return (<main className={inter.className}>
    <Component {...pageProps} user={user} signIn={signIn} signOut={signOut} />
    </main>
  );
}