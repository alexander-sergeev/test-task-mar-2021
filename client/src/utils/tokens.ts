const LOCAL_STORAGE_TOKENS_KEY = 'tokens';

export interface Tokens {
  refresh_token?: string | null;
  expiry_date?: number | null;
  access_token?: string | null;
  token_type?: string | null;
  id_token?: string | null;
  scope?: string;
}

export const getTokens = (): Tokens | null => {
  const rawTokens = localStorage.getItem(LOCAL_STORAGE_TOKENS_KEY);
  return rawTokens ? JSON.parse(rawTokens) : null;
};

export const getAccessToken = (): string | null => {
  const tokens = getTokens();
  return tokens?.access_token ?? null;
};

export const setTokens = (tokens: Tokens) => {
  localStorage.setItem(LOCAL_STORAGE_TOKENS_KEY, JSON.stringify(tokens));
};

export const clearTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKENS_KEY);
};
