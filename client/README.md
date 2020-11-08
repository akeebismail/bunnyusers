# BunnyStudio todo tasks
Clone the project to a particular directory
You  need to have a working  ^node on your machine.
Mongo db must be installed on your system or use a cloud db visit https://mongodb.com to create one 
RabbitMq is used for messaging queue you can either install one your system or visit https://www.cloudamqp.com/ to get one 


## User service

#### User service installation
In the project directory
Run

`$ cd users`

In the user directory run

`$ cp .env.example .env`

Edit the `.env` file, and insert the following values:

```
MONGO_URL
AMQ
```
Run the following commands in the users directory to install the api

`$ npm install`

`$ npm run dev`

visit http://localhost:5000 to consume the api

## Task service

#### Task service installation

In the project directory
Run

`$ cd tasks`

In the tasks directory

`$ cp .env.example .env`

Edit the `.env` file, and insert the following values:

```
MONGO_URL
AMQ
```
Run the following commands in the tasks directory to install the api

`$ npm install`

`$ npm run dev`

visit http://localhost:5001 to consume the api

## todo UI

#### todo UI Installation
In the project directory
Run

`$ cd client`


In the client directory run

Run the following commands in the client directory to install the UI 

`$ npm install`

`$ npm run start`

visit http://localhost:3000 to view the UI

# docker installation
make sure you have docker installed on your local machine
clone the project to a directory
`$ git clone https://github.com/akeebismail/bunnyusers.git`


# test
In the project directory run
`$ npm run test`

# docs

Visit https://documenter.getpostman.com/view/2986365/TVeiEBTm  for the api documentation

thanks
