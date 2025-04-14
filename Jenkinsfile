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
                    echo 'A fazer login no DockerHub...'
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
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

        stage('Get Commit Author') {
            steps {
                script {
                    def author = sh(script: "git log -1 --pretty=format:'%an <%ae>'", returnStdout: true).trim()
                    env.COMMIT_AUTHOR = author
                }
            }
        }

        stage('Obter autor do commit') {
            steps {
                script {
                    def author = sh(script: "git log -1 --pretty=format:'%an <%ae>'", returnStdout: true).trim()
                    env.COMMIT_AUTHOR = author
                    echo "Autor do último commit: ${author}"
                }
            }
        }

        /* stage('Simular Erro') {
            steps {
                echo '💣 A simular falha na pipeline...'
                sh 'exit 1'
            }
        } */
    }

    post {
        failure {
            mail to: 'paula.lopes.developer@gmail.com',
                subject: "🚨 Falha na Pipeline: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """A pipeline falhou no stage: ${env.STAGE_NAME}

                🔍 Verifica os logs aqui: ${env.BUILD_URL}

                Commit: ${env.GIT_COMMIT}
                Autor: ${env.COMMIT_AUTHOR}
                """
        }
    
        success {
            echo 'Pipeline concluída com sucesso!'
        }
    }

}
