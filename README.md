# React.js/Express.js Bike Rental App

## Local Installation
1. Install <a href="https://nodejs.org" target="_blank">Node.js</a>.
2. Install <a target="_blank" href="https://www.postgresql.org/">PostgreSQL</a>.
3. Configure PostgreSQL on your local machine and create database for application data.
4. `git clone https://github.com/Tsukuruu/bike-rental-app.git`.
5. Install all dependencies for client and server using `npm install`.
6. Create `.env` files in both client and server folders and set up enviroment variables(template: `.env.example`).

## How to Launch
To launch app we need to compile the **latest** client js and place it to `server` folder. This allows the main app server(Express) to also show the final app.

1. Generate latest React app in `client` folder run `npm run build` and copy all files from `client/build` to `server/views`.
2. In terminal go to the `server` folder and run `npm run dev`. It will be running both the server and the client.
3. Open browser and go to : `localhost:ENV_SPECIFIED_PORT`.

*Note: You should add some bike types when server starts firstly. You can do it through POST request to url `http://localhost:PORT/api/types` sending json row in format:
`{ 
  "title": "your_type_title"
}`
or use your CLI/pgAdmin to explicitly add bike types in postgres database table `types`.*
