Hiện nay các cơ chế đồng thuận được biết đến nhiều nhất là **Proof-of-Work** (điển hình là Bitcoin) và **Proof-of-State** (ví dụ NXT). Nhưng trong chúng vẫn tồn tại những nhược điểm, để khắc phục  điều này **NEO** đã đề xuất cải tiến bằng cách sử dụng **Delegated Byzantine Fault Tolerance**(dBFT) làm cơ chế đồng thuận. Do đây vẫn còn là một cơ chế mới nên rất nhiều nhiều người đặt câu hỏi về cách thức hoạt động của nó và tại sao nó lại là một cải tiến so với các cơ chế đồng thuận khác. Hôm nay mình sẽ cùng các bạn làm sáng tỏ lý do tại sao nó lại được coi là cải tiến.

# Bài toán các vị tướng Byzantine
Đây là bài toán luôn xuất hiện khi chúng ta cần xác định tính đúng đắn của một cuộc bỏ phiếu. Hãy tưởng tượng 9 vị tướng trong đế chế Byzantine đã bao vây thành phố Rome bằng quân đội của họ. Để chiếm được thành công Rome, các tướng lĩnh phải tấn công hoặc rút lui một cách cùng nhau. Nếu bất kỳ hành động nào trái ngược với quyết định đồng thuận thì đội quân sẽ bị đánh bại. Quyết định tấn công hoặc rút lui được đưa ra từ một cuộc bỏ phiếu và lựa chọn nào nhận được trên 50% số phiếu sẽ được chọn. Vì mỗi Tướng đang chỉ huy quân đội của họ ở các vị trí địa lý riêng biệt xung quanh thành phố, họ sử dụng những người đưa thư để mang phiếu bầu cho các tướng khác.

Hệ thống này tồn tại những sai sót cố hữu. Đầu tiên, bất kỳ tướng quân Byzantine nào cũng có thể bị người La Mã mua chuộc để phản bội quân đội Byzantine, đây sẽ là những tướng quân phản bội. Thứ hai, những người đưa thư mang phiếu bầu của các tướng lĩnh có thể bị người La Mã mua chuộc để thay đổi số phiếu theo cách bất lợi. Và thứ ba, các nhà tướng quân có thể không gửi được thông điệp của họ hoặc gửi thông điệp sai.

Kịch bản của các tướng Byzantine là một sự tương tự cho vấn đề mà các hệ thống máy tính phân tán phải đối mặt: Làm thế nào để chúng ta đạt được sự đồng thuận khi phải đối mặt với các tác nhân không đáng tin cậy và gặp trục trặc đe dọa gây mất ổn định hệ sinh thái?

# Delegated Byzantine Fault Tolerance
Nhiều cơ chế đã được phát triển để giải quyết vấn đề của các tướng quân Byzantine. Trong đó có NEO họ triển khai Delegated Byzantine Fault Tolerance để giải quyết vấn đề đồng thuận này. Những người tạo ra NEO đã chọn giao thức này vì nó sẽ cho phép mở rộng quy mô và hiệu suất tốt hơn khi so sánh với các giải pháp hiện có.

Khả năng mở rộng là một vấn đề lớn đối với bất kỳ blockchain nào. Khi số lượng giao dịch và kích thước mạng tăng lên, blockchain phải có khả năng mở rộng theo tỷ lệ. Nếu nó không thể mở rộng theo nhu cầu thì các giao dịch sẽ bị trì hoãn hoặc không bao giờ được xử lý. Chúng tôi thấy vấn đề này hiện đang xảy ra với cuộc tranh luận về quy mô Bitcoin có nguy cơ làm **fork the blockchain**.

Để giải thích cách thức hoạt động của **dBFT**, tôi sẽ sử dụng một ví dụ như sau. Có một quốc gia tên là NEO. Mọi công dân đều được trao quyền bầu ra ai sẽ là người đại diện cho họ, người này được gọi là Delegate. Nếu công dân không đồng ý với cách mà Delegate đó bỏ phiếu thì họ có thể bầu ra cho một Delegate khác vào lần tới. Các Delegate này sau đó phải lắng nghe ý dân về những điều mà người dân muốn và đưa vào một cuốn sổ dự luật. Sau đó các dự luật sẽ được các Delegate cùng nhau thông qua, nếu được thông qua sẽ trở thành luật phát cho người dân.

Bây giờ sẽ đến phần thông qua các dự luật cần sự đồng thuận cao nhất từ các Delegate. Trong trường hợp này một Speaker sẽ được chọn ngẫu nhiên từ các Delegate. Speaker sẽ đề ra dự luật mà người dân yêu cầu rồi tính toán luật sẽ ảnh hưởng đến **Chỉ Số Hạnh phúc** của đất nước như thế nào (thước đo mức độ hạnh phúc của họ). Tiếp theo, Speaker trao tận tay cho các Delegate dự luật đề xuất của mình. Sau đó, các Delegate quyết định xem tính toán của Speaker có khớp với chính họ không và trao đổi với các Delegate khác để xác minh Chỉ Số Hạnh Phúc được tính là chính xác. Nếu trên 66% phần trăm số Delegate đồng ý rằng kết quả tính của Speaker nói là chính xác thì dự luật sẽ được thông qua và được hoàn thiện.

**Tất cả các node hoạt động trung thực với sự đồng thuận 100%**.
Luật A (khối) sẽ được xác minh.

![](https://images.viblo.asia/d534b223-2ffb-4c16-97c5-e037dc4647dc.png)

Nếu ít hơn 66% số Delegate đồng ý thì một Speaker mới được chọn ngẫu nhiên và quá trình bỏ phiếu được lặp lại. Hệ thống này được thiết kế để bảo vệ chống lại những kẻ phản bội và những người muốn phá hoại làm cho kết quả của đồng thuận bị sai.

Áp dụng sự tương tự này vào Neo blockchain, bất kỳ ai sở hữu NEO đều là công dân. Phần lớn chủ sở hữu NEO là node thông thường chỉ có thể chuyển hoặc trao đổi tài sản. Giống như công dân ở quốc gia NEO, họ không tham gia xác nhận block. Các Delegate ở trong NEO sẽ được gọi là **Bookkeeping Node**. Các node này xác minh từng block được ghi vào blockchain. Để trở thành Bookkeeping Node, cần phải đáp ứng một số yêu cầu chẳng hạn như phải có thiết bị đặc biệt, kết nối internet chuyên dụng và một lượng GAS nhất định (1.000)

Trong trường hợp này yêu cầu của người dân là các giao dịch được thực hiện bởi chủ sở hữu NEO. Dự luật sẽ là block hiện tại trong blockchain và Chỉ Số Hạnh phúc là hàm băm của block. Bây giờ hãy xem cách hệ thống tự bảo vệ.

#### Khi Speaker không trung thực
Luôn có cơ hội Speaker, người được chọn ngẫu nhiên từ các Delegate có thể không trung thực. Trong ví dụ sau đây, Speaker gửi một tin nhắn không đúng (dự luật B) đến 2 trong số 3 Delegate và một tin nhắn chính xác (dự luật A) đến 1 Delegate.

![](https://images.viblo.asia/ad116d78-ce7a-4c91-ba14-39713b49ecab.png)

Trong kịch bản này, đề xuất dự luật sẽ bị từ chối. Do Delegate ở giữa và Delegate bên phải sẽ không tính được Chỉ Số Hạnh phúc giống như chỉ số đề xuất bởi Speaker và không thể xác minh dự luật, dẫn đến có 2 sự từ chối. Delegate còn lại, người được gửi luật chính xác, sẽ xác nhận Chỉ Số Hạnh phúc được gửi bởi Speaker là chính xác vậy là chỉ có 1 chấp nhận. Đề xuất này sẽ bị từ chối vì nó không nhận được sự đồng thuận 66% (cần 2 phiếu) và một Speaker mới sẽ được chọn ngẫu nhiên, bắt đầu lại quá trình.

#### Delegate không trung thực
Trong tình huống này, Speaker là trung thực và một trong các Delegate là không trung thực.

![](https://images.viblo.asia/cd496a14-2e4e-42d5-af25-d5cc44e3e8f0.png)

Các Delegate trung thực (Trái và Giữa) sẽ có thể xác minh dự luật A được đề xuất bởi Speaker là trung thực và do đó đạt được sự đồng thuận 66%. Các Delegate cũng có thể xác định rằng Delegate phải là không trung thực.

# Tổng kết
NEO vẫn đang phát triển cơ chế đồng thuận Delegated Byzantine Fault Tolerance của họ. Bài viết này chỉ với mục đích cung cấp những cái nhìn tổng quát nhất về cơ chế đồng thuận này. Ngoài ra, vì **dBFT** vẫn đang được phát triển nên nhiều khía cạnh về cách thức hoạt đông của cơ chế này trên NEO blockchain vẫn chưa được công bố. Rất mong trong các bài viết tiếp theo có thể cung cấp thêm những thông tin mới nhất cho bạn đọc về cơ chế này.

#### Nguồn Tham Khảo: 
https://www.reddit.com/r/NEO/comments/6vlatx/dbft_beginners_explanation/
https://coinrivet.com/delegated-byzantine-fault-tolerance-dbft-explained/
https://docs.neo.org/developerguide/en/articles/consensus/consensus_algorithm.html