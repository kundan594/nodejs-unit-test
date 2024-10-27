pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
        IMAGE_NAME = "my-node-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/kundan594/nodejs-unit-test.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                   sh 'docker build -t ${IMAGE_NAME} .'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'docker run --rm ${IMAGE_NAME} npm test'
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    sh 'docker rm -f my-node-app-container || true'
                    sh 'docker run -d --name my-node-app-container -p 3000:3000 ${IMAGE_NAME}'
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f || true'
        }
    }
}
