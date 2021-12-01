import React from 'react'
import '../styles/Cards.css'

function CardItem({location, address, city, state, zipcode, download, upload}) {
    
    return (
        <div className='cards-item'>
            <h2 className='cards-item-location'>{location}</h2>
            <p className='cards-item-address'>
                {address}
                <br />
                {city}, {state} {zipcode}
            </p>
            <hr />
            <div className='card-location-info'>
                <h4 className='cards-item-speeds'>Download (Mbps): {download}</h4>
                <h4 className='cards-item-speeds'>Upload (Mbps): {upload}</h4>
            </div>
        </div>
    )
}
export default CardItem
