# Tổng quan
Các lỗ hổng bảo mật website như SQL Injection, UnBroken Access Control, Unrestricted File Upload, XSS chắc không còn xa  xạ với nhiều người làm bảo mật hay lập trình viên. Các lỗ hổng xảy ra khi dữ liệu  ứng dụng web không được xử lý trên server cho phép hacker khai thác và lấy cắp dữ liệu nhạy cảm hoặc can thiệp tới dữ liệu trên server. Các lỗ hổng này thường đến từ việc lập trình viên không tuân thủ những  hướng dẫn lập trình an toàn và xử lý dữ liệu không  an toàn trên  server. Các lỗ hổng thường đến từ mã nguồn của các ứng dụng web và có thể được xư lý bằng cách cập nhật mã nguồn hoặc sử dụng các  web application firewall để tiến hành ngăn chặn khai thác lỗ hổng bảo mật.

Khác với các lỗ hổng trên, lỗ hổng Business logic đến từ việc thiết kế chức năng, luồng hoạt động ứng dụng không an toàn hoặc đến từ việc xử lý dữ liệu không an toàn. Khi phát triển ứng dụng, các  kịch bản hoạt động, chức năng sẽ được định nghĩa và phát triển theo các kịch bản đó. Khi thực hiện kiểm tra các ứng dụng, các tester cúng sẽ kiểm tra theo những kịch bản như vậy. Tuy nhiên, có một số trường hợp nằm ngoài phạm vi hay kịch bản mà chúng ta không lường trước được. Chính vì những lý do đó, hacker sẽ lợi dụng những điểm yếu trong cách thức hoạt động của ứng dụng để khai thác  vào ứng dụng web. Hậu quả là dữ liệu người dùng sẽ bị khai thác hoặc tài nguyên trong hệ thống sẽ bị lợi dụng và đánh cắp  một cách trái phép.

# Lỗ hổng Business logic là gì
![image.png](https://images.viblo.asia/0ea0ce60-856c-4429-9be0-b79d25508090.png)
## Khái niệm
Lỗ hổng logic nghiệp vụ là những lỗ hổng trong thiết kế và triển khai một ứng dụng cho phép kẻ tấn công gây ra hành vi ngoài ý muốn. Điều này có khả năng cho phép những kẻ tấn công thao túng chức năng hợp pháp để đạt được mục đích xấu. Những sai sót này là kết quả của việc không lường trước được các trạng thái ứng dụng bất thường có thể xảy ra và do đó, không xử lý chúng một cách an toàn. Thay vì thực hiện theo đúng các logic trình tự hay luồng hoạt động của website, hacker sẽ tìm cách để thực hiện khác với luồng nghiệp vụ của ứng dụng để từ đó phát hiện ra những điểm yếu bảo mật tồn tại trong ứng dụng. Các lỗi logic thường không dễ phát hiện với những người dùng thường vì đa không bị lộ ra khi sử dụng ứng dụng bình thường. Tuy nhiên, kẻ tấn công có thể khai thác các hành vi kỳ quặc bằng cách tương tác với ứng dụng theo những cách mà các nhà phát triển không bao giờ có ý định. Chúng ta cùng phân tích một số ví dụ để hiểu rõ hơn về lỗ hổng.
## Ví dụ
**Ví dụ 1**: ***Mua  hàng trên website***

Người dùng sau khi chọn mặt hàng được mua trên website, một đơn hàng bao gồm các thông tin: Mã mặt  hàng, số lượng, đơn giá và thành  tiền sẽ được tạo và gửi sang bước tiếp theo và ở bước này dữ liệu sẽ được gửi lên server để tiến hành xử lý theo 2 luồng gồm luồng 1: xử lý số lượng trong cơ sở dữ liệu (kiểm tra số lượng, đơn giá,  trừ số lượng sau khi thành công để tạo đơn) và luồng 2: thanh toán để trừ tiền và tài khoản người dùng.

Giả sử người dùng mua 5 chiếc túi với giá 50.000 đồng/ túi. Đến bước thanh toán số tiền người dùng sẽ phải trả là 5 * 50.000 = 250.000 đồng. Thường đến bước thanh toán này, trên giao diện web sẽ không cho phép người dùng thay đổi dữ liệu số lượng, đơn giá hay số tiền, vì vậy người  phát triển nghĩ rằng dữ liệu này là chính xác và tiến hành xử lý dữ liệu trong cơ sở dữ liệu cũng như thanh toán số tiền  đó.

Tuy nhiên, bằng cách sử dụng một số công cụ như proxy, hacker có thể chặn bắt request và sửa lại số tiền là 1000 đồng và gửi đi. Sau đó, ứng dụng nhận được yêu cầu và tiến hành xuất đơn với số lượng 5 chiếc túi (theo luồng 1) nhưng chỉ trừ 1000 đồng (theo luồng 2) thay vì 250.000 đồng. Việc này giúp hacker có thể mua hàng với số tiền ít hơn rất nhiều so với thực tế

**Ví dụ 2**: ***Ứng dụng chuyển tiền  giữa 2 ngân hàng  A và B***.

Luồng hoạt động thực hiện như sau.
Giả sử người dùng 1 đang có 10 triệu đồng ở ngân hàng A và và người dùng 2 đang có 20 triệu đồng ở ngân hàng B. Người dùng 1 chuyển khi chuyển tiền từ ngân hàng A sang cho người dùng 2 ở ngân hàng B, ứng dụng sẽ tiến hành trừ số tiền mà người dùng 1 chuyển ở ngân hàng A, đồng thời cộng số tiền đó vào tài khoản người dùng 2 ở ngân hàng B.

* **Trường hợp thông thường**: Người dùng 1 chuyển 5.000.000 vnd (5 triệu vnd) từ ngân hàng A sang cho người dùng 2 ở ngân hàng B B. Sau khi thực hiện thành công,  số tiền người dùng 1 trong ngân hàng A còn 5.000.000 vnd, số tiền ngân hàng B là  25.000.000 vnd.

* **Trường hợp bất thường**: Người dùng 1 chuyển  số tiền âm là - 5.000.000 vnd từ A -> B. Vì không thực hiện kiểm tra logic số tiền khi chuyển vào, nên sau khi thực hiện thành công,  số tiền trong tài khoản người dùng 1 ở ngân hàng A là: 10.000.000 - (-5.000.0000 = 15.000.000 vnd. Trong khi đó, số tiền người dùng 2 trong ngân hàng B là 20.000.000 + (-5.000.000) = 15.000.000. 
 
Vậy là sau khi thực hiện, người chuyển  tăng số tiền, người nhận giảm số tiền.

Qua 2 ví dụ trên, chúng ta có thể hình dung qua về các lỗ hổng Business logic là như thế nào. Phần tiếp theo chúng ta cùng tìm hiểu cách phát hiện và khai thác các lỗ hổng này.
# Nguyên nhân, cách khai thác và biện pháp khắc phục
## Nguyên nhân
Các lỗ hổng logic nghiệp vụ thường phát sinh do việc thiết kế và phát triển đưa ra các giả định sai lầm về cách người dùng sẽ tương tác với ứng dụng. Những giả định không tốt này có thể dẫn đến việc xác nhận không đầy đủ thông tin đầu vào của người dùng.
Ví dụ: Lập trình viên thường giả định rằng người dùng sẽ truyền chỉ có thể truyền dữ liệu thông qua giao diện web (input field) và ứng dụng có thể sử dụng các dữ liệu này. Những dữ liệu này dễ dàng bị kẻ tấn công bỏ qua bằng cách sử dụng proxy. Cuối cùng, hacker có thể vượt qua được những trường hợp đặc biệt ngoài dự tính thiết kế.

Các lỗi logic đặc biệt phổ biến trong các hệ thống phức tạp, nhiều luồng nghiệp vụ vì ngay cả bản thân nhóm phát triển cũng không hiểu hết được cũng như lường trước các trường hợp có thể xảy ra. Để tránh những sai sót về logic, các nhà phát triển cần hiểu ứng dụng một cách tổng thể. Điều này bao gồm nhận thức về cách các chức năng khác nhau có thể được kết hợp theo những cách không mong đợi.

## Mục tiêu kiểm tra
* Xác định các kiểu dữ liệu mà ứng dụng web chấp nhận.
* Chắc chắn rằng tất cả các dữ liệu cần được xử lý trên server.
* Cố gắng phá vỡ định dạng của dữ liệu mong đợi và phân tích cách ứng dụng đang xử lý nó.

## Cách thức kiểm tra

* Xem lại tài liệu dự án và sử dụng thử nghiệm khám phá để tìm kiếm các điểm nhập dữ liệu hoặc các điểm khác biệt giữa các hệ thống hoặc phần mềm.
* Sau khi được tìm thấy, hãy cố gắng chèn dữ liệu không hợp lệ về mặt logic vào ứng dụng / hệ thống. Phương pháp kiểm tra cụ thể:
* Thực hiện kiểm tra hợp lệ chức năng GUI front-end trên ứng dụng để đảm bảo rằng các giá trị “hợp lệ” duy nhất được chấp nhận.
* Sử dụng proxy chặn quan sát HTTP POST / GET tìm kiếm những nơi mà các biến số như chi phí và chất lượng được chuyển qua. Cụ thể, hãy tìm kiếm những “điểm giao thoa” giữa các ứng dụng / hệ thống có thể là những điểm có thể chèn hoặc giả mạo.
* Khi các biến được tìm thấy, hãy bắt đầu thẩm vấn trường với dữ liệu “không hợp lệ” về mặt logic, chẳng hạn như số an sinh xã hội hoặc số nhận dạng duy nhất không tồn tại hoặc không phù hợp với logic nghiệp vụ. Thử nghiệm này xác minh rằng máy chủ hoạt động bình thường và không chấp nhận dữ liệu không hợp lệ về mặt logic.

## Biện pháp khắc phục
* Đảm bảo nhà phát triển và người kiểm tra hiểu luồng hoạt động của ứng dụng và các dữ liệu hợp pháp của ứng dụng
* Cố gắng đưa ra các giả định về những trường hợp đặc biệt, dữ liệu không  hợp lệ và  những kịch bản  khác với luồng hoạt động thông thường của ứng dụng
* Duy trì các tài liệu thiết kế và luồng dữ liệu rõ ràng cho tất cả các quá trình phát triển ứng dụng và quy trình làm việc để có thể nắm được những thay đổi của ứng dụng cũng như luồng hoạt động của nó.
* Viết mã càng rõ ràng càng tốt, tốt nhất là mã được viết tốt không cần tài liệu để hiểu nó. Trong những trường hợp phức tạp không thể tránh khỏi, việc tạo ra tài liệu rõ ràng là rất quan trọng để đảm bảo rằng các nhà phát triển và người thử nghiệm khác biết những giả định nào đang được thực hiện và chính xác hành vi mong đợi là gì.
# Demo khai thác
{@embed: https://vimeo.com/707707039}