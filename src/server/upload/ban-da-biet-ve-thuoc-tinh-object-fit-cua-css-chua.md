Có nhiều cách để có thể style ảnh, trước tiên mình sẽ nói về cách quen thuộc đã được sử dụng từ rất lâu rồi

# Background-position

Để style cho hình ảnh, chúng ta có thể nghĩ ngay đến cách rất quen thuộc đó là sử dụng thuộc tính `background-size`. Hãy xem qua ví dụ dưới đây

HTML
```
.img-container
```

CSS
```
.img-container {
  background-image: url("https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg");
  width: 100%;
  height: 400px;
  background-position: center;
}
```

Chúng ta sẽ ra được một div có hình ảnh được căn giữa với thuộc tính `background-position: center;`
{@codepen: https://codepen.io/thang21/pen/oJZgdy}

Cách này đều có ưu điểm và nhược điểm.
- Ưu điểm: Hỗ trợ trên mọi trình duyệt
- Nhược điểm: Tuy nhiên khi sử dụng cách này thì chúng ta ko thể sử dụng thẻ `img` mà phải dùng một `div` để tạo nên ảnh. Và nếu một khi bức ảnh có độ phân dải quá lớn, thì bức ảnh ko thể căn chỉnh chính giữa chính xác.

# Object-fit
Với thuộc tính object-fit, thì bạn chỉ cần đặt một thẻ img và sau đó ném thuộc tính `object-fit: cover` vào là chúng ta đã được một style i như trên

HTML
```
img.picture(src="https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg", alt="")
```

CSS
```
.picture {
  width: 100%;
  height: 400px;
  object-fit: cover;
}
```
{@codepen: https://codepen.io/thang21/pen/OrpPpq}

Và cũng với cách này, thì khi ta thay đổi `width` và `height` thì bức ảnh của chúng ta vẫn luôn căn giữa mà không bị vỡ ảnh hay bị nén ảnh. Thật tiện lợi phải không nào!

# Các thuộc tính của Object-fit
Ngoài `cover` thì `Object-fit` còn cung cấp cho chúng ta một số thuộc tính khác như:
- fill
- contain
- scale-down
- none

{@codepen: https://codepen.io/thang21/pen/dwvPze}

# Các trình duyệt hỗ trợ Object-fit
Theo dữ liệu từ [Caniuse](https://caniuse.com), chúng ta có thể thấy Object-fit được hỗ trợ ở hầu hết các browser mới, nhưng điều đáng buồn là IE không hỗ trợ thuộc tính này

![](https://images.viblo.asia/fc4b48a0-4064-4f36-8d54-ccf3c235e9b6.png)

Chính vì thế mà chúng ta cũng nên cân nhắc về cross browser trước khi sử dụng thuộc tính này nhé!

Trên đây là bài viết về Object-fit, hy vọng qua bài viết này bạn có thể sử dụng thành thạo thuộc tính này! Chúc các bạn học tập hiệu quả!