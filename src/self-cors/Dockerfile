FROM node:18

# Create app directory
RUN mkdir -p /usr/src/self-cors
WORKDIR /usr/src/self-cors

# Install app dependencies
COPY package.json /usr/src/self-cors
RUN npm install

# Bundle app source
COPY . /usr/src/self-cors

EXPOSE 8080
CMD [ "node", "server.js" ]