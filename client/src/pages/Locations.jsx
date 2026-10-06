import React, { useState, useEffect } from 'react'


const Locations = () => {

    const [locations, setLocations] = useState([])
    
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch('/api/locations')
                const data = await response.json()
    
                setLocations(data)
            } catch (error) {
                console.error('Error fetching locations:', error)
            }
        }
    
        fetchLocations()
    }, [])

    return (
        <div className="locations-page">
            <h1>Explore Chicago</h1>
            <p>Discover events happening across Chicago's neighborhoods.</p>
    
            <div className="locations-container">
                {locations.map((location) => (
                    <div className="location-card" key={location.id}>
                        <img
                            src={location.image}
                            alt={location.name}
                        />
    
                        <h2>{location.name}</h2>
                        <p>{location.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Locations