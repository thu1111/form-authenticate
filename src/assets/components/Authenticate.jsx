import { useState } from "react";

const Authenticate = ({token}) => {
    const [successMsg, setSuccessMsg] = useState(null);
    const [data, setData] =useState(null);
    const [error,setError] = useState(null);
    // console.log(successMsg);    
    // console.log(data);
    // console.log(error);  

    async function handleClick (){
        // console.log("authenticate handle click works");
        setSuccessMsg(null);
        setData(null);
        setError(null);

        if (!token) {
            setError("No token: Authentication failed!");
            return;
        }

        try {
            const response = await fetch ("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {"Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`},
            })
            const result = await response.json();
            setSuccessMsg(result.message);    
            setData(result.data); 
            
        } catch (error) {
            setError(error.message, "There was an error, please try again!");
        }
    }
    
    return ( 
        <div className="auth-container">
            <h2>Authentication</h2>
            
            {successMsg && <p className="auth-success-msg">{successMsg}</p>}
                                        
            {data && <p>Welcome {data.username} </p>}
            
            {error && <p className="error-msg">{error}</p>}

            <button onClick={handleClick}>Authenticate Token!</button>
        </div>
    );
}
 
export default Authenticate;