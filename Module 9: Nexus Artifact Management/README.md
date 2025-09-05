# 📦 Module 9: Nexus Artifact Management - Repository & Dependency Management

## 📑 Table of Contents

1. [Introduction to Artifact Management](#1-introduction-to-artifact-management)
2. [Nexus Repository Setup](#2-nexus-repository-setup)
3. [Repository Types & Configuration](#3-repository-types--configuration)
4. [Maven Repository Management](#4-maven-repository-management)
5. [NPM Repository Management](#5-npm-repository-management)
6. [Docker Registry Management](#6-docker-registry-management)
7. [CI/CD Integration](#7-cicd-integration)
8. [Security & Access Control](#8-security--access-control)
9. [Backup & Maintenance](#9-backup--maintenance)
10. [Real-World Projects](#10-real-world-projects)
11. [Best Practices](#11-best-practices)

---

## 1. Introduction to Artifact Management

### **What is Artifact Management?**

**Artifact Management** is the practice of storing, versioning, and distributing software artifacts (packages, libraries, containers) in a centralized repository system. Think of it as a "digital warehouse" for all the building blocks your software needs - libraries, frameworks, containers, and other dependencies.

#### **The Dependency Management Problem**

In modern software development, applications depend on hundreds or thousands of external components:

- **Dependency Hell**: Conflicting versions of the same library
- **Security Risks**: Vulnerable dependencies without proper scanning
- **Build Inconsistency**: Different environments using different versions
- **License Compliance**: Unclear licensing of third-party components
- **Performance Issues**: Slow downloads from external repositories
- **Offline Development**: Difficulty working without internet access

#### **How Artifact Management Solves These Problems**

Artifact management transforms dependency handling by:

- **Centralized Storage**: Single source of truth for all dependencies
- **Version Control**: Proper versioning and conflict resolution
- **Security Scanning**: Automated vulnerability detection
- **Local Caching**: Fast access to frequently used components
- **License Tracking**: Clear visibility into component licensing
- **Audit Trails**: Complete history of what was used when

### **Understanding Software Artifacts**

#### **What are Software Artifacts?**

Software artifacts are the building blocks of modern applications:

1. **Libraries**: Reusable code components (e.g., Apache Commons, Lodash)
2. **Frameworks**: Application frameworks (e.g., Spring, React, Django)
3. **Containers**: Packaged applications (e.g., Docker images)
4. **Packages**: Language-specific packages (e.g., npm, pip, gem)
5. **Binaries**: Compiled executables and tools
6. **Configuration**: Templates and configuration files

#### **Types of Artifacts by Technology**

**Java Ecosystem:**

- **JAR files**: Java Archive files containing compiled classes
- **WAR files**: Web Archive files for web applications
- **EAR files**: Enterprise Archive files for enterprise applications
- **POM files**: Project Object Model files for Maven projects

**JavaScript/Node.js:**

- **NPM packages**: Node.js packages with package.json
- **Bower packages**: Frontend package manager
- **Yarn packages**: Alternative to npm

**Container Technologies:**

- **Docker images**: Containerized applications
- **Helm charts**: Kubernetes package manager
- **OCI images**: Open Container Initiative standard

**Other Technologies:**

- **NuGet packages**: .NET packages
- **PyPI packages**: Python packages
- **Ruby gems**: Ruby packages
- **Go modules**: Go language packages

### **Artifact Lifecycle Management**

#### **1. Creation and Publishing**

**Development Phase:**

- Developers create and test components
- Artifacts are built and packaged
- Version numbers are assigned
- Metadata is added (licenses, dependencies, etc.)

**Publishing Process:**

- Artifacts are uploaded to repository
- Metadata is validated and stored
- Indexes are updated for searchability
- Notifications are sent to subscribers

#### **2. Storage and Organization**

**Repository Structure:**

- **Hierarchical Organization**: Grouped by type, organization, or project
- **Version Management**: Multiple versions of the same artifact
- **Metadata Storage**: Rich information about each artifact
- **Search Indexing**: Fast discovery of artifacts

**Storage Considerations:**

- **Deduplication**: Avoid storing duplicate content
- **Compression**: Reduce storage requirements
- **Backup**: Regular backups of critical artifacts
- **Retention**: Policies for keeping or removing old versions

#### **3. Distribution and Consumption**

**Download Process:**

- **Client Request**: Application requests specific artifact
- **Repository Resolution**: Repository finds and serves artifact
- **Caching**: Local caching for performance
- **Verification**: Checksum validation for integrity

**Usage Tracking:**

- **Download Statistics**: Track which artifacts are popular
- **Dependency Analysis**: Understand usage patterns
- **License Compliance**: Ensure proper licensing
- **Security Monitoring**: Track vulnerable components

### **Benefits of Artifact Management**

#### **🚀 Performance Benefits**

**Faster Builds:**

- **Local Caching**: Frequently used artifacts are cached locally
- **Parallel Downloads**: Multiple artifacts downloaded simultaneously
- **CDN Integration**: Content delivery networks for global access
- **Bandwidth Optimization**: Reduced external network usage

**Real-World Impact:**

- Build times reduced from 30 minutes to 5 minutes
- 90% reduction in external download traffic
- Consistent build performance across teams

#### **🔒 Security Benefits**

**Vulnerability Management:**

- **Automated Scanning**: Continuous vulnerability assessment
- **Policy Enforcement**: Block vulnerable components
- **License Compliance**: Track and enforce licensing requirements
- **Access Control**: Secure access to sensitive components

**Real-World Impact:**

- 80% reduction in security vulnerabilities
- Automated blocking of high-risk components
- Complete audit trail for compliance

#### **📊 Visibility and Control**

**Usage Analytics:**

- **Dependency Tracking**: Understand what components are used
- **Version Analysis**: Track adoption of new versions
- **License Reporting**: Comprehensive license compliance
- **Cost Analysis**: Understand the cost of dependencies

**Real-World Impact:**

- Clear visibility into technology stack
- Proactive license compliance management
- Data-driven decisions about dependencies

#### **🔄 Consistency and Reliability**

**Standardized Access:**

- **Single Source of Truth**: All teams use the same repository
- **Version Consistency**: Same versions across environments
- **Offline Development**: Work without internet connectivity
- **Disaster Recovery**: Backup and restore capabilities

**Real-World Impact:**

- Eliminated "works on my machine" issues
- Consistent deployments across environments
- Reduced production incidents

### **Artifact Repository Types**

#### **1. Proxy Repositories**

**What they do**: Cache artifacts from remote repositories locally.

**Benefits:**

- **Performance**: Faster access to frequently used artifacts
- **Reliability**: Continue working even if remote repository is down
- **Bandwidth**: Reduce external network usage
- **Control**: Filter and block unwanted artifacts

**Use Cases:**

- Caching Maven Central for Java projects
- Caching npm registry for Node.js projects
- Caching Docker Hub for container images

#### **2. Hosted Repositories**

**What they do**: Store your organization's own artifacts.

**Benefits:**

- **Private Storage**: Keep proprietary components secure
- **Version Control**: Manage your own component versions
- **Access Control**: Control who can access your artifacts
- **Custom Metadata**: Add organization-specific information

**Use Cases:**

- Internal libraries and frameworks
- Proprietary applications and tools
- Custom builds and configurations

#### **3. Group Repositories**

**What they do**: Combine multiple repositories into a single view.

**Benefits:**

- **Unified Access**: Single URL for multiple repositories
- **Priority Ordering**: Control which repository is checked first
- **Simplified Configuration**: One URL for all dependencies
- **Flexible Composition**: Mix proxy and hosted repositories

**Use Cases:**

- Combining public and private repositories
- Creating environment-specific views
- Simplifying client configuration

### **Popular Artifact Repository Solutions**

#### **Nexus Repository (Sonatype)**

**Strengths:**

- **Universal Support**: Supports 30+ package formats
- **Enterprise Features**: Advanced security and compliance
- **High Performance**: Optimized for large-scale deployments
- **Strong Community**: Large user base and ecosystem

**Best For:**

- Enterprise environments
- Multi-technology stacks
- High-security requirements
- Large-scale deployments

#### **JFrog Artifactory**

**Strengths:**

- **Universal Repository**: Single solution for all artifacts
- **Advanced Security**: Comprehensive security features
- **CI/CD Integration**: Deep integration with build tools
- **Cloud Native**: Strong cloud and container support

**Best For:**

- DevOps-focused organizations
- Cloud-native applications
- Advanced CI/CD pipelines
- Multi-cloud deployments

#### **Harbor (CNCF)**

**Strengths:**

- **Container Focus**: Specialized for container images
- **Open Source**: Free and community-driven
- **Security**: Built-in vulnerability scanning
- **Kubernetes Native**: Designed for cloud-native environments

**Best For:**

- Container-focused organizations
- Kubernetes deployments
- Open source projects
- Cost-conscious organizations

#### **GitHub Packages**

**Strengths:**

- **GitHub Integration**: Seamless integration with GitHub
- **Unified Experience**: Code and packages in one place
- **Access Control**: GitHub's permission system
- **CI/CD Integration**: Built-in GitHub Actions support

**Best For:**

- GitHub-centric workflows
- Open source projects
- Small to medium teams
- Simple package management needs

### **When to Use Artifact Management**

#### **Perfect Use Cases**

- **Team Development**: Multiple developers working on the same project
- **Microservices**: Managing dependencies across multiple services
- **CI/CD Pipelines**: Automated builds and deployments
- **Compliance Requirements**: Meeting regulatory standards
- **Offline Development**: Working in environments with limited internet

#### **Considerations**

- **Initial Setup**: Requires time to set up and configure
- **Maintenance**: Ongoing maintenance and updates needed
- **Storage Costs**: Storage requirements for artifacts
- **Learning Curve**: Team needs to understand new processes

### **Getting Started with Artifact Management**

#### **Step 1: Assess Your Needs**

Before choosing a solution, understand your requirements:

- **Package Types**: What types of artifacts do you use?
- **Team Size**: How many developers will use the system?
- **Security Requirements**: What security features do you need?
- **Integration Needs**: What tools need to integrate?

#### **Step 2: Choose Your Solution**

- **Small Teams**: Start with cloud solutions (GitHub Packages, Nexus Cloud)
- **Enterprise**: Consider on-premises solutions (Nexus, Artifactory)
- **Container Focus**: Use specialized solutions (Harbor, ECR)
- **Multi-Cloud**: Choose cloud-native solutions

#### **Step 3: Plan Your Repository Structure**

- **Organize by Technology**: Separate repositories for different technologies
- **Environment Separation**: Different repositories for dev/staging/prod
- **Access Control**: Plan who can access what
- **Naming Conventions**: Establish consistent naming

#### **Step 4: Integrate with Your Workflow**

- **Build Tools**: Configure Maven, Gradle, npm, etc.
- **CI/CD Pipelines**: Integrate with Jenkins, GitHub Actions, etc.
- **IDEs**: Configure development environments
- **Team Training**: Educate team on new processes

### **Popular Artifact Repositories**

- **Nexus Repository**: Sonatype's enterprise solution
- **JFrog Artifactory**: Universal artifact repository
- **Harbor**: CNCF container registry
- **GitHub Packages**: Integrated with GitHub
- **AWS ECR**: Amazon's container registry

### **Artifact Types Supported**

- **Maven**: Java libraries and applications
- **NPM**: Node.js packages
- **Docker**: Container images
- **NuGet**: .NET packages
- **PyPI**: Python packages
- **Raw**: Generic files and binaries

---

## 2. Nexus Repository Setup

### **Installation Methods**

#### **Method 1: Docker Installation (Recommended)**

```bash
# Create Nexus data directory
mkdir -p nexus-data

# Run Nexus with Docker
docker run -d \
  --name nexus \
  -p 8081:8081 \
  -p 8082:8082 \
  -v nexus-data:/nexus-data \
  sonatype/nexus3:latest

# Check if Nexus is running
docker logs nexus
```

#### **Method 2: Manual Installation on Linux**

```bash
# Download Nexus
wget https://download.sonatype.com/nexus/3/latest-unix.tar.gz

# Extract and setup
tar -xzf latest-unix.tar.gz
sudo mv nexus-3.* /opt/nexus
sudo useradd -r -s /bin/bash nexus
sudo chown -R nexus:nexus /opt/nexus

# Start Nexus
sudo -u nexus /opt/nexus/bin/nexus start
```

#### **Method 3: AWS EC2 Installation**

```bash
# Update system
sudo yum update -y

# Install Java 8
sudo yum install java-1.8.0-openjdk -y

# Download Nexus
wget https://download.sonatype.com/nexus/3/latest-unix.tar.gz

# Extract and setup
tar -xzf latest-unix.tar.gz
sudo mv nexus-3.* /opt/nexus

# Create systemd service
sudo tee /etc/systemd/system/nexus.service << EOF
[Unit]
Description=Nexus Repository Manager
After=network.target

[Service]
Type=forking
ExecStart=/opt/nexus/bin/nexus start
ExecStop=/opt/nexus/bin/nexus stop
User=nexus
Group=nexus
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start service
sudo systemctl enable nexus
sudo systemctl start nexus
```

### **Initial Configuration**

1. **Access Nexus**: `http://your-server:8081`
2. **Get Admin Password**: `cat /opt/nexus/sonatype-work/nexus3/admin.password`
3. **Login**: Username: `admin`, Password: (from file above)
4. **Change Password**: Required on first login
5. **Configure Repository**: Set up repositories for your needs

---

## 3. Repository Types & Configuration

### **Repository Types**

#### **1. Proxy Repository**

- **Purpose**: Cache artifacts from remote repositories
- **Use Case**: Speed up builds by caching external dependencies
- **Example**: Maven Central proxy, NPM registry proxy

#### **2. Hosted Repository**

- **Purpose**: Store your organization's artifacts
- **Use Case**: Private packages, releases, snapshots
- **Example**: Company Maven releases, internal NPM packages

#### **3. Group Repository**

- **Purpose**: Combine multiple repositories
- **Use Case**: Single endpoint for multiple sources
- **Example**: Maven group combining Central, Spring, and company repos

### **Maven Repository Configuration**

#### **Create Maven Proxy Repository**

```bash
# Using Nexus REST API
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "maven-central-proxy",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    },
    "proxy": {
      "remoteUrl": "https://repo1.maven.org/maven2/",
      "contentMaxAge": 1440,
      "metadataMaxAge": 1440
    },
    "negativeCache": {
      "enabled": true,
      "timeToLive": 1440
    },
    "httpClient": {
      "blocked": false,
      "autoBlock": true
    }
  }' \
  http://localhost:8081/service/rest/v1/repositories/maven/proxy
```

#### **Create Maven Hosted Repository**

```bash
# Create Maven hosted repository for releases
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "maven-releases",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true,
      "writePolicy": "ALLOW_ONCE"
    },
    "maven": {
      "versionPolicy": "RELEASE",
      "layoutPolicy": "STRICT"
    }
  }' \
  http://localhost:8081/service/rest/v1/repositories/maven/hosted
```

#### **Create Maven Group Repository**

```bash
# Create Maven group repository
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "maven-public",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    },
    "group": {
      "memberNames": [
        "maven-central-proxy",
        "maven-releases",
        "maven-snapshots"
      ]
    }
  }' \
  http://localhost:8081/service/rest/v1/repositories/maven/group
```

### **NPM Repository Configuration**

#### **Create NPM Proxy Repository**

```bash
# Create NPM proxy repository
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "npm-proxy",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    },
    "proxy": {
      "remoteUrl": "https://registry.npmjs.org/",
      "contentMaxAge": 1440,
      "metadataMaxAge": 1440
    },
    "negativeCache": {
      "enabled": true,
      "timeToLive": 1440
    },
    "httpClient": {
      "blocked": false,
      "autoBlock": true
    }
  }' \
  http://localhost:8081/service/rest/v1/repositories/npm/proxy
```

#### **Create NPM Hosted Repository**

```bash
# Create NPM hosted repository
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "npm-hosted",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    }
  }' \
  http://localhost:8081/service/rest/v1/repositories/npm/hosted
```

### **Docker Repository Configuration**

#### **Create Docker Proxy Repository**

```bash
# Create Docker proxy repository
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "docker-proxy",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    },
    "proxy": {
      "remoteUrl": "https://registry-1.docker.io/",
      "contentMaxAge": 1440,
      "metadataMaxAge": 1440
    },
    "negativeCache": {
      "enabled": true,
      "timeToLive": 1440
    },
    "httpClient": {
      "blocked": false,
      "autoBlock": true
    },
    "docker": {
      "v1Enabled": false,
      "forceBasicAuth": true,
      "httpPort": 8082
    }
  }' \
  http://localhost:8081/service/rest/v1/repositories/docker/proxy
```

#### **Create Docker Hosted Repository**

```bash
# Create Docker hosted repository
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "docker-hosted",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    },
    "docker": {
      "v1Enabled": false,
      "forceBasicAuth": true,
      "httpPort": 8082
    }
  }' \
  http://localhost:8081/service/rest/v1/repositories/docker/hosted
```

---

## 4. Maven Repository Management

### **Maven Configuration**

#### **settings.xml Configuration**

```xml
<!-- ~/.m2/settings.xml -->
<settings>
  <servers>
    <server>
      <id>nexus-releases</id>
      <username>deployment</username>
      <password>deployment123</password>
    </server>
    <server>
      <id>nexus-snapshots</id>
      <username>deployment</username>
      <password>deployment123</password>
    </server>
  </servers>

  <mirrors>
    <mirror>
      <id>nexus-public</id>
      <mirrorOf>*</mirrorOf>
      <url>http://localhost:8081/repository/maven-public/</url>
    </mirror>
  </mirrors>

  <profiles>
    <profile>
      <id>nexus</id>
      <repositories>
        <repository>
          <id>central</id>
          <url>http://localhost:8081/repository/maven-public/</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>

  <activeProfiles>
    <activeProfile>nexus</activeProfile>
  </activeProfiles>
</settings>
```

#### **pom.xml Configuration**

```xml
<!-- pom.xml -->
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.company</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>

  <distributionManagement>
    <repository>
      <id>nexus-releases</id>
      <url>http://localhost:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
      <id>nexus-snapshots</id>
      <url>http://localhost:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
  </distributionManagement>

  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-deploy-plugin</artifactId>
        <version>3.0.0</version>
      </plugin>
    </plugins>
  </build>
</project>
```

### **Maven Commands**

#### **Deploy to Nexus**

```bash
# Deploy release version
mvn clean deploy

# Deploy snapshot version
mvn clean deploy -Dmaven.test.skip=true

# Deploy with specific repository
mvn deploy -DaltDeploymentRepository=nexus-releases::default::http://localhost:8081/repository/maven-releases/
```

#### **Download from Nexus**

```bash
# Download dependency
mvn dependency:get -Dartifact=com.company:my-lib:1.0.0

# Copy dependency to local repository
mvn dependency:copy-dependencies

# Resolve dependencies
mvn dependency:resolve
```

---

## 5. NPM Repository Management

### **NPM Configuration**

#### **.npmrc Configuration**

```bash
# .npmrc
registry=http://localhost:8081/repository/npm-public/
@company:registry=http://localhost:8081/repository/npm-hosted/
//localhost:8081/repository/npm-hosted/:_authToken=NpmToken.1234567890abcdef
```

#### **package.json Configuration**

```json
{
  "name": "@company/my-package",
  "version": "1.0.0",
  "description": "My company package",
  "main": "index.js",
  "publishConfig": {
    "registry": "http://localhost:8081/repository/npm-hosted/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/company/my-package.git"
  }
}
```

### **NPM Commands**

#### **Publish to Nexus**

```bash
# Login to Nexus
npm login --registry=http://localhost:8081/repository/npm-hosted/

# Publish package
npm publish

# Publish with specific registry
npm publish --registry=http://localhost:8081/repository/npm-hosted/
```

#### **Install from Nexus**

```bash
# Install package
npm install @company/my-package

# Install with specific registry
npm install --registry=http://localhost:8081/repository/npm-public/

# Install all dependencies
npm install
```

---

## 6. Docker Registry Management

### **Docker Configuration**

#### **Docker Daemon Configuration**

```json
// /etc/docker/daemon.json
{
  "insecure-registries": ["localhost:8082"],
  "registry-mirrors": ["http://localhost:8082"]
}
```

#### **Docker Login**

```bash
# Login to Nexus Docker registry
docker login localhost:8082

# Login with credentials
echo "deployment123" | docker login localhost:8082 -u deployment --password-stdin
```

### **Docker Commands**

#### **Push to Nexus**

```bash
# Tag image for Nexus
docker tag myapp:latest localhost:8082/docker-hosted/myapp:latest

# Push to Nexus
docker push localhost:8082/docker-hosted/myapp:latest

# Push with specific tag
docker push localhost:8082/docker-hosted/myapp:1.0.0
```

#### **Pull from Nexus**

```bash
# Pull from Nexus
docker pull localhost:8082/docker-hosted/myapp:latest

# Pull specific version
docker pull localhost:8082/docker-hosted/myapp:1.0.0
```

---

## 7. CI/CD Integration

### **Jenkins Integration**

#### **Jenkins Pipeline for Maven**

```groovy
pipeline {
    agent any

    environment {
        NEXUS_URL = 'http://localhost:8081'
        NEXUS_CREDENTIALS = credentials('nexus-credentials')
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

        stage('Package') {
            steps {
                sh 'mvn package'
            }
        }

        stage('Deploy to Nexus') {
            steps {
                sh 'mvn deploy -Dmaven.test.skip=true'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t myapp:${BUILD_NUMBER} .'
                    sh 'docker tag myapp:${BUILD_NUMBER} localhost:8082/docker-hosted/myapp:${BUILD_NUMBER}'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh 'docker push localhost:8082/docker-hosted/myapp:${BUILD_NUMBER}'
                }
            }
        }
    }
}
```

#### **Jenkins Pipeline for NPM**

```groovy
pipeline {
    agent any

    environment {
        NEXUS_URL = 'http://localhost:8081'
        NEXUS_CREDENTIALS = credentials('nexus-credentials')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Publish to Nexus') {
            steps {
                script {
                    sh 'npm publish --registry=http://localhost:8081/repository/npm-hosted/'
                }
            }
        }
    }
}
```

### **GitHub Actions Integration**

#### **Maven GitHub Actions**

```yaml
name: Maven CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up JDK 11
        uses: actions/setup-java@v3
        with:
          java-version: '11'
          distribution: 'temurin'

      - name: Cache Maven packages
        uses: actions/cache@v3
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
          restore-keys: ${{ runner.os }}-m2

      - name: Run tests
        run: mvn test

      - name: Deploy to Nexus
        run: mvn deploy -Dmaven.test.skip=true
        env:
          NEXUS_USERNAME: ${{ secrets.NEXUS_USERNAME }}
          NEXUS_PASSWORD: ${{ secrets.NEXUS_PASSWORD }}
```

#### **NPM GitHub Actions**

```yaml
name: NPM CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          registry-url: 'http://localhost:8081/repository/npm-public/'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Publish to Nexus
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NEXUS_TOKEN }}
```

### **GitLab CI/CD Integration**

#### **GitLab CI for Maven**

```yaml
stages:
  - build
  - test
  - deploy

variables:
  MAVEN_OPTS: '-Dmaven.repo.local=$CI_PROJECT_DIR/.m2/repository'
  NEXUS_URL: 'http://localhost:8081'

cache:
  paths:
    - .m2/repository

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

deploy:
  stage: deploy
  script:
    - mvn deploy -Dmaven.test.skip=true
  only:
    - main
```

---

## 8. Security & Access Control

### **User Management**

#### **Create Users**

```bash
# Create deployment user
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "deployment",
    "firstName": "Deployment",
    "lastName": "User",
    "emailAddress": "deployment@company.com",
    "password": "deployment123",
    "status": "active",
    "roles": ["nx-deploy"]
  }' \
  http://localhost:8081/service/rest/v1/security/users
```

#### **Create Roles**

```bash
# Create deployment role
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "id": "nx-deploy",
    "name": "Deployment Role",
    "description": "Role for deployment operations",
    "privileges": [
      "nx-repository-view-maven-*-*",
      "nx-repository-view-npm-*-*",
      "nx-repository-view-docker-*-*"
    ]
  }' \
  http://localhost:8081/service/rest/v1/security/roles
```

### **Repository Security**

#### **Enable Content Selectors**

```bash
# Create content selector
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "maven-releases-selector",
    "description": "Selector for Maven releases",
    "expression": "format == \"maven2\" and path =^ \"/com/company/\""
  }' \
  http://localhost:8081/service/rest/v1/security/content-selectors
```

#### **Create Privileges**

```bash
# Create repository privilege
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "nx-repository-view-maven-releases-browse",
    "description": "Browse Maven releases repository",
    "domain": "repository",
    "actions": ["read"],
    "format": "maven2",
    "repository": "maven-releases"
  }' \
  http://localhost:8081/service/rest/v1/security/privileges
```

### **SSL/TLS Configuration**

#### **Enable HTTPS**

```bash
# Generate SSL certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nexus.key \
  -out nexus.crt \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=nexus.company.com"

# Configure Nexus for HTTPS
# Edit /opt/nexus/etc/nexus.properties
# Add: nexus-args=${jetty.etc}/jetty.xml,${jetty.etc}/jetty-https.xml,${jetty.etc}/jetty-requestlog.xml
```

---

## 9. Backup & Maintenance

### **Backup Strategies**

#### **Database Backup**

```bash
#!/bin/bash
# nexus-backup.sh

# Stop Nexus
systemctl stop nexus

# Backup database
pg_dump -h localhost -U nexus -d nexus > nexus-backup-$(date +%Y%m%d).sql

# Backup blob store
tar -czf nexus-blobs-$(date +%Y%m%d).tar.gz /opt/nexus/sonatype-work/nexus3/blobs/

# Start Nexus
systemctl start nexus

# Upload to S3
aws s3 cp nexus-backup-$(date +%Y%m%d).sql s3://nexus-backups/
aws s3 cp nexus-blobs-$(date +%Y%m%d).tar.gz s3://nexus-backups/
```

#### **Automated Backup Script**

```bash
#!/bin/bash
# automated-backup.sh

BACKUP_DIR="/opt/nexus-backups"
NEXUS_HOME="/opt/nexus/sonatype-work/nexus3"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup configuration
cp -r $NEXUS_HOME/etc $BACKUP_DIR/etc_$DATE

# Backup database
pg_dump -h localhost -U nexus -d nexus > $BACKUP_DIR/nexus_$DATE.sql

# Backup blob stores
tar -czf $BACKUP_DIR/blobs_$DATE.tar.gz $NEXUS_HOME/blobs/

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

### **Maintenance Tasks**

#### **Cleanup Old Artifacts**

```bash
# Cleanup old snapshots
curl -u admin:admin123 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "cleanup-snapshots",
    "type": "script",
    "content": "repository.deleteSnapshots(\"maven-snapshots\", 30)"
  }' \
  http://localhost:8081/service/rest/v1/script

# Execute cleanup
curl -u admin:admin123 \
  -X POST \
  http://localhost:8081/service/rest/v1/script/cleanup-snapshots/run
```

#### **Health Check Script**

```bash
#!/bin/bash
# nexus-health-check.sh

NEXUS_URL="http://localhost:8081"
ADMIN_USER="admin"
ADMIN_PASS="admin123"

# Check if Nexus is running
if curl -s -f $NEXUS_URL/service/rest/v1/status > /dev/null; then
    echo "✅ Nexus is running"
else
    echo "❌ Nexus is not responding"
    exit 1
fi

# Check repository health
REPOS=$(curl -s -u $ADMIN_USER:$ADMIN_PASS \
  $NEXUS_URL/service/rest/v1/repositories | jq -r '.[].name')

for repo in $REPOS; do
    if curl -s -u $ADMIN_USER:$ADMIN_PASS \
      $NEXUS_URL/service/rest/v1/repositories/$repo/health-check | grep -q "healthy"; then
        echo "✅ Repository $repo is healthy"
    else
        echo "❌ Repository $repo is unhealthy"
    fi
done
```

---

## 10. Real-World Projects

### **Project 1: Enterprise Maven Repository Setup**

#### **Repository Structure**

```
maven-public (group)
├── maven-central-proxy (proxy)
├── spring-releases-proxy (proxy)
├── maven-releases (hosted)
└── maven-snapshots (hosted)
```

#### **Complete Setup Script**

```bash
#!/bin/bash
# setup-enterprise-maven.sh

NEXUS_URL="http://localhost:8081"
ADMIN_USER="admin"
ADMIN_PASS="admin123"

# Create Maven Central proxy
curl -u $ADMIN_USER:$ADMIN_PASS \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "maven-central-proxy",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    },
    "proxy": {
      "remoteUrl": "https://repo1.maven.org/maven2/",
      "contentMaxAge": 1440,
      "metadataMaxAge": 1440
    },
    "negativeCache": {
      "enabled": true,
      "timeToLive": 1440
    },
    "httpClient": {
      "blocked": false,
      "autoBlock": true
    }
  }' \
  $NEXUS_URL/service/rest/v1/repositories/maven/proxy

# Create Spring releases proxy
curl -u $ADMIN_USER:$ADMIN_PASS \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "spring-releases-proxy",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true
    },
    "proxy": {
      "remoteUrl": "https://repo.spring.io/release/",
      "contentMaxAge": 1440,
      "metadataMaxAge": 1440
    },
    "negativeCache": {
      "enabled": true,
      "timeToLive": 1440
    },
    "httpClient": {
      "blocked": false,
      "autoBlock": true
    }
  }' \
  $NEXUS_URL/service/rest/v1/repositories/maven/proxy

# Create Maven releases hosted
curl -u $ADMIN_USER:$ADMIN_PASS \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "maven-releases",
    "online": true,
    "storage": {
      "blobStoreName": "default",
      "strictContentTypeValidation": true,
      "writePolicy": "ALLOW_ONCE"
    },
    "maven": {
      "versionPolicy": "RELEASE",
      "layoutPolicy": "STRICT
```
