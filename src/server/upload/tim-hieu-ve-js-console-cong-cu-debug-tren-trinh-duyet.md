# 1. Giới thiệu
Chắc hẳn những ai từng lập trình với ngôn nghữ javascript thì cũng đã từng gặp bug và đều sử dụng function console.log() để debug chương trình, nhưng ngoài function đó ra javascript đã cung cấp cho chúng ta nhiều hàm khác để debug và sau đây mình xin chia sẻ cho các bạn những function đó.
# 2. Một số các function debug trong javascript
## 2.1 console.log( ) | info( ) | debug( ) | warn( ) | error( )
Nếu bạn muốn thêm màu cho kết quả in ra của việc debug bạn có thể làm như sau:
![](https://images.viblo.asia/0a2efd62-f4dd-46d9-818b-f88e07b9ae4f.png)
Chúng sẽ trực tiếp in chuỗi thô với màu thích hợp dựa trên loại sự kiện được cung cấp cho chúng.

**- Sử dụng placeholders**

Có các placeholders khác nhau có thể được sử dụng như được liệt kê dưới đây 
* % o - trong đó có một đối tượng, 
* % s - trong đó có một chuỗi và 
* % d - dành cho số thập phân hoặc số nguyên
 
![](https://images.viblo.asia/ef77aaa6-b2a0-4f3b-8790-8b5e83437d87.png)
**- Thêm CSS vào message console**
![](https://images.viblo.asia/a69eb5a6-1e35-4980-b253-0067bb20bceb.png)
## 2.2 console.dir( )
In một JSON đại diện của đối tượng được chỉ định.
![](https://images.viblo.asia/09f209b3-066b-417e-99fc-4ba2a5306126.png)
## 2.3 console.table( )
Nếu bạn muốn xem JSON theo cách phù hợp và dễ hiểu
![](https://images.viblo.asia/59254d2b-e598-490c-a075-cd3bdcc3a0d9.png)
## 2.4 console.group( ) & console.groupEnd( )
Bạn hoàn toàn có thể nhóm các tin nhắn với console
![](https://images.viblo.asia/7b5487a5-b06a-4848-a3a8-0513450dc37f.png)
## 2.5 console.count( )
Hàm này ghi lại số lần mà lệnh gọi cụ thể count() đã được gọi. Hàm này có tham số tùy chọn là lable, 

Nếu lable được cung cấp, hàm này sẽ ghi lại số lần count() đã được gọi với lable cụ thể đó

Nếu lable bị bỏ qua, hàm sẽ ghi lại số lần count() đã được gọi tại dòng cụ thể này
![](https://images.viblo.asia/546cad1b-6ce4-43ed-be78-d925c2cb6c52.png)
## 2.6 console.assert( )
Điều này khá tiện lợi khi bạn chỉ muốn in một số log đã chọn, tức là nó sẽ chỉ in đối số sai. Không có gì cả nếu đối số đầu tiên là đúng
![](https://images.viblo.asia/936e545b-5f96-4ffa-89b1-16cfb5c1b712.png)
## 2.7 console.time( )
Một function chuyên dụng để theo dõi thời gian thực hiện hành động, console.time() là cách tốt hơn để theo dõi microtime được thực hiện cho các lần thực thi javaScript
![](https://images.viblo.asia/b2dd8558-8b14-41c3-9c68-baa8ccf97590.png)
## 2.8 console.memory( )
Đo memory ứng dụng JavaScript của chúng ta đang sử dụng bộ nhớ trình duyệt
![](https://images.viblo.asia/520e3393-6a01-484e-9db9-b8e3dbe14261.png)
## 2.9 console.clear( )
Để xóa tất cả các thông báo trên bảng điều khiển ở trên mà bạn đã học được, đây là thời điểm để destroy chúng bằng việc sử dụng console.clear().
# 3. Kết luận
Mình vừa trình bày cho các bạn một số hàm debug của javascript, hi vọng các bạn sử dụng chúng tốt cho mục đích của mình, nếu bạn muốn xem link tài liệu gốc thì bạn click [vào đây](https://medium.com/javascript-in-plain-english/mastering-js-console-log-like-a-pro-1c634e6393f9)