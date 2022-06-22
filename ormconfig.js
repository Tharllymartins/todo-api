console.log(process.env.DATABASE_URL)
module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": false,
    "entities": [
       "src/models/**/*.ts"
    ],
    "migrations": [
       "src/database/migrations/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/database/migrations"
    }
 }