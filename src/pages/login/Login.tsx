import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

import EmailInput from "../../components/EmailInput";
import Button from "../../components/Button";
import aspectLogo from "../../assets/aspect-logo-primary.svg";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError("");
  };

  const handleContinue = async () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    setIsSubmitting(true);
    setEmailError("");

    try {
      const usersCollectionRef = collection(db, "communityUsers");

      // This query now correctly uses "Email" (uppercase E)
      const q = query(usersCollectionRef, where("Email", "==", email));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // The email exists, redirect to the portal
        navigate("/new-job");
      } else {
        // The email does not exist, redirect to the sign-up page
        navigate("/signup", { state: { email: email } });
      }
    } catch (error) {
      console.error("Error checking user in Firestore:", error);
      setEmailError("An error occurred. Please try again.");
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
        <div className="flex flex-col items-center gap-4">
          <EmailInput
            value={email}
            onChange={handleEmailChange}
            label="Email"
            placeholder="Enter your email to continue"
            required
            error={emailError}
          />
          <Button
            onClick={handleContinue}
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Checking..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
