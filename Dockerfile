FROM node:8

# Create app directory
WORKDIR /www

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]