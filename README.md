# student-management-3tier-aws
# 🎓 AWS 3-Tier Student Management System

This project is a production-grade **student management system** deployed using **AWS 3-tier architecture**. It includes an Apache frontend, Flask API backend with Gunicorn, and MySQL RDS database.

## 🏗️ Architecture

- **VPC** with public & private subnets
- **Internet-facing Load Balancer** for web tier
- **Internal Load Balancer** for app tier
- **Auto Scaling Groups** for web & app tiers
- **RDS MySQL** for database
- **NAT Gateway**, **Route Tables**, **Security Groups**
- **ACM SSL** + **Route53** + **GoDaddy DNS**



## 💻 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Apache
- **Backend:** Flask + Gunicorn (Python)
- **Database:** MySQL (RDS)
- **DevOps:** AWS EC2, ALB, ASG, VPC, Route53, ACM

## 🧪 Features

- Register student (Name, Email, Marks)
- View all students in a table
- Connected with RDS DB
- Highly Available using ALB + ASG



