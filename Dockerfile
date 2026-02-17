FROM node:22-bookworm-slim

WORKDIR /usr/src/app

# COPY . .

# everything other is mounted with docker-compose.yaml
# COPY package.*json ./ # doesn't work for some reason
COPY package.json ./
COPY package-lock.json ./

# RUN npm i
# Clean Install - removes node_modules, uses only package-lock.json
RUN npm ci

EXPOSE 3000 

CMD ["npm", "start"]