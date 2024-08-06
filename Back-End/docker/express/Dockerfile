FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npm install -g nodemon

COPY ../.. .

EXPOSE 3000

CMD ["sh", "-c", "npx node-pg-migrate up && nodemon -L ./bin/www"]
