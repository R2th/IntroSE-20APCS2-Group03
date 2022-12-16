Câu chuyện bắt đầu bằng việc trong những lần gặp gỡ với nhóm bạn 4 người của mình thì có tới 3/4 là làm tester. Không phải khi nào bọn mình cũng nói về chuyện công việc nhưng cũng không ít lần các bạn nói chuyện về test này, test kia, test case hay automation test. Thôi thì không chuyên cái mình làm nên chỉ nghe và về thử tìm xem các bạn nói gì vậy :smiley: . Bài này mình sẽ thử tìm hiểu xem automation test là gì và khả năng áp dụng của nó vào trong quá trình phát triển của sản phẩm như nào. Có gì sai sót mong các bạn tester chân chính bỏ qua :sob: .

Automation test là một phần quan trọng của quá trình phát triển để xây dựng nên một phần mềm mạnh mẽ và đáp ứng yêu cầu người dùng. Tuy nhiên, không phải công ty nào, dự án nào cũng đánh giá mức độ quan trọng cũng như áp dùng nó vào dự án thực tế. Nó có thể bị đánh giá là không cần thiết hoặc quá cồng kềnh. 

# Automation test là gì?
Automation test là là một quy trình phát triển bao gồm các công cụ để thực hiện các test case được xác định trước đối với một phần mềm dự trên một sự kiện. Những kiểm thử này thường liên quan đến các hoạt động lặp đi lặp lại cả và bản chất và kết quả của chúng.

Có rất nhiều cách khác nhau để các developer có thể kiểm tra code do họ viết. Hầu hết thời gian, các kiểm thử này được tiến hành thủ công (manual test). Automation test khác biệt bởi nó có một quy trình, hệ thống hay dịch vụ tiến hành các kiểm thử này để phản hồi  với việc các developer thay đổi code.

Bản chất của việc automation test cho các developer là tương đối rõ ràng: thực hiện các công việc được xác định trước (test) đối với một tập hợp các điều kiện tiên quyết và kết quả mong muốn dựa trên một sự kiện được kích hoạt (thay đổi code).

Với mô tả như trên ta có thể thấy là có vẻ đơn giản, nhưng trong thực tế thì việc tích hợp automation test vào quy trình làm việc của developer có thể mang nhiều sắc thái hơn. Có nhiều lợi ích liên quan đến automation test, tuy nhiên đi kèm với nó chính là các chi phí liên quan.

# Automation test trong thực tế cho các developer
Theo một các thông thường mà các developer vẫn đang làm thì chúng ta muốn kiểm tra đến các khía cạnh cụ thể của một ứng dụng. Có thể nói đến như là framework và các API. Nó có thể được kiểm tra thông qua cách chúng ta thực hiện unit test. Unit test thông báo cho các developer khi có sự thay đổi trong một đơn vị ảnh hưởng đến chức năng của đơn vị khác. Các framework có unit test thường được triển khai bằng cách sử dụng cùng một code được sử dụng bởi hệ thống được kiểm tra.

Có một vấn đề cần quan tâm là chi phí cho việc liên tục kiểm soát unit test đi cùng với việc thay đổi code liên tục. Ta có thể dành nhiều thời gian để viết và có các yêu cầu khắt khe để cho ta có thể cập nhật liên tục với sự thay đổi code. Tuy nhiên, chi phí đó nên được coi là một khoản đầu tư chính đáng vì sự hoạt động như mong đợi của code.

Automation test có thể thúc đẩy các bài kiểm tra unit test như một phần của quá trình phát triển. Ví dụ, một IDE có thể chạy các kiểm thử này sau khi quá trình xây dựng ứng dụng được hoàn thành. Hoặc trong một kịch bản phức tạp hơn, hệ thống có thể được thiết lập để chạy chạy unit test theo lịch trình có sẵn. Dù sử dụng cấu hình nào, sẽ có những kết quả đạt được thông qua automation test loại này. 

Một khía cạnh khác của kiểm thử là mục tiêu nhắm đến UI. Điều này tương tự ở một số khía cạnh so với unit test theo nghĩa là kiểm thử UI có thể nhỏ và tập trung vào các khía cạnh cụ thể của một ứng dụng. Tuy nhiên, nó có sự khác biệt ở việc chạy các kiểm thử này với các phần của UI có trong thời gian chạy. Điều này đòi hỏi cơ sở hạ tầng của hệ thống hỗ trợ. Nó cũng đòi hỏi một khuôn khổ để làm chủ các bài kiểm thử này. Các framework cung cấp các khối xây dựng cần thiết để kiểm tra UI. Tuy nhiên, chúng cũng bị giới hạn trong một môi trường tương tự như unit test.

Một số giải pháp cung cấp phương tiện để ghi lại sự tương tác của người dùng với ứng dụng như một phương tiện để thực hiện các kiểm thử này. Chúng hoạt động như một trình tạo mã các bài kiểm tra bằng cách xem tất cả các tương tác mà người dùng có với một ứng dụng và sử dụng nó để làm các bài kiểm thử. Các kiểm thử này có thể được sửa đổi để phù hợp với các yêu cầu khác nhau.

Có rất nhiều framework để kiểm thử đối với các đơn vị có sẵn. Mỗi framework có giá trị riêng và việc lựa chọn loại này tùy thuộc vào tính năng cần thiết và trình độ chuyên môn của nhóm phát triển. Các framework này cung cấp cơ sở hạ tầng và các chức năng cần thiết để kiểm tra code.

# Một số tiêu chí cho Automation test
Có nhiều giải pháp và sản phẩm hiện tại hỗ trợ cho automation test. Một số tích hợp trực tiếp và môi trường phát triển với cơ sở hạ tầng hỗ trợ ít hoặc không có. Trong khi một số khác có thể yêu cầu cấu hình phức tạp hơn. Một số lại được xây dựng để hỗ trợ các nhà phát triển cá nhân, trong khi một số lại được xây dựng theo quy mô để hỗ trợ các nhóm. Việc bạn lựa chọn loại hình nào thì tất nhiên là do bạn, tuy nhiên hãy xem xét các tiêu chí sau:
* Ứng dụng hay hệ thống bạn đang kiểm thử thuộc loại nào? Ví dụ là một ứng dụng máy tính hay một trang web với các tích hợp hệ thống phụ trợ? Giải pháp automation test của bạn có nhắm mục tiêu vào chúng?
* Cơ sở hạ tầng có khả năng hỗ trợ automation test hay không?
* Làm thế nào để tích hợp các bài kiểm thử vào automation test? Quản lý kiểm thử và bảo trì chịu một chi phí đáng kể liên quan đến các giải pháp automation test.
* Giải pháp automation test của bạn có tích hợp với các công cụ và môi trường phát triển hiện có của bạn không?
* Những khả năng báo cáo có sẵn từ giải pháp automation test của bạn? Làm thế nào để bạn biết nếu bài kiểm thử của bạn đã pass hay fail? Bạn có thể được một cái nhìn chi tiết về quá trình thực hiện các bài kiểm thử để có thể quan sát tiến trình theo thời gian?
* Làm thế nào để các bài kiểm thử có thể chạy qua giải pháp automation test của bạn? Có phải chúng được kích hoạt dựa trên các sự kiện nhất định? Chúng có thể được lên lịch để chạy vào một thời điểm nhất định trong này? Một số lần chạy kiểm thử có thể mất nhiều thời gian để thực hiện.

Việc trả lời được những câu hỏi trên sẽ giúp bạn hướng tới một giải pháp automation test phù hợp đối với hệ thống bạn đang thực hiện.

# Nên hay không?
Bằng chứng cho việc các developer sử dụng và hỗ trợ automation test là tương đối rõ ràng. Nó có tác động mạnh mẽ đến năng suất của developer khi được tích hợp đúng vào quy trình làm việc. Mặc dù có các chi phí liên quan đến automation test. Chúng được khấu  hao trong suốt thời gian của dự án và thậm chí nó có thể giúp bạn tiết kiệm thời gian và tiền bạc trong thời gian dài.

Việc quyết định kết hợp automation test sẽ dựa trên phân tích chi tiết về các yêu cầu và quy trình phát triển để xây dựng nên phần mềm. Cần một sự tiếp cận đo lường khi đánh giá các lựa chọn. Triển khai chúng một cách cô lập, sử dụng chúng trong một thời gian và xem xét các tác động tích cực/ tiêu cực mà chúng cho bạn và nhóm của bạn.

# Kết luận
Đây là bài viết tương đối tổng quan về vai trò cũng như đánh giá về vai trò của automation test đối với một ứng, một phần mềm. Chúng ta không phải khi nào cũng áp đặt cần sử dụng cái này cái kia cho toàn bộ dự án. Cần đánh giá về mức độ cần thiết và khả năng bào trì đối với việc áp dụng automation test. Đối với những hành động mang tính cố định có ít sự thay đổi nhiều hay có các điều kiện liên quan nhiều đến hệ thống thì việc sử dụng automation test có thể mang lại hiệu quả cao.

Ở bài tiếp theo mình sẽ tìm hiểu chi tiết về các công cụ sử dụng cho automation test và chi tiết hơn về quy trình thực hiện nó. Với một người ngoại đạo "test" mong sẽ bớt gạch đá nếu có sai lầm nào trong nội dung bài viết.