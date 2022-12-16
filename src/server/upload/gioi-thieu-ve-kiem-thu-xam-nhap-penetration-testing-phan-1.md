# I. Giới thiệu
Trong series này mình sẽ giới thiệu cho các bạn những khái niệm cơ bản, mục tiêu cũng như các bước khai thác trong Kiểm thử xâm nhập (Penetration Testing).

Để bắt đầu tìm hiểu về Pentest, chúng ta cần xác định một số thuật ngữ để sử dụng trong suốt phần còn lại của series. Bên cạnh đó ta sẽ phân biệt giữa Pentest, Red team, Vulns Assessment và Security Audit.
# II. Vulns, Threat, Exploit, Risk
## 1. Vulnerability

Khái niệm: Vulnerability (viết tắt là Vulns) đề cập đến điểm yếu trong Software, Hardware hoặc có thể là chính con người mà thông qua đó cung cấp cho kẻ tấn công một lối vào, nhằm xâm nhập vào máy tính, mạng và truy cập trái phép vào các tài nguyên của tổ chức.
![](https://images.viblo.asia/dec3c8eb-8bd6-4b1e-aac7-424e1770d4df.jpg)

Một số Vulnerability có thể kể đến như: 
- Lỗ hổng tràn bộ nhớ đệm
- Cấu hình không đúng cách
- Lỗ hổng trong cấu trúc và thiết kế
- Thiếu các tính năng kiểm tra hệ thống
- Mật khẩu yếu, dễ đoán, mặc định
## 2. Threat
Khái niệm: Threat là bất kỳ mối nguy hiểm tiềm tàng đối với thông tin hoặc hệ thống. Mối đe dọa có thể là một ai đó, hoặc một cái gì đó, sẽ thông qua một lỗ hổng cụ thể để gây nguy hiểm cho tổ chức hoặc một cá nhân. Các đối tượng lợi dụng lỗ hổng để gây hại được gọi là Agent.

Agent có thể được sử dụng để chỉ một cá nhân, hoặc một nhóm người có khả năng trở thành một mối đe dọa. Một hacker truy cập trái phép vào mạng lưới, một quy trình truy xuất dữ liệu vi phạm chính sách an ninh, một cơn bão, hay có thể là sai lầm vô ý của một nhân viên làm lộ hết tất cả các thông tin mật của tổ chức, hoặc làm hỏng file dữ liệu .

Những cá nhân hoặc nhóm có khả năng là Agent, được phân loại như sau :
 - Mã độc : Malware, Worm, Trojan hoặc Login Bomb, vv...
- Tội phạm hoặc tổ chức tội phạm : Mục tiêu của các tội phạm thường là tài khoản ngân hàng, credit card hoặc tài liệu liên quan đến sở hữu trí tuệ có thể chuyển thành tiền. Tội phạm thường sử dụng người trong nội bộ để giúp chúng đạt được mục đích.
- Con người
    - Không cố ý : Tai nạn, bất cẩn
    - Cố ý : Nội gián, nhà thầu, nhân viên bảo trì, hoặc nhân viên bảo vệ đang có tâm trạng bất mãn đối với tổ chức
- Thiên nhiên : Lũ lụt, hỏa hoạn, sét đánh, thiên thạch, động đất.

## 3. Exploit
Khái niệm: Exploit là một đoạn mã hoặc kỹ thuật có thể lợi dụng các lỗ hổng kể trên

Một vài ví dụ về Exploit:
- Các đoạn mã có sẵn, công khai để khai thác việc tràn bộ đệm
- Việc upload một web shell lên web server
- Lạm dụng các điểm đầu vào để thực thi mã
- Sử dụng một tệp thực thi được bảo mật sai để leo thang đặc quyền

Có rất nhiều cách khác nhau để khai thác các lỗ hổng. Trong thực tế, một lỗ hổng có thể được khai thác theo nhiều cách khác nhau tùy thuộc vào mục tiêu cuối cùng muốn đạt được.

## 4. Risk
Khái niệm: Risk (rủi ro) là khả năng mất mát hoặc thiệt hại. Rủi ro có mối quan hệ mật thiết với lỗ hổng, mối đe dọa và thiệt hại.

Trong hình ảnh dưới đây, Risk là nơi giao nhau của Threats, Vulns và Exploit.
![](https://images.viblo.asia/077c99e3-47c8-4ea8-9aac-9cf63a88ce92.png)

Thông thường Risk được tính bằng công thức : Risk = Likelihood * Impact. Trong đó:
- Impact (tác động) thường là một giá trị được xác định trước và dễ dàng tính toán trong từng trường hợp cụ thể
- Likelihood (xác suất xảy ra) thường khó tính toán hơn.

Ngoài ra có thể đánh giá rủi ro định tính thông qua ma trận rủi ro:
![](https://images.viblo.asia/938a5b8c-ab15-4c53-8100-18dcfc27e580.png)

Nhiều khi, giá trị Risk được đánh giá bởi các chuyên gia trên cơ sở hiểu biết và kinh nghiệm của cá nhân hoặc của team đánh giá.
Việc cân bằng rủi ro là mục tiêu hàng đầu của các Security team.
Đối với một Pentester, thông thường mục tiêu quan trọng nhất (và đôi khi là khó khăn nhất) là ước tính được rủi ro của vấn đề mà họ vừa tìm được đối với cơ quan, tổ chức.

Các cách để giảm thiểu rủi ro:
- Ngăn chặn các mối đe dọa truy cập vào hệ thống
- Xóa các dữ liệu nhạy cảm khỏi hệ thống
- Sử dụng Firewall ứng dụng Web, IPS, vv để ngăn chặn các hoạt động Exploit.
- Vá các lỗ hổng

# III. Pentest, Red team, Vulns Assessment, Security Audit
Có một tập hợp các thuật ngữ đôi khi được sử dụng thay thế cho nhau, và điều này có thể dẫn đến nhiều nhầm lẫn. Các thuật ngữ này đến quan đến những công việc hàng ngày mà người làm bảo mật thực hiện:
- Penetration Testing
- Red Teaming
- Vulnerability Assessment
- Security Audit

Mặc dù các thuật ngữ này thường được sử dụng thay thế cho nhau, nhưng chúng có những điểm khác biệt mà chúng ta nên nắm được.
# 1. Penetration Testing
Kiểm thử xâm nhập (Penetration testing) là một phương pháp chủ động đánh giá sự an toàn của mạng hoặc hệ thống thông tin bằng cách mô phỏng các cuộc tấn công từ một hacker `(Để ngăn chặn tội ác, bạn phải suy nghĩ như tội phạm)`.
![](https://images.viblo.asia/efbe38fc-4124-4dff-9786-bb73c35b27f1.png)

Penetration Testing giúp phân tích những điểm yếu trong thiết kế, các sai sót kĩ thuật và các lỗ hổng, nếu một cuộc kiểm tra không cho phép xâm nhập thì không được gọi là Pentest.  Đôi khi mục tiêu yêu cầu khả năng xâm nhập nhưng sau đó không cho phép khai thác sâu hơn, các bài test kiểu này sẽ giống với Vulns Assessment hơn.

Thông thường sẽ có 2 kiểu kiểm thử :
- Blackbox:  Mô phỏng một cuộc tấn công từ một người không có kiến thức về hệ thống
- Whitebox:  Mô phỏng một cuộc tấn công từ một người có thông tin, kiến thức về hệ thống.

Kết quả được gửi toàn bộ trong một báo cáo để người sử dụng có thể kiểm tra về việc điều hành, quản lý và kỹ thuật.

`Chúng ta sẽ đi tìm hiểu kỹ hơn về Pentest trong phần 2 của series này.`
# 2. Red team
   Red team là một đội được lập ra để kiểm tra khả năng phát hiện và phản ứng trước cuộc tấn công mạng.
   - Mục tiêu của Red team là kiểm tra Blue team (team phòng thủ)
   - Sử dụng các chiến thuật, kỹ thuật và các thủ tục trong thực tế (Tactics, Techniques và Procedures)
   - Tập trung vào các lỗ hổng mà có thể giúp họ đạt được mục đích (Pentest thường đặt mục tiêu tìm được nhiều lỗ hổng nhất có thể)
   - Khai thác trong âm thầm và kiên trì là điều quan trọng đối với Red team
   - Hiểu đơn giản:
       - Penetration Testing tập trung vào hệ thống phòng thủ
       - Red team tập trung vào người phòng thủ
  ## Purple team
  Purple team là team đa chức năng, là sự kết hợp giữa red team và blue team cho phép cộng tác tốt hơn
 - Khai thác chậm và có mục đích tương tự Red team, sau đó đo lường khả năng ngăn chặn, phát hiện và phản hồi tương tự Blue team.
 - Việc triển khai của Purple team được tóm tắt là ACE:
     - Automation:  Kiểm tra mức độ tự động của việc phát hiện và thông báo. Quy trình cảnh báo và phát hiện có tự động và kịp thời không?
     - Coverage: Phạm vi môi trường có thể phát hiện. Việc phát hiện này xảy ra ở trên bao nhiêu môi trường? Có giới hạn trong một hệ thống hay một mạng con cụ thể nào không?
     - Effectiveness: Hiệu quả của việc phát hiện là như thế nào, tỉ lệ cảnh báo giả có cao không? Có hoạt động trong tất cả các trường hợp hay chỉ xảy ra trong một điều kiện cụ thể

- Bao gồm các chỉ số để tìm ra các vấn đề và cải thiện khả năng phòng thủ
- Đọc thêm tại: redsiege.com/purple

Minh họa mối quan hệ giữa Red team, Purple team và Blue team

![](https://images.viblo.asia/753e5e00-0e00-4209-bf48-2290206907bc.png)

# 3. Security Audit
Khái niệm: Audit được hiểu là việc kiểm tra dựa trên một bộ tiêu chuẩn nghiêm ngặt
- Hầu như luôn được thực hiện với một danh sách kiểm tra chi tiết
- Mặc dù Checklist cũng được tạo ra để Pentest và Security Assessment, thường thì chúng không có chi tiết và nghiêm ngặt như của Audit.

# 4. Vulnerability Assessment
Khái niệm: Vulnerability Assessment là việc nhận định, định lượng, và xếp hạng các Vulnerability (Không khai thác)

Phân biệt Penetration Testing và Vulnerability Assessment

![](https://images.viblo.asia/71ff1efd-3b4f-4034-82b5-c4e8845b2ce6.png)

Tóm lại:
- Pentest tập trung vào việc xâm nhập hoặc đánh cắp dữ liệu. Trọng tâm là truy cập vào môi trường mục tiêu.
bằng cách khai thác các lỗ hổng được phát hiện.
- Vulnerability Assessment tập trung vào việc tìm kiếm lỗ hổng bảo mật, thường không liên quan đến việc khai thác thực sự lỗ hổng. 

Do đó, Penetration Testing tập trung vào chiều sâu, với mục tiêu là chiếm lấy hệ thống và đánh cắp dữ liệu, trong khi Vulnerability Assessment tập trung vào chiều rộng, liên quan đến quá trình tìm kiếm các lỗ hổng bảo mật. Việc
đánh giá cũng thường bao gồm đánh giá chính sách và thủ tục, thường không được bao gồm trong Pentest.