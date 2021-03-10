## Requirements

### Technologies used

The goal of a test task is to build a full application, both client and server sides. Application has to be written with Typescript and use GraphQL to communicate between client and server. In our team we use Apollo GraphQL engine and client, but you are free to use any other. Frontend part should use React and any UI components and other additional libraries you like.

### Functional requirements for a client application

- Navbar. Navbar contains left aligned Home icon, which navigates to a home page, and right aligned pane, containing a language display/selection control and a login button, which is replaced by a profile image, linked to a user’s profile after a successful login.
- Google Identity Oauth2 login should be used to login into the application using an existing google account. After a successful authentication, the refresh token should be stored and used to refresh an expired access token non-interactively.
- Home page accessible at a root / path for both authenticated and anonymous users should display a full screen map (Google or OpenStreetMap) displaying a landmark at the user’s current position, obtained with the geolocation api.
- Profile page, accessible at a /profile path only for authenticated users should display a localized user information, obtained from the google account, including first and last name, profile picture, user’s language, and last login time with a fully localized date time format, including a day of week. Profile page should also contain a Logout button at the bottom, allowing a user to log out.
- Language display/selection control should support a configurable choice of languages (with ua, ru, en choices implemented), displaying the user's current language and allowing them to choose a different one. Chosen language should be remembered, e.g. in a persistent cookie. Once remembered, this setting will have a highest priority and overrides other language selection sources, in a decreasing priority: a locale from a user’s profile for authenticated users, a locale from a browser settings, for anonymous users.

### Functional requirements for a server application

- Server should support a single GraphQL query, profile, returning a localized profile information.
- Server should only allow authenticated requests and should properly validate the access token provided, including validation of a signature, expiration and audience.
- Business logic should be implemented separately from resolvers in the services.
- Information about an authenticated user and user’s language choice should not be passed to the service methods directly as a parameter, but rather as an authentication context.

### Non functional requirements

- Code should be documented, contain requirements, build and testing instructions
- Unit and integration tests are welcome
- Frontend should be responsive, i.e. it should look ok on both desktop and mobile screens.
