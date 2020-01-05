FROM node:10
ARG API_URL

COPY packages/client/ .
RUN yarn
RUN yarn build