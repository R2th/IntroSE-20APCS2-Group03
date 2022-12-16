Code chất lượng là điều mà ai cũng nhắc đến, nhưng chưa chắc đã thực hiện.

Hầu hết mọi người đều biết thế nào là tốt, như dễ đọc dễ hiểu, không tồn tại lỗi nghiêm trọng, cover đầy đủ các trường hợp, self-documenting code v.vv.. thế nhưng việc viết được lại khó hơn nhiều. Liệu người khác sẽ nghĩ sao về những dòng code của mình, sẽ nắm bắt 1 cách đơn giản hay coi nó như ác mộng, thực sự là thử thách đối với mỗi lập trình viên. Không chỉ thế, khi dự án cứ to dần lên, sẽ có ngày chính bạn không đọc nổi những gì bản thân đã viết.

Để không bao giờ bỏ qua chất lượng code, cần phải tạo ra những quy tắc để bạn có thể dựa vào, để luôn tham chiếu đến trong khi làm việc.

Dưới đây là 5 quy tắc mà tôi vẫn thực hiện mỗi khi code. Chúng giúp tôi đạt năng suất cao trong công việc, giúp đồng nghiệp của tôi có thể dễ dàng tiếp cận và triển khai các đoạn code của tôi. Tôi mong rằng chúng cũng có thể giúp bạn code tốt hơn!

![Review_Code](https://images.viblo.asia/271c8c17-edc2-450f-a24f-5f1057dc0f17.png)

## Test

Test là việc mà ai cũng biết là nên làm, nhưng đôi khi đứng trước áp lực thời gian, chúng ta hay lựa chọn việc đi tắt. Thế nhưng, dù chỉ là vài dòng code đơn giản cũng có thể để lại hậu quả nghiêm trọng nếu chúng ta nghĩ chả việc gì phải test.

Để 100% đảm bảo code chạy tốt, không có cách nào khác ngoài test.

Hãy bắt đầu với unit test để kiểm tra xem từng phần nhỏ có hoạt động đúng mong muốn hay chưa. Sau đó, dần dần test với từng subsystems, và cuối cùng là test trên toàn bộ hệ thống. Thực hiện hoàn chỉnh theo trình tự đó sẽ giúp bạn dễ dàng biết đc nơi vấn đề có thể phát sinh, xuất phát từ component đơn lẻ hay subsystem nhỏ nào.

## Đặt tên có ý nghĩa

Đây chính là self-documenting code. Khi bạn đọc lại các đoạn code cũ, bạn không cần phải xem kỹ từng comment hay phải chạy thử để biết ý nghĩa của đoạn code đó là gì. 

Hãy để code có thể đọc được như 1 đoạn văn tiếng Anh đơn thuần. Điều này áp dụng cho cả tên biến, class hay function. Chúng cần được đặt tên sao cho không cần giải thích vẫn hiểu được. Thay vì lười biếng để là "x", "y", "z", hãy lựa chọn "width" hay "distance" - những từ ngữ đại diện cho thế giới thực.

## Class và function nên chia nhỏ và tuân theo SRP (Single Responsibility Principle)

Các class và function nhỏ thực sự có ích lợi. Trước hết, chúng cho phép việc unit test được diễn ra độc lập. Nếu đoạn code bạn đang phải test nhỏ, việc tìm nguồn và sửa lỗi bất cứ vấn đề nào xuất hiện trong khi test hoặc khi triển khai trở nên dễ dàng hơn.

Các class và function nhỏ cũng giúp cho việc đọc trở nên dễ dàng hơn. Thay vì có một khối code khổng lồ với nhiều vòng lặp và vô số các biến, bạn có thể giảm khối code đó thành một function có thể chạy nhiều function khác nhỏ hơn. Sau đó bạn có thể đặt tên cho các function dựa trên chức năng của chúng và đó, bạn đã có một đoạn code mà con người có thể đọc hiểu được !

SRP mang lại cho bạn những lợi ích tương tự. 
Trách nhiệm đơn có nghĩa là bạn chỉ cần test một số ít các edge case và các trường hợp đó tương đối dễ dàng để debug. 
Thêm vào đó, việc đặt tên cho các function sao cho sát với thực tế cũng trở nên tương đối dễ dàng.
Do mỗi function chỉ có một mục đích sử dụng duy nhất nên các function này được đặt tên tương ứng với mục đích của nó, tránh được việc phải đặt tên cho một function mà cần giải quyết rất nhiều vấn đề khác nhau.

## Bắt và xử lý các exceptions, ngay cả khi bạn nghĩ bạn không cần phải làm điều đó

Các exceptions trong code thường là các edge cases hoặc các errors mà chúng ta mong muốn được giải quyết bằng cách thức riêng của mình.
Ví dụ, thông thường khi một lỗi xuất hiện thì chương trình sẽ ngưng chạy, điều này chắc chắn chúng ta không muốn xảy ra trên production - nơi các end-users đang sử dụng. Chúng ta cần xem xét lỗi đó riêng biệt, có khi chỉ thử xem liệu nó có thực sự quan trọng không, hay có thể bỏ qua nó.

Bạn nên thường xuyên bắt và xử lý các exceptions một cách cụ thể ngay cả khi bạn nghĩ rằng mình không cần phải làm thế. Phòng còn hơn chữa. Việc giải quyết các exceptions giúp cho bạn nắm bắt được các thứ tự và kiểm soát đoạn code của mình một cách tốt hơn do bạn hiểu một cách cụ thể những gì có thể sẽ xảy ra nếu như những exceptions xuất hiện hay một đoạn code nhỏ gặp lỗi. 

Hiểu biết sâu hơn về đoạn code làm cho việc debug trở nên dễ dàng và giúp đoạn code có khả năng kháng lỗi cao hơn.

## Logs, logs, logs

Hãy ghi lại log. Không bao giờ logs trở nên thừa thãi.

Các log thực sự là cứu cánh hàng đầu cho việc debug và theo dõi ứng dụng đang chạy trên môi trường production.
Bạn nên ghi lại log cho mỗi bước chính của chương trình, bất cứ tính toán quan trọng, errors, exceptions hay kết quả bất thường nào.
Việc ghi lại log thời gian các sự kiện đó diễn ra cũng có thể trở nên hữu hiệu cho việc theo dõi.
Tất cả những thông tin này giúp cho việc xác định chính xác bước nào trong hệ thống gặp sự cố trở nên đơn giản hơn. 

Có rất nhiều ngôn ngữ lập trình phổ biến như Python sử dụng hệ thống ghi log riêng với rất nhiều chức năng hữu ích mà bạn có thể tìm hiểu. 
Nếu phần mềm của bạn chạy dưới dạng ứng dụng SaaS thì có thể bạn sẽ muốn cân nhắc việc ghi log tập trung ngoài thiết bị.
Bằng cách này khi một máy chủ thuộc hệ thống gặp sự cố thì bạn cũng có thể khôi phục lại các logs một cách dễ dàng ! 

---

*Source*: [These 5 “clean code” tips will dramatically improve your productivity](https://medium.com/@george.seif94/these-5-clean-code-tips-will-dramatically-improve-your-productivity-b20c152783b)