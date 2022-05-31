// React
import { createContext, useContext, useState, useEffect } from 'react';
// Firebase
import { authApp } from '../firebase/firebase-config';
import {
	createUserWithEmailAndPassword,
	signOut,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { Firestore } from '@firebase/firestore';
import { db } from '../firebase/firebase-config';

export const ContextVariable = createContext();

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(authApp, email, password);
	};

	const createAccount = async (email, password) => {
		// fireStoreProvider.collection('users').doc(authApp.currentUser.uid).set({
		// 	email: email,
		// });

		db.collection('users').doc(authApp.currentUser.uid).set({
			email: email,
		});

		return createUserWithEmailAndPassword(authApp, email, password);
	};

	const logOut = () => {
		return signOut(authApp);
	};

	const googleSignIn = () => {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(authApp, googleAuthProvider);
	};

	useEffect(() => {
		const onMountChange = onAuthStateChanged(authApp, (currentUser) => {
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
