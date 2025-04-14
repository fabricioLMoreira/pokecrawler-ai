# jenkins/Dockerfile
FROM jenkins/jenkins:lts

USER root

# Instala Docker CLI e o plugin docker-compose moderno
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    docker-compose-plugin \
    git \
    curl

# Adiciona o user jenkins ao grupo docker
RUN usermod -aG docker jenkins

USER jenkins
