# Module 11: Infrastructure as Code (IaC)

> **Master modern infrastructure automation with Terraform, CloudFormation, Pulumi, and Ansible**

## Table of Contents

1. [Introduction to Infrastructure as Code](#1-introduction-to-infrastructure-as-code)
2. [Terraform Deep Dive](#2-terraform-deep-dive)
3. [AWS CloudFormation & CDK](#3-aws-cloudformation--cdk)
4. [Pulumi Multi-Language IaC](#4-pulumi-multi-language-iac)
5. [Ansible Configuration Management](#5-ansible-configuration-management)
6. [IaC Best Practices & Security](#6-iac-best-practices--security)
7. [CI/CD Integration with IaC](#7-cicd-integration-with-iac)
8. [Infrastructure Monitoring & Drift Detection](#8-infrastructure-monitoring--drift-detection)
9. [Multi-Cloud & Enterprise Patterns](#9-multi-cloud--enterprise-patterns)
10. [Real-World Projects](#10-real-world-projects)

---

## 1. Introduction to Infrastructure as Code

### **What is Infrastructure as Code (IaC)?**

Infrastructure as Code (IaC) is a revolutionary approach to managing and provisioning computing infrastructure through machine-readable definition files, rather than through physical hardware configuration or interactive configuration tools. Think of it as treating your infrastructure like software code - with version control, testing, and automated deployment.

#### **The Traditional Problem**

In the past, infrastructure management was a manual, error-prone process:

- **Manual Configuration**: System administrators would manually configure servers, networks, and applications
- **Inconsistent Environments**: Dev, staging, and production environments often differed significantly
- **Slow Deployment**: Setting up new environments could take days or weeks
- **Human Errors**: Manual processes led to configuration mistakes and security vulnerabilities
- **No Audit Trail**: Changes were undocumented and difficult to track

#### **How IaC Solves These Problems**

IaC transforms infrastructure management by:

- **Automating Provisioning**: Define infrastructure in code and deploy it automatically
- **Ensuring Consistency**: Same code produces identical environments every time
- **Enabling Version Control**: Track infrastructure changes like any other code
- **Reducing Errors**: Automated processes eliminate human configuration mistakes
- **Providing Audit Trails**: Every change is documented and traceable

### **Core Principles of IaC**

#### **1. Declarative vs Imperative**

**Declarative Approach** (Preferred):

- You describe the **desired end state** of your infrastructure
- The tool figures out how to achieve that state
- Example: "I want 3 web servers behind a load balancer"

**Imperative Approach**:

- You specify the **exact steps** to create infrastructure
- You control the sequence of operations
- Example: "Create server 1, then server 2, then server 3, then configure load balancer"

#### **2. Idempotency**

Idempotency means running the same configuration multiple times produces the same result. This is crucial because:

- You can safely re-run your IaC code without side effects
- Failed deployments can be retried without issues
- Infrastructure can be updated incrementally

#### **3. Immutable Infrastructure**

Instead of modifying existing servers, you:

- Create new servers with the desired configuration
- Replace old servers with new ones
- This ensures consistency and reduces configuration drift

### **Key Benefits of IaC**

#### **1. Consistency & Reproducibility**

**Why This Matters:**

- **Identical Environments**: Deploy the same infrastructure across dev, staging, and production
- **Version Control**: Track changes to infrastructure like code
- **Rollback Capability**: Easily revert to previous infrastructure states
- **Disaster Recovery**: Quickly recreate entire environments from code

**Real-World Example:**
A company can deploy their application to 5 different regions with identical infrastructure, ensuring consistent performance and behavior worldwide.

#### **2. Speed & Efficiency**

**Why This Matters:**

- **Automated Provisioning**: Deploy infrastructure in minutes, not hours
- **Parallel Execution**: Create multiple resources simultaneously
- **Reduced Manual Errors**: Eliminate human configuration mistakes
- **Faster Time to Market**: Developers can get new environments quickly

**Real-World Example:**
A development team can spin up a complete testing environment in 10 minutes instead of waiting 2 days for manual setup.

#### **3. Cost Optimization**

**Why This Matters:**

- **Resource Right-Sizing**: Automatically provision appropriate resources
- **Auto-Scaling**: Scale infrastructure based on demand
- **Resource Cleanup**: Automatically destroy unused resources
- **Reserved Instances**: Better planning leads to cost savings

**Real-World Example:**
A company can automatically scale their infrastructure during peak hours and scale down during off-peak times, saving 40% on cloud costs.

#### **4. Compliance & Governance**

**Why This Matters:**

- **Policy Enforcement**: Ensure infrastructure meets compliance requirements
- **Audit Trails**: Track all infrastructure changes
- **Security Standards**: Enforce security configurations consistently
- **Regulatory Compliance**: Meet industry standards automatically

**Real-World Example:**
A financial services company can ensure all servers have encryption enabled and security groups properly configured across all environments.

### **Common IaC Tools and Their Use Cases**

#### **1. Terraform (HashiCorp)**

- **Best For**: Multi-cloud infrastructure provisioning
- **Strengths**: Provider ecosystem, state management, modularity
- **Use Case**: Managing infrastructure across AWS, Azure, and GCP

#### **2. AWS CloudFormation**

- **Best For**: AWS-native infrastructure
- **Strengths**: Deep AWS integration, native AWS features
- **Use Case**: Managing complex AWS environments with AWS-specific features

#### **3. Pulumi**

- **Best For**: Teams preferring programming languages
- **Strengths**: Real programming languages, better testing, IDE support
- **Use Case**: Complex infrastructure logic with custom business rules

#### **4. Ansible**

- **Best For**: Configuration management and application deployment
- **Strengths**: Agentless, simple YAML syntax, broad platform support
- **Use Case**: Configuring servers and deploying applications

### **When to Use IaC**

#### **Perfect Use Cases:**

- **Cloud Migration**: Moving from on-premises to cloud
- **Multi-Environment Management**: Managing dev, staging, and production
- **Disaster Recovery**: Quickly recreating infrastructure after failures
- **Compliance Requirements**: Meeting regulatory standards
- **Rapid Scaling**: Growing infrastructure to meet demand

#### **Considerations:**

- **Learning Curve**: Team needs to learn new tools and practices
- **Initial Setup**: Requires time to convert existing infrastructure
- **Tool Selection**: Choosing the right tool for your needs
- **State Management**: Handling infrastructure state and dependencies

### **Getting Started with IaC**

#### **Step 1: Choose Your Tool**

- **Beginners**: Start with Terraform (good documentation, large community)
- **AWS-Focused**: Use CloudFormation (native integration)
- **Programming Teams**: Consider Pulumi (familiar languages)
- **Configuration Management**: Use Ansible (simple syntax)

#### **Step 2: Start Small**

- Begin with simple resources (VPC, EC2 instances)
- Gradually add complexity (load balancers, databases)
- Practice with non-production environments first

#### **Step 3: Establish Best Practices**

- Use version control for all infrastructure code
- Implement proper naming conventions
- Set up state management and locking
- Create modular, reusable components

#### **Step 4: Integrate with CI/CD**

- Automate infrastructure deployments
- Implement testing and validation
- Set up monitoring and alerting
- Establish rollback procedures

### **IaC Tools Comparison**

| Tool                                | Type                   | Language       | Cloud Support | Use Case                    |
| ----------------------------------- | ---------------------- | -------------- | ------------- | --------------------------- |
| **Terraform**                       | Declarative            | HCL            | Multi-cloud   | Infrastructure provisioning |
| **CloudFormation**                  | Declarative            | JSON/YAML      | AWS only      | AWS-native infrastructure   |
| **Pulumi**                          | Imperative/Declarative | Multi-language | Multi-cloud   | Developer-friendly IaC      |
| **Ansible**                         | Imperative             | YAML           | Multi-cloud   | Configuration management    |
| **Azure Resource Manager**          | Declarative            | JSON           | Azure only    | Azure-native infrastructure |
| **Google Cloud Deployment Manager** | Declarative            | YAML/Python    | GCP only      | GCP-native infrastructure   |

### **IaC Principles**

#### **1. Idempotency**

```hcl
# Terraform example - running multiple times produces same result
resource "aws_instance" "web" {
  ami           = "ami-0c02fb55956c7d316"
  instance_type = "t3.micro"

  tags = {
    Name = "web-server"
  }
}
```

#### **2. Immutability**

```yaml
# Ansible example - replace rather than modify
- name: Deploy application
  docker_container:
    name: myapp
    image: myapp:latest
    state: started
    recreate: yes # Always recreate container
```

#### **3. Declarative Configuration**

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Resources": {
    "MyBucket": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "BucketName": "my-unique-bucket-name"
      }
    }
  }
}
```

---

## 2. Terraform Deep Dive

### **What is Terraform?**

Terraform is an open-source Infrastructure as Code tool created by HashiCorp. It allows you to define, plan, and create infrastructure resources using a declarative configuration language called HashiCorp Configuration Language (HCL).

#### **Why Terraform is Popular**

1. **Multi-Cloud Support**: Works with AWS, Azure, GCP, and 100+ other providers
2. **State Management**: Tracks the current state of your infrastructure
3. **Plan and Apply**: Shows you what will change before making changes
4. **Modularity**: Create reusable components and modules
5. **Large Community**: Extensive documentation and community support

### **Terraform Core Concepts**

#### **1. Providers**

Providers are plugins that Terraform uses to interact with cloud platforms and services. Think of them as translators between Terraform and the actual cloud APIs.

**Common Providers:**

- **AWS Provider**: Manages AWS resources (EC2, S3, RDS, etc.)
- **Azure Provider**: Manages Azure resources (VMs, Storage, etc.)
- **Google Provider**: Manages GCP resources (Compute Engine, Cloud Storage, etc.)
- **Local Provider**: For local operations and testing

#### **2. Resources**

Resources are the infrastructure components you want to manage. Each resource has a type and a name.

**Example Resource Types:**

- `aws_instance`: An EC2 instance
- `aws_s3_bucket`: An S3 bucket
- `aws_vpc`: A Virtual Private Cloud
- `aws_security_group`: A security group

#### **3. State**

Terraform state is a file that tracks the current state of your infrastructure. It's crucial because:

- **Tracks Resources**: Knows what resources exist and their configuration
- **Manages Dependencies**: Understands relationships between resources
- **Enables Updates**: Determines what needs to be changed
- **Prevents Conflicts**: Avoids duplicate resource creation

#### **4. Plan and Apply**

Terraform follows a two-step process:

1. **Plan**: Shows what changes will be made (dry run)
2. **Apply**: Actually makes the changes to your infrastructure

This is like having a preview before making changes - you can see exactly what will happen.

### **Terraform Workflow**

#### **Step 1: Write Configuration**

Create `.tf` files that describe your desired infrastructure.

#### **Step 2: Initialize**

Run `terraform init` to download providers and set up the working directory.

#### **Step 3: Plan**

Run `terraform plan` to see what changes will be made.

#### **Step 4: Apply**

Run `terraform apply` to create or update your infrastructure.

#### **Step 5: Destroy (Optional)**

Run `terraform destroy` to remove all resources when no longer needed.

### **Understanding Terraform Configuration**

#### **Basic Structure**

Every Terraform configuration has these main sections:

- **Provider Configuration**: Which cloud provider to use
- **Resource Definitions**: What infrastructure to create
- **Variables**: Input parameters for your configuration
- **Outputs**: Values you want to display after creation

#### **Variables and Data Types**

Terraform supports several data types:

- **String**: Text values (e.g., "us-west-2")
- **Number**: Numeric values (e.g., 3, 8080)
- **Boolean**: True/false values
- **List**: Ordered collection of values
- **Map**: Key-value pairs
- **Object**: Complex data structures

#### **Interpolation and Functions**

Terraform provides functions to manipulate data:

- **String Functions**: `upper()`, `lower()`, `substr()`
- **Numeric Functions**: `max()`, `min()`, `abs()`
- **Collection Functions**: `length()`, `keys()`, `values()`
- **Date/Time Functions**: `timestamp()`, `formatdate()`

### **Terraform Best Practices**

#### **1. File Organization**

Organize your Terraform files logically:

- `main.tf`: Main configuration
- `variables.tf`: Input variables
- `outputs.tf`: Output values
- `terraform.tfvars`: Variable values
- `providers.tf`: Provider configurations

#### **2. Naming Conventions**

Use consistent naming:

- **Resources**: `resource_type_name` (e.g., `aws_instance_web`)
- **Variables**: `snake_case` (e.g., `instance_type`)
- **Outputs**: `snake_case` (e.g., `public_ip`)

#### **3. State Management**

- **Remote State**: Store state in S3, Azure Storage, or GCS
- **State Locking**: Use DynamoDB or similar for concurrent access
- **State Backups**: Enable versioning on your state storage

#### **4. Security**

- **Never commit secrets**: Use environment variables or secret management
- **Least Privilege**: Use IAM roles with minimal required permissions
- **Encryption**: Enable encryption for state files and sensitive data

### **Common Terraform Patterns**

#### **1. Conditional Resources**

Create resources conditionally based on variables:

```hcl
resource "aws_instance" "web" {
  count = var.create_web_server ? 1 : 0
  # ... other configuration
}
```

#### **2. Data Sources**

Reference existing resources without managing them:

```hcl
data "aws_ami" "latest_amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}
```

#### **3. Local Values**

Create computed values for reuse:

```hcl
locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project_name
    ManagedBy   = "Terraform"
  }
}
```

### **Terraform Modules**

#### **What are Modules?**

Modules are reusable collections of Terraform configurations. They're like functions in programming - you define them once and use them multiple times.

#### **Benefits of Modules**

1. **Reusability**: Use the same configuration in multiple places
2. **Maintainability**: Update in one place, affects all uses
3. **Abstraction**: Hide complexity behind simple interfaces
4. **Testing**: Test modules independently

#### **Module Structure**

A typical module has:

- `main.tf`: Main resource definitions
- `variables.tf`: Input variables
- `outputs.tf`: Output values
- `README.md`: Documentation

#### **Using Modules**

You can use modules in several ways:

- **Local Modules**: Modules in your repository
- **Remote Modules**: Modules from Terraform Registry
- **Git Modules**: Modules from Git repositories
- **S3 Modules**: Modules stored in S3 buckets

### **Terraform State Management**

#### **Why State is Important**

Terraform state serves several critical purposes:

- **Resource Mapping**: Maps configuration to real-world resources
- **Dependency Tracking**: Understands relationships between resources
- **Performance**: Caches resource information for faster operations
- **Concurrency**: Prevents multiple users from modifying the same resources

#### **State File Structure**

The state file contains:

- **Resources**: Current state of all managed resources
- **Dependencies**: Relationships between resources
- **Metadata**: Information about the state file itself
- **Outputs**: Current output values

#### **State Operations**

Common state operations:

- **terraform state list**: List all resources in state
- **terraform state show**: Show details of a specific resource
- **terraform state mv**: Move a resource in state
- **terraform state rm**: Remove a resource from state
- **terraform import**: Import existing resources into state

### **Terraform Workspaces**

#### **What are Workspaces?**

Workspaces allow you to manage multiple environments (dev, staging, prod) with the same configuration but different state files.

#### **Benefits of Workspaces**

1. **Environment Isolation**: Separate state for each environment
2. **Cost Management**: Different resource sizes per environment
3. **Risk Reduction**: Test changes in dev before production
4. **Team Collaboration**: Multiple developers can work on different environments

#### **Workspace Commands**

- `terraform workspace list`: List all workspaces
- `terraform workspace new <name>`: Create a new workspace
- `terraform workspace select <name>`: Switch to a workspace
- `terraform workspace delete <name>`: Delete a workspace

### **Terraform Security Considerations**

#### **1. State File Security**

- **Encryption**: Encrypt state files at rest
- **Access Control**: Limit who can read/write state
- **Backup**: Regularly backup state files
- **Versioning**: Enable versioning on state storage

#### **2. Credential Management**

- **Environment Variables**: Use environment variables for credentials
- **IAM Roles**: Use IAM roles instead of access keys when possible
- **Secret Management**: Use AWS Secrets Manager or similar
- **Least Privilege**: Grant minimal required permissions

#### **3. Network Security**

- **Private Subnets**: Deploy resources in private subnets when possible
- **Security Groups**: Configure restrictive security group rules
- **VPC**: Use VPCs to isolate resources
- **Encryption**: Enable encryption for data in transit and at rest

### **Terraform Troubleshooting**

#### **Common Issues and Solutions**

1. **State Lock Issues**

   - **Problem**: Another process is using the state
   - **Solution**: Wait for the lock to be released or force unlock

2. **Resource Already Exists**

   - **Problem**: Trying to create a resource that already exists
   - **Solution**: Import the existing resource or use a different name

3. **Provider Version Conflicts**

   - **Problem**: Different provider versions causing issues
   - **Solution**: Pin provider versions in configuration

4. **Dependency Issues**
   - **Problem**: Resources not being created in the right order
   - **Solution**: Use explicit dependencies or data sources

#### **Debugging Techniques**

- **Enable Debug Logging**: Set `TF_LOG=DEBUG` environment variable
- **Use terraform plan**: Always review changes before applying
- **Check State**: Use `terraform state` commands to inspect state
- **Validate Configuration**: Use `terraform validate` to check syntax

### **Terraform Fundamentals**

#### **Installation & Setup**

```bash
# Install Terraform
wget https://releases.hashicorp.com/terraform/1.5.0/terraform_1.5.0_linux_amd64.zip
unzip terraform_1.5.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Verify installation
terraform version
```

#### **Basic Terraform Configuration**

```hcl
# main.tf
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "main-vpc"
  }
}
```

### **Terraform State Management**

#### **Local State**

```hcl
# Default - stored locally
terraform {
  backend "local" {
    path = "terraform.tfstate"
  }
}
```

#### **Remote State with S3**

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "path/to/my/key"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

#### **State Commands**

```bash
# Initialize Terraform
terraform init

# Plan changes
terraform plan

# Apply changes
terraform apply

# Show current state
terraform show

# List resources
terraform state list

# Import existing resource
terraform import aws_instance.web i-1234567890abcdef0

# Remove resource from state
terraform state rm aws_instance.web
```

### **Advanced Terraform Patterns**

#### **Modules**

```hcl
# modules/vpc/main.tf
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "environment" {
  description = "Environment name"
  type        = string
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "${var.environment}-vpc"
    Environment = var.environment
  }
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "vpc_cidr_block" {
  description = "CIDR block of the VPC"
  value       = aws_vpc.main.cidr_block
}
```

#### **Using Modules**

```hcl
# main.tf
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr    = "10.0.0.0/16"
  environment = "production"
}

module "vpc_dev" {
  source = "./modules/vpc"

  vpc_cidr    = "10.1.0.0/16"
  environment = "development"
}
```

#### **Data Sources**

```hcl
# Get latest AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Get availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "web-server"
  }
}
```

#### **Workspaces**

```bash
# Create workspace
terraform workspace new production
terraform workspace new staging
terraform workspace new development

# List workspaces
terraform workspace list

# Switch workspace
terraform workspace select production

# Show current workspace
terraform workspace show
```

#### **Workspace-specific Configuration**

```hcl
# terraform.tfvars.production
environment = "production"
instance_type = "t3.large"
min_size = 3
max_size = 10

# terraform.tfvars.staging
environment = "staging"
instance_type = "t3.medium"
min_size = 2
max_size = 5

# terraform.tfvars.development
environment = "development"
instance_type = "t3.micro"
min_size = 1
max_size = 3
```

### **Terraform Functions & Expressions**

#### **String Functions**

```hcl
# String manipulation
locals {
  environment = "production"
  project     = "myapp"

  # Concatenation
  name_prefix = "${var.project}-${var.environment}"

  # Format strings
  formatted_name = format("%s-%s-%s", var.project, var.environment, "web")

  # String functions
  upper_name = upper(var.project)
  lower_name = lower(var.environment)

  # Replace strings
  clean_name = replace(var.project, "-", "_")
}
```

#### **Collection Functions**

```hcl
# List and map functions
locals {
  # Lists
  availability_zones = ["us-west-2a", "us-west-2b", "us-west-2c"]
  first_az          = local.availability_zones[0]
  az_count          = length(local.availability_zones)

  # Maps
  common_tags = {
    Project     = "myapp"
    Environment = "production"
    ManagedBy   = "terraform"
  }

  # Merge maps
  instance_tags = merge(local.common_tags, {
    Name = "web-server"
    Type = "application"
  })

  # Lookup values
  instance_type = lookup(var.instance_types, var.environment, "t3.micro")
}
```

#### **Conditional Expressions**

```hcl
# Conditional resources
resource "aws_instance" "web" {
  count = var.environment == "production" ? 3 : 1

  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.environment == "production" ? "t3.large" : "t3.micro"

  tags = {
    Name = "web-server-${count.index + 1}"
  }
}

# Conditional values
locals {
  enable_monitoring = var.environment == "production" ? true : false
  log_retention     = var.environment == "production" ? 30 : 7
}
```

### **Terraform Security Best Practices**

#### **Sensitive Variables**

```hcl
# variables.tf
variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

# Use sensitive data
resource "aws_db_instance" "main" {
  identifier     = "main-db"
  engine         = "mysql"
  engine_version = "8.0"
  instance_class = "db.t3.micro"

  username = "admin"
  password = var.db_password  # Automatically marked as sensitive

  tags = {
    Name = "main-database"
  }
}
```

#### **Remote State Security**

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "path/to/my/key"
    region         = "us-west-2"
    encrypt        = true
    kms_key_id     = "arn:aws:kms:us-west-2:123456789012:key/12345678-1234-1234-1234-123456789012"
    dynamodb_table = "terraform-locks"
  }
}
```

#### **IAM Policies for Terraform**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::my-terraform-state-bucket/*"
    },
    {
      "Effect": "Allow",
      "Action": ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem"],
      "Resource": "arn:aws:dynamodb:us-west-2:123456789012:table/terraform-locks"
    }
  ]
}
```

---

## 3. AWS CloudFormation & CDK

### **CloudFormation Fundamentals**

#### **Basic Template Structure**

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple EC2 instance with security group'

Parameters:
  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues:
      - t3.micro
      - t3.small
      - t3.medium
    Description: EC2 instance type

  KeyPairName:
    Type: AWS::EC2::KeyPair::KeyName
    Description: Name of an existing EC2 KeyPair

Conditions:
  CreateProdResources: !Equals [!Ref Environment, 'production']

Resources:
  SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for web server
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 10.0.0.0/8

  EC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0c02fb55956c7d316
      InstanceType: !Ref InstanceType
      KeyName: !Ref KeyPairName
      SecurityGroupIds:
        - !Ref SecurityGroup
      Tags:
        - Key: Name
          Value: WebServer
        - Key: Environment
          Value: !Ref Environment

Outputs:
  InstanceId:
    Description: Instance ID of the EC2 instance
    Value: !Ref EC2Instance
    Export:
      Name: !Sub '${AWS::StackName}-InstanceId'

  PublicIP:
    Description: Public IP address of the EC2 instance
    Value: !GetAtt EC2Instance.PublicIp
    Export:
      Name: !Sub '${AWS::StackName}-PublicIP'
```

#### **CloudFormation Intrinsic Functions**

```yaml
# Ref function
Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '${AWS::StackName}-bucket'

# GetAtt function
Outputs:
  BucketArn:
    Value: !GetAtt MyBucket.Arn

# Sub function with parameters
Resources:
  Database:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: !Sub '${Environment}-${Project}-db'
      MasterUsername: !Sub '${Environment}admin'

# Join function
Resources:
  LambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: !Join ['-', [!Ref Environment, 'my-function']]

# Select function
Resources:
  Subnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: !Select [0, !Cidr [!GetAtt VPC.CidrBlock, 1, 8]]

# Split function
Resources:
  SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          SourceSecurityGroupId: !Select [0, !Split [',', !Ref AllowedSecurityGroups]]
```

### **CloudFormation Nested Stacks**

#### **Parent Stack**

```yaml
# parent-stack.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Parent stack with nested stacks'

Resources:
  NetworkStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/my-bucket/network-stack.yaml
      Parameters:
        Environment: !Ref Environment
        VpcCidr: 10.0.0.0/16

  ApplicationStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/my-bucket/application-stack.yaml
      Parameters:
        Environment: !Ref Environment
        VpcId: !GetAtt NetworkStack.Outputs.VpcId
        SubnetIds: !GetAtt NetworkStack.Outputs.SubnetIds
```

#### **Nested Stack (Network)**

```yaml
# network-stack.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Network infrastructure'

Parameters:
  Environment:
    Type: String
  VpcCidr:
    Type: String
    Default: 10.0.0.0/16

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: !Ref VpcCidr
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-vpc'

  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-public-subnet-1'

Outputs:
  VpcId:
    Description: VPC ID
    Value: !Ref VPC
    Export:
      Name: !Sub '${AWS::StackName}-VpcId'

  SubnetIds:
    Description: Subnet IDs
    Value: !Join [',', [!Ref PublicSubnet1, !Ref PublicSubnet2]]
    Export:
      Name: !Sub '${AWS::StackName}-SubnetIds'
```

### **AWS CDK (Cloud Development Kit)**

#### **CDK Setup**

```bash
# Install CDK
npm install -g aws-cdk

# Initialize CDK project
mkdir my-cdk-app
cd my-cdk-app
cdk init app --language typescript

# Install dependencies
npm install
```

#### **Basic CDK Application**

```typescript
// lib/my-cdk-app-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';

export class MyCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 3,
      natGateways: 1,
    });

    // Create ECS Cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc,
    });

    // Create Fargate Service
    const fargateService =
      new ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        'MyFargateService',
        {
          cluster: cluster,
          cpu: 256,
          desiredCount: 2,
          taskImageOptions: {
            image: ecs.ContainerImage.fromRegistry('nginx:latest'),
            containerPort: 80,
          },
          memoryLimitMiB: 512,
          publicLoadBalancer: true,
        }
      );

    // Output the load balancer URL
    new cdk.CfnOutput(this, 'LoadBalancerURL', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });
  }
}
```

#### **CDK with Multiple Environments**

```typescript
// bin/my-cdk-app.ts
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyCdkAppStack } from '../lib/my-cdk-app-stack';

const app = new cdk.App();

// Development environment
new MyCdkAppStack(app, 'MyCdkAppStack-Dev', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-west-2',
  },
  tags: {
    Environment: 'development',
  },
});

// Production environment
new MyCdkAppStack(app, 'MyCdkAppStack-Prod', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1',
  },
  tags: {
    Environment: 'production',
  },
});
```

#### **CDK Constructs and Patterns**

```typescript
// lib/database-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class DatabaseStack extends cdk.Stack {
  public readonly database: rds.DatabaseInstance;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC (or import existing)
    const vpc = new ec2.Vpc(this, 'DatabaseVpc', {
      maxAzs: 2,
    });

    // Create security group
    const securityGroup = new ec2.SecurityGroup(this, 'DatabaseSecurityGroup', {
      vpc: vpc,
      description: 'Security group for RDS database',
    });

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(3306),
      'Allow MySQL access'
    );

    // Create RDS instance
    this.database = new rds.DatabaseInstance(this, 'MyDatabase', {
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      vpc: vpc,
      securityGroups: [securityGroup],
      databaseName: 'myapp',
      credentials: rds.Credentials.fromGeneratedSecret('admin'),
      deletionProtection: false,
    });
  }
}
```

---

## 4. Pulumi Multi-Language IaC

### **Pulumi Fundamentals**

#### **Installation & Setup**

```bash
# Install Pulumi
curl -fsSL https://get.pulumi.com | sh

# Verify installation
pulumi version

# Login to Pulumi Cloud
pulumi login

# Create new project
mkdir my-pulumi-app
cd my-pulumi-app
pulumi new aws-typescript
```

#### **Basic Pulumi Program (TypeScript)**

```typescript
// index.ts
import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

// Create a VPC
const vpc = new aws.ec2.Vpc('main-vpc', {
  cidrBlock: '10.0.0.0/16',
  enableDnsHostnames: true,
  enableDnsSupport: true,
  tags: {
    Name: 'main-vpc',
  },
});

// Create an Internet Gateway
const igw = new aws.ec2.InternetGateway('main-igw', {
  vpcId: vpc.id,
  tags: {
    Name: 'main-igw',
  },
});

// Create a public subnet
const publicSubnet = new aws.ec2.Subnet('public-subnet', {
  vpcId: vpc.id,
  cidrBlock: '10.0.1.0/24',
  availabilityZone: 'us-west-2a',
  mapPublicIpOnLaunch: true,
  tags: {
    Name: 'public-subnet',
  },
});

// Create a route table
const publicRouteTable = new aws.ec2.RouteTable('public-rt', {
  vpcId: vpc.id,
  routes: [
    {
      cidrBlock: '0.0.0.0/0',
      gatewayId: igw.id,
    },
  ],
  tags: {
    Name: 'public-rt',
  },
});

// Associate route table with subnet
const publicRouteTableAssociation = new aws.ec2.RouteTableAssociation(
  'public-rta',
  {
    subnetId: publicSubnet.id,
    routeTableId: publicRouteTable.id,
  }
);

// Export outputs
export const vpcId = vpc.id;
export const subnetId = publicSubnet.id;
```

#### **Pulumi with Python**

```python
# __main__.py
import pulumi
import pulumi_aws as aws

# Create a VPC
vpc = aws.ec2.Vpc("main-vpc",
    cidr_block="10.0.0.0/16",
    enable_dns_hostnames=True,
    enable_dns_support=True,
    tags={
        "Name": "main-vpc",
    }
)

# Create an Internet Gateway
igw = aws.ec2.InternetGateway("main-igw",
    vpc_id=vpc.id,
    tags={
        "Name": "main-igw",
    }
)

# Create a public subnet
public_subnet = aws.ec2.Subnet("public-subnet",
    vpc_id=vpc.id,
    cidr_block="10.0.1.0/24",
    availability_zone="us-west-2a",
    map_public_ip_on_launch=True,
    tags={
        "Name": "public-subnet",
    }
)

# Create a security group
security_group = aws.ec2.SecurityGroup("web-sg",
    vpc_id=vpc.id,
    description="Security group for web server",
    ingress=[
        {
            "protocol": "tcp",
            "from_port": 80,
            "to_port": 80,
            "cidr_blocks": ["0.0.0.0/0"],
        },
        {
            "protocol": "tcp",
            "from_port": 443,
            "to_port": 443,
            "cidr_blocks": ["0.0.0.0/0"],
        },
        {
            "protocol": "tcp",
            "from_port": 22,
            "to_port": 22,
            "cidr_blocks": ["10.0.0.0/8"],
        },
    ],
    egress=[
        {
            "protocol": "-1",
            "from_port": 0,
            "to_port": 0,
            "cidr_blocks": ["0.0.0.0/0"],
        },
    ],
    tags={
        "Name": "web-sg",
    }
)

# Create an EC2 instance
instance = aws.ec2.Instance("web-server",
    ami="ami-0c02fb55956c7d316",
    instance_type="t3.micro",
    subnet_id=public_subnet.id,
    vpc_security_group_ids=[security_group.id],
    user_data="""#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello from Pulumi!</h1>" > /var/www/html/index.html
""",
    tags={
        "Name": "web-server",
    }
)

# Export outputs
pulumi.export("vpc_id", vpc.id)
pulumi.export("subnet_id", public_subnet.id)
pulumi.export("instance_id", instance.id)
pulumi.export("public_ip", instance.public_ip)
```

#### **Pulumi with Go**

```go
// main.go
package main

import (
    "github.com/pulumi/pulumi-aws/sdk/v5/go/aws/ec2"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        // Create a VPC
        vpc, err := ec2.NewVpc(ctx, "main-vpc", &ec2.VpcArgs{
            CidrBlock:          pulumi.String("10.0.0.0/16"),
            EnableDnsHostnames: pulumi.Bool(true),
            EnableDnsSupport:   pulumi.Bool(true),
            Tags: pulumi.StringMap{
                "Name": pulumi.String("main-vpc"),
            },
        })
        if err != nil {
            return err
        }

        // Create an Internet Gateway
        igw, err := ec2.NewInternetGateway(ctx, "main-igw", &ec2.InternetGatewayArgs{
            VpcId: vpc.ID(),
            Tags: pulumi.StringMap{
                "Name": pulumi.String("main-igw"),
            },
        })
        if err != nil {
            return err
        }

        // Create a public subnet
        publicSubnet, err := ec2.NewSubnet(ctx, "public-subnet", &ec2.SubnetArgs{
            VpcId:               vpc.ID(),
            CidrBlock:           pulumi.String("10.0.1.0/24"),
            AvailabilityZone:    pulumi.String("us-west-2a"),
            MapPublicIpOnLaunch: pulumi.Bool(true),
            Tags: pulumi.StringMap{
                "Name": pulumi.String("public-subnet"),
            },
        })
        if err != nil {
            return err
        }

        // Create a security group
        securityGroup, err := ec2.NewSecurityGroup(ctx, "web-sg", &ec2.SecurityGroupArgs{
            VpcId:       vpc.ID(),
            Description: pulumi.String("Security group for web server"),
            Ingress: ec2.SecurityGroupIngressArray{
                &ec2.SecurityGroupIngressArgs{
                    Protocol:   pulumi.String("tcp"),
                    FromPort:   pulumi.Int(80),
                    ToPort:     pulumi.Int(80),
                    CidrBlocks: pulumi.StringArray{pulumi.String("0.0.0.0/0")},
                },
                &ec2.SecurityGroupIngressArgs{
                    Protocol:   pulumi.String("tcp"),
                    FromPort:   pulumi.Int(443),
                    ToPort:     pulumi.Int(443),
                    CidrBlocks: pulumi.StringArray{pulumi.String("0.0.0.0/0")},
                },
            },
            Egress: ec2.SecurityGroupEgressArray{
                &ec2.SecurityGroupEgressArgs{
                    Protocol:   pulumi.String("-1"),
                    FromPort:   pulumi.Int(0),
                    ToPort:     pulumi.Int(0),
                    CidrBlocks: pulumi.StringArray{pulumi.String("0.0.0.0/0")},
                },
            },
            Tags: pulumi.StringMap{
                "Name": pulumi.String("web-sg"),
            },
        })
        if err != nil {
            return err
        }

        // Create an EC2 instance
        instance, err := ec2.NewInstance(ctx, "web-server", &ec2.InstanceArgs{
            Ami:                    pulumi.String("ami-0c02fb55956c7d316"),
            InstanceType:           pulumi.String("t3.micro"),
            SubnetId:               publicSubnet.ID(),
            VpcSecurityGroupIds:    pulumi.StringArray{securityGroup.ID()},
            UserData:               pulumi.String(`#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello from Pulumi Go!</h1>" > /var/www/html/index.html`),
            Tags: pulumi.StringMap{
                "Name": pulumi.String("web-server"),
            },
        })
        if err != nil {
            return err
        }

        // Export outputs
        ctx.Export("vpcId", vpc.ID())
        ctx.Export("subnetId", publicSubnet.ID())
        ctx.Export("instanceId", instance.ID())
        ctx.Export("publicIp", instance.PublicIp)

        return nil
    })
}
```

### **Pulumi Components and Packages**

#### **Custom Component**

```typescript
// components/WebServer.ts
import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

export interface WebServerArgs {
  vpcId: pulumi.Input<string>;
  subnetId: pulumi.Input<string>;
  instanceType?: string;
  keyPairName?: pulumi.Input<string>;
}

export class WebServer extends pulumi.ComponentResource {
  public readonly instance: aws.ec2.Instance;
  public readonly securityGroup: aws.ec2.SecurityGroup;
  public readonly publicIp: pulumi.Output<string>;

  constructor(name: string, args: WebServerArgs) {
    // Create VPC
    this.vpc = new aws.ec2.Vpc(`${name}-vpc`, {
      cidrBlock: args.vpcCidr,
      enableDnsHostnames: true,
      enableDnsSupport: true,
      tags: {
        Name: `${name}-vpc`,
        Environment: args.environment,
      },
    });

    // Create Internet Gateway
    this.igw = new aws.ec2.InternetGateway(`${name}-igw`, {
      vpcId: this.vpc.id,
      tags: {
        Name: `${name}-igw`,
        Environment: args.environment,
      },
    });

    // Create Public Subnet
    this.publicSubnet = new aws.ec2.Subnet(`${name}-public-subnet`, {
      vpcId: this.vpc.id,
      cidrBlock: args.publicSubnetCidr,
      availabilityZone: args.availabilityZone,
      mapPublicIpOnLaunch: true,
      tags: {
        Name: `${name}-public-subnet`,
        Environment: args.environment,
      },
    });

    // Create Security Group
    this.securityGroup = new aws.ec2.SecurityGroup(`${name}-sg`, {
      vpcId: this.vpc.id,
      description: 'Security group for web server',
      ingress: [
        {
          protocol: 'tcp',
          fromPort: 80,
          toPort: 80,
          cidrBlocks: ['0.0.0.0/0'],
        },
        {
          protocol: 'tcp',
          fromPort: 443,
          toPort: 443,
          cidrBlocks: ['0.0.0.0/0'],
        },
      ],
      egress: [
        {
          protocol: '-1',
          fromPort: 0,
          toPort: 0,
          cidrBlocks: ['0.0.0.0/0'],
        },
      ],
      tags: {
        Name: `${name}-sg`,
        Environment: args.environment,
      },
    });

    // Create EC2 Instance
    const userData = `#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello from Pulumi!</h1>" > /var/www/html/index.html`;

    const instance = new aws.ec2.Instance(`${name}-instance`, {
      ami: args.amiId,
      instanceType: args.instanceType,
      subnetId: this.publicSubnet.id,
      vpcSecurityGroupIds: [this.securityGroup.id],
      userData: userData,
      tags: {
        Name: `${name}-instance`,
        Environment: args.environment,
      },
    });

    this.publicIp = instance.publicIp;
  }
}

// Usage
const webServer = new WebServer('my-webserver', {
  environment: 'production',
  vpcCidr: '10.0.0.0/16',
  publicSubnetCidr: '10.0.1.0/24',
  availabilityZone: 'us-west-2a',
  amiId: 'ami-0c02fb55956c7d316',
  instanceType: 't2.micro',
});

export const vpcId = webServer.vpc.id;
export const publicIp = webServer.publicIp;
```

---

## 🎯 **Summary**

This comprehensive Infrastructure as Code module covers:

- ✅ **IaC Fundamentals**: Principles, benefits, and best practices
- ✅ **Terraform Mastery**: Advanced patterns, modules, and enterprise features
- ✅ **AWS CloudFormation**: Native AWS infrastructure management
- ✅ **Pulumi Multi-Language**: TypeScript, Python, and Go implementations
- ✅ **Ansible Automation**: Configuration management and orchestration
- ✅ **CI/CD Integration**: GitHub Actions, GitLab CI, and automated deployments
- ✅ **Security Practices**: Secrets management, compliance, and governance
- ✅ **Multi-Cloud Strategies**: Cross-platform infrastructure management
- ✅ **Enterprise Patterns**: Scalable, maintainable, and secure implementations
- ✅ **Monitoring & Drift**: Infrastructure monitoring and change detection

### **Key Benefits of Infrastructure as Code**

- 🏗️ **Consistency**: Identical infrastructure across environments
- 🚀 **Speed**: Rapid deployment and scaling capabilities
- 🔒 **Security**: Version-controlled, auditable infrastructure
- 📊 **Compliance**: Automated policy enforcement and governance
- 🔄 **Reproducibility**: Reliable, repeatable deployments
- 💰 **Cost Optimization**: Efficient resource management and optimization

### **Next Steps**

1. **Choose Your Tool**: Select Terraform, Pulumi, or CloudFormation based on your needs
2. **Start Small**: Begin with simple infrastructure and gradually add complexity
3. **Implement Security**: Apply security best practices from day one
4. **Integrate CI/CD**: Automate your infrastructure deployments
5. **Monitor & Govern**: Set up monitoring, drift detection, and policy enforcement
6. **Scale Up**: Implement enterprise patterns and multi-cloud strategies

---

🚀 **You're now ready to master Infrastructure as Code and build scalable, secure, and maintainable infrastructure!**

This module provides everything you need to implement IaC best practices in enterprise environments, from basic concepts to advanced multi-cloud architectures.

```

```
