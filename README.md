# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store. It exposes a RESTful API that will be used by the frontend developer on the frontend. 

The database schema and and API route information can be found in the [REQUIRMENTS.md](REQUIRMENTS.md) 

## Installation Instructions
You can fork this repo and run the following command at the root directory to install all packages.

`npm install`

## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER client WITH PASSWORD '123456';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront TO client;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO client;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database 

`db-migrate up`

## Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you. 

**NB:** The given values are used in developement and testing. 
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=client
POSTGRES_PASSWORD=123456

BCRYPT_PASSWORD=test123
SALT_ROUNDS=10
PEPPER=test123
TOKEN_SECRET=test123 
ENV=dev 
```

## Start App
`npm run watch`

### Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access
All endpoints are described in the [REQUIRMENTS.md](REQUIRMENTS.md) file. 

## Token and Authentication
To create the first user in the system, you should pass this token `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhZGhhbSIsImxhc3RuYW1lIjoiYWhtZWQiLCJwYXNzd29yZCI6IiQyYiQxMCRrZzFGNjZkSWpyNVcwYWlNQjh2TVQuaDlReFBvZldNakY5MnUvOE1QdFd0VDlsUEhieUJqUyJ9LCJpYXQiOjE2NDkxODkzMDJ9.e-W58nwHitciSl1UvM8JWEe2teqvX3rZhQU_LrQB8GA` in Authorization header.

Tokens are passed along with the http header as 
```
Authorization   Bearer <token>
```

## Testing
Run test with 

`npm run test`

It sets the environment to `test`, migrates up tables for the test database, run the test then migrate down all the tables for the test database. 


## Important Notes 

### Environment Variables
Environment variables are set in the `.env` file and added in `.gitignore` so that it won't be added to github. However, I had provided the names of the variables that need to be set above. I also provided the values that were used in development and testing. 


### Changing Enviroment to testing 
I had set up two databases, one for development and the other for testing. During testing, I had to make sure the testing database is used instead of the developement database. 

To acheive this, I set up a variable in the `.env` file which is by default set to `dev`. During testing, the command `npm run test` will set this variable to `test` in the package.json. Here is the complete command.
`set ENV=test&& db-migrate --env test up && npm run build && npm run jasmine && db-migrate --env test reset`

