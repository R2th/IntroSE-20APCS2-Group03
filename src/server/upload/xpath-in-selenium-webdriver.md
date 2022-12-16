Trong Selenium nếu không thể tìm kiếm các elements bởi các định vị như id, class, name... thì hoàn toàn có thể nghĩ tới xpath để tìm các elements đó trên web, xpath cũng là phương thức được đông đảo người dùng sử dụng để tìm kiếm các thành phần trên trang web.

## 1. Xpath là gì
- Xpath được định nghĩa như một XML path. Nó là cú pháp hay ngôn ngữ để tìm kiếm bất kỳ element nào trên trang web sử dụng XML path expression. Cú pháp cơ bản của Xpath như hình dưới đây:
![](https://images.viblo.asia/d10c8dcd-e09e-47b9-9a6e-c0fc9512291e.png)

## 2. Các loại Xpath
Có 2 loại Xpath: Xpath tuyệt đối và Xpath tương đối.
### ***2.1 Xpath tuyệt đối***
- Xpath tuyệt đối bắt đầu bằng dấu gạch chéo đơn "/", cho phép xác định một đường dẫn tuyệt đối đến đối tượng UI
- Ví dụ: `html/body/div[1]/div[2]/form/div/div[3]/div[1]/div/div[2]/div[1]/div[1]/div/div/input`
![](https://images.viblo.asia/9ff7688b-2a83-4262-af3c-b561617eb54b.png)

Xpath tuyệt đối được xem là là cách tìm kiếm phần tử dễ dàng nhất, tuy nhiên nhược điểm của nó là nếu có bất kỳ thay đổi nào trên đường dẫn của element thì Xpath lấy sẽ sai.

### ***2.2 Xpath tương đối***
- Xpath tương đói bắt đầu bằng 2 dấu gạch chéo "//", cho phép xác định một đối tượng UI ở bất kỳ đâu trên trang web, không cần bắt đầu bởi thẻ html trong đường dẫn.
- Ví dụ: `//div//input`: cho phép lấy ra toàn bộ thẻ input mà trước đó là một thẻ div.

## 3. Một số cách xác định phần tử bằng Xpath
### ***3.1 Xác định bằng thuộc tính "@"***
Thuộc tính "@" cho phép lọc các đối tượng thông qua một thuộc tính của nó bên trong thẻ html.

Ví dụ: 
 `"//div//input[@id='123']"` cho phép lấy ra tất cả các thẻ input dưới thẻ div mà có thuộc tính id là 123 
 
 `"//div[@class='abcd']"` cho phép lấy ra tất cả các thẻ div mà có thuộc tính class là abcd.
 
 `"//a[@href='http://poll.framgia.vn/']" `lấy ra các thẻ a mà có chứa đường dẫn http://poll.framgia.vn/

### ***3.2 Xác định bằng thuộc tính text()***
- text() cho phép lọc các đối tượng UI được trả về dựa trên nội dung text bên trong một thẻ html.
- Ví dụ:  `"//div//p[@text()='framgia']"` cho phép lấy tất cả các thẻ p trong mã nguồn có text là framgia.

### ***3.3 Xác định bằng cách sử dụng toán tử OR và AND***
Toán tử OR và AND dùng 2 điều kiện để cho kết quả tìm quả. Với OR tìm element khi một trong hai điều kiện là đúng, còn AND tìm element với 2 điều kiện đều đúng.

Ví dụ:

`"//*[@type='submit' OR @name='btnReset']" `:  cho phép lấy ra tất cả các thẻ mà có thuộc tính type là submit hoặc có thuộc tính name là btnReset.

`"//input[@type='submit' AND @name='btnLogin']"`:  cho phép lấy ra tất cả các thẻ input mà có type là submit và name là btnLogin.

### ***3.4 Xác định thông qua preceding và following***
Preceding và Following cho phép lọc các đối tượng UI từ một đối tượng xác định trước đó

Ví dụ:

`“//div[@id=’123]/following::p” `cho phép lấy ra tất cả các thẻ p trong mã nguồn bên dưới một thẻ div có id là ‘123’.

`“//div[@name=’abc’]/preceding::input”` cho phép lấy ra tất cả các thẻ input trong mã nguồn bên trên  là một thẻ div có name là ‘abc’.


Các cách tìm kiếm và định vị các phần tử UI trong selenium với Xpath ở trên sẽ giúp việc tìm kiếm được chính xác và hiệu quả hơn, lựa chọn cách tìm kiếm phù hợp với từng tình huống. 

### *Tài liệu tham khảo:*
https://www.guru99.com/xpath-selenium.html