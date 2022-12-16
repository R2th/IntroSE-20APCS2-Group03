# Tổng quan về Quản  lý truy cập tài khoản đặc quyền trên cloud
Quản lý truy cập tài khoản đặc quyền (Privileged Access Management) đóng vai trò quan trọng trong cả môi trường information seccurity và non information security. Tất cả các tài nguyên của chúng ta cần được bảo vệ để tránh khỏi những truy cập trái phép từ những người không được phân quyền. Khi các doanh nghiệp chuyển từ triển khai tại chỗ (đặt tại tổ chức của bạn) sang sử dụng các dịch vụ dựa trên nền tảng đám mây, việc quản lý danh tính có thể trở nên phức tạp hơn. Điều này đặc biệt đúng khi nói đến quản lý truy cập trên cloud.
Quản lý truy cập tài khoản cung cấp một số cách để quản lý danh tính và vai trò trong cloud. Nhiệm vụ quan trọng nhất là đảm bảo rằng danh tính và quyền truy cập được quản lý hiệu quả, an toàn và chính xác.

Quản lý và kiểm soát truy cập vào các tài khoản đặc quyền là một quá trình diễn ra liên tục và thống nhất khi có nhiều ứng dụng cùng truy cập và sử dụng chung tài nguyên. 
Nội dung bài viết dựa theo cuốn: `Privileged Access Cloud Security For Dummies` -  `John Wiley & Sons, Inc`

![image.png](https://images.viblo.asia/203aad8d-21d1-487b-81a9-7b5c0a41fadc.png)
# Biện pháp bảo mật quản lý truy cập tài khoản đặc quyền trên cloud

![image.png](https://images.viblo.asia/78163bb4-4f4d-49be-aefa-d7d85d6612d3.png)
## Các mô hình cloud điển hình
**Software as a Service (SaaS):** Software as a Service, được biết như các dịch vụ ứng dụng đám mây, tên gọi đại diện cho hầu hết các tùy chọn sử dụng dịch vụ phổ biến nhất cho doanh nghiệp trong thị trường cloud. SaaS sử dụng internet để cung cấp các ứng dụng, được quản lý bởi bên thứ ba, tới người dùng của nó. Phần lớn các ứng dụng SaaS được chạy trực tiếp thông qua trình duyệt web, và không yêu cầu download hay cài đặt bất cứ thứ gì từ phía người dùng.

**Platform as a Service (PaaS):** Các dịch vụ nền tảng đám mây, hay Platform as a Service (PaaS), cung cấp các thành phần đám mây tới các phần mềm nhất định trong khi vẫn được sử dụng cho các ứng dụng chính. PaaS cung cấp một framework cho các nhà phát triển để họ có thể xây dựng và sử dụng để tạo ra các ứng dụng tùy chỉnh. Tất cả server, storage và networking có thể được quản lý bởi doanh nghiệp hoặc nhà cung cấp thứ 3 trong khi các nhà phát triển có thể duy trì việc quản lý các ứng dụng.

**Infrastructure as a Service (IaaS):** Dịch vụ cơ sở hạ tầng đám mây, được biết đến như Infrastructure as a Service (IaaS), được tạo ra từ tài nguyên tính toán tự động và có khả năng mở rộng cao. IaaS hoàn toàn tự phục vụ việc truy cập và giám sát mọi thứ như computers, networking, storage, và các dịch vụ khác, và nó cho phép doanh nghiệp mua tài nguyên theo yêu cầu và nhu cầu thay vì phải tự mua hoàn toàn phần cứng.

**Security Software as a Service (SECSaaS) and Managed Security as a Service Providers (MSSP):** Dịch vụ bảo mật được triển khai trên các nền tảng đám mấy giúp phát hiện và ngăn chặn các vấn đề bảo mật trên cloud. Dịch vụ được cung cấp dưới dạng cloud giúp tiết kiệm chi phí, giảm thiểu tác động của các lỗ hổng bảo mật.

## Các thử thách của bảo mật truy cập cloud
Bên cạnh lợi ích của các giải pháp cloud đem lại, chúng ta cũng phải đối mặt với rất nhiều các mối hiểm họa, vấn đề bảo mật có thể tác động tới các ứng dụng chạy trên cloud. Theo tổ chức OWASP, chúng ta có thể phải đối mặt với một số vấn đề sau
- **Accountability and risk**: Các vấn đề bảo mật liên quan đến tài khoản
- **Identity federation**: Các vấn đề liên quan đến xác thực
- **Regulation and compliance**: Chính sách tuân thủ
- **Business continuity and resilience**: Tính liên tục và khả năng phục hồi của doanh nghiệp
- **Privacy and third-party usage of data**: Quyền riêng tư và việc sử dụng dữ liệu của bên thứ ba
- **Service and data integration**: Tích hợp dịch vụ và dữ liệu
- **Multi-tenancy and physical security**: Bảo mật vật lý
- **Incident analysis and security**: Phân tích sự cố và bảo mật
- **Infrastructure security**: An ninh cơ sở hạ tầng
## Nguyên nhân của các vấn đề bảo mật truy cập trên cloud
Tất cả những vấn đề trên đến từ các nguyên nhân sau đây:
- **Poor access management**: Chính sách quản trị truy cập thiếu an toàn
    - Các vấn đề bảo mật như sử dụng mật khẩu mặc định, tấn công phishing lừa đảo để chiếm tài khoản, tấn công chiếm quyền quản trị tài khoản, leo quyền tài khoản là những vấn đề phổ biến  gây ra lỗ hổng trên.
- **Insecure applications and APIs**:  Sử dụng ứng dụng và api không an toàn
    - Vì tiện lợi trong quá trình sử dụng, thời gian gấp mà một số ứng dụng hay api bỏ qua cơ chế xác thực, hardcode các chuỗi password, token trong source code hoặc  gửi các thông tin xác thực (username/password) dưới dạng clear text. Tất cả các lỗi trên đều gây ra việc truy cập trái phép tới các ứng dụng và api bởi hacker. Nhất là đối với các hoạt động DevOps khi đồng thời phát triển và vận hành hệ thống, các nguy cơ trên càng gia tăng.
- **Misconfigured cloud storage**: Thiết lập lưu trữ cloud kém an toàn
    - Các vấn đề thường gặp phải ở đây là mở cổng truy cập public ra internet đối với các kết nối tới ứng dụng, kết nối tới database. Hơn nữa, nhiều lập trình viên còn thiết lập các tham số mặc định (port, usernaem, password) khiến cho hacker có thể tấn công lấy cắp dữ liệu hoặc chiếm quyền điều khiển cơ sở dữ liệu
- **Distributed Denial of Service (DDoS) attacks**: Các de dọa về tấn công từ chối dịch vụ
    - Khi các ứng dụng cloud bị tấn công, chúng ta trở thành nạn nhân thứ 2 vì khi chúng ta sử dụng cloud thì hạ tầng cloud sẽ bị ảnh hưởng đầu tiên sau đó mới đến dịch vụ của chúng ta. Tuy chúng ta ảnh hưởng gián tiếp nhưng cũng cần hạn chế việc có thể bị tấn công DDOS.
- **Overprivileged users**: Tài khoản có quá nhiều đặc quyền
    - Việc chúng ta cấp quá nhiều quyền cho một tài khoản tiềm ẩn rủi ro nếu tài khoản đó rơi vào tay hacker có thể khiến chúng ta bị thiệt hại nặng nề. Ví vậy, khi cấp quyền truy cập tài khoản chúng ta cần áp dụng nguyên tắc đặc quyền tối thiểu
- **Shared credentials**: Chia sẻ thông tin truy cập
    - Nếu chúng ta không có cơ chế quản lý truy cập logs, cơ chế audits trails để kiểm soát việc sử dụng và chia sẻ tài khoản, chúng ta có thể dễ dàng bị tấn công đánh cắp mật khẩu nếu sử dụng  mật khẩu yếu hoặc không có các cơ chế bảo vệ an toàn.
- **Password only security controls**: Chỉ sử dụng mật khẩu để kiểm soát truy cập.
    - Nhiều công ty hay lập trình viên chỉ sử dụng mật khẩu để kiểm tra truy cập mà không có bất kì cơ chế phân quyền truy cập nào, điều này là vô cùng nguy hiểm có thể dẫn tới việc một tài khoản bất kì bị chiếm mất có thể khiến hacker truy cập vào toàn bộ hệ thống
- **Securing third-party access and remote employees**: Đảm bảo truy cập an toàn từ bên thứ ba và với nhân viên từ xa
    - Mở quyền truy cập có nghĩa là bạn mất quyền kiểm soát và khả năng hiển thị.  Quản lý xác thực và truy cập (IAM)  là quá trình kết hợp các chính sách và công nghệ để cho phép truy cập, trở thành vòng kiểm soát truy cập
- **Shadow IT**: Ứng dụng không an toàn, không rõ nguồn gốc
    - Việc kiểm soát cài đặt và sử dụng các ứng dụng không rõ nguồn gốc và kém an toàn nếu không được thực hiện và kiểm soát chặt chẽ có thể dẫn tới các vấn đề về lộ lọt dữ liệu nhạy cảm hoặc mất quyền truy cập tài khoản.

## Biện pháp tiếp cận bảo mật tài khoản truy cập đặc quyền

![image.png](https://images.viblo.asia/a68ee7e6-72d7-4032-8918-6adfff6a362c.png)
- **Define access**: Các chức năng business của bạn dựa vào dữ liệu, hệ thống, quyền truy cập và sự phụ thuộc vào các yếu tố này thay đổi từ tổ chức này sang tổ chức khác, vì vậy hãy đảm bảo rằng việc xác định quyền truy đặc quyền của bạn.  Chúng ta cần phân loại các hệ thống kinh doanh quan trọng, các ứng dụng và dữ liệu quan trọng cần được bảo vệ.  Việc định nghĩa rõ quyền truy cập tới các dữ liệu quan trọng giúp chúng ta hạn chế các nguy cơ về truy cập trái phép đồng thời giảm thiểu rủi ro về mất mát dữ liệu.
- **Develop IT cloud access policies**: Tổ chức của chúng ta cần có chính sách nêu chi tiết cách sử dụng và trách nhiệm của các tài khoản đặc quyền cao. Người nắm giữ các tài khoản này cần hiểu trách nhiệm và những rủi ro khi nắm giữ những tài khoản này. Việc xử lý một cách riêng biệt bằng cách xác định rõ ràng tài khoản đặc quyền, viết chính sách quản trị  rõ ràng và xác định vòng đời của các tài khoản này giúp các nhà quản trị hệ thống cloud có thể quản trị tốt các tài khoản cũng như giảm thiểu được rủi ro về truy cập tài khoản trái phép
- **Use a risk register**: Sử dụng chính sách đăng ký rủi ro như một phần chính sách quản trị. Chính sách yêu cầu bất kì ứng dụng nào khi mới chạy trên cloud cần đăng ký các rủi ro về mặt dữ liệu với hệ thống ma trận câu hỏi về quan trị truy cập đặc quyền. Việc phân loại này có thể được thực hiện một cách tự động nhằm  phân loại nguy cơ rủi ro về mặt dữ liệu.
- **Discover your privileged accounts**:  Phần mềm Automated PAM xác định các tài khoản đặc quyền cao, kiểm tra liên tục để hạn chế sự lan rộng quyền của các tài khoản này, xác định các cuộc tấn công lạm dụng tài khoản nội bộ và nguy cơ lộ lọt thông tin tài khoản  ra bên ngoài. Các hoạt  động của tài khoản đặc quyền sẽ được hiển thị và theo dõi liên tục trên hệ thống giám sát để phát hiện và ngăn chặn các cuộc tấn công liên quan đến các tài khoản này.
- **Understand business users’ privileged access**: Tất cả truy cập của các tài khoản quyền user nhưng có quyền truy cập tới dữ liệu nhạy cảm của công ty cũng cần được xem xét như một tài khoản có đặc quyền truy cập cao. Việc xem xét và quản trị tài khoản này cũng cần được thực hiện tương tự  như tài khoản đặc quyền cao
- **Protect your passwords**: Cần xác định xem chính sách cảu chúng ta đã có các biện pháp tự động phát hiện và lưu trữ mật khẩu tài khoản đặc quyền chưa:
    - Vòng đời mật khẩu
    - Audit, phân tích và quản lý phiên truy cập
    - GIám sát log hoạt động tài khoản đặc quyền
    - Ngoài việc bảo vệ mật khẩu tài khoản. chúng ta cần triển khai các biện pháp song song. Single Sign-on cần kết hợp MFA (Multifactor Factor Authentication)
    - Hạn chế khả năng cho người dùng tự tạo hoặc chọn mật khẩu để giảm thiểu rủi ro về các cuộc tấn công mật khẩu yếu
- **Limit IT admin access**: Phát triển chính sách đặc quyền tối thiểu để thực thi đặc quyền ít nhất trên các thiết bị đầu cuối và giới hạn quản trị viên CNTT truy cập vào các ứng dụng đám mây mà không làm gián đoạn công việc kinh doanh. Các quyền này chỉ được cấp khi có nhu cầu và cần được thu hồi khi không sử dụng. Các hoạt động phổ biến, phân phối hoặc sử dụng trái phép các tài khoản này cần bị cấm. Việc cấp quyền tối thiểu giúp giảm thiểu tác động tới các ứng dụng và dữ liệu , đồng thời hạn chế các cuộc tấn công chiếm quyền tài khoản từ đó chiếm quyền truy cập hệ thống.
- **Monitor and record sessions**: Giải pháp PAM của bạn nên theo dõi và ghi lại hoạt động tài khoản đặc quyền, giúp thực thi hành vi phù hợp và tránh những sai lầm của người dùng. Audit, ghi lại và giám sát các hoạt động đặc quyền để hỗ trợ tuân thủ quy định.
- **Detect abnormal usage**: Khả năng hiển thị vào quyền truy cập và hoạt động của các tài khoản đặc quyền của bạn trong thời gian thực giúp phát hiện những xâm nhập vào tài khoản đặc quyền và phát hiện lạm dụng tài khoản đặc quyền. Theo dõi và cảnh báo hành vi của người dùng giúp hát hiện sớm các vấn đè bảo mật góp phần làm giảm đáng kể chi phí của một vụ vi phạm dữ liệu.
- **Respond to incidents**: Chúng ta cần có kế hoạch ứng phó sự cố trong trường hợp tài khoản bị xâm phạm. Khi tài khoản đặc quyền thay đổi mật khẩu hoặc tắt tài khoản đặc quyền chúng ta cần có  biện pháp để xử lý ngay lập tức.
- **Audit and analyze**: Liên tục giám sát việc sử dụng tài khoản đặc quyền thông qua kiểm toán và báo cáo phân tích giúp xác định các hành vi bất thường có thể chỉ ra sự vi phạm hoặc sử dụng sai mục đích. Các báo cáo tự động này theo dõi nguyên nhân bảo mật sự cố và chứng minh sự tuân thủ các chính sách và quy định.
# Tổng kết
Bài viết trên đưa ra những kiến thức tổng quan cũng như những cách tiếp cận cơ bản đối với bảo mật truy cập tài khoản đặc quyền trên cloud. Bài viết khi đi cụ thể vào một  mô hình, ứng dụng hay nhà cung cấp các mô hình ứng dụng cloud cụ thể mà chỉ đưa ra những biện pháp và cách tiếp cận. Để có thể vận dụng vào một hệ thống cụ thể, người quản trị cần vận dụng những tư tưởng trên kết hợp với những cách triển khai cụ thể trên từng hệ thống (Google cloud, Amazon Web Servie,..). Chúc các bạn thành công