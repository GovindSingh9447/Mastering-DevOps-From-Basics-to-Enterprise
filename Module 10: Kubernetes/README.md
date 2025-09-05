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

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF).

### **Why Kubernetes?**

- **🔄 Container Orchestration**: Manages complex containerized applications
- **📈 Auto-scaling**: Automatically scales applications based on demand
- **🛡️ High Availability**: Ensures application uptime and fault tolerance
- **🔧 Self-healing**: Automatically restarts failed containers
- **🌐 Multi-cloud**: Works across on-premises, cloud, and hybrid environments
- **🔒 Security**: Built-in security features and policies
- **📊 Observability**: Comprehensive monitoring and logging capabilities

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
