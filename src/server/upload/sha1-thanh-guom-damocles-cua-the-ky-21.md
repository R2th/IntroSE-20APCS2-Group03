**Bỗng một sang thức dậy bạn nhận ra tất cả hệ thống và thông tin của bạn bị tấn công, điều này sẽ không hề quá bất ngờ, rất có thể bạn đã trở thành mục tiêu của hackers vì sự trung thành của bạn dành cho [SHA1](https://trustca.vn/sha-1-tham-guom-damocles-cua-the-ky-21/). Các nhà nghiên cứu đã thành công trong việc thực hiện tấn công va chạm với SHA1, tạo ra 2 tệp PDF với cùng 1 chữ ký từ năm 2015**

Những nhà nghiên cứu bảo mật đã thành công trong việc tạo ra 1 vụ tấn công va chạm thực tế nhằm vào SHA1, tạo ra 2 tệp PDF với cùng 1 chữ ký mã SHA1. Điều này chứng minh rằng việc sử dụng thuật toán này cho chức năng bảo mật thông tin nhạy cảm phải bị chấm dứt càng sớm càng tốt.

SHA1 (Secure Hash Algorithm 1) được sử dụng từ năm 1995 và được biết đến là dễ bị chọc thủng bằng các cuộc tấn công về mặt lý thuyết từ năm 2005. Viện Tiêu chuẩn và Kỹ thuật Quốc gia Hoa Kỳ đã cấm việc sử dụng SHA1 với các cơ quan liên bang Hoa Kỳ từ năm 2010, và các nhà cung cấp dịch vụ chứng thực chứng thư số không được phép cấp các chứng thư ký bởi SHA1 từ 1/1, năm 2016, mặc dù vẫn có vài ngoại lệ.

Tuy nhiên, bất chấp những hạn chế trong việc sử dụng SHA1 ở nhiều khu vực, hàm băm này vẫn được sử dụng rộng rãi để chứng thực giao dịch thẻ tín dụng, tài liệu điện tử, chữ ký email PGP/GPG, kho lưu trữ phần mềm mã nguồn mở, sao lưu và các bản nâng cấp phần mềm.
![](https://images.viblo.asia/f6a292dd-ac8f-453f-aa22-a7c8230a5976.jpg)

Một mã hàm băm như SHA1 được sử dụng để tính toán 1 chuỗi chữ và số, được coi như 1 chuỗi mã hoá đại diện cho 1 tệp hoặc 1 đoạn thông tin. Kết quả này được gọi là bản rút ngắn và được coi như 1 chữ ký số. Nó được cho là duy nhất và không thể bị đảo ngược.

Nếu 1 điểm yếu của mã hàm băm được tìm thấy mà chấp nhận cho 2 tệp có cùng 1 bản rút gọn, chức năng mã hoá sẽ bị coi như hoàn toàn thất bại, bởi vì dấu vân tay số được tạo ra có thể bị làm giả và không thể tin tưởng. Những kẻ tấn công có thể, ví dụ, tạo ra 1 phần mềm cập nhật giả mạo vẫn được chấp nhận và được kích hoạt bởi cơ chế cập nhật chứng thực những cập nhật này bằng việc kiểm tra các chữ ký số.

Vào năm 2012, các nhà mã hoá đã ước tính rằng những tấn công vào SHA1 có thể gây tổn thất lên tới $700,000 bằng việc sử dụng các dịch vụ thương mại điện toán đám mây trước năm 2015 và $173,000 trước năm 2018. Tuy nhiên, vào năm 2015, một nhóm các nhà nghiên cứu từ Viện Nghiên cứu toán học và Khoa học máy tính Quốc gia Hà Lan (CWI), Đại học Công nghệ Nanyang (NTU) từ Singapore và Inria của Pháp đã tìm ra 1 cách để bẻ gãy SHA1 mà họ tin rằng có thể sẽ giảm chi phí một cách đáng kể.

Từ đó, các nhà nghiên cứu từ CWI đã làm việc với Google, sử dụng cơ sở hạ tầng tính toán đồ sộ của công ty để tiến hành phương án tấn công và đã tạo ra được va chạm về măt thực tế. Họ đã thành công mặc dù phải mất đến 9×1030 phép toán SHA1.

Google cho biết, phép toán này tương đương với năng lực xử lý của 1 chiếc CPU (Central Processing Unit) trong 6500 năm và 110 năm xử lý của 1 GPU (Graphic Processing Unit) duy nhất, là 1 trong những phép toán lớn nhất họ từng hoàn thành. Những phép tính toán này được thực hiện trên cùng 1 cơ sở hạ tầng cung cấp năng lượng cho chuơng trình trí tuệ nhân tạo Alphago của Alphabet và các dịch vụ như Google Photo và Google Cloud.
![](https://images.viblo.asia/929472b4-878d-4847-9035-a749364c86ab.jpeg)

Liệu điều này có nghĩa rằng va chạm SHA1 là hoàn toàn trong tầm tay với những kẻ tấn công? Hoàn toàn không, nhưng điều này chắc chắn nằm trong khả năng đối với phạm vi quốc gia. Trong vòng ít hơn ba tháng, các nhà nghiên cứu đã có kế hoạch công bố mã nguồn đã được sử dụng cho cuộc tấn công để từ đó, các nhà nghiên cứu khác có thể học hỏi.

“Trong tương lai, điều này cấp thiết hơn bao giờ hết cho các chuyên gia bảo mật, rằng họ cần phải thay thế sang một mã hoá hàm băm an toàn hơn, ví dụ như SHA256 và SHA3”, Google đưa ra ý kiến trong một bài viết trên blog vào Thứ 5. “Để phòng chống việc sử dụng phương pháp tấn công này, chúng tôi đã bổ sung các phương thức bảo mật có khả năng phát hiện kỹ thuật tấn công va chạm với tệp PDF cho những người dùng Gmail và GSuite. Hơn nữa, chúng tôi đang cung cấp hệ thống phát hiện miễn phí cho cộng đồng.”

Bắt đầu với phiên bản 56, được công bố vào tháng này, Google Chrome sẽ chỉ ra tất cả các chứng thư HTTPS được ký bởi SHA1 là không an toàn. Đồng thời, các nhà cung cấp trình duyệt khác đang lên kế hoạch tương tự.
![](https://images.viblo.asia/16345906-2fe2-4b8c-837b-794f6fc8668b.png)


Hy vọng rằng những nỗ lực mới của Google trong việc tạo ra các tấn công thực tế sẽ thúc đẩy các nhà cung cấp và nhà quản lý cơ sở hạ tầng nhanh chóng dỡ bỏ SHA1 khỏi các sản phẩm và cả cài đặt của họ, bởi vì, mặc dù “SHA1 đã trở nên lỗi thời, một vài nhà cung cấp vẫn kinh doanh những sản phẩm không có tính hỗ trợ cho các mã hàm băm hiện đại hoặc để thực hiện điều đó thì khách hàng phải trả thêm phí”, ông David Chismon – Cố vấn An ninh cấp cao tại MWR InfoSecurity nhận định. “Liệu rằng việc thay thế SHA1 có thể xảy ra trước khi các đối tượng xấu lợi dụng nhằm trục lợi cá nhân hay không, điều này vẫn chưa thể đoán trước được”.

#SAVIS Đơn vị đầu tiên tại Việt Nam cung cấp Dịch vụ Chứng thực Ký số công cộng SHA256