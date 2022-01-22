#
# ---- Base Node ----
FROM mhart/alpine-node:latest as base
RUN apk add nodejs-current tini
WORKDIR /root/bot

ENTRYPOINT ["/sbin/tini", "--"]

COPY package.json .

#
# ---- Release ----
FROM base AS release

COPY . .
RUN npm i

CMD ["npm", "run", "start:prod"]