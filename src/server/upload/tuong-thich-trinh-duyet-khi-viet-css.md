### Mở đầu
Chắc hẳn, trong số những người đã từng làm việc với `CSS` thì phần lớn sẽ phải đối mặt với một vấn đề rất nhức nhối và khá khó xử lý đó là tương thích trình duyệt. Đã không biết bao nhiêu lần code của tôi chạy ngon lành trên **Chrome** nhưng lại lỗi trên **IE** để rồi fix được trên **IE** thì lại lỗi trên **FireFox**. Trong bài viết này tôi xin đưa ra giải pháp để chúng ta có thể linh hoạt và tối ưu hơn khi xử lý tương thích trình duyệt với `CSS`.


![alt](https://images.viblo.asia/867556e0-240e-4da9-87f4-b04b49bc87be.jpeg)


### Nhận diện trình duyệt và áp dụng `CSS` cho chỉ trình duyệt đó
Lấy ví dụ chúng ta có một file `main.css` như sau
```CSS
.box {
    width: 100px;
}
```
Nhưng trên **IE** tôi chỉ muốn width 80px.

Nếu bây giờ chúng ta có thể nhận diện trình duyệt trong `stylesheet` và áp dụng `CSS` riêng cho những trường hợp đặc biệt thì hay biết mấy.

Đợi đã... chúng ta hoàn toàn có thể làm như vậy. Hãy tạo thêm một file `custom-IE.css` và thêm nó vào trang `index.html` của bạn.
```HTML
<link rel="stylesheet" type="text/css" href="main.css" />
<link rel="stylesheet" type="text/css" href="custom-IE.css" />
```
Trong file `custom-IE.css` chúng ta sẽ viết như sau
```CSS
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    // Toàn bộ những thuộc tính tại đây sẽ chỉ có tác dụng đối với IE10+
    .box {
        width: 80px; // Trên IE10+ widht của .box sẽ chỉ còn 80px
    }
}
```
Ta đa ! Vậy là chúng ta hoàn toàn có thể custom lại bất cứ thứ gì ta muốn mà k sợ ảnh hưởng đến các trình duyệt khác.
Đối với các version thấp hơn của **IE** hay **FireFox** chúng ta cũng đề có thể nhận diện được.


Đối với tất cả các version của **FireFox**

>@-moz-document url-prefix() {
><br>
>// Viết CSS của bạn tại đây
><br>
>}

<br>

Đối với **IE6 7**

>@media screen\9 {
><br>
>// Viết CSS của bạn tại đây
><br>
>}

<br>

Đối với **IE6 7 8**

>@media \0screen\ ,screen\9 {
><br>
>// Viết CSS của bạn tại đây
><br>
>}

<br>

Đối với **IE9**

>@media screen and (min-width:0\0) {
><br>
>// Viết CSS của bạn tại đây
><br>
>}

<br>

Các bạn có thể tham khảo tại [Browser Hacks](http://browserhacks.com/)

Cảm ơn vì đã đọc bài !!!