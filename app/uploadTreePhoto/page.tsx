'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Location {
  latitude: number;
  longitude: number;
}

const UploadTreePhoto: React.FC = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPhoto(event.target.files[0]);
    }
  };

  // Submit form data to backend
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (location && photo && photoName) {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', photo);

      try {
        const response = await fetch('http://localhost:5000/api/predict/predict-tree', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Tree presence detected: ${data.hasTree ? 'Yes' : 'No'}`);
          if(data.hasTree)
          {
            router.push('/plantMe');
          }
        } else {
          console.error('Server error:', data.error);
          alert('Failed to process the photo.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while uploading the photo.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: '"Quicksand", sans-serif',
        backgroundImage: 'url("/forest.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#CBD2A4',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#789461', marginBottom: '20px' }}>Upload Tree Photo</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px', textAlign: 'left', color: '#789461' }}>
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>
              Photo Name
            </label>
            <input
              type="text"
              placeholder="Enter photo name"
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
              required
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
            <label style={{ fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' }}>
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
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
          <div style={{ marginBottom: '20px', color: '#789461' }}>
            <p>
              <strong>Location:</strong>{' '}
              {location
                ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
                : 'Getting location...'}
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
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
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadTreePhoto;
