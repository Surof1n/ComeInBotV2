module.exports = {
  apps: [
    {
      name: "ComeInBot",
      env_production: {
        script: "./build/index.js",
        NODE_ENV: "production",
        TOKEN: "ODg3OTcxMjE2MDA5MzYzNDU2.YUL5ow.lELqlWHQJSlBksIHIaUcuLN-sP8",
        PREFIX: ".",
      },
      env_development: {
        script: "./src/index.ts",
        NODE_ENV: "development",
        TOKEN: "Njk5MzMzMzU5OTk4MDc0OTUw.XpS28g.rQ87xjP5q5NZ80HfP7f_SIzb4fk",
        PREFIX: ".",
      },
    },
  ],
};
