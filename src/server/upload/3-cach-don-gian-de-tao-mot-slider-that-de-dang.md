## 1. Giới thiệu
Xin chào các bạn, rất vui được gặp lại các bạn mỗi tháng 1 lần. Như thường lệ với mỗi bài chia sẻ thì mình sẽ chia sẻ về vấn đề mà mình tìm hiểu được, có thể giúp ích cho một số bạn chưa biết:grinning:. Mình rất vui khi được chia sẻ với mọi người.

Nếu các bạn hay lên các trang website thường mạng điện tử bán hàng, doanh nghiệp... thì các bạn hay thấy phần đầu trang web thường có một khoảng show hình ảnh, video, gif được thay đổi liên tục, đây được gọi là những slider. Việc sử dụng slider có tác dụng rất lớn là thu hút sự chú ý của khách hàng.  Người quản trị trang web thường hay đặt các nội dung quan trọng trong một slider ở ngay đầu website giúp cho người dùng nhanh chóng nhìn thấy điểm nổi bật của website.

Slider thì thường thay đổi trong một khoảng thời gian nhất định (thường là 4 đến 5s). Người dùng cũng có thể thao tác trực tiếp trên website  là bấm chuột hay vuốt để xem các slide tiếp theo hoặc prev về slide trước đó.

Đối với một lập trình viên thì chắc không còn xa lạ gì với chức năng này nhỉ. Ngày hôm nay thì mình sẽ hướng dẫn vài cách để tạo một slide nhanh, đơn giản nhé:+1:
## 2. Những cách tạo một slider
### 2.1 Sử dụng bootstrap
Cách 1: Ở đây mình muốn giới thiệu với các bạn slider mà bootstrap hỗ trợ chúng ta.

Các bạn muốn sử dụng slider có sẵn của boostrap thì các bạn cần lên trang https://getbootstrap.com tải boostrap về hoặc có thể dùng link trực tiếp trên đến trang bootstrap để lấy js, css dán vào  trang web là chúng ta có thể sử dụng slider mà ko phải code css hay js nhé.

```
  <div class="bd-example">
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="image1.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="image2.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="image3.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
```
Ở đây mình giải thích sơ qua các phần để show ra 1 slider:

-  .carousel-inner đây là phần bao bọc các div chứa item hình ảnh, caption từng ảnh mà chúng ta muốn hiển thị.
-  .carousel-indicators đây là phần chứa những link điều hướng mà chúng ta muốn kích đền slide show hình ảnh muốn đến. Thường thường ở đây là hiện những icon chấm chòn hoặc icon chỉ số slide.
- .carousel-control-prev . carousel-control-next đây là phần chứa link prev hoặc next qua lại các slide.


 Ngoài ra các bạn muốn thêm caption cho mỗi hình ảnh thì chúng ta thêm một div  có nội dung vào sau mỗi thẻ img.
```
 <div class="carousel-caption d-none d-md-block">
    <h5>Tiêu đề caption</h5>
    <p>Nội dung caption</p>
 </div>
```

Rất đơn giản phải không nào, tiếp tục đến cách thứ 2 mình sẽ hướng dẫn các bạn sử dụng css, js thuần để code ra một slider, ở cách này đòi hỏi các bạn có kiến thức cơ bản về html,css,js nhé. Không khó đâu hãy tiếp tục theo dõi nhé!
### 2.2 Sử dụng html, css, js thuần
Ở cách thứ 2 chúng ta tự code ra slider chạy, các bạn tạo cho mình 3 file `index.html`, `style.css`, `javascript.js`:

- File `style.css` các bạn sử dụng css để căn chỉnh kích thước slider cũng như vị trí các ảnh, nút next, prev:

```
* {
  box-sizing: border-box
}

body {
  font-family: Verdana, sans-serif; margin:0
}

.mySlides {
  display: none
}

img {
  vertical-align: middle;
}

.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@media only screen and (max-width: 300px) {
  .prev, .next,.text {font-size: 11px}
}
```
- File` index.html` nơi chứa code html tĩnh, ở đây các bạn dẫn dẫn link hình ảnh đến image...
```
<div class="slideshow-container">
  <div class="mySlider fade">
    <img src="image1.jpg" style="width:100%" />
    <div class="text">Caption Text</div>
  </div>
  <div class="mySlider fade">
    <img src="image2.jpg" style="width:100%" />
    <div class="text">Caption Two</div>
  </div>
  <div class="mySlider fade">
    <img src="image3.jpg" style="width:100%" />
    <div class="text">Caption Three</div>
  </div>
  <a class="prev" onclick="plusSlider(-1)">&#10094;</a>
  <a class="next" onclick="plusSlider(1)">&#10095;</a>
</div>
<div style="text-align:center">
  <span class="dot" onclick="currentSlider(1)"></span>
  <span class="dot" onclick="currentSlider(2)"></span>
  <span class="dot" onclick="currentSlider(3)"></span>
</div>
```
- File `javascript.js` nơi chúng ta tạo ra các sự kiện next ảnh, prev ảnh:
```
var slideIndex = 1;
showSlider(slideIndex);

function plusSlider(n) {
  showSlider(slideIndex += n);
}

function currentSlider(n) {
  showSlider(slideIndex = n);
}

function showSlider(n) {
  var i;
  var slider = document.getElementsByClassName("mySlider");
  var dots = document.getElementsByClassName("dot");
  if (n > slider.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slider.length}
  for (i = 0; i < slider.length; i++) {
      slider[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slider[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

```

Ok rất dài dòng đúng không bạn. Với cách này thì các bạn có thể dễ dàng tạo slider, hiệu ứng theo ý muốn của mình:stuck_out_tongue_closed_eyes:
### 2.3 Sử dụng gem
Tại sao ở đây mình lại nói sử dụng gem nhỉ? Ở đây mình cũng giới thiệu với các bạn là mình là một backend Ruby(Ruby on Rails) nhé. Mình khuyên các bạn là chúng ta nên thử sức với ngôn ngữ này nhé, nó rất dễ học tập, sử dụng. Khi chúng ta muốn làm một chức năng nào đó thì framework của Ruby là Ruby on Rails có rất nhiều các gem hỗ trợ khi chúng ta muốn lập trình.

Ví dụ một số gem hỗ trợ như: Phân trang(gem "kaminari"), đăng nhập(gem "devise", "omniauth", "omniauth-google-oauth2"), phân quyền(gem "cancancan")...Và còn vô vàn những gem khác nhé, bài hôm nay mình muốn chia sẻ về một gem hỗ trợ tạo slide là gem "lex-slider-rails".

Muốn sử dụng gem này thì project ruby on rails của các bạn các bạn add gem bên dưới và chạy lệnh **bundle install** để cài đặt gem.
```
gem 'bootstrap-sass', '~> 3.4.1'
gem 'jquery-rails'
gem 'flex-slider-rails'
```
Để  `gem 'flex-slider-rails'` hoạt động được thì chúng ta cũng cần phải chạy các `gem 'bootstrap-sass'`,` gem 'jquery-rails' `để add bootstrap và jquery vào project nhé.

Ở thư mục `application.css` các bạn thêm cho mình dòng `*= require flexslider`

Ở thư mục `application.js` các bạn thêm cho mình dòng
`//= require jquery.flexslider`  và một đoạn code js như ở dưới nhé.
```
$(document).on("turbolinks:load", function() {
  $('.flexslider').flexslider();
});
```
Ok đến đây cơ bản là đã hoàn thành bước cài đặt rùi các bạn muốn sử dụng slider ở đâu thì chỉ cần thêm đoạn code html như ở dưới là chúng ta có 1 slider để sử dụng.

```
<div class="flexslider">
  <ul class="slides">
    <li>
      <img src="image1.jpg" />
    </li>
    <li>
      <img src="image2.jpg" />
    </li>
    <li>
      <img src="image3.jpg" />
    </li>
  </ul>
</div>
```

Kết quả của 3 cách trên đều là chúng ta tạo được một slider hoạt động. Rất đơn giản phải không nào và dưới đây là thành quả của mình.

![](https://images.viblo.asia/93d82d59-ca39-41b0-9e60-e952084b1195.png)

## 3. Kết luận
Ok. Đến đây mình xin được kết thúc phần chia sẻ của mình. Hẹn gặp lại các bạn vào lần chia sẻ tháng sau nhé. Nếu yêu thích bài viết hãy vote :100: cho mình nhé!

Link tham khảo:

+  https://getbootstrap.com/docs/4.3/components/carousel/#how-it-works
+  https://github.com/sadiqmmm/flex-slider-rails