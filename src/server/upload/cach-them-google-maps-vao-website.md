- Khi xây dựng một trang web, bạn thường thêm một bản đồ để cho mọi người có trải nghiệm tốt hơn về phương hướng. Google Maps là dịch vụ lập bản đồ phổ biến nhất hiện nay và nó cung cấp nhiều công cụ và tiện ích khác nhau mà bạn có thể sử dụng.
- Trong bài này,  tôi sẽ chỉ cho bạn cách dễ dàng thêm bản đồ vào trang web của bạn và tùy chỉnh nó bằng thư viện gMaps.js. Đây là một thư viện đơn giản và dễ sử dụng, cho phép bạn sử dụng toàn bộ khả năng của Google Maps mà không cần sử dụng số lượng lớn code.


## Giới thiệu


- Để chứng minh việc sử dụng Google Maps, tôi đã tạo ra một thiết kế đơn giản bằng HTML và Bootstrap 4. Bạn có thể kiểm tra hình ảnh bên dưới để biết kết quả cuối cùng.

![](https://images.viblo.asia/4fbed69b-009d-4a87-8e64-34345e2cb28d.png)


## Giao diện

- Thiết kế của chúng tôi bao gồm một hàng Bootstrap và hai cột. Ở cột bên trái, chúng tôi hiển thị bản đồ Google và ở cột bên phải, chúng tôi có các tiêu đề, với một số văn bản, icons font awesome và một số hình ảnh.

```
<div class="map-example">
    <div class="row">
        <div class="col-lg-6">
            <div id="map"></div>
        </div>
        <div class="col-lg-6">
            <div class="heading">
                <h3>Lorem Ipsum Dolor</h3>
                <div class="rating">
                    <i class="fa fa-star icon"></i>
                    <i class="fa fa-star icon"></i>
                    <i class="fa fa-star icon"></i>
                    <i class="fa fa-star icon"></i>
                    <i class="fa fa-star-o icon"></i>
                </div>
            </div>
            <div class="info">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare leo porta cursus porttitor. Proin quis tempor lectus. Cras sodales nisi ut felis tincidunt suscipit. Nullam consectetur odio et lacus tempor vestibulum.</p>
                <p>Aenean convallis, tortor eget vehicula vestibulum, sem nibh rutrum sem, vel sodales nisl velit eu ex. Sed hendrerit efficitur sollicitudin. Maecenas tempus augue lacus.</p>
            </div>
            <div class="gallery">
                <h4>Photos</h4>
                <div class="row">
                    <div class="col-md-4">
                        <a href="assets/img/image2.jpg"><img class="img-fluid image" src="assets/img/image2.jpg"></a>
                    </div>
                    <div class="col-md-4">
                        <a href="assets/img/image3.jpg"><img class="img-fluid image" src="assets/img/image3.jpg"></a>
                    </div>
                    <div class="col-md-4">
                        <a href="assets/img/image4.jpg"><img class="img-fluid image" src="assets/img/image4.jpg"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Cấu hình Maps

- Để sử dụng Google Maps, bạn cần nhập thư viện gMaps.js và API Google Maps. Bạn cần một khoá học về Google Maps API, để bạn có thể sử dụng nó, nếu không biết bạn có thể truy nhâp vào [ link này](https://developers.google.com/maps/documentation/javascript/get-api-key) để tìm hiểu về nó . Khi bạn đã có đủ kiến thức chỉ cần thay thế phần "YOUR_API_KEY" vào đoạn script

```
<script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gmaps.js/0.4.25/gmaps.js"></script>
```

- Bây giờ chúng ta cần tạo bản đồ. Chúng tôi tạo một đối tượng bản đồ mới và tham số ,chúng tôi đặt selector ('#map'), và vĩ độ và kinh độ của điểm chúng tôi muốn hiển thị trên bản đồ.

- Tiếp theo chúng ta cần thêm một điểm đánh dấu trên bản đồ. Để làm như vậy, sử dụng phương thức addMarker () với vĩ độ và kinh độ nơi bạn muốn đặt nó. Chúng ta cũng có thể đặt mức thu nhỏ phóng to ban đầu mà bản đồ được hiển thị bằng phương thức setZoom () với số nguyên làm tham số. Con số càng thấp, bản đồ càng "phóng to".

```
var map = new GMaps({
    el: '#map',
    lat:  40.730610,
    lng: -73.935242
});

map.addMarker({
    lat: 40.700610,
    lng: -73.997242,
    title: 'New York'
});

map.setZoom(8);
```

## Styles

-  Các styles css  được đặt trong một tệp CSS riêng. Vì tôi đang sử dụng Bootstrap, hầu hết các styles được thực hiện bởi framework bootstrap. Chúng ta cần thêm một số điều chỉnh về margin, padding, màu chữ, và box-shadown

```
.navbar.navbar-light.navbar-expand-lg.bg-white.page-navbar {
  box-shadow:0 4px 10px rgba(0, 0, 0, 0.1);
}

.navbar-light .navbar-nav .active > .nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show > .nav-link {
  font-weight:bold;
}

.nav-item.item {
  padding-right:2rem;
}

.navbar-nav:last-child .item:last-child, .navbar-nav:last-child .item:last-child a {
  padding-right:0;
}

.map-example .heading .icon {
  color:#ffb526;
}

.map-example {
  margin-top:50px;
  padding-bottom:100px;
}

.map-example .heading {
  margin-bottom:20px;
  border-bottom:1px solid #e4e4e4;
  padding-bottom:30px;
}

.map-example .info {
  margin-bottom:20px;
  border-bottom:1px solid #e4e4e4;
  padding-bottom:20px;
  color:#636363;
}

.map-example .gallery h4 {
  margin-bottom:30px;
}

.map-example .gallery .image {
  margin-bottom:15px;
  box-shadow:0px 2px 10px rgba(0, 0, 0, 0.15);
}

.map-example #map {
  height: 300px;
  margin-bottom: 20px;
}

.page-footer {
  padding-top:32px;
  border-top:1px solid #ddd;
  text-align:center;
  padding-bottom:20px;
}

.page-footer a {
  margin:0px 10px;
  display:inline-block;
  color:#282b2d;
  font-size:18px;
}

.page-footer .links {
  display:inline-block;
}

@media(min-width: 992px){
  .map-example #map{
    height: 500px;
  }
}
```

- Nhiều bạn kêu làm như tôi rồi sao vẫn ko hiện map. quan trọng là cái <script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY"></script> YOUR_API_KEY này nè, Cái này các bạn pải có account  và tạo Key để sử dụng . link hướng dẫn tạo key ở đây https://developers.google.com/maps/documentation/embed/get-api-key đọc từ chỗ  **Restrict the API key**.  Nhưng để active được key bạn pải mất 1 khoản pí https://developers.google.com/maps/documentation/maps-static/usage-and-billing

## Sử dụng Iframe

- Bạn sử dụng embed của googlemap : ban đầu bạn chọn nơi liên hệ của bạn trên google map rùi ấn vào nút share chọn embed copy link html thui rùi add vào web bạn như hình ảnh này nè
![](https://images.viblo.asia/bd11654a-1fba-4162-a7fa-1a2975a2d6f2.png)

## Kết Luận

- Tham khảo bài viết : 
    -  https://tutorialzine.com/2018/05/the-simplest-way-to-add-google-maps
    -  https://github.com/hpneo/gmaps
    -  https://developers.google.com/maps/documentation/javascript/get-api-key
- Link demo:  
   - https://demo.tutorialzine.com/2018/05/the-simplest-way-to-add-google-maps/
   - https://codepen.io/ngc-yn/pen/VoLaPZ
- Để lấy luôn google maps với các loại style khác nhau các bạn có thể xem plugin này : https://snazzymaps.com/explore