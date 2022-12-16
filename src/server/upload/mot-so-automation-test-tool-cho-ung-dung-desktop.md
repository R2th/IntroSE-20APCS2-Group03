![](https://images.viblo.asia/2c9d88d8-5313-49c7-a9f0-0378a884b3d8.png)
### **AutoIT**
![](https://images.viblo.asia/43ef0905-8369-4108-af66-6cbb189c88a0.png)
AutoIT là 1 ứng dụng chạy độc lập (không đòi hỏi cấu hình gì đặc biệt) và rất nhỏ gọn, nó giả lập di chuyển chuột và click trên keyboard. Chương trình start chạy app cần test sử dụng phương thức Reflection.

AutoIT đi kèm với IDE (Integrated Development Environment), và nó tương thích với việc recordings và code thêm bằng ngôn scripting riêng của ứng dụng (rất giống syntax BASIC).

**Ưu điểm:**

Cho phép xuất file thực thi hỗ trợ việc cho chạy độc lập ngoài dự án (có thể dùng tích hợp công cụ 3rd party hoặc and CI).
Hỗ trợ Regular Expression.
Có thể develop addons cho nhu cầu đặc biệt (gọi là – AutoItX’).

**Nhược điểm:**

Dựa trên 1 ngôn ngữ coding riêng biệt (cần thêm thời gian học).

***Kết:*** *AutoIT là một trong những công cụ phổ biến nhất trên lĩnh vực này.*

### Winium
![](https://images.viblo.asia/866d5ce2-3bf9-432f-8819-cc63291d5ab1.png)

Winium là một open source framework mới, dựa trên *Selenium*, nó bao gồm 3 phần:

1. Automation test trên Windows applications.
2. Automation test trên Windows Phone (home button, notifications bar, toggles etc.) 
3. Hỗ trợ Windows Phone applications. (Tương lại sẽ không phát triển tiếp)

**Ưu điểm:**

Nếu bạn đang dùng Selenium WebDriver và quen với các API của nó, thì việc dùng Winium rất đơn giản.

**Nhược điểm:**

Là một dự án mới, nên khá nhiều hạn chế trên các API của chúng. API vẫn chưa hoàn chỉnh và ổn định so với các tool khác cùng loại.

***Kết:*** *Nếu bạn đang consider dùng Winium, lời khuyên là cần cần plan nhiều time hơn để thực hiện dự án.*

### TestStack.White
![](https://images.viblo.asia/6a19c803-0a89-43c8-b8cf-8b1cd3553abf.png)

Là một thư viện automation cho desktop apps. Thư viện này bắt đầu từ 1 dự án open source and sau đó trở thành 1 phần của TestStack, nó bao gồm nhiều dự án open source khác cho manual test và automated test.

White hỗ trợ nhiều automation trên nhiều công nghệ khác nhau: Silverlight, WPF, WinForms, Win32 and SWT in Java. Có thể viết test trên White bằng bất kỳ ngôn ngữ .NET nào .

**Ưu điểm:**

Cho phép Automation trên nhiều công.
Hỗ trợ ngôn ngữ lập trình .NET .

**Nhược điểm:**

Yêu cầu phải cài thự viện UI Automation Verify.

***Kết:*** *Bộ API khá ấn tượng với khả năng mở rộng cao và dùng đơn giản.*

### LDTP (Linux Desktop Testing Project)
![](https://images.viblo.asia/164145ea-f835-4446-a409-a622a9b795e5.png)
Tuy dự án khởi đầu trên nền tảng Linux, đến hiện tại hỗ trợ cả MAC (bản PyATOM ) và Windows OS (bản Cobra). LDTP đi kèm một Editor của riêng nó, nhằm cung cấp tính năng recordings.

**Ưu điểm:**

Thư viện rất phong phú và tương thích với một loạt các môi trường/ngôn ngữ so với các công cụ khác trong danh sách này. LDTP cho phép giám sát hiệu suất (Bộ nhớ và CPU) khi thực hiện test trên một ứng dụng.

**Nhược điểm:**

Không nhiều tài liệu làm cho việc học tập API trở nên khó khăn hơn.

***Kết:*** *Một công cụ có khả năng tương thích đáng kinh ngạc, nhưng có nhược điểm là khó học*

### Sikuli
![](https://images.viblo.asia/57087e6b-b154-446e-b3a0-0ca515f9272d.png)

Sikuli đặc biệt là nhận diện đối tượng bằng hình ảnh, trong khi các công cụ khác trong danh sách nhận dạng các đối tượng bằng các thuộc tính đối tượng. Rõ ràng, có những lợi thế và bất lợi cho cả hai phương pháp. Việc nhận diện hình ảnh được thực hiện bởi một công cụ nền có thể so sánh một pixel với một pixel ở cấp BitMap.

Khi làm việc với Sikuli, ban đầu chúng ta sẽ tạo ra một Kho lưu trữ hình ảnh (ảnh chụp màn hình từ ứng dụng) sẽ trở thành inspiration (Kết quả mong đợi) để xác định điểm và ảnh chiếu sẽ được kích hoạt trong khi chạy chương trình (Kết Quả Thực).
Công cụ này đi kèm với một IDE của riêng nó, bao gồm một ngôn ngữ scripting riêng nó và một API mà có thể kết nối trong Java và C #. Ngoài ra, Sikuli một cách trực quan test chức năng.

**Ưu điểm:**

Với kỹ thuật so sánh hình ảnh không dựa vào các thuộc tính của đối tượng, Sikuli có thể tương tác tất cả mọi thứ chúng ta tạo ra – khi thực hiện test, bạn có thể kiểm tra table database, cửa sổ Windows, cũng là một ứng dụng di động và một phản hồi từ máy chủ mà không cần cấu hình gì đặc biệt.

**Nhược điểm:**

Phải thường xuyên duy trì các kho hình ảnh hiện tại cho mỗi thay đổi sản phẩm.

***Kết:*** *Khuyến cáo là chỉ nên dùng tool này trong vài trường hợp cụ thể.*

### Pywinauto
![](https://images.viblo.asia/42ff9ab3-15e0-487d-a2a7-a8ce3a0af9e1.png)
PyWinAuto là một thư viện Python cung cấp bộ các chức năng trên trên Windows (hộp thoại controls và windows). Thư viện trình chứa một loạt các hoạt động có thể tương tác rõ ràng và thân thiện với người sử dụng

**Ưu điểm:**

Pywinauto là thư viện, có nghĩa là nó không yêu cầu cài đặt bất kỳ công cụ bên ngoài.
Quen thuộc với Python, đơn giản hóa việc thực hiện thư viện này.

**Nhược điểm:**

Những người không sử dụng Python, sẽ cần phải mở một dự án Python

***Kết**:* *Thư viện với nhiều tính năng được đánh giá cao đặc biệt cho các chuyên gia giàu kinh nghiệm của Python.*

### Robot Class / Win.form Class
Các công cụ này khác biệt rõ rệt so với phần còn lại, theo cách mà chúng không phải là trực tiếp được định vị làm công cụ kiểm tra tự động cho các ứng dụng trên máy tính để bàn, nhưng hoạt động như các lớp để mô phỏng các hoạt động của bàn phím và chuột. Trong khi đó, lớp Robot có thể được sử dụng với Java và Win.form là dành cho .Net


**Ưu điểm:**

class đơn

**Nhược điểm:** 

class đơn

**Bottom line:** Chỉ dùng class này cho 1 scenarios độc lập ( vd: choosing an image from the File System).

### Tham khảo:
[http://autoitvn.com/threads/co-ban-ve-autoit-gioi-thieu-cai-dat-va-huong-dan-su-dung-autoit.20/](http://autoitvn.com/threads/co-ban-ve-autoit-gioi-thieu-cai-dat-va-huong-dan-su-dung-autoit.20/)
[https://text.123doc.org/document/3479968-phan-mem-kiem-thu-cac-ung-dung-desktop-chay-tren-net.htm](https://text.123doc.org/document/3479968-phan-mem-kiem-thu-cac-ung-dung-desktop-chay-tren-net.htm)