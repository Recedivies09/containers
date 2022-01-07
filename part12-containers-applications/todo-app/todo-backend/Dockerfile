FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only-production

CMD ["npm", "start"]
