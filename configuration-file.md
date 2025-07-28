# 🛠️ AWS 3-Tier Deployment Guide: Student Management System

## 🖥️ Configurations in Web-Tier EC2 (Apache)
**Instance**: Ubuntu (t2.micro)

### Install Apache Server
```bash
sudo apt update
sudo apt install apache2 -y
sudo systemctl start apache2
sudo systemctl enable apache2
```

### Place Frontend Files
```bash
cd /var/www/html
sudo rm index.html
```

### Configure Apache for Reverse Proxy
```bash
sudo vi /etc/apache2/sites-available/000-default.conf
```

Paste this inside the config:
```apache
ProxyPass "/register" "http://internal-apptier-internal-lb-1586369918.eu-north-1.elb.amazonaws.com/register"
ProxyPassReverse "/register" "http://internal-apptier-internal-lb-1586369918.eu-north-1.elb.amazonaws.com/register"

ProxyPass "/students" "http://internal-apptier-internal-lb-1586369918.eu-north-1.elb.amazonaws.com/students"
ProxyPassReverse "/students" "http://internal-apptier-internal-lb-1586369918.eu-north-1.elb.amazonaws.com/students"
```

### Enable Proxy Modules and Restart Apache
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
```

---

## ⚙️ Configurations in App-Tier EC2 (Flask + Gunicorn)
```bash
mkdir student-management-system && cd student-management-system
sudo vi app.py      # Paste your Flask code
```

### Install MySQL Client and Create DB
```bash
sudo apt update
sudo apt install mysql-client -y
mysql -h database-1.cdq2ua0e6tct.eu-north-1.rds.amazonaws.com -u admin -p
```

Run in MySQL prompt:
```sql
CREATE DATABASE student_db;
USE student_db;
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  marks INT
);
EXIT;
```

### Update Flask DB Connection
```python
conn = pymysql.connect(
    host='database-1.cdq2ua0e6tct.eu-north-1.rds.amazonaws.com',
    user='admin',
    password='admin@123',
    db='student_db',
    cursorclass=pymysql.cursors.DictCursor
)
```

### Install Dependencies
```bash
sudo apt update
sudo apt install python3-pip
pip3 install flask pymysql flask-cors
sudo apt install gunicorn nginx -y
```

### Setup Gunicorn Systemd Service
```bash
sudo vi /etc/systemd/system/studentapp.service
```

Paste:
```ini
[Unit]
Description=Gunicorn instance to serve student app
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/student-management-system
ExecStart=/usr/bin/gunicorn --workers 3 --bind 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable studentapp
sudo systemctl start studentapp
sudo systemctl status studentapp
```

---

## 🌐 Configure Nginx (Optional Reverse Proxy)
```bash
sudo vi /etc/nginx/sites-available/studentapp
```

Paste:
```nginx
server {
    listen 80;
    server_name _;

    location /register {
        proxy_pass http://127.0.0.1:5000/register;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /students {
        proxy_pass http://127.0.0.1:5000/students;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/studentapp /etc/nginx/sites-enabled
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
sudo nginx -t
```

---

## 🔐 Security Groups Setup

| Tier                        | Protocol | Port | Source                  |
|-----------------------------|----------|------|--------------------------|
| Internet-Facing ALB         | TCP      | 80   | 0.0.0.0/0                |
| Web Tier EC2 (Apache)       | TCP      | 80   | internet-facing-lb-sg    |
| Internal ALB                | TCP      | 80   | web-tier-sg              |
| App Tier EC2 (Flask/Gunicorn)| TCP     | 5000 | internal-lb-sg           |
| RDS (MySQL)                 | TCP      | 3306 | app-tier-sg              |

---

## 🎯 Create Target Groups and Load Balancers

### Internal Load Balancer (App Tier)
- **Target Group Name**: `app-tier-target-group`
- **Port**: 5000
- **Target Type**: Instances

### External Load Balancer (Web Tier)
- **Target Group Name**: `web-tier-target-group`
- **Port**: 80
- **Target Type**: Instances

---

## 📈 Create Auto Scaling Groups

### App Tier
- **Name**: `apptier-asg`
- **Launch Template**: `apptier-launch-template`
- **Subnets**: Private
- **Target Group**: `app-tier-target-group`

### Web Tier
- **Name**: `webtier-asg`
- **Launch Template**: `webtier-launch-template`
- **Subnets**: Public
- **Target Group**: `web-tier-target-group`

---

## 🌐 Route53 + SSL with ACM

### 1. Request SSL Certificate
- Go to **AWS ACM**
- Region: same as ALB
- Choose: Public Certificate
- Domain: `testdemo.click`
- Validation: DNS

### 2. Validate in GoDaddy
- Copy CNAME record from ACM to GoDaddy DNS settings
- Wait until ACM shows **"Issued"**

### 3. Attach SSL to Load Balancer
- Go to **EC2 → Load Balancers**
- Select **Internet-facing ALB**
- Add HTTPS Listener (Port 443)
- Choose the ACM certificate
- Forward to `web-tier-target-group`

✅ Visit: [https://testdemo.click](https://testdemo.click)

<img width="496" height="250" alt="image" src="https://github.com/user-attachments/assets/49dba372-36ef-4b15-bdc9-ae26ddd7d04d" />
