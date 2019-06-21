FROM node:10-alpine
LABEL name "YuigahamaBot"
LABEL version "1.0.6"
LABEL maintainer "InkoHX <inkohx@gmail.com>"

WORKDIR /user/project-yuigahama/Yuigahama
COPY package.json package-lock.json ./

ENV DISCORD_TOKEN=

RUN apk add --update \
  && apk add --no-cache --virtual .build-deps git curl build-base python g++ make .gyp \
  && npm install --production \
  && apk del .build-deps .gyp

CMD ["npm", "start"]
