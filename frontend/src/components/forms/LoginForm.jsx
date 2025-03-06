import React, { useState } from 'react';
import { Mail, Lock, Loader } from 'lucide-react';

import FormInput from './FormInput.jsx';

import { useAuthStore } from "../../store/useAuthStore";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, isLoading } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        icon={<Mail/>}
        type="email"
        name="email"
        placeholder="Email Address"
        required='required'
        validatorHint='Enter valid email address.'
        validatorHidden='hidden'
        onChange={handleChange}
        disabled={isLoading}
      />

      <FormInput
        icon={<Lock/>}
        type="password"
        name="password"
        placeholder="Password"
        minLength='6'
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}$"
        required='required'
        title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
        validatorHint='Enter valid password.'
        validatorHidden='hidden'
        onChange={handleChange}
        disabled={isLoading}
      />

      <div className="form-control pt-6">
        {isLoading ?
          <Loader className='animate-spin mx-auto' size={24} /> :
          <button className="btn btn-primary btn-outline rounded-md shadow-xl" type="submit">Log in</button>
        }
      </div>
    </form>
  );
};

export default LoginForm;