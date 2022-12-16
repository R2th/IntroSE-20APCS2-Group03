- Một yếu tố xác định để áp dụng thành công kiểm thử tự động trong các dự án phần mềm là lựa chọn và sử dụng đúng bộ công cụ kiểm thử tự động. 
- Đây là một nhiệm vụ khó khăn, đặc biệt đối với những người mới sử dụng kiểm thử tự động vì có rất nhiều công cụ trên thị trường để lựa chọn, mỗi công cụ có điểm mạnh và điểm yếu khác nhau. Không có công cụ nào có thể phù hợp với tất cả các nhu cầu kiểm tra tự động khiến việc tìm kiếm công cụ phù hợp trở nên khó khăn.
- Để làm rõ vấn đề này, tôi sẽ so sánh điểm mạnh và sự hạn chế của Katalon Studio với các bộ công cụ kiểm tra tự động phổ biến khác trên thị trường.

### I. Tổng quan về các công cụ kiểm thử
- Katalon studion là một nền tảng thử nghiệm tự động cung cấp một bộ tính năng toàn diện để triển khai các giải pháp thử nghiệm tự động hoàn toàn cho Web, API và Mobile. Được xây dựng dựa trên các khung Selenium và Appium mã nguồn mở, Katalon Studio cho phép các nhóm bắt đầu với tự động hóa thử nghiệm một cách nhanh chóng bằng cách giảm nỗ lực và chuyên môn cần thiết cho việc học và tích hợp các khung này cho nhu cầu thử nghiệm tự động.
- Selenium có lẽ là khung tự động hóa phổ biến nhất bao gồm nhiều công cụ và plugin để thử nghiệm ứng dụng Web. Selenium được biết đến với khả năng mạnh mẽ để hỗ trợ kiểm tra hiệu năng của các ứng dụng Web. Selenium là một lựa chọn phổ biến trong không gian tự động hóa thử nghiệm nguồn mở, một phần do cộng đồng người dùng và phát triển lớn và tích cực của nó.
- Unified Functional Testing (UFT) (UFT), trước đây là QuickTest Professional (QTP), có lẽ là công cụ thương mại phổ biến nhất để tự động hóa kiểm tra chức năng. UFT cung cấp một bộ tính năng toàn diện có thể đáp ứng hầu hết các nhu cầu kiểm tra tự động chức năng trên các nền tảng máy tính để bàn, thiết bị di động và Web.
- TestComplete cũng là một nền tảng tích hợp thương mại để thử nghiệm ứng dụng trên máy tính để bàn, thiết bị di động và Web. Giống như UFT, TestComplete cung cấp một số tính năng tự động kiểm tra chính như kiểm tra dựa trên từ khóa và kiểm soát dữ liệu, kiểm tra trình duyệt chéo, kiểm tra API và tích hợp CI. Công cụ này hỗ trợ một số ngôn ngữ bao gồm JavaScript, Python, VBScript, JScript, DelphiScript, C ++ Script và C # Script để viết các kịch bản thử nghiệm.

### II. So sánh các công cụ

- Bảng dưới đây cung cấp so sánh các công cụ dựa trên các tính năng chính của tự động hóa phần mềm.


    | Features  | Katalon Studio | Selenium | UFT | TestComplete |
    | -------- | -------- | -------- | -------- | -------- |
    | Nền tảng phát triển     | Đa nền tảng     | Đa nền tảng     | Windows     | Windows     |
    | Ứng dụng đang thử nghiệm     | Windows desktop, Web, Mobile apps, API/Web services     | Web apps     | Windows desktop, Web, Mobile apps, API/Web services     | Windows desktop, Web, Mobile apps, API/Web services     |
    | Ngôn ngữ kịch bản     | Java/Groovy     | Java, C#, Perl, Python, JavaScript, Ruby, PHP     | VBScript     | 	JavaScript, Python, VBScript, JScript, Delphi, C++ and C#     |
    | Kỹ năng lập trình     | Không yêu cầu. Đối với các kịch bản nâng cao mới yêu cầu có kỹ năng lập trình     | Cần có kỹ năng lập trình ở mức nâng cao để tích hợp các công cụ khác nhau     | Không yêu cầu. Đối với các kịch bản nâng cao mới yêu cầu có kỹ năng lập trình     | Không yêu cầu. Đối với các kịch bản nâng cao mới yêu cầu có kỹ năng lập trình     |
    | Learning curves     | Medium     | High     | Medium     | Medium     |
    | Cài đặt và sử dụng     | Dễ dàng cài đặt và chạy     | Yêu cầu cài đặt và tích hợp các công cụ khác nhau     | Dễ dàng cài đặt và chạy     | Dễ dàng cài đặt và chạy     |
    | Thời gian tạo kịch bản     | Nhanh     | Chậm     | Nhanh     | Nhanh     |
    | Kiểm tra dựa trên hình ảnh     | Hỗ trợ tích hợp     | Yêu cầu cài đặt thư viện bổ sung     | Hỗ trợ tích hợp, nhận dạng đối tượng dựa trên hình ảnh     | Hỗ trợ tích hợp     |
    | Tích hợp DevOps / ALM     | Many     | Không (yêu cầu thư viện bổ sung)     | Many     | Many     |
    | CI    | Các công cụ CI phổ biến (ví dụ: Jenkins, Teamcity)     | Các công cụ CI khác nhau (ví dụ: Jenkins, Cruise Control)     | Các công cụ CI khác nhau (ví dụ: Jenkins, Trung tâm chất lượng HP)     | Các công cụ CI khác nhau (ví dụ: Jenkins, Trung tâm chất lượng HP)     |
    | Test Analytics     | Katalon TestOps	     | Không     | Không     | Không     |
    | Product support     | Cộng đồng, dịch vụ hỗ trợ doanh nghiệp, nhân viên tận tâm     | Cộng đồng nguồn mở     | Cộng đồng, nhân viên tận tâm     | Cộng đồng, nhân viên tận tâm     |
    | License type     | Mất phí     | Nguồn mở (Apache 2.0)     | Mất phí     | Mất phí     |
    | Cost     | Freemium     | Miễn phí     | Phí giấy phép và bảo trì     | Phí giấy phép và bảo trì     |


- Learning curves: thuật ngữ này đề cập đến mối quan hệ giữa quá trình học tập và tích lũy kinh nghiệm đối với kết quả là những tiến bộ đạt được.
- Freemium: là một mô hình kinh doanh trong đó công ty cung cấp miễn phí các tính năng cơ bản cho người dùng, và thu phí đối với các tính năng bổ sung hoặc nâng cao.

### III. Ưu nhược điểm

- Bảng so sánh ở trên chủ yếu tập trung vào các tính năng phổ biến của một công cụ kiểm tra tự động.
- Sau đây trình bày một quan điểm khác bằng cách chọn và so sánh các điểm mạnh và hạn chế chính của các công cụ.

**1. Katalon Studio**

- Điểm mạnh:
    - Không yêu license và bảo trì (có sẵn các dịch vụ hỗ trợ chuyên dụng có trả tiền nếu cần).
    - Tích hợp các framework và tính năng cần thiết để tạo và thực hiện các trường hợp thử nghiệm nhanh.
    - Được xây dựng dựa trên framework Selenium nhưng đã lược bỏ yêu cầu kỹ năng lập trình nâng cao cần thiết cho Selenium.
 - Hạn chế:
     - Framework mới nổi với một cộng đồng phát triển nhanh chóng.
     - Các tính năng vẫn đang phát triển
     - Ngôn ngữ kịch bản hạn chế: chỉ hỗ trợ cho Java/Groovy
     
**2. Selenium**

- Điểm mạnh:
    - Mã nguồn mở, không mất phí license và bảo trì.
    - Cộng đồng người dùng và phát triển lớn và tích cực để theo kịp các công nghệ phần mềm.
    - Tích hợp được các công cụ và framework khác để phát triển, tăng cường khả năng của nó.
   
 - Hạn chế:
     - Người kiểm thử cần có kỹ năng và kinh nghiệm lập trình tốt để thiết lập và tích hợp Selenium với các công cụ và framework khác
     - Mất thời gian thiết lập và tích hợp các framework khác khi build dự án mới
     - Hỗ trợ chậm từ cộng đồng

**3. UFT**

- Điểm mạnh:
    - Các tính năng kiểm tra tự động toàn diện, chỉn chu được tích hợp vào một hệ thống duy nhất.
    - Hố trợ nhanh chóng  với cộng đồng lớn được thành lập
    - Chỉ yêu cầu các kỹ năng lập trình cơ bản để bắt đầu với việc tạo và thực hiện kiểm tra.

 - Hạn chế:
     - Chi phí đắt đỏ: phí license và bảo trì
     - Chi phí cao cho việc nâng cấp và update các module
     - Chỉ support ngôn ngữ VBScript

**4. TestComplete**

- Điểm mạnh:
    - Các tính năng kiểm tra tự động toàn diện, chỉn chu được tích hợp vào một hệ thống duy nhất.
    - Support nhiều ngôn ngữ kịch bản
    - Chỉ cần các kỹ năng lập trình cơ bản.
- Hạn chế:
   - Chi phí đắt đỏ: phí license và bảo trì
   - Chi phí cao cho việc nâng cấp và update các module

### IV. Kết luận

- Không có công cụ nào phù hợp cho tất cả tính năng để kiểm tra tự động. Do đó cần kiểm tra, đánh giá các công cụ khác nhau để chọn ra giải pháp tốt nhất đáp ứng được nhu cầu kiểm tra tự động cần cho dự án.
- Các ngôn ngữ lập trình và công nghệ được sử dụng để phát triển phần mềm tiếp tục phát triển, cũng như các công cụ kiểm tra tự động cũng được phát triển từng ngày. Điều đó khiến chi phí trở thành một yếu tố quan trọng trong việc lựa chọn công cụ.
- Các nhà cung cấp thương mại thường tính phí nâng cấp công cụ, có thể là đáng kể nếu phần mềm của bạn sử dụng các công nghệ mới  và thường xuyên thay đổi.
- Mặt khác, các công cụ nguồn mở và phi thương mại không phát sinh thêm phí nhưng đòi hỏi nỗ lực và chuyên môn của người kiểm thử để tích hợp tools và frameworks cho công cụ của mình. Vì vậy, sự hỗ trợ từ cộng đồng mã nguồn mở cũng bị hạn chế.
- Các công cụ mới  tích hợp với các framework mở, như Katalon, cung cấp một giải pháp thay thế khả thi cho cả các giải pháp thử nghiệm tự động nguồn mở và thương mại.

### V. Tài liệu tham khảo

- [A Comparison of Automated Testing Tools](https://www.katalon.com/resources-center/blog/comparison-automated-testing-tools/)