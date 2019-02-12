FROM node:10.15.1

WORKDIR /usr/app

COPY package*.json ./

# RUN yarn build
RUN npm install -g stylus
RUN npm install --production --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
