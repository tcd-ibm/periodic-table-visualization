FROM registry.access.redhat.com/ubi8/ubi:8.1

# creates app directory
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN yum install bzip2 -y

RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash - && \
    yum install -y nodejs

#installs all the dependencies
RUN npm install

# bundle app source
COPY . .

# node js app binds this port to we expose it so it can be mapped by a daemon (background process)

ENV PORT 8080
EXPOSE 8080

ENTRYPOINT npm run start
