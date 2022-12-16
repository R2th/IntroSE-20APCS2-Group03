# Tổng quan về vấn đề bảo mật
Đây là nội dung nối tiếp trong phần 1. Các bạn có thêm xem thêm bài viết [Là developer cần làm gì để ứng dụng của mình an toàn và bảo mật hơn? (Phần 1)](https://viblo.asia/p/la-developer-can-lam-gi-de-ung-dung-cua-minh-an-toan-va-bao-mat-hon-phan-1-bJzKmPqD59N)
Và phần 2: [Là developer cần làm gì để ứng dụng của mình an toàn và bảo mật hơn? (Phần 2)](https://viblo.asia/p/secure-coding-part-2-la-developer-can-lam-gi-de-ung-dung-cua-minh-an-toan-va-bao-mat-hon-V3m5WLLwKO7)

# Secure Coding Practices Checklist
## Access Control
Thực hiện kiểm tra quyền truy cập các tài nguyên trên trang web theo đúng quyền hạn mà user được cấp. Thực hiện phân quyền tối thiểu và đúng vai trò của mỗi người dùng là yếu tố then chốt trong việc thực hiện kiểm tra phân quyền

![](https://images.viblo.asia/524fca4e-a3f5-43d7-bc01-6c94e14bef53.jpg)

**1. Chỉ thực hiện phân quyền trên các hệ thống tin cậy, không thực hiện phần quyền ở phía client**
- Hệ thống đáng tin cậy có thể là server do chúng ta quản lý, server của các bên thứ 3 đủ độ tin cậy và an toàn. Tuyệt đối không thực hiện việc phân quyền người dùng ở phía client vì việc này không an toàn và không đảm bảo tính bảo mật cho ứng dụng.

**2. Sử dụng một module chuyên biệt để thực hiện kiểm tra phân quyền (single site-wide)**
- Thực hiện kiểm tra phân quyền sử dụng các thư thư viện gọi tới các module phân quyền từ bên ngoài

**3. Xử lý các truy cập trái phép về quyền một cách án toàn (fail securely)**
- Tìm hiểu thêm về fail secure tại [fail secure](https://owasp.org/www-community/Fail_securely). Đây là một cơ chế xử lý phân quyền một cách an toàn, mặc định ban đầu sẽ từ chối tất cả quyền đổi với một tài khoản và chỉ phân quyền nếu thỏa mãn một số điều kiện nhất định. Ví dụ, mặc định các tài khoản sẽ không phải là admin sẽ không thể truy cập vào resource /admin, chỉ khi tài khoản nào có trường `admin =  True` thì mới được phép truy cập.

4. Từ chối mọi quyền truy cập nếu ứng dụng không thể truy cập thông tin cấu hình bảo mật của nó
- Trong trường hợp ứng dụng không thể truy cập tới các thiết lập về bảo mật trong file config của ứng dụng, thì sẽ chặn việc truy cập tới các tài nguyên trên website đó để đảm bảo không có sai sót trong việc phân quyền tài khoản trên trang.

**5. Thực hiện kiểm tra quyền truy cập với tất cả các request được gửi đi bao gồm cả request gửi bằng HTTP request, Ajax, Flash...**
- Việc kiểm tra quyền truy cập cần thực hiện trên mỗi request được gửi đi để đảm bảo việc phân quyền luôn được thực hiện đúng với tài khoản được phân quyền tương ứng. Tránh việc truy cập tới tài nguyên không được phép. Việc này cần thực hiện với HTTP request, Ajax, Flash..

**6. Tách logic phần xử lý phân quyền khỏi các các đoạn code khác của chương trình**
- Việc này đảm bảo việc thực hiện phân quyền được thực hiện tập trung, dễ quản lý và không bị ảnh hưởng bới logic của các đoạn code thực hiện chức năng của web. Ví dụ với chức năng xử lý bài viết, cần kiểm tra quyền đối với một bài viết xong rồi sau đó mới đến các đoạn code xử lý, tránh việc vừa xử lý chức năng bài viết vừa thực hiện kiểm tra phân quyền trong một hàm nào đó.

**7.Hạn chế quyền truy cập vào tệp hoặc các tài nguyên khác, bao gồm cả những tài nguyên nằm ngoài sự kiểm soát trực tiếp của ứng dụng, chỉ cho những người dùng được ủy quyền**
- Thực hiện đúng nguyên tắc phân quyền tới đúng người - đúng quyền. Chỉ người dùng được phép mới có quyền truy cập tới tài nguyên nhất định trên hệ thống.

**8. Chỉ giới hạn quyền truy cập vào các tài nguyên quan trọng cho những người dùng được phân quyền**
- Các tài nguyên quan trọng bao gồm: URL nhạy cảm, chức năng quan trọng, đối tượng quan trọng, dịch vụ quan trọng, dữ liệu ứng dụng, dữ liệu người dùng, các dữ liệu nhạy cảm, config của hệ thống.v.v.Việc này giúp tránh các truy cập trái phép tới các URL quan trọng. Ví dụ, chỉ những user là admin mới được truy cập tới url quản lý users là /admin/users còn các tài khoản khác sẽ không được phép truy cập và trả về 403. Ở đây cần thực hiện phân quyền và kiểm tra trong code chứ không được phép thực hiện chỉ ẩn đi url ở phía front-end. Vì thực hiện ẩn đi là cách bảo mật bằng "che giấu" là cách thực hiện không an toàn, các url này có thể bị dò ra bởi các công cụ rà quét tự động

**9. Phân quyền truy cập ở phía client và server side cần phải thống nhất và đồng bộ**
- Yêu cầu người phát triển ứng dụng web cần đồng bộ cũng như thống nhất kiểm tra về mặt phân quyền đối với cả phía client và server. Vì nếu chỉ thực hiện ở phía client, hacker có thể bypass một cách dễ dàng sử dụng một số công cụ như burpsuite (các bạn cso thể tham khảo thêm tại: [Burp Suite - "trợ thủ đắc lực" cho tester và pentester trong kiểm tra ứng dụng web](https://viblo.asia/p/burp-suite-tro-thu-dac-luc-cho-tester-va-pentester-trong-kiem-tra-ung-dung-web-E375z4GWZGW)

**10. Nếu dữ liệu của người dùng cần lưu trữ tại phía client thì cần mã hóa và được kiểm tra tính toàn vẹn trên server**
- Các thông tin của user nếu cần lưu trữ trên phía client (ví dụ trong local storage) cần được mã hóa an toàn để tránh việc đọc được các thông tin nhạy cảm. Hơn nữa, để đảm bảo các thông tin này không bị sửa đổi trái phép thì cần có cơ chế kiểm tra tính toàn vẹn trên server (có thể sử dụng mã hash để kiểm tra)

**11. Giới hạn số lần giao dịch cho một user hoặc thiết bị có thể thực hiện trong một khoảng thời gian**
- Các giao dịch thực hiện trong một khoảng thời gian phải đảm bảo thỏa mãn yêu cầu nhưng đủ thấp để ngăn chặn các cuộc tấn công bruteforce.

**12. Sử dụng "referer" trong header là một trường kiểm tra phụ nhưng không phải duy nhất**
- Trường "referer" trong header có thể sử dụng để kiểm tra xem user có quyền truy cập trước khi thực hiện chuyển trang nhưng nó cần được kết hợp với các giá trị khác để đảm bảo việc kiểm tra quyền là đầy đủ vì giá trị này có thể bị điều khiển hoặc thay đổi bởi người dùng.

**13. Nếu website cho phép session được tồn tại trong thời gian dài mà không logout, thì cần re-authenticate lại người dùng để kiểm tra về thay đổi quyền**
- Việc kiểm tra này giúp đảm bảo giả sử người dùng sau khi thay đổi quyền sẽ được kiểm tra lại về quyền để đảm bảo cơ chế phân quyền hoạt động đúng, nếu quyền thay đổi thì cần đăng xuất người dùng và yêu cầu xác thực lại.

**14. Triển khai cơ chế khóa tài khoản tạm thời sau một khoảng thời gian không sử dụng**
- Đối với các tài khoản không sử dụng trên hệ thống trong một thời gian dài (khoảng 90 ngày) có thể khóa tạm thời và admin sẽ mở lại nếu có yêu cầu. Hoặc với các tài khoản quá thời gian hết hạn mật khẩu mà không thực hiện đổi mật khẩu mới theo chính sách cũng cần thực hiện khóa tạm thời

**15. Ứng dụng phải hỗ trợ vô hiệu hóa tài khoản và chấm dứt phiên khi quyền của tài khoản thay đổi**
- Khi có thay đổi về quyền hoặc thay đổi về logic nghiệp vụ liên quan đến quyền truy cập thì cần thực hiện vô hiệu hóa tài khoản và kết thúc phiên. Chỉ khi nào người dùng login lại thì mới cho tài khoản tiếp tục sử dụng

**16. Các tài khoản sử dụng cho các service bên ngoài kết nối vào hệ thống cần có quyền tối thiểu**
- Đảm bảo user service sử dụng cho cách dịch vụ bên ngoài kết nối tới hệ thống phải có quyền tối thiểu, chỉ cấp quyền đủ để thực hiện các tác vụ cần thiết, không cấp quyền thừa.

**17. Ứng dụng cần có tài liệu rõ ràng về chính sách quyền truy cập (Access Control Policy)**
- Tạo Chính sách kiểm soát truy cập để ghi lại các quy tắc kinh doanh, kiểu dữ liệu và quyền truy cập của ứng dụng. Định nghĩa rõ ràng về quyền hoặc quy trình để có thể được phép cấp quyền truy cập và kiểm soát đúng cách. Điều này bao gồm xác định các yêu cầu truy cập cho cả dữ liệu và tài nguyên hệ thống

### **Demo: IDOR**
**IDOR** là lỗi khi việc truy cập trực tiếp tới đối tượng không an toàn khi không kiểm soát quyền truy cập tới đối tượng dẫn đến một đối tượng thuộc user này có thể bị truy cập bởi user khác.

User has id 3 and login to website to get financial information.

User can access to private data by acess to `/GET/accounts/3/finacial_info`

By change user_id from 3 -> 4, user can access to another fincacial information: `/GET/accounts/4/finacial_info`

![](https://images.viblo.asia/4f81b933-0c01-4b35-b02d-86ee652a512c.jpg)
## Cryptographic Practices
Cryptography plays an especially important role in securing the user's data - even more so in a mobile environment, where attackers having physical access to the user's device is a likely scenario.

![](https://images.viblo.asia/5444cb34-ca61-4289-b14a-555952a651a4.png)

**1. Tất cả các thuật toán mã hóa sử dụng để bảo vệ dữ liệu quan trọng cần được thực hiện trên một hệ thống tin cậy**
- Hệ thống đáng tin cậy có thể là server do chúng ta quản lý, server của các bên thứ 3 đủ độ tin cậy và an toàn.

**2. Bảo vệ các thông tin quan trọng (secret keys) khỏi các truy cập trái phép**
- Đảm bảo các dữ liệu được bảo vệ trên server một cách an toàn và không được phép truy cập từ các người dùng hoặc ứng dụng không được cấp quyền

**3. Các module mã hóa cần xử lý thất bại một cách an toàn**
- Tìm hiểu thêm về fail secure tại [fail secure](https://owasp.org/www-community/Fail_securely). Đảm bảo cơ chế mã hóa cần được xử lý theo đúng nguyên tắc kiểm soát được tất cả các trường hợp xảy ra các trường hợp ngoại lệ không mong muốn.

**4. Cần có cơ chế tạo ra một cách ngẫu nhiên các dữ liệu quan trọng trong các thuật toán mã hóa**
- Các thông tin như: random numbers, file names, GUIDs, ... phải được tạo ra một cách ngẫu nhiên, đủ độ dài và khó đoán để chống lại các cuộc tấn công guessing (dự đoán)

**5. Thuật toán mã hóa nên sử dụng theo FIPS 140-2 hoặc các chuẩn tương đương.**
- Xem thêm tại: [FIPS 140-2](http://csrc.nist.gov/groups/STM/cmvp/validation.html)

**6. Có cơ chế quản lý các khóa bí mật của thuật toán một cách an toàn.**
- Các khóa mã hóa là cực ký quan trọng trong mã hóa, nếu bị lộ ra có thể sẽ dẫn tới việc mã hóa bị phá vỡ và lộ dữ liệu. Vì vậy các ứng dụng cần bảo vệ khóa an toàn, quản lý chặt chẽ bằng hệ thống quản lý khóa và có cơ chế rotate khóa an toàn.

# Tổng kết
Nối tiếp series secure coding, nội dung phần 3 này liên quan đến quản lý truy cập quyền và mã hóa. Đây là 2 nội dung quan trọng trong việc bảo vệ được tính bí mật và tính toàn vẹn của dữ liệu. Làm tốt 2 nội dung trên giúp ứng dụng web tránh bị lộ các thông tin nhạy cảm, tránh các truy cập trái phép từ người dùng không được cấp quyền.

Cảm ơn các bạn đã theo dõi!!!