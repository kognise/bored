FROM node:8

WORKDIR /opt/bored/backend

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .

EXPOSE 3001
CMD [ "node", "index.js" ]