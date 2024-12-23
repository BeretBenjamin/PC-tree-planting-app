"use client";
import React, { useState } from 'react';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    address: '123 Green St, Nature City',
    email: 'johndoe@mail.com',
    role: 'user',
    password: 'parola',
  });

  const [editMode, setEditMode] = useState({
    name: false,
    address: false,
    user: false,
    phone: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditToggle = (field: keyof typeof editMode) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '900px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: '#c3c69a',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ color: '#000', textAlign: 'center', marginBottom: '25px', fontSize: 30 }}>
            Profile
          </h2>

          {/* Profile Fields */}
          {['name', 'address', 'email', 'role', 'password'].map((field, index) => (
            <div key={index} style={{ marginBottom: '30px' }}>
              <label style={{ color: '#333', display: 'block', fontSize: '18px' }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <input
                  type={field === 'password' && !showPassword ? 'password' : 'text'}
                  name={field}
                  disabled={field === 'role' || field === 'user' || !editMode[field as keyof typeof editMode]}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '15px',
                    marginTop: '8px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    backgroundColor: editMode[field as keyof typeof editMode] ? '#f0e6c9' : '#e0e0e0',
                    color: '#333',
                    fontSize: '16px',
                  }}
                  aria-label={field.charAt(0).toUpperCase() + field.slice(1)}
                />
                {/* Button container for alignment */}
                <div style={{ display: 'flex', alignItems: 'center', position: 'absolute', right: '10px' }}>
                  {/* Show/Hide Password Toggle */}
                  {field === 'password' && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#526E48',
                        fontSize: '22px',
                        marginRight: '5px',  // Adds spacing between the buttons
                      }}
                      aria-label={showPassword ? '🙈' : '👁️'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  )}
                  {/* Edit button */}
                  {field !== 'role' && field !== 'user' && (
                    <button
                      type="button"
                      onClick={() => handleEditToggle(field as keyof typeof editMode)}
                      style={{
                        width: '45px',
                        height: '45px',
                        backgroundColor: '#f0e6c9',
                        border: 'none',
                        marginTop: '8px',
                        borderRadius: '0 8px 8px 0',
                        cursor: 'pointer',
                        fontSize: '22px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      aria-label={`Edit ${field}`}
                    >
                      ✏️
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Statistics Section */}
          <div
            style={{
              backgroundColor: '#c3c69a',
              padding: '30px',
              marginTop: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              color: '#333',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ fontSize: '40px', fontWeight: 'bold', color: '#4CAF50' }}>
              <span role="img" aria-label="tree">
                🌳
              </span>{' '}
              12
            </div>
            <div style={{ fontSize: '18px', color: '#444' }}>Planted Trees</div>

            <hr style={{ border: '1px solid #ddd', margin: '20px 0' }} />

            <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#FFC107' }}>
              <span role="img" aria-label="trophy">
                🏆
              </span>{' '}
              1343
            </div>
            <div style={{ fontSize: '18px', color: '#444' }}>Total Points</div>

            <hr style={{ border: '1px solid #ddd', margin: '20px 0' }} />

            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF5722' }}>
              <span role="img" aria-label="tree">
                🌳
              </span>{' '}
              Most Planted Tree: <span style={{ fontWeight: 'bold', color: '#388E3C' }}>Hora Tree</span>
            </div>

            <hr style={{ border: '1px solid #ddd', margin: '20px 0' }} />

            <div style={{ fontSize: '18px', color: '#444' }}>
              <span role="img" aria-label="calendar">
                📅
              </span>{' '}
              Joined Date: <span style={{ fontWeight: 'bold', color: '#388E3C' }}>23/06/2017</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
