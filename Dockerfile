FROM node:12.19.0-alpine3.9 AS development

WORKDIR /srver

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn start:dev

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /server

COPY package.json yarn.lock ./

RUN yarn

COPY . .

COPY --from=development /server/dist ./dist

CMD ["node", "dist/main"]
