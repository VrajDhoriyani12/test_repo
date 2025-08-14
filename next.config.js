
/**@type {import('next').NextConfig} */
const path = require('path');
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // output: "export",  // Uncomment the following line only for building purposes. By default, this line should remain commented out.
  // reactStrictMode: true,
  // Adds a trailing slash to every route:
  trailingSlash: true,
  basePath: isProd ? "/bootstrap/app/xintra-ts/preview" : undefined,
  assetPrefix: isProd ? "/bootstrap/app/xintra-ts/preview" : undefined,
  images: {
    loader: "imgix",
    path: "/",
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'public/assets/scss')],
    silenceDeprecations: ['legacy-js-api'],
    quietDeps: true,
  },
  reactStrictMode: false, // Disable Strict Mode if necessary
};

module.exports = nextConfig;
