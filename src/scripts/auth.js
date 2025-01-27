import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js'
import { auth } from './firebase.js'


 const loginUser = async (email, password)=>{
    signInWithEmailAndPassword(auth, email, password).then((res)=>{
      console.log(res);
      
    }).catch((err)=>{
      throw new Error(err)
    })
    
    
    }


    

 const registerUser = async (email, password)=>{
    createUserWithEmailAndPassword(auth, email, password).then((res)=>{
      console.log(res);
      
    }).catch((err)=>{
      throw new Error(err)
    })
    
    
    }

    export {loginUser,registerUser }