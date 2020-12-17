FROM node

WORKDIR /usr/src/app
COPY . .
RUN npm install

EXPOSE 3000
CMD ["node", "seed.js", "&&", "npm", "start"]
