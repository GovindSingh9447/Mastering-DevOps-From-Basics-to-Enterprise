# 📘 Complete Docker Notes

Everything you need to learn and master **Docker** — from basics to real-world projects.

---

## 📑 Table of Contents

1. [Introduction to Docker](#1-introduction-to-docker)
2. [Why Use Docker?](#2-why-use-docker)
3. [Docker vs Virtual Machines](#3-docker-vs-virtual-machines)
4. [Docker Architecture](#4-docker-architecture)
5. [Docker Images](#5-docker-images)
6. [Docker Containers](#6-docker-containers)
7. [Dockerfile – Writing Custom Images](#7-dockerfile--writing-custom-images)

   - [Important Dockerfile Keywords](#important-dockerfile-keywords)
   - [Sample Dockerfile](#sample-dockerfile)
   - [Writing Optimized Dockerfiles](#writing-optimized-dockerfiles)
   - [ADD vs COPY & CMD vs ENTRYPOINT](#add-vs-copy--cmd-vs-entrypoint)
   - [Multi-Stage Dockerfiles](#multi-stage-dockerfiles)

8. [Docker Volumes (Persistent Storage)](#8-docker-volumes-persistent-storage)
9. [Docker Networking](#9-docker-networking)
10. [Important Docker Commands](#10-important-docker-commands)
11. [Building & Pushing Docker Images](#11-building--pushing-docker-images)

    - [Pushing to DockerHub](#pushing-to-dockerhub)
    - [Pushing to AWS ECR](#pushing-to-aws-ecr)

12. [Real-World Docker Projects](#12-real-world-docker-projects)

    - [Project 1: Python Flask App](#project-1-python-flask-app)
    - [Project 2: Node.js App](#project-2-nodejs-app)

13. [Conclusion](#13-conclusion)

---

## 1. Introduction to Docker

- Docker is an **open-source platform** that packages applications into **containers**.
- A **container** is like a **lightweight box** that holds everything your app needs (code + dependencies + environment).

📌 **Key idea**: “If it runs on my machine, it will run anywhere.”

---

## 2. Why Use Docker?

- 🚀 **Fast deployments** (seconds, not minutes like VMs)
- 🏗️ **Consistency** (same app everywhere)
- 💾 **Lightweight** (no full OS)
- ⚡ **Scalable** (run 10s or 100s easily)
- 🔗 **DevOps friendly** (great with CI/CD, Kubernetes)

---

## 3. Docker vs Virtual Machines

| Feature     | Docker (Containers) | Virtual Machines             |
| ----------- | ------------------- | ---------------------------- |
| Isolation   | Process-level       | Full OS-level                |
| Size        | MBs (lightweight)   | GBs (heavy)                  |
| Performance | Near-native         | Slower (hypervisor overhead) |
| Boot Time   | Seconds             | Minutes                      |
| Portability | Very high           | Limited                      |

📌 **Analogy**:

- VM = renting a whole **house**
- Docker = renting a **room** in a shared house

---

## 4. Docker Architecture

![Docker Architecture](https://docs.docker.com/assets/images/architecture.svg)

### Components:

1. **Docker Client (CLI)** → runs commands (`docker run`, `docker build`)
2. **Docker Daemon (`dockerd`)** → builds & runs containers
3. **Docker Registry** → stores images (e.g., Docker Hub, AWS ECR)
4. **Docker Objects**:

   - **Images** (blueprints)
   - **Containers** (running instances)
   - **Volumes** (persistent storage)
   - **Networks** (container communication)

---

## 5. Docker Images

- **Blueprint** for containers.
- Built in **layers** (each Dockerfile instruction = new layer).
- Stored in **Docker Hub** or private registries.

📌 Example:

```bash
docker pull nginx
docker images
```

---

## 6. Docker Containers

- **Running instance** of an image.
- Isolated, portable, lightweight.

📌 Example:

```bash
docker run -d -p 8080:80 nginx
```

Open → `http://localhost:8080`

---

## 7. Dockerfile – Writing Custom Images

### Important Dockerfile Keywords

| Keyword      | Purpose                  | Example                               |
| ------------ | ------------------------ | ------------------------------------- |
| `FROM`       | Base image               | `FROM python:3.9`                     |
| `WORKDIR`    | Working directory        | `WORKDIR /app`                        |
| `COPY`       | Copy files               | `COPY . .`                            |
| `ADD`        | Copy + URLs/tar extract  | `ADD app.tar.gz /app/`                |
| `RUN`        | Run command (build time) | `RUN pip install -r requirements.txt` |
| `CMD`        | Default command          | `CMD ["python", "app.py"]`            |
| `ENTRYPOINT` | Fixed command + args     | `ENTRYPOINT ["python"]`               |
| `EXPOSE`     | Ports                    | `EXPOSE 5000`                         |
| `ENV`        | Environment vars         | `ENV DEBUG=true`                      |
| `ARG`        | Build-time vars          | `ARG VERSION=1.0`                     |
| `LABEL`      | Metadata                 | `LABEL maintainer="you@example.com"`  |
| `VOLUME`     | Mount point              | `VOLUME /data`                        |
| `USER`       | User to run              | `USER appuser`                        |

---

### Sample Dockerfile

```dockerfile
FROM python:3.9-slim
LABEL maintainer="student@example.com"
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

---

### Writing Optimized Dockerfiles

- ✅ Use **slim/alpine** images (smaller, faster)
- ✅ Chain RUN commands to reduce layers
- ✅ Use `.dockerignore` to avoid copying junk
- ✅ Multi-stage builds for production

---

### ADD vs COPY & CMD vs ENTRYPOINT

- `COPY` = simple copy (preferred)

- `ADD` = copy + remote URLs + tar extract

- `CMD` = default command (overridable)

- `ENTRYPOINT` = fixed command (not easily overridden)

Example:

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

---

### Multi-Stage Dockerfiles

Used to separate **build stage** from **runtime stage** → smaller, secure images.

Example (Go app):

```dockerfile
FROM golang:1.20 AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

---

## 8. Docker Volumes (Persistent Storage)

- By default, container data = **temporary**.
- Volumes make data **persistent**.

📌 Example:

```bash
docker run -v mydata:/app/data nginx
docker volume ls
```

---

## 9. Docker Networking

Default networks:

- `bridge` (default)
- `host` (share host network)
- `none` (isolated)

📌 Example:

```bash
docker network create mynet
docker run -d --name db --network=mynet mysql
docker run -d --name app --network=mynet myapp
```

Now app → db communication works via `db`.

---

## 10. Important Docker Commands

```bash
docker build -t myapp .         # Build image
docker run -d -p 8080:80 myapp  # Run container
docker ps -a                    # List containers
docker exec -it <id> bash       # Access shell
docker logs <id>                # View logs
docker stop <id>                # Stop
docker rm <id>                  # Remove container
docker rmi <id>                 # Remove image
```

---

## 11. Building & Pushing Docker Images

### Pushing to DockerHub

```bash
docker login
docker tag myapp user/myapp:latest
docker push user/myapp:latest
```

### Pushing to AWS ECR

```bash
aws ecr get-login-password --region us-east-1 \
 | docker login --username AWS \
 --password-stdin <account_id>.dkr.ecr.us-east-1.amazonaws.com

docker tag myapp <repo_uri>:latest
docker push <repo_uri>:latest
```

---

## 12. Real-World Docker Projects

### 🔹 Project 1: Python Flask App

### 1. Project Structure

```
flask-app/
 ├── app.py
 ├── requirements.txt
 └── Dockerfile
```

### 2. Flask App (`app.py`)

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Docker from Flask!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### 3. Dependencies (`requirements.txt`)

```
flask==2.0.3
```

### 4. Dockerfile

```dockerfile
# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Expose port
EXPOSE 5000

# Run the app
CMD ["python", "app.py"]
```

### 5. Build & Run

```bash
cd flask-app
docker build -t flask-docker .
docker run -d -p 5000:5000 flask-docker
```

➡️ Open browser: `http://localhost:5000` → **Hello, Docker from Flask!**

---

### 🔹 Project 2: Node.js App

### 1. Project Structure

```
node-app/
 ├── server.js
 ├── package.json
 └── Dockerfile
```

### 2. Node.js App (`server.js`)

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Docker from Node.js!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3. Dependencies (`package.json`)

```json
{
  "name": "node-docker-app",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### 4. Dockerfile

```dockerfile
# Use official Node.js image
FROM node:16

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "server.js"]
```

### 5. Build & Run

```bash
cd node-app
docker build -t node-docker .
docker run -d -p 3000:3000 node-docker
```

➡️ Open browser: `http://localhost:3000` → **Hello, Docker from Node.js!**

---

💡 **Challenge**: Use **Docker Compose** to run Flask + Node + Database together.

---

## 13. Conclusion

- Docker makes apps **portable, consistent, scalable**.
- Learn: **images, containers, networking, volumes, Dockerfiles**.
- Practice with **projects + pushing images** → ready for DevOps & real-world.

---

👉 _This documentation was prepared by Govind Singh for in-depth understanding and real-world implementation of Docker in DevOps environments._
