import React, { useEffect, useState } from 'react';

function BreedInfo() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds', {
          headers: {
            'x-api-key': import.meta.env.VITE_CAT_API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch breed data');
        }
        const data = await response.json();
        setBreeds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Cat Breeds</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {breeds.map((breed) => (
          <div key={breed.id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', backgroundColor: '#fff' }}>
            <img
              src={breed.image?.url}
              alt={breed.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
            />
            <h2>{breed.name}</h2>
            <p><strong>Origin:</strong> {breed.origin}</p>
            <p><strong>Temperament:</strong> {breed.temperament}</p>
            <p>{breed.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BreedInfo;
