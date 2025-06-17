import React, { useState } from 'react';

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
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-indigo-600 to-blue-400 text-white px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Uncover What Truly Matters</h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto">Define your core values. Align your life with what’s meaningful. Begin a journey to discover the compass within.</p>
          <a href="#foundation" className="mt-8 inline-block bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition">Start the Journey</a>
        </div>
      </section>

      {/* Philosophical Foundation */}
      <section id="foundation" className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Your Philosophical Foundation</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {foundations.map((item, index) => (
              <div
                key={index}
                onClick={() => setModalContent(item)}
                className="bg-gray-100 p-6 rounded-xl shadow transform transition-transform hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md shadow-xl text-left relative">
            <button onClick={() => setModalContent(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
            <h3 className="text-2xl font-bold mb-4">{modalContent.title}</h3>
            <p>{modalContent.details}</p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-indigo-700 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Are You Ready to Discover Your TrueNorth?</h2>
        <p className="mb-8 max-w-xl mx-auto text-lg">This journey begins with a single decision—to know yourself better. Join us and build your personal value system.</p>
        <a href="/signup" className="inline-block bg-white text-indigo-700 px-8 py-4 rounded-full font-bold shadow hover:bg-gray-100 transition">Start My Values Journey</a>
      </section>
    </div>
  );
}

export default HomePage;
