**Đây là một mẹo nhằm tạo ra chuyển động cho dấu chấm của chữ i. Tất nhiên không có cách nào khác là tạo ra hai thành phần riêng biệt là dấu chấm và kí tự "ı". Mẹo này phù hợp cho việc tạo ra hiệu cho logo chẳng hạn ... đại khái dùng để trang trí. :joy: .**

Vì cả hai phần này đều là kí tự Unicode nên ta có thể áp dụng được kiểu chữ, kích thước như thông thường.

{@codepen: https://codepen.io/dat08/pen/KKwxZOg}

## Cùng làm:
Chúng ta có thể chọn những cái hay những chữ kết hợp dấu khác nhau để thực hiện ví dụ như: j, ê, ủ, ũ, ẽ .... ở bài viết này sẽ sử dụng chữ i.
Trước tiên sẽ tạo phần HTML:
```
<span class="character">.</span>
<span class="character">ı</span>
```
Sau đó sẽ xếp 2 kí tự này lên nhau bằng cách bọc chúng trong thẻ span và sử dụng thuộc tính display: block.
Đưa 2 kí tự này sát nhau bằng cách điều chỉnh line-height và thay đổi margin về 0.

Phần quan trọng tiếp theo là làm hiệu ứng cho dấu chấm.
```
@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, -10px, 0);
  }
}

.bounce {
  animation: bounce 0.4s infinite alternate;
}
```

Bổ sung class bounce cho dấu chấm

```
<span class="bounce character">.</span>
<span class="character">ı</span>
```

Bây giờ có thể thêm chữ cái nào cho nó có nghĩa hay để cho dễ nhìn hơn tí. Tất nhiên phải chỉnh thêm tí css để nó nằm trên 1 dòng.

```
<p>
Đ
<span class="bounce character">.</span>
<span class="character">ı</span>
</p>
```

## Kết quả cuối cùng:
HTML:
```
<p>
Đ<!---->
 <span class="span">
<span class="bounce character">.</span>
<span class="character">ı</span>
   </span
</p>
```

CSS:

```
.character {
  display: block;
  line-height: 0.5;
  margin-top: 0;
  margin-bottom: 0;
}

.span {
  display: inline-block;
}

@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0);
  }

  to {
    transform: translate3d(0, -10px, 0);
  }
}

.bounce {
  animation: bounce 0.4s infinite alternate;
}
```

Với cách làm trên chúng ta có thể định dạngcác chữ cái khác thêm đẹp và sinh động hơn. Cảm ơn bạn đã đọc bài viết. :heart_eyes::heart_eyes:

*Nguồn:  css-tricks.com*