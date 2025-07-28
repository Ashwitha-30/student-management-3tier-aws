
## 🚀 Deployment Steps

1. Launch **Web Tier EC2**
   - Apache server, place frontend files
   - Enable reverse proxy to App Tier

2. Launch **App Tier EC2**
   - Flask App + Gunicorn + Systemd service
   - Connect to RDS DB

3. Create:
   - Target Groups for each tier
   - Load Balancers (internal + external)
   - Auto Scaling Groups

4. Setup:
   - RDS DB
   - NAT Gateway
   - ACM Certificate + Route53 + GoDaddy DNS

## 🔐 Security Groups Summary

| Tier              | Port | Source                    |
|-------------------|------|----------------------------|
| Web Tier          | 80   | 0.0.0.0/0 (IF-LB)         |
| App Tier          | 5000 | Web Tier (ILB)            |
| RDS               | 3306 | App Tier only             |

## 🌐 Live Demo

🔗 https://testdemo.click  
*(Hosted on AWS with Route53 and ACM certificate)*

## 📷 Screenshots

*(Add screenshots of your app, AWS console, RDS setup, etc.)*



