import React from 'react'
import '../css/Event.css'

const Event = ({ event }) => {
    const eventDate = new Date(event.date)

    return (
        <article className='event-information'>
            <img src={event.image} alt={event.name} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.name}</h3>

                    <p>
                        {eventDate.toLocaleDateString()} at{' '}
                        {eventDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>

                    <p>{event.description}</p>
                </div>
            </div>
        </article>
    )
}

export default Event