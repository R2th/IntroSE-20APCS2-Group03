![](https://images.viblo.asia/849b3165-abb0-4a6d-88dd-3dafab390b46.png)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 9 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Thuộc tính `content` không chỉ có mỗi value là `""`

Thuộc tính content là thuộc tính quan trọng nhất khi bạn sử dụng những pseudo-elements như `:before` hay `:after`, nếu thiếu đi thuộc tính này thì những thuộc tính khác coi như không có tác dụng gì.

Tuy nhiên, bên cạnh cái value được sử dụng nhiều nhất là `content: ""` thì `content` còn có thể chứa nhiều kiểu value khác, mà có thể bạn cũng chưa khám phá hết. Hãy cùng liệt kê để xem `content` còn có bao nhiêu kiểu value nữa nhé!

* Lấy nội dung từ `data-*` attribute của thẻ HTML

```html
<div class="pending" data-status="Pending">Status</div>
```

```css
div {
    content: attr(data-status);
}
```

Thay vì tạo ra 1 thẻ HTML mới, ta gắn thêm `data-status="Pending"`, ở CSS sẽ lấy được giá trị 1 cách dynamic từ HTML trả về, và HTML sẽ chính là nơi để code Backend (code logic) can thiệp truyền vào dễ dàng, hãy xem thêm ví dụ dưới để để hiểu hơn:

{@codepen: https://codepen.io/tinhh/pen/VgoNrx}

Ở ví dụ trên có bạn sẽ thắc mắc rằng, vì sao không đưa trực tiếp đoạn text **Pending** vào `content` cho nhanh, sẽ không linh động nếu trang web của chúng ta có đa ngôn ngữ các bạn ạ! Thay vào đó, nếu sử dụng kiểu `content: attr(data-*)` như này sẽ giúp lấy tự động giá trị từ HTML

* `content` là 1 image

```css
div:before {
  content: url(image.jpg);
}
```

Hay thậm chí là `content` còn có thể chứa nhiều image:

```css
div:before {
  content: url(image.jpg) url(image.jpg);
}
```

> Tuy nhiên nếu đưa vào image kiểu này thì không control được size của ảnh, không như thuộc tính `background-image` ta có `background-position` để canh vị trí hay là `background-size` để resize kích thước ảnh. Có lẽ vì vậy mà nó ít được sử dụng.

{@codepen: https://codepen.io/tinhh/pen/daxLqj}

* Chứa text nhiều dòng

```css
div:before {
  content: 'text line 1\a'
           'text line 2';
  white-space: pre;
}
```

{@codepen: https://codepen.io/tinhh/pen/Lqwvar}

#### References:

+ https://css-tricks.com/valid-css-content/

### 2. Làm hiệu ứng Smooth scrolling chỉ cần CSS `scroll-behavior` [Not Cross-Browsers]

**Smooth scrolling** là hiệu ứng khi click vào link trên menu và trang cuộn từ từ tới thành phần tương ứng.

1 ví dụ về hiệu ứng **Smooth scrolling** với jQuery bạn tham khảo để hiểu thêm

{@codepen: https://codepen.io/chriscoyier/pen/dpBMVP}

Đó là cách mà mình làm trước đây với rất nhiều dự án, nhưng dạo gần đây, mình khám phá ra 1 thuộc tính CSS mới đã và đang được phát triển để phổ biến hơn đến các trình duyệt đó là `scroll-behavior`.

Một điều lưu ý là để sử dụng thuộc tính này làm được hiệu ứng trên thì bạn phải tạo ra vùng scroll bởi 1 div bọc tất cả nội dung trang web, thay vì là sử dụng scroll mặc định của `html, body`.

Giả sử mình có 1 div `<div class="wrapper"></div>` bọc toàn bộ nội dung trang web và thêm vào đoạn code CSS như sau:

```css
.wrapper {
   width: 100vw;
   height: 100vh;
   overflow: auto;
   scroll-behavior: smooth;
}
```

Lúc này chỉ cần link `href="#target_id_section"` đến id của section tương ứng, ta có được hiệu ứng **Smooth scrolling** bằng CSS thuần, mà không cần đến 1 chút JS nào.

{@codepen: https://codepen.io/tinhh/pen/daxERL}

Nhưng để áp dụng được cho dự án của bạn, hãy chú ý đến vài nhược điểm sau:

1. Chưa support hết các browsers phổ biến, hãy xem những trình duyệt và các phiên bản được support ở [CanIUse](https://caniuse.com/#feat=css-scroll-behavior)
2. Chưa customize được nhiều options như kiểu trượt hiệu ứng hay là set thời gian hiệu ứng trượt theo mong muốn

Và đương nhiên là những nhược điểm trên hoàn toàn có thể khắc phục được bởi sự can thiệp của JS, bạn tìm hiểu thêm ở [bài viết này](https://css-tricks.com/snippets/jquery/smooth-scrolling/)

#### References:

+ https://css-tricks.com/almanac/properties/s/scroll-behavior/
+ https://caniuse.com/#feat=css-scroll-behavior


### 3. Select thành phần parent khi focus vào thành phần children với pseudo `:focus-within` [Not Cross-Browsers]

Đây là 1 pseuso-class mới giúp chúng ra style cho thẻ parent khi focus vào children của nó. Children ở đây có thể là nhiều cấp.

Các bạn lưu ý là với `:focus-within` thì chỉ có thể sử dụng được khi thành phần children có trạng thái `:focus` thôi, hầu hết là các thành phần trong form như `input`, `select`, `button`. Còn lại các thẻ như `div`, `img`, `p` thì không có trạng thái `:focus` đâu nhé!

> Nếu bạn muốn select thành phần parent khi `:hover` (thay vì `:focus`) vào thành phần children, thì [phần 3 của series này](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-3-E375z04dZGW#_3-nhung-thu-hay-ho-ban-co-the-lam-voi-pointer-events-2) mình có giới thiệu về trick của `pointer-events` có thể làm được, bạn tham khảo thêm.

Bây giờ, giả sử mình muốn highlight 1 cái box khi focus vào ô input trong box đó thì với `:focus-within` mình đã xử lý được 1 cách dễ dàng, hãy xem demo bên dưới để hiểu rõ hơn

{@codepen: https://codepen.io/tinhh/pen/NJKWKa}

Cho đến thời điểm hiện tại của bài viết này thì trình duyệt IE và Edge vẫn chưa support nó, các trình duyệt phổ biến còn lại cho Desktop và Mobile hầu như là support ổn rồi.

#### References:

+ https://css-tricks.com/almanac/selectors/f/focus-within/
+ https://alligator.io/css/focus-within-pseudo-class/
+ https://caniuse.com/#feat=css-focus-within

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!