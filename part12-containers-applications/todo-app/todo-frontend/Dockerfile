# build-stage
FROM node:16-alpine AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only-production

RUN CI=true npm test

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]