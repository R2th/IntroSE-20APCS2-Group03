![](https://images.viblo.asia/a7afbe67-77b0-43b8-8699-d9ba520be637.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 8 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Cắt text (text...) thành nhiều dòng mà không tốn chút mồ hôi nào! [Not Cross-Browsers]

Truncate text 1 dòng thì quá dễ rồi, hầu hết các dev không chuyên Frontend cũng đều biết, chỉ cần vài dòng CSS đơn giản thôi, không cần phải đụng tới JS đếm ký tự rồi cắt chuỗi làm gì cho phức tạp

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

Cộng với thuộc tính `width` mà mọi người muốn set, tới độ rộng bao nhiêu thì sẽ cắt text và thay vào dấu `...` (ba chấm)

{@codepen: https://codepen.io/tinhh/pen/wNaYvg}

Tuy nhiên, giờ có trường hợp muốn hiển thị nhiều hơn 1 dòng rồi mới cắt text, thế thì phải làm sao nhỉ. Thật là may mắn khi CSS3 giới thiệu 1 thuộc tính giúp chúng ta làm việc đó chính là `line-clamp`

```css
display: -webkit-box;
-webkit-box-orient: vertical;
line-clamp: 3; /* số dòng cần cắt ở đây */
overflow: hidden;
text-overflow: ellipsis;
```

{@codepen: https://codepen.io/tinhh/pen/vzMvaj}

Mọi chuyện sẽ tốt đẹp, code sẽ work tốt, đoạn text của bạn sẽ được cắt với số dòng như ước muốn, nếu bạn đảm bảo được 3 điều kiện dưới đây:

1. Đây là thuộc tính mới của CSS3 và nó chưa được support tốt ở các Browser nằm trong phạm vi gọi là **phổ biến** mà các project ta đang làm. Cụ thể bạn xem ở trang [CanIUse](https://caniuse.com/#feat=css-line-clamp) này. Sơ sơ thấy là Firefox với IE là không hỗ trợ rồi đó (yaoming), cho nên dự án của bạn mà đang cần support các browsers này, thì không dùng `line-clamp` được rồi (ahuhu).
2. Disable [Autoprefixer](https://viblo.asia/p/ban-co-biet-ve-postcss-Qbq5QrkJKD8#_kham-pha-1-so-plugins-noi-tieng-cua-postcss-5) vì thuộc tính `-webkit-box-orient: vertical` vi phạm rule của Autoprefixer, nên bản CSS được build ra cuối cùng bị mất luôn thuộc tính này, debug trên browser không thấy chúng đâu hoặc thấy code đó, nhưng thực sự browser không đọc được, dẫn đến không thấy dấu ba chấm đâu 😃
3. Disable luôn [Stylelint](https://viblo.asia/p/check-tieu-chuan-code-css-voi-stylelint-jvEla6Mo5kw) vì thuộc tính `display: -webkit-box` vi phạm rule **property-no-vendor-prefix** của Stylelint, nếu bạn có bật tính năng này lên.

Cuối cùng thì đoạn code sẽ trở thành như sau:

```css
/* stylelint-disable-next-line value-no-vendor-prefix */
display: -webkit-box;
/* autoprefixer: off */
-webkit-box-orient: vertical;
line-clamp: 3;
overflow: hidden;
text-overflow: ellipsis;
```

> Vì đây là tip mình tập trung vào việc chia sẻ cách mà `line-clamp` giúp mình truncate text nhiều dòng dễ dàng, nên nếu không áp dụng được cho dự án của bạn vì lý do Cross Browsers, thì vẫn còn những cách khác, các bạn có thể tham khảo:
> + Sử dụng [plugin dotdotdot](http://dotdotdot.frebsite.nl/)
> + Viết 1 đoạn JS để xử lý
> + Bằng 1 đoạn code CSS dài hơn như hướng dẫn ở [bài viết này](http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/)

#### References:

+ https://css-tricks.com/line-clampin/
+ http://hackingui.com/front-end/a-pure-css-solution-for-multiline-text-truncation/

### 2. Viết CSS Variables nhanh hơn với SASS

Nếu bạn đã nghe và tìm hiểu về CSS Variables trước đó, cũng như là mình cũng đã có viết 1 bài về [CSS Variables](https://viblo.asia/p/kham-pha-nhung-loi-ich-cua-css-variables-Eb85oBE6l2G) trước đây, thì thấy rõ ràng là cú pháp nó khá là dài khi cần gọi 1 biến ra sử dụng

```scss
:root {
    --primary: #000;
    --bg: #fff;
}
html {
    background: var(--bg);
    color: var(--primary);
}
```

Và nếu bạn là dev Frontend thì chắc chắn bạn cũng khó dứt bỏ được SASS, vì trong SASS vẫn còn nhiều tính năng mà CSS Variables chưa thay thế được và có lẽ bạn đang sử dụng kết hợp cả SASS và CSS Variables, thế thì tại sao không giản lược cú pháp gọi `var(--)` của CSS Variables thành ngắn gọn hơn bởi viết 1 function của SASS nhỉ?

```scss
@function v($var) {
    @return var(--#{$var});
}

:root {
    --primary: #000;
    --bg: #fff;
}
html {
    background: v(bg);
    color: v(primary);
}
```

> P/S: Tips này mình lượm được trên cộng đồng **[dev.to](https://dev.to/)** đấy, đây cũng là 1 nguồn học tập hữu ích cho developer không chỉ giới hạn là Frontend, những bài post chia sẻ trên này thường ngắn, dễ đọc và hiểu ngay, không bị dài dòng như article trong Medium ^^

#### References:

+ https://dev.to/meduzen/write-css-variables-faster-in-scss-1mon


### 3. Nên dùng `font-weight: 700` hơn là `font-weight: bold`

Hãy định nghĩa 1 chút về những value của thuộc tính `font-weight`:

- Value bằng chữ thì có:
    - normal
    - bold
    - bolder
    - lighter

- Value bằng số thì có:
    - 100
    - 200
    - 300
    - 400
    - 500
    - 600
    - 700
    - 800
    - 900

Và mình có các cặp value có giá trị như nhau đó là **normal - 400** và **bold - 700**, nhưng trong rất nhiều thiết kế, designer họ có thể chọn 2 loại `font-weight` là `300` và `600` làm chuẩn, do đó value bằng chữ kia lại không thể hiện đúng chuẩn như bản design được.

Chính vì lý do sử dụng value bằng số đảm bảo chính xác yêu cầu của bản design hơn, nên nó luôn được recommend trong nhiều bộ styleguide về CSS.

#### References:

+ https://css-tricks.com/almanac/properties/f/font-weight/
+ https://stackoverflow.com/a/10909305/4485780

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!