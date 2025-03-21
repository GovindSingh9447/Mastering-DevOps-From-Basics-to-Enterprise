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


## **🟠 Functions & Script Parameters**  

### **1️⃣ Defining Functions (`function my_func {}`)**  
Functions help us organize reusable blocks of code.

```sh
#!/bin/bash

# Defining a function
function greet() {
  echo "Hello, Singh! Welcome to shell scripting."
}

# Calling the function
greet
```

Alternative syntax:
```sh
#!/bin/bash

greet() {
  echo "Hello, Singh! You are doing great!"
}

greet  # Calling the function
```

---

### **2️⃣ Passing Arguments to Functions (`$1, $2, ...`)**  
We can pass values to functions and access them using `$1`, `$2`, etc.

```sh
#!/bin/bash

greet() {
  echo "Hello, $1! You are $2 years old."
}

greet "Singh" 25  # Passing arguments
```
🔹 `$1` → First argument (`Singh`)  
🔹 `$2` → Second argument (`25`)  

---

### **3️⃣ Returning Values from Functions (`return`, `echo`)**  

#### **Using `return` (Returns exit code between 0-255)**
```sh
#!/bin/bash

calculate_sum() {
  return $(($1 + $2))
}

calculate_sum 5 10
echo "Sum: $?"  # $? captures the return value
```

#### **Using `echo` (Preferred method for larger values)**
```sh
#!/bin/bash

calculate_sum() {
  echo $(($1 + $2))
}

result=$(calculate_sum 5 10)
echo "Sum: $result"
```

---

### **4️⃣ Sourcing Scripts (`source filename.sh`)**  
Sourcing (`source` or `.`) allows running another script within the current shell.

#### **Example 1: Create a script (`helper.sh`)**
```sh
#!/bin/bash
greet() {
  echo "Hello from the helper script!"
}
```

#### **Example 2: Source it in another script**
```sh
#!/bin/bash
source helper.sh  # or . helper.sh

greet  # Calling the function from helper.sh
```
✅ Without `source`, running `./helper.sh` would execute in a **new shell** and not import functions into the current script.

---

### **5️⃣ Script Arguments (`$1, $2, $@, $#, $?, $$`)**  

| Symbol  | Meaning |
|---------|---------|
| `$1`, `$2`, ... | Positional arguments (1st, 2nd, ...) |
| `$@`  | All arguments as separate words |
| `$*`  | All arguments as a single string |
| `$#`  | Number of arguments passed |
| `$?`  | Exit status of the last command |
| `$$`  | Process ID (PID) of the script |

#### **Example: Script that processes arguments (`args.sh`)**
```sh
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "All arguments (\$@): $@"
echo "All arguments (\$*): $*"
echo "Number of arguments: $#"
echo "Exit status of last command: $?"
echo "Script Process ID (PID): $$"
```

Run it:
```sh
chmod +x args.sh
./args.sh Hello World
```

✅ **Output:**
```
Script name: ./args.sh
First argument: Hello
Second argument: World
All arguments ($@): Hello World
All arguments ($*): Hello World
Number of arguments: 2
Exit status of last command: 0
Script Process ID (PID): 12345
```


---

## **🔵 Working with Files & Directories**  

### **1️⃣ File Test Operators (`-f, -d, -e, -r, -w, -x`)**  
These operators help check file/directory properties inside a script.

| Operator | Description |
|----------|-------------|
| `-f` | File exists and is a regular file |
| `-d` | Directory exists |
| `-e` | File or directory exists |
| `-r` | File is readable |
| `-w` | File is writable |
| `-x` | File is executable |

#### **Example: Check file properties**
```sh
#!/bin/bash

file="test.txt"

if [ -f "$file" ]; then
  echo "$file is a regular file."
fi

if [ -d "$file" ]; then
  echo "$file is a directory."
fi

if [ -r "$file" ]; then
  echo "$file is readable."
fi

if [ -w "$file" ]; then
  echo "$file is writable."
fi

if [ -x "$file" ]; then
  echo "$file is executable."
fi
```

---

### **2️⃣ Reading/Writing Files (`cat`, `echo "data" > file`)**  

#### **Writing data to a file**
```sh
#!/bin/bash
echo "Hello Singh!" > file.txt
```

#### **Reading data from a file**
```sh
#!/bin/bash
cat file.txt
```

---

### **3️⃣ Appending to Files (`>> file`)**  
✅ `>>` adds data without overwriting.

```sh
#!/bin/bash
echo "This is an additional line." >> file.txt
```

---

### **4️⃣ Checking File Existence (`if [ -f filename ]; then ...`)**  

#### **Example:**
```sh
#!/bin/bash

file="data.txt"

if [ -f "$file" ]; then
  echo "$file exists."
else
  echo "$file does not exist."
fi
```

---

### **5️⃣ Finding Files (`find /path -name "file*"`)**  

#### **Find files by name**
```sh
find /home -name "test.txt"
```

#### **Find directories**
```sh
find /home -type d -name "project"
```

#### **Find files modified in the last 7 days**
```sh
find /home -type f -mtime -7
```

---

### **6️⃣ Processing Files (`awk`, `sed`, `cut`, `paste`, `grep`)**  

✅ **Using `awk` (Column Processing)**  
```sh
awk '{print $1, $3}' file.txt  # Prints 1st and 3rd columns
```

✅ **Using `sed` (Find and Replace)**
```sh
sed 's/old/new/g' file.txt  # Replaces 'old' with 'new'
```

✅ **Using `cut` (Extracting Specific Fields)**
```sh
cut -d':' -f1 /etc/passwd  # Extracts usernames from /etc/passwd
```

✅ **Using `paste` (Merging Files Line-by-Line)**
```sh
paste file1.txt file2.txt
```

✅ **Using `grep` (Pattern Searching)**
```sh
grep "error" logfile.txt  # Searches for 'error' in logfile.txt
```


### **🔥 Script Using `awk`, `sed`, `cut`, `paste`, and `grep` in One Go!**  

This script demonstrates all five processing commands: **awk, sed, cut, paste, and grep**.  

---

### **📌 Problem Statement**  
We have a `students.txt` file with student data in the format:  
```txt
ID:Name:Age:Grade
101:John:18:A
102:Alice:19:B
103:Bob:20:A
104:Charlie:18:C
```
We will:
1. **Use `cut`** to extract Names and Grades.
2. **Use `grep`** to find students with Grade A.
3. **Use `awk`** to format output.
4. **Use `sed`** to modify the output.
5. **Use `paste`** to merge output with another file (`extra.txt`).

---

### **🔹 Shell Script (`process_students.sh`)**
```sh
#!/bin/bash

# Step 1: Extract Names and Grades using 'cut'
echo "Extracting Names and Grades..."
cut -d':' -f2,4 students.txt > names_grades.txt
echo "Names and Grades extracted: "
cat names_grades.txt
echo ""

# Step 2: Find Students with Grade 'A' using 'grep'
echo "Finding students with Grade A..."
grep ":A" names_grades.txt > grade_A.txt
cat grade_A.txt
echo ""

# Step 3: Format Output using 'awk'
echo "Formatted student list using awk..."
awk -F':' '{print "Student: "$1" | Grade: "$2}' grade_A.txt > formatted.txt
cat formatted.txt
echo ""

# Step 4: Replace 'Grade' with 'Achieved' using 'sed'
echo "Modifying output using sed..."
sed -i 's/Grade/Achieved/g' formatted.txt
cat formatted.txt
echo ""

# Step 5: Merge with another file using 'paste'
echo "Creating extra info file..."
echo -e "Excellent\nGood\nExcellent\nAverage" > extra.txt
paste formatted.txt extra.txt > final_report.txt
echo "Final Merged Report:"
cat final_report.txt
echo ""

echo "✅ Processing complete!"
```

---

### **📌 Explanation**
1. **`cut -d':' -f2,4 students.txt > names_grades.txt`**  
   - Extracts **Name and Grade** (2nd and 4th columns).
2. **`grep ":A" names_grades.txt > grade_A.txt`**  
   - Filters students with Grade A.
3. **`awk -F':' '{print "Student: "$1" | Grade: "$2}' grade_A.txt > formatted.txt`**  
   - Formats the output as **Student: Name | Grade: A**.
4. **`sed -i 's/Grade/Achieved/g' formatted.txt`**  
   - Replaces "Grade" with "Achieved".
5. **`paste formatted.txt extra.txt > final_report.txt`**  
   - Merges the processed student list with additional remarks from `extra.txt`.

---

### **🔹 Output of `final_report.txt`**
```txt
Student: John | Achieved: A	Excellent
Student: Bob | Achieved: A	Excellent
```
---

### **🟣 Advanced Shell Scripting** 🚀  

Now, let’s dive into some **advanced shell scripting concepts** that will take your DevOps skills to the next level! 🔥  

---

## **1️⃣ Working with Arrays (`arr=("one" "two" "three")`)**  

### **📌 Defining and Accessing Arrays**
```sh
#!/bin/bash

# Declare an array
arr=("Apple" "Banana" "Cherry")

# Access elements
echo "First element: ${arr[0]}"
echo "Second element: ${arr[1]}"

# Print all elements
echo "All elements: ${arr[@]}"
```

### **📌 Looping Through an Array**
```sh
for fruit in "${arr[@]}"; do
    echo "Fruit: $fruit"
done
```

---

## **2️⃣ Associative Arrays (`declare -A my_array`)**  

Unlike indexed arrays, **associative arrays** use **key-value pairs**.

### **📌 Defining an Associative Array**
```sh
#!/bin/bash

# Declare an associative array
declare -A student

# Assign key-value pairs
student[name]="John"
student[age]=21
student[course]="DevOps"

# Access elements
echo "Student Name: ${student[name]}"
echo "Student Age: ${student[age]}"
echo "Student Course: ${student[course]}"
```

---

## **3️⃣ Regular Expressions (`grep`, `sed`, `awk`)**  

### **📌 Using `grep` for Pattern Matching**
```sh
grep "error" logfile.txt  # Find lines containing 'error'
grep -i "warning" logfile.txt  # Case-insensitive search
```

### **📌 Using `sed` for Text Manipulation**
```sh
sed 's/old/new/g' file.txt  # Replace 'old' with 'new'
sed -n '/pattern/p' file.txt  # Print only matching lines
```

### **📌 Using `awk` for Text Processing**
```sh
awk '{print $1, $3}' file.txt  # Print the 1st and 3rd columns
awk '/error/ {print $0}' logfile.txt  # Print lines containing 'error'
```

---

## **4️⃣ Pipelines & Redirection (`|`, `>`, `>>`, `2>`, `&>`)**  

| Symbol  | Description |
|---------|-------------|
| `|` | Pipe output of one command to another |
| `>` | Redirect output to a file (overwrite) |
| `>>` | Append output to a file |
| `2>` | Redirect stderr (errors) to a file |
| `&>` | Redirect both stdout and stderr |

### **📌 Example**
```sh
ls -l | grep ".sh" > scripts.txt  # Save all `.sh` files to scripts.txt
cat scripts.txt >> all_scripts.txt  # Append to another file
rm nonexistentfile 2> error.log  # Redirect error messages
```

---

## **5️⃣ Here Documents & Here Strings (`<<EOF ... EOF`, `<<<`)**  

### **📌 Here Document (`<<EOF ... EOF`)**  
Used to send **multi-line input** to a command.  
```sh
cat <<EOF > myfile.txt
Hello Singh,
Welcome to Advanced Shell Scripting!
EOF
```

### **📌 Here String (`<<<`)**  
Used for **single-line input**.  
```sh
grep "hello" <<< "hello world"
```

---

## **6️⃣ Subshells (`(command)`) vs. Parent Shell (`command`)**  

### **📌 Subshell `(command)`**
A **subshell** runs in a new shell environment without affecting the parent shell.  
```sh
#!/bin/bash
VAR="Hello"

# Subshell
( VAR="Goodbye"; echo "Inside Subshell: $VAR" )

# Parent shell remains unchanged
echo "Outside Subshell: $VAR"
```

### **📌 Parent Shell (`command`)**
A normal command **modifies the existing shell environment**.  
```sh
VAR="Hello"
VAR="Goodbye"  # Modified in the same shell
echo "$VAR"  # Outputs "Goodbye"
```

---

### **🟤 Process Management & Debugging** 🚀  

Now, let's cover **process management and debugging techniques** in shell scripting, essential for a DevOps Engineer!  

---

## **1️⃣ Background & Foreground Jobs (`&`, `fg`, `bg`)**  

### **📌 Running a Process in the Background (`&`)**  
```sh
#!/bin/bash
sleep 10 &  # Runs in the background
echo "Process running in the background!"
```

### **📌 Bringing a Background Job to the Foreground (`fg`)**  
```sh
fg %1  # Bring job 1 to the foreground
```

### **📌 Sending a Process to the Background (`bg`)**  
```sh
CTRL + Z  # Pause the foreground job
bg  # Resume it in the background
```

---

## **2️⃣ Process ID (`$$`, `$!`, `ps`, `kill`, `pkill`)**  

### **📌 Get the Current Script's PID (`$$`)**  
```sh
echo "Script PID: $$"
```

### **📌 Get the Last Background Process PID (`$!`)**  
```sh
sleep 60 &  
echo "Background process PID: $!"
```

### **📌 List Running Processes (`ps`)**  
```sh
ps aux | grep "bash"  # Find all running bash scripts
```

### **📌 Killing a Process (`kill`)**  
```sh
kill -9 1234  # Kill process with PID 1234
```

### **📌 Kill a Process by Name (`pkill`)**  
```sh
pkill -f "script.sh"  # Kill all processes running 'script.sh'
```

---

## **3️⃣ Signal Handling (`trap`, `kill -SIGTERM $PID`)**  

### **📌 Handling Signals with `trap`**  
```sh
#!/bin/bash

trap "echo 'CTRL+C is disabled!'; exit" SIGINT  # Prevent script from stopping with CTRL+C

while true; do
  echo "Running... Press CTRL+C to try stopping"
  sleep 2
done
```

### **📌 Sending a Signal to a Process (`kill -SIGTERM $PID`)**  
```sh
kill -SIGTERM 1234  # Gracefully stop process with PID 1234
```

---

## **4️⃣ Debugging Scripts (`bash -x script.sh`, `set -x`, `set +x`)**  

### **📌 Run Script in Debug Mode (`bash -x script.sh`)**  
```sh
bash -x myscript.sh
```

### **📌 Enable Debugging Inside a Script (`set -x`)**  
```sh
#!/bin/bash
set -x  # Enable debug mode

echo "This is a debug test"

set +x  # Disable debug mode
echo "Debugging disabled now"
```

---

### **🔥 Summary**  
| Concept | Command |
|---------|----------|
| Run in Background | `command &` |
| Bring to Foreground | `fg %1` |
| Send to Background | `CTRL+Z` → `bg` |
| Get Script PID | `echo $$` |
| Get Last Process PID | `echo $!` |
| List Processes | `ps aux` |
| Kill Process | `kill -9 PID` |
| Kill by Name | `pkill -f "name"` |
| Trap Signal | `trap "command" SIGNAL` |
| Debug Script | `bash -x script.sh` |

---

### **⚫ Automation & DevOps-Specific Topics** 🚀  

Now, let's dive into automation, system administration, and DevOps-specific scripting tasks that are **essential for a DevOps Engineer!**  

---

## **1️⃣ Scheduling Jobs (`cron`, `crontab -e`, `at`)**  

### **📌 Scheduling a Job Using `cron` (Recurring Jobs)**  
Edit the crontab file:  
```sh
crontab -e
```
Add this line to run a script every day at midnight:  
```sh
0 0 * * * /path/to/myscript.sh
```
**Format:**  
```
Minute Hour Day Month DayOfWeek Command
```

### **📌 One-Time Job with `at`**  
Run a command in the future:  
```sh
echo "echo 'Hello, World!'" | at now + 1 minute
```

---

## **2️⃣ Interacting with APIs (`curl`, `wget`, `jq`)**  

### **📌 Make a GET request with `curl`**  
```sh
curl -s https://jsonplaceholder.typicode.com/posts/1 | jq '.'
```

### **📌 Make a POST request with `curl`**  
```sh
curl -X POST -H "Content-Type: application/json" -d '{"name": "Singh"}' https://jsonplaceholder.typicode.com/posts
```

### **📌 Download a file with `wget`**  
```sh
wget https://example.com/file.zip
```

---

## **3️⃣ SSH & Remote Execution (`ssh user@server 'command'`)**  

### **📌 Running a Remote Command via SSH**  
```sh
ssh user@192.168.1.100 'ls -l /var/log'
```

### **📌 Running a Script on a Remote Server**  
```sh
ssh user@remote-server 'bash -s' < local_script.sh
```

---

## **4️⃣ File Transfers (`scp`, `rsync`)**  

### **📌 Copy a File Using `scp`**  
```sh
scp localfile.txt user@remote:/path/to/destination/
```

### **📌 Sync Files Using `rsync`**  
```sh
rsync -avz /local/path user@remote:/remote/path
```

---

## **5️⃣ Environment Variables (`export VAR=value`)**  

### **📌 Set and Export a Variable**  
```sh
export MY_VAR="Hello DevOps!"
echo $MY_VAR
```

---

## **6️⃣ Working with Logs (`tail -f /var/log/syslog`)**  

### **📌 View Logs in Real Time**  
```sh
tail -f /var/log/syslog
```

### **📌 Filter Logs Using `grep`**  
```sh
tail -f /var/log/syslog | grep "ERROR"
```

---

## **7️⃣ Handling JSON/XML in Shell (`jq`, `xmlstarlet`)**  

### **📌 Parse JSON with `jq`**  
```sh
echo '{"name": "Singh", "role": "DevOps"}' | jq '.name'
```

### **📌 Parse XML with `xmlstarlet`**  
```sh
xmlstarlet sel -t -m "//book/title" -v . -n books.xml
```

---

## **8️⃣ Working with YAML (`yq`)**  

### **📌 Read a YAML Value with `yq`**  
```sh
yq eval '.services.web.image' docker-compose.yml
```

### **📌 Convert JSON to YAML**  
```sh
echo '{"name": "Singh"}' | yq -P
```

---

## **9️⃣ Writing Systemd Service Scripts (`.service` files)**  

### **📌 Create a Systemd Service**  
Save this in `/etc/systemd/system/myservice.service`:  
```ini
[Unit]
Description=My Custom Service
After=network.target

[Service]
ExecStart=/usr/bin/bash /path/to/script.sh
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

### **📌 Enable & Start the Service**  
```sh
systemctl enable myservice  
systemctl start myservice  
systemctl status myservice  
```

---

## **🔟 Scripting Kubernetes (`kubectl` in Shell Scripts)**  

### **📌 List Pods in a Namespace**  
```sh
kubectl get pods -n dev
```

### **📌 Restart a Pod**  
```sh
kubectl delete pod my-pod -n dev
```

### **📌 Automate Kubernetes Tasks with a Script**  
```sh
#!/bin/bash
for pod in $(kubectl get pods -n dev -o jsonpath='{.items[*].metadata.name}'); do
  echo "Restarting pod: $pod"
  kubectl delete pod $pod -n dev
done
```

---

### **🔥 Summary Table**  

| **Concept**                 | **Command Example** |
|-----------------------------|---------------------|
| Schedule a cron job | `crontab -e` |
| Run command in future | `echo "echo hi" | at now + 5 min` |
| API request | `curl -X GET url` |
| SSH remote execution | `ssh user@server 'ls'` |
| File copy | `scp file user@server:/path/` |
| Sync files | `rsync -avz /local user@server:/remote` |
| Export variable | `export VAR=value` |
| Tail logs | `tail -f /var/log/syslog` |
| Parse JSON | `jq '.' file.json` |
| Parse XML | `xmlstarlet sel -t -m "//tag" -v . -n file.xml` |
| Read YAML | `yq eval '.key' file.yml` |
| Create systemd service | `systemctl enable/start myservice` |
| Kubernetes scripting | `kubectl get pods -n dev` |

---


🔥 **You're doing great!** 🚀 Let me know if you have any questions before moving to the next section! 😊
