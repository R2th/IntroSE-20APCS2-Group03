Nhà font-size vốn dĩ có rất nhiều anh em nhưng mọi người hay chỉ làm bạn với mỗi người anh `px` này mà quên đi trong nhà có nhiều người anh em ngon hơn, tốt hơn và 'sử dụng' phù hợp hơn đó. Vậy những thành viên còn lại gồm có những ai?

![](https://images.viblo.asia/00cb5501-a8b2-40db-a4c0-95b1aaae277e.jpg)

Muốn biết và để có thể 'sử dụng'  một cách hiệu quả thì cùng mình làm quen và tìm hiểu nhé. :grinning: Bắt đầu thôi nào!!!

### 1. px

Đầu tiên thì cũng giới thiệu lại bạn này dù đã quá quen thuộc.

Pixels (px) được coi là đơn vị tuyệt đối, mặc dù chúng có liên quan đến DPI và độ phân giải của thiết bị xem. Nhưng trên chính thiết bị, bộ PX được cố định và không thay đổi dựa trên bất kỳ yếu tố nào khác. Độ chính xác của nó vừa là ưu điểm cũng vừa là nhược điểm. 

Độ phân giải pixel cũng quyết định chất lượng hiển thị, nhiều pixel trên mỗi inch của màn hình điều khiển mang lại kết quả hình ảnh tốt hơn. Độ phân giải càng lớn thì số lượng px càng nhiều do đó px sẽ càng nhỏ thì màn hình sẽ càng sắc nét.

![](https://images.viblo.asia/bb5cb115-3dfb-4079-a366-5262f3dd680f.png)

Ví dụ :
```html
<div class="element1">
    Hello,
    <div class="element2">
      Frontend!
    </div>
</div>
```
```css
.element1 {
  font-size: 20px;
}

.element2 {
  font-size: 20px;
}
```

### 2. em
`Em` là một giá trị tương đối nên sẽ được sử dụng linh hoạt hơn `px`. Nó không có một giá trị thực tế nào mà nó còn tùy vào giá trị mặt định của các cấp cha .

- 1em bằng với giá trị của nó nhận được.

- 1em = 100% giá trị nhận được ,2em = 200% giá trị nhận được.

Nói ở đây khá trừu tượng mình lấy một ví dụ cho dễ hiễu như sau:
Một lớp cha có font-size là 16px và bạn muốn lớp con nó có font-size là 12px là giá trị `em` của nó là 0.75em. Có nghĩa là 1em = 16px và 0.5em = 8px.

Hoặc lấy ví dụ ở phần px, ta có css:
```css
.element1 {
  font-size: 2em;
}

.element2 {
  font-size: 2em;
}
```
Sẽ cho kết quả tương ứng là element1 có font-size: 20px và element2 phụ thuộc vào element1 nên có font-size: 40px.

`Em` hiện tại được dùng khá nhiều do tính linh động của nó phù hợp với việc phóng to thu nhỏ giúp tương thích trên nhiều loại màn hình khác nhau. (ờ mây zing )

### 3. rem
`REM` dựa trên yếu tố gốc (HTML). Mỗi phần tử con sử dụng `REM` sau đó sẽ sử dụng kích thước gốc HTML làm điểm tính toán của nó, bất kể phần tử cha có bất kỳ kích thước khác nhau được chỉ định hay không. Đây cũng là tạo sự khác nhau giữa `rem` và `em` đó là dựa trên sự kế thừa kế.

Ví dụ:
```css
html {
   font-size: 20px;
}
```
```css
.element1 {
  font-size: 2rem;
}

.element2 {
  font-size: 2rem;
}
```
Với style trên thì element1 và element2 sẽ có font-size là 40px.

`Rem` cũng có thể được sử dụng cho width height và nhiều thuộc tính khác. Điểm mấu chốt là anh chàng này rất trung thành với cấp html(root) nên rất dễ cho bạn tùy chỉnh.
Không tốn nhiều css cho các device khác nhau.

### 4. %

Tỷ lệ phần trăm thì không khác gì  `Em` cho lắm. Nó hoạt động cho các thuộc tính chiều rộng, chiều cao hoặc kích thước phông chữ. Và cũng là một đơn vị tương đối như `em` sự khác biệt duy nhất của nó là 1em = 100% và 1% = 0.01em.

Ví dụ:
```css
.element1 {
  font-size: 20px;
}

.element2 {
  font-size: 200%;
}
```
Bạn đoán font-size của element2 là bao nhiêu? Kết quả trên là 40px nhé!
### Tổng kết
Cảm ơn bạn đã dành thời gian đọc bài viết, hẹn gặp các bạn vào phần 2 nhé!

Tham khảo: https://habr.com/en/post/491516/