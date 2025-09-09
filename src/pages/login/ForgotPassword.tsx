import React, { useState } from 'react';
import EmailInput from '../../components/EmailInput';
import Button from '../../components/Button';
import aspectLogo from '../../assets/aspect-logo-primary.svg';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError('');
  };

  const handleSendResetLink = () => {
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="max-w-md w-full flex flex-col items-stretch gap-6 px-8 py-14 bg-white rounded-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src={aspectLogo} 
            alt="Aspect Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-2">
          {!isSubmitted ? (
            <>
              <p className="w-[80%] text-center">Reset your password</p>
              <span className="w-[80%] text-sm text-center">Enter your email and we'll send you instructions on how to reset your password</span>
            </>
          ) : (
            <>
              <p className="w-[80%] text-center">Check your email</p>
              <span className="w-[80%] text-sm text-center">We have sent password reset instructions to the email if an associated account exists.</span>
            </>
          )}
        </div>

        {/* Form */}
        {!isSubmitted && (
          <div className="flex flex-col items-center gap-4">
            <EmailInput
              value={email}
              onChange={handleEmailChange}
              label=""
              placeholder="Enter your email address"
              required
              error={emailError}
            />

            {/* Send Reset Link Button */}
            <Button
              onClick={handleSendResetLink}
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-4"
            >
              Send reset link
            </Button>
          </div>
        )}

        {/* Back to Login Link */}
        <a 
            href="/login" 
            className="text-sm text-center underline-offset-2 hover:underline"
        >
            Back to login
        </a>

      </div>
    </div>
  );
};

export default ForgotPassword;
