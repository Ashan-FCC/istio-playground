ARG NODE_VERSION=14.15.4

FROM node:${NODE_VERSION} as builder

WORKDIR /build
COPY --chown=node:node . ${WORKDIR}

RUN npm install --production=true

FROM node:${NODE_VERSION}-alpine as runner

ARG SERVICE_VERSION
ENV SERVICE_VERSION=$SERVICE_VERSION

RUN apk add --no-cache tini

WORKDIR /app

COPY --from=builder --chown=node:node /build/ ./
COPY --from=builder --chown=node:node /build/node_modules ./node_modules/
COPY --from=builder --chown=node:node /build/package.json .

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./index.js"]
