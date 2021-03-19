import { OAuth2Client } from 'google-auth-library';

/**
 * Create new Google OAuth2Client with params from env variables
 */
export const createGoogleOauthClient = (): OAuth2Client => {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
  );
};

/**
 * Cached instance of OAuth2Client which is used for immutable operations.
 * Created with the aim of stop creating new clients for small operations like generating auth url or verify identity token.
 * We are not exporting itself to ensure we will not modify its state from the outside.
 */
const client: OAuth2Client = createGoogleOauthClient();

export const verifyIdToken = client.verifyIdToken.bind(client);
export const generateAuthUrl = client.generateAuthUrl.bind(client);
export const getToken = client.getToken.bind(client);
