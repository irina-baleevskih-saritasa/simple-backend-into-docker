FROM ubuntu:20.04
WORKDIR /app
COPY . .
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends tzdata && apt-get install -y nodejs
CMD [ "node", "src/server.js" ]
EXPOSE 8000
