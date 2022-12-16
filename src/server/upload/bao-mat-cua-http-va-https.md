### **Giao thức HTTP  bảo mật đến mức nào?**

HTTP là 1 giao thức truyền nhận dữ liệu, chúng ta sẽ không nói nhiều về giao thức này nữa mà hãy xem HTTP bảo mật đến mức nào.

Dữ liệu được [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) truyền dưới dạng plain text, không hề được mã hóa hay bảo mật, dẫn đến rất dễ bị nghe lén và đánh cắp dữ liệu. Kiểu tấn công này gọi là Man in the middle attack ([MITM](http://kechocgian.blogspot.com/2013/04/lan-attack-man-in-middle.html)) hay còn gọi là tấn công xen giữa. MITM là 1 phương pháp tấn công cơ bản, ở đó attacker đóng vai trò là người trung gian giả mạo trong 1 phiên làm việc giữa victim và 1 máy chủ nào đó.  Và mọi gói tin liên lạc giữa victim và server đều đi qua máy attacker*.

Những cách phá hoại có thể:

1, Sniff packet để đọc lén dữ liệu

Khi bạn gửi username và password qua giao thức HTTP, hacker có thể dễ dàng bắt và đọc trộm packet trong mạng để biết được username và password của bạn. Bạn hay server không hề biết là mình bị tấn công.

2, Sửa đổi packet

Điều nghiêm trọng nữa là hacker không chỉ đọc lén được dữ liệu bạn truyền qua giao thức http mà nó còn có thể sửa đổi dữ liệu bằng cách sửa packet làm nội dung bạn request đến server bị sai và đương nhiên server sẽ trả về dữ liệu hiển thị mà bạn không mong muốn. Bạn hay server cũng không hề biết là mình đang bị tấn công.

Là developer, cách phòng chống duy nhất chúng ta có thể làm là sử dụng [HTTPS](https://en.wikipedia.org/wiki/HTTPS) cho ứng dụng

![](https://images.viblo.asia/65ee02ea-0656-4406-a44a-c0ebf8d2d4b5.png)

### **Vậy HTTPS là gì và nó bảo mật như thế nào?**

Vấn đề lớn nhất của HTTP là giao thức này không được mã hóa. HTTPS(Hypertext Transfer Protocol Secure)  là sự kết hợp giữa HTTP và SSL, TSL sử dụng mã hóa để  nhằm tạo nên một rào chắn an ninh, bảo mật khi truyền tải các thông tin.

1, Mã hóa Đối xứng (*symmetric key cryptography*)

Dữ liệu trao đổi giữa 2 bên sẽ được mã hóa và thống nhất cách giải mã, khi đó cho dù attacker có bắt được gói tin những cũng không thể giải mã nếu không biết cách mã hóa

2, Chìa khóa giải mã (key)

Key là chìa khóa giải mã cho dữ liệu đã được mã hóa và gửi qua HTTPS. Mã hóa đối xứng sẽ được bảo mật nếu như chỉ có người gửi và người nhận biết key đã được sử dụng. Những có một vấn đề đó là nếu bên gửi và bên nhận không gặp nhau để thống nhất và thỏa thuận trước khi gửi thì sẽ không biết được key là gì. Còn nếu gửi key trong packet thì khác nào quay lại HTTP làm cho attacker biết được key, giải mã đánh cắp và giả mạo packet.  Để giải quyết chúng ta dùng mã khóa không đối xứng.

3, Mã hóa không đối xứng (*asymmetric key cryptography*)

Chúng ta sẽ tạm gọi bên gửi là client và bên nhận là server. Hình thức mã hóa đối xứng sẽ diễn ra như sau:
-  Client gửi 1 tin nhắn không chứa dữ liệu cũng như không được mã hóa lên server như 1 request.
-  Server gửi lại cho client gói tin có chưa public key và giữ lại private key của server
-  Client gửi yêu cầu/ dữ liệu được mã hóa bằng public key mà nó nhận được từ server
-  Server nhận được gói tin  và giải mã bằng private key.

Vậy là thông tin đã được trao đổi giữa client và server mà không sợ bị attacker đọc trộm hay sửa đổi do attacker không có private key.

4, Chứng nhận thẩm quyền(*certification authority*) 

Để tránh attacker đánh cắp gói tin có chứa public key mà server gửi cho client và gửi 1 gói tin chứ public key giả mạo mà attacker có private key. Khi đó client nhận được public key giả mạo nhưng không hề biết mà lại đi mã hóa dữ liệu bằng public key vừa nhận được, sau đó ở bước tiếp theo attacker có thể dễ dàng bắt được gói tin client gửi cho server giải mã bằng private tương ứng để đọc dữ liệu  và giử dữ liệu giả mạo đến server sử dụng public key mà nó đã bắt được của server ở bước trước. Khi đó thông tin trao đổi giữa 2 bên sẽ bị lộ và thay đổi.

Để tránh việc này HTTPS dùng một chứng thực khóa công khai (còn gọi là chứng thực số /chứng thực điện tử) là một chứng thực sử dụng chữ kí số để gắn khóa công khai với một thực thể(cá nhân, máy chủ hoặc công ti...).  Chứng thực số có thể được sử dụng để xác định một khóa công khai thuộc về ai.

Nhà cung cấp chứng thực số (Certificate Authoirity – CA) phát hành các chứng thực khóa công khai trong đó CA đó chứng nhận khóa công khai nằm trong mỗi chứng thực thuộc về cá nhân, tổ chức, máy chủ hay bất kì thực thể nào ghi cùng trong chứng thực đó. Nhiệm vụ của CA là kiểm tra tính chính xác của thông tin liên quan đến thực thể được cấp chứng thực. Khi người sử dụng tin tưởng vào một CA và họ có thể kiểm tra chữ kí số của CA thì họ cũng có thể tin vào khóa công khai và thực thể ghi trong chứng thực số. 

Nhờ có chứng thực khóa công khai mà client có thể biết được public key mà nó nhận được có đúng là public key do server gửi không.

5, Kết hợp giữa Mã hóa đối xứng và Mã hóa không đối xứng

Thay vì mỗi lần trao đổi client và server lại phải thực hiện các bước trao đổi khóa và xác thực khóa, thì sẽ áp dụng cả mã hóa đối xứng và mã hóa không đối xứng bằng cách chỉ trao đổi và xác thực khóa ở giai đoạn đầu mới thiết lập kết nối, sau khi đã trao đổi thành công, client sẽ lưu lại khóa và thực hiện cho các lần sau mà không cần phải trao đổi khóa lại.

Vậy bây giờ ta tạm có 1 quá trình khá an toàn để trao đổi dữ liệu giữa client và server. 

*Về cơ chế giúp attacker có thể xen vào giữa phiên làm việc của victim và server là 1 câu chuyện dài  cần nghiên cứu và report ở phần sau ~~

reference: nhiều nguồn