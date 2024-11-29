
# Stage 1: Build the Angular app
FROM node:18.20.4 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the Angular app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/student-profile /usr/share/nginx/html
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]


#FROM nginx:1.23.1-alpine
#COPY /dist/student-profile /usr/share/nginx/html