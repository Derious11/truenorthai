import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', intention: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await fetch('https://api.airtable.com/v0/appcB5OrRVIkPirkU/tblt7rJbOt4b6eoTJ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: form.name,
                Email: form.email,
                Intention: form.intention,
              },
            },
          ],
        }),
      });

      localStorage.setItem('userEmail', form.email);
      localStorage.setItem('userName', form.name);
      localStorage.setItem('userIntention', form.intention);
      alert('Thank you for signing up! Your journey begins now.');
      navigate('/journey');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was a problem submitting your info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 py-10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 animate-pulse opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500 via-neutral-900 to-blue-800"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-neutral-900 border border-neutral-800 p-10 rounded-2xl shadow-lg w-full max-w-lg md:max-w-md space-y-6 text-neutral-100"
      >
        <h2 className="text-3xl font-bold text-orange-400 text-center">Start Your Journey</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-orange-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-3 text-sm placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-orange-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-3 text-sm placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label htmlFor="intention" className="block text-sm font-medium text-orange-300 mb-1">Why are you here?</label>
          <textarea
            name="intention"
            value={form.intention}
            onChange={handleChange}
            rows={4}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-3 text-sm placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            placeholder="What do you want to discover about yourself?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600 transition"
        >
          {loading ? 'Submitting...' : 'Join the Journey →'}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
