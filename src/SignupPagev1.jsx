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
      console.log('Airtable key:', import.meta.env.VITE_AIRTABLE_KEY);
      await fetch('https://api.airtable.com/v0/appcB5OrRVIkPirkU/tblt7rJbOt4b6eoTJ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer patJZ78Lyvz8Ybcsz.1115be2d9b88209c6f613542de96a21c1a8766651fa32cb7ea5d3df1e1339138',
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

      // Redirect after successful submission
      localStorage.setItem('userEmail', form.email);
      navigate('/journey');
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was a problem submitting your info.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700">Start Your Journey</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="intention" className="block text-sm font-medium">Why are you here?</label>
          <textarea
            name="intention"
            value={form.intention}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? 'Submitting...' : 'Join the Journey'}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
