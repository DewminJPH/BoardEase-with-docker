pipeline{
  agent any // operating system that pipeline will run on

  environment{
    IMAGE_TAG = "${BUILD_NUMBER}"
    BACKEND_IMAGE = "boardease-backend:${IMAGE_TAG}"
    FRONTEND_IMAGE = "boardease-frontend:${IMAGE_TAG}"
  }
  stages{
    stage('Checkout'){
      steps{
        git branch: 'main', url:'https://github.com/DewminJPH/BoardEase-with-docker.git'
      }
    }
    stage('Build Docker Images'){
      parallel{
        stage('Build Backend Image'){
          steps{
            script{
              sh'docker build -t boardease-backend:${IMAGE_TAG} -f backend/Dockerfile ./backend'
            }
          }
        }
        stage('Build Frontend Image'){
          steps{
            script{
              sh'docker build -t boardease-frontend:${IMAGE_TAG} -f frontend/Dockerfile ./frontend'
            }
          }
        }
      }
    }
  }
}