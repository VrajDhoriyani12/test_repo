// next.config.js
const path = require('path');
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/bootstrap/app/xintra-ts/preview" : "";

/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { loader: "imgix", path: "/", unoptimized: true },
  sassOptions: {
    includePaths: [path.join(__dirname, 'public/assets/scss')],
    silenceDeprecations: ['legacy-js-api'],
    quietDeps: true,
  },
  reactStrictMode: false,
  async redirects() {
    return isProd
      ? [{ source: '/', destination: `${basePath}/`, permanent: false }]
      : [];
  },
};
