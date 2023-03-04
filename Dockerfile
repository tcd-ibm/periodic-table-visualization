FROM registry.redhat.io/ubi8/nodejs-14:latest

# run w/ root privlages
USER root

# creates app directory
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN yum install -y bzip2

# a package needed for this project
RUN npm install phantomjs-prebuilt@^2.1.14 --unsafe-perm

# installing peer dependency
RUN npm install node-sass@^4.0.0

#installs all the dependencies
RUN npm install

# bundle app source
COPY . .

# node js app binds this port to we expose it so it can be mapped by a daemon (background process)

ENV PORT 8080
EXPOSE 8080

ENTRYPOINT npm run start
