Sau bài chém gió lần trước của mình về vấn đề một Dev đau đầu khi nghe các bạn Tester của mình nói chuyện với nhau thì ở bài viết này mình tiếp tục với chủ đề đi tìm hiểu sâu hơn về Automation test. Bài viết vẫn chỉ là những tìm hiểu về lý thuyết của mình về automation test chứ cũng chưa có khả năng thực hành về nó. Mong rằng, bạn đọc cũng không quá nhàm chán :smiley: .

# Vẫn câu hỏi cũ: Automation test là gì?
Bài trước mình cũng có nhắc tới cái định nghĩa này rồi nên là nếu bạn đọc rồi thì có thể bỏ qua nhé.
> Automation test là quá trình sử dụng sự hỗ trợ của tool, script và phần mềm để thực hiện các trường hợp kiểm thử bằng cách lặp đi lặp lại các hành động được xác định trước. Automation test tập trung vào việc thay thế hoạt động thủ công của con người bằng các hệ thống hoặc thiết bị giúp nâng cao hiệu quả.
> 
Kiểm thử là một quá trình rất quan trọng cho sự thành công của bất kỳ sản phẩm phần mềm nào. Nếu phần mềm của bạn không hoạt động đúng thì người dùng sẽ không mua hoặc sử dụng sản phẩm của bạn. Tuy nhiên, việc thử nghiệm để tìm lỗi hoặc manual test sẽ tốn thời gian, chi phí, thường lặp đi lặp lại gây nhàm chán. Automation test là điều cần thiết cho các nhóm phát triển phần mềm để có thể theo kịp nhu cầu ngày càng tăng cao đối với phần mềm.

Khi bạn bắt đầu kiểm thử, một trong những quyết định chính mà bạn sẽ phải đưa ra là nếu bạn có thể manual test hay automation test. Vì vậy, bạn nên biết về sự khác biệt rõ rệt giữa manual test và automation test.

# Sự khác biệt giữa Manual test và Automation test

| Tính năng | Manual test | Automation test |
| -------- | -------- | -------- |
| Độ chính xác và Tin cậy     |  Thấp, vì manual test dễ bị lỗi từ con người    | Cao, sử dụng các tool, script    |
| Thời gian cần thiết | Cao | Tương đối thấp |
| Chi phí     | Thấp     | Cao     |
| Sử dụng | Thích hợp cho Exploratory Testing,  Usability Testing, Ad hoc Testing| Thích hợp cho Regression Testing, Performance Testing, Load Testing |
| Yếu tố con người     | Cho phép sự quan sát của con người để tìm ra bất kỳ vấn đề nào     | Không có sự quan sát của con người     |
| Trải nghiệm của khách hàng     | Giúp cải thiện trải nghiệm của khách hàng     | Không đảm bảo trải nghiệm của khách hàng là tích cực     |

Cả 2 phương án đều có yếu tố tốt hơn cũng như yếu tố kém hơn cái còn lại. Nhưng quy mô, ngân sách và thời gian của một dự án chắc chắn sẽ là quyết định các yếu tố ảnh hưởng đến phương pháo nào sẽ hoạt động tốt nhất trong quy trình thử nghiệm của bạn. Manual test cho phép con người có khả năng rút ra những hiểu biết sâu sắc từ một bài kiểm tra mà automation test có thể đã bỏ qua. Trong khi automation test lại rất phù hợp cho các dự án lớn yêu cầu thử nghiệm cùng một khu vực/ tính năng nhiều lần. 
# Làm thế nào để bạn thực hiện automation test
Sự thành công của automation test đòi hỏi lập kế hoạch và thiết kế công việc một cách cẩn thận. Các bước sau đây được thực hiện theo quy trình tự động:

   ![](https://images.viblo.asia/e577cd53-a274-4d15-a52f-82fd91616610.jpg)
   
   ## Lựa chọn công cụ 
   Bất kỳ quá trình nào cũng đều bắt đầu với việc định nghĩa. Vì vậy, trước khi áp dụng automation test, bạn nên xác định mục tiêu cho việc tự động hóa. Khi mà bạn chắc chắn về loại kiểm thử nào bạn đang thực hiện, bạn cần chọn công cụ một cách thông minh. Có một số loại công cụ kiểm thử có sẵn. Tuy nhiên, việc chọn đúng công cụ phù hợp với yêu cầu kiểm thử của bạn rất quan trọng đối với tự động hóa. Xem xét các điểm chính này khi chọn một công cụ:
*    Có dễ dàng để phát triển và bảo trì các script cho công cụ hay không?
*    Nó có hoạt động trên các nền tảng như web, di động, pc... hay không?
*    Công cụ này có chức năng báo cáo kiểm thử không?
*    Công cụ này có thể hỗ trợ bao nhiêu loại kiểm thử?
*    Công cụ hỗ trợ bao nhiêu ngôn ngữ?
## Xác định phạm vi của tự động hóa
Tiếp theo, bạn cần xác định phạm vi của tự động hóa. Vì bạn cần phải quyết định trong trường hợp nào bạn sẽ sử dụng tự động hóa. Một số gợi ý có thể xem xét:
* Kịch bản có lượng dữ liệu lớn.
* Các trường hợp kiểm thử có chức năng chung trên các ứng dụng.
* Tính khả thi kỹ thuật.
* Mức độ mà các thành phần được tái sử dụng.
* Độ phức tạp của các trường hợp kiểm thử.
## Lên kế hoạch, Thiết kế và Phát triển
Sau khi xác định mục tiêu của bạn và loại kiểm thử nào sẽ thực hiện tự động hóa, bạn nên quyết định những hành động mà automation test của bạn sẽ thực hiện. Lên kế hoạch, thiết kế và phát triển bao gồm:
* Phát triển test case: Không chỉ tạo các test case kiểm tra các khía cạnh khác nhau của hành vi ứng dụng cùng một lúc. Các bài automation test lớn, phức tạp luôn rất khó chỉnh sửa và tìm lỗi. Để tốt nhất thì ta nên chia các bài kiểm tra thành nhiều bài kiểm tra đơn giản, hợp lý và nhỏ hơn.
* Phát triển test suite: Các test suite kiểm tra đảm bảo rằng các trường hợp automation test chạy lần lượt mà không có sự can thiệp thủ công nào. Điều này có thể dễ dàng được thực hiện bằng cách tạo một bộ kiểm thử có nhiều trường hợp kiểm thử, một thư viện và công cụ command line chạy bộ test suite.
## Thực hiện kiểm thử
Automation script được thực thi trong giai đoạn này. Việc thực thi có thể được thực hiện bằng cách sử dụng công cụ tự động hóa trực tiếp hoặc thông qua công cụ quản lý kiểm tra sẽ gọi công cụ tự động hóa. Để tận dụng tối đa automation test của bạn, thử nghiệm nên được bắt đầu càng sớm càng tốt và thực hiện thường xuyên khi cần thiết. Những tester sớm tham gian vào vòng đời của dự án càng tốt và bạn càng kiểm tra nhiều, bạn càng thấy nhiều lỗi.
## Bảo trì
Khi các test case được thực thi, bước tiếp theo là tạo các báo cáo để các hành động được thực hiện trong quá trình kiểm thử được ghi lại. Khi các chức năng mới được thêm vào phần mềm mà bạn đang thực hiện kiểm thử với các chu kỳ liên tục, các kịch bản tự động hóa cần được thêm, xem xét và duy trì cho mỗi chu kỳ release. Bảo trì trở nên cần thiết để nâng cao hiệu quả của tự động hóa.
# Một số công cụ cho automation test
Việc lựa chọn một công cụ automation test là điều cần thiết để có thể thực hiện tự động hóa kiểm thử. Có rất nhiều công cụ phụ vụ cho automation test trên thị trường và điều quan trọng là chọn công cụ phù hợp với yêu cầu chung của dự án, cũng như của bạn. Cùng xem xét một vài điểm chính khi chọn một công cụ automation test:
* Hiểu kỹ yêu cầu dự án của bạn và xác định các kịch bản kiểm thử mà bạn muốn thực hiện tự động hóa.
* Tìm kiếm danh sách các công cụ phù hợp với yêu cầu dự án của bạn.
* Xác định ngân sách của bạn cho việc sử dụng công cụ automation test.
* Hãy so sánh từng công cụ theo các tiêu chí như: có dễ dàng phát triển và duy trì các script cho công cụ hay không, nó có hoạt động trên các nền tàng web, di động, pc ... hay không. Công cụ có chức năng báo cáo thử nghiệm không? Công cụ có thể hỗ trợ bao nhiêu loại thử nghiệm? Công cụ hỗ trợ bao nhiêu loại ngôn ngữ? (Đây là nội dung của phần Lựa chọn công cụ mình nói đến ở trên).
* Khi bạn đã so sánh các công cụ, hãy chọn công cụ nằm trong ngân sách của bạn. Hãy chắc chắn rằng nó mang lại cho bạn nhiều lợi thể hơn dựa trên các tiêu chí đánh giá ở trên.
Một số công cụ kiểm thử phổ biến sau:
* Selenium: Là một framework kiểm thử phổ biến để thực hiện kiểm thử ứng dụng web trên nhiều trình duyệt và nền tảng khác nhau như Windows, Mac và Linux.
* Watir: Là công cụ kiểm thử mã nguồn mở được tạo thành từ các thư viện Ruby để tự động hóa kiểm thử ứng dụng web.
* Ranorex: Là một công cụ linh hoạt. Nó là công cụ kiểm tra GUI thực hiện autiomation test một cách hoàn hảo trên tất cả các môi trường và thiết bị.
* Appium: Là một phần mềm autiomation test mã nguồn mở và được hỗ trợ bởi một cộng đồng các nhà phát triển và chuyên gia rất tích cực.
# Kết luận
Vẫn là một bài viết nói về lý thuyết automation test có thể nhàm chán đối với mọi người. Tuy nhiên, nội dung của bài cũng giúp mình hiểu rõ hơn về quy trình thực hiện automation test cũng như điểm lợi/ hại đối với việc sử dụng nó. Mong rằng ở bài sau mình sẽ cố vọc vạch thực hành bằng việc sử dụng một trong số những công cụ mà chính mình đã liệt kê ở trên. Cảm ơn mọi người đã đọc :bowing_woman: .