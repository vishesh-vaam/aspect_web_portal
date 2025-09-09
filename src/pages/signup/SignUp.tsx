import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// This function is for creating the user account
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

import EmailInput from "../../components/EmailInput";
import Button from "../../components/Button";
import aspectLogo from "../../assets/aspect-logo-primary.svg";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to the login page if someone lands here directly without an email
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const handleSignUp = async () => {
    setIsSubmitting(true);
    setFormError("");

    // --- KEY PART ---
    // Create a strong, random password for the user behind the scenes.
    // The user will never see or need to know this password.
    const randomPassword = Math.random().toString(36).slice(-12);

    try {
      // Create the user in Firebase with their email and the hidden password
      await createUserWithEmailAndPassword(auth, email, randomPassword);

      // After creating the account, Firebase automatically signs them in.
      // Now we can redirect them to the main portal, fully authenticated.
      navigate("/new-job");
    } catch (error: any) {
      setFormError("Could not create an account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2">
      <div className="max-w-md w-full flex flex-col items-stretch gap-6 px-8 py-14 bg-white rounded-lg">
        <div className="flex justify-center mb-4">
          <img src={aspectLogo} alt="Aspect Logo" className="h-12 w-auto" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Confirm Your Sign-Up</h2>
          <p className="text-gray-600 mt-1">
            Click the button below to create your account.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <EmailInput
            value={email}
            label="Your Email"
            disabled // The email is not editable
            onChange={() => {}} // No-op handler to satisfy the interface
          />
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <Button
            onClick={handleSignUp}
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? "Creating Account..." : "Sign Up & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
