# Tổng quan về vấn đề bảo mật
Đây là nội dung nối tiếp trong phần 1. Các bạn có thêm xem thêm bài viết [Là developer cần làm gì để ứng dụng của mình an toàn và bảo mật hơn? (Phần 1)](https://viblo.asia/p/la-developer-can-lam-gi-de-ung-dung-cua-minh-an-toan-va-bao-mat-hon-phan-1-bJzKmPqD59N)

# Secure Coding Practices Checklist
## Authentication and Password Management
Các khuyến nghị trong mục Authentication and Password Management giúp đảm bảo an toàn cho việc xác thực người dùng cũng như bảo vệ thông tin đăng nhập một cách  an toàn, ngăn chặn các cuộc tấn công phá vỡ cơ chế xác thực của hệ thống.

![](https://images.viblo.asia/2f585407-ed15-409c-93e0-cc603d9a939e.jpg)


**1. Yêu cầu xác thực cho tất cả các trang và tài nguyên, ngoại trừ những trang và tài nguyên đặc biệt dành cho công chúng**

- Đối với các tài nguyên quan trọng không được phép truy cập public thì chúng ta cần thực hiện việc xác thực (authenticate) người dùng ở mọi trang hoặc mọi tài nguyên. Những tài nguyên public không cần thực hiện có thể là cái file: css, js, tài liệu hoặc tài nguyên public. 

**2. Mọi cơ chế xác thực cần thực hiện trên một hệ thống tin cậy.**

- Hệ thống đáng tin cậy có thể là server do chúng ta quản lý, server của các bên thứ 3 đủ độ tin cậy và an toàn. Tuyệt đối không thực hiện việc xác thực người  dùng ở phía client vì việc này không an toàn và không đảm bảo tính bảo mật cho ứng dụng.

**3. Thiết lập và sử dụng các dịch vụ xác thực tiêu chuẩn, được thử nghiệm bất cứ khi nào có thể**

- Khi cần implement các chức liên quan đến xác thực người dùng, chúng ta có thể sử dụng các cơ chế authentication được cung cấp sẵn bởi các bên thứ 3tin tưởng để vừa giảm thiểu công sức cho việc phát triển, vừa có tài liệu tham khảo mà vẫn đảm bảo được tính năng cũng như tính bảo mật của hệ thống. Một số cơ chế có thể tham khảo:  Oauth2 hoặc Google authication, Facebook authentication,..

**4. Triển khai cơ chế xác thực tập trùng cho cơ chế xác thực người dùng, kể cả các thư viện gọi tới dịch vụ xác thực bên ngoài hệ thống.**

- Khi triển khai cơ chế xác thực cho hệ thống website, chúng ta nên triển khai tập trung để dễ dàng  thực hiện inplement cũng như quản lý các vấn đề liên quan đến cơ chế xác thực và phân quyền. Vi dụ về cơ chế này là Single-Sign-on (SSO), chúng ta sẽ chỉ cần thực hiện authen một lần trên một trang chính của hệ thống, các trang khác sẽ không cần authen lại mà sử dụng chính phiên làm việc của hệ thống đã xác thực trước đó.

**5. Thực hiện phân tách logic xác thực khỏi tài nguyên được yêu cầu truy cập và thực hiện chuyển hướng tới trang thực hiện xác thực tập trung**

- Khi người dùng truy cập tới một tài nguyên của hệ thống mà chưa thực hiện xác thực trước đó, chúng ta cần thực hiện việc chuyển hướng người dùng tới hệ thống xác thực tập trung của trang web. Chỉ khi nào người dùng xác thực thành công, chúng ta mới cho phép truy cập tới tài nguyên đó.

**6. Xử lý xác thực thất bại một cách an toàn**

- Khi chúng ta kiểm tra việc xác thực, cần xử lý xác thực thất bại sao cho mặc định là  an toàn. Ví dụ, mặc định chúng ta sẽ thiết lập người dùng chưa được xác thực, chỉ khi nào người dùng cung cấp đúng thông tin thì mới thiết lập lại là người dùng đã xác thực thành công.

**7. Tất cả các chức năng quản trị và quản lý tài khoản cần triển khai cơ chế xác thực một cách an toàn**

- Chức năng của admin và chức năng quản lý tài khoản là những chức năng quan trọng vì vậy cơ chế xác thực cần được thực hiện an toàn có thể là cần thêm xác thực password cho các thao tác quản trị quan trọng hoặc trước khi truy cập vào các tài nguyên của admin. 

**8. Nếu hệ thống cần lưu trữ thông tin liên quan đến việc xác thực người dùng (password) thì cần thực hiện mã hóa các thông tin đó trong database bằng cách thuật toán mã hóa mạnh. Các thông tin này sẽ được lưu dưới dạng đã mã hóa hoặc hash**

- Việc lưu trữ các thông tin liên quan đến xác thực cần phải lưu trữ một cách an toàn. Nếu dữ liệu này không được mã hóa, khi hệ thống bị tấn công và lộ ra các thông tin (password) thì hacker có thể thấy bản rõ của mật khẩu từ đó chiếm thông tin tài khoản của người dùng. Việc sử dụng mã hóa mạnh sẽ giúp bảo vệ thông tin ngay cả khi thông tin đó rơi vào tay hacker, vì hacker sẽ chỉ có thông tin dưới dạng đã mã hóa. Cần lưu ý, không sử dụng MD5 cho việc hash mật khẩu mà cần có thêm salt đểm đảm bảo an toàn.

**9. Mật khẩu hash cần được thực hiện trên hệ thống tin cậy**

- Việc thực hiện hash password cần thực hiện trên phía server chứ không phải client để đảm bảo người dùng không thể sửa đổi hay biết về thuật toán hashing.

**10. Kiểm tra dữ liệu xác thực khi hoàn thành tất cả dữ liệu đầu vào, đặc biệt là đối với các tháo tác xác thực trải qua nhiều giai đoạn**

-  Đối với việc xác thực thông qua nhiều giai đoạn khác nhau, việc xác thực cần thực hiện sau khi có toàn bộ dữ liệu từ phía người dùng. Tránh việc xử lý xác thực thành công ở bước nào thì xác thực luôn bước đó, để đảm bảo cơ chế xác thực hoạt động đúng nhất.

**11. Các phản hồi về lỗi xác thực không được cho biết cụ thể lỗi từng phần mà cần thông báo một cách chung nhất**

- Ví dụ đối với chức năng đang nhập. Nếu người dùng nhập username hay password sai thì thay vì thông báo cụ thể là "người dùng sai thông tin username" hay "người dùng nhập sai thông tin password" chỉ cần thông báo rằng "người dùng nhập sai thông tin đăng nhập" để tránh việc thu thập thông tin từ hacker. 

**12. Đối với các hệ thống bên ngoài kết nối tới hệ thống có thông tin nhạy cảm đều phải triển khai cơ chế xác thực.**

- Những hệ thống bên ngoài khi kết nối tới hệ thống của chúng ta để lấy dữ liệu (qua api, web service...) thì cần được triển khai cơ chế xác thực trước khi các hệ thống đó truy cập tới các dữ liệu nhạy cảm trên hệ thống. Việc triển khai cơ chế xác thực giúp giảm thiểu nguy cơ bảo mật khi những hệ thống không được phép vẫn có thể truy cập tới hệ thống.

**13. Dữ liệu xác thực (user/password) dùng cho các hệ thống bên ngoài truy cập tới hệ thống cần được mã hóa và lưu trữ trên một hệ thống tin cậy**

- Các thông tin như password cần được mã hóa và lưu trữ trên server, không được phép lưu trữ trong mã nguồn hoặc hardcode trong mã nguồn của hệ thống. Source code vốn không phải là nơi an toàn để lưu trữ

**14. Sử dụng HTPP POST cho các yêu cầu xác thực**

- Các tác vụ liên quan đến xác thực nên sử dụng POST thay vì GET vì POST sẽ không để lộ dữ liệu trên URL, không lưu lại thông tin trong url hay log nếu server cấu hình mặc định không lưu lại log của POST body request.

**15. Chỉ gửi mật khẩu không tạm thời qua kết nối được mã hóa hoặc dưới dạng dữ liệu được mã hóa**

- Khi cần gửi mật khẩu không tạm thời cho người dùng (Ví dụ: Mật khẩu đăng nhập) thì cần gửi qua kênh truyền mã hóa chẳng hạn như trong email được mã hóa. Mật khẩu tạm thời được liên kết với việc đặt lại email có thể là một ngoại lệ.

**16. Thiết lập cơ chế bắt buộc người dùng đặt mật khẩu mạnh cho tài khoản**

- Thiết lập để cơ chế đảm bảo mật khẩu mạnh:
    - Có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt.
    - Độ dài tối thiểu 8 ký tự

**17. Mật khẩu người dùng nhập trên website cần hiển thị dưới dạng không thể đọc được**

- Khi người dùng nhập mật khẩu vào form cần hiển thị dưới dạng *** để tránh bị lộ mật khẩu khi có người đứng cạnh nhìn (tấn công social engineering). 

**18. Thiết  lập cơ chế khóa tài khoản sau một số lần nhập sai thông tin xác thực**

- Thực thi vô hiệu hóa tài khoản sau một số lần đăng nhập không hợp lệ đã thiết lập (có thể là 5 lần). Tài khoản phải bị vô hiệu hóa trong một khoảng thời gian đủ để ngăn cản tấn công brute force thông tin đăng nhập, nhưng không quá lâu vì có thể bị lợi dụng để thực hiện tấn công từ chối dịch vụ. Yêu cầu này còn phụ thuộc vào từng hệ thống, ví dụ: Đối với hệ thống ngân hàng thì yêu cầu còn chặt chẽ hơn vì có thể yêu cầu người dùng mở bằng việc xác minh thông tin với ngân hàng

**19. Việc reset mật khẩu hoặc thay đổi mật khẩu yêu cầu mức độ kiểm soát tương tự như việc tạo tài khoản**

- Khi đặt lại mật khẩu hay thay đổi mật khẩu cần được xác thực qua email để đổi mật khẩu mới (đối với reset mật khẩu) và nhập lại mật khẩu cũ (khi đổi mật khẩu).

**20. Đối với chức năng reset mật khẩu, cần có câu hỏi bí mật để verify thông tin trước khi thực hiện**

-  Triển khai cơ chế nhằm chống lại tấn công phishing hoặc khi bị chiếm tài khoản thì hacker cũng không thể đổi password.

**21. Link reset mật khẩu nên để thời gian expiration ngắn**

- Việc để thời gian ngắn giúp giảm thiểu rủi ro 

**22. Yêu cầu đổi mật khẩu tạm thời trong lần đăng nhập đầu tiên**

- Mật khẩu tạm thời thường  là không an toàn và có thể bị lộ, việc yêu cầu người dùng đổi mật khẩu trong lần đăng nhập đầu tiên giúp giảm thiểu nguy cơ lộ lọt mật khẩu.

**23. Thông báo tới người dùng khi có tác vụ reset mật khẩu được thực hiện**

- Có thể là cảnh báo cáo email nếu phát hiện có thao tác yêu cầu reset mật khẩu

**24. Thiết lập cơ chế chống việc sử dụng lại mật khẩu**

- Thiết lập cơ chế về mật khẩu để hạn chế việc sử dụng mật khẩu cũ:
    - Mật khẩu cần tồn tại ít nhất 1 ngày trước khi có thể đổi mật khẩu mới
    - Mật khẩu mới phải khác 5 mật khẩu gần nhất trước đó

**25. Thiết lập tần suất đổi mật khẩu**

   - Mật khẩu cần đổi theo một tần suất nhất định dựa vào cơ chế và quy định của tổ chức. Các hệ thống quan trọng có thể yêu cầu thay đổi thường xuyên hơn. Thời gian giữa các lần đặt lại phải được kiểm soát chặt chẽ

**26. Thay đổi thông tin đăng nhập mặc định được cấp bởi vendor hay nhà sản xuất**

- Các cuộc tấn công dò tìm mật khẩu thường sử dụng các thông tin đăng nhập mặc định của nhà sản xuất để tấn công vào các thiết bị.
 Việc đổi mật khẩu mặc định giúp hạn chế các cuộc tấn công sử dụng thông tin đăng nhập mặc định
 
**27. Cần thiết lập cơ chế re-authen cho các tác vụ quan trọng**

- Các tác vụ quan trọng như đổi mật khẩu, thay đổi quyền hoặc các thao tác liên quan đến giao dịch cần có cơ chế yêu cầu người dùng authen lại bằng mật khẩu để xác nhận tiếp tục.

**28. Cần thiết lập cơ chếxác thực 2FA cho các tác vụ quan trọng**

- Các tác vụ quan trọng hoặc các thao tác liên quan đến giao dịch cần có cơ chế yêu cầu người dùng có xác thực 2FA.


**29. Nếu sử dụng code cho cơ chế xác thực từ bên thứ 3 thì cần đảm bảo an toàn**

- Cần kiểm soát tốt phần code từ bên thứ 3, review code và thường xuyên cập nhật để tránh gặp phải lỗ hổng bảo mật.

**30. Thông báo cho người dùng về phiên đăng nhập cuối cùng**

- Lần xác thực cuối cùng (thành công hoặc không thành công) tài khoản người dùng phải được báo cáo cho người dùng vào lần đăng nhập thành công tiếp theo của họ

## Session Management
Các thiết lập giúp bảo vệ session của người dùng giảm thiểu nguy cơ bảo mật về các cuộc tấn công chiếm phiên làm việc của người dùng.

![](https://images.viblo.asia/f65db88c-abd5-4d16-94e1-ef7a0f1a3ee8.png)


**1. Sử dụng các trình quản lý phiên của server hoặc của framework. Ứng dụng nên nhận biết được các định danh của phiên hợp lệ**

- Chúng ta cần xây dựng cơ chế tạo và quản lý phiên trên server sử dụng cac framework cung cấp sẵn để tiện lợi và cơ chế quản lý phiên phiên hoạt động ổn định nhất. Không nên tự implement code phần tạo và quản lý phiên này 

**2. Định danh của session phải luôn được tạo ra trên một hệ thống tin cậy.**

- Không tạo ra định danh của session ở phía client, tất cả phải được tạo ra và kiểm tra trên server để đảm bảo an toàn và người dùng không thể tự can thiệp vào định danh của sesssion.

**3. Cơ chế tạo session cần đảm bảo đủ mạnh bằng việc sử dụng các thuật toán đảm bảo tính ngẫu nhiên**

-Việc tạo ra session sử dụng các định danh phải đảo bảo được tính ngẫu nhiên, tránh được các cuộc tấn công dò tìm hoặc đoán session. Không tạo session theo tuần tự hoặc sử dụng thông tin dễ đoán.

**4. Thiết lập domain và path cho cookies chưa định danh session đã xác thực thành một giá trị hạn chế thích hợp cho trang web**

- Việc này giúp có thể kiểm tra một user đã xac thực thành công và có thể truy cập tới các tài nguyên trong hệ thống

**5. Chức năng đăng xuất cần đảm bảo kết thúc phiên ngay lập tức.**

- Việc này giúp chống lại việc sử dụng lại session cũ (lỗ hổng session fixation)

**6. Chức năng đăng xuất phải có ở tất cả các trang đã được xác thực**

- Việc này giúp người dùng có thể đăng xuất bất cứ khi nào khi đã xác thực thành công.

**7. Loại bỏ cơ chế persitent login, thực hiện việc kết thúc phiên theo định kỳ dù phiên đang hoạt động**

- Việc không kết thúc session tồn tại nhiều nguy cơ đặc biết đối với các hệ thống quan trọng, việc kết thúc phiên sau một khoảng thời gian cố định là cần thiết và cần có thông báo tới người dùng về việc kết thúc phiên.

**8. Nếu có một phiên tồn tại trước khi đăng nhập, thiết lập đóng phiên trước đó và thiết lập phiên mới**

- Phiên làm việc chỉ nên cho tồn tại 1 phiên tại 1 thời điểm để đảm bảo hạn chế các truy cập trái phép.

**9. Tạo ra session mới khi thực hiện re-authen**

- Mặc dù đã được authen trước đó, nhưng khi xác thực lại vẫn cần đảm bảo tạo ra một session với định danh mới để đảm bảo không trùng với phiên cũ.

**10. Không cho phép session tồn tại đồng thời với cùng 1 người dùng**

- Phiên làm việc chỉ nên cho tồn tại 1 phiên tại 1 thời điểm để đảm bảo hạn chế các truy cập trái phép.


***(Còn nữa...) :D***
# Tổng kết
Đây là 2 nội dung tiếp theo trong series, 2 nội dung này sẽ giúp bảo vệ website chống lại các cuộc tấn công về phá vỡ cơ chế xác thực của hệ thống, bảo vệ mật khẩu một cách an toàn và đảm bảo phiên làm việc của người dùng an toàn.

Hẹn gặp lại các bạn tại phần !