# Buoy Call

View historical data over time for buoys placed all over the world.
Select a shark to adopt and give it a name with a $5 donation, and come back often to view where the shark is swimming.

## Run On Your Local Machine

### Server Side
1. Set up postgreSQL database with a database name, username, and Password
2. Close this repository
3. Edit the `server/config/config_example.json` file and rename the file to `config.json`
4. Edit the `server/.env_example` file  and rename the file to `server.env`
5. Ask a BuoyCall member for permission to ssh tunnel into the BuoyCall database
6. Open the tunnel in a terminal window, leave that tunnel open whenever accessing the app
7. Run `npm install`
8. Run `sequelize db:migrate`
9. Run `npm start`

### Client Site
1. Edit the `client/config/config.json` file and rename the file to `config.json`
2. Run `npm run build`

## Build for Production
