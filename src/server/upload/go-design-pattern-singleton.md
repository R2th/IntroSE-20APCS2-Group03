# Giới thiệu
Việc áp dụng design pattern cho dự án là một việc hết sức cần thiết, đúc kết từ kinh nghiệm trải qua hàng ngàn dự án, việc áp dụng này giúp cho dự án dễ bảo trì, dễ đọc, đẽ mở rộng, sạch sẽ và rất nhiều lý do khác. Singleton thường được nhắc đến đầu tiên mỗi khi đề cập tới vấn đề design pattern, hầu như dự án nào cũng dính đến Singleton chẳng hạn như những trường hợp sau:
- Khi bạn muốn sử dụng chung một kết nối tới Database mỗi khi gọi query 
- Khi bạn muốn hạn chế truy cập tới một biến hay một không gian nào đó, thì Singleton như là một cánh cửa giúp bạn tương tác với biến hay không gian đó.
Khi ứng dụng design pattern thì chúng ta phải tuân thủ quy định sau:
- Chúng ta cần một biến đơn, chia sẻ dữ liệu của một kiểu nào đó
- Hạn chế việc khởi tạo cho một đơn vị nhiều lần trong suốt quá trình
# Ví dụ
Bây giờ chúng ta cần một counter để đếm số lần giá trị tương tác tới một biết xuyên suốt chương trình và đảm bảo các tiêu chí sau:
- Khi chưa có một counter nào được tạo ra thì giá trị mặc định sẽ được tạo với giá trị ban đầu là 0
- Khi counter đã được khởi tạo thì trả về instance lưu trữ giá trị thực của counter
- Nếu hàm AddOne được gọi thì giá trị của counter sẽ tăng lên 1
# Code
Bây giờ chúng ta sẽ thực hiện triển khai Singleton pattern và cần lưu ý như sau trong Go chúng ta không có static variable như trong các ngôn ngữ OOP khác như Java, và chúng ta dựa vào lợi thế của package scope để thực hiện thay thế 

```
package singleton
 
type singleton struct {
counter int
}

var instance *singleton

func GetInstance() *singleton {
 if instance == nil {
 instance = new(singleton)
 }
 return instance
}

func (s *singleton) AddOne() int {
 s.counter++
 return s.counter
}
```

Ở đây có một điểm cần lưu ý là 
```
var instance *singleton
```
Tại sao chúng ta không dùng 
```
var instance singleton
```
Trong Go chúng ta không thể khởi tạo một strust cho nil mà chúng ta chỉ có thể tạo một pointer của struct cho nil khi đó chúng ta mới có thể sử dụng việc so sánh giá trị khi khởi tạo một singleton
```
if instance == nil
```