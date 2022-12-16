### Giới thiệu
Mình đã gặp một số dự án mà design và mong muốn của khách hàng **(KH**) không khớp nhau, nên mình viết bài này để chia sẻ cách mà mình đã làm trong các dự án đó, nếu các bạn có gặp trong dự án của mình thì có thể xem đây là 1 cách giải quyết nhé.

### Yêu cầu
Cụ thể dự án mình đã gặp vấn đề như sau: **KH** gửi design và yêu cầu làm giống y hệt design, khi mình tiến hành làm task đầu tiên và gửi output cho KH vào xem thử thì nhận được phản rồi rằng sao kích thước lại lớn như vậy, mong muốn của họ là nhỏ hơn. Rõ ràng những thông số khi mình viết **CSS** đã giống với design KH cung cấp, vậy vấn đề nằm ở đâu?

### Hướng giải quyết
Sau khi suy nghĩ thì mình nhận thấy rằng đúng là design KH gửi kích thước lớn hơn thông thường thật, các bước mình cần làm là:
1. Làm rõ mong muốn của KH:
Việc này là tối quan trọng ở thời điểm này, cần xác định rõ xem KH có mong muốn kích thước khi làm ra sẽ là bao nhiêu. Nếu không thực hiện bước này sớm mà tiếp tục làm theo design thì sẽ mất nhiều thời gian hơn nữa để khắc phục.

Qua quá trình trao đổi thì la do designer khi thiết kế dùng màn hình độ phân giải lớn nên những kích thước lớn hơn, khi dùng tool export lên website để xem thì KH đang xem với tỉ lệ zoomout nhất định, vì thế KH đồng ý với design này và thấy rất hợp lý. Tuy nhiên đó đang là zoomout và các con số khi mình đo từ design ra lại lớn hơn so với nhìn bằng mắt (khi zoomout). Cuối cùng đã chốt được với KH tỉ lệ giữa con số mình đo được và yêu cầu, như dự án của mình thì KH yêu cầu thực tế sẽ nhỏ bằng 70% của design.

2. Tiến hành:
Từ yêu cầu ở trên mình đã đưa ra 2 phương án để giải quyết vấn đề này:

**2.a. Scale nhỏ design**

Phương án này là sẽ scale lại toàn bộ design theo tỉ lệ KH mong muốn, sau đó sẽ từ design đã scale này làm tiếp với các thông số mới.
Phương án này rất tốt, tuy vậy do đặc thù trong dự án này designer đã k gửi file gốc mà upload lên website nên việc scale down design này k thực hiện được, mình phải chuyển qua phương án scale trong khi code.

**2.b. Scale nhỏ đi khi code**

Phương án này là, với mỗi thông số kích thước, mình sẽ nhân với 0.7 (70%) để ra được con số chính xác, ví dụ
```
.abc {
    padding: 20px 30px;
}
```
thì sau khi giảm sẽ là
```
.abc {
    padding: 14px 21px;
}
```
Nhưng như vậy thì thủ công và thật là khó phải không các bạn? Nhẩm hoặc bấm máy tính thì cũng có thể có sai sót và mất nhiều công đoạn hơn. Vì thế mình đã tìm hiểu và viết thành 1 function để sử dụng, lưu ý phần này mình viết trên CSS Processor SCSS nhé các bạn, các bước như sau:

**Tạo biến**
```
// Định nghĩa tỉ lệ giữa design và thực tế, trong dự án này của mình là 70%
$zoom_ratio: 0.7;
```

**Tạo hàm**
```
// Định nghĩa function, sẽ trả về giá trị là giá trị đầu vào nhân với biến $zoom_ratio ở trên
@function zoom_ratio ($value) {
  $return: ();

  @each $key in $value {
    $return: append($return, $key * $zoom_ratio);
  }

  @return $return;
}
```
Hàm này sẽ lọc hết các giá trị đầu vào và nhân với tỉ lệ của biến đã định sẵn, trả về giá trị sau khi được nhân, ví dụ sử dụng
```
.abc {
    padding: zoom_ratio(20px 30px);
    margin-top: zoom_ratio(100px);
    top: zoom_ratio(40px);
}
```
kết quả trả về như sau
```
.abc {
    padding: 14px 21px;
    margin-top: 70px;
    top: 28px;
}
```
Sau đó mình dùng function này cho tất cả các thuộc tính có chỉ định tới kích thước như: vị trí/ khoảng cách/kích thước.

### Kết luận
Bài viết được đúc rút từ kinh nghiệm bản thân qua dự án thực tế, hi vọng là 1 case study cho mọi người. Xin cảm ơn :).