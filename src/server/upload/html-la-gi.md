## HTML là gì?

HTML (Hypertext Markup Language) là đoạn code được dùng để tạo nên cấu trúc và nội dung của trang web.

HTML không phải là một ngôn ngữ lập trình mà nó là một ngôn ngữ đánh dấu (markup language) để định hình cấu trúc nội dung của bạn. HTML bao gồm một loạt các thẻ (elements) bọc nhau hoặc không để nhằm mục đích xây dựng kết cấu trang web. Dưới đây là một số ví dụ

Nếu muốn một dòng văn bản `Xin chào Stech`, ta có thể chỉ định một đoạn văn bằng cách đặt nó trong các thẻ paragraph (thẻ p):

```html
<p>Xin chào thaycacac</p>
```

<div class="result">
  <p>Xin chào Stech</p>
</div>

## Cấu trúc của một thành phần HTML

![](https://images.viblo.asia/0f1e3926-3f0d-41df-b4ad-1c6e11ce90b2.PNG)

HTML gồm những các thành phần dưới đây

- **Thẻ mở:** Trường hợp này là p, bao bởi cặp ngoặc mở < và đóng > bên trong là tên thẻ viết liền không dấu có thể sử dụng ký tự - để nối.
- **Thẻ đóng:** Tương tự như thẻ mở, ngoài ra nó còn có thêm dấu gạch chéo / phía trước tên thẻ. Với những người mới bắt đầu lỗi thiếu thẻ đóng khá là phổ biến
- **Nội dung:** Nơi chứa nội dung, trường hợp này chỉ là văn bản.
- **Phần tử:** Element bao gồm thẻ mở, thẻ đóng, và tất cả nội dung.

Các element có thể chứa các thuộc tính, như sau:

## Thuộc tính trong HTML

Dưới đây là một ví dụ:

```html
<p class="title">Xin chào Stech</p>
```

<div>
  <p class="title">Xin chào Stech</p>
</div>

Thuộc tính (Attibute) là thông tin bổ sung về _element_ mà bạn không muốn chúng hiển thị trong phần nội dung. Trường hợp trên ví dụ thì **class** là tên của một thuộc tính, và **title** là giá trị của nó. Thuộc tính class cho phép bạn tạo một định danh cho _element_ để có thể CSS hoặc nhiều thứ khác, đừng lo chúng ta sẽ học chúng sau này.

Một _attibute_ thường bao gồm:

- Khoảng trống giữa nó và tên _element_ và giữa nó và các _attribute_ khác
- Tên thuộc tính (phía trước dấu =)
- Cặp dấu ngoặc kép xung quanh giá trị của nó

## Các element lồng nhau

Bạn có thể sử dụng _element_ để bọc các element khác hoặc _element_ đặt bên trong _element_ khác, đây gọi là _nesting_. Ví dụ ta muốn làm đậm chữ thaycacac thành "Xin chào **Thaycacac**" chúng ta có thể sửa lại như sau:

```html
<p>Xin chào <strong>Thaycacac</strong></p>
```

<div class="result">
  <p>Xin chào <strong>Thaycacac</strong></p>
</div>

Tuy vậy bạn cần phải đảm bảo các thành phần của bạn được lồng chặt chẽ. Ví dụ ở trên thẻ `<p>` mở xong mới đến thẻ `<strong>` thì thẻ `</strong>` cũng phải đóng trước thẻ `</p>`

## Element rỗng

Một số _element_ không có nội dung, và thường được gọi là phần tử rỗng. Như _element_ `<img>` là một element rỗng.

```html
<img src="images/html.png" alt="Học HTML" />
```

<div class="result">
  <img src="/content/html/cover.png" alt="Học HTML" />
</div>

Thành phần này chứa hai thuộc tính, nhưng không có thẻ đóng `</img>`, và không chứa gì bên trong nó cả. Đấy là bởi vì thành phần _image_ không chứa bất kì nội dung nào. Nó sinh ra chỉ để nhúng hình ảnh vào trong trang HTML.