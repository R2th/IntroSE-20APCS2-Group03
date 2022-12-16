# Tổng quan về bảo mật phần mềm
Bảo mật đóng vai trò vô cùng quan trọng trong việc phát triển cũng như khi vận hành ứng dụng. Nó như một lá chắn giúp bảo vệ hệ thống phần mềm của chúng ta tránh khỏi các cuộc tấn công của những kẻ xấu nhằm mục đích phá hoại hoặc đánh cắp thông tin. Bảo mật chính là một quá trình liên tục kiểm tra, xử lý các vấn đề bảo mật của hệ thống để duy trì 3 đặc tính trên của hệ thống (Tính toàn vẹn, tính bảo mật, tính sẵn sàng).
![](https://images.viblo.asia/c96a604e-bb61-4cbb-aae4-4bb63ee056f2.png)

**Tính bí mật**: Bí mật là thuật ngữ được sử dụng để tránh lộ thông tin đến những đối tượng không được xác thực hoặc để lọt vào các hệ thống khác. Ví dụ: một giao dịch tín dụng qua Internet, số thẻ tín dụng được gửi từ người mua hàng đến người bán, và từ người bán đến nhà cung cấp dịch vụ thẻ tín dụng. Hệ thống sẽ cố gắng thực hiện tính bí mật bằng cách mã hóa số thẻ trong suốt quá trình truyền tin, giới hạn nơi nó có thể xuất hiện (cơ sở dữ liệu, log file, sao lưu (backup), in hóa đơn…) và bằng việc giới hạn truy cập những nơi mà nó được lưu lại. Nếu một bên không được xác thực (ví dụ người dùng không có trong giao dịch, hacker…) lấy số thẻ này bằng bất kì cách nào, thì tính bí mật không còn nữa.

**Tính toàn vẹn**: Trong an toàn thông tin, toàn vẹn có nghĩa rằng dữ liệu không thể bị chỉnh sửa mà không bị phát hiện. Nó khác với tính toàn vẹn trong tham chiếu của cơ sở dữ liệu, mặc dù nó có thể được xem như là một trường hợp đặc biệt của tính nhất quán như được hiểu trong hô hình cổ điển ACID (tính nguyên tử (atomicity), tính nhất quán (consistency), tính tính cách ly (isolation), tính lâu bền (durability) – là một tập các thuộc tính đảm bảo rằng cơ sở dữ liệu đáng tin cậy) của xử lý giao dịch. Tính toàn vẹn bị xâm phạm khi một thông điệp bị chỉnh sửa trong giao dịch. Hệ thống thông tin an toàn luôn cung cấp các thông điệp toàn vẹn và bí mật.

**Tính sẵn sàng**: Mọi hệ thống thông tin đều phục vụ mục đích riêng của nó và thông tin phải luôn luôn sẵn sàng khi cần thiết. Điều đó có nghĩa rằng hệ thống tính toán sử dụng để lưu trữ và xử lý thông tin, có một hệ thống điều khiển bảo mật sử dụng để bảo vệ nó, và kênh kết nối sử dụng để truy cập nó phải luôn hoạt động chính xác. Hệ thống có tính sẵn sàng cao hướng đến sự sẵn sàng ở mọi thời điểm, tránh được những rủi ro cả về phần cứng, phần mềm như: sự cố mất điện, hỏng phần cứng, cập nhật, nâng cấp hệ thống… đảm bảo tính sẵn sàng cũng có nghĩa là tránh được tấn công từ chối dịch vụ.
# Các nguyên tắc thiết kế bảo mật OWASP là gì?
## OWASP
[OWASP](https://en.wikipedia.org/wiki/OWASP) là một tiêu chuẩn để phục vụ việc kiểm thử của Penetration Testing (Pentest) do tổ chức Open Web Application Security Project(OWASP) đề xuất. OWASP là tổ chức phi lợi nhuận và đưa ra chuẩn OWASP phục vụ cho công việc pentest hiệu quả và chi tiết.
![](https://images.viblo.asia/65dc09f9-9cc4-4738-a1c1-3167e3609513.jpg)

## Các nguyên tắc thiết kế bảo mật OWASP
Các Nguyên tắc Thiết kế Bảo mật OWASP đã được tạo ra để giúp các nhà phát triển xây dựng các ứng dụng web có tính bảo mật cao. Các nguyên tắc thiết kế bảo mật OWASP như sau:

**Phân loại đối tượng**
Trước khi phát triển bất kỳ chiến lược bảo mật nào, điều cần thiết là xác định và phân loại dữ liệu mà ứng dụng sẽ xử lý. OWASP gợi ý rằng các lập trình viên nên tạo ra các biện pháp kiểm soát bảo mật phù hợp với giá trị của dữ liệu đang được quản lý. Ví dụ: một ứng dụng xử lý thông tin tài chính phải có các hạn chế chặt chẽ hơn nhiều so với blog hoặc diễn đàn web.

**Hiểu những kẻ tấn công**
Các lập trình viên nên thiết kế các biện pháp kiểm soát để ngăn chặn việc sử dụng sai mục đích của kẻ xấu. Các đối tượng dưới đây được phân loại và sắp xếp từ mức nguy hiểm nhất đến mức ít nguy hiểm nhất:
- Nhân viên và lập trình viên xấu, bất mãn (Loại tấn công nguy hiểm nhất bởi vì họ có quyền truy cập vào toàn bộ hệ thống, cũng như là người trực tiếp phát triển ứng dụng)
- Các cuộc tấn công bằng vius hoặc cuộc tấn công Trojan vào hệ thống
- Kẻ tấn công mạng
- Các tổ chức tội phạm có mục đích xấu
- Script kiddies

**Các đặc tính quan trọng của hệ thống**
OWASP khuyến nghị rằng tất cả các biện pháp kiểm soát bảo mật nên được thiết kế với các đặc tính của an ninh thông tin:
- Bảo mật
- Tính toàn vẹn
- Tính khả dụng

**Kiến trúc bảo mật**
OWASP khuyến nghị rằng mọi ứng dụng đều có các biện pháp bảo mật ứng dụng được thiết kế để bao gồm tất cả các loại rủi ro, từ rủi ro trong quá trình vận hành (ví dụ: vô tình xóa dữ liệu) cho đến các cuộc tấn công có chủ địch (tấn công bởi các hacker, v.v.).
Họ khuyến nghị rằng các nhà phát triển nên xem xét từng tính năng trên ứng dụng mà họ đang thiết kế và đặt những câu hỏi sau:

- Quá trình xoay quanh tính năng này có an toàn nhất có thể không? Nói cách khác, đây có phải là một quá trình thiếu sót?
- Nếu là một kẻ xấu, hắn sẽ lạm dụng tính năng này như thế nào?
- Tính năng này có bắt buộc phải được bật theo mặc định không? Nếu cần, có giới hạn hoặc tùy chọn nào có thể giúp giảm rủi ro từ tính năng này không?
Bằng cách "thinking evil" (nghĩ xấu), các nhà phát triển có thể xác định các cách mà tội phạm mạng và các cá nhân có thể tìm cách tấn công ứng dụng web. OWASP gợi ý rằng các nhà phát triển cũng tuân theo kỹ thuật lập mô hình rủi ro mối đe dọa [STRIDE / DREAD](https://haiderm.com/application-threat-modeling-using-dread-and-stride/) được nhiều tập đoàn sử dụng. STRIDE giúp lập trình viên xác định các mối đe dọa và DREAD cho phép lập trình viên đánh giá các mối đe dọa.

# 10 Nguyên tắc thiết kế bảo mật 
## 1. Minimise attack surface area - Giảm thiểu vector tấn công vào hệ thống
Ngay nay các phần mềm được phát triển theo mô hình CI-CD. Một phần mềm được tạo ra sẽ ngày càng lơn lên với nhiều tính năng mới. Mỗi  khi một chức năng mới được tạo ra, các dòng code mới sẽ được thêm vào ứng dụng, đồng nghĩa với việc ứng dụng sẽ có thêm các điểm đầu  vào có thể bị tấn công từ hacker. Việc giảm thiểu lộ ra các chức năng giúp giảm thiểu nguy cơ ứng dụng bị tấn công. Tức là hiểu đơn giản, nếu chúng ta càng cho ít điểm đầu vào thì hệ thống chúng ta sẽ càng được bảo vệ tốt hơn, dĩ nhiên là không phải ngăn chặn hẳn.

Ví dụ, đối với chức năng đăng nhập vào quản trị website có đường dẫn là /admin, chúng ta cần thực hiện việc giảm thiểu việc truy cập vào nó bằng cách chỉ cho phép các địa chỉ ip nhất định được truy cập vào đường dẫn đó hoặc chỉ được phép vào đường dẫn đó nếu đã thực hiện đăng nhập với tài khoản có quyền admin. Hay với một ví dụ khác, đối với file robot.txt trong website, chúng ta sẽ không liệt kê toàn bộ cấu trúc website mà sẽ cần loại bỏ các đường dẫn nhạy cảm hoặc quan trọng để tránh việc bị dò quét và tấn công bởi các công cụ scan tự động

## 2. Establish secure defaults - Thiết lập cơ chế mặc định an toàn
Nguyên tắc này nói rằng ứng dụng phải được bảo mật theo mặc định. Điều đó có nghĩa là người dùng mới phải thực hiện các bước để có được các đặc quyền cao hơn và loại bỏ các biện pháp bảo mật bổ sung (nếu được phép).  Thiết lập các mặc định an toàn có nghĩa là phải có các quy tắc bảo mật mạnh mẽ được thiết lập mặc định cho tất cả các tài khoản trong hệ thống

Ví dụ: Về cách xử lý đăng ký của người dùng, tần suất phải cập nhật mật khẩu, mật khẩu phức tạp như thế nào, v.v. Người dùng ứng dụng có thể tắt một số tính năng này, nhưng chúng phải được đặt ở mức bảo mật cao theo mặc định.
## 3. The principle of Least privilege - Nguyên tắc đặc quyền tối thiểu
Khi thực hiện tạo ra người dùng trong hệ thống, chúng ta cần đặc biệt tuân thủ nguyên tắc này. Mặc định người dùng tạo ra sẽ không có quyền gì hoặc quyền phải là ít nhất. Chỉ khi nào cần chúng ta mới cấp thêm các quyền cần thiết cho họ. Chúng ta cũng cần có cơ chế xử lý và kiểm tra, nếu một user không cần dùng đến chức năng đó hoặc không còn sử dụng tài khoản đó thì cần có cơ chế thu hồi quyền hợp lý, tránh việc tài khoản bị rơi vào kẻ xấu hoặc bị lạm quyền.

Ví dụ, người dùng mặc định đăng ký sẽ chỉ có thể đăng nhập vào hệ thống nếu họ thực hiện xác nhận email. Tiếp theo đó, muốn sử dụng các chức năng thì sẽ thực hiện tạo yêu cầu tới admin và được admin chấp nhận thì mới có thể sử dụng.
## 4. The principle of Defence in depth - Nguyên tắc bảo mật theo chiều sâu, nhiều lớp
Nguyên tắc phòng thủ nói rõ rằng nhiều biện pháp kiểm soát bảo mật tiếp cận rủi ro theo những cách khác nhau là lựa chọn tốt nhất để bảo mật ứng dụng. Vì vậy, thay vì có một kiểm soát bảo mật cho quyền truy cập của người dùng, bạn sẽ có nhiều lớp xác thực, công cụ kiểm tra bảo mật bổ sung và công cụ ghi nhật ký.

Ví dụ: thay vì cho phép người dùng đăng nhập chỉ bằng tên người dùng và mật khẩu, bạn sẽ sử dụng kiểm tra IP, hệ thống Captcha, chống lại các cuộc tấn công brutefore, hoặc xác thực lại với các thao tác quan trọng (đổi mật khẩu, chuyển tiền..)

## 5. Fail securely - Nguyên tắc xử lý thất bại một cách an toàn
Nguyên tắc này đề cập đến việc chúng ta xử lý các thao tác liên quan đến việc thiết lập quyền hạn cũng như khi xử lý các lỗi của hệ thống một cách an toàn. Mặc định  chúng ta sẽ thiết kế bảo mật theo nguyên tắc là tối thiểu về quyền, điều đó có nghĩa là người dùng mới phải thực hiện các bước để có được các đặc quyền cao hơn và loại bỏ các biện pháp bảo mật bổ sung (nếu được phép). Hoặc nếu có lỗi hay ngoại lệ xảy ra, nó cần được xử lý một cách an toàn.
Ví dụ: Với đoạn code dưới đây
```php
isAdmin = true; 
try { 
  codeWhichMayFail(); 
  isAdmin = isUserInRole( “Administrator” ); 
}
catch (Exception ex)
{
  log.write(ex.toString()); 
} 
```
Đây là cách xử lý không an toàn. Vì thứ nhất, mặc định người dùng được thiết lập quyền admin - quyền cao trong hệ thống và không cần bất cứ quá trình kiểm tra nào. Thứ hai, nếu hàm codeWhichMayFail() chạy gặp lỗi và gây ra exception thì người dùng vẫn mặc định là quản trị viên. Để thiết kế an toàn chúng ta cần xử lý như sau:
```php
isAdmin = false;
try {
  codeWhichMayFail();
  isAdmin = isUserInrole( "Administrator" );
}
catch (Exception ex)
{
  log.write(ex.toString());
}
```
Thì mặc định người dùng không phải là admin, vì chỉ khi hàm codeWhichMayFail() chạy không gặp lỗi và không gây ra exception, thì người dùng mới được thiết lập là admin.

## 6. Don’t trust services - Không tin tưởng tuyệt đối vào dịch vụ
Đa số các website bây giờ sẽ sử dụng một số dịch vụ của bên ba (third-party services) để phục vụ một số tác vụ trong hệ thống hoặc xử lý, lưu trữ dữ liệu. Nguyên tắc này nói rằng bạn không bao giờ nên tin tưởng các dịch vụ này từ góc độ bảo mật. Điều đó có nghĩa là ứng dụng phải luôn kiểm tra tính hợp lệ của dữ liệu mà các dịch vụ của bên thứ ba gửi và không cấp cho các dịch vụ đó quyền cấp cao trong ứng dụng.

Ví dụ, khi chúng ta sử dụng dữ liệu từ một bên thứ 3 cung cấp làm dữ liệu đầu vào cho hệ thống của chúng ta, lập trình viên cần kiểm tra tính hợp lệ của dữ liệu trước khi đưa vào hệ thống của chúng ta. Hoặc nếu cần lưu trữ dữ liệu ở một dịch vụ bên thứ 3, chúng ta cần mã hóa dữ liệu một cách an toàn trước khi lưu trữ để tránh việc bị lộ dữ liệu nếu hệ thống bên thứ 3 bị tấn công

## 7. Separation of duties - Tách biệt về nhiệm vụ
Việc tách biệt các nhiệm vụ có thể được sử dụng để ngăn chặn các cá nhân hành động gian lận. Khi chúng ta thực hiện thiết kế phân quyền, cần đảm bảo được nguyên tắc tách biệt này về mặt nhiệm vụ, đặc biệt là các nhiệm vụ liên quan đến công tác quản trị.

Ví dụ: người dùng của một trang web Thương mại Điện tử không nên được thăng cấp trở thành quản trị viên vì họ có thể thay đổi đơn đặt hàng và cung cấp sản phẩm cho mình. Điều ngược lại cũng đúng - một quản trị viên không nên có khả năng làm những việc mà khách hàng làm, như đặt hàng từ giao diện người dùng của trang web.

## 8. Avoid security by obscurity - Tránh bảo mật bằng việc che giấu
Nguyên tắc OWASP này nói rằng không bao giờ được dựa vào bảo mật bằng sự che đậy. Để bảo mật chúng ta cần xử lý ngăn chặn triệt để chứ không chỉ đơn giản là "ẩn" đi.

Ví dụ: Nếu ứng dụng của bạn có đường dẫn cho phép quản trị viên đăng nhập là /admin. Lập trình viên vì không muốn người khác biết đến bằng cách ẩn nó đi khỏi menu đối với người dùng thường, dĩ nhiên họ vẫn có thể vào nếu gõ đường dẫn trên trình duyệt. Rõ ràng việc làm này không an toàn, chúng ta cần kiểm tra trong logic của chương trình để loại bỏ các truy cập không được phép.

## 9. Keep security simple - Giữ bảo mật một cách đơn giản
Các nhà phát triển nên tránh sử dụng kiến trúc rất phức tạp khi phát triển các biện pháp kiểm soát bảo mật cho các ứng dụng của họ. Có những cơ chế rất phức tạp có thể làm tăng nguy cơ sai sót. 

Ví dụ: Nếu framework hỗ trợ các cơ chế bảo mật như kiểm tra authorization hay authentication, chúng  ta có thể sử dụng nó mà không cần tự phát triển để tránh việc phát sinh các lỗ hổng bảo mật không mong muốn.

## 10. Fix security issues correctly - Vá lỗ hổng bảo mật một cách đúng đắn
Nếu vấn đề bảo mật đã được xác định trong một ứng dụng, nhà phát triển nên xác định nguyên nhân gốc rễ của vấn đề. Sau đó, họ nên sửa chữa nó và kiểm tra các sửa chữa kỹ lưỡng. Nếu ứng dụng sử dụng các mẫu thiết kế, rất có thể lỗi có thể xuất hiện trong nhiều hệ thống. Lập trình viên nên cẩn thận để xác định tất cả các hệ thống bị ảnh hưởng.

# Tham chiếu
Bài viết được tham khảo tại:
- [Security by Design Principles according to OWASP
](https://blog.threatpress.com/security-design-principles-owasp/)
- [9 Software Security Design Principles
](https://dzone.com/articles/9-software-security-design)