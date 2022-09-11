FROM node:alpine

WORKDIR /home/app/backend

COPY . /home/app/backend

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
RUN apk update && apk add git
RUN git config --global --add safe.directory /home/app/backend
RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
