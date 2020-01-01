FROM node:alpine

WORKDIR /quandl
ADD . .

ENV PORT=6221
EXPOSE 6221

RUN npm install
ENTRYPOINT ["node", "server.js"]
