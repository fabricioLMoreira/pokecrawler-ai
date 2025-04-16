FROM node:18

# Set the working directory inside the container
WORKDIR /
 
# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .

# Passa args do docker-compose para variáveis REACT_APP_
ARG REACT_APP_KEYCLOAK_URL
ARG REACT_APP_KEYCLOAK_REALM
ARG REACT_APP_KEYCLOAK_CLIENT_ID

ENV REACT_APP_KEYCLOAK_URL=$REACT_APP_KEYCLOAK_URL
ENV REACT_APP_KEYCLOAK_REALM=$REACT_APP_KEYCLOAK_REALM
ENV REACT_APP_KEYCLOAK_CLIENT_ID=$REACT_APP_KEYCLOAK_CLIENT_ID
 
# Expose the port your app runs on
EXPOSE 3000
 
# Define the command to run your app
CMD ["npm", "start"]
