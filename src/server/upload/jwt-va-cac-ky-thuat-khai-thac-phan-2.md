Tiếp tục với đề tài JWT, ở phần này, chúng ta sẽ tìm cách tấn công vào vào JWT.

Xem phần 1 tại đây: [https://viblo.asia/p/jwt-va-cac-ky-thuat-khai-thac-phan-1-magk7rrb5j2](https://viblo.asia/p/jwt-va-cac-ky-thuat-khai-thac-phan-1-maGK7rRB5j2)

![image.png](https://images.viblo.asia/aa872939-5eb5-46ea-b426-c91240792eb8.png)

# 6. CÁC TÌNH HUỐNG TẤN CÔNG JWT

Phần lớn các cuộc tấn công JWT là do lỗi triển khai chứ không phải do lỗi trong thiết kế Web Token. Phần này sẽ xem xét các loại kịch bản và kỹ thuật tấn công khác nhau có thể được sử dụng để khai thác một ứng dụng dựa trên JWT.

## Xác minh chữ ký thất bại

![image.png](https://images.viblo.asia/037f8826-a6e0-4c40-838f-8ed14baac957.png)

Chữ ký của JWT đảm bảo rằng header và payload không bị thay đổi bởi bất kỳ tác nhân nào. Nhưng mối quan tâm nảy sinh khi máy chủ ứng dụng không xác minh được chữ ký này. Đôi khi các lập trình viên không triển khai các phương pháp thích hợp để xác minh chữ ký với mọi yêu cầu ở phía máy chủ. Do đó, kẻ tấn công có được khả năng sửa đổi phần payload, điều này có thể dẫn đến truy cập tài nguyên trái phép hoặc leo thang đặc quyền.

Tấn công bằng cách loại bỏ signature và sửa header, payload.

## Tấn công bằng thuật toán NONE

![image.png](https://images.viblo.asia/c691b726-1e3a-449d-8dcd-c0d7a2006866.png)

Thư viện JWT bao gồm thuật toán NONE. Thuật toán này được thiết kế để sử dụng cho các tình huống mà sự nguyên vẹn của token đã được xác minh. Điều thú vị là thuật toán này chỉ định rằng token không được ký và sẽ không chứa phần chữ ký. Nếu máy chủ ứng dụng không xác minh được giá trị "alg" trong header JWT hoặc diễn giải thuật toán NONE, nó cho biết rằng chúng tôi có thể gửi JWT mà không có phần chữ ký. Vì phần chữ ký bị thiếu, người dùng độc hại có thể giả mạo JWT với phần payload được sửa đổi và dễ dàng có được đề quyền truy cập trái phép. Đó là lý do tại sao điều quan trọng là không chấp nhận các token NONE hoặc bất kỳ biến thể chữ hoa nào khác dưới dạng giá trị "alg".

## Khóa HMAC yếu

Thường JWT được tạo bằng cách sử dụng các thuật toán ký đối xứng như HS256, sử dụng cùng một khóa bí mật được chia sẻ để ký và xác minh chữ ký. Trong các thuật toán như vậy, nếu khóa bí mật có độ dài quá ngắn hoặc dễ đoán có thể sẽ gặp nguy hiểm.

Sử dụng các công cụ tự động khác nhau, kẻ tấn công có thể dễ dàng bẻ khóa bí mật. Khi khóa bí mật bị lộ, kẻ tấn công có thể tạo ra các token tùy ý và có thể là mối đe dọa đối với tổ chức. Để bruteforcing khóa bí mật, chúng ta có thể sử dụng một công cụ dựa trên python được gọi là JWT Tool. Nó có thể quan trọng hơn vì có thể brute-force bí mật cục bộ.

Mốt số những tool attacker có thể sử dụng để crack như jwt_tool, JohnTheRipper, HashCat...

## Tấn công gây nhiễu

JWT tương thích với cả thuật toán mã hóa đối xứng và không đối xứng .HS256 là một thuật toán khóa đối xứng sử dụng cùng một khóa bí mật để ký và xác minh token. Ngược lại, RS256 là một thuật toán khóa bất đối xứng trong đó nó sử dụng khóa riêng tư để ký token và khóa công khai để xác minh token.

Nếu kẻ tấn công lấy được khóa công khai, thì các token độc hại có thể được tạo ra bằng cách:

1. Thay đổi kiểu thuật toán từ RS256 sang HS256

2. Thực hiện các thay đổi trong phần payload

3. Sau đó ký token bằng khóa công khai

4. Trả lại JWT này cho ứng dụng

Vì không có kiểm tra nào đối với thuật toán này ở phía dịch vụ,nên máy chủ sẽ phân tích cú pháp header trước và xác định rằng đó là token thuật toán HMAC và gửi token để xác minh. Tuy nhiên, chúng tôi đã tạo token JWT độc hại với khóa công khai mở. Giả sử máy chủ so sánh chữ ký để xác minh tính xác thực của token. Trong trường hợp đó, nó sẽ sử dụng cùng một khóa công khai để xác minh, dẫn đến các chữ ký giống hệt nhau (như trong HMAC, cùng một khóa được sử dụng để ký và xác minh token). token sẽ được coi là một mã hợp lệ. Bằng cách này, kẻ tấn công có thể truy cập các tài nguyên trái phép.

## Các cuộc tấn công sử dụng tham số "jku"

Tham số jku trong header JWT có thể được sử dụng để chỉ ra Bộ khóa web JSON URL. Tham số này chỉ định nơi trích xuất Khóa web JSON (3WK), chủ yếu là khóa công khai được sử dụng để xác thực chữ ký.

![image.png](https://images.viblo.asia/c8c3d0c6-8db0-4452-8f19-82124941aa4e.png)

Một cuộc tấn công có thể được thực hiện theo những bước sau:

1. Kẻ tấn công thay đổi giá trị tham số jku thành khóa công khai được lưu trữ của chính nó.

2 nếu cơ chế lọc URL không được triển khai, thì máy chủ ứng dụng sẽ tìm nạp khóa từ URL được đề cập trong header của token,

3. Vì kẻ tấn công đã ký token bằng khóa riêng tư mà nó sở hữu nên máy chủ sẽ nhận ra JWT là một mã hợp lệ khi xác minh bằng khóa công khai

Có một số cách để kẻ tấn công vượt qua bộ lọc URL như:

* Đảm bảo rằng URL đáng tin cậy

* Sử dụng hệ thống phân cấp đặt tên DNS

* Chuỗi với một chuyển hướng mở

* Chuỗi với SSRF

* Chuỗi với header injection

*Tương tự như tham số "jku", một tham số khác có tên "x5u" được sử dụng để truy xuất các chứng chỉ khóa công khai X.509 được lưu trữ từ xa. Các cuộc tấn công được đề cập ở trên cũng có thể được nếu ứng dụng đang sử dụng tham số "x5u" trong header.*

## Lạm dụng tham số kid:

Thông thường các máy chủ ủy quyền sử dụng nhiều khóa bí mật để ký token. Phần tử "kid" hoạt động như một mã định danh chỉ định khóa nào sẽ được sử dụng trong khi xác minh chữ ký của token. Nó trỏ đến một khóa cụ thể có trong hệ thống tệp hoặc cơ sở dữ liệu.

* Command injection

![image.png](https://images.viblo.asia/e284496f-7fec-4d4d-af7c-99a0c214db8e.png)

Vì kẻ tấn công có quyền kiểm soát tham số header "kid", nên giá trị do kẻ tấn công kiểm soát có thể được chuyển cho hàm "hệ thống". Kẻ tấn công có thể gửi một payload chèn lệnh đến máy chủ và thực hiện các hoạt động độc hại. Kẻ tấn công có thể chèn một payload shell ngược để lấy RCE hoặc sau đó có thể lấy chính khóa bí mật.

* Path traversal

![image.png](https://images.viblo.asia/7b5f1cd6-c55a-4015-9e4b-2796d940aaae.png)

Tham số "kid" trong header, chỉ định đường dẫn đến khóa trong hệ thống tệp, được sử dụng để xác minh token. Giả sử kẻ tấn công nhập đường dẫn đến tệp có nội dung có thể dự đoán được trong tham số header "kid". Trong trường hợp đó, kẻ tấn công có thể tạo token giả mạo vì khóa bí mật đã được biết đến. Một trong những tệp như vậy là "/ proc / sys / kernel / randomize_va_space", được sử dụng trong hệ thống Linux và có các giá trị có thể dự đoán được như 0,1,2. Kẻ tấn công hiện có thể tạo token độc hại bằng cách sử dụng các giá trị bí mật 0,1,2 và gửi nó đến máy chủ.

* SQL Injection

![image.png](https://images.viblo.asia/c7058fbc-1b88-46d8-aa9a-e9e7d4d18f77.png)

Một số ứng dụng lưu trữ khóa của chúng trong cơ sở dữ liệu. Nếu một khóa như vậy được tham chiếu trong tham số "kid", nó có thể dễ bị chèn SQL. Bằng cách này, kẻ tấn công có thể thực hiện một cuộc tấn công SQL Injection và có thể kiểm soát giá trị được trả về cho tham số "kid" từ truy vấn SQL. Bây giờ vì kẻ tấn công đã biết khóa bí mật, token độc hại có thể bị giả mạo.

# 7. CÁC VẤN ĐỀ KHÁC:

Nếu kẻ tấn công không thể giả mạo các token độc hại, chúng sẽ cố gắng đánh cắp chúng. Ngay cả khi tất cả các triển khai JWT đều hoàn hảo, người dùng có thể gặp rủi ro nếu ứng dụng dễ bị các lỗi khác. Các lỗ hổng này bao gồm:

## XSS

Đôi khi, token JWT được lưu trữ dưới dạng cookie. Trong những trường hợp như vậy, nếu ứng dụng dễ bị tấn công XSS, các payload có thể được sử dụng để lấy cắp chúng.

## CSRF

Khi token JWT được lưu trữ trong cookie, nó sẽ được gửi đến máy chủ với mọi yêu cầu được xác thực. Nếu nạn nhân thực hiện payload CSRF, token JWT sẽ được gửi đến máy chủ để khiến người dùng thực hiện các hành động mà họ không có ý định thực hiện.

## CORS

Nếu chính sách CORS của ứng dụng cho phép nguồn gốc tùy ý cũng như gửi thông tin xác thực, kẻ tấn công có thể gửi yêu cầu XHR đến máy chủ. Bằng cách này, kẻ tấn công có thể đánh cắp token nếu ứng dụng làm rò rỉ mã trong phản hồi.

# 8. NHỮNG LƯU Ý KHI SỬ DỤNG JWT

Dưới đây là một số thực tiễn bảo mật mà người ta phải xem xét khi sử dụng JWT '.

1. Sử dụng các thuật toán thích hợp tùy theo trường hợp sử dụng của bạn.

2. Các khóa ký phải luôn được giữ an toàn và bảo mật.

3. Chọn các phím ký mạnh.

4. Xác thực tất cả các tuyên bố có thể được đề cập trong JWT

5. Không thêm dữ liệu nhạy cảm trong phần payload.

6. Cung cấp cho các token hết hạn.

7. Luôn sử dụng kết nối HTTPS để truyền token.

8. Luôn thực hiện xác minh thuật toán của các token nhận được.

9. Trong trường hợp các token lồng nhau, hãy luôn thực hiện tất cả các xác nhận.

10. Không sử dụng JWT làm token truy cập.

# 9. TÀI LIỆU THAM KHẢO

[https://thexssrat.medium.com/hack-your-own-jwt-implementation-1d9dd4315de5](https://thexssrat.medium.com/hack-your-own-jwt-implementation-1d9dd4315de5)

https://owasp.org/www-chapter-vancouver/assets/presentations/2020-01_Attacking_and_Securing_JWT.pdf[](https://owasp.org/www-chapter-vancouver/assets/presentations/2020-01_Attacking_and_Securing_JWT.pdf)

https://www.sjoerdlangkemper.nl/2016/09/28/attacking-jwt-authentication/[](https://www.sjoerdlangkemper.nl/2016/09/28/attacking-jwt-authentication/)

Và một số tài liệu khác...