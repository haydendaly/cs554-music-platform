FROM node

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN node seed.js

EXPOSE 3000
CMD ["npm", "start"]
