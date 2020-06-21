FROM node:lts AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm install
RUN npm run build

FROM node:lts-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY knexfile.js ./

RUN npm install --production
EXPOSE $APP_PORT

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm","start"]