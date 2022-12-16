## Mở đầu
Nói về CSS, ngoài một số đơn vị đo phổ biến, được dùng nhiều như px, em, rem, vw, vh ...v.v Thì ở một góc tối nào đó, vẫn còn rất nhiều các đơn vị đo khác, đang chờ ngày được người dùng đem ra sử dụng.
<br><br>
Trong bài viết này, mình xin giới thiệu tới các bạn một vài đơn vị đo đã và sắp được ra mắt trong thời gian tới. Các đơn vị này được liệt kê chi tiết trong [CSS Values and Units Module Level 4](https://drafts.csswg.org/css-values-4/)

![alt](https://www.yudiz.com/wp-content/uploads/2017/08/css-unit-blog-banner-1200x480.jpg)
## Đơn vị tương đối
#### `vi`
1vi = 1% kích thước của viewport theo trục inline
#### `vb`
1vb = 1% kích thước của viewport theo trục block

> Trục inline và block được xác định theo writing-mode
> 
> vi là kích thước song song với luồng văn bản trong một dòng, tức là kích thước ngang trong chế độ viết ngang và kích thước dọc trong chế độ viết dọc. Đối với văn bản tiếng Anh chuẩn, đó là kích thước ngang
> 
> vb là kích thước vuông góc với luồng văn bản trong một dòng, tức là kích thước dọc trong chế độ viết ngang và kích thước ngang trong chế độ viết dọc. Đối với văn bản tiếng Anh chuẩn, đó là kích thước dọc
> 
<br>

#### `cap`
1cap = chiều cao giới hạn của chữ cái viết hoa có sẵn đầu tiên
#### `ic`
1ic = chiều rộng của chữ cái  “水” (CJK water ideograph, U+6C34)
#### `lh`
1lh = chiều cao của lineheight hiện tại
#### `rlh`
Giống như mối quan hệ giữa `em` và `rem` thì `rlh` là chiều cao của lineheight gốc

## Đơn vị tuyệt đối
#### `Q`
1Q = 0.4mm = 0.04cm

## Đơn vị góc
#### `grad`
400grad = 360deg
#### `rad`
2πrad = 360deg
#### `turn`
1turn = 360deg

## Đơn vị tần số
#### `Hz` và `kHz`
1kHz = 1000Hz

## Kết luận
Trong số các đơn vị đo CSS ở trên, có khá nhiều đơn vị đang được thử nghiệm và chưa đc các trình duyệt hỗ trợ. Nếu được thì bạn muốn được dùng thử đơn vị nào nhất ?