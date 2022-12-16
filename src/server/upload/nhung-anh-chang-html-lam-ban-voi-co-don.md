Đây là câu chuyện về một loạt các thuộc tính HTML5 có thể giúp bạn hoàn thành công việc khó một cách đơn giản và dễ dàng nhưng lại cô đơn lâu ngày, ít được sử dụng đến.
![](https://images.viblo.asia/9f48729b-8c7d-404b-ba5f-9a3dd91a7d7b.png)

Cùng tìm hiểu xem danh tính của những thuộc tính này nào! Let's go!!!

### contenteditable
Đây là thuộc tính mới có trong HTML5. Thuộc tính contenteditable được dùng để chỉ định nội dung của phần tử nào đó có thể được chỉnh sửa hay là không. Contenteditable sinh ra có mục đích thân thiện với người dùng hơn, khi nó giúp người dùng có thể viết trực tiếp trên trình duyệt. Cú pháp của nó đơn giản như sau:
```html
<element contenteditable=”true|false”>
```
Trong đó, có 2 giá trị:
* true: cho phép chỉnh sửa
* false: không cho phép chỉnh sửa

Ví dụ:
```html
<p contenteditable='true'>Start writing now...</p>
```
Đây là đoạn văn bản có thể được chỉnh sửa. Bạn thử đưa con trỏ chuột vào để chỉnh sửa xem thế nào nhé.

> Lưu ý: Khi thuộc tính contenteditable không được gán cho phần tử, thì phần tử sẽ kế thừa thuộc tính từ phần tử cha.

### draggable
Nhằm cải thiện hơn trải nghiệm và tương tác của người dùng đối với trang web, tính nằng kéo thả trở nên phổ biến hiện nay. HTML5 cũng cho ra thuộc tính draggable để chỉ định liệu một phần tử có thể kéo được hay không? 

Thuộc tính draggable là một thuộc tính liệt kê và sử dụng bằng cách Drag và Drog API.

Cú pháp như sau:
```html
<element draggable=”true|false|auto”>
```
Các giá trị trong đó sẽ là:

* true: Chỉ định phần tử có thể kéo thả
* false: Chỉ định phần tử không thể kéo thả
* auto: Sử dụng hành vi mặc định của trình duyệt

```html
<p draggable='true'>Drag this to another area!</p>
```
Trên là đoạn văn bản có thể kéo thả. Và tất cả các trình duyệt lớn đều hỗ trợ tính năng này.

### hidden
Thuộc tính hidden là một thuộc tính boolean. Khi được sử dụng, thẻ chứa thuộc tính sẽ được đánh dấu là chưa hiển thị hoặc không hiển thị nữa.

Thuộc tính hidden cũng có thể được sử dụng để ẩn một thẻ làm cho người dùng không nhìn thấy và chỉ hiện ra khi thỏa mãn điều kiện nào đó (như chọn một checkbox, v.v…). Sau đó, JavaScript có thể bỏ thuộc tính này đi và nội dung trong thẻ sẽ được hiển thị.
Cú pháp sử dụng vô xùng đơn giản: 
```html
<element hidden>
```

```html
<p hidden>This paragraph should be hidden!</p>
```
Chẳng hạn như bạn có thể sử dụng ẩn đi phần tử của trang web để người dùng không tương tác được, đến khi việc đăng nhập hoàn thành thì mới cho hiện ra.
> Lưu ý: Thuộc tính này không ẩn đi nội dung trong phần tử mà ẩn đi phần tử.

### spellcheck
Thuộc tính spellcheck quy định thẻ có cần được kiểm tra chính tả và ngữ pháp hay không. Bạn có thể đặt thuộc tính này trong:
* <input> elements (trừ password)
* <textarea> elements
* contenteditable elements
    
Ngoài ra, thuộc tính này cực kỳ hữu ích vì nó có thể được thừa kế bởi các phần tử con. Chẳng hạn bạn thêm thuộc tính này vào thẻ p và tất cả các phần tử con thêm text input sẽ kế thừa thuộc tính này.
    
Cú pháp như sau:
```html
<element spellcheck="true|false">
```
 Trong đó:
* true: Thẻ sẽ được kiểm tra chính tả và ngữ pháp.
* false: Thẻ không cần kiểm tra.
  Ví dụ:
```html
<div class="col-md-6">
   <textarea rows="4" cols="50" spellcheck='true'>Start writing now...</textarea>
</div>
<div class="col-md-6">
  <textarea rows="4" cols="50" spellcheck='false'>Start writing now...</textarea>
</div>
```
### pattern
Thuộc tính pattern của phần tử `<input>` được dùng để xây dựng biểu thức quy tắc (mẫu) áp dụng cho phần tử `<input>` tương ứng mà không cần phải sử dụng code javascript. Thuộc tính pattern áp dụng cho phần tử `<input>` có các kiểu sau: text, search, url, tel, email và password. 
    
```html
<input pattern="[0-9]{4}">
```
    
Nên dùng thêm thuộc tính 'title' của phần tử `<input>` để mô tả mẫu nhằm trợ giúp cho người dùng khi nhập liệu. Nếu bạn cung cấp một thuộc tính title với pattern, giá trị của title sẽ được bao gồm trong bất kỳ thông báo lỗi nào nếu mẫu không khớp.
    
> Lưu ý: Thuộc tính pattern trong thẻ input không được hỗ trợ trong các phiên bản Internet Explorer 9 trở về trước và trong Safari.
    
    
### Tổng kết
Hy vọng điều này có thể truyền cảm hứng cho bạn để có những ý tưởng mới và sáng tạo và bạn có thể áp dụng chúng vào công việc hàng ngày của mình! Cảm ơn bạn đã dành thơi gian đọc bài viết!
##### Tham khảo:
* https://www.w3schools.com/html/html_form_attributes.asp
* https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
* https://html5-tutorial.net/html-basics/attributes/