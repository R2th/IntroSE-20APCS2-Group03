**Thư viện liên kết động - DLL**

Nếu bạn muốn viết phần mềm mô-đun, bạn sẽ rất quan tâm đến các thư viện liên kết động (DLL). Có thể bạn đang nghĩ rằng mình đã viết phần mềm mô-đun vì các lớp C ++ là mô-đun. Nhưng các lớp là mô-đun thời gian xây dựng và các tệp DLL là thời gian chạy mô-đun. Thay vì phải taojh lại  các  file EXE khổng lồ mà mỗi khi bạn phải xây dựng lại và kiểm tra sau khi thực hiện thay đổi, bạn có thể xây dựng các mô-đun DLL nhỏ hơn và kiểm tra chúng riêng lẻ. Ví dụ, bạn có thể đặt một lớp C ++ trong một DLL, có thể nhỏ tới 12 KB sau khi biên dịch và liên kết. Các chương trình máy khách có thể tải và liên kết DLL của bạn rất nhanh khi chúng chạy. Bản thân Microsoft Windows cũng sử dụng DLL cho các chức năng chính của nó. Các tệp DLL ngày càng dễ viết hơn. Win32 đã đơn giản hóa rất nhiều mô hình lập trình và ngày càng có nhiều hỗ trợ tốt hơn từ AppWizard và thư viện Microsoft Foundation Class (MFC). Mô-đun này hướng dẫn bạn cách viết DLL trong C ++ và cách viết các chương trình khách (client) sử dụng DLL. Bạn sẽ khám phá cách Win32 ánh xạ các tệp DLL vào các quy trình của mình và bạn sẽ tìm hiểu sự khác biệt giữa các tệp DLL thông thường của thư viện MFC và các tệp DLL mở rộng thư viện MFC. Bạn sẽ thấy các ví dụ về các DLL đơn giản của từng loại cũng như một ví dụ DLL phức tạp hơn triển khai một điều khiển tùy chỉnh.

**Lý thuyết DLL cơ bản**

Trước khi xem xét sự hỗ trợ của framework dành cho DLL, bạn phải hiểu được cách Win32 tích hợp DLL vào quy trình của bạn. Hãy nhớ rằng một tiến trình là một phiên bản đang chạy của một chương trình và chương trình đó bắt đầu dưới dạng tệp EXE trên đĩa.

Về cơ bản, DLL là một tệp trên đĩa (thường có phần mở rộng DLL) bao gồm dữ liệu toàn cục, các hàm được biên dịch và tài nguyên, trở thành một phần của quy trình trong chương trình của bạn. Nó được biên dịch để tải tại một địa chỉ mà bạn muốn và nếu không có xung đột với các DLL khác, tệp sẽ được ánh xạ tới cùng một địa chỉ ảo trong chương trình của bạn. DLL có các function được **export** khác nhau và chương trình khách (client - chương trình đã tải DLL ở vị trí đầu tiên) **import** các chức năng đó. Windows đối sánh các loại  **import** và **export** khi nó tải DLL. Win32 DLL cho phép **exported** các biến toàn cục cũng như các hàm.

 
Trong Win32, mỗi tiến trình nhận được bản sao riêng của các biến toàn cục đọc / ghi của DLL. Nếu bạn muốn chia sẻ bộ nhớ giữa các tiến trình, bạn phải sử dụng tệp ánh xạ bộ nhớ hoặc khai báo phần dữ liệu được chia sẻ như được mô tả trong Windows nâng cao của tác giả Jeffrey Richter (Microsoft Press, 1997). Bất cứ khi nào DLL của bạn yêu cầu bộ nhớ heap, bộ nhớ đó sẽ được cấp phát từ heap của tiến trình máy khách (client).

**Import và export được dùng như thế nào**

Một DLL chứa một bảng các hàm đã xuất. Các chức năng này được xác định với thế giới bên ngoài bằng tên tượng trưng của chúng và (tùy chọn) bởi các số nguyên được gọi là số thứ tự. Bảng hàm cũng chứa địa chỉ của các hàm trong DLL. Khi chương trình khách lần đầu tiên tải DLL, nó không biết địa chỉ của các hàm mà nó cần gọi, nhưng nó biết các ký hiệu hoặc thứ tự. Sau đó, quá trình liên kết động sẽ xây dựng một bảng kết nối các lệnh gọi của máy khách (client) với các địa chỉ hàm trong DLL. Nếu bạn chỉnh sửa và xây dựng lại DLL, bạn không cần phải xây dựng lại chương trình khách của mình trừ khi bạn đã thay đổi tên hàm hoặc chuỗi tham số. hiểu một cách đơn giản, bạn sẽ có một tệp EXE **import** các hàm từ một hoặc nhiều DLL. Trong thực tế, nhiều DLL gọi các hàm bên trong các DLL khác. Do đó, một DLL cụ thể có thể có cả **import** và **export**.

Đây không phải là vấn đề vì quá trình liên kết động có thể xử lý các phụ thuộc chéo. Trong mã DLL, bạn phải khai báo rõ ràng các hàm đã xuất của mình như sau:

`__declspec(dllexport) int MyFunction(int n);`

Giải pháp thay thế là liệt kê các hàm đã xuất của bạn trong tệp [DEF] định nghĩa mô-đun, nhưng điều đó thường rắc rối hơn. Về phía máy khách, bạn cần khai báo các lần import tương ứng như sau:

`__declspec(dllimport) int MyFunction(int n);`

Nếu bạn đang sử dụng C ++, trình biên dịch sẽ tạo ra một tên được trang trí cho MyFunction (), mà các ngôn ngữ khác không thể sử dụng. Những tên được trang trí này là những tên dài mà trình biên dịch tạo ra dựa trên tên lớp, tên hàm và các kiểu tham số. Chúng được liệt kê trong tệp MAP của dự án. Nếu bạn muốn sử dụng tên thuần MyFunction (), bạn phải viết các khai báo theo cách sau:

```
extern "C" __declspec(dllexport) int MyFunction(int n);
extern "C" __declspec(dllimport) int MyFunction(int n);
```

Theo mặc định, trình biên dịch sử dụng quy ước truyền đối số `__cdecl`, có nghĩa là chương trình gọi sẽ bật các tham số ra khỏi ngăn xếp. Một số ngôn ngữ máy khách (client) có thể yêu cầu quy ước stdcall, quy ước này thay thế quy ước gọi Pascal và có nghĩa là hàm được gọi bật ra ngăn xếp. Do đó, bạn có thể phải sử dụng công cụ sửa đổi stdcall trong khai báo xuất DLL của mình. Chỉ có khai báo **import** là không đủ để tạo liên kết máy khách với DLL. Dự án của chương trình khách (client) phải chỉ định thư viện **import** (LIB) cho trình liên kết và chương trình khách phải thực sự chứa lệnh gọi đến ít nhất một trong các hàm đã imported của DLL. Câu lệnh gọi đó phải nằm trong một đường dẫn thực thi trong chương trình.

**Liên kết ngầm và Liên kết rõ ràng**

Phần trước chủ yếu mô tả liên kết ngầm, đó là những gì bạn là một lập trình viên C ++ có thể sẽ sử dụng cho các tệp DLL của bạn. Khi bạn tạo DLL, trình liên kết tạo tệp LIB, tệp này chứa mọi ký hiệu và thứ tự (tùy chọn) của DLL, nhưng không có mã. Tệp LIB là một đại diện cho DLL được thêm vào dự án của  chương trình khách (client) . Khi bạn xây dựng (liên kết tĩnh) máy khách, các ký hiệu đã nhập được khớp với các ký hiệu đã export trong tệp LIB và các ký hiệu (hoặc thứ tự) đó được liên kết với tệp EXE. Tệp LIB cũng chứa tên tệp DLL (nhưng không phải tên đường dẫn đầy đủ của nó), được lưu trữ bên trong tệp EXE. Khi máy khách được tải, Windows sẽ tìm và tải DLL, sau đó liên kết động nó theo ký hiệu hoặc theo thứ tự.

Liên kết rõ ràng thích hợp hơn cho các ngôn ngữ thông dịch như Microsoft Visual Basic, nhưng bạn có thể sử dụng nó từ C ++ nếu cần. Với liên kết rõ ràng, bạn không sử dụng tệp import; thay vào đó, bạn gọi hàm Win32 LoadLibrary (), chỉ định tên đường dẫn của DLL làm tham số. LoadLibrary () trả về một tham số HINSTANCE mà bạn có thể sử dụng trong cuộc gọi tới GetProcAddress (), nó sẽ chuyển đổi một biểu tượng (hoặc một thứ tự) thành một địa chỉ bên trong DLL. Giả sử bạn có một DLL exports một hàm như sau:

`extern "C" __declspec(dllexport) double SquareRoot(double d);`

Dưới đây là một ví dụ về liên kết rõ ràng của trình khách (client) với hàm:

```
typedef double (SQRTPROC)(double);
HINSTANCE hInstance;
SQRTPROC* pFunction;
VERIFY(hInstance = ::LoadLibrary("c:\\winnt\\system32\\mydll.dll"));
VERIFY(pFunction = (SQRTPROC*)::GetProcAddress(hInstance, "SquareRoot"));
double d = (*pFunction)(81.0); // Call the DLL function
```

Với liên kết ngầm định, tất cả các tệp DLL được tải khi client được tải, nhưng với liên kết rõ ràng, bạn có thể xác định thời điểm các tệp DLL được tải và không tải. Liên kết rõ ràng cho phép bạn xác định DLL sẽ tải trong thời gian chạy. Ví dụ: bạn có thể có một DLL với tài nguyên chuỗi bằng tiếng Anh và một tệp khác với tài nguyên chuỗi bằng tiếng Tây Ban Nha. Ứng dụng của bạn sẽ tải DLL thích hợp sau khi người dùng chọn một ngôn ngữ.

**Liên kết biểu tượng (symbolic ) và  liên kết thứ tự**

Trong Win16, liên kết theo thứ tự hiệu quả hơn là tùy chọn liên kết ưu tiên. Trong Win32, hiệu quả liên kết biểu tượng đã được cải thiện. Microsoft hiện khuyến nghị liên kết biểu tượng qua thứ tự. Tuy nhiên, phiên bản DLL của thư viện MFC sử dụng liên kết thứ tự. Một chương trình MFC điển hình có thể liên kết đến hàng trăm chức năng trong MFC DLL. Liên kết thông thường cho phép tệp EXE của chương trình đó nhỏ hơn vì nó không phải chứa các tên biểu tượng dài của các lần nhập của nó. Nếu bạn xây dựng DLL của riêng mình với liên kết thứ tự, bạn phải chỉ định thứ tự trong tệp DEF của dự án, tệp này không có quá nhiều mục đích sử dụng khác trong môi trường Win32. Nếu bản export của bạn là các hàm C ++, bạn phải sử dụng tên được trang trí trong tệp DEF (hoặc khai báo các hàm của bạn  bằng **extern "C"** ). Đây là một đoạn trích ngắn từ một trong các tệp DEF của thư viện MFC:

```
?ReadList@CRecentFileList@@UAEXXZ @ 5458 NONAME
?ReadNameDictFromStream@CPropertySection@@QAEHPAUIStream@@@Z @ 5459 NONAME
?ReadObject@CArchive@@QAEPAVCObject@@PBUCRuntimeClass@@@Z @ 5460 NONAME
?ReadString@CArchive@@QAEHAAVCString@@@Z @ 5461 NONAME
?ReadString@CArchive@@QAEPADPADI@Z @ 5462 NONAME
?ReadString@CInternetFile@@UAEHAAVCString@@@Z @ 5463 NONAME
?ReadString@CInternetFile@@UAEPADPADI@Z @ 5464 NONAME
```

**truy cập DLL qua DllMain()**

Theo mặc định, trình liên kết chỉ định điểm truy cập chính  _DllMainCRTStartup () cho DLL của bạn. Khi Windows tải DLL, nó sẽ gọi hàm này, hàm này đầu tiên gọi hàm tạo cho các đối tượng toàn cục và sau đó gọi hàm toàn cục DllMain (), mà bạn phải viết. DllMain () được gọi không chỉ khi DLL được gắn vào tiến trình mà còn khi nó được tách ra (và cả những lúc khác). Đây là một hàm DllMain () trong khung:

```
HINSTANCE g_hInstance;
extern "C" int APIENTRY
DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
    if (dwReason == DLL_PROCESS_ATTACH)
    {
        TRACE0("MYMFC22A.DLL Initializing!\n");
        // Do initialization here
    }
    else if (dwReason == DLL_PROCESS_DETACH)
    {
        TRACE0("MYMFC22A.DLL Terminating!\n");
        // Do cleanup here
    }
    return 1;   // ok
}
```

Nếu bạn không viết hàm DllMain () cho DLL của mình, một phiên bản không cần làm gì sẽ được đưa vào từ thư viện thời gian chạy.

Hàm DllMain () cũng được gọi khi các luồng riêng lẻ được bắt đầu và kết thúc, như được chỉ ra bởi tham số dwReason. Cuốn sách của Richter cho bạn biết tất cả những gì bạn cần biết về chủ đề phức tạp này.

**Instance Handles: Loading Resources**

Mỗi DLL trong một quy trình được xác định bằng một giá trị HINSTANCE 32-bit duy nhất. Ngoài ra, bản thân quy trình có giá trị HINSTANCE. Tất cả các xử lý phiên bản này chỉ hợp lệ trong một quy trình cụ thể và chúng đại diện cho địa chỉ ảo bắt đầu của DLL hoặc EXE. Trong Win32, các giá trị HINSTANCE và HMODULE giống nhau và các loại này có thể được sử dụng thay thế cho nhau. Xử lý cá thể của quy trình (EXE) hầu như luôn luôn là 0x400000 và xử lý cho một DLL được tải ở địa chỉ cơ sở mặc định là 0x10000000. Nếu chương trình của bạn sử dụng nhiều tệp DLL, mỗi tệp sẽ có một giá trị HINSTANCE khác nhau, do các tệp DLL có địa chỉ cơ sở khác nhau được chỉ định tại thời điểm tạo hoặc do trình tải đã sao chép và định vị lại mã DLL.

Xử lý phiên bản đặc biệt quan trọng để tải tài nguyên. Hàm FindResource () trong Win32 nhận tham số HINSTANCE. EXE và DLL đều có thể có tài nguyên riêng. Nếu bạn muốn một tài nguyên từ DLL, bạn chỉ định xử lý phiên bản của DLL. Nếu bạn muốn một tài nguyên từ tệp EXE, bạn chỉ định xử lý phiên bản của EXE.

Làm thế nào để bạn có được một xử lý phiên bản? Nếu bạn muốn xử lý của EXE, bạn gọi hàm Win32 GetModuleHandle () với tham số NULL. Nếu bạn muốn xử lý của DLL, bạn gọi hàm Win32 GetModuleHandle () với tên DLL làm tham số. Sau đó, bạn sẽ thấy rằng thư viện MFC có phương pháp tải tài nguyên riêng bằng cách tìm kiếm các mô-đun khác nhau theo trình tự.

**MFC DLL: Mở rộng và Thông thường**

Chúng tôi đã xem xét các tệp DLL Win32 có hàm DllMain () và một số hàm được xuất. Bây giờ chúng ta sẽ chuyển sang môi trường của MFC framework, mà  nó bổ sung thêm lớp hỗ trợ của riêng nó dựa trên nền tảng  của Win32. AppWizard cho phép bạn tạo hai loại DLL với hỗ trợ thư viện MFC: DLL mở rộng và DLL thông thường. Bạn phải hiểu sự khác biệt giữa hai loại này trước khi quyết định loại nào tốt nhất cho nhu cầu của bạn. Tất nhiên, Visual C ++ cho phép bạn xây dựng Win32 DLL thuần túy mà không có thư viện MFC, cũng như nó cho phép bạn xây dựng chương trình Windows mà không có thư viện MFC. Tuy nhiên, đây là một cuốn sách hướng đến MFC, vì vậy chúng tôi sẽ bỏ qua tùy chọn Win32 ở đây.

Một DLL mở rộng hỗ trợ giao diện C ++. Nói cách khác, DLL có thể xuất toàn bộ các lớp và trình khách (client )có thể xây dựng các đối tượng của các lớp đó hoặc dẫn xuất các lớp từ chúng. Một DLL mở rộng liên kết động với mã trong phiên bản DLL của thư viện MFC. Do đó, một DLL tiện ích mở rộng yêu cầu chương trình khách của bạn được liên kết động với thư viện MFC (mặc định của AppWizard) và cả chương trình khách và DLL tiện ích mở rộng phải được đồng bộ hóa với cùng một phiên bản của MFC DLL (mfc42.dll, mfc42d.dll , và như thế). Các DLL mở rộng khá nhỏ; bạn có thể tạo một DLL mở rộng đơn giản với kích thước 10 KB, tải nhanh chóng.

Nếu bạn cần một DLL có thể được tải bởi bất kỳ môi trường lập trình Win32 nào (bao gồm cả Visual Basic phiên bản 6.0), bạn nên sử dụng một DLL thông thường. Một hạn chế lớn ở đây là DLL thông thường chỉ có thể xuất các hàm kiểu C. Nó không thể xuất các lớp C ++, các hàm thành viên hoặc các hàm quá tải vì mọi trình biên dịch C ++ đều có phương pháp trang trí tên riêng. Tuy nhiên, bạn có thể sử dụng các lớp C ++ (đặc biệt là các lớp thư viện MFC) bên trong DLL thông thường của mình.

Khi bạn xây dựng một DLL thông thường của MFC, bạn có thể chọn liên kết tĩnh hoặc liên kết động với thư viện MFC. Nếu bạn chọn liên kết tĩnh, DLL của bạn sẽ bao gồm một bản sao của tất cả mã thư viện MFC mà nó cần và do đó sẽ được tự động. Một DLL thông thường được liên kết tĩnh thông thường của Release-build có kích thước khoảng 144 KB. Nếu bạn chọn liên kết động, kích thước giảm xuống còn khoảng 17 KB nhưng bạn sẽ phải đảm bảo rằng các tệp DLL MFC thích hợp hiện diện trên máy đích. Điều đó không có vấn đề gì nếu chương trình khách đã được liên kết động với cùng một phiên bản của thư viện MFC. Khi bạn cho AppWizard biết bạn muốn loại DLL hoặc EXE nào, hằng số #define của trình biên dịch được đặt như được hiển thị trong bảng sau

![](https://images.viblo.asia/b07318c2-1b30-48c7-96d3-880134d7c337.jpg)

Nếu bạn nhìn vào bên trong mã nguồn MFC và các tệp tiêu đề, bạn sẽ thấy rất nhiều câu lệnh #ifdef cho các hằng số này. Điều này có nghĩa là mã thư viện được biên dịch khá khác nhau tùy thuộc vào loại dự án bạn đang sản xuất.

**Các tệp DLL MFC được chia sẻ và các tệp DLL của Windows**

Nếu bạn debug Windows với tùy chọn MFC DLL được chia sẻ, chương trình của bạn được liên kết động với một hoặc nhiều trong số các DLL MFC (ANSI) này:

![](https://images.viblo.asia/7cb30b25-c4d1-4ebe-98dc-6bfda392c0ff.jpg)

Khi bạn muốn release , chương trình của bạn chỉ được liên kết động với mfc42.dll. Liên kết đến các DLL MFC này là ngầm định thông qua các thư viện nhập. Bạn có thể cho rằng có mối liên kết ngầm với các DLL ActiveX và ODBC trong Windows, trong trường hợp đó, bạn sẽ mong đợi tất cả các DLL này được liên kết với máy khách phiên bản xây dựng của bạn khi tải, bất kể nó sử dụng các tính năng ActiveX hay ODBC. Tuy nhiên, đây không phải là điều xảy ra. Thông qua một số tư duy sáng tạo, MFC tải các DLL ActiveX và ODBC một cách rõ ràng (bằng cách gọi LoadLibrary ()) khi một trong các hàm của chúng được gọi lần đầu tiên. Do đó, ứng dụng khách của bạn chỉ tải các tệp DLL mà nó cần.

**MFC Extension DLLs: Exporting Classes**

Nếu DLL mở rộng của bạn chỉ chứa các lớp C ++ đã xuất, bạn sẽ có thời gian dễ dàng xây dựng và sử dụng nó. Các bước để xây dựng ví dụ MYMFC22A cho bạn biết cách thông báo với AppWizard rằng bạn đang tạo khung DLL mở rộng. Khung xương đó chỉ có hàm DllMain (). Bạn chỉ cần thêm các lớp C ++ của riêng mình vào dự án. Chỉ có một điều đặc biệt bạn phải làm. Bạn phải thêm macro AFX_EXT_CLASS vào khai báo lớp, như được hiển thị ở đây:

`class AFX_EXT_CLASS CStudent : public CObject`

Sửa đổi này đi vào tệp H là một phần của dự án DLL và nó cũng đi vào tệp H mà các chương trình khách sử dụng. Nói cách khác, các tệp H hoàn toàn giống nhau cho cả máy khách và DLL. Macro tạo ra các mã khác nhau tùy thuộc vào tình huống, nó xuất lớp trong DLL và nhập lớp trong trình khách.

**Trình tự tìm kiếm tài nguyên DLL của phần mở rộng MFC**

Nếu bạn tạo ứng dụng trình khách MFC được liên kết động, nhiều tài nguyên chuẩn của thư viện MFC (chuỗi thông báo lỗi, mẫu hộp thoại xem trước khi in, v.v.) được lưu trữ trong MFC DLL (mfc42.dll, mfco42.dll, v.v.) , nhưng ứng dụng của bạn cũng có tài nguyên riêng. Khi bạn gọi một hàm MFC, chẳng hạn như CString :: LoadString hoặc CBitmap :: LoadBitmap, khung sẽ bước vào và tìm kiếm tài nguyên của tệp EXE trước tiên và sau đó là tài nguyên của MFC DLL.

Nếu chương trình của bạn bao gồm một DLL mở rộng và EXE của bạn cần một tài nguyên, thì trình tự tìm kiếm trước tiên là tệp EXE, sau đó là DLL mở rộng và sau đó là MFC DLL. Ví dụ: nếu bạn có một ID tài nguyên chuỗi là duy nhất trong số tất cả các tài nguyên, thư viện MFC sẽ tìm thấy nó. Nếu bạn có các ID chuỗi trùng lặp trong tệp EXE và tệp DLL mở rộng của bạn, thì thư viện MFC sẽ tải chuỗi trong tệp EXE.

Nếu DLL tiện ích mở rộng tải một tài nguyên, trình tự trước tiên là DLL mở rộng, sau đó là DLL MFC và sau đó là EXE.

Bạn có thể thay đổi trình tự tìm kiếm nếu cần. Giả sử bạn muốn mã EXE của mình tìm kiếm tài nguyên của DLL mở rộng trước. Sử dụng mã như sau:

```
HINSTANCE hInstResourceClient = AfxGetResourceHandle();
// Use DLL's instance handle
AfxSetResourceHandle(::GetModuleHandle("my_dll_file_name.dll"));
CString strRes;
strRes.LoadString(IDS_MYSTRING);
// Restore client's instance handle
AfxSetResourceHandle(hInstResourceClient);
```
Bạn không thể sử dụng AfxGetInstanceHandle () thay vì :: GetModuleHandle (). Trong DLL mở rộng, AfxGetInstanceHandle () trả về xử lý cá thể của EXE, không phải xử lý của DLL.


*nguồn* : https://www.tenouk.com/visualcplusmfc/visualcplusmfc16.html