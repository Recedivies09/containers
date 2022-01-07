FROM node:16-alpine

#ENTRYPOINT [ "executable" ]

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
