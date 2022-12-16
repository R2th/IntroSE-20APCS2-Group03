## 1 Giới thiệu:
 - Nếu bạn tạo ra 1 thư viện Javascript mà có hơn 90% Website hiện đang sử dụng. Như vậy có được xem là quá tuyệt vời không ? JQuery - Thư viện này đã quá quen thuộc với lập trình viên Website hiện nay, bởi khả năng tương tác nhanh và đơn giản với các DOM của HTML.
 ## 2 JQuery có thể được thay thế ? 
 - Vậy tại sao một thư viện mạnh mẽ như vậy ta lại không muốn dùng tới nó nữa ? và nếu không có JQuery thì sẽ có sự lựa chọn nào tốt hơn không ?
 - Câu trả lời là chúng ta hoàn toàn có thể không dùng tới JQuery nữa, vì đối với những dự án cần perfomance 1 cách tối ưu thì việc includes những thư viện từ bên ngoài cũng là cả 1 bài toán.
 - Giờ đây bạn có thể hoàn toàn an tâm dùng vanilla js để thay thế cho JQuery - và nó sẽ không khó hay đáng sợ như bạn nghĩ đâu .
## 3 Table of Contents
### 3.1 Query Selector
- Đầu tiên là việc select đối tượng , chúng ta cùng xem giữa JQuery và Vanilla JS khác nhau như thế nào nha.
```javascript
// jQuery
$('.class');
// Native
document.querySelectorAll('.class');
// or
document.getElementsByClassName('class');
=======
// jQuery
$('#id');
// Native
document.querySelector('#id');
// or
document.getElementById('id');
// or
window['id']
```
- Các bạn thấy không chúng ta có thể hoàn toàn select 1 đối tượng theo id or class với JS 1 cách tường minh và rõ ràng mà k cần include thêm JQuery làm gì nữa. Và còn nhiều nhiều ví dụ mà mình sẽ so sánh để bạn có thể chuyển từ JQuery về JS hoặc ngược lại.
### 3.2 CSS & Style
- Chúng ta có thể dễ dàng thao tác với .class được viết bằng css 
```javascript
Thêm 1 .class
// jQuery
$el.addClass(className);
// Native
el.classList.add(className);

Remove 1 .class
// jQuery
$el.removeClass(className);
// Native
el.classList.remove(className);

Check tồn tại .class trong element
// jQuery
$el.hasClass(className);
// Native
el.classList.contains(className);
```
### 3.3 DOM Manipulation
```javascript
Get nội dụng trong 1 thẻ HTML
// jQuery
$el.html();
// Native
el.innerHTML;

Set nội dụng trong 1 thẻ HTML
// jQuery
$el.html(htmlString);
// Native
el.innerHTML = htmlString;
```
### 3.4 Ajax - fetch API 
```javascript
// JQuery
$.ajax({url, success: function(result){
    $("#div1").html(result);
}});

//Using fetch 
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
```
### 3.5 Events
```Javascript
// jQuery
$el.on(eventName, eventHandler);
// Native
el.addEventListener(eventName, eventHandler);
```
## 4 Tổng kết:
- Trên đây là 1 số so sánh đơn giản và trực qua về việc sử dụng Javascript thuần thay cho việc sử dụng JQuery.
- Có nhiều ý kiến trái chiều về việc có nên loại bỏ JQuery hay không, tuỳ tính chất dự án và team member mà áp dụng sao cho thích hợp.
 - Để tra cứu chi tiết hơn bạn có thể vào https://github.com/nefe/You-Dont-Need-jQuery để reseach trong lúc code JS thay vì JQuery bạn nhé.