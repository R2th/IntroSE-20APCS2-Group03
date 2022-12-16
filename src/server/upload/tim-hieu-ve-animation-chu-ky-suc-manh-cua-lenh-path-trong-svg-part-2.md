Chào các bạn, mình đã viết phần đầu tiên về việc tạo animation chữ ký với SVG. Các bạn nào chưa xem thì có thể xem tại https://viblo.asia/p/tim-hieu-ve-animation-chu-ky-suc-manh-cua-lenh-path-trong-svg-part-1-GrLZDWJgKk0.

Ở lần trước, mình đã chỉ cho bạn sơ qua về SVG, cụ thể là các lệnh vẽ Path, cũng như là thủ thuật để tạo nhanh 1 file SVG nhanh và đẹp. Đến với phần 2, ta sẽ tiếp tục hoàn thiện animation chữ ký cho nó.
Bắt đầu thôi nhỉ :grinning:

# Tạo animation chữ ký
Trong file SVG chữ ký t đã tạo ở phần 1, ta có đoạn code sau:

```
.a {
    fill: none;
    stroke: #fff;
    stroke-width: 3px;
}
```

Chúng ta có thể thấy các thuộc tính như stroke: khai báo màu sắc của path, stroke-width: độ rộng của path,... tạo nên chữ ký trong demo cũ. Bây giờ mình sẽ xin giới thiệu thuộc tính là **stroke-dasharray** và **stroke-dashoffset** .

1. stroke-dasharray dùng để tạo nét đứt, khoảng cách giữa các nét đứt chúng ta có thể chỉnh được.

![](https://images.viblo.asia/cca40002-5769-41c9-8ecd-9483263370e1.gif)

2. stroke-dashoffset dùng để *dịch* nét đứt.

![](https://images.viblo.asia/0fe79442-2c17-40a0-b4c1-0c6c3ca2e0dd.gif)

Từ 2 cái trên, ta sẽ có ý tưởng là chỉnh dasharray (khoảng cách giữa nét đứt) dài bằng **chính độ dài của chữ ký**, sau đó để dashoffset (dịch nét đứt) **bằng đúng chiều dài của chữ ký đó** để dịch chữ ký biến mất (lúc đó màn hình ta sẽ hiển thị **đoạn bị đứt** của chữ ký đó, nhưng vì khoảng cách đoạn bị đứt dài bằng độ dài chữ ký, nên ta sẽ chẳng thấy gì nữa). Sau đó ta sẽ giảm dần dashoffset xuống 0 để quay về chữ ký ban đầu.

Cuối cùng ta có:
{@embed: https://codepen.io/terry-do/pen/ZEEpNGj}

*Bạn có thể dùng thêm animation-timing-function để tốc độ chữ ký chân thật hơn, hoặc chia nhỏ keyframes*

# Làm thế nào để xác định độ dài chữ ký
Nếu bạn để ý ở demo trên, mình có xác định được độ dài chữ ký là 2905 (px)
```
.a {
      fill: none;
      stroke: #fff;
      stroke-miterlimit: 10;
      stroke-width: 3px;
      stroke-dasharray: 2905;
      stroke-dashoffset: 2905;
}
```

Tại sao lại có số 2905 này? Đó là mình đã sử dụng chút javascript để tìm được độ dài của nó :grin: Kiểu kiểu như thế này:
```
var pathLength = $('path').getTotalLength();
console.log(pathLength);
```

Đơn giản vậy thôi :grinning: sau đó mình ném cái số vừa tìm được vào code CSS là ok. *Nếu trang web của bạn chứa chữ ký không cố định, bạn có thê lấy biến pathLength set thẳng vào thuộc tính cái DOM path thông qua javascript là được*.

Cảm ơn mọi người đã đọc bài viết này! Nếu mình có sai sót mong các bạn chỉ ra giúp mình :smile: