import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Reemplaza estas variables con tus configuraciones de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPqaPF9xfjEhu9DL_LOANl2yaqIfZBykM",
  authDomain: "bubbletea-6e69d.firebaseapp.com",
  projectId: "bubbletea-6e69d",
  storageBucket: "bubbletea-6e69d.firebasestorage.app",
  messagingSenderId: "164403491224",
  appId: "1:164403491224:web:2834e37d296cf6d354bbed",
  measurementId: "G-QYN9H3RFRN"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Auth
export const auth = getAuth(app);
