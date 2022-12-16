Hôm nay mình sẽ chia sẻ cho các bạn một số cách code border gradient trong CSS, không giới thiệu dài dòng, mình đi thẳng vào từng cách một luôn nhé.

Đầu tiên chúng ta sẽ tạo một cái box trước.

HTML
```
<div class="boxed"></div>
```
CSS
```
.boxed{
width: 300px;
height: 300px;
background-color: black;
}
```
Tiếp theo đó bạn có thể áp dụng một trong số những cách dưới đây:

### Cách 1: Border image slice
Với cách này thì chúng ta sẽ sử dụng 2 thuộc tính trong CSS đó chính là border-image-slice và border-image-source, cách này nhanh gọn lẹ nhất, tuy nhiên có một nhược điểm đó chính là không dùng được với border-radius(khi làm bo góc).
```
.boxed {
width: 200px;
height: 200px;
border: 10px solid;
border-image-slice: 1;
border-image-source: linear-gradient(to right bottom, #6a5af9, #f62682);
}
```
Chúng ta sẽ có kết quả như sau:
![](https://images.viblo.asia/09b963c2-6faf-4054-9a71-665797b28bcb.jpg)

### Cách 2: Dùng thêm thẻ con bên trong
Trường hợp này thì chúng ta sẽ dùng một trick đó chính là tạo background gradient cho .boxed bình thường, sau đó thêm padding tương ứng cho độ dày của border, và bên trong tạo thêm 1 thẻ html ví dụ là .boxed-child chẳng hạn và cho nó màu nền trùng với màu nền của body.

HTML
```
<div class="boxed">
<div class="boxed-child"></div>
</div>
```
CSS
```
.boxed {
width: 200px;
height: 200px;
background-image: linear-gradient(to right bottom, #6a5af9, #f62682);
padding: 10px;
border-radius: 10px;
}
.boxed-child {
width: 100%;
height: 100%;
background-color: #191a28;
border-radius: inherit;
}
```
Chúng ta sẽ có kết quả như dưới đây kèm bo góc luôn, tuy nhiên cách làm này không hay, vì đôi khi chúng ta không được phép thêm HTML vào bên trong thì sao, vì thế sẽ có cách số 3 đó chính là sử dụng lớp giả :before hoặc :after để xử lý.
![](https://images.viblo.asia/aac3e800-77f2-4ad7-86d2-dcd87907f036.jpg)
### Cách 3: Sử dụng before hoặc after

Nếu buộc phải có bo góc thì mình nghĩ dùng cách này là ổn áp nhất và chúng ta sẽ có code CSS như sau, các bạn chú ý những thuộc tính quan trọng đó chính là background-clip: padding-box và chỗ margin: -10px nó sẽ tương ứng cho border: 10px ví dụ border 20px thì margin sẽ là -20px nhé.

HTML
```
<div class="boxed">
<div class="boxed-child"></div>
</div>
```
CSS

```
.boxed {
width: 200px;
height: 200px;
position: relative;
background-clip: padding-box;
border: 10px solid transparent;
background-color: #191a28;
border-radius: 20px;
} .boxed:before {
content: "";
position: absolute;
inset: 0;
z-index: -1;
margin: -10px;
background-image: linear-gradient(to right top, #2979ff, #07a787);
border-radius: inherit;
}
```


Và đây là kết quả:
![](https://images.viblo.asia/64c193ff-33ab-45d0-9be0-1e112ba63be6.jpg)

## Kết luận
Trên đây là 3 cách tạo border gradient trong CSS mà mình biết, hi vọng sẽ có ích cho các bạn nhé.😍