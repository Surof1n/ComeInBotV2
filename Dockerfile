FROM node:lts-bullseye as builder

WORKDIR /usr/src/app

COPY ["tsconfig.json", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install

COPY src ./src
RUN npm run build


FROM node:lts-bullseye

RUN mkdir -p /home/node/app && chown -R node:node /home/node
WORKDIR /home/node/app

COPY --chown=node:node ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

USER node
RUN npm install --production

COPY --from=builder /usr/src/app/build ./build
COPY ormconfig.js .

CMD ["npm", "start"]
