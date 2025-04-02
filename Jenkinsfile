pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'a2009076370'
    }

    stages {
        stage('Build Docker Images') {
            steps {
                dir("${env.WORKSPACE}") {
                    echo 'A construir imagens com Docker Compose...'
                    sh 'docker-compose build'
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                dir("${env.WORKSPACE}") {
                    echo '🔐 A fazer login no DockerHub...'
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                dir("${env.WORKSPACE}") {
                    echo 'A fazer push para o DockerHub...'
                    sh 'docker-compose push'
                }
            }
        }
    }

    post {
        failure {
            mail to: 'paula.lopes.developer@gmail.com',
                 subject: 'Pipeline Jenkins Falhou',
                 body: 'Erro no pipeline CI/CD. Verifica os logs do Jenkins.'
        }

        success {
            echo 'Pipeline concluída com sucesso!'
        }
    }
}
