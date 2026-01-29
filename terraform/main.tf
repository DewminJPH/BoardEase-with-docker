provider "aws" {
  region = "us-east-1"
}

# 1. Get the latest Ubuntu 22.04 Image AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]  # The company that makes Ubuntu

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# 2. Firewall Rules
resource "aws_security_group" "boardease_sg" {
  name        = "boardease_sg"
  description = "Allow Web and SSH traffic"

  # SSH (Port 22) - For you to log in
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Frontend (Port 3000) - For users to see the site
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend (Port 5000) - For the API
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound Rule - Allows server to download Docker images
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. Create the Server
resource "aws_instance" "boardease_server" {
  ami           = data.aws_ami.ubuntu.id  # Uses the dynamic ID found above
  instance_type = "t3.micro"              # Free tier 
  key_name      = "boardease-key"         

  vpc_security_group_ids = [aws_security_group.boardease_sg.id]
  
  # Inject the setup script
  user_data = file("setup.sh")

  tags = {
    Name = "BoardEase-Production"
  }
}

# 4. Output the Clickable URL
output "website_url" {
  value = "http://${aws_instance.boardease_server.public_ip}:3000"
}