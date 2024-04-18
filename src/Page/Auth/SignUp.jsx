import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Swal from 'sweetalert2';
export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const singUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            Swal.fire('Success', 'User created successfully', 'success');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            console.log(error);
            Swal.fire('Error', errorMessage, 'error');
        });
    }

    return (
        <>
        <div className="Login-container">
            <h1>Signup</h1>
            <form onSubmit={singUp}>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </div>
        </>
    )
}