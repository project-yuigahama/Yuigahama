FROM node:10-alpine
LABEL name "YuigahamaBot"
LABEL version "1.0.6"
LABEL maintainer "InkoHX <inkohx@gmail.com>"

WORKDIR /user/project-yuigahama/Yuigahama
COPY package.json package-lock.json ./
COPY src ./src

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps git curl build-base python g++ make .gyp \
  && npm install --production \
  && apk del .build-deps .gyp

ENV DISCORD_TOKEN= \
  DBL_TOKEN= \
  ERROR_REPORT_CHANNEL_ID= \
  CRASH_REPORT_CHANNEL_ID=

CMD ["npm", "start"]
