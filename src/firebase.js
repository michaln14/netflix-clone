import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyAbDB0gKwyWcyJ5WOg7kiRqvmAyERxcv2A",
    authDomain: "netflix-clone-b2625.firebaseapp.com",
    projectId: "netflix-clone-b2625",
    storageBucket: "netflix-clone-b2625.appspot.com",
    messagingSenderId: "670893847198",
    appId: "1:670893847198:web:b541948fd8307a4874418f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout}