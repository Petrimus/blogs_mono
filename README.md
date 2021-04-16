# Fullstack blogs mono repo
Exercise 11.21 for Helsinki university course Full Stack open. This is monorepository containing both frontend and backend.
App is running on Heroku at [blogsmono](https://blogsmono.herokuapp.com)

## testing
Application is usable also with out siging in, but it will open all features. Test user credentials are tester as username and test as password.

## commands

```npm run start:dev``` run webpack dev-server

```npm run dev``` runs node backend server in dev-mode

```npm start``` runs node backend in production mode and serves front from static build

```npm run lint``` runs eslint, which runs against both front- and backend

```test:verbose``` runs tests for backend

```npm run cypress:open``` runs cypress in visual mode

```npm run test:e2e``` runs cypress without visuals

```npm run start:test``` runs node backend in test-mode

```npm run build``` builds static content

## source
This code is based on previous Open Fullstack exercises and https://github.com/UniversityOfHelsinkiCS/toskaboiler
