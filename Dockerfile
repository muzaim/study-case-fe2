# Stage 1: Build Angular application
FROM node:latest AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build --prod

# Stage 2: Serve Angular application with Nginx
FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
