# TỔNG QUAN
![image.png](https://images.viblo.asia/5f0facc5-05ee-41b7-a113-5689f75393bc.png)
The Open Web Application Security Project (OWASP) - Dự án Bảo mật ứng dụng web mã nguồn mở là một cộng đồng trực tuyến hợp tác phi lợi nhuận.  Họ tạo ra các bài báo, phương pháp, tài liệu, công cụ và công nghệ để cải thiện tính bảo mật của ứng dụng. Dự án tập trung vào việc đưa ra các tiêu chuẩn, checklist, guideline giúp các nhà nghiên cứu bảo mật có thể dễ dàng tiếp cận, học học và áp dụng các biện pháp bảo mật cho website vào thực tế.

Chúng ta đã quen thuộc với Top 10 OWASP dành cho các ứng dụng website, vậy còn với các ứng dụng api thì các lỗ hổng sẽ xảy ra như thế nào? Có sự khác biệt nào giữa hai loại ứng dụng này khi thực hiện việc kiểm thử bảo mật không chúng ta cùng tìm hiểu qua bài viết này.

Trong khi các API REST có nhiều điểm tương đồng với các ứng dụng web thì cũng có những điểm khác biệt cơ bản. Trong các ứng dụng web truyền thống, dữ liệu được gửi lên từ phía client và được xử lý cũng như kiểm tra ở phía ở phía máy chủ. Sau đó dữ liệu (bao gồm cả html) được gửi đến các trình duyệt và hiển thị lên cho người dùng. Do đó, các điểm xâm nhập vào kiến trúc mạng của doanh nghiệp tương đối ít và dễ bảo vệ bằng cách thiết lập tường lửa ứng dụng web (WAF) phía trước máy chủ ứng dụng web.

Các ứng dụng dựa trên API hiện đại rất khác. Ngày càng nhiều, giao diện người dùng sử dụng các API để gửi và nhận dữ liệu từ các máy chủ để cung cấp các chức năng của ứng dụng. Bên cạnh việc nhận dữ liệu từ phía server, client cũng thực hiện việc xử lý và hiển thị cũng như duy trì trạng thái của dữ liệu:

![image.png](https://images.viblo.asia/2e658ff7-f86e-46f4-b74b-07eb734b58ec.png)

Thêm vào đó là các kiến trúc microservices với các thành phần ứng dụng riêng lẻ trở thành API và việc này cũng mở ra nhiều con đường tấn công khác nhau tới các ứng dụng api. Với rất nhiều điểm thông qua các microservices, việc đặt WAF trước các ứng dụng không còn đủ đảm bảo an toàn cho các ứng dụng. Ngoài ra, việc sử dụng WAF truyền thống đôi khi rất khó để phân biệt các lệnh gọi API với mục đích tấn công với lưu lượng API hợp pháp.

Thông thường, các API thường dễ để lộ ra logic ứng dụng và dữ liệu nhạy cảm như: Thông tin nhận dạng cá nhân (PII), dữ liệu về tài khoản và dữ liệu ứng dụng. Các dữ liệu này ngày càng trở thành mục tiêu của những kẻ tấn công. Tất cả điều này có nghĩa là bảo mật API cần có cách tiếp cận bảo mật riêng, tập trung vào các biện pháp để hiểu và giảm thiểu các lỗ hổng bảo mật cũng như rủi ro mất mát dữ liệu của các ứng dụng API. Bài viết sẽ giới thiệu tới bạn đọc về [OWASP TOP 10 API 2019](https://owasp.org/www-project-api-security/)
# OWASP TOP 10 API
## API1:2019 — Broken object level authorization

Lỗ hổng tấn công vào cơ chế phân quyền không chặt chẽ của website khiến cho kẻ tấn công có thể đọc hoặc chỉnh sửa dữ liệu của user khác. Kẻ tấn công thay thế ID của đối tượng trong lệnh gọi API bằng ID của đối tượng của người dùng khác. Việc thiếu kiểm tra quyền thích hợp cho phép kẻ tấn công truy cập vào tài nguyên được chỉ định. Cuộc tấn công này còn được gọi là tham chiếu đối tượng trực tiếp không an toàn - IDOR (Insecure Direct Object Reference). Ngoài thay đổi id, kẻ tấn công có thể quan sát trong các request để thay đổi các tham số khác như: `username`, `shopname`, `photo_id`,`card_id`,`oder_id`,...

![image.png](https://images.viblo.asia/0f0e8ffe-1f3f-449c-b448-9be30f0a720c.png)

### Kịch bản tấn công 1
- API  sử dụng tham số là `id` (id user hiện tại là: 112) để thực hiện truy cập tới thông tin về tài chính của user đó thông qua API: `/api/acccounts/112/financial_info`.
- Kẻ tấn công quan sát và suy đoán ứng dụng sử dụng giá trị id của user để lấy ra thông tin, từ đó kẻ tấn công sẽ thay đổi giá trị `112` sang giá trị `111` để kiểm tra việc có thể truy cập vào thông tin của user khác không `/api/acccounts/111/financial_info`.
- Ứng dụng không kiểm tra quyền khi request được gửi lên dẫn đến kết quả trả về thông tin của user có id `111` cho kẻ tấn công.
- Kẻ tấn công sẽ tiếp tục tìm các endpoint liên quan đến việc UPDATE và DELETE dữ liệu để tiến hành kiểm tra việc việc sửa đổi và xóa dữ liệu.
- 
### Kịch bản tấn công2
Trong khi thực hiện việc chặn bắt request cập nhật thông tin user bằng công cụ BurpSuite trên website, kẻ tấn công phát hiện một request được gửi lên server với `HTTP PATCH` request và giá trị trong header là: `X-User-Id: 54796`. Kẻ tấn công thay thế giá trị `X-User-Id` thành `54795` và nhận về response `200 OK`, vì vậy kẻ tấn công đã sửa đổi dữ liệu của user khác thành công

### Biện pháp bảo vệ
- Định nghĩa và tuân thủ ma trận phân quyền khi phát triển ứng dụng
- Thực hiện kiểm tra phân quyền với tất cả các request được gửi lên từ phía lient.
- Không dựa vào ID mà user gửi lên ở request. Thay vào đó, hãy sử dụng các ID được lưu trữ trong phiên hoặc cơ sở dữ liệu
- Kiểm tra phân quyền cho từng yêu cầu của user khi thực hiện truy cập cơ sở dữ liệu.
- Sử dụng các ID ngẫu nhiên không thể đoán được (UUID).
- Thực hiện viết các testcase đầy đủ cho các bài test về phân quyền

Ví dụ UUID: ![image.png](https://images.viblo.asia/f77d9fbb-3ffe-4ddd-99bf-dcebcfe53823.png)

## API2:2019 — Broken authentication
Việc triển khai không tốt cơ chế xác thực cho phép tấn công để vượt qua cơ chế xác thực hoặc sử dụng để tấn công mạo danh danh tính của người khác.

![image.png](https://images.viblo.asia/1915d781-d72e-4fd8-bb08-af6d53aa8b8a.png)

- Các api được coi là "nội bộ" không public ra ngoài nên không triển khai các biện pháp bảo mật xác thực
- Biện pháp xác thực yếu không tuân theo các phương pháp tiêu chuẩn
- Sử dụng API Keys yếu không có cơ chế rotate
- Sử dụng mật khẩu yếu, plain text, sử dụng thuật toán mã hóa yếu hoặc mật khẩu mặc định khi xác thực API
- Không có cơ chế chống lại tấn công bruteforce tài khoản và mật khẩu
- Thông tin xác thực (password, session key, secret keys) bị lộ trên URL
- Thiếu cơ chế xác thực access token hoặc cơ chế xác thực access token yếu (JWT Token). Xem thêm bài viết về JWT Token tại đây: [JSON Web Tokens (JWT) có dễ bị "gãy" không?
](https://viblo.asia/p/json-web-tokens-jwt-co-de-bi-gay-khong-07LKXqBJZV4)

### Kịch bản tấn công
Kẻ tấn công sử dụng chức năng password recovery và tiến hành chặn bắt request. Ứng dụng thực hiện gọi tới API: `/api/system/verification-codes` với nội dung body request là `username`. Tiếp đó, một tin nhắn SMS được gửi về số điện thoại với 6 số OTP. Số này được sử dụng để reset mật khẩu thông qua endpoit: `/api/system/verification-codes/{OTP_token}`

Vì ứng dụng không có cơ chế ngăn chặn số lần nhập sai mã code 6 số nên kẻ tấn công có thể lợi dụng để tiến hành chiếm quyền tài khoản người dùng. Đầu tiên kẻ tấn công sẽ tiến hành nhập `username` của nạn nhân để yêu cầu reset mật khẩu, sau đó khi cần nhập mã OTP 6 số, kẻ tấn công sử dụng công cụ BurpSuite để tiến hành bruteforce từ `000001` đến `999999` (10.000.000) khả năng. Sau một khoảng thời gian kẻ tấn công sẽ có thể lấy được mã OTP 6 số hợp lệ và reset mật khẩu người dùng.

![image.png](https://images.viblo.asia/9fb6c9a1-f2d1-4d48-8dc9-e654ed90c635.png)

### Biện pháp bảo vệ
- Đảm bảo rằng thực hiện đầy đủ các quy trình có thể có để xác thực với API (di động / web / one-click authentication / v.v.)
- Đọc và áp dụng đầy đủ các biện pháp bảo mật xác thực theo các tiêu chuẩn có sẵn. Chúng ta cần hiểu rõ các cơ chế sử dụng để tránh các lỗi không cân thiết. Ví dụ: OAUth không phải là cơ chế xác thực mà chỉ thực hiện việc ủy quyền truy cập cho ứng dụng
- Không tự phát triển các cơ chế xac thực, tạo token, lưu trữ mật khẩu mà thay vào đó sử dụng các thư viện tiêu chuẩn
- Cần có cơ chế rate-limit (ngăn chặn bruteforce), lockout policies (khóa tài khoản khi nhập sai) cho các chức năng liên quan xác thực: đăng ký, đăng nhập, quên mật khẩu..
- Sử dụng access-token tồn tại trong thời gian ngắn và cần có chế thay đổi
- API key sử dụng để xác thực ứng dụng, không để xác thực người dùng (sử dụng username/passoword) để xác thực người dùng

## API3:2019 — Excessive data exposure
API có thể tiết lộ nhiều dữ liệu hơn những gì khách hàng cần một cách hợp pháp. Nhiều ứng dụng  APi thường trả về toàn bộ dữ liệu, sau đó mới tiền hành lọc những dữ liệu cần hiển thị lên phía client. Nếu những kẻ tấn công truy cập trực tiếp vào API,kẻ tấn công có thể lấy được toàn bộ dữ liệu trả về.

![image.png](https://images.viblo.asia/ec478482-6219-4240-96b6-001f08a7d4c6.png)

### Kịch bản tấn công 1
Team phát triển ứng dụng mobile sử dụng API `/api/articles/{articleId}/comments/{commentId}` endpoit trong bài viết để hiển thị comments metadata. Hacker sử dụng công cụ chặn bắt request BurpSuite và tiến hành tìm kiếm các dữ liệu nhạy cảm có liên quan đến comments của tác giả trong response trả về. Endpoit có sử dụng phương thức `toJSON()` trong model `User`, điều này làm lộ các thông tin định danh cá nhân của user (PII)

### Kịch bản tấn công 2
Trong một lần sử dụng ứng dụng xem camera an ninh, kẻ tấn công phát hiện một API endpoint: `/api/sites/111/cameras`. Endpoit này trả về toàn danh sách các camera có sẵn và hiển thị lên dashboard. Khi quan sát response trả về, kẻ tấn công thấy response chứa toàn bộ danh sách với chi tiết các camera : `{"id":"xxx","live_access_token":"xxxx-bbbbb","building_id":"yyy"}`. Ở đây, ứng dụng chỉ thực hiện việc lọc ở phía lient mà không lọc trên server nên dù giao diện chỉ hiển thị danh sách camera được phép xem nhưng response trả về thì lại chứa toàn bộ danh sách và chi tiết toàn bộ camera,

### Biện pháp bảo vệ
- Không lọc dữ liệu ở phía client, cần thực hiện lọc trên server và chỉ trả về dữ liệu cần thiết
- Review toàn bộ API response để phát hiện việc trả về thừa dữ liệu hoặc dữ liệu nhạy cảm
- Định nghĩa đầy đủ và rõ ràng cho các API response trả về
- Tránh sử dụng các phương thức  như `to_json ()` và `to_string ()`. Thay vào đó, hãy chọn những thuộc tính cụ thể cần trả về
- Xác định các dữ liệu nhạy cảm, dữ liệu PII để có biện pháp bảo vệ cũng như trả về khi thực sự cần thiết
- Xử lý tốt các exception tránh trả về các thông báo lỗi mặc định chứa dữ liệu nhạy cảm của hệ thống


# Reference
## Các tài liệu tham khảo và công cụ sử dụng trong bài viết
- **POSTMAN**: https://www.postman.com/
- **BURPSUITE**: https://portswigger.net/burp/communitydownload
- **API Security Top 10 2019**: (https://owasp.org/www-project-api-security/)
- **API Security Top 10 2019** (https://apisecurity.io/encyclopedia/content/owasp/api3-excessive-data-exposure)