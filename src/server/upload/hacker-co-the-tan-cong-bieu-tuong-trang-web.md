# Tại sao website lại bị hacker tấn công?
Việc website của bạn bị hacker tấn công thường xảy ra vì đã bỏ qua những chi tiết nhỏ. Dù bạn biết chính xác mối đe dọa là gì, nhưng bạn không nghĩ rằng nó sẽ ảnh hưởng tới trang web, bạn nghĩ rằng - "Website của tôi chẳng có gì, tại sao hacker lại tấn công, tôi chẳng phải là mục tiêu của họ".

Gần đây có một khách hàng đã phàn nàn với mình về người dùng trên website của họ bị mất quyền truy cập. Mình phát hiện website của họ đã bị hacker tấn công ngụy trang shell PHP dưới dạng biểu tượng của trang web.

# Mục đích tấn công?
Khi hacker đã tấn công ngụy trang shell PHP dưới dạng biểu tượng của trang web, mục đích họ giữ quyền truy cập từ xa vào các máy chủ trang web của bạn và đưa các trình thực thi JavaScript vào trang web với mục đích lấy cắp thông tin của người dùng.

Theo Malwarebytes Jérôme Segura những web shell này gọi là **Smilodon** hoặc **Megalodon** được sử dụng để thực hiện hành động trình đọc JavaScript thông qua các yêu cầu phía máy chủ vào các trang web bán hàng trực tuyến. Kỹ thuật này hầu hết các công cụ bảo mật phía máy khách sẽ không thể phát hiện hoặc chặn nó.

Hacker tấn công website bán hàng trực tuyến để lấy cắp thông tin chi tiết thẻ ngân hàng,... được cho là phương thức thử nghiệm của Magecart, một nhóm gồm các hacker khác nhau nhắm mục tiêu vào các hệ thống giỏ hàng trực tuyến. Còn được cho là **formjacking attack**, hacker chèn đoạn mã JavaScript vào trang web, thường là trên các trang thanh toán, nhằm mục đích nắm bắt thông tin chi tiết thẻ của người dùng trong thời gian thực và truyền tải chúng đến một hệ thống của hacker.

Mặc dù việc inject skimmers thường hoạt động bằng cách đưa request phía client với tài nguyên JavaScript bên ngoài, được lưu trữ trên miền do hacker kiểm soát khi khách hàng truy cập vào website bán hàng trực tuyến, một website khác cũng bị hacker inject skimmers ở phía máy chủ.
![](https://images.viblo.asia/f6c4e22f-9e40-4709-b486-024afa35b25a.png)
![](https://images.viblo.asia/7eef0449-5690-4798-9aee-72b830420592.png)
Trên đây, web shell dựa trên PHP, chúng được ngụy trang dưới biểu tượng trang web **ime.png**. Dev đã không quản lý chặt chẽ **input** và **output** khiến hacker có thể chèn vào website bằng cách ngụy trang biểu tượng trang web trong HTML trong tệp chứa ảnh của trang web. Theo mình được biết, website này có điểm tương đồng trong cuộc tấn công Cardbleed vào tháng 9 năm ngoái.
![](https://images.viblo.asia/2888a302-a676-4b31-85fc-a4b2bf0abe4b.png)
Malwarebytes quy chiến dịch mới nhất cho Magecart Group 12 dựa trên sự trùng lặp về chiến thuật, kỹ thuật và quy trình được sử dụng, thêm "tên miền mới nhất mà mình đã tìm thấy (zolo [.] Pw) tình cờ được lưu trữ trên cùng một địa chỉ IP (217.12.204 [ .] 185) dưới dạng recaptcha-in [.] Pw và google-stk [.] Pw, các miền trước đây được liên kết với Magecart Group 12. "

Hoạt động với mục đích chính của hacker là thu thập và lấy dữ liệu thanh toán, các thông tin cá nhân của nền tảng bán hàng trực tuyến. Từ việc ngụy trang shell dưới dạng biểu tượng trang web, hacker thực hiện các cuộc tấn công đồng nhất IDN để cài đặt trình duyệt web được che giấu trong tệp favicon của trang web đến việc sử dụng Google Analytics và Telegram làm kênh truy quét, giúp hacker tăng cường nỗ lực xâm nhập các cửa hàng trực tuyến.