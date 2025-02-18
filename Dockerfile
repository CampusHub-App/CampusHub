FROM node:23-alpine
COPY . /frontend/
WORKDIR /frontend/
ENV NODE_OPTIONS=--max-old-space-size=2048
USER node
RUN npm install npm@latest jest serve
RUN npm audit fix --force --audit-level=none
RUN npm run build
RUN rm -rf /tmp/ && rm -rf ~/.npm/
CMD serve -s dist