Swipper Slider là một thư viện tạo slider một cách dễ dàng, nhanh chóng mà không cần cài đặt nhiều. 

## Cài đặt
### Sử dụng npm 
```
$ npm install swiper
```
### Cài qua cdn
```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.x.x/css/swiper.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.x.x/js/swiper.min.js"></script>
```

## Cú pháp cơ bản
Thêm đoạn mã dưới vào HTML
```
<div class="swiper-container">
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        ...
    </div>
    <!-- Nếu cần pagination -->
    <div class="swiper-pagination"></div>

    <!-- Nếu cần navigation -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- Nếu cần scrollbar -->
    <div class="swiper-scrollbar"></div>
</div>
```

Thêm css cố định khung slide
```
.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}
```

Cuối cùng thêm JS
```
var mySwiper = new Swiper ('.swiper-container', {
    // Các Parameters
    direction: 'vertical',
    loop: true,

    // Nếu cần pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Nếu cần navigation
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Nếu cần scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })
```

## Navigation
Dưới đây là các thuộc tính custom của navigation
### nextEl: String
Chuỗi CSS selector hoặc phần tử HTML sẽ hoạt động như nút "next" sau khi click vào nó
### prevEl: String
Chuỗi CSS selector hoặc phần tử HTML sẽ hoạt động như nút "prev" sau khi click vào nó
### hideOnClick: boolean
Chuyển đổi chế độ hiển thị các nút điều hướng sau khi click vào container của Slider
### disabledClass: 'swiper-button-disabled'
Tên class CSS được thêm vào nút điều hướng khi nó bị disabled
### hiddenClass: 'swiper-button-hidden'
Tên class CSS được thêm vào nút điều hướng khi nó bị hidden

## Component
### Pagination
#### el: String
Chuỗi CSS selector hoặc phần tử HTML của container có phân trang

#### type: 'bullets', "fraction", "progressbar" hoặc "custom"
Chuỗi với kiểu phân trang. Có thể là "bullets", "fraction", "progressbar" hoặc "custom"

#### bulletElement: String
Xác định thẻ HTML nào sẽ được sử dụng để thể hiện dấu đầu dòng phân trang. Chỉ dành cho type: 'bullets'.

#### dynamicBullets:boolean
Chỉ hiển thị một vài bullets có thể nhìn thấy cùng một lúc.

#### dynamicMainBullets	: number
Số bullets chính có thể nhìn thấy khi enable dynamicBullets.

#### hideOnClick:boolean	
Chuyển đổi khả năng hiển thị vùng chứa phân trang (hide / true) sau khi click vào container của Slider

#### clickable: boolean	
Nếu giá trị là true thì click vào nút phân trang sẽ chuyển sang slide phù hợp. Chỉ dành cho type: 'bullets'.

#### bulletClass: string
Tên class của mỗi bullet

#### bulletActiveClass: string
Tên class của bullet đang được active

#### clickableClass: string
Tên class của pagination khi được click vào

#### lockClass: string
Tên class của pagination khi bị disabled


## Ví dụ (hiệu ứng 3D)
{@embed: https://codepen.io/kylie-kriss/pen/qBWawMX}