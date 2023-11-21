FROM node:18-alpine AS build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=build /app/dist/client/browser/ /usr/share/nginx/html

EXPOSE 81
