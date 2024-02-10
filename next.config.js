// next.config.js
module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    swcPlugins: [
      [
        "next-superjson-plugin",
        {
          excluded: [],
        },
      ],
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/id/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/contact", // this path will be redirected to 404
        destination: "/404",
        permanent: false,
      },
    ];
  },
  eslint: {
    dirs: ["common"]
  }
};
