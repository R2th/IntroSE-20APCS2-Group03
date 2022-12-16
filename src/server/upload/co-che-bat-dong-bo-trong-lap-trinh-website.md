Chắc hẳn các bạn làm web không còn lạ gì với cụm từ "bất đồng bộ" đúng không. Tuy nhiên bạn đã hiểu được hết cơ chế và ứng dụng của nó chưa ? Hôm nay hãy cùng tôi tìm hiểu về vấn đề này nhé!

![](https://images.viblo.asia/f4884414-ba42-4a1a-8303-c4c06c9256e7.png)

*Bất đồng bộ =  mặc quần áo không cùng bộ với nhau (?)*


# 1. Bài toán thực tế:
Hồi còn học ở trường, tôi từng làm 1 dự án website về làm trắc nghiệm tiếng Anh. Khi người dùng giải 1 câu trắc nghiệm, nếu đúng họ sẽ được cộng 3 điểm, nếu sai họ sẽ bị trừ 1 điểm, 1 website khá đơn giản đúng không. Khi người dùng submit thì chỉ cần kiểm tra đáp án đó có đúng hay không , nếu đúng thì update điểm của họ thêm 3, sai thì trừ đi 1. Quá đơn giản!

Tôi test ở local cũng thấy rất mượt mà. Hí hửng đẩy code lên hosting. Và kết quả...

Khác với ở local, khi đẩy lên hosting, tốc độ update điểm trên website chậm 1 giây so với thực tế. Nghĩa là khi người dùng trả lời xong, giả sử đáp án đúng thì 1 giây sau điểm mới được cập nhật. Điều này cũng dễ hiểu thôi vì tốc độ trên website còn tùy thuộc vào tốc độ mạng của người dùng và tốc độ xử lý của máy chủ. Nhưng nếu không thể cập nhật điểm tức thời sẽ gây trải nghiệm khó chịu cho người dùng, nên tôi sẽ tìm cách tối ưu nhất có thể.

Tôi vò đầu suy nghĩ tìm cách giải quyết, tôi tăng thêm băng thông cho hosting, tối ưu câu truy vấn, tối giản xử lý code nhất có thể. Và trời không phụ lòng người, kết quả cải thiện lên trông thấy, giảm được hẳn 0,25s , có nghĩa là vẫn chậm so với thực tế ... 0,75s.

Trong lúc tưởng chừng là bế tắc nhất , tôi đã nghĩ ra 1 cách "khá hay ho", giúp giảm thời gian delay xuống còn 0s, nghĩa là cập nhật điểm ngay lập tức khi người dùng vừa submit đáp án. Lúc đó tôi còn chưa biết gọi tên nó là gì, nhưng bây giờ khi đã có chút chút kinh nghiệm, thì tôi đã biết , tên của nó là "bất đồng bộ".

Cách này rất đơn giản, đầu tiên khi load câu hỏi, tôi sẽ load đáp án kèm theo. Khi họ chọn đáp án đúng hoặc sai, tôi sẽ dùng javascript kiểm tra đúng hay sai và cập nhật ngay lập tức điểm cho họ. Có nghĩa là việc xử lý cập nhật điểm hoàn toàn là trên máy tính người dùng và bằng javascript vì thế không có thời gian delay. Tuy nhiên, vậy nếu người dùng load lại trang hoặc vào thông tin của mình xem điểm chẳng phải sẽ không thấy điểm được cập nhật sao ? Đơn giản, tôi chỉ cần gửi 1 request lên server cập nhật điểm của người dùng vào database cùng lúc với việc update điểm bằng javascript là được . Việc gửi request này là cập nhật điểm thực tế, còn việc xử lý bằng javascript ở local là cập nhật điểm ảo, 2 hành động này xảy ra đồng thời nhưng không ảnh hưởng tới nhau, gọi là 2 luồng riêng biệt, đó chính là bất đồng bộ.

**Khái niệm**: *Bất đồng bộ là việc xử lý đa luồng, trong đó các luồng chạy riêng biệt, không ảnh hướng tới nhau.*

# 2. Bất đồng bộ ở Front End
Bài toán thực tế ở trên là một ví dụ cho bất đồng bộ ở Front end. Ngoài ra tôi thấy ứng dụng bất đồng bộ ở Front end rất nhiều, một ví dụ đơn giản khác đó là tính năng gửi tin nhắn của facebook.

Khi bạn thực hiện gửi tin nhắn cho 1 người khác, tin nhắn sẽ không thể đến lập tức với người nhận vì 1 quãng thời gian delay do mạng và thời gian xử lý của server. Tuy nhiên facebook xử lý rất thông minh khi hiển thị tin nhắn này ngay lập tức trên bảng chat của 2 người sau khi bạn vừa bấm nút gửi (việc hiển thị này được xử lý bằng javascript ngay chính trên máy người dùng), đồng thời, facebook sẽ thực hiện 1 luồng bất đồng bộ khác gửi tin nhắn đến cho người nhận. Request này sẽ cần khoảng 0,5s để xử lý, khi người nhận thực sự nhận được tin nhắn thì một dấu tích màu xanh xuất hiện bên cạnh tin nhắn trước đó, còn nếu tin nhắn gửi đi không thành công thì sẽ hiển thị message đỏ thông báo, đồng thời tin nhắn cũ bị mờ đi. Bằng cách sử dụng bất đồng bộ, facebook đã "đánh lừa" người dùng rằng tin nhắn được gửi gần như là ngay lập tức, khiến họ có trải nghiệm tốt hơn.
![](https://images.viblo.asia/1aa4d84d-c886-4095-be4a-ac6ea7ac5b08.png)
*Nhưng đôi khi trải nghiệm cũng không được tốt lắm!*

Để kiểm tra điều này, bạn có thể thử nghiệm bằng cách sau. Mở hộp hội thoại nhắn tin cho 1 người bất kỳ, ngắt kết nối internet, soạn tin nhắn và gửi, tin nhắn sẽ được hiển thị ngay lập tức trên bảng hội thoại trong khi máy tính của bạn đang không có mạng. Bạn mở lại internet và reload lại trang, dòng tin nhắn kia đã biến mất.

![](https://images.viblo.asia/ee6e23d3-3f09-49a9-b40e-711f6098acfe.png)

*Thí nghiệm của tôi*

# 3. Bất đồng bộ ở Back end
Bất đồng bộ ở back end cũng đa dạng không kém. Ví dụ khi bạn lấy lại mật khẩu bằng email, bạn điền địa chỉ email của mình và bấm submit, gần như ngay lập tức hành động của bạn sẽ được thông báo đã thành công. Thực tế email bạn phải mất một thời gian khá lâu mới nhận được tin nhắn gửi về, nhưng nó được thực hiện bởi 1 luồng bất đồng bộ chạy ngầm, song song với việc bạn submit, bao giờ request ngầm được thực hiện xong thì tin nhắn sẽ tự động gửi về email của người dùng. Thử tưởng tượng, nếu không sử dụng bất đồng bộ trong trường hợp này, khi bạn bấm nút submit, bạn phải ngồi nhìn màn hình 5 phút để thực hiện request này. Quá bất tiện !

Một số ví dụ khác :

- Thống kê xem hôm nay chốt được bao nhiêu đơn hàng: Vào 12h đêm hằng ngày, database sẽ tự động thực hiện request kiểm tra xem hôm nay các shipper đã chốt được bao nhiêu đơn hàng và update dữ liệu vào database, hành động này sẽ chạy ngầm bất đồng bộ, không ảnh hưởng gì tới hoạt động của app.
- Upload ảnh / video
- Export file v..v...