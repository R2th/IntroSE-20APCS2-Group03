Vấn đề quan trọng trong kiểm thử tự động bằng Selenium project là xác định được locator của các phần tử trên trang web. Bằng mắt thường có thể nhận biết thành phần là button, check box, radio button, dropdown,… Tuy nhiên để làm sao để lấy được locator thì phải dựa vào cấu trúc và thành phần của trang web đó.
Phần tử trên trang sẽ có một locator tương ứng. Và locator của các phần tử cung cấp cho chúng ta cách để có thể truy cập tới các phần tử HTML trong trang web. Với Selenium ta có thể sử dụng các locator này để gửi yêu cầu thực thi các tương tác tới các text box, các đường dẫn (link) được tích hợp trên trang, checkbox, button hay các phần tử web khác.

Trong thực tế, đôi khi để xác định được vị trí của các phần tử trên giao diện web thì không phải lúc nào cũng dễ dàng, có khi lại lấy ra không đúng thông tin phần tử cần lấy, hoặc có khi là không thể lấy được.
Thứ tự ưu tiên sử dụng để lấy locator:
-	Id
-	Name
-	LinkText
-	Partial Link Text
-	Tag Name
-	CSS Class Name
-	CSS selector
-	Xpath

*Mình lấy locator một vài thành phần trong web nhé!*

### 1.	Id
Mỗi phần tử trên trang thông thường sẽ được gắn 1 id duy nhất. Và đây là cách được đánh giá là tốt nhất khi sử dụng để lấy ra locator của phần tử. 
Ví dụ:
 ![](https://images.viblo.asia/992fc8ec-a7fc-4bae-ad81-2efc588ad17f.png)
![](https://images.viblo.asia/a7ea64f3-6674-4010-a30c-6ceb04a38049.png)

### 2.	Name
Gần giống như thuộc tính id, mỗi trường dữ liệu sẽ được gắn một tên duy nhất và thường thì tên này không bị thay đổi sau các lần nâng cấp hay sửa đổi. Đây là một trong những lựa chọn tốt nhất khi lấy locator cho các phần tử trong form login hoặc form mà có nhiều trường input tương tự nhau như khai báo hàng hóa hay là form register nào đó.
 ![](https://images.viblo.asia/ec233b3d-d89e-4f1b-aba3-3ce56722df80.png)
![](https://images.viblo.asia/e1077550-c6ba-4a89-843d-4b2d9bcfe2aa.png)
 

### 3.	Link text
Sử dụng link text là cách tuyệt vời để tìm ra các liên kết trong trang web, nó thường được hiển thị dưới dạng hyperlink
 ![](https://images.viblo.asia/6c709be6-5711-4621-9dbe-13f41e77fb44.png)
![](https://images.viblo.asia/39da5549-7cb3-4951-9305-2592ece4ad43.png)

### 4.	CSS selector – Truy cập vào các phần tử web
CSS selector không khác so với XPath, nhưng cách này được đánh giá là linh hoạt và mạnh mẽ hơn nhiều so với sử dụng Xpath. Khác với XPath, CSS selector không phụ thuộc vào cấu trúc DOM. Giúp bạn có thể thực hiện được một số tương tác mà khi sử dụng XPath thì bạn khó có thể làm được.
Bạn sẽ dễ dàng để tìm ra được locator duy nhất của phần tử bằng cách kết hợp với nhiều thuộc tính CSS khác. Tuy nhiên nó cũng đòi hỏi người dùng phải có hiểu biết sâu hơn về CSS/Javascript.
![](https://images.viblo.asia/318275e6-67a2-474f-97d6-3d8e4f03b205.png)
![](https://images.viblo.asia/c574e01a-a0fa-421e-a2df-e4b313fc864b.png)