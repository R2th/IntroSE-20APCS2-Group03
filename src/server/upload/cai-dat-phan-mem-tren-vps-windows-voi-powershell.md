Hí anh em, dạo này mình phải làm việc với VPS Windows nhiều quá đâm ra thao tác bằng tay quá mệt, với những cụ chuyên bán vps thì chắc đã quá hiểu và quá quen tay với việc thao tác lặp đi lặp lại trên VPS mới tạo rồi 🤣

Nếu là Linux thì đơn giản, ta có thể dùng lệnh, tuy nhiên ít người để ý rằng Windows bấy lâu nay cũng có thể dùng lệnh để thực hiện thao tác lặp đi lặp lại rất đơn giản, không phải dùng CMD nhé.

Trước mình có làm một tool auto cài đặt trên VPS rồi nhưng không auto được 100%, lại còn khó tuỳ biến. Nay xin hướng dẫn AE Viblo sử dụng PowerShell để làm việc cho nhanh gọn nhẹ. Ngày xửa ngày xưa PowerShell có từ thời Windows XP :D

Lưu ý là khi chạy lệnh mà nhấn chuột trái vào màn hình PowerShell là lệnh đang chạy sẽ bị dừng, nên AE để ý không lại tưởng nó lỗi 😗

AE sẽ cần dùng nhiều tới lệnh choco của Chocolatey để cài đặt phần mềm như opera/chrome và rất rất nhiều phần mềm khác tìm kiếm ở trang web của nó: [https://chocolatey.org/](https://chocolatey.org/)

Mỗi khi dùng lệnh choco để cài đặt nó sẽ dừng lại hỏi mình có chắc chắn cài đặt không, điền vào chữ ( y ) rồi nhấn ENTER để chạy tiếp.
Nhưng AE Viblo chúng ta thì thích luôn và ngay nên lúc gõ lệnh choco thì ta thêm -y vào để nó khỏi hỏi. Ví dụ "choco install -y opera"

Để chạy lệnh, COPY lệnh, chuột phải vào cửa sổ PowerShell để PASTE, rồi nhấn ENTER.
Muốn dùng nhiều lệnh 1 lúc thì COPY vào 1 file txt mỗi lệnh 1 dòng rồi PASTE 1 thể mà chạy, lệnh nào ở trên thì chạy trước.
### Tắt IE-ESC
```
function Disable-ieESC {
    $AdminKey = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A509B1A7-37EF-4b3f-8CFC-4F3A74704073}"
    $UserKey = "HKLM:\SOFTWARE\Microsoft\Active Setup\Installed Components\{A509B1A8-37EF-4b3f-8CFC-4F3A74704073}"
    Set-ItemProperty -Path $AdminKey -Name "IsInstalled" -Value 0
    Set-ItemProperty -Path $UserKey -Name "IsInstalled" -Value 0
    Stop-Process -Name Explorer
    Write-Host "IE Enhanced Security Configuration (ESC) has been disabled." -ForegroundColor Green
}
Disable-ieESC
```
### ĐỔI PASSWORD CỦA ADMIN
```
net user administrator NEWPASS
```
### Cài đặt Chocolatey
```
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```
### Cài 1 phát hết đống VC++
```
choco install -y vcredist2010 vcredist2012 vcredist2013 vcredist2015
```
### Cài đặt .NET 4.5.2
```
choco install -y dotnet4.5.2
```
### Cài Chrome
```
choco install -y googlechrome
```
### Mở trình duyệt - Mở trang web bằng trình duyệt
```
Start-Process "chrome.exe"
Start-Process "opera.exe" "https://google.com"
Start-Process "opera.exe" "http://gmail.com http://account.google.com https://pay.tuann.pw"
```
### Allow App through Windows Defender Firewall
```
New-NetFirewallRule -DisplayName "app name" -Direction Inbound -Program "Full path of .exe" -Action Allow
```
Substitute **app name** in the command above with the actual name of the app (ex: "Google Chrome").

Substitute **Full path of .exe** in the command above with the actual full path to the .exe file (ex: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe") of the app.

**For example:**
```
New-NetFirewallRule -DisplayName "Google Chrome" -Direction Inbound -Program "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" -Action Allow
```

Chúc ae may mắn!