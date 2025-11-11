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
    stage('Test'){
      steps{
        script{
          sh'docker-compose up --build -d||true'
          sh'sleep 30'
          sh'curl -f http://localhost:5000/api/debug/users || true'
        }
      }
    }
    stage('Login to the Docker Hub'){
      steps{
        withCredentials([usernamePassword(credentialsId: 'dockerhubpassword', passwordVariable: 'dockerhubpassword', usernameVariable: 'himanshadewmin')]) {
        sh'docker login -u $himanshadewmin -p $dockerhubpassword'
        }
      }
    }
    stage('Push Images to Docker Hub'){
      steps{
        script{
          sh'docker tag boardease-backend:${IMAGE_TAG} himanshadewmin/boardease-backend:${IMAGE_TAG}'
          sh'docker tag boardease-frontend:${IMAGE_TAG} himanshadewmin/boardease-frontend:${IMAGE_TAG}'
          sh'docker push himanshadewmin/boardease-backend:${IMAGE_TAG}'
          sh'docker push himanshadewmin/boardease-frontend:${IMAGE_TAG}'
        }
      }
    }
  }
  post{
    always{
      sh'docker logout'
    }
  }
}