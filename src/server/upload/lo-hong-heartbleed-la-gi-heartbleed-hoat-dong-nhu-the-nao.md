`"Heartbleed - Trái tim rỉ máu" là một lỗ hổng bảo mật rất nghiêm trọng, có mức độ ảnh hưởng đến 2/3 thiết bị internet trên toàn cầu. Vậy thì 'Heartbleed' là gì? cũng như cách hoạt động của nó như thế nào? Các bạn hãy đọc tiếp bài viết này của mình để biết chi tiết hơn.`

![](https://images.viblo.asia/2c59728a-1dc5-4063-8f02-9f1467a99ca9.jpg)

## Lỗ hổng Heartbleed là gì?

Heartbleed là một lỗ hổng được tìm phát hiện vào tháng 4 năm 2014. Heartbleed cho phép những kẻ tấn công truy cập dễ dàng vào thông tin bí mật, nhạy cảm của các dữ liệu cá nhân. Chúng có thể xâm nhập và lấy đi hàng tá thông tin cá nhân bao gồm tất cả tin nhắn, email, mật khẩu, ... và rút lui không một dấu vết.

Heartbleed là một lỗ trong OpenSSL, một thư viện mã nguồn mở dùng để triển khai TLS (Transport Layer Security) và SSL (Secure Sockets Layer), được Google, Facebook, Yahoo, Amazon và rất nhiều trang web lớn trên thế giới sử dụng để bảo vệ việc truyền tải thông tin cá nhân của người dùng.

(Có nhiều bạn không biết OpenSSL là gì, nhưng chúng ta nhìn thấy nó hằng ngày khi lướt `Facebook` đó là: biểu tượng ổ khóa nằm ngay trên thanh địa chỉ của trình duyệt, bên cạnh HTTPS khi truy cập vào các trang có chứng chỉ mã hóa.)

Nói tóm lại, một kẻ tấn công có thể dễ dàng lừa một máy chủ web gặp lỗ hổng này gửi thông tin nhạy cảm cho hắn, bao gồm cả `username` và `password`.

## Cách hoạt động của Heartbleed

Để hiểu rõ được cách hoạt động của `Heartbleed (CVE-2014-0160)`, bạn cần biết một chút cách các giao thức TLS/SSL hoạt động và cách máy tính lưu trữ thông tin trong bộ nhớ.

Một thứ quan trọng của giao thức TLS/SSL là cái được gọi là `Heartbeat`. Về cơ bản, đây là cách hai máy tính liên lạc với nhau cho nhau biết rằng chúng vẫn đang được kết nối ngay cả khi người dùng không downloading hoặc uploading bất cứ thứ gì ở thời điểm hiện tại. Ví dụ hai máy tính A và B đang kết nối với nhau. Thỉnh thoảng, máy tính A sẽ gửi một phần dữ liệu được mã hóa, được gọi là `heartbeat request`, đến máy B. Máy tính B sẽ trả lời lại cùng với một phần dữ liệu được mã hóa, chứng minh rằng kết nối vẫn còn.

Vì vậy, ví dụ, nếu bạn đang đọc Yahoo mail của mình nhưng không làm gì trong một thời gian để tải thêm thông tin, trình duyệt của bạn có thể gửi tín hiệu đến các máy chủ Yahoo, dạng như: `"Mày sắp nhận được một tin nhắn với dung lượng 40KB. Mày hãy gửi lại tất cả cho tao."` ( các request có thể dài tới 64KB). Khi máy chủ Yahoo nhận được thông báo đó, họ sẽ cấp phát bộ đệm - một vùng bộ nhớ vật lý nơi nó có thể lưu trữ thông tin - dài 40KB, dựa trên dung lượng yêu cầu của heartbeat request. Tiếp theo, nó lưu trữ dữ liệu được mã hóa từ yêu cầu đó vào bộ nhớ đệm, sau đó đọc lại dữ liệu và gửi lại cho trình duyệt của bạn.

**Một cách khái quát về hoạt động của `Heartbleed`:** Lỗ hổng `Heartbleed` xuất hiện do việc triển khai tính năng `heartbeat` của OpenSSl bị thiếu biện pháp bảo vệ quan trọng: Máy tính nhận được `heartbeat request` không bao giờ kiểm tra để đảm bảo yêu cầu xác thực, miễn là nó được request (yêu cầu). Vì vậy, nếu một request cho nó biết độ dài 40KB nhưng thực tế chỉ có 20KB, máy tính nhận sẽ dành ra 40KB bộ nhớ đệm. Sau đó lưu trữ 20KB mà nó thực sự nhận được, sau đó gửi lại 20KB đó cộng với bất cứ thứ gì trong bộ đệm để được 20KB nữa (vì heartbeat request yêu cầu 40KB). Như vậy kẻ tấn công đã thực hiện trích xuất được 20KB từ máy chủ.

**Phần quan trọng nhất trong cách hoạt động của Heartbleed.** Khi một máy tính hoạt động thì thông tin mà lưu ở bộ nhớ đệm, nó vẫn tồn tại trong bộ nhớ đệm cho đến khi có thứ gì đó khác xuất hiện để ghi đó lên nó. Nếu bạn là kẻ tấn công, bạn không có cách nào để biết trước những gì có thể ẩn trong 20KB bạn vừa lấy được từ máy chủ, nhưng vẫn tồn tại một cách nào đó. Bạn có thể nhận được các private key của SSL, cho phép giải mã thông tin liên lạc an toàn đến máy chủ đó (điều này tuy là khó xảy ra, nhưng đối với một kẻ tấn công thì chưa chắc chắn được). Thông thường, bạn có thể lấy được username/password đã gửi tới các ứng dụng và dịch vụ đang chạy trên máy chủ, giúp bạn giành quyền truy cập.

## Dòng mã Heartbleed

Lỗi mã hóa gây ra Heartbleed có thể được truy ra từ dòng mã:

```cpp
memcpy(bp, pl, payload);
```

* `memcpy()` là lệnh sao chép dữ liệu.
* `bp` là nơi nó sao chép nó vào.
* `pl` là nơi nó được sao chép.
* `payload` là chiều dài của dữ liệu được sao chép.

Điều trớ trêu nhất là do OpenSSL là phần mềm mã nguồn mở. Bất cứ ai cũng có thể biết được `source code`, và có đến hàng trăm người đóng góp nhưng không một ai nhận ra được lỗi khá là cơ bản.

## Bản sửa lỗi Heartbleed

Các bản vá lỗi đã được kịch liệt tung ra cho OpenSSL ngay khi lỗ hổng được công bố và đến thời điểm này thì có thể các máy chủ đã cập nhật, nhưng vẫn phải kiểm tra nếu bạn không chắc chắn - luông có khả năng một số máy chủ quan trọng nào đó của bạn đã hoạt động nhiều năm mà không cập nhật. `Pentest-tools.com` có một chức năng kiểm tra trên web cho phép bạn nhập URL để xem máy chủ đã được cập nhật bản vá đúng hay chưa. Một số tools bổ sung: `https://testssl.sh/`

Cách khắc phục lỗ hổng Heartbleed là nâng cấp lên phiên bản OpenSSL mới nhất. Bạn có thể tìm thấy các liên kết đến tất cả các mã mới nhất trên trang web OpenSSL.

Nếu bạn tò mò về mã thực hiện sửa lỗi, bạn có thể xem nó, OpenSSL là nguồn mở:

```cpp
/* Read type and payload length first */

if (1 + 2 + 16 > s->s3->relent)
    return 0;

/* silently discard */
hbtype = *p++;
n2s(p, payload);

if (1 + 2 + payload + 16 > s->s3->rrec.length)
    return 0;

/* silently discard per RFC 6520 sec. 4 */
pl = p;
```

Phần đầu tiên của mã này đảm bảo rằng yêu cầu nhịp tim không phải là 0 KB, điều này có thể gây ra vấn đề.

Phần thứ hai đảm bảo request thực sự có tồn tại.

Nếu bạn phát hiện một máy chủ bạn đang dùng đã bị bỏ quên (ít khi động đến), thì bạn cần phải làm nhiều thứ để đảm bảo an toàn ngoài việc cập nhật bản vá lỗi của OpenSSL như:

* Bạn nên thay đổi chứng chỉ SSL được sử dụng bởi các máy chủ, vì chúng có thể đã bị tấn công mà không để lại dấu vết.
* Người dùng trên hệ thống thì cần thay đổi mật khẩu mới.

## Tổng kết

* Qua bài viết này mình muốn nói cho các bạn biết về `Lỗ hổng Heartbleed là gì? Heartbleed hoạt động như thế nào?`.
* Bài học rút ra là tất cả mọi phần mềm / hệ điều hành không có cái nào là hoàn hảo cả, nên hãy cập nhật bản vá lỗi thường xuyên.
* Hãy cẩn thận với việc sử dụng những phần mềm mã nguồn mở.

Bài tham khảo trên blog của mình: https://manhnv.com/2019/07/lo-hong-heartbleed-la-gi-heartbleed-hoat-dong-nhu-the-nao/