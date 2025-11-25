# Étape 1 : build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copie des fichiers de config
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le code source
COPY . .

# Build du projet NestJS
RUN yarn build

# Étape 2 : runtime
FROM node:20-alpine

WORKDIR /usr/src/app

# Copier uniquement le build et les dépendances nécessaires
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json ./

# Exposer le port de ton API
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/main.js"]
