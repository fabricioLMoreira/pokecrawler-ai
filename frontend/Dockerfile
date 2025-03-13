FROM node:18

WORKDIR /app

# Copiar package.json primeiro para otimizar cache do Docker
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos do frontend (incluindo public/)
COPY . . 

# Expor a porta do React (opcional)
EXPOSE 3000

# Iniciar o servidor de desenvolvimento
CMD ["npm", "start"]
