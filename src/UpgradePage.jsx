import React, { useState } from 'react';

const UpgradePage = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 font-sans">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-orange-400 mb-6">Unlock Your Full Journey</h1>
        <p className="text-neutral-300 text-lg mb-6">
          You’ve taken the first step. Now go deeper with AI-powered guidance designed to help you explore, resolve, and activate your personal values.
        </p>

        <div className="text-left space-y-6 mb-10">
          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-300 mb-2">🧠 Guided AI Coaching</h2>
            <p className="text-neutral-300">Scenario-based questions tailored to your reflections. Explore how your values impact real decisions.</p>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-300 mb-2">🛡️ Coat of Arms & Personal Motto</h2>
            <p className="text-neutral-300">Define your symbolic identity with a personalized crest and mantra that embody your core self.</p>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-orange-300 mb-2">📄 Values Playbook PDF</h2>
            <p className="text-neutral-300">Download your complete values journey as a beautifully designed PDF to reflect, revisit, or share.</p>
          </div>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full text-lg transition"
        >
          Start My Full Journey
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-neutral-900 border border-orange-400 p-6 rounded-2xl shadow-xl text-center max-w-sm">
              <h2 className="text-2xl font-bold text-orange-300 mb-4">Coming Soon</h2>
              <p className="text-neutral-200 mb-4">
                You’re already on the list! We’ll notify you at launch so you can be among the first to experience the full TrueNorth journey.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpgradePage;
