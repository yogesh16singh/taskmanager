FROM node:16
WORKDIR /usr/src/app
COPY . ./
RUN npm install
EXPOSE 3001
ENV NODE_ENV=development
CMD ["npm","start"]