import { useState } from "react";

const SignUpForm = ({setToken}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState(null);
    const [signupMsg, setSignupMsg] = useState(null);

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch ("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({username, password}),
            })
            const result = await response.json();
            // console.log(result); 
            setToken(result.token);
            setSignupMsg(result.message);
        } catch (error) {
            setError(error.message);            
        }

        setUsername("");
        setPassword("");
    }

    return ( 
    <div className="signup-container">
        <h2>Sign up</h2>
        {error && <p className="error-msg">{error}</p>}
        {signupMsg && <p className="signup-msg">{signupMsg}</p>}

        <form  onSubmit={handleSubmit}>
            <label>
                User name:
                <input value={username} onChange={(e)=>{setUsername(e.target.value)}}
                        pattern="[A-Za-z0-9]{8,12}" 
                        placeholder="8-12 Alphanumeric characters" 
                        onInvalid={(e) => e.target.setCustomValidity("Enter 8-12 Alphanumeric Characters")} 
                        onInput={(e) => e.target.setCustomValidity("")}
                        onFocus={() => setSignupMsg(null)}
                        required/>
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}
                        minLength={8} maxLength={10} 
                        placeholder="Minimum 8 characters" 
                        onInvalid={(e) => e.target.setCustomValidity("Enter 8-10 Characters")}
                        onInput={(e) => e.target.setCustomValidity("")}
                        required/>
            </label>

            <button type="submit">Submit</button>
        </form>
    </div>
    );
}
 
export default SignUpForm;

