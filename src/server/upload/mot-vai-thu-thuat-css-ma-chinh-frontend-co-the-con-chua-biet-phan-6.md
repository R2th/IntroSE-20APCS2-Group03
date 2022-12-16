![](https://images.viblo.asia/496fc001-fdcc-457a-abff-241ab71e4c1c.png)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 6 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Sử dụng `box-sizing: border-box;` đúng cách

Đây là thuộc tính mà bây giờ nó như là default được sử dụng trong các framework CSS như Bootstrap, Foundation và nếu bạn build layout từ đầu mà không sử dụng bất kỳ Framework CSS nào hỗ trợ thì chắn chắn bạn có thể đang sử dụng nó như thế này:

```scss
*, *:before, *:after {
  box-sizing: border-box;
}
```

Nhưng với kiểu selector `*` như trên thì sẽ gây khó cho dev khi muốn override lại value `padding-box` hoặc `content-box` ở 1 số elements. Giả sử có 1 component bạn muốn reset về `content-box` chẳng hạn:

```scss
.my-component {
  box-sizing: content-box;
}
```

Tuy nhiên, nó lại chỉ apply được cho mỗi class `my-component`, các class children bên trong lại đang bị ảnh hưởng của `box-sizing: border-box`. Bạn hình dung nó trông như này:

```html
<div class="my-component"> <!-- Đang là "content-box" -->
  <div class="children"> <!-- Vẫn là "border-box" -->
  </div>
</div>
```

Vậy để Best Practices chỗ này mình sẽ phải sử dụng nó như sau:

```scss
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

Mình sẽ không giải thích cụ thể thuộc tính này work như thế nào vì đây là bài chia sẻ về các tips nên mặc nhiên là bạn đã sử dụng nó ^^

> Kể từ phần này, mình sẽ refer thêm link các articles để mọi người đọc hiểu thêm


#### References:

- https://www.w3schools.com/css/css3_box-sizing.asp
- https://css-tricks.com/box-sizing/
- https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/


### 2. Thuộc tính hay `currentColor`

Thuộc tính này nó work gần như à 1 CSS Variable vậy, bạn chỉ cần khai báo 1 màu `color` ở đầu component, có thể là ở `body`, tức là có cứ lấy `color` được khai báo ở parent gần nhất và tất cả các thành phần bên trong chỉ cần set `currentColor` cho các thuộc tính như `background-color`, `border-color`, `outline-color`, `box-shadow` đều nhận được màu tương tự.

Hãy cùng xem ví dụ dưới đây để hiểu hơn:

{@codepen: https://codepen.io/tinhh/pen/NEyXQQ}

Thuộc tính này [được support hầu hết các browsers](https://caniuse.com/#search=currentColor), nên các bạn hoàn toàn yên tâm sử dụng

Và với thuộc tính CSS này, người ta hay áp dụng nó vào để làm themes, fill màu cho SVG Icons

#### References:

- https://medium.com/@tbarrasso/keeping-current-with-css-currentcolor-dc98ec3b9d3a
- https://css-tricks.com/currentcolor/
- https://css-tricks.com/cascading-svg-fill-color/


### 3. Tận dụng tối đa cách viết shorthand của 1 số thuộc tính

**Background**

Mình để ý thấy khi các bạn sử dụng background để import 1 image vào thì hay viết kiểu như thế này

```scss
... {
    background: url(path/image.jpg) 0 0 no-repeat;
    background-size: cover;
}
```

Thế thì tại sao mình không gộp cái `background-size: cover` vào chung luôn? 

Có thể các bạn đã thử cho giá trị `cover` vào thuộc tính `background` nhưng do là thêm không đúng cách nên nó không nhận :D

Trong shorthand properties `background` thì `background-size` phải đặt phía sau `background-position` và cách nhau bởi dấu `/`

```scss
... {
    background: url(path/image.jpg) 0 0/cover no-repeat;
}
```

**Font**

Thay vì viết:

```scss
... {
    font-weight: bold;
    line-height: 1.2em;
    font-size: 20px;
    font-family: Roboto, sans-serif;
}
```

Thì có thể viết gộp lại như sau:

```scss
... {
    font: bold 20px/1.2em Roboto, sans-serif;
}
```

Tuy nhiên để sử dụng được shorthand properties cho thuộc tính `font` thì yêu cầu bạn [phải follow chặt chẽ đúng rule của nó](https://developer.mozilla.org/en-US/docs/Web/CSS/font#Syntax)

#### References:

- https://developer.mozilla.org/en-US/docs/Web/CSS/background
- https://developer.mozilla.org/en-US/docs/Web/CSS/font
# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!