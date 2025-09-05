# 📊 Module 7: SonarQube - Code Quality & Security Analysis

## 📑 Table of Contents

1. [Introduction to SonarQube](#1-introduction-to-sonarqube)
2. [Why SonarQube?](#2-why-sonarqube)
3. [SonarQube Architecture](#3-sonarqube-architecture)
4. [Installation & Setup](#4-installation--setup)
5. [SonarQube Configuration](#5-sonarqube-configuration)
6. [Quality Gates & Profiles](#6-quality-gates--profiles)
7. [Language Support](#7-language-support)
8. [CI/CD Integration](#8-cicd-integration)
9. [Jenkins Integration](#9-jenkins-integration)
10. [GitHub Actions Integration](#10-github-actions-integration)
11. [GitLab CI/CD Integration](#11-gitlab-cicd-integration)
12. [Real-World Projects](#12-real-world-projects)
13. [Advanced Features](#13-advanced-features)
14. [Troubleshooting](#14-troubleshooting)
15. [Best Practices](#15-best-practices)

---

## 1. Introduction to SonarQube

### **What is SonarQube?**

SonarQube is a comprehensive **open-source platform** for continuous inspection of code quality and security. Think of it as a "code doctor" that examines your codebase and provides detailed health reports, identifying issues before they become problems in production.

#### **The Code Quality Problem**

In traditional software development, code quality issues often go unnoticed until they cause problems:

- **Hidden Bugs**: Code that works in testing but fails in production
- **Security Vulnerabilities**: Security flaws that attackers can exploit
- **Technical Debt**: Poorly written code that becomes harder to maintain over time
- **Inconsistent Standards**: Different developers writing code in different styles
- **No Quality Metrics**: No way to measure or track code quality improvements

#### **How SonarQube Solves These Problems**

SonarQube transforms code quality management by:

- **Automated Analysis**: Continuously scans code for issues without human intervention
- **Comprehensive Coverage**: Analyzes code from multiple angles (bugs, security, maintainability)
- **Historical Tracking**: Shows how code quality improves or degrades over time
- **Team Collaboration**: Provides shared insights and standards for the entire team
- **CI/CD Integration**: Blocks poor quality code from reaching production

### **Understanding Code Quality**

#### **What Makes Code "Good"?**

Good code has several characteristics:

1. **Correctness**: Does what it's supposed to do without bugs
2. **Maintainability**: Easy to understand, modify, and extend
3. **Security**: Protected against common vulnerabilities
4. **Performance**: Efficient and doesn't waste resources
5. **Readability**: Clear and well-documented
6. **Testability**: Easy to test and verify

#### **Common Code Quality Issues**

**Bugs**: Logic errors that cause incorrect behavior

- Example: Off-by-one errors, null pointer exceptions
- Impact: Application crashes, incorrect results

**Security Vulnerabilities**: Code that can be exploited by attackers

- Example: SQL injection, cross-site scripting (XSS)
- Impact: Data breaches, system compromise

**Code Smells**: Poor design patterns that make code hard to maintain

- Example: Long methods, duplicate code, complex conditionals
- Impact: Difficult to modify, prone to bugs

**Technical Debt**: Shortcuts taken during development that need to be fixed later

- Example: Hardcoded values, missing error handling
- Impact: Slower development, increased maintenance costs

### **SonarQube's Analysis Approach**

#### **Static Code Analysis**

SonarQube uses **static analysis** - examining code without running it:

- **Source Code Scanning**: Reads your code files and analyzes their structure
- **Pattern Recognition**: Identifies known problematic patterns
- **Rule-Based Detection**: Uses predefined rules to find issues
- **Cross-File Analysis**: Understands relationships between different files

#### **Multi-Dimensional Analysis**

SonarQube doesn't just look for one type of issue - it provides comprehensive analysis:

1. **Reliability**: Bugs and potential runtime errors
2. **Security**: Vulnerabilities and security hotspots
3. **Maintainability**: Code smells and technical debt
4. **Coverage**: How much of your code is tested
5. **Duplications**: Repeated code that should be refactored

### **Key Features Explained**

#### **🐛 Bug Detection**

**What it does**: Identifies potential runtime errors and logic mistakes
**How it works**: Analyzes code patterns and data flow to find issues
**Examples**:

- Null pointer dereferences
- Array index out of bounds
- Infinite loops
- Resource leaks

**Why it matters**: Bugs caught early are much cheaper to fix than production issues

#### **🔒 Security Vulnerabilities**

**What it does**: Finds security flaws that could be exploited
**How it works**: Uses security rules and vulnerability databases
**Examples**:

- SQL injection vulnerabilities
- Cross-site scripting (XSS)
- Insecure cryptographic practices
- Hardcoded passwords

**Why it matters**: Security issues can lead to data breaches and system compromise

#### **📊 Code Coverage**

**What it does**: Measures how much of your code is executed by tests
**How it works**: Analyzes test execution reports and source code
**Metrics**:

- Line coverage: Percentage of lines executed
- Branch coverage: Percentage of conditional branches tested
- Function coverage: Percentage of functions called

**Why it matters**: Higher test coverage means fewer bugs in production

#### **🚫 Code Smells**

**What it does**: Identifies maintainability issues and design problems
**How it works**: Uses heuristics and design pattern analysis
**Examples**:

- Long methods (too many lines)
- Large classes (too many responsibilities)
- Duplicate code blocks
- Complex conditional statements

**Why it matters**: Code smells make software harder to maintain and extend

#### **📈 Quality Gates**

**What it does**: Enforces quality standards in your CI/CD pipeline
**How it works**: Defines criteria that must be met before code can be deployed
**Examples**:

- No new bugs introduced
- Security vulnerabilities below threshold
- Code coverage above minimum percentage
- Technical debt within acceptable limits

**Why it matters**: Prevents poor quality code from reaching production

#### **🌍 Multi-language Support**

**What it does**: Analyzes code written in different programming languages
**Supported languages**: Java, C#, JavaScript, Python, Go, PHP, and 25+ more
**How it works**: Each language has specific analyzers and rules
**Why it matters**: Teams can maintain consistent quality across different technologies

### **SonarQube vs Other Tools**

#### **SonarQube vs ESLint (JavaScript)**

| Feature         | SonarQube                                       | ESLint                      |
| --------------- | ----------------------------------------------- | --------------------------- |
| **Scope**       | Multi-language platform                         | JavaScript only             |
| **Analysis**    | Comprehensive (bugs, security, maintainability) | Code style and some bugs    |
| **Integration** | CI/CD, IDEs, multiple tools                     | Primarily development tools |
| **Reporting**   | Rich dashboards and metrics                     | Command-line output         |

#### **SonarQube vs SonarLint (IDE Plugin)**

| Feature           | SonarQube                   | SonarLint               |
| ----------------- | --------------------------- | ----------------------- |
| **Usage**         | Server-based, team-wide     | Local IDE plugin        |
| **Rules**         | Full rule set               | Subset of rules         |
| **History**       | Tracks quality over time    | Real-time analysis only |
| **Collaboration** | Team insights and standards | Individual developer    |

### **When to Use SonarQube**

#### **Perfect Use Cases**

- **Team Development**: Multiple developers working on the same codebase
- **CI/CD Pipelines**: Automated quality checks in deployment process
- **Legacy Code**: Improving quality of existing, large codebases
- **Compliance**: Meeting quality standards for regulatory requirements
- **Technical Debt Management**: Tracking and reducing maintenance burden

#### **Considerations**

- **Learning Curve**: Team needs to understand quality metrics and rules
- **False Positives**: Some issues reported may not be actual problems
- **Performance**: Large codebases may take time to analyze
- **Rule Tuning**: May need to customize rules for your specific needs

### **Getting Started with SonarQube**

#### **Step 1: Understand Your Goals**

Before implementing SonarQube, define what you want to achieve:

- **Quality Improvement**: Reduce bugs and technical debt
- **Security Enhancement**: Identify and fix security vulnerabilities
- **Team Standards**: Establish consistent coding practices
- **Compliance**: Meet regulatory or industry standards

#### **Step 2: Choose Your Setup**

- **Cloud**: SonarCloud (hosted service)
- **On-Premises**: Self-hosted SonarQube server
- **Docker**: Containerized deployment for easy setup

#### **Step 3: Start Small**

- Begin with one project or repository
- Focus on critical issues first (bugs and security)
- Gradually expand to more projects and stricter rules

#### **Step 4: Integrate with Workflow**

- **IDE Integration**: Use SonarLint for real-time feedback
- **CI/CD Integration**: Add quality gates to your pipeline
- **Team Training**: Educate team on quality metrics and best practices

---

## 2. Why SonarQube?

### **Benefits for DevOps Teams**

- ✅ **Early Detection**: Catch issues during development, not in production
- ✅ **Quality Standards**: Enforce consistent code quality across teams
- ✅ **Security First**: Identify security vulnerabilities before deployment
- ✅ **Technical Debt**: Track and manage code maintainability
- ✅ **Team Collaboration**: Share insights and improve code quality together
- ✅ **CI/CD Integration**: Automated quality checks in deployment pipelines

### **ROI for Organizations**

- **Reduced Bug Fixes**: 20-40% reduction in production bugs
- **Faster Development**: Cleaner code leads to faster feature development
- **Security Compliance**: Meet security standards and compliance requirements
- **Knowledge Sharing**: Junior developers learn from quality feedback

---

## 3. SonarQube Architecture

### **Core Components**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   SonarQube     │    │   SonarQube     │    │   SonarQube     │
│    Scanner      │───▶│     Server      │───▶│   Database      │
│  (Local/CI)     │    │   (Web UI)      │    │  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Architecture Details**

1. **SonarQube Scanner**: Runs analysis on source code
2. **SonarQube Server**: Processes analysis reports and provides web interface
3. **Database**: Stores analysis results and configuration
4. **Web Interface**: Dashboard for viewing results and configuration

---

## 4. Installation & Setup

### **Method 1: Docker Installation (Recommended)**

```bash
# Create a directory for SonarQube data
mkdir -p sonarqube-data

# Run SonarQube with Docker
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -v sonarqube-data:/opt/sonarqube/data \
  -v sonarqube-logs:/opt/sonarqube/logs \
  -v sonarqube-extensions:/opt/sonarqube/extensions \
  sonarqube:latest
```

### **Method 2: Manual Installation on Linux**

```bash
# Download SonarQube
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-9.9.0.65466.zip

# Extract and setup
unzip sonarqube-9.9.0.65466.zip
sudo mv sonarqube-9.9.0.65466 /opt/sonarqube

# Create sonar user
sudo useradd -r -s /bin/bash sonar
sudo chown -R sonar:sonar /opt/sonarqube

# Start SonarQube
sudo -u sonar /opt/sonarqube/bin/linux-x86-64/sonar.sh start
```

### **Method 3: AWS EC2 Installation**

```bash
# Update system
sudo yum update -y

# Install Java 11
sudo yum install java-11-openjdk -y

# Download SonarQube
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-9.9.0.65466.zip

# Extract and setup
unzip sonarqube-9.9.0.65466.zip
sudo mv sonarqube-9.9.0.65466 /opt/sonarqube

# Create systemd service
sudo tee /etc/systemd/system/sonarqube.service << EOF
[Unit]
Description=SonarQube service
After=network.target

[Service]
Type=forking
ExecStart=/opt/sonarqube/bin/linux-x86-64/sonar.sh start
ExecStop=/opt/sonarqube/bin/linux-x86-64/sonar.sh stop
User=ec2-user
Group=ec2-user
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start service
sudo systemctl enable sonarqube
sudo systemctl start sonarqube
```

### **Initial Setup**

1. **Access SonarQube**: `http://your-server:9000`
2. **Default Credentials**: `admin/admin`
3. **Change Password**: Required on first login
4. **Install Plugins**: Go to Administration → Marketplace

---

## 5. SonarQube Configuration

### **Global Settings**

Navigate to **Administration → Configuration**

#### **General Settings**

```properties
# Server base URL
sonar.core.serverBaseURL=http://your-domain.com

# Database connection (if using external DB)
sonar.jdbc.url=jdbc:postgresql://localhost/sonarqube
sonar.jdbc.username=sonar
sonar.jdbc.password=password
```

#### **Security Settings**

```properties
# Force authentication
sonar.forceAuthentication=true

# Allow anonymous access (disable for production)
sonar.allowAnonymous=false
```

### **Project Configuration**

Create `sonar-project.properties` in your project root:

```properties
# Project identification
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0

# Source code location
sonar.sources=src
sonar.tests=test

# Language specific settings
sonar.java.source=11
sonar.java.binaries=target/classes

# Coverage exclusions
sonar.coverage.exclusions=**/*Test.java,**/test/**

# Encoding
sonar.sourceEncoding=UTF-8
```

---

## 6. Quality Gates & Profiles

### **Quality Gates**

Quality Gates define the conditions that must be met for code to pass quality checks.

#### **Default Quality Gate**

- **Coverage**: ≥ 80%
- **Duplications**: ≤ 3%
- **Maintainability**: A rating
- **Reliability**: A rating
- **Security**: A rating
- **Security Hotspots**: A rating

#### **Custom Quality Gate Creation**

1. Go to **Quality Gates → Create**
2. Set conditions:
   - **Bugs**: ≤ 0
   - **Vulnerabilities**: ≤ 0
   - **Code Smells**: ≤ 100
   - **Coverage**: ≥ 80%

### **Quality Profiles**

Quality Profiles define coding rules and standards.

#### **Popular Profiles**

- **Sonar way**: Default profile with balanced rules
- **Sonar way (Recommended)**: Enhanced version with best practices
- **Custom profiles**: Organization-specific rules

#### **Profile Configuration**

1. Go to **Quality Profiles**
2. Select language (e.g., Java)
3. **Copy** an existing profile
4. **Activate/Deactivate** rules as needed
5. **Set severity** (Blocker, Critical, Major, Minor, Info)

---

## 7. Language Support

### **Supported Languages**

- **Java**: Full support with advanced analysis
- **JavaScript/TypeScript**: Frontend and Node.js applications
- **Python**: Python 2.x and 3.x support
- **C#**: .NET Framework and .NET Core
- **Go**: Go modules and packages
- **PHP**: PHP 7.x and 8.x support
- **Ruby**: Ruby applications and gems
- **Kotlin**: Android and JVM development
- **Scala**: JVM-based applications

### **Language-Specific Configuration**

#### **Java Configuration**

```properties
# Maven project
sonar.java.source=11
sonar.java.binaries=target/classes
sonar.java.libraries=target/lib/*.jar

# Gradle project
sonar.java.binaries=build/classes
sonar.java.libraries=build/libs/*.jar
```

#### **JavaScript/TypeScript Configuration**

```properties
# Node.js project
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info

# Exclude node_modules
sonar.exclusions=**/node_modules/**
```

#### **Python Configuration**

```properties
# Python project
sonar.python.version=3.9
sonar.python.coverage.reportPaths=coverage.xml
sonar.python.xunit.reportPath=test-results.xml
```

---

## 8. CI/CD Integration

### **SonarQube Scanner Installation**

#### **Maven Integration**

```xml
<!-- pom.xml -->
<plugin>
    <groupId>org.sonarsource.scanner.maven</groupId>
    <artifactId>sonar-maven-plugin</artifactId>
    <version>3.9.1.2184</version>
</plugin>
```

```bash
# Run analysis
mvn clean verify sonar:sonar \
  -Dsonar.host.url=http://your-sonarqube:9000 \
  -Dsonar.login=your-token
```

#### **Gradle Integration**

```gradle
// build.gradle
plugins {
    id "org.sonarqube" version "3.4.0.2513"
}

sonarqube {
    properties {
        property "sonar.host.url", "http://your-sonarqube:9000"
        property "sonar.login", "your-token"
    }
}
```

```bash
# Run analysis
./gradlew sonarqube
```

#### **Standalone Scanner**

```bash
# Download scanner
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.7.0.2747-linux.zip

# Extract and run
unzip sonar-scanner-cli-4.7.0.2747-linux.zip
./sonar-scanner/bin/sonar-scanner \
  -Dsonar.host.url=http://your-sonarqube:9000 \
  -Dsonar.login=your-token
```

---

## 9. Jenkins Integration

### **Jenkins Plugin Installation**

1. Go to **Manage Jenkins → Manage Plugins**
2. Install **SonarQube Scanner for Jenkins**
3. Install **SonarQube Quality Gates Plugin**

### **Jenkins Global Configuration**

1. Go to **Manage Jenkins → Configure System**
2. **SonarQube installations** section:
   - **Name**: SonarQube
   - **Server URL**: `http://your-sonarqube:9000`
   - **Server authentication token**: Create token in SonarQube

### **Jenkins Pipeline Integration**

#### **Declarative Pipeline**

```groovy
pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
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

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }
    }
}
```

#### **Freestyle Job Configuration**

1. **Build Environment**: Check **Prepare SonarQube Scanner environment**
2. **Build**: Add **Execute SonarQube Scanner**
3. **Post-build Actions**: Add **SonarQube Quality Gates**

### **Quality Gate Enforcement**

```groovy
// Wait for quality gate result
timeout(time: 1, unit: 'HOURS') {
    def qg = waitForQualityGate()
    if (qg.status != 'OK') {
        error "Pipeline aborted due to quality gate failure: ${qg.status}"
    }
}
```

---

## 10. GitHub Actions Integration

### **Workflow Configuration**

```yaml
name: CI/CD Pipeline with SonarQube

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sonarqube:
    name: SonarQube Analysis
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Important for SonarQube analysis

      - name: Set up JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'

      - name: Cache SonarCloud packages
        uses: actions/cache@v3
        with:
          path: ~/.sonar/cache
          key: ${{ runner.os }}-sonar
          restore-keys: ${{ runner.os }}-sonar

      - name: Cache Maven packages
        uses: actions/cache@v3
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
          restore-keys: ${{ runner.os }}-m2

      - name: Run tests
        run: mvn -B test --file pom.xml

      - name: SonarQube Scan
        run: |
          mvn -B verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar \
          -Dsonar.host.url=${{ secrets.SONAR_HOST_URL }} \
          -Dsonar.login=${{ secrets.SONAR_TOKEN }} \
          -Dsonar.projectKey=${{ github.repository }} \
          -Dsonar.projectName=${{ github.repository }}

      - name: Quality Gate Check
        run: |
          # Wait for analysis to complete
          sleep 30

          # Check quality gate status
          curl -u ${{ secrets.SONAR_TOKEN }}: \
            "${{ secrets.SONAR_HOST_URL }}/api/qualitygates/project_status?projectKey=${{ github.repository }}" \
            | jq -r '.projectStatus.status'
```

### **Secrets Configuration**

1. Go to **Repository → Settings → Secrets and variables → Actions**
2. Add secrets:
   - `SONAR_HOST_URL`: SonarQube server URL
   - `SONAR_TOKEN`: SonarQube authentication token

---

## 11. GitLab CI/CD Integration

### **GitLab CI Configuration**

```yaml
stages:
  - build
  - test
  - sonarqube
  - quality-gate
  - deploy

variables:
  SONAR_HOST_URL: 'http://your-sonarqube:9000'
  SONAR_TOKEN: $SONAR_TOKEN

build:
  stage: build
  script:
    - mvn clean compile
  artifacts:
    paths:
      - target/

test:
  stage: test
  script:
    - mvn test
  artifacts:
    reports:
      junit: target/surefire-reports/TEST-*.xml
    paths:
      - target/

sonarqube:
  stage: sonarqube
  script:
    - mvn verify org.sonarsource.scanner.maven:sonar-maven-plugin:sonar \
      -Dsonar.host.url=$SONAR_HOST_URL \
      -Dsonar.login=$SONAR_TOKEN \
      -Dsonar.projectKey=$CI_PROJECT_PATH_SLUG \
      -Dsonar.projectName=$CI_PROJECT_NAME \
      -Dsonar.projectVersion=$CI_COMMIT_REF_SLUG
  allow_failure: true

quality-gate:
  stage: quality-gate
  script:
    - |
      # Wait for analysis to complete
      sleep 30

      # Check quality gate status
      QG_STATUS=$(curl -s -u $SONAR_TOKEN: \
        "$SONAR_HOST_URL/api/qualitygates/project_status?projectKey=$CI_PROJECT_PATH_SLUG" \
        | jq -r '.projectStatus.status')

      if [ "$QG_STATUS" != "OK" ]; then
        echo "Quality Gate failed with status: $QG_STATUS"
        exit 1
      fi

      echo "Quality Gate passed!"
  dependencies:
    - sonarqube

deploy:
  stage: deploy
  script:
    - echo "Deploying application..."
  only:
    - main
```

### **GitLab Variables**

1. Go to **Settings → CI/CD → Variables**
2. Add variable:
   - `SONAR_TOKEN`: SonarQube authentication token (Protected, Masked)

---

## 12. Real-World Projects

### **Project 1: Java Spring Boot Application**

#### **Project Structure**

```
spring-boot-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── pom.xml
├── sonar-project.properties
└── Jenkinsfile
```

#### **pom.xml Configuration**

```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>spring-boot-app</artifactId>
    <version>1.0.0</version>

    <properties>
        <java.version>11</java.version>
        <sonar.organization>my-org</sonar.organization>
        <sonar.host.url>http://your-sonarqube:9000</sonar.host.url>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.sonarsource.scanner.maven</groupId>
                <artifactId>sonar-maven-plugin</artifactId>
                <version>3.9.1.2184</version>
            </plugin>
        </plugins>
    </build>
</project>
```

#### **sonar-project.properties**

```properties
sonar.projectKey=spring-boot-app
sonar.projectName=Spring Boot Application
sonar.projectVersion=1.0

sonar.sources=src/main/java
sonar.tests=src/test/java
sonar.java.binaries=target/classes
sonar.java.libraries=target/lib/*.jar

sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
sonar.junit.reportPaths=target/surefire-reports

sonar.sourceEncoding=UTF-8
```

#### **Jenkinsfile**

```groovy
pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token')
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
                        -Dsonar.projectKey=spring-boot-app \
                        -Dsonar.projectName="Spring Boot Application" \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
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
                sh 'docker build -t spring-boot-app:latest .'
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh 'docker run -d -p 8080:8080 --name spring-boot-staging spring-boot-app:latest'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

### **Project 2: Node.js Application**

#### **Project Structure**

```
nodejs-app/
├── src/
├── test/
├── package.json
├── sonar-project.properties
└── .github/workflows/ci.yml
```

#### **package.json**

```json
{
  "name": "nodejs-app",
  "version": "1.0.0",
  "scripts": {
    "test": "jest --coverage",
    "sonar": "sonar-scanner"
  },
  "devDependencies": {
    "jest": "^27.0.0",
    "sonarqube-scanner": "^3.3.0"
  }
}
```

#### **sonar-project.properties**

```properties
sonar.projectKey=nodejs-app
sonar.projectName=Node.js Application
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=test
sonar.javascript.lcov.reportPaths=coverage/lcov.info

sonar.sourceEncoding=UTF-8
```

#### **GitHub Actions Workflow**

```yaml
name: Node.js CI with SonarQube

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  sonarqube:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm test

      - name: SonarQube Scan
        run: |
          npm run sonar \
          -Dsonar.host.url=${{ secrets.SONAR_HOST_URL }} \
          -Dsonar.login=${{ secrets.SONAR_TOKEN }} \
          -Dsonar.projectKey=nodejs-app \
          -Dsonar.projectName="Node.js Application"

      - name: Quality Gate Check
        run: |
          sleep 30
          curl -u ${{ secrets.SONAR_TOKEN }}: \
            "${{ secrets.SONAR_HOST_URL }}/api/qualitygates/project_status?projectKey=nodejs-app" \
            | jq -r '.projectStatus.status'
```

---

## 13. Advanced Features

### **Custom Rules**

1. **Rule Creation**: Go to **Rules → Create Custom Rule**
2. **Rule Configuration**: Set severity, parameters, and conditions
3. **Rule Testing**: Test rules against sample code
4. **Rule Deployment**: Deploy to quality profiles

### **Quality Gate Customization**

```groovy
// Custom quality gate conditions
qualityGate {
    // Custom conditions
    condition {
        metric = "bugs"
        operator = "LESS_THAN"
        error = "1"
    }

    condition {
        metric = "vulnerabilities"
        operator = "LESS_THAN"
        error = "0"
    }
}
```

### **Webhook Integration**

```bash
# Configure webhook in SonarQube
curl -X POST \
  -u admin:admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jenkins Webhook",
    "url": "http://jenkins:8080/sonarqube-webhook/",
    "secret": "webhook-secret"
  }' \
  http://sonarqube:9000/api/webhooks/create
```

### **API Integration**

```bash
# Get project metrics
curl -u token: \
  "http://sonarqube:9000/api/measures/component?component=my-project&metricKeys=bugs,vulnerabilities,code_smells"

# Get quality gate status
curl -u token: \
  "http://sonarqube:9000/api/qualitygates/project_status?projectKey=my-project"
```

---

## 14. Troubleshooting

### **Common Issues & Solutions**

#### **Scanner Issues**

```bash
# Check SonarQube server status
curl -u admin:admin http://sonarqube:9000/api/system/status

# Verify scanner configuration
sonar-scanner -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=token -X
```

#### **Quality Gate Failures**

1. **Check Metrics**: Review failed conditions in SonarQube dashboard
2. **Review Code**: Address code smells, bugs, and vulnerabilities
3. **Update Tests**: Improve test coverage if below threshold
4. **Customize Gates**: Adjust quality gate conditions if needed

#### **Performance Issues**

```properties
# Increase memory for large projects
sonar.scanner.force-deprecated-java-version=true
sonar.scanner.maxmemory=4g

# Exclude unnecessary files
sonar.exclusions=**/*.min.js,**/*.min.css,**/node_modules/**
```

### **Log Analysis**

```bash
# Check SonarQube logs
docker logs sonarqube

# Check scanner logs
tail -f .scannerwork/report-task.txt
```

---

## 15. Best Practices

### **Development Workflow**

1. **Local Analysis**: Run SonarQube scanner locally before committing
2. **Branch Analysis**: Analyze feature branches before merging
3. **Quality Gates**: Enforce quality standards in CI/CD pipelines
4. **Regular Reviews**: Schedule regular code quality reviews

### **Configuration Best Practices**

```properties
# Use meaningful project keys
sonar.projectKey=org-name:project-name

# Set appropriate exclusions
sonar.exclusions=**/generated/**,**/target/**,**/build/**

# Configure coverage exclusions
sonar.coverage.exclusions=**/*Test.java,**/test/**,**/generated/**

# Use consistent encoding
sonar.sourceEncoding=UTF-8
```

### **Team Collaboration**

1. **Quality Profiles**: Create team-specific quality profiles
2. **Rule Discussions**: Discuss and agree on coding standards
3. **Training**: Provide training on SonarQube features
4. **Feedback Loop**: Use quality metrics for continuous improvement

### **Security Considerations**

1. **Token Management**: Use secure tokens and rotate regularly
2. **Access Control**: Implement proper user roles and permissions
3. **Network Security**: Use HTTPS and restrict access to SonarQube server
4. **Data Protection**: Regular backups and secure storage

---

## 🎯 **Summary**

SonarQube is an essential tool for DevOps teams to:

- ✅ **Ensure Code Quality**: Catch issues early in development
- ✅ **Enforce Standards**: Maintain consistent coding practices
- ✅ **Improve Security**: Identify vulnerabilities before deployment
- ✅ **Integrate with CI/CD**: Automated quality checks in pipelines
- ✅ **Track Progress**: Monitor code quality improvements over time

### **Next Steps**

1. **Install SonarQube** using Docker or manual installation
2. **Configure Quality Gates** based on your team's standards
3. **Integrate with CI/CD** tools (Jenkins, GitHub Actions, GitLab CI)
4. **Create Custom Rules** for organization-specific requirements
5. **Monitor and Improve** code quality continuously

---

🚀 **You're now ready to implement SonarQube in your DevOps pipeline!**

This comprehensive guide covers everything from basic installation to advanced CI/CD integration, making you proficient in code quality management and security analysis.
