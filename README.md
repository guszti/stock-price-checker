## Running the app with docker

-   make a .env file and copy all from .env.dist
-   add your FINNHUB_API_KEY in .env
-   run "docker compose up"

## Running the app normally

-   make a .env file and copy all from .env.dist
-   fill out the data with the credentials of your postgres instance
-   run "npm ci"
-   run "npm run migration:deploy"
-   run "npm start"
