# React.js/Express.js Bike Rental App

## Local Installation
1. Install <a href="https://nodejs.org" target="_blank">Node.js</a>.
2. Install <a target="_blank" href="https://www.postgresql.org/">PostgreSQL</a>.
3. `git clone https://github.com/Tsukuruu/bike-rental-app.git`.
4. Install all dependencies for client and server using `npm install`.
5. Create `.env` files both for client and server and set up enviroment variables.

## How to Launch
To launch app we need to compile the **latest** client js and place it to `server` folder. This allows the main app server(Express) to also show the final app.

1. Generate latest React app in `client` folder run `npm run build` and copy all files from `client/build` to `server/views`.
2. In terminal go to the `server` folder and run `npm run dev`. It will be running both the server and the client.
3. Open browser and go to : `localhost:ENV_SPECIFIED_PORT`.
