import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { GoogleIcon } from '../icons/Icons';

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogin = async () => {
    setIsSigningIn(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary via-secondary to-accent bg-[length:200%_200%] animate-gradient-bg">
      <div className="w-full max-w-md p-8 space-y-8 bg-secondary rounded-xl shadow-2xl text-center backdrop-blur-sm bg-opacity-80">
        <div className="space-y-2">
           <h1 className="text-4xl font-bold text-highlight">FrontPage Finance</h1>
           <p className="text-text-secondary">Your unified view into the world of finance.</p>
        </div>
       
        <div className="pt-6">
          <button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:scale-100"
          >
            <GoogleIcon />
            <span className="ml-3">{isSigningIn ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>
        </div>
        {error && <p className="text-sm text-loss pt-2">{error}</p>}
        <p className="text-xs text-accent pt-4">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;