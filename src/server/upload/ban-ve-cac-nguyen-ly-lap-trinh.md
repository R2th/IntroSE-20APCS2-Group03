## Nguyên lý lập trình là gì.

Xây dựng và phát triển phầm mềm là một quá trình bao gồm nhiều bước, bắt đầu từ việc viết code, viết test, sau đó fix bug, và rồi là maintain... quá trình này lặp đi lặp lại. Và làm sao để quá trình đó trở nên tốt hơn, tốt hơn từ bắt đầu của việc viết code, người ta bắt đầu nghĩ về các nguyên lý lập trình, và hi vọng rằng khi mọi người tuân thủ theo, mọi thứ sẽ được cải thiện.

Vậy sau khi có các nguyên lý lập trình rồi, việc lập trình của bạn có trở nên cải thiện hơn không, cái đó mình xin để cho các bạn tự trả lời.

## Có bao nhiêu nguyên tắc lập trình.

Khi bắt đầu tìm hiểu về các nguyên lý lập trình, một thế giới mở toang ra, và rồi nó khiến bạn không ít lần muốn thôi không tìm hiểu nữa. Quá nhiều nguyên lý. Quá nhiều các lời khuyên. Quá nhiều sự áp đặt rằng chúng ta phải làm thế này, phải làm thế kia.

Có mấy ai thật sự trong chúng ta không Google mà còn nhớ tên các nguyên tắc đó.

## Tại sao việc tuân thủ các nguyên tắc lại khó.
Chúng ta dễ dàng tạo ra nguyên tắc cho người khác, chứ không phải nguyên tắc cho bản thân mình. Và con người ta thường có xu lướng phá vỡ các nguyên tắc. Việc tuân theo các nguyên tắc đòi hỏi hiểu biết đúng đắn, duy trì và thiết lập các thói quen, và tất nhiên là nghĩ tới thôi cũng thấy khó rồi.

## Sao chúng ta không tạo nguyên tắc cho mình.

### Nguyên tắc code sao cho đơn giản (simple)

Khi code lúc nào cũng nghĩ đến việc làm sao cho nó đơn giản nhất có thể. Code đơn giản sẽ có các lợi ích:

* Các thành viên trong team có thể tuân theo dễ dàng.
* Sau này người mới cũng dễ dàng tiếp nhận
* Bản thân chúng ta sau này đọc lại để improve, maintain cũng dễ dàng.
* Đặc biệt, khi chúng đơn giản thì hỏng hóc sẽ dễ dàng sửa chữa.

Nói thì dễ, nhưng bản thân chương trình máy tính là một thứ vỗn dĩ rất phức tạp, chúng ta ngày hôm nay sỡ dĩ code được đơn giản và dễ dàng là cả một quá trình cải thiện nhiều năm, và sự tiến bộ về phương pháp luận mới ra đời. Hãy tưởng tượng, này xưa code web với các Framework phức tạp thì ngày ngay có Laravel, Reactjs làm cho việc code PHP hay Javascript trở nên dễ dàng hơn rất nhiều. Các phần phức tạp nhất đã được dấu bên trong.

Vậy làm thế nào để code cho đơn giản, cái đó tác giả cũng không biết, nhưng chúng ta có thể tránh đi một điều có dẫn đến code phức tạp.

* Hãy chia cái hàm to thành nhiều hàm nhỏ hơn.
* Đừng viết các thuật toán, giải thuật gì đó kiểu như optimize cái này cái kia, tiết kiệm cái này cái khác, rồi làm mớ code trở nên khó hiểu.

### Nguyên tắc code sao cho gọn gàng, sạch sẽ (clear & clean)

Nói chung thế nào bạn cũng thích những người gọn gàng sạch sẽ, những nơi gọn gàng sạch sẽ, không ai thích code nhìn lộn xộn và nhức đầu. Làm thế nào để có thể code gọn gàng và sạch sẽ:

* Hãy tạo cho mình một bộ nguyên tắc (Coding Convention)
* Hãy bắt đầu bằng việc đặt tên biến gọn gàng, dễ hiểu
* Hãy thiết kế các function có tên dễ đọc, dễ hiểu
* Hãy làm cho các function có input và output rõ ràng
* Bên trong các function hạn chế if/else/for một cách quá so deep

Và hãy kiên nhẫn để theo đuổi triệt để các nguyên tắc mình đưa ra, hãy nhớ rằng nó không hề đơn giản để làm mọi thứ trở nên gọn gàng và sạch sẽ, phải trải qua nhiều lần cải thiện, rút kinh nghiệm, kiểm điểm bạn mới thiết lập cho mình một bộ các kỹ năng cần thiết để duy trì các thói quen đó.

### Nguyên tắc việc code sao cho có thể dễ dàng tái sử dụng (reusable)

Nếu không được reuse các đoạn mã cứ lặp đi lặp lại, mỗi lần sửa chữa, hay thay đổi bạn lại dễ dàng tạo ra bug, bởi vì quên chỗ này chỗ kia, và tất nhiều đọc code rất khó hiểu.

Việc code để tái sử dụng cũng là việc rất khó, vì ban đầu bạn chỉ cố viết để nó work, chứ không phải viết code cho ngày mai, cho thằng khác nó dùng, lo nghĩ cho ngày mai là chuyện hết sức tiểu thuyết hư cấu và giả tưởng.

Nhưng viết code để tái sử dụng, giúp bạn các kỹ năng về suy nghĩ thấu đáo vấn đế, có lợi cho bạn, khi bạn nghĩ tới điều này, có nghĩa là bạn đang cô lập các vấn đề của mình giúp cho bạn nhìn nhận ra các vấn đề tốt hơn.

### Nguyên tắc chia tách code theo class/module/package độc lập (decoupling)

* Mỗi class nên chỉ làm một việc duy nhất, do vậy chia tách chương trình thành nhiều class khác nhau.
* Mỗi module/package cũng chỉ nên làm các công việc thuộc về domain của nó.
* Bên trong mỗi class/module/package hide đi các implement không cần thiết phải public ra.

Ngoài ra, ngày nay, các ngôn ngữ đều có các package management như Composer của PHP, npm của Nodejs, Go có Go Module v.v... Việc này, giúp cho không chỉ code, mà còn là tổ chức cho toàn bộ một môi trường lớn hơn, như kiến trúc cho công ty, thậm chí public chúng ta thành các open source để đóng góp cho người khác.

### Nguyên tắc theo composition hơn là thừa kế (composition over inheritance)

Việc thừa kế dẫn đến sự phức tạp bởi chúng phụ thuộc lẫn nhau, và để tránh phụ thuộc chúng ta lại phải liên tục tạo ra các thừa kế chồng lấn lên nhau. Và chỉ có việc trace lại các tính năng từ ban đầu đã là sự phức tạp.

Bản thân thế giới máy tính được thiết kế từ điện tử, không phải sinh học, bản thân nó mình tin rằng có là một tổng thể các thành phần độc lập và được gắn lại với nhau. Do do vậy, việc lập trình cơ bản cũng là các thành phần độc lập được gắn với nhau thông qua các interface, và giao tiếp qua các interface.

* Hãy quan sát các tiến bộ gần đây như React là các component được gắn với nhau.
* Hãy để ý rằng Go với việc embedded các struct
* Hãy để ý rằng ngày nay, PHP có trait

## Lời kết

Vậy còn theo các bạn, nguyên tắc của các bạn là gì, hãy để lại comment cho minh biết nha.
Ăn chửi và nhận xét cũng là một cách để mình mở rộng sự hiểu biết và tầm nhìn.