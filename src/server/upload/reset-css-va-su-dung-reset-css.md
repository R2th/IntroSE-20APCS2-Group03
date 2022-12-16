CSS reset là một file thường được thấy trong các thư mục của rất nhiều project web frontend.
và ai đã và đang thiết kế giao diện website với HTML và CSS đều hiểu sự quan trọng của reset css 
bạn có biết nó được dùng vào mục đích gì không? Tại sao chúng ta phải cần sử dụng reset css trong thiết kế web, 
và cách tạo ra chúng và sử dụng dụng file reset.css như thế nào? 
Đó là những vấn đề mà trong bài viết hôm nay mình muốn chia sẻ với các bạn.

### **CSS Reset là gì?**

CSS Reset là một loại các rules của CSS giúp thiết lập các style của tất cả đối tượng HTML (element) theo một chuẩn nhất định.
Nói đơn giản thì nó là môn võ và bạn sẽ cần tới trong tất cả các dự án có liên quan tới frontend web và application.

Bạn là một lập trình viên và phải xử lý việc giao diện hiển thị giống hệt nhau (hoặc khác nhau rất ít) trên các trình duyệt web, 
thì rõ ràng việc viết 1 đoạn code mà hoạt động trên tất cả trình duyệt tốt hơn là dùng các file style khác nhau cho mỗi trình duyệt chuẩn chưa?

Sử dụng CSS Reset, bạn luôn nắm thế chủ động - bạn như ông chủ, yêu cầu những trình duyệt sử dụng chung các thuộc tính CSS do bạn quy định, 
sau đó bạn có thể chỉnh sửa theo ý thích của mình. Quá trình làm việc cross-browser lúc này dễ dàng hơn hẳn.

### **Tạo reset css như nào ?**

Là ta định đạng các đối thương trong HTML về một kiểu nào đó chung thường thì dưa các thẻ có định dạng margin, padding bằng 0, 
viền các đối tượng là none, dạng danh sách ul, ol … list-style là none, có thể qui định thêm kiểu chữ hoặc cỡ chữ tùy vào ý đồ của bạn, 
tuy nhiên cỡ chữ thường người cho cho 100% rồi sau đó chúng ta định dạng lại trong phần thiết kế giao diện sau đó. 
Ví dụ:
```
*{ 
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
 }
```
Ta cũng có thể liệt kê các thẻ html rồi định dạng lại:
 
```
html, body, div, span, applet, object, iframe,h1, h2, h3, h4, h5, h6, p{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
}

ol, ul {
  list-style: none;
}
```

Tuy nhiên để tiện lợi cũng như tạo cho phần reset css được chặc chẽ và chính xác hơn mình giới thiệu những bộ reset css được 
nhiều người sử dụng nhất đó là do những người lập trình css trên thế giới tạo ra và chia sẻ, hiển nhiên là được update thường xuyên.

**- Normalize.css**

Đây là 1 file CSS tiêu chuẩn được sử dụng rất nhiều trong các thư viện Frontend Framework như Bootstrap

Bạn có thể xem file này [tại đây](https://github.com/necolas/normalize.css/blob/master/normalize.css)

**- CSS Reset của Eric Myer**

Cái này cũng khá phổ biến và được dùng nhiều.

Bạn xem code nó [ở đây](https://meyerweb.com/eric/tools/css/reset/)

**- MarkSheet CSS Reset**

Các đoạn code reset rất hữu ích nếu bạn sử dụng 100% web HTML5.

Bạn xem code nó [vô đây](https://marksheet.io/css/reset.css)

**- MiniReset.css**

Một CSS Reset cũng khá hiệu quả và ok.

Bạn xem code nó [click đây](https://jgthms.com/minireset.css/)

### **Sử dụng CSS Reset:**

***- CSS Reset luôn đặt đầu tiên trong các file CSS***

***- CSS Reset luôn xử lý các element HTML***

Điều này được hiểu là CSS Reset sẽ tác động tới các element như:
`<a>, <img> `
chứ không phải 
`<a class=”link”> `
hay 
`<img id=”image”>.` 
Tức là, nhiệm vụ của CSS Reset là làm việc với các element trực tiêp chứ không phải các class hay ID nào cả. 
Lý do thì là bởi nó làm việc với trình duyệt, mà các trình duyệt cũng làm cách tương tự để áp đặt các style mặc định vào.

***- Custom CSS Style phải gọi vào các class/ID hoặc có parent element***

Bạn nên code vào:
```
.button thay vì a.button.
.list li thay vì ul li hay ul.list li
```
Việc tránh gọi các element trình duyệt mà sử dụng class/ID đóng vai trò quan trọng giúp bạn dễ dàng xử lý xung đột 
giữa CSS Reset và custom style.

Tuy là một phần nhỏ trong thiết kế diện web nhưng rất quan trọng, các bạn không thể có được một giao diện như ý khi bỏ qua bước này. 
Chúc các bạn thành công!