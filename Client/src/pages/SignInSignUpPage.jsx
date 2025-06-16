import React, { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import '../App.css'; // סגנונות כלליים אם יש

export default function SignInSignUpPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h2>

        {isSignIn ? <SignInForm /> : <SignUpForm />}

        <div className="mt-4 text-center">
          {isSignIn ? (
            <>
              <span>Don't have an account?</span>{' '}
              <button className="text-blue-500 underline" onClick={() => setIsSignIn(false)}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span>Already have an account?</span>{' '}
              <button className="text-blue-500 underline" onClick={() => setIsSignIn(true)}>
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
