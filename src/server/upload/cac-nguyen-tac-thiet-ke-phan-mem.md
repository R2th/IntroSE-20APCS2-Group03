## Thiết kế phần mềm là gì? Tại sao các nguyên tắc thiết kế phần mềm lại quan trọng?

Thiết kế phần mềm là một tập hợp các nguyên tắc, thủ tục và phương pháp để phân tích các yêu cầu của người dùng nhằm phát triển phần mềm hiệu quả, đáng tin cậy và có chất lượng cao. Đây là một tập hợp các phương pháp tốt nhất được giới thiệu bởi những chuyên gia nổi tiếng trong ngành. Dù ở đâu các nhóm phát triển phần mềm cũng cần phải giải quyết các vấn đề để viết code không lỗi, dễ đọc và dễ bảo trì. Vì vậy, điều cần thiết là phải tuân theo các nguyên tắc được xác định rõ để thuận tiện cho việc thiết kế và phát triển phần mềm quy mô lớn.

Các nguyên tắc thiết kế phần mềm là các khuyến nghị mà các lập trình viên nên tuân theo trong quá trình phát triển phần mềm. Bài viết này sẽ trình bày một số nguyên tắc thiết kế phần mềm tiêu biểu.

### Lợi ích của các nguyên tắc thiết kế phần mềm
- Giảm độ phức tạp của quá trình phát triển phần mềm.
- Giúp team tránh được các sai lầm và lỗi quan trọng.
- Giúp đạt được mục tiêu phát triển hiệu quả nhất.
- Tăng chất lượng và năng suất của quá trình phát triển.
- Giúp team làm việc một cách có tổ chức.

Bây giờ, cùng tìm hiểu một số nguyên tắc thiết kế phần mềm tiêu biểu.

## Phân tách các mối quan tâm

Khi chỉ định hành vi của một lớp, ta cần xử lý hai vấn đề là: **chức năng** và **toàn vẹn dữ liệu**. Một lớp thường dễ sử dụng hơn nếu hai mối quan tâm này được phân chia nhiều nhất có thể thông qua các phương thức khác nhau. Có hai điểm đặc biệt của nguyên tắc này:
- **Nguyên tắc mô đun:** Điều này có nghĩa là tách phần mềm thành các thành phần có ý nghĩa theo chức năng của chúng để quá trình phát triển nhanh hơn và dễ dàng hơn.
- **Nguyên tắc trừu tượng:** Sự trừu tượng giúp chúng ta tách hành vi của các thành phần phần mềm khỏi chi tiết triển khai của chúng. Chúng ta cần suy nghĩ về mỗi thành phần phần mềm từ hai quan điểm: *Nó thực hiện điều gì?* và *Nó thực hiện điều đó như thế nào?*
Nguyên tắc này cho phép ta tái sử dụng code vì mỗi phương thức được viết để xử lý một tác vụ cụ thể và có thể tái sử dụng cho các đối tượng tương tự.

## Định luật Demeter (Nguyên tắc hiểu biết ít nhất)

Ý tưởng cơ bản ở đây là phân chia các phạm vi trách nhiệm giữa các lớp và đóng gói logic trong một lớp hoặc phương thức. Dưới đây là một số khuyến nghị từ nguyên tắc này:
- Ta cần giữ các thực thể phần mềm độc lập với các thành phần khác.
- **Tối thiểu tương tác:** Ta nên giảm sự tương tác giữa các lớp khác nhau ít nhất có thể.
- **Liên kết:** Ta cần đặt các lớp có quan hệ với nhau vào cùng một package hoặc module.

![](https://ren0503.github.io/dive-into-oops/assets/law-of-demeter.jpeg)

Định luật Demeter làm các lớp độc lập với chức năng của chúng và giảm sự phụ thuộc giữa các lớp với nhau. Điều này, giúp ứng dụng của chúng ta dễ hiểu, dễ bảo trì và mở rộng hơn. Một trích dẫn từ quyển **Clean Code** của Robert Martin:

> Có một kinh nghiệm nổi tiếng được gọi là Định luật Demeter nói rằng một module không nên biết về các phần bên trong của các đối tượng mà nó thao tác. Như chúng ta đã thấy trong phần trước, các đối tượng ẩn dữ liệu của chúng và chỉ để lộ các thao tác. Điều này có nghĩa là một đối tượng không nên để lộ cấu trúc bên trong của nó thông qua các hàm truy cập bởi vì làm như vậy là để lộ, chứ không phải để ẩn cấu trúc bên trong của nó.

## Tránh tối ưu hóa quá sớm

Tối ưu hóa là cần thiết để xây dựng các ứng dụng nhanh hơn và giảm lượng tiêu thụ tài nguyên hệ thống. Nhưng mọi thứ đều có thời gian của nó. Nếu chúng ta thực hiện tối ưu hóa ở giai đoạn đầu của quá trình phát triển, nó có thể gây hại nhiều hơn lợi. Lý do rất đơn giản: phát triển code được tối ưu hóa đòi hỏi nhiều thời gian và nỗ lực hơn. Đồng thời chúng ta cần phải xác minh tính đúng đắn của code liên tục. Vì vậy tốt hơn hết bạn nên sử dụng một phương pháp đơn giản nhưng không phải là tối ưu nhất ngay từ đầu. Sau đó, chúng ta có thể ước tính hiệu suất của phương pháp và quyết định thiết kế một thuật toán nhanh hơn hoặc sử dụng tài nguyên ít hơn.

![](https://ren0503.github.io/dive-into-oops/assets/avoid-premature-optimization.jpeg)

Hãy hiểu nó từ một góc độ khác. Tất cả chúng ta đều đồng ý rằng việc tối ưu hóa sẽ đẩy nhanh quá trình phát triển và giảm tiêu thụ tài nguyên. Nhưng giả sử ban đầu chúng ta triển khai thuật toán hiệu quả nhất và các yêu cầu của chúng ta thay đổi. Chuyện gì sẽ xảy ra? Những nỗ lực của chúng ta để thiết kế một đoạn code hiệu quả sẽ trở nên vô ích và chương trình trở nên khó thay đổi. Vì vậy, sẽ là tốt nhất nếu bạn không lãng phí thời gian của mình vào việc tối ưu hóa quá sớm.

## Giữ Sự Đơn Giản (Nguyên tắc KISS)

Nguyên tắc này xuất hiện vào năm 1960 khi NAVY của Hoa Kỳ tìm thấy cái nhìn sâu hơn về hoạt động của hệ thống: hệ thống phức tạp hoạt động kém nhất và hệ thống đơn giản hoạt động tốt nhất! Họ quan sát thấy rằng sự phức tạp gây ra hiểu biết hệ thống kém và tạo ra nhiều lỗi hơn.

**Ý tưởng của nguyên tắc KISS**: Mã phần mềm đơn giản nên dễ hiểu và linh hoạt trong việc sửa đổi hoặc mở rộng các tính năng mới. Nói cách khác, chúng ta cần tránh sự phức tạp không cần thiết trong khi xây dựng phần mềm. Điều này trông có vẻ hiển nhiên, nhưng chúng ta thường phức tạp hóa mọi thứ bằng cách sử dụng các tính năng ưa thích. Kết quả là, chúng ta đã thêm một số phụ thuộc. Dưới đây là một số khuyến nghị từ nguyên tắc này:
- Bất cứ khi nào chúng ta thêm một phụ thuộc mới bằng cách sử dụng một framework mới hoặc thêm một tính năng mới hoặc một số cách khác, chúng ta nên nghĩ xem liệu sự phức tạp này có xứng đáng hay không! Nói cách khác, trước tiên chúng ta xem xét tính hữu ích của việc thêm một phương thức/lớp/công cụ khác, ...
- Các phương pháp của chúng ta cần nhỏ và được thiết kế để giải quyết duy nhất một vấn đề. Nếu có nhiều điều kiện, hãy cố gắng chia chúng thành một khối code nhỏ hơn. Điều này làm cho code của chúng ta sạch hơn và ít khả năng có lỗi hơn. Nói cách khác, code đơn giản luôn dễ sửa lỗi và bảo trì.

## Không lặp lại bản thân (Nguyên tắc DRY)

Nguyên tắc DRY nói rằng lặp lại cùng một đoạn code ở những nơi khác nhau không phải là một ý kiến hay. Nó giúp chúng ta thúc đẩy khả năng tái sử dụng code và làm cho nó dễ bảo trì hơn, có thể mở rộng và ít lỗi hơn. Nguyên tắc này bắt nguồn từ cuốn sách “The Pragmatic Programmer” của Andy Hunt và Dave Thomas.

![](https://ren0503.github.io/dive-into-oops/assets/dont-repeat-yourself.jpeg)

Hãy hiểu nó theo một góc nhìn khác! Trong các hệ thống phần mềm, luôn có nhu cầu bảo trì và sửa đổi code sau đó. Nếu một số phần của code được lặp lại ở một số nơi, nó sẽ dẫn đến một thách thức quan trọng: một thay đổi nhỏ trong source code sẽ kích hoạt sự thay đổi đối với cùng một code ở một số nơi. Giả sử ai đó bỏ lỡ một trong những thay đổi, thì họ sẽ gặp phải lỗi. Những lỗi này có thể tốn thêm thời gian, công sức và sự tập trung. Ý tưởng giải pháp được đề xuất sẽ là:
- Chúng ta không nên lặp lại trong khi viết code hoặc tránh sao chép code ở những nơi khác nhau. Nếu không, việc bảo trì trong tương lai sẽ phức tạp hơn. Nếu bất kỳ đoạn code nào xảy ra nhiều hơn hai lần, chúng ta nên chuyển logic chung đó sang một phương thức riêng biệt.
- Mỗi phần dữ liệu phải có một điểm tham chiếu, sao cho việc thay đổi một phần dữ liệu đó không yêu cầu thay đổi code liên quan ở những nơi khác.

## Bạn sẽ không cần nó (Nguyên tắc YAGNI)

Có một vấn đề nổi tiếng trong việc phát triển phần mềm! Đôi khi chúng ta có thể cảm thấy rằng chúng ta cần chức năng đó trong tương lai. Nhưng rất nhiều lần, chúng ta thậm chí có thể không cần nó do các yêu cầu phần mềm thay đổi. Cuối cùng, một số hoặc hầu hết các chức năng này trở nên vô dụng.

Vì vậy, theo nguyên tắc YAGNI: chúng ta không nên thêm chức năng để giải quyết một vấn đề trong tương lai mà chúng ta không cần ngay bây giờ. Luôn thực hiện mọi thứ khi bạn cần. Nói cách khác, nguyên tắc này nhằm mục đích tránh sự phức tạp nảy sinh từ việc thêm chức năng mà chúng ta nghĩ rằng chúng ta có thể cần trong tương lai. Lưu ý: YAGNI xuất phát từ phương pháp luận phát triển phần mềm được gọi là Lập trình cực đoan (XP).

## Tập hợp nguyên tắc SOLID

SOLID là một tập hợp các nguyên tắc hướng đối tượng, trong đó mỗi ký tự của SOLID biểu diễn một nguyên tắc. Khi được áp dụng, các nguyên tắc này giúp nhà phát triển tạo ra code dễ bảo trì và mở rộng theo thời gian.

Nó bao gồm các nguyên tắc thiết kế được giới thiệu bởi Robert C. Martin với tiêu đề "Design Principles and Design Patterns". Ta sẽ đi sâu vào từng nguyên tắc thiết kế phần mềm:

### Single Responsibility Principle

Theo nguyên tắc này, mọi lớp hay phương thức chỉ có trách nhiệm cho một chức năng duy nhất được cung cấp bởi phần mềm, và lớp hay phương thức nên đóng gói hoàn toàn nhiệm vụ của nó. Nói cách khác: một lớp hay phương thức chỉ có một trách nhiệm và chỉ có một lý do để thay đổi, như chỉ một phần của ứng dụng chịu ảnh hướng bởi lớp nếu như một phần của nó thay đổi.

![](https://ren0503.github.io/dive-into-oops/assets/solid-srp.jpeg)

Khi thiết kế các phương thức hay lớp bằng cách làm chúng chỉ chịu trách nhiệm cho một chức năng duy nhất, code của chúng ta sẽ trở nên dễ hiểu, dễ bảo trì và chỉnh sửa. Bất cứ khi nào ta muốn thay đổi bất kỳ chức năng nào, ta biết chính xác chỗ cần thay đổi code của mình.
- Nguyên tắc SRP giúp code trở nên dễ tổ chức và cải thiện khả năng đọc code.
- Nếu ta dùng các hàm và lớp ngắn gọn, tập trung vào một chức năng duy nhất, ta có thể tái sử dụng dễ dàng.

### Open-Closed Principle

Theo nguyên tắc này, ta nên thay đổi hành vi của một lớp mà không chỉnh sửa nó.
- **Mở cho mở rộng:** Ta nên thêm các tính năng mới cho lớp hay module mà không thay đổi code đã tồn tại.
- **Đóng cho chỉnh sửa:** Với code đang hoạt động, ta không nên thay đổi chúng để thêm chức năng.

![](https://ren0503.github.io/dive-into-oops/assets/solid-ocp.jpeg)

Hãy hiểu điều này từ một góc nhìn khác! Chúng ta bắt đầu quá trình phát triển bằng cách triển khai nhiều chức năng, thử nghiệm chúng và phát hành cho người dùng. Nhưng khi có nhu cầu phát triển các chức năng mới sau này, điều chúng ta cần làm là thực hiện các thay đổi đối với chức năng hiện có đang hoạt động tốt. Do đó theo nguyên tắc này, thay vì thay đổi chức năng hiện có, chúng ta nên xây dựng chức năng mới trên chức năng hiện có.

### Liskov Substitution Principle

Vào năm 1988, Barbara Liskov đã giới thiệu nguyên tắc này trong bài p "hát biểu quan trọng của hội nghị "Hệ thống phân cấp và trừu tượng dữ liệu". Cô ấy có nói rằng:
> Các lớp dẫn xuất nên được thay thế bởi các lớp cơ sở của chúng

![](https://ren0503.github.io/dive-into-oops/assets/solid-lsp.jpeg)

Nói cách khác, môt đối tượng của một lớp cha phải trao đối với một đối tượng của lớp con mà không thay đổi chương trình.
- Một lớp kế thừa nên bổ sung chứ không thay thế hành vi của lớp cơ sở.
- Chúng ta có thể thay thế lớp con cho lớp cha và mong đợi các hành vi cơ bản tương tự.

### Interface Segregation Principle

Nguyên tắc này được định nghĩa bởi Robert C. Martin khi ông tư vấn cho Xeror. Xeror được thiết kế là một phần mềm in kiểu mới thực hiện nhiều tác vụ khác nhau như đóng ghim và gửi fax. Khi phần mềm ngày càng phát triển, việc sửa đổi ngày càng trở nên khó khăn hơn, do đó, ngay cả một thay đổi nhỏ nhất cũng sẽ mất chu kỳ triển khai lại trong một giờ, điều này khiến cho việc phát triển gần như không thể.

Vấn đề thiết kế phần lớn nằm ở tất cả tác vụ sử dụng đến lớp `Job`. Một lệnh gọi đến `Job` bất cứ khi nào thực hiện thao tác in hay đóng ghim cần được thực hiện. Kết quả này nằm trong một lớp lớn với rất nhiều phương thức cụ thể cho các client khác nhau. Vì thiết kế này, nên thao tác đóng ghim sẽ biết tất cả các phương thức của thao tác in, ngay cả khi chúng không sử dụng gì đến.

Đề xuất giải pháp của Martin được gọi là Interface Segregation Principle. Thay vì có một lớp `Job` lớn, ta sẽ tạo hai interface là `StableJob` và `PrintJob` được sử dụng bởi lớp `Staple` và `Print`, chúng sẽ gọi đến các phương thức của lớp `Job`. Do đó, một interface sẽ được thiết kế cho một kiểu công việc, tất cả được triển khai bởi lớp `Job`.

![](https://ren0503.github.io/dive-into-oops/assets/solid-isp.jpeg)

Nguyên tắc này đảm bảo phía client sẽ không bao giờ bị ép phụ thuộc vào những phương thức mà họ không dùng đến. Ta đạt được điều này bằng cách **tạo các interface nhỏ và tập trung**. Sẽ tốt hơn nếu ta chia interface lớn thành các phần cụ thể tập trung vào một tập các chức năng riêng biệt để client có thể chọn phụ thuộc cho chức năng mà họ cần.

### Dependency Inversion Principle

Nguyên tắc này nói rằng các module cấp cao không nên phụ thuộc vào module cấp thấp mà chỉ phụ thuộc vào lớp trừu tượng của nó. Tương tác giữa hai module nên thông qua một lớp trừu tượng tương tác với chúng. Nói đơn giản hơn, ta nên sử dụng interface thay vì các triển khai cụ thể bất cứ khi nào có thể.

![](https://ren0503.github.io/dive-into-oops/assets/solid-dip.jpeg)

Lý do đằng sau nguyên tắc này là gì? Câu trả lời rất đơn giản: sự trừu tượng không thay đổi bất cứ điều gì. Do đó ta có thể dễ dàng thay đổi hành vi của source code và triển khai chúng trong tương lại.

- Nó cũng cho phép các lập trình viên làm việc mượt mà ở cấp interface, không phải cấp triển khai.
- Nó tách một module khỏi triển khai chi tiết phụ thuộc với nó. Module chỉ biết đến các hành vi mà nó phụ thuộc, chứ không biết cách triển khai. Điều này cho phép ta thay đổi các triển khai mà không làm ảnh hướng đến module.

## Các nguyên tắc khác

- **Đo hai lần và cắt một lần:** Như chúng ta đã biết, việc lập kế hoạch dự án phát triển phần mềm tốt có thể tạo ra một kết quả tốt hơn. Vì vậy, trước khi xây dựng các chức năng, chúng ta nên chọn đúng vấn đề, cách tiếp cận giải pháp phù hợp, công cụ phù hợp, tập hợp nhóm phù hợp, xác định các thước đo hoàn hảo trước khi thực hiện bất cứ điều gì,...
- **Nguyên tắc nhất quán:** Tuân theo một phong cách viết code nhất quán giúp chúng ta hiểu và đọc code một cách hiệu quả. Nó tiết kiệm rất nhiều thời gian cho các lập trình viên trong việc giải quyết các vấn đề quan trọng. Hãy nhớ rằng: code phức tạp có thể trông tuyệt, nhưng code dễ đọc luôn tuyệt hơn!
- **Nguyên tắc tổng quát:** Điều cần thiết là thiết kế phần mềm không bị giới hạn và ràng buộc. Nói cách khác, chúng ta nên phát triển dự án để nó không bị giới hạn hoặc hạn chế trong một số trường hợp/chức năng. Điều này sẽ giúp chúng ta cung cấp dịch vụ cho khách hàng một cách rộng rãi dựa trên nhu cầu chung của họ.
- **Đừng tạo lại cái bánh xe**: Có rất nhiều mã nguồn mở ngoài kia. Vì vậy, một trong những lãng phí thời gian lớn nhất trong kỹ thuật phần mềm là xây dựng code để thực hiện điều gì đó mà ai đó đã viết.
- **Tuân theo các phương pháp lập trình hiện đại:** Để đi vào xu hướng công nghệ hiện nay, các phương pháp lập trình hiện đại là điều cần thiết để đáp ứng yêu cầu của người dùng theo cách mới nhất và tiên tiến nhất.
- **Phát triển sự hiểu biết rõ ràng về các yêu cầu:** Việc hiểu các yêu cầu của người dùng thông qua một quy trình phân tích yêu cầu được xác định rõ ràng là rất quan trọng đối với thiết kế phần mềm tốt.
- **Xác định tầm nhìn của dự án:** Thiết kế và duy trì tầm nhìn của dự án là một trong những điều quan trọng nhất trong suốt quá trình phát triển hoàn chỉnh và rất quan trọng để thành công.
- **Viết tài liệu tốt:** Khi các nhà phát triển khác làm việc trên code của người khác, họ không nên bị bối rối và lãng phí thời gian để tìm hiểu code. Vì vậy, cung cấp tài liệu tốt hơn cho từng bước phát triển là một cách tốt để xây dựng các dự án phần mềm.
- **Thêm trình ghi log**: Đảm bảo rằng bạn có cách log theo dõi việc thực thi code, có nhiều cấp độ log khác nhau (ví dụ: thông tin, cảnh báo, lỗi).

## Tham khảo

[enjoyalgorithms](https://www.enjoyalgorithms.com/blog/principles-of-software-engineering)