import { OAuth2Client } from 'google-auth-library';

/**
 * Create new Google OAuth2Client with params from env variables
 */
const getGoogleOauthClient = (): OAuth2Client => {
  return new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL,
  );
};

export default getGoogleOauthClient;
