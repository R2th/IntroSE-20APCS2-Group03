Hiện nay xuất hiện càng nhiều các cuộc tấn công vào ứng dụng thông qua các điểm yếu và lỗ hổng phần mềm. Vì vậy hiện nay DevSecOps ra đời để giảm thiểu các điểm yếu và lỗ hổng phần mềm khi phát triển phần mềm. DevSecOps là quy trình được phát triển sử dụng để đẩy nhanh tiến độ dự án, bằng cách tích hợp và tự động hóa sớm các giải pháp kiểm thử bảo mật (Application Security Testing - AST) trong CI/CD pipeline, việc tích hợp có thể phát hiện lỗ hổng bảo mật trong mỗi bản build mà không gây ảnh hưởng tiến độ. Cách vận hành DevsSecOps này trái ngược hoàn toàn với các phương pháp bảo mật phần mềm truyền thống, tức là kiểm tra bảo mật ứng dụng được thực hiện ở giai đoạn cuối trong vòng đời phát triển hệ thống (SDLC). 
![image.png](https://images.viblo.asia/23931405-f306-4128-b340-4ea31981aeda.png)

Kiểm thử bảo mật ứng dụng chia làm 4 loại công cụ quét bảo mật và mỗi loại tập trung vào một khía cạnh hơi khác nhau của bảo mật ứng dụng.
## 1. Kiểm thử an toàn ứng dụng tĩnh (SAST)
**Static Application System Testing** – còn được gọi là “**white box testing**”, xuất hiện sớm nhất và là loại phổ biến nhất về bảo mật ứng dụng tự động. SAST quét, phân tích mã nguồn để xác định xem có tồn tại các lỗ hổng bảo mật hay không và đảm bảo tuân thủ các nguyên tắc bảo mật. SAST rất quan trọng để phát hiện và loại bỏ các lỗ hổng trong phần mềm trong SDLC, trước khi ứng dụng được triển khai. Vì SAST không yêu cầu ứng dụng biên dịch hoặc chạy khi tìm lỗ hổng (không giống như DAST).
![image.png](https://images.viblo.asia/60d56707-cdb8-4721-af6c-fd9120bc5a33.png)
Mặc dù SAST có nhiều lợi ích, nhưng cũng có khuyết điểm riêng của nó. Sau đây là những ưu và nhược điểm của SAST.

**Ưu điểm của SAST:**
*	**Nguyên tắc bảo mật shift left**: SAST giúp phát hiện các lỗ hổng trong mã nguồn ở trong giai đoạn thiết kế. Việc tìm kiếm và khắc phục các vấn đề bảo mật ở giai đoạn này giúp các tổ chức giảm thiểu các rủi ro khi gần ngày phát hành hoặc thậm chí tệ hơn là sau khi phát hành.
* 	**Đảm bảo mã hóa an toàn**: SAST dễ dàng phát hiện các sai sót giúp các nhóm phát triển đảm bảo rằng họ tuân thủ các tiêu chuẩn mã hóa an toàn và các phương pháp đảm bảo an toàn.
*	**Phát hiện các lỗ hổng phổ biến**: SAST tự động có thể dễ dàng phát hiện các lỗ hổng bảo mật phổ biến như tràn bộ đệm, SQL Injection, cross-site scripting, v.v.

**Nhược điểm của SAST:**
* **Không thể phát hiện tất cả các lỗ hổng**: Khó có thể tự động phát hiện các vấn đề như xác thực, kiểm soát truy cập và mật mã trong mã nguồn. Rõ ràng, SAST cũng không thể giải quyết các vấn đề về thời gian chạy hoặc các vấn đề về cấu hình, đòi hỏi các tổ chức phải triển khai các công cụ kiểm tra bảo mật bổ sung.
* **Tỷ lệ báo động giả cao**: SAST có số lượng báo động giả cao, đội ngũ phát triển và bảo mật tốn rất nhiều thời gian và công sức để loại bỏ các báo động giả để tìm kiếm các vấn đề thực sự. Xem xét tốc độ phát triển cạnh tranh và lượng thời gian cần thiết để khắc phục các vấn đề quan trọng gây khá nhiều áp lực cho sự phát triển.
* **Mất thời gian**: SAST có thể quét liên tục, một lần quét có thể mất vài giờ đối với một cơ sở mã nguồn lớn. Ngoài ra, tốn thời gian xác minh chính xác các lỗ hổng bảo mật.
##  2. Kiểm thử an toàn ứng dụng động (DAST)
**Dynamic Application Security Testing** – còn được gọi là “**black box testing**”, kỹ thuật này không tìm lỗ hổng trong mã nguồn như SAST, mà là tìm lỗ hổng trong lúc ứng dụng đang chạy. Nó thực hiện điều này bằng cách sử dụng các kỹ thuật injection trên ứng dụng. DAST có thể xác định các lỗ hổng bảo mật phổ biến, chẳng hạn như SQL Injection và XSS. DAST cũng chú ý tới các vấn đề như thời gian chạy vì nó không thể xác định được bằng phân tích tĩnh, các vấn đề về xác thực và cấu hình máy chủ, cũng như các lỗ hổng chỉ hiển thị khi người dùng đã đăng nhập.
![image.png](https://images.viblo.asia/34c985a3-e9df-4ded-bde5-46ccb87004b4.png)
DAST là một công cụ kiểm tra có giá trị có thể phát hiện ra các lỗ hổng bảo mật mà các công cụ khác không làm được. Mặc dù DAST vượt trội trong một số lĩnh vực nhất định, nhưng nó cũng có những hạn chế. Sau đây những ưu và nhược điểm hàng đầu của công nghệ này.

**Ưu điểm của DAST:**
* 	**Công nghệ độc lập**: Bởi vì DAST không xem xét mã nguồn, nó không phải là ngôn ngữ hoặc nền tảng cụ thể. Không bị giới hạn ở các ngôn ngữ hoặc công nghệ cụ thể, cho phép chạy một công cụ DAST trên ứng dụng của mình.
* 	**Tỷ lệ báo động giả thấp**: DAST có tỷ lệ báo động giả thấp hơn.
* 	**Xác định vấn đề về các cấu hình**: DAST vượt trội trong việc tìm kiếm các lỗ hổng bảo mật chỉ xảy ra khi ứng dụng đang hoạt động. Ngoài ra, DAST tấn công một ứng dụng từ bên ngoài vào, đặt nó vào vị trí hoàn hảo để tìm ra các lỗi cấu hình mà các công cụ AST khác đã bỏ qua.

**Nhược điểm của DAST:**
* **Không có khả năng mở rộng**: DAST là phụ thuộc quá nhiều vào các chuyên gia bảo mật để viết các bài kiểm tra hiệu quả, điều này khiến việc mở rộng quy mô rất khó khăn.
* **Không hiển thị mã**: DAST không có bất kỳ khả năng hiển thị nào đối với mã nguồn của ứng dụng. Điều này có nghĩa là DAST không thể hướng các nhà phát triển đến mã có vấn đề để khắc phục hoặc tự cung cấp phạm vi bảo mật toàn diện.
* **Quét chậm**: Quá trình quét của DAST mất quá nhiều thời gian. Ngoài ra, DAST thường tìm thấy các lỗ hổng sau vòng đời phát triển phần mềm (SDLC), dẫn đến sửa chữa tốn kém hơn và tốn thời gian hơn.
## **3. Kiểm thử an toàn ứng dụng tích hợp (IAST)**
**Interactive Application Security Testing** – hay còn được gọi là “**grey box testing**”, được phát triển nhằm khắc phục một số hạn chế của SAST và DAST. IAST được thiết kế hoạt động bên trong cho các ứng dụng web và di động để phát hiện và báo cáo các vấn đề trong khi ứng dụng đang chạy. Giống như DAST, thử nghiệm xảy ra trong thời gian thực trong khi ứng dụng đang chạy trong môi trường QA hoặc thử nghiệm. Tuy nhiên, không giống như DAST, IAST có thể xác định dòng mã có vấn đề và thông báo cho các nhà phát triển để khắc phục ngay lập tức. Như với SAST thì AST cũng có xem xét mã nguồn nhưng nó thực hiện sau khi xây dựng.

Mặc dù IAST có nhiều lợi ích, nhưng không phải không có sai sót của nó. Hãy xem xét những ưu và nhược điểm của IAST.

**Ưu điểm của IAST:**
* **Tỷ lệ báo động giả thấp**: IAST có tỷ lệ báo động giả cực kỳ thấp, không giống như SAST, vốn có tỷ lệ báo động giả cao.
* **Phản hồi tức thì**: IAST cung cấp kết quả kiểm tra trực tiếp cho các nhà phát triển trong thời gian thực. IAST cũng tích hợp tốt với các công cụ CI / CD. Khắc phục các lỗ hổng bảo mật và kiểm tra mã nguồn sớm trong vòng đời phát triển phần mềm (SDLC) giúp các tổ chức tiết kiệm thời gian và tiền bạc.
* **Có khả năng mở rộng cao**: IAST có khả năng mở rộng cao và dễ dàng triển khai. IAST hướng các nhà phát triển đến các dòng mã có vấn đề cụ thể để khắc phục ngay lập tức mà không cần sự can thiệp của chuyên gia bảo mật.

**Nhược điểm của IAST:**
* **Phạm vi ngôn ngữ hạn chế**: Vì IAST được nhúng trong ứng dụng mà nó đang thử nghiệm. IAST chỉ hỗ trợ những ngôn ngữ, framework nhất định.
* **Cần môi trường đủ tốt để cài đặt:** IAST cần một môi trường và kiến trúc phát triển phần mềm hiện đại.
* **Không được chấp nhận rộng rãi**: Mặc dù IAST đã hoạt động được vài năm, nhưng IAST vẫn chưa tìm được chỗ đứng vững chắc trên thị trường. Vì không cung cấp đủ mức độ phù hợp cho các dự án.
##  4. Phân tích thành phần phần mềm (SCA)
**Software Composition Analysis - SCA** thực hiện quét tự động cơ sở mã của ứng dụng để cung cấp khả năng hiển thị về việc sử dụng các thành phần phần mềm mã nguồn mở. Điều này bao gồm xác định tất cả các thành phần của phần mềm như các phần mềm bên thứ ba, dữ liệu tuân thủ giấy phép của nó và các lỗ hổng bảo mật. Ngoài việc cung cấp khả năng hiển thị về việc sử dụng phần mềm mã nguồn mở, các công cụ SCA cũng ưu tiên tìm các lỗ hổng mã nguồn mở và cung cấp thông tin chi tiết và tự động khắc phục để giải quyết các mối đe dọa bảo mật.

**SCA** tích hợp liền mạch với nhiều môi trường dành cho nhà phát triển ở mọi giai đoạn của phát triển phần mềm, công cụ xây dựng, trình quản lý gói và máy chủ CI - để các nhà phát triển có thể quyết định xem họ có thể hoặc nên sử dụng một thành phần mã nguồn mở trước khi yêu cầu được thực hiện.


# Kết luận
Như ta thấy ở trên, việc kiểm thử ở giai đoạn phát triển phần mềm là rất quan trọng và cần thiết đối với sản phẩm phần mềm như loại bỏ các lỗ hổng bảo mật phổ biến, giúp các công ty phần mềm giảm thiểu chi phí kiểm thử, cũng như giúp các kiểm thử viên tập trung những lỗi bảo mật có độ khó cao hơn.

Đây là bài viết đầu tiên của mình. Mong mn đóng góp ý kiến để xây dựng một series việc tích hợp từng các công cụ vào trong quy trình CI/CD.

Cảm ơn các bạn đã đọc bài!

**Nguồn**: [https://www.whitesourcesoftware.com/resources/blog/web-application-security/](https://www.whitesourcesoftware.com/resources/blog/web-application-security/)