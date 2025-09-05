

---
### 1. **Linux Architecture**  
Linux follows a layered architecture with the following components:

```
+----------------------------+
|         User Apps          |
+----------------------------+
|       Shell (Bash)         |
+----------------------------+
|  System Libraries (glibc)  |
+----------------------------+
|       Kernel Space         |
|    (Device Drivers, FS)    |
+----------------------------+
|       Hardware Layer       |
+----------------------------+
```

- **Hardware**: Physical devices like CPU, RAM, Disk, Network.
- **Kernel**: Manages hardware resources and provides an interface for user applications.
- **System Libraries**: Standard functions (e.g., glibc) that programs use.
- **Shell**: Command-line interface (Bash, Zsh).
- **User Applications**: Programs like `ls`, `vim`, browsers, etc.

---

### 2. **What is a Bootloader?**  
A **bootloader** is a small program that loads the operating system into memory when the computer starts.  
- Examples: **GRUB (GNU GRUB), LILO**  
- It helps in selecting and booting the OS, especially in dual-boot setups.

---


## **Linux Basics**
### **What is Linux? Overview and Key Features**
Linux is an open-source, Unix-like operating system based on the Linux kernel. It is widely used in servers, cloud computing, embedded systems, and even personal computers.

### **Key Features of Linux:**
1. **Open Source** – Free to use, modify, and distribute.
2. **Multi-User** – Supports multiple users accessing the system simultaneously.
3. **Multi-Tasking** – Can run multiple programs at the same time.
4. **Security** – Strong permissions, encryption, and firewall capabilities.
5. **Stability & Performance** – Reliable even under heavy workloads.
6. **Shell/Command Line Interface (CLI)** – Provides powerful command-line utilities for automation and system management.
7. **Portability** – Runs on various hardware architectures (e.g., x86, ARM, RISC).
8. **Extensive Software Support** – Supports many programming languages, tools, and applications.

---

## **Linux File System Hierarchy and Key Directories**
Linux follows a standard directory structure known as the **Filesystem Hierarchy Standard (FHS)**.

### **Important Directories in Linux**
- **`/` (Root Directory)** – The top-level directory of the filesystem.
- **`/bin` (Binary Files)** – Essential command binaries like `ls`, `cp`, `mv`, `cat`.
- **`/sbin` (System Binaries)** – Commands for system administration like `fdisk`, `iptables`.
- **`/etc` (Configuration Files)** – System-wide configuration files (`/etc/passwd`, `/etc/ssh/ssh_config`).
- **`/home` (User Directories)** – Stores personal files and settings for users.
- **`/var` (Variable Data)** – Logs, databases, email, and cache (`/var/log`).
- **`/usr` (User Programs)** – Contains installed programs, libraries, and documentation.
- **`/tmp` (Temporary Files)** – Stores temporary files, cleaned on reboot.
- **`/opt` (Optional Software)** – Third-party applications.
- **`/dev` (Device Files)** – Represents hardware devices (e.g., `/dev/sda`, `/dev/tty`).
- **`/mnt` and `/media` (Mount Points)** – Used for mounting external drives.

---

## **Virtual Machines**
### **Introduction to VMs: Structure, Components, and Ports**
A Virtual Machine (VM) is a software-based emulation of a computer system that runs an operating system independently of the host system.

### **Key Components of a VM**
1. **Hypervisor** – Manages VMs (e.g., VMware, VirtualBox, KVM).
2. **Virtual CPU (vCPU)** – Simulated processor cores.
3. **Virtual Memory (RAM)** – Allocated from the host.
4. **Virtual Disk** – Stores OS and data.
5. **Network Interfaces** – Virtual network adapters.

### **Creating and Connecting to a VM via SSH**
1. **Create a VM** using a hypervisor (VirtualBox, KVM, AWS, etc.).
2. **Install an OS** (Ubuntu, CentOS, etc.).
3. **Enable SSH** (`sudo systemctl enable ssh && sudo systemctl start ssh`).
4. **Find VM’s IP Address** using `ip a` or `ifconfig`.
5. **Connect via SSH** from another machine:  
   ```bash
   ssh user@vm-ip-address
   ```

### **Managing Ports and Access**
- Open a specific port:  
  ```bash
  sudo ufw allow 22  # Allows SSH traffic
  ```
- Check listening ports:  
  ```bash
  netstat -tulnp
  ```

---

### **Linux Commands (Categorized with Examples)**  

---

## **1. File and Directory Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **ls** | Lists files and directories. Use `-l` for details and `-a` for hidden files. | `ls -la /home` |
| **cd** | Changes the current directory. Use `cd ..` to go up one level. | `cd /var/log` |
| **pwd** | Displays the current working directory path. | `pwd` |
| **mkdir** | Creates a new directory. Use `-p` to create nested directories. | `mkdir -p /home/user/new_folder` |
| **rm** | Removes files. Use `-r` for directories and `-f` to force deletion. | `rm -rf /tmp/test` |
| **rmdir** | Deletes empty directories. Use `rm -r` if the directory has files. | `rmdir emptydir` |
| **cp** | Copies files and directories. Use `-r` for recursive copy. | `cp -r folder1 folder2` |
| **mv** | Moves or renames files and directories. | `mv oldname.txt newname.txt` |

---

## **2. File Viewing and Manipulation Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **cat** | Displays file contents. Can also concatenate multiple files. | `cat file.txt` |
| **touch** | Creates an empty file or updates its timestamp. | `touch newfile.txt` |
| **head** | Shows the first 10 lines of a file. Use `-n` for a specific number. | `head -5 file.txt` |
| **tail** | Displays the last 10 lines of a file. Use `-f` to follow updates. | `tail -f /var/log/syslog` |
| **less** | Scroll through file content. `less` allows forward and backward navigation. | `less file.txt` |
| **more** | View file content one page at a time but only allows forward navigation. | `more file.txt` |
| **wc** | Counts lines, words, and characters in a file. | `wc -l file.txt` |

---

## **3. File Permission Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **ls -l** | Lists files with permissions and ownership details. | `ls -l /home` |
| **chmod** | Changes file permissions using symbolic or numeric mode. | `chmod 755 script.sh` |
| **chown** | Changes file ownership. Use `-R` for recursive changes. | `chown user file.txt` |
| **chgrp** | Changes group ownership of a file. | `chgrp developers file.txt` |
| **umask** | Sets default permissions for new files. | `umask 022` |

---

## **4. User Management Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **who** | Shows logged-in users. | `who` |
| **whoami** | Displays the current user. | `whoami` |
| **id** | Shows user ID (UID) and group ID (GID). | `id username` |
| **useradd** | Creates a new user. | `sudo useradd newuser` |
| **passwd** | Sets or changes a user password. | `passwd newuser` |
| **userdel** | Deletes a user account. Use `-r` to remove the home directory. | `sudo userdel -r newuser` |
| **groupadd** | Creates a new user group. | `sudo groupadd developers` |
| **gpasswd -a** | Adds a user to a group. Use `-M` for multiple users. | `sudo gpasswd -a user developers` |
| **groupdel** | Deletes a user group. | `sudo groupdel developers` |

---

## **5. Process Management Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **ps** | Displays active processes. Use `aux` for all users. | `ps aux` |
| **top** | Shows real-time process monitoring. Press `q` to exit. | `top` |
| **kill -9** | Forcefully terminates a process by PID. | `kill -9 1234` |
| **kill -15** | Gracefully stops a process. | `kill -15 5678` |
| **nohup** | Runs a command in the background even after logout. | `nohup myscript.sh &` |
| **fuser** | Identifies which processes are using a file. | `fuser file.txt` |
| **vmstat** | Shows system performance metrics. | `vmstat 5` |

---

## **6. System Monitoring Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **df** | Displays disk space usage. Use `-h` for human-readable format. | `df -h` |
| **du** | Shows directory size. Use `-sh` for a summary. | `du -sh /home/user` |
| **free** | Displays RAM usage. Use `-m` for MB format. | `free -m` |
| **uptime** | Shows system uptime and load averages. | `uptime` |

---

## **7. Compression Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **zip** | Compresses files into `.zip`. Use `-r` for folders. | `zip archive.zip file.txt` |
| **tar -cvzf** | Creates a compressed `.tar.gz` archive. | `tar -cvzf archive.tar.gz folder` |
| **tar -xvzf** | Extracts a `.tar.gz` archive. | `tar -xvzf archive.tar.gz` |

---

## **8. Networking Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **ping** | Tests network connectivity to a host. | `ping google.com` |
| **ssh** | Connects to a remote server securely. | `ssh user@192.168.1.1` |
| **scp** | Securely copies files over SSH. | `scp file.txt user@server:/path/` |
| **rsync** | Syncs files between two locations. | `rsync -av source/ destination/` |
| **ifconfig** | Displays or configures network interfaces. | `ifconfig eth0` |
| **netstat** | Shows network connections and listening ports. | `netstat -tulnp` |
| **traceroute** | Traces the path packets take to a host. | `traceroute google.com` |
| **nslookup** | Queries DNS records for a domain. | `nslookup google.com` |
| **telnet** | Tests connectivity to a specific port. | `telnet example.com 80` |
| **wget** | Downloads files from a URL. | `wget https://example.com/file.zip` |
| **curl** | Fetches data from URLs. Supports APIs and HTTP requests. | `curl -I https://google.com` |

---

## **9. Text Processing Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **grep** | Searches for patterns in a file. Use `-i` for case-insensitive search. | `grep "error" log.txt` |
| **awk** | A text-processing tool for pattern scanning and processing. | `awk '{print $1}' file.txt` |
| **sed** | Stream editor for modifying files. Use `s/old/new/g` for replacements. | `sed 's/error/warning/g' file.txt` |
| **cut** | Extracts specific columns from a file. | `cut -d',' -f1 file.csv` |
| **sort** | Sorts lines in a file alphabetically or numerically. | `sort names.txt` |
| **tee** | Writes output to both a file and the terminal. | `ls | tee output.txt` |
| **diff** | Compares two files and shows differences. | `diff file1.txt file2.txt` |

---

## **10. System Control Commands**  
| Command | Description | Example |
|---------|-------------|---------|
| **shutdown** | Schedules a system shutdown. Use `-h now` for immediate power off. | `sudo shutdown -h now` |
| **reboot** | Restarts the system immediately. | `sudo reboot` |

---



## **Package Management**
### **Installing, Updating, and Removing Packages**
#### **Debian-based Systems (Ubuntu, Debian)**
- Install a package:  
  ```bash
  sudo apt install package-name
  ```
- Update package lists:  
  ```bash
  sudo apt update
  ```
- Remove a package:  
  ```bash
  sudo apt remove package-name
  ```

#### **Red Hat-based Systems (CentOS, Fedora)**
- Install a package:  
  ```bash
  sudo yum install package-name
  ```
- Update packages:  
  ```bash
  sudo yum update
  ```

---

## **File and Folder Permissions**
### **Understanding and Managing Permissions**
Each file has three permission groups:
- **Owner** (`u`)
- **Group** (`g`)
- **Others** (`o`)

### **Permission Types**
- `r` – Read
- `w` – Write
- `x` – Execute

Change file permissions:
```bash
chmod 755 file.sh
```
Change ownership:
```bash
chown user:group file.txt
```


---

## **Linux Troubleshooting**
### **Practical Examples and Error Handling**
- Check system logs:
  ```bash
  sudo journalctl -xe
  ```
- Identify disk space issues:
  ```bash
  df -h
  ```
- Kill a process:
  ```bash
  kill -9 PID
  ```

---

## **Shell Scripting**
### **Writing and Executing Scripts for Automation**
A shell script is a sequence of commands saved in a file.

#### **Example: Basic Shell Script**
```bash
#!/bin/bash
echo "Hello, $USER! Today is $(date)"
```
Run it:
```bash
chmod +x script.sh
./script.sh
```

### **Corporate-level Shell Scripting Examples**
1. **Backup Automation:**
   ```bash
   #!/bin/bash
   tar -czf backup.tar.gz /home/user/
   ```
2. **Automated System Update:**
   ```bash
   #!/bin/bash
   sudo apt update && sudo apt upgrade -y
   ```
3. **Log Monitoring:**
   ```bash
   #!/bin/bash
   tail -f /var/log/syslog
   ```

---

### **Conclusion**
Mastering Linux is essential for system administrators, DevOps engineers, and developers. Learning file management, networking, troubleshooting, and automation using shell scripting will greatly improve productivity and efficiency.
