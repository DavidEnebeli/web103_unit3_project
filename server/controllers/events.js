import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const results = await pool.query(
            'SELECT * FROM events ORDER BY date ASC'
        )

        res.status(200).json(results.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Unable to get events' })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const { locationId } = req.params

        const results = await pool.query(
            'SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC',
            [locationId]
        )

        res.status(200).json(results.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Unable to get events for location' })
    }
}

export default {
    getEvents,
    getEventsByLocation
}