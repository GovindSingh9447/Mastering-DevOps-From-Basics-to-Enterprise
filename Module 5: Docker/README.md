---
# 📘 Complete Docker Notes

Comprehensive Docker notes for students — everything you need in **one place** to learn and master Docker.
---

## 📑 Table of Contents

1. [Introduction to Docker](#1-introduction-to-docker)
2. [Why Use Docker?](#2-why-use-docker)
3. [Docker vs Virtual Machines](#3-docker-vs-virtual-machines)
4. [Docker Architecture](#4-docker-architecture)
5. [Docker Images](#5-docker-images)
6. [Docker Containers](#6-docker-containers)
7. [Dockerfile – Writing Custom Images](#7-dockerfile--writing-custom-images)
   - [Dockerfile Keywords Explained](#dockerfile-keywords-explained)
   - [Sample Dockerfile](#sample-dockerfile)
8. [Docker Volumes (Persistent Storage)](#8-docker-volumes-persistent-storage)
9. [Docker Networking](#9-docker-networking)
10. [Important Docker Commands](#10-important-docker-commands)
11. [Real-World Docker Projects](#11-real-world-docker-projects)
    - [Project 1: Containerizing a Python Flask App](#project-1-containerizing-a-python-flask-app)
    - [Project 2: Containerizing a Nodejs App](#project-2-containerizing-a-nodejs-app)
12. [Conclusion](#12-conclusion)

---

## 1. Introduction to Docker

- Docker is an **open-source platform** that packages applications into **containers**.
- A **container** is like a **lightweight box** that holds everything your app needs:

  - Source code
  - Dependencies
  - Configuration
  - Environment

📌 **Key idea**: “If it runs on my machine, it will run anywhere.”

---

## 2. Why Use Docker?

Think about the **classic developer problem**:

- Works on your machine ✅
- Fails on someone else’s ❌

Docker solves this by making apps **portable**.

### Benefits:

- 🚀 **Faster deployments** (containers start in seconds).
- 🏗️ **Consistency** (same app everywhere).
- 💾 **Lightweight** (no full OS like a VM).
- ⚡ **Scalability** (run multiple containers easily).
- 🔗 **DevOps friendly** (great with CI/CD).

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

- VM = renting a whole **house**.
- Docker = renting a **room** in a shared house.

---

## 4. Docker Architecture

![Docker Architecture](https://docs.docker.com/assets/images/architecture.svg)

### Components:

1. **Docker Client** → where you run commands (`docker run`, `docker build`).
2. **Docker Daemon (dockerd)** → does the actual work of building/running containers.
3. **Docker Registry** → where images are stored (default = Docker Hub).
4. **Docker Objects**:

   - **Images** → blueprint.
   - **Containers** → running instances.
   - **Volumes** → persistent storage.
   - **Networks** → connect containers.

---

## 5. Docker Images

- An **image** is a **blueprint** for a container.
- Built in **layers** → each Dockerfile instruction creates a new layer.
- Stored in Docker Hub or private registries.

📌 **Example**:

```bash
docker pull nginx     # Download Nginx image
docker images         # List images
```

---

## 6. Docker Containers

- A **container** = a **running instance** of an image.
- They are:

  - Isolated
  - Lightweight
  - Portable

📌 **Example**:

```bash
docker run -d -p 8080:80 nginx
```

- Runs Nginx in detached mode.
- Maps host port 8080 → container port 80.
- Open `http://localhost:8080` in browser.

---

## 7. Dockerfile – Writing Custom Images

A **Dockerfile** is a text file with instructions to build an image.

### Dockerfile Keywords Explained

| Keyword      | Purpose                                    | Example                               |
| ------------ | ------------------------------------------ | ------------------------------------- |
| `FROM`       | Base image                                 | `FROM python:3.9`                     |
| `WORKDIR`    | Set working directory                      | `WORKDIR /app`                        |
| `COPY`       | Copy files into image                      | `COPY . .`                            |
| `ADD`        | Like COPY, but also handles URLs/tar files | `ADD app.tar.gz /app/`                |
| `RUN`        | Execute command (during build)             | `RUN pip install -r requirements.txt` |
| `CMD`        | Default command (container start)          | `CMD ["python", "app.py"]`            |
| `ENTRYPOINT` | Fixed command, can pass args               | `ENTRYPOINT ["python"]`               |
| `EXPOSE`     | Inform which port app uses                 | `EXPOSE 5000`                         |
| `ENV`        | Set environment variables                  | `ENV DEBUG=true`                      |
| `ARG`        | Build-time variable                        | `ARG VERSION=1.0`                     |
| `LABEL`      | Add metadata                               | `LABEL maintainer="you@example.com"`  |
| `VOLUME`     | Define mount point                         | `VOLUME /data`                        |
| `USER`       | Set user to run as                         | `USER appuser`                        |

---

### Sample Dockerfile

```dockerfile
# Base image
FROM python:3.9

# Metadata
LABEL maintainer="student@example.com"

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Expose port
EXPOSE 5000

# Environment variable
ENV DEBUG=true

# Run application
CMD ["python", "app.py"]
```

---

## 8. Docker Volumes (Persistent Storage)

- Container data is **temporary** → deleted when container stops.
- Use **volumes** to persist.

📌 **Types of volumes**:

- Named volumes
- Bind mounts
- tmpfs (in-memory)

📌 **Example**:

```bash
docker run -v mydata:/app/data nginx
docker volume ls
```

---

## 9. Docker Networking

- Containers can talk to each other via networks.

### Default Networks:

- `bridge` → default (container-to-container communication).
- `host` → shares host network.
- `none` → fully isolated.

📌 **Example**:

```bash
docker network create mynet
docker run -d --name db --network=mynet mysql
docker run -d --name app --network=mynet myapp
```

Now `app` can talk to `db` using its name (`db`).

---

## 10. Important Docker Commands

### 🔹 Container Management

```bash
docker run hello-world
docker ps
docker ps -a
docker stop <id>
docker start <id>
docker rm <id>
```

### 🔹 Image Management

```bash
docker images
docker pull ubuntu
docker rmi <image_id>
docker build -t myapp .
```

### 🔹 Volumes

```bash
docker volume ls
docker volume create mydata
```

### 🔹 Networks

```bash
docker network ls
docker network create mynet
```

---

## 11. Real-World Docker Projects

## 🔹 Project 1: Containerizing a Python Flask App

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

## 🔹 Project 2: Containerizing a Node.js App

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

## 12. Conclusion

- Docker makes apps **portable, consistent, and scalable**.
- Key pillars: **images, containers, networking, volumes, Dockerfile**.
- Once you master commands + Dockerfile, you can containerize almost any app.

---
