FROM node:13-alpine
WORKDIR /home/app
COPY . .
RUN npm install
CMD [ "node", "index.js" ]