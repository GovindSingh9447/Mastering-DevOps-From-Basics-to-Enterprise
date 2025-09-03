# 🚀 Module 6: CI/CD Pipeline Automation

## 📑 Table of Contents

1. [Introduction to CI/CD](#1-introduction-to-cicd)
2. [Jenkins - The Complete Guide](#2-jenkins---the-complete-guide)
3. [GitHub Actions - Cloud-Native CI/CD](#3-github-actions---cloud-native-cicd)
4. [GitLab CI/CD - Integrated DevOps](#4-gitlab-cicd---integrated-devops)
5. [CI/CD Best Practices](#5-cicd-best-practices)
6. [Real-World Projects](#6-real-world-projects)
7. [Advanced CI/CD Patterns](#7-advanced-cicd-patterns)
8. [Monitoring & Observability](#8-monitoring--observability)

---

## 1. Introduction to CI/CD

### **What is CI/CD?**

**Continuous Integration (CI)** and **Continuous Delivery/Deployment (CD)** are DevOps practices that automate the process of building, testing, and deploying applications.

### **CI/CD Pipeline Flow**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Code      │───▶│   Build     │───▶│   Test      │───▶│   Deploy    │
│  Commit     │    │  & Package  │    │  & Quality  │    │  & Monitor  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### **Benefits of CI/CD**

- 🚀 **Faster Delivery**: Automated processes reduce manual errors
- 🔒 **Quality Assurance**: Automated testing ensures code quality
- 📊 **Visibility**: Real-time feedback on build and deployment status
- 🔄 **Consistency**: Same process across all environments
- 🛡️ **Risk Reduction**: Smaller, frequent deployments reduce risk

---

## 2. Jenkins - The Complete Guide

### **Jenkins Architecture & Setup**

#### **Installation Methods**

**Method 1: Docker Installation (Recommended)**

```bash
# Create Jenkins data directory
mkdir -p jenkins-data

# Run Jenkins with Docker
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins-data:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts
```

**Method 2: AWS EC2 Installation**

```bash
# Update system
sudo yum update -y

# Install Java 11
sudo yum install java-11-openjdk -y

# Download Jenkins
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# Install Jenkins
sudo yum install jenkins -y

# Start and enable Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

#### **Essential Plugins Installation**

1. **Git Integration**: Git, GitHub, GitLab
2. **Pipeline Support**: Pipeline, Blue Ocean
3. **Build Tools**: Maven, Gradle, NPM
4. **Quality Gates**: SonarQube Scanner, Quality Gates
5. **Security**: OWASP ZAP, Trivy
6. **Deployment**: SSH, Docker, Kubernetes
7. **Notifications**: Email Extension, Slack Notification

#### **Jenkins Global Configuration**

**SonarQube Integration**

```groovy
// Go to Manage Jenkins → Configure System → SonarQube installations
sonarQubeInstallations {
    sonarQubeInstallation {
        name('SonarQube')
        serverUrl('http://your-sonarqube:9000')
        credentialsId('sonar-token')
    }
}
```

**Docker Integration**

```groovy
// Go to Manage Jenkins → Configure System → Cloud → Add Docker
docker {
    name('docker')
    dockerHost('tcp://localhost:2376')
    credentialsId('docker-credentials')
}
```

### **Jenkins Job Types**

#### **1. Freestyle Jobs**

- **Use Case**: Simple, one-off tasks
- **Configuration**: Web-based UI
- **Best For**: Basic builds, deployments, maintenance tasks

#### **2. Pipeline Jobs**

- **Use Case**: Complex, multi-stage workflows
- **Configuration**: Jenkinsfile (Groovy-based)
- **Best For**: CI/CD pipelines, multi-environment deployments

#### **3. Multibranch Pipeline**

- **Use Case**: Multiple branches with same workflow
- **Configuration**: Jenkinsfile in each branch
- **Best For**: Feature branches, release management

### **Jenkins Pipeline Examples**

#### **Basic Declarative Pipeline**

```groovy
pipeline {
    agent any

    environment {
        JAVA_HOME = tool 'JDK11'
        MAVEN_HOME = tool 'Maven3.8'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                    jacoco(
                        execPattern: 'target/*.exec',
                        classPattern: 'target/classes',
                        sourcePattern: 'src/main/java'
                    )
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        mvn sonar:sonar \
                        -Dsonar.projectKey=my-project \
                        -Dsonar.projectName="My Project" \
                        -Dsonar.projectVersion=1.0
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("my-app:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker run -d -p 8080:8080 --name staging my-app:${env.BUILD_NUMBER}'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            emailext(
                to: 'team@company.com',
                subject: "Build ${env.BUILD_NUMBER} - SUCCESS",
                body: 'Build completed successfully!'
            )
        }
        failure {
            emailext(
                to: 'team@company.com',
                subject: "Build ${env.BUILD_NUMBER} - FAILED",
                body: 'Build failed! Check Jenkins for details.'
            )
        }
    }
}
```

#### **Advanced Pipeline with Parameters**

```groovy
pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'staging', 'production'],
            description: 'Select deployment environment'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: false,
            description: 'Skip running tests?'
        )
        string(
            name: 'VERSION',
            defaultValue: '1.0.0',
            description: 'Application version to deploy'
        )
    }

    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        IMAGE_NAME = 'my-app'
    }

    stages {
        stage('Validate Parameters') {
            steps {
                script {
                    if (params.ENVIRONMENT == 'production' && !params.SKIP_TESTS) {
                        error 'Production deployments must run tests!'
                    }
                }
            }
        }

        stage('Build & Test') {
            when {
                not { params.SKIP_TESTS }
            }
            steps {
                sh 'mvn clean verify'
                junit 'target/surefire-reports/*.xml'
            }
        }

        stage('Security Scan') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                sh 'trivy image --severity HIGH,CRITICAL ${IMAGE_NAME}:${params.VERSION}'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    switch(params.ENVIRONMENT) {
                        case 'dev':
                            deployToDev()
                            break
                        case 'staging':
                            deployToStaging()
                            break
                        case 'production':
                            deployToProduction()
                            break
                    }
                }
            }
        }
    }
}

def deployToDev() {
    echo "Deploying to DEV environment..."
    sh "docker run -d -p 8080:8080 --name dev-app ${IMAGE_NAME}:${params.VERSION}"
}

def deployToStaging() {
    echo "Deploying to STAGING environment..."
    sh "docker run -d -p 8081:8080 --name staging-app ${IMAGE_NAME}:${params.VERSION}"
}

def deployToProduction() {
    echo "Deploying to PRODUCTION environment..."
    sh "docker run -d -p 8082:8080 --name prod-app ${IMAGE_NAME}:${params.VERSION}"
}
```

### **Jenkins Shared Libraries**

#### **Library Structure**

```
shared-library/
├── vars/
│   ├── buildApp.groovy
│   ├── deployApp.groovy
│   └── notifyTeam.groovy
├── src/
│   └── org/company/
│       └── Utils.groovy
└── resources/
    └── templates/
        └── email-template.html
```

#### **Using Shared Libraries**

```groovy
@Library('my-shared-library') _

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                buildApp(
                    tool: 'Maven3.8',
                    goals: 'clean package'
                )
            }
        }

        stage('Deploy') {
            steps {
                deployApp(
                    environment: 'staging',
                    version: env.BUILD_NUMBER
                )
            }
        }
    }

    post {
        always {
            notifyTeam(
                status: currentBuild.result,
                channel: '#devops'
            )
        }
    }
}
```

### **Jenkins Security & Access Control**

#### **Matrix Authorization Strategy**

```groovy
// Go to Manage Jenkins → Configure Global Security → Authorization
// Select "Matrix-based security"

// User/Group Permissions Matrix:
// - Admin: Full access to everything
// - DevOps: Build, configure, delete jobs
// - Developers: Build, read jobs
// - Viewers: Read-only access
```

#### **Role-Based Access Control**

```groovy
// Install "Role-based Authorization Strategy" plugin
// Go to Manage Jenkins → Manage and Assign Roles

// Global Roles:
// - admin: Overall/Administer
// - devops: Overall/Read, Job/Build, Job/Configure
// - developer: Overall/Read, Job/Build
// - viewer: Overall/Read
```

---

## 3. GitHub Actions - Cloud-Native CI/CD

### **Workflow Structure**

#### **Basic Workflow**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Cache Maven packages
        uses: actions/cache@v3
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
          restore-keys: ${{ runner.os }}-m2

      - name: Run tests
        run: mvn -B test

      - name: Upload test results
        uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: target/surefire-reports/
```

#### **Advanced Workflow with Multiple Jobs**

```yaml
name: Advanced CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - dev
          - staging
          - production

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'

      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  build:
    needs: security-scan
    runs-on: ubuntu-latest
    outputs:
      image: ${{ steps.meta.outputs.tags }}

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=sha,prefix={{branch}}-
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: ${{ github.event.inputs.environment || 'staging' }}

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to environment
        run: |
          echo "Deploying to ${{ github.event.inputs.environment || 'staging' }}"
          # Add your deployment logic here
          # Example: kubectl apply, helm upgrade, etc.
```

### **GitHub Actions Features**

#### **Reusable Workflows**

```yaml
# .github/workflows/reusable-build.yml
name: Reusable Build Workflow

on:
  workflow_call:
    inputs:
      java-version:
        required: false
        type: string
        default: '17'
      maven-goals:
        required: false
        type: string
        default: 'clean package'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: ${{ inputs.java-version }}
          distribution: 'temurin'

      - name: Run Maven
        run: mvn -B ${{ inputs.maven-goals }}
```

#### **Using Reusable Workflows**

```yaml
# .github/workflows/main.yml
name: Main Pipeline

on: [push, pull_request]

jobs:
  build:
    uses: ./.github/workflows/reusable-build.yml
    with:
      java-version: '17'
      maven-goals: 'clean verify'
```

---

## 4. GitLab CI/CD - Integrated DevOps

### **Pipeline Configuration**

#### **Basic .gitlab-ci.yml**

```yaml
stages:
  - validate
  - build
  - test
  - security
  - deploy

variables:
  MAVEN_OPTS: '-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository'
  SONAR_HOST_URL: 'http://your-sonarqube:9000'

cache:
  paths:
    - .m2/repository
    - node_modules/

validate:
  stage: validate
  script:
    - mvn validate
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"

build:
  stage: build
  script:
    - mvn clean compile
  artifacts:
    paths:
      - target/
    expire_in: 1 week

test:
  stage: test
  script:
    - mvn test
  artifacts:
    reports:
      junit: target/surefire-reports/TEST-*.xml
    paths:
      - target/
    expire_in: 1 week

security-scan:
  stage: security
  script:
    - mvn verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar \
      -Dsonar.host.url=$SONAR_HOST_URL \
      -Dsonar.login=$SONAR_TOKEN \
      -Dsonar.projectKey=$CI_PROJECT_PATH_SLUG
  allow_failure: true
  rules:
    - if: $CI_COMMIT_BRANCH == "main"

deploy-staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
    - docker run -d -p 8080:8080 my-app:latest
  environment:
    name: staging
    url: http://staging.example.com
  rules:
    - if: $CI_COMMIT_BRANCH == "develop"

deploy-production:
  stage: deploy
  script:
    - echo "Deploying to production..."
    - kubectl apply -f k8s/
  environment:
    name: production
    url: http://production.example.com
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
  when: manual
```

#### **Advanced GitLab CI Features**

**Dynamic Environments**

```yaml
deploy:
  stage: deploy
  script:
    - echo "Deploying to $CI_ENVIRONMENT_NAME"
  environment:
    name: $CI_COMMIT_REF_SLUG
    url: http://$CI_ENVIRONMENT_SLUG.example.com
  rules:
    - if: $CI_COMMIT_BRANCH
```

**Parallel Jobs**

```yaml
test:
  stage: test
  parallel:
    matrix:
      - JAVA_VERSION: ['11', '17']
      - MAVEN_GOALS: ['test', 'integration-test']
  script:
    - echo "Testing with Java $JAVA_VERSION and Maven goal $MAVEN_GOALS"
    - mvn $MAVEN_GOALS
```

---

## 5. CI/CD Best Practices

### **Pipeline Design Principles**

#### **1. Pipeline as Code**

- Store pipeline configuration in version control
- Use declarative syntax when possible
- Keep pipelines simple and readable

#### **2. Security First**

```yaml
# Always scan for vulnerabilities
security-scan:
  stage: security
  script:
    - trivy fs --severity HIGH,CRITICAL .
    - npm audit --audit-level high
    - mvn dependency:check
  allow_failure: false
```

#### **3. Environment Management**

```yaml
# Use environment-specific configurations
deploy:
  script:
    - |
      case $CI_ENVIRONMENT_NAME in
        "dev")
          echo "Deploying to development"
          ;;
        "staging")
          echo "Deploying to staging"
          ;;
        "production")
          echo "Deploying to production"
          ;;
      esac
```

### **Performance Optimization**

#### **Caching Strategies**

```yaml
# Maven caching
cache:
  paths:
    - .m2/repository
    - target/

# Docker layer caching
docker build:
  script:
    - docker build --cache-from $CI_REGISTRY_IMAGE:latest .
```

#### **Parallel Execution**

```yaml
# Run independent jobs in parallel
stages:
  - build
  - test
  - security
  - deploy

# Test different components simultaneously
test-unit:
  stage: test
  script: mvn test

test-integration:
  stage: test
  script: mvn integration-test

test-e2e:
  stage: test
  script: npm run test:e2e
```

---

## 6. Real-World Projects

### **Project 1: Microservices E-commerce Platform**

#### **Architecture Overview**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   User Service  │
│   (React)       │───▶│   (Kong)        │───▶│   (Java)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Order Service │    │   Payment       │
                       │   (Java)        │    │   Service       │
                       └─────────────────┘    └─────────────────┘
```

#### **Jenkins Pipeline for Microservices**

```groovy
pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        KUBERNETES_NAMESPACE = 'ecommerce'
    }

    stages {
        stage('Build All Services') {
            parallel {
                stage('Build User Service') {
                    steps {
                        dir('user-service') {
                            sh 'mvn clean package'
                            sh 'docker build -t user-service .'
                        }
                    }
                }

                stage('Build Order Service') {
                    steps {
                        dir('order-service') {
                            sh 'mvn clean package'
                            sh 'docker build -t order-service .'
                        }
                    }
                }

                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                            sh 'npm run build'
                            sh 'docker build -t frontend .'
                        }
                    }
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh "docker tag user-service ${DOCKER_REGISTRY}/user-service:${env.BUILD_NUMBER}"
                    sh "docker tag order-service ${DOCKER_REGISTRY}/order-service:${env.BUILD_NUMBER}"
                    sh "docker tag frontend ${DOCKER_REGISTRY}/frontend:${env.BUILD_NUMBER}"

                    sh "docker push ${DOCKER_REGISTRY}/user-service:${env.BUILD_NUMBER}"
                    sh "docker push ${DOCKER_REGISTRY}/order-service:${env.BUILD_NUMBER}"
                    sh "docker push ${DOCKER_REGISTRY}/frontend:${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh "kubectl set image deployment/user-service user-service=${DOCKER_REGISTRY}/user-service:${env.BUILD_NUMBER} -n ${KUBERNETES_NAMESPACE}"
                    sh "kubectl set image deployment/order-service order-service=${DOCKER_REGISTRY}/order-service:${env.BUILD_NUMBER} -n ${KUBERNETES_NAMESPACE}"
                    sh "kubectl set image deployment/frontend frontend=${DOCKER_REGISTRY}/frontend:${env.BUILD_NUMBER} -n ${KUBERNETES_NAMESPACE}"
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sh "kubectl rollout status deployment/user-service -n ${KUBERNETES_NAMESPACE}"
                    sh "kubectl rollout status deployment/order-service -n ${KUBERNETES_NAMESPACE}"
                    sh "kubectl rollout status deployment/frontend -n ${KUBERNETES_NAMESPACE}"
                }
            }
        }
    }
}
```

### **Project 2: Serverless Application with AWS**

#### **GitHub Actions Workflow**

```yaml
name: Serverless CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AWS_REGION: us-east-1
  STACK_NAME: my-serverless-app

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run linting
        run: npm run lint

  security-scan:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  deploy:
    runs-on: ubuntu-latest
    needs: [test, security-scan]
    if: github.ref == 'refs/heads/main'
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Deploy to AWS
        run: |
          npm run deploy:prod
          aws cloudformation describe-stacks \
            --stack-name ${{ env.STACK_NAME }} \
            --query 'Stacks[0].Outputs' \
            --output table
```

---

## 7. Advanced CI/CD Patterns

### **Blue-Green Deployment**

```yaml
# Blue-Green deployment strategy
deploy-blue:
  stage: deploy
  script:
    - echo "Deploying to Blue environment"
    - kubectl apply -f k8s/blue/
  environment:
    name: blue
    url: http://blue.example.com

deploy-green:
  stage: deploy
  script:
    - echo "Deploying to Green environment"
    - kubectl apply -f k8s/green/
  environment:
    name: green
    url: http://green.example.com

switch-traffic:
  stage: switch
  script:
    - echo "Switching traffic to Green"
    - kubectl patch service main-service -p '{"spec":{"selector":{"version":"green"}}}'
  when: manual
  environment:
    name: production
    url: http://example.com
```

### **Canary Deployment**

```yaml
# Canary deployment with gradual rollout
deploy-canary:
  stage: deploy
  script:
    - echo "Deploying canary (10% traffic)"
    - kubectl apply -f k8s/canary/
    - kubectl patch service main-service -p '{"spec":{"selector":{"version":"canary"}}}'
  environment:
    name: canary
    url: http://canary.example.com

monitor-canary:
  stage: monitor
  script:
    - echo "Monitoring canary performance"
    - ./scripts/health-check.sh
  when: manual

promote-canary:
  stage: promote
  script:
    - echo "Promoting canary to production"
    - kubectl apply -f k8s/production/
  when: manual
  environment:
    name: production
    url: http://example.com
```

---

## 8. Monitoring & Observability

### **Pipeline Monitoring**

```yaml
# Add monitoring to your pipeline
monitor-deployment:
  stage: monitor
  script:
    - echo "Monitoring deployment health"
    - ./scripts/check-endpoints.sh
    - ./scripts/check-metrics.sh
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
```

### **Alerting & Notifications**

```yaml
# Slack notifications for pipeline events
notify-slack:
  stage: notify
  script:
    - |
      if [ "$CI_JOB_STATUS" == "success" ]; then
        curl -X POST -H 'Content-type: application/json' \
          --data "{\"text\":\"✅ Pipeline succeeded for $CI_PROJECT_NAME\"}" \
          $SLACK_WEBHOOK_URL
      else
        curl -X POST -H 'Content-type: application/json' \
          --data "{\"text\":\"❌ Pipeline failed for $CI_PROJECT_NAME\"}" \
          $SLACK_WEBHOOK_URL
      fi
  when: always
```

---

## 🎯 **Summary**

This comprehensive CI/CD module covers:

- ✅ **Jenkins**: Complete setup, pipeline creation, and advanced features
- ✅ **GitHub Actions**: Cloud-native CI/CD with reusable workflows
- ✅ **GitLab CI/CD**: Integrated DevOps platform capabilities
- ✅ **Best Practices**: Security, performance, and reliability
- ✅ **Real Projects**: Microservices and serverless applications
- ✅ **Advanced Patterns**: Blue-green, canary deployments
- ✅ **Monitoring**: Pipeline observability and alerting

### **Next Steps**

1. **Choose Your Tool**: Jenkins for self-hosted, GitHub Actions for cloud-native, GitLab CI for integrated DevOps
2. **Start Simple**: Begin with basic pipelines and gradually add complexity
3. **Security First**: Always include security scanning and quality gates
4. **Monitor Everything**: Track pipeline performance and deployment health
5. **Automate Everything**: Reduce manual intervention in your deployment process

---

🚀 **You're now ready to build enterprise-grade CI/CD pipelines!**

This module provides everything you need to implement robust, secure, and scalable CI/CD solutions for any type of application.
