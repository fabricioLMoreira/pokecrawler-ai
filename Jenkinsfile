pipeline {
    agent any

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch')
        string(name: 'TAG', defaultValue: 'latest', description: 'Docker tag')
    }

    environment {
        DOCKERHUB_USER = "${env.DOCKERHUB_USER}"
        GIT_REPO_URL   = "${env.GIT_REPO_URL}"
        EMAIL_TO       = "${env.EMAIL_TO}"
    }

    stages {
        // Checkout já está a ser feito automaticamente via "Pipeline script from SCM"
        /*
        stage('Checkout') {
            steps {
                git branch: params.BRANCH, url: "${GIT_REPO_URL}"
            }
        } */

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                }
            }
        }

        stage('Build and Publish Backend') {
            steps {
                dir('backend') {
                    echo 'A construir e publicar o Backend...'
                    sh """
                        docker build -t ${DOCKERHUB_USER}/backend:${params.TAG} .
                        docker push ${DOCKERHUB_USER}/backend:${params.TAG}
                    """
                }
            }
        }

        stage('Build and Publish Frontend') {
            steps {
                dir('frontend') {
                    echo 'A construir e publicar o Frontend...'
                    sh """
                        docker build -t ${DOCKERHUB_USER}/frontend:${params.TAG} .
                        docker push ${DOCKERHUB_USER}/frontend:${params.TAG}
                    """
                }
            }
        }

        stage('Build and Publish Crawler') {
            steps {
                dir('crawler') {
                    echo 'A construir e publicar o Crawler...'
                    sh """
                        docker build -t ${DOCKERHUB_USER}/crawler:${params.TAG} .
                        docker push ${DOCKERHUB_USER}/crawler:${params.TAG}
                    """
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

        // stage('Simular Erro') {
        //     steps {
        //         echo '💣 A simular falha na pipeline...'
        //         sh 'exit 1'
        //     }
        // }
    }

    post {
        failure {
            mail to: "${EMAIL_TO}",
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