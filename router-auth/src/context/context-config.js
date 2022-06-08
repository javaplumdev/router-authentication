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
import {
	doc,
	setDoc,
	collection,
	getDocs,
	updateDoc,
	arrayUnion,
	Timestamp,
	onSnapshot,
	addDoc,
} from 'firebase/firestore';
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
	const [subjects, setSubjects] = useState([]);
	const [ownerID, setOwnerID] = useState('');
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
				setOwnerID(currentUser.uid);
				connectUID(currentUser.uid, currentUser.email);
				setCurrentUserUID(currentUser.uid);
				setUser(currentUser);
			}
		});

		return () => {
			onMountChange();
		};
	});

	// Showing user datas
	const usersCollectionRef = collection(db, 'users');

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

	const [subjectName, setSubjectName] = useState('');
	const [subjectCode, setSubjectCode] = useState(null);

	const [userContainer, setUserContainer] = useState([]);

	useEffect(() => {
		setUserContainer(userInfo.filter((doc) => doc.id === user.uid));
	}, [userInfo]);

	useEffect(() => {
		if (currentUserUID) {
			onSnapshot(doc(usersCollectionRef, currentUserUID), (doc) => {
				setSubjects(doc.data().subjects.reverse());
			});
		}
	}, [userInfo]);

	const generateSubjectCode = () => {
		setSubjectCode(Math.floor(Math.random() * 1000000000));
	};

	const addSubject = async () => {
		const usersRef = doc(db, 'users', currentUserUID);
		const created_at = Timestamp.now();

		if (subjectName === null || subjectCode === null) {
			toast.error('Enter some missing fields.');
		} else {
			await updateDoc(
				usersRef,
				{
					subjects: arrayUnion({
						subjectID: uuidv4(),
						subjectName: subjectName,
						subjectCode: subjectCode,
						studentsEnrolled: [],
						activities: [],
						assignments: [],
						createdAt: created_at,
					}),
				},
				{ merge: true }
			);

			toast.success('Subject successfully added');
			setSubjectName(null);
			setSubjectCode(null);
			handleClose();
		}
	};

	const [questionInfo, setQuestionInfo] = useState({});

	const addQuestion = async (id, activityName) => {
		const usersRef = doc(db, 'users', currentUserUID);

		await updateDoc(
			usersRef,
			{
				questions: arrayUnion({
					activityName: activityName,
					subjectID: id,
					name: questionInfo,
				}),
			},
			{ merge: true }
		);
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
				subjects,
				handleClose,
				handleShow,
				show,
				setShow,
				addQuestion,
				setQuestionInfo,
			}}
		>
			{children}
		</ContextVariable.Provider>
	);
};

export const useUserAuth = () => {
	return useContext(ContextVariable);
};
