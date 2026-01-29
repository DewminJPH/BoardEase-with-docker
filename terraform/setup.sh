#!/bin/bash

# 1. Install Docker & Docker Compose
sudo apt-get update -y
sudo apt-get install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# 2. Setup App Directory
mkdir -p /home/ubuntu/app
cd /home/ubuntu/app

# 3. Create Production docker-compose.yml
# REPLACE 'yourusername' WITH YOUR REAL DOCKER HUB USERNAME BELOW
cat <<EOF > docker-compose.yml
version: "3.8"

services:
  frontend:
    image: himanshadewmin/boardease-frontend:latest
    container_name: frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:5000
    depends_on:
      - backend

  backend:
    image: himanshadewmin/boardease-backend:latest
    container_name: backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/boardease
      - PORT=5000
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
EOF

# 4. Pull Images & Start App
sleep 10
sudo docker-compose pull
sudo docker-compose up -d