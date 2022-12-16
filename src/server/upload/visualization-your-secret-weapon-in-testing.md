### Tính trực quan: Vũ khí bí mật của bạn trong kiểm thử

Hình ảnh, video, thông tin… hay bất cứ một hình thức nào kích thích thị giác trong bài viết hay nó còn có một tên gọi khác khá học thuật đó là nội dung trực quan.. Vậy tính trực quan sẽ giúp bạn những gì trong kiểm  thử?

Dưới đây là một vài mẹo thực tế, dựa trên kinh nghiệm của tôi, về cách sử dụng tính trực quan để giúp công việc hàng ngày của QA dễ dàng hơn.


#### Sự trực quan được ví như là một công cụ của một QA kiểm thử thủ công

Tại bất cứ công ty nào, sự tham gia sớm của QA trong quá trình phát triển tạo ra một sản phẩm chất lượng cao hơn. QA bắt đầu làm việc với dev team, front end dev team ở giai đoạn đánh giá ý tưởng / mô phỏng, họ đóng góp ý kiến tạo nên một Spec rõ ràng và tuyệt vời hơn, họ review và cho ý kiến về các tài liệu thử nghiệm và cuối cùng kiểm tra chất lượng của các tính năng đã hoàn thành và báo cáo bất kỳ lỗi nào họ tìm thấy. Tính trực quan là một trợ giúp tuyệt vời trong mỗi bước trên đường đi của phần mềm. Sau đây là các cách để bạn làm điều đó.



#### 1. Hình dung các sản phẩm trong tương lai: Mockups, ý tưởng, thông số kỹ thuật.

![](https://images.viblo.asia/5fe6d31e-c2a8-45ca-b759-933f04856a3c.jpg)

Điều này thực sự rất quan trọng cho một QA - nó giúp phát triển ra những cách mới, phá vỡ mọi thứ trong các luật lệ, tìm ra các trường hợp thử nghiệm, các kịch bản kiểm thử và tái tạo các lỗi lạ. 

Nhưng tính trực quan ở đây không nên được sử dụng để hình dung ra sản phẩm trong tương lai quá xa rời văn bản, tài liệu và thông số kỹ thuật. Ví dụ app bạn đang làm về bộ máy tìm kiếm nhân viên trong một tập đoàn hoặc công ty thì bạn không thể phác thảo nó ra dễ dàng và hiệu quả như Google. Bạn không thể đưa ra các ý kiến xa rời thực tế khó thực hiện mặc dù có thể điều này có thể giúp ích cho app nhưng dựa vào tài nguyên hiện tại thì nó có thể quá tốn kém và làm lãng phí thời gian của mọi người.

Đến với bài review đánh giá, QA đã được trang bị các bản phác thảo thô về sản phẩm. Điều này sẽ giúp bạn giải phóng bộ khung trong đầu, phá cách để suy nghĩ về việc kiểm thử nhưng mà vẫn dựa vào những điều cốt chất của app, thay vì cố gắng diễn tả toàn bộ sản phẩm sẽ trông như thế nào.

* Đọc, nghiên cứu kĩ tài liệu được mô tả về sản phẩm bằng văn bản, đưa ra các giả định cách bạn hiểu về sản phẩm sau khi đọc tài liệu. 
* Đọc các bản mockups được cung cấp từ khách hàng mà không cần bất cứ tài liệu nào về mô tả sử dụng, rồi từ đó rút ra: chức năng đó có rõ ràng không?, có rõ ràng cho bạn hiểu luôn mà không cần sự giải thích gì thêm không?, làm thế nào để bạn có thể cải thiện nó hơn?....
* Viết 1 bản mô tả chức năng sản phẩm cho riêng chính mình. Tại đó bạn có thể tập trung vào các hành vi của người dùng cuối, các hành vi của sản phẩm, cách mà bạn muốn test nó mà không cần tài liệu, hình ảnh.
* Nghiên cứu hành vi của người dùng cuối. Nếu bạn biết rằng 80% người dùng của bạn đang sử dụng ở trên màn hình máy tính 19 inch và sản phẩm của bạn trông quá tải trên màn hình 24 inch, bạn nghĩ trải nghiệm sẽ như thế nào trên màn hình máy tính xách tay 15 inch?. Tệ đúng không. Đó là điều chúng ta cần nghiên cứu kĩ.


#### 2. Phác thảo trực quan ra các tài liệu kiểm thử của chính bạn.

![](https://images.viblo.asia/d86d75b3-8926-432f-8223-4b0e69606d26.jpg)

Sau đây là 2 tip tự bản thân mình rút ra:

1. Thêm file design vào 1 sheet riêng(nếu bạn làm việc trên google doc), hoặc thêm trực tiếp vào trong file testcase, nó sẽ giúp các thành viên trong team hiểu được vấn đề mà bạn đang viết và hướng tới. Giúp người mới dễ hình dung bao quát được sản phẩm và cách bạn đang đề cập. Tiết kiệm rất nhiều thời gian cho họ. Thay vì phải lọ mọ đi tìm kiếm hình ảnh trong 1 đống tài liệu có sẵn. **Lưu ý:** tất nhiên điều này sẽ giúp ích rất nhiều cho bạn và team nhưng bạn phải luôn cập nhật hình mới vào file testcase, vì nếu có thay đổi design từ phía khách hàng thì bạn không muốn bị chính member trong team mình bắt lỗi chứ ^^

2. Trực quan hóa phạm vi kiểm thử, bạn có thể đánh dấu các khu vực trên file design(của chính mình đã được clone từ dự án chính ra) đã được kiểm tra hoặc đơn giản là để chỉ tính được có bao nhiêu testcase mà bạn đã viết vượt ra khỏi testplan của chính mình.


#### 3. Thêm vào một yếu tố trực quan để kiểm thử sản phẩm.

Một vài thứ hay ho mà tôi muốn giới thiệu ở đây: Alignment and Size: Đôi khi có thể có sự biến động về kích thước ảnh tùy vào trình duyệt hoặc phiên bản mà có thể nhìn trực quan bằng mắt thường không thể phân biệt được, hoặc sự nhầm lẫn về kích thước so với design của đội phát triển. Để kiểm tra xem bố cục có được căn chỉnh hay không, đơn giản chỉ cần một thước đo, chẳng hạn như [Page rule](https://blarg.co.uk/tools/page-ruler) - một add on từ Google.

Có rất nhiều tool có thể hỗ trợ bạn rất nhiều trong việc trau dồi, đẩy nhanh quá trình test như là: [Check My Link](https://chrome.google.com/webstore/detail/check-my-links/ojkcdipcgfaekbeaelaapakgnjflfglf?hl=en-GB) : dùng để kiểm tra các liên kết trong web page. [Applitools Eyes Express](https://chrome.google.com/webstore/detail/applitools-eyes-express/ofhaaccocoghamklkjfliehhdhmibdbh?hl=en): dùng để so sánh hình ảnh của bạn so với trang web thực tế.



#### 4. Report bug tăng tính trực quan.

Là một QA, tôi ghét cảm giác khi các developer close bug của mình với dòng status: Could not reproduce(Không thể tái hiện). Tình trạng chung của phần đông các dev hiện tại là: rất lười đọc mô tả của bug. Tiêu đề bug, ảnh chụp hoặc video là tất cả những gì họ xem. Tất nhiên điều đó không có nghĩa là bạn không viết các bước để tái hiện lỗi, kết quả thực tế và mong muốn ra sao - mà điều đó có nghĩa là:

* **Luôn đính kèm ảnh chụp màn hình, hình ảnh của lỗi trong bug report của bạn**. Bạn có thể set các công cụ chụp ảnh màn hình với các phím tắt trên bàn phím - việc này giúp bạn làm việc nhanh chóng và dễ dàng hơn để chia sẻ. Bạn nên lưu ý khi dùng các công cụ chụp ảnh chia sẻ lên internet, nó thực sự rất hữu ích nhưng đó cũng là nơi có thể có rủi ro về bảo mật cao hơn. Tại đây tôi gợi ý nên dùng công cụ chụp hình có sẵn trên các hệ điều hành: Với Windows thì nên dùng **Snipping tool**, Ubuntu thì là **Gnome screen-shot** còn MacOS thì là các phím tắt hoặc **QuickTime Player**.
* **Cân nhắc việc thêm video evedence vào bug report**.  Nó phải luôn thật ngắn gọn và dễ hiểu, diễn tả được hết điều kiện, quy trình tái tạo bug, lỗi xảy ra ở đâu. Trong một số trường hợp như lỗi xảy ra lúc thực hiện hành động gì trước đó, hoặc lỗi về animation, hiệu ứng, âm thanh, có tác động từ chuột hoặc cảm ứng chạm thì quay video là attachment tuyệt vời nhất để diễn đạt.
* **Chỉ cho team dev thấy lỗi ngay trên máy tính của bạn**. Khi mà dev không thể tái hiện được bug vì nó chỉ bị trên một môi trường đặc biệt nào đó(version của hệ điều hành, thiết bị, độ phân giải của màn hình...). Đừng ngại ngần chỉ ra lỗi cho developer team dù nó chỉ bị trên máy bạn hay chăng nữa thì cũng phải chỉ ra để có thể điều tra rõ ràng về nó.

![](https://images.viblo.asia/2d9bb2d4-8ec0-4295-a234-dd7f1799b8a9.jpg)

Đặc thù của công việc QA đòi hỏi rất nhiều tính trực quan trong công việc. Nếu biết cách áp dụng nó vào trong công việc hàng ngày của mình có thể bạn sẽ thấy sự thay đổi rõ ràng từ mọi phía và hiệu quả công việc cao hơn nhiều đấy. Thử nó đi ^^.

-----

Srouce: https://techbeacon.com/visualization-your-secret-weapon-testing

https://www.google.com

Bài viết có bổ sung thêm bằng kinh nghiệm thực tế của bản thân người viết.