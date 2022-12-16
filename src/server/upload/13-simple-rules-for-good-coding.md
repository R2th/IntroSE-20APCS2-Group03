## Giới thiệu 
- Bài viết được dịch từ nguồn [13 Simple Rules for Good Coding](https://hackernoon.com/few-simple-rules-for-good-coding-my-15-years-experience-96cb29d4acd9)

## Nội dung chính. 

### 1. Optimization VS Readability. Fuck the optimization. 

Tạm dịch là, nếu đặt sự quan trọng của việc tối ưu hóa code và khả năng dễ đọc của code, thì việc tối ưu hóa sẽ không được ưu tiên bằng việc code có khả năng dễ hiểu và dễ đọc. 

Điều đó có nghĩa là, việc cải thiện khả năng dễ đọc, hiểu của code quan trọng hơn việc nâng hiệu suất làm việc của code.  Luôn luôn viết code sao cho việc đọc và hiểu code là đơn giản với mọi developer.  Bởi vì, thời gian và công sức để sử dụng cho những code khó hiểu sẽ cao hơn rất nhiều cái mà bạn nhận được từ việc tối ưu hóa code.

Nếu cần tối ưu hóa code, thì bạn hãy viết test cho các module một cách độc lập, và luôn luôn đảm bảo converage 100% đối với những dòng code bạn viết, thì những dòng code đó có thể không cần động vào trong vòng 1 năm. Điều này có ý nghĩa là, nếu viết unit test và intergration test tốt, luôn luôn đảm bảo tỷ lệ coverage 100% với các dòng code bạn viết, điều đó có nghĩa là sẽ không có dòng code thừa nào, không có trường hợp nào mà code của bạn không bắt được, điều này đồng nghĩa với việc, không cần thiết phải tối ưu hóa code đã viết trong vòng 1 năm. 

### 2. Architecture first. 

Tạm dịch là, kiến trúc là cái được ưu tiên hơn nhất. 
    
Mọi người thường nói: "Chúng ta cần phải là mọi thứ một cách nhanh nhất, nên chúng ta không có thời gian để tạo ra kiến trúc của dự án". Và có tới 99% các vấn đề lớn được tìm thấy bởi những suy nghĩ như vậy. 

Viết code mà không suy nghĩ về cấu trúc của nó giống như việc bạn có giấc mơ mà không lên bất cứ một kế hoạch nào để thực hiện chúng vậy. 

Trước khi bắt đầu viết những dòng code đầu tiên, bạn nên hiểu nó sẽ làm gì, làm như nào, được sử dụng ra sao, module như nào, các dịch vụ hoạt động với nhau như nào, cấu trúc nào mà code nên có, làm sao để test, debug hay làm như nào để cập nhật code.

Với các dự án thực tế mình tham gia, việc kiến trúc một dự án được cấu trúc một cách rõ ràng, sẽ giảm thời gian debug, giảm thời gian phát hiện bug, tối ưu hóa việc unit test cũng như thời gian việc viết interagration test. Với các web developer, sẽ rất quen thuộc với cấu trúc MVC. (MODEL-VIEW-CONTROLLER), tuy nhiên, trong thực tế, cấu trúc này còn có thể chia nhỏ hơn nữa, có thể chia thành 5 tầng, như model thì chia ra 2 tầng logic-database, ..etc.


### 3. Test coverage 
    
Tests được đề cập là một thứ tốt, trong mọi project. Việc viết unit và intergration test sẽ làm việc maintain (bảo trì, duy tu) project trở lên đỡ tốn công sức hơn rất nhiều và chi phí bỏ ra để phát hiện một vấn đề đơn giản hơn. Tuy nhiên việc viết tests như vậy cũng phải bỏ ra công sức và chi phí nhiều ở giai đoạn đầu. Để cân bằng giữa chi phí sau này maintain project và chi phí bỏ ra, tác giả của bài viết có đề cập đến một số điều cần chú ý khi nào cần viết tests:

- Khi bạn đang viết các module, hay micro-service, cái sẽ được sửa đổi trong ít nhất một tháng. Điều này có nghĩa là, nên viết tests cho những code dùng nhiều và ít bị thay đổi. 
- Khi bạn đang viết open source code. Với open source code, viết unit test và intergration test hay bất kỳ một loại test khác nào nữa, điều này sẽ đảm bảo chất lượng code với open source code, người dùng code cùa bạn sẽ yên tâm, và unit test hay integration test được biết đến như là một loại tài liệu (document) khi bạn không có thời gian tạo document về source code mình viết. 
- Khi viết code động đến vấn đề tài chính. Việc viết tests mục đích chính chính là nâng cao chất lượng code, và bắt được các case thực tế. Một bug trong lĩnh vực tài chính có thể gây ra những tổn thất không lường trước được. Do vậy viết tests là điều cần thiết. 
- Khi update code, bạn cần update lại tests, điều đó gần như là hiển nhiên, vì việc update code có thể gây ra lỗi.

Khi nào thì ta không cần thiết phải viết tests:
    
- Khi bạn là một startup, không cần thiết phải viết tests vì chi phí bỏ ra thực sự không phải nhỏ. 
- Khi bạn đang làm trong một team quy mô nhỏ, và code thay đổi rất nhanh. 
- Khi viết scripts nhỏ, và dễ dàng test bằng tay với input và output 
    
:note: **CODE CÓ TESTS LỞM THÌ CÒN TỆ HƠN LÀ CODE KHÔNG CÓ TESTS**

### 4. Keep It Simple, Stupid.
    
Đừng viết code phức tạp. Mọi thứ đơn giản hơn thì sẽ ít bug hơn và tốn ít thời gian để debug chúng. Code nên chỉ thực hiện những gì cần thiết chứ không cần phải một tấn các abstraction hoặc **OOP shit**. Mọi thứ ở tương lại có thể cập nhật chúng một cách đơn giản. 

### 5. Comments.

Comments đang thể hiện code tệ. Code tốt sẽ có khả năng đọc hiểu mà không cần một dòng comment nào. Nhưng làm như nào để tiết kiệm thời gian cho các new developer? Giải pháp là viết vài dòng mô tả về cách method hoạt động. Điều này tiết kiệm thời gian để hiểu, trừ khi người đó đưa ra một cách cài đặt method một cách tốt hơn. Và điều này cũng giúp dễ dàng viết document cho toàn bộ code. 
```php
    /**
    *@param String $param1 This is a example param
    *@param String $param2 This is a other example param
    *@return void 
    */
    public function example_method($param1, $param2);
```
    
Trên là một ví dụ về comment một method, và nó chẳng để làm gì cả. :) . Với một new developer, họ sẽ không cần biết method được cài đặt như nào, hay nó hoạt động ra sao, họ chỉ quan tâm đến các tham số truyền vào, và đầu ra của method là gì, có đáp ứng được yêu cầu sử dụng của họ hay không. 

### 6. Hard coupled VS Less Coupled.
    
Luôn luôn thử sử dụng kiến trúc microservice. Có một số kiến trúc khác, có thể chạy nhanh hơn microservice, nhưng microservice mang đến khả năng phân tán các dịch vụ ra nhiều máy, điều này có ý nghĩa lớn trong việc cải thiện hiệu xuất công việc, và đề phòng rủi ro trong việc back-up giữ liệu. Hãy tham khảo bài gốc để hiểu hơn, chứ mình hiểu chưa rõ lắm. 
    
### 7. Code reviews. 

Review code có thể tốt, nhưng cũng có thể xấu. 

Bạn chỉ nên tổ chức review code khi bạn có những developer có thể hiểu được 95% code viết ra, và có thể tính toán cùng với update mọi thứ mà không tốn quá nhiều thời gian. Trong các tình huống còn lại, việc review code sẽ chỉ làm mất thời gian và mọi người ghét chúng. 

Nhiều người nghĩ rằng, review code là một cách tốt để dạy cho những người mới, hoặc teammate, để cho những người khác trong một team hiểu về phần khác mà họ không làm, nhưng chứng năng chính của việc review code là tăng chất lượng code, chứ không phải để dạy người khác. Hãy tưởng tưởng rằng, team của bạn đang phát triển hệ thống điều khiển lò phản ứng hạt nhân hoặc hệ thống điều khiển tên lửa, và bạn tạo ra một lỗi lớn về logic, và bạn đưa ra review cho những người mới, điều này có nguy cơ xảy ra tai nạn đến 70%.

Một team tốt là nơi mà mỗi người có những luật của riêng họ, và có khả năng chịu trách nhiệm với những gì họ đã làm. Có một số người muốn tìm hiểu thành phần nào đó của code, hay đi hỏi. Không ai có thể biết hết mọi thứ, và điều tốt mà tác giả đề cập đến là, mỗi người trong một dự án chỉ hiểu biết 30% toàn project, họ chỉ hiểu phần họ đang làm và chịu trách nhiệm về nó. 
    
### 8.  Refactoring does not work.
    
Phần này đề cập đến vấn đề là, do không có nhiều thời gian, mọi người hay viết code sao cho chạy được và để TODO: refactor gì đó, nhưng cuối cùng, thì sự thât chứng minh rằng, họ sẽ chẳng bao giờ có thời gian mà refactor lại code cũ cả. Trong dòng chảy của một project thực tế, những công việc sẽ được xếp đầy trong ngăn xếp theo thời gian, và chẳng bao giờ cái kỳ vọng được refactor ấy trở thành hiện thực được. Mặt khác, thì trong quá trình refactor, nếu có thời gian ít ỏi có thể dùng, cũng mất khá nhiều thời gian để hiểu lại logic và ý tưởng của code cũ đã viết khi nó đã trôi quá một thời gian. Điều này dẫn đến khó khăn trong việc refactor code. Oh- thực tế là khi refactor mà không có tests, chúng ta sẽ luôn bị hoang mang rằng liệu việc refactor này có thể dẫn đến sự sụp đổ của hệ thống đang chạy hay không. Nên tốt nhất, hay bỏ suy nghĩ refactor trong đầu, và cố gắng viết code tốt ngay từ đầu. 

### 9.  Don’t write code when you are tired or in a bad mood.

Khi developer mệt mỏi, số lượng bug họ tạo ra có thể gấp đôi đến gấp năm lần so với khi họ khỏe mạnh. Vì vậy, theo tác giả, việc bắt các developer làm việc trong khi họ mệt mỏi là một điều tồi tệ và dẫn những hậu quả khôn lường. Thực tế, việc chạy theo deadline, dẫn đến phải OT hay ON là điều rất dễ gặp trong các công ty outsourcing. Nhưng điều này có thể dẫn đến chi phí tốn kém và không hiệu quả cao. Tác giả kỳ vọng rằng, làm việc 6 giờ một ngày là hợp lý với các lập trình viên. Nên các bạn đọc đến chỗ này thì có thể tự cắt 2h làm việc mỗi ngày. Hãy tâp trung làm việc 6h/ngày, và 2h dùng để giải trí xen lẫn trong quá trình làm việc.  Đừng ai báo cáo chỗ này mình viết lên công ty nhé. :) 

### 10.  Don’t write all at once — make developing iterative.

Trước khi bắt đầu viết code, hãy ngồi phân tích các tính năng nào có giá trị cao với khách hàng, và làm chúng nó trước, nó giống tư tưởng agile và scrum.
    
Làm những thứ có giá trị cao với khách hàng, nhanh chóng deploy và demo sản phẩm với khách hàng, sửa chữa những thay đổi, và tiếp tục các vòng lặp tương tự. Điều này mang giá trị cao. Trên thực tế, các dự án thường ít bao giờ có tài liệu rõ ràng ngay từ đầu và không thay đổi. Áp dụng Agile và Scrum vào với các dự án outsourcing để chấp nhận và thích nghi với tính chất **DỄ THAY ĐỔI** của khách hàng mà thôi. 

### 11. Automation VS manual.
        
Về lâu dài thì nó có thể tự động được cái gì thì hãy tự động cái đó, sẽ tiết kiệm chi phí và mang lại thành công cho dự án. Tác giả của bài viết lấy ví dụ như mỗi ngày, mỗi người trong một team 5 người mất 5 phút để làm cái gì đó bằng tay, thì về lâu dài, khoảng thời gian tiêu tốn, lãng phí sẽ là một con số lớn. Vậy cái gì có thể tự động được thì hãy làm nó tự động. Theo ý kiến của mình tất cả đều tự động, chỉ là một bên tự động chạy bằng máy và một bên tự động chạy bằng cơm thôi. Và cố gắng tự động chạy bằng máy nhiều nhất nếu có thể. 

### 12. Go out, get hobbies.
    
Làm tươi mới bản thân, ra ngoài, chém gió với bạn bè, vận động, sẽ tạo ra nhiều ý tưởng mới, và tăng khả năng làm việc. Như tiêu đề đề cập, hãy ra ngoài và hoạt động vài hoạt động theo sở thích cá nhân.

### 13. Learn new things as you get free time.

Học cái mới khi có thời gian rảnh. Đừng bỏ phí thời gian.