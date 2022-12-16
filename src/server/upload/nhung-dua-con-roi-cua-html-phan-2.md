![](https://images.viblo.asia/007705c7-a3a9-4236-8cf3-0e9ef71c3b72.jpg)
Là một người lập trình web, đòi hỏi bạn sẽ phải thành thạo khá nhiều các framework và các ngôn ngữ lập trình khác nhau. Và một điều hiển nhiên, chúng ta không thể khai thác tất cả công dụng mà ngôn ngữ hay framework đó cung cấp để thấy hết tiềm năng nó mang lại.

HTML là một ngôn ngữ đánh dấu mạnh mẽ có thể được sử dụng để tạo cấu trúc cho ứng dụng web và cung cấp các lợi ích để chúng ta có thể dễ dàng tiếp cận, nhưng chỉ xảy ra khi nó được sử dụng một cách thích hợp. Do đó, bài viết này sẽ chia sẻ tiếp về một số tag rất tiện ích nhưng lại rất ít khi được sử dụng hay biết đến sự tồn tại của nó, ví như những đứa con rơi của HTML. Xem phần 1 [tại đây](https://viblo.asia/p/nhung-dua-con-roi-cua-html-phan-1-QpmlexWkZrd) và tiếp tục vào phần 2 nào! Let's go!

### 8.  <blockquote>
Tag `<blockquote>` chỉ định một phần được trích dẫn từ một nguồn khác.
    
Khi sử dụng, trình duyệt sẽ chèn một khoảng trắng vào trước và sau thành phần `<blockquote>` và cũng canh lề cho thành phần này.

  ```html
<blockquote>
Hypertext Markup Language (HTML) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.
</blockquote>
```
Chúng ta cũng có thể đưa ra một URL cho nguồn trích dẫn bằng cách sử dụng thuộc tính `<cite>`.
    
```html
<blockquote cite="http://example.com/">
    It was the best of times, it was the worst of times.
</blockquote>
```
>  Lưu ý: `<blockquote>` được hỗ trợ trong đa số các trình duyệt, tuy nhiên các trình duyệt sẽ hiển thị không giống nhau, còn `<cite>` không được hỗ trợ trong phần lớn các trình duyệt.
### 9.  Picture
Tag `<picture>` là một phần tử mới được thiết lập để trở thành một phần chính thức của HTML5 cho phép chúng ta chỉ định nguồn hình ảnh.

Thay vì tăng tỷ lệ lên xuống của một hình ảnh để phù hợp với độ rộng của khung nhìn hay sắp sếp nhiều hình để lấp đầy khung nhìn của trình duyệt. Tag `<picture>` sẽ cho phép chúng ta tải một hình ảnh hoàn toàn khác nhau tùy thuộc vào:
* Kết quả của Media Query, ví dụ viewport height, width, orientation
* Mật độ điểm ảnh
    
Điều này lần lượt có nghĩa là chúng ta có thể:

* Tải các hình ảnh có kích thước tương ứng, tối ưu hoá việc sử băng thông.
* Tải các hình ảnh với kích thước khác nhau để phù hợp với thay đổi của layout ở những độ rộng khác nhau.
* Tải các hình ảnh có độ phân giải cao cho màn hình có mật độ điểm ảnh cao hơn.

Tag `<picture>` sẽ chứa hai thẻ khác nhau: một hoặc nhiều phần tử `<source>` và một phần tử `<image>`.
    
`<source>` có các attributes sau:
    
* srcset (required): Xác định URL của hình ảnh để hiển thị.
* media: chứa các truy vấn về những thứ như viewport height, width, orientation vv.
* sizes: Chấp nhận tham số là một mô tả (descriptor) về độ rộng, một media query có chứa mô tả về độ rộng hoặc một danh sách của các media query cùng với descriptor về độ rộng trong đó mục cuối cùng danh sách được sử dụng làm mặc định.
* type: Xác định loại MIME.
 
Trình duyệt sử dụng các giá trị thuộc tính để tải hình ảnh phù hợp nhất và sử dụng phần tử `<source>` đầu tiên với lần truy cập phù hợp và bỏ qua các phần tử nguồn tiếp theo.

Tag `<img>` để dự phòng, được sử dụng để cung cấp khả năng tương thích ngược nếu trình duyệt không hỗ trợ phần tử hoặc nếu không có thẻ `<source>` nào phù hợp.

```html
 <picture>
     <source media="(min-width: 650px)" srcset="img_cat_fat.png">
     <source media="(min-width: 465px)" srcset="img_cat_fluffy.png">
     <img src="img_dog.png" alt"Dog" style="width:auto;">
 </picture>
 ```
### 10.  <output>
    
Tag `<output>` xác định kết quả của một phép tính.

```html
<form oninput="x.value=parseInt(a.value)*parseInt(b.value)">
    <label>Số lượng</label>
    0<input type="range" id="a" value="50">100
    <br>
    <label>Đơn giá</label>
    <input type="number" id="b" disabled="disabled" value="5000">
    <br>
    <label>Tổng tiền</label>
    <output name="x" for="a*b"></output>đ
</form>
```
Như đoạn code trên thì `<output>` có hỗ trợ các thuộc tính sau:
*  for: Liệt kê các ID của phần tử khác, ví dụ: nó chỉ dẫn các phần tử mà đã cung cấp giá trị đầu vào tới phép tính.
*  form: Enable để đặt vị trí các kết quả đầu ra (output) bất cứ đâu trong một tài liệu.
* name: Tên của phần tử.

### 11.  Template
Tag `<template>` chứa mã HTML sẽ không được hiển thị ra bởi trình duyệt cho đến khi nó được chỉ định thêm vào tài liệu bởi JavaScript.
```html
<template>
  <h2>Flower</h2>
  <img src="img_white_flower.jpg">
</template>
```
### 12.  <detail>
    
Tag `<details>` xác định thêm chi tiết hoặc điều khiển có thể được ẩn hoặc hiển thị theo yêu cầu.
Nội dung của tag `<details>` không được hiển thị, trừ khi thuộc tính open được thiết lập và thường được dùng kèm với tag `<summary>`, để làm tiêu đề cho `<details>`.
```html
<details>
      <summary>Click To Open</summary>
      Hey, im natively collapsable. My content remains hidden till you click on Summary.
</details>
```
    
### 13. <noscript>
Như tên của nó, chúng ta có thể sử dụng `noscript` để hiển thị các nội dung thay thế, khi trình duyệt không hỗ trợ `<script>`, hoặc vô hiệu hóa `<script>`. Bất cứ nội dung gì trong thẻ  `<noscript></noscript>` sẽ chỉ hiển thị chỉ khi JavaScript bị vô hiệu hóa.
    
Tag `<noscript>` có thể chứa tất cả các tag HTML khác.
    
Nội dung bên trong tag `<noscript>` chỉ được hiển thị nếu `<script>` không được hỗ trợ hoặc bị vô hiệu hóa trong trình duyệt của người dùng.

```html
<script>
    document.write("Hello World!")
</script>
<noscript>Your browser does not support JavaScript!</noscript>
```
### 14.  <meter>
 Tag `<meter>` xác định một phép đo vô hướng trong một phạm vi biết trước hoặc một giá trị phân số. Cái này cũng được hiểu như một thước đo.

Cũng có thể sử dụng tag `<meter>` để hiển thị số liệu thống kê sử dụng đĩa hoặc để cho biết mức độ liên quan của kết quả tìm kiếm.

Không nên sử dụng tag `<meter>` để biểu thị tiến trình của một nhiệm vụ, các loại thành phần này phải được xác định bởi `<progress>`.

```html
<meter min="number" max="number" low="number" high="number" value="number"></meter>
```
    
Tag <meter> có các thuộc tính sau:
* min: Xác định giá trị nhỏ nhất của thước đo.
* max: Xác định giá trị lớn nhất của thước đo.
* value: 	Xác định giá trị hiện tại của thước đo.
* low: Xác định ngưỡng thấp của thước đo.
* high: Xác định ngưỡng cao của thước đo.
    
> Lưu ý: Trong một phần tử <meter> thì ba thuộc tính min, max và value là quan trọng nhất. Còn hai thuộc tính low và high không có cũng không sao.
    
### Tổng kết
Tiếp nối ở phần 1 thì hôm nay mình đã tiếp tục chia sẻ một số trong các tag ít khi được sử dụng mà mình biết. Qua bài chia sẻ, hi vọng bạn sẽ tìm thấy một số trường hợp có thể sử dụng cho các tag này. Các bạn có thể tham khảo các tài liệu sau:
* https://www.w3schools.com/tags/
* https://developer.mozilla.org/en-US/docs/Web/HTML/Element
    
Cảm ơn bạn đã dành thời gian đọc bài viết!