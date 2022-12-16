*Bài viết sau được dịch từ link: https://dyn.com/blog/what-is-a-ddos-attack/*

Tấn công DDoS là viết tắt của cụm từ distributed denial-of-service- một dạng tấn công nhằm khiến cho những dịch vụ trực tuyến, mạng hoặc ứng dụng bị ngừng hoạt động bằng cách làm tắc nghẽn kết nối đến các dịch vụ bằng những request từ nhiều nguồn, chặn những request hợp lệ.
Tấn công DDoS không chỉ ảnh hưởng đến những dịch vụ hay ứng dụng mục tiêu mà còn ảnh hưởng đến những user hợp pháp của những dịch vụ đó và tất cả những hệ thống liên quan bị tấn công bởi những mã nguồn độc.

Chúng ta đều đã nghe về DDosS trong các bản tin, từ cuộc tấn công nổi tiếng Mirai năm 2016 - cuộc tấn công đã đóng băng phần lớn hệ thống mạng ở phía Đông Mỹ cho đến cuộc tấn công phá vỡ các bản ghi của Github gần đây. Ở bài này, tôi sẽ giải thích chính xác DDoS là gì và chia sẻ 1 số phương thức để bạn có thể chống lại hoặc làm giảm nhẹ ảnh hưởng của các cuộc tấn công.

![](https://images.viblo.asia/18723631-7c45-4c6c-a753-2e5eb5d6858a.png)

#### Vậy chính xác tấn công DDos sẽ diễn ra như thế nào?

Hãy tưởng tượng bạn đang ở một hôm đêm đông đúc. Một người nào đó kéo chuông báo cháy và chạy vòng quanh rồi hét lên: Cháy Cháy. Ngay lập tức, hàng trăm người sẽ gọi 911 cùng lúc đó. Các đường dây đều rung đồng thời và người tiếp nhận sẽ phải chạy đua để trả lời những cuộc gọi đó. Đồng thời, có một vụ cháy thực sự diễn ra trong thị trấn, tuy nhiên những người dân ở đó lại không thể liên lạc được với bộ phận 911 bởi vì họ đang quá bận rộn với những cuộc gọi đến từ hộp đêm.
Tình huống này cũng tương tự như kịch bản tấn công DDoS, khi mà những request hợp lệ bị khóa trong lúc hệ thống đang cố gắng giải quyết một lượng lớn những request có vẻ hợp lệ nhưng thực tế lại là giả mạo.

#### Những loại dịch vụ thường bị tấn công và Lý do vì sao chúng lại trở thành mục tiêu của DDos?

Bất kể một dịch vụ trực tuyến nào đều có thể bị tấn công, tuy nhiên, những dịch vụ tài chính, game, và tin tức lại là những mục tiêu hay bị tấn công nhất. Thông thường, những kẻ tấn công thường cố gắng gửi 1 tin nhắn, có thể mang chính trị hoặc không, bằng việc khóa những truy cập thông tin. Kẻ tấn công có thể là một cá nhân, kẻ được thuê thưc hiện DDoS, các băng đảng tội phạm mạng có tổ chức hay các cơ quan chính phủ. Thỉnh thoảng, nguyên nhân dẫn đến DDoS cũng có thể là do lỗi mã code, hệ thống quá hạn hoặc thời gian của sự kiện. Có rất nhiều động cơ dẫn đến DDoS, từ “nhàn cư vi bất thiện”, tống tiền, cạnh tranh, cạnh tranh kinh doanh, đến phản đối chính trị và trả thù.

Với vụ tấn công Mirai botnet năm 2016, mục tiêu chính là hệ thống game trực tuyến và đánh cắp tài chính. Việc các đoạn mã của Mirai botnet có được dùng cho các mục đích khác hay không vẫn còn là một ẩn số.
![](https://images.viblo.asia/f9f17787-2ef7-4863-a464-9bc13d8ba14b.png)

Một điều cần lưu ý là trừ khi bạn có một máy chủ hoạt động như một phần của botnet thì thông thường, dữ liệu và thông tin của bạn sẽ không gặp rủi ro trong cuộc tấn công DDoS - chỉ có quyền truy cập của bạn vào hệ thống là bị ảnh hưởng. Tuy nhiên, một cuộc tấn công có thể áp đảo hoặc đánh lạc hướng các nhóm an ninh mạng, mở ra cơ hội cho tội phạm xâm nhập hệ thống theo những cách khác để lấy cắp thông tin. Đây mới chính là mối nguy hiểm, bởi vì cuộc tấn công có chủ đích hoặc có mục tiêu nhằm truy cập vào hệ thống và đánh cắp dữ liệu đang ẩn đằng sau cuộc tấn công DDoS hiện đang được xem nhẹ.

#### Những người chơi trong cuộc tấn công DDoS là ai?

1. Kẻ tấn công hoặc người có ý đồ xấu: 

Chắc chắn đây là người hoặc nhóm người thực hiện cuộc tấn công bằng cách sử dụng các thiết bị để tạo ra sự cộng hưởng. Những thiết bị này có thể là điện thoại di động, laptop, PC hoặc bất kỳ một thiết bị kết nối nào khác.

![](https://images.viblo.asia/91c8b8a4-5fc8-4f08-8e5f-1d65aebc2248.jpg)

2. Máy chủ và câu lệnh: 

Đầu tiên, kẻ tấn công phải tìm được một hệ thống master để sử dụng như máy chủ. Hệ thống này luôn có một lỗ hổng như thiếu bản vá lỗi hoặc bảo mật kém. Kẻ tấn công có thể xâm nhập hệ thống master bằng mã độc (malware) hoặc sử dụng một phương thức khác tương tự như malware để xâm nhập hệ thống. Khi đã có quyền điều khiển hệ thống, kẻ tấn công sẽ cài đặt botnet- một mạng lưới bao gồm các hệ thống dễ bị tổn thương khác để điều khiển từ máy chủ.

![](https://images.viblo.asia/ccebd61b-991c-47e5-b285-e9b8dac14c37.png)

3. Botnet và bot: 

Một botnet là mạng kết nối giữa các máy host trực tuyến (thường được gọi là bot hoặc zoombie)-  đã bị xâm nhập bởi mã độc (malware), cho phép kẻ tấn công, thông qua máy chủ, đưa ra chỉ thị cho mỗi máy host chuyển một lượng lớn các request đến các dịch vụ là mục tiêu tấn công. Botnet hoạt động như một đội quân được chỉ huy và được kiểm soát bởi máy chủ và kẻ tấn công. Bot có thể là bất cứ một thiết bị nào: từ điện thoại di động, laptops, router hoặc server cho đến các thiết bị Internet vạn vật (IoT) như camera an ninh hoặc các thiết bị cho các ngôi nhà thông minh. 

Thông thường, các bot trên toàn cầu sẽ sử dụng những nhà cung cấp khác nhau. Bằng việc phân phối nguồn của các request và sử dụng các máy host thực, các request giả được tạo ra càng giống thật, điều đó làm cho việc phân biệt và lọc ra các request giả từ 1 tập các request đến hệ thống khó khăn hơn rất nhiều. Hơn nữa, kẻ tấn công không thực sự vi phạm vào bất kỳ giao thức bảo mật nào của dịch vụ bị nhắm đến vì tất cả những request đến đều có dạng request hợp lệ.

Một lưu ý nhỏ là khi một botnet được tạo ra, nó có thể được dùng cho một mục đích khác như click bot. Một botnet đã tồn tại có thể được cho thuê để tiết kiệm thời gian cho những kẻ tấn công. Với việc sử dụng botnet, rất khó để phát hiện và theo dõi những kẻ tấn công thực sự do khối lượng hệ thống tham gia quá lớn.

![](https://images.viblo.asia/8b3b1df8-c097-451a-be23-52def09c030e.jpg)

4. Mục tiêu: 

Mục tiêu của các cuộc tấn công thường là dịch vụ, ứng dụng hoặc hệ thống mạng. Cuộc tấn công có thể gây ra mất kết nối hoặc phản hồi chậm, khiến khách hàng giận dữ, nhân viên căng thẳng, gây thiệt hại thương hiệu và tổn thất doanh thu lớn cùng với các vấn đề khác. Các dịch vụ khẩn cấp, truyền thông, giao dịch tiền tệ là các dịch vụ thường bị ảnh hưởng bởi các cuộc tấn công DDoS.
![](https://images.viblo.asia/fb4c1cd0-f122-4d7b-acad-5f552d1842cd.png)

5. Người tốt: 

Vậy ai đóng vai người tốt hoặc có người tốt trong những cuộc tấn công DDoS hay không? Rất vui vì câu trả lời là CÓ

Các tổ chức chính phủ, dịch vụ và các công ty tư nhân và nhà nước là những nơi tìm hiểu về các vụ tấn công và xây dựng các phương thức bảo vệ cùng các kỹ thuật giảm nhẹ ảnh hưởng của các cuộc tấn công chính là những “người tốt” trong các cuộc tấn công DDoS. Có rất nhiều phương thức được sử dụng như khoa học máy tính tư pháp, honeypots( hệ thống được thiết kế để đưa ra các lỗ hổng nhằm dụ kẻ tấn công thực hiện tấn công), các phương pháp theo dõi lưu lượng request bình thường và bất thường.
![](https://images.viblo.asia/1a6ebdd0-0066-4df8-9944-0266ed478362.jpg)

Bài dịch này tạm dừng tại đây. Trong phần tới mình sẽ đưa đến phần tiếp theo: các khái niệm cụ thể hơn về các loại tấn công và cách phòng ngừa chúng :)