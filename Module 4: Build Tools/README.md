# Module 4: Build Tools

## 1️⃣ Maven
### **Introduction to Maven**
Maven is a build automation tool used primarily for Java projects. It manages project dependencies, builds, and deployments.

**Example:**
```sh
mvn clean install
```
This command cleans the target directory and compiles, tests, and packages the application.

### **Building Java Projects**
Maven automates the build process, including compiling, testing, and packaging Java projects.

**Example:**
```sh
mvn package
```
Creates a JAR/WAR file in the `target` directory.

### **Understanding Project Files (dependencies)**
Maven uses a `pom.xml` file to define dependencies, plugins, and configurations.

**Example (Adding a Dependency in pom.xml):**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <version>2.5.2</version>
</dependency>
```

---

## 2️⃣ Gradle
### **Introduction to Gradle**
Gradle is a modern build automation tool used for Java, Kotlin, and Android projects. It provides powerful dependency management and parallel execution.

**Example:**
```sh
gradle build
```
Builds the project using Gradle.

### **Building Java Projects with Gradle**
Gradle uses `build.gradle` or `build.gradle.kts` to define dependencies and tasks.

**Example (Adding a Dependency in build.gradle):**
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web:2.5.2'
}
```

---

## 3️⃣ Ant
### **Introduction to Ant**
Apache Ant is a Java-based build tool that uses XML-based configuration files.

**Example:**
```sh
ant compile
```
Runs the `compile` target defined in `build.xml`.

### **Building Java Projects with Ant**
Ant requires a `build.xml` file to define tasks.

**Example (build.xml for compiling Java files):**
```xml
<project name="MyApp" default="compile">
    <target name="compile">
        <javac srcdir="src" destdir="bin"/>
    </target>
</project>
```

---

## 4️⃣ NPM (Node Package Manager)
### **Introduction to NPM**
NPM is a package manager for JavaScript, used for managing dependencies in Node.js projects.

**Example:**
```sh
npm install express
```
Installs the Express framework for Node.js.

### **Building NodeJS Projects**
NPM helps manage dependencies, scripts, and build processes in Node.js applications.

**Example:**
```sh
npm run build
```
Runs the build script defined in `package.json`.

### **Understanding Dependencies in NodeJS**
Node.js uses `package.json` to manage project dependencies.

**Example (Adding a Dependency Manually):**
```json
{
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

---

## 5️⃣ Multi-Tier Projects [Local Building]
### **NodeJS + MySQL**
- Backend: Node.js (Express.js)
- Database: MySQL
- Build and run:
  ```sh
  npm install
  node server.js
  ```

### **DotNET + MongoDB**
- Backend: .NET Core
- Database: MongoDB
- Build and run:
  ```sh
  dotnet build
  dotnet run
  ```

### **Python + PostgreSQL**
- Backend: Python (Flask/Django)
- Database: PostgreSQL
- Build and run:
  ```sh
  python manage.py runserver
  ```

### **Java Full Stack Project**
- Backend: Spring Boot
- Frontend: Angular/React
- Database: MySQL/PostgreSQL
- Build and run:
  ```sh
  mvn spring-boot:run
  ```

---

## 6️⃣ App Deployment to Tomcat Server (Manual)
### **Setup Tomcat Server**
Tomcat is a servlet container used to deploy Java web applications.

**Steps:**
1. Download and extract Tomcat:
   ```sh
   wget https://downloads.apache.org/tomcat/tomcat-9/v9.0.50/bin/apache-tomcat-9.0.50.tar.gz
   tar -xvzf apache-tomcat-9.0.50.tar.gz
   ```
2. Start Tomcat:
   ```sh
   ./apache-tomcat-9.0.50/bin/startup.sh
   ```

### **Deploy a Java Application on Tomcat**
- Deploy a WAR file by copying it to the `webapps` directory:
  ```sh
  cp myapp.war /path/to/tomcat/webapps/
  ```
- Access the application at:
  ```
  http://localhost:8080/myapp
  ```

---

This document provides a structured overview of Build Tools, including Maven, Gradle, Ant, NPM, Multi-Tier Projects, and Tomcat Deployment.

