FROM node:lts-alpine

ENV DISCORD_TOKEN="your token"

RUN npm install --production

CMD ["npm", "start"]