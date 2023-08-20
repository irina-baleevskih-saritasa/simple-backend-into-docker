FROM ubuntu:20.04
WORKDIR /app
COPY package.json .
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y nodejs npm
RUN npm install
COPY . .
RUN apt-get install -y --no-install-recommends tzdata
EXPOSE 8000
CMD [ "node", "src/server.js" ]
