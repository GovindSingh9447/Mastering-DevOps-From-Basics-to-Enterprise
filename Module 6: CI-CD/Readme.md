## CI/CD Module 

### Tools Covered
- Jenkins
- GitHub Actions
- GitLab CI/CD

---

### Jenkins

#### Setup & Configuration
- Jenkins installation (WAR, Docker, EC2-based)
- Initial admin password and plugin installation
- Creating users and managing access
- Installing essential plugins:
  - Git
  - Pipeline
  - Blue Ocean
  - SonarQube Scanner
  - Nexus Artifact Uploader
  - Email Extension Plugin
  - Matrix Authorization Strategy

**Architecture Diagram:**
```
   [GitHub] ---> [Jenkins] ---> [SonarQube]
                     |
                  [Nexus]
                     |
                [Docker Build]
                     |
            [EC2 / ECS / EKS Deployment]
```

#### Job Types
- **Freestyle Job** – Basic job, useful for simple tasks
- **Pipeline Job** – Based on `Jenkinsfile`, supports full CI/CD
- **Multibranch Pipeline** – Auto-discovers branches with `Jenkinsfile`

#### Shared Libraries
Reusable Groovy scripts stored in a separate Git repo.

**Structure:**
```
(shared-library-repo)
├── vars/
│   └── myFunc.groovy
└── src/
    └── org/example/Utils.groovy
```

**Usage in Jenkinsfile:**
```groovy
@Library('my-shared-library') _
myFunc()
```

#### Parameters in Pipelines
```groovy
parameters {
  string(name: 'ENV', defaultValue: 'dev', description: 'Environment')
  booleanParam(name: 'DEPLOY', defaultValue: true, description: 'Deploy?')
}
```

#### Access Management
- Use **Matrix-based security plugin**
- Assign fine-grained roles to users (Admin, Dev, Viewer)

#### Webhooks
- GitHub → Repo → Settings → Webhooks
- Payload URL: `http://<jenkins-url>/github-webhook/`
- Required for Freestyle & Multibranch Pipeline triggers

#### Generic Webhook Trigger Setup
- Install `Generic Webhook Trigger Plugin`
- Supports JSON filters and custom triggers for any repo

#### SonarQube Integration
**Pipeline Example:**
```groovy
withSonarQubeEnv('SonarQube') {
  sh 'mvn clean verify sonar:sonar'
}
```

#### Trivy Integration (Security Scan)
```groovy
sh 'trivy image my-app:latest'
```

#### Nexus Integration
**Upload artifact:**
```groovy
nexusArtifactUploader(
  nexusVersion: 'nexus3',
  protocol: 'http',
  nexusUrl: 'nexus.example.com',
  groupId: 'com.example',
  version: '1.0.0',
  repository: 'maven-releases',
  credentialsId: 'nexus-creds',
  artifacts: [[artifactId: 'my-app', classifier: '', file: 'target/my-app.jar', type: 'jar']]
)
```

#### Jenkins Scenario-Based Implementations
- **Upstream/Downstream** jobs:
```groovy
build job: 'job-B', wait: true
```
- **Conditional Stage Execution**:
```groovy
when {
  branch 'main'
}
```

#### Jenkinsfile Example
```groovy
pipeline {
  agent any
  parameters {
    string(name: 'ENV', defaultValue: 'dev', description: 'Env')
  }
  stages {
    stage('Build') {
      steps { sh 'mvn clean install' }
    }
    stage('Test') {
      steps { sh 'mvn test' }
    }
    stage('SonarQube') {
      steps {
        withSonarQubeEnv('SonarQube') {
          sh 'mvn sonar:sonar'
        }
      }
    }
    stage('Docker Build & Push') {
      steps {
        sh 'docker build -t my-app:latest .'
        sh 'docker tag my-app:latest <ecr-uri>'
        sh 'docker push <ecr-uri>'
      }
    }
    stage('Deploy to EC2') {
      steps {
        sh 'scp target/my-app.war ec2-user@ip:/opt/tomcat/webapps/'
      }
    }
  }
  post {
    always {
      emailext(
        to: 'team@example.com',
        subject: "Build \$BUILD_NUMBER - \$BUILD_STATUS",
        body: 'Check Jenkins for details.'
      )
    }
  }
}
```

#### Jenkins Backup & Recovery
- **ThinBackup Plugin**
- Manual: Backup `/var/lib/jenkins` & job configs

#### Troubleshooting
- Jenkins logs: `/var/log/jenkins/jenkins.log`
- SCM errors, plugin issues, permission denied – check console output and logs

#### Final Projects
- Deploy a **microservices e-commerce app** via:
  - EC2 (first)
  - ECS (using Fargate or EC2 launch type)
  - EKS (Kubernetes via Helm or kubectl)

---

### GitHub Actions

#### Setup
- Define workflows in `.github/workflows/*.yml`

**Basic Workflow:**
```yaml
name: CI Pipeline
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
```

**Docker + ECR Deployment:**
```yaml
  - name: Login to ECR
    uses: aws-actions/amazon-ecr-login@v1
  - run: docker build -t my-app .
  - run: docker tag my-app <ecr-uri>
  - run: docker push <ecr-uri>
```

---

### GitLab CI/CD

#### Setup
- Install GitLab Runner on a VM or Docker
- Register runner using project token

**.gitlab-ci.yml Example:**
```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - mvn clean install

test:
  stage: test
  script:
    - mvn test

deploy:
  stage: deploy
  script:
    - scp target/my-app.war user@server:/opt/tomcat/webapps/
```

**Runner Flow Diagram:**
```
[ GitLab Repo ] --> [ GitLab CI ] --> [ GitLab Runner ] --> [ Artifact or Server ]
```

---

> ✅ This module helps learners master Jenkins, GitHub Actions, and GitLab CI/CD by building pipelines with hands-on projects covering SonarQube, Docker, Nexus, AWS deployments (EC2, ECS, EKS), and security integrations.

