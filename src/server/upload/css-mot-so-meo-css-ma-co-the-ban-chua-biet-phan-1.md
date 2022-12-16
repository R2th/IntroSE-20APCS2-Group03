Chào các bạn, hôm nay mình xin chia sẻ 1 số mẹo khi mình làm và gặp trong các dự án, những mẹo này có thể bạn chưa biết, đã biết nhưng ít dùng. Nhưng dù ở mức độ nào thì nếu có gì sai sót và không chính xác trong bài viết, mong mọi người sẽ để lại bình luận bên dưới để mình hoàn thiện hơn cho bài viết và cùng nhau chia sẻ kinh nghiệm nhé. Xin cảm ơn mọi người.

### **1. Vô hiệu hóa event click trên thẻ div**

Đôi khi, vì 1 vài lý do đặc biệt nào đó, mà chúng ta muốn disable sự kiện click trên 1 thẻ div. Ta có thể disable nó 1 cách đơn giản bằng thuộc tính của css là ```pointer-events: none;```, muốn nó nhả ra lại để bạn bấm thì có set là cho nó là ```auto```

Link tham khảo về property này: ```https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events```

### **2. Position: sticky; trên IE < 15**

Đối với các bạn đã biết thì IE trong giới web developer là 1 cái gì đó rất là ... , =.=! và nó luôn làm chúng ta phải đau đầu để xử lý riêng cho nó. Nó giống như 1 cô gái đỏng đảnh vậy, dù chúng ta không ưa gì cô ấy (không phải phân biệt hay chê xấu gì đâu, chỉ đơn giản là cô ấy lạc hậu và không theo trend gì cả). Nhưng cô ấy luôn bắt chúng ta phải đối xử với cô ấy theo 1 cách riêng, và nâng niu so với những cô gái khác như Chrome hay Firefox, vì nếu chúng ta không làm vậy, sẽ bị "thằng khác" (khách hàng) nó đấm cho vì không đối xử theo cách riêng với cô ấy T.T

Một trong những vấn đề thỉnh thoảng mình gặp là mình phải xử lý position: sticky trên IE < 15, trên 15 thì đã được hỗ trợ rồi. Vì cái sự lạc hậu quê mùa không chịu update của IE ( và của ai đó khi dùng web) nên mình sẽ dùng đoạn code dưới đây để xử lý :

**HTML**
````html
<div class="header">
    <h1>Hello IE!!!</h1>
  </div>
  <ul class="menu">
    <li><a href="#">Tab 1</a></li><li>
    <a href="#">Tab 2</a></li><li>
    <a href="#">Tab 3</a></li><li>
  </ul>
  <div class="container">
      <p>1</p>
      <p>2</p>
      <p>3</p>
  </div>
````
**CSS**
```css
body {
   margin: 0; 
}

.header {
    height: 100px;
    background-color: #ddcbaf;
    text-align: center;
}

.header h1 {
    margin-top: 0;
    padding-top: 20px;
}

.menu {
    margin: 0;
    padding: 0;
    width: 100%;
    background-color: #BFFFF3;
}

.menu li {
    display: inline-block;
    text-align: center;
    width: 25%;
}

.menu li:hover,
.menu li:focus {
    background-color: #66FFE3;
}

.menu a {
    display: block;
    padding: 10px 0;
    text-decoration: none;
}

.container {
  padding: 0 20px;
  color: #e3e3e3;
}
```
**JS**
```js
const menu = document.querySelector('.menu')
const menuPosition = menu.getBoundingClientRect().top;
window.addEventListener('scroll', function() {
    if (window.pageYOffset >= menuPosition) {
        menu.style.position = 'fixed';
        menu.style.top = '0px';
    } else {
        menu.style.position = 'static';
        menu.style.top = '';
    }
});
```

Bạn có thể copy nó và chạy thử trên IE, mặc dù có thể không mượt mà như sticky trên Chrome nhưng ít ra có còn hơn không phải không nào. :v

### **3. Truncate nhiều dòng**

Chắc hẳn nhiều bạn cũng đã phải xử lý trường hợp khi text quá dài, phải hiển thị dấu '...' ở cuối text đó với cú pháp quen thuộc
```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis; 
```

Và nó hoạt động rất tốt đúng không (y). Vậy nếu phải làm việc đó với text khi quá 2 dòng, 3 dòng thì sao? Hừm, cũng đừng lo lắng quá, chỉ cần copy and paste đoạn dưới đây vào là ổn ngày (y)

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: <số dòng bạn muốn hiển thị dấu '...'>;
overflow: hidden;
```

### **4. Night mode**

Hiện nay các trang web và app đang có xu hướng thêm night mode vào để người dùng có thể dùng sản phẩm vào ban đêm.  Và nếu bạn chưa tìm được 1 cách hữu hiện và nhanh chóng nào để áp dụng nó lên sản phẩm của mình, bạn có thể tham khảo cách này:

Sử dụng bộ lọc invert và hue-rotate, trong đó:

+ Bộ lọc: invert() theo thang từ 0 đến 1 – trong đó 1 thay đổi màu trắng thành màu đen.
+ Bộ lọc: hue-rotation() làm thay đổi nội dung màu sắc của các thành phần của bạn theo cách chúng ít nhiều giữ lại cùng một mức độ tách biệt với nhau. Giá trị của nó nằm trong khoảng từ 0deg đến 360deg.

Bằng cách kết hợp các hiệu ứng này trên thẻ body, bạn đã có thể thêm night mode cho sản phẩm của mình.  Nhưng cơ bản mà nói thì property này hoạt động dựa trên việc lọc màu nên bạn phải set màu của nó trước đã, trong ví dụ thì mình set background là màu trắng
```css
body {
    background: #FFFFFF;
    filter: invert(1) hue-rotate(210deg);
}
```

Cảm ơn các bạn đã đọc qua bài chia sẻ của mình, hy vọng trong bài viết tới mình có thể chia sẻ với các bạn những mẹo mới để áp dụng vào dự án