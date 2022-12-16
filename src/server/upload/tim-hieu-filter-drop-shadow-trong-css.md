Nếu bạn từng học CSS, thì chắc bạn có thể biết thuộc tính box-shadow.  Ngoài ra thì có một CSS **filter** có tên tương tự là drop-shadow. Trong bài viết ngắn này chúng ta hãy cùng nhau tìm hiểu về drop-shadow nha các bọn.

**Cú pháp của box-shadow nè:**
`box-shadow: offset-x offset-y blur-radius spread-radius color`

Bạn tham khảo đầy đủ[ tại đây](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) nha

**Cú pháp của drop-shadow nè:**
`drop-shadow(offset-x offset-y blur-radius color)`

Bạn tham khảo đầy đủ[ tại đây](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow) nha

drop-shadow là một filter. Giống như box-shadow, chúng ta có thể chuyển các giá trị cho offset-x, offset-y, bán kính mờ và màu sắc.
Khác với box-shadow, drop-shadow không nhận tham số spread.

## Tại sao drop-shadow hữu ích ?
Trời sinh box sao còn sinh drop ? (***Bé tập làm văn***)

Nếu có box-shadow, tại sao lại cần thêm drop-shadow nhỉ.

Mình cũng đi qua một vài ví dụ đơn giản để hiểu thêm nha

### 1. Style những khối mà không phải hình chữ nhật
Tên ví dụ khó hiểu quá, tóm lại là thế này này
Ví dụ thông thường bạn làm đổ bóng cho cái logo có thẻ <img /> thì bạn dùng box-shadow thì nó sẽ thế này:

![](https://images.viblo.asia/9bb6ddfb-ef3a-4dbd-883e-c968afba2d76.JPG)
Nhưng bạn mong muốn đổ bóng cho phần chữ thôi, lúc đó chúng ta sẽ sử dụng drop-shadow, kết quả thế này nè:

![](https://images.viblo.asia/47a402ea-00e0-450f-80e2-c4756806e059.JPG)
Ngoài ra nó cũng hoạt động với thuộc tính inline như background... Bạn tự thử nha.

### 2. Style phần tử bị cắt
Ví dụ như bạn sử dụng thuộc tính clip-path để cắt sau đó áp dụng box-shadow thì phần đổ bóng đó cũng bị cắt luôn.
Để giải quyết thì bạn áp dụng filter drop-shadow cho phần tử cha của phần tử bạn cắt là được.

Ngoài ra bạn cũng có thể áp dụng nhiều drop-shadow một lần để có những style toẹt vời.

## Hạn chế
Như đã nói ở trên thì drop-shadow không nhận tham số spread cho nên chúng ta không thể style những hiệu ứng outline được.

Hy vọng qua bài viết này bạn có thể sử dụng filter drop-shadow linh hoạt để giải quyết những thứ mà có thể box-shadow không làm được.

*Tham khảo tại: https://css-irl.info/drop-shadow-the-underrated-css-filter/?utmcampaign=drop-shadow-the-underrated-css-filter*