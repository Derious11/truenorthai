import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const foundations = [
  {
    title: 'What Are Values?',
    summary: 'They’re not just preferences. Values are the deeply held beliefs that guide your life’s journey.',
    details: 'Values are central to our decision-making. They influence our behavior, priorities, and sense of fulfillment. Without clearly defined values, we drift without direction.'
  },
  {
    title: 'Intrinsic vs. Extrinsic',
    summary: 'Some values are pursued for their own sake. Others are pursued for what they bring.',
    details: 'Intrinsic values, like love or wisdom, are ends in themselves. Extrinsic values, like money or fame, are tools. Knowing the difference can change how you live.'
  },
  {
    title: 'Hierarchy of Values',
    summary: 'Your values aren’t equal. Some rise above the rest, forming the foundation.',
    details: 'A hierarchy of values helps you resolve conflict. When values clash, the higher value wins. Clarifying your hierarchy brings peace and consistency.'
  },
  {
    title: 'Universal vs. Personal',
    summary: 'Truth. Justice. Freedom. Are some values timeless, or are they personal?',
    details: 'Universal values transcend culture and time. Personal values are shaped by experience. Exploring both grounds you in humanity and authenticity.'
  },
  {
    title: 'Existentialism and Authenticity',
    summary: 'Are you living your truth, or someone else’s?',
    details: 'Existentialists like Sartre teach us to choose our own values consciously and authentically, not inherit them blindly. Authenticity brings meaning to life.'
  },
  {
    title: 'Ethics and Morality',
    summary: 'Explore how your values shape your ethics.',
    details: 'Your value system influences your moral choices. Are you driven by results (utilitarianism), duty (deontology), or character (virtue ethics)?'
  },
  {
    title: 'Logic and Consistency',
    summary: 'Conflicting values cloud your path. Let’s bring clarity.',
    details: 'Contradictory values can paralyze action. Consistency allows you to act with confidence. Know your system. Make it logical.'
  },
];

function HomePage() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="bg-neutral-950 text-neutral-100 font-sans relative overflow-hidden">
      {/* Flowing Blob Background */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-500 to-blue-600 rounded-full blur-[120px] opacity-25 animate-pulse z-0" />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center px-4 relative z-10">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Uncover What Truly Matters</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-neutral-300">Define your core values. Align your life with what’s meaningful. Begin a journey to discover the compass within.</p>
          <a href="#foundation" className="mt-10 inline-block bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold hover:bg-neutral-100 transition">Start the Journey 🚀</a>
        </div>
      </section>

      {/* Philosophical Foundation */}
      <section id="foundation" className="py-20 px-6 bg-neutral-950 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-orange-400">Your Philosophical Foundation</h2>
          <div className="grid md:grid-cols-2 gap-10 text-left">
            {foundations.map((item, index) => (
              <div
                key={index}
                onClick={() => setModalContent(item)}
                className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800 hover:border-orange-400 cursor-pointer transition duration-200 shadow-md hover:shadow-orange-600/20"
              >
                <h3 className="text-2xl font-semibold text-orange-300 mb-2">{item.title}</h3>
                <p className="text-neutral-400">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-8 rounded-2xl max-w-md shadow-xl text-left relative border border-orange-400">
            <button onClick={() => setModalContent(null)} className="absolute top-3 right-3 text-neutral-500 hover:text-orange-300">✕</button>
            <h3 className="text-3xl font-bold text-orange-300 mb-4">{modalContent.title}</h3>
            <p className="text-neutral-200">{modalContent.details}</p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Are You Ready to Discover Your TrueNorth?</h2>
        <p className="mb-10 max-w-xl mx-auto text-lg text-neutral-200">This journey begins with a single decision—to know yourself better. Join us and build your personal value system.</p>
        <Link to="/signup" className="inline-block bg-orange-500 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition">
          Start My Values Journey →
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
