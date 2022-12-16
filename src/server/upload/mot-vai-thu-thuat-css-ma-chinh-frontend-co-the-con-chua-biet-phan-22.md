![](https://images.viblo.asia/008eec5f-b3d8-4532-bd8b-81ab8b378aa3.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 22 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. Giờ mới biết `position: sticky` lợi hại đến thế!!!

Thuộc tính này có lẽ không quá xa lạ với các dev Frontend, nhưng liệu rằng bạn có nhớ đến nó mỗi khi muốn `sticky` 1 element nào đó khi scrolling không? (Mình cũng hay quên, nhiều lúc cứ gặp trường hợp như này toàn lôi JS ra xử lý..thiệt là uổng phí :cry: )
 
Ví dụ dễ thấy nhất là trang Viblo, khu vực chứa số lượng vote của mỗi bài viết sẽ được `sticky` lại mỗi khi cuộn xuống như thế này

![](https://images.viblo.asia/d8a5477b-34e7-4031-870f-8006cdd2813d.PNG)

Mình đã làm riêng ra đây 1 ví dụ để các bạn dễ hình dung.

> Vì Codepen yêu cầu bạn phải xác nhận "Tôi là con người", nên có thể bạn không preview trực tiếp kết quả demo ở đây được, mình sẽ đính kèm thêm link đến Codepen.

{@codepen: https://codepen.io/tinhh/pen/OJybLzz}

[Link to demo on Codepen](https://codepen.io/tinhh/pen/OJybLzz)

Thật sự tính năng này đã giúp ích cho mình rất nhiều, nếu dự án của bạn khách hàng chỉ yêu cầu chạy trên Chrome và Firefox thì áp dụng nó tuyệt vời luôn.

"Vài năm trước đây" để xử lý tình huống trên mình phải viết 1 đoạn code JS (chủ yếu là jQuery) dài thiệt dài để mà xử lý được nó.

Chưa hết đâu, hãy thử tưởng tượng cái sticky kia mà áp dụng được vào để fixed header của table thì còn gì bằng nữa...

Mình bắt gặp trang  [Price của Dropbox](https://www.dropbox.com/plans) có kiểu hiệu ứng fixed table header như này (Nhưng inspect element xem thử code, thì thấy họ đang sử dụng JS để control làm việc đó).

Thế thì hãy thử thách với `position: sticky` để xem nó có làm được không nhé!

{@codepen: https://codepen.io/tinhh/pen/bGVBwMB}

[Link to demo on Codepen](https://codepen.io/tinhh/pen/bGVBwMB)

Được luôn các bạn ơi, hay quá..nhưng hãy để ý 1 chút, để sticky được header của table thì CSS Selector phải target đến `th` hoặc `td` nằm trong thẻ `tr` nhé.

> **Browser Support:** IE KHÔNG (tương) THÍCH
> 
> Lại là IE vẫn chưa support thuộc tính này. Nếu cần support cho IE thì bạn có thể tham khảo qua [polyfill này](https://github.com/wilddeer/stickyfill)
> 
> https://caniuse.com/#feat=css-sticky

#### Đọc hiểu thêm

- https://css-tricks.com/position-sticky-and-table-headers/
- https://codepen.io/chriscoyier/pen/PrJdxb
- https://stackoverflow.com/questions/44001954/css-only-sticky-table-headers-in-chrome

### 2. Mã màu `rgb` với syntax mới, dễ dàng thay đổi hơn.

Lại là 1 tính năng mới đang được phát triển của **CSS Level 4**, nhưng lần này không phải là **Selector Level 4**, mà là **Color Level 4** :smile: 

> Ở [phần 21](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-21-djeZ1ooJ5Wz#_3-css-selector-khong-phan-biet-chu-hoa-chu-thuong-2) mình có đề cập đến **CSS Selector Level 4** là gì rồi, các bạn có thể xem lại.

Hai tính năng được giới thiệu về sự thay đổi của mã màu `rgb()` đó là:

1. Được sử dụng `space` làm separated giữa các tham số mã màu => `rgb(255 0 0)`.
2. Tích hợp luôn alpha vào mà không cần phải đổi từ `rba` sang `rgba` => `rgb(255 0 0 / 50%)`.

> Mã màu `hsl` cũng được thay đổi tương tự (Mình thì hầu như chưa bao giờ sử dụng đến kiểu khai báo màu này, nên không đề cập chi tiết về nó).

{@codepen: https://codepen.io/tinhh/pen/WNQRevE}

[Link to demo on Codepen](https://codepen.io/tinhh/pen/WNQRevE)

> **Browser Support:** VẪN LÀ IE KHÔNG HIỂU ;(
> 
> https://caniuse.com/#feat=mdn-css_types_color_space_separated_functional_notation

#### Đọc hiểu thêm

- https://twitter.com/argyleink/status/1218305696862588928
- https://github.com/Fyrd/caniuse/issues/4732
- https://github.com/Fyrd/caniuse/issues/2679
- https://github.com/w3c/csswg-drafts/blob/a54f8b2089d16eca696690fe7ffc3c11d4db9861/css-color/Overview.bs#L78
- https://bugs.chromium.org/p/chromium/issues/detail?id=788707

### 3. Cách để transition `height`

Bạn có thể sử dụng `transition` trong CSS3 để làm hiệu ứng chuyển động mờ dần với `opacity` hay `transform` các kiểu với `scale`, `rotate`.. Nhưng không phải tất cả các thuộc tính trong CSS đều có thể "ăn" với transition được, điển hình trong đó là thuộc tính `height: auto`, mà bạn thường hay gặp nó trong kiểu hiệu ứng `collapse`.

{@codepen: https://codepen.io/tinhh/pen/abvpwNd}

[Link to demo on Codepen](https://codepen.io/tinhh/pen/abvpwNd)

Bạn thấy đó, cứ tưởng rằng thuộc tính `height` sẽ được `transition` từ `0` đến `auto` => Nhưng trình duyệt không hề hiểu được.

Thử thay vì sử dụng `auto`, chuyển sang sử dụng đơn vị `px` cố định thử xem (ở đây `:hover` vào cho `height` của `ul` tăng lên `300px`).

{@codepen: https://codepen.io/tinhh/pen/eYpgRBY}

[Link to demo on Codepen](https://codepen.io/tinhh/pen/eYpgRBY)

Chạy được rồi, vậy là `transition` nó không hiểu `height: auto` là gì cả? (Đại khái ở đây là browser không tính toán ra  được height là bao nhiêu, để mà đưa vào thực hiện phép tính toán transition kia)

Cơ mà set `height` bao nhiêu là đủ, với `300px` ở trên thì list item đang bị thừa chiều cao của box ra quá nhiều (vùng background màu đỏ bị dư ra).

Lúc này, mình mới tìm ra `max-height`.

{@codepen: https://codepen.io/tinhh/pen/yLYgXVd}

[Link to demo on Codepen](https://codepen.io/tinhh/pen/yLYgXVd)

Vẫn là `300px` nhưng nếu là `max-height` thì lúc này chiều cao của box vừa fit đủ với chừng đó nội dung (lấy theo `height`).

Vậy giờ là bạn chỉ cần set `max-height` lớn hơn `height` thực tế, thì có thể `transition` được rồi đó.

> **Browser Support:** TỐT
> 
> Cả 2 thuộc tính `transition` và `max-height` đều đang được các browser phổ biến support rất tốt.
> 
> https://caniuse.com/#feat=minmaxwh, https://caniuse.com/#feat=css-transitions

#### Đọc hiểu thêm

- https://stackoverflow.com/a/8331169/4485780
- https://css-tricks.com/using-css-transitions-auto-dimensions/

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!