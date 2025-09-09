import React, { useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import Button from '../../components/Button';
import aspectLogo from '../../assets/aspect-logo-primary.svg';

interface ChangePasswordProps {
  email: string;
  passwordUpdatedAt: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ email, passwordUpdatedAt }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    if (newPasswordError) setNewPasswordError('');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (confirmPasswordError) setConfirmPasswordError('');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    // TODO: Implement password change logic
    console.log('Changing password for:', email);
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
        <div className="flex flex-col items-start gap-2">
          <p className="text-left">Enter a new password for <b>{email}</b></p>
          <span className="text-sm text-left">
            Make sure to include at least:<br />
            8 Characters,<br />
            1 Letter,<br />
            1 Number
          </span>
        </div>

        {/* Form */}
        <div className="flex flex-col items-center gap-4">
          <PasswordInput
            value={newPassword}
            onChange={handleNewPasswordChange}
            label="New Password"
            placeholder="Enter your new password"
            required
            error={newPasswordError}
            name="newPassword"
            validatePassword={true}
          />

          <PasswordInput
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            label="Confirm New Password"
            placeholder="Confirm your new password"
            required
            error={confirmPasswordError}
            name="confirmPassword"
          />

          {/* Change Password Button */}
          <Button
            onClick={handleChangePassword}
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-4"
          >
            Change password
          </Button>
        </div>

        {/* Password Last Changed Info */}
        <div>
          <span className="text-sm">
            Password was last changed on {passwordUpdatedAt}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;
