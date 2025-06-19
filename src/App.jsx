import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import JourneyPage from './JourneyPage';
import SummaryPage from './SummaryPage';
import UpgradePage from './UpgradePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/journey" element={<JourneyPage />} />
      <Route path="/summary" element={<SummaryPage />} />
      <Route path="/upgrade" element={<UpgradePage />} />
    </Routes>
  );
}

export default App;
