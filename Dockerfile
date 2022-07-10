FROM node:13-alpine
WORKDIR /home/app
COPY . .
CMD [ "node", "index.js" ]