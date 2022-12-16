## Giới thiêu:
Bạn có thể đã thấy các trang web hiện nay sẽ có nhưng đoạn văn bản cắt ngắn để giữ bố cục chặt chẽ và được sắp xếp gọn gàng. Để  làm việc này ngoài việc sử dung sử dụng JavaScript hoặc một số phương pháp phức tạp hoặc các thư viện bên ngoài, ta có sử dụng CSS3 để có thể cắt văn bản đơn giản, và khá là hiêu quả. Trong hướng dẫn này, tôi sẽ hướng dẫn bạn cách dễ dàng cắt ngắn chuỗi văn bản một cách nhanh chóng .
## Cách làm:
**- Bước 1:**
chúng ta sẽ tạo một phần tử HTML để đặt văn bản muốn cắt bớt nội dung bên trong.
```
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
```
**- Bước 2:** Sử dụng CSS
```
p {
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 20px;
    -webkit-line-clamp: 3;
    height: 60px;
     display: -webkit-box;
    -webkit-box-orient: vertical;
}
```
Giải thích:

* width: 500px : giới hạn chiều rộng của thẻ bao bên ngoài đoạn văn bản.
* overflow: hidden: khi content bên trong có kích thước quá thẻ bao bên ngoài sẽ bị ẩn đi.
* text-overflow: ellipsis: sẽ thêm "..." vào cuối đoạn văn bản khi bị cắt.
* line-height: 20px: Set line-height cho đoạn văn bản
* -webkit-line-clamp:3: Số dòng text hiển thị
* height: 60px: Set chiều cao cho đoạn văn bản theo công thức: height = line-height * line-clamp
* -webkit-box-orient: vertical :thuộc tính thiết lập nội dung của nó theo chiều ngang hay chiều dọc.
*  display: -webkit-box: để thuộc tính -webkit-box-orient hoạt động bạn phải chọn display : box hoặc inline-box.

Như vậy chúng ta sẽ có đoạn văn bản khi độ dài của đoạn văn bản > độ dài của thẻ bao bên ngoài sẽ xuất hiện dấu … như demo bên dưới
{@embed: https://codepen.io/TrinhThang/pen/oRedRm}

***Chú ý:**
Hạn chế của cách này đó là không hỗ trợ trên toàn bộ các trình duyêt hiện tại như Firefox và IE

**- Cách 2:**
Tôi xin giới thiêu các bạn các thứ 2 . Cách này sử dụng :after để taọ ra background gradients ở cuối đoạn văn , khi đoạn văn bản dài quá sẽ bị che bởi lớp gradient này tạo ra hiệu ứng text mờ dần thay vì bị mất hẳn text sẽ khá xấu.

**HTML:**
```
p {
    display: block;
    width: 500px;
    overflow: hidden;
    line-height: 25px;
    height: 75px;
    position: relative
}
```
**CSS:**
```
p:after {
  content: "";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50%;
  height: 25px;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%);
}

```
{@embed: https://codepen.io/TrinhThang/pen/wbqjVG}
## Kết luận
Như vậy tôi đã giới thiệu với các bạn 2 các thực hiện để cắt chuối văn bản trên nhiều dòng bằng cách chỉ sử dụng CSS3 sao cho đơn giản và hiêu quả nhất.

Chúc các bạn thành công !