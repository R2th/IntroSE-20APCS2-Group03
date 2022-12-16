Như tiêu đề bài viết, bài này mình sẽ 'giới thiệu' về Border trong CSS - với những khả năng 'có thể bạn chưa biết', ứng dụng để vẽ nhé :D

# 'Tâm hồn' của border
Đầu tiên mình sẽ giới thiệu lại về các attribute của border đã nhé, sau đấy sẽ tiện 'vào việc' hơn :laughing:

* `border-width`: Độ dày của đường viền (border)
* `border-color`: Màu sắc của đường viền
* `border-style`: Kiểu đường viền (solid, dashed, dotted...)
* `border-radius`: Độ bo tròn của đường viền

Rồi, những điều trên ai cũng dùng, ai cũng biết rồi, nên mình không giới thiệu nữa. Giờ mình sẽ dùng 4 cái này để vẽ, xem nó làm được những trò trống gì nhé :triumph:

# Mài 1 cục kim cương
## Border-width
Thông thường, mọi người chỉ dùng border kiểu: `border: 1px solid black;` thôi, mà không để ý rằng khi tăng max border lên thì sẽ làm được những gì :thinking:

Dưới đây mình sẽ minh họa sự thay đổi của hình dạng box khi border có độ dày khác nhau nhé: 
![image.png](https://images.viblo.asia/d141a857-e188-492b-89d4-e67f32d246e6.png)

![](https://images.viblo.asia/326058cc-0b99-44bf-b2c8-64f87d340fcf.gif)


Như hình có thể thấy, mỗi border sẽ là 1 hình tam giác cân, ứng với các cạnh của Element gốc. Nếu bạn đã từng đi search: vẽ hình tam giác bằng html - css, thì kiểu gì cũng đã từng thấy đoạn code chứa mỗi border rồi đúng không :D

Nguyên lý của việc đó chính là tùy chỉnh border của 1 element, tùy theo góc/hướng của đỉnh tam giác bạn cần.

Chẳng hạn, như hình trên, mình muốn tạo tam giác cân có đáy lộn lên trên, song song với mặt đất, thì chỉ cần tạo 1 div có chiều cao gấp đôi chiều cao cần, rồi set border-top = chiều cao mong muốn với màu mong muốn, các cạnh còn lại cho nó transparent hết, thế là xong rồi :D

Hoặc nếu, mình cần tam giác vuông mà không cân, thì tùy biến 2 cạnh liền nhau, rồi transparent 2 cạnh còn lại đi là xong, xoay lại hình cho chuẩn nữa là được rồi.

![image.png](https://images.viblo.asia/6b1c4409-9719-4b81-9b17-8159779cb5d0.png)

Nếu bạn muốn tam giác bất kỳ, chẳng vuông, chẳng cân, thì bạn sẽ cần sử dụng clip path chứ không phải border dâu :D, sau này mình sẽ giới thiệu sau.
## Mô hình kim cương
Viên kim cương này mình làm đơn giản thôi, cấu tạo từ các hình tam giác vuông cân - mẫu hình kim cương điển hình thường gặp. Vậy là mình có bản vẽ dưới đây:
![image.png](https://images.viblo.asia/0d86506e-e66a-44e3-a03a-2232cdd34c75.png)

Nhìn trên hình thì rõ ràng rồi, tạo 4 khối với border full, rồi xóa 2 border của 1 hình đi, xong xoay cả group lại là xong :D

Giờ bắt đầu làm này:
```html
<div class="diamond">
    <span class="diamond-part"></span>
    <span class="diamond-part"></span>
    <span class="diamond-part"></span>
    <span class="diamond-part"></span>
</div>
```

Mỗi span chính là 1 khối với các border dày, mình css cho 1 border và nhân mẫu ra thôi:
```css
.diamond {
  position: relative;
  width: 200px;
  height: 200px;
}
.diamond-part {
  position: absolute;
  width: 100px;
  height: 100px;
  display: inline-block;
  margin: 0;
  box-sizing: border-box;
  border-top: solid coral;
  border-right: solid lightgreen;
  border-bottom: solid gold;
  border-left: solid lavender;
  border-width: 50px;
}

.diamond-part:nth-child(2) {
  left: 100px;
}
.diamond-part:nth-child(3) {
  top: 100px;
}
.diamond-part:nth-child(4) {
  left: 100px;
  top: 100px;
}
```
![](https://images.viblo.asia/fe8d2ace-bf29-484e-83d8-3d02cf0a00ed.jpg)

Lưu ý: ở đây bắt buộc border-width phải là số và đơn vị tính chính xác, không thể sử dụng 50% được nhé, vì vậy nên vẽ bằng border này không thể flexible theo hình bao nó như img được khi chỉ dùng css được.

Xong được 1 nửa rồi. Tiếp theo để 'cắt đầu' tạo mũ kim cương như bản vẽ ở trên, mình sẽ ẩn đi border top + border left của khối 1 bằng cách cho nó transparent:
![image.png](https://images.viblo.asia/9a48a8e2-7953-46a4-9ac1-7bd830412ac4.png)

Chú ý nho nhỏ, ở đây mình phải set là: `border-top: 50px solid transparent;` hoặc: `border-top-color: transparent;` chứ không phải chỉ thêm `border-top: transparent;`, vì khi gọi attribute `border-top`, bạn sẽ set lại cả border-width, border-style và border-color, nên nếu chỉ viết như vậy thì sẽ hiểu là `border-width: 0` đó nhé.

Đến đây còn bước cuối để tạo hình kim cương, `rotate` cho viên kim cương đứng lên là xong :D
```css
.diamond {
  ...
  transform: rotate(45deg);
}
```

Mình sửa lại 1 chút màu mè cho đẹp, các bạn vào codepen tham khảo nhé: https://codepen.io/bunnypi04/pen/zYwdVzj

![](https://images.viblo.asia/c3de0b62-56df-476d-bcc7-0edaf60205d9.gif)

# 1 chiếc thư tình
Tiếp theo này, hướng dẫn các bạn làm 1 bức thư với trái tim đang đập ở giữa để làm web đi tán gái nhé :rofl:
## Viết 1 bức thư
Bức thư này thì trông vẫn giống cái khối chữ nhật với border full như ở trên thôi, các bạn có thể tạo dễ dàng như đã hướng dẫn, đổi tí màu mè là được này:

![image.png](https://images.viblo.asia/6902d560-af23-49f2-9469-23ac312e7668.png)

Như ở trên, set cho mỗi cạnh bức thư màu theo shade bạn mong muốn, và cho border full là được rồi :D

## Gửi 1 trái tim
Mình muốn 1 trái tim ở giữa bức thư, vì vậy mình tạo 1 div trái tim bên trong bức thư và căn vào giữa như sau:

![image.png](https://images.viblo.asia/c0fd2a14-4621-41fd-bc60-32fc95c206af.png)

OK, bố cục đã xong, giờ tạo hình trái tim nữa nào. Tương tự như viên kim cương, mình có bản vẽ cho hình trái tim như sau:

![image.png](https://images.viblo.asia/b87578fe-0a14-4f71-9b4a-f4af3028ef8b.png)

Như hình vẽ, để tạo hình trái tim từ `<div class="heart"></div>` đang là hình vuông hiện tại, mình cần 2 hình vuông kích thước bằng nó nữa, và dịch khỏi hình vuông hiện tại lần lượt là: lùi trái 50% và nâng lên 50%. Trong trường hợp này, mình sẽ sử dụng `pseudo element` là `:before` và `:after` cùng `position: absolute`  để tạo:

![image.png](https://images.viblo.asia/8d3cd612-3dce-4c44-8344-a4c7707a72b2.png)

Tiếp theo là bước bo tròn 2 `pseudo class`. Lần này thì mình sử dụng tới border-radius này:

```css
.heart:before, .heart:after {
  ...
  border-radius: 50%;
}
```


Có vẻ ok rồi đấy, xoay lại 1 tẹo nữa là xong:
```css
.heart {
    ...
    transform: translate(-50%, -50%) rotate(45deg);
}
```

Thế là xong trái tim của bức thư rồi. Nhớ đổi màu lại nhé :D

Để thêm sinh động, cho trái tim đập bằng cách animation scale `.heart` nhé:
```css
.heart {
    ...
    animation: heart-beat 0.8s infinite;
}

@keyframes heart-beat {
  0% {
    scale: 1;
  }
  30% {
    scale: 0.8;
  }
}
```

Thành quả ra rồi đây: https://codepen.io/bunnypi04/pen/WNjZdpd

![](https://images.viblo.asia/07c3954b-e9bb-4949-8215-ff85f9741b4f.gif)

# Tạm kết
Chỉ với border quen thuộc, mà khả năng đã tới như vậy rồi, mọi người chờ xem các bài tiếp theo sẽ vẽ được những gì nhé :yum: