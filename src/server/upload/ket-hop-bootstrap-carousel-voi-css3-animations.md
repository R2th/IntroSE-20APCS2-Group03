# Giới thiệu 
Khi vào một trang web bất kì, điều gì lôi cuốn bạn? Với mình yếu tố đầu tiên quyết định mình có ở lại trang web đó hay không đó chính là giao diện.

Thông thường khách hàng sẽ yêu cầu nhà phát triển thêm slider hoặc carousel để hiển thị nội dung trên trang web với mục đích làm cho trang web tươi mới và sống động hơn.

Carousel chính là một thành phần dùng để duyệt các phần tử hình ảnh, slide... tuần tự xoay vòng, tương tự như slideshow.

Hiện giờ có rất nhiều carousel plugins có sẵn, cung cấp nhiều options hữu ích và hiệu ứng động đẹp mắt. Tuy nhiên, có những lúc bạn chỉ cần một carousel nhẹ với các options đủ dùng, đồng thời dự án của bạn lại sử dụng Bootstrap, thì bạn sẽ không phải tìm ở đâu nữa vì Bootstrap Carousel sẽ đáp ứng đầy đủ tiêu chí bạn cần.

Trong bài viết này, mình sẽ giới thiệu thêm một số hiệu ứng animate thú vị vào Bootstrap Carousel. Cùng bắt tay làm nhé.
## Giới thiệu Animate.css
Một trong những tính năng tuyệt vời nhất của Css là tạo hiệu ứng với CSS3 Animation. Trước đây ta đều phải dùng đến Javascript để tạo hiệu ứng động cho trang web, nhưng giờ đây CSS đã giúp công việc của bạn đơn giản hơn rất nhiều. Và Daniel Eden đã cho ra đời thư viện Animate.css - thư viện cung cấp khoảng 76 hiệu ứng khác nhau giúp các developer dễ dàng tạo hiệu ứng đẹp cho trang web mà không cần phải biết quá nhiều về CSS3 Animation. 

Để sử dụng Animate.css thì cần phải làm 2 bước sau:

1. Thêm `animate.min.css` vào trong thẻ `<head>` của HTML document.
2. Thêm class animate, nơi mà bạn viết css cho trang web.
## Giới thiệu Bootstrap Carousel
Bootstrap Carousel gồm có 3 phần chính:
1. **Carousel indicators**: giúp bạn theo dõi số lượng trang của slide, cung cấp cho người dùng một cái nhìn trực quan về vị trí các trang sẽ trình bày cho người xem, và cung cấp chuyển hướng cho slide.
2. **Carousel item**: được đặt bên trong một wrapper container với tên class là `.carousel-inner`, đại diện cho từng slide riêng biệt. Bên trong mỗi item thì bạn sẽ đặt hình ảnh vào đó + caption cho từng slide. Bạn có thể đặt khá nhiều phần tử HTML vào bên trong class `.carousel-caption` và định nghĩa được các css trong Bootstrap.
3. **Carousel controls**: chính là các mũi tên chuyển hướng, cho phép người dùng truy cập các trang slide tiếp theo và trước nó.

    ![](https://images.viblo.asia/59875e71-ba9f-4c13-af60-c39cb5e405fe.jpg)
    
Để đơn giản hóa bản demo này, mình sẽ không thêm hình ảnh vào carousel mà tập trung vào việc thêm animate cho các carousel caption.
# Xây dựng ứng dụng
Bước đầu tiên thì bạn nên thêm những thư viện sau vào project của mình:

* [ jQuery](http://jquery.com/)
* [Bootstrap's CSS và Javascript](http://getbootstrap.com/docs/4.0/getting-started/download/)
* [Animate.css](https://github.com/daneden/animate.css)
* Một stylesheet hay Javascript nơi mà bạn viết code css và js của mình.
## Xây dựng cấu trúc HTML
Dưới đây là code Bootstrap Carousel:

```html
<!-- indicators -->
<div id="carouselExampleIndicators" class="carousel slide">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>

    <!-- carousel content -->
    <div class="carousel-inner">
        <!-- first slide -->
        <div class="carousel-item active">
            <img class="d-block w-100" src="..." alt="First slide">
            <div class="carousel-caption d-md-block">
                <h3 data-animation="animated bounceInLeft">
                    This is the caption for slide 1
                </h3>
                <button class="btn btn-primary btn-lg" data-animation="animated zoomInUp">Button</button>
          </div>
        </div>

        <!-- second slide -->
        <div class="carousel-item">
            <img class="d-block w-100" src="..." alt="Second slide">
            <h3 data-animation="animated bounceInRight">
                    This is the caption for slide 2
            </h3>
            <button class="btn btn-primary btn-lg" data-animation="animated zoomInUp">Button</button>
        </div>

        <!-- third slide -->
        <div class="carousel-item">
            <img class="d-block w-100" src="..." alt="Third slide">
            <h3 data-animation="animated bounceInDown">
                    This is the caption for slide 3
            </h3>
             <button class="btn btn-primary btn-lg" data-animation="animated zoomInUp">Button</button>
        </div>
    </div>

    <!-- controls -->
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
```
Trong đoạn demo này thì mình không điền link ảnh, các bạn nhớ điền vào để demo được nhé.

Các phần tử bên trong carousel caption có chứa thuộc tính `data-animation` với tên lớp hiệu ứng cụ thể như `bounceInLeft, bounceInRight, bounceInDown`, ngoài ra bạn có thể tìm hiểu trong Animate.css và thử nghiệm với các hiệu ứng hay ho khác. Sau đó mình sẽ dùng js để lấy ra những hiệu ứng đó và apply cho từng phần tử. 
## Thêm CSS vào Carousel
Phần này thì các bạn có thể sáng tạo tùy ý thích. Đây là đoạn css mình viết để demo:
```css
.carousel-caption h3 {
  animation-delay: 1s;
}

.carousel-caption button {
  animation-delay: 2s;
}

.carousel-item img {
  opacity: 0.8;
}
```

Cụ thể hơn là mình đang định nghĩa cho các caption thuộc tính `animation-delay` để xác định thời điểm bắt đầu của từng caption.

## Viết jQuery
Hãy bắt đầu bằng việc khởi tạo một Carousel. Trong file Javascript của bạn, thêm đoạn code dưới đây
```javascript
    var $myCarousel = $('#carouselExampleIndicators');

    // Initialize carousel
    $myCarousel.carousel();
```

Rồi vậy là phần slide đã hoạt động. Bạn chỉ việc thêm hiệu ứng nữa thôi.

Để tạo hiệu ứng caption cho slide đầu tiên, script phải được kích hoạt ngay khi trình duyệt kết thúc việc load trang. Tuy nhiên việc tạo hiệu ứng cho các trang tiếp theo, bạn sẽ phải gọi đến sự kiện `slide.bs.carousel`. Điều này có nghĩa là 1 đoạn mã code sẽ được sử dụng 2 lần: lúc tải trang và lúc gọi sự kiện `slide.bs.carousel`.

Để tránh việc lặp lại, bạn viết mã của mình bên trong 1 hàm và sau đó chỉ việc gọi hàm đó như sau:

```javascript
function doAnimations(elems) {
    var animEndEv = 'webkitAnimationEnd animationend';

    elems.each(function () {
        var $this = $(this),
        //lấy loại animation 
        $animationType = $this.data('animation');

        // thêm class animate.css vào phần tử
        // xóa class animate.css khi phần tử đã thực hiện animate 1 lần
        $this.addClass($animationType).one(animEndEv, function () {
            $this.removeClass($animationType);
        });
    });
}

// Chọn phần tử thực hiện animate ở lần đầu tiên khi load trang
var $firstAnimatingElems = $myCarousel.find('.carousel-item:first')
    .find('[data-animation ^= "animated"]');

// Apply animate sử dụng hàm doAnimations()
doAnimations($firstAnimatingElems);

// Gọi function doAnimations cả ở trong sự kiện slide.bs.carousel
$myCarousel.on('slide.bs.carousel', function (e) {
  // Chọn phần tử thực hiện animate bên trong slide đã active
    var $animatingElems = $(e.relatedTarget)
        .find("[data-animation ^= 'animated']");
    doAnimations($animatingElems);
});
```

Bạn có thể tham khảo ở https://github.com/daneden/animate.css để hiểu rõ từng đoạn code về animation.

Vậy là mình đã hoàn thiện bản demo này:
{@codepen: https://codepen.io/boo_uett/pen/bMXVjE}
# Kết luận
Như các bạn đã thấy, việc thêm Bootstrap Carousel vào trang web là rất đơn giản, bạn chỉ phải chú ý các thành phần nó cung cấp và thêm vào HTML cho đúng.

Bài viết này mình chỉ giới thiệu cách thêm 1 số hiệu ứng động Animate.css với một vài dòng jQuery cơ bản vào Bootstrap Carousel. Các bạn có thể đọc document và thêm nhiều option hay để làm cho trang web của mình thêm phong phú.

Mình xin kết thúc bài viết ở đây, cảm ơn các bạn đã đón đọc!
# Tham khảo
> Spicing Up the Bootstrap Carousel with CSS3 Animations: https://www.sitepoint.com/bootstrap-carousel-with-css3-animations/