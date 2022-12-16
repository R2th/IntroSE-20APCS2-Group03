Bài viết dưới đây được dịch từ link: https://www.neotys.com/blog/where-does-qa-fit-in-devops/

Trong một tổ chức phát triển phần mềm truyền thống, nhóm QA luôn được coi như một phần tách biệt hoàn toàn so với nhóm phát triển (Dev). Dev và QA có nhiệm vụ riêng biệt, trách nhiệm riêng biệt, chuyên môn riêng biệt và cách quản lý riêng biệt. Đây là 2 thực thể hoàn toàn tách biệt.
Tuy nhiên, với những người không thuộc nhóm kỹ thuật - ví dụ như ban lãnh đạo thì họ chủ yếu nhìn nhận Dev và QA là 2 nhóm giống nhau. Theo đó, các nhóm này làm việc cùng với nhau để tiến hành cùng một công việc và hoàn thành cùng một trách nhiệm: bàn giao được một sản phẩm hoàn thiện.
Vậy, nhóm QA trong tổ chức triển khai phương pháp DevOps có nhiệm vụ gì? Khi 2 nhóm Dev và Operation sát nhập vào với nhau thì nhóm QA sẽ ở vị trí nào? Và làm thế nào để nhóm QA có thể hòa hợp được với mô hình DevOps? Bài viết này sẽ đưa ra câu trả lời chính xác cho những câu hỏi trên.

### Lý do đằng sau mô hình DevOps: Phát triển tự động

Khi nói đến xu hướng phát triển của mô hình DevOps, bạn sẽ nhận ra rằng các công ty và tổ chức lựa chọn mô hình này để tạo điều kiện cho việc triển khai phát triển phần mềm tự động. Mô hình DevOps cung cấp một cấu trúc cho phép team bàn giao sản phẩm theo tuần, theo ngày, thậm chí là theo giờ. Khái niệm truyền thống về "phát triển phần mềm" đang dần tan biến, nhường chỗ cho chu kỳ cải tiến dịch vụ liên tục.
DevOps là sự tiến hóa dựa vào các nguyên lý của mô hình Agile: loại bỏ tất cả các chướng ngại vật để có được phần mềm chất lượng cao cung cấp cho khách hàng. Khi bạn có một quy trình phát triển theo mô hình agile trơn tru và tích hợp liên tục, việc tự động hóa quy trình phát triển là lựa chọn tối ưu nhất vì nó đáp ứng được các mục tiêu mà các nhà quản lý doanh nghiệp luôn khao khát:
1. Đưa sản phẩm ra thị trường nhanh hơn
2. Sản phẩm đạt chất lượng cao hơn
3. Tăng hiệu quả của tổ chức

Nhưng trước khi tiếp tục, hãy cùng cân nhắc một chút: Mục đích của DevOps là đưa đến thị trường một sản phẩm chất lượng cao trong thời gian ngắn - ngay cả khi tự động hóa. Chất lượng sản phẩm là giá trị cốt lõi của DevOps. Nếu bạn không thể đưa sản phẩm có chất lượng cao ra thị trường thì việc triển khai DevOps cũng không có ý nghĩa gì cả.
Vì vậy, chúng ta có thể thấy là QA giữ một vai trò quan trọng trong nhóm DevOps. Nhưng họ đóng vai trò gì trong đây?

### Sản phẩm là cơ sở hạ tầng

Chúng tôi đã phỏng vấn ông Carl Schmidt, Giám đốc Công nghệ của Unbounce, về quan điểm của ông về QA và phương pháp DevOps. Unbounce có chạy một chương trình SaaS cho các nhà tiếp thị trực tuyến, giúp việc xây dựng, công bố và áp dụng phương pháp A/B test với các trang đơn mà không cần đến các nguồn lực về công nghệ trở nên dễ dàng hơn. Unbounce có 3 nhóm phát triển, mỗi nhóm đều có một QA cố định và người này sẽ là người thực hiện phương pháp DevOps trong cả tổ chức.

Ông Carl nói rằng: “Quan điểm của tôi là bất kỳ thay đổi nào (dù về cấu hình phần mềm hoặc hệ thống) đều có thể được xử lý một cách trôi chảy qua một hệ thống thống nhất kết thúc với sự kiểm định từ QA.
Cơ sở hạ tầng là code.
Đây chính là tuyên bố có thể thay đổi hoàn toàn cục diện cuộc chơi đối với bất kỳ tổ chức phát triển truyền thống nào. Từ trước đến giờ vẫn luôn tồn tại một ranh giới rõ ràng giữa những gì tạo thành sản phẩm và những gì cấu thành hoạt động. Bạn xây dựng một sản phẩm, triển khai nó trong một môi trường kiểm thử để chạy các bài kiểm soát về chất lượng, sau đó triển khai nó trên một hệ thống sản xuất trực tiếp nơi người dùng thực sự có thể sử dụng. Nếu như sản phẩm xảy ra vấn đề gì thì đội ngũ vận hành sẽ phải vào cuộc. 
Nhưng khi ranh giới giữa sản phẩm và việc vận hành phai nhạt dần - như cái tên DevOps đã nói lên - thì không quá khó để nhận ra rằng chính môi trường cũng là một phần trong sản phẩm.
Ông Carl còn nói thêm rằng: “Trách nhiệm của QA là phải khai thác được các code mới trong quá trình tạo nên sản phẩm, vậy nên đội DevOps mới cung cấp cho họ những công cụ khiến nút bấm triển khai màu xanh dương-xanh lá trở nên dễ dàng. Và sau đó đội ngũ QA của chúng tôi sẽ bắt đầu triển khai sản phẩm, xác nhận rằng các phần sửa đổi đều vận hành như mong đợi, mở các mã mới được triển khai và cũng sẽ xem xét lại nếu có bất kỳ vấn đề nào được phát hiện.

### Việc của QA trong mô hình DevOps là ngăn chặn chứ không phải tìm ra lỗi

QA đóng vai trò quan trọng trong cấu trúc tổ chức này bởi vì họ có khả năng và các lệnh dẫn hướng để đưa ra code khi nó đang hoạt động và thu lại khi nó không hoạt động. Đây là một quan niệm rất khác của các tổ chức QA từ 10 năm trước, những người có trách nhiệm chính là tìm bug. Các nhóm QA thời nay lại có nhiệm vụ là ngăn ngừa các lỗi truy cập xuất hiện trang web công cộng.
Câu này có thể hiểu theo các cách sau:

* QA chịu trách nhiệm cải tiến liên tục và theo dõi chất lượng trong toàn bộ  chu kỳ phát triển. Họ là những người chịu trách nhiệm chính trong việc xác định các vấn đề, không chỉ với sản phẩm mà còn với cả quá trình, và đưa ra những thay đổi bất cứ khi nào có thể.
* Các bài kiểm thử là code, các chuyên gia kiểm thử tự động sẽ nói với bạn như vậy, và tất nhiên, đó cũng là điều cần thiết. Nếu quá trình của bạn được thiết kế để đưa ra các phiên bản mới mỗi ngày (hoặc mỗi giờ) thì không thể kiểm thử theo cách thủ công được. Bạn sẽ phải phát triển một hệ thống tự động bằng code có thể đảm bảo rằng các tiêu chuẩn về chất lượng sẽ được duy trì.
* Các quy tắc về tự động hóa. Bất cứ thứ gì có thể tự động hóa đều nên được tự động hóa. Đây chính là điều Carl nói đến khi ông miêu tả quá trình triển khai của Unbounce bằng cụm từ “nút bấm dễ dàng.”
* Tester chính là người củng cố chất lượng, họ có ảnh hưởng đến cả quá trình phát triển và quá trình vận hành. Họ không chỉ tìm ra bug mà còn tìm kiếm bất kỳ cơ hội nào để cải thiện tính lặp lại và tính dự đoán được.

### Trên cả kiểm thử chức năng: Tự động hóa với kiểm thử về tải (Load Testing), kiểm thử về áp lực (Stress Testing) và kiểm thử về hiệu suất (Performance Testing).

Chúng ta đang sống trong thời kỳ mà QA đang biến đổi một cách đầy lý thú, vì dù rất nhiều tổ chức đã hoàn thiện có quy trình kiểm thử tự động về chức năng, họ cũng chỉ mới bắt đầu áp dụng những quy trình đó trong các lĩnh vực khác của kiểm thử như kiểm thử bảo mật và kiểm thử về áp lực.
Đặc biệt, kiểm thử về tải và kiểm thử về áp lực là các khía cạnh quan trọng với các tổ chức DevOps đang phát triển với tốc độ chóng mặt. Một nút thắt cổ chai kìm hãm sự phát triển nếu được triển khai trong một quy trình giao dịch quan trọng của một trang web thương mại điện tử có thể làm sụp đổ cả một doanh nghiệp. Bạn sẽ muốn làm tất cả những gì có thể để xác định các vấn đề bao quát trước khi sản phẩm được đưa vào môi trường sản xuất, và bạn cũng muốn theo dõi chặt chẽ hiệu suất sản phẩm sau khi phát hành.

### Kiến tạo nền văn hóa DevOps
Giám đốc Công nghệ của Unbounce, ông Carl Schmidt có đưa ra một vài lời khuyên hữu ích về nhóm DevOps của mình: “Chúng tôi không thích dùng từ đó, chúng tôi thích nói là chúng tôi có một văn hóa DevOps hơn.” DevOps  không phải là một giá trị riêng lẻ, mà là giá trị cốt lõi của một tổ chức phát triển. Nó hướng tới mục tiêu biến phầm mềm thành một dịch vụ động, chứ không phải một sản phẩm tĩnh.
Dù sao thì, tên gọi có là gì cũng không quan trọng (Hay gọi là DevQuops nhỉ?), và lý do duy nhất giúp DevOps hoạt động được là vì chất lượng đã được xây dựng trong toàn bộ hệ thống. Và bạn không thể đạt được điều gì quan trọng hơn thế.