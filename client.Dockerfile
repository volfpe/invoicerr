FROM node:10
ARG REACT_APP_API_URL

COPY packages/client/ .
RUN yarn
RUN yarn build