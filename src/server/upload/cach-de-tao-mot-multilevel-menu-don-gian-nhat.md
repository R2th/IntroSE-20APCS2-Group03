Trong bài viết này mình sẽ giới thiệu đến các bạn một số cách để có thể tạo được một `menu multilevel` .
Để có một menu thì việc đầu tiên là phải tạo một menu thôi, bắt tay vào tạo nào.
## 1. Đầu tiên hãy tạo một menu.
Các bạn hãy xem cách mình tạo trong code dưới đây
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/gOYMyRB?editors=1010}

Như vậy chúng ta đã có một menu nhìn giống đa cấp rồi đúng ko? Vậy bây giờ câu hỏi đặt ra là làm sao để có thể ẩn và hiện các items level 2 và 3 khi click vào items level 1. Mình sẽ hướng dẫn các bạn làm bằng cách sử dụng JQuery.

## 2. Thêm JQuery cho menu.
Chúng ta sẽ thêm đoạn Jquery sau:
```javascript
//Ẩn các items level nhỏ
$(".menu li:has(ul)").children("ul").hide();  
//Ẩn và hiện các items con khi click vào items cha
$('.menu li a').click(function (e) {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').next('ul').slideUp(500);
    }
    else if ($(this).parents().siblings('a').hasClass('active')) {
      $(this).addClass('active').next('ul').slideDown(500);
    }
    else {
      $('.menu li a').removeClass('active').next('ul').slideUp(500);
      $(this).addClass('active').next('ul').slideDown(500);
    }
  })
```
Hoặc chúng ta cũng có thể sử dụng đoạn Jqurey sau:
```javascript
//Ẩn các items level nhỏ
$(".menu li:has(ul)").children("ul").hide();  
//Ẩn và hiện các items con khi click vào items cha
$('.menu li a').click(function (e) {
        //e.preventDefault();
        $(this).toggleClass('active').siblings('ul').slideToggle(500);
        $(this).parent().siblings().children('a').removeClass('active');
        $(this).parent().siblings().children('ul').slideUp(500);
        })
```

và chúng ta có kết quả
{@embed: https://codepen.io/duy-nguyn-the-vuer/pen/GRKqLyw?editors=1010}

## 3. Kết luận
Như vậy mình đã giới thiệu các bạn cách để có một multilevel menu đơn giản.
Muốn xịn hơn chúng ta có thể tham khảo bài sau: https://codepen.io/davilotus/pen/KBRNYp?editors=1010.
Cảm ơn tất cả các bạn đã đọc