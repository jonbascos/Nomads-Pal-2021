import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useAuth, signout} from '../static/scripts/firebase'
import {getAuth} from 'firebase/auth'

// styles
import '../styles/Navbar.css'

function Navbar() {
    const currentUser = useAuth()
    const auth = getAuth()
    const navigate = useNavigate()
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)
     
    const handleClick = () => {
        setClick(!click)
    }

    const handleLogState = () => {
        if(currentUser) {
            signout(auth)
            closeMobileMenu()
            navigate('/')
        } else {
            closeMobileMenu()
            navigate('/signin')
        }
    }
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect( () => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    return (
        <nav className='navbar'>
            <div className="navbar-container">
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    <img className='logo' src="/images/logo-nobackground-200.png" alt="Nomads Pal Logo" />
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                            Contact
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <div className='logged-in-user'>Hello, {currentUser ? currentUser.displayName : 'Guest'}
                        <button className='login-button' onClick={handleLogState} >Log {currentUser ? 'Out' : 'In'}</button></div>                      
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
