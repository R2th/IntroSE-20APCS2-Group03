![](https://images.viblo.asia/99a9920d-72b2-4f62-a6a7-ac529ad286a9.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 20 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Highlight những thẻ `<img />` thiếu thuộc tính `alt`
 
Thuộc tính `alt` luôn được coi là bắt buộc phải có đối với thẻ `img`, nhưng nhiều lúc dev lại quên đặt nó vào, vì xu hướng là trong nhiều trường hợp diễn ra một cách bình thường, thì thiếu thuộc tính `alt` vẫn không làm ảnh hưởng gì đến việc hiển thị 1 bức ảnh cả.

> Những mục đích của thuộc tính `alt`  mà có lẽ bạn chưa biết rõ như:
> 
> - Giúp hiển thị thông tin về bức ảnh nếu chẳng may đường dẫn ảnh bị lỗi hoặc kết nối mạng chậm, làm cho ảnh không hiển thị ra được <= Đây có lẽ là lợi ích mà nhiều dev biết về nó nhất.
> - Giúp cho những người dùng sử dụng screen reader đọc được nội dung của ảnh (bạn hiểu nôm na đây như là dạng công nghệ hỗ trợ cho người mù khi sử dụng máy tính ấy) <= Đây là một trong những tính năng liên quan đến **Web Accessibility** (**Accessibility** hay còn được viết tắt là **A11y**), các bạn có thể tìm hiểu thêm với keyword trên.
> - Ngoài ra, `alt` còn giúp cho các công cụ **search engine crawlers** hay còn gọi là **bots** của Google dễ dàng **index** được hình ảnh trên trang web của bạn <= Đối với các bạn làm bên SEO thì đây được biết đến như một hình thức  **SEO onpage**.

Chính vì vậy mà hôm nay mình xin giới thiệu đến các bạn một cách thức dùng CSS để **nhắc nhở** cho dev luôn phải:

- Gắn thuộc tính `alt` vào thẻ `img` => sử dụng selector `img:not([alt])`
- Phải điền giá trị (truyền đoạn text mô tả) cho thuộc tính, chứ không được để trống nhé => sử dụng selector `img[alt='']`
- Và highlight bằng bất kỳ hiệu ứng nào bạn thích như **tạo border bao quanh** hoặc **làm mờ ảnh với opacity**.

```css
img:not([alt]),
img[alt=''] {
    border: 5px solid red;
}
```

Hoặc nếu bạn đang dùng SASS
```scss
img {
    &:not([alt]),
    &[alt='']{
       border: 5px solid red;
    }
}
```

{@codepen: https://codepen.io/tinhh/pen/xxGRXLJ}

> **Browser Support:** QUÁ TUYỆT VỜI
> 
> Nếu bạn không phải làm việc cho IE8, thì yên tâm là tất cả trình duyệt đã hỗ trợ thuộc tính `:not()` kia rồi.
> 
> https://caniuse.com/#feat=mdn-css_selectors_not

#### Đọc hiểu thêm

- Mình biết được tip này qua tweet của [@addyosmani](https://twitter.com/addyosmani/status/1223872295619330048)

### 2. `vertical-align: super` một cách làm khác thay cho thẻ `<sup>`

Giả sử rằng cấu trúc HTML trang web của bạn đang sử dụng thẻ `<span>` , đột nhiên thiết kế có thay đổi **thêm ký hiệu đồng tiền $ trước giá (price) của 1 sản phẩm**, thì lúc này bạn có xu hướng nghĩ về thẻ `<super>` trong HTML và tiến hành tìm tất cả các component có thay đổi để sửa lại cấu trúc HTML.

Nhưng việc này là không cần thiết lắm, vì mình sẽ cho bạn 1 cách làm khác giúp update nhanh hơn. Đó là sử dụng thuộc tính `vertical-align: super` trong CSS (có lẽ như `vertical-align: middle` mới là thuộc tính mà nhiều dev biết đến hơn nhỉ?).

Nếu sử dụng thẻ `<sup>` thì ta có được giao diện như sau
{@codepen: https://codepen.io/tinhh/pen/ZEGBaVN}

Thay vì đó, sử dụng `vertical-align: super` ta cũng làm được điều tương tự.
{@codepen: https://codepen.io/tinhh/pen/KKpNyJb}

> **Browser Support:** ĐÂY LÀ THUỘC TÍNH CỦA CSS2 MÀ!!!
> 
> Chỉ là do ít có trường hợp áp dụng trong khi làm layout với CSS, nên nó bị lãng quên. Chứ thuộc tính này đã có từ lâu, từ thời CSS2 rồi.
> 
> https://caniuse.com/#search=vertical-align

#### Đọc hiểu thêm

- https://developer.mozilla.org/vi/docs/Web/CSS/vertical-align

### 3. `transform` rồi `detransform` là hết `transform` :smiley: 

Đặt cái tiêu đề tip cho vui vui chút thôi, chứ ở đây mình đang muốn đề cập đến một cách sử dụng thuộc tính `transform` để skewed button.

Khi bạn set `transform: skewX(-30deg)` cho parent (thành phần cha), thì ở trong children (thành phần con) nó cũng bị skewed theo. Điểm thú vị là ở đây, ở children bạn chỉ cần set giá trị phủ định lại giá trị trên là được, tức trở thành `transform: skewX(30deg)`

> Lưu ý: thành phần con bắt buộc KHÔNG PHẢI là `inline` nha, vì `inline` như thẻ `<span>`, `<a>` thì nó sẽ không ăn được, bạn phải đưa nó về `inline-block` hoặc `block` nhé!

{@codepen: https://codepen.io/tinhh/pen/wvaoVeY}

> **Browser Support:** 100% SUPPORT
> 
> Các thuộc tính của `transforms2d` hiện nay hầu như các trình duyệt phổ biến đã đọc được hết rồi.
> 
> https://caniuse.com/#feat=transforms2d

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!