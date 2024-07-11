FROM node:18.19

WORKDIR /app

COPY package*.json ./
RUN npm install -g @ionic/cli @angular/cli
RUN npm install --force
COPY . .

CMD ["ionic", "serve", "--host", "0.0.0.0", "--port", "8100", "--disable-host-check"]
