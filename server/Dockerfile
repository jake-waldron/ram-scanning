FROM node:alpine

# WORKDIR /app/
WORKDIR /app/server

COPY package.json ./

RUN npm install

# COPY . ./server
COPY . ./

CMD ["npm", "start"]