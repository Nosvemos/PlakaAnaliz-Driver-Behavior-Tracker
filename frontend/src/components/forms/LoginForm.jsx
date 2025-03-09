import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';

import FormInput from './inputs/FormInput.jsx';

import { useAuthStore } from "../../store/useAuthStore.js";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="w-full" onSubmit={handleLogin}>
      <FormInput
        icon={<Mail size={20} />}
        type='email'
        name='email'
        placeholder='Email Address'
        required
        validatorHint='Enter a valid email address.'
        onChange={handleChange}
        disabled={isLoading}
      />
      <FormInput
        icon={<Lock size={20} />}
        type='password'
        name='password'
        placeholder='Password'
        minLength='6'
        pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$'
        required
        title='Password must be at least 6 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&).'
        validatorHint='Enter a valid password.'
        onChange={handleChange}
        disabled={isLoading}
      />
      <button
        className="btn btn-primary btn-outline rounded-md shadow-xl"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : 'Log in'}
      </button>
    </form>
  );
};

export default LoginForm;