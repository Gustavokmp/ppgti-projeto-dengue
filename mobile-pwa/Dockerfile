FROM node:18.13

WORKDIR /app

COPY package*.json ./
RUN npm install -g @ionic/cli
RUN npm install --force --legacy-peer-deps

COPY . .

CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--disable-host-check"]
