Chắc hẵn ai làm việc với những ứng dụng web thì đều đã nghe qua thậm chú là làm việc với JQuey rất nhiều. jQuery là thư viện được viết từ JavaScript, jQuery giúp xây dựng các chức năng bằng Javascript dễ dàng, nhanh và giàu tính năng hơn. Vì vậy độ phổ biến của nó cũng rất lớn và được tin tưởng sử dụng của nhiều Dev Web, sau một thời gian làm việc với JQuery có một số Tips mình muốn chia sẻ với mọi người, hi vọng nó sẽ giúp công việc của mọi người sẽ trở nên dễ dàng hơn.

# 1. Bạn có thể viết ngắn ngọn sự kiện document ready
Thông thường mọi người sẽ viết thế này
```js
$(document).ready(function ()
{
    // ...
});
```

Tuy nhiên bạn có thể rút ngắn hơn một chút
```js
$(function ()
{
    // ...
});
```

# 2. Tối ưu hóa hiệu suất của các selectors phức tạp
* Note1: Truy vấn một subset của DOM khi sử dụng các selector phức tạp cải thiện đáng kể hiệu suất:
```js
var subset = $("");

$("input[value^='']", subset);
```

* Note 2: Trên JQuery core function, hãy chỉ định context parameter ngoài selector parameter.  Việc chỉ định context parameter cho phép jQuery bắt đầu từ một nhánh sâu hơn trong DOM, thay vì từ gốc DOM. Với một DOM đủ lớn, việc chỉ định context parameter sẽ chuyển thành lợi ích về hiệu suất.
Ví dụ: Tìm tất cả các input loại radio trong form đầu tiên của document.
```js
$("input:radio", document.forms[0]);
```

# 3. Tìm index của một element trong một danh sách các element
jQuery có hàm .index nhưng thật khó sử dụng vì bạn cần danh sách các phần tử và chuyển vào phần tử mà bạn muốn chỉ mục của nó:
```js
var index = e.g $('#ul>li').index( liDomObject );
```

Tuy nhiên cũng có cách cũng không phải ngắn gọn hơn nhưng bớt phải lấy danh sách các phần tử: 
```js
$("ul > li").click(function ()
{
    var index = $(this).prevAll().length;
});
```

# 4. Hãy thử sử dụng data method thay vì attr
Mình biết có một số bạn muốn set một data tên myval sẽ làm thế này
$('#mydiv').attr("data-myval","20");
Việc này cũng ok nhưng khi đó nó sẽ làm thay đổi dom của bạn. Việc sử dụng data method cho phép bạn bind dữ liệu với các DOM element mà không cần sửa đổi DOM.
```js
var a = $('#mydiv').data('myval'); //getter
$('#mydiv').data('myval',20); //setter
```

# 5. Kiểm tra một element đã tồn lại chưa
```js
if ($("#someDiv").length) {
    // it exists...
}
```

# 6. Tạo htmt động mà không dùng chuỗi !!!
Một số bạn khi code khi muốn tạo một HTML DOM động thì sẽ làm kiểu thế này
```js
var text = 'testttttt'
var div1 = `<div class='test1'>${text}</div>`
var htmlEleString = `<div>${div1} </div>`
$('#parentDiv').append(htmlEleString)
```
Viết kiểu này với cây DOM đơn giản thì không sao, nhưng vớinhưng cây nhiều phần tử và phức tạp thì nối string mệt nghỉ, xong bạn sẽ thấy kí tự `'' "" ${} `` `  chóng mặt luôn chưa kể code sẽ dài và đế hiển thị theo cây DOM cũng khá khó. Vậy cách khác là gì? Bạn thử xem đoạn code sau nhé :

```js
  const errorElement = $('<div>', { class: 'error-messages' });
  file.errors.forEach(error => errorElement.append($('<span>').text(error)));

  $(`#test-files`)
    .append($('<div>', { class: 'class1' })
      .append($('<div>', { class: `class2 class3--${complete ? 'complete' : 'pending'}` })
        .append($('<div>', { class: 'class4', id: `f-id-${ testId }`, style: `width: ${ complete ? '100' : '0'}%` }))
        .append($('<div>', { class: 'class5' }).text(file.name))
        .append($('<div>', { class: 'class6' }).text('x'))
        .append(test_condition ? $('<input>', { name: 'x', value: test, hidden: true }) : []))
      .append(errorElement)
    );
```

Hãy chỉ xem cấu trúc cả đoạn code mà bỏ qua logic bạn sẽ thấy DOM trên khá phức tạp và có nhiều logic cũng như thuộc tính của từng phần tử khá nhiều, nạn hãy tưởng tượng nếu build bằng sting thì nó sẽ thế nào nhé :D (lol)

# 7. Tạo một custom selector 
Cách tạo thế nào thì bạn đọc code là hiểu ngay nhé

```js
$.extend($.expr[':'], {
    over100pixels: function(a) {
        return $(a).height() > 100;
    }
});

$('.box:over100pixels').click(function() {
    alert('The element you clicked is over 100 pixels high');
});
```

# 8. Một vài trường hợp hay gặp phải với jQuery
- Kiểm tra jQuery loaded

```js
if (typeof jQuery == 'undefined') {
  console.log('jQuery hasn\'t loaded');
} else {
  console.log('jQuery has loaded');
}
```

- Kiểm tra version jQuery
```js
jQuery.fn.jquery
```

- Sử dụng `noConflict()`

$ alias được jQuery sử dụng cũng được các thư viện JavaScript khác sử dụng. Để đảm bảo rằng jQuery không xung đột với đối tượng $ của các thư viện khác nhau, hãy sử dụng phương thức noConflict () ở đầu document:
```js
jQuery.noConflict();
```

# 9. Chain Plugin Calls
jQuery cho phép "chaining" các lần gọi plugin method để giảm thiểu quá trình truy vấn lặp lại DOM và tạo nhiều đối tượng jQuery. Giả sử đoạn mã sau đại diện cho các lệnh gọi plugin method của bạn.
Ví dụ:
Bình thường nếu mới làm với jQuery bạn sẽ code kiểu thế này"
```js
    $('#elem').show();
    $('#elem').html('bla');
    $('#elem').otherStuff();
```

nhưng với Chain Plugin Calls bạn có thể rút ngắn thế này 
```js
$('#elem')
  .show()
  .html('bla')
  .otherStuff();
```

# 10. Disable right click page của bạn
```js
$(document).ready(function () {
  $(document).bind('contextmenu', function (e) {
    return false;
  })
})
```

# 11. Bạn có thể Preload ảnh bằng jquery
```js
$.preloadImages = function () {
  for (var i = 0; i < arguments.length; i++) {
    $('<img>').attr('src', arguments[i]);
  }
};

$.preloadImages('img/hover-on.png', 'img/hover-off.png');
```

# 12. Cache Elements
Để có hiệu suất tốt hơn, bạn nên giảm selector càng nhiều càng tốt. Vì vậy, bạn nên lưu vào bộ nhớ cache các đối tượng jQuery. Để lưu vào bộ nhớ cache một phần tử chỉ cần gán nó vào một biến để sử dụng sau này.

```js
var $element = $('#selector');
if ($element.is(':hidden')) {
    $element.addClass('active').show();
    $element.data("custom", "abc123");
```
Thường người ta hay dùng biến có tiền tố `$` để chưa object jQuery

# 13. Tự động sửa các ảnh bị không load được
Nếu bạn tình cờ tìm thấy các liên kết hình ảnh bị hỏng trên trang web của mình, việc thay thế chúng từng cái một có thể là một điều khó khăn. Đoạn mã đơn giản này có thể giúp bạn dễ dáng hơn:
```js
$('img').on('error', function () {
  if(!$(this).hasClass('broken-image')) {
    $(this).prop('src', 'img/broken.png').addClass('broken-image');
  }
});
```

Hoặc ẩn luôn thì bạn làm thế này:

```js
$('img').on('error', function () {
  $(this).hide();
});
```

# 14. Tìm element bằng text
Bằng cách sử dụng selector contains() trong jQuery, bạn có thể tìm thấy văn bản trong nội dung của một phần tử. 
Ví dụ: nếu text không tồn tại, phần tử đó sẽ bị ẩn:
```js
var search = $('#search').val();
$('div:not(:contains("' + search + '"))').hide();
```

# 15. Sắp xếp các List Item bằng theo thứ tự chữ cái
Đối với các list được render từ code BackEnd bạn đang làm thì có thể sửa được nhưng có thể nội dung được hiển thị bởi CMS và đó là một list khá dài bạn muốn sắp xếp chúng theo thứ tự bảng chữ cái thì dùng cách này để custom thì có vẻ đỡ tốn công nhất:
```js
var ul = $('#list'),
lis = $('li', ul).get();

lis.sort(function (a, b) {
  return ($(a).text().toUpperCase() < $(b).text().toUpperCase()) ? -1 : 1;
});

ul.append(lis);
```

# 16. Bạn có thể dùng vòng lặp của jQuery

Thay vì
```js
var functions = [];
var someArray = [1, 2, 3];
for (var i = 0; i < someArray.length; i++) {
    functions.push(function() { alert(someArray[i]) });
}
```
hãy dùng cái này thử xem
```js
var functions = [];
var someArray = [1, 2, 3];
$.each(someArray, function(item) {
    functions.push(function() { alert(item) });
});
```

# 17. AJAX Call Error Handling
Khi một lệnh gọi AJAX trả về lỗi 404 hoặc 500, trình xử lý lỗi sẽ được thực thi. Nếu trình xử lý không được xác định, mã jQuery khác có thể không hoạt động như dự định. Để xác định một trình xử lý lỗi AJAX cho toàn trang bạn có thể dùng cái này:
```js
$(document).on('ajaxError', function (e, xhr, settings, error) {
  console.log(error);
});
```

# Kết
Với một số tips này hi vọng các bạn có thể sử dụng nó cho dự án của bạn, rất cảm ơn bạn đã đọc bài viết này <3