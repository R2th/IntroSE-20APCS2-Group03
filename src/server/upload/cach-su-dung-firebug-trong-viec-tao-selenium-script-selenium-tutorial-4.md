Trong [bài trước](https://viblo.asia/p/tim-hieu-cac-cau-lenh-ide-commands-cua-selenium-ide-bang-cac-vi-du-thuc-te-ORNZqGAr50n), chúng ta đã học cách tạo tập lệnh kiểm thử tự động bằng việc sử dụng Selenium IDE và điểm qua các tính năng phổ biến, các lệnh quan trọng nhất của Selenium IDE : như tính năng ghi ...

Bây giờ, khi bạn đã quen và có khả năng tạo các tập lệnh tự động bằng chế độ ghi của Selenium IDE, chúng ta hãy tiếp tục với một công cụ khác có vai trò rất quan trọng trong việc hỗ trợ tạo ra các tập lệnh thử nghiệm hiệu quả có tên là Firebug. Nó giúp chúng ta kiểm tra các thuộc tính (hight, weight, margin, text color ....) của các yếu tố web và trang web.

Firebug không chỉ áp dụng trong ngữ cảnh của Selenium IDE mà nó còn có thể được áp dụng cho mọi công cụ của bộ Selenium.

## Giới thiệu và cách cài đặt Firebug

Firebug là một tiện ích bổ sung của Firefox. Công cụ này giúp chúng ta xác định/kiểm tra các yếu tố HTML, CSS và JavaScript trên trang web. Nó giúp chúng ta xác định các element (yếu tố) duy nhất trên một trang web. Các yếu tố này có thể được tìm thấy duy nhất dựa trên các loại định vị của chúng mà chúng ta sẽ thảo luận sau trong bài.

Với hệ điều hành Windows và Linux thì có cách cài đặt riêng nên chúng ta không đi sâu vào tìm hiểu cách cài đặt, nếu bạn muốn cài cho máy của mình thì có thể lên Google search cách cài đặt phù hợp tương ứng.

Sau khi cài đặt thành công thì sẽ xuất hiện Launch icon hình con bọ (biểu tượng của Firebug) ở góc phải trên màn hình của cửa sổ trình duyệt.

![](https://images.viblo.asia/70eafaa2-3cb5-4ccc-bc78-cd6fac9bbf2c.jpg)

Để mở Firebug, có thể thực hiện 1 trong những cách sau:
* Nhấn F12
* Nhấp vào biểu tượng Firebug ở góc trên cùng bên phải của cửa sổ Firefox (icon ở hình trên)
* Nhấp vào thanh menu Firefox -> Web Developer -> Firebug -> Open Firebug.

Sau khi mở thành công, sẽ xuất hiện cửa sổ Firebug ở dưới đáy trình duyệt Firebug như hình dưới đây:

![](https://images.viblo.asia/a81bea39-02c6-428f-9982-322d34e7161d.jpg)

## Tạo Selenium Script sử dụng Firebug

Không giống như Selenium IDE, trong Firebug, chúng ta sẽ tạo ra các kịch bản kiểm thử tự động theo cách thủ công - bằng cách thêm nhiều bước kiểm tra để tạo thành một kịch bản kiểm thử hợp lý và nhất quán. Ví dụ:

**Scenario (Kịch bản)**:

* Mở “https://accounts.google.com”.
* Xác nhận Title của ứng dụng
* Nhập tên người dùng và mật khẩu không hợp lệ và gửi yêu cầu để đăng nhập.

**Step 1** – Mở trình duyệt Firefox và mở Selenium IDE từ menu bar.

**Step 2** – Nhập địa chỉ của ứng dụng đang được kiểm tra (“https://accounts.google.com”) vào ô Base URL textbox.

![](https://images.viblo.asia/1d65cac7-6a14-41ea-a95a-9fd9c163b2d6.jpg)https://images.viblo.asia/1d65cac7-6a14-41ea-a95a-9fd9c163b2d6.jpg

**Step 3** – Theo mặc định, nút Ghi ở trạng thái BẬT (ON). Nhớ điều chỉnh về trạng thái TẮT (OFF) để tắt chế độ ghi. Nếu chế độ ghi ở trạng thái BẬT, nó có thể dẫn đến ghi lại các tương tác của chúng ta với trình duyệt web (việc này là không cần thiết, tốn tài nguyên)

![](https://images.viblo.asia/407c6215-035d-401c-8637-5bc77ed1b295.jpg)

![](https://images.viblo.asia/6f74aee4-5f34-4624-8524-b6382db7445a.jpg)

**Step 4** – Mở ứng dụng đang được thử nghiệm (https://accounts.google.com) trong Firefox.

**Step 5** – Khởi chạy Firebug trong trình duyệt web.

![](https://images.viblo.asia/68ce5cde-7667-4542-a90f-8d11bcf9b33d.jpg)

**Step 6** – Chọn step kiểm tra trống đầu tiên trong trình chỉnh sửa Editor.

![](https://images.viblo.asia/cd5a394e-ca01-4ab9-9970-298fcfe631ae.jpg)

**Step 7** – Nhập lệnh "open" trong command text box của Trình soạn thảo. Lệnh "open" này sẽ mở URL được chỉ định trong trình duyệt web.

![](https://images.viblo.asia/a3e3808f-9b73-4dbf-a868-10ce3d4b160c.jpg)

Khuyến nghị : Trong khi nhập lệnh trong command text box, người dùng có thể tận dụng tính năng chọn tự động. Khi người dùng nhập một chuỗi các ký tự từ khóa nào đó, các đề xuất phù hợp sẽ được tự động điền.

Người dùng cũng có thể nhấp vào menu thả xuống có sẵn trong hộp văn bản lệnh để xem tất cả các lệnh được cung cấp bởi Selenium IDE  (selector gồm list các lệnh sẵn có khả dụng - ảnh trên).

**Step 8** – Bây giờ, hãy di chuyển đến phần Firebug section trong trình duyệt web, mở rộng (để xem toàn bộ code) phần thẻ "<head>" của mã HTML. Để xác thực tiêu đề của trang web, chúng ta sẽ yêu cầu giá trị của thẻ "<title>" nằm trong head section này.
    
![](https://images.viblo.asia/4d9e1a39-92e3-4a84-9e2c-5220ba52c2d9.jpg)
    
Copy tiêu đề trang ở trong thẻ "<title>" để sử dụng cho test case của chúng ta, trong ví dụ này thì là copy text “Sign in – Google Accounts”

**Step 9** – Chọn dòng trống thứ hai trong Trình chỉnh sửa.

**Step 10** - Gõ lệnh "assertTitle" vào bên trong hộp văn bản lệnh (command text box) có trong ngăn soạn thảo.

![](https://images.viblo.asia/76fda5a4-8804-4d80-8aa3-7a51b7c3a424.jpg)
    
**Step 11** – Dán title đã copy ở Bước số 8 vào trường Target của dòng lệnh thứ 2 này. Lệnh "assertTitle" sẽ trả về tiêu đề trang hiện tại và so sánh nó với tiêu đề được chỉ định.
    
![](https://images.viblo.asia/cc03524e-1d5b-4950-95ce-c771b768e751.jpg)
    
**Step 12** – Chọn bước kiểm tra trống thứ ba trong ngăn của Trình soạn thảo

**Step 13** – Gõ lệnh “type” vào bên trong hộp văn bản lệnh. Lệnh "type" nhập vào một giá trị trong thành phần web được chỉ định trên GUI.
    
![](https://images.viblo.asia/3a72de2f-88c5-4785-8aa5-20f4b0d5a022.jpg)
    
**Step 14** – Chuyển sang trình duyệt web, đưa con trỏ chuột vào textbox của mục "Email" trong biểu mẫu đăng nhập và nhấn chuột phải.
    
![](https://images.viblo.asia/5b04bf0b-4c82-464b-a436-6a19741ec7ad.jpg)
    
Chọn option “Inspect Element with Firebug”. Firebug sẽ tự động highlight làm nổi bật mã HTML tương ứng cho thành phần web “Email Textbox” này.
    
![](https://images.viblo.asia/4a7c4f54-71d9-47eb-bfd8-37af1e5e4b44.jpg)
    
**Step 15** – Mã HTML trong hình minh họa ở trên biểu thị các thuộc tính riêng biệt thuộc về textbox "Email". Lưu ý rằng có bốn thuộc tính (ID, type, placeholder và name) xác định duy nhất thành phần web của trang. Có thể căn cứ vào đây để chọn một hoặc nhiều thuộc tính để xác định thành phần web.

Trong trường hợp này, chúng ta chọn ID làm công cụ định vị. Sao chép giá trị ID và dán nó vào trường Target của bước kiểm tra thứ ba ("id=Email") - có tiền tố “id=” để xác định vị trí một phần tử web có ID là Email.
    
![](https://images.viblo.asia/85ce35ee-0084-493d-a553-0ba59b36e888.jpg)
    
Lưu ý rằng Selenium IDE phân biệt chữ hoa và chữ thường, do đó bạn hãy chắc chắn nhập giá trị thuộc tính một cách cẩn thận và chính xác giống như được hiển thị trong mã HTML.

**Step 16** – Nhấp vào nút Find để xác minh xem thẻ định vị có tìm thấy và định vị thành phần UI được chỉ định trên trang web hay không.

**Step 17** – Bước tiếp theo là nhập dữ liệu test “InvalidEmailID” vào ô Value textbox của lệnh thử nghiệm thứ ba trong ngăn biên tập. Bạn cũng có thể thay đổi dữ liệu test này thành bất cứ gì bạn muốn.
    
![](https://images.viblo.asia/7f49d311-acfe-4254-b1e8-dc67a4d295d8.jpg)
    
**Step 18** – Chọn bước kiểm tra trống thứ tư trong ngăn của Trình soạn thảo

**Step 19** – Gõ lệnh “type” vào bên trong hộp văn bản lệnh.

**Step 20** – Chuyển sang trình duyệt web, đưa con trỏ chuột vào textbox của mục “Password” trong biểu mẫu đăng nhập và nhấn chuột phải.
    
Chọn option “Inspect Element with Firebug”. Firebug sẽ tự động highlight làm nổi bật mã HTML tương ứng cho thành phần web “Password Textbox” này.
    
![](https://images.viblo.asia/cdc2529c-4d2e-4629-9cb5-499071a52742.jpg)
    
**Step 21** – Mã HTML trong hình dưới đây biểu thị các thuộc tính riêng biệt thuộc về textbox "Password". Có bốn thuộc tính (ID, type, placeholder và name) xác định duy nhất thành phần web của trang. Có thể căn cứ vào đây để chọn một hoặc nhiều thuộc tính để xác định thành phần web.

Trong trường hợp này, giống với ở trên chúng ta cũng chọn ID làm công cụ định vị. Sao chép giá trị ID và dán nó vào trường Target của bước kiểm tra thứ tư ("id=Passwd") - có tiền tố “id=” để xác định vị trí một phần tử web có ID là Passwd.
    
![](https://images.viblo.asia/85728549-8de8-4309-9780-608257d2fb21.jpg)
    
**Step 22** – Nhấp vào nút Find để xác minh xem thẻ định vị có tìm thấy và định vị thành phần UI được chỉ định trên trang web hay không.

**Step 23** – Bước tiếp theo là nhập dữ liệu test “InvalidPassword” vào ô Value textbox của lệnh thử nghiệm thứ tư trong ngăn biên tập. Bạn cũng có thể thay đổi dữ liệu test này thành bất cứ gì bạn muốn.

![](https://images.viblo.asia/37ff0eae-9fa0-4b02-97d0-a9f1901e50c9.jpg)
    
**Step 24** – Chọn bước kiểm tra trống thứ năm trong ngăn của Trình soạn thảo

**Step 25** – Gõ lệnh “click” vào bên trong hộp văn bản lệnh. Lệnh "click" này sẽ nhấp chuột vào một thành phần web được chỉ định trong trang.

**Step 26** – Chuyển sang trình duyệt web, đưa con trỏ chuột vào nút “Sign in” trong biểu mẫu đăng nhập và nhấn chuột phải -> Chọn option “Inspect Element with Firebug”.
    
![](https://images.viblo.asia/ddc3289d-3bc6-4253-97b7-9561d1e8e0a9.jpg)
    
**Step 27** – Mã HTML bên dưới biểu thị các thuộc tính thuộc tính riêng biệt thuộc về nút Đăng nhập.

Chọn ID làm công cụ định vị. Sao chép giá trị ID và dán nó vào trường Target của bước kiểm tra thứ năm "id=signIn".
    
![](https://images.viblo.asia/2510e81c-7025-41b6-9590-877f311834a6.jpg)
    
**Step 28** – Nhấp vào nút Find để xác minh xem thẻ định vị có tìm thấy và định vị thành phần UI được chỉ định trên trang web hay không.

Tới đây, kịch bản test đã được hoàn thành:
    
![](https://images.viblo.asia/9792caab-a33c-4c03-9394-cf1c5ae0ca6f.jpg)
    
**Step 29** – Phát lại tập lệnh kiểm thử đã tạo ở trên và Lưu tập lệnh này giống như cách chúng ta đã làm trong hướng dẫn ở bài trước.
    
## Lời kết
    
Trong bài này, chúng ta đã biết một công cụ tạo tập lệnh khác hay đúng hơn là một công cụ hỗ trợ cho việc tạo tập lệnh.
Firebug đáng ngạc nhiên vì có một tiềm năng lớn để xác định vị trí các yếu tố web trên một trang web. Do đó, người dùng có thể tận dụng các khả năng của công cụ này trong việc tạo các kịch bản kiểm thử tự động hoặc bằng tay hiệu quả.
    
Bài dịch trên có thể có chỗ còn sai sót, nếu bạn quan tâm có thể tìm hiểu bài viết gốc ở đây : https://www.softwaretestinghelp.com/firebug-for-selenium-scripts-selenium-tutorial-4/