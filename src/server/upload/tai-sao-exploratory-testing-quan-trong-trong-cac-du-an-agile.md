Ngày nay khi hầu hết các tổ chức đang sử dụng mô hình Agile, kiểm thử hiệu quả đã trở thành một thách thức. Như chúng ta biết, Agile là một quy trình lặp đi lặp lại để phát triển phần mềm và có thể nói đó là time-boxed. Nó có nghĩa là bạn có một khung thời gian nhất định, trong đó bạn phải thu thập các yêu cầu, lập kế hoạch, phát triển, thử nghiệm và phát hành (và lặp lại). Nếu đội lập trình cung cấp cho bạn mã để kiểm tra vào cuối của đợt release thì bạn sẽ cần phải trì hoãn việc release hoặc phải kiểm thử lại rất cẩn thận để bạn không bỏ lỡ các lỗi nghiêm trọng.

Trong bài viết này, chúng ta sẽ thấy tầm quan trọng của exploratory testing trong các dự án trong mô hình Agile. Exploratory testing như chúng ta biết là phương pháp kiểm thử tự do hoặc độc lập. Bạn không có bất kỳ cấu trúc test cases nào ở đây và phụ thuộc vào các trường hợp ngẫu nhiên dựa trên kinh nghiệm trong quá khứ của bạn và mức độ hiểu biết của bạn về các yêu cầu. Nó có thể có lợi trong một mô hình Agile.

## **I. Exploratory testing là gì**

![](https://images.viblo.asia/9c754197-f9bb-4ff7-8c0b-c4cc6e2e78d2.jpg)


***"Exploratory testing"*** (kiểm thử thăm dò) - như tên gọi cho thấy, là một quá trình tìm hiểu, thiết kế kịch bản kiểm thử và thực hiện kiểm thử đồng thời. Có thể nói rằng, kế hoạch kiểm thử, phân tích, thiết kế, và thực hiện kiểm thử, tất cả được hiện đồng thời và ngay lập tức.

QA (nhân viên kiểm thử) sẽ tạo ra hoặc viết ra một ý tưởng kiểm thử để đưa ra hướng, và khám phá hệ thống trong khi kiểm thử để tạo thêm các trường hợp quan trọng, thiết thực và hữu ích để kiểm thử thành công một ứng dụng. Những người kiểm thử liên tục đưa ra quyết định về bước hành động tiếp theo của mình. Nó hoàn toàn phụ thuộc vào kinh nghiệm và khả năng của người kiểm thử.

Đôi khi phương pháp kiểm thử này có thể có lợi hơn so với phương pháp kiểm thử chính thức để tìm ra một số lỗi không tìm thấy trong phương pháp kiểm thử chính thức.

QA sẽ biết ứng dụng tốt hơn trong khi khám phá và tìm hiểu về tất cả các chức năng mà ứng dụng cung cấp. Phương pháp kiểm thử này rất tốt nếu đứng trên quan điểm của khách hàng khi kiểm thử để đảm bảo việc kiểm thử thành công của một ứng dụng.


***Exploratory testing thích hợp sử dụng trong các trường hợp nào?***

*  Khi ứng dụng không có tài liệu đặc tả yêu cầu hoặc không có tài liệu tối thiểu cho việc kiểm thử (testplan, checklist, test design,…) 
*  Khi bạn muốn hoàn thành việc kiểm thử trong thời gian ngắn
*  Khi bạn phải kiểm thử ứng dụng sớm trong một chu kỳ phát triển phần mềm


***Ưu điểm :***


*  Không yêu cầu chuẩn bị tài liệu cho quá trình kiểm thử
*  Thời gian kiểm thử được rút ngắn bởi tất cả các nhiệm vụ trong quá trình kiểm thử được làm đồng thời như kiểm tra, thiết kế kịch bản kiểm thử và thực hiện các kịch bản kiểm thử
*  QA có thể báo cáo nhiều vấn đề do yêu cầu không đầy đủ hoặc tài liệu yêu cầu còn thiếu


***Nhược điểm :***


*  Một số vấn đề không được thực hiện trong phương pháp này
*  Những đánh giá về việc lập kế hoạch kiểm thử và thiết kế các trường hợp kiểm thử, kích bản kiểm thử trong khi thử nghiệm có thể gây ra vấn đề
*  QA phải nhớ kịch bản kiểm thử, những gì mà họ đang thực hiện bởi khi phát hiện ra lỗi, QA phải báo cáo, log bug với các bước họ đã làm để tái hiện lỗi một cách chính xác. Sẽ khó khăn để tái hiện chính xác một bug khó hoặc phải thực hiện quá nhiều bước

Với những ưu và nhược điểm trên, exploratory testing sẽ có giá trị như nào khi áp dụng vào mô hình Agile?



## **II. Lợi ích khi sử dụng Exploratory testing trong mô hình Agile**

![](https://images.viblo.asia/3b4970aa-be7d-4c2d-aba2-0c20c5f22600.png)


### **1. Quản lý thời gian**

Như đã đề cập ở trên, mô hình Agile có thời hạn chặt chẽ và cả nhóm chỉ có vài tuần để hoàn thành mọi thứ, điều rất quan trọng là phải hiểu và kiểm tra (đặc biệt là tất cả các tính năng mới được thêm vào) trong khung thời gian đó. Exploratory testing cung cấp một cách tốt hơn để đối phó với thời hạn đó. 

Khi bạn đã hiểu rõ các yêu cầu một cách rõ ràng, bạn có thể thực hiện exploratory testing một cách hiệu quả. Nó cũng được xem như là một cách free test, bạn không phải xác định các test cases mà bạn thực hiện nhưng phải ghi ra những trường hợp dẫn đến lỗi. Bằng cách này, không chỉ bạn đang bỏ công sức vào đúng nơi mà còn tìm ra những lỗi có thể bị bỏ lỡ do thời gian giới hạn.

### **2. Tìm ra lỗi quan trọng**

Khi bạn lặp đi lặp lại việc release một phần của dự án mỗi tháng hoặc vài tuần một lần, bạn đã tự động hóa một số test cases hồi quy (regression test cases), một số test cases chức năng (functional test cases) và một số test cases mà trước đó chỉ thực hiện được bằng việc kiểm thử thủ công (test manual). Chúng hữu ích trong trường hợp khi các tính năng đã tồn tại, nếu trong lần lặp này, có một số tính năng mới được thêm vào ứng dụng thì bạn sẽ cần phải hiểu chúng đúng cách rồi viết các test cases cho nó và cuối cùng, tự động hóa chúng. 

Có quá nhiều việc để làm trong một khoảng thời gian ngắn đúng không? Exploratory testing chủ yếu tập trung vào các tính năng mới được thêm vào dễ bị nhiều lỗi hơn, sau đó đã được kiểm tra và các tính năng hiện có. Bạn không chỉ bắt được những lỗi quan trọng bằng cách thực hiện exploratory testing mà còn giúp nhóm của bạn đáp ứng thời hạn.

### **3. Đưa ra các trường hợp kiểm thử hiệu quả**

Đây là sự tiếp nối trước đó của các lỗi quan trọng được tìm thấy bằng cách sử dụng exploratory testing. Khi bạn nói đã tìm thấy 10 lỗi trong tính năng mới, bạn có thể ghi lại từng trường hợp và viết test case của những lỗi đó. Đây sẽ là tập hợp các test cases chủ yếu tập trung vào tính năng mới và đủ hiệu quả để tìm các lỗi quan trọng. 

Ví dụ, nếu bạn phải test một ứng dụng di động, bạn có thể thử nghịch phá ứng dụng đó như end-user, theo cách này bạn sẽ thực sự sử dụng ứng dụng như một người dùng thực và có thể tìm thấy các lỗi có khả năng xảy ra nhất khi người dùng sử dụng ứng dụng đó trong môi trường thời gian thực.

### **4. Nâng cao hiểu biết về tổng thể ứng dụng**

Khi bạn thực hiện free test hoặc kiểm thử không có cấu trúc, bạn không phải kiểm thử theo những test case cố định, bạn có thể sáng tạo hơn. Một khi bạn đã hiểu rõ các yêu cầu, bạn có thể thực hiện các test cases khám phá (exploratory test cases) để có được ý tưởng chính xác về chức năng và bạn càng sử dụng ứng dụng đó một cách tự do, bạn càng biết và hiểu nó hoạt động như thế nào. 

Nếu bạn đang thực hiện exploratory testing trong mỗi bản phát hành, thì bạn sẽ cảm thấy sự khác biệt trong sự hiểu biết của bạn về ứng dụng đã được cải thiện đến một mức độ lớn.

### **5. Có lợi trong trường hợp yêu cầu thay đổi nhanh chóng**

Mô hình Agile không thể đoán trước khi chúng ta nói về các yêu cầu. Khách hàng có thể thay đổi yêu cầu của mình bất cứ lúc nào, đó là lý do tại sao Agile linh hoạt để sử dụng và phát triển. Nhưng đối với đội kiểm thử, nó trở thành một thách thức để kiểm tra các yêu cầu thay đổi ở giữa vòng đời phát triển một cách hiệu quả. Trong những trường hợp như vậy, exploratory testing mang lại lợi ích to lớn khi bạn không có thời gian để lên kế hoạch cho các test case của mình vì thời gian gấp rút để xác định các yêu cầu mới cần kiểm thử. Nếu tự tin, bạn có thể kiểm tra các trường hợp quan trọng nhất và có thể yên tâm rằng ứng dụng ổn định

### **6. Tương thích với thời gian ngắn của phương pháp Scrum**

Như chúng ta biết rằng sprint trong phương pháp Scrum có thời gian rất nhỏ, từ hai tuần đến một tháng hoặc đôi khi ít hơn thế. Trong trường hợp này, exploratory testing là một lợi thế lớn để tìm ra các lỗi trong các thay đổi mới nhanh nhất có thể, giúp nhóm lập trình có thể dễ dàng sửa chữa và toàn bộ nhóm Scrum có thể thực hiện kịp trong thời hạn sprint đó rất hiệu quả. 

Exploratory testing cũng có lợi cho các phương pháp agile khác như Kanban, XP, vv. Trong phương pháp lập trình XP (extreme), các chu kỳ phát triển nhỏ hơn phương pháp scrum. Do đó, thử nghiệm thăm dò rất hữu ích cho phương pháp dự án XP.

Chúng ta có thể tự động hóa, thực hiện và báo cáo về các test cases trong khung thời gian đã cho của môi trường Agile nhưng tầm quan trọng của exploratory testing không thể phủ nhận. Nhìn vào những lợi thế trên, exploratory testing rất đáng để thực hiện ít nhất trong một chu kỳ release. Nó không chỉ nâng cao chất lượng của sản phẩm mà còn làm cho việc kiểm thử thực hiện hiệu quả hơn.


## **III. KẾT LUẬN**
Exploratory testing vẫn có giá trị rất lớn trong mô hình Agile và mang lại rất nhiều lợi ích. Bằng cách hiểu những ưu điểm và nhược điểm của phương pháp tiếp cận này và sử dụng phần mềm quản lý kiểm thử mạnh mẽ, các nhóm QA có thể tận dụng nó một cách hiệu quả cho thành công của chính họ trong quy trình phát triển nhanh.

Link tham khảo :

http://www.softwaretestingclass.com/what-is-exploratory-testing/
https://www.softwaretestinghelp.com/what-is-exploratory-testing/
https://www.softwaretestingclass.com/why-exploratory-testing-is-important-in-agile-projects/