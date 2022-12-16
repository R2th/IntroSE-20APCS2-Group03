## Component

### Navigation
```
var mySwiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-next',
    prevEl: '.swiper-prev',
  },
});
```

#### nextEl: String
Chuỗi CSS selector hoặc phần tử HTML hoạt động như nút "next" sau khi click vào nó

#### prevEl:String
Chuỗi CSS selector hoặc phần tử HTML hoạt động như nút "prev" sau khi click vào nó

#### hideOnClick: boolean
Chuyển đổi chế độ hiển thị các nút điều hướng sau khi click vào vùng chứa của Slider

#### disabledClass: String
Tên class CSS được thêm vào nút điều hướng khi nó bị vô hiệu hóa

#### hiddenClass: String
Tên class CSS được thêm vào nút điều hướng khi nó bị ẩn

### Scrollbar
```
var mySwiper = new Swiper('.swiper-container', {
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
});
```

### Autoplay
```
var mySwiper = new Swiper('.swiper-container', {
  autoplay: {
    delay: 5000,
  },
});
```

### Parallax
Swiper hỗ trợ các hiệu ứng chuyển tiếp parallax cho các phần tử swiper / slide được lồng vào nhau.
Để bật hiệu ứng parallax, bạn cần khởi tạo Swiper với thông số parallax: true và thêm option bên dưới:
* data-swiper-parallax: cho phép chuyển đổi và dịch chuyển parallax. Thuộc tính này có thể chấp nhận:
    - number: đơn vị px
    - percentage: đơn vị %
* data-swiper-parallax-x: tương tự nhưng đối với hướng trục x
* data-swiper-parallax-y: tương tự nhưng đối với hướng trục y
* data-swiper-parallax-scale: tỷ lệ của phần tử parallax khi nó ở trạng thái "disabled"
* data-swiper-parallax-opacity: độ mờ của phần tử parallax khi nó ở trạng thái "disabled" 
* data-swiper-parallax-duration: thời lượng chuyển đổi tùy chỉnh cho các phần tử parallax

```
<div class="swiper-container">
  <div class="parallax-bg" style="background-image:url(path/to/image.jpg)" data-swiper-parallax="-23%">
  </div>
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <!-- Tiêu đề slide -->
      <div class="title" data-swiper-parallax="-100">Slide 1</div>
      <!-- Tiêu đề con -->
      <div class="subtitle" data-swiper-parallax="-200">Subtitle</div>
      <!-- Custom transition duration -->
      <div class="text" data-swiper-parallax="-300" data-swiper-parallax-duration="600">
        <p>Lorem ipsum dolor sit amet, ...</p>
      </div>
      <!-- Opacity parallax -->
      <div data-swiper-parallax-opacity="0.5">Thay đổi opacity</div>
      <!-- Scale parallax -->
      <div data-swiper-parallax-scale="0.15">Thay đổi scale</div>
    </div>
    ...
  </div>
</div>
```

### Lazy Loading
```
<div class="swiper-container">
  <div class="swiper-wrapper">

    <!-- Lazy image -->
    <div class="swiper-slide">
      <img data-src="path/to/picture-1.jpg" class="swiper-lazy">
      <div class="swiper-lazy-preloader"></div>
    </div>

    <!-- Lazy image với srscet-->
    <div class="swiper-slide">
      <img data-src="path/to/logo-small.png" data-srcset="path/logo/logo-large.png 2x" class="swiper-lazy">
      <div class="swiper-lazy-preloader"></div>
    </div>

    <!-- Ảnh nền -->
    <div class="swiper-slide">
      <div data-background="path/to/picture-2.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </div>
    </div>

    <!-- Ảnh nền trên slide-->
    <div data-background="path/to/picture-3.jpg" class="swiper-slide swiper-lazy">
      <div class="swiper-lazy-preloader"></div>
    </div>
  </div>
</div>
```

#### loadPrevNext: Boolean 
Đặt thành "true" để cho phép tải chậm cho các hình ảnh slide gần nhất (đối với các hình ảnh slide trước và tiếp theo)

#### loadPrevNextAmount: number
Số lượng trang chiếu tiếp theo / trước để tải trước hình ảnh chậm. Không thể ít hơn slidesPerView

#### loadOnTransitionStart: boolean
Theo mặc định, Swiper sẽ tải hình ảnh chậm sau khi chuyển sang trang chiếu này, vì vậy bạn có thể bật tham số này nếu bạn cần nó để bắt đầu tải hình ảnh mới khi bắt đầu chuyển đổi


### Thumbs
```
var mySwiper = new Swiper('.swiper-container', {
  ...
  thumbs: {
    swiper: {
      el: '.swiper-container-thumbs',
      slidesPerView: 5,
      ...
    }
  }
});
```

### Zoom
Swiper hỗ trợ chức năng thu phóng hình ảnh (tương tự như những gì bạn thấy trên iOS khi duyệt ảnh đơn lẻ) nơi bạn có thể phóng to hình ảnh bằng cử chỉ thu hoặc phóng to / thu nhỏ bằng cách chạm hai lần vào nó. 

HTML: 
```
<div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="swiper-zoom-container">
                <img src="path/to/image1.jpg">
            </div>
        </div>
        <div class="swiper-slide">
            <div class="swiper-zoom-container">
                <img src="path/to/image2.jpg">
            </div>
        </div>
        <div class="swiper-slide">Plain slide with text</div>
        <div class="swiper-slide">
            <!-- Ghi đè tham số maxRatio -->
            <div class="swiper-zoom-container" data-swiper-zoom="5">
                <img src="path/to/image1.jpg">
            </div>
        </div>
    </div>
</div>
```


Cấu hình: 
```
var mySwiper = new Swiper('.swiper-container', {
  zoom: {
    maxRatio: 5,
  },
});
```

### Example
{@embed: https://codepen.io/kylie-kriss/pen/aboPOoq}
Tham khảo https://swiperjs.com/