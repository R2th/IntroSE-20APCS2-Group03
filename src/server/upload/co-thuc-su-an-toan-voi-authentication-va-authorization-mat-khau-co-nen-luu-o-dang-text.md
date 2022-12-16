# Có thực sự an toàn với Authentication và Authorization , mật khẩu có nên lưu ở dạng text ?
Bằng cách chúng ta đang lưu trữ thông tin xác thực để thuận tiện nâng cao trải nhiệm cho người dùng sau khi đã đăng nhập hệ thống thông qua hệ thống xác thực và ủy quyền. Điều này có nghĩa là chúng ta phải cho phép người bắt đầu từ đăng nhập và có thể phân biệt các cấp người dùng khác nhau có thể tương ứng với các action mà user được phép .

Hơn nữa, vì chúng ta đang lưu trữ thông tin đăng nhập và hỗ trợ quy trình đăng nhập, chúng ta biết rằng sẽ có thông tin xác thực được gửi qua hạ tầng mạng. Các thông tin xác thực này cũng phải được lưu trữ trong cơ sở dữ liệu, nếu không, luồng xác thực sẽ bị lỗi.

Điều này có nghĩa là sẽ tiềm ẩn các rủi ro sau:
* Làm thế nào để chúng ta xử lý dữ liệu trên đường truyền? 
* Chúng ta xử lý việc lưu trữ thông tin đăng nhập như thế nào?

## Secure Sockets Layer Và Transport Layer Security
Một trong những quyết định quan trọng góp phần giải quyết vấn đề rủi ro trong quá trình xử lý dữ liệu và truyền tải dữ liệu. Truyền tải dữ liệu là bước quan trọng đầu tiên để đánh giá xác định kiến trúc. Nó có thể dẫn đến ảnh hưởng cấu trúc flow của ứng dụng web của chúng ta.

Yêu cầu ban đầu về truyền tải dữ liệu là tất cả dữ liệu được gửi qua mạng đều được mã hóa trên đường truyền. Điều này làm giảm nguy cơ bị tấn công trung gian, có thể lấy cắp thông tin đăng nhập từ người dùng và thay họ mua hàng hoặc xử dụng thông tin bất hợp pháp.

Lớp cổng bảo mật (SSL) và Bảo mật lớp truyền tải (TLS) là hai giao thức mã hoá chính được sử dụng trong ngày nay để bảo mật dữ liệu truyền vào khỏi những kẻ cố gắng ăn cắp dữ liệu ở giữa bất kỳ mạng nào. SSL được thiết kế bởi Netscape vào giữa những năm 1990 và một số phiên bản của giao thức đã được phát hành kể từ đó.

TLS được RFC 2246 tạo ra vào năm 1999 và cung cấp bảo mật nâng cấp để giải quyết một số vấn đề trong SSL. TSL không thể nội suy với các phiên bản SSL cũ hơn do sự khác biệt về kiến trúc giữa hai phiên bản này. TLS hướng đến lớp bảo mật nghiêm ngặt, trong khi SSL được chấp nhận cao hơn nhưng có nhiều lỗ hổng làm giảm tính toàn vẹn của nó như một giao thức mã hoá.

![cuonghx](https://images.viblo.asia/296e53d1-8365-4f54-95b8-5b36f1d14c53.png)

Tất cả các trình duyệt web chính hiện nay sẽ hiển thị biểu tượng khóa trong thanh địa chỉ URL khi giao tiếp của trang web được bảo mật đúng cách qua SSL hoặc TLS. Đặc tả HTTP cung cấp “HTTPS” hoặc “HTTP Secure”, một URI yêu cầu phải có TLS / SSL trước khi cho phép bất kỳ dữ liệu nào được gửi qua mạng. Các trình duyệt hỗ trợ HTTPS sẽ hiển thị cảnh báo cho người dùng cuối nếu kết nối TLS / SSL bị xâm phạm khi yêu cầu HTTPS được thực hiện. Đối với MegaMerch, chúng tôi muốn đảm bảo rằng tất cả dữ liệu được mã hóa và tương thích với TLS trước khi được gửi qua mạng. Cách TLS được triển khai thường dành riêng cho máy chủ, nhưng mọi gói phần mềm máy chủ web lớn đều cung cấp một tích hợp dễ dàng để bắt đầu mã hóa lưu lượng truy cập web.

## Secure Credentials

![](https://images.viblo.asia/5d2c9428-a74a-4734-b428-8d8d4056e33e.png)


Yêu cầu bảo mật mật khẩu góp phần nhỏ trong việc bảo vệ tài khoản của khách hàng, nhưng không may hầu hết các nhà phát triển không biết nên làm gì cho mật khẩu an toàn với tin tặc. Việc tạo một mật khẩu an toàn ít liên quan đến độ dài và số lượng ký tự đặc biệt, mà thay vào đó là mọi thứ liên quan đến các mẫu có thể tìm thấy trong mật khẩu. Trong mật mã, điều này được gọi là entropy - lượng ngẫu nhiên và không cố định.

Hầu hết các mật khẩu được sử dụng trên web không phải là duy nhất. Khi một tin tặc cố gắng để đăng nhập vào một ứng dụng web, cách dễ nhất là tìm danh sách các mật khẩu phổ biến nhất và sử dụng mật khẩu đó để thực hiện một cuộc tấn công từ điển (dictionary attack). Một cuộc tấn công từ điển nâng cao cũng sẽ bao gồm sự kết hợp của các mật khẩu phổ biến, cấu trúc mật khẩu chung và các kết hợp mật khẩu phổ biến. Ngoài ra cùng lắm bao gồm cả việc lặp lại tất cả các kết hợp có thể có.

Như bạn có thể thấy, độ dài của mật khẩu sẽ không bảo vệ bạn quá nhiều, mà thay vào đó không dùng các mẫu và các từ và cụm từ phổ biến. Thật không may, rất khó để truyền đạt điều này cho người dùng. Thay vào đó, chúng ta lại chọn phương pháp bắt người dùng xử dụng một số mẫu với những yêu cầu nhất định.

Ví dụ, chúng ta có thể từ chối mật khẩu nằm trong danh sách một nghìn mật khẩu phổ biến và trả về lỗi cho người dùng rằng mật khẩu đó quá phổ biến. Chúng ta cũng nên ngăn người dùng của mình sử dụng ngày sinh, tên, họ hoặc bất kỳ phần nào trong địa chỉ của họ.

## Hashing Credentials

![](https://images.viblo.asia/1b35ba84-5468-418b-852d-b787b08fc9ee.png)


Khi lưu trữ thông tin xác thực, chúng ta không bao giờ nên lưu trữ dưới dạng văn bản thuần túy. Thay vào đó, chúng ta nên băm mật khẩu ngay lần đầu tiên trước khi lưu trữ. Băm mật khẩu không phải là một quá trình khó khăn nhưng lợi ích bảo mật là rất lớn. Các thuật toán băm khác với hầu hết các thuật toán mã hóa vì một số lý do. Trước hết, các thuật toán băm không thể đảo ngược. Đây là điểm mấu chốt khi xử lý mật khẩu.

Tiếp theo, các thuật toán băm hiện đại cực kỳ hiệu quả. Các thuật toán băm ngày nay có thể đại diện cho các chuỗi ký tự nhiều megabyte chỉ trong 128 đến 264 bit dữ liệu. Điều này có nghĩa là khi chúng ta kiểm tra mật khẩu, chúng tôi sẽ xử dụng mật khẩu của người dùng khi đăng nhập và so sánh mật khẩu đó với mật khẩu đã băm trong cơ sở dữ liệu. Ngay cả khi mật khẩu của người dùng rất lớn, chúng ta sẽ có thể thực hiện kiểm tra mà không mất quá nhiều thời gian. 

Một ưu điểm chính khác của việc sử dụng hàm băm là các thuật toán băm hiện đại hầu như không có va chạm trong ứng dụng thực tế (0 va chạm hoặc tiếp cận theo thống kê 0—1 / 1.000.000.000 +). Điều này có nghĩa là bạn có thể xác định một cách toán học rằng xác suất hai mật khẩu có hàm băm giống hệt nhau sẽ rất thấp. Do đó, bạn không cần phải lo lắng về việc tin tặc “đoán” mật khẩu trừ khi họ đoán chính xác mật khẩu của người dùng khác.

Nếu cơ sở dữ liệu bị vi phạm và dữ liệu bị đánh cắp, mật khẩu được băm đúng cách sẽ bảo vệ người dùng của bạn. Tin tặc sẽ chỉ có quyền truy cập vào hàm băm và sẽ rất khó xảy ra trường hợp một mật khẩu trong cơ sở dữ liệu của bạn bị dịch ngược lại.

Hãy cùng xem xét ba trường hợp mà một tin tặc lấy được quyền truy cập vào cơ sở dữ liệu: 
+ Trường hợp 1:  Mật khẩu được lưu trữ dưới dạng văn bản thuần túy 
    Kết quả là tất cả mật khẩu bị đánh cắp. 
+ Trường hợp 2: Mật khẩu được băm bằng thuật toán MD5.
    Kết quả Hacker có thể bẻ khóa một số mật khẩu bằng cách sử dụng bảng rainbow (một bảng băm được tính toán trước → mật khẩu; các thuật toán băm yếu hơn dễ mắc phải những điều này) 
 + Trường hợp 3: Mật khẩu được băm bằng BCrypt
   Kết quả không có khả năng bất kỳ mật khẩu nào sẽ bị mất.

Như bạn có thể thấy, tất cả các mật khẩu phải được băm. Hơn nữa, thuật toán được sử dụng để băm phải được đánh giá dựa trên tính toàn vẹn toán học và khả năng mở rộng của nó với phần cứng hiện đại. Các thuật toán phải đủ CHẬM khi băm, do đó làm giảm số lần đoán mỗi giây mà hacker có thể thực hiện. Khi bẻ khóa mật khẩu, các thuật toán băm chậm là điều cần thiết vì hacker sẽ tự động hóa mật khẩu thành quá trình băm.

Các thuật toán băm cực kỳ chậm như BCrypt có thể mất nhiều năm hoặc hơn để bẻ khóa một mật khẩu trên phần cứng hiện đại.

Các ứng dụng web hiện đại nên xem xét các thuật toán băm sau để đảm bảo tính toàn vẹn của thông tin đăng nhập của người dùng của họ.

## BCRYPT

![](https://images.viblo.asia/30a3fe2a-2ce8-4812-90b4-0e71aed821ea.png)

BCrypt là một hàm băm lấy tên kết hợp với: “B” xuất phát từ Blowfish Cipher, một mật mã khối đối xứng được phát triển vào năm 1993 bởi Bruce Schneier, được thiết kế như một thuật toán mã hóa nguồn mở và mục đích chung. “Crypt” là tên của hàm băm mặc định đi kèm với hệ điều hành Unix.

Hàm băm Crypt được viết với phần cứng Unix ban đầu, có nghĩa là vào thời điểm đó phần cứng không thể băm đủ mật khẩu mỗi giây để thiết kế ngược lại mật khẩu đã băm bằng cách sử dụng hàm Crypt. Vào thời điểm phát triển, Crypt có thể băm ít hơn 10 mật khẩu mỗi giây. Với phần cứng hiện đại, chức năng Crypt có thể được sử dụng để băm hàng chục nghìn mật khẩu mỗi giây. Điều này làm cho việc phá mật khẩu được băm bằng Crypt trở thành một hoạt động dễ dàng đối với bất kỳ hacker nào trong thời đại hiện tại.

BCrypt lặp lại trên cả Blowfish và Crypt bằng cách đưa ra một thuật toán băm thực sự trở nên chậm hơn trên phần cứng nhanh hơn. Mật khẩu BCrypthashed mở rộng trong tương lai, bởi vì phần cứng cố gắng băm bằng BCrypt càng mạnh thì càng cần nhiều thao tác hơn. Kết quả là, ngày nay hacker gần như không thể viết một đoạn mã thực hiện đủ số băm để khớp với một mật khẩu phức tạp bằng cách này.

## PBKDF2

Để thay thế cho BCrypt, thuật toán băm PBKDF2 cũng có thể được sử dụng để bảo mật mật khẩu. PBKDF2 dựa trên một khái niệm được gọi là kéo dài khóa. Các thuật toán kéo dài khóa sẽ nhanh chóng tạo ra một hàm băm trong lần thử đầu tiên, nhưng mỗi lần thử bổ sung sẽ ngày càng chậm hơn. Do đó, PBKDF2 tạo ra một quy trình tính toán tốn kém về mặt tính toán.

PBKDF2 ban đầu không được thiết kế để băm mật khẩu, nhưng sẽ đủ để băm mật khẩu khi các thuật toán giống BCrypt không khả dụng.

PBKDF2 có một tùy chọn cấu hình đại diện cho số lần lặp tối thiểu để tạo một hàm băm. Mức tối thiểu này phải luôn được đặt thành số lần lặp cao nhất mà phần cứng của bạn có thể xử lý. Bạn không bao giờ biết hacker có thể có quyền truy cập vào loại phần cứng nào, vì vậy bằng cách đặt số lần lặp tối thiểu cho một hàm băm thành giá trị tối đa của phần cứng, bạn sẽ loại bỏ các lần lặp tiềm năng trên phần cứng nhanh hơn và loại bỏ mọi nỗ lực trên phần cứng chậm hơn.

## 2FA

Ngoài việc yêu cầu mật khẩu băm, mã hóa khi truyền dữ liệu, chúng ta cũng nên xem xét cung cấp 2FA cho người dùng của mình, những người muốn đảm bảo tính toàn vẹn tài khoản của họ không bị xâm phạm. Hình 18- 2 cho thấy Google Authenticator, một trong những ứng dụng 2FA phổ biến nhất cho Android và iOS. Nó tương thích với nhiều trang web và có một API mở để tích hợp vào ứng dụng của bạn. 2FA là một tính năng bảo mật tuyệt vời hoạt động rất hiệu quả dựa trên một nguyên tắc rất đơn giản.

![](https://images.viblo.asia/2eb6ab39-6ac6-4402-be20-82e42249d3ea.png)

Hầu hết các hệ thống 2FA yêu cầu người dùng nhập mật khẩu vào trình duyệt của họ, ngoài ra còn phải nhập thêm mật khẩu được tạo từ ứng dụng di động hoặc tin nhắn văn bản SMS. Các giao thức 2FA nâng cao hơn sử dụng mã thông báo thông qua thiết bị phần cứng vật lý, thường là ổ USB tạo mã thông báo sử dụng một lần duy nhất khi được cắm vào máy tính của người dùng.

Ứng dụng điện thoại / 2FA dựa trên SMS có thể không an toàn như mã thông báo USB 2FA chuyên dụng, nhưng lợi ích vẫn là mức độ an toàn hơn so với việc sử dụng ứng dụng không có 2FA.

Trong trường hợp không có bất kỳ lỗ hổng nào trong ứng dụng 2FA hoặc giao thức nhắn tin, 2FA sẽ loại bỏ các đăng nhập từ xa vào ứng dụng web của bạn mà không phải do chủ sở hữu tài khoản khởi tạo. Cách duy nhất để xâm phạm tài khoản 2FA là giành quyền truy cập vào cả mật khẩu tài khoản và thiết bị vật lý có chứa mã 2FA (thường là điện thoại).