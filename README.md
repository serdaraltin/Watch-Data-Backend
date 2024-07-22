# watch-data-manuel-report

## App

- npm install for new packages
- npx prisma migrate dev tht will apply change in db
- The progrma has systems information log files.
- pm2 node index.js to execute prograam.

## DOCKER

- Run Docker

sudo docker run watch-data-manuel-report_app

- Stop Docker

sudo docker run watch-data-manuel-report_app

- Check Docker List

sudo docker ps -a

 ## Execute docker

 - First do newgrp docker then logot and wait 10 secs then login

 - docker-compose up --build 

 - Get in docker with 

 docker exec -it watch-data-manuel-report_postgres_1  bash

## Files and folder structure.
### src folder
- src
- src/api/..

Each folder inside api holds the api for seperate operation like user, admin, report etc.

- src/server.js

app.use(notification)
app.use(report);
app.use(dashboard);

i defined files asa modules and call them inside server.js.
 
index.js is just few lines.

const app = require("./api/server.js")

const port = 3000

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

- src/conver

This folder contains file that has mock data.

- src/debugger

This folder contains folder for analyzing performance in case it is necessary.

- src/utils

This folders contains amazon file s3.js and other file is for
doing some operation.

-src/validator
 
 That contains general validator file "validator.js" and spesific file for checking rules for entry in req.body object.





