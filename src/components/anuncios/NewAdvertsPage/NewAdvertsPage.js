import {  useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import Layout from '../../layout';
import { createAdvert } from '../service';
import React from 'react';
import { getAdvertsTags } from '../service'
import 'bootstrap/dist/css/bootstrap.css'
import './NewAdvertsPage.css'






function NewAdvertPage({history, ...props}) {
        
    const [value, setValue] = useState({
      name: '', price: '', sale: false, tags: [], photo: ""
    });
    const [createdAdvertId, setCreatedAdvertId] = useState();
    const [error, setError] = useState(null);
    const [options, setOptions] = React.useState([]);
    
   
console.log(options)
    
    React.useEffect(() => {
        getAdvertsTags().then(setOptions);
	}, []);
    
  const handleChange = event => {
    setValue(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };
  

  const handleInput = (event) => {
    const valid = event.target.validity.valid;
    !valid ? (event.target.className = "error") : (event.target.className = "");
    const changedInput = event.target.name;
    const inputValue = event.target.value;
    let formmatedInputValue = "";
    //parse true or false into boolean
    if (inputValue === "true") {
      formmatedInputValue = true;
    } else if (inputValue === "false") {
      formmatedInputValue = false;
    } else {
      formmatedInputValue = inputValue;
    }
    setValue({ ...value, [changedInput]: formmatedInputValue });
  };


  //pendiente de revision

   const handleMultiSelect = (event) => {
    const valid = event.target.validity.valid;
    !valid ? (event.target.className = "error") : (event.target.className = "");
    let multiselect = [...value.tags];
    const changedInput = event.target.name;
    const inputValue = event.target.value;
    if (multiselect.indexOf(inputValue) < 0) {
      multiselect.push(inputValue);
    } else {
      multiselect = multiselect.filter((e) => e !== inputValue);
    }
    setValue({ ...value, [changedInput]: multiselect });
   };
  
    

  const uploadFiles = (event) => {
    setValue({...value, photo: event.target.files[0]});
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try {
          const createdAdvert = await createAdvert( value);
          setCreatedAdvertId(createdAdvert.id);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        return history.push('/login');
      }
      setError(error());
    }
  };
  
  if (createdAdvertId) {
      return <Redirect to={`/adverts/${createdAdvertId}`} />;
    }
    
    return (
        <Layout title="What are you thinking">
      <div className="newTweetPage bordered">
        <div className="rigth">
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                  <input type="text" label="name" name="name" onChange={handleChange} value={value.name}  placeholder='Nombre del articulo' className='form-control'/>
              </div>
              
              <div className='row justify-content-center align-items-center h-100 '>
               <p>Desea Comprar o Vender</p>
                <select
                  className= "form-select "
                  name='sale' onChange={handleInput}
                  value={value.sale}>
                <option value="true">Venta</option>
                <option value="false">Compra</option>
                </select>




              </div>
              <br></br>
              <div className='mb-3'>
                      <input type="number" placeholder='Precio del Articulo' label="price" name='price' onChange={handleChange} value={value.price} className='form-control'></input>
              </div>

  
              
                   
              <div className='row justify-content-center align-items-center h-100'>
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                  <div className='form-group'>

              <label className="input-group-text" htmlFor="inputGroupSelect02">Tags</label>
                <select
                  className="form-select"
                  id="inputGroupSelect02"
            name="tags"
            onChange={handleMultiSelect}
            multiple={true}
            value={value.tags}
            required
                    >       
                    {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
                </select>

                  </div>


                </div>
          
              </div>
        


              <br></br>
           <div className="input-group mb-3">
          

                <input
                className='form-control'
                id="inputGroupFile01"
                name="photo"
                type="file"
                onChange={uploadFiles}
                accept=".jpeg, .png, .webp, .gif, .bmp"/>
                
              </div>
              <br /><br />
                    <button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                >
                Let's go!
              </button>
                  
                  </form>

                  
        </div>
        <div className="right">
         
        </div>
      </div>
    </Layout>
    );
  }
 


export default NewAdvertPage;