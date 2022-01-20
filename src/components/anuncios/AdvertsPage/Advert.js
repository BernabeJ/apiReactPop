import React from 'react';
import T from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


const Advert = ({ name, createdAt, sale, price, tags, photo }) => {
  return (
    <article className="advert bordered">
      <div className="right">
        <div className='linea'></div>
        <br></br>
              <div className="adver-header">
                <span className="advert-name">Name: {`${name}` }</span><br></br>
                  <span className='advert-sale'>Price: {`${price}`} €</span><br></br>
                 <span className='advert-sale'>Estado: {sale ? ("En venta"
                    ) : ("Compra")}</span><br></br>
                  <span className='advert-sale'>Tags: {`${tags}`}</span><br></br>

          <span className="advert-separator">Adverts created · </span>
          <time dateTime={createdAt}>
            {formatDistanceToNow(new Date(createdAt))}
          </time>
        </div>
      </div>
    </article>
  );
};


Advert.defaultProps = {
  content: 'Nothing here!',
};

export default Advert;
