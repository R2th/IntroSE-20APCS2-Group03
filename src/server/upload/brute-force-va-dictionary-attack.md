### I. Khái niệm chung <br><br>
Tiếp nối bài viết về password tại <a href="https://viblo.asia/p/tim-hieu-ve-password-va-password-attacks-hien-nay-aWj53e7GZ6m"> đây </a> và 1 số câu hỏi được hỏi, cũng như vài vấn đề vừa gặp trong học tập. Hôm nay chúng ta sẽ đến với 2 phương thức Password Attack: Brute Force và Dictionary Attack <br>
Brute Force và Dictionary Attack về phương thức có thể nói là như nhau, bằng một cách nào đó, gửi nhiều payloads nhất tới target để tìm được giá trị đúng. <br>
Sự khác nhau ở đây, chính là ở payload được thử, tuy nhiên sự khác biệt này chúng ta sẽ tìm hiểu ở phần III <br>
### II. Ở 2019, liệu Brute Force và Dictionary Attack có còn ''đất diễn'' ? <br><br>
Nếu  bạn đã đọc bài về password ở phía trên rồi, bạn sẽ biết lý do vì sao password cổ điển hiện nay vẫn còn rất phổ biến và không thể bị thay thế hoàn toàn. <br><br>
Vector tấn công của Brute Force và Dictionary Attack có thể nói là giống nhau, đối với các dịch vụ trực tuyến hiện nay gần như không thể dùng nó để tìm được password đúng: Password của người dùng phải đảm bảo đủ phức tạp theo chính sách, hạn chế số lần nhập sai password, sử dụng Captcha...là những cách phổ biến khiến Vector tấn công này trở nên vô hại <br><br>
Nhưng bạn sẽ nghĩ sao khi biết rằng, giữa năm 2019 này, Vector tấn công này có thể sử dụng để chiếm account của bất cứ ai trên nền tảng MXH chia sẻ ảnh lớn nhất thế giới Instagram ? <br>
Các bạn có thể đọc bài viết gốc tại  <a href="https://thezerohack.com/hack-any-instagram#articlescroll"> đây </a> <br><br>
![](https://images.viblo.asia/0ad58cb0-f28e-4bff-b3f4-a8452ca035d4.png) <br> <br>
Tóm tắt nhanh: Khi reset password của user trên app di động ( sử dụng số điện thoại ), sẽ có 1 mã 6 chữ số gửi đến số điện thoại, mã có tác dụng trong 10 phút. Các cơ chế bảo mật được áp dụng, đương nhiên rồi, sẽ chống việc Brute Force mã này. <br>
Nhưng kết hợp thêm 2 phương thức <b> Race Hazard</b> và <b> IP rotation </b>, cùng sự tiện dụng và...rẻ của việc thuê các dịch vụ cloud ( AWS hoặc Google ). Bug Hunter này đã chứng minh rằng việc Brute Force mã này là hoàn toàn khả thi và đã được Facebook reward $30,000.<br><br>
Có thể nói rằng đoạn mã từ 000000 - 999999 không phải là password, vì ai cũng biết nó có độ dài bao nhiêu và tổ hợp từ những ký tự nào. Nhưng Brute Force (với cách vận dụng sáng tạo và sự "hỗ trợ" về công nghệ ( Cloud service )) rõ ràng vẫn còn "đất diễn", kể cả trên các dịch vụ trực tuyến. <br><br>
### III. Brute Force và Dictionary Attack<br><br>
Mục đích chính khi viết bài này là để "tự chắc chắn" một sự vô vọng khi một vài người bạn của tôi cố gắng Brute Force một file **.rar** có chứa phần đề bài cho một môn thực hành trong bài thi cuối kỳ. Trong phòng thi, password sẽ được công bố để các bạn giải nén lấy dữ liệu.<br><br>
<b> Nếu không đi sẽ không bao giờ đến, nếu không cố crack, sẽ không có crack thành công. </b> <br>
Mong rằng bạn tôi vẫn đang cho một vài tools nào đó trên Kali Linux brute force cái password kia, vì còn tới 2 ngày nữa mới thi. Và nếu bạn tôi có thành công thì tôi cũng khỏe hẳn ra. Bạn tôi có làm Cyber Security và thích mày mò, *hi vọng!*<br><br>
<b>Vô vọng ?</b><br>
Chúng tôi được gợi ý rằng password dưới 20 ký tự. Và chỉ vậy thôi.  Nghe tới đây tôi đã "hopeless" rồi. <br>
Tôi giả sử "sương sương" password mà thầy đặt có dưới 15 ký tự. <br><br>
##### 1. Brute Force <br>
Attack Password bằng Brute Force, ai cũng biết đây là việc "mò" password. <br>
Giả sử password không bao gồm ký tự đặc biệt, chỉ bao gồm 62 ký tự: <br>
> abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
> 
Công thức tính số lượng password có thể có rất đơn giản:<br>
(Số lượng ký tự) ^ (Độ dài password)<br>
Và có cả một <a href="https://www.grc.com/haystack.htm"> Website </a> thay ta làm việc đó, và đây là kết quả: <br>
![](https://images.viblo.asia/55cb47cd-bf35-4ef6-a5ae-97bb21ee4cbb.png) <br>
**7.82 x 10^26 hay 781,514,782,079,074,318,856,775,914:** Tôi không biết phải đọc số này như thế nào. Giả sử bạn tôi thử được  **100 nghìn tỷ** password một giây, bạn tôi sẽ cần 2480 thế kỷ để chắc chắn brute force thành công...<br><br>
    
##### 2. Dictionary Attack
Không, tôi đã đánh giá thấp bạn mình, từ một tấm hình, tôi thấy bạn tôi đã tổng hợp rất nhiều thông tin liên quan có thể có: tên viết tắt của trường, khóa học, lớp, tên thầy, năm sinh...<br>
Điều này dẫn dắt đến một thứ khác: Dictionary Attack <br>
Tức là bạn tôi sẽ từ các cụm ký tự trên, bằng một cách nào đó tạo ra một từ điển password ( thường sẽ dùng Crunch trên Kali Linux cho nhanh), sau đó dùng từ điển này để tấn công. <br><br>
Tiếng Việt có khoảng 1500 từ đơn có nghĩa, giả sử thầy tôi đặt password viết hoa chữ cái đầu chẳng hạn, ví dụ: **CacemThitot2019**, thì sẽ có khoảng 3000 cụm ký tự có nghĩa sẽ được dùng. <br>
Cộng thêm khoảng 50 số, chỉ ngày tháng năm sinh, ngày thi chẳng hạn. Thêm khoảng 50 từ viết tắt liên quan tới trường lớp, khóa thi, tên riêng... Vậy sẽ có khoảng 3100 cụm ký tự được dùng. <br><br>
Từ từ ngắn nhất có 2 ký tự tới từ dài nhất có 7 ký tự, cho rằng mỗi cụm ký tự có độ dài trung bình bằng 3. Vậy cần khoảng 5 cụm ký tự để đạt 15 ký tự cho password. <br>
Lúc này số password trong từ điển tấn công của bạn tôi là: 3100 ^ 5 = 2,86 x 10^17 (password). <br>
Và nếu bạn tôi bằng một cách thần ký nào đó, vẫn có thể thử được **100 nghìn tỷ** password một giây, bạn tôi sẽ chỉ cần **47.7 phút** để crack thành công, so với 2480 thế kỷ, rõ ràng 47 phút chẳng đáng gì. <br>
![](https://images.viblo.asia/75a3471c-272c-40c3-a9a3-a8f7e9b8f096.png) <br> <br>
Bạn tôi có thể loại bỏ vài trăm từ bạn tôi nghĩ rằng thầy sẽ không dùng trong password, và như thế thì số lượng password phải thử sẽ còn ít hơn, tương đương với thời gian cần để crack cũng ngắn hơn. <br><br>
##### 3. Vẫn cứ là vô vọng
 **100 nghìn tỷ** password được thử trên giây là một cái gì đó trong mơ cũng không mơ tới. <br>
  Chưa kể nếu nghĩ rằng thầy đặt password như vậy thì hóa ra tôi lại đánh giá thấp thầy quá. Vì ngay từ cái tên trường, đã không cho phép thầy đặt một password "đơn giản" như vậy.<br>
  Hi vọng từ 2 ví dụ trên, các bạn đã hiểu được sự khác nhau ở  **Payload** mà tôi đề cập ở phần I. <br>
  Chúc bạn tôi may mắn. <br>