// React
import { createContext, useContext, useState, useEffect } from 'react';
// Firebase
import { auth } from '../firebase/firebase-config';
import {
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';

export const ContextVariable = createContext();

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const createAccount = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		return signOut(auth);
	};

	const googleSignIn = () => {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	};

	useEffect(() => {
		const onMountChange = onAuthStateChanged(auth, (currentUser) => {
			console.log('Auth', currentUser);
			setUser(currentUser);
		});

		return () => {
			onMountChange();
		};
	});

	return (
		<ContextVariable.Provider
			value={{ user, logIn, createAccount, logOut, googleSignIn }}
		>
			{children}
		</ContextVariable.Provider>
	);
};

export const useUserAuth = () => {
	return useContext(ContextVariable);
};
