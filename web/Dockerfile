FROM node:latest
RUN mkdir -p /app
WORKDIR /app
ADD package.json /app
RUN npm install
COPY . /app
EXPOSE 3000