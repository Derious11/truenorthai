import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const episodes = [
  {
    title: 'Episode 1: The Core of It All',
    subtitle: 'Intrinsic vs. Extrinsic Values',
    question: 'What primarily motivates your actions day-to-day?',
    options: [
      { label: 'Personal growth or inner peace', value: 'intrinsic-growth' },
      { label: 'Recognition or rewards', value: 'extrinsic-status' },
      { label: 'Relationships and connection', value: 'intrinsic-connection' },
      { label: 'Success and achievement', value: 'extrinsic-success' }
    ]
  },
  {
    title: 'Episode 2: The Ladder of Importance',
    subtitle: 'Hierarchy of Values',
    question: 'Which of these would you protect first if everything was at risk?',
    options: [
      { label: 'Physical safety and security', value: 'safety' },
      { label: 'Freedom to be yourself', value: 'freedom' },
      { label: 'Meaningful relationships', value: 'connection' },
      { label: 'Opportunities to grow and learn', value: 'growth' }
    ]
  },
  {
    title: 'Episode 3: The Spectrum of Truth',
    subtitle: 'Universality vs. Individuality',
    question: 'What kind of value feels most powerful to you?',
    options: [
      { label: 'A universal truth like justice or equality', value: 'universal-truth' },
      { label: 'Something deeply personal to my own life', value: 'personal-identity' },
      { label: 'A cultural tradition I strongly connect to', value: 'shared-culture' },
      { label: 'A spiritual or philosophical belief', value: 'spiritual-framework' }
    ]
  },
  {
    title: 'Episode 4: The Courage to Choose',
    subtitle: 'Existentialism and Authenticity',
    question: 'What helps you feel most true to yourself?',
    options: [
      { label: 'Making bold choices that reflect who I am', value: 'authenticity-courage' },
      { label: 'Breaking away from societal expectations', value: 'freedom-society' },
      { label: 'Following my intuition and inner voice', value: 'inner-truth' },
      { label: 'Taking responsibility for my decisions', value: 'ownership' }
    ]
  },
  {
    title: 'Episode 5: The Moral Compass',
    subtitle: 'Ethics and Morality',
    question: 'What most often guides your idea of right and wrong?',
    options: [
      { label: 'The impact of my actions on others', value: 'utilitarian-impact' },
      { label: 'Doing what’s expected or required', value: 'duty-obligation' },
      { label: 'Being honest and kind as a person', value: 'virtue-character' },
      { label: 'Sticking to what feels right in my gut', value: 'moral-intuition' }
    ]
  },
  {
    title: 'Episode 6: The Architect of Thought',
    subtitle: 'Logic and Consistency',
    question: 'How do you make tough decisions?',
    options: [
      { label: 'Think through the facts logically', value: 'logic' },
      { label: 'Check if my values align with the choice', value: 'value-check' },
      { label: 'Weigh pros and cons and test for consistency', value: 'reason-balance' },
      { label: 'Look for contradictions in my thinking', value: 'consistency-audit' }
    ]
  }
];

function JourneyPage() {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [selections, setSelections] = useState({});
  const navigate = useNavigate();

  const handleSelection = (value) => {
    setSelections((prev) => ({ ...prev, [currentEpisode]: value }));
  };

  const handleSubmit = async () => {
    const userID = localStorage.getItem('userID') || 'unknown';
    const episode = episodes[currentEpisode];
    try {
        await fetch('https://api.airtable.com/v0/appcB5OrRVIkPirkU/tblFPKDQgIWVzvc6D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                UserID: userID,
                Episode: episode.title,
                Question: episode.question,
                SelectedLabel: episode.options.find(opt => opt.value === selections[currentEpisode])?.label,
                SelectedValue: selections[currentEpisode]
              },
            },
          ],
        }),
      });
    } catch (err) {
      console.error('Failed to save selection:', err);
    }

    if (currentEpisode < episodes.length - 1) {
      setCurrentEpisode(currentEpisode + 1);
    } else {
      localStorage.setItem('journeySelections', JSON.stringify(selections));
      navigate('/summary');
    }
  };

  const episode = episodes[currentEpisode];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 font-sans">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-orange-400 mb-2">{episode.title}</h1>
        <h2 className="text-sm text-blue-300 mb-6">{episode.subtitle}</h2>
        <p className="mb-6 text-lg text-neutral-200">{episode.question}</p>

        <div className="space-y-4">
          {episode.options.map((option, idx) => (
            <label
              key={idx}
              className={`block border rounded-lg px-4 py-3 cursor-pointer transition ${
                selections[currentEpisode] === option.value
                  ? 'bg-orange-500 text-white border-orange-600'
                  : 'bg-neutral-800 border-neutral-700 hover:border-orange-400'
              }`}
            >
              <input
                type="radio"
                name={`episode-${currentEpisode}`}
                value={option.value}
                checked={selections[currentEpisode] === option.value}
                onChange={() => handleSelection(option.value)}
                className="hidden"
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="text-right mt-8">
          <button
            onClick={handleSubmit}
            disabled={!selections[currentEpisode]}
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            {currentEpisode < episodes.length - 1 ? 'Next Episode →' : 'Finish and View Summary'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JourneyPage;
