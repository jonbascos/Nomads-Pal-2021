import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {signup} from '../../static/scripts/firebase'
import {getAuth, updateProfile} from 'firebase/auth'

// Styling
import '../../styles/SignUp.css'

export default function SignIn() {

    const [login, setLogin] = useState({
        email: '',
        password1: '',
        password2: '',
        displayName: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = getAuth()

    const navigate = useNavigate()

    const handleChange = e => {
        const {name, value} = e.target
        setLogin({
            ...login,
            [name]: value
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault()
        
        setError('')
        setLoading(true)
        if(login.password1 !== login.password2) {
            return setError('Passwords do not match')
        }

        try {
            const res = await signup(login.email, login.password1)
            console.log('User: ', res.user)

            if(!res){
                throw new Error('Could not complete signup')
            }

            await updateProfile(auth.currentUser, {displayName: login.displayName})
            navigate('/')
            
        } catch (err) {
            console.log(err.message)
            setError('Could not complete signup')
        }
        setLoading(false)
    }

    return (
        <div className='sign-up-form-container'>
            <form className="sign-up-form" onSubmit={handleSignup}>
                <h1>Sign Up</h1>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <label>
                    <br />
                    <input type="text" name='email' onChange={handleChange} value={login.email} placeholder='Email' />
                </label>
                <label>
                    <br />
                    <input type="password" name='password1' onChange={handleChange} value={login.password1} placeholder='password' />
                </label>
                <label>
                    <br />
                    <input type="password" name='password2' onChange={handleChange} value={login.password2} placeholder='Verify Password' />
                </label>
                <label>
                    <br />
                    <input type="text" name='displayName' onChange={handleChange} value={login.displayName} placeholder='Display Name' />
                </label>
                <button disabled={loading}>Sign Up</button>
                <span className='have-an-account'>Already have an account?  <Link to='/signin'>Sign In</Link> here.</span>
            </form>
        </div>
    )
}
