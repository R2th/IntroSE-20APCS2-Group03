Để tìm hiểu về tài liệu ISTQB advance chuyên ngành quản lý Test, tôi sẽ bắt đầu với việc đọc hiểu từng chương. Chương đầu tiên là tìm hiểu về quy trình kiểm thử.

Từ khóa quan trọng trong chương bao gồm:

- Tiêu chuẩn dừng test, trường hợp kiểm thử , kết thúc kiểm thử, điều kiện kiểm thử , kiểm soát kiểm thử , thiết kế kiểm thử , thực hiện kiểm thử, nhật ký kiểm thử , lập kế hoạch kiểm thử , quy trình kiểm thử, kịch bản kiểm thử , báo cáo tóm tắt kiểm thử.
![](https://images.viblo.asia/510632c7-c636-41fb-8f32-ac21025c50c1.png)
Mục tiêu cần học tập trong phần quy trình kiểm thử bao gồm:

1. Lập kế hoạch kiểm tra, giám sát và kiểm soát (Test Planning, Monitoring and Control )
    - Phân tích yêu cầu kiểm tra cho một hệ thống để lập kế hoạch cho các hoạt động kiểm thử và mục tiêu đạt được sau khi hoàn thành sản phẩm.
2. Phân tích thử nghiệm (Test Analysis)
    - Sử dụng truy xuất nguồn gốc để kiểm tra tính đầy đủ và tính nhất quán của các điều kiện thử nghiệm được xác định liên quan đến mục tiêu thử nghiệm, chiến lược thử nghiệm và kế hoạch thử nghiệm 
    -  Giải thích các yếu tố có thể ảnh hưởng tới các điều kiện thử nghiệm được chỉ định và các ưu điểm và nhược điểm để chỉ định các điều kiện thử nghiệm ở mức chi tiết.
 
3. Thiết kế thử nghiệm (Test Design)
    - Sử dụng truy xuất nguồn gốc để kiểm tra tính đầy đủ và tính nhất quán của các trường hợp thử nghiệm được thiết kế liên quan đến các điều kiện thử nghiệm đã được xác định

 4. Thực hiện thử nghiệm (Test Implementation)
    - Sử dụng rủi ro, độ ưu tiên, môi trường thử nghiệm và dữ liệu  phụ thuộc và các ràng buộc để xây dựng lịch thực hiện thử nghiệm hoàn chỉnh và phù hợp với mục tiêu thử nghiệm, chiến lược thử nghiệm và kế hoạch thử nghiệm
 
5. Thực hiện kiểm tra ( Test Execution )
    - Sử dụng truy xuất nguồn gốc để theo dõi tiến trình kiểm tra về tính đầy đủ và thống nhất với các mục tiêu kiểm tra, chiến lược kiểm tra và kế hoạch kiểm tra
6. Đánh giá tiêu chí kết thúc và báo cáo (Evaluating Exit Criteria and Reporting )
    - Giải thích tầm quan trọng của việc thu thập thông tin chính xác và kịp thời trong quá trình thử nghiệm để hỗ trợ báo cáo và đánh giá chính xác theo tiêu chí kết thúc kiểm thử
7. Hoạt động kết thúc thử nghiệm (Test Closure Activities )
    - Tóm tắt bốn nhóm hoạt động đóng thử nghiệm 
    -  Thực hiện cải tiến dự án để đánh giá các quy trình và khám phá các khu vực cần cải thiện

Cụ thể chúng ta sẽ cùng tìm hiểu kỹ hơn về các khái niệm đc nêu ở trên.

## 1. Lập kế hoạch kiểm tra, giám sát và kiểm soát

Phần này tập trung vào các quy trình lập kế hoạch, giám sát và kiểm soát thử nghiệm. 
Như đã thảo luận ở cấp độ Foundation, các hoạt động này thuộc quyền hạn của quản lý kiểm thử.

### 1.1 Lập kế hoạch kiểm tra
![](https://images.viblo.asia/0298641c-d2b5-4bba-9a9e-ae1863607617.png)
- Đối với mỗi cấp độ kiểm tra, lập kế hoạch kiểm tra bắt đầu từ khi bắt đầu quá trình kiểm tra cho cấp độ đó và tiếp tục trong suốt dự án cho đến khi hoàn thành các hoạt động kiểm thử. Nó liên quan đến việc xác định các hoạt động và nguồn lực cần thiết để thực hiện được nhiệm vụ và mục tiêu đã xác định trong chiến lược thử nghiệm.
-  Lập kế hoạch kiểm tra cũng bao gồm xác định các phương pháp thu thập và theo dõi các số liệu sẽ được sử dụng để làm dự án, xác định tuân thủ kế hoạch và đánh giá việc đạt được các mục tiêu. Bằng cách xác định các số liệu hữu ích trong các giai đoạn lập kế hoạch, các công cụ có thể được chọn, lên lịch thực hiện và thiết lập tài liệu hướng dẫn.

- Chiến lược (hoặc các chiến lược) được chọn cho dự án thử nghiệm giúp xác định các nhiệm vụ nên sử dụng trong các giai đoạn lập kế hoạch. Ví dụ: khi sử dụng chiến lược thử nghiệm dựa trên rủi ro (xem Chương 2), phân tích rủi ro được sử dụng để hướng dẫn quy trình lập kế hoạch thử nghiệm, liên quan đến các hoạt động giảm thiểu cần thiết để giảm rủi ro sản phẩm  và giúp lập kế hoạch dự phòng. 
- Nếu xác định được một số lỗi có khả năng xảy ra và nghiêm trọng tiềm ẩn liên quan đến bảo mật, cần tập trung effort dành cho việc phát triển và thực hiện các bài kiểm tra bảo mật. Tương tự, nếu xác định rằng các khiếm khuyết nghiêm trọng thường được tìm thấy trong đặc tả thiết kế, quy trình lập kế hoạch thử nghiệm thì có thể chọn thử nghiệm tĩnh (đánh giá) bổ sung về đặc tả thiết kế.
- Thông tin rủi ro cũng có thể được sử dụng để xác định mức độ ưu tiên của các hoạt động thử nghiệm khác nhau. Ví dụ, trong trường hợp hiệu năng hệ thống có rủi ro cao, thử nghiệm hiệu năng có thể được tiến hành ngay khi có sẵn mã tích hợp. Tương tự, nếu chiến lược phản ứng được sử dụng, lập kế hoạch tạo ra các biểu đồ và công cụ kiểm tra cho các kỹ thuật kiểm tra động như thử nghiệm thăm dò có thể bảo đảm được chất lượng.

- Ngoài ra, giai đoạn lập kế hoạch kiểm tra là lúc Người quản lý kiểm tra tiếp cận và xác định rõ ràng mức độ kiểm tra nào sẽ được sử dụng, mục tiêu và mục tiêu của từng cấp độ và kỹ thuật kiểm tra nào sẽ được sử dụng ở mỗi cấp độ kiểm tra. Ví dụ, trong thử nghiệm dựa trên rủi ro của một số hệ thống điện tử hàng không, bắt buộc cần đánh giá rủi ro quy định mức độ bao phủ mã và do đó nên sử dụng các kỹ thuật thử nghiệm phù hợp.
- Mối quan hệ phức tạp có thể tồn tại giữa cơ sở thử nghiệm (ví dụ: các yêu cầu hoặc rủi ro cụ thể), các điều kiện thử nghiệm và các thử nghiệm. Mối quan hệ nhiều-nhiều thường tồn tại giữa các công việc này. Những điều này cần được hiểu rõ để thực hiện hiệu quả việc lập kế hoạch kiểm tra, giám sát và kiểm soát. Các quyết định của công cụ test cũng có thể phụ thuộc vào sự hiểu biết về mối quan hệ giữa các sản phẩm.
- Mối quan hệ cũng có thể tồn tại giữa quá trình làm sản phẩm được thực hiện bởi nhóm phát triển và nhóm thử nghiệm. Ví dụ, ma trận truy xuất nguồn gốc có thể cần theo dõi mối quan hệ giữa các yếu tố đặc tả thiết kế chi tiết từ các nhà thiết kế hệ thống, các yêu cầu nghiệp vụ từ các nhà phân tích kinh doanh và các sản phẩm công việc thử nghiệm được xác định bởi nhóm thử nghiệm. 
- Nếu các trường hợp thử nghiệm cấp thấp được thiết kế và sử dụng, có thể có một yêu cầu được xác định trong các giai đoạn lập kế hoạch rằng các tài liệu thiết kế chi tiết từ nhóm phát triển phải được phê duyệt trước khi bắt đầu tạo trường hợp thử nghiệm. Khi tuân theo vòng đời Agile, các phiên truyền thông tin không chính thức có thể được sử dụng để truyền đạt thông tin giữa các đội trước khi bắt đầu thử nghiệm.
- Kế hoạch kiểm tra cũng có thể liệt kê các tính năng cụ thể của phần mềm nằm trong phạm vi của nó (dựa trên phân tích rủi ro, nếu phù hợp), cũng như xác định rõ ràng các tính năng không nằm trong phạm vi của nó. Tùy thuộc vào mức độ hình thức và tài liệu phù hợp với dự án, mỗi tính năng trong phạm vi có thể được liên kết với một đặc điểm kỹ thuật thiết kế thử nghiệm tương ứng.
- Ở giai đoạn này cũng có thể có một yêu cầu để  quản lý kiểm tra làm việc với các designer của dự án để xác định đặc tả môi trường thử nghiệm ban đầu, để xác minh tính sẵn có của các tài nguyên được yêu cầu, để đảm bảo nhận được cam kết từ những người sẽ cấu hình môi trường  và để hiểu thời gian giao hàng / chi phí và công việc cần thiết để hoàn thành và cung cấp môi trường thử nghiệm.
- Thông tin rủi ro cũng có thể được sử dụng để xác định mức độ ưu tiên của các hoạt động thử nghiệm khác nhau. Ví dụ, hiệu năng hệ thống có rủi ro cao, thử nghiệm hiệu năng có thể được tiến hành ngay khi có mã tích hợp. Tương tự, nếu chiến lược phản ứng được sử dụng, lập kế hoạch tạo ra các biểu đồ và công cụ kiểm tra cho các kỹ thuật kiểm tra động như thử nghiệm thăm dò sẽ bảo đảm hơn.
- Cuối cùng, tất cả các phụ thuộc bên ngoài và thỏa thuận cấp độ dịch vụ liên quan (SLA) phải được xác định, nếu được yêu cầu, nên liên hệ ngay từ ban đầu. Ví dụ về các phụ thuộc là các yêu cầu tài nguyên cho các nhóm bên ngoài, các phụ thuộc vào các dự án khác (nếu làm việc trong một chương trình), các nhà cung cấp bên ngoài hoặc các đối tác phát triển, nhóm triển khai và quản trị viên cơ sở dữ liệu.
### 1.2 Giám sát và kiểm soát kiểm tra
![](https://images.viblo.asia/eb34b5d8-9aae-47ae-9324-c7433829f095.jpg)
- Để Trình quản lý kiểm tra cung cấp kiểm soát kiểm tra hiệu quả, cần phải thiết lập lịch kiểm tra và khung giám sát để cho phép theo dõi các sản phẩm và tài nguyên của công việc kiểm tra theo kế hoạch. Khung này phải bao gồm các biện pháp và mục tiêu chi tiết cần thiết để liên quan đến tình trạng của các sản phẩm và hoạt động của công việc thử nghiệm với kế hoạch và các mục tiêu chiến lược. 
- Đối với các dự án nhỏ và ít phức tạp, có thể tương đối dễ dàng liên kết các sản phẩm và hoạt động của công việc thử nghiệm với kế hoạch và mục tiêu chiến lược, nhưng nhìn chung các mục tiêu chi tiết hơn cần được xác định để đạt được điều này. Điều này có thể bao gồm các biện pháp và mục tiêu để đáp ứng các mục tiêu thử nghiệm và phạm vi của cơ sở thử nghiệm.

- Đặc biệt quan trọng là sự cần thiết phải liên kết tình trạng của các sản phẩm và hoạt động của công việc thử nghiệm với cơ sở thử nghiệm theo cách dễ hiểu và phù hợp với các bên liên quan của dự án và doanh nghiệp
- Xác định mục tiêu và đo lường tiến độ dựa trên các điều kiện thử nghiệm và các nhóm điều kiện thử nghiệm được sử dụng như một phương tiện để đạt được điều này bằng cách liên kết các sản phẩm công việc thử nghiệm với cơ sở thử nghiệm thông qua các điều kiện thử nghiệm. Cấu hình được cấu hình đúng, bao gồm khả năng báo cáo về tình trạng nguồn gốc, làm cho các mối quan hệ phức tạp tồn tại giữa các sản phẩm công việc phát triển, cơ sở thử nghiệm và các sản phẩm công việc kiểm tra trở nên minh bạch và dễ hiểu hơn.
- Đôi khi, các biện pháp và mục tiêu chi tiết mà các bên liên quan yêu cầu phải được giám sát, không liên quan trực tiếp đến chức năng hệ thống hoặc thông số kỹ thuật, đặc biệt nếu có ít hoặc không có tài liệu chính thức. 
- Ví dụ, một bên liên quan kinh doanh có thể quan tâm nhiều hơn đến việc thiết lập phạm vi bảo hiểm đối với chu kỳ hoạt động kinh doanh mặc dù đặc điểm kỹ thuật được xác định theo chức năng hệ thống. Sự tham gia của các bên liên quan ở giai đoạn đầu của dự án có thể giúp xác định các biện pháp và mục tiêu không chỉ có thể được sử dụng để giúp kiểm soát tốt hơn trong dự án mà còn có thể giúp thúc đẩy và ảnh hưởng đến các hoạt động thử nghiệm trong toàn dự án.
-  Ví dụ, các biện pháp và mục tiêu của các bên liên quan có thể dẫn đến việc cấu trúc thiết kế thử nghiệm và các sản phẩm công việc thực hiện thử nghiệm và / hoặc lịch thực hiện thử nghiệm để tạo thuận lợi cho việc giám sát chính xác tiến trình thử nghiệm đối với các biện pháp này. Các mục tiêu này cũng giúp cung cấp khả năng truy tìm nguồn gốc cho một cấp độ kiểm tra cụ thể và có khả năng giúp cung cấp khả năng truy nguyên thông tin qua các cấp độ kiểm tra khác nhau.
- Kiểm soát kiểm tra là một hoạt động đang diễn ra. Nó liên quan đến việc so sánh tiến độ thực tế so với kế hoạch và thực hiện các hành động khắc phục khi cần thiết. Kiểm soát kiểm tra hướng dẫn kiểm tra để hoàn thành nhiệm vụ, chiến lược và mục tiêu, bao gồm xem xét lại các hoạt động lập kế hoạch kiểm tra khi cần thiết. Phản ứng thích hợp với dữ liệu kiểm soát phụ thuộc vào thông tin quy hoạch chi tiết.
- Nội dung của các tài liệu lập kế hoạch kiểm tra và các hoạt động kiểm soát kiểm tra được đề cập trong Chương 2.

### 2. Phân tích kiểm tra
![](https://images.viblo.asia/42b7533f-4a7c-4139-9fba-e27795a9bb11.jpg)
Thay vì xem xét phân tích và thiết kế thử nghiệm cùng nhau như được mô tả trong giáo trình Cấp cơ sở, giáo trình Nâng cao coi chúng là các hoạt động riêng biệt, mặc dù nhận ra rằng chúng có thể được thực hiện như các hoạt động song song, tích hợp hoặc lặp để tạo thuận lợi cho việc sản xuất các sản phẩm công việc thiết kế thử nghiệm.

 
Phân tích thử nghiệm là hoạt động xác định những gì mà Viking sẽ được thử nghiệm dưới dạng các điều kiện thử nghiệm. Điều kiện thử nghiệm có thể được xác định bằng cách phân tích cơ sở thử nghiệm, mục tiêu thử nghiệm và rủi ro sản phẩm. 

Chúng có thể được xem là các biện pháp và mục tiêu chi tiết để thành công (ví dụ, như một phần của tiêu chí thoát) và nên được truy nguyên trở lại cơ sở thử nghiệm và xác định các mục tiêu chiến lược, bao gồm các mục tiêu thử nghiệm và các tiêu chí khác của dự án hoặc các bên liên quan để thành công. 

Các điều kiện thử nghiệm cũng phải được theo dõi để chuyển tiếp các thiết kế thử nghiệm và các sản phẩm công việc thử nghiệm khác khi các sản phẩm công việc đó được tạo ra.

 
Phân tích thử nghiệm cho một mức độ thử nghiệm nhất định có thể được thực hiện ngay khi cơ sở thử nghiệm được thiết lập cho cấp độ đó. 

Các kỹ thuật kiểm tra chính thức và các kỹ thuật phân tích chung khác (ví dụ: chiến lược dựa trên rủi ro phân tích và chiến lược dựa trên yêu cầu phân tích) có thể được sử dụng để xác định các điều kiện thử nghiệm. 

Các điều kiện thử nghiệm có thể hoặc không thể chỉ định các giá trị hoặc biến tùy thuộc vào mức độ thử nghiệm, thông tin có sẵn tại thời điểm tiến hành phân tích và mức độ chi tiết được chọn (nghĩa là mức độ chi tiết của tài liệu).

 
Có một số yếu tố cần xem xét khi quyết định mức độ chi tiết để chỉ định điều kiện thử nghiệm, bao gồm:

- Mức độ thử nghiệm
- Mức độ chi tiết và chất lượng của cơ sở thử nghiệm
- Độ phức tạp của hệ thống / phần mềm
- Rủi ro dự án và sản phẩm
- Mối quan hệ giữa cơ sở thử nghiệm, những gì cần thử nghiệm và làm thế nào để thử nghiệm
- Vòng đời phát triển phần mềm đang sử dụng
- Công cụ quản lý kiểm tra đang được sử dụng
- Mức độ thiết kế thử nghiệm và các sản phẩm công việc thử nghiệm khác sẽ được chỉ định và ghi lại
- Kỹ năng và kiến thức của các nhà phân tích kiểm tra
- Mức độ trưởng thành của quá trình thử nghiệm và bản thân tổ chức (lưu ý rằng sự trưởng thành cao hơn có thể yêu cầu mức độ chi tiết cao hơn hoặc cho phép mức độ chi tiết thấp hơn)
Sẵn có các bên liên quan của dự án để tham khảo ý kiến
 

Việc chỉ định các điều kiện thử nghiệm theo kiểu chi tiết sẽ có xu hướng dẫn đến số lượng điều kiện thử nghiệm lớn hơn. 

Ví dụ: bạn có thể có một điều kiện kiểm tra chung duy nhất, kiểm tra thử nghiệm, kiểm tra đối với ứng dụng thương mại điện tử.

Tuy nhiên, trong tài liệu điều kiện thử nghiệm chi tiết, điều này có thể được chia thành nhiều điều kiện thử nghiệm, với một điều kiện cho mỗi phương thức thanh toán được hỗ trợ, một điều kiện cho mỗi quốc gia đích có thể, v.v.
Một số lợi thế của việc chỉ định điều kiện thử nghiệm ở mức chi tiết bao gồm:
- Tạo điều kiện linh hoạt hơn trong việc liên quan đến các sản phẩm thử nghiệm khác (ví dụ: các trường hợp thử nghiệm) cho cơ sở thử nghiệm và mục tiêu thử nghiệm, do đó cung cấp giám sát và kiểm soát tốt hơn và chi tiết hơn cho Trình quản lý kiểm tra
- Góp phần ngăn ngừa khuyết tật, như đã thảo luận ở Cấp độ Cơ sở, bằng cách xuất hiện sớm trong một dự án để thử nghiệm ở cấp độ cao hơn, ngay khi cơ sở thử nghiệm được thiết lập và có khả năng trước khi kiến trúc hệ thống và thiết kế chi tiết có sẵn
- Liên quan đến các sản phẩm công việc thử nghiệm với các bên liên quan theo nghĩa mà họ có thể hiểu (thông thường, các trường hợp thử nghiệm và các sản phẩm công việc thử nghiệm khác không có ý nghĩa gì đối với các bên liên quan kinh doanh và các số liệu đơn giản như số trường hợp thử nghiệm được thực hiện không có ý nghĩa gì đối với các yêu cầu bảo hiểm của các bên liên quan)
- Giúp ảnh hưởng và định hướng không chỉ các hoạt động thử nghiệm khác mà cả các hoạt động phát triển khác Cho phép thiết kế, thực hiện và thực hiện thử nghiệm, cùng với các sản phẩm công việc được tối ưu hóa bằng cách bao quát hiệu quả hơn các biện pháp và mục tiêu chi tiết Cung cấp cơ sở để truy xuất nguồn gốc rõ ràng hơn trong phạm vi một cấp độ kiểm tra
 
Một số nhược điểm của việc chỉ định điều kiện kiểm tra ở mức chi tiết bao gồm:
- Tốn thời gian
- Khả năng bảo trì có thể trở nên khó khăn trong một môi trường thay đổi
- Mức độ hình thức cần được xác định và thực hiện trong toàn đội

 
Đặc điểm kỹ thuật của các điều kiện thử nghiệm chi tiết có thể đặc biệt hiệu quả trong các tình huống sau:
- Các phương pháp tài liệu thiết kế thử nghiệm nhẹ, chẳng hạn như danh sách kiểm tra, đang được sử dụng do phù hợp với vòng đời phát triển, hạn chế về chi phí và / hoặc thời gian hoặc các yếu tố khác
- Ít hoặc không có yêu cầu chính thức hoặc các sản phẩm công việc phát triển khác có sẵn làm cơ sở thử nghiệm Dự án có quy mô lớn, phức tạp hoặc rủi ro cao và yêu cầu mức độ giám sát và kiểm soát không thể được cung cấp bằng các trường hợp thử nghiệm liên quan đơn giản đến các sản phẩm công việc phát triển

Điều kiện thử nghiệm có thể được chỉ định với ít chi tiết hơn khi cơ sở thử nghiệm có thể liên quan dễ dàng và trực tiếp đến thử nghiệm sản phẩm thiết kế công việc. Điều này có nhiều khả năng là trường hợp sau:
- Kiểm tra mức thành phần
- Các dự án ít phức tạp hơn, nơi tồn tại các mối quan hệ phân cấp đơn giản giữa những gì cần kiểm tra và cách kiểm tra
- Thử nghiệm chấp nhận trong đó các trường hợp sử dụng có thể được sử dụng để giúp xác định các thử nghiệm (còn tiếp)

tài liệu tham khảo: (Advanced Level Syllabus  Test Manager -version 2012)