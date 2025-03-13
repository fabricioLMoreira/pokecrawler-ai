pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout Código do GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/fabricioLMoreira/pokecrawler-ai'
            }
        }

        stage('Build das Imagens Docker') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Login no Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
            }
        }

        stage('Push para o Docker Hub') {
            steps {
                sh '''
                docker tag pokecrawler-ai-frontend $DOCKERHUB_USER/pokecrawler-frontend:latest
                docker push $DOCKERHUB_USER/pokecrawler-frontend:latest
                
                docker tag pokecrawler-ai-backend $DOCKERHUB_USER/pokecrawler-backend:latest
                docker push $DOCKERHUB_USER/pokecrawler-backend:latest
                '''
            }
        }

    post {
        success {
            echo 'Pipeline Completed Successfully 🎉'
        }
        failure {
            mail to: 'a2009076370@isec.pt',
                 subject: 'Pipeline Failed ❌',
                 body: 'Pipeline failed - check Jenkins logs'
        }
    }
}
