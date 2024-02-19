import { doc, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../infra/firebase";

// ブログの情報を追加
export async function createBlog(blog: Blog) {
    try {
        const docRef = await addDoc(collection(db, "blog"), blog);
        console.log("Document written with ID 📡: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: 💣", e);
    }
}

// ブログの情報を取得
export async function getBlog() {
    const blog: Blog[] = [];
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((doc) => {
        blog.push(doc.data() as Blog);
    });
    return blog;
}