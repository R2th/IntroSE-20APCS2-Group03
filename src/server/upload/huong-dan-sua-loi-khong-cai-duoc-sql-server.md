Hôm qua do yêu cầu môn học, mình có cài lại Microsoft SQL Server. Trước đó mình có cài rồi, nhưng rồi lâu không dùng nên gỡ ra cho nhẹ máy. Bây giờ có dịp cần nên mình mới cài lại.

Và thực sự cảm giác cực kì tệ, mình đã phải **gỡ ra và cài lại** gần chục lần mà vẫn không xong :rage:. May mắn là cuối cùng cũng cài được sau gần hai ngày phát bực với nó. Bài viết hôm nay mình sẽ chia sẻ cách làm của mình đến cho các bạn đang gặp tình trạng tương tự. Ok bắt đầu thôi.

## Chi tiết lỗi mình gặp phải

Lỗi mình gặp là **The MOF compiler could not...** như hình dưới. 

![](https://images.viblo.asia/f6d94ec3-26ab-4b33-80a5-619c8bde04cf.png)

Rồi đôi lúc không bị lỗi đó mà lại bị lỗi **Perlib** như thế này (ảnh này lấy trên mạng do mình quên capture lại rồi).

![](https://images.viblo.asia/6d52c9c2-6aaf-4fad-a0f8-8ac3b072880e.png)

Mình đã search google khá nhiều rồi, gỡ ra và cài lại khá nhiều, và cảm thấy thực sự bất lực. Nào là:

* Không được cài trong thư mục có khoảng trắng
* Tắt bật service gì đó
* Cài bản Developer thay vì express

Cuối cùng thì qua ngày thứ hai, mình đã tìm được nguyên nhân. Đó là do trước đây mình đã cài SQL Server rồi mà gỡ chưa sạch, nên không thể cài lại bản mới được.

## Cách sửa lỗi

Như đã nói ở trên, lý do là do version trước đó chưa được gỡ hết. Mình tìm được và tải tool có tên **Microsoft Program Install and Uninstall**. Nó giống giống như kiểu Windows troubleshooter ấy, cơ mà hữu dụng hơn :D.

Link tải công cụ ở đây https://support.microsoft.com/vi-vn/windows/kh%E1%BA%AFc-ph%E1%BB%A5c-c%C3%A1c-s%E1%BB%B1-c%E1%BB%91-ng%C4%83n-b%E1%BA%A1n-x%C3%B3a-ho%E1%BA%B7c-c%C3%A0i-%C4%91%E1%BA%B7t-ch%C6%B0%C6%A1ng-tr%C3%ACnh-cca7d1b6-65a9-3d98-426b-e9f927e1eb4d, trong đó có nút Download.

Sau khi tải về, chỉ cần chọn Uninstalling, chờ một tí để nó quét registry thì sẽ ra giao diện như sau.

![](https://images.viblo.asia/101277c6-241d-43e1-aefa-4dbf9d77eb08.png)

Sau đó các bạn gỡ hết các mục có chữ **SQL** ra là được (tránh các tên có SQL khác như MySQL). Nhược điểm của tool này là mỗi lần chỉ gỡ được 1 mục, nên các bạn phải chạy và thao tác lại nhiều lần.

Sau khi gỡ xong hết, cần khởi động lại máy và cài lại SQL Server. Quá trình cài đặt diễn ra nhanh chóng và bình thường, hoàn toàn không còn lỗi gì nữa.

![](https://images.viblo.asia/3d53d75b-39a1-466c-bdd7-0bcf080e409c.png)

---

Ok đây chỉ là một bài viết ngắn, cảm ơn mọi người vì đã đọc. Hi vọng bài viết sẽ giúp được các bạn khác cũng bị lỗi giống như mình. Và nếu thấy bài viết hữu ích, hãy nhấn vote hoặc clip cho mình nhé. Thân <3