pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        GITHUB_CREDENTIALS = credentials('github-credentials')
        DOCKER_IMAGE_BACKEND = 'nokesh14/hms-backend'
        DOCKER_IMAGE_FRONTEND = 'nokesh14/hms-frontend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NokeshK/HMS.git', credentialsId: 'github-credentials'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                sh "docker tag hms_backend:latest $DOCKER_IMAGE_BACKEND:$DOCKER_TAG"
                sh "docker tag hms_frontend:latest $DOCKER_IMAGE_FRONTEND:$DOCKER_TAG"
                sh "docker push $DOCKER_IMAGE_BACKEND:$DOCKER_TAG"
                sh "docker push $DOCKER_IMAGE_FRONTEND:$DOCKER_TAG"
                sh "docker tag $DOCKER_IMAGE_BACKEND:$DOCKER_TAG $DOCKER_IMAGE_BACKEND:latest"
                sh "docker tag $DOCKER_IMAGE_FRONTEND:$DOCKER_TAG $DOCKER_IMAGE_FRONTEND:latest"
                sh "docker push $DOCKER_IMAGE_BACKEND:latest"
                sh "docker push $DOCKER_IMAGE_FRONTEND:latest"
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose pull'
                sh 'docker-compose up -d'
            }
        }

        stage('Push to GitHub') {
            steps {
                sh 'git config --global user.email "jenkins@example.com"'
                sh 'git config --global user.name "Jenkins CI"'
                sh "git tag -a v$DOCKER_TAG -m 'Release version $DOCKER_TAG'"
                sh 'git push origin v$DOCKER_TAG'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}