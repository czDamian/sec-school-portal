// /** @type {import('next').NextConfig} */

// export default nextConfig;

import { createCivicAuthPlugin } from "@civic/auth/nextjs";

const nextConfig = {};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.CIVIC_CLIENT_ID,
});

export default withCivicAuth(nextConfig);
