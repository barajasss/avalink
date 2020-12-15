import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCs1Bt1pKLO7KtzurY8WblGqQntNy4T4rY',
	authDomain: 'avalink-f3930.firebaseapp.com',
	projectId: 'avalink-f3930',
	storageBucket: 'avalink-f3930.appspot.com',
	messagingSenderId: '750159143647',
	appId: '1:750159143647:web:f43f675ccdcb0f96327f6a',
	measurementId: 'G-LCJGFL1LRP',
}

firebase.initializeApp(firebaseConfig)

export default firebase
