FROM node:23-alpine
COPY . /frontend/
WORKDIR /frontend/
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN chown -R node:node /frontend/
RUN chown -R node:node /tmp/
USER node
RUN npm install -g npm@latest
RUN npm install -g serve
RUN npm install jest
RUN npm audit fix --force --audit-level=none
RUN npm run build
RUN rm -rf /tmp/* && rm -rf ~/.npm/
CMD serve -s dist