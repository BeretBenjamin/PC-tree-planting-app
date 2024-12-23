"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
   // const [password, setPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setPassword(e.target.value);
  //};



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Send the data to the backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.status === 201) {
        router.push('/login');
      }
    } catch (error) {
      console.error("There was an error during signup:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      backgroundColor: '#f4f7fa', 
      backgroundImage: 'url("/forest.jpg")', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      padding: '20px',
      fontFamily: '"Quicksand", sans-serif',
      margin: 0,
    }}>
      <div style={{
        backgroundColor: '#CBD2A4',
        borderRadius: '10px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '105%',
        maxWidth: '400px',
        padding: '30px',
        textAlign: 'center',
        overflow: 'hidden', 
        boxSizing: 'border-box', 
        margin: '20px',
      }}>
        <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px', fontWeight: 'bold' }}>Create New Account</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="mihneabucur"
              value={formData.username}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                fontSize: '16px',
                color: '#333',
                fontFamily: '"Quicksand", sans-serif',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="user@mail.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                fontSize: '16px',
                color: '#333',
                fontFamily: '"Quicksand", sans-serif',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Role</label>
            <input
              type="text"
              name="role"
              placeholder="Volunteer"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                backgroundColor: '#fff',
                fontSize: '16px',
                color: '#333',
                fontFamily: '"Quicksand", sans-serif',
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  fontSize: '16px',
                  color: '#333',
                  fontFamily: '"Quicksand", sans-serif',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#789461',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}
              >
          {showPassword ? <VisibilityOff /> : <Visibility />}  
          </button>
            </div>
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  backgroundColor: '#fff',
                  fontSize: '16px',
                  color: '#333',
                  fontFamily: '"Quicksand", sans-serif',
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#789461',
                  cursor: 'pointer',
                  fontSize: '20px',
                }}
              >
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}  
          </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#789461',
              color: '#fff',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: '"Quicksand", sans-serif',
            }}
          >
            Register
          </button>

          <div style={{
            marginTop: '10px',
            fontSize: '14px',
            color: '#54473F',
            fontFamily: '"Quicksand", sans-serif',
          }}>
            Already have an account?{' '}
            <a
              href="/login"
              style={{ color: '#914F1E', textDecoration: 'none' }}
            >
              Login here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
