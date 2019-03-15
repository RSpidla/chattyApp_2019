# ./chatApp

## Chatty App server

### Dependencies

- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- babel-preset-stage-0
- css-loader
- eslint
- eslint-plugin-react
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server

### Sturcture
- LICENSE
- README.md
- index.html  (Root element for react)
- node_modules/
- package.json
- server.js  (server)
- src/   (Contains all components)
  - index.jsx  (Render <App /> in root)
  - App.jsx 
  - ChatBar.jsx (Child componet of App)
  - MessageList.jsx  (Child componet of App)
  - Message.jsx  (Child componet of MessageList)
- Styles/
  - application.scss
  - home.scss  (Controls all the styles for the page)
- webpack.config.js