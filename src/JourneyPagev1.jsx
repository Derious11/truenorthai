import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const episodes = [
  {
    title: 'Episode 1: The Core of It All',
    subtitle: 'Intrinsic vs. Extrinsic Values',
    videoUrl: 'https://www.youtube.com/embed/your-episode-1-placeholder',
    duration: '2:45',
    description: 'Explore what motivates you from within versus what drives you from outside.',
    questions: [
      'Which intrinsic value resonates most with you: knowledge, love, creativity, or connection? Why?',
      'Can you identify an extrinsic value that has influenced a recent decision you made?',
      'How do you currently balance intrinsic and extrinsic motivations in your life?'
    ],
    tooltips: [
      'Think about what gives you joy regardless of reward.',
      'Try to remember when you chose something for external reasons.',
      'Do you notice when your inner passions and outer rewards align or conflict?'
    ]
  },
  {
    title: 'Episode 2: The Ladder of Importance',
    subtitle: 'Hierarchy of Values',
    videoUrl: 'https://www.youtube.com/embed/your-episode-2-placeholder',
    duration: '2:45',
    description: 'Understand how foundational values build the path to your higher self.',
    questions: [
      'What value forms the base of your ladder—what do you need before anything else?',
      'Which values help you feel a sense of belonging and connection?',
      'What values drive your personal growth or creative expression?'
    ],
    tooltips: [
      'Think Maslow: food, safety, security before all else.',
      'Consider friendships, family, and community ties.',
      'What motivates your creativity or self-expression?'
    ]
  },
  {
    title: 'Episode 3: The Spectrum of Truth',
    subtitle: 'Universality vs. Individuality',
    videoUrl: 'https://www.youtube.com/embed/your-episode-3-placeholder',
    duration: '2:45',
    description: 'Find the harmony between shared human truths and your personal code.',
    questions: [
      'Which value do you believe is truly universal, and why?',
      'What is a value you hold that might be unique to your experience or identity?',
      'How do you balance honoring collective truths with your individuality?'
    ],
    tooltips: [
      'Think about values you believe everyone should live by.',
      'Reflect on cultural, spiritual, or personal experiences.',
      'How do you live your truth while respecting others?’'
    ]
  }
];

function JourneyPage() {
  const [responses, setResponses] = useState({});
  const [completedEpisodes, setCompletedEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [visibleTooltips, setVisibleTooltips] = useState({});
  const navigate = useNavigate();

  const handleResponseChange = (epIndex, qIndex, value) => {
    setResponses((prev) => ({
      ...prev,
      [epIndex]: {
        ...prev[epIndex],
        [qIndex]: value,
      },
    }));
  };

  const toggleTooltip = (qIndex) => {
    setVisibleTooltips((prev) => ({
      ...prev,
      [qIndex]: !prev[qIndex]
    }));
  };

  const markComplete = async (epIndex) => {
    if (!completedEpisodes.includes(epIndex)) {
      setCompletedEpisodes([...completedEpisodes, epIndex]);
    }

    try {
      await fetch('https://api.airtable.com/v0/appcB5OrRVIkPirkU/tblFPKDQgIWVzvc6D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer patJZ78Lyvz8Ybcsz.1115be2d9b88209c6f613542de96a21c1a8766651fa32cb7ea5d3df1e1339138page',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: localStorage.getItem('userEmail') || 'unknown',
                Episode: episodes[epIndex].title,
                Responses: episodes[epIndex].questions.map((q, i) => `${q}\n${responses[epIndex]?.[i] || ''}`).join('\n\n'),
              },
            },
          ],
        }),
      });
    } catch (error) {
      console.error('Failed to save to Airtable:', error);
    }

    if (epIndex < episodes.length - 1) {
      setCurrentEpisode(epIndex + 1);
    } else {
      navigate('/summary');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Welcome to Your Journey</h1>
        <p className="text-gray-600 mb-10">Each episode below explores a foundational aspect of your core values. Watch, reflect, and grow.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={episodes[currentEpisode].videoUrl}
              title={episodes[currentEpisode].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6 text-left">
            <h2 className="text-xl font-semibold text-indigo-700 flex justify-between items-center">
              {episodes[currentEpisode].title}
              {completedEpisodes.includes(currentEpisode) && <span className="text-green-600 text-sm">✓ Completed</span>}
            </h2>
            <h3 className="text-sm text-gray-500 mb-2">{episodes[currentEpisode].subtitle} • {episodes[currentEpisode].duration}</h3>
            <p className="text-gray-700 mb-4">{episodes[currentEpisode].description}</p>
            <div className="space-y-4">
              {episodes[currentEpisode].questions.map((question, qIndex) => (
                <div key={qIndex} className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {question}
                    <button
                      type="button"
                      onClick={() => toggleTooltip(qIndex)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      🛈
                    </button>
                  </label>
                  {visibleTooltips[qIndex] && (
                    <div className="mt-1 mb-2 w-full bg-white text-sm text-gray-700 border border-gray-300 rounded p-2 shadow">
                      {episodes[currentEpisode].tooltips[qIndex]}
                    </div>
                  )}
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    rows={2}
                    value={responses[currentEpisode]?.[qIndex] || ''}
                    onChange={(e) => handleResponseChange(currentEpisode, qIndex, e.target.value)}
                  ></textarea>
                </div>
              ))}
            </div>
            <button
              onClick={() => markComplete(currentEpisode)}
              className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition"
            >
              {currentEpisode < episodes.length - 1 ? 'Next Episode' : 'Finish and Get Summary'}
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JourneyPage;
