# 1. Mở đầu.
`Session` và `cookie` luôn là bài toán quen thuộc trong lập trình web. Khi đi phỏng vấn nhà tuyển dụng rất hay hỏi các câu hỏi như:
1. Session là gì?
2. Cookie là gì?
3. Session khác gì cookie?
4. Khi đóng trình duyệt session có mất không ? vv...

Các câu hỏi này không khó nhưng phải qua quá trình tìm hiểu và làm các project chúng ta mới thực sự hiểu sâu về nó. Hôm nay mình sẽ giúp các bạn trả lời các câu hỏi này một cách đơn giản và dễ hiểu nhất.
# 2. Session là gì?
`Session` hiểu đơn giản là một phiên làm việc của một người dùng. Nó được dùng để lưu trữ thông tin được sử dụng xuyên suốt trong nhiều trang web. Không giống như cookie session được lưu trên server.
# 3. Cookie là gì?
`Cookie` thường được sử dụng để định danh người dùng. Cookie là một tệp tin nhỏ được lưu trên máy người dùng. Mỗi khi cùng một máy tính yêu cầu một trang trình duyệt sẽ gửi kèm cookie 
# 4. Session khác gì cookie


| Cookie  | Session | 
| -------- | -------- |
| Cookie được lưu trữ trên máy tính của người dùng.     | Session không được lưu trữ trên trình duyệt.     |
|Dữ liệu cookie được lưu trữ ở phía client.|Dữ liệu session được lưu trữ ở phía server.|
|Dữ liệu cookie dễ dàng sửa đổi hoặc đánh cắp khi chúng được lưu trữ ở phía client.|Dữ liệu session không dễ dàng sửa đổi vì chúng được lưu trữ ở phía máy chủ.|
|Dữ liệu cookie có sẵn trong trình duyệt đến khi expired.|Sau khi đóng trình duyệt sẽ hết phiên làm việc (session)|


# 5. Khi đóng trình duyệt session có mất hay không
Đối với các bạn mới lập trình thậm chí fresher khi gặp câu hỏi này thường rất mông lung thường mọi người sẽ trả lời là có . Nhưng câu trả lời này có vẻ chưa đúng lắm. Mình sẽ nói như thế này để các bạn dễ hiểu. Trong pure PHP ví dụ khi chúng ta thực hiện chức năng đăng nhập thành công
![image.png](https://images.viblo.asia/75a5516e-6287-43c1-9bf6-5250a919e288.png)
Các bạn để ý trên trình duyệt sẽ sinh ra `PHPSESSID` cái này được gọi là `SESSIONCOOKIE`. Giá trị của `PHPSESSID` sẽ tương ứng với tên file Session được lưu trong thư mục /var/lib/php/sessions/
![image.png](https://images.viblo.asia/e24eee8b-50d4-4f09-932c-0f361f5d1105.png)
```
Lưu ý với mỗi trình duyệt sẽ sinh ra một file với tên là PHPSESSID khác nhau.
```
Khi ta đóng trình duyệt tức là phiên làm việc đã kết thúc trình duyệt sẽ tự động sinh ra `PHPSESSID` mới còn dữ liệu `session`  được lưu ở trong file sẽ chỉ mất khi hết timeout. Các bạn có thể hiểu trường hợp này như ta  có ổ khóa mà không có chìa khóa hoặc không đúng chìa khóa. Để giữ trình duyệt vẫn hoạt động sau khi đóng trình duyệt ta chỉ cần thêm thời gian cho **expires**. Mặc định trong PHP `expires` sẽ là Session nên đóng trình duyệt sẽ bị mất.
# 6. Tổng kết
Hi vọng bài viết của mình hữu ích với các bạn. Nếu có câu hỏi hay thắc mắc vui lòng comment bên dưới mình sẵn sàng trả lời nha. Cảm ơn các bạn.
# 7. Tham khảo
https://www.w3schools.com/php/php_cookies.asp
https://www.w3schools.com/php/php_sessions.asp
https://topdev.vn/blog/session-la-gi-cookie-la-gi/