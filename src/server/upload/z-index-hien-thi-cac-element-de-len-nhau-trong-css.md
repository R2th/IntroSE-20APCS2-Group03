Chắc hẳn các bạn đã từng cố gắng đặt z-index cho element tuy nhiên lại không có kết quả như mong đợi. Đây là một thuộc tính tưởng chừng đơn giản nhưng đôi khi lại khá là confuse. Bài viết này sẽ giải thích rõ hơn về cách mà z-index hoạt động.

## Thứ tự stacking mặc định
Trước tiên ta cùng xem xét thứ tự mặc định mà trình duyệt chồng element lên nhau từ sau lên trước:
- Element root (<html>) dưới cùng
- Non-positioned elements (static) theo thứ tự code từ trên xuống dưới và đè lên element root
- Positioned elements (absolute, relative, sticky, fixed) theo thứ tự code từ trên xuống dưới và đè lên non-positioned elements

Ví dụ:

**HTML**
```
<div class=”pink”>
  <div class=”orange”></div>
</div>
<div class=”blue”></div>
<div class=”green”></div>
```

**CSS**
```
/* Để xem full CSS, click link bên dưới*/
.blue, .pink, .orange {
  position: absolute;
}
```
https://codepen.io/ivhed/pen/QrdEBB

![](https://images.viblo.asia/c0a14831-3551-4b25-b73f-9c8e306c7412.png)

Có thể thấy rằng block green mặc dù có div nằm dưới cùng theo thứ tự từ trên xuống nhưng do không được position nên đã bị những block được position khác đè lên.

## Stack với z-index
Để thay đổi thứ tự đè lên nhau mặc định như trên ta có thể sử dụng đến thuộc tính z-index. Element với z-index cao hơn sẽ hiển thị đè lên element có z-index thấp hơn. Cũng cần lưu ý rằng z-index chỉ có tác dụng với những element đã được position.

**HTML**
```
<div class=”pink”>
  <div class=”orange”></div>
</div>
<div class=”blue”></div>
<div class=”green”></div>
```

**CSS**
```
.blue, .pink, .orange {
 position: absolute;
}
.blue {
 z-index: 2;
}
/* Set z-index của block orange cao hơn block blue để hiện thị đè lên block blue */
.orange {
 z-index: 3;
}
.green {
 z-index: 100; /* không có tác dụng */
}
```
https://codepen.io/ivhed/pen/xjqmpV

![](https://images.viblo.asia/cf4c18cf-7fec-45cf-9c62-604903bdddfa.png)

## Stacking context
Giả sử ta muốn thêm một block purple nằm bên dưới block pink.

**HTML**
```
<div class=”pink”>
  <div class=”orange”></div>
</div>
<div class=”blue”></div>
<div class=”purple”></div>
<div class=”green”></div>
```

**CSS**
```
.blue, .pink, .orange, .purple {
  position: absolute;
}
.purple {
  z-index: 0;
}
/* Set z-index của block pink cao hơn block purple để hiện thị đè lên block purple */
.pink {
  z-index: 1;
}
.blue {
  z-index: 2;
}
.orange {
  z-index: 3;
}
.green {
  z-index: 100;
}
```
https://codepen.io/ivhed/pen/YLZdjx

![](https://images.viblo.asia/ae3571a8-a89c-4191-afdf-17c948267469.png)

Bằng việc đặt z-index của block purple thấp hơn z-index của block pink, block purple đã nằm dưới block pink. Nhưng chuyện gì đã xảy ra khi block màu cam lại bị đè dưới block màu xanh da trời? Đây là một bug phát sinh mà ta không hề mong muốn.

Vâng, lý do là khi ta đặt z-index cho block pink, ta đã tạo nên một thứ gọi là stacking context. z-index của một element chỉ có tác dụng trong phạm vi của stacking context bao hàm element đó. z-index của block orange chỉ có tác dụng trong stacking context do block pink tạo ra vậy nên mặc dù nó cao hơn z-index của block blue thì block orange vẫn bị block blue đè lên do 2 block này khác stacking context.

Để block blue nằm dưới block orange ta có thể làm cho chúng có cùng một stacking context bằng cách đặt div .blue ở trong div .pink.

**HTML**
```
<div class=”pink”>
  <div class=”orange”></div>
  <div class=”blue”></div>
</div>
<div class=”purple”></div>
<div class=”green”></div>
```
https://codepen.io/ivhed/pen/erGoJE

![](https://images.viblo.asia/576a69cd-381a-4a9e-8b40-6002764c2797.png)

Ngoài thuộc tính z-index thì khi đặt một số thuộc tính khác cho element ta cũng tạo ra một stacking context mới ví dụ: filter, opacity, transform… Bạn có thể tham khảo thêm ở [đây](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context).

Quay lại với ví dụ trước khi mà div .blue ngang hàng với div .pink.
Lần này thay vì đặt z-index cho block pink ta sẽ thử đặt thuộc tính filter cho block này xem sao.

**HTML**
```
<div class=”pink”>
  <div class=”orange”></div>
</div>
<div class=”blue”></div>
<div class=”green”></div>
```

**CSS**
```
.blue, .pink, .orange {
  position: absolute;
}
/* Set filter cho block pink để tạo một stacking context mới */
.pink {
  filter: hue-rotate(20deg);
}
.blue {
  z-index: 2;
}
/* z-index của block orange chỉ có tác dụng trong stacking context mà block pink tạo ra nên 
mặc dù được set cao hơn của block blue nó vẫn bị block blue đè lên */
.orange {
  z-index: 3;
}
.green {
  z-index: 100;
}
```
https://codepen.io/ivhed/pen/LmWMQb

![](https://images.viblo.asia/1e551966-1fd0-48a6-830c-c34e4c2cc2b3.png)

Vâng và đúng như dự đoán block orange đã bị block blue đè lên.

## Kết luận
Khi muốn apply z-index cho một element bạn cần position cho element đó, đồng thời xác định được stacking context của các element để điều chỉnh sao cho hiển thị được như mong đợi. Cảm ơn các bạn đã theo dõi.

## Tham khảo
[Z-Index Explained: How to Stack Elements Using CSS](https://medium.freecodecamp.org/z-index-explained-how-to-stack-elements-using-css-7c5aa0f179b3)

[The stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)