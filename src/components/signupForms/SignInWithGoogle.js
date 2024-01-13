import React from 'react';
import { auth,provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../Toast/ToastService';
import { AlertCircle, LogIn, UserCheck, Zap } from 'react-feather'




const GoogleLoginButton = () => {

  const toast=useToast();

const handleLogin = () => {
    toast.open(
      <div className='flex gap-2 bg-lime-200 text-lime-700 p-4 rounded-lg shadow-lg'>
        <UserCheck size={40} />
        <div>
          <h3 className='font-bold'>Authenticated</h3>
          <p className='text-sm'>You are logged in successfully</p>
        </div>
      </div>
    )
  }
  const navigate=useNavigate();
    const signWithGoogle = async () => {
      const results=await signInWithPopup(auth,provider);
      console.log(results);
      const authInfo={
        userID:results.user.uid,
        name:results.user.displayName,
        isAuth:true
      }
      localStorage.setItem('auth',JSON.stringify(authInfo));
      handleLogin();
      
    
      navigate('/dashboard');

      


    };
  return (
    <div className="group relative w-full flex justify-center py-4 ">
      <button onClick={signWithGoogle}
        style={{ width: '100%',justifyContent:'center' }}  // Set the width inline
        className="px-4 py-2 border flex gap-2 border-slate-400 rounded-lg text-slate-400 dark:text-slate-500 hover:border-slate-900 dark:hover:border-slate-600 hover:text-slate-800 dark:hover:text-slate-800 hover:shadow transition duration-150"
      >
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleLoginButton;
