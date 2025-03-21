 ## **🟢 Basic Shell Scripting** 🚀  



### **1️⃣ Shebang (`#!`) and Executing Scripts**  
The **shebang (`#!`)** at the top of a script tells the system which interpreter to use.  
For Bash, it's:  
```sh
#!/bin/bash
```
**Example:**
```sh
#!/bin/bash
echo "Hello, Singh! This script is running with Bash."
```
**How to Execute:**  
1. Save the script as `script.sh`.  
2. Give execute permissions:  
   ```sh
   chmod +x script.sh
   ```
3. Run the script:  
   ```sh
   ./script.sh
   ```

---

### **2️⃣ Printing Output (`echo`, `printf`)**  
#### **Using `echo`**
```sh
#!/bin/bash
echo "Hello, Singh!"
echo "This is a shell script."
```

#### **Using `printf` (More Formatted)**
```sh
#!/bin/bash
printf "Hello, Singh!\nWelcome to shell scripting!\n"
```
**Difference:**  
- `echo` adds a newline automatically.  
- `printf` does **not** add a newline (`\n` is needed).  

---

### **3️⃣ Comments (`#`) in Scripts**  
Comments help explain the code but are ignored by the shell.

```sh
#!/bin/bash
# This is a comment
echo "This line will execute."  # This comment is ignored by Bash
```

---

### **4️⃣ Variables & Constants (`$VAR`, `readonly VAR`)**  
#### **Defining Variables**  
```sh
#!/bin/bash
name="Singh"
echo "Hello, $name!"
```
#### **Readonly Variables (Constants)**
```sh
#!/bin/bash
readonly company="Deloitte"
echo "You work at $company"
company="Google"  # This will cause an error
```

---

### **5️⃣ Taking User Input (`read`)**  
```sh
#!/bin/bash
echo "Enter your name:"
read user_name
echo "Hello, $user_name!"
```

---

### **6️⃣ Command Substitution (`$(command)`, `` `command` ``)**  
**Example using `$(command)`**
```sh
#!/bin/bash
current_date=$(date)
echo "Today's date is: $current_date"
```

**Example using backticks (`` `command` ``)**
```sh
#!/bin/bash
hostname=`hostname`
echo "Your machine name is: $hostname"
```
📌 **Best Practice:** Use `$(command)` instead of backticks (`` `command` ``), as it's easier to read.

---

### **7️⃣ Quoting (`'', "", `` ``)**  
#### **Single Quotes (`'`) – No Expansion**
```sh
#!/bin/bash
name="Singh"
echo 'Hello, $name!'  # Prints literally: Hello, $name!
```

#### **Double Quotes (`"`) – Expands Variables**
```sh
#!/bin/bash
name="Singh"
echo "Hello, $name!"  # Prints: Hello, Singh!
```

#### **Backticks (Deprecated, Use `$(command)`)**
```sh
#!/bin/bash
echo "Current directory: `pwd`"
```

---

🔥 **You're doing great!** 🚀 Let me know if you have any questions before moving to the next section! 😊
