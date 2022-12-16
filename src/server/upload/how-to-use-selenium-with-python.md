# Chapter 01: Overview about Selenium and Python programming language

## A.Tổng quan về Selenium
### 1.Selenium là gì?

Selenium (viết tắt là SE) là một mã nguồn mở, được phát triển bởi Jason Huggins  sau đó được thiết lập bởi nhóm ThoughtWorks từ năm 2004 với tên ban đầu là JavaScriptTestRunner. Đến năm 2007, tác giả Jason Huggins rời ThoughtWorks và gia nhập Selenium team, một phần của Google và phát triển thành Selenium như hiện nay.

### 2.Cấu trúc của Selenium
Selenium bao gồm một bộ các công cụ hỗ trợ kiểm tra tính năng của ứng dụng web bao gồm 04 phần:

![alt](https://images.viblo.asia/948ff2bd-940a-483f-98f3-972a57a83e59.jpg)

*Hình 2.1: Cấu trúc của Selenium*

**a.Selenium IDE:**

Được biết đến dưới dạng một add-on của Firefox từ phiên bản 2.0 trở lên. Công cụ này cung cấp chức năng “Record and Playback” nhờ đó người dùng có thể nhanh chóng tạo một test script bằng cách record các thao tác của mình trên đối tượng cần kiểm tra. Sau đó, người dùng có thể chạy lại các câu lệnh này để kiểm tra. Chức năng nay rất hữu dụng, cho phép tiết kiệm thời gian viết kịch bản kiểm tra.

**b.Selenium-RC (Remote Control)**

Giải pháp cho các kiểm thử cần chạy trên nhiều trình duyệt. Selenium-RC sử dụng ngôn ngữ lập trình để tạo thêm các kiểm thử phức tạp hơn như đọc và viết các tập tin, truy vấn cơ sở dữ liệu.

**c.Selenium WebDriver:**

Kế thừa từ Selenium-RC. Selenium WebDrive cho phép lập trình các kiểm thử bằng ngôn ngữ lập trình sau đó truy xuất kết quả.

**d.Selenium Grid:**

Một công cụ được sử dụng để chạy thử nghiệm song song trên nhiều máy khác nhau và trên nhiều trình duyệt khác nhau mà không cần chỉnh sửa test script giúp làm giảm thiểu thời gian thực hiện. Nó cũng cho phép lưu lại kết quả kiểm tra.
Hiện nay, Selenium RC và Selenium WebDriver được tích hợp với nhau được gọi là Selenium 2. Đây là một thư viện cho phép lập trình test script trên các ngôn ngữ lập trình khác nhau như Python, Java, C# và Ruby.

### 3.Đặc điểm của Selenium

**a.Mã nguồn mở**

Đây là điểm mạnh nhất của Selenium khi so sánh với các tool khác. Vì là mã nguồn mở nên nó được sử dụng rộng rãi mà không lo lắng về phí bản quyền hay thời hạn sử dụng.

**b.Cộng đồng hỗ trợ**

Selenium là mã nguồn mở nên có một cộng đồng hỗ trợ mạnh mẽ. Ngoài ra, Selenium được Google phát triển nên hoàn toàn có thể yên tâm về sự hỗ trợ miễn phí khi có vấn đề trong quá trình sử dụng nó. 

**c.Selenium hỗ trợ nhiều ngôn ngữ lập trình**

Selenium hỗ trợ một số ngôn ngữ lập trình như: Java, C#, Python, Perl, PHP và Ruby.

**d.Selenium hỗ trợ chạy trên nhiều OS**

Selenium là một công cụ kiểm tra tự động cho các ứng dụng chạy trên nên website là chủ yếu. Ngoài ra, Selenium được sử dụng cho các ứng dụng game nhưng không nhiều. Selenium hỗ trợ hầu hết trên các trình duyệt phổ biến hiện nay như Firefox, Chrome, Internet Explorer, Safari, Opera,… cũng như trên các hệ điều hành chính như Windows, Linux, Mac mà không cần chỉnh sửa test script nhiều.

**e.Chạy test case ở backround**

Khi thực thi một test script, người dùng hoàn toàn có thể làm việc khác trên cùng một PC. Điều này giúp tiết kiệm tài nguyên máy móc khi chạy test script.

**f.Không hỗ trợ Win app**

Selenium chỉ hỗ trợ tương tác với browser mà không hỗ trợ làm việc với các Win app, kể cả Win dialog như Download/Upload – ngoại trừ Browser Alarm. Vậy nên, để xử lý các trường hợp cần tương tác với hệ thống hay một app thứ ba, chúng ta cần một hay nhiều thư viện khác như AutoIt hay Coded UI.

-----

## B.Tổng quan về ngôn ngữ lập trình Python

### 1.Python là gì?

Python là một ngôn ngữ lập trình hướng đối tượng rất thông dụng để viết các tiện ích hệ thông và các đoạn mã trên Internet. Python cũng được sử dụng như ngôn ngữ kết dính đóng vai trò tích hợp C và C++. Ngôn ngữ này được tạo ra do Guido van Rossum năm 1990. Python hoàn toàn tạo kiểu động và dùng cơ chế cấp phát bộ nhớ tự động. Python được phát triển trong một dự án mã mở, do tổ chức phi lợi nhuận Python Software Foundation quản lý.  Phiên bản mới nhất hiện này là bản 3.6.x (cập nhật 23/12/2016).


![alt](https://images.viblo.asia/6e790b64-8ef5-44a8-a5a9-84ea1678bdfc.png)

*Hình 1.1: Ngôn ngữ Python*

Hiện nay, cộng đồng người sử dụng ngôn ngữ này rất đông, nếu so sánh từ bảng xếp hạng các ngôn ngữ năm 2017 thì Python đứng thứ nhất trong top 10 ngôn ngữ phổ biến nhất.


![alt](https://images.viblo.asia/4d2a2393-9b9d-4e2a-ad58-587ad8ed65db.png)

*Hình 1.2: Bảng xếp hạng ngôn ngữ lập trình năm 2017*

### 2.Đặc điểm của Python

**a.Đơn giản**

Python là một ngôn ngữ đơn giản và tối giản. Tính tự nhiên của mã giả trong Python là một trong những điểm mạnh nhất của ngôn ngữ này.

**b.Dễ học**

Python rất dễ học vì có cú pháp cực kỳ đơn giản.

**c.Miễn phí và mã nguồn mở**

Python là một ví dụ của FLOSS (Free/ Libré and Open Source Software). Vì vậy, bạn có thể tự do phân phối  sao chép của phần mềm, cũng như mã nguồn, thay đổi hay sử dụng các thành phần phần mềm trong các chương trình mới. Bên cạnh đó, Python được cộng đồng mạng thường xuyên phát triển và nâng cấp.

**d.Ngôn ngữ bậc cao**

Khi sử dụng Python, người dùng không cần phải để ý đến các chi tiết mức thấp như quản lý bộ nhớ cho chương trình của bạn.

**e.Khả năng bỏ túi**

 Do tính tự nhiên mã mở, Python cũng xây dựng chạy trên nhiều nên tảng khác nhau. Có thể sử dụng trên GNU/ Linux, OS/390, z/OS, Palm OS, QNX, VMS, Psion, Acorn RISC OS, VxWorks, PlayStation, Sharp Zaurus, Windows CE và PocketPC.
 
**f.Diễn dịch**

Python sẽ chuyển mã nguồn thành 1 dạng trung gian gọi là bytecode, sau đó dịch dạng trung gian thành ngôn ngữ mà máy tính có thể hiểu được.

**g.Hướng đối tượng**

Python là ngôn ngữ hỗ trợ cho lập trình hướng đối tượng lẫn cả lập trình thủ tục. Nếu so sánh với C++ hoặc Java, Python rất mạnh nhưng lại cực kỳ đơn giản để thực hiện lập trình hướng đối tượng

**h.Tính mở rộng**

Python cho phép tích hợp các chương trình ở các ngôn ngữ khác nhau.

**i.Khả năng nhúng**

Có thể nhúng Python bên trong chương trình C/C++ để mang lại khả năng kịch bản cho người dùng chương trình.

**j.Thư viện mở rộng**

Thư viện tiêu chuẩn của Python rất lớn hỗ trợ biểu thức chính quy, gieo tài liệu, tiến trình/ tiểu trình, database, trình duyệt web, CGI, FTP, email, XML, XML-RPC, HTML, tập tin WAV, mã hóa, GUI,… Tất cả đều có sẵn khi cài đặt Python.

### 3.Ứng dụng của Python

* Xây dựng các tiện ích nhỏ để tự động hóa công việc (tự động tìm kiếm, phân loại tập tin theo tiêu chí riêng, tự động cập nhật các tập tin văn bản theo yêu cầu nào đó,...).
* Xây dựng ứng dụng web: Python cung cấp nhiều framework để người lập trình có thể lựa chọn để phát triển ứng dụng web tùy theo quy mô.
* Lập trình các tính toán khoa học, số liệu nhờ các công cụ và lớp thư viện được xây dựng sẵn như SciPy, Pandas, IPython,…
* Lập trình ứng dụng desktop, lập trình màn hình tương tác,…

> **Nguồn**:
> 
> 1.http://csc.edu.vn/lap-trinh-di-dong/tin-tuc/Tin-dao-tao-LTDD/Lap-trinh-Python-cho-nguoi-moi-bat-dau-768
> 
> 2.https://www.stdio.vn/articles/tong-quan-ve-python-335
> 
> 3.https://www.dammio.com/2016/10/17/python-phan-1-gioi-thieu-tong-quan-python


```
```

# Chapter 02: Guide to configuring Python and installing Eclipse for programming Python

## A.Hướng dẫn cài đặt Python

Python có thể chạy trên nhiều hệ điều hành khác nhau như MS Windowns và Unix/Linux (Ubuntu). Tuy nhiên trong bài này, mình chỉ hướng dẫn việc cài đặt Python cho hệ điều hành MS Windows.

### 1.Download Python

* Truy cập link: https://www.python.org/downloads. Nếu hiện tại bạn đang sử dụng **windows 32bit** thì sửa dụng file "**Windows x86 executable installer**" và các bước cài đặt tương tự như hướng dẫn bên dưới.

![alt](https://images.viblo.asia/bb8ae69d-6a6c-43ef-bcae-aa4c4287244b.png)

![alt](https://images.viblo.asia/bb30c893-bc8f-4938-b6fe-f09970094fbe.png)

![alt](https://images.viblo.asia/4e264347-fab1-47a1-aa4e-00802477ae02.png)

### 2.Cài đặt Python

* Chạy file đã download ở mục 1 để tiến hành cài đặt.

* Chọn checkbox “**Add Python 3.6 to PATH**” 

![alt](https://images.viblo.asia/5139247b-9f3a-4eb4-80c1-4441dfa0bb9c.png)

* Chọn “**Customize Installation**” để thay đổi ví trí Python được cài đặt và click “**Next**”

![alt](https://images.viblo.asia/12858e72-d2c0-4932-b10e-5521cae97da7.png)

![alt](https://images.viblo.asia/f9a8bf92-faf3-43c0-adff-37e4fa6f10d7.png)

* Chọn vị trí mà Python sẽ được cài đặt ra và click “**Install**” 

![alt](https://images.viblo.asia/301ae341-1999-4274-a0e1-9b379ea8701a.png)

* Click “**Close**” để kết thúc cài đặt

![alt](https://images.viblo.asia/ec39ae19-776e-40d1-84d9-b17b38cb7f1a.png)

### 3.Bắt đầu với Python

* Trên “**Start Menu**” của Windows run **IDLE (Python 3.6 64bit)**

![alt](https://images.viblo.asia/399e3572-c965-4e50-850f-061b62275f8e.png)

* Cửa sổ chương trình “**Python 3.6.5 Shell**” được mở và giúp người dùng viết mã Python
> **Python Shell là gì?**
> 
> Sau khi hoàn thành cài đặt Python, công cụ **Python Shell** được thêm vào. Đây là một **IDE (Integrated Development Environment)** giúp người dùng viết mã Python. Tuy nhiên, Python Shell chỉ giúp người dùng chạy những lệnh cơ bản và không phù hợp để phát triển một ứng dụng lớn. Do đó, người dùng nên sử dụng một IDE khác.


![alt](https://images.viblo.asia/9f60af51-9147-4187-a043-e6f369412db2.png)

* Nhập vào một đoạn code:  **print("Hello Python, I am Phuong Dang")** và nhấn **Enter**

![alt](https://images.viblo.asia/70d1fdad-853e-4267-9f45-6f5667816c4f.png)

### 4.Các IDE cho Python

Như phần trên đã đề cập, Python Shell chỉ hỗ trợ người dùng sử dụng những lệnh cơ bản và không thể phát triển những ứng dụng lớn. Vì vậy, để phát triển một ứng dụng với quy mô lớn, người dùng có thể cái đặt những IDE sau:

* PyCharm
* Eclipse (Cài đặt PyDev plugin cho Eclipse)

## B.Cài đặt Eclipse và cấu hình PyDev để lập trình Python

### 1.Hướng dẫn cài đặt Eclipse

**a.Download Eclipse**

* Link truy cập: http://www.eclipse.org/downloads/eclipse-packages
* Phiên bản hiện tại của Eclipse là 4.7.3a - OXYGEN

![alt](https://images.viblo.asia/3b3c5285-84e8-4057-a3b2-d9fbda160206.png)

![alt](https://images.viblo.asia/8cd9fbed-79d6-4267-a3a1-b0b101aab3c4.png)

* Để cài đặt được Eclipse phải đảm bảo rằng trên máy tính đã được cài Java. Trường hợp máy tính chưa được cài đặt Java, tham khảo link: https://o7planning.org/vi/10377/huong-dan-cai-dat-va-cau-hinh-java. Dưới đây là ví dụ máy đã được cài Java phiên bản 8:

![alt](https://images.viblo.asia/bffd3939-1136-4c2a-8f27-5305aaf0ac5a.png)

**b.Cài đặt và cấu hình Eclipse**

* Giải nén file Eclipse đã download ở mục a

![alt](https://images.viblo.asia/ea05a21c-1d61-47d0-b438-3eea419809a0.png)

* Run file “**eclipse.exe**”

![alt](https://images.viblo.asia/0e6c2802-8f4d-4144-871e-0e4099845c91.png)

![alt](https://images.viblo.asia/a0f6f517-2d80-4f37-89db-4dac862057dd.png)

![alt](https://images.viblo.asia/c1bf0824-4ea9-4b11-a345-029274392d84.png)

![alt](https://images.viblo.asia/120b0b09-61ac-4306-ad78-b83b2a41603f.png)

### 2.Hướng dẫn cài đặt PyDev cho Eclipse lập trình Python

**a.PyDev là gì?**

PyDev là một Plugin cho phép bạn cài đặt vào Eclipse  và có thể lập trình Python trên Eclipse.

**b.Cài đặt PyDev**

* Trên Eclipse chọn: **Help/Eclipse Marketplace…**

![alt](https://images.viblo.asia/cb7d703c-f714-4e57-8e49-85eb8e46c1f5.png)

* Nhập “**PyDev**” vào Find textbox để tìm kiếm và click “**Install**” để tiến hành cài đặt

![alt](https://images.viblo.asia/66501564-6b02-4006-8fc6-58591fa672f0.png)

* Click “**Confirm**”

![alt](https://images.viblo.asia/3317ed23-62ec-4e20-9f8b-a601160d21c1.png)

* Chọn option “**I accept the terms of license agreements**” và click “**Finish**”

![alt](https://images.viblo.asia/98cadffe-ea0a-4675-a90d-d77f1e6c5bf5.png)

* Click “**Restart**” để re-run Eclipse sau khi cài đặt PyDev

![alt](https://images.viblo.asia/0fa13730-1246-4d00-bb82-67bf6d06ec71.png)

* Kiểm tra PyDev đã được cái đặt: Trên Eclipse, chọn: **File/New/Other…**. Trên cửa sổ Wizard hiểm thì PyDev thì có nghĩa là đã được cài đặt thành công.

![alt](https://images.viblo.asia/f3742706-3d60-4305-8fd6-b0db7b088441.png)

![alt](https://images.viblo.asia/2808a589-511f-4a5e-83e3-865a6d25e835.png)

**c.Cầu hình Interpreter**

> Python Interpreter là một bộ thông dịch (interpreter) sử dụng để thông dịch mã Python (do người lập trình viết) sang mã máy tính. Do đó, người dùng cần phải khai báo nó với Eclipse.

* Trên Eclipse chọn: **Window/Preferences > PyDev/Interpreters/Python Interpreter**

![alt](https://images.viblo.asia/0c008699-0a57-4745-a05b-e9ef4afbc43a.png)

* Chọn "**New**"

![alt](https://images.viblo.asia/0c008699-0a57-4745-a05b-e9ef4afbc43a.png)

* Nhập vào vị trí file “**python.exe**” trong thư mục Python đã cài đặt  và click “**OK**”

![alt](https://images.viblo.asia/65fa6b48-d47a-4788-a75c-d7b073362f5f.png)

* Chọn toàn bộ option và click “**OK**”

![alt](https://images.viblo.asia/454af196-44a7-4daf-a91f-c49c70aa13a5.png)

* Chọn “**Libraries**” tab để kiểm tra xem các thư viện đã được import và click “**Apply and Close**”

![alt](https://images.viblo.asia/42fa6c78-4fbe-46ec-aa81-aa223d2a1899.png)

Trên đây là những bước hướng dẫn cấu hình và cài đặt Eclipse để có thể lập trình Python. Phần tiếp theo mình sẽ hướng dẫn một số lệnh Python cơ bản và config Selenium.

> **Nguồn**:
> 
> 1.https://o7planning.org/vi/11375/huong-dan-cai-dat-va-cau-hinh-python
> 
> 2.https://o7planning.org/vi/10379/huong-dan-cai-dat-va-cau-hinh-eclipse 
> 
> 3.https://o7planning.org/vi/11379/huong-dan-cai-dat-pydev-cho-eclipse-lap-trinh-python