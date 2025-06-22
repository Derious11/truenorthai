import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpgradePage() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userID = localStorage.getItem('userID') || 'unknown';
    try {
      await fetch('https://api.airtable.com/v0/appcB5OrRVIkPirkU/tbl8Hjr5jYYAIGagR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: email,
                UserID: userID,
              },
            },
          ],
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Upgrade interest error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-16 font-sans flex items-center justify-center">
      <div className="max-w-3xl w-full bg-neutral-900 border border-neutral-800 p-10 rounded-2xl shadow-2xl relative z-10">
        <h1 className="text-4xl font-extrabold text-orange-400 text-center mb-6">
          TrueNorth AI — Discover Who You Are. Live What Matters.
        </h1>

        <p className="text-center text-neutral-400 italic mb-8">
          What if your compass pointed not north... but to your true self?
        </p>

        <div className="space-y-6 text-neutral-300">
          <p>
            <strong className="text-orange-300">TrueNorth AI</strong>  isn’t just a quiz. It’s a transformative journey — grounded in psychology, philosophy, and your lived experiences. 
            Through 12 immersive modules, you’ll uncover your true values, clarify your life’s direction, and shape a symbolic identity that reflects your inner compass.
          </p>

          <div className="border-l-4 border-orange-500 pl-4 text-neutral-200">
            <p className="font-semibold text-orange-400">Included in Tier 2:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
            <li>🔍 GPT-powered guided reflections and personalized insight after every module</li>
            <li>🧭 Mini Mission Statement & Early Values Map (after 3 modules)</li>
            <li>💬 Personal Motto & Symbolic Identity Sketch (after 6 modules)</li>
            <li>🛡️ Full Coat of Arms & Draft Values Manifesto (after 9 modules)</li>
            <li>📘 Final Mission Statement & Downloadable Values Playbook (after 12 modules)</li>
            <li>🧰 Life Transitions Toolkit to apply your values to real change</li>
            <li>🌐 Access to the private TrueNorth Community</li>
            </ul>
          </div>

          <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700 text-neutral-200">
            <h2 className="text-lg font-bold text-orange-300 mb-1">Early Explorer Pricing</h2>
            <p>
              Lock in lifetime access for <span className="text-orange-400 font-semibold">$19</span> — price increases to <span className="font-semibold">$39</span> on <span className="underline">Go Live</span>.
              Early sign-ups will help shape the future of this experience.
            </p>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-300">
              No payment required yet — just click below to express your interest. You’ll get first access and be invited to help co-create the next tier.
            </p>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition"
            >
              I Want Early Access
            </button>
          </div>

          <p className="text-sm text-neutral-500 text-center mt-4">
            You’ll hear from us soon with details on how to shape your symbolic identity.
          </p>
        </div>
      </div>

      {/* Email Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-8 shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-neutral-500 hover:text-orange-400 text-xl"
            >
              ×
            </button>

            {!submitted ? (
              <>
                <h2 className="text-xl font-bold text-orange-300 mb-4">Get Early Access</h2>
                <p className="text-neutral-400 mb-4">We’ll notify you when we go live. No spam, ever.</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 mb-4 rounded-md bg-neutral-800 border border-neutral-700 focus:outline-none focus:border-orange-500 text-sm"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition"
                >
                  Notify Me
                </button>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-400 mb-2">🎉 You're on the list!</h3>
                <p className="text-neutral-300">You’ll be among the first to shape the next chapter of TrueNorth AI.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpgradePage;
