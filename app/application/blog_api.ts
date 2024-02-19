import { doc, collection, addDoc, setDoc, getFirestore } from "firebase/firestore";
import { db } from "../infra/firebase";

export async function createBlog(blog: Blog) {
    try {
        const docRef = await addDoc(collection(db, "blog"), blog);
        console.log("Document written with ID 📡: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: 💣", e);
    }
}

// export async function createBlog() {
//     try {
//         const docRef = await addDoc(collection(db, "blog"), {
//             title: "iccyとソロ飯",
//             content: "シュラスコを食べた",
//         }
//         );
//         console.log("Document written with ID 📡: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: 💣", e);
//       }
// }