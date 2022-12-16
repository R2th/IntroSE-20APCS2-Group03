Trong hướng dẫn này, mình sẽ sử dụng thư viện jCarousel để hiển thị slide các hình nhỏ và chú thích. Hình thu nhỏ có thể được cuộn với việc sử dụng các nút trước và sau khi bất kỳ hình ảnh thu nhỏ, các chú thích hoặc tiêu đề của hình nhỏ sẽ trượt lên.

Các bạn có thể xem demo trước để hiểu về thư viện này: https://sorgalla.com/jcarousel/examples/basic/

Để sử dụng thư viện này, các bạn làm như sau: 

1. Tải jCarousel plugin tại địa chỉ: https://github.com/jsor/jcarousel/archive/0.3.9.zip

2. Giải nén tập tin vừa tải, copy file `jquery.jcarousel.min.js` ở thư mục dist vào thư mục web của bạn.

3. Đặt đoạn mã sau vào thẻ `<head>` của trang web để load các thư viện javascript và css.

```
<!--jCarousel basic stylesheet-->
<link rel="stylesheet" type="text/css" href="https://sorgalla.com/jcarousel/examples/basic/jcarousel.basic.css" />
<!--jQuery library-->
<script type="text/javascript" src="https://sorgalla.com/jcarousel/vendor/jquery/jquery.js"></script>
<!--jCarousel library-->
<script type="text/javascript" src="https://sorgalla.com/jcarousel/dist/jquery.jcarousel.min.js"></script>
```

4. Đặt đoạn mã sau vào thẻ `<head>` để khởi tạo jCarousel.

```
<script type="text/javascript">
(function ($) {
   $(function () {
      $('.jcarousel').jcarousel();
      $('.jcarousel-control-prev')
         .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
         })
         .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
         })
         .jcarouselControl({
            target: '-=1'
         });
      $('.jcarousel-control-next')
         .on('jcarouselcontrol:active', function () {
            $(this).removeClass('inactive');
         })
         .on('jcarouselcontrol:inactive', function () {
            $(this).addClass('inactive');
         })
         .jcarouselControl({
            target: '+=1'
         });
      $('.jcarousel-pagination')
         .on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
         })
         .on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
         })
         .jcarouselPagination();
   });
})(jQuery);
</script>
```

5. Đặt đoạn mã sau vào thẻ `<body>` tại vị trí muốn hiển thị slide, các bạn thay link ảnh của mình tại các thẻ `img`

```
<div class="jcarousel">
    <ul>
        <li><img src="https://sorgalla.com/jcarousel/examples/_shared/img/img1.jpg" alt="img1"></li>
        <li><img src="https://sorgalla.com/jcarousel/examples/_shared/img/img2.jpg" alt="img2"></li>
        <li><img src="https://sorgalla.com/jcarousel/examples/_shared/img/img3.jpg" alt="img3"></li>
        <li><img src="https://sorgalla.com/jcarousel/examples/_shared/img/img4.jpg" alt="img4"></li>
        <li><img src="https://sorgalla.com/jcarousel/examples/_shared/img/img5.jpg" alt="img5"></li>
        <li><img src="https://sorgalla.com/jcarousel/examples/_shared/img/img6.jpg" alt="img6"></li>
    </ul>
</div>
```

Trên đây là toàn bộ hướng dẫn để tạo một slide đơn giản cho website của bạn. Nếu có gì khó khăn trong việc cài đặt thì hãy để lại bình luận ở bên dưới nhé.  Chúc các bạn thành công!