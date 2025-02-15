FROM node:10-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json","package-lock.json*","./"]
RUN npm install --production 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]