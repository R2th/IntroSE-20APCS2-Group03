Những vấn đề cơ bản với test tự động trong agile và DevOps là gì? Các nhà phát triển phần mềm và QA hiện đại đang focus quá nhiều vào test tự động, mà không dành đủ thời gian cho test khám phá (exploratory testing)?

Chúng ta có phát hành được các phần mềm có chất lượng tốt hơn với nhiều kiểm thử tự động không?

Tôi nghĩ là không!

Gần đây, tôi có đọc được một bài post trên mạng truyền thông xã hội như sau:

*"Những gì tôi nhìn thấy trong hầu hết các kiểm thử và QA ngày nay đó là DevOps, tích hợp liên tục (continuous integration) và test tự động (automation test). 

*Mặc dù tất cả đều tốt đẹp, nhưng tôi thấy có rất nhiều các test case nhảm nhí được kiểm thử tự động.*

*Tôi cũng thấy có một vài lỗi được báo cáo trong quá trình test tích hợp và test chức năng mặc dù chúng đều tự động.*

*Trong UAT, người dùng đang tìm thấy ngày càng nhiều lỗi vì các nhóm test không xác định được chúng trong các giai đoạn trước.*

*Nếu chúng ta không dạy mọi người cách viết test case tốt, thì việc hoàn toàn tự động sẽ bị kết thúc...*

Và sự giải thích của tôi là "tào lao".

Dù sao đi nữa, hãy cùng xem những vấn đề thực tế xảy ra trong thế giới của QA hiện đại và test tự động.

### Vấn đề với Modern QA

Hầu hết "Test Automation" trong phát triển agile đều đang trong tình trạng khốc liệt. Ngành công nghiệp phần mềm đang đổ vào một số tiền lớn để thuê "Các chuyên gia tự động hóa" để tăng sự tự tin rằng phần mềm họ xây dựng có chất lượng cao. Tuy nhiên, các bug đáng chú ý hoặc các vấn đề khác vẫn được tìm thấy trong UAT hoặc trong môi trường sản xuất. Vậy, chuyện gì đang xảy ra?

***N.B***. *Với test tự động, tôi chủ yếu đề cập đến test tự động UI.*

Hiện nay, test tự động là trái tim của quy trình phát triển phần mềm hiện đại. Mục đích của nó là giúp deliver phần mềm có chất lượng cao trên cơ sở lặp lại, nhưng có thật sự như thế không?

### Các tester vẫn cần phải test?

Sự thật là trong hầu hết các team agile, các tester không cần test thêm gì nữa.

Manual testing đã mất đi tính chất của nó, nhờ vào thực tiễn phát triển và văn hóa như agile và devOps, từ  đó tạo ra sự phân chia trong giới QA: QA có thể code và QA không biết code.

Bạn thường nghe thấy rằng: "Tôi là một kỹ sư tự động hóa 100%", hay "80% tự động và 20% thủ công", thậm chí là: "Tôi ghét manual testing". 

Thật sự rất sốc!

Trong DevOps, chúng ta được dẫn dắt để tin rằng mọi thứ đều có thể tự động hóa. Và nó không có chỗ cho sự can thiệp thủ công, ví dụ như: manual testing,...

Ngày nay, hầu hết các tester trong team agile đều đấu tranh để theo kịp nhu cầu "Test tự động". Họ đều chịu sức ép rất lớn để tự động hóa mọi story trong sprint, và không đủ thời gian để test khám phá.

Vấn đề xảy ra là các QAs lấy user story và thực hiện tự động hóa các tiêu chí đó, đặc biệt là trong phát triển Agile. Khi làm như vậy, trọng tâm và mục đích chính của họ là sử dụng những kỹ năng code còn hạn chế của mình chỉ để đạt được các tiêu chí test.

Đương nhiên, điều này tạo ra một trọng tâm hẹp khi bạn chỉ quan tâm đến việc test tự động và thấy rằng nó đã pass. Nó chỉ có thể chứng minh được rằng những tiêu chí chấp nhận là đúng hoặc sai, đang hoạt động, và khiến bạn có xu hướng quên nhìn toàn cảnh.  

### Sự suy giảm trong Manual testing

Ngày càng nhiều các tester truyền thống chuyển sang agile testing bằng cách tham gia một số khóa học code và trở nên kỹ thuật hơn.

Tôi nghĩ điều đó là tốt. Là tester, chúng ta nên luôn luôn cố gắng học hỏi những công nghệ mới. Chúng ta nên hiểu về ngăn xếp công nghệ nếu chúng ta muốn test một hệ thống để đạt mức chất lượng cao.

Tuy nhiên, nguyên nhân thực sự các manual tester thực hiện những điều đó là vì họ tin rằng test tự động là vượt trội so với thử nghiệm thủ công, và thật sự code rất thú vị, có đúng không các bạn?

**N.B.** Với manual testing, tôi không đề cập đến việc thực hiện test theo các bước. Mà tôi đang đề cập đến test khám phá (exploratory testing) - những người thử nghiệm thực tế và tò mò thực hiện các hành vi của hệ thống bằng cách thực hiện các hành vi thú vị và chu đáo.

Thật không may, dường như có một sự suy giảm lớn trong thị trường các tester test khám phá. Điều này là khá rõ ràng khi bạn chỉ cần tìm kiếm với từ khóa "Manual tester" và "Automation tester" trong bất kỳ trang tìm việc IT nào và nhìn kết quả của chúng.

### Các vấn đề với Test tự động

Bây giờ, hãy cùng xem tại sao hầu hết các nỗ lực tự động hóa lại không mang lại bất kỳ kết quả nào.

Các lỗi cơ bản thường bị lặp đi lặp lại là:

- Kỳ vọng sai về test tự động
- Test tự động ở sai lớp, sai thời điểm và sử dụng sai tool
- Tự động những bài test vô ích
- Thiếu sót test những vùng quan trọng
- Thiếu kịch bản chính

### Sai kỳ vọng

Nếu chưa đọc bài viết [why would you want to automate a test?](https://www.testingexcellence.com/why-would-you-want-to-automate-a-test/) thì bạn hãy click link này để đọc nhé, bài viết này rất hữu ích đó. (mình sẽ dịch bài này sau nha)

Tóm tắt về bài viết đó là bạn tự động hóa các đoạn test mà bạn muốn chạy thường xuyên. Theo định nghĩa, đây là các đoạn test hồi quy để xác nhận hệ thống vẫn hoạt động đúng sau khi có sự thay đổi.

Tuy nhiên, nếu tự động tìm được nhiều vấn đề của test hồi quy, thì cần đặt ra câu hỏi về kỹ năng của các nhà phát triển và quy trình phát triển. Khi đó không nên tự động test UI cho những đoạn code tồi tệ đó.

### Sai layer, sai tool, sai thời điểm

Đa số các kỹ sư kiểm thử tự động trong team agile xem user story và tự động tiêu chí chấp nhận của nó. Và hầu hết được thực hiện bởi sự kết hợp của Selenium và Cucumber.

Ứng dụng web hiện đại bây giờ được phân chia rõ ràng giữa backend và frontend. Backend chủ yếu bao gồm một số Rest web service hoặc API với end point dễ dàng truy cập.

Có thể test logic ứng dụng ở lớp API. Tuy nhiên, hầu hết các kỹ sư kiểm thử tự động lại xác nhận chức năng ở lớp UI - mức cồng kềnh nhất.

Có các tool giúp đơn giản hóa việc test API như: Karate và Rest-Assured. Chúng ta nên sử dụng chúng trong suốt quá trình phát triển. Tuy nhiên, một số kỹ sư kiểm thử tự động thậm chí còn không biết những điều cơ bản về HTTP, nữa là viết các test scenario để test API.

Với test tự động UI, Cypress là công cụ tuyệt vời. Nó giống với TDD tool cho các front-end developer. Các developer nhận được feedback rất nhanh về các hành vi của các thành phần UI.

Cả Karate và Cypress đều là các công cụ hướng dẫn và hỗ trợ phát triển. Cả hai đều nhẹ, dễ dàng tích hợp và có thể đem lại sự tự tin cho việc phát triển.

Chúng ta cũng có thể sử dụng Selenium hoặc tái sử dụng Cypress để thiết kế một số ít các kịch bản được thực hiện từ đầu đến cuối. Những kịch bản này tạo thành gói hồi quy trọng lượng nhẹ và mang đến sự tự tin trong kinh doanh liên tục.

Tôi thường nghe thấy rằng: "Chúng ta đợi cho đến khi tính năng hoàn thành và ổn định trước khi thực hiện test tự động". Bất kỳ tester chuyên nghiệp nào cũng biết rằng tính năng mới có nhiều lỗi hơn các lỗi hồi quy. Do đó khả năng tìm được nhiều bug ở tính năng đang phát triển hơn là ở tính năng đã ổn định.

Nếu bạn đang dành thời gian để test tự động, hãy thực hiện chúng song song với giai đoạn phát triển vì chúng có thể có nhiều lỗi hơn, có giá trị hơn.

### Tự động những bài test vô ích

Không nên tự động tất cả các bài test chỉ vì lợi ích của nó. Hãy nghiên cứu sơ đồ kiến trúc mức high - level và low - level. Hỏi xem những gì có thể sai. Xem xét những điểm tích hợp và tìm kiếm các điểm thất bại tiềm năng.

Thực hiện phương pháp tiếp cận dựa trên rủi ro với toàn thể phương pháp kiểm tra tổng thể. Khả năng thất bại, mức độ ảnh hưởng của lỗi là gì? Nếu câu trả lời là high, cần tự động các scenario trên tất cả các bản build.

Trong mỗi sprint, chúng ta thường kết thúc việc viết các bài test tự động xung quanh user story cho sprint đó, và quên không tích hợp với các tính năng khác. 

Hãy nhớ rằng test tự động tốn thời gian. Cũng nên nhớ rằng bạn đang không thực sự test khi tự động hóa một bài test, bạn chỉ đơn thuần kiểm tra xem tính năng đó có thỏa mãn các tiêu chí chấp nhận hay không.

Bạn không thể tự động hóa test, nhưng bạn có thể tự động check những gì đã biết.

Vì thế, mỗi khi bạn thực hiện tự động một bài test, hãy nghĩ về khoảng thời gian bạn đã lãng phí bằng cách không test.

### Thiếu sót những khu vực quan trọng

Tôi thấy ngày càng có nhiều sự tắc trách này khi nền văn hóa DevOps ra đời

Trong DevOps, đường ống delivery cùng với các script triển khai là cột sống của sự phân phối và phát triển phần mềm, nhưng chúng hầu như không được test.

Một vài năm về trước, tôi có thể dễ dàng nói rằng tôi nhìn thấy nhiều "vấn đề môi trường" hơn lỗi chức năng. Các vấn đề về môi trường như vấn đề với server CI, với các script triển khai, test environment,...

Các vấn đề về môi trường có ảnh hưởng nghiêm trọng đến effort phát triển và test. Chúng tiêu thụ một lượng lớn thời gian của dev và DevOps, và làm chậm quá trình triển khai. Tuy nhiên, chưa có sự chú ý xem xét để test và ngăn chặn những vấn đề này.

Chúng ta chỉ chấp nhận chúng như là một phần của việc delivery phần mềm hiện nay.

Chúng ta dành nhiều effort để tự động các hành vi chức năng và hoàn toàn không quan tâm đến những điều quan trọng nhất. Tệ hơn nữa là phải dựa vào các thử nghiệm Selenium để biết việc triển khai có hoạt động hay không.

### Thiếu kịch bản chính

Kịch bản là vua! Sau tất cả, các kịch bản giúp tìm thấy lỗi.

Khá thường xuyên, một vấn đề nghiêm trọng bị lack là do không có một kịch bản cụ thể nào cho nó. Số lượng các bài test tự động không có vấn đề. Luật sod chỉ ra rằng, nếu không có một kịch bản được nghĩ ra và test, thì sẽ có một lỗi trong đó.

Thật không may, trong môi trường phát triển agile, không có đủ thời gian dành cho hoạt động "Scenario Workshop" quan trọng này.

### Vấn đề với quy trình

Hãy cùng xem những vấn đề trên biểu hiện thế nào trong một kịch bản phát triển điển hình:

- Product owner viết user story không có hoặc có tiêu chí chấp nhận tối thiểu.
- Không đủ thời gian để sàng lọc story để thảo luận về những kịch bản khác nhau của một user story.
- Tiêu chí chấp nhận được hiểu là test chấp nhận - Vâng, có một sự khác biệt giữa cả hai.
- Tester chỉ tự động các tiêu chí chấp nhận của các user story bằng Selenium hoặc Cucumber.
- Test tự động hầu như luôn là trách nhiệm của các tester tự động.
- Developer không biết những gì được đề cập trong các gói thử nghiệm, thậm chí còn không biết các thực hiện các thử nghiệm tự động.
- Các thử nghiệm tự động được thêm vào một gói hồi quy mở rộng, do đó ngày càng mất nhiều thời gian hơn để chạy mỗi lần.
- Các thử nghiệm chức năng tự động UI được tích hợp vào danh sách các bản build, nó là tốt nhưng...

Một dev push một thay đổi cơ bản và phải đợi 30 phút để các thử nghiệm tự động chuyển sang màu green trước khi chức năng mới được fix hoặc các bug đã fix có thể được deploy lên product. Sẽ chỉ mất 30 phút nếu thử nghiệm pass ngay lần đầu. Nhưng nếu nó fail do một vài thử nghiệm hoặc do vấn đề môi trường, thì nó sẽ mất rất nhiều thời gian.

Vì các thử nghiệm tự động đang chạy, và QA đang điều tra các lỗi ngẫu nhiên, nên developer hoặc/và product owner xác nhận việc thực hiện mới và vui mừng phát hành, nhưng họ không thể vì bản build chưa chuyển màu green.

Sau một thời giân, bản build không chuyển sang xanh hoặc các management thất vọng với các thử nghiệm thất bại, nên họ đưa ra quyết định release bằng mọi cách. Sau đó chỉ sau vài phút, có sự tăng đột biến lên 500 lỗi server.

### Lỗi cơ sở hạ tầng

Các thất bại dường như chỉ ra một mô hình tương tự

- Thất bại trong các điểm tích hợp
- Thất bại trong giao tiếp với app bên thứ 3
- Web service không được nâng cấp và request đến API cuối không thành công
- Một cấu hình sai trên một VMS hoặc nút, dẫn đến các vấn đề không liên tục.

Tuy nhiên, không có một quy trình nào để kiểm tra những vấn đề này như một phần của sự hát triển hoặc delivery.

Trọng tâm của các kỹ sư kiểm thử tự động là tự động hóa các chức năng, không có sự focus vào performance, security hoặc khả năng phục hồi. Và chắc chắn cũng không có thử nghiệm về cơ sở hạ tầng.

Link tham khảo: https://www.testingexcellence.com/problems-test-automation-modern-qa/