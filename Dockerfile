FROM node:10.15-alpine

RUN apk add curl

WORKDIR /app

COPY . .

RUN npm install
RUN node fuse build

ENV PORT 80
EXPOSE 80

CMD [ "node", "dist/server" ]
