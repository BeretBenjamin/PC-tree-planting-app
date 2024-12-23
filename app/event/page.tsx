'use client'; // This marks the component as a client-side component

import React from 'react';

const Event: React.FC = () => {
    // Page container style
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#f4f7fa',
      padding: '20px',
      fontFamily: '"Quicksand", sans-serif',
      minHeight: '100vh',
    };

  // Events grid style
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px',
  };

  // Individual event box style
  const eventBoxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const eventTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#54473F',
    marginBottom: '10px',
  };

  const eventDescriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  };

  const eventDateStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#789461',
  };

  // Upcoming events header box style
  const headerBoxStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4', // Light transparent background
    padding: '15px 30px',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '30px',
    fontFamily: '"Quicksand", sans-serif',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#54473F',
    position: 'relative',
    zIndex: 1,
    top: '-50px', // Move the title slightly upwards
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  // Placeholder data for events (to be replaced with real data from the database)
  const events = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `Event ${index + 1}`,
    description: 'This is a brief description of the event.',
    date: '2024-11-15',
  }));

  return (
    <div style={containerStyle}>
      {/* Upcoming Events Title */}
      <div style={headerBoxStyle}>
        Upcoming Events
      </div>

      {/* Events Grid */}
      <div style={gridStyle}>
        {events.map(event => (
          <div
            key={event.id}
            style={eventBoxStyle}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <h2 style={eventTitleStyle}>{event.title}</h2>
            <p style={eventDescriptionStyle}>{event.description}</p>
            <p style={eventDateStyle}>Date: {event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
