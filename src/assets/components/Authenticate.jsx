import { useState } from "react";

const Authenticate = ({token}) => {
    const [error,setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [data, setData] =useState(null);

    async function handleClick (){
        // console.log("authenticate handle click works");
        setSuccess(null);
        setData(null);
        setError(null);

        if (!token) {
            setError("No token: Authentication failed!");
            return;
        }

        try {
            const response = await fetch ("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {"Content-Type":"application/json","Authorization":`Bearer ${token}`},
            })
            const result = await response.json();
            // console.log(result);            
            setSuccess(result.message);    
            setData(result.data); 
        } catch (error) {
            setError(error.message, "There was an error, please try again!");
        }
    }

    return ( 
        <div className="auth-container">
            <h2>Authentication</h2>
            {error && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}
            {data && <p>Welcome {data.username} </p>}

            <button onClick={handleClick}>Authenticate Token!</button>
        </div>
    );
}
 
export default Authenticate;

