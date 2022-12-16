Scrollbar có thể là một trong những từ khóa bị dân làm FE ghét nhất, đơn giản vì nó không thống nhất giữa các trình duyệt, khó custom, bonus thêm nếu design chấm phá vài nét cho nó bạn có thể phải sử dụng hoặc viết hẳn một plugin. Nhưng đôi khi nó cũng là thứ mà dân FE rất thích (trường hợp container overflow). Trong bài viết này mình sẽ cùng các bạn tìm hiểu cách tính độ rộng scrollbar của mỗi trình duyệt và áp dụng vào thực tế
![](https://images.viblo.asia/0fefa78b-8c07-4938-9c79-40ab1d2116e3.jpg)

Trước tiên bạn hãy quan sát ví dụ sau (đây là ví dụ mình đã sử dụng trong bài viết cố định tiêu đề cho bảng với css thuần)

{@embed: https://codepen.io/hoanghung96cs/pen/JqQqOP}

Rõ ràng khi xuất hiện scrollbar nó đã cộng thêm width vào content của phần tử khiến ta phải css trừ đi một giá trị đúng bằng độ rộng của nó cho thẻ `thead` để các cột không bị lệch nhau

Ý tưởng để thực hiện việc tính toán này khá hay
+ Đầu tiên ta tạo một div không có scrollbar và lấy width hiện tại của nó
+ Tiếp theo ta làm một cách nào đó để xuất hiện scrollbar và lấy width mới
+ Trừ hai giá trị đó cho nhau ta sẽ ra được phần hiệu số chính là width hiện tại của scrollbar (bingo)

### Xử lý với JS thuần
```javascript
function getScrollBarWidth () {
  var inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  var outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
};
```

### Xử lý với jQuery
```javascript
function getScrollBarWidth() {
  var $inner = $('<div>').css({
    height: '200px',
    width: '100%'
  }), $outer = $('<div>').css({
    height: '150px',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    visibility: 'hidden',
    width: '200px',
  }), w1, w2;
  $('body').append($outer.append($inner));

  w1 = $inner.outerWidth();
  $outer.css({
    overflow: 'scroll'
  });

  w2 = $inner.outerWidth();
  if (w1 == w2) w2 = $outer.clientWidth;
  $outer.remove();

  return (w1 - w2);
}
```
Gọi hàm `getScrollBarWidth()` ra là bạn có thể lấy được width scrollbar (giá trị này sẽ khác nhau ở mỗi trình duyệt). Lúc này có thể dễ dàng dùng JS/jQuery để chèn style inline cho phần tử mà không phải đau đầu tìm giải pháp css cross browser nữa

### Kết luận

Trên đây mình đã giới thiệu cho các bạn một trong những cách để có thể tính được chiều rộng thanh cuộn và áp dụng nó vào bài toán thực tế, nếu bạn có solution nào hay đừng ngại ngần chia sẻ cho cộng đồng FE nhé

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn.

Xin cảm ơn !

Tham khảo http://www.alexandre-gomes.com/?p=115