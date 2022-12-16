Bài dịch sau được dịch từ nguồn: https://dyn.com/blog/what-is-a-ddos-attack/

Đây là phần tiếp nối của phần trước giới thiệu về [tấn công DDos](https://viblo.asia/p/tan-cong-ddos-la-gi-eW65GAEPZDO)

Ở bài trước, chúng ta đã được biết đến khái niệm thế nào là tấn công DDoS, những người tham gia và vai trò của từng yếu tố trong 1 cuộc tấn công DDoS. Tiếp theo đây sẽ là phần giới thiệu các phương thức tấn công và cách chúng vận hành cũng như các phương thức để giảm thiểu rủi ro khi bị tấn công.

Các kỹ thuật tấn công DDoS khác nhau có thể làm quá tải hoặc bão hòa hệ thống bị tấn công theo những cách khác nhau. Có 3 loại tấn công thường gặp: tấn công băng thông (Volumetric attacks), tấn công giao thức (protocol attacks) và tấn công ứng dụng (application attacks). Mỗi cuộc tấn công có thể kéo dài từ vài phút đến vài tháng và lượng request có thể rất nhỏ nhỏ, không đáng chú ý hoặc vượt quá thông lượng từng được ghi nhận - 1,35 terabit/s.


**1. Tấn công băng thông (Volumetric attacks)**

Tấn công băng thông làm bão hòa băng thông mà hệ thống bị nhắm đến sử dụng. Đây là kỹ thuật thường gặp nhất và cũng là dễ thực hiện nhất. Thường thì những kẻ tấn công sẽ vận dụng các kỹ thuật khuếch đại để sinh ra các request mà không cần dùng đến một lượng lớn tài nguyên.

Các vụ tấn công khuếch đại tận dụng lượng lớn phản hồi đến những request nhỏ, từ đó khuếch đại lượng request để làm quá tải hệ thống mục tiêu. Quá trình này thường được thực hiện bằng cách giả mạo nguồn của các gói, hay còn gọi là phản xạ hay tấn công phản xạ. Ví dụ, với việc giả mạo nguồn IP của một request DNS, kẻ tấn công có thể lừa máy chủ DNS gửi phản hồi đến mục tiêu thay vì nguồn truyền dữ liệu. Vì request gửi đến máy chủ DNS rất nhỏ nhưng phản hồi gửi đến hệ thống nạn nhân lại lớn nên kẻ tấn công sẽ sử dụng phản xạ để khuếch đại lượng request gửi đến hệ thống này.

![](https://images.viblo.asia/84d35181-19ee-46d0-b677-046f0f9aadb2.png)

Với ví dụ đám cháy trong hộp đêm ở bài trước, nếu số lượng người trong hộp đêm đủ để bão hòa đường dây điện thoại khiến những người thực sự muốn gọi điện không thể gọi hoặc chỉ gọi được với chất lượng kém thì đây có thể gọi là một vụ tấn công băng thông.


**2. Tấn công giao thức (protocol attacks)**

Các cuộc tấn công giao thức tận dụng các lỗ hổng ở Layer 3 hoặc Layer 4 của mô hình OSI, nghĩa là chúng sẽ sử dụng hết bộ nhớ, các lõi xử lý, hoặc làm quá tải nguồn thiết bị hoặc các mạng lưới giữa hệ thống bị nhắm đến và user ở đầu kia.

Trong ví dụ với 911 ở bài trước, điều này tương tự với việc các nhân viên trực tổng đài trả lời từng cuộc gọi và giữ các cuộc gọi đó trong khi trả lời các cuộc gọi khác. Cuối cùng, tất cả các đầu dây đều sẽ có các cuộc gọi được giữ, và sau đó những cuộc gọi này sẽ bị bỏ lỡ.


![](https://images.viblo.asia/7914a2ee-a164-4db6-894a-d8d6f63e77c0.png)

**3. Tấn công ứng dụng (application attacks)**

Tấn công tầng ứng dụng là loại hình tấn công hiệu quả nhất và rất khó để phát hiện và giảm thiểu. Những cuộc tấn công kiểu này không cần dùng lượng lớn request như các loại hình tấn công khác. Mục tiêu của tấn công DDoS là một khía cạnh của máy chủ hoặc ứng dụng. Tất cả các request đều có vẻ bình thường nên ứng dụng sẽ cố gắng phản hồi từng request một, dẫn đến việc bị quá tải.

Nếu các tổng đài viên trong ví dụ về 911 ở bài trước phản hồi từng cuộc gọi giống nhau, nghĩa là trả lời những cuộc gọi không khẩn cấp hay không hợp lệ giống với các cuộc gọi khẩn cấp (ví dụ: không tái định tuyến chúng sang số không khẩn cấp) thì họ sẽ bị quá tải và các cuộc gọi khẩn cấp hợp lệ sẽ không được nhận.

![](https://images.viblo.asia/ee41275e-b19e-4b19-830f-41773060cfb3.png)

**4. Các hình thức tấn công DDoS khác**

Gần đây hơn, những kẻ tấn công còn vận dụng các vector đa tấn công cùng lúc khiến công việc bảo vệ hệ thống khó khăn hơn rất nhiều. Đây được gọi là những cuộc tấn công từ chối dịch vụ liên tục nâng cao. Hơn nữa, khi công nghệ phát triển, các cuộc tấn công DDoS cũng phát triển, khiến cho công việc bảo vệ khó khăn hơn rất nhiều. Ví dụ, việc sử dụng các thiết bị IoT đã gia tăng số lượng và chủng loại các thiết bị kết nối internet cho những kẻ tấn công khai thác, điều đó cũng đồng nghĩa với việc bóng đèn thông minh hay bàn chải thông minh của bạn cũng có thể trở thành một phần của hệ thống botnet.

Hơn nữa, nhà cung cấp của dịch vụ bị nhắm đến có thể bị tấn công thay vì dịch vụ, do đó nguyên nhân và mục tiêu ban đầu sẽ càng khó xác định hơn. Điều này sẽ ảnh hưởng đến lượng người dùng lớn hơn vì các hệ thống và dịch vụ không liên quan cũng sẽ bị tấn công.

Trong tương lai, rất có thể các hacker mã độc sẽ tận dụng trí tuệ nhân tạo và tri thức về máy móc để cho phép tự động thay đổi các cuộc tấn công khi chúng tiến triển đến các kỹ thuật tấn công tối ưu hơn.

**5. Ai đang cố gắng ngăn chặn những vụ tấn công trong tương lai?**

Khi đã đọc đến đây, chắc bạn cũng đã biết rằng ta không thể ngăn chặn những vụ tấn công từ chối dịch vụ và những vụ tấn công này đang ngày càng trầm trọng.

Vậy liệu có hy vọng nào không?

Có đấy. Có rất nhiều công ty về trí thông minh mạng làm công việc thu thập và chia sẻ dữ liệu về các vụ tấn công DDoS. Lượng dữ liệu này có thể được sử dụng để truy ra thủ phạm, xác định các máy chủ và botnet bị ảnh hưởng, và nghiên cứu về sự phát triển của các vụ tấn công DDoS. 

Thực tế là có rất nhiều đồng sự và đối thủ trong ngành đã chung tay để cùng chống lại các vụ tấn công này. Ví dụ, vào mùa hè trước, Botnet của WireX đã bị ngăn chặn khi các chuyên gia từ nhiều công ty (Akamai, Cloudflare, Flashpoint, Google, Oracle Dyn, RiskIQ, Team Cymru, và nhiều công ty khác) phối hợp với nhau. Đây là một ví dụ tuyệt vời về cách mà các công ty và cá nhân cùng hợp tác để cải thiện chất lượng internet cho tất cả mọi người.

![](https://images.viblo.asia/3bcb8cff-9393-4482-ac28-07cc56015745.png)

### Tôi có thể bảo vệ dịch vụ của mình khỏi những vụ tấn công DDoS bằng cách nào?
Bạn có rất nhiều cách bảo vệ dịch vụ hay ngăn chặn các vụ tấn công DDoS. Hãy thử các cách sau:

- Xem xét cấu trúc ứng dụng hay hệ thống, phân tích các điểm mấu chốt, khả năng của user và các tùy chọn chuyển đổi dự phòng. 
- Cân nhắc việc sử dụng các công cụ hay dịch vụ kiểm thử của bên thứ 3 để mô phỏng các cuộc tấn công và hiểu sâu hơn về các điểm yếu trong hệ thống của mình.
- Theo dõi các request bình thường có liên quan để nhận biết khi các tình huống bất thường xảy đến.
- Theo dõi các phương tiện truyền thông và báo chí để nhận biết các dấu hiệu về những vụ tấn công hoặc lời đe dọa sắp đến, nhất là khi các dịch vụ của bạn liên quan đến những chủ đề gây tranh cãi.
- Lên kế hoạch phản hồi với những công đoạn, quy trình và kế hoạch hỗ trợ khách hàng rõ ràng, và đảm bảo rằng cả nhóm đều được đào tạo để giảm thiểu ảnh hưởng.
- Vận dụng các công cụ cảnh báo để thông báo cho cả nhóm khi có những dấu hiệu request, vấn đề về kết nối hoặc các sự kiện ứng dụng bất thường; và kết hợp những mục này vào kế hoạch phản hồi.
- Đánh giá và cân nhắc các dịch vụ được cung cấp bởi các nhà cung cấp hay các chuyên gia trong lĩnh vực này để chống lại và giảm thiểu tác động của những vụ tấn công DDoS. Có rất nhiều công ty có chuyên môn về lĩnh vực ngăn chặn và giảm nhẹ tấn công DDoS chứ không chỉ là các công ty như Oracle Dyn, Akamai, Cloudflare, Arbor Networks, Imperva, và F5. 
Những công ty này cung cấp các nghiên cứu và dịch vụ để bảo vệ và giảm nhẹ tác hại của các vụ tấn công. Bằng nhiều biện pháp như phát hiện DDoS, giảm thiểu tình trạng khẩn cấp, phát hiện điểm yếu, xâm nhập mạng lưới và kiểm thử load, phân tích truyền dữ liệu thực, hấp thụ khối lượng, tường lửa ứng dụng web, các mạng lưới truyền nội dung, phát hiện các bot độc, và áp dụng các thuật toán dựa trên trí tuệ nhân tạo, bạn có thể giảm thiểu tác hại của các vụ tấn công DDoS lên dịch vụ của mình.

Dù không thể ngăn chặn hoàn toàn những vụ tấn công từ chối dịch vụ, chúng ta vẫn có rất nhiều cách để bảo vệ dịch vụ và giảm thiểu tác hại của những vụ tấn công đó. Hãy nghiên cứu thật nhiều về lĩnh vực này, chuẩn bị một kế hoạch cụ thể, và tận dụng các dịch vụ bảo vệ để  cải thiện dịch vụ của mình. Siêng năng là rất quan trọng, nhưng cũng cần nhớ rằng có rất nhiều người trong ngành này cũng đang làm tất cả mọi thứ có thể để giữ cho mạng internet hoạt động trơn tru.