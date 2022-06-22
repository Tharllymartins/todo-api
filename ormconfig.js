module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": false,
    "entities": [
       "src/models/**/*.js"
    ],
    "migrations": [
       "src/database/migrations/*.js"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/database/migrations"
    }
 }