### Giới thiệu
Xin chào các bạn đọc của Viblo.Trong bài viết lần này mình sẽ giới thiệu tới mọi người 1 plugin rất hay về tạo scrollbar cực đẹp và mượt,đẹp về UI lẫn UX lại scroll mượt hơn bất cứ plugin nào.Đây là plugin trước đây mình hay sử dụng khi làm các dự án bên Nhật.
Plugin mình muốn giới thiệu có tên là ```malihu custome scrollbar```,link download vs demo ở dưới mọi người vào để tải và xem.
<br><br>
Download: http://manos.malihu.gr/jquery-custom-content-scroller/
<br>
Demo : http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/complete_examples.html

![](https://images.viblo.asia/c34716e2-dcd9-42e8-aea7-3ac2d76d9e4a.png)
### Cách sử dụng
**HTML**

```html
<link rel="stylesheet" href="/path/to/jquery.mCustomScrollbar.css" />

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="/path/to/jquery.mCustomScrollbar.concat.min.js"></script>
````
**Cài đặt cơ bản**
```javascript
<script>
    (function($){
        $(window).on("load",function(){
            $(".content").mCustomScrollbar();
        });
    })(jQuery);
</script>
```
**Cài đặt với HTML**
```html
<div class="mCustomScrollbar" data-mcs-theme="dark">
  <!-- your content -->
</div>
```

Ngoài ra còn rất nhiều cách cài đặt khác và các option cài đặt custome được hướng dẫn chi tiết ở trang chủ, các bạn vào tìm hiểu và custome theo đúng ý mình mong muốn nhé.
### Lời kết
Bài viết này mình chỉ giới thiệu 1 plugin Jquery về scrollbar,hi vọng sẽ giúp ích 1 phần nào đó cho các bạn khi muốn sử dụng plugin về custome scrollbar để làm đẹp scrollbar cho dự án của mình.Cảm ơn các bạn đã đọc bài viết và hẹn gặp lại vào bài viết tiếp theo.
<br>
<br>
ご参考になれば！！
ご覧をいただきありがとうございました。