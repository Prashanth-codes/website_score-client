import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://website-score-server.onrender.com/create-account', {
        fullName,
        email,
        password,
      });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center w-full h-screen bg-cyan-50'>
      <div className='shadow-lg px-8 py-5 grid w-1/3 h-auto bg-white'>
        <h2 className='text-lg font-bold text-center'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 grid">
            <label htmlFor="fullName" className='block text-gray-700'>Full Name</label>
            <input
              id='fullName'
              type="text"
              placeholder='Enter Full Name'
              className='w-full px-3 py-2 border'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4 grid">
            <label htmlFor="email" className='block text-gray-700'>Email</label>
            <input
              id='email'
              type="email"
              placeholder='Enter Email'
              className='w-full px-3 py-2 border'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 grid">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <div className="flex items-center">
              <input 
                id="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter Password" 
                className="w-full px-3 py-2 border rounded-l"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 py-2 bg-gray-200 border border-l-0 rounded-r hover:bg-gray-300"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="mb-4 grid">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
            <div className="flex items-center">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="px-3 py-2 bg-gray-200 border border-l-0 rounded-r hover:bg-gray-300"
                >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {errorMessage && (
            <p className="text-sm text-center text-red-500 mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <div className="text-center mt-4">
          <span>Already have an account?</span>
          <Link to='/login' className='text-blue-500 ml-2'>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
