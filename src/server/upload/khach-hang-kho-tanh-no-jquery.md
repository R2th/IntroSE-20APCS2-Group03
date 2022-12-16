Xin chào mọi người!
- Thời buổi người người Angular JS, nhà nhà React JS thì đâu đó vẫn còn khá nhiều dự án thuần Markup, và để thao tác với DOM trong các dự án này thì 96,69% các Dev FrontEnd lựa chọn cho mình thư viện Javascript(JS) khá phổ biến đó là jQuery.
- Rồi một ngày đẹp trời, khách hàng vui vẻ nói là không muốn thấy bất cứ 1 dòng code jQuery nào trong dự án của họ - NO ~~JQUERY~~. Khá là đắng lòng nhỉ, tuy nhiên như mình đã chia sẻ ở trên, bởi vì là 1 thư viện JS nên những gì viết được bằng jQuery thì hoàn toàn viết được bằng JS thuần. Dưới đây là 1 số ví dụ nhỏ:

# 1. Select phần tử
- jQuery
```
// ID
$('#myId')

// Class Name
$('.myClass')

// Tag Name
$('p')

...
```
Quá ngắn gọn thảo nào 96,69% Dev đều thích dùng :)
- ~~jQuery~~
```
// ID
document.querySelector('#myId')

// Class Name
document.querySelectorAll('.myClass')

// Tag Name
document.querySelectorAll('p')

...
```
Cũng không đến nỗi nào, I'M FINE!

# 2. Các sự kiện - cụ thể 'click'
- jQuery
```
$(element).on('click', function() {
    // do some thing
});
```
- ~~jQuery~~
```
element.addEventListener('click', function() {
    // do some thing
});
```
Hmm, Not bad!

# 3. Show/Hide các elements
- jQuery
```
// Hide element
$(element).hide();

// Show element
$(element).show();

// Show elemnt với 1 chút hiệu ứng
$(element).fadeIn();

...
```

- ~~jQuery~~
```
// Hide element
element.style.display = 'none';

// Show element
element.style.display = 'block';

// Show element với 1 chút hiệu ứng
function fadeIn(element) {
  var last = +new Date();
  var tick = function() {
    element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
    last = +new Date();
    if (+element.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };
  tick();
}

fadeIn(element);

...
```
Giải thích về trường hợp show element có hiệu ứng: 
> Khi gọi hàm fadeIn(), hàm tick() sẽ được gọi theo, khi đó opacity của element sẽ tăng dần theo thời gian với công thức tính ở trên. 

> Nếu opacity của element vẫn < 1 thì hàm tick() vẫn được tiếp tục gọi thông qua hàm setTimeout hoặc window.requestAnimationFrame, window.requestAnimationFrame tương tự setInterval() nhưng mượt hơn trong xử lý graphic và animation (chỗ này có sai mong bỏ qua ạ (yaoming) ).

# 4.  Thao tác với DOM
- jQuery
```
// Chèn elememt
$("#container").append("<p>FE ĐN xin chào</p>");

// Thêm class
$('#content').addClass('myClass');

...
```

- ~~jQuery~~
```
// Chèn elememt
document.getElementById("container").innerHTML += "<p>FE ĐN xin chào</p>";

// Thêm class
document.getElementById('content').className += 'myClass';

...
```


# 5. Tổng kết
- Trên đây chỉ là 1 vài ví dụ nhỏ, hi vọng sẽ giúp ích cho các bạn.
- Tham khảo
    - https://kipalog.com
    - https://jquery.com/