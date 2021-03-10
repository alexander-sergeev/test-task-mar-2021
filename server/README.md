### Server side (backend)

Get into `server` folder and install dependencies by running `npm install`.

Copy file `.env.sample` and name it `.env`. Some sensetive configuration, like external API keys, will be stored there.
You should specify there port, that the backend will use, [Google OAuth Client ID, Google OAuth Client secret](https://console.cloud.google.com/project/_/apiui/credential?_ga=2.94269080.48808449.1615389451-541698213.1615389449) and Authorization Redirect URL (your domain + `/loginCallback`).

If you are running app for development, you can run `npm run start:dev`. It will recompile and restart app every time you change source code.
If you are looking for production build, set `NODE_ENV` environment variable to `production` and build your sources by running `npm run build`. Built files will be in `dist` folder. Then you can start your app by running `npm start`.
