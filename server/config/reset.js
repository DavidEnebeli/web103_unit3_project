import { pool } from './database.js'

const resetDatabase = async () => {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS events;
            DROP TABLE IF EXISTS locations;
        `)

        await pool.query(`
            CREATE TABLE locations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                image VARCHAR(500)
            );
        `)

        await pool.query(`
            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                name VARCHAR(150) NOT NULL,
                description TEXT,
                date TIMESTAMP NOT NULL,
                image VARCHAR(500),
                location_id INTEGER NOT NULL,
                FOREIGN KEY (location_id) REFERENCES locations(id)
            );
        `)

        await pool.query(`
            INSERT INTO locations (name, description, image)
            VALUES
            (
                'Downtown Chicago',
                'Explore events, attractions, and entertainment in the heart of Chicago.',
                'https://images.unsplash.com/photo-1494522358652-f30e61a60313'
            ),
            (
                'Wrigleyville',
                'A lively neighborhood known for sports, restaurants, and nightlife.',
                'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5'
            ),
            (
                'West Loop',
                'A vibrant Chicago neighborhood filled with restaurants, art, and entertainment.',
                'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df'
            ),
            (
                'Hyde Park',
                'A historic South Side neighborhood known for culture, museums, and community events.',
                'https://images.unsplash.com/photo-1494526585095-c41746248156'
            );
        `)

        await pool.query(`
            INSERT INTO events (name, description, date, image, location_id)
            VALUES
            (
                'Chicago Riverwalk Festival',
                'An evening of food, music, and entertainment along the Chicago Riverwalk.',
                '2026-10-18 18:00:00',
                'https://images.unsplash.com/photo-1494522358652-f30e61a60313',
                1
            ),
            (
                'Downtown Art Night',
                'Explore local art, live performances, and creative exhibits in downtown Chicago.',
                '2026-11-07 17:30:00',
                'https://images.unsplash.com/photo-1549490349-8643362247b5',
                1
            ),
            (
                'Wrigleyville Game Day',
                'A community game day experience with food, music, and baseball fans.',
                '2026-10-24 14:00:00',
                'https://images.unsplash.com/photo-1508344928928-7165b67de128',
                2
            ),
            (
                'Wrigleyville Live Music Night',
                'Enjoy an evening of live music and entertainment in Wrigleyville.',
                '2026-11-14 19:00:00',
                'https://images.unsplash.com/photo-1501386761578-eac5c94b800a',
                2
            ),
            (
                'West Loop Food Festival',
                'Discover food from popular restaurants and local chefs in the West Loop.',
                '2026-10-31 12:00:00',
                'https://images.unsplash.com/photo-1555939594-58d7cb561ad1',
                3
            ),
            (
                'West Loop Art Walk',
                'Explore galleries, street art, and local artists throughout the neighborhood.',
                '2026-11-21 13:00:00',
                'https://images.unsplash.com/photo-1561214115-f2f134cc4912',
                3
            ),
            (
                'Hyde Park Culture Fest',
                'Celebrate music, history, food, and culture in the Hyde Park community.',
                '2026-10-25 13:00:00',
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
                4
            ),
            (
                'Hyde Park Museum Day',
                'Spend the afternoon exploring museums and educational activities in Hyde Park.',
                '2026-11-08 11:00:00',
                'https://images.unsplash.com/photo-1564399579883-451a5d44ec08',
                4
            );
        `)

        console.log('Database reset successfully!')

    } catch (error) {
        console.error('Error resetting database:', error)
    }
}

resetDatabase().finally(() => pool.end())