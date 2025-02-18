FROM node:23-alpine
COPY . /frontend/
WORKDIR /frontend/
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN chown -R node:node /tmp/
USER node
RUN npm config set prefix '~/.local/'
RUN npm install -g npm@latest jest serve
RUN npm audit fix --force --audit-level=none
RUN npm run build
RUN rm -rf /tmp/* && rm -rf ~/.npm/
CMD serve -s dist