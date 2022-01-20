import T from 'prop-types';
import { useState } from "react";
import {login} from '../service'
import { AuthContextConsumer } from "../context";
import 'bootstrap/dist/css/bootstrap.css'



function LoginPage({onLogin, history, location}) {
    const [value, setValue] = useState({ email: "", password: "" })
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [saveValue, setSaveValue] = useState(false)

    const resetError = () => setError(null)

    const handleChange = event => {
        setValue(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }
    const guardarToken = () => {
        setSaveValue((prevState) => (prevState ? false : true));
    };
    
    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        resetError();
        try {
            await login(value, saveValue)
            setIsLoading(false)
            onLogin();
            const{from} = location.state || {from: {pathname : '/'}} 
            history.replace(from)
        } catch (error) {
            setError(error);
            setIsLoading(false)
        } 

    };



   
    return <div className='row'>
        <div className="col-md-4 offset-md-4">
            <div className='login-form bg-light mt-4 p-4'>

        <form  onSubmit={handleSubmit} className='row g-3'>
            <h4>Sing In Please</h4>
            <div className='col-12'>
            <input className='form-control' type="email" label="email" name="email"
            placeholder="E-mail"            onChange={handleChange} value={value.email} />
            </div >
            <div className='col-12'>
             <input className='form-control' type="password" name="password" value={value.password}
                placeholder='Password' onChange={handleChange} />
            </div>
                    <div className='col-12'>
                        <div className='form-check'>
               
                            <input className="form-check-input"
                                type="checkbox"
                                value={saveValue}
                                onChange={guardarToken}
                            />
                    <label className='form-check-label'>Remember me</label>

                        </div>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit" variant="primary" disabled={isLoading || !value.email || !value.password}>
                Login
            </button>

        </form>
        {error && <div onClick={resetError} className="loginPage-error"> {error.message}</div>}

            </div>
                </div>
            </div>
  



 
};


LoginPage.propTypes = {
    onLogin: T.func.isRequired,
}


const ConnectedLoginPage = props => (
    <AuthContextConsumer>
        {auth => <LoginPage onLogin={auth.handleLogin} {...props} />}
    </AuthContextConsumer>
);

export default ConnectedLoginPage;