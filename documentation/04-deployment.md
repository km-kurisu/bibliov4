# 04 - Deployment Architecture

## 1. Overview
Bibliotheca Modern is designed for high-availability, containerized deployment using **Docker** and **Nginx**.

---

## 2. Containerized Strategy
The application is split into two primary services:
1.  **Bibliotheca App**: The Next.js 15 application.
2.  **Nginx Proxy**: A high-performance reverse proxy for SSL termination and static asset serving.

```mermaid
graph LR
    Browser((Browser)) -->|Port 80/443| Nginx[Nginx Service]
    Nginx -->|Proxy Pass (3000)| App[Next.js Application]
    App -->|Volume Map| Data[(SQLite DB / Covers / Ebooks)]
```

---

## 3. Deployment Services

### 3.1 Docker Compose (`docker-compose.yml`)
- **Service: app**:
  - Image: Custom built from `./Dockerfile`.
  - Env: `NODE_ENV=production`, `DATABASE_PATH=/app/data/database.sqlite`.
  - Ports: Internal (3000).
- **Service: nginx**:
  - Image: `nginx:alpine`.
  - Mapping: `./nginx/default.conf` to `/etc/nginx/conf.d/default.conf`.
  - Ports: External (80) $\rightarrow$ Internal (80).

---

## 4. Persistence & Storage
To maintain data across container restarts, the project uses **Volume Mapping**:
- **SQLite DB**: `./data/database.sqlite` $\rightarrow$ `/app/data/database.sqlite`.
- **E-books/Covers**: Static files for newly uploaded books are stored natively in the mapped `/public` directories.

---

## 5. Deployment Checklist
1. **Prepare Host**: Install Docker and Docker Compose.
2. **Configure Nginx**: Update `./nginx/default.conf` with your domain and SSL paths (if applicable).
3. **Build & Up**: `docker-compose up --build -d`.
4. **Seed (First Run)**: Access the container (`docker exec -it bibliotheca_app sh`) and run `node scripts/seed-db.js`.
5. **Verify**: Ensure port 80 is forwarded to the Nginx service.

---
*Created for Bibliotheca Modern.*
