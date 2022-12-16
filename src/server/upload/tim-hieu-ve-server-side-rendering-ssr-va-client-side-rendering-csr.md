# 1. Lời giới thiệu
Xin chào anh em, hiện nay trên thế giới có rất nhiều công nghệ rendering như : Server-side Rendering, Client-side Rendering, Pre-Rendering, Dynamic Rendering. Hôm nay mình và anh em sẽ tìm hiểu về Server-side Rendering và Client-side Rendering.
# 2. Các khái niệm
## Server-side Rendering:
Server-side Rendering là một cách hiển thị các ứng dụng web trên máy chủ và sau đó gửi phản hồi và nội dung lại cho người dùng. Điều này có nghĩa là khi người dùng mở một ứng dụng web, một yêu cầu được gửi đến máy chủ trả về phản hồi cùng với nội dung, tức là HTML, CSS, JavaScript và các nội dung khác cần thiết để hiển thị trang cho người dùng.
Đây là những gì sẽ xảy ra:
1. Người dùng gửi yêu cầu đến một trang web 
2. Máy chủ kiểm tra tài nguyên, biên dịch và chuẩn bị nội dung HTML sau khi duyệt qua các tập lệnh phía máy chủ nằm trong trang.
3. HTML đã biên dịch này được gửi đến trình duyệt của khách hàng để render và hiển thị.
4. Trình duyệt tải xuống HTML và hiển thị trang web cho người dùng
5. Sau đó, trình duyệt tải xuống Javascript (JS) và khi nó thực thi JS, nó làm cho trang tương tác
![](https://images.viblo.asia/1ef1e48c-480e-46af-8f7a-f4b3fbb5d8f3.png)

## Client-side Rendering:
Client-side Rendering là một cách hiển thị nội dung của ứng dụng web trên phía máy khách (trình duyệt). Điều đó có nghĩa là khi người dùng đưa ra yêu cầu ban đầu, máy chủ sẽ trả về một trang trống hoặc màn hình tải với một số tập lệnh.
Đây là những gì sẽ xảy ra:
1. Người dùng gửi yêu cầu truy cập nội dung web trên trình duyệt.
2. Máy chủ cung cấp các tệp tĩnh (CSS và HTML) cho trình duyệt của khách hàng theo yêu cầu đầu tiên của khách hàng đối với trang web.
3. Trình duyệt máy khách sẽ tải xuống nội dung HTML đầu tiên và sau đó là JavaScript. Các tệp HTML này liên kết JavaScript.
4. Sau khi trình duyệt tải xuống JavaScript, nội dung được tạo động trên trình duyệt của khách hàng.
5. Nội dung web sẽ hiển thị khi khách hàng điều hướng và tương tác với trang web.
![](https://images.viblo.asia/8d294a9c-e680-46e8-b2dd-f62130d98281.png)

# Ưu và nhược điểm:
## 1. Server-side Rendering:
### Ưu điểm:
1. Thời gian tải trang ban đầu nhanh hơn
2. Tốt cho SEO
3. Chạy được trên phần lớn mọi trình duyệt, kể cả disable JavaScript vẫn chạy tốt
### Nhược điểm:
1. Yêu cầu máy chủ thường xuyên: mọi yêu cầu của người dùng phải được gửi lại máy chủ để xử lý, điều này dẫn đến các vấn đề về hiệu suất.
2. Thời gian tải tổng thể chậm hơn
3. Mỗi lần người dùng chuyển trang là site phải load lại nhiều lần

## 2. Client-side Rendering:
### Ưu điểm:
1. Trang chỉ load 1 lần duy nhất
2. Logic được chuyển bớt sang Client nên Server được giảm tải
3. Giảm được băng thông
### Nhược điểm:
1. Không thân thiện với SEO
2. Thời gian tải trang ban đầu chậm hơn.
3. Trong hầu hết các trường hợp, yêu cầu một thư viện bên ngoài

# Kết luận:
Thông qua bài này hi vọng các bạn sẽ lựa chọn được phương án phù hợp nhất trong dự án của mình.

# Tham khảo:
https://www.solutelabs.com/blog/client-side-vs-server-side-rendering-what-to-choose-when