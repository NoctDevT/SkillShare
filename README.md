# -express-template-
A full stack Typescript express template for writing production ready apps


### To run 

Run the following command below at root repository to run project
```bash
    docker compose up --build
```

Backend exposes to port #3000
Database is exposing to port #5435

Thoese mappings can be changed in the compose file e.g. to change from 3000 to 4000
change line from
`3000:3000`
to 
`4000:3000`


This application uses Prsima for migrations, keep the database running in docker to apply migrations. 
To add models, refer to Prisma documentation and add models within the prisma/schema.prisma file 
https://www.prisma.io/docs/orm/prisma-migrate/getting-started

Ensure that your DATABASE_URL for Prisma uses localhost than your docker connection url e.g. your 
connection URL should look like the following
`DATABASE_URL=postgresql://root:admin@localhost:5435/DBNAME`




