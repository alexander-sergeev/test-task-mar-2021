### Client side (frontend)

Get into `client` folder and install dependencies by running `npm install`.

Copy file `.env.sample` and name it `.env`.
In this file, specify [Google Maps API](https://console.cloud.google.com/project/_/apiui/credential?_ga=2.94269080.48808449.1615389451-541698213.1615389449) key. Variables starting with `REACT_APP` [will be injected](https://create-react-app.dev/docs/adding-custom-environment-variables/) into client application, therefore _do not_ store sensetive information in them. Since Google Maps API key can be public, it's ok to use it client-side.

If you are running app for development, you can run `npm start`. It will recompile and restart app every time you change source code.
If you are looking for production build, build your sources by running `npm run build`. Built files will be in `build` folder. Then you can start your app by running `npm start`.
