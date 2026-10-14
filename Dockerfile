# Build the static application assets.
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY index.html ./
COPY src ./src
RUN npm run build

# Serve only the production assets from a small web server image.
FROM nginx:stable-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
