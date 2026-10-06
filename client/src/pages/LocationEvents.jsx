import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Event from '../components/Event'
import '../css/LocationEvents.css'

const LocationEvents = () => {
    const { locationId } = useParams()
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`/api/events/location/${locationId}`)
                const data = await response.json()
    
                setEvents(data)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }

        const fetchLocation = async () => {
            try {
                const response = await fetch('/api/locations')
                const data = await response.json()
        
                const currentLocation = data.find(
                    location => location.id === Number(locationId)
                )
        
                setLocation(currentLocation)
            } catch (error) {
                console.error('Error fetching location:', error)
            }
        }

        fetchLocation()
        fetchEvents()
    }, [locationId])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
            {events.length > 0 ? (
    events.map((event) => (
        <Event
            key={event.id}
            event={event}
        />
    ))
) : (
    <h2>No events found for this location.</h2>
)}
            </main>
        </div>
    )
}

export default LocationEvents