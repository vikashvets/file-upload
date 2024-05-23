FROM node:22 as build-deps
LABEL authors="Viktoriia Shvets"

WORKDIR /file-upload/
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
COPY --from=build-deps /file-upload/build /usr/share/nginx/html
COPY ngnix.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]