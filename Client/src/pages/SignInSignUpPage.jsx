import React, { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const SignInSignUpPage = () => {
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-4">
        <button className={`btn mx-2 ${showSignIn ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setShowSignIn(true)}>Sign In</button>
        <button className={`btn mx-2 ${!showSignIn ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setShowSignIn(false)}>Sign Up</button>
      </div>
      {showSignIn ? <SignInForm /> : <SignUpForm />}
    </div>
  );
};

export default SignInSignUpPage;
