import { auth } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'

// Iniciar sesión con correo electrónico y contraseña
const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
}

// Registrar un nuevo usuario con correo electrónico y contraseña
const registerUser = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
}

// Cerrar sesión
const logoutUser = async () => {
  await signOut(auth)
}

export { loginUser, registerUser, logoutUser }
