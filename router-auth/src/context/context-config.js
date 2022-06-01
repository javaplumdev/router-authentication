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
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const ContextVariable = createContext();

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [userDetails, setUserDetails] = useState({});

	const logIn = (email, password) => {
		return signInWithEmailAndPassword(authApp, email, password);
	};

	const createAccount = (email, password, radioValue) => {
		setUserDetails({
			email: email,
			password: password,
			radioValue: radioValue,
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
			try {
				connectUID(currentUser.uid, currentUser.email);
			} catch (e) {
				console.log(e.message);
			}
			setUser(currentUser);
		});

		return () => {
			onMountChange();
		};
	});

	const connectUID = async (uid, email) => {
		try {
			await setDoc(doc(db, 'users', uid), {
				email: email,
				password: userDetails.password,
				radioValue: userDetails.radioValue,
			});
		} catch (e) {
			console.log('Data not yet filled');
		}
	};

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
