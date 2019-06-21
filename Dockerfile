FROM node:10-alpine
LABEL name "YuigahamaBot"
LABEL version "1.0.6"
LABEL maintainer "InkoHX <inkohx@gmail.com>"

WORKDIR /user/project-yuigahama/Yuigahama
COPY package.json package-lock.json ./

ENV DISCORD_TOKEN=

RUN apk add --no-cache --virtual git python g++ make .gyp gcc \
  && npm install --production \
  && apk del .gyp make python gcc g++

CMD ["npm", "start"]
