# mars-exploration

> API to explore planets using robots

## Technologies Used

- NodeJS
- TypeScript
- MongoDB
- Docker & Docker Compose

## Prerequisites

These packages are required:

- NodeJS
- npm

> if you want to run the project using containers, install:

- docker
- docker-compose

## Features

- Create planet
- Access planet with credentials
- Send robots to specific planet
- Obtain lost robots: TODO
- Obtain scanned surface of planet: TODO

## Settings

### Node version

- This project has be coded using v14.17. However, older versions should be work as well.

### Env Variables

Create a .env file in then root. You can copy .env.sample file.
Should follow the following structure:

```
API_IS_ENABLED=true
API_PORT=8080
JWT_SECRET=DN+TTHFzcznu!*
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=admin
MONGO_CONNECTION_HOST=db
MONGO_CONNECTION_PORT=27017
MONGO_CONNECTION_USERNAME=mars_exploration
MONGO_CONNECTION_PASSWORD=123456
MONGO_CONNECTION_DATABASE=mars_exploration
CRYPTO_SECRET_KEY=aPVG6sdMpNWjRTIqCc7rdxs01lwHyfr3
CRYPTO_ALGORITHM=aes-256-ctr
CRYPTO_BYTES=16
```

### Manual Deployment

Make sure to use the recommended version of nodejs and npm

```
nvm use
```

Install required packages

```
npm install
```

Set up and connect to MongoDB server by updating the database environment variables:

```

MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=
MONGO_CONNECTION_HOST=
MONGO_CONNECTION_PORT=
MONGO_CONNECTION_USERNAME=
MONGO_CONNECTION_PASSWORD=
MONGO_CONNECTION_DATABASE=
```

Run tests:

```
npm run test
npm run test:coverage
```

Run the server:

```
npm start
```

### Container Deployment

> For this method it is necesary that the docker daemon is up

```
npm run docker:start
```

### API Documentantion

TODO: using swagger
