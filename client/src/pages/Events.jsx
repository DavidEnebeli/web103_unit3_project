import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events')
                const data = await response.json()

                setEvents(data)
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }

        fetchEvents()
    }, [])

    return (
        <div className="events-page">
            <div className="events-heading">
                <h1>Chicago Events</h1>
                <p>Discover upcoming events happening across Chicago.</p>
            </div>

            <div className="events-container">
                {events.length > 0 ? (
                    events.map((event) => (
                        <Event
                            key={event.id}
                            event={event}
                        />
                    ))
                ) : (
                    <p>Loading events...</p>
                )}
            </div>
        </div>
    )
}

export default Events