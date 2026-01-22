provider "aws" {
  region = "us-east-1"
}

# 1. Get the latest Ubuntu Image
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# 2. Security Group (Firewall)
resource "aws_security_group" "boardease_sg" {
  name        = "boardease_sg"
  description = "Allow Web and SSH traffic"

  ingress { # SSH
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress { # Frontend Port
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress { # Backend Port
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress { # Internet Access
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 3. Create the Server
resource "aws_instance" "boardease_server" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"
  key_name      = "boardease-key" # <--- MUST MATCH YOUR AWS KEY PAIR NAME

  vpc_security_group_ids = [aws_security_group.boardease_sg.id]
  user_data              = file("setup.sh")

  tags = {
    Name = "BoardEase-Server"
  }
}

output "server_ip" {
  value = aws_instance.boardease_server.public_ip
}