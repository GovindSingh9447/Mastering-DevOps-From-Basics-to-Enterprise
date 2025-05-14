## Table of Contents

1. [Docker Basics](#docker-basics)
2. [What is Docker & What Problem Does it Solve?](#what-is-docker--what-problem-does-it-solve)
3. [Docker Architecture](#docker-architecture)
4. [Docker Daemon and Docker CLI](#docker-daemon-and-docker-cli)
5. [Docker Image, Container, Dockerfile](#docker-image-container-dockerfile)
6. [Writing Optimized Dockerfiles](#writing-optimized-dockerfiles)
7. [Learning How to Write Dockerfiles](#learning-how-to-write-dockerfiles)
8. [Important Dockerfile Keywords](#important-dockerfile-keywords)
9. [Docker Commands](#docker-commands)
10. [Most Important Docker Commands](#most-important-docker-commands)
11. [ADD vs COPY & CMD vs ENTRYPOINT](#add-vs-copy--cmd-vs-entrypoint)
12. [Building Images and Running Containers](#building-images-and-running-containers)
13. [Pushing Docker Images to DockerHub](#pushing-docker-images-to-dockerhub)
14. [Pushing Images to ECR (Elastic Container Registry)](#pushing-images-to-ecr-elastic-container-registry)
15. [Multi-Stage Dockerfile](#multi-stage-dockerfile)
16. [Understanding and Writing Multi-Stage Dockerfiles](#understanding-and-writing-multi-stage-dockerfiles)

---

## Docker Basics

Docker is a platform for developing, shipping, and running applications in containers. Containers are isolated environments that bundle code, runtime, system tools, and libraries.

### Benefits of Docker:

* **Portability**: Run anywhere (development, test, production)
* **Consistency**: Avoid "works on my machine" issues
* **Efficiency**: Lightweight, starts faster than VMs
* **Modularity**: Break applications into smaller microservices

---

## What is Docker & What Problem Does it Solve?

Docker helps developers build and deploy applications faster by using containers. Before Docker, developers faced issues like:

* Inconsistent environments across dev/stage/prod
* Dependency conflicts
* Long setup times

Docker packages the application and its dependencies into a container that can run on any system with Docker installed.

**Use Case Example**:
A developer builds a Node.js app on macOS. With Docker, the exact same container can run on a Linux server in production with no issues.

---

## Docker Architecture

### Key Components:

* **Docker Client**: Interface for users (e.g., Docker CLI)
* **Docker Daemon (`dockerd`)**: Performs heavy lifting (builds, runs containers)
* **Docker Images**: Read-only templates used to create containers
* **Docker Containers**: Executable instance of an image
* **Docker Registries**: Remote storage for Docker images (e.g., DockerHub, AWS ECR)

**Flow**: Client → REST API → Docker Daemon → Containers/Images

---

## Docker Daemon and Docker CLI

* **Docker CLI**: Command-line interface to communicate with Docker daemon.
* **Docker Daemon (`dockerd`)**: Listens for Docker API requests and manages images, containers, networks, and volumes.
* The CLI sends commands to the daemon using REST API over Unix socket or network interface.

---

## Docker Image, Container, Dockerfile

### Docker Image

* Blueprint for containers
* Includes OS, application code, libraries, dependencies

### Docker Container

* Running instance of an image
* Isolated from host system but shares OS kernel

### Dockerfile

* Script with instructions to build Docker images

**Sample Dockerfile**:

```Dockerfile
FROM ubuntu:22.04
RUN apt update && apt install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```

---

## Writing Optimized Dockerfiles

Tips to optimize:

* Use **official slim base images** (`node:alpine`, `python:3-slim`)
* Minimize the number of layers by chaining `RUN` commands
* Use `.dockerignore` to exclude unnecessary files
* Keep image small to reduce build time, improve security

---

## Learning How to Write Dockerfiles

**Basic structure**:

```Dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

**Explanation**:

* `FROM`: Specifies base image
* `WORKDIR`: Sets working directory
* `COPY`: Copies files
* `RUN`: Executes commands
* `EXPOSE`: Documents port
* `CMD`: Default command when container runs

---

## Important Dockerfile Keywords

| Keyword      | Description                                           |
| ------------ | ----------------------------------------------------- |
| `FROM`       | Base image to use                                     |
| `RUN`        | Run commands during image build                       |
| `CMD`        | Default command for container                         |
| `ENTRYPOINT` | Defines container startup behavior                    |
| `COPY`       | Copy files from host                                  |
| `ADD`        | Like COPY but supports remote URLs and auto-unzipping |
| `WORKDIR`    | Sets working directory                                |
| `ENV`        | Set environment variables                             |
| `EXPOSE`     | Inform which port the app uses                        |
| `ARG`        | Variables during build time                           |
| `LABEL`      | Metadata about the image                              |

---

## Docker Commands

### General Workflow:

1. Build image
2. Run container
3. Inspect, manage, stop

### Categories:

* **Image Commands**: `build`, `pull`, `rmi`, `images`
* **Container Commands**: `run`, `start`, `stop`, `exec`, `rm`, `logs`
* **Volume Commands**: `volume ls`, `volume inspect`, `volume create`
* **Network Commands**: `network ls`, `network inspect`, `network create`

---

## Most Important Docker Commands

```bash
docker build -t myapp .         # Build image
docker images                   # List all images
docker run -d -p 8080:80 myapp  # Run container
docker ps -a                    # List all containers
docker exec -it <id> bash       # Access container shell
docker logs <id>                # View logs
docker stop/start <id>          # Stop/start container
docker rm <id>                  # Remove container
docker rmi <image>              # Remove image
```

---

## ADD vs COPY & CMD vs ENTRYPOINT

### ADD vs COPY

* `COPY`: Copies files and directories (simple, preferred)
* `ADD`: Same as COPY + supports URLs + auto-extracts archives

### CMD vs ENTRYPOINT

* `CMD`: Provides defaults for `ENTRYPOINT`, overridden at runtime
* `ENTRYPOINT`: Defines what runs, can’t be easily overridden

**Combined Example**:

```Dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

---

## Building Images and Running Containers

### Build Image:

```bash
docker build -t myimage:latest .
```

### Run Container:

```bash
docker run -d -p 5000:5000 --name mycontainer myimage:latest
```

* `-d`: Run in background
* `-p`: Port mapping
* `--name`: Custom container name

---

## Pushing Docker Images to DockerHub

```bash
docker login
# Tag image
docker tag myimage govindsingh/myimage:latest
# Push image
docker push govindsingh/myimage:latest
```

* Make sure repo is created on DockerHub first

---

## Pushing Images to ECR (Elastic Container Registry)

```bash
# Authenticate with ECR
aws ecr get-login-password --region <region> \
 | docker login --username AWS \
 --password-stdin <account_id>.dkr.ecr.<region>.amazonaws.com

# Tag and push image
docker tag myimage <repo_uri>:latest
docker push <repo_uri>:latest
```

---

## Multi-Stage Dockerfile

Multi-stage builds let you use multiple `FROM` instructions in one Dockerfile. Ideal for separating build-time and runtime dependencies.

**Benefits**:

* Smaller final image
* No dev tools in production
* Easier caching

**Example**:

```Dockerfile
# Builder Stage
FROM golang:1.20 as builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Runtime Stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

---

## Understanding and Writing Multi-Stage Dockerfiles

* Use alias (`AS builder`) to name stages
* Final image only contains what's needed
* Best for compiled languages (Golang, Java)

**Real-World Use Case**:

* Angular/React apps: build with Node.js, serve with NGINX
* Java apps: build with Maven, run with JRE only

> ✅ *This documentation was prepared by Govind Singh for in-depth understanding and real-world implementation of Docker in DevOps environments.*
