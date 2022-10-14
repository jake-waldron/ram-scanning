FROM node:alpine as builder

WORKDIR /app/client

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
# CMD ["npm", "start"]

FROM nginx:1.21.0-alpine as production
# Copy built assets from builder
COPY --from=builder /app/client/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
# CMD ["nginx", "-g", "daemon off;"]