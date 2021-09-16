module.exports = {
  apps: [
    {
      name: "ComeInBot",
      script: "./build/index.js",
      env_production: {
        NODE_ENV: "production",
        TOKEN: "ODg3OTcxMjE2MDA5MzYzNDU2.YUL5ow.H9MvdWBQGL90hQMThLmD3IK7ns8",
        PREFIX: ".",
      },
      env_development: {
        NODE_ENV: "development",
        TOKEN: "Njk5MzMzMzU5OTk4MDc0OTUw.XpS28g.sSZIe0tYBWK5IRctVhI3uVEXB-w",
        PREFIX: ".",
      },
    },
  ],
};
