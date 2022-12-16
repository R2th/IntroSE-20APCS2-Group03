## 1. Lời nói đầu
Có khá nhiều cách để tạo ra các hình khối với css có rất nhiều hướng dẫn để tạo ra các hình từ đơn giản đến phức tạp bằng cách kết hợp height, with, border, border-radius, before, after cũng có rất nhiều bài viết trên viblo cũng hướng dẫn để tạo các các hình bằng những thuộc tính đó rồi. các bạn có thể tham khảo tại đây: 
https://viblo.asia/p/bai-24-tao-cac-khoi-hinh-hoc-bang-css3-phan-1-1Je5ExEYlnL
https://viblo.asia/p/bai-25-tao-cac-khoi-hinh-hoc-bang-css3-phan-2-Eb85opzjK2G
https://viblo.asia/p/bai-26-tao-cac-khoi-hinh-hoc-bang-css3-phan-3-OeVKBDYYlkW

Tuy nhiên nay mình sẽ hướng dẫn 1 cách khách để tạo ra các khối hình học dễ dàng hơn với CSS3 Clip-path

## 2. Hướng dẫn đơn giản để tạo hình khối với CSS3 Clip-path
Ví dụ để tạo ra 1 tam giác với CSS3 Clip-path ta làm như sau
```
<div id=“tamgiac”></div>
```
```
#tamgiac {
    width: 100px;
   height: 100px;
   background: blue;
  -webkit-clip-path: polygon(50% 0%, 0 100%, 100% 100%);
  clip-path: polygon(50% 0%, 0 100%, 100% 100%);
}
```
https://codepen.io/phamngoc9x/pen/RvEZRp

Trong phần này ta cần chú ý đến đoạn polygon(50% 0%, 0 100%, 100% 100%) 3 thành phần 50% 0%, 0% 100%, 100% 100% tương ứng với 3 điểm neo của tam giác  trong đó tham số đầu tiên tương ứng với khoảng cách từ phần tử đó đến cạnh trái của khối, tham số thứ 2 thì tương ứng với khoảng cách từ điểm đó đến đỉnh của khối. ( ta có thể thay % bằng px)

## 3.  Sửa dụng clippy để tạo ra hình mong muốn 1 cách đơn giản hơn 

![](https://images.viblo.asia/184f8770-8c43-4e06-ba19-28104b5e69c6.png)

truy cập trang https://bennettfeely.com/clippy/ ta có rất nhiều hình phía bên tay phải

![](https://images.viblo.asia/3e2c0701-2905-460e-8144-e156a257d9fb.png)
 
 Ta có thể chọn 1 hình để tuỳ chỉnh lại hoặc tự tạo những hình mà mình mong muốn bằng cách thay đổi vị trí các điểm neo cạnh.
 Sau đó copy đoạn css vừa được tạo ra bên dưới hình để sử dụng.
 
##  4. Hỗ trợ của trình duyệt: 
 Bảng hỗ trợ trình các trình duyệt của  CSS3 clip-path chi tiết có thể xem [tại đây](https://caniuse.com/#search=clip-path):
 
![](https://images.viblo.asia/e8af0a52-1e1a-442d-816e-74d45e0a2ec6.png)