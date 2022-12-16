### 1. What is Virtual Reality Testing?
Công nghệ không ngừng phát triển đổi mới và các ứng dụng thực tế ảo đang có chỗ đứng riêng trên thị trường toàn cầu và trong cuộc sống của chúng ta. Để hiểu rõ hơn cần phải làm rõ ba khái niệm cơ bản:
1. What is usability?
2. What is Virtual Reality (VR)?
3. What are usability tests with common users?
 
Usability là một thuộc tính chất lượng  điều đó thể hiện sự dễ dàng sử dụng của một ứng dụng nhất định. Virtual Reality (VR) là một môi trường nhân tạo được tạo ra bởi phần mềm. Cách nhận biết môi trường này hoàn toàn nhập vai và được hỗ trợ bởi hai thiết bị vật lý thiết yếu: headsets (như trong hình bên dưới) và computer/console/mobile phone, sẽ tạo ra môi trường ảo.
![](https://images.viblo.asia/f79956ac-4f0e-4f78-a879-6ce50b65257c.png)

Cách tốt nhất để kiểm tra một chức năng nào đó là bằng cách sử dụng nó. Do đó, các bài kiểm tra khả năng sử dụng bao gồm các phiên ngắn trong đó người dùng tiềm năng tương tác với ứng dụng trên một môi trường cụ thể, trong khi một nhóm chuyên gia quan sát, ghi lại và đo lường quá trình tương tác đó. Trong VR, bản chất là thử nghiệm khám phá dựa trên phiên, tức là khám phá thông qua ứng dụng để tìm và đạt được những gì được yêu cầu, trong một thời gian cố định. Tìm hiểu thêm về Thử nghiệm thăm dò từ blog này của Sara Martinez.
Usability tests  nên được thực hiện vào đúng thời điểm: khi các bản dùng thử và ứng dụng đã sẵn sàng. Rất khuyến khích tester thực hiện kiểm tra heuristic trước khi người dùng được cung cấp thiết bị. Lý do là có nhiều vấn đề có thể được phát hiện trong trường hợp này và được sửa trước khi kiểm tra khả năng sử dụng. Do đó, người dùng có được ứng dụng tốt nhất mà nhóm có thể thực hiện và phiên kiểm tra rất hữu ích cho việc tìm kiếm các vấn đề mà nhóm QA không thể thấy.
> **Definition - What does Heuristics Testing mean?**
> 
> Heuristics testing là thử nghiệm các thuật toán, modules code hoặc các loại dự án khác trong đó các chiến lược thử nghiệm dựa trên dữ liệu quá khứ về xác suất. Các loại thử nghiệm được nhắm mục tiêu này thường cho phép điều tra thông minh hơn về nơi có bất kỳ bugs hoặc problems nào có thể xảy ra. Kiểm tra heuristic cũng được sử dụng trong các công nghệ sàng lọc như lọc email.
> Heuristics testing is also sometimes called experience-based testing. Developers or others may bring higher-level, experience-based decision making processes into how software testing is done in order to make this testing more efficient.
> 
> Heuristics testing đôi khi cũng được gọi là kiểm tra dựa trên kinh nghiệm. Các nhà phát triển hoặc những người khác có thể đưa các quy trình ra quyết định dựa trên kinh nghiệm, ở cấp độ cao hơn vào cách thức kiểm thử phần mềm được thực hiện để làm cho thử nghiệm này hiệu quả hơn.
> 
> **Techopedia explains Heuristics Testing**
> 
> Heuristics testing có thể so sánh với một phỏng đoán có kỹ năng, trái ngược với kiểm thử phần mềm định lượng hoàn toàn hoạt động tương đối mơ hồ, không có bất kỳ định hướng higher-level nào. Ví dụ: giả sử rằng nhà phát triển phải kiểm tra dự án với 10.000 line code. Theo đuổi một thử nghiệm tuyến tính chung của 10.000 dòng đó sẽ tạo thành thử nghiệm phần mềm hoàn toàn định lượng. Mặt khác, **Heuristics testing** sẽ liên quan đến việc xem xét mức độ thường xảy ra lỗi trong các phần nhất định của code. Sử dụng ví dụ này, nếu nhà phát triển nhìn vào dữ liệu lịch sử để nhận ra rằng một module code cụ thể trước đây dễ bị lỗi hơn, chiến lược Heuristics testing có thể liên quan đến việc cô lập module đó, ví dụ, bao gồm 2.000 line code cụ thể và chỉ đạo nhiều testing resources hơn ở phần code đó, thay vì kiểm tra tất cả 10.000 line code như nhau.
> 
> Heuristics testing liên quan đến triết lý mà các nhà phát triển có thể học hỏi từ kinh nghiệm hoặc từ các xu hướng không ngẫu nhiên xảy ra theo thời gian. Trong một số trường hợp, Heuristics testing có thể hiệu quả hơn rất nhiều trong việc giải quyết vấn đề so với blind testing.

Bây giờ, hãy cùng học cách chạy các bài kiểm tra khả năng sử dụng cho các ứng dụng VR nhé.

### 2. VR Usability Testing Methodology
Trong phần này, chúng ta sẽ tìm hiểu một số khía cạnh của phương pháp usability test trên các ứng dụng VR với người dùng phổ biến. Không có cách tiêu chuẩn để thực hiện nó, vì vậy hướng dẫn này dựa trên kiến thức và kinh nghiệm thực tế về các phương pháp truyền thống được áp dụng cho thử nghiệm ứng dụng VR.

***2.1. Recruit participants***

Ít nhất là năm member là số lượng thành viên hợp lý. Con số này cho phép bạn có được một bộ sưu tập các ý kiến khác nhau. Profile của người dùng phải phù hợp với đối tượng mục tiêu của ứng dụng. Điều quan trọng là phải biết các kỹ năng, kinh nghiệm VR và lợi ích của người tham gia tiềm năng. Các cấp độ chuyên môn khác nhau sẽ được yêu cầu để làm cho phiên trở nên thú vị và hiệu quả hơn.

***2.2. Arrange the place and materials***

Điều cần thiết tuyệt đối là phải có các thiết bị kỹ thuật như headsets và device để tạo ra VR. Ngoài ra, cần truy cập vào những gì người dùng đang nhìn thấy trong từng khoảnh khắc và đủ số lượng không gian vật lý trống (một phòng thí nghiệm từ bây giờ trong blog) là bắt buộc, bởi vì người dùng dự kiến sẽ di chuyển trong khi họ đang khám phá.
Có nhiều loại headsets khác nhau, với chất lượng và giá cả khác nhau. Không cần thiết phải mua một thiết bị đắt tiền để sử dụng VR, nhưng khi giá tăng, trải nghiệm sẽ tốt hơn. Tất nhiên, chất lượng của thiết bị VR phụ thuộc vào loại ứng dụng nào cần được hỗ trợ và các yêu cầu của PC / Console / Smartphone để chạy nó.
Sơ đồ tư duy sau đây tập trung vào Hardware: một vài ví dụ về phụ kiện, các khía cạnh cần tính đến như sự thoải mái, đề xuất các yêu cầu cho PC và các nhãn hiệu headsets khác nhau.
![](https://images.viblo.asia/2f74af48-aa11-4b13-8ce7-fd0ca8364ed2.png)

***2.3. Plan the test***

Viết mục tiêu của bài test, những gì người dùng sẽ làm và hướng dẫn giải thích cách người dùng sẽ làm điều đó. Plan này là một hướng dẫn, có nghĩa là điều quan trọng là phải tuân theo nó, nhưng không cần thiết phải thực hiện nghiêm ngặt.
Trong bước này, team nên suy nghĩ về một số số liệu hữu ích để đo lường quá trình; ví dụ :
* Số error theo mức độ nghiêm trọng
* Các vấn đề sức khỏe và tác dụng phụ được tạo ra (Yes/No, how many, which one?)
* Số phút học tập để điều hướng được trong môi trường ở các tình huống khác nhau
* Số lần mà người dùng cần trợ giúp với các thiết bị (không phải ứng dụng)

Về phía ứng dụng, có một số khía cạnh chung cần chú ý khi thử nghiệm. Điều quan trọng là phải kiểm tra một việc (hoặc phiên) tại một thời điểm, vì vậy kết quả kiểm tra trở thành một tài sản hữu ích cho team phát triển. Dưới đây là một số ý tưởng để lập kế hoạch và viết các test case thích hợp.
![](https://images.viblo.asia/25383664-2d8d-4fe0-9539-dcdb3f679189.png)

***2.4. What to Test?***

* Tương tác của người dùng với giao diện VR
  - Di chuyển trên các không gian khác nhau trong ứng dụng.

* Thực hiện các flow
  - Test ứng dụng cho những gì nó không phải làm (nghĩ về các trường hợp cận biên để tối đa hóa phạm vi bao phủ)
  - Đảm bảo mọi yêu cầu được bao phủ
  - Phân chia và kiểm soát

* Chức năng hoạt động như mong đợi, và do đó, chức năng không hoạt động bất ngờ.
  - Tách biệt với thế giới thực
  - Thế giới thực không làm gián đoạn trải nghiệm
     + Các trạng thái đều đã được thực hiện hoàn toàn
     + 360 degree view 
     + Người dùng cảm nhận được những cảm giác mong đợi

***2.5. Make the participants feel comfortable***
 
Trước khi các session bắt đầu, phòng thí nghiệm cần phải sẵn sàng và thoải mái và team chuyên gia nên có một cuộc trò chuyện với những người tham gia. Trong cuộc trò chuyện này, team nên giải thích session sẽ diễn ra như thế nào.
Cần phải làm rõ với người dùng rằng bất kỳ sự bất tiện nào mà họ có thể gặp phải chỉ là một vấn đề của ứng dụng và mục tiêu của thử nghiệm là đánh giá chất lượng của phần mềm và không có gì khác. Điều rất quan trọng để làm rõ rằng: đó là vai trò của người kiểm tra để loại bỏ gánh nặng chứng thực từ người dùng.
Ngoài ra, giải thích cách các thiết bị hoạt động, bởi vì người dùng có thể không biết cách sử dụng chúng. Đây là lời khuyên duy nhất mà người dùng có thể nhận được, họ không thể tiếp nhận thông tin như thế nào ứng dụng ưa thích hoạt động.

***2.6. Record the participants’ initial reaction***

Khi thử nghiệm bắt đầu, hãy hỏi người dùng ấn tượng đầu tiên của họ về môi trường mới: người dùng nhìn thấy và cảm thấy gì? Điều quan trọng là phải tính đến việc người tham gia sẽ không cảm thấy tốt về thể chất. Nếu người dùng quá sợ hãi hoặc cảm thấy rằng họ không thể tiếp tục, bài kiểm tra phải được chấm dứt ngay lập tức (và một người tham gia mới cần phải được tuyển dụng). Tất nhiên, tình huống này cần phải được ghi chép lại chính xác.

***2.7. Let participants explore on their own***
 
Bên cạnh việc tuân theo kế hoạch, người dùng nên có thời gian rảnh để tự mình khám phá mà không cần hướng dẫn. Sẽ rất thú vị khi giữ phần này ngay khi bắt đầu session, trong lần tương tác đầu tiên với chức năng và ứng dụng. Khía cạnh chính được đánh giá ở đây sẽ là cách người dùng phản ứng với môi trường VR và các tính năng của nó.

***2.8. Record the usage of the application***

Người đánh giá có trách nhiệm chú ý đến những gì người dùng đang nói bằng lời và diễn đạt theo cách không lời. Theo plan, yêu cầu người dùng thực hiện các hành động trên ứng dụng và điều hướng theo những cách nhất định. Nhưng, không đưa ra bất kỳ chi tiết bổ sung. Hãy nhớ rằng: không giúp đỡ!

Nếu người dùng bị chặn và không thể đạt được một yêu cầu nhất định, hãy giao cho người dùng nhiệm vụ tiếp theo để session theo kế hoạch. Một lần nữa, điều quan trọng là phải làm rõ với người dùng rằng đó không phải là lỗi của họ, mà là lỗi trong thiết kế của ứng dụng. Về phía người đánh giá, hãy viết mọi thứ đang diễn ra: phản ứng và biểu hiện, lượng thời gian cần thiết để hoàn thành một hành động, các vấn đề được tìm thấy bởi người dùng,...
Bạn nên quay video session để bạn không bỏ lỡ các chi tiết có giá trị. Ngoài ra, quan sát những người tham gia thông qua máy ảnh sẽ làm giảm cảm giác tiêu cực của sự đe dọa có thể xảy ra khi người đánh giá quá gần với người tham gia.

***2.9. Evaluate the sessions and create documentation***

Tài liệu này nên bao gồm:
* Một sơ yếu lý lịch tổng hợp các session và kết luận trích xuất.
  - Người dùng và hồ sơ của người tham gia thử nghiệm
  - Triệu chứng vật lý của người dùng trong session.
  - Trải nghiệm của người dùng trên trong môi trường ảo.
* Kết của Metrics của số liệu (một biểu đồ sẽ giúp hình dung điều này) 
* Một danh sách các vấn đề phát sinh và giải pháp có thể

### 3. Why You Should Test with Potential Users

Một số ưu điểm của thử nghiệm với người dùng tiềm năng chứ không phải với người thử nghiệm đã trải nghiệm là:
![](https://images.viblo.asia/06260559-c0f3-4c95-8916-4b7342e77d49.png)

**Getting the opinion of a potential user**

Mặc dù các đề xuất và bugs được báo cáo bởi nhóm QA rất quan trọng, nhưng điều cơ bản là phải biết cách người dùng phản hồi và cảm nhận về ứng dụng. Nếu một nhóm người dùng chỉ chú ý đến một thứ gì đó đặc biệt hoặc tất cả đều gặp sự cố với cùng một chức năng (về khả năng truy cập và khả năng sử dụng), nhà phát triển chắc chắn có vấn đề ở đó.
Có được ý kiến sớm này của người dùng tiềm năng trước khi phát hành sản phẩm mang lại lợi ích, như: tiết kiệm thời gian, tiền bạc hoặc tránh trải nghiệm người dùng không hài lòng. Tất cả mọi thứ được báo cáo trong trường hợp này là phản hồi cho nhóm để cải thiện vào đúng thời điểm. Hãy suy nghĩ về việc có session này với một bản thử nghiệm chức năng: các vấn đề được báo cáo bởi những người tham gia là một lợi ích lớn cho team phát triển, để khắc phục những hành vi không mong muốn đó. Và  điều đó tiết kiệm rất nhiều công việc!

**Understanding the experience of a potential user**

Người dùng tiềm năng là đối tượng mục tiêu, vì vậy hiểu được trải nghiệm của họ sẽ cung cấp nhiều thông tin chuyên sâu về cách người dùng thực sự sẽ phản ứng với sản phẩm. Các nhà phát triển và người thử nghiệm sau đó có thể so sánh và xem liệu những trải nghiệm thực tế có phù hợp với mong đợi của họ từ những gì họ lên kế hoạch cho người dùng trải nghiệm hay không. Nếu không, họ có thể sửa sản phẩm trước khi phát hành.
Trong các ứng dụng VR, nó rất quan trọng để theo dõi trải nghiệm vật lý. Nếu người dùng là người mới bắt đầu sử dụng các ứng dụng VR, cơ thể của họ sẽ phản ứng với các triệu chứng thực thể với trải nghiệm mới, ví dụ: choáng váng hoặc chóng mặt. Nếu một người thử nghiệm có kinh nghiệm kiểm tra ứng dụng này, họ sẽ không gặp phải các vấn đề được đề cập, bởi vì họ đã quen với việc đó. Thật hữu ích khi biết những vấn đề vật lý nào mà ứng dụng gây ra cho người dùng thông thường, để đảm bảo họ không quá nghiêm trọng hoặc cố gắng thiết kế ứng dụng theo cách mà họ có thể tránh được. Trong các ứng dụng ảo, nó rất quan trọng để theo dõi điều hướng của người dùng trên toàn bộ nó.

**Detecting new usage types and bugs**

Người dùng tiềm năng không quen với kế hoạch và thiết kế của ứng dụng. Những sự trải nghiệm mới này có thể phát hiện ra những thứ mà các nhà phát triển bỏ qua, như những luồng hoặc lỗi bất ngờ. Những vấn đề mới này sau đó có thể được giải quyết, bởi các nhà phát triển, quản lý sản phẩm, tiếp thị và bán hàng.

### 4. What Can Code Testers Learn from VR Testing?

* Hầu hết các thực hành ở trên có thể được điều chỉnh để kiểm tra code và phần mềm:
* Kiểm tra sản phẩm trên người dùng thực.
* Tài liệu và giám sát nphản ứng và kinh nghiệm của người dùng
* Lập kế hoạch test theo thiết kế code, nhưng để lại không gian để khám phá tự phát.
* Việc kiểm tra càng sớm được thực hiện trong quá trình phát triển, các lỗi càng sớm được phát hiện và sửa chữa.
* Luôn luôn quan trọng để  cập nhật với các công nghệ mới nhất.
* Kiểm tra code / feature / sản phẩm của bạn từ đầu đến cuối.
* Chạy thử nghiệm hiệu suất.

**Nguồn Tham khảo:**
- https://www.blazemeter.com/blog/user-testing-of-virtual-reality-applications