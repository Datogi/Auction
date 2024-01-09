// next-auth.config.js
export default {
  providers: [
    {
      id: "github",
      name: "GitHub",
      type: "oauth",
      version: "2.0",
      scope: "read:user", // Adjust scopes based on your needs
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://github.com/login/oauth/access_token",
      authorizationUrl: "https://github.com/login/oauth/authorize",
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    // Add other providers if needed
  ],
};
