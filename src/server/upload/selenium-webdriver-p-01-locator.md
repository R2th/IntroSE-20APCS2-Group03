Các cách để lấy locator của web element.
Trước khi bước vào tìm hiểu những câu lệnh trong Selenium, chúng ta sẽ tìm hiểu cách xác định Locator của element, một phần khá quan trọng.

Vậy Locator là gì?
Nếu như Manual Testing chúng ta có thể tự biết được nhập dữ liệu vào đâu, click vào button, checkbox nào, nhận biết được item trước và sau thay đổi như thế nào,.... Nhưng đối với automation thì làm sao máy có thể hiểu được sẽ thao tác vào link, button, check box.... nào đây? Đấy chính là lúc cần đến Locator, mỗi phần tử HTML trong trang web đều được xác định bằng Locator. Locator giúp phân biệt được các đối tượng UI trên phần mềm mà chúng ta cần kiểm tra.

### 1. ID
Cách lấy Locator sử dụng Id dường như là cách làm đơn giản và thuận tiện nhất. Mỗi phần tử trên trang web thường có 1 ID duy nhất. Nhưng không phải developer nào cũng sẽ đặt ID cho mỗi phần tử. Vì việc này sẽ mất thời gian và cũng không thật sự cần thiết cho hầu hết các phần tử trên trang web.

 Sau khi get được id. Chúng ta dùng câu lệnh sau để khai báo element này

*WebElement username = driver.findElement(By.id("login-username"));*
Lưu ý: Hiện có một số Framework hỗ trợ dev sinh ra Id tự động. Vậy nên mỗi lần chạy sẽ cho ra từng ID khác nhau. Lúc này sẽ không thể dùng thuộc tính ID để xác định Locator được nữa.

### 2. Name
Thuộc tính Name cũng gần giống với Id. Mỗi phần tử trên trang web thường sẽ được gắn cho 1 cái tên duy nhất. Tương tự ID thì Name này cũng không bắt buộc nên không phải lúc nào chúng ta cũng có thể sử dụng Name 

Sau khi get được name. Chúng ta dùng câu lệnh sau để khai báo element này:

*WebElement password = driver.findElement(By.name("password"));*

### 3. Linktext
Link text thì hiển thị khá rõ ràng vì nó hiển thị ngay trên UI
Sau khi get được linktext. Chúng ta dùng câu lệnh sau để khai báo cho element này:

*WebElement loginFacebook = driver.findElement(By.linkText("Login with Facebook"));*
Nhưng cách này không nên áp dụng nếu link text thường xuyên thay đổi và nội dung link text trong một trang có nhiều text giống nhau.

### 4. CSS Selector
Dựa vào đường dẫn CSS hoặc kết hợp nhiều CSS với nhau. Chúng ta có thể xác định được duy nhất hoặc nhiều phần tử element

Ví dụ sau về việc kết hợp giữa thuộc tính Type và Placehoder để xác định element 

Sau khi xác định được CSS Selector. Chúng ta dùng câu lệnh sau để khai báo element

*WebElement password = driver.findElement(By.cssSelector("[type=\'password\'][placeholder=\'Your Password\']"));*

### 5. Xpath
Cách này gần như là thông dụng và được sử dụng nhiều nhất trong cộng đồng Automation Testing. Để truy xuất đến các phần tử UI, Xpath vừa sử dụng đường dẫn vừa có thể kết hợp giữa các toán tử, thao tác được với chuỗi,..... vậy nên có rất nhiều cách để chúng ta có thể lấy được Xpath. Dưới đây là một vài cách để lấy Xpath.

**Sử dụng thuộc tính @**
Sử dụng @ để khai báo các attribute của phần tử element. Bạn xem ví dụ sau để hiểu về cách sử dụng @ như thế nào

<input placeholder="Search Viblo" value="" class="sb__input">

Ở đây là 1 thẻ input có thuộc tính placehoder = "Search Viblo". Ta có thể sử dụng @ để get được Xpath như sau

Xpath = //input[@placeholder=\'Search Viblo\']

Trong thẻ input còn có thuộc tính class="sb__input". Tương tự ta có thể sử dụng

Xpath = //input[@class=\'sb__input\']

Sau khi xác định được Xpath. Chúng ta dùng câu lệnh sau để khai báo element

WebElement searchViblo = driver.findElement(By.xpath("//input[@placeholder=\'Search Viblo\']"));

**Thao tác với chuỗi**
Sử dụng text()
<a href="/questions" class="text-white text-bold">Ask on Viblo »</a>

Ở đây là thẻ a, có text =" Ask on Viblo »" Để sử dụng text() get Xpath cho element này bạn lưu ý phải copy hết đoạn text. Xpath = //a[text()=\'Ask on Viblo »\']

Sau khi xác định được Xpath. Chúng ta dùng câu lệnh sau để khai báo element


WebElement askViblo = driver.findElement(By.xpath("//a[text()=\'Ask on Viblo »\'"));

**Sử dụng contains()** cũng gần giống với text() nhưng không cần thiết phải copy hết đoạn text, mà chỉ cần copy ngắn gọn một nội dung nào đó đủ để xác định được phần tử UI
<a href="/pages/create/?ref_type=registration_form" class="_8esh">Tạo Trang dành cho người nổi tiếng, nhãn hiệu hoặc doanh nghiệp.</a>

Thay vì phải copy hết đoạn text như cách dùng của text() thì khi sử dụng contains() bạn chỉ cần sử dụng text = "nhãn hiệu hoặc doanh nghiệp" là cũng đủ để get được xpath cho element này

Xpath = //a[contains(text(),\'nhãn hiệu hoặc doanh nghiệp\')]

Sau khi xác định được Xpath. Chúng ta dùng câu lệnh sau để khai báo element

*WebElement openLink = driver.findElement(By.xpath("//a[contains(text(),\'nhãn hiệu hoặc doanh nghiệp')]"));*

Ngoài ra chúng ta có thể sử dụng một số tool như Xpath Finder, WebDriver Element Locator để hỗ trợ việc get được locator một cách nhanh và hiệu quả nhất.