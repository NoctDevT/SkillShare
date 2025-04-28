# -OAUTH 2.0  Skill exchange Backend API -

### Tech Stack:
> Backend: Express.js, TypeScript, Prisma ORM, PostgreSQL
> Auth: OAuth 2.0, JWT
> Validation: Zod
> Testing: Jest, Supertest
> CI/CD: GitHub Actions
> DevOps: Docker, Docker Compose

To start project run 
`docker compose up --build`

Backend API exposed to port 3000 (localhost:3000)

Database is exposing to port 5435

This application uses Prsima for migrations, keep the database running in docker to apply migrations. To add models, refer to Prisma documentation and add models within the prisma/schema.prisma file https://www.prisma.io/docs/orm/prisma-migrate/getting-started

## Routes

/auth/login
/auth/logout
/auth/loginSuccess
/auth/profile


/user/onboarding
/user/getProfile


# For local K8s development 

1) Download minikube and kubernetes  
2) Add environment variables into k8s/ 
3) run start-cluster.sh script 

Backend hosted on Localhost:3000
