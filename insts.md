# Bibliotheca Project – Full Technical Documentation

## 1. Project Overview

Bibliotheca is a full‑stack web application built with Next.js and deployed using Docker containers behind an NGINX reverse proxy. The application uses SQLite as its database and runs on a Debian Linux server.

---

# 2. Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* TailwindCSS

## Backend

* Next.js Server (App Router / API routes)
* Node.js

## Database

* SQLite
* better-sqlite3

## Infrastructure

* Docker
* Docker Compose
* NGINX Reverse Proxy
* Linux (Debian)

## Dev Tools

* Git
* npm
* Node.js

---

# 3. Server Environment

## Operating System

Debian Linux

Check OS

```bash
cat /etc/os-release
```

## Install Base Packages

```bash
sudo apt update
sudo apt upgrade -y
```

Install tools

```bash
sudo apt install git curl build-essential -y
```

---

# 4. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

sudo apt install nodejs -y
```

Verify

```bash
node -v
npm -v
```

---

# 5. Install Docker

```bash
sudo apt install docker.io -y

sudo systemctl enable docker
sudo systemctl start docker
```

Verify

```bash
docker --version
```

---

# 6. Install Docker Compose

```bash
sudo apt install docker-compose -y
```

Verify

```bash
docker compose version
```

---

# 7. Project Folder Structure

```
bibliothecav3/

src/

public/

.next/

Dockerfile

docker-compose.yml

nginx.conf

database.sqlite
```

---

# 8. Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
```

---

# 9. Docker Compose

```yaml
version: "3"

services:

  bibliotheca:

    build: .

    container_name: bibliotheca

    ports:

      - "3000:3000"

    volumes:

      - ./database.sqlite:/app/database.sqlite


  nginx-proxy:

    image: nginx

    container_name: nginx-proxy

    ports:

      - "80:80"

      - "443:443"

    volumes:

      - ./nginx.conf:/etc/nginx/conf.d/default.conf

      - ./certs:/etc/nginx/certs
```

---

# 10. NGINX Configuration

```nginx
server {

    listen 80;

    server_name bibliotheca.local;



    location / {

        proxy_pass http://bibliotheca:3000;

        proxy_set_header Host $host;

        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    }

}
```

---

# 11. Running the Server

Navigate to project folder

```bash
cd ~/sites/bibliothecav3
```

Build containers

```bash
docker compose build
```

Start containers

```bash
docker compose up -d
```

Check running containers

```bash
docker ps
```

Check logs

```bash
docker logs bibliotheca


docker logs nginx-proxy
```

Stop containers

```bash
docker compose down
```

---

# 12. Database

Database file

```
database.sqlite
```

Mounted into container

```
/app/database.sqlite
```

---

# 13. Verify Application

Check website

```
http://localhost
```

or

```
https://bibliotheca.local
```

---

# 14. Screenshots Section

## Website

Take screenshots of:

* Home page
* Login page
* Signup page
* Dashboard

Tools:

Windows

```
Win + Shift + S
```

Linux

```
gnome-screenshot
```

Mac

```
Cmd + Shift + 4
```

---

# 15. Required Server Screenshots

## Docker

```
docker ps
```

## Running containers

```
docker logs bibliotheca
```

## NGINX logs

```
docker logs nginx-proxy
```

## Project folder

```
tree
```

## Database file

```
ls -lh database.sqlite
```

## NGINX config

Screenshot:

```
nginx.conf
```

## Docker compose

Screenshot:

```
docker-compose.yml
```

---

# 16. Proof of Real‑Time Deployment

Include screenshots showing:

* Running containers
* Server terminal
* Website working
* HTTPS lock icon
* Application pages

---

# 17. Recommended Screenshot Structure

```
docs/

screenshots/

server/

docker/

nginx/

website/
```

Example

```
screenshots/server/docker_ps.png

screenshots/server/docker_logs.png

screenshots/nginx/nginx_config.png

screenshots/website/homepage.png

screenshots/website/signup.png
```

---

# 18. Commands Summary

Build

```
docker compose build
```

Run

```
docker compose up -d
```

Stop

```
docker compose down
```

Logs

```
docker logs bibliotheca
```

---

# 19. Author

Project: Bibliotheca

Stack: Next.js + Docker + NGINX + SQLite

Deployment: Debian Linux Server
