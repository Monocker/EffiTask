/* import { auth } from '../firebase/firebaseConfig'*/
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '../firebase/firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'

// Iniciar sesión con correo electrónico y contraseña
const loginUser = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
}

// Registrar un nuevo usuario con correo electrónico y contraseña
const registerUser = async (
  email: string,
  password: string,
  companyName: string,
  ownerName: string,
  departments: string[] = []
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  await setDoc(doc(db, 'users', user.uid), {
    companyName: companyName,
    ownerName: ownerName,
    email: email,
    role: 'manager',
    departments: departments,
    createdAt: new Date()
  })
}

const registerCollaborator = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    console.log('user:', user)

    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      role: 'employee',
      createdAt: new Date()
    })
  } catch (error) {
    console.error(error)
    throw error // Puedes manejar el error según sea necesario
  }
}

// Cerrar sesión
const logoutUser = async () => {
  await signOut(auth)
}

export { loginUser, registerUser, logoutUser, registerCollaborator }