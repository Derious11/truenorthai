import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const episodes = [
  {
    title: 'Episode 1: The Core of It All',
    question: 'What primarily motivates your actions day-to-day?'
  },
  {
    title: 'Episode 2: The Ladder of Importance',
    question: 'Which of these would you protect first if everything was at risk?'
  },
  {
    title: 'Episode 3: The Spectrum of Truth',
    question: 'What kind of value feels most powerful to you?'
  },
  {
    title: 'Episode 4: The Courage to Choose',
    question: 'What helps you feel most true to yourself?'
  },
  {
    title: 'Episode 5: The Moral Compass',
    question: 'What most often guides your idea of right and wrong?'
  },
  {
    title: 'Episode 6: The Architect of Thought',
    question: 'How do you make tough decisions?'
  }
];

function SummaryPage() {
  const [responses, setResponses] = useState([]);
  const [summary, setSummary] = useState('Generating your personal values summary...');
  const userEmail = localStorage.getItem('userEmail') || 'unknown';

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://api.airtable.com/v0/appcB5OrRVIkPirkU/tblFPKDQgIWVzvc6D', {
          headers: {
            Authorization: 'Bearer patJZ78Lyvz8Ybcsz.1115be2d9b88209c6f613542de96a21c1a8766651fa32cb7ea5d3df1e1339138',
          },
        });
        const data = await res.json();
        const userRecords = data.records.filter((r) => r.fields.Email === userEmail);

        const sortedResponses = episodes.map((ep) => {
          const match = userRecords.find((r) => r.fields.Episode === ep.title);
          if (!match) return null;
          const tag = match.fields.SelectedValue || 'unknown';
          const label = match.fields.SelectedLabel || tag;
          return {
            episode: ep.title,
            question: ep.question,
            answer: label,
            tag
          };
        }).filter(Boolean);

        setResponses(sortedResponses);

        const tags = sortedResponses.map(r => r.tag);
        const summaryText = `Your reflections suggest you prioritize values such as ${[...new Set(tags)].join(', ')}.`;
        setSummary(summaryText);
      } catch (err) {
        console.error('Failed to fetch summary:', err);
        setSummary('Error loading summary.');
      }
    }
    fetchData();
  }, [userEmail]);

  const handleEmail = async () => {
    try {
      await fetch('https://api.yourdomain.com/send-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, summary, responses }),
      });
      alert('Summary sent to your email!');
    } catch (err) {
      alert('Failed to send email.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 font-sans relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-blue-800 via-neutral-900 to-orange-700 opacity-20" />

      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-orange-400 mb-2">Your Journey Summary</h1>
        <p className="text-neutral-300">Review your reflections and discover what your values reveal.</p>
      </div>

      <div className="text-center mb-10">
        <img src="/logo.png" alt="TrueNorth AI" className="mx-auto w-32 mb-2" />
        <h2 className="text-lg tracking-wide text-neutral-400">TrueNorth AI</h2>
      </div>

      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl mb-12">
        <h2 className="text-2xl font-bold text-orange-300 mb-4">Your Values Insight</h2>
        <p className="text-neutral-200 leading-relaxed whitespace-pre-line">{summary}</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {responses.map((item, idx) => (
          <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h3 className="text-lg font-bold text-blue-400 mb-3">{item.episode}</h3>
            <p className="text-sm text-orange-300 font-medium mb-1">{item.question}</p>
            <p className="text-neutral-200 mb-1">Answer: {item.answer}</p>
            <p className="text-neutral-400 text-sm italic">Value Theme: {item.tag}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 space-x-4">
        <button
          onClick={handleEmail}
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Send Summary to My Email
        </button>
        <Link
          to="/"
          className="inline-block text-sm text-blue-400 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SummaryPage;
