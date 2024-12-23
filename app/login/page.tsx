"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const Login: React.FC = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setusername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        router.push('/plantMe');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please check your credentials and try again.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Quicksand", sans-serif',
      backgroundImage: 'url("/forest.jpg")',  
      backgroundSize: 'cover',  
      backgroundPosition: 'center', 
    }}>
      <div style={{
        backgroundColor: '#CBD2A4',  
        borderRadius: '10px',         
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', 
        width: '100%',               
        maxWidth: '400px',            
        padding: '40px',              
        textAlign: 'center',         
      }}>
        <div className="logo">
          <Image src="/logo.png" alt="Logo" width={75} height={75} style={{ marginBottom: '30px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>Email</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
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
                value={password}
                onChange={handlePasswordChange}
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
            Login
          </button>
          <div style={{
            marginTop: '20px',
            fontSize: '14px',
            color: '#54473F',
            fontFamily: '"Quicksand", sans-serif',
          }}>
            Don’t have an account?{' '}
            <a
              href="/register"
              style={{ color: '#914F1E', textDecoration: 'none' }}
            >
              Register here
            </a>
          </div>
        </form>
      </div> 
    </div> 
  );
};

export default Login;
