# jenkins/Dockerfile
FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker-compose-plugin git

# Habilita permissões para Docker
RUN usermod -aG docker jenkins

USER jenkins
