## Giới thiệu
Giữa tháng 1 đến tháng 12 năm 2018 các thống kê đã so sánh gần 10.000 bài viết CSS để chọn ra Top 50 có thể cải thiện kỹ năng thiết kế web của bạn trong năm 2019. Đây là một danh sách cực kỳ cạnh tranh (50 / 10.000) và được chọn lọc cẩn thận các bài viết CSS hữu ích nhất được đăng tải trong năm qua. Chúng được đánh giá chất lượng bằng cách xem xét mức độ phổ biến, sự tham gia và lần truy cập và các yếu tố khác của người đọc.
## Scrolling
1. [Scroll to the future](https://evilmartians.com/chronicles/scroll-to-the-future-modern-javascript-css-scrolling-implementations?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Sử dụng các tính năng CSS và JavaScript mới nhất giúp điều hướng xung quanh một trang trơn tru và đẹp mắt.
![](https://images.viblo.asia/b081b8c3-5e70-42c0-b632-4ef5120e002b.png)

2. [ Lazy Loading Images](https://css-tricks.com/the-complete-guide-to-lazy-loading-images?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Tìm hiểu về Lazy Loading Image

![](https://images.viblo.asia/f60512df-ae56-4cb5-8e64-5cdb5209bff4.png)

{@embed: https://codepen.io/imagekit_io/pen/BPXQZZ}

3. [Creating horizontal scrolling containers](https://uxdesign.cc/creating-horizontal-scrolling-containers-the-right-way-css-grid-c256f64fc585)

Tạo container có khả năng cuộn ngang sử dụng CSS Grid

![](https://images.viblo.asia/bb287f35-3014-47d3-9dd9-9ae4d1514396.gif)

[](https://codepen.io/dannievinther/pen/f6e2e4473194621c808ded07e346d4d1)

4. [Practical CSS Scroll Snapping](https://css-tricks.com/practical-css-scroll-snapping/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Tìm hiểu về CSS scroll snapping 

![](https://images.viblo.asia/14da0a6d-0b69-48ef-8fee-362fa1c13d35.jpg)


## Grid
5. [Getting Started With CSS Layout](https://www.smashingmagazine.com/2018/05/guide-css-layout/?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Tìm hiểu về CSS Grid
![](https://images.viblo.asia/1d129c0b-3f33-4670-a1f1-cf780d3260cd.png)

{@embed: https://codepen.io/rachelandrew/pen/zjbgvx}

6. [CSS Grid For Visual Learners](http://www.csstutorial.org/css-grid-tutorial.html?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Tìm hiểu CSS Grid bằng cách trực quan thông qua 40 biểu đồ

![](https://images.viblo.asia/0c28f5cd-44bf-424f-b079-e3fd130fe6f9.png)

7. [CSS Grid in 45 Minutes](https://www.youtube.com/watch?v=DCZdCKjnBCs?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Tìm hiểu CSS Grid trong 45 phút

![](https://images.viblo.asia/0ee22e5b-b9a8-46ac-8f25-c7b1428166bf.jpg)

8. [CSS Frameworks Or CSS Grid](https://www.smashingmagazine.com/2018/11/css-frameworks-css-grid?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Nên sử dụng CSS Framework hay CSS Grid trong dự án

![](https://images.viblo.asia/f4b27d9a-1fdf-4d14-a575-69a99d8e7f4b.png)

9. [Responsive eCommerce layout using CSS Grid](https://codepen.io/andybarefoot/pen/PBPrex?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Responsive bố cục thương mại điện tử sử dụng CSS Grid

![](https://images.viblo.asia/9a04a2d5-e03f-44f6-9fb3-2aa9f8147ae3.jpeg)


{@embed: https://codepen.io/andybarefoot/pen/PBPrex?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more}

## Responsive Image
10. [Time-saving CSS techniques to create responsive images](https://medium.freecodecamp.org/time-saving-css-techniques-to-create-responsive-images-ebb1e84f90d5?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Là một lập trình viên website chắc chắn bạn đã gặp phải vấn đề responsive hình ảnh. 

![](https://images.viblo.asia/12585e49-0167-4055-8ce4-d1944fc19da8.jpeg)

Kỹ thuật CSS giúp tiết kiệm thời gian để tạo ra hình ảnh responsive. Nếu bạn là một lập trình viên mới bạn sẽ gặp phải vấn đề khi co giãn giữa các màn hình, hình ảnh sẽ không tự co dãn theo độ rộng màn hình. 

- Trường hợp ảnh là background:
Ví dụ mình có hình ảnh với class là `.myImg` và set cho nó các thuộc tính như dưới đây:
```
.myImg {
  background-image: url("my-image.png");
  background-size: cover;
}
```
Chúng ta sử dụng các thuộc background rất hữu ích. Tuy nhiên, hãy nhớ rằng chỉ nên sử dụng chúng cho các hình ảnh không có nội dung hoặc văn bản và trong một số trường hợp cụ thể.

- Trường hợp ảnh đặt trong thẻ img:

```
 .myImg {
  object-fit: cover;
  width: 320px;
  height: 180px;
}
```

Ở đây chúng ta sử dụng thuộc tính `object-fit: cover`. Thuộc tính này cũng áp dụng cho video. Giá trị có thể là `cover` hoặc `contain`. Tuy nhiên, thuộc tính này không hoạt động trên IE.

- Responsive trên IE

Chúng ta sẽ giữ tỷ lệ hình ảnh với tỷ lệ phần trăm trên thuộc tính `padding`. Hình ảnh của bạn sẽ là một phần tử con kích thước tuyệt đối.

```
.wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
}
```

Kỹ thuật này được sử dụng rất phổ biến. Bạn có thể thấy trang Netflix đang dùng nó.

- Kỹ thuật đơn giản hơn
```
img {
  height: auto;
  width: 100%;
/* even more control with max-width */
  max-width: 720px;
}
```
Nếu bố cục của bạn không phức tạp, nó hoạt động trong hầu hết các trường hợp.

{@embed: https://codepen.io/adri_zag/pen/VBQJYg}

11. [Building a responsive image](https://medium.com/9elements/building-a-responsive-image-e4c6229fa1f6?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Cách tạo logo responsive giữ nguyên tỷ lệ khung hình.

![](https://images.viblo.asia/70ffd45d-439c-43f3-a239-b27967c337ec.png)

13. [Responsive Images — I come here not to bury, but to praise it.](https://alistapart.com/article/responsive-images?utm_source=mybridge&utm_medium=blog&utm_campaign=read_more)

Thêm 1 kỹ thuật responsive image.

![](https://images.viblo.asia/d8425aa6-52de-476d-9ab5-e228ea37659d.png)

## Kết luận
Như vậy trong phần đầu bài viết này mình đã giới thiệu với các bạn 12 bài viết hàng đầu hướng dẫn các kỹ thuật liên quan đến CSS. Hẹn gặp lại các bạn ở phần tiếp theo nhé.
Bài viết tham khảo: https://medium.mybridge.co/learn-css-from-top-50-articles-for-the-past-year-v-2019-4570d9da53c