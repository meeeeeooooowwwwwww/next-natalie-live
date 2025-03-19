/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['1a-1791.com'],
  },
  experimental: {
    buildTracesIgnore: ['node_modules/**', 'public/data/**'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://rumble.com https://*.rumble.cloud;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' https://1a-1791.com https://rumble.com https://*.rumble.cloud data:;
              font-src 'self' https://fonts.gstatic.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
              frame-src 'self' https://rumble.com https://*.rumble.cloud;
              connect-src 'self' https://rumble.com https://*.rumble.cloud;
              media-src 'self' https://rumble.com https://*.rumble.cloud;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  },
  webpack: (config, { isServer }) => {
    // Silence the punycode deprecation warning
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ];
    return config;
  },
}

module.exports = nextConfig 