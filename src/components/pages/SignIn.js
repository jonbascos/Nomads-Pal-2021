import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {signin} from '../../static/scripts/firebase'


// Styling
import '../../styles/SignIn.css'

export default function SignIn() {

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => {
        const {name, value} = e.target
        setLogin({
            ...login,
            [name]: value
        })
    }

    const handleSignin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = await signin(login.email, login.password)
            setLoading(false)
            if(res.user.email === process.env.REACT_APP_FIREBASE_EMAIL_CHECK) {
                navigate('/newlocation')
            } else {
                navigate('/')
            }
            
        } catch (err){
            console.log(err.message)
            setError(err.message)
            setLogin({
                email: '',
                password: ''
            })
            navigate('/login')
        }
    }
    
    return (
        <div className='sign-in-form-container'>
            <form className="sign-in-form" onSubmit={handleSignin}>
                {error && <div>{error}</div>}
                <h1>Login</h1>
                <label>
                    <span>Email: </span>
                    <br />
                    <input type="text" name='email' onChange={handleChange} value={login.email}/>
                </label>
                <label>
                    <span>Password: </span>
                    <br />
                    <input type="password" name='password' onChange={handleChange} value={login.password} />
                </label>
                <button disabled={loading}>Log In</button>
                <span className='have-an-account'>Don't have an account?  <Link to='/signup'>Sign Up</Link> here.</span>
            </form>
        </div>
    )
}
