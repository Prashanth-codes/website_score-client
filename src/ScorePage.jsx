import React, { useState } from 'react';
import axios from 'axios';

const ScorePage = () => {
    const [url, setUrl] = useState('');
    const [scores, setScores] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAnalyze = async () => {
      if(!url) {
        setError('URL is required.');
        return;
      }
      try {
        new URL(url);
      } catch {
        setError('Invalid URL format.');
        return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/get-url', { url });
            setScores(response.data);
            setUrl('')
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching scores.');
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="grid bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Website Performance Analysis</h2>
                <p className="text-center text-gray-600 mb-6">
                    Enter the URL of your website below to analyze its performance. Get insights into performance,
                    accessibility, and SEO to identify areas for improvement.
                </p>
                <div className="grid space-y-4">
                    <div className='grid'>
                        <label htmlFor="url" className="block text-gray-700 font-medium mb-2">Website URL:</label>
                        <input
                            id="url"
                            type="url"
                            placeholder="https://example.com"
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center text-center'>
                    <button
                        onClick={handleAnalyze}
                        className={`w-1/2 py-2 text-white font-semibold rounded-lg shadow-md ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Analyze'}
                    </button>
                    </div>
                    {error && <p className="text-center text-red-500 text-sm">{error}</p>}
                </div>
                {scores && (
                    <div className="grid mt-6">
                        <h3 className="text-lg font-bold text-gray-800">Analysis Results</h3>
                        <div className="grid mt-4">
                            {Object.keys(scores).map((category) => (
                                <div key={category} className="p-4 bg-gray-100 rounded-lg shadow">
                                    <h4 className="text-md font-semibold text-gray-700 capitalize">{category}</h4>
                                    <p className="ml-1 text-blue-600 font-bold">Score: {(scores[category].score * 100).toFixed(2)}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScorePage;
