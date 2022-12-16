Trong ba năm qua, API Tin Can đã nổi lên như một tiêu chuẩn mới cho việc đào tạo trực tuyến. Còn được gọi là API trải nghiệm (xAPI), Tin Can thường được mô tả là sự phát triển tiếp theo của SCORM. Trong khi tiêu chuẩn SCORM không sớm đi đâu, Tin Can đã định nghĩa lại một số thực hành cơ bản để theo dõi kinh nghiệm học tập. Nhưng Tin Can API là gì? Và tại sao nhiều chuyên gia tin rằng nó sẽ sớm trở thành tiêu chuẩn mặc định cho nội dung eLearning? Đây là lý do tại sao.

**Tin can API là gì?**

Đặc tả [SCORM](https://www.learnupon.com/blog/our-approach-to-scorm-in-learnupon/)giới thiệu vào năm 1999.[SCORM](https://www.learnupon.com/blog/to-scorm-or-not-to-scorm-that-is-the-question/) nhanh chóng trở thành tiêu chuẩn mà toàn bộ ngành công nghiệp của các công cụ authoring, hệ thống quản lý học tập và phát triển nội dung được xây dựng. Nhưng khi eLearning tiếp tục phát triển, SCORM vật lộn để tái tạo lại chính nó để theo kịp. Trong khi [SCORM 1.2](https://scorm.com/wp-content/assets/cookbook/SCORM%201_2%20Overview.htm) vẫn là tiêu chuẩn soạn thảo phổ biến nhất được sử dụng trong eLearning, những điểm yếu của nó đã kích hoạt sự phát triển của [API Tin can](https://xapi.com/)
Phần mềm Rustici tin rằng "việc học tập xảy ra ở mọi nơi". Niềm tin đó đã truyền cảm hứng cho nghiên cứu của Rustici về cách đặc tả SCORM có thể được điều chỉnh cho phù hợp với thế hệ tiếp theo của eLearning. API Tin Can chúng tôi hiện đang sử dụng là kết quả của công việc đó. Rustici [ đã chọn cái tên "Tin Can"](https://xapi.com/overview/) để mô tả các cuộc trò chuyện hai chiều mà công nghệ sẽ theo dõi vì nó giúp việc học các hệ thống giao tiếp với nhau dễ dàng hơn.
Sự [khác biệt chính giữa](https://xapi.com/scorm-vs-the-experience-api-xapi/) nội dung [Tin Can và SCORM](https://xapi.com/scorm-vs-the-experience-api-xapi/) là loại hình học tập mà mỗi người có thể theo dõi. Mặc dù SCORM bị hạn chế trong việc ghi lại việc học trực tuyến, Tin Can có thể theo dõi hầu hết mọi hoạt động. Kết quả là, Tin Can mang đến cái nhìn chi tiết hơn về sự tiến bộ của người học, trong và ngoài các môi trường học tập truyền thống, cả trực tuyến và ngoại tuyến. Các loại học tập mà nó có thể theo dõi gần như vô hạn, bao gồm: đọc một trang web, tham dự một sự kiện, mượn sách thư viện, chơi trò chơi, học tập pha trộn và học tập theo nhóm.

**Tin can API hoạt động như thế nào?**

Thông tin từ các hệ thống tuân thủ của Tin Can được thông qua dưới hình thức phát biểu. API Tin Can đơn giản hóa cách học tập được ghi lại bằng cách cung cấp nhiều cách để theo dõi các báo cáo này. Mỗi câu lệnh bao gồm ba phần tử, một cấu trúc được gọi là cú pháp của Tin Can:

Danh từ (diễn viên - hoặc 'ai' là một phần của một hành động)
Động từ (Hành động)
Object (Phần 'cái gì' của một hành động)
Ví dụ:

"Tôi đã làm - điều này" 
"Mary - hoàn thành - đào tạo về sức khỏe và an toàn" 
"John - đọc - Hướng dẫn trợ giúp của LearnUpon".
![](https://images.viblo.asia/dce441a7-5456-407e-aa6e-9174e87e38e3.gif)
Tin Cần sử dụng các câu lệnh này để theo dõi dữ liệu về hành động của người học và báo cáo lại cho hệ thống quản lý học tập, Learning Record Store (LRS), hoặc bất kỳ ứng dụng nào hiểu ngôn ngữ Tin Can.

**Vai trò của Learning Record Store?**

LRS chuyên quản lý dữ liệu về trải nghiệm học tập. Mặc dù nó có thể được tích hợp với một LMS, bản thân LRS là một sản phẩm riêng biệt. LRS không cần thiết để sử dụng Tin Can. Khi một LMS là Tin Can tuân thủ, nó có thể theo dõi, lưu trữ và báo cáo về các báo cáo có liên quan. LearnUpon không phải là một LRS, ví dụ, nhưng lưu trữ, theo dõi và báo cáo về Tin Can báo cáo cho hàng trăm khách hàng. LearnUpon cũng có thể tích hợp với LRS nếu bạn cần chức năng phân tích nâng cao.

Một số nhà cung cấp LRS chính bao gồm:
[Sáp LRS](https://www.waxlrs.com/?utm_medium=affiliate&utm_source=learnupon) (Được đề xuất bởi chúng tôi dựa trên kinh nghiệm của chúng tôi về các nền tảng hàng đầu)
[WaterShed](https://www.watershedlrs.com/)
[Khóa học](https://www.ht2labs.com/learning-locker-community/overview/)
[GrassBlade LRS](https://www.nextsoftwaresolutions.com/grassblade-lrs-experience-api/)

**Những lợi ích của Tin can API**
Tính linh hoạt của nó làm cho Tin Can thực sự phù hợp với môi trường hiện tại, trong đó người học truy cập tất cả các loại vật liệu ở tất cả các loại địa điểm. Bây giờ chúng ta có thể học bất cứ đâu: trong khi đi du lịch để làm việc, làm công việc của chúng tôi, hoặc giao lưu với bạn bè. Tin Can cho phép chúng tôi theo dõi tất cả những trải nghiệm học tập này theo một định dạng đơn giản, nhất quán.

Bởi vì Tin có thể theo dõi tất cả các kinh nghiệm học tập, nó cho phép bạn nắm bắt hoạt động của từng học viên và xem bức tranh lớn hơn. Thuật ngữ “người học định lượng” đã xuất hiện để mô tả khả năng theo dõi dữ liệu học tập cá nhân bằng cách sử dụng công nghệ. Dữ liệu được thu thập có thể rất có giá trị đối với một tổ chức. Nó có thể được sử dụng để xem lại kinh nghiệm học tập trước đó. Hoặc nó có thể được phân tích để lập kế hoạch cho các dự án trong tương lai bằng cách lập bản đồ những gì người học biết về những gì họ cần biết. Phân tích có thể được sử dụng để xác định mục tiêu mà người học có thể làm việc theo hướng. Bản chất chi tiết của dữ liệu cũng giúp người quản lý dễ dàng báo cáo về ai đã hoàn thành thành phần đào tạo nào. Kết quả là một sự hiểu biết rõ ràng hơn về kinh nghiệm đào tạo của người học của bạn.

**Các giới hạn của Tin can API**

Một số tổ chức tin rằng việc áp dụng tiêu chuẩn Tin Can sẽ tự cung cấp nội dung khóa học được thiết kế đẹp mắt. Điều đó không đúng. Sử dụng Tin Can sẽ không thay đổi bản trình bày hoặc thiết kế của khóa học theo bất kỳ cách nào. Thông số của Tin Can sẽ không giúp bạn cải thiện trải nghiệm người dùng hoặc giao diện người dùng. Nội dung của bạn sẽ vẫn trông và hành xử theo cùng một cách. Tin Chỉ có thể kiểm soát cách dữ liệu được theo dõi và lưu trữ. Chất lượng của nội dung eLearning sẽ vẫn được xác định bởi chất lượng của công cụ soạn thảo và Thiết kế giảng dạy được sử dụng để tạo ra nó. Và trong khi Tin Can tốt hơn trong việc theo dõi eLearning trên thiết bị di động, việc sử dụng định dạng sẽ không tự động cung cấp nội dung khóa học đáp ứng.