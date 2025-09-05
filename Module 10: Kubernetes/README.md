# 🚀 Module 10: Kubernetes (K8s) - Complete Guide

## 📋 Table of Contents

1. [Introduction to Kubernetes](#1-introduction-to-kubernetes)
2. [Kubernetes Architecture](#2-kubernetes-architecture)
3. [Installation & Setup](#3-installation--setup)
4. [Core Concepts & Objects](#4-core-concepts--objects)
5. [Workload Management](#5-workload-management)
6. [Networking & Service Mesh](#6-networking--service-mesh)
7. [Storage & Persistent Volumes](#7-storage--persistent-volumes)
8. [Security & RBAC](#8-security--rbac)
9. [Monitoring & Observability](#9-monitoring--observability)
10. [CI/CD & GitOps](#10-cicd--gitops)
11. [Advanced Topics](#11-advanced-topics)
12. [Real-World Projects](#12-real-world-projects)
13. [Best Practices](#13-best-practices)

---

## 1. Introduction to Kubernetes

### **What is Kubernetes?**

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Think of it as a "smart conductor" for your containerized applications - it knows where to place them, how to keep them running, and how to scale them based on demand.

Originally developed by Google based on their internal Borg system and now maintained by the Cloud Native Computing Foundation (CNCF), Kubernetes has become the de facto standard for container orchestration.

#### **The Container Management Problem**

As applications moved from monolithic to microservices architectures, managing containers became increasingly complex:

- **Manual Deployment**: Deploying containers manually across multiple servers
- **Scaling Challenges**: Manually scaling applications based on demand
- **Health Monitoring**: Keeping track of which containers are running and healthy
- **Load Balancing**: Distributing traffic across multiple container instances
- **Service Discovery**: Finding and connecting to other services
- **Rolling Updates**: Updating applications without downtime
- **Resource Management**: Efficiently using server resources

#### **How Kubernetes Solves These Problems**

Kubernetes transforms container management by:

- **Automated Orchestration**: Automatically places containers on available nodes
- **Intelligent Scaling**: Scales applications up or down based on metrics
- **Self-Healing**: Automatically restarts failed containers and replaces unhealthy ones
- **Service Discovery**: Automatically discovers and connects services
- **Load Balancing**: Distributes traffic across healthy container instances
- **Rolling Updates**: Updates applications with zero downtime
- **Resource Optimization**: Efficiently schedules containers based on resource requirements

### **Understanding Container Orchestration**

#### **What is Container Orchestration?**

Container orchestration is the automated process of managing containerized applications across multiple hosts. It involves:

1. **Scheduling**: Deciding where to place containers
2. **Scaling**: Adjusting the number of container instances
3. **Health Monitoring**: Checking if containers are running properly
4. **Service Discovery**: Helping containers find each other
5. **Load Balancing**: Distributing traffic across containers
6. **Rolling Updates**: Updating applications without downtime
7. **Resource Management**: Optimizing resource usage

#### **Why Do We Need Orchestration?**

**Without Orchestration:**

- Manual container deployment and management
- Difficult to scale applications
- No automatic failure recovery
- Complex service communication
- Resource waste and inefficiency

**With Orchestration:**

- Automated deployment and management
- Easy scaling based on demand
- Automatic failure recovery
- Simplified service communication
- Optimized resource utilization

### **Kubernetes Core Concepts**

#### **1. Cluster**

A **cluster** is a set of machines (nodes) that run containerized applications managed by Kubernetes.

**Components of a Cluster:**

- **Control Plane**: Manages the cluster and makes decisions
- **Worker Nodes**: Run the actual applications
- **Networking**: Connects all components together

#### **2. Node**

A **node** is a worker machine in Kubernetes, which can be either a physical or virtual machine.

**Types of Nodes:**

- **Master/Control Plane Nodes**: Run the Kubernetes control plane
- **Worker Nodes**: Run the actual workloads

#### **3. Pod**

A **pod** is the smallest deployable unit in Kubernetes. It represents a single instance of a running process in your cluster.

**Key Characteristics:**

- **Single IP Address**: All containers in a pod share the same IP
- **Shared Storage**: Containers can share volumes
- **Shared Network**: Containers can communicate via localhost
- **Lifecycle**: Pods are ephemeral and can be created/destroyed

#### **4. Service**

A **service** is an abstraction that defines a logical set of pods and a policy to access them.

**Types of Services:**

- **ClusterIP**: Exposes the service on a cluster-internal IP
- **NodePort**: Exposes the service on each node's IP at a static port
- **LoadBalancer**: Exposes the service externally using a cloud provider's load balancer
- **ExternalName**: Maps the service to the contents of the externalName field

#### **5. Deployment**

A **deployment** provides declarative updates for pods and replica sets.

**Key Features:**

- **Rolling Updates**: Updates pods gradually
- **Rollback**: Can rollback to previous versions
- **Scaling**: Can scale the number of replicas
- **Self-Healing**: Replaces failed pods automatically

### **Why Kubernetes?**

#### **🔄 Container Orchestration**

**What it means**: Kubernetes manages complex containerized applications across multiple hosts.

**Why it matters**:

- **Simplified Management**: One platform to manage all containers
- **Consistent Environment**: Same behavior across different environments
- **Resource Efficiency**: Optimizes resource usage across the cluster
- **Fault Tolerance**: Handles node failures gracefully

**Real-World Example**:
A microservices application with 20 services running across 10 servers. Kubernetes automatically places containers, handles failures, and manages communication between services.

#### **📈 Auto-scaling**

**What it means**: Kubernetes automatically scales applications based on demand.

**Why it matters**:

- **Cost Optimization**: Scale down during low usage periods
- **Performance**: Scale up during high demand
- **Automatic Response**: No manual intervention required
- **Resource Efficiency**: Use only the resources you need

**Real-World Example**:
An e-commerce website automatically scales from 5 to 50 pods during Black Friday sales, then scales back down to 5 pods after the event.

#### **🛡️ High Availability**

**What it means**: Kubernetes ensures application uptime and fault tolerance.

**Why it matters**:

- **Business Continuity**: Applications stay running even during failures
- **Redundancy**: Multiple instances of applications across different nodes
- **Automatic Recovery**: Failed components are automatically replaced
- **Zero Downtime**: Updates and maintenance without service interruption

**Real-World Example**:
A banking application continues running even when 2 out of 5 servers fail, with no impact on customer transactions.

#### **🔧 Self-healing**

**What it means**: Kubernetes automatically restarts failed containers and replaces unhealthy ones.

**Why it matters**:

- **Reduced Manual Intervention**: Less need for manual troubleshooting
- **Faster Recovery**: Automatic recovery from failures
- **Consistent Health**: Maintains desired state of applications
- **Operational Efficiency**: Reduces operational overhead

**Real-World Example**:
A web application pod crashes due to a memory leak. Kubernetes automatically restarts the pod and routes traffic to healthy instances.

#### **🌐 Multi-cloud**

**What it means**: Kubernetes works across on-premises, cloud, and hybrid environments.

**Why it matters**:

- **Vendor Independence**: Avoid vendor lock-in
- **Flexibility**: Choose the best environment for each workload
- **Disaster Recovery**: Distribute applications across multiple clouds
- **Cost Optimization**: Use the most cost-effective resources

**Real-World Example**:
A company runs development in AWS, staging in Azure, and production in Google Cloud, all managed by the same Kubernetes platform.

#### **🔒 Security**

**What it means**: Kubernetes provides built-in security features and policies.

**Why it matters**:

- **Network Security**: Control traffic between pods and services
- **Access Control**: Role-based access control (RBAC)
- **Secrets Management**: Secure storage and distribution of sensitive data
- **Pod Security**: Security contexts and policies for pods

**Real-World Example**:
A financial application uses Kubernetes network policies to ensure database pods can only be accessed by application pods, not directly from the internet.

#### **📊 Observability**

**What it means**: Kubernetes provides comprehensive monitoring and logging capabilities.

**Why it matters**:

- **Performance Monitoring**: Track application and infrastructure metrics
- **Logging**: Centralized logging from all containers
- **Tracing**: Track requests across microservices
- **Alerting**: Proactive notification of issues

**Real-World Example**:
A team monitors CPU usage, memory consumption, and response times across all microservices, with automatic alerts when thresholds are exceeded.

### **Kubernetes vs Other Orchestrators**

#### **Kubernetes vs Docker Swarm**

| Aspect                  | Kubernetes                                   | Docker Swarm                         |
| ----------------------- | -------------------------------------------- | ------------------------------------ |
| **Complexity**          | High - More features and flexibility         | Low - Simple and easy to use         |
| **Scalability**         | Excellent - Handles thousands of nodes       | Good - Suitable for smaller clusters |
| **Ecosystem**           | Largest - Extensive tooling and community    | Good - Docker ecosystem integration  |
| **Learning Curve**      | Steep - Requires significant learning        | Easy - Quick to get started          |
| **Enterprise Features** | Excellent - Advanced features for large orgs | Basic - Core orchestration features  |
| **Use Case**            | Complex, large-scale applications            | Simple, small to medium applications |

#### **Kubernetes vs Apache Mesos**

| Aspect             | Kubernetes                         | Apache Mesos                            |
| ------------------ | ---------------------------------- | --------------------------------------- |
| **Focus**          | Container orchestration            | General resource management             |
| **Complexity**     | High - Container-specific features | Medium - More general purpose           |
| **Ecosystem**      | Largest - Container-focused        | Good - General purpose                  |
| **Learning Curve** | Steep - Container concepts         | Medium - General concepts               |
| **Use Case**       | Containerized applications         | Mixed workloads (containers, VMs, etc.) |

#### **Kubernetes vs OpenShift**

| Aspect       | Kubernetes                  | OpenShift                          |
| ------------ | --------------------------- | ---------------------------------- |
| **Type**     | Open source platform        | Enterprise Kubernetes distribution |
| **Features** | Core orchestration features | Additional enterprise features     |
| **Support**  | Community support           | Commercial support available       |
| **Cost**     | Free                        | Commercial licensing               |
| **Use Case** | Any organization            | Enterprise organizations           |

### **When to Use Kubernetes**

#### **Perfect Use Cases**

- **Microservices Architecture**: Managing multiple interconnected services
- **High Availability Requirements**: Applications that need to stay running
- **Variable Workloads**: Applications with changing demand patterns
- **Multi-cloud Deployments**: Applications spanning multiple environments
- **Large-scale Applications**: Applications with many components
- **CI/CD Integration**: Automated deployment and scaling

#### **Considerations**

- **Complexity**: Kubernetes has a steep learning curve
- **Resource Requirements**: Requires significant resources to run
- **Team Expertise**: Team needs to understand container and orchestration concepts
- **Overhead**: Additional complexity for simple applications

#### **When NOT to Use Kubernetes**

- **Simple Applications**: Single-container applications that don't need orchestration
- **Small Teams**: Teams without the expertise to manage Kubernetes
- **Limited Resources**: Environments with limited compute resources
- **Legacy Applications**: Applications that can't be containerized

### **Getting Started with Kubernetes**

#### **Step 1: Understand the Concepts**

Before diving into Kubernetes, understand:

- **Container Concepts**: Docker, containerization, images
- **Microservices**: Service-oriented architecture
- **Networking**: Basic networking concepts
- **Linux**: Basic Linux administration

#### **Step 2: Choose Your Learning Path**

- **Local Development**: Minikube, Docker Desktop, or kind
- **Cloud Platforms**: EKS, GKE, or AKS
- **On-premises**: kubeadm, kops, or Rancher

#### **Step 3: Start with Simple Applications**

- **Single Pod**: Deploy a simple web application
- **Deployment**: Create a deployment with multiple replicas
- **Service**: Expose your application with a service
- **ConfigMap/Secret**: Manage configuration and secrets

#### **Step 4: Learn Advanced Concepts**

- **Ingress**: External access to services
- **Persistent Volumes**: Storage for applications
- **RBAC**: Security and access control
- **Monitoring**: Observability and logging

### **Kubernetes Ecosystem**

#### **Core Components**

- **etcd**: Distributed key-value store for cluster state
- **API Server**: Central management point for the cluster
- **Scheduler**: Places pods on appropriate nodes
- **Controller Manager**: Ensures desired state is maintained
- **kubelet**: Runs on each node and manages containers
- **kube-proxy**: Network proxy for services

#### **Popular Tools and Extensions**

- **Helm**: Package manager for Kubernetes
- **Istio**: Service mesh for microservices
- **Prometheus**: Monitoring and alerting
- **Grafana**: Visualization and dashboards
- **Fluentd**: Log collection and forwarding
- **ArgoCD**: GitOps continuous delivery

#### **Cloud Provider Integrations**

- **AWS EKS**: Amazon's managed Kubernetes service
- **Google GKE**: Google's managed Kubernetes service
- **Azure AKS**: Microsoft's managed Kubernetes service
- **DigitalOcean**: Managed Kubernetes service
- **IBM Cloud**: IBM's Kubernetes service

### **Kubernetes vs Docker Swarm vs Other Orchestrators**

| Feature                 | Kubernetes | Docker Swarm | Apache Mesos |
| ----------------------- | ---------- | ------------ | ------------ |
| **Complexity**          | High       | Low          | Medium       |
| **Scalability**         | Excellent  | Good         | Excellent    |
| **Ecosystem**           | Largest    | Good         | Good         |
| **Learning Curve**      | Steep      | Easy         | Medium       |
| **Enterprise Features** | Excellent  | Basic        | Good         |
| **Community Support**   | Largest    | Good         | Good         |

### **Kubernetes Components Overview**

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                       │
├─────────────────────────────────────────────────────────────┤
│  Control Plane (Master Nodes)                              │
│  ├── API Server                                            │
│  ├── etcd                                                  │
│  ├── Scheduler                                             │
│  ├── Controller Manager                                    │
│  └── Cloud Controller Manager                              │
├─────────────────────────────────────────────────────────────┤
│  Worker Nodes                                              │
│  ├── kubelet                                               │
│  ├── kube-proxy                                            │
│  ├── Container Runtime (Docker/containerd/CRI-O)          │
│  └── Pods (Your Applications)                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Kubernetes Architecture

### **Control Plane Components**

#### **API Server**

- **Purpose**: Central management point for all cluster operations
- **Function**: Validates and processes API requests
- **Port**: 6443 (HTTPS)
- **Authentication**: Supports multiple auth methods (certificates, tokens, etc.)

#### **etcd**

- **Purpose**: Distributed key-value store for cluster state
- **Function**: Stores all cluster configuration and state data
- **Consistency**: Strong consistency guarantees
- **Backup**: Critical for disaster recovery

#### **Scheduler**

- **Purpose**: Assigns pods to nodes based on resource requirements
- **Function**: Considers resource availability, constraints, and policies
- **Extensibility**: Supports custom scheduling policies

#### **Controller Manager**

- **Purpose**: Runs core control loops
- **Components**:
  - Node Controller
  - Replication Controller
  - Endpoints Controller
  - Service Account & Token Controllers

#### **Cloud Controller Manager**

- **Purpose**: Integrates with cloud provider APIs
- **Function**: Manages cloud-specific resources (load balancers, volumes)

### **Worker Node Components**

#### **kubelet**

- **Purpose**: Primary node agent
- **Function**: Manages pods and containers on the node
- **Communication**: Talks to API server and container runtime

#### **kube-proxy**

- **Purpose**: Network proxy for services
- **Function**: Implements service abstraction and load balancing
- **Modes**: iptables, ipvs, userspace

#### **Container Runtime**

- **Purpose**: Runs containers
- **Options**: Docker, containerd, CRI-O
- **Interface**: Container Runtime Interface (CRI)

### **Add-ons**

#### **DNS**

- **Purpose**: Provides DNS resolution for services
- **Implementation**: CoreDNS (default)
- **Configuration**: ClusterIP service

#### **Dashboard**

- **Purpose**: Web-based UI for cluster management
- **Access**: kubectl proxy or NodePort/LoadBalancer

#### **Ingress Controller**

- **Purpose**: Manages external access to services
- **Options**: NGINX, Traefik, HAProxy, etc.

---

## 3. Installation & Setup

### **Prerequisites**

#### **System Requirements**

```bash
# Minimum requirements for a single-node cluster
CPU: 2 cores
RAM: 2GB
Disk: 20GB
OS: Ubuntu 18.04+, CentOS 7+, or RHEL 7+

# Recommended for production
CPU: 4+ cores
RAM: 8GB+
Disk: 100GB+ SSD
Network: 1Gbps+
```

#### **Required Software**

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install kubeadm, kubelet, kubectl
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-archive-keyring.gpg
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

### **Installation Methods**

#### **Method 1: kubeadm (Recommended for Learning)**

**Single Node Cluster Setup:**

```bash
#!/bin/bash
# setup-single-node-k8s.sh

# Initialize the cluster
sudo kubeadm init --pod-network-cidr=10.244.0.0/16

# Configure kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install Flannel CNI
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml

# Remove taint to allow scheduling on master
kubectl taint nodes --all node-role.kubernetes.io/control-plane-

echo "✅ Single-node Kubernetes cluster is ready!"
```

**Multi-Node Cluster Setup:**

```bash
#!/bin/bash
# setup-multi-node-k8s.sh

# On Master Node
MASTER_IP="192.168.1.100"
POD_CIDR="10.244.0.0/16"

# Initialize master
sudo kubeadm init \
  --control-plane-endpoint=$MASTER_IP \
  --pod-network-cidr=$POD_CIDR \
  --upload-certs

# Configure kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# Install CNI (Calico)
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/tigera-operator.yaml
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.26.0/manifests/custom-resources.yaml

# Get join command
kubeadm token create --print-join-command

# On Worker Nodes
# Run the join command from master output
sudo kubeadm join $MASTER_IP:6443 --token <token> --discovery-token-ca-cert-hash <hash>
```

#### **Method 2: Managed Kubernetes Services**

**Amazon EKS:**

```bash
# Install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin

# Create EKS cluster
eksctl create cluster \
  --name my-cluster \
  --version 1.28 \
  --region us-west-2 \
  --nodegroup-name workers \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 4 \
  --managed
```

**Google GKE:**

```bash
# Install gcloud CLI
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Create GKE cluster
gcloud container clusters create my-cluster \
  --zone us-central1-a \
  --num-nodes 3 \
  --machine-type e2-medium \
  --enable-autoscaling \
  --min-nodes 1 \
  --max-nodes 5
```

**Azure AKS:**

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Create AKS cluster
az aks create \
  --resource-group myResourceGroup \
  --name myAKSCluster \
  --node-count 3 \
  --node-vm-size Standard_B2s \
  --enable-addons monitoring \
  --generate-ssh-keys
```

#### **Method 3: kops (Production-Ready)**

```bash
# Install kops
curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
chmod +x kops-linux-amd64
sudo mv kops-linux-amd64 /usr/local/bin/kops

# Create cluster
kops create cluster \
  --name=mycluster.k8s.local \
  --state=s3://my-kops-state-bucket \
  --zones=us-west-2a,us-west-2b \
  --node-count=3 \
  --node-size=t3.medium \
  --master-size=t3.small \
  --dns-zone=mycluster.k8s.local

# Update cluster
kops update cluster --name=mycluster.k8s.local --state=s3://my-kops-state-bucket --yes
```

### **Post-Installation Verification**

```bash
# Check cluster status
kubectl cluster-info
kubectl get nodes
kubectl get pods --all-namespaces

# Test cluster functionality
kubectl run test-pod --image=nginx --restart=Never
kubectl get pods
kubectl delete pod test-pod

# Check system pods
kubectl get pods -n kube-system
```

---

## 4. Core Concepts & Objects

### **Namespaces**

Namespaces provide logical separation within a cluster.

```yaml
# Create namespace
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    environment: production
---
apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    environment: development
```

```bash
# Namespace operations
kubectl create namespace production
kubectl get namespaces
kubectl describe namespace production
kubectl delete namespace development

# Set default namespace
kubectl config set-context --current --namespace=production
```

### **Labels and Selectors**

Labels are key-value pairs attached to objects for identification and selection.

```yaml
# Pod with labels
apiVersion: v1
kind: Pod
metadata:
  name: web-server
  labels:
    app: nginx
    version: '1.20'
    environment: production
    tier: frontend
spec:
  containers:
    - name: nginx
      image: nginx:1.20
      ports:
        - containerPort: 80
```

```bash
# Label operations
kubectl label pod web-server tier=backend
kubectl label pod web-server tier-  # Remove label
kubectl get pods -l app=nginx
kubectl get pods -l "environment in (production,staging)"
kubectl get pods -l "!tier"  # Pods without tier label
```

### **Annotations**

Annotations store non-identifying metadata.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-server
  annotations:
    description: 'Web server for production'
    contact: 'team@company.com'
    last-modified: '2024-01-15T10:30:00Z'
spec:
  containers:
    - name: nginx
      image: nginx:1.20
```

```bash
# Annotation operations
kubectl annotate pod web-server description="Updated description"
kubectl get pod web-server -o jsonpath='{.metadata.annotations}'
```

---

## 5. Workload Management

### **Pods**

Pods are the smallest deployable units in Kubernetes.

#### **Single Container Pod**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
    - name: nginx
      image: nginx:1.20
      ports:
        - containerPort: 80
      resources:
        requests:
          memory: '64Mi'
          cpu: '250m'
        limits:
          memory: '128Mi'
          cpu: '500m'
      env:
        - name: ENV_VAR
          value: 'production'
      volumeMounts:
        - name: html-volume
          mountPath: /usr/share/nginx/html
  volumes:
    - name: html-volume
      emptyDir: {}
  restartPolicy: Always
```

#### **Multi-Container Pod**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  containers:
    - name: web-server
      image: nginx:1.20
      ports:
        - containerPort: 80
      volumeMounts:
        - name: shared-data
          mountPath: /usr/share/nginx/html
    - name: file-sync
      image: busybox
      command:
        ['sh', '-c', 'while true; do echo "Syncing files..."; sleep 30; done']
      volumeMounts:
        - name: shared-data
          mountPath: /data
  volumes:
    - name: shared-data
      emptyDir: {}
```

#### **Pod Lifecycle and States**

```bash
# Pod states
kubectl get pods
# Pending: Pod accepted but not scheduled
# Running: Pod scheduled and at least one container running
# Succeeded: All containers terminated successfully
# Failed: All containers terminated, at least one failed
# Unknown: Pod state cannot be determined

# Pod events
kubectl describe pod nginx-pod
kubectl get events --sort-by=.metadata.creationTimestamp
```

### **ReplicaSets**

ReplicaSets ensure a specified number of pod replicas are running.

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-replicaset
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.20
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: '64Mi'
              cpu: '250m'
            limits:
              memory: '128Mi'
              cpu: '500m'
```

```bash
# ReplicaSet operations
kubectl create -f nginx-replicaset.yaml
kubectl get replicasets
kubectl scale replicaset nginx-replicaset --replicas=5
kubectl delete replicaset nginx-replicaset
```

### **Deployments**

Deployments provide declarative updates for Pods and ReplicaSets.

#### **Basic Deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.20
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: '64Mi'
              cpu: '250m'
            limits:
              memory: '128Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
```

#### **Deployment Strategies**

**Rolling Update (Default):**

```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
```

**Recreate:**

```yaml
spec:
  strategy:
    type: Recreate
```

#### **Deployment Operations**

```bash
# Create deployment
kubectl create -f nginx-deployment.yaml
kubectl get deployments
kubectl describe deployment nginx-deployment

# Update deployment
kubectl set image deployment/nginx-deployment nginx=nginx:1.21
kubectl rollout status deployment/nginx-deployment

# Rollback deployment
kubectl rollout history deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment
kubectl rollout undo deployment/nginx-deployment --to-revision=2

# Scale deployment
kubectl scale deployment nginx-deployment --replicas=5
kubectl autoscale deployment nginx-deployment --min=2 --max=10 --cpu-percent=70
```

### **StatefulSets**

StatefulSets manage stateful applications with stable network identities and persistent storage.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql-statefulset
spec:
  serviceName: mysql
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - name: mysql
          image: mysql:8.0
          ports:
            - containerPort: 3306
          env:
            - name: MYSQL_ROOT_PASSWORD
              value: 'rootpassword'
            - name: MYSQL_DATABASE
              value: 'appdb'
            - name: MYSQL_USER
              value: 'appuser'
            - name: MYSQL_PASSWORD
              value: 'apppassword'
          volumeMounts:
            - name: mysql-data
              mountPath: /var/lib/mysql
            - name: mysql-config
              mountPath: /etc/mysql/conf.d
  volumeClaimTemplates:
    - metadata:
        name: mysql-data
      spec:
        accessModes: ['ReadWriteOnce']
        resources:
          requests:
            storage: 10Gi
    - metadata:
        name: mysql-config
      spec:
        accessModes: ['ReadWriteOnce']
        resources:
          requests:
            storage: 1Gi
```

```bash
# StatefulSet operations
kubectl create -f mysql-statefulset.yaml
kubectl get statefulsets
kubectl get pods -l app=mysql
kubectl get pvc
kubectl scale statefulset mysql-statefulset --replicas=5
```

### **DaemonSets**

DaemonSets ensure all nodes run a copy of a pod.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-logging
  labels:
    app: fluentd
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      tolerations:
        - key: node-role.kubernetes.io/control-plane
          operator: Exists
          effect: NoSchedule
      containers:
        - name: fluentd
          image: fluent/fluentd-kubernetes-daemonset:v1-debian-elasticsearch
          resources:
            limits:
              memory: 200Mi
            requests:
              cpu: 100m
              memory: 200Mi
          volumeMounts:
            - name: varlog
              mountPath: /var/log
            - name: varlibdockercontainers
              mountPath: /var/lib/docker/containers
              readOnly: true
      terminationGracePeriodSeconds: 30
      volumes:
        - name: varlog
          hostPath:
            path: /var/log
        - name: varlibdockercontainers
          hostPath:
            path: /var/lib/docker/containers
```

```bash
# DaemonSet operations
kubectl create -f fluentd-daemonset.yaml
kubectl get daemonsets
kubectl describe daemonset fluentd-logging
```

### **Jobs and CronJobs**

#### **Jobs**

Jobs run to completion and then stop.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: data-processing-job
spec:
  template:
    spec:
      containers:
        - name: data-processor
          image: busybox
          command:
            [
              'sh',
              '-c',
              'echo "Processing data..."; sleep 30; echo "Data processing completed"',
            ]
      restartPolicy: Never
  backoffLimit: 3
```

#### **CronJobs**

CronJobs run Jobs on a schedule.

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: backup-cronjob
spec:
  schedule: '0 2 * * *' # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: backup
              image: busybox
              command:
                - /bin/sh
                - -c
                - echo "Starting backup..."; sleep 60; echo "Backup completed"
          restartPolicy: OnFailure
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 1
```

```bash
# Job operations
kubectl create -f data-processing-job.yaml
kubectl get jobs
kubectl logs job/data-processing-job

# CronJob operations
kubectl create -f backup-cronjob.yaml
kubectl get cronjobs
kubectl get jobs --watch
```

---

## 6. Networking & Service Mesh

### **Services**

Services provide stable network endpoints for pods.

#### **ClusterIP Service (Default)**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP
```

#### **NodePort Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-nodeport
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
  type: NodePort
```

#### **LoadBalancer Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-loadbalancer
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

#### **ExternalName Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: external-database
spec:
  type: ExternalName
  externalName: database.example.com
  ports:
    - port: 5432
```

```bash
# Service operations
kubectl create -f nginx-service.yaml
kubectl get services
kubectl describe service nginx-service
kubectl get endpoints nginx-service
```

### **Ingress**

Ingress provides HTTP/HTTPS routing to services.

#### **Basic Ingress**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: web.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx-service
                port:
                  number: 80
```

#### **TLS Ingress**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tls-ingress
  annotations:
    cert-manager.io/cluster-issuer: 'letsencrypt-prod'
spec:
  tls:
    - hosts:
        - web.example.com
      secretName: web-tls
  rules:
    - host: web.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx-service
                port:
                  number: 80
```

#### **Path-based Routing**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: path-ingress
spec:
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /api/v1
            pathType: Prefix
            backend:
              service:
                name: api-v1-service
                port:
                  number: 80
          - path: /api/v2
            pathType: Prefix
            backend:
              service:
                name: api-v2-service
                port:
                  number: 80
          - path: /admin
            pathType: Prefix
            backend:
              service:
                name: admin-service
                port:
                  number: 80
```

### **Network Policies**

Network policies control traffic flow between pods.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-network-policy
spec:
  podSelector:
    matchLabels:
      app: web
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: frontend
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 80
  egress:
    - to:
        - podSelector:
            matchLabels:
              app: database
      ports:
        - protocol: TCP
          port: 5432
    - to: []
      ports:
        - protocol: TCP
          port: 53
        - protocol: UDP
          port: 53
```

### **Service Mesh with Istio**

#### **Installation**

```bash
# Download Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-1.19.0
export PATH=$PWD/bin:$PATH

# Install Istio
istioctl install --set values.defaultRevision=default
kubectl label namespace default istio-injection=enabled
```

#### **Virtual Service**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: web-virtual-service
spec:
  hosts:
    - web.example.com
  http:
    - match:
        - uri:
            prefix: /api
      route:
        - destination:
            host: api-service
            port:
              number: 80
    - route:
        - destination:
            host: web-service
            port:
              number: 80
```

#### **Destination Rule**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: api-destination-rule
spec:
  host: api-service
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 10
      http:
        http1MaxPendingRequests: 10
        maxRequestsPerConnection: 2
    circuitBreaker:
      consecutiveErrors: 3
      interval: 30s
      baseEjectionTime: 30s
```

---

## 7. Storage & Persistent Volumes

### **Volume Types**

#### **1. EmptyDir**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: emptydir-pod
spec:
  containers:
    - name: app
      image: nginx
      volumeMounts:
        - name: cache-volume
          mountPath: /cache
  volumes:
    - name: cache-volume
      emptyDir: {}
```

#### **2. HostPath**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hostpath-pod
spec:
  containers:
    - name: app
      image: nginx
      volumeMounts:
        - name: host-volume
          mountPath: /host-data
  volumes:
    - name: host-volume
      hostPath:
        path: /data
        type: DirectoryOrCreate
```

#### **3. PersistentVolume (PV)**

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-example
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: fast-ssd
  hostPath:
    path: /mnt/data
```

#### **4. PersistentVolumeClaim (PVC)**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-example
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: fast-ssd
```

### **Storage Classes**

#### **Dynamic Provisioning**

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  fsType: ext4
  encrypted: 'true'
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

#### **AWS EBS Storage Class**

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: aws-ebs-gp3
provisioner: ebs.csi.aws.com
parameters:
  type: gp3
  fsType: ext4
  encrypted: 'true'
  iops: '3000'
  throughput: '125'
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

#### **Azure Disk Storage Class**

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: azure-disk-premium
provisioner: disk.csi.azure.com
parameters:
  skuName: Premium_LRS
  cachingmode: ReadOnly
  fsType: ext4
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
```

volumeBindingMode: WaitForFirstConsumer

````

### **StatefulSets**

#### **MySQL StatefulSet**
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql
  replicas: 3
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-secret
              key: password
        ports:
        - containerPort: 3306
        volumeMounts:
        - name: mysql-storage
          mountPath: /var/lib/mysql
  volumeClaimTemplates:
  - metadata:
      name: mysql-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 20Gi
      storageClassName: fast-ssd
````

---

## 8. Security & RBAC

### **Service Accounts**

#### **Create Service Account**

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: production
automountServiceAccountToken: false
```

### **RBAC - Roles and RoleBindings**

#### **Role Definition**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: pod-reader
rules:
  - apiGroups: ['']
    resources: ['pods']
    verbs: ['get', 'watch', 'list']
  - apiGroups: ['apps']
    resources: ['deployments']
    verbs: ['get', 'list']
```

#### **RoleBinding**

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: production
subjects:
  - kind: User
    name: jane
    apiGroup: rbac.authorization.k8s.io
  - kind: ServiceAccount
    name: app-service-account
    namespace: production
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io
```

### **Network Policies**

#### **Deny All Traffic**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

#### **Allow Specific Traffic**

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: frontend
      ports:
        - protocol: TCP
          port: 8080
```

---

## 9. Monitoring & Observability

### **Prometheus Setup**

#### **Prometheus ConfigMap**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s

    scrape_configs:
      - job_name: 'kubernetes-apiservers'
        kubernetes_sd_configs:
        - role: endpoints
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      
      - job_name: 'kubernetes-nodes'
        kubernetes_sd_configs:
        - role: node
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
```

#### **Prometheus Deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
        - name: prometheus
          image: prom/prometheus:v2.40.0
          args:
            - '--config.file=/etc/prometheus/prometheus.yml'
            - '--storage.tsdb.path=/prometheus/'
            - '--storage.tsdb.retention.time=200h'
            - '--web.enable-lifecycle'
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: prometheus-config-volume
              mountPath: /etc/prometheus/
            - name: prometheus-storage-volume
              mountPath: /prometheus/
      volumes:
        - name: prometheus-config-volume
          configMap:
            name: prometheus-config
        - name: prometheus-storage-volume
          emptyDir: {}
```

### **Grafana Setup**

#### **Grafana Deployment**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
        - name: grafana
          image: grafana/grafana:9.3.0
          ports:
            - containerPort: 3000
          env:
            - name: GF_SECURITY_ADMIN_PASSWORD
              value: admin123
          volumeMounts:
            - name: grafana-storage
              mountPath: /var/lib/grafana
      volumes:
        - name: grafana-storage
          emptyDir: {}
```

---

## 10. CI/CD Integration & GitOps

### **Jenkins with Kubernetes**

#### **Jenkins Pipeline for K8s**

```groovy
pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubeconfig')
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    sh '''
                        docker build -t ${DOCKER_REGISTRY}/myapp:${IMAGE_TAG} .
                        docker push ${DOCKER_REGISTRY}/myapp:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                script {
                    sh '''
                        kubectl set image deployment/myapp myapp=${DOCKER_REGISTRY}/myapp:${IMAGE_TAG}
                        kubectl rollout status deployment/myapp
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed!"
        }
    }
}
```

### **GitLab CI/CD with Kubernetes**

#### **GitLab CI Pipeline**

```yaml
stages:
  - build
  - test
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  KUBE_NAMESPACE: production

build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
  only:
    - main
    - develop

deploy:
  stage: deploy
  image: bitnami/kubectl:latest
  before_script:
    - kubectl config use-context $KUBE_CONTEXT
  script:
    - kubectl set image deployment/myapp myapp=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/myapp
  environment:
    name: production
    url: https://myapp.example.com
  only:
    - main
```

### **ArgoCD GitOps**

#### **ArgoCD Application**

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/myapp-k8s
    targetRevision: HEAD
    path: k8s
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

---

## 11. Advanced Topics

### **Custom Resource Definitions (CRDs)**

#### **Database CRD**

```yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: databases.example.com
spec:
  group: example.com
  versions:
    - name: v1
      served: true
      storage: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                databaseName:
                  type: string
                version:
                  type: string
                replicas:
                  type: integer
                  minimum: 1
                  maximum: 10
  scope: Namespaced
  names:
    plural: databases
    singular: database
    kind: Database
```

### **Service Mesh with Istio**

#### **Virtual Service**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: myapp
spec:
  hosts:
    - myapp.example.com
  http:
    - match:
        - uri:
            prefix: /api
      route:
        - destination:
            host: myapp-backend
            port:
              number: 8080
    - route:
        - destination:
            host: myapp-frontend
            port:
              number: 80
```

#### **Destination Rule**

```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: myapp-backend
spec:
  host: myapp-backend
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 10
      http:
        http1MaxPendingRequests: 10
        maxRequestsPerConnection: 2
    circuitBreaker:
      consecutiveErrors: 3
      interval: 30s
      baseEjectionTime: 30s
```

---

## 12. Real-World Projects

### **Project 1: E-commerce Microservices Platform**

#### **Architecture Overview**

Deploy a complete e-commerce platform with microservices architecture:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   User Service  │
│   (React SPA)   │◄──►│   (Kong/Istio)  │◄──►│   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ Product      │ │ Order       │ │ Payment   │
        │ Service      │ │ Service     │ │ Service   │
        │ (Java)       │ │ (Python)    │ │ (Go)      │
        └──────────────┘ └─────────────┘ └───────────┘
                │               │               │
        ┌───────▼──────┐ ┌──────▼──────┐ ┌─────▼─────┐
        │ PostgreSQL   │ │ MongoDB     │ │ Redis     │
        │ Database     │ │ Database    │ │ Cache     │
        └──────────────┘ └─────────────┘ └───────────┘
```

#### **Implementation Steps**

**Step 1: Namespace Setup**

```yaml
# namespaces.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ecommerce
  labels:
    name: ecommerce
---
apiVersion: v1
kind: Namespace
metadata:
  name: ecommerce-db
  labels:
    name: ecommerce-db
```

**Step 2: Database Services**

```yaml
# databases.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: ecommerce-db
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:13
          env:
            - name: POSTGRES_DB
              value: 'ecommerce'
            - name: POSTGRES_USER
              value: 'admin'
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-secret
                  key: password
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: postgres-storage
      spec:
        accessModes: ['ReadWriteOnce']
        resources:
          requests:
            storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: ecommerce-db
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432
  type: ClusterIP
```

**Step 3: User Service**

```yaml
# user-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  namespace: ecommerce
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
        - name: user-service
          image: ecommerce/user-service:v1.0.0
          ports:
            - containerPort: 3000
          env:
            - name: DATABASE_URL
              value: 'postgresql://admin:password@postgres.ecommerce-db.svc.cluster.local:5432/ecommerce'
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: secret
          resources:
            requests:
              memory: '256Mi'
              cpu: '250m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
  namespace: ecommerce
spec:
  selector:
    app: user-service
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP
```

**Step 4: API Gateway with Istio**

```yaml
# api-gateway.yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: ecommerce-gateway
  namespace: ecommerce
spec:
  selector:
    istio: ingressgateway
  servers:
    - port:
        number: 80
        name: http
        protocol: HTTP
      hosts:
        - api.ecommerce.com
---
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: ecommerce-vs
  namespace: ecommerce
spec:
  hosts:
    - api.ecommerce.com
  gateways:
    - ecommerce-gateway
  http:
    - match:
        - uri:
            prefix: /api/users
      route:
        - destination:
            host: user-service
            port:
              number: 80
    - match:
        - uri:
            prefix: /api/products
      route:
        - destination:
            host: product-service
            port:
              number: 80
```

### **Project 2: CI/CD Pipeline with GitOps**

#### **ArgoCD Application Setup**

```yaml
# argocd-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ecommerce-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/company/ecommerce-k8s
    targetRevision: HEAD
    path: k8s/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: ecommerce
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

#### **Jenkins Pipeline**

```groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'registry.company.com'
        K8S_NAMESPACE = 'ecommerce'
        ARGOCD_SERVER = 'argocd.company.com'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            parallel {
                stage('User Service') {
                    steps {
                        dir('user-service') {
                            sh 'docker build -t ${DOCKER_REGISTRY}/user-service:${BUILD_NUMBER} .'
                            sh 'docker push ${DOCKER_REGISTRY}/user-service:${BUILD_NUMBER}'
                        }
                    }
                }
                stage('Product Service') {
                    steps {
                        dir('product-service') {
                            sh 'docker build -t ${DOCKER_REGISTRY}/product-service:${BUILD_NUMBER} .'
                            sh 'docker push ${DOCKER_REGISTRY}/product-service:${BUILD_NUMBER}'
                        }
                    }
                }
            }
        }

        stage('Update K8s Manifests') {
            steps {
                sh '''
                    # Update image tags in K8s manifests
                    find k8s -name "*.yaml" -exec sed -i "s|image: .*user-service.*|image: ${DOCKER_REGISTRY}/user-service:${BUILD_NUMBER}|g" {} \;
                    find k8s -name "*.yaml" -exec sed -i "s|image: .*product-service.*|image: ${DOCKER_REGISTRY}/product-service:${BUILD_NUMBER}|g" {} \;
                '''
            }
        }

        stage('Commit & Push') {
            steps {
                sh '''
                    git config user.name "Jenkins"
                    git config user.email "jenkins@company.com"
                    git add k8s/
                    git commit -m "Update images to ${BUILD_NUMBER}"
                    git push origin HEAD:main
                '''
            }
        }

        stage('Sync ArgoCD') {
            steps {
                sh '''
                    argocd app sync ecommerce-app --server ${ARGOCD_SERVER}
                '''
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            slackSend channel: '#deployments',
                      color: 'good',
                      message: "✅ E-commerce app deployed successfully! Build: ${BUILD_NUMBER}"
        }
        failure {
            slackSend channel: '#deployments',
                      color: 'danger',
                      message: "❌ E-commerce app deployment failed! Build: ${BUILD_NUMBER}"
        }
    }
}
```

### **Project 3: Monitoring Stack**

#### **Prometheus + Grafana Setup**

```yaml
# monitoring-stack.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s

    rule_files:
      - "alert_rules.yml"

    alerting:
      alertmanagers:
        - static_configs:
            - targets:
              - alertmanager:9093

    scrape_configs:
      - job_name: 'kubernetes-apiservers'
        kubernetes_sd_configs:
        - role: endpoints
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs:
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: default;kubernetes;https
      
      - job_name: 'kubernetes-nodes'
        kubernetes_sd_configs:
        - role: node
        scheme: https
        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
        relabel_configs:
        - action: labelmap
          regex: __meta_kubernetes_node_label_(.+)
      
      - job_name: 'kubernetes-pods'
        kubernetes_sd_configs:
        - role: pod
        relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: $1:$2
          target_label: __address__
        - action: labelmap
          regex: __meta_kubernetes_pod_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_pod_name]
          action: replace
          target_label: kubernetes_pod_name
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
        - name: prometheus
          image: prom/prometheus:v2.40.0
          args:
            - '--config.file=/etc/prometheus/prometheus.yml'
            - '--storage.tsdb.path=/prometheus/'
            - '--web.console.libraries=/etc/prometheus/console_libraries'
            - '--web.console.templates=/etc/prometheus/consoles'
            - '--storage.tsdb.retention.time=200h'
            - '--web.enable-lifecycle'
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: prometheus-config-volume
              mountPath: /etc/prometheus/
            - name: prometheus-storage-volume
              mountPath: /prometheus/
          resources:
            requests:
              cpu: 500m
              memory: 500M
            limits:
              cpu: 1
              memory: 1Gi
      volumes:
        - name: prometheus-config-volume
          configMap:
            defaultMode: 420
            name: prometheus-config
        - name: prometheus-storage-volume
          emptyDir: {}
```

---

## 13. Best Practices

### **Security Best Practices**

#### **1. RBAC Configuration**

```yaml
# rbac-best-practices.yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: ecommerce
  name: developer-role
rules:
  - apiGroups: ['']
    resources: ['pods', 'services', 'configmaps', 'secrets']
    verbs: ['get', 'list', 'watch', 'create', 'update', 'patch', 'delete']
  - apiGroups: ['apps']
    resources: ['deployments', 'replicasets']
    verbs: ['get', 'list', 'watch', 'create', 'update', 'patch', 'delete']
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: developer-binding
  namespace: ecommerce
subjects:
  - kind: User
    name: developer@company.com
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: developer-role
  apiGroup: rbac.authorization.k8s.io
```

#### **2. Pod Security Standards**

```yaml
# pod-security-policy.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: secure-apps
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
---
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
  namespace: secure-apps
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
    - name: app
      image: nginx:1.21
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        runAsNonRoot: true
        runAsUser: 1000
        capabilities:
          drop:
            - ALL
      volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: var-cache
          mountPath: /var/cache/nginx
        - name: var-run
          mountPath: /var/run
  volumes:
    - name: tmp
      emptyDir: {}
    - name: var-cache
      emptyDir: {}
    - name: var-run
      emptyDir: {}
```

### **Resource Management Best Practices**

#### **1. Resource Requests and Limits**

```yaml
# resource-management.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: resource-aware-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: resource-aware-app
  template:
    metadata:
      labels:
        app: resource-aware-app
    spec:
      containers:
        - name: app
          image: nginx:1.21
          resources:
            requests:
              memory: '64Mi'
              cpu: '250m'
            limits:
              memory: '128Mi'
              cpu: '500m'
          env:
            - name: NODE_ENV
              value: 'production'
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
```

#### **2. Horizontal Pod Autoscaler (HPA)**

```yaml
# hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: resource-aware-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15
        - type: Pods
          value: 4
          periodSeconds: 15
      selectPolicy: Max
```

#### **3. Vertical Pod Autoscaler (VPA)**

```yaml
# vpa.yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: resource-aware-app
  updatePolicy:
    updateMode: 'Auto' # Auto, Initial, Off
  resourcePolicy:
    containerPolicies:
      - containerName: app
        minAllowed:
          cpu: 100m
          memory: 128Mi
        maxAllowed:
          cpu: 1
          memory: 1Gi
        controlledResources: ['cpu', 'memory']
        controlledValues: RequestsAndLimits
```

#### **4. Pod Disruption Budget (PDB)**

```yaml
# pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 1 # Ensure at least 1 pod is always available
  selector:
    matchLabels:
      app: resource-aware-app
---
# Alternative: maxUnavailable
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb-max
spec:
  maxUnavailable: 1 # Allow maximum 1 pod to be unavailable
  selector:
    matchLabels:
      app: resource-aware-app
```

#### **5. Cluster Autoscaler**

```yaml
# cluster-autoscaler.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
        - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.21.0
          name: cluster-autoscaler
          resources:
            limits:
              cpu: 100m
              memory: 300Mi
            requests:
              cpu: 100m
              memory: 300Mi
          command:
            - ./cluster-autoscaler
            - --v=4
            - --stderrthreshold=info
            - --cloud-provider=aws
            - --skip-nodes-with-local-storage=false
            - --expander=least-waste
            - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/kubernetes.io/cluster/your-cluster-name
          env:
            - name: AWS_REGION
              value: us-west-2
          volumeMounts:
            - name: ssl-certs
              mountPath: /etc/ssl/certs/ca-certificates.crt
              readOnly: true
      volumes:
        - name: ssl-certs
          hostPath:
            path: '/etc/ssl/certs/ca-bundle.crt'
```

### **Configuration Management**

#### **1. ConfigMaps**

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: ecommerce
data:
  # Configuration as key-value pairs
  database.host: 'postgres.ecommerce-db.svc.cluster.local'
  database.port: '5432'
  database.name: 'ecommerce'
  app.environment: 'production'
  app.debug: 'false'

  # Configuration as files
  application.properties: |
    server.port=8080
    spring.datasource.url=jdbc:postgresql://postgres.ecommerce-db.svc.cluster.local:5432/ecommerce
    spring.datasource.username=admin
    logging.level.com.company=INFO

  nginx.conf: |
    server {
        listen 80;
        server_name localhost;
        location / {
            proxy_pass http://backend;
        }
    }
---
# Using ConfigMap in Pod
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
    - name: app
      image: app:latest
      env:
        # Using individual keys
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database.host
        - name: DB_PORT
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database.port
        # Using all keys as environment variables
        - name: APP_CONFIG
          valueFrom:
            configMapRef:
              name: app-config
      volumeMounts:
        # Mounting as volume
        - name: config-volume
          mountPath: /etc/config
        - name: nginx-config
          mountPath: /etc/nginx/nginx.conf
          subPath: nginx.conf
  volumes:
    - name: config-volume
      configMap:
        name: app-config
    - name: nginx-config
      configMap:
        name: app-config
        items:
          - key: nginx.conf
            path: nginx.conf
```

#### **2. Secrets**

```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: ecommerce
type: Opaque
data:
  # Base64 encoded values
  database-password: cGFzc3dvcmQxMjM= # password123
  jwt-secret: bXlqd3RzZWNyZXQ= # myjwtsecret
  api-key: YWJjZGVmZ2hpams= # abcdefghijk
stringData:
  # Plain text values (automatically base64 encoded)
  database-username: admin
  redis-password: redispass123
---
# TLS Secret
apiVersion: v1
kind: Secret
metadata:
  name: tls-secret
  namespace: ecommerce
type: kubernetes.io/tls
data:
  tls.crt: LS0tLS1CRUdJTi... # Base64 encoded certificate
  tls.key: LS0tLS1CRUdJTi... # Base64 encoded private key
---
# Using Secrets in Pod
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
    - name: app
      image: app:latest
      env:
        # Using individual secret keys
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-password
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: jwt-secret
        # Using all secrets as environment variables
        - name: APP_SECRETS
          valueFrom:
            secretRef:
              name: app-secrets
      volumeMounts:
        # Mounting secrets as volume
        - name: secret-volume
          mountPath: /etc/secrets
          readOnly: true
        - name: tls-volume
          mountPath: /etc/ssl/certs
          readOnly: true
  volumes:
    - name: secret-volume
      secret:
        secretName: app-secrets
        defaultMode: 0400
    - name: tls-volume
      secret:
        secretName: tls-secret
        defaultMode: 0400
```

#### **3. Secret Management Best Practices**

```yaml
# External Secret Operator example
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: ecommerce
spec:
  provider:
    vault:
      server: 'https://vault.company.com'
      path: 'secret'
      version: 'v2'
      auth:
        kubernetes:
          mountPath: 'kubernetes'
          role: 'app-role'
---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: app-external-secret
  namespace: ecommerce
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secrets
    creationPolicy: Owner
  data:
    - secretKey: database-password
      remoteRef:
        key: ecommerce/database
        property: password
    - secretKey: jwt-secret
      remoteRef:
        key: ecommerce/app
        property: jwt-secret
```

### **Deployment Best Practices**

#### **1. Rolling Updates Strategy**

```yaml
# rolling-update.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rolling-update-app
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 2
  selector:
    matchLabels:
      app: rolling-update-app
  template:
    metadata:
      labels:
        app: rolling-update-app
    spec:
      containers:
        - name: app
          image: nginx:1.21
          ports:
            - containerPort: 80
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 3
```

#### **2. Blue-Green Deployment**

```yaml
# blue-green-deployment.yaml
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: app-v1 # Start with blue (v1)
  ports:
    - port: 80
      targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app-v1
  template:
    metadata:
      labels:
        app: app-v1
        version: '1.0'
    spec:
      containers:
        - name: app
          image: app:v1.0.0
          ports:
            - containerPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: app-v2
  template:
    metadata:
      labels:
        app: app-v2
        version: '2.0'
    spec:
      containers:
        - name: app
          image: app:v2.0.0
          ports:
            - containerPort: 8080
```

### **Monitoring Best Practices**

#### **1. Application Metrics**

```yaml
# metrics-example.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metrics-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: metrics-app
  template:
    metadata:
      labels:
        app: metrics-app
      annotations:
        prometheus.io/scrape: 'true'
        prometheus.io/port: '8080'
        prometheus.io/path: '/metrics'
    spec:
      containers:
        - name: app
          image: metrics-app:latest
          ports:
            - name: http
              containerPort: 8080
            - name: metrics
              containerPort: 9090
          env:
            - name: METRICS_PORT
              value: '9090'
          resources:
            requests:
              memory: '128Mi'
              cpu: '100m'
            limits:
              memory: '256Mi'
              cpu: '200m'
```

#### **2. Logging Configuration**

```yaml
# logging-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: fluent-bit-config
  namespace: logging
data:
  fluent-bit.conf: |
    [SERVICE]
        Flush         1
        Log_Level     info
        Daemon        off
        Parsers_File  parsers.conf
        HTTP_Server   On
        HTTP_Listen   0.0.0.0
        HTTP_Port     2020

    [INPUT]
        Name              tail
        Path              /var/log/containers/*.log
        Parser            docker
        Tag               kube.*
        Refresh_Interval  5
        Mem_Buf_Limit     50MB
        Skip_Long_Lines   On

    [FILTER]
        Name                kubernetes
        Match               kube.*
        Kube_URL            https://kubernetes.default.svc:443
        Kube_CA_File        /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        Kube_Token_File     /var/run/secrets/kubernetes.io/serviceaccount/token
        Kube_Tag_Prefix     kube.var.log.containers.
        Merge_Log           On
        Keep_Log            Off
        K8S-Logging.Parser  On
        K8S-Logging.Exclude Off

    [OUTPUT]
        Name  es
        Match *
        Host  elasticsearch.logging.svc.cluster.local
        Port  9200
        Index kubernetes-logs
        Type  _doc
```

### **Operational Best Practices**

#### **1. Health Checks**

```yaml
# health-checks.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: health-check-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: health-check-app
  template:
    metadata:
      labels:
        app: health-check-app
    spec:
      containers:
        - name: app
          image: health-check-app:latest
          ports:
            - containerPort: 8080
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
          startupProbe:
            httpGet:
              path: /startup
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 30
```

#### **2. Resource Quotas**

```yaml
# resource-quotas.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: ecommerce
spec:
  hard:
    requests.cpu: '4'
    requests.memory: 8Gi
    limits.cpu: '8'
    limits.memory: 16Gi
    persistentvolumeclaims: '10'
    pods: '20'
    services: '10'
    secrets: '20'
    configmaps: '20'
---
apiVersion: v1
kind: LimitRange
metadata:
  name: compute-limits
  namespace: ecommerce
spec:
  limits:
    - default:
        cpu: '500m'
        memory: '512Mi'
      defaultRequest:
        cpu: '100m'
        memory: '128Mi'
      type: Container
    - max:
        storage: 10Gi
      min:
        storage: 1Gi
      type: PersistentVolumeClaim
```

---

## 🎯 **Summary**

This comprehensive Kubernetes module covers:

- ✅ **Kubernetes Fundamentals**: Architecture, components, and core concepts
- ✅ **Installation & Setup**: kubeadm, managed services, and production deployments
- ✅ **Workload Management**: Pods, Deployments, Services, and advanced controllers
- ✅ **Networking**: Services, Ingress, and service mesh with Istio
- ✅ **Storage**: Persistent volumes, storage classes, and stateful workloads
- ✅ **Security**: RBAC, network policies, pod security, and admission controllers
- ✅ **Monitoring**: Prometheus, Grafana, and ELK stack for observability
- ✅ **CI/CD Integration**: Jenkins, GitLab CI, and GitOps with ArgoCD
- ✅ **Advanced Topics**: CRDs, operators, and enterprise patterns

### **Key Benefits of Kubernetes**

- 🚀 **Container Orchestration**: Automated deployment, scaling, and management
- 🔄 **High Availability**: Self-healing and fault tolerance
- 📈 **Scalability**: Horizontal and vertical scaling capabilities
- 🔒 **Security**: Built-in security features and policies
- 🌐 **Multi-Cloud**: Cloud-agnostic platform
- 🛠️ **Extensibility**: Custom resources and operators

### **Next Steps**

1. **Set up Kubernetes**: Choose installation method and deploy cluster
2. **Deploy Applications**: Start with simple workloads and progress to complex ones
3. **Implement Security**: Configure RBAC, network policies, and pod security
4. **Set up Monitoring**: Deploy Prometheus, Grafana, and logging stack
5. **Integrate CI/CD**: Connect your pipelines with Kubernetes
6. **Explore Advanced Features**: Implement operators and custom resources

---

🚀 **You're now ready to master Kubernetes and build enterprise-grade containerized applications!**

This module provides everything you need to become proficient in Kubernetes, from basic concepts to advanced enterprise patterns and best practices.
