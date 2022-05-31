console.log(process.env.DATABASE_URL)
module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": false,
    "entities": [
       "dist/models/**/*.js"
    ],
    "migrations": [
       "dist/database/migrations/*.js"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/database/migrations"
    }
 }