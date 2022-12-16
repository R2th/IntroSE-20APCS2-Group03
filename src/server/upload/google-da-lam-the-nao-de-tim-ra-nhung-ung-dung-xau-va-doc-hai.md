### Xin chào!!!
Xin chào các bạn, lời đầu tiên mình xin gửi đến các bạn lời chúc một năm mới an khang - thịnh vượng. Chúc cho tất cả chúng ta code ngày càng ít bug hơn, đỡ bị tester than phiền nhiều hơn =)).

Hôm nay tôi sẽ chia sẻ một bài viết có vẻ như "không liên quan về tech" lắm, nhưng cực kỳ hữu ích cho các bạn lập trình viên Android đã - đang - sẽ phát hành ứng dụng của mình lên Google Play . Giúp anh em chúng ta tránh được những sai sót mà ta "vô tình" gặp phải trong khi phát triển ứng dụng Android nhé.

Chúng ta cùng tìm hiểu Google họ đã làm gì để phát hiện các app độc hại trên Google Play như thế nào thông qua bài viết dưới đây.
![](https://3.bp.blogspot.com/-parwLRqicHo/XGNQNWtIRgI/AAAAAAAAGvI/0upTcSNBhGM3DcOvcO94ChcCsfUUtidxgCLcBGAs/s1600/image3.png)
Google Play cam kết cung cấp một nền tảng an toàn và an toàn cho hàng tỷ người dùng Android trên hành trình khám phá và trải nghiệm các ứng dụng họ yêu thích và tận hưởng. Để thực hiện cam kết này, chúng tôi đã làm việc vào năm ngoái (2018) để cải thiện các công nghệ và hệ thống phát hiện lạm dụng và tuyển dụng thêm đáng kể đội ngũ quản lý sản phẩm, kỹ sư, chuyên gia chính sách và lãnh đạo hoạt động để chống lại các tác nhân xấu của các ứng dụng android đối với người dùng của chúng tôi.

Năm 2018, chúng tôi đã giới thiệu một loạt chính sách mới để bảo vệ người dùng khỏi các xu hướng lạm dụng mới, phát hiện và loại bỏ các nhà phát triển độc hại nhanh hơn và ngăn chặn nhiều ứng dụng độc hại xâm nhập vào Google Play Store hơn bao giờ hết. Số lượng xin publish ứng dụng bị từ chối tăng hơn 55% và chúng tôi đã tăng số lần đình chỉ ứng dụng lên hơn 66%. Sự gia tăng này là kết quả cho những nỗ lực liên tục của chúng tôi nhằm thắt chặt các chính sách từ đó giảm số lượng ứng dụng có hại trên Play Store, cũng như các khoản đầu tư công sức của chúng tôi vào các biện pháp bảo vệ tự động và các đánh giá từ chính những kỹ sư của chúng tôi đóng vai trò quan trọng trong việc xác định và xử lý các ứng dụng xấu.

Ngoài việc xác định và ngăn các ứng dụng xấu xâm nhập vào Cửa hàng Play, hệ thống Google Play Protect của chúng tôi hiện quét hơn 50 tỷ ứng dụng trên thiết bị của người dùng mỗi ngày để đảm bảo các ứng dụng được cài đặt trên thiết bị không hoạt động theo cách có hại. Với sự bảo vệ như vậy, các ứng dụng từ Google Play có khả năng gây hại cho thiết bị của người dùng ít hơn tám lần so với các ứng dụng Android từ các nguồn khác.

Dưới đây là một số lĩnh vực chúng tôi đã tập trung vào năm ngoái và đó sẽ tiếp tục là ưu tiên hàng đầu của chúng tôi trong năm 2019:

![](https://2.bp.blogspot.com/-6OOTXl-yzoY/XGNQaYIiPcI/AAAAAAAAGvM/jIsFO3jHqignEt64l6G_skZtmEhA5lKOQCLcBGAs/s1600/image4.png)
### Bảo vệ quyền riêng tư của người dùng
Bảo vệ dữ liệu và quyền riêng tư của người dùng là một yếu tố cực kỳ quan trọng trong việc xây dựng lòng tin của người dùng. Từ lâu, chúng tôi đã yêu cầu các nhà phát triển giới hạn các yêu cầu cấp phép thiết bị của họ ở những gì cần thiết để cung cấp các tính năng của ứng dụng. Ngoài ra, để giúp người dùng hiểu cách sử dụng dữ liệu của họ, chúng tôi đã yêu cầu các nhà phát triển cung cấp các tiết lộ nổi bật về việc thu thập và sử dụng dữ liệu nhạy cảm của người dùng. Năm ngoái, chúng tôi đã từ chối hoặc xóa hàng chục ngàn ứng dụng không tuân thủ chính sách của Play liên quan đến dữ liệu và quyền riêng tư của người dùng.

Vào tháng 10 năm 2018, chúng tôi đã công bố chính sách mới hạn chế sử dụng quyền SMS và Nhật ký cuộc gọi đối với một số trường hợp giới hạn, chẳng hạn như ứng dụng đã được chọn làm ứng dụng mặc định của người dùng để thực hiện cuộc gọi hoặc gửi tin nhắn văn bản. Gần đây chúng tôi đã bắt đầu xóa ứng dụng khỏi Google Play vi phạm chính sách này. Chúng tôi dự định giới thiệu các chính sách bổ sung cho quyền của thiết bị và dữ liệu người dùng trong suốt năm 2019.
![](https://1.bp.blogspot.com/-9KIuHngbx0c/XGNQiItQBDI/AAAAAAAAGvQ/3cmaZdblXWkoiXmXpfxnpVHEgLco3x64ACLcBGAs/s1600/image1.png)
### Tính toàn vẹn của nhà phát triển
Chúng tôi thấy rằng hơn 80% các vi phạm chính sách nghiêm trọng được thực hiện bởi những người vi phạm nhiều lần trước đó trong quá khứ và cùng với các networks nhà phát triển ứng dụng. Khi các nhà phát triển độc hại bị cấm, họ thường tạo tài khoản mới hoặc mua tài khoản nhà phát triển trên thị trường chợ đen để quay lại Google Play. Chúng tôi đã tăng cường hơn nữa các công nghệ clustering và account matching technologies (công nghệ phát hiện các tài khoản xấu ) của mình và bằng cách kết hợp các công nghệ này với các đánh giá của các kỹ sư của chúng tôi, chúng tôi đã gây khó khăn hơn cho các nhà phát triển spam bằng cách chặn các ứng dụng của họ được xuất bản ngay ở bước đầu tiên.
![](https://3.bp.blogspot.com/-VJ8CkR2c5y4/XGNQndK1GqI/AAAAAAAAGvU/xnRjl-15k_wjKenX-YMgI7Jvm2zewFxbgCLcBGAs/s1600/image2.png)
### Nội dung và hành vi ứng dụng có hại
Như đã đề cập trong bài đăng trên blog năm ngoái, chúng tôi đã chiến đấu chống lại hàng trăm ngàn kẻ mạo danh, ứng dụng có nội dung không phù hợp và Ứng dụng có hại tiềm tàng (PHAS). Trong cuộc chiến tiếp tục chống lại các loại ứng dụng này, chúng tôi không chỉ áp dụng các mô hình học máy tiên tiến để phát hiện các ứng dụng đáng ngờ, chúng tôi còn tiến hành phân tích tĩnh và động, sử dụng dữ liệu phản hồi và các báo cáo của người dùng và tận dụng các đánh giá có kỹ năng của con người, đã giúp tìm kiếm nhiều ứng dụng xấu với độ chính xác và hiệu quả cao hơn.

Mặc dù đã tăng cường và thêm các lớp phòng thủ chống lại các ứng dụng xấu, chúng tôi biết các diễn viên xấu sẽ tiếp tục cố gắng trốn tránh các hệ thống của chúng tôi bằng cách thay đổi chiến thuật của họ và che giấu các hành vi xấu. Chúng tôi sẽ tiếp tục tăng cường khả năng của mình để chống lại hành vi bất lợi đó và làm việc không ngừng nghỉ để cung cấp cho người dùng của chúng tôi một cửa hàng ứng dụng an toàn và an toàn.

Nguồn bài viết: https://android-developers.googleblog.com/2019/02/how-we-fought-bad-apps-and-malicious.html

Người dịch: Nguyễn Khuyến.