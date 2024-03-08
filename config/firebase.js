// Import the functions you need from the SDKs you need
import { getApp, initializeApp, isInitialized } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKR7Wu5jErTSQpwiDWMVeE2fA38Q91HHE",
  authDomain: "mercadito-utez-674bf.firebaseapp.com",
  projectId: "mercadito-utez-674bf",
  storageBucket: "mercadito-utez-674bf.appspot.com",
  messagingSenderId: "428462417736",
  appId: "1:428462417736:web:5d95f835adc4cee117f57d",
  measurementId: "G-YSDGTSNQ0Q"
};

export const Firebase = () => {
    const [appFirebase, setApp] = useState();
    useEffect(() => {
        if(!isInitialized){
            const app = initializeApp(firebaseConfig);
            setApp(app);
        }else{
            const app = getApp();
            setApp(app);
        }
        return () => {};
    }, []);
    return {appFirebase ,setApp};
}