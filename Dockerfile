FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

# Executar migrations durante a build (não recomendado)
RUN npm run criar-banco1 && npm run executar-migration1

EXPOSE 3500

CMD ["npm", "run", "production"]