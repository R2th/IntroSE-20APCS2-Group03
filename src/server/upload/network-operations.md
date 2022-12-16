# 1 Network Addresses and DNS

## 1.1 Introduction to Networking
A network is a group of computers and computing devices connected together through communication channels, such as cables or wireless media. 
The computers connected over a network may be located in the same geographical area or spread across the world. ![](https://images.viblo.asia/cda7f0ce-e002-4896-a847-48e803272810.png)

A network is used to:
1. Allow the connected devices to communicate with each other
2. Enable multiple users to share devices over the network, such as printers and scanners
3. Share and manage information across computers easily.

Most organizations have both an internal network and an Internet connection for users to communicate with machines and people outside the organization. The Internet is the largest network in the world and is often called "the network of networks".
## 1.2 IP Addresses
Devices attached to a network must have at least one unique network address identifier known as the IP (Internet Protocol) address. The address is essential for routing packets of information through the network. ![](https://images.viblo.asia/0ab66213-dedd-455e-8467-2f6600cf92c5.png)

Exchanging information across the network requires using streams of small packets, each of which contains a piece of the information going from one machine to another. **These packets contain data buffers together with headers which contain information about where the packet is going to and coming from**, and where it fits in the sequence of packets that constitute the stream. Networking protocols and software are rather complicated due to the diversity of machines and operating systems they must deal with, as well as the fact that even very old standards must be supported.

## 1.3 IPv4 and IPv6
![](https://images.viblo.asia/469aa051-5acf-4d5c-b2a2-d18371bbcee2.png)
There are two different types of IP addresses available: IPv4 (version 4) and IPv6 (version 6). 

* IPv4 uses 32-bits for addresses; there are only 4.3 billion unique addresses available. Furthermore, many addresses are allotted and reserved, but not actually used. IPv4 is considered inadequate for meeting future needs because the number of devices available on the global network has increased enormously in recent years.

* IPv6 uses 128-bits for addresses; this allows for 3.4 X 1038 unique addresses. If you have a larger network of computers and want to add more, you may want to move to IPv6, because it provides more unique addresses. However, it can be complex to migrate to IPv6; the two protocols do not always inter-operate well. Thus, moving equipment and addresses to IPv6 requires significant effort and has not been quite as fast as was originally intended.

### 1.3.1 Decoding IPv4 Addresses
![](https://images.viblo.asia/1e7e56fd-a2bd-4078-9ad1-62d80da7027a.png)

A 32-bit IPv4 address is divided into four 8-bit sections called octets.

Example:
* IP address →            172  .          16  .          31  .         46

* Bit format →     10101100.00010000.00011111.00101110. (Octet is just another word for byte.)

Network addresses are divided into five classes: A, B, C, D, and E. 
Classes A, B, and C are classified into two parts: Network addresses (Net ID) and Host address (Host ID). 
1.      The Net ID is used to identify the network. 
2.      Host ID is used to identify a host in the network. 
   
Class D is used for special multicast applications (information is broadcast to multiple computers simultaneously) and Class E is reserved for future use. In this section you will learn about classes A, B, and C.
### 1.3.2 Class A Network Addresses
![](https://images.viblo.asia/9e67bf4c-18d7-4945-bdfd-bfaa12a81f9d.png)

Class A addresses use the first octet of an IP address as their Net ID and use the other three octets as the Host ID. The first bit of the first octet is always set to zero. So you can use only 7-bits for unique network numbers. As a result, there are a maximum of 126 Class A networks available (the addresses 0000000 and 1111111 are reserved). Not surprisingly, this was only feasible when there were very few unique networks with large numbers of hosts. As the use of the Internet expanded, Classes B and C were added in order to accommodate the growing demand for independent networks.

Each Class A network can have up to 16.7 million unique hosts on its network. The range of host address is from 1.0.0.0 to 127.255.255.255.

Note: The value of an octet, or 8-bits, can range from 0 to 255.

### 1.3.3 Class B Network Addresses
![](https://images.viblo.asia/65b9a82c-afb7-4cb3-96e8-1fdd525722fe.png)
Class B addresses use the first two octets of the IP address as their Net ID and the last two octets as the Host ID. The first two bits of the first octet are always set to binary 10, so there are a maximum of 16,384 (14-bits) Class B networks. The first octet of a Class B address has values from 128 to 191. The introduction of Class B networks expanded the number of networks but it soon became clear that a further level would be needed.

Each Class B network can support a maximum of 65,536 unique hosts on its network. The range of host address is from 128.0.0.0 to 191.255.255.255.
### 1.3.4 Class C Network Addresses

![](https://images.viblo.asia/831724f3-1e43-4c55-9208-22719882f37d.png)

Class C addresses use the first three octets of the IP address as their Net ID and the last octet as their Host ID. The first three bits of the first octet are set to binary 110, so almost 2.1 million (21-bits) Class C networks are available. The first octet of a Class C address has values from 192 to 223. These are most common for smaller networks which don't have many unique hosts.

Each Class C network can support up to 256 (8-bits) unique hosts. The range of host address is from 192.0.0.0 to 223.255.255.255.
### 1.3.5 IP Address Allocation
![](https://images.viblo.asia/ffbcd2b4-5b05-4a88-8d20-960d7a54c0e9.png)
Typically, a range of IP addresses are requested from your Internet Service Provider (ISP) by your organization's network administrator. Often, your choice of which class of IP address you are given depends on the size of your network and expected growth needs.

You can assign IP addresses to computers over a network manually or dynamically. When you assign IP addresses manually, you add static (never changing) addresses to the network. When you assign IP addresses dynamically (they can change every time you reboot or even more often), the Dynamic Host Configuration Protocol (DHCP) is used to assign IP addresses.

## 1.4 Name Resolution
![](https://images.viblo.asia/1f6dc88b-9b83-42bc-8094-a1b1a7433706.png)

Name Resolution is used to convert numerical IP address values into a human-readable format known as the hostname. For example, 140.211.169.4 is the numerical IP address that refers to the linuxfoundation.org hostname. Hostnames are easier to remember. 

Given an IP address, you can obtain its corresponding hostname. Accessing the machine over the network becomes easier when you can type the hostname instead of the IP address.

You can view your system’s hostname simply by typing hostname with no argument.

Note: If you give an argument, the system will try to change its hostname to match it, however, only root users can do that.

The special hostname localhost is associated with the IP address 127.0.0.1, and describes the machine you are currently on (which normally has additional network-related IP addresses).
Example: host google.com, nslookup google.com, dig google.com

## 1.5 SSH: Executing Commands Remotely
![](https://images.viblo.asia/b18f500d-39cc-4ea5-b743-264dd5da2ded.png)
Secure Shell (SSH) is a cryptographic network protocol used for secure data communication. It is also used for remote services and other secure services between two devices on the network and is very useful for administering systems which are not easily available to physically work on, but to which you have remote access.

To login to a remote system using your same user name you can just type ssh some_system and press Enter. ssh then prompts you for the remote password.  You can also configure ssh to securely allow your remote access without typing a password each time.

If you want to run as another user, you can do either ssh -l someone some_system or ssh someone@some_system. To run a command on a remote system via SSH, at the command prompt, you can type  ssh some_system my_command.  
![](https://images.viblo.asia/76732568-bf27-4d8a-8435-628042e97820.png)

We can also move files securely using Secure Copy (scp) between two networked hosts. scp uses the SSH protocol for transferring data.

To copy a local file to a remote system, at the command prompt, type scp <localfile> <user@remotesystem>:/home/user/ and press Enter.

You will receive a prompt for the remote password. You can also configure scp so that it does not prompt for a password for each transfer.