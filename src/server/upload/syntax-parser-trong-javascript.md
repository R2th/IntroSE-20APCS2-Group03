Xin chào các bạn. Hôm nay mình sẽ giới thiệu với các bạn về Syntax Parser trong Javascript.


---

Syntax parser là một phần của công cụ Javascript. Nó đọc ký tự code của bạn theo character, cho biết code của bạn làm gì và điểm tra xem nó có đúng ngữ pháp hay không.

Bạn có thể hiểu Syntax Parser sẽ giống như là một trình thông dịch giữa code và máy tính.Nó sẽ dịch code của bạn thành code có thành đọc được bằng máy.Giúp Javascrip linh hoạt hơn và có khả năng chịu lỗi. Điều đó có nghĩa là `syntax parser` hoặc Javascrip sẽ hoạt động thông minh và luôn cố gắng trong việc đoán và hiểu code mà bạn muốn viết.Nó sẽ làm theo những gì mà code bạn mong muốn. Nhưng đôi khi thì nó cũng không hoạt động.

Javascript nổi tiếng với khả năng chịu lỗi trái ngược với các ngôn ngữ  như C # và Java. Dưới đây là một số ví dụ:

1. Hoisting: Bạn có thể sử dụng một biến trước khi khai báo.
2. Trong môi trường global: Bạn có thể sử dụng 1 biến mà không cần khai báo.
3. Bạn có thể nối chuỗi với 1 số : 1 + '2'.
4. Bạn có thể sử dụng toán tử đẳng thức để so sánh đối tượng với nguyên hàm: Số (2) == 2.
5. Bạn có thể gọi một hàm và không truyền tham số nào.

Còn rất nhiều những ví dụ khác nữa.

Tuy nhiên, đôi khi, trình phân tích cú pháp  thực hiện những điều bạn không muốn ở vị trí đầu tiên. Dó là việc - `chèn dấu chấm phẩy tự động.`

Trong đoạn mã dưới đây, từ khóa `return`, lấy toàn bộ dòng. Javascript không báo lỗi  trên đó. Thay vào đó, nó tự động chèn một`;` Sau từ khóa `return`. Khi hàm được gọi, kết quả `undefined` được trả về.


![](https://images.viblo.asia/d10aba32-f90c-48e0-ac08-d0605facd0ed.png)


Để làm đúng , bạn nên luôn luôn nhớ giữ từ khóa `return` và giá trị trả về trong cùng một dòng.


---

Tóm lại, code của chúng ta  không được máy tính thực thi trực tiếp mà thông qua công cụ Javascript. Công cụ Javascript thiết lập bối cảnh thực thi và diễn giải code của chúng ta một cách tốt nhất và thực hiện những điều mà có thể chúng ta biết hoặc không biết.

---
Dưới đây mình có giới thiệu với các bạn về Syntax Parser trong Javascript.Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.


### Tham Khảo chi tiết hơn


https://medium.com/@easyexpresssoft/javascript-syntax-parser-4b7f3f320ebe