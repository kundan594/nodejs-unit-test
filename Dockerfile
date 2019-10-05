FROM node:8.9-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json","package-lock.json*","./"]
RUN npm i -g npm && npm i mocha istanbul -g
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start"]