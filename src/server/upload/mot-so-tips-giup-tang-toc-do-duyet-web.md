# Một số tips giúp tăng tốc độ duyệt web
1. Giới thiệu
2. Xác định nguyên nhân bằng cách sử dụng tool
3. Chi tiết và cách cải thiện hiệu suất
4. Kết
## 1. Giới thiệu
-  Khi chúng ta xây dựng một website chúng ta có đầy đủ giao diện trực quan, đẹp đẽ, logic nghiệp vụ hoạt động tốt. Nhưng nếu trang website sau khi nào ra không thu hút được nhiều người dùng thì điều đó có nghĩa là website của bạn còn thiếu thứ gì đó. Có thể do trải nghiệm người dùng chưa tốt hoặc quan trọng hơn là hiệu suất của website kém
-  Ngày nay traffic tới từ thiết bị di động cũng rất cao đòi hỏi website phải phản hồi nhanh nhất có thể.
-  Chúng ta sẽ cần làm gì trong trường hợp này ? Chắc chắn là chúng ta cần đi tìm cách để tối ưu hóa hiệu suất website của bạn, để làm được điều này chúng ta cần kiểm tra kỹ website trước khi phát hành.
-  Trong bài viết này sẽ hướng dẫn mọi người tìm ra nguyên nhân và một số cách tối ưu hóa hiệu suất để người dùng có trải nghiệm tốt hơn trên website của bạn.
## 2. Xác định nguyên nhân bằng cách sử dụng tool
Trước tiên để xác định nguyên nhân website hiệu suất kém chúng ta có thể sử dụng một số tool như: 

1.  https://developers.google.com/speed/pagespeed/insights/
2.  https://gtmetrix.com/
3.  https://www.webpagetest.org/

Ví dụ về tool của google: 
![](https://images.viblo.asia/f25534f8-441d-490a-a90c-bcf874a4c132.png)

Chỉ cần nhập url của website mà bạn muốn phân tích và bấm nút phân tích là bạn đã có được kết quả.

## 3. Chi tiết và cách cải thiện hiệu suất
**Tốc độ tải trang của trang web này mất khoảng 4s bao gồm độ trễ đầu vào, lần tải nội dung đầu tiên, bố cục**

![](https://images.viblo.asia/290a251e-71c0-4143-a622-f7d5731eff52.png)

**Dưới đây là các phần mà chúng ta có thể cải thiện**

![](https://images.viblo.asia/4fcebec0-1881-4112-9c70-fdb6dc4d57dd.png)
- Ví dụ đối với tải trước các request chính thì tool có gợi ý chúng ta sử dụng `<link rel = preload>` để ưu tiên tìm nạp các resource được yêu cầu sau khi tải trang. 
- Đối với javascript thì cần loại bỏ các đoạn mã javascript không được sử dụng.
- Đối với css thì cần loại bỏ các đoạn mã css không còn sử dụng.
- Đối với hình ảnh thì cần giảm thiểu dung lượng ảnh xuống 
- Loại bỏ các thuộc tính javascript cũ để cung cấp cho trình duyệt hiện đại.

**Một số điểm khác mặc dù không ảnh hưởng đến điểm hiệu suất nhưng chúng ta vẫn có thể cải thiện**

![](https://images.viblo.asia/7397d553-ce87-4f89-9ef9-ef26b122a4a7.png)

- Tránh tạo DOM có kích thước quá lớn (nhiều phần tử con)
- Tránh sử dụng quá nhiều document.write()
- Có thể sử dụng font-display: swap trong @font-face để hiển thị font của hệ thống trước khi website hiển thị font mà chúng ta nhúng vào
- Cố gắng giảm thiểu mã từ bên thứ 3, nên cho mã từ bên thứ 3 tải cuối cùng.
- JavaScript and CSS minifier để giảm tốc độ đọc mã, có thể sử dụng cái [này](https://www.minifier.org/)

## 4. Kết
- Đây là một số cách để cải thiện hiệu suất website của bạn. Cảm ơn các bạn đã đón đọc !!