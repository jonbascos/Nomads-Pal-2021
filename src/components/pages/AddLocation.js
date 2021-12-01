import React, {useState} from 'react'
import {addDoc, collection} from 'firebase/firestore'
import db from '../../static/scripts/firebase'

// Styles
import '../../styles/AddLocation.css'

export default function AddLocation() {

    const [locationName, setLocationName] = useState('')
    const [locationAddress, setLocationAddress] = useState('')
    const [locationCity, setLocationCity] = useState('')
    const [locationState, setLocationState] = useState('')
    const [locationZipcode, setLocationZipcode] = useState('')
    const [locationDownload, setLocationDownload] = useState('')
    const [locationUpload, setLocationUpload] = useState('')
    

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name ==='setLocationName') {
            setLocationName(value)
        } else if(name ==='setLocationAddress') {
            setLocationAddress(value)
        } else if(name ==='setLocationCity') {
            setLocationCity(value)
        } else if(name === 'setLocationState') {
            setLocationState(value)
        } else if(name === 'setLocationZipcode') {
            setLocationZipcode(value)
        }
        else if(name === 'setLocationDownload') {
            setLocationDownload(parseInt(value))
        } else if (name === 'setLocationUpload') {
            setLocationUpload(parseInt(value))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = {
            name: locationName,
            address: locationAddress,
            city: locationCity,
            state: locationState,
            zipcode: locationZipcode,
            download: locationDownload,
            upload: locationUpload
        }

        try {
            // Add location to firebase
        const collectionRef = collection(db, 'Locations')
        await addDoc(collectionRef, result)

        alert('Location added')
        } catch (error) {
            alert(error.message)
        }
       
        // Reset form
        setLocationName('')
        setLocationAddress('')
        setLocationCity('')
        setLocationState('')
        setLocationZipcode('')
        setLocationDownload('')
        setLocationUpload('')
    }

    return (
        <div className='add-location-container'>
            <h1>Add New Location</h1>
            <div className="new-location-form-container">
                <form className='new-location-form' onSubmit={handleSubmit}>
                    <label className='location-field'>
                        <input type="text" placeholder='Name of the Location' onChange={handleChange} value={locationName} name='setLocationName'/>
                    </label>
                    <label className='location-field'>
                        <input type="text" placeholder='Address' onChange={handleChange} value={locationAddress} name='setLocationAddress'/>
                    </label>
                    <label className='location-field'>
                        <input type="text" placeholder='City' onChange={handleChange} value={locationCity}name='setLocationCity'/>
                    </label>
                    <label className='location-field'>
                        <input type="text" placeholder='State' onChange={handleChange} value={locationState} name='setLocationState' />
                    </label>
                    <label className='location-field'>
                        <input type="text" placeholder='Zipcode' onChange={handleChange} value={locationZipcode}name='setLocationZipcode'/>
                    </label>
                    <label className='location-field'>
                        <input type="text" placeholder='Download Speed in Mbps' onChange={handleChange} value={locationDownload} name='setLocationDownload' />
                    </label>
                    <label className='location-field'>
                        <input type="text" placeholder='Upload Speed in Mbps' onChange={handleChange} value={locationUpload} name='setLocationUpload' />
                    </label>
                    <button id='location-submit-button'>Submit</button>
                </form>
            </div> 
        </div>
    )
}
