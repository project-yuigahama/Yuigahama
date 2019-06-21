FROM node:10-alpine
LABEL name "YuigahamaBot"
LABEL version "1.0.6"
LABEL maintainer "InkoHX <inkohx@gmail.com>"

WORKDIR /user/project-yuigahama/Yuigahama
COPY package.json package-lock.json ./

ENV DISCORD_TOKEN=

RUN npm install --production

CMD ["npm", "start"]
