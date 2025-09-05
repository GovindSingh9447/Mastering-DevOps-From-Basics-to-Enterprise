# 🛡️ Module 8: Security Tools - DevSecOps & Security Automation

## 📑 Table of Contents

1. [Introduction to DevSecOps](#1-introduction-to-devsecops)
2. [Vulnerability Scanning Tools](#2-vulnerability-scanning-tools)
3. [Container Security](#3-container-security)
4. [Infrastructure Security](#4-infrastructure-security)
5. [Application Security Testing](#5-application-security-testing)
6. [Secrets Management](#6-secrets-management)
7. [Compliance & Governance](#7-compliance--governance)
8. [Security Monitoring & SIEM](#8-security-monitoring--siem)
9. [Real-World Security Projects](#9-real-world-security-projects)
10. [Security Best Practices](#10-security-best-practices)

---

## 1. Introduction to DevSecOps

### **What is DevSecOps?**

**DevSecOps** integrates security practices into the DevOps pipeline, ensuring that security is built into every stage of the software development lifecycle (SDLC) rather than being an afterthought.

### **DevSecOps Principles**

- 🔒 **Shift Left**: Integrate security early in the development process
- 🔄 **Automation**: Automate security testing and compliance checks
- 📊 **Continuous Monitoring**: Real-time security monitoring and alerting
- 🛡️ **Security as Code**: Define security policies as code
- 🔍 **Visibility**: Complete visibility into security posture

### **Security in CI/CD Pipeline**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Code      │───▶│   Build     │───▶│   Test      │───▶│   Deploy    │
│  Commit     │    │  & Package  │    │  & Quality  │    │  & Monitor  │
│             │    │             │    │             │    │             │
│ 🔍 SAST     │    │ 🔍 SCA      │    │ 🔍 DAST     │    │ 🔍 Runtime  │
│ 🔍 Secrets  │    │ 🔍 Container│    │ 🔍 IAST     │    │ 🔍 Monitoring│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### **Security Tool Categories**

- **SAST**: Static Application Security Testing
- **DAST**: Dynamic Application Security Testing
- **SCA**: Software Composition Analysis
- **Container Security**: Image scanning and runtime protection
- **Infrastructure Security**: IaC scanning and compliance
- **Secrets Management**: Secure storage and rotation

---

## 2. Vulnerability Scanning Tools

### **Trivy - Comprehensive Vulnerability Scanner**

#### **Installation**

```bash
# Install Trivy
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Or using package managers
# Ubuntu/Debian
sudo apt-get install trivy

# CentOS/RHEL
sudo yum install trivy

# macOS
brew install trivy
```

#### **Basic Usage**

```bash
# Scan a Docker image
trivy image nginx:latest

# Scan a filesystem
trivy fs .

# Scan a repository
trivy repo https://github.com/user/repo

# Scan with specific severity
trivy image --severity HIGH,CRITICAL nginx:latest

# Generate JSON report
trivy image --format json --output trivy-report.json nginx:latest

# Scan with custom policies
trivy image --config-policy ./policies nginx:latest
```

#### **Trivy Configuration**

```yaml
# .trivyignore
# Ignore specific vulnerabilities
CVE-2021-12345
CVE-2021-67890

# trivy.yaml
format: table
severity: HIGH,CRITICAL
exit-code: 1
ignore-unfixed: true
vuln-type: os,library
security-checks: vuln,config,secret
```

### **OWASP ZAP - Dynamic Security Testing**

#### **Installation & Setup**

```bash
# Download OWASP ZAP
wget https://github.com/zaproxy/zaproxy/releases/download/v2.12.0/ZAP_2.12.0_Linux.tar.gz
tar -xzf ZAP_2.12.0_Linux.tar.gz
cd ZAP_2.12.0

# Start ZAP in daemon mode
./zap.sh -daemon -host 0.0.0.0 -port 8080
```

#### **ZAP CLI Usage**

```bash
# Basic scan
zap-cli quick-scan --self-contained --start-options '-config api.disablekey=true' http://target.com

# Full scan with authentication
zap-cli quick-scan --self-contained \
  --start-options '-config api.disablekey=true' \
  --context-info "Username:admin,Password:password" \
  http://target.com

# Generate report
zap-cli report -o zap-report.html -f html

# Spider and active scan
zap-cli spider http://target.com
zap-cli active-scan http://target.com
zap-cli report -o zap-report.html -f html
```

#### **ZAP in CI/CD Pipeline**

```yaml
# GitHub Actions example
- name: OWASP ZAP Scan
  uses: zaproxy/action-baseline@v0.7.0
  with:
    target: 'http://localhost:8080'
    rules_file_name: '.zap/rules.tsv'
    cmd_options: '-a'
```

### **Snyk - Developer-First Security**

#### **Installation**

```bash
# Install Snyk CLI
npm install -g snyk

# Authenticate
snyk auth

# Or using Docker
docker run --rm -v $(pwd):/app snyk/snyk:docker test
```

#### **Snyk Usage**

```bash
# Test for vulnerabilities
snyk test

# Monitor project
snyk monitor

# Test Docker image
snyk container test nginx:latest

# Test Infrastructure as Code
snyk iac test terraform/

# Fix vulnerabilities
snyk wizard

# Generate report
snyk test --json > snyk-report.json
```

#### **Snyk Configuration**

```json
// .snyk policy file
{
  "language-settings": {
    "javascript": {
      "dev-dependencies": true
    }
  },
  "ignore": {
    "CVE-2021-12345": [
      {
        "reason": "False positive",
        "expires": "2024-12-31T23:59:59.999Z"
      }
    ]
  }
}
```

---

## 3. Container Security

### **Docker Security Scanning**

#### **Docker Bench Security**

```bash
# Run Docker Bench Security
docker run --rm --net host --pid host --userns host --cap-add audit_control \
  -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \
  -v /etc:/etc:ro \
  -v /usr/bin/containerd:/usr/bin/containerd:ro \
  -v /usr/bin/runc:/usr/bin/runc:ro \
  -v /usr/lib/systemd:/usr/lib/systemd:ro \
  -v /var/lib:/var/lib:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --label docker_bench_security \
  docker/docker-bench-security
```

#### **Container Image Security**

```bash
# Scan with Trivy
trivy image --severity HIGH,CRITICAL myapp:latest

# Scan with Snyk
snyk container test myapp:latest

# Scan with Docker Scout
docker scout cves myapp:latest

# Scan with Clair
clair-scanner --ip 192.168.1.100 myapp:latest
```

### **Kubernetes Security**

#### **kube-bench - CIS Kubernetes Benchmark**

```bash
# Install kube-bench
curl -L https://github.com/aquasecurity/kube-bench/releases/download/v0.6.15/kube-bench_0.6.15_linux_amd64.tar.gz | tar -xz
sudo mv kube-bench /usr/local/bin/

# Run benchmark
kube-bench run --targets master,node,etcd,policies

# Run with specific version
kube-bench run --targets master --version 1.25
```

#### **kube-hunter - Kubernetes Penetration Testing**

```bash
# Install kube-hunter
pip3 install kube-hunter

# Run kube-hunter
kube-hunter --remote some.node.com

# Run in pod
kubectl run kube-hunter --image=aquasec/kube-hunter --rm -it --restart=Never
```

#### **Falco - Runtime Security**

```bash
# Install Falco
curl -s https://falco.org/repo/falcosecurity-3672BA8F.asc | apt-key add -
echo "deb https://download.falco.org/packages/deb stable main" | tee -a /etc/apt/sources.list.d/falcosecurity.list
apt-get update -y
apt-get install -y falco

# Start Falco
systemctl start falco
systemctl enable falco

# Custom rules
falco --rules-file custom-rules.yaml
```

---

## 4. Infrastructure Security

### **Terraform Security Scanning**

#### **Checkov - Infrastructure as Code Security**

```bash
# Install Checkov
pip install checkov

# Scan Terraform files
checkov -d terraform/

# Scan with specific framework
checkov -d terraform/ --framework terraform

# Scan with custom policies
checkov -d terraform/ --external-checks-dir ./custom-policies

# Generate report
checkov -d terraform/ --output json --output-file-path checkov-report.json
```

#### **TFSec - Terraform Security Scanner**

```bash
# Install TFSec
curl -s https://raw.githubusercontent.com/aquasecurity/tfsec/master/scripts/install_linux.sh | bash

# Scan Terraform files
tfsec terraform/

# Scan with specific severity
tfsec terraform/ --minimum-severity HIGH

# Generate report
tfsec terraform/ --format json --out tfsec-report.json
```

### **Cloud Security Scanning**

#### **AWS Security Tools**

```bash
# Install AWS CLI
pip install awscli

# Install Prowler
pip install prowler

# Run Prowler scan
prowler aws

# Scan specific region
prowler aws --region us-east-1

# Generate report
prowler aws --output-format json --output-directory ./prowler-reports
```

#### **Azure Security Center**

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Install AzSK
Install-Module -Name AzSK -AllowClobber

# Run security scan
Get-AzSKSubscriptionSecurityStatus
```

---

## 5. Application Security Testing

### **SAST - Static Application Security Testing**

#### **SonarQube Security Rules**

```properties
# sonar-project.properties
sonar.security.hotspots.reviewed=true
sonar.security.hotspots.reviewed.by=security-team
sonar.security.hotspots.reviewed.status=REVIEWED
```

#### **Semgrep - Static Analysis**

```bash
# Install Semgrep
pip install semgrep

# Run Semgrep
semgrep --config=auto .

# Run with specific rules
semgrep --config=p/security-audit .

# Generate SARIF report
semgrep --config=auto --output=semgrep-report.sarif .
```

### **DAST - Dynamic Application Security Testing**

#### **Burp Suite Integration**

```bash
# Burp Suite Professional CLI
java -jar burpsuite_pro.jar --project-file=project.burp --config-file=config.json

# Burp Suite Community Edition
java -jar burpsuite_community.jar
```

#### **Nuclei - Vulnerability Scanner**

```bash
# Install Nuclei
go install -v github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest

# Run Nuclei
nuclei -u https://target.com

# Run with specific templates
nuclei -t cves/ -u https://target.com

# Run with custom templates
nuclei -t custom-templates/ -u https://target.com
```

---

## 6. Secrets Management

### **HashiCorp Vault**

#### **Installation & Setup**

```bash
# Install Vault
wget https://releases.hashicorp.com/vault/1.15.0/vault_1.15.0_linux_amd64.zip
unzip vault_1.15.0_linux_amd64.zip
sudo mv vault /usr/local/bin/

# Start Vault in dev mode
vault server -dev

# Set environment
export VAULT_ADDR='http://127.0.0.1:8200'
export VAULT_TOKEN='dev-token'
```

#### **Vault Configuration**

```hcl
# vault.hcl
storage "file" {
  path = "/opt/vault/data"
}

listener "tcp" {
  address = "127.0.0.1:8200"
  tls_disable = 1
}

api_addr = "http://127.0.0.1:8200"
cluster_addr = "https://127.0.0.1:8201"
ui = true
```

#### **Vault Operations**

```bash
# Enable KV secrets engine
vault secrets enable -path=secret kv-v2

# Write secret
vault kv put secret/myapp/config username="admin" password="secret123"

# Read secret
vault kv get secret/myapp/config

# Enable AWS secrets engine
vault secrets enable aws

# Configure AWS credentials
vault write aws/config/root access_key=AKIA... secret_key=...

# Create AWS role
vault write aws/roles/my-role credential_type=iam_user policy_document=-<<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
EOF
```

### **AWS Secrets Manager**

#### **AWS CLI Operations**

```bash
# Create secret
aws secretsmanager create-secret \
  --name "myapp/database" \
  --description "Database credentials" \
  --secret-string '{"username":"admin","password":"secret123"}'

# Retrieve secret
aws secretsmanager get-secret-value \
  --secret-id "myapp/database" \
  --query SecretString --output text

# Update secret
aws secretsmanager update-secret \
  --secret-id "myapp/database" \
  --secret-string '{"username":"admin","password":"newpassword"}'

# Rotate secret
aws secretsmanager rotate-secret \
  --secret-id "myapp/database" \
  --rotation-lambda-arn "arn:aws:lambda:us-east-1:123456789012:function:rotate-secret"
```

### **Kubernetes Secrets**

#### **Secrets Management**

```yaml
# Create secret
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
data:
  username: YWRtaW4=  # base64 encoded
  password: c2VjcmV0MTIz  # base64 encoded

# Use secret in pod
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
spec:
  containers:
  - name: myapp
    image: myapp:latest
    env:
    - name: DB_USERNAME
      valueFrom:
        secretKeyRef:
          name: myapp-secret
          key: username
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: myapp-secret
          key: password
```

#### **External Secrets Operator**

```yaml
# Install External Secrets Operator
kubectl apply -f https://raw.githubusercontent.com/external-secrets/external-secrets/main/deploy/charts/external-secrets/templates/crds/crds.yaml

# Create SecretStore
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "my-role"

# Create ExternalSecret
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: myapp-secret
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: myapp-secret
    creationPolicy: Owner
  data:
  - secretKey: username
    remoteRef:
      key: myapp/config
      property: username
  - secretKey: password
    remoteRef:
      key: myapp/config
      property: password
```

---

## 7. Compliance & Governance

### **Open Policy Agent (OPA)**

#### **Installation**

```bash
# Install OPA
curl -L -o opa https://openpolicyagent.org/downloads/v0.57.0/opa_linux_amd64_static
chmod 755 opa
sudo mv opa /usr/local/bin/
```

#### **OPA Policies**

```rego
# kubernetes-security.rego
package kubernetes.security

# Deny containers running as root
deny[msg] {
    input.kind == "Pod"
    input.spec.containers[_].securityContext.runAsUser == 0
    msg := "Container must not run as root"
}

# Require resource limits
deny[msg] {
    input.kind == "Pod"
    container := input.spec.containers[_]
    not container.resources.limits.memory
    msg := "Container must have memory limits"
}

# Require security context
deny[msg] {
    input.kind == "Pod"
    not input.spec.securityContext
    msg := "Pod must have security context"
}
```

#### **OPA Gatekeeper**

```bash
# Install Gatekeeper
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/release-3.14/deploy/gatekeeper.yaml

# Create ConstraintTemplate
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels
      validation:
        properties:
          labels:
            type: array
            items:
              type: string
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8srequiredlabels
        violation[{"msg": msg}] {
          required := input.parameters.labels
          provided := input.review.object.metadata.labels
          missing := required[_]
          not provided[missing]
          msg := sprintf("Missing required label: %v", [missing])
        }

# Create Constraint
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sRequiredLabels
metadata:
  name: must-have-gk
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
  parameters:
    labels: ["gatekeeper"]
```

### **CIS Benchmarks**

#### **CIS Docker Benchmark**

```bash
# Run CIS Docker benchmark
docker run --rm --net host --pid host --userns host --cap-add audit_control \
  -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \
  -v /etc:/etc:ro \
  -v /usr/bin/containerd:/usr/bin/containerd:ro \
  -v /usr/bin/runc:/usr/bin/runc:ro \
  -v /usr/lib/systemd:/usr/lib/systemd:ro \
  -v /var/lib:/var/lib:ro \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  --label docker_bench_security \
  docker/docker-bench-security
```

#### **CIS Kubernetes Benchmark**

```bash
# Run CIS Kubernetes benchmark
kube-bench run --targets master,node,etcd,policies
```

---

## 8. Security Monitoring & SIEM

### **ELK Stack for Security**

#### **Elasticsearch Security Configuration**

```yaml
# elasticsearch.yml
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.key: /path/to/elasticsearch.key
xpack.security.transport.ssl.certificate: /path/to/elasticsearch.crt
xpack.security.transport.ssl.certificate_authorities: ['/path/to/ca.crt']
```

#### **Logstash Security Pipeline**

```ruby
# security-pipeline.conf
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][log_type] == "security" {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:timestamp} %{WORD:level} %{GREEDYDATA:message}" }
    }

    if [message] =~ /authentication failed/ {
      mutate {
        add_tag => [ "security", "auth_failure" ]
      }
    }

    if [message] =~ /unauthorized access/ {
      mutate {
        add_tag => [ "security", "unauthorized" ]
      }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "security-logs-%{+YYYY.MM.dd}"
  }
}
```

### **Prometheus Security Monitoring**

#### **Security Metrics**

```yaml
# security-rules.yml
groups:
  - name: security.rules
    rules:
      - alert: HighFailedLogins
        expr: rate(auth_failures_total[5m]) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: 'High number of failed login attempts'
          description: 'Rate of failed logins is {{ $value }} per second'

      - alert: UnauthorizedAccess
        expr: increase(unauthorized_access_total[5m]) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: 'Multiple unauthorized access attempts detected'
          description: '{{ $value }} unauthorized access attempts in the last 5 minutes'
```

---

## 9. Real-World Security Projects

### **Project 1: Complete DevSecOps Pipeline**

#### **Jenkins Security Pipeline**

```groovy
pipeline {
    agent any

    environment {
        VAULT_ADDR = 'https://vault.company.com'
        VAULT_TOKEN = credentials('vault-token')
    }

    stages {
        stage('Security Scan - SAST') {
            steps {
                script {
                    // SonarQube security analysis
                    withSonarQubeEnv('SonarQube') {
                        sh '''
                            mvn sonar:sonar \
                            -Dsonar.security.hotspots.reviewed=true \
                            -Dsonar.security.hotspots.reviewed.by=security-team
                        '''
                    }
                }
            }
        }

        stage('Security Scan - SCA') {
            steps {
                script {
                    // Snyk vulnerability scan
                    sh 'snyk test --severity-threshold=high'

                    // Trivy filesystem scan
                    sh 'trivy fs --severity HIGH,CRITICAL .'
                }
            }
        }

        stage('Container Security') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t myapp:${BUILD_NUMBER} .'

                    // Scan container image
                    sh 'trivy image --severity HIGH,CRITICAL myapp:${BUILD_NUMBER}'

                    // Scan with Snyk
                    sh 'snyk container test myapp:${BUILD_NUMBER}'
                }
            }
        }

        stage('Infrastructure Security') {
            steps {
                script {
                    // Scan Terraform files
                    sh 'checkov -d terraform/ --framework terraform'
                    sh 'tfsec terraform/'
                }
            }
        }

        stage('Dynamic Security Testing') {
            steps {
                script {
                    // Start application
                    sh 'docker run -d -p 8080:8080 --name test-app myapp:${BUILD_NUMBER}'

                    // Wait for application to start
                    sh 'sleep 30'

                    // Run OWASP ZAP scan
                    sh '''
                        zap-cli quick-scan --self-contained \
                        --start-options '-config api.disablekey=true' \
                        http://localhost:8080
                    '''

                    // Run Nuclei scan
                    sh 'nuclei -u http://localhost:8080 -t cves/'
                }
            }
        }

        stage('Compliance Check') {
            steps {
                script {
                    // Run OPA policies
                    sh 'opa test policies/'
                    sh 'conftest test k8s/'
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                allOf {
                    branch 'main'
                    not { anyOf {
                        changeRequest()
                        buildingTag()
                    }}
                }
            }
            steps {
                script {
                    // Deploy to staging with security context
                    sh '''
                        kubectl apply -f k8s/staging/ \
                        --validate=true \
                        --dry-run=client
                    '''

                    sh 'kubectl apply -f k8s/staging/'
                }
            }
        }
    }

    post {
        always {
            script {
                // Clean up test container
                sh 'docker stop test-app || true'
                sh 'docker rm test-app || true'
            }
        }
        success {
            script {
                // Send success notification
                slackSend(
                    channel: '#security',
                    color: 'good',
                    message: "✅ Security pipeline passed for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                )
            }
        }
        failure {
            script {
                // Send failure notification
                slackSend(
                    channel: '#security',
                    color: 'danger',
                    message: "❌ Security pipeline failed for ${env.JOB_NAME} #${env.BUILD_NUMBER}"
                )
            }
        }
    }
}
```

### **Project 2: Kubernetes Security Hardening**

#### **Pod Security Standards**

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
# secure-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
  namespace: secure-apps
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
  containers:
    - name: app
      image: myapp:latest
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        runAsNonRoot: true
        runAsUser: 1000
        capabilities:
          drop:
            - ALL
      resources:
        limits:
          memory: '128Mi'
          cpu: '100m'
        requests:
          memory: '64Mi'
          cpu: '50m'
      volumeMounts:
        - name: tmp
          mountPath: /tmp
        - name: var-cache
          mountPath: /var/cache
  volumes:
    - name: tmp
      emptyDir: {}
    - name: var-cache
      emptyDir: {}
```

#### **Network Policies**

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: secure-app-network-policy
  namespace: secure-apps
spec:
  podSelector:
    matchLabels:
      app: myapp
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
          port: 8080
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              name: database
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

---

## 10. Security Best Practices

### **Development Security**

#### **Secure Coding Practices**

```java
// Good: Parameterized queries
String query = "SELECT * FROM users WHERE id = ?";
PreparedStatement stmt = connection.prepareStatement(query);
stmt.setString(1, userId);

// Bad: SQL injection vulnerability
String query = "SELECT * FROM users WHERE id = '" + userId + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);
```

#### **Input Validation**

```python
import re
from flask import request, abort

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        abort(400, "Invalid email format")
    return email

def validate_input(data):
    # Sanitize input
    if isinstance(data, str):
        # Remove potentially dangerous characters
        data = re.sub(r'[<>"\']', '', data)
    return data
```

### **Infrastructure Security**

#### **Secure Configuration**

```hcl
# terraform/security.tf
resource "aws_security_group" "app_sg" {
  name_prefix = "app-"
  vpc_id      = var.vpc_id

  # Allow HTTP from ALB only
  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  # Allow HTTPS from ALB only
  ingress {
    from_port       = 8443
    to_port         = 8443
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  # Deny all other ingress
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    action      = "deny"
  }

  # Allow outbound HTTPS only
  egress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "app-security-group"
  }
}
```

### **Monitoring & Alerting**

#### **Security Alerts**

```yaml
# prometheus-security-alerts.yml
groups:
  - name: security
    rules:
      - alert: SecurityScanFailure
        expr: security_scan_failures_total > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: 'Security scan failed'
          description: 'Security scan failed for {{ $labels.job }}'

      - alert: HighVulnerabilityCount
        expr: vulnerability_count_total > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: 'High vulnerability count detected'
          description: '{{ $value }} vulnerabilities found in {{ $labels.image }}'

      - alert: UnauthorizedAccess
        expr: rate(unauthorized_access_total[5m]) > 0.1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: 'Unauthorized access detected'
          description: 'Rate of unauthorized access: {{ $value }} per second'
```

### **Incident Response**

#### **Security Incident Playbook**

```bash
#!/bin/bash
# security-incident-response.sh

# 1. Immediate Response
echo "🚨 Security incident detected!"
echo "Timestamp: $(date)"
echo "Incident ID: INC-$(date +%Y%m%d-%H%M%S)"

# 2. Gather Information
echo "📊 Gathering system information..."
kubectl get pods -A > incident-info/pods-$(date +%Y%m%d-%H%M%S).txt
kubectl get events -A > incident-info/events-$(date +%Y%m%d-%H%M%S).txt
docker ps -a > incident-info/containers-$(date +%Y%m%d-%H%M%S).txt

# 3. Check for Compromised Resources
echo "🔍 Checking for compromised resources..."
kubectl get pods -A -o json | jq '.items[] | select(.status.phase == "Running") | .metadata.name' > running-pods.txt

# 4. Isolate Affected Systems
echo "🔒 Isolating affected systems..."
# Add isolation logic here

# 5. Notify Security Team
echo "📧 Notifying security team..."
curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"🚨 Security incident detected! Incident ID: INC-'$(date +%Y%m%d-%H%M%S)'"}' \
  $SLACK_WEBHOOK_URL

# 6. Generate Report
echo "📋 Generating incident report..."
cat > incident-report-$(date +%Y%m%d-%H%M%S).md << EOF
# Security Incident Report

**Incident ID:** INC-$(date +%Y%m%d-%H%M%S)
**Timestamp:** $(date)
**Status:** Active

## Summary
Security incident detected and response initiated.

## Actions Taken
- [x] System information gathered
- [x] Affected systems identified
- [x] Security team notified
- [ ] Incident contained
- [ ] Root cause identified
- [ ] Remediation completed

## Next Steps
1. Complete incident containment
2. Identify root cause
3. Implement remediation
4. Update security policies
5. Conduct post-incident review
EOF

echo "✅ Incident response initiated. Report generated: incident-report-$(date +%Y%m%d-%H%M%S).md"
```

---

## 🎯 **Summary**

This comprehensive Security Tools module covers:

- ✅ **DevSecOps Integration**: Security in CI/CD pipelines
- ✅ **Vulnerability Scanning**: Trivy, OWASP ZAP, Snyk
- ✅ **Container Security**: Image scanning, runtime protection
- ✅ **Infrastructure Security**: IaC scanning, compliance
- ✅ **Application Security**: SAST, DAST, IAST
- ✅ **Secrets Management**: Vault, AWS Secrets Manager, Kubernetes secrets
- ✅ **Compliance**: OPA, CIS benchmarks, governance
- ✅ **Security Monitoring**: ELK stack, Prometheus, SIEM
- ✅ **Real Projects**: Complete DevSecOps pipeline, Kubernetes hardening
- ✅ **Best Practices**: Secure coding, infrastructure, incident response

### **Next Steps**

1. **Integrate Security**: Add security scanning to your CI/CD pipelines
2. **Implement Secrets Management**: Use Vault or cloud-native solutions
3. **Monitor Security**: Set up security monitoring and alerting
4. **Compliance**: Implement OPA policies and CIS benchmarks
5. **Incident Response**: Create and test incident response procedures

---

🚀 **You're now ready to implement enterprise-grade security in your DevOps practices!**

This module provides everything you need to build secure, compliant, and resilient systems with DevSecOps principles.

```

```
