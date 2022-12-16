Như trong bài viết trước mình đã hướng dẫn các bạn mua VPS tại Digital Ocean - Một trong những nhà cung cấp máy chủ tốt nhất hiện nay: https://viblo.asia/p/huong-dan-mua-vps-tai-digitalocean-m68Z0L1XZkG .  Có tương đối nhiều các tính năng thông qua giao diện quản trị của nhà cung cấp, trong bài viết này mình sẽ hướng dẫn các bạn sử dụng các tính năng cơ bản và quan trọng nhất.
## Graphs
Đây là mục đồ thị thể hiện trực quan nhất tình trạng hệ thống VPS của bạn:
![](https://images.viblo.asia/e16e25d1-d6b6-4049-be5a-2422c61ad314.png)
- Bandwidth public: băng thông của máy chủ
- CPU Usage: mức độ CPU sử dụng, nếu mức độ CPU thường xuyên trên 70% thì rất có thể xảy ra tình trạng treo máy chủ. Bạn nên kiểm tra xem có truy cập bất thường hay bị tấn công không. Nếu có cần thiết lập chế độ bảo mật tốt hơn. Không thì đã đến lúc bạn nâng cấp máy chủ.
- Disk I/O: tình trạng ổ đĩa lưu trữ
Chú ý: Nếu thỉnh thoảng tại 1 thời điểm mức sử dụng đột ngột tăng thì có thể máy chủ của bạn đã bị tấn công. Cần xem log của server để phân tích tìm nguyên nhân.
## Access
- Console access: sẽ mở 1 cửa sổ console để bạn có thể kết nối đến máy chủ
- Reset root password: rất hữu dụng trong trường hợp bạn quên mật khẩu root.
## Resize
Như đã nói ở trên. Khi lượng truy cập của bạn quá lớn và máy chủ không còn đáp ứng tốt bạn có thể thay đổi các thông số của server trực tiếp tại đây. Tuy nhiên trước khi thay đổi bạn nên Backup hoặc tạo các bản snapshot và tải về máy trước đề phòng có lỗi trong quá trinh resize:
![](https://images.viblo.asia/dd950db2-1e76-4985-8df3-cdbbd7a1b29c.png)
- CPU and RAM only: nếu bạn không có nhu cầu lưu trữ quá nhiều thì đây là lựa chọn tốt nhất vì nó có thể khôi phục lại nếu xảy ra lỗi.
- Disk, CPU and RAM: cần cố gắng hạn chế nhất có thể vì không thể hồi phục lạ nếu xảy ra lỗi.
## Backups
Phần này rất quan trọng. Tuy nhiên bạn sẽ cần trả thêm phí để duy trì dịch vụ này. Để đề phòng các rủi ro xảy ra thì bạn nên sử dụng dịch vụ này. Có thể huỷ dịch vụ khi nào bạn muốn:
![](https://images.viblo.asia/553e08fc-0cef-4f7f-8565-f8d459dde2d5.png)
Chi phí backup sẽ phụ thuộc vào gói máy chủ bạn đang sử dụng. Tuy nhiên mặc định thì việc backup này được lập lịch sẵn 1 tuần 1 lần.
## Snapshots
Backup sẽ được lập lịch tự động. Tuy nhiên khi bạn muốn thực hiện sao lưu luôn server trước khi triển khai 1 tính năng mới thì đây là tính năng sẽ được sử dụng.
![](https://images.viblo.asia/58e4c4fc-c727-46c5-be97-d5685dbeee6b.png)
Chú ý việc tạo Snapshot sẽ mất khoảng thời gian khá lâu tuỳ thuộc vào dung lượng lưu trữ của máy chủ. Bạn nên kiên nhẫn chờ đợi.
Sau khi xong bạn có thể tải về máy. Khi có sự cố bạn có thể dễ dàng khôi phục lại.
Còn 1 vài tab tính năng cơ bản khác bạn có thể tìm hiểu dễ dàng trong quá trình sử dụng.
## Kết luận
Như vậy thông qua bài viết mình đã giới thiệu với các bạn 1 số các Tab quản lý cơ bản và đáng lưu ý khi mua máy chủ và sử dụng tại Digital Ocean. Tuy nhiên trong bài viết chưa có hướng dẫn chi tiết cài đặt và cấu hình để có thể chạy và sử dụng website. Trong bài viết sau mình sẽ hướng dẫn các bạn sử dụng Script Easy Engine để có thể cài đặt máy chủ 1 cách nhanh chóng và dễ dàng hơn.