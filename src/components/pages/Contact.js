import React, {useState, useRef} from 'react'
import emailjs from 'emailjs-com'

import '../../styles/Contact.css'

export default function Contact() {

    const form = useRef()

    const [message, setMessage] = useState({
        firstName: '',
        lastName: '',
        email: '',
        comment: ''
    })

    const [success, setSuccess] = useState(false)

    const handleChange = e => {
        const {value, name} = e.target
        setMessage({
            ...message,
            [name]: value
        })
    }

    const sendEmail = e => {
        setSuccess(false)
        e.preventDefault()

        emailjs.sendForm('service_it806eb', 'template_3p68b6k', form.current, 'user_azljNOHCfn7gcQoLxid8B')
          .then((result) => {
              console.log('result: ', result.text);
          }, (error) => {
              console.log(error.text);
          });  

        setMessage({
            firstName: '',
            lastName: '',
            email: '',
            comment: ''
        })
        setSuccess(true)
      };

    return (
        <div className='contact-form-container'>
            <h1>How to Contact Us</h1>
            {success && <p style={{color: 'red'}}>Message Sent</p>}
            <section className='contact-instructions-container'>
                You can either fill out the form below, or email us at:
                <br/>
                <a href='mailto:info@nomadspal.com' target="_blank" rel='noopener noreferrer'>info@nomadspal.com</a>
                <br/>
                <p className='instructions'>If you're wanting to submit a new location, please include the name of the location, the address (City, State, Zipcode), and the upload/download speeds.  They will be added shortly.</p>
                
            </section>
                
                <form className="contact-form" ref={form} onSubmit={sendEmail}>
                    <label>
                        <input type="text" name='firstName' placeholder='First Name' value={message.firstName} onChange={handleChange} />
                    </label>
                    <label>
                        <input type="text" name='lastName' placeholder='Last Name' value={message.lastName} onChange={handleChange} />
                    </label>
                    <label>
                        <input type="email" name='email' placeholder='Email Address' value={message.email} onChange={handleChange} />
                    </label>
                    <label>
                        <textarea name="comment" id="comments" cols="40" rows="10" placeholder='Comments, Suggestions, Questions, New Location(s)' value={message.comment} onChange={handleChange} />
                    </label>
                    <input className='form-submit-button' type="submit" onClick={sendEmail}/>
                </form>
        </div>
    )
}
