import { useState } from 'react';
import { get } from '../Services/ApiBase'
import axios from 'axios';




const Main = () => {

    const [inputValue, setInputValue] = useState({
        data: 0,
    });

    const [resultValue, setResultValue] = useState({
        data: 0,
    });

    const [loaderValue, setLoaderValue] = useState({
        data: false,
    });

    const [errorValue, setErrorValue] = useState({
        error: false,
        data: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorValue({ data: '', error: false });
        setLoaderValue({ data: true });
        try {
            const apiData = await get(`https://prime-checker-backend.herokuapp.com/api/v1/prime/${inputValue.data}`);
            const resData = apiData.data.data.nearestPrime;
            setResultValue({ data: resData });
            setLoaderValue({ data: false });
        }
        catch (e) {
            if (e.response) {
                setLoaderValue({ data: false });
                setErrorValue({ data: e.response.data.message, error: true });

            }

        }
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setInputValue({ data: value });
    }

    const handleKeyPress = (e) => {
        const validateStrings = /[0-9+]/i;
        if (!validateStrings.test(e.key)) {
            e.preventDefault();
        }
    }

    return (
        <div>
            <div className="grid-container">
                <div className="grid">
                    <div className="main-form">
                        <form onSubmit={handleSubmit}>
                            <p >Example: an input of 55 would return 53</p>
                            <input disabled={loaderValue.data} onKeyPress={handleKeyPress} type="text" placeholder="enter a number" onChange={handleChange} className="txt-digits" id="digits" value={inputValue.data} />
                            <button disabled={loaderValue.data} type="submit" className="btn-check" id="btn-checker">Enter</button>
                            <p id="error_message"></p>
                        </form>

                    </div>
                </div>

                {loaderValue.data ? <b> Loading...</b> : <div >
                    <b> Result :</b>
                    {errorValue.error ? <p id="result">{errorValue.data}</p> : <p id="result">The answer is {resultValue.data}</p>}
                </div>}
            </div>
        </div >
    )
}

export default Main
