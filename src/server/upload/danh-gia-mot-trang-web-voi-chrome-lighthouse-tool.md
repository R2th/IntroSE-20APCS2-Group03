# Một cách đánh giá trang web - Lighthouse
Có lẽ bạn đã từng thử kiểm tra trang web mình đang phát triển với các website như: 

* **[web.dev](https://web.dev/measure/)**
![](https://images.viblo.asia/b7dc5f9f-c8a2-4e0c-b996-47e5cac129d3.png)


hay 
* **[PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
![](https://images.viblo.asia/8aefe9b1-0a8e-4ae0-8b10-66c640b46617.png)**

Các website thật tuyệt bởi chúng xem trang web của bạn hoạt động tốt như thế nào. Sau đó, gửi các mẹo để cải thiện trải nghiệm người dùng cho bạn.

Nhưng vấn đề nó là là website nhận url public, những thứ không yêu cầu đăng nhập còn những trang mà chỉ dành cho người dùng đã đăng nhập thì sao? Liệu có thể kiểm tra mà không cần đăng nhập không? Có lẽ có cách nhưng một vấn đề đặt ra là bạn có tin tưởng giao tài khoản của mình cho 1 trang web khác không? Có lẽ thôi chẳng kiểm tra thì hơn vì lo được lo mất.

Để giải quyết vấn đề này thì Chrome đã cung cấp cho bạn 1 tool được tích hợp sẵn trên browser mà không lo vấn đề cấu hình, không cần lo vấn đề tìm trang web để đánh giá trang web của mình, không cần lo chia sẻ mật khẩu cho 1 trang web hay người nào khác để họ đánh giá mình hay chạy cho `localhost` cũng được nữa. Vâng tool mình đang nói ở đây là `Lighthouse` - Ngọn hải đăng chỉ lối cho trang web của bạn :heart_eyes:
![](https://images.viblo.asia/11fe454a-5a42-482c-a372-a79600c8ed39.png)

Nếu bạn không tìm thấy tool này thì có lẽ nó đã bị ẩn đi, hãy vào More tool trong Setting để ***lôi*** nó ra và để trên thanh công cụ Chrome
![](https://images.viblo.asia/84a75dc5-bc61-4209-ab18-c2ada43787e9.png)
# Sử dụng
## Cài đặt
Cài đặt là không cài đặt gì cả, bạn chỉ cần để default rồi chạy thôi :rofl:

Đùa đấy, cài đặt ở đây mình muốn nói là các lựa chọn bạn muốn sử dụng để kiểm tra:
* Performance - Cái này có thể xem chi tiết trong tool performance (mình có 1 bài về cái này ở [here](https://viblo.asia/p/chrome-devtools-performance-tool-07LKX944ZV4))
* Progressive Web App
* Best preactices
* Accessibility
* SEO


Theo mặc định thì thiết bị bạn test là Mobile (vì mạng điện thoại dởm hơn mạng máy tính mà :stuck_out_tongue_winking_eye: và ngoài ra thì điện thoại không được trang bị tối tân như máy tính). Nhưng bạn cũng có thể test cho máy tính bằng cách chọn Desktop.
## Generate report
Cài đặt rồi thì chạy thôi, `generate report` đợi vài giây và tận hưởng, à nhầm nếu đây là web site chưa được tối ưu thì đây có lẽ là nơi ác mộng của bạn bắt đầu - Tại sao nó lại thấp như thế này? và bạn sẽ bắt đầu chỉnh sửa hàng loạt để tối ưu website của mình - thật là ác mộng! 

Ừ nào mình cùng chạy thử với trang web của viblo nào (sử dụng tab ẩn danh và tắt các extension gây ảnh hưởng đến việc tải trang)?

https://viblo.asia/p/chrome-devtools-performance-tool-07LKX944ZV4

kết quả:
![](https://images.viblo.asia/f2600c7b-fc2d-410b-92c3-87986466d679.png)

Nhìn vào đây mình có thể chủ quan đánh giá cho trang web này là: Hiệu suất thấp, Khả năng tiếp cận trung bình, Thực hành tốt, SEO tốt.

Bắt đầu với thông số thứ 1 được đánh giá - `Performance`:
18/100 điểm - có lẽ hơi khiêm tốn nhưng hiệu suất là cái có thể khó tối ưu nhất nên thôi mình không bàn đến điểm số.

Click vào để xem chi tiết:
![](https://images.viblo.asia/6c60b77f-8ae7-4946-afa5-9affb0861916.png)
- **Metrics** `First Contentful Paint` - FCP: đánh dấu thời điểm mà văn bản hoặc hình ảnh đầu tiên được vẽ (cảnh báo đỏ 3,4s). Các trang web có điểm cao thường có FCP là 1,5s bạn có thể tham khảo ở `Learn more` của báo cáo hoặc ở [đây](https://web.dev/first-contentful-paint/?utm_source=lighthouse&utm_medium=lr) cách tính.  Tương tự cho các thông số khác.
- Ừ biết điểm rồi mình quan tâm là làm như thế nào để điểm này có thể cao lên được? Tiếp tục kéo xuống chúng ta tìm ra **`Những đề xuất`** cho trang web của bạn:
![](https://images.viblo.asia/913e9349-736f-4791-987f-b80c2a83c88c.png)
- Tải trước các yêu cầu chính.

- Xóa JavaScript không sử dụng: ví dụ ![](https://images.viblo.asia/e301bfc5-1686-4560-9cef-05bd9c9f0403.png)
- .... còn rất nhiều đề xuất tuyệt với cho bạn hãy thử đọc nhé!
- **Diagnostics** Chuẩn đoán những gì làm cho trang web của bạn có hiệu suất thấp
![](https://images.viblo.asia/8543fdf3-6b19-4a87-8bac-5a478f1a93ce.png)
ví dụ ở trên thì chuẩn đoán là `Avoid chaining critical requests 13 chains found`. Cân nhắc giảm độ dài của chuỗi, giảm kích thước tải xuống của tài nguyên hoặc trì hoãn tải xuống tài nguyên không cần thiết để cải thiện tải trang.
- **Passed audits** chỉ ra các test mà trang web của bạn đã vượt qua - càng nhiều càng tốt :cowboy_hat_face:

--- Mới 1 phần test `Performance` mà đã nhiều điều có thế sử dụng như vậy rồi, mọi người hãy đọc và xem tiếp với các phần test Accessibility, SEO, và  Best preactices nhé.

Ngoài ra bạn cũng có thể cài thêm các plugin để test các chức năng khác.

Mặt khác thì `Lighthouse` cũng có thể được cài bằng extension và bằng các command Node xem thêm [tại đây](https://developers.google.com/web/tools/lighthouse)

# Kết luận
`Lighthouse` là một tool tuyệt với chính vì thế nó đã được add thẳng vào browse chrome của bạn, hãy cùng nhau tận hưởng những tính năng mà nó mang lại nào. (letgo)

Tham khảo thêm tại: [developers.google.com](https://developers.google.com/web/tools/lighthouse)