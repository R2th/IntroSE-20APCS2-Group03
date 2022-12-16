Như anh em đã/đang/sẽ nghiên cứu và thi OSCP thì sẽ biệt một chính sách của OSCP là cấm sử dụng các công cụ khai thác tự động. Chính sách này mình thấy cũng rất đúng vì nó tránh được việc không cần hiểu bản chất mà cứ chạy tool là khai thác thành công - kiểu script kiddie.

Sau đây là danh sách không chính thức các công cụ được OSCP phê duyệt đã được đăng trong PWK / OSCP Prep Discord Server (https://discord.gg/eG6Nt4x).
Lưu ý: 
- Đây không có nghĩa là một danh sách đầy đủ tất cả các công cụ. Đây chỉ là những công cụ được đề xuất bởi những người chơi OSCP khác, tạm coi là "được chấp thuận" cho kỳ thi.
- Sẽ có một số công cụ trên đây không được đề xuất trên Discord.
- Theo nguyên tắc chung của OSCP: nếu một công cụ có thể tự động khai thác, nó sẽ bị cấm trong kỳ thi.
- Danh sách có thể thay đổi theo thời gian - Update lần cuối: 13/12/2020.

**Note Taking**
* CherryTree - https://www.giuspen.com/cherrytree/ (Template: https://411hall.github.io/assets/files/CTF_template.ctb)
* KeepNote - http://keepnote.org/
* PenTest.ws - https://pentest.ws/
* Microsoft OneNote
* GitHub Repo
* Joplin with TJNull (OffSec Community Manager) template - https://github.com/tjnull/TJ-JPT
* Obisidian Mark Down - https://obsidian.md/

**Reporting Frameworks**
* Dradis - https://dradisframework.com/academy/industry/compliance/oscp/
* Serpico - https://github.com/SerpicoProject/Serpico

**Report Template**
* Created by whoisflynn - https://github.com/whosiflynn/OSCP-Exam-Report-Template
* Created by Noraj - https://github.com/noraj/OSCP-Exam-Report-Template-Markdown

**Enumeration**
* AutoRecon - https://github.com/Tib3rius/AutoRecon
* nmapAutomator - https://github.com/21y4d/nmapAutomator
* Reconbot - https://github.com/Apathly/Reconbot
* Raccoon - https://github.com/evyatarmeged/Raccoon

**Web Related**
* Dirsearch - https://github.com/maurosoria/dirsearch
* GoBuster - https://github.com/OJ/gobuster
* Recursive GoBuster - https://github.com/epi052/recursive-gobuster
* wfuzz - https://github.com/xmendez/wfuzz
* goWAPT - https://github.com/dzonerzy/goWAPT
* ffuf - https://github.com/ffuf/ffuf
* Nikto - https://github.com/sullo/nikto
* dirb - https://tools.kali.org/web-applications/dirb
* dirbuster - https://tools.kali.org/web-applications/dirbuster
* feroxbuster - https://github.com/epi052/feroxbuster
* FinalRecon - https://github.com/thewhiteh4t/FinalRecon

**Network Tools**
* Impacket (SMB, psexec, etc) - https://github.com/SecureAuthCorp/impacket

**File Transfers**
* updog - https://github.com/sc0tfree/updog

**Wordlists / Dictionaries**
* SecLists - https://github.com/danielmiessler/SecLists

**Payload Generators**
* Reverse Shell Generator - https://github.com/cwinfosec/revshellgen
* Windows Reverse Shell Generator - https://github.com/thosearetheguise/rev
* MSFVenom Payload Creator - https://github.com/g0tmi1k/msfpc

**PHP Reverse Shells**
* Windows PHP Reverse Shell - https://github.com/Dhayalanb/windows-php-reverse-shell
* PenTestMonkey Unix PHP Reverse Shell - http://pentestmonkey.net/tools/web-shells/php-reverse-shell

**Terminal Related**
* tmux - https://tmuxcheatsheet.com/ (cheat sheet)
* tmux-logging - https://github.com/tmux-plugins/tmux-logging
* Oh My Tmux - https://github.com/devzspy/.tmux
* screen - https://gist.github.com/jctosta/af918e1618682638aa82 (cheat sheet)
* Terminator - http://www.linuxandubuntu.com/home/terminator-a-linux-terminal-emulator-with-multiple-terminals-in-one-window
* vim-windir - https://github.com/jtpereyda/vim-windir

**Exploits**
* Exploit-DB - https://www.exploit-db.com/
* Windows Kernel Exploits - https://github.com/SecWiki/windows-kernel-exploits
* AutoNSE - https://github.com/m4ll0k/AutoNSE
* Linux Kernel Exploits - https://github.com/lucyoa/kernel-exploits

**Password Brute Forcers**
* BruteX - https://github.com/1N3/BruteX
* Hashcat - https://hashcat.net/hashcat/
* John the Ripper - https://www.openwall.com/john/

**Post-Exploitation / Privilege Escalation**
* LinEnum - https://github.com/rebootuser/LinEnum
* linprivchecker -https://www.securitysift.com/download/linuxprivchecker.py
* Powerless - https://github.com/M4ximuss/Powerless
* PowerUp - https://github.com/HarmJ0y/PowerUp
* Linux Exploit Suggester - https://github.com/mzet-/linux-exploit-suggester
* Windows Exploit Suggester - https://github.com/bitsadmin/wesng
* Windows Privilege Escalation Awesome Scripts (WinPEAS) - https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/winPEAS
* Linux Privilege Escalation Awesome Script (LinPEAS) - https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/tree/master/linPEAS
* GTFOBins (Bypass local restrictions) - https://gtfobins.github.io/
* Get GTFOBins - https://github.com/CristinaSolana/ggtfobins
* sudo_killer - https://github.com/TH3xACE/SUDO_KILLER
* WADComs - https://wadcoms.github.io/
* LOLBAS - https://lolbas-project.github.io/

**Buffer Overflow Practice**
* Vulnserver for Windows - https://github.com/stephenbradshaw/vulnserver
* Vulnserver for Linux - https://github.com/ins1gn1a/VulnServer-Linux
* Tib3rius TryHackMe BOF - https://tryhackme.com/jr/bufferoverflowprep

**Privilege Escalation Practice**
* Local Privilege Escalation Workshop - https://github.com/sagishahar/lpeworkshop
* Linux Privilege Escalation - https://www.udemy.com/course/linux-privilege-escalation/
* Windows Privilege Escalation - https://www.udemy.com/course/windows-privilege-escalation/

**Extra Practice**
* HTB/Vulnhub like OSCP machines (Curated by OffSec Community Manager TJNull)- https://docs.google.com/spreadsheets/d/1dwSMIAPIam0PuRBkCiDI88pU3yzrqqHkDtBngUHNCw8/edit#gid=1839402159
* Offensive Security: Proving Grounds - https://https://www.offensive-security.com/labs/individual/
* Virtual Hacking Labs - https://www.virtualhackinglabs.com/
* HackTheBox (Requires VIP for Retired machines) - https://www.hackthebox.eu/
* Vulnhub - https://www.vulnhub.com/
* Root-Me - https://www.root-me.org/
* Try Hack Me - https://tryhackme.com
* OverTheWire - https://overthewire.org (Linux basics)

Dịch [ThaoPT](https://www.nextsec.vn/2021/02/cac-cong-cu-khai-thac-khong-chinh-thuc-duoc-OSCP-phe-duyet.html.html.html) / By [FalconSpy](https://falconspy.medium.com/unofficial-oscp-approved-tools-b2b4e889e707)