import React, { useEffect, useState } from 'react';
import { extractValuesFromText } from './utils/extractKeywords';
import { Link } from 'react-router-dom';

const SummaryPage = () => {
  const [keywords, setKeywords] = useState([]);
  const [archetype, setArchetype] = useState('');
  const [name, setName] = useState('');
  const [intention, setIntention] = useState('');

  const archetypeDescriptions = {
    Pathfinder: {
      icon: '🧭',
      description: 'You seek clarity and meaning. You blaze trails aligned with purpose and truth.'
    },
    Guardian: {
      icon: '🛡️',
      description: 'You value stability and loyalty. You protect what matters and serve with integrity.'
    },
    Catalyst: {
      icon: '🔥',
      description: 'You spark change and thrive on bold action. You move forward with courage.'
    },
    Harmonizer: {
      icon: '🌿',
      description: 'You bring peace and connection. You help others find balance and understanding.'
    },
    Sage: {
      icon: '📚',
      description: 'You seek wisdom and insight. You reflect deeply and share meaningful perspectives.'
    },
    Visionary: {
      icon: '🌟',
      description: 'You dream big and look ahead. You lead with ideas and imagine new possibilities.'
    },
    Explorer: {
      icon: '🧳',
      description: 'You’re still discovering your path. Curiosity and openness guide your journey.'
    }
  };

  const valuesMap = {
    'intrinsic-growth': 'growth',
    'extrinsic-status': 'achievement',
    'intrinsic-connection': 'connection',
    'extrinsic-success': 'success',
    'safety': 'stability',
    'freedom': 'freedom',
    'connection': 'connection',
    'growth': 'growth',
    'universal-truth': 'justice',
    'personal-identity': 'authenticity',
    'shared-culture': 'loyalty',
    'spiritual-framework': 'purpose',
    'authenticity-courage': 'courage',
    'freedom-society': 'freedom',
    'inner-truth': 'truth',
    'ownership': 'responsibility',
    'utilitarian-impact': 'compassion',
    'duty-obligation': 'duty',
    'virtue-character': 'honesty',
    'moral-intuition': 'intuition',
    'logic': 'logic',
    'value-check': 'alignment',
    'reason-balance': 'balance',
    'consistency-audit': 'consistency'
  };

  useEffect(() => {
    const rawResponses = Object.values(JSON.parse(localStorage.getItem('journeySelections') || '{}'));
    const mappedKeywords = rawResponses.map(val => valuesMap[val]).filter(Boolean);
    const extracted = extractValuesFromText(mappedKeywords.join(' '));
    setKeywords(extracted);

    const archetypeMap = {
      Pathfinder: ['truth', 'clarity', 'growth', 'purpose'],
      Guardian: ['loyalty', 'duty', 'stability', 'family'],
      Catalyst: ['change', 'courage', 'bold', 'freedom'],
      Harmonizer: ['connection', 'peace', 'balance', 'empathy'],
      Sage: ['wisdom', 'learning', 'reflection', 'perspective'],
      Visionary: ['future', 'innovation', 'idealism', 'creativity']
    };

    let bestMatch = 'Explorer';
    let maxMatches = 0;
    Object.entries(archetypeMap).forEach(([name, keys]) => {
      const matchCount = keys.filter(key => extracted.includes(key)).length;
      if (matchCount > maxMatches) {
        bestMatch = name;
        maxMatches = matchCount;
      }
    });
    setArchetype(bestMatch);

    const storedName = localStorage.getItem('userName') || 'Explorer';
    const storedIntention = localStorage.getItem('userIntention') || '';
    setName(storedName);
    setIntention(storedIntention);
  }, []);

  const article = ['A', 'E', 'I', 'O', 'U'].includes(archetype.charAt(0)) ? 'an' : 'a';
  const { icon, description } = archetypeDescriptions[archetype] || archetypeDescriptions['Explorer'];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 font-sans">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-orange-400 mb-4 text-center">
          {icon} {name}, You Are {article} {archetype}
        </h1>
        <p className="text-lg italic text-center text-blue-300 mb-6">
          {description}
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-300 mb-2">Your Emerging Values</h2>
          {keywords.length > 0 ? (
            <ul className="list-disc list-inside pl-4 text-neutral-200">
              {keywords.map((word, index) => (
                <li key={index}>{word.charAt(0).toUpperCase() + word.slice(1)}</li>
              ))}
            </ul>
          ) : (
            <p className="italic text-neutral-500">
              We couldn't detect values from your reflections. Try writing a bit more, or upgrade for a deeper AI analysis.
            </p>
          )}
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-orange-300 mb-2">A Reflection to Carry Forward</h2>
          <p className="text-neutral-300 mb-2">
            You've started reflecting on what truly matters. This clarity is the first step in living a life aligned with your values.
          </p>
          {intention && (
            <p className="text-neutral-400 italic">
              You shared that your goal was: “{intention}” — let that guide your next steps.
            </p>
          )}
        </section>

        <section className="bg-neutral-800 p-4 rounded-xl mt-8 border border-neutral-700">
          <h2 className="text-lg font-bold text-orange-300 mb-2">🔓 Unlock Your Full Journey</h2>
          <p className="mb-2 text-neutral-300">
            The next step includes guided AI coaching, personalized value conflicts, a symbolic Coat of Arms, and a downloadable Values Playbook.
          </p>
          <Link
            to="/upgrade"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Upgrade My Journey
          </Link>
        </section>
      </div>
    </div>
  );
};

export default SummaryPage;
