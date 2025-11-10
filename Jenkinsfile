pipeline{
  agent any // operating system that pipeline will run on

  environment{
    IMAGE_TAG = "${BUILD_NUMBER}"
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
              sh'docker build -t boardease-backend:${IMAGE_TAG} -f backend/Dockerfile .'
            }
          }
        }
        stage('Build Frontend Image'){
          steps{
            script{
              sh'docker build -t boardease-frontend:${IMAGE_TAG} -f frontend/Dockerfile .'
            }
          }
        }
        stage('Build Database Image'){
          steps{
            script{
              sh'docker build -t boardease-mongo:${IMAGE_TAG} -f mongo/Dockerfile .'
            }
          }
        } 
      }
    }
  }
}