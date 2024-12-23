'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface LeaderboardProps {
  eventId: string; // Event ID to fetch leaderboard data for
}

const LeaderboardComponent: React.FC<LeaderboardProps> = ({ eventId }) => {
  // Styles
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: '"Quicksand", sans-serif',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    borderCollapse: 'collapse',
    backgroundColor: '#CBD2A4',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  };

  const tableHeaderStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    color: '#FFF',
    fontWeight: 'bold',
  };

  const tableRowStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '10px',
    fontSize: '14px',
  };

  const paginationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#CBD2A4',
    color: '#FFF',
    border: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonDisabledStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#CBD2A4',
    cursor: 'not-allowed',
  };

  // State management
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchLeaderboardData = async (page: number) => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(`/api/leaderboard/event/${eventId}`, {
        params: { page, limit: 10 },
      });
      const data = response.data || {};
      setLeaderboardData(data.entries || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData(currentPage);
  }, [currentPage, eventId]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div style={containerStyle}>Loading...</div>;
  if (error)
    return (
      <div style={containerStyle}>
        Error loading leaderboard data. Please try again later.
      </div>
    );
    
  return (
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr style={tableHeaderStyle}>
            <th style={tableRowStyle}>Rank</th>
            <th style={tableRowStyle}>Name</th>
            <th style={tableRowStyle}>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={entry.id}>
              <td style={tableRowStyle}>{(currentPage - 1) * 10 + index + 1}</td>
              <td style={tableRowStyle}>{entry.name}</td>
              <td style={tableRowStyle}>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={paginationStyle}>
        <button
          style={currentPage === 1 ? buttonDisabledStyle : buttonStyle}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button
          style={currentPage === totalPages ? buttonDisabledStyle : buttonStyle}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeaderboardComponent;
