FROM node

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install serve -g
RUN npm build

COPY . .

EXPOSE 8000
CMD ["serve", "-s", "build", "-l", "8000"]