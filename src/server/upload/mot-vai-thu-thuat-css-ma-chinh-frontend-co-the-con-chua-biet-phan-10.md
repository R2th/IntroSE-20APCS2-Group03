![](https://images.viblo.asia/552a7d8d-5d0b-4ac6-ad1e-70b54cace206.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 10 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Sức mạnh của dấu `&` trong SASS

#### 1.1. Kết hợp với BEM rất hiệu quả

Giả sử để có 1 output CSS như thế này:

```css
.component { ... }
.component__title { ... }
.component__title--small { ... }
.component__box { ... }
.component__box-content { ... }
```

Thì trong code SASS của chúng ta sẽ chỉ cần viết selector lồng nhau (nesting) ngắn gọn như thế này thôi:

```scss
.component {
    { ... }
    &__title {
        // & = ".component"
        &--small {
            // & = ".component__title"
        }
    }
    &__box {
        // & = ".component"
        &-content {
            // & = ".component__box"
        }
    }
}
```

#### 1.2. Sử dụng `&` với các selector  `>`, `+`, `~`

Ở [phần 1 của series này](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-1-3Q75wppeKWb#_3-selector-not-2), mình có giới thiệu 1 tip về selector `:not` trong trường hợp tạo border phân cách giữa các navigation item, mình tiếp tục phân tích trường hợp đó nhé!

Mình đã chọn những item **không phải là cuối cùng** và set `border-right`

```scss
.nav-item {
    { ... }
    
    &:not(:last-child) {
      border-right: 1px solid black;
    }
}

// .nav-item:not(:last-child) { ... }
```

Mình sẽ chọn lại những item **không phải là đầu tiên** và set `border-left`

```scss
.nav-item {
    { ... }
    
    &:not(:first-child) {
      border-left: 1px solid black;
    }
}

// .nav-item:not(:first-child) { ... }
```

Chắc chắn kết quả cho ra là tương tự

Và mình lại có thêm 1 cách ngắn gọn hơn nữa thay vì gõ `:not(:first-child)`, giờ chỉ cần `& + &`

```scss
.nav-item {
    { ... }
    
    & + & {
      border-left: 1px solid black;
    }
}

// .nav-item + .nav-item { ... }
```

#### 1.3.  Style thêm cho component ở những ngữ cảnh khác nhau

> Theo Documentation của SASS nó định nghĩa là **[Referencing Parent Selectors](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#parent-selector)**

Nói để dễ hiểu như thế này,

Mình có 3 page **Home**, **Contact** và **About**, bắt đầu ở mỗi trang mình có 1 class wrapper đặt tên lần lượt là `home-wrapper`, `contact-wrapper` và `about-wrapper`

Mình có component là button được tô màu background là đỏ

Và ở trang **About** mình lại cần button được tô màu background là vàng

Thì lúc này mình sẽ viết code SASS như sau:

```scss
button {
    background-color: red;
    
    .about-wrapper & {
        background-color: yellow;
    }
}

// => button { background-color: red; }
// => .about-wrapper button { background-color: yellow; }
```

Với cách viết như thế này rất là có lợi cho việc maintain code về sau.

#### References:

- https://css-tricks.com/the-sass-ampersand/
- https://css-tricks.com/sass-techniques-from-the-trenches/#article-header-id-0


### 2.  `:initial-letter` quả thực lợi hại! [Not Cross-Browsers]

Đã bao giờ bạn gặp layout kiểu trang báo, tin tức có chữ **in hoa to đùng** ở đầu tiêu đề chưa ạ?

Giống như chữ **T** trong cái tiêu đề "Talking to your....." như hình bên dưới

![alt](https://res.cloudinary.com/css-tricks/image/fetch/q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2017/01/initial-letter-newyorker.png)

Bạn sẽ nghĩ ngay đến thuộc tính `::first-letter` để style cho chữ T ở trên, nhưng thật tiếc là với pseudo element trên không đủ để có thể CSS giống được như hình.

{@codepen: https://codepen.io/tinhh/pen/aMPzGY}

Mình cũng chỉ tác động được `color` hay là `padding` cho chữ cái đầu tiên thôi, không thể nào set `font-size` bằng với **số dòng text** như mong muốn được.

Nhưng thật là may khi CSS mới cho ra đời 1 thuộc tính mới gọi là [initial-letter](https://drafts.csswg.org/css-inline/#sizing-drop-initials), chỉ tiếc là nó còn đang trong giai đoạn draft và hiện tại mới chỉ work trên Safari.

> Bạn hãy mở bài viết này xem trên Safari nhé!

{@codepen: https://codepen.io/tinhh/pen/jJXOXg}

Nếu bạn đang xem đúng với tấm hình bên dưới, thì tức là thuộc tính `initial-letter` của chúng ta đã work ok rồi đó!

![](https://images.viblo.asia/6febcd72-b4fb-49fa-b21b-c20218815580.png)

#### References:
- https://caniuse.com/#feat=css-initial-letter
- https://css-tricks.com/almanac/properties/i/initial-letter/
- https://webdesign.tutsplus.com/tutorials/better-css-drop-caps-with-initial-letter--cms-26350

### 3. Trò chơi vui với `transform: scaleX(-1)`

Đã bao giờ bạn nghĩ đến việc đưa thanh scrollbar qua bên trái, thay vì bên phải chưa nhỉ 😃.

Hơi có chút điên rồ, nhưng giả sử bạn đang xây dựng cho mình 1 trang Portfolio độc và lạ, thì việc biến tấu UI để làm nó đi ngược với khái niệm UX 1 chút đôi khi lại thành cái hay!!!

Với 2 step đơn giản:

1. Set `transform: scaleX(-1)` ở thẻ parent, scrollbar move sang trái, nhưng hướng text bị ngược từ right to left
2. Set thêm tiếp `transform: scaleX(-1)` thì hướng text quay lại chuẩn từ left to right :smile: 

{@codepen: https://codepen.io/tinhh/pen/VRqvyW}

Có vẻ như còn nhiều cách khác để làm được như trên, hãy tham khảo thêm [Tweet này](https://twitter.com/chordbug/status/1101645780962734081), cũng như là chú ý đọc tất cả các comment phía dưới để biết thêm nhiều cách 😃

#### References:

- https://twitter.com/chordbug/status/1101645780962734081

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!