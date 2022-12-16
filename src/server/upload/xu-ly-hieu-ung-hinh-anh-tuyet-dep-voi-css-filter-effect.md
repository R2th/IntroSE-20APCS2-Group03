**Điều chỉnh độ sáng và độ tương phản của hình ảnh, hoặc biến hình ảnh thành Grayscale hoặc Sephia là một tính năng phổ biến bạn có thể tìm thấy trong ứng dụng chỉnh sửa hình ảnh như Photoshop hoặc các ứng dụng chỉnh sửa ảnh trên smartphone. Nhưng giờ đây, các bạn có thể thêm các hiệu ứng tương tự vào hình ảnh trong trang web chỉ bằng CSS.**

Những tính năng này có được là nhờ thuộc tính Filter Effects của CSS3. Vậy hãy thử xem có gì thú vị nào :grinning:

## Các hiệu ứng

Áp dụng các hiệu ứng là rất dễ dàng. Hãy xem đoạn code dưới đây, để biến hình ảnh bình thường thành ảnh có hiệu ứng thang màu xám;

```css
img {
   -webkit-filter: grayscale(100%);
}
```

![](https://images.viblo.asia/c866cdb5-ea26-4292-a326-ffd5be844b61.png)

...và đoạn css dưới đây sẽ cho hiệu ứng nâu đỏ

```css
img {
   -webkit-filter: sepia(100%);
}
```

![](https://images.viblo.asia/307dd918-0de0-4509-a75f-1f845c9dcc50.png)

Cả hai value `sepia` và  `grayscale` được tính theo tỷ lệ phần trăm, trong đó 100% là mức tối đa và 0% đồng nghĩa với việc sẽ giữ cho hình ảnh không bị thay đổi, nhưng khi không set giá trị cụ thể nào, giá trị mặc định sẽ là 100%.

Cũng có thể điều chỉnh độ sáng của hình ảnh bằng cách sử dụng `brightness` như sau:

```css
img {
  -webkit-filter: brightness(50%); 
}
```

![](https://images.viblo.asia/ffb5dd32-8f8e-44bf-8316-1988b4b881eb.png)

Cả `brightness` và `contrast`, khi set giá trị là 0% hình ảnh sẽ hoàn toàn bị che mờ và 100% thì hình ảnh sẽ như ảnh gốc.

Ngoài các giá trị từ 0-100%, có thể điều chỉnh độ tối sáng của hình ảnh theo cách dưới đây

```css
img {
  -webkit-filter: brightness(-50%); 
}
```

..tương tự, chúng ta cũng có thể điều chỉnh độ tương phản hình ảnh theo cách này

```css
img {
  -webkit-filter: contrast(200%); 
}
```

![](https://images.viblo.asia/fbe7c6d3-1783-46c4-85ac-65fef261c1bd.png)

Hơn nữa, chúng ta cũng có thể kết hợp nhiều value với nhau, chẳng hạn như trong ví dụ dưới đây. Lần lượt set `grayscale` và `contrast: 50%` cùng lúc.

```css
img {
  -webkit-filter: grayscale(100%) contrast(150%); 
}
```

Cuối cùng, có một hiệu ứng nữa chúng ta có thể thử là Gaussian Blur, hiệu ứng này sẽ làm mờ hình ảnh đi.

```css
img:hover {
  -webkit-filter: blur(5px); 
}
```

![](https://images.viblo.asia/26f0d2e9-0e73-4d46-8e83-86bd8e645b84.png)

Các bạn có thể xem qua bản demo ở đây:

{@embed: https://codepen.io/tranquocy/pen/abbpxyw}

## Kết luận
***Lưu ý: Thuộc tính này hiện tại được support ở hầu hết các browser, ngoại trừ IE 12 trở xuống :upside_down_face:. Các bạn có thể kiểm tra trình duyệt hỗ trợ tại [đây](https://caniuse.com/#feat=css-filters).***

Thực tế còn rất nhiều các effects khác nữa. Chẳng hạn như `hue-rotate`, `invertvà saturate`, nhưng tôi nghĩ rằng chúng ít được áp dụng hơn. Xin cảm ơn và hẹn gặp lại các bạn trong các bài viết tiếp theo!

Tham khảo: [https://www.hongkiat.com/blog/css-filter/](https://www.hongkiat.com/blog/css-filter/)