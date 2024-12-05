import { useState } from 'react'
import SignUpForm from './assets/components/SignUpForm'
import Authenticate from './assets/components/Authenticate'

function App() {
  const [token,setToken] = useState(null);
  // console.log(token);

  return (
    <div className='container'>
        <SignUpForm token={token} setToken={setToken}/>
        <Authenticate token={token}/>
    </div>
  )
}

export default App
