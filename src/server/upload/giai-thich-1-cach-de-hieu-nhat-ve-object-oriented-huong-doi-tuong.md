# Lời mở đầu

Object-oriented (hướng đối tượng) là việc mô tả chính xác về thế giới hiện thực.
Object-oriented thực ra hoàn toàn không khó hiểu, nhưng có vẻ rất nhiều người còn đang phân vân về nó. Bài viết này sẽ giúp bạn hiểu về nó 1 cách đơn giản nhất.

Chú ý là bài viết này nhằm mục đích giúp các bạn hiểu thế nào là "Object-oriented", chứ không phải là thế nào là "Object-oriented programing" (Lập trình hướng đối tượng).

# Thế nào là "Object"

Các bạn đừng suy nghĩ về nó 1 cách phức tạp. "Object" đơn giản là "đồ vật". Đúng vậy, xung quanh chúng ta có rất nhiều đồ vật, trước mắt tôi bây giờ cũng tồn tại rất nhiều "object": máy tính, điện thoại, chậu cây cảnh, lọ đựng bút,...

Giả sử chúng ra giải thích về 1 object, đó là: lò vi sóng nhé.

Đặc điểm của nó có thể nhắc đến như là
- Màu trắng
- 500 W
- Mua với giá 10 triệu
- Có thể làm ấm thức ăn
- Có thể giải đông 
- Mã sản phẩm là ABC-100...

Đến đây, công việc của hướng đối tượng đã hoàn thành đến 80% rồi. 

# Thế nào là "Class"

Cái này các bạn cũng đừng suy nghĩ phức tạp nhé. Class là mô tả về object bằng code.

Ví dụ

```
class lò vi sóng {

}
```

Đến đây, chúng ra đã hoàn thành class của object có tên gọi là "lò vi sóng"

# Thế nào là Property

Mỗi object sẽ có property của nó. Property là data giải thích cho object. Trong ví dụ vừa rồi thì "màu trắng", "500W", "mã ABC-100" chính là các properties giải thích cho object lò vi sóng. 

Chúng ta hãy thử viết vào class của nó

```
class lò vi sóng {
  màu sắc = trắng;
  điện áp tiêu thụ = 500W; 
  mã sản phẩm = ABC-100
}
```

# Thế nào là Method

Mỗi object sẽ có method của nó. Method là cái để giải thích cho hoạt động của object. Trong ví dụ vừa rồi thì "có thể làm ấm thức ăn", "có thể giải đông" chính là method giải thích cho object lò vi sóng.

```
class lò vi sóng {
  màu sắc = trắng;
  điện áp tiêu thụ = 500W; 
  mã sản phẩm = ABC-100

làm ấm (thức ăn) {
  // làm ấm thức ăn ở đây
  }

giải đông (thức ăn) {
  //giải đông thức ăn ở đây
  }

}
```

# Thế nào là Message

Giữa các object có khả năng liên kết với nhau thông qua các method. Cái này còn được gọi là "messaging". Để gửi message tới 1 method của 1 object, người ta sẽ viết dưới dạng "object name.method name"

Ví dụ: con người sử dụng lò vi sóng để làm ấm thức ăn. Nếu viết ra thành code thì sẽ có dạng như này:

```
class lò vi sóng {
  mã sản phẩm = ABC-100

làm ấm (thức ăn) {
  // làm ấm thức ăn ở đây
  }
}

class con người {
  họ tên = Nguyễn Văn A;

làm ấm bằng lò vi sóng (thức ăn) {
  lò vi sóng.làm ấm (thức ăn)
  }
}

main() {
  thức ăn = thịt bò;
  con người.làm ấm bằng lò vi sóng (thức ăn)
}
```

# Kết luận

Tới đây, chắc các bạn cũng đã hiểu được object-oriented là như thế nào rồi. Lý do nhiều người cảm thấy object-oriented khó hiểu là vì họ chưa mô tả thế giới hiện thực đúng. Nếu không hiểu đúng về hướng đối tượng thì khi lập trình sẽ dẫn đến những cách mô tả sai lệch, ví dụ như trong ví dụ ở trên: lò vi sóng sẽ tự làm ấm thức ăn, con người sẽ giải đông thức ăn,..hoặc tương tự như vậy.

- Trước hết phải viết ra có những object nào
- Liệt kê các properties của từng object
- Liệt kê method của từng object
- Liệt kê message giữa các object

Đây là việc đầu tiên chúng ta phải làm khi nghĩ về hướng đối tượng. Việc code khi đã hình dung được những điều trên ở trong đầu thì thế giới sẽ chắn chắn được mô tả dễ dàng và chính xác hơn nhiều.

[Tham khảo](https://qiita.com/gorillab/items/b2f8e39d7cc23ad505f9)