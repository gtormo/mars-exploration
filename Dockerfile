FROM node:14.17-alpine3.11

WORKDIR /usr/src/app

COPY . .

RUN npm install pm2 -g
RUN npm install --production

CMD [ "pm2-runtime", "npm", "--", "start" ]