1. Giới thiệu
2. Các lỗi thường gặp và cách khắc phục
3. Kết luận
## 1. Giới thiệu
- Ngày nay CSS được coi là một trong những cách dễ dàng và dễ tiếp cận nhất để tạo các trang web hiện đại, dụa trên các tiêu chuẩn, quá trình viết mã CSS đôi khi chúng ta vẫn còn mắc phải một số lỗi phổ biến. Vì vậy, chúng ta cần sửa những lỗi này để mang lại sự nhất quán hơn trong thiết kế web, cải tiến mã gọn gàng hơn, dễ đọc hơn và hoạt động tốt hơn.
- Thông thường việc gây ra lỗi rơi vào 3 trường hợp là lỗi do kĩ năng, lỗi do sai nguyên tắc và lỗi do kiến thức.
- Ở bài viết này mình sẽ chỉ ra các lỗi thường gặp và cách khắc phục nó như thế nào.
## 2. Các lỗi thường gặp và cách khắc phục
**1. Lỗi do kĩ năng**
- Đây là lỗi không ai mong muốn, nó thường là lỗi chính tả

ví dụ: 
```
<img alt=Anh con nguoi">Xin chào</h3>
```
- Ở đây người phát triển đã gõ thiếu dấu " dẫn tới đoạn mã không hoạt động đúng mong muốn.
- Việc này có thể dễ dàng khắc phục bằng cách dưa vào vị trí lỗi và xác định đoãn mã lỗi và sửa nó

**2. Lỗi do sai nguyên tắc**
- Lỗi này thường là do người phát triển chưa nắm rõ các nguyên tắc khi viết mã

ví dụ: 
```
<h3 class="55">Noi dung cau chuyen so 5</h3>

.55 {
    color: red;
}
```
- Lỗi này liên quan tới việc đặt tên class, class bắt đầu bằng số sẽ không hoạt động.
- Ngoài ra không nên đặt tên class dạng camelCase bời vì nó sẽ khó đọc
- Các bạn có thể tham khảo cách đặt tên class tại [đây](http://bdavidxyz.com/blog/how-to-name-css-classes/)

**3. Lỗi do kiến thức**
- Lỗi này thường gặp khi chúng ta sử dụng các mã có sẵn, ví dụ như copy 1 đoạn mã từ nguồn khác và dán lại có thể gặp phải một số vấn đề về cú pháp
* Lỗi nhầm lẫn các thẻ: tr,td có thể khiến bảng của bạn trở lên lộn xộn 
* Nhầm lẫn các thẻ dẫn nguồn link, script
* Sắp xếp các file css không hợp lý dẫn tới các css đè lên nhau
* Sử dụng sai id, class để viết css
* Thừa thiếu dấu ; hay khoảng trống

***=> Trên đây là một số lỗi mặc dù rất cơ bản nhưng chúng ta vẫn hay mặc phải, hơn nữa nó cũng khá khó debug nếu xảy ra lỗi vì vậy chúng ta cần chỉnh chu hơn trong việc sử dụng mã CSS***

### Ngoài ra còn có các lỗi thường gặp sau đây:
***Lỗi sử dụng px không cần thiết***

ví dụ: 
```
.wrapper{
  margin: 10px 0px;
}
```
- chúng ta không cần sử dụng đơn vị px nếu giá trị là 0
- chỉ cần như thế này là đủ
```
.wrapper{
  margin: 10px 0;
}
```

***Lặp lại mã***

ví dụ:
```
.wrapper{
  padding: 10px 10px;
  margin: 10px 10px;
}
.other-wrapper{
  padding: 10px 10px;
  margin: 10px 10px;
}
```
- ở trường hợp này mã css đã bị lặp lại 2 lần, lưu ý chúng ta có thể viết gọn là để tránh dư thừa mã và tăng hiệu suất của trang web, như sau:
```
.wrapper .other-wrapper{
  padding: 10px 10px;
  margin: 10px 10px;
}
```

***Sử dụng tên màu:***

ví dụ: 
```
.class-name {
  background: red;
}
```
- Việc sử dụng tên màu không được khuyến khích thay vào đó chúng ta nên sử dụng mã màu thay vì
```
.class-name {
  background: #FF0000;
}
```

***Sử dụng nhiều property***

ví dụ:
```
.property {
  margin-left: 5px;
  margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
}
```
- ở ví dụ này chúng ta có thể rút ngắn cú pháp để cải thiện mã và hiệu suất như sau:
```
.property {
  margin: 5px 5px;
}
```

## 3. Kết luận
- Trên đây là những lỗi thường gặp khi code CSS, tuy là những lỗi đơn giản nhưng nếu chúng ta không cẩn thận và nắm chắc kiến thức sẽ khiến mất nhiều thời gian để sửa lỗi
- Ngoài ra hiện nay cũng có các công cụ sửa lỗi cú pháp CSS, các bạn cũng có thể tham khảo nhưng không nên lạm dụng:
1. http://csslint.net/
2.  https://beautifytools.com/css-validator.php