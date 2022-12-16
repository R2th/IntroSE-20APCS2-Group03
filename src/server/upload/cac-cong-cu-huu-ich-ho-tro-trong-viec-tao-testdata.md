# Các công cụ hữu ích hỗ trợ trong việc tạo testdata
Hôm nay mình sẽ giới thiệu danh sách một số ứng dụng mà mình đánh giá là khá hữu ích trong việc tạo test data và mình nghĩ là nó sẽ cần với các bạn trong công việc kiểm thử, và những việc khác nữa nếu như bạn biết cách áp dụng và tận dụng được những cái mà các công cụ này cung cấp.
### 1. lettercount.com
Ứng dụng web này cung cấp một công cụ giúp bạn có thể đếm số lượng ký tự, số lượng từ có trong một đoạn, một câu văn bất kỳ nào đó, sẽ hữu ích trong trường hợp tạo hoặc kiểm tra dữ liệu test mà có yêu cầu về số lượng từ, ký tự nhập vào. Các ký tự tiếng việt, dấu cách, ký tự đặc biệt… đều thoải mái. Các bạn có thể truy cập cụ thể vào [link](https://www.lettercount.com/) để tìm hiểu chi tiết hơn nhé.

Đơn giản hơn chúng ta cũng có thể sử dụng MS Word để kiểm tra số lượng từ và ký tự nếu thấy thuận tiện hơn.
### 2. loremipsum.de
Chúng ta có thể sử dụng ứng dụng này để tạo dữ liệu test trong trường hợp cần một lượng dữ liệu text lớn, một đoạn văn dài, ví dụ như các trường ghi chú, hoặc thông tin chi tiết, mô tả nào đó…. Ta có thể tùy chọn số lượng ký tự/ từ/ đoạn văn mong muốn, ứng dụng này sẽ cho đầu ra tương ứng phù hợp với yêu cầu đã chọn. Sau đó chỉ cần click nut copy là bạn có thể paste vào bất cứ textbox nào!

### 3. convertcase.net
Một ứng dụng mình nghĩ cũng rất là hay ho, giúp bạn có thể thay đổi cách viết/hiển thị của một đoạn text thành viết hoa, viết thường, thành hoa thường lẫn lộn, viết hoa các chữ cái đầu, chỉ viết hoa chữ cái đầu câu, … không phụ thuộc vào đầu vào của bạn viết như thế nào, chỉ cần lựa chọn các yêu cầu thay đổi chỉ sau một cú click chuột là bạn sẽ có được đầu ra tương ứng. Điều này cũng khá hữu ích trong việc tạo các dữ liệu test liên quan đến text. Ngoài ra còn cực kỳ hữu ích trong trường hợp có nhiều đoạn text, hoặc đoạn text dài thì ta có thể thay đổi kiểu viết hoa viết thường hay kiểu hoa thường lẫn lộn một cách đơn giản và nhanh chóng hơn bao giờ hết! 


### 4. URL Decoder/Encoder
Ứng dụng này giúp bạn giải mã/mã hóa một URL bất kỳ nào đó, chỉ cần copy và paste vào textbox trên ứng dụng, click Decode / Endcode thì bạn sẽ có ngay kết quả tương ứng. Ứng dụng giúp chúng ta dễ dàng giải mã các URL JavaScript rối rắm khó đọc thành một đường dẫn có thể đọc được.


### 5. Rubular
“Rubular a Ruby regular expression editor”, đây là ứng dụng hỗ trợ bạn tạo và kiểm tra cú pháp regular expression (biểu thức chính quy), (nếu bạn chưa quen thuộc với thuật ngữ này thì có thể tìm hiểu [tại đây](https://developer.mozilla.org/vi/docs/Web/JavaScript/Guide/Regular_Expressions) để hiểu thêm nhé), hiện nay có rất nhiều ứng dụng hỗ trợ bạn trong việc này, Rubular là một trong những ứng dụng đó nhé!

 Từ biểu thức bạn tạo, copy dữ liệu cần kiểm tra sau đó kiểm tra kết quả. Bên cạnh đó bạn cũng có thể tạo cho mình một permalink để có thể chia sẻ link biểu thức cùng với dữ liệu test và kết quả vừa làm với người khác.

### 6.Numverify
Numverify giúp bạn kiểm tra định dạng số điện thoại, tạo mã JSON về thông tin của số điện thoại đó một cách nhanh chóng, chỉ cần paste vào đó một số điện thoại bất kỳ, ứng dụng sẽ giúp bạn kiểm tra dãy số đó đã đúng định dạng của một số điện thoại hay chưa? Số điện thoại này thuộc quốc gia nào, thuộc nhà mạng nào, hay số này là thuê bao di động hay cố định… Bạn cũng có thể xem thông tin đó dưới dạng mã JSON, Numverify hỗ trợ kiểm tra thông tin số điện thoại của 232 nước trên thế giới.

|Valid| x |
| -------- | -------- | 
|Local Format  |	4158586273    | 
| Intl. Format   |+14158586273    | 
| Country   | United States of America | 
| Location    | Novato  | 
| Carrier  | AT&T Mobility LLC | 
| Line Type | Mobile  | 

### 7. WEPAY testing
Wepay cung cấp môi trường, dữ liệu để chúng ta có thể sử dụng những tài khoản ngân hàng, hay các thẻ tín dụng ảo, rất hữu ích khi bạn cần test những hệ thống cần thông tin liên quan đến tài khoản ngân hàng, thông tin dữ liệu thẻ tín dụng, thanh toán…v…v… Chi tiết các bạn hãy truy cập vào [link ](https://developer.wepay.com/docs/articles/testing) để tìm hiểu thêm nhé! 

### 8. Online random file generator
Ứng dụng này giúp bạn tạo ra các file với kích thước dung lượng của file tùy ý, tùy chọn tên file, định dạng file mong muốn một cách nhanh chóng. Chỉ sau một vài thao tác, bạn đã có một file bất kỳ và dung lượng như ý, sẽ rất tiện lợi trong những trường hợp tạo dữ liệu test cho hệ thống cần file đính kèm.

Tạm thời thế đã nhỉ, mình nghĩ đây là một trong những những công cụ hay ho và hữu ích trong việc tạo các dữ liệu test, bạn có đang dùng những công cụ hay tiện ích nào khác nữa không? Cùng chia sẻ với mình ở bình luận phía dưới nhé! Mình đặc biệt thích số 3 và số 8 vì mình sử dụng nó nhiều nhất trong số những danh sách trên. Hi vọng cũng góp phần giúp ích cho các bạn trong công việc chuẩn bị dữ liệu kiểm thử cũng như trong quá trình kiểm thử của các bạn.

-----
Nguồn thao khảo: 

https://developer.wepay.com/docs/articles/testing
https://developer.mozilla.org/vi/docs/Web/JavaScript/Guide/Regular_Expressions