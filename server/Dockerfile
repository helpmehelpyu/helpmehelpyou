FROM node:16-alpine as development 

WORKDIR /app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:16-alpine as production

ARG NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet --only-production

COPY --from=development /app/dist ./dist

CMD ["node", "dist/index.js"]
