import { getFirestore, collection, addDoc} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js'
import { db } from './firebase.js';


export const exampleAdd =async ()=>{

    try {
        const docRef = await addDoc(collection(db, "users"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }


}