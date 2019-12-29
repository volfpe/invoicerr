FROM node:10

COPY . .
RUN yarn
RUN yarn build