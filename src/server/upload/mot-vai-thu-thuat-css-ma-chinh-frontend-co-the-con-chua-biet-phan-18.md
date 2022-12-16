![](https://images.viblo.asia/eef5f41b-aea6-454d-a092-f58fc13f552d.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 18 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Giảm kích thước của code với CSS variables

Trước đây mình cũng từng nhắc đến những tính năng mạnh mẽ của CSS custom properties (hay còn gọi là CSS variables).

1. [Khám phá những lợi ích của CSS Variables](https://viblo.asia/p/kham-pha-nhung-loi-ich-cua-css-variables-Eb85oBE6l2G).
2. [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết (Phần 8)](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-8-OeVKBDaJlkW#_2-viet-css-variables-nhanh-hon-voi-sass-1).

Hôm nay mình lại khám phá ra 1 tip hay nữa khi sử dụng CSS variables đó là giảm được nhiều dòng code lặp lại, bằng cách thay đổi lại giá trị của biến.

Cách mà nó hoạt động vô cùng có lợi cho dev, trong khi đó CSS preprocessor như SASS hay LESS không hề làm được điều này.

Mình sẽ chứng minh sự linh hoạt của nó thông qua 1 ví dụ về Grid System, cụ thể hơn là Grid của Bootstrap mọi người nhé!

Dưới đây là cách mà anh em ta thường viết (hoặc thường nghĩ):

*(mình chỉ đang tập trung vào những thuộc tính chính thôi nha)*

```scss
.row {
    ...
    margin-left: -15px;
    margin-right: -15px;
    
    .col {
        ...
        padding-left: 15px;
        padding-right: 15px;
    }
}

// Tạo 1 modifier "small-gutters": khoảng cách nhỏ hơn giữa các cột
.small-gutters {
    ...
    margin-left: -9px;
    margin-right: -9px;
    
    .col {
        ...
        padding-left: 9px;
        padding-right: 9px;
    }
}

// Tạo 1 modifier "no-gutters": không có khoảng cách giữa các cột
.no-gutters {
    ...
    margin-left: 0;
    margin-right: 0;
    
    .col {
        ...
        padding-left: 0;
        padding-right: 0;
    }
}
```

Bạn thấy rõ ràng rồi nhé, nếu mà thêm vài kiểu modifier cho các dạng lưới nữa, thì code CSS lặp đi lặp lại khá là nhiều.

Và đây là cách mà CSS variable khắc phục nhược điểm trên:

```scss
:root {
   --grid-gap: 15px;
}

.row {
    ...
    margin-left: calc(var(--grid-gap) * -1);
    margin-right: calc(var(--grid-gap) * -1);
    // Vì giá trị của biến là số âm, nên phải gọi ra theo cú pháp này
    
    .col {
        ...
        padding-left: var(--grid-gap);
        padding-right: var(--grid-gap);
    }
}

// Tạo 1 modifier "small-gutters": khoảng cách nhỏ hơn giữa các cột
.small-gutters {
    ...
    --grid-gap: 8px;
}

// Tạo 1 modifier "no-gutters": không có khoảng cách giữa các cột
.no-gutters {
    ...
    --grid-gap: 0;
}
```

Tuyệt vời chưa nào các bạn! Code CSS được giảm đi đáng kể rồi.

{@codepen: https://codepen.io/tinhh/pen/yLybVqG}

> **Browser Support:** BẠN ĐỂ Ý MỘT CHÚT
> 
> Hiện tại CSS variables chỉ hơi ngán ông bạn IE thôi, chứ còn lại các trình duyệt phổ biến khác đều hỗ trợ ngon lành các bạn nhé!
> 
> https://caniuse.com/#feat=css-variables

#### Đọc hiểu thêm

- https://codyhouse.co/blog/post/using-css-custom-properties-to-reduce-the-size-of-your-css
- https://stackoverflow.com/a/48639938/4485780

### 2. Thật may nhờ có `white-space: pre-line`

Thuộc tính `white-space` thì ai cũng đã từng dùng rồi, nhưng dùng chủ yếu nhiều nhất vẫn là 2 value này `normal` và `nowrap`.

- `normal`: mọi người thường dùng nó để reset về hành vi default, có thể do trước đó bị ảnh hưởng các value khác như `nowrap`.
- `nowrap`: thì thường được dùng nhiều nhất khi [truncate text 1 dòng hoặc nhiều dòng](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-8-OeVKBDaJlkW#_1-cat-text-text-thanh-nhieu-dong-ma-khong-ton-chut-mo-hoi-nao-not-cross-browsers-0).
- Nhưng trường hợp mà mình gặp thì hơi đặc biệt 1 chút. Đó là data từ Backend trả về là 1 string, trong đó các đoạn text thể hiện kiểu ngắt dòng (bạn cứ tưởng tượng như kiểu nội dung của một câu hỏi gì đấy, được lấy ra từ `textarea` chẳng hạn).

![](https://images.viblo.asia/227ac987-3c64-4ece-9b9a-3216f2997810.png)

Như hình trên các bạn thấy, thì mặc định trình duyệt nó sẽ biến 2 thứ là:

1. **line break**: là trường hợp mình đang gặp.
2. **extra white spaces**: chứa nhiều hơn 1 dấu cách.

=> trở về bằng **one space** hết (1 space).

Vậy thay vì giải quyết bằng cách can thiệp phía Backend thêm vào tag `<br />`, thì thật là may mắn có bạn đã mách cho mình dùng thử `white-space: pre-line`.

Mình search ngay tài liệu và đọc, thì đúng chính xác value `pre-line` này, nó đã được tạo ra để xử lý trường hợp mình đang gặp phải các bạn ạ!

{@codepen: https://codepen.io/tinhh/pen/bGNWWRo}

Ngoài ra `white-space` còn các value khác nữa, mỗi value sẽ cách áp dụng phù hợp để giải quyết các vấn đề khác nhau.

> **Browser Support:** BẠN YÊN TÂM
> 
> `white-space` thì không phải là thuộc tính mới mẻ gì nữa cả, các bạn cứ thoải mái mà sử dụng ở các trình duyệt nhé!
> 
> https://caniuse.com/#search=white-space

#### Đọc hiểu thêm

- https://dev.to/arbaoui_mehdi/css-white-space-property-explained-4bh5
- https://alligator.io/css/white-space-property/
- https://css-tricks.com/almanac/properties/w/whitespace/
- https://meyerweb.com/eric/css/tests/white-space.html

### 3. Đừng code như rứa..Code như ri thì tốt hơn nè!!!

Ở các bài chia sẻ trước, mình cũng đã giới thiệu đến các bạn 1 số tips giúp code CSS Best Practices hơn như:

- [Tận dụng tối đa cách viết shorthand của 1 số thuộc tính](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-6-4dbZN8vy5YM#_3-tan-dung-toi-da-cach-viet-shorthand-cua-1-so-thuoc-tinh-2)
- [Nên dùng font-weight: 700 hơn là font-weight: bold](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-8-OeVKBDaJlkW#_3-nen-dung-font-weight-700-hon-la-font-weight-bold-2)

Hôm nay mình sẽ tiếp tục khám phá thêm 1 số Best Practices khác nữa nhé!

**1. Có những selector nó là luôn đúng rồi, nên bạn không cần viết thêm những thẻ thừa, selectors của bạn đảm bảo không sai.**

```css
/* bad */
img[src$=svg], ul > li:first-child {
  opacity: 0;
}

/* good */
[src$=svg], ul > :first-child {
  opacity: 0;
}
```

- Thuộc tính `src` chỉ tồn tại duy nhất trong thẻ `img` mà thôi.
- Cấu trúc chuẩn HTML thì thẻ con trực tiếp của `ul` phải luôn là `li`, nếu mà CSS ở trên chọn sai, thì bạn đang sai ở HTML cơ :smiley: .

**2. Đổi value sang kiểu Tiếng Anh, thì code đọc vào là hiểu ngay liền à!**

```css
/* bad */
:nth-child(2n + 1) {
  transform: rotate(360deg);
}

/* good */
:nth-child(odd) {
  transform: rotate(1turn);
}
```

- Thay `2n + 1` bằng `odd`, bạn thấy dễ hiểu hơn chưa? `odd` là đề cập đến các phần tử con có thứ tự lẻ như `1`, `3`, `5`. Bên cạnh đó thì có `even` là thứ tự chẵn như `2`, `4`, `6`.
- Thay `360deg` bằng `1turn` (1 vòng). Đấy, bạn thấy chưa? Chuyển sang Tiếng Anh đọc phát hiểu được ngay. Khỏi phải tưởng tượng nó xoay bao nhiêu độ :smiley: .

> **Browser Support:** BẠN YÊN TÂM
> 
> Những selector và value vừa đề cập trên hoạt động tốt trên tất cả các trình duyệt.

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!