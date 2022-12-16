# I. Penetration Testing
Tiếp tục với Series `Giới thiệu về kiểm thử xâm nhập`, chúng ta sẽ cùng nhau tìm hiểu rõ hơn Pentest là gì và những hiểu biết cơ bản về quá trình Pentest.
Nếu ai chưa đọc phần 1 thì các bạn có thể xem lại tại [đây](https://viblo.asia/p/gioi-thieu-ve-kiem-thu-xam-nhap-penetration-testing-phan-1-AZoJj7lZLY7).

Định nghĩa: Kiểm thử xâm nhập (Penetration testing) là một phương pháp chủ động đánh giá sự an toàn của mạng hoặc hệ thống thông tin bằng cách mô phỏng các cuộc tấn công từ một Hacker. 
![](https://images.viblo.asia/35255613-700c-47a9-8643-3245bf534a5d.png)

Công việc chính của việc Pentest:
- Tìm ra các lỗ hổng và khai thác các lỗ hổng theo cách chuyên nghiệp, an toàn.
- Phân tích những điểm yếu trong thiết kế, các sai sót kĩ thuật trong phạm vi được phép.
- Xác định rủi ro đối với tổ chức và các tác động tiềm ẩn.
- Hỗ trợ cải thiện các phương thức bảo mật.
# II. Pre-Engagement Interactions
Đây là bước thống nhất các yêu cầu của bên cần Pentest và các chiến lược mà bên thực hiện Pentest đề ra.
Trước khi bắt đầu Pentest chúng ta cần thảo luận về các vấn đề sau:
- <b>Goals</b>
    - Các dữ liệu và các tiến trình quan trọng.
    - Thảo luận về lí do việc kiểm tra cần được diễn ra.
- <b>Types of Pentest:</b> Web, Network, SE, vv...
- <b> Scope:</b> Phạm vi cho quá trình Pentest
    - Địa chỉ IP, Subnet, Url.
    - Các điểm loại trừ.
- <b>Rules: </b>
    - Danh sách các Checklist cần tuân theo.
    - Thêm các loại trừ hoặc các ngoại lệ.
- <b>Kickoff Call: </b>
    - Lên kế hoạch cuối cùng, thiết lập team và tạo kênh liên lạc.
  
Ta sẽ đi tìm hiểu kỹ hơn các vấn đề này dưới đây.
## 1. Goals
Điều quan trọng đầu tiên là bạn phải hiểu được mục tiêu bạn sẽ Pentest. Việc thảo luận về mục tiêu của việc Pentest giúp đảm bảo quá trình Pentest được an toàn và hiệu quả. Trong quá trình thảo luận về mục tiêu bạn nên tập trung các vấn đề sau:
- Luôn luôn hỏi xem dữ liệu hoặc quy trình nào nếu bị xâm phạm, đánh cắp hoặc bị phá hủy sẽ gây ra tác động lớn nhất cho tổ chức.
- Hãy cố gắng đặt ra câu hỏi để nhận được câu trả lời đúng nhất thay vì suy đoán và có thể bị sai.
- Tập trung vào mục tiêu của tổ chức chứ không phải các mục tiêu kỹ thuật.
- Hỏi xem vì sao cần phải kiểm tra (kiểm tra nhằm tuân thủ quy trình của tổ chức, có thêm các chức năng mới, vv).
## 2. Types of Pentest
- <b> Network service:</b> Một trong những loại phổ biến nhất trong quá trình Pentest. Kiểm thử xâm nhập Network service giúp phát hiện và khai thác các lỗ hổng trong hệ thống mạng hoặc cơ sở hạ tầng.
- <b>Assumed breach:</b> Loại kiểm tra này được thiết kế mô phỏng trường hợp sau khi Attacker đã truy cập được vào hệ thống, sau đó tìm kiểm các lỗ hổng trong mạng nội bộ. Assumed breach là một cách để tìm ra các vấn đề trong Active Directory, File Permission và các phần mềm phía Client.
- <b>Web application:</b> Tìm kiếm các lỗ hổng trên các ứng dụng web được triển khai trên môi trường mục tiêu.
- <b>Social engineering:</b> Loại kiểm tra này liên quan đến việc cố gắng lừa người dùng để tiết lộ thông tin nhạy cảm hoặc nhấp vào liên kết trong Email. Social engineering thường được dùng nhằm đánh giá quy trình, thủ tục và nhận thức của các nhân viên trong tổ chức.
- <b>Wireless security:</b> Các kiểm tra này liên quan đến việc khám phá môi trường vật lý của mục tiêu để tìm các điểm truy cập không dây trái phép hoặc điểm truy cập không dây được phép nhưng có điểm yếu về bảo mật.
- <b>War dial (dial-up):</b> Các bài kiểm tra này tìm kiếm Modem trong môi trường mục tiêu và thường liên quan đến việc
đoán mật khẩu để đăng nhập vào hệ thống được kết nối với Modem. Loại kiểm tra trên <b>không</b> còn phổ biến ngày nay.
- <b>Physical security:</b> Kiểm tra này tìm kiếm các lỗ hổng trong hệ thống vật lý của một tổ chức mục tiêu. Người kiểm tra có thể cố gắng truy cập vào các tòa nhà và văn phòng của tổ chức, lấy laptop, máy tính để bàn hoặc kiểm tra thùng rác, vv...
- <b>Product test:</b>
    - Test các gói phần mềm hoặc phần cứng;
    - Phá vỡ hoặc bypass việc mã hóa các dữ liệu nội bộ.
    
    Kiểm tra này tập trung vào một sản phẩm cụ thể, có thể là một phần cứng hoặc phần mềm. Đối với các lỗ hổng trong phần mềm, loại kiểm tra này tập trung tìm kiếm các vị trí dẫn đến tràn bộ đệm, các lỗi leo thang đặc quyền và khai thác các dữ liệu nhạy cảm không được mã hóa. Những thử nghiệm này có thể tập trung vào việc bypass hoặc phá vỡ mã hóa dữ liệu được lưu trữ trên hệ thống cục bộ hoặc trên Network. Một số thử nghiệm cũng đánh giá sức mạnh của các giải pháp quản lý bản quyền kỹ thuật số (DRM).
## 3. Scope
Trong các vấn đề cần biết của Pentest, Scope đề cập đến các ứng dụng, người dùng, mạng, thiết bị, tài khoản và các nội dung khác cần được kiểm tra để đạt được các mục tiêu của tổ chức. Việc định nghĩa Scope chặt chẽ sẽ giúp xây dựng một phạm rõ ràng cho việc Pentest. Ngoài ra, danh sách loại trừ trong Scope sẽ định nghĩa các dữ liệu, chức năng không được kiểm tra.

Để xác định chính xác phạm vi, các tổ chức nên thảo luận với các Pentester trước khi bắt đầu quá trình để xác định các mục tiêu (khoảng thời gian Pentest, phạm vi lỗ hổng, vv...)

### Scope đối với bên thứ 3
- Đối với việc Pentest bên thứ 3 hãy đảm bảo có các văn bản cấp phép rõ ràng. Ví dụ về Scope đối với bên thứ 3 là Cloud sẽ có một vài lưu ý sau:
    - Một vài nhà cung cấp PaaS và IaaS cho phép kiểm tra ở cấp Application nhưng không cho kiểm tra các Network service.
    - Azure và AWS cho phép Pentest mà không cần cấp phép trước.
     - Hầu hết các nhà cung cấp SaaS đều cấm việc Customer testing.
## 4. Rules of Engagement
Rules of Engagement liệt kê các chi tiết cụ thể của dự án Pentest của bạn để đảm bảo rằng cả khách hàng và các kỹ sư làm việc trong dự án biết chính xác những gì đang được thử nghiệm, khi nào nó được thử nghiệm và cách nó được thử nghiệm. Chúng chứa rất nhiều thông tin chi tiết quan trọng của dự án như các thông số thử nghiệm đặc biệt, các quy tắc mà nhóm thử nghiệm phải tuân theo.
- Đảm bảo các quy trình cơ bản của việc Pentest (ví dụ như Scan, Brute Force Password, vv...) được thực hiện một cách an toàn.
- Các cuộc tấn công với Impact cao cần được cấp phép cụ thể và nên được kiểm tra trong thời gian bảo trì.
- Tấn công DOS thường không được phép.
## 5. Cẩn thận với các dữ liệu có trong hệ thống
- Không nên xem hoặc tải các dữ liệu nhạy cảm hoặc được bảo vệ khi chưa được phép. Những dữ liệu nhạy cảm bao gồm:
    - <b>PHI:</b> Thông tin sức khỏe;
    - <b>PII:</b> Thông tin cá nhân. Trong thông tin cá nhân của Users, hãy cẩn thận với thẻ tín dụng và các thông tin liên quan đến ngân hàng.
    - <b>HIPAA, GLBA, GDPR:</b> Các tiêu chuẩn, đạo luật về bảo hiểm y tế, giấy tờ liên quan đến tài chính thu nhập, giấy xét nghiệm Gen, vv...
    - <b>Intellectual Property:</b> Quyền sở hữu trí tuệ.
- Không nên có những thông tin nhạy cảm trong báo cáo mà chỉ thể hiện quyền truy cập vào số lượng (ví dụ báo cáo về việc truy cập Database bạn chỉ nên thể hiện số lượng các Table, Column có trong DB). Đôi khi bạn được phép truy cập vào thông tin của một lượng nhỏ các Users, tuy nhiên nên có những văn bản cho phép rõ ràng trong những trường hợp này.
## 6. Các điều khoản, thủ tục, thỏa thuận
- <b>NDA (Non-disclosure Agreement):</b> Thỏa thuận không tiết lộ. Đây tài liệu giới hạn những gì có thể chia sẻ về bài kiểm tra bao gồm các dữ liệu mà người kiểm tra có thể tìm thấy trong quá trình Pentest.
- <b>MSA (Master Service Agreement):</b> Thỏa thuận MSA chứa các mục rộng hơn nhiều so với một thử nghiệm đơn lẻ:
    - Các điều khoản thanh toán.
    - Intellectual Property: Quyền sở hữu trí tuệ.
    - Điều khoản về những gián đoạn và hư hỏng có thể xảy ra: Trong quá trình Pentest sẽ có những hậu quả ko lường đường có thể xảy ra và người kiểm tra cần giới hạn trách nhiệm cho những trường hợp này;
- <b>SOW (Statement of Work):</b> Chứa các chi tiết cụ thể cho thử nghiệm bao gồm phạm vi, phương pháp và các loại kiểm tra được thực hiện.

Cuối cùng, đừng bao giờ chắc rằng bạn sẽ tìm thấy tất cả các lỗ hổng. Trong các điều khoản MSA, SOW hay trong báo cáo của bạn hãy nêu rõ rằng các vấn đề có thể đã bị bỏ sót và báo cáo chỉ là kết quả của việc kiểm tra tại một thời điểm nhất định.
# IV. Các bước Pentest
![](https://images.viblo.asia/958a2f59-e3f4-44a5-989c-152ee2c8176f.png)

Các bước khai thác phổ biến của Pentester và Attacker:

- <b>Recon:</b> Là một quá trình điều tra mục tiêu tổ chức để lấy thông tin từ các nguồn công khai (dịch vụ đăng ký Domain, Websites, vv...). Quá trình Recon còn sử dụng cả các kỹ thuật như Social Engineering để lấy thông tin
- <b>Footprinting and Scanning:</b> Là quá trình tìm kiểm các điểm yếu của tổ chức mục tiêu chẳng hạn như: Gateways, các hệ thống có sẵn, Ports, vv...
- <b>Exploitation:</b> Trong bước Exploitation, Attacker khai thác vào hệ thống mục tiêu dựa vào các điểm yếu tìm được để xâm nhập, chiếm quyền kiểm soát hay gây ra cuộc tấn công DOS để kiểm tra khả năng xử lí của hệ thống.
- <b>Post-exploitation:</b> Xảy ra sau quá trình xâm nhập. Đối với Pentester, giai đoạn này sẽ bao gồm các bước sau:
    - Ghi lại các phương thức được sử dụng để có quyền truy cập vào thông tin có giá trị của tổ chức của bạn và đề xuất các phương pháp khắc phục các lỗ hổng.
     - Dọn sạch môi trường, cấu hình lại mọi quyền mà Pentester có được để xâm nhập vào môi trường và ngăn chặn truy cập trái phép vào hệ thống.
          
     Attacker trong bước Post-exploitation thường sử dụng các phương pháp để duy trì việc truy cập cũng như xóa dấu vết. Các phương pháp duy trì bao gồm: tạo Backdoor và xây dựng Rootkit.

Các bước trên không phải luôn luôn theo đúng thứ tự mà có thể được vận dụng linh hoạt để đạt được kết quả tốt nhất. Mặc dù có cùng các bước khai thác, tuy nhiên Attacker thường cố gắng đi xa hơn để có thể khai thác thực sự. Riêng đối với Pentester sẽ có thêm một bước là <b>Reporting</b> nhằm liệt kê và giải thích những lỗ hổng còn tồn tại và cách khắc phục các vấn đề tìm thấy trong quá trình Pentest.
# V. Kết luận
Trong phần sau của series, chúng ta sẽ đi tìm hiểu chi tiết các bước khai thác trong Pentest.