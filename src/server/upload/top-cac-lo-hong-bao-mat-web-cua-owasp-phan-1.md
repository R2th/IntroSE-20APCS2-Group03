## 1. Lỗ hổng Injection (Lỗi chèn mã độc)
### Khái niệm
Injection là lỗ hổng xảy ra do sự thiếu sót trong việc lọc các dữ liệu đầu vào không đáng tin cậy. Khi bạn truyền các dữ liệu chưa được lọc tới Database (Ví dụ như lỗ hổng SQL injection), tới trình duyệt (lỗ hổng XSS), tới máy chủ LDAP (lỗ hổng LDAP Injection) hoặc tới bất cứ vị trí nào khác. Vấn đề là kẻ tấn công có thể chèn các đoạn mã độc để gây ra lộ lọt dữ liệu và chiếm quyền kiểm soát trình duyệt của khách hàng.
### Hậu quả
Injection có thể dẫn đến mất dữ liệu, sự gián đoạn hoặc tiết lộ cho những tổ chức thứ 3, mất hết tài khoản, hoặc từ chối truy cập. Đôi khi, injection dẫn tới việc chiếm quyền kiểm soát.
### Cách phòng chống
Nguyên tắc cơ bản để chống lại Injection là phải tách dữ liệu được gửi lên khỏi câu lệnh thực thi trực tiếp và các query

* Có cơ chế kiểm tra và lọc dữ liệu đầu vào như giới hạn kích thước, loại bỏ các kí tự đặc biệt, ..
* Sử dụng thủ tục lưu trữ (Store procedures) trong CSDL. Tạm hiểu là đưa các câu truy vấn SQL vào trong thủ tục (gần giống hàm trong các ngôn ngữ lập trình), dữ liệu được truyền vào thủ tục thông qua các tham số -> tách dữ liệu khỏi mã lệnh
* Không hiển thị Exception hay thông báo lỗi để tránh kẻ tấn công có thể suy đoán kết quả
* Thiết lập quyền sử dụng cho người dùng phù hợp
* Chủ động sử dụng các công cụ dò quét lỗ hổng bảo mật
* Backup dữ liệu thường xuyên
## 2. Broken Authentication
### Khái niệm
![](https://images.viblo.asia/766872ce-7be2-43c3-9b1d-0dff047e64ad.png)
Đây là lỗ hổng liên quan tới vấn đề xác thực người dùng, quản lý phiên được triển khai chưa đúng cách, cơ chế quản lý yếu -> cho phép Hacker có thể bẻ khóa passwords, keys, session tokens hay lợi dụng để thực hiện khai thác các lỗ hổng khác nhằm chiếm được định danh của người dùng tạm thời hoặc vĩnh viễn.

Kẻ tấn công dễ dàng tìm kiếm hàng trăm ngàn usernames và password phổ biến, một danh sách các tài khoản admin mặc định, các tools brute force tự động (tấn công vét cạn), hoặc các bộ công cụ tấn công từ điển. Đây là điều kiện cần để thực hiện cuộc tấn công nhằm vào lỗ hổng này
Với việc có quyền truy cập vào một vài tài khoản, hoặc chỉ cần 1 tài khoản admin là đủ để Hacker có thể gây nguy hại cho cả hệ thống. Tuỳ thuộc vào tính chất của hệ thống, mà nó cho phép Hacker tiến hành nhiều hành vi phạm pháp như rửa tiền, ăn cắp tài sản, danh tính, tiết lộ thông tin nhạy cảm, ...
### Vậy một hệ thống như thế nào sẽ có nguy cơ đối mặt với lỗ hổng này ?
* Ứng dụng cho phép hacker tiến hành các cuộc tấn công vét cạn Brute Force hoặc các kiểu tấn công tự động khác. Các bạn có thể hiểu đơn giản là ứng dụng Web của chúng ta cho phép request liên tục nhiều API từ cùng một IP hoặc cố gắng truy cập vào một tài khoản nhiều lần mà không có cơ chế quản lý ví dụ như lock tài khoản đó nếu xuất hiện những hành vi như vậy
* Cho phép người dùng đặt các mật khẩu yếu, không đạt tiêu chuẩn. Không có cơ chế bắt buộc thay đổi mật khẩu mặc định chẳng hạn "Password1" hay "admin/admin"
* Cơ chế khôi phục mật khẩu (trường hợp người dùng quên mật khẩu) yếu hoặc không an toàn, chẳng hạn cơ chế trả lời câu hỏi mà bạn hay thấy nếu sử dụng Yahoo từ 7-8 năm trước, đây thực sự là một giải pháp rất tệ ở thời điểm hiện tại
* Lưu trữ Password dạng Plaintext (bản rõ) mà không mã hoá, hoặc sử dụng những thuật toán mã hóa hay các mã băm đơn giản, dễ dàng bị crack
* Thiếu hoặc cơ chế xác thực 2 lớp không hiệu quả
* Hiển thị trực tiếp Session IDs hoặc các thông số quan trọng trong Params của URL
* Không có cơ chế luân phiên thay đổi Session IDs sau khi đăng nhập thành công
* Việc cài đặt thời gian tồn tại của Session IDs không đúng
### Hậu quả
Hacker phải chiếm quyền truy cập 1 vài tài khoản hoặc chỉ cần 1 tài khoản admin để xâm nhập vào hệ thống. 

Dựa vào mục đích của hệ thống mà Broken Authentication có thể cho phép chuyển tiền, tiết lộ ra các thông tin nhạy cảm có độ bảo mật cao.
### Cách phòng chống
* Triển khai cơ chế xác thực 2 lớp nhằm chống lại các cuộc tấn công tự động như Brute Force
* Kiểm tra độ an toàn của Password, không cho phép người dùng đặt những mật khẩu quá đơn giản chẳng hạn chỉ toàn số, hoặc toàn chữ. Bạn cũng có thể kiểm tra mật khẩu người dùng đặt trong top 10000 passwords tệ nhất `https://github.com/danielmiessler/SecLists/tree/master/Passwords` và không cho cài đặt những mật khẩu này
* Đảm bảo việc đăng ký, khôi phục tài khoản, đăng nhập thất bại (có thể do sai Password, Username) hoặc đường dẫn URL sẽ sử dụng các messages giống nhau trả vê cho người dùng cho mọi kết quả. Chẳng hạn khi người dùng đăng nhập không thành công do sai mật khẩu. Nếu Server trả về thông điệp "Bạn nhập sai mật khẩu". Kẻ tấn công có thể dựa vào đó để biết rằng username được gửi lên tồn tại, và chỉ cần vét cạn mật khẩu cho tới khi thành công. Thay vào đó, Server nên trả về thông điệp "Username hoặc Password không hợp lệ", kẻ tấn công sẽ không thể loại bỏ trường hợp nào, việc vét cạn sẽ trở nên phức tạp hơn rất nhiều
* Giới hạn số lần hoặc yêu cầu thời gian chờ sau một số lần đăng nhập không thành công. Có thể là khoá tài khoản (cách Facebook đang áp dụng), hoặc sau 2-3' mới có thể tiếp tục thực hiện đăng nhập, cơ chế này cũng khá phổ biến như khi mở khoá Iphone, thiết bị của bạn sẽ bị vô hiệu hoá sau 1 số lần nhập sai mật khẩu
* Có cơ chế sinh, quản lý và lưu trữ Session IDs đảm bảo an toàn, với độ khó và xáo trộn cao, set thời gian hết hạn cũng như tự huỷ sau khi Logout.
## 3. Lỗ hổng XSS (Cross Site Scripting)
### Khái niệm
![](https://images.viblo.asia/acb05493-0b31-4a4e-ba34-6a3bd7135d59.png)

Lỗ hổng XSS (Cross-site Scripting) là một lỗ hổng rất phổ biến. Kẻ tấn công chèn các đoạn mã Script vào ứng dụng web. Khi đầu vào này không được lọc, chúng sẽ được thực thi mã độc trên trình duyệt của người dùng. Kẻ tấn công có thể lấy được cookie của người dùng trên hệ thống hoặc lừa người dùng đến các trang web độc hại.

=> Cơ chế : Hacker sẽ nhập vào ô Input mã script, sau đó server sẽ lưu vào database và khi người dùng gửi request lên server thì server sẽ load dữ liệu từ database ra để xử lý và mã script đó được thực thi và hacker có thể lấy được cookie của người dùng hoặc chuyển hướng người dùng đến web nguy hiểm hơn.
### Hậu quả
Đoạn script được thực thi ở giao diện người dùng khiến cho hacker có thể thực hiện các tác vụ: stealing credentials, sessions, or delivering malware to the victim.
### Cách phòng chống
* Sử dụng frameworks mà tự động phát hiện XSS như ( Ruby on Rails, ReactJS, Laravel )
* Có một cách bảo mật web đơn giản đó là không trả lại thẻ HTML cho người dùng. Điều này còn giúp chống lại HTML Injection – Một cuộc tấn công tương tự mà hacker tấn công vào nội dung HTML – không gây ảnh hưởng nghiêm trọng nhưng khá rắc rối cho người dùng. Thông thường cách giải quyết đơn giản chỉ là Encode (chuyển đổi vê dạng dữ liệu khác) tất cả các thẻ HTML.
## 4.Broken Access Control:
### Khái niệm
Đây là lỗi phổ biến về việc phân quyền trong hệ thống. Các lỗi phân quyền thường do thiếu đi các bộ phát hiện lỗi tự động hoặc cách thức kiểm thử hoặc các hàm kiểm thử chưa hiệu quả khiến cho hệ thống bị rò rỉ.
### Hậu quả
Về mặt kỹ thuật thì các hacker có thể truy cập và có các quyền như người dùng hoặc admin, hoặc người dùng có hiểu biết về các hàm của hệ thống cũng có thể gọi và thực thi các hàm này( Ví dụ: Thêm, Sửa, Xóa các bản ghi)
### Cách phòng chống
* Giới hạn quyền truy cập API và controller để giảm thiểu thiệt hại.
* Thực hiện các cơ chế kiểm soát quyền truy cập và thực hiện nó trên toàn ứng dụng.
* JWT tokens nên vô hiệu hóa trên server khi đăng xuất.
* Nên cài đặt các rule ở Model để quản lý các thao tác với database.
##  5.Sensitive Data Exposure: 	
### Khái niệm
Lỗ hổng này thuộc về khía cạnh crypto và tài nguyên. Dữ liệu nhạy cảm phải được mã hóa mọi lúc, bao gồm cả khi gửi đi và khi lưu trữ – không được phép có ngoại lệ. Thông tin thẻ tín dụng và mật khẩu người dùng không bao giờ được gửi đi hoặc được lưu trữ không được mã hóa. Rõ ràng thuật toán mã hóa và hashing không phải là một cách bảo mật yếu. Ngoài ra, các tiêu chuẩn an ninh web đề nghị sử dụng AES (256 bit trở lên) và RSA (2048 bit trở lên).

Cần phải nói rằng các Session ID và dữ liệu nhạy cảm không nên được truyền trong các URL và cookie nhạy cảm nên có cờ an toàn.
### Hậu quả
Để lộ ra thông tin nhạy cảm sẽ gây ảnh hưởng nghiêm trọng đến cá nhân đó.
### Cách ngăn chặn lỗ hổng
* Sử dụng HTTPS có chứng chỉ phù hợp và PFS (Perfect Forward Secrecy). Không nhận bất cứ thông tin gì trên các kết nối không phải là HTTPS. Có cờ an toàn trên cookie.
* Bạn cần hạn chế các dữ liệu nhạy cảm có khả năng bị lộ của mình. Nếu bạn không cần những dữ liệu nhạy cảm này, hãy hủy nó. Dữ liệu bạn không có không thể bị đánh cắp.
* Không bao giờ lưu trữ thông tin thẻ tín dụng, nếu không muốn phải đối phó với việc tuân thủ PCI. Hãy đăng ký một bộ xử lý thanh toán như Stripe hoặc Braintree.
* Nếu bạn có dữ liệu nhạy cảm mà bạn thực sự cần, lưu trữ mã hóa nó và đảm bảo rằng tất cả các mật khẩu được sử dụng hàm Hash để bảo vệ. Đối với Hash, nên sử dụng bcrypt. Nếu bạn không sử dụng mã hóa bcrypt, hãy tìm hiểu về mã Salt để ngăn ngừa rainbow table attack.
* Không lưu trữ các khóa mã hóa bên cạnh dữ liệu được bảo vệ. Việc này giống như khóa xe mà cắm chìa luôn ở đó. Bảo vệ bản sao lưu của bạn bằng mã hóa và đảm bảo các khóa của bạn là riêng tư.
## Kết
Trên đây là 1 số tìm hiểu của mình về một số lỗ hổng về bảo mật web của OWASP. Cảm ơn mọi người đã tham khảo bài viết của mình. Cùng đón xem phần 2 của bài viết tại ...