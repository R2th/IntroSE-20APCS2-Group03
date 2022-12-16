# User Accounts
![](https://images.viblo.asia/936635a2-b361-4553-96a1-cdc02dee22a8.png)

## Types of Accounts
![](https://images.viblo.asia/c06f3383-18a7-40ca-8414-10a9e2ce84bb.png)

By default, Linux distinguishes between several account types in order to isolate processes and workloads. Linux has four types of accounts:
1. root
2. System
3. Normal
4. Network

Specific UID numbers and ranges of numbers are used for specific purposes by Red Hat Enterprise Linux.

* UID 0 is always assigned to the superuser account, root.

* UID 1-200 is a range of "system users" assigned statically to system processes by Red Hat.
 
* UID 201-999 is a range of "system users" used by system processes that do not own files on the file system. They are typically assigned dynamically from the available pool when the software that needs them is installed. Programs run as these "unprivileged" system users in order to limit their access to just the resources they need to function.
 
* UID 1000+ is the range available for assignment to regular users.

## Understanding the root Account
root is the most privileged account on a Linux/UNIX system. This account has the ability to carry out all facets of system administration, including adding accounts, changing user passwords, examining log files, installing software, etc. Utmost care must be taken when using this account. It has no security restrictions imposed upon it.

### Operations Requiring root Privileges

![](https://images.viblo.asia/a5535166-8363-4c34-bb6c-dcc9dcd9150a.png)

### Operations Not Requiring root Privileges
![](https://images.viblo.asia/de1ded9e-1a12-4f04-b308-2a723f63c04b.png)
### Comparing sudo and su
![](https://images.viblo.asia/276f24fc-6720-4043-b2a4-5d21c08c5f0e.png)

## Process Isolation
![](https://images.viblo.asia/6510e7a6-3ee0-4c05-8f81-6aa2352adb7d.png)

Linux is considered to be more secure than many other operating systems because processes are naturally isolated from each other. One process normally cannot access the resources of another process, even when that process is running with the same user privileges. Linux thus makes it difficult (though certainly not impossible) for viruses and security exploits to access and attack random resources on a system.


Additional security mechanisms that have been recently introduced in order to make risks even smaller are:

* Control Groups (cgroups): Allows system administrators to group processes and associate finite resources to each cgroup.
* Linux Containers (LXC): Makes it possible to run multiple isolated Linux systems (containers) on a single system by relying on cgroups.
* Virtualization: Hardware is emulated in such a way that not only processes can be isolated, but entire systems are run simultaneously as isolated and insulated guests (virtual machines) on one physical host.

## How Passwords are Stored
![](https://images.viblo.asia/3710c393-27c8-4d75-94fd-e0c20492296b.png)
The system verifies authenticity and identity using user credentials. Originally, encrypted passwords were stored in the /etc/passwd file, which was readable by everyone. This made it rather easy for passwords to be cracked. On modern systems, passwords are actually stored in an encrypted format in a secondary file named /etc/shadow. Only those with root access can modify/read this file.

### Password Algorithm
Most Linux distributions rely on a modern password encryption algorithm called SHA-512 (Secure Hashing Algorithm 512 bits), developed by the U.S. National Security Agency (NSA) to encrypt passwords.

The SHA-512 algorithm is widely used for security applications and protocols. These security applications and protocols include TLS, SSL, PHP, SSH, S/MIME and IPSec. SHA-512 is one of the most tested hashing algorithms.

Lab: 
1: add user --  useradd 
2: del user --  sudo userdel newuser