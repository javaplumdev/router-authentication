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
// React toast
import { toast } from 'react-hot-toast';

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
			if (currentUser === null) {
				return true;
			} else {
				connectUID(currentUser.uid, currentUser.email);
				setCurrentUserUID(currentUser.uid);
				setUser(currentUser);
			}
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
		if (
			userDetails.password === undefined &&
			userDetails.radioValue === undefined
		) {
		} else {
			await setDoc(doc(db, 'users', uid), {
				id: uid,
				email: email,
				password: userDetails.password,
				radioValue: userDetails.radioValue,
			});
		}
	};

	// Showing user datas
	const usersCollectionRef = collection(db, 'users');

	const [subjectName, setSubjectName] = useState('');
	const [subjectCode, setSubjectCode] = useState(null);

	const [userContainer, setUserContainer] = useState([]);

	useEffect(() => {
		setUserContainer(userInfo.filter((doc) => doc.id === user.uid));
	}, [userInfo]);

	const generateSubjectCode = () => {
		setSubjectCode(Math.floor(Math.random() * 1000000000));

		// userContainer.map((item) => {
		// 	return item.subjects.map((item) => {
		// 		if (item.subjectCode !== subjectCode) {
		// 			setSubjectCode(Math.floor(Math.random() * 1000000000));
		// 		} else {
		// 			setSubjectCode(Math.floor(Math.random() * 1000000000));
		// 		}
		// 	});
		// });
	};

	const [subjectInfo, setSubjectInfo] = useState([]);
	const addSubject = async () => {
		const usersRef = doc(db, 'users', currentUserUID);

		setDoc(
			usersRef,
			{
				subjects: {
					subjectID: uuidv4(),
					subjectName: subjectName,
					subjectCode: subjectCode,
					studentsEnrolled: [],
					activities: [],
					assignments: [],
				},
			},
			{ merge: true }
		);

		toast.success('Subject successfully added');
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
