# One Question Every Day

## Installation
You have to have [Node.js](https://nodejs.org/en/download/) installed on your machine. With it you will also install Node Package Manager (npm), which is needed for package manipulation.
```
# install Angluar CLI globally
npm install -g @angular/cli

# install local project packages
npm install
```
Copy `.env.example` file to the `.env` file and fill out the required parameters.

## Development server

Run `ng serve` or `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. To run the Node.js server, run `nodemon server.js` or `npm run serve`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --aot -prod` or `npm run build` to build the project in production mode. The build artifacts will be stored in the `dist/` directory.

## Deployment

Log into your Heroku account using `heroku login` command. Then run `git push heroku master` to push all so far unpushed commits to the heroku server and wait for the new version of the production application to be built.

## URL

https://one-question-every-day.herokuapp.com/

demo account:
e-mail: test@test.com
password: test123
