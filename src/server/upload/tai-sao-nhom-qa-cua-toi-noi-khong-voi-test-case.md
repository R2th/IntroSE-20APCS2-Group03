Mới đọc tiêu đề có lẽ nhiều người đặt biệt là các QA sẽ đặt ra câu hỏi: cái gì, kiểm thử mà không cần test case á? Thế thì làm sao mà follow được việc kiểm thử đã đi tới đâu, lỗi ở case nào bla bla? đúng không ạ?

Nghe mới thú vị làm sao nhỉ? Thật sự là từ hồi mình làm Tester tới giờ chưa có dự án nào là không yêu cầu viết Test case cả (ít nhất thì cũng phải viết Checklist). Vậy thì hãy xem việc kiểm thử không cần Testcase của tác giả bài viết này làm như thế nào nhé!

Vào năm 2013, Candy Crush trở thành game đứng đầu trong App Store, chú mèo Grumpy Cat thì làm mưa làm gió trên Internet còn tôi thì được giới thiệu 1 cách kiểm thử phần mềm hiệu quả hơn đó là **Không sử dụng Test case.**

Phần mềm của tôi bắt đầu kiểm thử từ năm 2008, khi mà tôi bắt đầu làm việc cho 1 công ty startup nhỏ với trong bộ phận hỗ trợ khách hàng. Tôi đã được giới thiệu các chức năng mới được phát triển và tôi có cơ hội được kiểm thử những tính năng này khi chúng được đưa vào môi trường production.

Qua nhiều năm, khi mà chúng tôi thêm nhiều tính năng phức tạp hơn, việc tìm và tái hiện lại các lỗi trở nên khó hơn. Tôi bắt đầu đọc về việc người khác kiểm thử phần mềm như thế nào và tôi đã nhanh chóng đi đến 1 kết luận là đó không phải là một nghề tôi muốn theo đuổi. Mọi thứ tôi đọc trên mạng mô tả phương pháp tiếp cận thác nước đều thấy là các Dev gửi các yêu cầu cho các Tester hàng nhiều tuần hoặc nhiều tháng trước đó, và các Tester được mong đợi là sẽ nghĩ tới và thực hiện được hết các Test case 1 lần khi mà các Dev kết thúc.

Đến năm 2013. Tôi đã liên hệ với một người bạn mà vừa mới tham gia nhóm đảm bảo chất lượng với vai trò hỗ trợ khách hàng cho 1 nhà cung cấp phần mềm tiên tiến. Tôi hỏi làm thế nào mà anh ấy lại thích vai trò mới của mình, và anh ấy đã thao thao bất tuyệt với tôi một cách phấn khích. Khi tôi hỏi làm thế nào anh ấy có thể rất là hào hứng với việc kiểm thử thông qua hàng trăm các Test case hay viết Test case cho chức năng mới, và anh ấy đã trả lời rằng: "Chúng tôi không làm điều đó; chúng tôi kiểm thử thăm dò."
![](https://images.viblo.asia/ea9ffe82-6650-4d8c-9ca1-72c56c47f7d5.jpg)


Tôi đã tham gia nhóm đó và đã mọi thứ đã phát triển rất tốt mà không có Test case kể từ đó.

Tôi không hy vọng rằng tất cả các ngành công nghiệp hay các công ty phần mềm có thể áp dụng mọi thứ tôi làm, nhưng tôi khuyến khích bạn nên mở mang đầu óc, thách thức niềm tin của bạn và xem xem liệu bạn có thể áp dụng bất kỳ điều gì cho tình huống của mình không. Với suy nghĩ như thế thì đây sẽ là lời khuyên của tôi.

### Làm việc hướng tới việc hiểu phần mềm bạn đang kiểm thử ở một mức độ cao

![](https://images.viblo.asia/500752f7-32a8-42f0-a17a-0803057d91b4.jpg)

Đây là yếu tố lớn nhất cần để bỏ qua hàng núi các Test case mà bạn và công ty của bạn đã tích lũy. Tư duy của nhóm bạn phải thay đổi từ việc được thông tin đầu vào và đầu ra chính xác,  đã được thiết kế trong nhiều tháng hoặc nhiều năm trước đó, cho đến việc tự kiểm thử thăm dò hệ thống. Có nhiều cách để thực hiện điều này.

Trong công ty của tôi, chúng tôi có một loạt các video đào tạo tự phát triển bản thân cho các thành viên nhóm mới bao gồm các tính năng sản phẩm hướng tới khách hàng, cùng với các trang cấu hình Admin. Điều này đã cho phép nhóm kiểm thử tiếp cận việc kiểm thử từ 1 quan điểm có hệ thống.

Vì chúng tôi xem xét hệ thống vận hành như thế nào 1 cách tổng thể, nên nhóm kiểm thử hiểu rõ hơn về cách các phần khác nhau của phần mềm ảnh hưởng lẫn nhau như thế nào. Việc có một sự hiểu biết rộng về hệ thống sẽ tạo thành một bệ phóng tuyệt vời để tìm hiểu sâu hơn và khám phá các tính năng mới hoặc tính năng hiện có trong hệ thống.

### Tạo 1 bản đồ tính năng
Bản đồ tính năng là 1 công cụ khác mà chúng tôi sử dụng để giúp cho chúng tôi có 1 tư duy hiểu biết ở mức độ cao. Bản đồ của chúng tôi gồm một danh sách tất cả các trang của hệ thống với một mô tả ngắn gọn hay danh sách các liên kết / tính năng mà có sẵn trên trang đó.

Các thành viên mới của nhóm có thể sử dụng bản đồ này để làm quen với phần mềm hoặc họ có thể tham chiếu nó khi khám phá một phần mới của hệ thống, điều này giúp họ hình dung ra toàn bộ hệ thống.

Chúng tôi cũng có thể sử dụng công cụ này để hồi quy phần mềm cho việc nâng cấp code version, di chuyển cơ sở hạ tầng mới hay thay đổi rủi ro trên toàn trang web như cập nhật quyền hạn của người dùng. Tài liệu đơn giản này không có nhiều chi tiết về cách các tính năng hoạt động như thế nào; chúng tôi sử dụng nó như 1 công cụ để châm ngòi cho các ý tưởng kiểm thử, hoặc như đơn giản chỉ như là một lời nhắc nhở về phạm vi của các tính năng nhất định.

### Có được sự am hiểu sâu sắc về các tính năng cụ thể trong nhóm của bạn

Khi mà một thành viên mới đã đi qua giai đoạn nhập môn, niềm vui thực sự bắt đầu. Tuần thứ ba, những tester mới tham gia một nhóm phân phối sản phẩm bao gồm các dev, 1 designer, 1 PM và các tester. Trong nhóm này, các tester là một một phần tích hợp của một nhóm agile mà tham gia vào các kế hoạch sprint, các cuộc họp sàng lọc và sự hồi tưởng.
 
Trên các nhóm phân phối này, chúng tôi thêm chức năng mới cho hệ thống thông qua các tính năng mới,sự tích hợp, sự tái cấu trúc và sửa lỗi. Trong mỗi khu vực, cả các dev và tester làm việc cùng nhau để tinh chỉnh các user story của người dùng, thiết lập các tiêu chí chấp nhận được và đưa ra hướng kỹ thuật rõ ràng về việc vấn đề được giải quyết như thế nào.

Cuộc họp sàng lọc cũng là một nơi tuyệt vời để những người kiểm thử thách thức các tiêu chí chấp nhận được và có cuộc trò chuyện với các dev về các khu vực mà họ dự định áp dụng kiểm thử thăm dò. Khi bạn làm điều này thì có thể sẽ tìm thấy lỗi trước khi chúng được mã hóa, điều đó sẽ đem lại hiệu quả rất lớn.

Khả năng xác định các khu vực phức tạp hoặc có vấn đề đến từ việc biết tính năng mới đang được xây dựng và bằng cách tham gia vào các cuộc thảo luận của dev. Nếu bạn biết rằng dev đang lên kế hoạch giải quyết vấn đề bằng 1 giải pháp không đồng bộ với đồng bộ, bạn có thể thay đổi cách bạn kiểm thử tính năng. 

Việc có được sự am hiểu sâu sắc về tính năng hoặc chức năng mới cho phép nhóm phát triển cung cấp được phần mềm chất lượng cao hơn bằng cách xác định và sửa những khiếm khuyết không rõ ràng đó.

### Tạo ra 1 tài liệu tốt đối với những thứ không đơn giản
Phần lớn các tính năng trong 1 phần mềm được thiết kế tốt thì rất đơn giản và không cần phải có tài liệu để được là hiểu sản phẩm được dùng để làm gì.

Việc có các Test case cho các việc đơn giản như thế này thì không có ý nghĩa gì cả. Tuy nhiên, có 1 số thứ thì có thể yêu cầu tài liệu phải viết chuẩn và dễ để thực hiện theo. Câu hỏi tôi đặt ra cho nhóm của mình khi xác định liệu cái gì đó cần tài liệu hay không là: "Bạn có cần 1 cuộc trò chuyện với bất kỳ ai để hoàn thành việc kiểm thử không?" Nếu câu trả lời là có, thì có lẽ bạn cần một số loại tài liệu.

Một số ví dụ về điều này sẽ là khi kiểm thử các batch job phức tạp, hay có sự tích hợp của bên thứ ba, hay các tính năng ẩn có thể không được liệt kê trong phần mềm hoặc các tác vụ kiểm thử kỹ thuật. 

Nhóm kiểm thử của chúng tôi có một wiki nơi mà chúng tôi chia sẻ và cập nhật thông tin về cách kiểm thử các phần phức tạp này. Ý tưởng là một khi mà tester đã tìm ra nó, thì tester đó nên tạo tài liệu để đưa cho bất kỳ tester nào khác xem nó cũng cũng có thể hiểu được cho dù là không có kiến thức sâu về tính năng này.

### Viết kiểm thử tự động cho các đường dẫn quan trọng
![](https://images.viblo.asia/7ec8e3d0-f1bc-41a4-84bc-cfbd7e472e50.jpg)


Một trong những lý do chính khiến cho các test case trở thành tiêu chuẩn trong hầu hết các tổ chức là trong hệ thống phần mềm của chúng tôi có những đường dẫn quan trọng luôn luôn hoạt động. Đây là những khu vực mà người dùng của chúng tôi phụ thuộc vào rất nhiều và những chỗ đó thì nên được cư xử 1 cách nhất quán. Đối với những đường dẫn quan trọng này, tôi khuyên bạn nên có một số  kiểm thử tự động.

Đây không phải là một việc cho các thực tập kiểm thử làm được. Để viết được kiểm thử tự động nhất quán, bền vững, đáng tin cậy thì cần dựa vào các dev của bạn để được hướng dẫn hoặc ai đó đã kiểm thử tự động thành công. Điều này không dễ để hiểu đúng, nhưng một khi bạn có một bộ test case kiểm thử tự động tốt, đáng tin cậy, bạn sẽ có sự tự tin cao hơn về chất lượng của các bản release của mình đấy.

### Kiểm thử hồi quy có mục tiêu
Vào năm 2014, chu trình kiểm tra hồi quy hoàn chỉnh của chúng tôi phải dùng một nhóm làm trong hai tuần để hoàn thành. Đó là những ngày mà chúng tôi cứ 2 tháng release 1 lần và chúng tôi sẽ kiểm thử bản đồ tính năng của mình. Có nhiều thứ đã thay đổi kể từ đó.

Bây giờ chúng tôi triển khai các tính năng chính theo chu trình 2 tuần 1 lần và chúng tôi có thể triển khai việc sửa lỗi vào bất kỳ ngày nào, vào bất kỳ giờ nào. Với việc sử dụng kiểm tra tự động cho các đường dẫn quan trọng, chúng tôi vẫn thực hiện kiểm thử hồi quy có mục tiêu. Trước khi release, chúng tôi có 1 một mã đóng băng, trong thời gian đó không có mã mới nào có thể được thêm vào nhánh mã phát hành được đề xuất của chúng tôi.

Trong thời gian này, nhóm kiểm thử làm việc cùng nhau, xem xét các tính năng và bản sửa lỗi sẽ được phát hành để đánh giá rủi ro của từng mục. Chúng tôi thực hiện nhanh chóng, việc kiểm thử hồi quy có mục tiêu để đảm bảo rằng không có sự cố hợp nhất code nào xảy ra và những gì sẽ được triển khai phù hợp với thử nghiệm trước đó được thực hiện bởi các tester trong nhóm tính năng.

Để theo dõi những gì đã được kiểm thử, chúng tôi sử dụng các phiên kiểm thử thay vì các test case. Mặc dù 1 test case là từng bước, danh sách các hành động được thiết kế sẵn nhằm kiểm tra xem một tính năng có hoạt động như dự định theo như các tham số đã được đưa ra hay không, 1 phiên kiểm thử là một tạo tác được tạo bởi tester trong khi thực hiện kiểm thử thăm dò.

Một phiên kiểm thử được liên kết với mỗi user story hoặc ticket lỗi. Chúng tôi theo dõi những gì đã được kiểm thử, ai đã kiểm thử nó, trong môi trường nào và với dữ liệu kiểm thử nào. Chúng tôi cũng sử dụng các phiên kiểm thử này để truyền đạt mọi thứ chúng tôi đã kiểm thử để giảm thiểu rủi ro. Ý tưởng là khi ticket đã sẵn sàng được phát hành, bất kỳ thành viên nào trong nhóm cũng có thể xem lại phiên kiểm thử đó và hiểu chắc chắn về những gì đã được kiểm thử.

### Hãy thử nó cho bản thân mình
![](https://images.viblo.asia/32d8807c-27ad-466e-812e-9989241242c0.png)

Tôi không ghét các test case. Có những thời điểm và những nơi mà một tập các test case tạo ra rất nhiều ý nghĩa. Tôi cũng sẽ không bao giờ nói với các tester rằng công việc của họ ít có giá trị hơn vì họ đang sử dụng rất nhiều test case.

Nhưng tôi sẽ nói với họ rằng có nhiều cách hiệu quả hơn để kiểm thử 1 lỗi hoặc 1 tính năng. Nếu bạn không tin tôi, hãy thử các kỹ thuật tôi đã nêu ở trên cho chính mình. Bạn sẽ thấy rằng đó là một lựa chọn tốt hơn nhiều so với việc phải thực hiện một loạt các test case.

Thực sự thì mình cũng chưa bao giờ làm điều này, có lẽ trong tương lai không xa mình cũng nên thử xem sao nhỉ. Người ta gọi là được ăn cả, ngã về không đó =))

Bài viết được dịch từ link: https://techbeacon.com/app-dev-testing/why-my-qa-team-says-no-test-cases