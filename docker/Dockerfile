FROM node:15

WORKDIR /usr/src

COPY package.json /package.json
COPY stats/model/package.json /stats/model/package.json
COPY stats/controllers/package.json /stats/controllers/package.json
COPY stats/client/package.json /stats/client/package.json
COPY stats/local/package.json /stats/local/package.json
COPY stats/lambdas/package.json /stats/lambdas/package.json
COPY site/package.json /site/package.json

COPY yarn.lock /yarn.lock

RUN yarn install --pure-lockfile --non-interactive
