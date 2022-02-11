
import {useState} from 'react'
import axios from 'axios'

const LoginForm = () => {
    const [username, setUsername ] = useState('')
    const [password, setPassword ] = useState('')
    const [ error, setError] = useState('')
    const handleSubmit = async (event) => {
        event.preventDefault()
        const authObject = {'Project-ID' :"4d3be055-371d-4ac5-9adf-8c260526d784",
     'User-Name' : username, 'User-Secret': password}

     try{
        //username and password => chatengine => give messages
        await axios.get('https://api.chatengine.io/chats', {
            headers: authObject
        }) 
       //works out = logginIn
       localStorage.setItem('username', username)
       localStorage.setItem('password', password)

       window.location.reload()
    } catch(error){
        //error = try another username and password
        setError('Oops! incorrect credentials.')
    }
    }

  
    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='input'
                    placeholder='username'
                    required/>
                    <input type="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='input'
                    placeholder='password'
                    required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting!</span>
                        </button>
                    </div>

                    <h2 className="error">
                        {error}
                    </h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm