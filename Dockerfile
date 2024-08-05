FROM node:lts-bookworm-slim

WORKDIR /usr/src/app

# COPY . .

# everithing other is mounted with docker-compose.yaml
COPY package.*json ./

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]