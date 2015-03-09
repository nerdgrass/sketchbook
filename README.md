
# Sketchbook (sketchbook)

> A digital sketchbook for my generative art experiments
> 

## React Branch
This branch serves as the prototype for implementing sketchbook as a React application using Yeoman and Generator Flux React (yo flux)

## Built With
* Package Managers:
    - Bower
    - NPM
* Build System
    - Yeoman
    - Gulp
    - [Browserify](http://browserify.org/)
    - [Babel](https://babeljs.io/)
* UI Libraries
    - [React](http://facebook.github.io/react)
    - [Material UI](http://material-ui.com)


## Special Thanks to
* Ben Anderson's [Generator-Flux-React](https://github.com/banderson/generator-flux-react)

## Running your project

The generated project includes a live-reloading static server on port `8080` (you can change the port in the `gulpfile.js` config), which will build, launch, and rebuild the app whenever you change application code. To start the server, run:

```bash
$ npm start
```

If you prefer to just build without the live reload and build-on-each-change watcher, run:

```bash
$ npm run build
```


## Generating Additional Code

You can add additional functionality to your application by invoking the subgenerators included in the Flux Generator. You can add components using the following commands:

#### Components
```bash
$ yo flux:component ComponentName
```

#### Actions
```bash
$ yo flux:action ActionCreatorName
```

#### Stores
```bash
$ yo flux:store StoreName
```

*Documentation last updated on:*
*03/08/2015*