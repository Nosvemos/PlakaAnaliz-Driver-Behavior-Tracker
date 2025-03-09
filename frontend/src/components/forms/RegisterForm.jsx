import React, { useState } from 'react';
import { User, Mail, Lock, Loader } from 'lucide-react';

import FormInput from './inputs/FormInput.jsx';
import PasswordStrengthMeter from "../common/PasswordStrengthMeter.jsx";

import { useAuthStore } from "../../store/useAuthStore.js";
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData.username, formData.email, formData.password);
      if (response) {
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='w-full' onSubmit={handleRegister}>
      <FormInput
        icon={<User />}
        type='text'
        name='username'
        placeholder='Username'
        pattern='[A-Za-z][A-Za-z0-9\-_]*'
        minLength='3'
        maxLength='30'
        required
        title='Must be more than 3 and less than 30 characters, including only letters.'
        validatorHint='Enter valid username.'
        onChange={handleChange}
        disabled={isLoading}
      />
      <FormInput
        icon={<Mail />}
        type='email'
        name='email'
        placeholder='Email Address'
        required
        validatorHint='Enter valid email address.'
        onChange={handleChange}
        disabled={isLoading}
      />
      <FormInput
        icon={<Lock />}
        type='password'
        name='password'
        placeholder='Password'
        minLength='6'
        pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zğüşıöçĞÜŞİÖÇ\d@$!%*?&]{6,}'
        required
        title='Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
        validatorHint='Enter valid password.'
        onChange={handleChange}
        disabled={isLoading}
      />
      <PasswordStrengthMeter password={formData.password} />
      <button className='btn btn-primary btn-outline rounded-md shadow-xl mt-6' type='submit' disabled={isLoading}>
        {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;