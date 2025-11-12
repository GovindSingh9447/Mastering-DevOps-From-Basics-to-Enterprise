# 📦 Complete Docker Compose Notes

Everything you need to learn and master **Docker Compose** — from basics to real-world multi-container applications.

---

## 📑 Table of Contents

1. [What is Docker Compose?](#1-what-is-docker-compose)
2. [Why Use Docker Compose?](#2-why-use-docker-compose)
3. [Docker Compose File Structure](#3-docker-compose-file-structure)
4. [Important Docker Compose Keywords](#4-important-docker-compose-keywords)
5. [Docker Compose Examples](#5-docker-compose-examples)
6. [Docker Compose Commands](#6-docker-compose-commands)
7. [Real-World Docker Compose Projects](#7-real-world-docker-compose-projects)
8. [Docker Compose Best Practices](#8-docker-compose-best-practices)
9. [Docker Compose vs Docker Swarm vs Kubernetes](#9-docker-compose-vs-docker-swarm-vs-kubernetes)
10. [Conclusion](#10-conclusion)

---

## 1. What is Docker Compose?

- **Docker Compose** is a tool for defining and running **multi-container Docker applications**.
- You use a **YAML file** (`docker-compose.yml`) to configure your application's services.
- With a single command, you can create and start all the services from your configuration.

📌 **Key Idea**: Instead of running multiple `docker run` commands, define everything in one file and run `docker-compose up`.

---

## 2. Why Use Docker Compose?

- 🚀 **Simplified Multi-Container Setup**: Run multiple containers with one command
- 📝 **Configuration as Code**: Define everything in `docker-compose.yml`
- 🔗 **Automatic Networking**: Containers can communicate using service names
- 💾 **Volume Management**: Easy persistent storage configuration
- 🔄 **Environment Variables**: Centralized configuration
- 🛠️ **Development Workflow**: Perfect for local development and testing
- 📦 **Production Ready**: Can be used in production (with caution)

---

## 3. Docker Compose File Structure

A typical `docker-compose.yml` file structure:

```yaml
version: '3.8' # Compose file format version

services: # Define your services (containers)
  service1: # Service name
    image: ... # or build: ...
    ports: ...
    environment: ...
    volumes: ...
    networks: ...
    depends_on: ...

volumes: # Named volumes
  volume1: ...

networks: # Custom networks
  network1: ...
```

---

## 4. Important Docker Compose Keywords

| Keyword       | Purpose                          | Example                                   |
| ------------- | -------------------------------- | ----------------------------------------- |
| `version`     | Compose file format version      | `version: '3.8'`                          |
| `services`    | Define containers/services       | `services: web: ...`                      |
| `image`       | Use pre-built image              | `image: nginx:latest`                     |
| `build`       | Build image from Dockerfile      | `build: ./app` or `build: context: ./app` |
| `ports`       | Port mapping (host:container)    | `ports: - "8080:80"`                      |
| `environment` | Environment variables            | `environment: - DEBUG=true`               |
| `env_file`    | Load env vars from file          | `env_file: - .env`                        |
| `volumes`     | Mount volumes                    | `volumes: - ./data:/app/data`             |
| `networks`    | Attach to networks               | `networks: - mynetwork`                   |
| `depends_on`  | Service dependencies             | `depends_on: - db`                        |
| `restart`     | Restart policy                   | `restart: always`                         |
| `command`     | Override default command         | `command: python app.py`                  |
| `entrypoint`  | Override entrypoint              | `entrypoint: /bin/sh`                     |
| `working_dir` | Working directory                | `working_dir: /app`                       |
| `user`        | Run as user                      | `user: "1000:1000"`                       |
| `healthcheck` | Health check configuration       | `healthcheck: test: ["CMD", "curl", ...]` |
| `deploy`      | Deployment configuration (Swarm) | `deploy: replicas: 3`                     |

---

## 5. Docker Compose Examples

### Example 1: Simple Web App + Database

```yaml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - '8080:80'
    volumes:
      - ./html:/usr/share/nginx/html
    depends_on:
      - db
    networks:
      - app-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: myapp
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppass
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

### Example 2: Multi-Service Application

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - '3000:3000'
    environment:
      - REACT_APP_API_URL=http://backend:5000
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    build: ./backend
    ports:
      - '5000:5000'
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

### Example 3: With Environment File

`.env` file:

```env
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=mydb
DEBUG=true
```

`docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - '5000:5000'
    env_file:
      - .env
    environment:
      - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    env_file:
      - .env
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

---

## 6. Docker Compose Commands

```bash
# Start all services
docker-compose up

# Start in detached mode (background)
docker-compose up -d

# Build and start
docker-compose up --build

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs web

# Follow logs (like tail -f)
docker-compose logs -f

# Execute command in running container
docker-compose exec web bash

# List running services
docker-compose ps

# Start specific service
docker-compose up web

# Stop specific service
docker-compose stop web

# Restart services
docker-compose restart

# Scale services
docker-compose up --scale web=3

# Validate compose file
docker-compose config

# Pull images
docker-compose pull

# Build images
docker-compose build

# Remove stopped containers
docker-compose rm
```

---

## 7. Real-World Docker Compose Projects

### Project 1: WordPress + MySQL

```yaml
version: '3.8'

services:
  wordpress:
    image: wordpress:latest
    ports:
      - '8080:80'
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - wordpress-data:/var/www/html
    depends_on:
      - db
    networks:
      - wp-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_ROOT_PASSWORD: rootpassword
    volumes:
      - db-data:/var/lib/mysql
    networks:
      - wp-network

volumes:
  wordpress-data:
  db-data:

networks:
  wp-network:
    driver: bridge
```

**Usage:**

```bash
docker-compose up -d
# Open http://localhost:8080
```

### Project 2: LAMP Stack (Linux + Apache + MySQL + PHP)

```yaml
version: '3.8'

services:
  web:
    build: ./php-apache
    ports:
      - '80:80'
    volumes:
      - ./src:/var/www/html
    depends_on:
      - db
    networks:
      - lamp-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: myapp
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppass
    volumes:
      - db-data:/var/lib/mysql
    ports:
      - '3306:3306'
    networks:
      - lamp-network

  phpmyadmin:
    image: phpmyadmin:latest
    ports:
      - '8080:80'
    environment:
      PMA_HOST: db
      PMA_USER: root
      PMA_PASSWORD: rootpass
    depends_on:
      - db
    networks:
      - lamp-network

volumes:
  db-data:

networks:
  lamp-network:
    driver: bridge
```

### Project 3: Microservices Application (Frontend + Backend + Database + Cache)

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - '5000:5000'
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      - db
      - redis
    networks:
      - app-network

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data
    command: redis-server --appendonly yes
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

### Project 4: Flask + PostgreSQL + Redis

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - '5000:5000'
    environment:
      - FLASK_APP=app.py
      - FLASK_ENV=development
      - DATABASE_URL=postgresql://flaskuser:flaskpass@db:5432/flaskdb
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - .:/app
    depends_on:
      - db
      - redis
    networks:
      - flask-network
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: flaskuser
      POSTGRES_PASSWORD: flaskpass
      POSTGRES_DB: flaskdb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - flask-network
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U flaskuser']
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis-data:/data
    networks:
      - flask-network
    command: redis-server --appendonly yes
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 3s
      retries: 5

volumes:
  postgres-data:
  redis-data:

networks:
  flask-network:
    driver: bridge
```

**Dockerfile for Flask app:**

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["flask", "run", "--host", "0.0.0.0"]
```

---

## 8. Docker Compose Best Practices

1. ✅ **Use Named Volumes** for persistent data
2. ✅ **Use Environment Files** (`.env`) for sensitive data
3. ✅ **Define Health Checks** for critical services
4. ✅ **Use Depends_on** for service dependencies
5. ✅ **Create Custom Networks** for isolation
6. ✅ **Use Restart Policies** (`always`, `unless-stopped`)
7. ✅ **Version Your Compose Files** (use `version: '3.8'`)
8. ✅ **Use Multi-Stage Builds** in Dockerfiles
9. ✅ **Optimize Layer Caching** (copy requirements first)
10. ✅ **Use `.dockerignore`** to exclude unnecessary files

---

## 9. Docker Compose vs Docker Swarm vs Kubernetes

| Feature            | Docker Compose | Docker Swarm | Kubernetes |
| ------------------ | -------------- | ------------ | ---------- |
| **Use Case**       | Local dev      | Small prod   | Large prod |
| **Orchestration**  | Single host    | Multi-host   | Multi-host |
| **Scaling**        | Manual         | Automatic    | Automatic  |
| **Load Balancing** | Limited        | Built-in     | Built-in   |
| **Complexity**     | Low            | Medium       | High       |
| **Learning Curve** | Easy           | Moderate     | Steep      |

📌 **Recommendation**: Use **Docker Compose** for development, **Kubernetes** for production.

---

## 10. Conclusion

- **Docker Compose** simplifies multi-container Docker applications.
- Define all services in a single `docker-compose.yml` file.
- Perfect for **local development** and **testing**.
- Can be used in **production** with proper configuration.
- Learn: **services, volumes, networks, environment variables, health checks**.
- Practice with **real-world projects** → ready for DevOps & production.

---

👉 _This documentation was prepared by Govind Singh for in-depth understanding and real-world implementation of Docker Compose in DevOps environments._
