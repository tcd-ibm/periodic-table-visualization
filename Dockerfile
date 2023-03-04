FROM registry.redhat.io/ubi8/nodejs-14:latest

# run w/ root privlages
USER root

# creates app directory
WORKDIR /usr/src/app

COPY ./package*.json ./

#installs all the dependencies
RUN npm install

# bundle app source
COPY . .

# node js app binds this port to we expose it so it can be mapped by a daemon (background process)

ENV PORT 8080
EXPOSE 8080

ENTRYPOINT npm run start
