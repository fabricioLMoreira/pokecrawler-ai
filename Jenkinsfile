pipeline {
    agent any
    stages {
        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Push to DockerHub') {
            steps {
                echo 'Here we would push to DockerHub'
            }
        }
    }
    post {
        failure {
            mail to: 'fabricio@example.com',
                 subject: 'Pipeline Failed',
                 body: 'Pipeline failed - check Jenkins logs'
        }
    }
}