FROM registry.redhat.io/ubi8/nodejs-14:latest

# run w/ root privlages
USER root

# creates app directory
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN  yum install -y bzip2

RUN sudo npm -g install chromedriver --unsafe-perm=true --allow-root

# a package needed for this project
RUN sudo npm install phantomjs-prebuilt@2.1.13 --unsafe-perm

RUN npm install --save-dev node-sass

#installs all the dependencies
RUN npm install

# bundle app source
COPY . .

# node js app binds this port to we expose it so it can be mapped by a daemon (background process)

ENV PORT 8080
EXPOSE 8080

ENTRYPOINT npm run start
