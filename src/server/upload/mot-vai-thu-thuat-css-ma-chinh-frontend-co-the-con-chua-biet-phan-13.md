![](https://images.viblo.asia/ff7f6f93-e2cb-42e9-9918-197bd25385dd.jpeg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 13 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Chọn "thằng con duy nhất" bằng nhiều cách

Về CSS Selector với children element, trước đây mình cũng đã chia sẻ 1 vài tip về [chọn những thằng con ngoại trừ thằng cuối](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-1-3Q75wppeKWb#_3-selector-not-2) hoặc là [chọn những thằng con từ thứ mấy đến thứ mấy](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-2-1VgZvwQMlAw#_1-select-items-using-negative-nth-child-0)

Nay mình tiếp tục chia sẻ cho các bạn thêm 1 tip nữa, đó là cách chọn **thằng con duy nhất**, tức là mình sẽ select tới element là children và chỉ đứng 1 mình nó thôi nhé!

Mình chắc rằng nhiều bạn dev sẽ làm theo cách sau, đó là chọn `:first-child` kết hợp thêm `:last-child`

{@codepen: https://codepen.io/tinhh/pen/RzVgea}

Nhưng đấy chưa phải là cách duy nhất, chúng ta còn thêm vài cách khác nữa nha

Cách tiếp theo là sử dụng selector ngắn gọn nhất đó là `:only-child`. Mình nghĩ nhiều bạn còn không biết có tồn tại selector này nữa cơ :smiley: 

{@codepen: https://codepen.io/tinhh/pen/VJbyor}

Và chúng ta có thêm 1 cách nữa đó là kết hợp `:nth-child(1)` và `:nth-last-child(1)`

{@codepen: https://codepen.io/tinhh/pen/gNWvYd}

> Các cách trên đều Cross Browsers tốt hết nha mọi người. Xem thêm trên [Can I Use](https://caniuse.com/#feat=css-sel3)

#### Đọc hiểu thêm
- https://css-tricks.com/almanac/selectors/o/only-child/
- https://dev.to/samanthaming/css-only-child-1j6d
- https://developer.mozilla.org/en-US/docs/Web/CSS/:only-child

### 2. Vẽ pie chart với `conic-gradient` [Not Cross-Browsers]

`linear-gradient` hay `radial-gradient` thì nhiều bạn dev đã nghe và có thể đã sử dụng qua rồi. Còn `conic-gradient` thì chắc hẳn nghe lạ lắm phải không?

![Image from CSS Trick](https://res.cloudinary.com/css-tricks/image/upload/c_scale,w_1000,f_auto,q_auto/v1505433383/conic-radial-gradient-compare_r4niij.png)

Hình trên là mô tả về sự khác biệt giữa `conic-gradient` và `radial-gradient`

Qua hình trên, bạn có thể phần nào hình dung được cách mà `conic-gradient` vẽ được pie chart rồi đó. Hãy đi tiếp về phần cú pháp của nó nhé:

Chúng ta có những cách viết như sau:

```css
.conic-gradient {
  /* Original example */
  background-image: conic-gradient(#fff, #000);
  /* Explicitly state the location center point */
  background: conic-gradient(at 50% 50%, #fff, #000);
  /* Explicitly state the angle of the start color */
  background: conic-gradient(from 0deg, #fff, #000);
  /* Explicitly state the angle of the start color and center point location */
  background: conic-gradient(from 0deg at center, #fff, #000);
  /* Explicitly state the angles of both colors as percentages instead of degrees */
  background: conic-gradient(#fff 0%, #000 100%);
  /* Explicitly state the angle of the starting color in degrees and the ending color by a full turn of the circle */
  background: conic-gradient(#fff 0deg, #000 1turn);
}
```

Mình thử vẽ pie chart gồm 3 màu red, green, blue theo cú pháp `background: conic-gradient(red 33%, green 33% 66%, blue 66%)` thử nhé!

{@codepen: https://codepen.io/tinhh/pen/agWqGV}

Yeah! Vậy là bạn đã vẽ được 1 simple pie chart với chỉ 1 dòng CSS ngắn gọn, quá power luôn!

Nhưng không dừng lại ở đó, `conic-gradient` còn có thể làm nhiều thứ khác như:

{@codepen: https://codepen.io/tinhh/pen/ydbvRV}

{@codepen: https://codepen.io/tinhh/pen/NZjyEG}

Đây là thuộc tính mới, còn đang trong giai đoạn phát triển, nên để ứng dụng được ngay vào project của bạn thì sẽ cần đến [Polyfill này nhé!](https://leaverou.github.io/conic-gradient/)

#### Đọc hiểu thêm
- https://css-tricks.com/snippets/css/css-conic-gradient/
- https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient
- https://alligator.io/css/conic-gradients/
- https://leaverou.github.io/conic-gradient/
- https://caniuse.com/#feat=css-conic-gradients

### 3. Fill màu gradient cho text [Not Cross-Browsers]

Lại 1 tip nữa liên quan đến gradient, lần này là fill màu gradient cho text, thử hỏi ngay lúc này, bạn đã nghĩ ra cách phải làm bằng cách nào chưa nhỉ?

Rất là đơn giản luôn, đó là chúng ta phải có khai báo `background: linear-gradient()` kết hợp với 2 thuộc tính quan trọng là `-webkit-text-fill-color: transparent` và `-webkit-background-clip: text`

Hãy thử xem demo bên dưới nhé!

{@codepen: https://codepen.io/tinhh/pen/MMmGyL}

#### Đọc hiểu thêm
- https://css-tricks.com/snippets/css/gradient-text/
- https://stackoverflow.com/a/37832318/4485780
- https://dev.to/paramharrison/gradient-text-style-using-css-11ka
- https://caniuse.com/#feat=text-stroke

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!