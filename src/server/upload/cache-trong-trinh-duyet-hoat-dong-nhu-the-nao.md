Bộ nhớ đệm của trình duyệt là một cơ chế được sử dụng bởi các trình duyệt để lưu trữ tài nguyên trang web cục bộ. Điều này làm hiệu suất tăng, giảm thiểu tiêu thụ băng thông . Trong bài viết này, tôi sẽ giải thích cách bộ nhớ đệm trình duyệt hoạt động và cách triển khai nó trên trang web của bạn.
# 1, Bộ nhớ cache của trình duyệt là gì?
Bộ đệm là một thành phần phần mềm hoặc phần cứng được sử dụng để lưu trữ tạm thời các giá trị để truy cập nhanh hơn trong tương lai. Bộ đệm của trình duyệt là một cơ sở dữ liệu nhỏ gồm các tệp chứa tài nguyên trang web đã tải xuống, chẳng hạn như hình ảnh, video, CSS, Javascript, v.v. Dưới đây là hình vẽ minh họa:
![](https://images.viblo.asia/36b2a172-1994-4678-8492-3ee0ea6a7bf5.png)
Trình duyệt yêu cầu một số nội dung từ máy chủ web. Nếu nội dung không có trong bộ đệm của trình duyệt thì nó được lấy trực tiếp từ máy chủ web. Nếu nội dung đã được lưu trong bộ nhớ cache trước đó, trình duyệt sẽ bỏ qua máy chủ và tải nội dung trực tiếp từ bộ đệm của nó.

Nội dung được coi là cũ tùy thuộc vào việc nội dung được lưu trữ đã hết hạn hay chưa. Mặt khác, Fresh có nghĩa là nội dung đã vượt qua ngày hết hạn và có thể được phục vụ trực tiếp từ bộ đệm của trình duyệt mà không liên quan đến máy chủ.

Bộ nhớ đệm trình duyệt có thể được các nhà phát triển web và quản trị viên tận dụng thông qua việc sử dụng các tiêu đề HTTP cụ thể. Các tiêu đề này hướng dẫn trình duyệt web khi nào nên lưu trữ tài nguyên, khi nào không và trong bao lâu. Việc sử dụng các tiêu đề liên quan đến bộ đệm HTTP có thể đôi khi gây khó chịu vì có sự trùng lặp với các tiêu đề trong suốt các lần tái sinh khác nhau của giao thức HTTP. Thêm vào những thứ hỗn hợp như proxy web kỳ lạ ở giữa, các trình duyệt cũ, các chính sách và triển khai bộ đệm xung đột (ví dụ như các plugin WordPress khác nhau) và nó có thể nhanh chóng trở thành vấn đề đau đầu.

# 2, Headers của bộ nhớ đệm trong trình duyệt
Tập hợp các quy tắc xác định những gì có thể được lưu trong bộ nhớ cache hay không và trong bao lâu được gọi là chính sách bộ đệm. Điều này được thực hiện bởi chủ sở hữu trang web thông qua việc sử dụng các respose header. Mặc dù điều này có thể đạt được bằng nhiều cách khác nhau, nhưng có lẽ bạn chỉ nên quan tâm đến bản thân mình với kiểm soát Cache, ngay từ đầu.

#  3, Cách thực hiện chính sách lưu trữ trên trang web của bạn
Có hai cách để thực hiện chính sách lưu trữ trên trang web của bạn. Đầu tiên là xác định các caching response headers trong cấu hình máy chủ web. Thứ hai là làm điều đó trực tiếp trong PHP. Dưới đây là ví dụ về hai máy chủ web phổ biến nhất là Apache2 và Nginx:

**Apache2**
```
<filesMatch “.(ico|pdf|flv|jpg|jpeg|png|gif|js|css|swf)$”>
Header set Cache-Control “max-age=84600, public”
</filesMatch>
```

**Nginx**
```
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {

expires 365d;
add_header Cache-Control “public”;

}
```

Như bạn có thể thấy nó khá đơn giản. Trong ví dụ đầu tiên, tôi sử dụng chỉ thị apache2 từ FileMatch để khớp với một tập hợp các kiểu tệp cụ thể (.ico, .pdf, v.v.) và đặt chúng ở chế độ công khai, với độ tuổi tối đa là 84600 giây. Trong lần thứ hai,  tôi lại khớp với một số loại tệp nhất định bằng cách sử dụng chỉ thị vị trí nginx, và bao gồm tuổi thọ tối đa là 365 ngày. Chúng tôi cũng định nghĩa chúng là các cộng đồng trên mạng bằng cách sử dụng mệnh đề thêm tiêu đề.

# 4, Kiểm tra cách hoạt động
Bạn có thể dễ dàng kiểm tra để xem các quy tắc bộ đệm của trình duyệt, bằng cách sử dụng, ví dụ: bảng điều khiển web Firefox hoặc Công cụ nhà phát triển Chrome Chrome
<br>
Bạn nhấn F12 và chuyển sang tab network, bạn thử đánh 1 địa chỉ nào đó trên thanh URl và enter xem điêu gì xảy ra
<br>
Bạn sẽ thấy một danh sách các yêu cầu khi URL của bạn đang tải. Chọn một tài nguyên bằng cách nhấp vào nó. Kiểm tra các tiêu đề Phản hồi ở bên phải và đặc biệt là Mã trạng thái. Nó in 200 Mã HTTP nhưng chỉ ra trong ngoặc đơn rằng nó là từ bộ nhớ cache.
![](https://images.viblo.asia/57ca6407-246a-4e64-91ca-98c849185132.png)

Điều này có nghĩa là tài nguyên đã được tải tự động từ kho lưu trữ bộ đệm cục bộ, thay vì yêu cầu nó từ máy chủ.

Trong trường hợp bạn có một mệnh đề bắt buộc phải xác nhận lại trên một tiêu đề Điều khiển bộ đệm, mã trạng thái sẽ là 304 (Không được sửa đổi). Điều này có nghĩa là trình duyệt của bạn xác nhận lại tài nguyên đối với máy chủ và máy chủ trả lời rằng nội dung đã thay đổi, do đó nó có thể được phục vụ từ bộ đệm cache của trình duyệt.

Tiến hành vô hiệu hóa bộ đệm bằng cách chọn Disable cache và nhấn Tải lại.

![](https://images.viblo.asia/87106e11-1f42-4614-8be6-daf1a42c39d5.png)

Trong trường hợp này, bạn thấy Mã trạng thái là 200 mà không có bất kỳ dấu hiệu nào cho thấy nó đã sử dụng bộ đệm. Trình duyệt yêu cầu tài nguyên từ máy chủ web và máy chủ web đã phản hồi bằng cách cung cấp lại một bản sao mới.

**Donate cho tác giả**: https://www.buymeacoffee.com/imphunq

### Tài liệu tham khảo: 

https://pressidium.com/blog/2017/browser-cache-work/