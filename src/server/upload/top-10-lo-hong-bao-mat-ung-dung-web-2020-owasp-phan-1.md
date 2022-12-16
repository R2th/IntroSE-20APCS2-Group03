Top 10 OWASP có lẽ không phải khái niệm xa lạ gì với những người tìm hiểu về An toàn thông tin, nhưng sẽ là kiến thức cần thiết cho các Web Developer hoặc những bạn có hứng thú với chủ đề bảo mật. Trong bài viết này, mình sẽ khái quát khái niệm, đưa ra ví dụ cũng như một số cách phòng chống cho từng lỗ hổng. Nội dung này khá dài nên mình sẽ chia làm nhiều phần. Link phần 2 mình sẽ để ở cuối bài viết này (Sau khi mình viết xong 🤧  )
# 1. Injection
![](https://images.viblo.asia/e1295745-673c-415d-ad38-2d51daa86542.png)

Nhắc đến Injection, người ta sẽ thường nghĩ tới SQL Injection. Mình cũng đã từng có 2 bài viết nói về kiểu tấn công này

- SQL Injection là gì ? Có bao nhiêu kiểu tấn công SQL Injection ?\
https://viblo.asia/p/sql-injection-la-gi-co-bao-nhieu-kieu-tan-cong-sql-injection-m68Z0QnMlkG

- Sử dụng SQLMap để khai thác lỗ hổng SQL Injection (SQLi)\
https://viblo.asia/p/su-dung-sqlmap-de-khai-thac-lo-hong-sql-injection-sqli-6J3ZgzVAKmB

Trên thực tế, chúng ta còn nhiều kiểu Injection khác như NoSQL, OS hay LDAP Injection. Lỗ hổng này thường xảy ra khi những dữ liệu không tin cậy (mã độc, payload, ..) được biên dịch thông qua một lệnh hay các câu truy xuất của chương trình. Từ đó cho phép kẻ tấn công có thể thực hiện những câu lệnh ngoài ý muốn hay truy cập tới dữ liệu mà không cần vượt qua các khâu xác thực

Hầu hết các mã nguồn ứng dụng đều tiềm ẩn nguy cơ bị Injection, thông qua các biến môi trường, tham số hàm, web services, .. Do đó Injection rất phổ biến, chúng thường tìm thấy trong các SQL, LDAP, Xpath, NoSQL queries, câu lệnh hệ điều hành OS commands, XMP parsers, SMTP headers hay ORM queries. Hacker có thể dễ dàng tìm ra các Injection bằng việc kiểm tra mã nguồn ứng dụng. Các công cụ quét và do thám có thể giúp Hacker trong vấn đề này 

Injection có thể dẫn tới mất mát, phá hỏng hoặc làm lộ dữ liệu, gây ảnh hưởng tới hoạt động, uy tín của tổ chức cũng như người dùng. Trong trường hợp Hacker khai thác được tài khoản của Admin có thể dẫn tới mất quyền điều khiển hệ thống. 

### Ứng dụng của bạn có dễ bị Injection hay không ?
Một ứng dụng Web sẽ có thể là nạn nhân của Injection nếu:
- Dữ liệu cung cấp từ người dùng được gửi lên tuỳ ý, không được kiểm tra tính hợp lệ, không qua bộ lọc hay được "dọn dẹp" trước
-  Sử dụng các câu truy vấn động, trong đó dữ liệu người dùng cấp được kết nối với mã gốc để tạo câu  query hoàn chỉnh, thực thi trực tiếp mà không có cơ chế kiểm soát, xử lý

### Cách phòng chống
Nguyên tắc cơ bản để chống lại Injection là phải tách dữ liệu được gửi lên khỏi câu lệnh thực thi trực tiếp và các query
- Có cơ chế kiểm tra và lọc dữ liệu đầu vào như giới hạn kích thước, loại bỏ các kí tự đặc biệt, ..
- Sử dụng thủ tục lưu trữ (Store procedures) trong CSDL. Tạm hiểu là đưa các câu truy vấn SQL vào trong thủ tục (gần giống hàm trong các ngôn ngữ lập trình), dữ liệu được truyền vào thủ tục thông qua các tham số -> tách dữ liệu khỏi mã lệnh
- Không hiển thị Exception hay thông báo lỗi để tránh kẻ tấn công có thể suy đoán kết quả
- Thiết lập quyền sử dụng cho người dùng phù hợp
- Chủ động sử dụng các công cụ dò quét lỗ hổng bảo mật
- Backup dữ liệu thường xuyên
# 2. Broken Authentication
![](https://images.viblo.asia/d94dbccd-e88b-420e-8b49-ca13632923ed.png)

Đây là lỗ hổng liên quan tới vấn đề xác thực người dùng, quản lý phiên được triển khai chưa đúng cách, cơ chế quản lý yếu -> cho phép Hacker có thể bẻ khoá paswords, keys,  session tokens hay lợi dụng để thực hiện khai thác các lỗ hổng khác nhằm chiếm được định danh của người dùng tạm thời hoặc vĩnh viễn.

Kẻ tấn công dễ dàng tìm kiếm hàng trăm ngàn usernames và passwords phổ biến, một danh sách các tài khoản admin mặc định, các tools brute force tự động (tấn công vét cạn), hoặc các bộ công cụ tấn công từ điển. Đây là điều kiện cần để thực hiện cuộc tấn công nhằm vào lỗ hổng này

Với việc có quyền truy cập vào một vài tài khoản, hoặc chỉ cần 1 tài khoản admin là đủ để Hacker có thể gây nguy hại cho cả hệ thống. Tuỳ thuộc vào tính chất của hệ thống, mà nó cho phép Hacker tiến hành nhiều hành vi phạm pháp như rửa tiền, ăn cắp tài sản, danh tính, tiết lộ thông tin nhạt cảm, ..

### Vậy một hệ thống như thế nào sẽ có nguy cơ đối mặt với lỗ hổng này ?
- Ứng dụng cho phép hacker tiến hành các cuộc tấn công vét cạn Brute Force hoặc các kiểu tấn công tự động khác.\
Các bạn có thể hiểu đơn giản là ứng dụng Web của chúng ta cho phép request liên tục nhiều API từ cùng một IP hoặc cố gắng truy cập vào một tài khoản nhiều lần mà không có cơ chế quản lý ví dụ như lock tài khoản đó nếu xuất hiện những hành vi như vậy
- Cho phép người dùng đặt các mật khẩu yếu, không đạt tiêu chuẩn. Không có cơ chế bắt buộc thay đổi mật khẩu mặc định chẳng hạn "Password1" hay "admin/admin"
- Cơ chế khôi phục mật khẩu (trường hợp người dùng quên mật khẩu) yếu hoặc không an toàn, chẳng hạn cơ chế trả lời câu hỏi mà bạn hay thấy nếu sử dụng Yahoo từ 7-8 năm trước, đây thực sự là một giải pháp rất tệ ở thời điểm hiện tại
- Lưu trữ Password dạng Plaintext (bản rõ) mà không mã hoá, hoặc sử dụng những thuật toán mã hoá hay các mã băm đơn giản, dễ dàng bị crack 
- Thiếu hoặc cơ chế xác thực 2 lớp không hiệu quả
- Hiển thị trực tiếp Session IDs hoặc các thông số quan trọng trong Params của URL
- Không có cơ chế luân phiên thay đổi Session IDs sau khi đăng nhập thành công
- Việc cài đặt thời gian tồn tại của Session IDs không đúng

### Cách phòng chống
- Triển khai cơ chế xác thực 2 lớp nhằm chống lại các cuộc tấn công tự động như Brute Force
- Kiểm tra độ an toàn của Password, không cho phép người dùng đặt những mật khẩu quá đơn giản chẳng hạn chỉ toàn số, hoặc toàn chữ. Bạn cũng có thể kiểm tra mật khẩu người dùng đặt trong top 10000 passwords tệ nhất (https://github.com/danielmiessler/SecLists/tree/master/Passwords) và không cho cài đặt những mật khẩu này
- Đảm bảo việc đăng ký, khôi phục tài khoản, đăng nhập thất bại (có thể do sai Password, Username) hoặc đường dẫn URL sẽ sử dụng các messages giống nhau trả vê cho người dùng cho mọi kết quả.\
Chẳng hạn khi người dùng đăng nhập không thành công do sai mật khẩu. Nếu Server trả về thông điệp "Bạn nhập sai mật khẩu". Kẻ tấn công có thể dựa vào đó để biết rằng username được gửi lên tồn tại, và chỉ cần vét cạn mật khẩu cho tới khi thành công. Thay vào đó, Server nên trả về thông điệp "Username hoặc Password không hợp lệ", kẻ tấn công sẽ không thể loại bỏ trường hợp nào, việc vét cạn sẽ trở nên phức tạp hơn rất nhiều
- Giới hạn số lần hoặc yêu cầu thời gian chờ sau một số lần đăng nhập không thành công. Có thể là khoá tài khoản (cách Facebook đang áp dụng), hoặc sau 2-3' mới có thể tiếp tục thực hiện đăng nhập, cơ chế này cũng khá phổ biến như khi mở khoá Iphone, thiết bị của bạn sẽ bị vô hiệu hoá sau 1 số lần nhập sai mật khẩu 
- Có cơ chế sinh, quản lý và lưu trữ Session IDs đảm bảo an toàn, với độ khó và xáo trộn cao, set thời gian hết hạn cũng như tự huỷ sau khi Logout

# 3. Sensitive Data Exposure
![](https://images.viblo.asia/6aaf0bf5-2c14-4ff7-83bb-fefd0b4de77a.png)
Có nhiều ứng dụng Web và APIs không thực sự có cơ chế bảo vệ tốt với các thông tin nhạy cảm như tài chính, sức khoẻ hay các thông tin cá nhân trong quá trình trao đổi với trinh duyệt. Hacker có thể dễ dàng lấy cắp, sửa đổi những dữ liệu đó để thực hiện các hành vi phạm pháp

Vài năm gần đây, Sensitive Data Exposure là một trong những lỗ hổng phổ biến và có ảnh hưởng lớn nhất. Đa phần là do những thông tin nhạy cảm không được mã hoá, hoặc mã hoá với thuật toán đơn giản, phổ biến, dễ bị crack, khoá mã hoá được sinh không đủ tiêu chuẩn, mật khẩu được băm bằng thuật toán không an toàn. Hacker hoàn toàn có thể thực hiện nghe lén (Man In the Middle) để bắt phân tích gói tin

Trong 1 số trường hợp khác, khi call API get dữ liệu để hiển thị lên giao diện, chúng ta chỉ cần một số thông tin nhưng API lại trả về nhiều trường khác bao gồm cả những thông tin thừa, không cần thiết. Tuy không trực tiếp khai thác các thông tin đó cho mục đích tấn công nhưng cũng có thể là cơ sở cho Hacker thực hiện các bước tiếp theo như Social Enginering, tiềm ẩn nhiều rủi ro cho khách hàng, cũng như hệ thống
### Hệ thống như thế nào sẽ có nguy cơ bị lỗ hổng này ?
- Ứng dụng của chúng ta trao đổi thông tin dưới dạng bản rõ (Plain text)
- Sử dụng các thuật toán mã hoá quá cũ và không còn an toàn ở thời điểm hiện tại (Chẳng hạn 1 số hệ mật rất phổ biến trong quá khứ như DES nhưng đến nay đã không còn an toàn)
- Cơ chế sinh khoá yếu, không đủ an toàn. Việc lựa chọn kích thước khoá cũng như thuật toán sinh phù hợp là điều vô cùng quan trọng
- Ứng dụng phía người dùng không xác thực các chứng chỉ khi trao đổi thông tin với Server 

### Cách phòng chống
- Xác định mức độ nhạy cảm của các thông tin được lưu trữ dựa theo tính chất hệ thống, luật pháp. Từ đó lựa chọn cơ chế kiểm soát phù hợp cho từng mức độ
- Lọc và loại bỏ những thông tin nhạy cảm không cần thiết, hạn chế rủi ro mất mát có thể xảy ra
- Đảm bảo sử dụng những thuật toán mã hoá, sinh khoá tiêu chuẩn, an toàn ở thời điểm hiện tại
- Không lưu những thông tin nhạy cảm tại Cache

# Tổng kết
Trên đây là 3 trong số top 10 lỗ hổng bảo mật OWASP 2020. Mình sẽ tiếp tục làm về chủ đề này trong những bài viết sắp tới 🥰 \
Hy vọng mọi người đã nắm được một số kiến thức cơ bản về khái niệm, rủi ro và một số phương pháp phòng chống cho các lỗ hổng mà mình đã đề cập trong bài viết này

## Nguồn tham khảo
https://owasp.org/www-project-top-ten/