
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
## VPC
<img width="940" height="376" alt="image" src="https://github.com/user-attachments/assets/499d2706-e63e-46a0-8be5-b30f94bd0614" />

## Subnets
<img width="940" height="376" alt="image" src="https://github.com/user-attachments/assets/a803617e-c74a-4f6a-b12e-030ccaab26c8" />

## IGW
<img width="940" height="369" alt="image" src="https://github.com/user-attachments/assets/93f9779a-80bb-47c9-8c16-3dfeedc0b4f0" />

## Route tables
<img width="940" height="369" alt="image" src="https://github.com/user-attachments/assets/3856919d-c889-4081-bad0-7efb1e7094b9" />

## NAT Gateway
<img width="940" height="313" alt="image" src="https://github.com/user-attachments/assets/c8293b44-0df0-45ef-8df2-bf408e9965b2" />

## Security groups
<img width="940" height="368" alt="image" src="https://github.com/user-attachments/assets/10b7e483-6ca8-4977-b1b8-5467ec8de2ff" />

## Creating backups-AMIs
<img width="940" height="289" alt="image" src="https://github.com/user-attachments/assets/7bd2045f-43a9-4597-82f5-7ba2927c63ca" />

## Launch templates
<img width="940" height="277" alt="image" src="https://github.com/user-attachments/assets/fe0ec4e4-b71e-45b4-a4af-587d705c0d74" />

## Target groups
<img width="940" height="309" alt="image" src="https://github.com/user-attachments/assets/3d0f2a1a-6a62-4bad-a741-e0dba4f0498e" />

## App-tier target group
<img width="940" height="256" alt="image" src="https://github.com/user-attachments/assets/5f7a3772-e2e6-44e3-b8c0-6930b358730b" />

## Web-tier target group
<img width="940" height="255" alt="image" src="https://github.com/user-attachments/assets/a5d96485-7f82-4ad3-9e92-609336c62a48" />

## Load balancers
<img width="940" height="309" alt="image" src="https://github.com/user-attachments/assets/de0bb756-68de-4ba7-8500-f9d700721571" />

## Auto scaling groups
<img width="940" height="306" alt="image" src="https://github.com/user-attachments/assets/79c3a543-b264-48e0-abe5-636fc38f5712" />

## Database subnet group
<img width="940" height="332" alt="image" src="https://github.com/user-attachments/assets/35222cd9-a282-4d05-a57e-a31a95e42099" />

## RDS
<img width="940" height="251" alt="image" src="https://github.com/user-attachments/assets/3e125ecb-ed01-4158-800b-86bd66e06051" />

## Route53 
<img width="940" height="252" alt="image" src="https://github.com/user-attachments/assets/79e1aebf-f35b-4a8c-b309-57efe0ba4b9d" />


## Route53 records
<img width="940" height="359" alt="image" src="https://github.com/user-attachments/assets/c7e710c0-8854-4a1c-92f8-8fa0e6172248" />

## Godaddy name servers
<img width="932" height="338" alt="image" src="https://github.com/user-attachments/assets/cbb74b94-de73-44ce-a5ce-f7e2edc9a3ca" />

## ACM
<img width="940" height="222" alt="image" src="https://github.com/user-attachments/assets/42df251a-98aa-4016-a6c3-51208c652b1a" />

## Final output
<img width="940" height="474" alt="image" src="https://github.com/user-attachments/assets/45acf025-0ddb-42f0-af01-1bbea64cd8d6" />


 












