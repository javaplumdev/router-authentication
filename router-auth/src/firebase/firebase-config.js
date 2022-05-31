import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDX8_38c9v57k_AcSMV2tNANmIKagnOy70',
	authDomain: 'fir-auth-86a53.firebaseapp.com',
	projectId: 'fir-auth-86a53',
	storageBucket: 'fir-auth-86a53.appspot.com',
	messagingSenderId: '93741545192',
	appId: '1:93741545192:web:9c0f8cbf29c8b09b3b3b5d',
	measurementId: 'G-8WT0PB8BTK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
