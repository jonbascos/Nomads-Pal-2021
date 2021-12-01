import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { onSnapshot, collection } from 'firebase/firestore'
import CardItem from './CardItem'
import db from '../static/scripts/firebase'


// Styles
import '../styles/Cards.css'

function Cards() {
    const [locations, setLocations] = useState([])  
    const [specificCity, setSpecificCity] = useState('All Around Portland')
    const [specificLocations, setSpecificLocations] = useState([])
    const cities = []

    useEffect(() => 
        onSnapshot(collection(db, 'Locations'), snapshot => {
            setLocations(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        })
    , [])

    //Creates an array of the different cities
    const singleCities = locations.map(location => {
            if(!cities.includes(location.city)) {
                cities.push(location.city)   
        }
    })

    useEffect(() => singleCities, [singleCities])

    const listCities = cities.map(city => {
        return <option value={city}>{city}</option>
    })

    const handleChange = e => {
        setSpecificCity(e.target.value)
    }

    // Filter the cards by the city
    useEffect(() => {
        const result = locations.filter(location => location.city === specificCity)
        setSpecificLocations(result)
    }, [specificCity, locations])

    const singleCard = locations.map(location => {
        return(
            <div key={location.id}>
                <li>
                    <CardItem
                        location={location.name}
                        address={location.address}
                        city={location.city}
                        state={location.state}
                        zipcode={location.zipcode}
                        download={location.download}
                        upload={location.upload}
                    />
                </li>       
            </div>
                                  
        )
    })

    const specificCard = specificLocations.map(specificLocation => {
        return(
            <div key={specificLocation.id}>
                <li>
                    <CardItem
                        location={specificLocation.name}
                        address={specificLocation.address}
                        city={specificLocation.city}
                        state={specificLocation.state}
                        zipcode={specificLocation.zipcode}
                        download={specificLocation.download}
                        upload={specificLocation.upload}
                    />
                </li>     
            </div>
                            
        )
    })
   
       return (
            <div className='cards'>
                <h1>
                    Check Out These Locations:
                    <br />
                    <select className='city-drop-down' onChange={handleChange}>
                        <option selected value='All Around Portland'>All Around Portland</option>
                        {listCities}
                    </select>
                </h1>
                <div className="cards-container">
                    <div className="cards-wrapper">
                        <ul className="cards-location">
                            {specificCity === 'All Around Portland' ? <>{singleCard}</> : <>{specificCard}</>}
                        </ul>
                    </div>
                </div>
                <p className='add-location-container'>
                    <button><Link to='/contact'>Suggest a New Location</Link></button>
                </p>
            </div>
    )
}

export default Cards
