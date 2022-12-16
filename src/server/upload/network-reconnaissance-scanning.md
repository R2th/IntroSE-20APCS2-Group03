When we deploy an application and provide accessibility to the world, the first concern that comes in mind, is security. We enforce security constrains, often configure the network to provide minimal access to the outside world. Throughout the way, many different tools accompany us, among those, a very useful tool is network scanner, otherwise known as port scanner. In this article, we'll briefly go through different network scanning strategies, and build a simple network scanner.

## Reasons

Network scanning may have many different reasons. When a network is configured, a scanner can be used to assess the security level. The scanner provides insight about informations including but not limited to,

- Service port status
- Host activity
- Network mapping
- Service identification
- OS identification
- Latency assessment
- Physical or logical channel fault detection

Not to mention, like any other security tools out there, network scanner has it's equal share of ethical and unethical usage.

## Types of scanning

Network scanning is a low level networking operation that operates on transport layer. It operates using [network sockets](https://en.wikipedia.org/wiki/Network_socket). The term "Port" is used as an external endpoint of a connection, where "Socket" is used as an internal endpoint.

Port numbers (both for UDP and TCP) are often standardized (i.e. by IANA), on which popular services run. But, that is just a suggestion, cause service administrator may choose to utilize a different port. Scanning can be differentiated into two categories.

### TCP scanning

TCP is a connection oriented protocol and all the web applications that rely on HTTP or HTTPS, use this protocol. Primarily the services that requires a reliable connection with error recovery, are based on TCP. Some notable services that uses TCP includes, FTP (21), SSH (22), NTP (123), Kerberos (464), Telnet (23), MySQL (3306), Redis (6379), IMAP (143).

### UDP scanning

UDP is a faster, connectionless protocol without error recovery support, that is mostly used by network services that doesn't require a natively trusted connection (e.g. streaming services, low level networking services). The primary reason behind utilization of this service is, speed. Some notable UDP services includes DNS (53), DHCP (547), OpenVPN (1194) and more.

A service can be assigned with any port number. It can only be determined that you are talking to a specific service, is by pre-negotiation, meta-analysis (otherwise known as banner grabbing), or by specific handshake pattern. A service that is TCP based, may also have its UDP counterpart (often in the same suite).

## Tools

There are countless network discovery tools and suites which incorporates a network scanner, among which [nmap](https://nmap.org/), [netcat](http://nc110.sourceforge.net/) (also [ncat](https://nmap.org/ncat/), Nmap's reimplementation of netcat) and [angry IP scanner](http://angryip.org/) received a wide popularity, where Nmap is often popular among Linux communities.

It will be an understatement, if Nmap is just considered as a port scanner. It's a powerful utility that incorporates many bells and whistles to be a good network exploration kit.

### Example

Let's go through some basic exploration operation using Nmap. Nmap is a command line utility, and Linux will be our host OS.

#### Single host scanning

This is the simplest operation, where the target IP is known. Let's scan our host machine for any port.

```bash
$ nmap 127.0.0.1

Starting Nmap 7.01 ( https://nmap.org )
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000048s latency).
Not shown: 997 closed ports
PORT     STATE SERVICE
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 0.04 seconds
```

The scan indicates that the host is alive (certainly it is :D ) and has a MySQL server running. The above scan is exhaustive and scans through all predefined ports, since we haven't specified any. If we specify a port, the scan would look like the following, if it's not open.

```bash
$ nmap -p 80 127.0.0.1

Starting Nmap 7.01 ( https://nmap.org )
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000055s latency).
PORT   STATE  SERVICE
80/tcp closed http

Nmap done: 1 IP address (1 host up) scanned in 0.03 seconds
```

A port may also be marked as filtered. It's an indication that the service running on the port is not participating in a requested handshake. This implies that, there might be a firewall blocking the requests (e.g. ACL on router), or some network difficulties (e.g. packet loss) preventing the connection from being established.

A host can be a domain, in which case, Nmap will utilize DNS to get the host IP.

#### Multiple host scanning

Often, it's necessary to scan more than one host. Nmap supports a number of ways to scan multiple hosts at a single go. Hosts can be explicitly specified in a text file,

```bash
$ nmap -iL list-of-ips.txt

# list-of-ips.txt
192.168.1.3
192.168.1.5
```

or, through a range notation,

```bash
nmap 192.168.1.1-20
```

#### UDP scanning

The concept of UDP scanning is identical to that of TCP scanning, except, the underlying probing strategy is drastically different. While using Nmap, UDP scan can be initiated using switch `-sU`.

```bash
$ nmap -sU 127.0.0.1

Starting Nmap 7.01 ( https://nmap.org )
Nmap scan report for localhost (127.0.0.1)
Host is up (0.000014s latency).
Not shown: 997 closed ports
PORT     STATE         SERVICE
68/udp   open|filtered dhcpc

Nmap done: 1 IP address (1 host up) scanned in 2.77 seconds
```

Oops, looks like Nmap could not determine which state the "dhcpc" port is in. It essentially means that the port didn't respond (if you are certain that the host is alive ;) ) to the handshake request. A point to note here is that, a closed port sends back a termination packet, while filtered ports don't. Also, you certainly don't expect response for a request packet that might have got corrupted or dropped on the way.

#### Network scanning

A network block can also be specified using CIDR notation. For, an IPV4 address (32-bit), the notation indicates net-bits. Rest of the bits (32 - 24 = 8) are host bits. As an example, for the following subnet, first three octets (group of consecutive 8-bits) are net-bits (regions where 192, 168 and 3 is placed), and the last octet (where 0 is placed) is host region. That necessarily means that the following network will have a maximum of  256 hosts (2^8). But, certainly, maximum effective host count will be 254, excluding one network address (192.168.1.0) and one broadcast address (192.168.1.255).

```bash
nmap 192.168.1.0/24
```

The above command will scan for all 254 hosts in the specified subnet.

## Strategies

Network scanning utilizes many different strategies for different scenarios. Let's discuss some of those.

### Service detection

Network services often identifies themselves with meta-data, which in turn often contains service name and version. We can leverage the meta-data to detect the service and version. This strategy is widely known as banner grabbing. The following example identifies that our target port is running a MySQL server, version 5.7.21.

```bash
$ nmap -sV -p 3306 127.0.0.1

...
PORT     STATE SERVICE VERSION
3306/tcp open  mysql   MySQL 5.7.21-0ubuntu0.16.04.1
...
```

Here's another scan on a http server,

```bash
$ nmap -sV -p 80 127.0.0.1

PORT   STATE SERVICE VERSION
80/tcp open  Apache
```

Let's more closely investigate the raw HTTP data for this server,

```text
HTTP/1.1 200 OK
    Date: Mon, 19 Jan 2018 18:18:20 GMT
    Server: Apache
    Last-Modified: Mon, 19 Jan 2018 17:29:19 GMT
    Accept-Ranges: bytes
    Content-Length: 9328
    Connection: close
    Content-Type: text/html
    ...
```

Notice that the server hides it's version tag, so Nmap couldn't detect.

It is also possible to develop a custom script to detect a service version based on any available data metrics.

### OS detection

Although, a service host doesn't shout out it's OS name with every packet, but an OS can be detected using varying fingerprints, like certain protocol flags, options and data in packets. Using Nmap, OS of a host can be detected using the `-O` flag.

```bash
$ nmap -O 127.0.0.1

...
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.8 - 4.0
Network Distance: 0 hops
...
```

The above information indicates that the target OS is a Linux with kernel version is somewhere between 3.8 - 4.0. Oh no, we don't a very accurate information. But, that doesn't necessarily mean that the prediction is always this inaccurate. Prediction accuracy varies with OS kernel versions. The most important part to note here is the `OS CPE` segment. It's a form of naming standardization. CPE (Common Platform Enumeration) has the following format,

```text
cpe:/<part>:<vendor>:<product>:<version>:<update>:<edition>:<language>
```

`<part>` section indicates device type. For our case, it is `o`, which stands for "Operating System". With an increasing accuracy, more information becomes available. As an example, the following target detection had a higher accuracy, which could detect kernel version precisely.

```text
...
Running: Linux 2.6.X
OS CPE: cpe:/o:linux:linux_kernel:2.6.39
OS details: Linux 2.6.39
...
```

### Port knocking

Port knocking is a less known method, which is used to authorize handshake with a specific port. In order to be authorized, an application must knock a number of closed ports, in s specific sequence. Only then, the target port will open.

When efficiency is considered, it is certainly not a very good method for enabling authorized access. Cause, an attacker with packet interception capability, can easily calculate the correct authorization sequence. Although, it is a weak security measure that administrator can take to protect a service, it is still considered as the first line of defense, sometimes.

### Vulnerability assessment

A service vulnerability is often assessed based on one or more strategies including metadata extraction, banner grabbing, OS detection and certainly from the custom data extracted from each packet.

Discussion of vulnerability assessment deserves it's own article series, let's leave it for now.

## Network scanner internals

While developing a complete network scanning tool is difficult, we can develop a simple script to probe TCP ports pretty easily. Consider the following Ruby script,

```ruby
require "socket"

def port_open? host, port
  socket = Socket.new :INET, :STREAM, 0
  address = Socket.pack_sockaddr_in(port, host)

  begin
    socket.connect address
    socket.close
    port
  rescue StandardError
    nil
  end
end
```

It probes specified TCP ports on specified hosts. Let's go through the code.

First, we are defining a socket.

```ruby
socket = Socket.new :INET, :STREAM, 0
```

then, host and port pair is bound in a socket consumable format.

```ruby
address = Socket.pack_sockaddr_in(port, host)
```

Now, a connection attempt is made. And, if the handshake is successful, we simply close the connection.

```ruby
socket.connect address
socket.close
```

While our tiny solution works well as a simple TCP port scanner, it also has some drawbacks. As an example, there are cases, when the port will not respond, and the socket will hang there indefinitely. We can circumvent this using timeout. Banner grabbing requires more sophisticated code, and specific scripts for specific services. OS detection requires more than a single handshake and OS specific script (combined with UDP scanning). Simultaneous multi host scanning can be enabled through threading. The list is almost never ending. But, as long as a minimal solution is considered, it works! :)

---

Implementation of a port scanner from the scratch is certainly not a very good idea, unless there are specific reasons behind it. But, understanding it's internals help in the journey of securing our most dear applications, a lot.

## References

- https://nmap.org/book/man.html
- https://linux.die.net/man/1/nc
- https://www.amazon.com/Protocol-Suite-Mcgraw-hill-Forouzan-Networking/dp/0073376043
- https://github.com/at-shakil/portfinder