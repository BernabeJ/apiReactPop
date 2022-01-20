import React from 'react';


import { Link } from 'react-router-dom';

function EmptyList({ advertsCount }) {
  return (
    <div>
      <p>No adverts here!</p>
      {advertsCount > 0 ? (
        'Refine your search'
      ) : (
        <Link to="/adverts/new">Create the first advert</Link>
      )}
    </div>
  );
}



export default EmptyList;
