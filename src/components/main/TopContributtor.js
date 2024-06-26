import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon';
import './TopContributor.css';

export default function TopContributor() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/top-contributors');
        const data = await response.json();
        setContributors(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data from API when component mounts
  }, []);

  return (
    <div>
      <h3 className='text-3xl text-white font-bold tracking-tight mb-6'>Top Contributors</h3>
      <div className='grid grid-cols-3 items-center justify-center gap-x-6 gap-y-4 mb-6 transition-all'>
        {contributors.map((item, index) => (
          <div key={index} className='flex items-center gap-x-4 bg-dortbox group relative hover:bg-dortboxact rounded'>
            <img className='w-20 h-20' src={`http://localhost:8080/api/users/${item.id}/image`} alt={item.nom} />
            <h4 className='text-16px font-bold p-4'>{item.nom}</h4>
            <h4 className='text-16px font-bold p-4'>Number of Songs: {item.nbrSongs}</h4>
           
          </div>
        ))}
      </div>
    </div>
  );
}
