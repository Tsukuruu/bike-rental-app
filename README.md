# React.js/Express.js Bike Rental App

## Local Installation
1. Install <a href="https://nodejs.org" target="_blank">Node.js</a>.
2. Install <a target="_blank" href="https://www.postgresql.org/">PostgreSQL</a>.
3. `git clone https://github.com/Tsukuruu/bike-rental-app.git`.
4. Install all dependencies for client and server using `npm install`.
5. Create `.env` files both for client and server and set up enviroment variables.

### Development
*You need two terminal windows open, one for client and the other for server.*
1. In terminal 1 go to server folder from project root `cd server` and run `npm run dev`. This runs the app server (Express). 
2. In terminal 2 go to the `client` folder and run: `npm run start`. This runs the development server(webpack-dev-server).
3. Open browser and go to `localhost:3000` if app did not launch itself (*don not forget to set up NODE_ENV=development in server .env file to enable cors*).
