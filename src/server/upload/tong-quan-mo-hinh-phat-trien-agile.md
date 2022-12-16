*Bài viết gốc: [アジャイル開発とは？手法や進め方、メリット、適したプロジェクトを紹介](https://service.shiftinc.jp/en/column/4145/)*

-------------------------

![](https://images.viblo.asia/6b8f79e2-950d-4916-beb2-bb1e71d662e8.png)

Môi trường kinh doanh ngày nay đang thay đổi nhanh chóng, kéo theo đó - một trong những thách thức lớn của ngành phát triển phần mềm là nhận thức đúng vòng đời của sản phẩm và hiệu quả hóa quá trình phát triển để đáp ứng nhanh chóng nhu cầu thị trường. Phát triển Agile đang trở thành phương pháp chủ đạo để giải quyết những vấn đề này.

Bài biết này sẽ giới thiệu tổng quan về mô hình phát triển Agile, ưu/nhược điểm và các dòng dự án phù hợp với mô hình phát triển Agile.

**Mục lục**

1. Phát triển Agile là gì?
2. Các dạng phát triển của mô hình Agile - Phương pháp Scrum
3. Ưu/nhược điểm của phát triển Agile
4. Các loại dự án phù hợp với mô hình Agile

## Phát triển Agile là gì?

Phát triển Agile là một trong những phương pháp phát triển dự án trong phát triển hệ thống và phần mềm. 

Bằng cách thành lập team phát triển và lặp đi lặp lại quá trình phát triển như xác định yêu cầu, thiết kế, phát triển, test và release trong đơn vị từng chức năng nhỏ, cùng với sự tham gia của người dùng ngay trong giai đoạn phát triển, từng chức năng nhỏ được hoàn thiện để hoàn thiện sản phẩm lớn.

### Sự khác biệt giữa mô hình phát triển Waterfall và mô hình phát triển Agile

![](https://images.viblo.asia/48c77095-7362-4a4f-9abd-527bbacdcb5f.png)

Không giống như mô hình phát triển Waterfall - trong đó tất cả các công đoạn phát triển được lên kế hoạch từ trước, định nghĩa requirement xong chuyển sang design, sau đó phát triển rồi đến test, và cuối cùng release, mô hình phát triển Agile đặc trưng bởi sự phát triển lặp đi lặp lại các chu kỳ (cycle) chia chuỗi quy trình thành đơn vị chức năng (đơn vị nhỏ) để hoàn thiện sản phẩm.
Bạn có thể hoàn thiện chu kỳ đầu tiên rồi release chức năng, sau đó chuyển sang chu kỳ tiếp theo; hoặc bạn cũng có thể đồng thời thực hiện song song nhiều chu kỳ để hoàn thành sản phẩm. Việc phát triển trên đơn vị nhỏ này được gọi là Iteration hay Sprint.

Với mô hình phát triển Waterfall, chúng ta sẽ chốt phạm vi và kế hoạch phát triển theo yêu cầu ban đầu, đảm bảo resource cho từng quy trình, tiến hành quy trình theo kế hoạch và hoàn thiện sản phẩm. Do đó, nếu phát sinh việc thay đổi yêu cầu trong quá trình phát triển, hoặc nếu có sự thay đổi về thông số kỹ thuật thì có thể phát sinh thêm chi phí và thời gian phát triển.

Ngược lại, với mô hình phát triển Agile, trước hết chúng ta sẽ lên kế hoạch phát triển sơ bộ, lập team phát triển và lặp lại chu kỳ phát triển nhỏ cho từng chức năng trong vòng từ 1 đến 4 tuần. Member được assign trong team sẽ chịu trách nhiệm về nhiều quy trình như design, phát triển, test...Trong các quy trình này cho đến khi sản phẩm được hoàn thành, chúng ta sẽ liên tục phát triển - đồng thời tiếp nhận linh hoạt các confirm liên quan đến thay đổi thông số kỹ thuật và phản hồi về các yêu cầu; do đó, có thể nói đây là một phương pháp cho phép phát triển linh hoạt - đồng thời vẫn hạn chế được nhiều rủi ro về chi phí và thời gian bổ sung.

## Các dạng phát triển của mô hình Agile - Phương pháp Scrum

Các phương pháp phát triển Agile điển hình bao gồm Scrum, Extreme Programming (XP) và Feature Driven Development (FDD).

Ở đây sẽ chủ yếu đi vào phương pháp phát triển Scrum - phương pháp hiện đang được rất nhiều các công ty có kinh nghiệm phát triển tin dùng.

### Scrum là gì?

Scrum là một trong những framework để phát triển Agile. Product owner, Scrum master và developer tạo thành một team dưới 10 người, lặp đi lặp lại chu kỳ  (sprint) lên kế hoạch - thiết kế - phát triển - thử nghiệm và release trên đơn vị chức năng để hoàn thiện sản phẩm.

Cách phát triển có sự tham gia của người dùng để tối đa hóa giá trị của khách hàng và hoàn thành sản phẩm nhanh chóng có thể coi là một đặc tính riêng của phương pháp Scrum.

### 5 quy trình Scrum

![](https://images.viblo.asia/4d2cfd47-cd81-489e-ae7a-7e8b709a54d4.png)

**1. Sprint Planning**

Sprint Planning là quá trình lập kế hoạch cho các công việc cần thực hiện trong một Sprint, được coi là điểm khởi đầu của Sprint. 

Scrum Master (đóng vai trò như một người tổ chức và là cầu nối giữa khách hàng/Product Owner với team phát triển) - dựa trên mục tiêu sản phẩm và các quy trình thực hiện - khuyến khích thành viên trong team hiểu cần làm gì trong Sprint đó, qua đó các thành viên hiểu được ý nghĩa của việc thực hiện Sprint đối với toàn bộ team, xác định mục tiêu của Sprint và quyết định những gì cần làm để đạt được mục tiêu.

**2. Sprint**

Sprint là quá trình design, develop, test và release tính năng dựa trên kế hoạch. Thời gian của một Sprint thường được giới hạn tối đa trong một tháng. 

Trong thời gian của một Sprint, sẽ đồng thời thực hiện Daily Scrum, Sprint Review và Sprint Retro để hoàn thiện sản phẩm.

Về nguyên tắc, trong một Sprint không thực hiện bất kỳ thay đổi nào có thể gây nguy hiểm cho việc hoàn thành mục tiêu.

**3. Daily Scrum**

Daily Scrum là quá trình giao tiếp giúp cho việc tiến hành Sprint thuận lợi hơn. Để tránh phát sinh các nhầm lẫn không đáng có, Daily Scrum nên được tiến hành mỗi ngày một lần - khoảng 15 phút vào cùng một thời điểm, địa điểm dưới hình thức họp daily.

Với Daily Scrum, chúng ta vừa điều phối được các công việc tiếp theo theo đúng kế hoạch, vừa có thể theo dõi tiến độ - cũng như bổ sung thêm các chỉnh sửa nếu cần thiết; thông qua đó cải thiện giao tiếp, xác định rõ các trở ngại có thể gây ảnh hưởng đến tiến độ và kịp thời đưa ra quyết định để phản ứng nhanh chóng với các vấn đề, thách thức gặp phải.

**4. Sprint Review**

Sprint Review là quá trình xem xét, kiểm tra và đánh giá sản phẩm của Sprint. Trong quá trình này, không chỉ team phát triển mà người dùng cũng cùng tham gia.

Tùy theo kết quả review, các đầu việc (item) trong backlog sản phẩm có thể tăng lên hoặc giảm đi, hoặc được thay thế bằng các bước phù hợp hơn. Trong mọi trường hợp, mục đích của quá trình này nhằm tối ưu hóa giá trị sản phẩm đặt trong một khoảng thời gian và mức chi phí giới hạn.

**5. Sprint Retro**

Sprint Retro là quá trình hoạch định các cách thức để cải thiện chất lượng và hiệu quả.

Sprint Retro thường được thực hiện vào cuối mỗi Sprint. Ở đây, chúng ta sẽ cùng nhìn lại Sprint, xác định các vấn đề gây ảnh hưởng đến tiến độ và đánh giá nguyên nhân. Ngoài ra, chúng ta cũng cùng thảo luận về các vấn đề phát sinh và cách giải quyết chúng, đồng thời làm rõ cách thức nâng cao chất lượng, hiệu quả.

★Bổ sung

Hai trong số deliverables quan trọng nhất của Scrum đó là:

**Product Backlog**

Product Backlog là danh sách mô tả các tính năng hoặc nội dung cần cải tiến, có gắn kèm độ ưu tiên. Bằng cách gắn độ ưu tiên, có thể xác định rõ các chức năng sẽ đối ứng trong Sprint này, các chức năng sẽ đối ứng ở Sprint tiếp theo.

Ngoài ra, Product Backlog cũng được sử dụng để các bên liên quan nắm được tình trạng sản phẩm của họ.

**Sprint Backlog**

Sprint Backlog là một danh sách các task đã chốt được thời gian đối ứng, được nhặt ra từ Product Backlog. Nói một cách đơn giản, đó chính là kế hoạch phát triển của Sprint.

## Ưu/nhược điểm của phát triển Agile

### Ưu điểm

Với mô hình phát triển Agile, do có thể thực hiện design - develop - test - release theo đơn vị chức năng nên có lợi thế là sản phẩm hoặc chức năng được cung cấp nhanh chóng nhất cho người dùng.

Ngoài ra, do có thể phát triển đồng thời tiếp nhận các yêu cầu từ phía người dùng, nên một lợi thế nữa là có thể cho ra đời các sản phẩm có giá trị cao và các chức năng đáp ứng được ý đồ phát triển đối với cả phía phát triển và phía người dùng.

Hơn thế nữa, vì mô hình này cho phép phát triển ở đơn vị nhỏ - đồng thời liên tục confirm yêu cầu người dùng nên ít phát sinh re-work, là một lợi thế về mặt thời gian và chi phí phát triển.

### Nhược điểm

Một trong những nhược điểm của mô hình phát triển Agile là nó có thể làm thay đổi hướng phát triển do tính linh hoạt của nó. Hơn nữa, do việc phát triển được thực hiện chấp nhận cả thay đổi và bổ sung, nên có những lo ngại rằng thời gian phát triển sẽ kéo dài hơn và chi phí sẽ cao hơn dự kiến.

Ngoài ra, việc tập trung phát triển trên đơn vị từng chức năng nhỏ trong mỗi Sprint có thể dấn đến việc không thực sự nắm bắt được lịch trình tổng thể. Để tránh điều này xảy ra, cần liên tục tham khảo Product Backlog để đánh giá xem chức năng này mang lại giá trị gì? Dùng để làm gì? Khi nào cần release?...thông qua đó kiểm soát được toàn bộ dự án.

## Các loại dự án phù hợp với mô hình Agile

Dù mô hình phát triển Agile có rất nhiều ưu điểm, nhưng khó có thể nói rằng phương pháp phát triển này phù hợp với tất cả các hệ thống.

Ví dụ điển hình về những dòng dự án phù hợp với mô hình phát triển Agile phải kể đến dịch vụ Web (EC, SNS, v.v.), Web app, Smartphone app or Games...nơi mà các dịch vụ mới thường xuyên được phát triển bổ sung và vòng đời sản phẩm rất nhanh.

Đối với các dịch vụ Web, Games...nhu cầu của người dùng thường xuyên thay đổi trong quá trình phát triển và sau khi phát hành, do đó cần đáp ứng linh hoạt với những thay đổi đó. Ngoài ra, do có thể tồn tại nhiều dịch vụ gần giống nhau nên rất dễ xảy ra tình trạng phổ thông hóa dịch vụ; do đó yếu tố vô cùng quan trọng để kiếm tiền từ một dịch vụ chính là làm sao để phát hành dịch vụ nhanh chóng nhất, cải thiện hệ thống nhanh chóng nhất theo response từ người dùng.

## Lời kết

Ngày nay, mô hình phát triển Agile được công nhận là một phương pháp phát triển phần mềm, đã và đang được rất nhiều Công ty áp dụng. Ngày càng nhiều Công ty có thể tận hưởng lợi ích của mô hình này, chẳng hạn như lợi thế về việc tối đa hóa giá trị của sản phẩm hay lợi thế về mặt thời gian và chi phí phát triển.

Tuy nhiên, không phải tất cả các dự án đều nên áp dụng mô hình phát triển Agile với mục đích giảm chi phí và rút ngắn thời gian phát triển. Điều quan trọng là phải lựa chọn phương pháp phát triển phù hợp nhất với đặc điểm hệ thống mà mình sẽ phát triển.