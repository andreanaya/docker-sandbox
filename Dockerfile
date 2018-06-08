FROM node:latest
RUN mkdir -p /app
WORKDIR /app
ADD app/package.json /app
RUN npm install
COPY ./app /app
EXPOSE 3000
CMD [ "npm", "start" ]