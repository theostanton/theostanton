FROM node:15

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .
COPY site ./site
COPY stats ./stats

RUN yarn install --pure-lockfile --non-interactive
