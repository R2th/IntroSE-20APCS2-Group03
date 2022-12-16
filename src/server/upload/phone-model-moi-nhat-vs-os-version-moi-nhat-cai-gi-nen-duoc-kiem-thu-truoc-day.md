Chắc hẳn những ai từng kiểm thử phần mềm trên thiết bị di động khi nghe tiêu đề bài viết cũng thấy quen quen đúng không ạ?

Vậy hãy cùng tôi tìm hiểu để trả lời câu hỏi trên nhé!

Đôi khi QA phải đối mặt với một tình huống khó khăn khi mà thời gian bị hạn chế và việc kiểm thử cần ưu tiên môi trường kiểm thử. Trong trường hợp là một ứng dụng trên di động, thì thật khó để đưa ra một quyết định xem việc kiểm thử sẽ bao gồm cái gì và không bao gồm cái gì. 

Khi một sản phẩm dòng Nexus hay Iphone hay Note mới được tung ra thị trường thì chắc chắn phải có những tính năng mới, rồi thì UI lung linh nhằm thu hút người dùng mua điện thoại mới đó. Nó giống như một cuộc chạy đua vậy, nếu một công ty đưa ra một số tính năng nâng cao thì sau đó các công ty khác sẽ cố gắng làm một số tính năng nâng cao hơn cùng với cái giá hợp lý để nắm bắt thị trường. 

Các ứng dụng mà có UI bắt mắt chắc chắn sẽ cần được kiểm thử trên nhiều thiết bị để kiểm chứng xem liệu nhìn UI nó có sống động hay không. Nó là điều không thể để kiểm thử (thậm chí không cần) trên mọi kiểu điện thoại nhưng những thiết bị như Nexus, iPhone và Note thì chắc chắn là nên kiểm thử.

![](https://images.viblo.asia/b077240e-b595-48f3-a390-9395475ae511.jpg)

# Thiết bị hay hệ điều hành: cái gì nên được ưu tiên khi kiểm thử???

Điều này thật khó nhưng chỉ có bạn và nhóm của bạn phải thảo luận để đưa ra quyết định xem cái nào sẽ được ưu tiên hơn trừ khi người sở hữu sản phẩm của bạn đưa ra độ ưu tiên cho bạn.

Bạn có thể hỏi PO nhưng liệu họ có một câu trả lời thỏa đáng hay không khi mà điều này đối với họ cũng là những thứ mới mẻ. Tôi không thể đưa ra cho bạn một câu trả lời trực tiếp nhưng tôi có thể đưa cho bạn một vài dấu hiệu hoặc gợi ý để bạn có thể đưa ra quyết định của mình.

**Các gợi ý bao gồm:**

* Điều đầu tiên và quan trọng nhất cần làm là dành thời gian (không quá hai ngày) để tìm ra những điểm mới mẻ ở thiết bị và OS. Phân chia việc nghiên cứu này với cả các QA khác như thế nó sẽ giúp bạn tiết kiệm thời gian hơn đấy.
* Tập hợp tất cả những gì tìm được và chia sẻ chúng cho nhóm phát triển.
* Thảo luận với nhóm phát triển, BA để xem cái gì ảnh hưởng nhiều hơn tới ứng dụng của bạn.
* Có một ý tưởng rõ ràng về mục đích của việc kiểm thử trước khi chọn lựa giữa thiết bị và OS mới nhất.
* Nếu ứng dụng của bạn là một ứng dụng thương mại như ứng dụng mua sắm thì việc kiểm thử UI là điều quan trọng. Trong trường hợp này, bạn nên kiểm tra xem liệu UI của thiết bị hay UI của OS sẽ bị lệch lạc.
* Nếu ứng dụng của bạn là một ứng dụng mang tính cá nhân hơn kiểu như ứng dụng Email, thì UI chỉ cần nhìn được và cảm thấy không có vấn đề gì nhiều thì trong trường hợp này bạn nên chọn OS cao nhất để kiểm thử.
* Nếu ứng dụng của bạn sử dụng ứng dụng của bên thứ 3 như ứng dụng Bản đồ, gọi điện hay tin nhắn vv thì tốt hơn hết là nên kiểm thử trên OS mới nhất vì các ứng dụng đó không thay đổi với các điện thoại khác nhau.
* Nhưng ngược lại, nếu như việc giới thiệu các tính năng mới như LTE ảnh hưởng tới hiệu suất của ứng dụng thì chắc chắn bạn nên kiểm thử trên điện thoại mới nhất. Kiểu như Công nghệ mạng di động Jio cần một tính năng LTE để thực hiện cuộc gọi. 
* Cũng có thể xảy ra trường hợp điện thoại phiên bản mới nhất được phát hành cùng với OS mới nhất thì nó có thể giải quyết được vấn đề của bạn ở một mức độ nào đó. Nhưng cuối cùng thì việc hỗ trợ OS mới nhất là quyết định của khách hàng. Họ có thể không muốn hỗ trợ OS mới nhất ngay lập tức.

Nói về kinh nghiệm của tôi thì chúng tôi chọn Nexus và iPhone mới nhất cùng với OS Lollipop bởi vì khách hàng của chúng tôi không gấp gáp trong việc hỗ trợ cho OS mới nhất.

Chúng tôi đã kiểm thử Nexus kết hợp với Kitkat vì ứng dụng của chúng tôi tập trung vào việc ghi lại các nhật ký của các sự kiện thành công liên quan tới việc phân phối các gói hàng. Tính năng của Lollipop sẽ không ảnh hưởng nhiều tới ứng dụng của chúng tôi nhưng chúng tôi muốn xem hiệu suất hoạt động trên phiên bản điện thoại mới nhất. 

# Làm thế nào để kiểm thử và chiến lược là gì? 

Một chiến lược tốt cần được lên kế hoạch đúng chỗ khi mà bạn phải xét tới **độ ưu tiên**. 

![](https://images.viblo.asia/db63e4ba-2841-42d2-8d93-4152a935d3a8.jpg)

Dưới đây là danh sách các mục mà bạn nên chuẩn bị sẵn sàng trước khi bắt đầu kiểm thử:

**#1) Ma trận chức năng:**

Tạo một tài liệu với các ma trận các thiết bị điện thoại và tính năng OS mà sẽ ảnh hưởng tới ứng dụng của bạn cũng như các chức năng có thể bị ảnh hưởng khác. 

**#2) UI, Theme & Appearance:**

Chắc chắn 100% là UI, Theme và Appearance sẽ khác nhau. 

Vì thế tạo một tập các Testcase cho kiểm thử UI đặc biệt. Kiểu như tôi có một thiết bị Redmi Note 4 mà có tính năng thiết định theme thay đổi mỗi ngày, nếu như hôm nay màu sắc là xanh sáng thì mai sẽ là xanh da trời hoặc đỏ vv và đương nhiên là màu của các biểu tượng của ứng dụng cũng được ăn theo (đây là điều tôi không thích)

Tạo một tài liệu ma trận tương tự cho UI, theme vv mà nó sẽ có ảnh hưởng tới UI của ứng dụng của bạn.

**#3) Các đối tượng kiểm thử:**

Tùy vào việc bạn chọn kiểm thử thiết bị hay kiểm thử hệ điều hành thì cũng cần tạo các bộ testcase dựa trên các ma trận được nêu trên. Và nên tạo các bộ test case riêng biệt cho mỗi loại. 

**#4) Tagging:**

Đính kèm test case, các lỗi và nếu có thể thì nên bao gồm cả user stories trong khi kiểm thử. Điều này sẽ giúp giảm thiểu một lượng lớn testcase hoặc user stories dùng để tham khảo và chia sẻ trong nhóm. 

**#5) Sử dụng trình giả lập hoặc mô phỏng:**

Đối với kiểm thử OS, bạn có thể kiểm thử UI trên trình mô phỏng hoặc giả lập mặc dù theo quan điểm cá nhân thì tôi không thích kiểm thử kiểu như vậy tuy nhiên đối với kiểm thử UI hay Theme vv thì chúng ta hoàn toàn có thể kiểm thử như vậy để tiết kiệm thời gian. Tránh sử dụng trình giả lập hoặc mô phỏng khi mà kiểm thử thiết bị mới nhất. 

**#6) Tự động hóa:**
 
Trong nhiều tình huống, kiểm thử tự động sẽ giúp tiết kiệm thời gian mà bạn dùng để thực hiện kiểm thử chức năng. Có nhiều công cụ kiểm thử tuyệt vời sẽ làm cho một ngày làm việc của bạn trở nên nhẹ nhàng hơn và bạn có thể có tập trung cho những thứ quan trọng khác đấy.

Dưới đây là một số kinh nghiệm tôi rút ra được trong quá trình kiểm thử:

* Tạo bộ test case phù hợp: Lọc và tạo những testcase mới dựa trên yêu cầu và đảm bảo chắc chắn rằng nó luôn sẵn sàng dùng được để kiểm thử.
* BVT: cố gắng có những test case tự động để tiết kiệm thời gian và nó sẽ giúp cho bạn có được kết quả nhanh chóng trước khi chấp nhận bản build cho việc kiểm thử.
* Thiết bị hay OS đối với kiểm thử ứng dụng: Về việc kiểm thử các chức năng, UI, tính năng của thiết bị hoặc OS. Bạn có thể không cần phải xác minh mọi test case mà chỉ cần xác mình những thứ mà gây ra ảnh hưởng tới những tính năng mới mà thôi.
* Xác minh lỗi/kiểm thử hồi quy: Tập trung nhiều hơn trên thiết bị hoặc các tính năng của OS trong khi kiểm thử hồi quy và phải bao quát được hết cả các chi tiết nhỏ liên quan tới nhau.
* Lĩnh vực kiểm thử: Đảm bảo chắc chắn rằng bạn kiểm thử hết một lượt các chức năng.

![](https://images.viblo.asia/484ed70a-6b52-4a5b-aef2-2b17393c702b.jpg)

# Kết luận

Nếu như PO của dự án của bạn không đưa ra thứ tự ưu tiên thì quyết định của team nội bộ nên được đưa ra một cách cẩn thận. Khi mà trao đổi với PO về quyết định của bạn thì hãy chắc chắn rằng bạn đã liệt kê đầy đủ lý do của những lựa chọn của bạn một cách rõ ràng. 

Dưới nhiều tình huống hơn cả là việc kiểm thử thì một kiến thức đầy đủ và toàn diện về các tác động là vô cùng quan trọng vì nó ảnh hưởng tới các quyết định của bạn. Do đó hãy cân nhắc kỹ trước khi đưa ra quyết định lựa chọn Thiết bị hay là OS. Tốt nhất hãy tạo một trang các tính năng ảnh hưởng tới các chức năng của ứng dụng của bạn. 

Cố gắng sử dụng tự động hóa nhiều hơn vì nó sẽ giúp bạn tiết kiệm được nhiều thời gian và giúp bạn có thể dành nhiều thời gian cho các hoạt động khác nữa.

Đến đây chắc các bạn cũng phần nào trả lời được câu hỏi trên rồi chứ ^^

**Bài viết được dịch từ link:** https://www.softwaretestinghelp.com/phone-model-vs-os-version-test/