import {  getAllAdverts } from '../service';
import { useEffect, useState } from 'react';
import Layout from '../../layout';
import { Link } from 'react-router-dom';
import Advert from './Advert';
import AdvertFilter from './AdvertFilter';
import EmptyList from './EmptyList';


function AdvertsPage({ history, ...props }) {
  const [adverts, setAdverts] = useState([]);
  useEffect(() => {
    getAllAdverts().then((adverts) => setAdverts(adverts));
  }, []);
  
 
   
  return (
        <Layout title="What's going on..." {...props}>
      <AdvertFilter filterAds={ads => setAdverts(ads)} selectedAds={adverts}/>
      {adverts.length ? (
       
              <ul className="advertsList">
              {adverts.map(({ id, ...advert } ) => (
              <li key={id}>
                <Link to={`/adverts/${id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
        </ul>
      ) : (
        <EmptyList />
      )}
    </Layout>
  );
  
 
}


  

export default AdvertsPage;
