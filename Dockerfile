FROM node:latest

WORKDIR /todo-vue

#EXPOSE 3000
RUN apt-get update && apt-get upgrade -y
RUN echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | tee /etc/apt/sources.list.d/webupd8team-java.list
RUN echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu xenial main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys EEA14886
RUN apt-get update
RUN echo debconf shared/accepted-oracle-license-v1-1 select true | \
    debconf-set-selections
RUN echo debconf shared/accepted-oracle-license-v1-1 seen true | \
    debconf-set-selections
RUN apt-get -y install oracle-java8-installer

RUN npm install -g vue-cli

CMD exec /bin/bash -c "trap : TERM INT; sleep infinity & wait"
