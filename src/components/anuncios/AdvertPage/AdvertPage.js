import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout"
import { deleteAdvert, getAdverts } from "../service";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './AdvertPage.css'



function AdvertPage({ history, ...props }) {
    const [product, setProduct] = useState();
    const advertId = useParams(history).id;
    console.log(product)

    useEffect(() => {
        async function getAd() {
      try {
        const ad = await getAdverts(advertId);
        setProduct(ad);
      } catch (error) {
        if (error.status === 404){
          history.replace('/404')
        }else if(error.status === 401){
          history.replace('/login')
        }
        console.error(error.message);
      }
    }
    getAd();
    }, [advertId, history]);
    
     const handleDelete = () => {
    if (window.confirm('¿seguro que desea eliminar el producto?')){
      deleteAdvert(advertId).then(() => history.push('/'))
    }
  }


    return product ? (
        <Layout idPage="advert-page">
            <div className="container">


            <div className="images">
                <img src={`${process.env.REACT_APP_API_BASE_URL}${product.photo}`} alt={product.productName} />
            </div>
            <div className="product">
            <h1>{product.name}</h1>
            <h2>{product.price}€</h2>
            <h2>{product.tags}</h2>
                <h3>{product.sale ? (<p>"En venta"
                    </p>) : (<p>"Compra"</p>)}</h3>
                    <div className="buttons">

      <button  className="add" onClick={handleDelete}>
                Eliminar
    </button>
                    </div>
            </div>
            <div>

            </div>
                
            </div>
      
    </Layout>
  ) : (
            <Layout>Producto no encontrado <br />
                Asegurese de que el producto seleccionado es correcto
    </Layout>
  );
}

export default AdvertPage;

   

