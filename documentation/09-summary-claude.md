# Bibliotheca — Deployment Context

## Project Overview

A full local deployment pipeline for **Bibliotheca** (bibliothecav3/bibliov4), a Next.js 16 + SQLite bookstore web app with:

- Shop catalog, individual book pages, user profiles, cart
- Admin dashboard with book upload, edit, ebook management
- Ebook reader (EPUB)
- Authentication with bcryptjs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend/Backend | Next.js 16.1.6 (App Router, TypeScript, Tailwind v4) |
| Database | SQLite via `better-sqlite3` |
| ORM | Raw SQL with server actions in `src/lib/actions.ts` |
| Auth | Cookie-based, `src/lib/auth.ts` |
| Build output | `output: 'standalone'` in `next.config.ts` |

---

## Infrastructure

| Component | Detail |
|---|---|
| Host machine | Windows (Hyper-V) |
| VM | Debian 12 (Bookworm), user `deploy` |
| VM IP | `172.26.162.241` ⚠️ currently dynamic — needs static IP fix |
| Containers | Docker Compose — `bibliotheca_app` and `nginx_proxy` |
| Reverse proxy | Nginx → proxies `myapp.local` to Next.js on port 3000 |
| Monitoring | Portainer CE at `http://172.26.162.241:9000` |
| CI/CD | GitHub Actions self-hosted runner on VM, triggers on push to `main` |
| Repo | `https://github.com/km-kurisu/bibliov4` |

---

## Docker Setup

### `docker-compose.yml` volumes

```yaml
volumes:
  - ./data:/app/data            # SQLite database
  - ./cache:/app/.next/cache    # Next.js image cache
  - ./ebooks:/app/public/ebooks # uploaded epub files
  - ./covers:/app/public/covers # uploaded book covers
```

### Container user

- User: `appuser`
- UID: `100`
- GID: `101` (appgroup)

### Host folder ownership

All volume folders must be owned by `100:101`:

```bash
sudo chown -R 100:101 ~/app/data ~/app/cache ~/app/ebooks ~/app/covers
```

### Dockerfile

Multi-stage build:
- **Stage 1**: Compiles with `python3 make g++` for `better-sqlite3` native bindings
- **Stage 2**: Production runner using `node:20-alpine`

---

## Key File Locations on VM

```
~/app/                          # project root
~/app/data/database.sqlite      # SQLite database (persists across rebuilds)
~/app/covers/                   # book cover images
~/app/ebooks/                   # epub files
~/app/cache/                    # Next.js cache
~/app/nginx/default.conf        # Nginx config
~/app/docker-compose.yml        # Docker Compose config
~/actions-runner/               # GitHub Actions self-hosted runner
```

---

## Database

| Setting | Value |
|---|---|
| Path inside container | `/app/data/database.sqlite` |
| Env var | `DATABASE_PATH=/app/data/database.sqlite` |
| Schema file | `src/lib/schema.sql` |
| Seed script | `scripts/seed-db.js` |

> ⚠️ The seed script **drops and recreates all tables**. Only run once on a fresh deploy.

### Tables

- `books`
- `book_keywords`
- `profiles`
- `user_library`
- `admin_users`
- `reviews`

### Run seed (first deploy only)

```bash
docker compose exec app node scripts/seed-db.js
```

### Migrate new columns

```bash
docker compose exec app node -e "
const Database = require('better-sqlite3');
const db = new Database('/app/data/database.sqlite');
db.exec('ALTER TABLE books ADD COLUMN new_column TEXT');
console.log('done');
"
```

---

## Windows Hosts File

Location: `C:\Windows\System32\drivers\etc\hosts`

```
172.26.162.241   myapp.local
172.26.162.241   portainer.local
```

> ⚠️ These need updating every time the VM restarts until static IP is configured.

---

## Known Issues and Fixes Applied

| Issue | Fix Applied |
|---|---|
| SQLite readonly error | Own volume folders with UID `100:101` |
| `better-sqlite3` native bindings | Compile inside alpine container with `python3 make g++` |
| Static page caching | Add `export const dynamic = 'force-dynamic'` to `src/app/page.tsx` and `src/app/shop/page.tsx` |
| Font 404 | `/fonts/` vs `/Fonts/` case sensitivity on Linux — **not yet fixed in code** |
| `.next/cache` permission | Mount `./cache:/app/.next/cache` as a volume |
| Admin login form type error | Cast with `action={loginAdmin as any}` |
| Missing DB columns | `ebook_url`, `ebook_format` added via `ALTER TABLE`; `reviews` table created manually |
| VM IP changes on restart | **Not yet fixed** — next step is setting a static IP on the VM |

---

## CI/CD Pipeline

GitHub Actions self-hosted runner installed at `~/actions-runner/` on the VM. Workflow file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Bibliotheca

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: self-hosted
    steps:
      - name: Pull latest code
        run: |
          cd ~/app
          git pull

      - name: Rebuild and restart containers
        run: |
          cd ~/app
          docker compose up -d --build

      - name: Clean up old images
        run: |
          docker image prune -f
```

---

## Normal Deployment Workflow

```powershell
# Windows — commit and push
git add .
git commit -m "your message"
git push
# GitHub Actions self-hosted runner auto deploys on the VM
```

### Manual deploy if needed

```bash
cd ~/app
git pull
docker compose up -d --build
```

---

## Adding New Writable Folders

If the app needs to write to a new folder, add it to `docker-compose.yml` volumes and create it on the host:

```bash
mkdir -p ~/app/newfolder
sudo chown -R 100:101 ~/app/newfolder
```

---
