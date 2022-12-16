Trong những bài trước , chúng ta đã tìm hiểu về cơ chế định vị của các loại định vị khác nhau sử dụng ID, Classes, Xpaths, Link texts, CSS Selectors .... nhưng đều là trên nền tảng trình duyệt Firefox.
Trong bài này thì chúng ta sẽ tìm hiểu một phần mở rộng hơn của các chiến lược định vị - cơ chế định vị các yếu tố web trên Google Chrome và Internet Explorer.

Thực tế có khá nhiều loại trình duyệt phổ biến được user sử dụng (IE, Firefox, Chrome, Coccoc ....), đòi hỏi các bên liên quan nói chung và  lập trình viên nói riêng khi phát triển ứng dụng cần phải đảm bảo được rằng chương trình của mình có thể hoạt động được trên hầu hết các trình duyệt web, đặc biệt là các trình duyệt thông dụng.
Hãy tưởng tượng tình huống khi ứng dụng web của bạn hoạt động tốt trên Chrome và IE nhưng lại không hỗ trợ Firefox (thực tế lúc làm dự án tôi cũng đã gặp 1 số tình huống như thế này, nhỏ thì là lỗi 1 vài ô input, lớn thì là lỗi cả 1 trang ...). Nếu gặp tình huống này thì chúng ta sẽ tự động hóa một ứng dụng như vậy bằng Selenium như thế nào? Hoặc cụ thể là bạn sẽ định vị các yếu tố web trong Chrome và Internet Explorer như thế nào? Câu hỏi sẽ được giải đáp trong bài viết dưới đây.

### Định vị các phần tử web trong Google Chrome

Giống như Firebug trong Firefox, Google Chrome cũng có tool phát triển ([developer tool](https://developers.google.com/web/tools/chrome-devtools?utm_source=dcc&utm_medium=redirect&utm_campaign=2018Q2)) của riêng nó, có thể được sử dụng để xác định và định vị các thành phần web trên trang web. Khác với Firebug, người dùng không cần phải tải xuống hoặc cài đặt bất kỳ plugin riêng biệt nào; developer tool đi kèm với Google Chrome.

**Thực hiện theo các bước dưới đây để định vị các thành phần web bằng Developer tool của Chrome:**

**Bước #1:** Nhấn F12 để khởi chạy Developer tool của trình duyệt Chrome. Sau khi khởi chạy thành công sẽ mở ra cửa sổ dưới đây:

![](https://images.viblo.asia/fa88161d-b368-4f33-b89d-8946628a2cf8.jpg)

Mặc định khi mở ra sẽ focus vào tab "Element" (ảnh trên), là tab hiển thị tất cả các thuộc tính HTML thuộc về trang web hiện tại. Hãy điều hướng đến tab Element nếu nó không được mở theo mặc định khi khởi chạy.

Ngoài phím F12, bạn cũng có thể khởi chạy developer tool bằng cách nhấp chuột phải vào bất kỳ vị trí nào trong trang web và chọn mục “Inspect” (giống với inspection của Firebug)

**Bước #2:** Xác định vị trí của đối tượng mong muốn trong trang web:
Tương tự như trên, nhấp chuột phải vào đối tượng và chọn mục “Inspect” => Thuộc tính HTML thuộc về thành phần web này sẽ được highlight lên trong Developer tool.
Một cách nữa ngược lại là di chuột qua các thuộc tính HTML => phần tử web tương ứng sẽ được highlight
Từ đó người dùng có thể định vị các ID, class, link ...

![](https://images.viblo.asia/37236cc8-fcb4-44da-a6e7-e083b2f62ed5.jpg)

**Tạo 1 Xpath trong Developer Tool**

**Bước #1:** Mở tab Console (ảnh dưới đây)

**Bước #2:** Nhập đoạn mã tạo Xpath vào:
```
$x(“//input[@id='Email']”) //tìm ô input có id='Email'
```

![](https://images.viblo.asia/7eaa2ebc-e332-47c2-a5ad-3c11dbda96cd.jpg)

**Bước #3:** Nhấn enter 
=> Tất cả các thành phần HTML phù hợp với Xpath chỉ định sẽ được liệt kê hết ra ngay dưới dòng lệnh của Xpath (ảnh dưới đây). Nhìn vào ảnh chúng ta cũng dễ nhận ra rằng trong trường hợp này chỉ có một yếu tố HTML phù hợp. Di chuột vào phần tử HTML đó thì phần tử web tương ứng sẽ được highlight trên trang web.

![](https://images.viblo.asia/608cbd36-dcda-4d00-9760-cff6f3683506.jpg)

Theo cách này, tất cả các Xpath có thể được tạo và kiểm tra tính hợp lệ của chúng trong mục "Console".

Tất tật thông tin liên quan đến CSS tương ứng với thành phần web có thể tìm thấy ở mục "Style" bên cạnh:

![](https://images.viblo.asia/6f1747b1-08f2-434e-946c-e655f42f0081.png)

### Định vị các phần tử web trong Internet Explorer (IE)

Cũng giống như Google Chrome, Internet Explorer cũng có công cụ dành cho nhà phát triển riêng của nó, có thể được sử dụng để xác định và định vị các thành phần web trên trang web. Người dùng không cần phải tải xuống hoặc cài đặt bất kỳ plugin riêng biệt nào; developer tool đi kèm với Internet Explorer.

**Thực hiện theo các bước dưới đây để định vị các thành phần web bằng Developer tool của Internet Explorer:**

**Bước #1:** Nhấn F12 để khởi chạy Developer tool của trình duyệt IE. Sau khi khởi chạy thành công sẽ mở ra cửa sổ dưới đây:

![](https://images.viblo.asia/b2e0a29e-a9ec-45d8-bc96-69a2e22ccca5.jpg)

Mặc định khi mở ra sẽ focus vào tab "HTML" (ảnh trên), là tab hiển thị tất cả các thuộc tính HTML thuộc về trang web hiện tại. Mở rộng tab HTML để xem các thuộc tính của tất cả các thành phần web thuộc về trang web hiện tại (bấm vào icon (+))

**Bước #2:** Xác định vị trí của đối tượng mong muốn trong trang web:
Chọn 1 phần tử HTML và phần tử web tương ứng sẽ được highlight. Từ đó người dùng có thể định vị các ID, class, link ... (IE không có chức năng Inspect giống Google Chrome)
Ví dụ như hình dưới đây, textbox Email sẽ được highlight ngay khi chúng ta chọn thuộc tính HTML tương ứng.

![](https://images.viblo.asia/8212eaa7-ae55-45bb-8787-e86c81d0e93e.jpg)

Một cách khác để xác định vị trí của phần tử web là nhấp vào nút "Find" ở phía trên hàng menu trên cùng, sau đó nhấp vào phần tử web mong muốn trong trang web. Khi đó, các thuộc tính HTML tương ứng sẽ được highlight lên (giống chức năng inspect của Google Chrome):

![](https://images.viblo.asia/df1d0137-434b-4e15-a099-7e235f027f58.jpg)

Bằng cách sử dụng Developer tool, người dùng có thể tìm các id, class, tên thẻ, và có thể tạo các Xpath để xác định vị trí các thành phần web.

Cũng giống như Google Chrome, tất tật thông tin liên quan đến CSS tương ứng với thành phần web của IE có thể tìm thấy ở mục "Style":

![](https://images.viblo.asia/0d5a3a74-47b5-4e3a-905d-b16bc5d60443.jpg)

Đến đây thì bài viết đã hết. Nếu bạn quan tâm có thể tìm hiểu bài viết gốc tại đây :
https://www.softwaretestinghelp.com/locate-elements-in-chrome-ie-selenium-tutorial-7/