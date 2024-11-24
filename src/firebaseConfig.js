import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit,
    Timestamp,
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Configuración de Firebase
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

// Función utilitaria para obtener referencias de blogs
const getBlogRef = (id) => doc(db, "blogs", id);

// Función para crear un blog
export const createBlog = async (blogData) => {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            ...blogData,
            createdAt: Timestamp.fromDate(new Date()),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error al crear el blog: ", error);
        throw new Error("No se pudo crear el blog.");
    }
};

// Función para leer todos los blogs
export const getBlogs = async (limitNumber = 10) => {
    try {
        const blogs = [];
        const blogsQuery = query(
            collection(db, "blogs"),
            orderBy("createdAt", "desc"),
            limit(limitNumber)
        );
        const querySnapshot = await getDocs(blogsQuery);
        querySnapshot.forEach((doc) => {
            blogs.push({ id: doc.id, ...doc.data() });
        });
        return blogs;
    } catch (error) {
        console.error("Error al obtener los blogs: ", error);
        throw new Error("No se pudieron cargar los blogs.");
    }
};

// Función para actualizar un blog
export const updateBlog = async (id, updatedData) => {
    try {
        const blogRef = getBlogRef(id);
        await updateDoc(blogRef, updatedData);
    } catch (error) {
        console.error("Error al actualizar el blog: ", error);
        throw new Error("No se pudo actualizar el blog.");
    }
};

// Función para eliminar un blog
export const deleteBlog = async (id) => {
    try {
        const blogRef = getBlogRef(id);
        await deleteDoc(blogRef);
    } catch (error) {
        console.error("Error al eliminar el blog: ", error);
        throw new Error("No se pudo eliminar el blog.");
    }
};

// Exportar servicios de Firebase
export { auth, googleProvider, db };

