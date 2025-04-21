import { useState } from 'react';
import Card from '../Common/Card';
import { BASE_URL } from '../../utils/config';

const SmartSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/search/smart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.message || 'Search failed.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mx- 10 md: mx-20 lg:mx-36 xl:mx-[280px]">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
          AI <span className="text-main">Search</span>
        </h1>
        <p className="text-xs text-center pt-3 pb-3 px-8 md:px-48 lg:px-56 xl:px-72 2xl:px-80">
          Search in human language.
        </p>
        <div className='flex flex-col justify-start items-center'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. affordable beach tours in Asia this summer"
            className="border p-2 w-60 sm:w-96 mb-4"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-main text-white px-4 py-2 rounded mb-6 disabled:opacity-50 w-24 md:w-32"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {results.map((tour) => (
            <Card
              key={tour._id}
              cid={tour._id}
              img={tour.imgUrl}
              ccity={tour.city}
              crating={tour.rating}
              cdesc={tour.desc}
              cprice={tour.price}
              cfeatured={tour.featured}
              cdate={new Date(tour.date).toLocaleDateString()}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SmartSearch;
