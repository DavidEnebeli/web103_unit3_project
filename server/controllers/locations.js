import { pool } from '../config/database.js'

const getLocations = async (req, res) => {
    try {
        const results = await pool.query(
            'SELECT * FROM locations ORDER BY id ASC'
        )

        res.status(200).json(results.rows)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Unable to get locations' })
    }
}

export default {
    getLocations
}