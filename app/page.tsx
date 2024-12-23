import React from 'react';
import LeaderboardComponent from './leaderboard/leaderboard';

const SomePage: React.FC = () => {
  return (
    <div>
      <h1>Event Leaderboard</h1>
      <LeaderboardComponent eventId="1" />
    </div>
  );
};

export default SomePage;
