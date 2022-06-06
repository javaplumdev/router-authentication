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
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
// UUID
import { v4 as uuidv4 } from 'uuid';

export const ContextVariable = createContext();

export const ContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const [userDetails, setUserDetails] = useState({});
	const [userInfo, setUserInfo] = useState([]);
	const [currentUserUID, setCurrentUserUID] = useState('');

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
				setCurrentUserUID(currentUser.uid);
			} catch (e) {
				console.log(e.message);
			}
			setUser(currentUser);
		});

		return () => {
			onMountChange();
		};
	});

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef);

			setUserInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		getUsers();
	}, []);

	const connectUID = async (uid, email) => {
		try {
			await setDoc(doc(db, 'users', uid), {
				id: uid,
				email: email,
				password: userDetails.password,
				radioValue: userDetails.radioValue,
			});
		} catch (e) {
			console.log(e);
		}
	};

	// Showing user datas
	const usersCollectionRef = collection(db, 'users');

	const [subjectName, setSubjectName] = useState('');
	const [subjectCode, setSubjectCode] = useState(null);

	const generateSubjectCode = () => {
		setSubjectCode(Math.floor(Math.random() * 1000000000));
	};

	const addSubject = () => {
		console.log(uuidv4());
		console.log(subjectName);
		console.log(subjectCode);
	};

	return (
		<ContextVariable.Provider
			value={{
				user,
				logIn,
				createAccount,
				logOut,
				googleSignIn,
				userInfo,
				currentUserUID,
				addSubject,
				generateSubjectCode,
				setSubjectName,
				subjectCode,
				setSubjectCode,
			}}
		>
			{children}
		</ContextVariable.Provider>
	);
};

export const useUserAuth = () => {
	return useContext(ContextVariable);
};
