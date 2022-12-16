Mỗi trang web đều có nhiều phần tử khác nhau như textbox, button, radiobutton, selectbox, passwordbox, .... để dễ dàng tương tác với các phần tử trên chúng ta có thể sử dụng những phương thức được hỗ trợ bởi Selenium Web Driver. Bằng ngôn ngữ Java, Selenium cung cấp API để tìm các phần tử và thực hiện hành động với chúng như input vào textbox, click vào button, .... ngoài ra, còn rất nhiều phương thức từ các thư viện có sẵn mà Selenium sẽ hỗ trợ cho từng loại phần tử khác nhau.

Đầu tiên, để có thể tương tác với các phần tử web, trước hết, việc chúng ta cần làm là tìm đến phần tử đó, và truyền cho nó 1 tên biến, và bắt đầu tương tác với phần tử web thông qua biến đó. Bạn có thể tham khảo ở bài viết: <br/>
[Làm sao để sử dụng câu lệnh findElement/s trong Selenium](https://viblo.asia/p/lam-sao-de-su-dung-cau-lenh-findelements-trong-selenium-3Q75w8B7KWb)

# I. Sử dụng các câu lệnh cơ bản 
## 1. Phương thức sendKey()<br/>
### Có 2 dạng inputbox khác nhau:
- Textbox: Sẽ hiển thị nội dung của textbox màn hình sau khi truyền đi.
- Passwordbox: Sẽ hiển thị nội dung dưới dạng ký tự đặc biệt như "******" hoặc "..................." để ẩn đi thông tin cần được bảo mật như mật khẩu.<br/><br/>
### Phương thức truyền đi:
![](https://images.viblo.asia/e46dfdd1-ad05-4ef9-927a-f5f13b743bef.png)
- Bước 1: Tìm locator của email textbox
- Bước 2: Tìm locator của password textbox
- Bước 3: Truyền đi nội dung muốn input vào email textbox bằng phương thức sendKey()
- Bước 4: Truyền đi nội dung muốn input vào password textbox bằng phương thức sendKey()

## 2. Phương thức clear()<br/>
Clear() là một phương thức bạn có thể dễ dàng xóa hết nội dung của 1 trường bất kỳ.
![](https://images.viblo.asia/f2397654-63f9-407c-a1ac-06742748df96.png)
## 3. Phương thức click()<br/>
Với những button, link,.... trên màn hình, bạn có thể dễ dàng đưa click vào nó thông qua câu lênh [namebutton].click()
Ví dụ:
- Bước 1: Tìm locator của button Sign in
- Bước 2: Truyền đi sự kiện click thông qua code như sau
![](https://images.viblo.asia/6f92f98e-4890-4bf7-ac2e-d6739409849e.png)
## 4. Phương thức submit()<br/>
Khi thao tác trên 1 form, ngoài việc sử dụng lệnh click() vào button submit để gửi form, thì Selenium còn hỗ trợ 1 phương thức là submit(). Bạn có thể thực hiện tương tự như sau:
![](https://images.viblo.asia/6e710f94-069f-4f0b-b53d-b5ff81a3d586.png)
**Khi lệnh submit() được sử dụng, WebDriver sẽ tra cứu DOM để tìm ra phần tử web và kích hoạt chức năng gửi đi của nó**
# II. Vấn đề phát sinh và hướng giải quyết
Nếu khi sử dụng các câu lệnh bạn gặp phải lỗi NoSuchElementException(), điều đó đồng nghĩa với việc, câu lệnh FindElement ban đầu đang trả về giá trị null. Để xử lý vấn đề này, những cách nhanh nhất bạn có thể làm, đó là:
+ Check vị trí findElement đúng hay chưa? (dựa trên inspect)
+ Check lại giá trị bạn dùng trong code có khác với giá trị của phần tử trong Firepath hiện tại không? 
+ 1 số thuộc tính được lập trình động, nên sẽ gây rắc rối cho chúng ta khi tìm kiếm locate của chúng, bạn có thể sử dụng by.xpath() hoặc by.cssSelector() để đảm bảo tính chính xác hơn.
+ Thử lại 1 vài lần chạy, vì có thể lỗi sinh ra do 1 số hành vi chờ đợi của câu lệnh findElement()

# III. Tổng kết

|Phần tử | Câu lệnh | Chi tiết |
| -------- | -------- | -------- |
| InputBox     | sendKeys()	     | Để truyền nội dung vào textbox     |
| InputBox     | clear()	     | Để xóa tất cả nội dung trong textbox     |
| Link, Button     | click()	     | Để click vào link hay button nào đó, nó sẽ chờ trang load xong sau khi click rồi mới thực hiện đến câu lệnh tiếp theo     |
| SubmitButton/ Form     | submit()	     | Để gửi đi nội dung của form     |

- WebDriver cho phép chọn nhiều hơn 1 lựa chọn trong các trường hợp tương tác với selectbox, dropdownbox.... ( những loại này cho phép chọn nhiều lựa chọn)
- Bạn có thể sử dụng câu lệnh submit() ở bất kỳ button nào trong form. WebDriver sẽ tự động kích hoạt chức năng gửi đi cho form của button đó.

Nguồn tham khảo: https://www.guru99.com/accessing-forms-in-webdriver.html