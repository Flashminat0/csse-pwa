import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyDXEEfW8PgiI4e5GuSM7cG-ZlOOnOa4yXg',
	authDomain: 'y3s2-spm.firebaseapp.com',
	projectId: 'y3s2-spm',
	storageBucket: 'y3s2-spm.appspot.com',
	messagingSenderId: '899784219721',
	appId: '1:899784219721:web:0cb2f516c35274dc6e7398',
	measurementId: 'G-0XM4QCRRBP',
}

export const FirebaseApp = initializeApp(firebaseConfig)
