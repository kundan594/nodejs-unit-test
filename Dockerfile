FROM node:10-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json","package-lock.json*","./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]