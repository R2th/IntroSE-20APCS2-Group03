Để tiếp tục cho series học Selenium WebDriver qua ví dụ, trong bài này mình sẽ giới thiệu cho các bạn về một trong những thành phần quan trọng nhất của một trang web, đó là Form.

Như các bạn đã biết thì Form là thành phần cơ bản của một trang web để thực hiện nhiệm vụ nhận thông tin từ người dùng web. Web form có nhiều phần tử GUI khác nhau như Text boxes, Password fields, Checkboxes, Radio buttons, dropdowns, file inputs, ...

Trong bài này , chúng ta sẽ xem cách truy cập các phần tử Web form khác nhau này bằng cách sử dụng Selenium WebDriver. Selenium đóng gói mọi form elements như một đối tượng của WebElement. Nó cung cấp API để tìm các phần tử và thực hiện hành động trên các phần tử đó như input into textboxes, clicking on buttons, v.v. Chúng ta sẽ thấy các phương thức có sẵn để truy cập từng phần tử biểu mẫu.

Để dễ dàng hơn trong cách tiếp cận và nắm rõ được các phần tử này và áp dụng vào trong các ví dụ thực tế, tôi sẽ giới thiệu cách dùng từng phần tử trước sau đó mới đến các ví dụ. Sau đây là những phần sẽ được giới thiệu trong bài này 

* Introduction to WebElement, findElement(), findElements()
* Input Box
* Entering Values in Input Boxes
* Deleting Values in Input Boxes
* Buttons and Submit Buttons
* Radio Button
* Check Box

# Introduction to WebElement, findElement(), findElements()
Selenium WebDriver gói gọn một phần tử Form đơn giản làm đối tượng của WebElement.

Có nhiều cách khác nhau mà WebDriver dùng để xác định các phần tử trong Form dựa trên các thuộc tính khác nhau của các WebElement như ID, Name, Class, XPath, Tagname, CSS Selectors, v.v.

WebDriver cung cấp hai phương pháp sau để tìm các phần tử.

* **findElement()** - tìm một phần tử web đơn và trả về dưới dạng đối tượng WebElement.
* **findElements()** - trả về một danh sách các đối tượng WebElement khớp với các tiêu chí định vị.
Trong khuôn khổ bài này chúng ta sẽ dùng phương thức findElement() để tìm một đối tượng của WebElement. Chúng ta sẽ đề cập đến phương thức findElements() của việc tìm kiếm nhiều phần tử trong các bài tiếp theo.

**Bước 1**: Chúng ta cần import package này để tạo đối tượng của phần tử Web

                    `import org.openqa.selenium.WebElement;`

**Bước 2**: Chúng ta cần gọi phương thức **findElement()** hoặc **findElements()**  có sẵn trên WebDriver và nhận đối tượng WebElement.

# Input Box
Có 2 loại input box thường dùng, đó là:

1. **Text field** - các hộp văn bản chấp nhận các giá trị đã nhập và hiển thị chúng giống như chúng.

2. **Password field** - các hộp văn bản chấp nhận các giá trị đã nhập nhưng che chúng thành một chuỗi ký tự đặc biệt (thường là dấu chấm và dấu hoa thị) để tránh các giá trị nhạy cảm được hiển thị.

![](https://images.viblo.asia/77d7daad-ede8-4487-8b59-23dfb6d4763a.png)

## Locators
Phương thức findElement() lấy một tham số là một bộ định vị cho phần tử. Các định vị khác nhau như By.id (), By.name (), By.xpath (), By.CSSSelector (), vv định vị các phần tử trong trang bằng cách sử dụng các thuộc tính của chúng như id, name hoặc path, v.v.

Bạn có thể sử dụng các plugin như Firepath để được trợ giúp về nhận id, xpath, v.v. của các phần tử (Sẽ được đề cập trong một bài riêng)

![](https://images.viblo.asia/6b73737a-19eb-4dba-a6e4-c8f95747af14.png)

1. Email field được định vị theo Id
2. Password field được định vị theo name

#  Entering Values in Input Boxes
Để nhập các giá trị mong muốn vào input boxes ta dùng phương thức ** sendKeys() **có sẵn trong WebDriver

![](https://images.viblo.asia/d24329c1-88f5-4d94-bd78-b4678aed3379.png)

1. Tìm  "Email" field bằng cách sử dụng trình định vị id.
1. Tìm  "Password" field bằng cách sử dụng trình định vị name
1. Nhập text vào "Email" field bằng phương thức sendKeys().
1. Nhập password vào "Password" field bằng phương thức sendKeys().


# Deleting Values in Input Boxes
Để xóa các giá trị của input boxes ta dùng phương thức **clear()**. Phương thức này rất đơn giản và không cần truyền vào bất cứ tham số nào. Chỉ cần làm như phía dưới là được

![](https://images.viblo.asia/3944dbf0-bd2f-450b-a0d6-24d7a240faf8.png)


# Buttons and Submit Buttons
## Buttons
Các button có thể được truy cập bằng cách sử dụng phương thức **click()**.

Trong ví dụ phía dưới

![](https://images.viblo.asia/14363a1c-2756-4afc-9b61-fa2e21022a58.png)

1. Tìm Sign in buttons bằng locator
1. Click buttons "Sign in" để đăng nhập vào web.

## Submit Buttons
Submit buttons sẽ gửi toàn bộ Form và các giá trị trong Form đến server. Chúng ta có thể sử dụng phương thức **click()** trên WebElement giống như button bình thường hoặc sử dụng phương thức **submit()** trên bất kỳ web element nào trong Form.

![](https://images.viblo.asia/1ddb0c3c-9424-4418-a37e-f46f73c42caf.png)

Khi phương thức submit() được sử dụng, WebDriver sẽ tra cứu DOM (Document Object Model) để biết element đó thuộc về form nào, và sau đó kích hoạt chức năng gửi của nó.


# Radio Button
Các nút radio cũng có thể được chọn bằng cách sử dụng phương thức **click()**.

![](https://images.viblo.asia/7dfebbaa-8227-44a3-83e5-7c5628bb6829.png)

# Check Box

Các radio buttons cũng có thể được bật bằng cách sử dụng phương thức **click()**.

Phương thức **isSelected()** được sử dụng để biết Checkbox có được bật/tắt hay không.

![](https://images.viblo.asia/5a338a87-08df-4782-a3a5-99ad1bf33e99.png)

# Ví dụ 1
Truy cập vào trang web https://wsm.framgia.vn. Click vào button "Login" trên trang chủ để vào màn hình Login

Sau đó, nhập email và password đồng thời check vào radio button "Remember login" và click button login

Dựa vào những gì đã giới thiệu phía trên và để giải quyết bài toán này, mình có đoạn code như sau :

![](https://images.viblo.asia/b1df7ae7-5803-4039-a73d-a45d2841bb99.png)

# Ví dụ 2
Truy cập vào trang http://poll.framgia.vn/login. Nhập email và password đồng thời check và checkbox "Nhớ mật khẩu"

Sau đó xóa hết những thông tin đã nhập và click button "Đăng nhập", hiển thị  error message (nếu có)

Mình có đoạn code để giải quyết bài toán trên như sau :

![](https://images.viblo.asia/87eef7ac-65b9-45f3-ba94-9a468eee2b19.png)

# Tip & Trick
Nếu bạn gặp phải lỗi NoSuchElementException() ,thì nó có nghĩa là phần tử không được tìm thấy trong trang tại thời điểm mà WebDriver truy cập trang.

1. Hãy kiểm tra lại locators của bạn bằng Firepath hoặc Inspect trong Chrome.
1. Kiểm tra xem giá trị bạn  sử dụng trong code có khác với giá trị của phần tử trong Firepath tại thời điểm hiện tại hay không.
1. Một số thuộc tính có thể là thuộc tính động cho vài phần tử. Trong trường hợp này, hãy xem xét sử dụng By.xpath() hoặc By.cssSelector(), đây là những cách đáng tin cậy hơn nhưng phức tạp hơn.
1. Đôi khi, nó có thể là vấn đề chờ đợi quá lâu, tức là trình WebDriver thực thi code của bạn trước cả khi trang được load xong hoàn toàn, v.v.
1. Thêm một câu lệnh wait() trước findElement() để giải quyết vấn đề này.

# Tạm kết
Trên đây là phần tiếp theo trong series Những Script Selenium WebDriver đầu tiên của mình. Hy vọng qua bài này có thể giúp các bạn hình dung rõ hơn về Access Form, CheckBox, RadioButton & TextBox. Mình sẽ còn trở lại với những bài về Selenium kế tiếp. Chúc các bạn thành công và nắm thật rõ về những phần được nêu trong bài