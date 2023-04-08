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
  async redirects() {
    return [
      {
        source: "/contact", // this path will be redirected to 404
        destination: "/404",
        permanent: false,
      },
      {
        source: "/portfolio", // this path will be redirected to 404
        destination: "/404",
        permanent: false,
      },
    ];
  },
};
