**Bài viết dưới đây của mình sẽ chia sẻ cách vẽ một hình ảnh pixel bằng thuộc tính `box-shadow` của CSS
Mong rằng bài viết của mình sẽ đem lại cho các bạn những phút giây thoải mái cũng như một số trải nghiệm thú vị với CSS**

# 1. Xây dựng

### Đầu tiên, tạo một block bằng cách sử dụng `div`
Box-shadow của một block sẽ phụ thuôc theo `width` và `height` của nó. Bạn có thể áp dụng nhiều "lớp" `box-shadow` cho nó bằng cách tách các thuộc tính `position-x`,  `position-y`,  `blur-radius`,  `color` của từng lớp` box-shadow` bằng dấu phẩy

Một block thuộc loại "basic" nhất: 

```
// CSS
.block {
    width: 10px;
    height: 10px;
    box-shadow: 0 0 0 black, 10px 0 0 black;
}

// HTML
<div class="block"></div>
```

Kết quả: 

![](https://images.viblo.asia/bfa5c37d-7d79-4ad2-87bd-1f723695eafd.png)

### Tiếp theo, xây dựng hình ảnh bằng cách sử dụng toạ độ

Dưới đây là toạ độ của hình trái tim mà chúng tra muốn xây dựng:

![](https://images.viblo.asia/33c81d33-b1be-46a5-afc1-0a738887f6aa.png)

Việc bây giờ là sử dụng những toạ độ đã được đánh dấu ở hình trên để tạo thành một hình trái tim hoàn chỉnh. Sử dụng công thức áp dụng nhiều lớp `box-shadow` và điều chỉnh toạ độ theo hình trên, ta được kết quả dưới đây:

![](https://images.viblo.asia/773e221b-b793-4901-8764-b77b08072170.png)

Soucre code hoàn chỉnh:

```
// CSS
:root {
    --pink-color: #d87385;
}

.heart {
    width: 20px;
    height: 20px;
    margin-bottom: 100px;
    box-shadow: 20px 0 0 var(--pink-color), 40px 0 0 var(--pink-color),
    60px 20px 0 var(--pink-color), 80px 0 0 var(--pink-color),
    100px 0 0 var(--pink-color), 120px 20px 0 var(--pink-color),
    0 20px 0 var(--pink-color), 60px 20px 0 var(--pink-color),
    120px 20px 0 var(--pink-color), 0 40px 0 var(--pink-color),
    120px 40px 0 var(--pink-color), 20px 60px 0 var(--pink-color),
    100px 60px 0 var(--pink-color), 40px 80px 0 var(--pink-color),
    80px 80px 0 var(--pink-color), 60px 100px 0 var(--pink-color);
}

// HTML
<div class="heart"></div>
```


***Link CodePen:***
{@embed: https://codepen.io/longhaieva/pen/GzLagN}

# 2. Lời kết
Với thuộc tính `box-shadow`, mọi người hoàn toàn có thể sáng tạo ra nhiều hình ảnh pixel độc đáo và mới lạ hơn hình trái tim đơn giản này. Mong rằng bài viết này sẽ giúp ích được phần nào cho mọi người trong việc sáng tạo cũng như nghĩ những ý tưởng hay ho với CSS.

Tham khảo:[ Dev.to](https://dev.to/linxea/drawing-pixelated-image-with-css-box-shadow-j2b)