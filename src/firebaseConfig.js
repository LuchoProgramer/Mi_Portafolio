import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios de Firebase
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Configurar Firestore

// Exportar
export { auth, googleProvider, db };

// Función para crear un blog
export const createBlog = async (blogData) => {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            ...blogData,
            createdAt: new Date()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error al crear el blog: ", error);
    }
};

// Función para leer todos los blogs
export const getBlogs = async () => {
    const blogs = [];
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
    });
    return blogs;
};

// Función para actualizar un blog
export const updateBlog = async (id, updatedData) => {
    try {
        const blogRef = doc(db, "blogs", id);
        await updateDoc(blogRef, updatedData);
    } catch (error) {
        console.error("Error al actualizar el blog: ", error);
    }
};

// Función para eliminar un blog
export const deleteBlog = async (id) => {
    try {
        const blogRef = doc(db, "blogs", id);
        await deleteDoc(blogRef);
    } catch (error) {
        console.error("Error al eliminar el blog: ", error);
    }
};


// Guardar layout
export const saveAdminLayout = async (userId, layout) => {
    try {
        const docRef = doc(db, 'adminLayouts', userId);
        await setDoc(docRef, { layout }, { merge: true });
        console.log('Layout guardado exitosamente.');
    } catch (error) {
        console.error('Error guardando el layout:', error);
    }
};

// Recuperar layout
export const getAdminLayout = async (userId) => {
    try {
        const docRef = doc(db, 'adminLayouts', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().layout;
        } else {
            console.log('No se encontró el layout, usando predeterminado.');
            return [
                { i: '1', x: 0, y: 0, w: 3, h: 2 },
                { i: '2', x: 3, y: 0, w: 3, h: 2 },
            ];
        }
    } catch (error) {
        console.error('Error al recuperar el layout:', error);
        return [];
    }
};