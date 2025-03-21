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

### **🟡 Conditional Statements & Loops**  

### **1️⃣ If-Else Statements (`if`, `elif`, `else`)**  
Used for decision-making.  

```sh
#!/bin/bash
echo "Enter a number:"
read num

if [ $num -gt 10 ]; then
  echo "Greater than 10"
elif [ $num -eq 10 ]; then
  echo "Equal to 10"
else
  echo "Less than 10"
fi
```

---

### **2️⃣ Comparison Operators (`-eq, -ne, -gt, -lt, ==, !=`)**  

| Operator | Meaning |
|----------|---------|
| `-eq`    | Equal to |
| `-ne`    | Not equal to |
| `-gt`    | Greater than |
| `-lt`    | Less than |
| `-ge`    | Greater than or equal to |
| `-le`    | Less than or equal to |

Example:
```sh
#!/bin/bash
num1=10
num2=20

if [ $num1 -lt $num2 ]; then
  echo "$num1 is less than $num2"
fi
```

For string comparison:
```sh
#!/bin/bash
name="Singh"
if [ "$name" == "Singh" ]; then
  echo "Hello, Singh!"
fi
```

---

### **3️⃣ Logical Operators (`&&`, `||`, `!`)**  

| Operator | Meaning |
|----------|---------|
| `&&`    | Logical AND (Both conditions must be true) |
| `||`    | Logical OR (At least one condition must be true) |
| `!`     | Logical NOT (Reverses the condition) |

Example:
```sh
#!/bin/bash
echo "Enter a number between 1 and 100:"
read num

if [ $num -ge 1 ] && [ $num -le 100 ]; then
  echo "Valid number!"
else
  echo "Invalid number!"
fi
```

---

### **4️⃣ Case Statement (`case ... esac`)**  
Used for multiple conditions.

```sh
#!/bin/bash
echo "Enter a fruit (apple/orange/mango):"
read fruit

case $fruit in
  "apple") echo "You chose Apple." ;;
  "orange") echo "You chose Orange." ;;
  "mango") echo "You chose Mango." ;;
  *) echo "Unknown fruit." ;;  # Default case
esac
```

---

### **5️⃣ For Loop (`for VAR in ...; do ... done`)**  
Loops through a list of values.

#### **Example 1: Loop Through Numbers**
```sh
#!/bin/bash
for i in {1..5}; do
  echo "Iteration: $i"
done
```

#### **Example 2: Loop Through an Array**
```sh
#!/bin/bash
fruits=("Apple" "Banana" "Mango")
for fruit in "${fruits[@]}"; do
  echo "Fruit: $fruit"
done
```

---

### **6️⃣ While Loop (`while [ condition ]; do ... done`)**  
Repeats while the condition is **true**.

```sh
#!/bin/bash
count=1
while [ $count -le 5 ]; do
  echo "Count: $count"
  ((count++))  # Increment count
done
```

---

### **7️⃣ Until Loop (`until [ condition ]; do ... done`)**  
Runs until the condition becomes **true**.

```sh
#!/bin/bash
count=1
until [ $count -gt 5 ]; do
  echo "Count: $count"
  ((count++))
done
```

---

### **8️⃣ Loop Control (`break`, `continue`)**  

#### **Break (Exit Loop)**
```sh
#!/bin/bash
for i in {1..10}; do
  if [ $i -eq 5 ]; then
    echo "Breaking loop at $i"
    break
  fi
  echo "Iteration: $i"
done
```

#### **Continue (Skip Current Iteration)**
```sh
#!/bin/bash
for i in {1..5}; do
  if [ $i -eq 3 ]; then
    echo "Skipping $i"
    continue
  fi
  echo "Iteration: $i"
done
```

---



---

🔥 **You're doing great!** 🚀 Let me know if you have any questions before moving to the next section! 😊
