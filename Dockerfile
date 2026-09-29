# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN --mount=type=secret,id=NODE_AUTH_TOKEN,env=NODE_AUTH_TOKEN npm ci
COPY . .
ARG VITE_APP_ID=se
ARG VITE_ZAFFIXX_TRACKING_KEY=
ARG VITE_ZAFFIXX_TRACKER_URL=https://zaffixx-cdn.syedfaaiz.com/tracker.js
ARG VITE_ZAFFIXX_COLLECT_ENDPOINT=https://zaffixx-api.syedfaaiz.com/api/v1/collect
ENV VITE_APP_ID=$VITE_APP_ID \
    VITE_ZAFFIXX_TRACKING_KEY=$VITE_ZAFFIXX_TRACKING_KEY \
    VITE_ZAFFIXX_TRACKER_URL=$VITE_ZAFFIXX_TRACKER_URL \
    VITE_ZAFFIXX_COLLECT_ENDPOINT=$VITE_ZAFFIXX_COLLECT_ENDPOINT
RUN npm run build
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
