![](https://cdn-images-1.medium.com/max/2000/1*waaIrU_RDzVXmz0yHKVU1w.png)

*Những thiết kế phức tạp mà chúng tôi đã học được từ việc xây dựng lại một phần mềm sổ sách kế toán.*

### Sổ sách kế toán khá là khó nhằn

*Đó là sự thật.* Là một doanh nhân nắm giữ một công ty, việc giữ sổ sách của bạn để dễ dàng nắm bắt được các con số tổng kết có thể là một thách thức. Đối với người không thạo về kế toán tài chính, bạn dễ dàng bị đánh thuế quá tay bởi cơ quan nhà nước. Và việc phải nắm rõ con số tài chính là không thể tránh khỏi ngay cả bạn là freelancer, mở một cửa hàng nho nhỏ hoặc chỉ là một doanh nghiệp nhỏ tí xíu.

Tìm một người kế toán tốt với kinh nghiệm trong lĩnh vực bạn kinh doanh sẽ giúp ích rất nhiều và đỡ làm bạn đau đầu với những con số. Đối với chúng tôi, và hàng ngàn đồng nghiệp làm nghề quảng cáo ở Amsterdam, người kế toán đó là [KeesdeBoekhouder](https://www.keesdeboekhouder.nl/) .

Bài viết này nhằm cung cấp cho bạn một cái nhìn chi tiết về cách chúng tôi thiết kế các hệ thống và phần mềm phức tạp. Đó là công việc thường ngày của chúng tôi tại [công ty thiết kế phần mềm Heavyweight](https://heavyweight.nl/) có trụ sở tại Amsterdam, Hà Lan.

![](https://cdn-images-1.medium.com/max/2000/1*UUTs2ao4T6AjcDdydhMznQ.jpeg)

Ảnh: © KeesdeBoekhouder

### Khái niệm cơ bản về kế toán

Khái niệm của phần mềm KeesdeBoekhouder rất đơn giản: Kiểm soát doanh nghiệp của bạn bằng cách theo dõi doanh thu và chi phí thông qua một nền tảng trực tuyến. Bạn cũng có thể kết nối với một trong những người kế toán có kinh nghiệm của trang web. Họ sẽ tìm hiểu về doanh nghiệp của bạn, cung cấp cho bạn các tư vấn và trả lời các câu hỏi của bạn.

Mỗi quý họ kiểm tra và gửi sổ sách của công ty bạn đến cơ quan thuế và chăm sóc các khoản thuế cá nhân của bạn. Bạn có thể dễ dàng đi nghỉ mát, và ở nhà việc quản trị tài chính của bạn được tự động ký tên, niêm phong và giao đến cơ quan thuế nhà nước.

* * * * *

### Tóm tắt về nền tảng sẽ xây dựng

Một phần quan trọng trong loại hình kinh doanh của khách hàng là trang web cung cấp dịch vụ kế toán online. Đó là cầu nối giữa những người làm kế toán và người dùng. Bởi vì hầu hết các trao đổi được diễn ra trên nền tảng web; đối với nhiều người dùng, nền tảng này đồng nghĩa với Thương hiệu.

> Công ty Heavyweight của chúng tôi được yêu cầu thiết kế lại nền tảng kế toán trực tuyến hiện tại của khách hàng, hợp tác chặt chẽ với ban lãnh đạo và nhóm phát triển nội bộ của chính khách hàng.

Vì chúng tôi cũng chính là khách hàng của công ty kế toán online đó, chúng tôi có một góc nhìn độc đáo, chúng tôi là khách hàng của khách hàng. Chúng tôi đã khá quen thuộc với nền tảng hiện tại, và nhận ra những gì tốt, dùng được và những gì cần phải được cải thiện.

* * * * *

### Khám phá

Chúng tôi bắt đầu dự án với một loạt các cuộc họp trực tiếp với khách hàng nhằm tăng cường hiểu biết của chúng tôi về nghiệp vụ và mục tiêu kinh doanh của họ.

![](https://cdn-images-1.medium.com/max/1200/1*VcxVGW4_pIrWmiOlY345EQ.jpeg)

#### Hội thảo chiến lược

Trong hội thảo đầu tiên, chúng tôi đã xây dựng một chiến lược cho cả dự án và nền tảng nói chung.

Chúng tôi đã thảo luận các mục tiêu kinh doanh, các hoạt động bên trong của công ty và các kế hoạch tăng trưởng. Cuộc đối thoại này đã trở thành nền tảng của chiến lược sản phẩm và các mục tiêu chính.

#### Mục tiêu chính

-   *Tạo nền tảng tập trung vào người dùng thực sự tuyệt vời để sử dụng.*
-   *Tạo ra một hệ thống có cấu trúc bền vững, dễ dàng mở rộng trong tương lai.*
-   *Căn chỉnh giao diện của nền tảng phù hợp với Thương hiệu.*
-   *Cải thiện cách thức kết nối và nâng cao hiểu biết của người dùng về các quy trình thuế.*
-   *Cho phép người dùng đặt ra mục tiêu để đạt được và hiển thị sự tiến triển của họ.*

#### Nghiên cứu hành vi người dùng

Vì sản phẩm hiện đã có sẵn, chúng tôi đã dành thời gian để phân tích kỹ cách mọi người sử dụng nó như thế nào. Chúng tôi nhận thấy một số kiểu người dùng.

Chúng tôi đề nghị một số người dùng cho phép chúng tôi quan sát cách họ dùng phần mềm, trong khi họ ngồi thực hiện kê khai một số các loại thuế của họ. Chúng tôi đã học được rất nhiều về người dùng. Ví dụ: Một số sẽ ngồi nhập các chi phí vào hệ thống ngay lập tức. Những người khác lại lười biếng nhập số liệu, để dồn lên tới hàng tháng và có rất nhiều giấy tờ biên lai trên bàn làm việc của họ. Việc thêm những thứ đó vào hệ thống với số lượng lớn là một trải nghiệm rất khác so với việc thêm từng cái một.

Sau khi quan sát, chúng tôi cũng phỏng vấn người dùng 1 vài câu đơn giản.

-   Một số khách hàng không thấy bất cứ thứ gì cần cải tiến. Họ cho biết họ thành thạo cách bố trí hiện tại, và nói rằng nó đã làm việc đủ tốt.
-   Khá nhiều người dùng cho biết họ muốn trang web này giá như hiển thị được trên mọi độ phân giải (full responsive). Bây giờ nó không hiển thị đầy đủ với bất cứ một màn hình nhỏ hơn 15inch nào. Máy tính xách tay 13inch hầu như là không đủ rộng để hiện hết nội dung.
-   Người dùng am hiểu công nghệ sẽ phàn nàn rằng các tính năng bị thiếu, như chỉnh sửa hàng loạt bản ghi, điều hướng bằng bàn phím, v.v.

> Một số lượng lớn khách hàng đáng ngạc nhiên chưa bao giờ sử dụng nền tảng kế toán trực tuyến này. Họ vẫn gửi sổ thuế thu nhập cá nhân bằng bao thư về cơ quan thuế dưới dạng một cuốn sổ to dày.

![](https://cdn-images-1.medium.com/max/2000/1*FlfvLefugK7qDKYKMwx5Hg.jpeg)

Ảnh: © KeesdeBoekhouder

Một phần của lần nâng cấp này cũng nhằm loại bỏ các sổ sách vật lý dạng này. Những người dùng vẫn đang gửi sổ sách cũ sẽ phải chuyển sang nền tảng online.

Sau khi tiến hành nghiên cứu, chúng tôi đã biên soạn một số danh mục User Goals (Mục tiêu người dùng), User Requirement List (Danh sách yêu cầu người dùng) và bảng phân tích MoSCoW.

* * * * *

### Ý tưởng

Sau khi xác định những gì hệ thống cũ đang làm chưa tốt, chúng tôi tập hợp đội để suy nghĩ. Chúng tôi đã đưa ra rất nhiều giải pháp thiết kế và ý tưởng cho các tính năng mới;

* **Phần Tài khoản**

    Kê khai thuế gồm 2 phần riêng biệt: thuế doanh thu của công ty và thuế thu nhập cá nhân của từng người. Nhiều người dùng nhận thấy 2 phần này đang khó phân biệt rõ ràng. Chúng tôi giới thiệu một màn hình cho phép  chuyển đổi loại tài khoản để làm nổi bật sự khác biệt giữa các phần cá nhân và doanh nghiệp.
* **Bảng điều khiển Dashboard**

    Nền tảng này đang thiếu trang tổng quan dạng bảng Dashboard. Chúng tôi thêm trang tổng quan cho các số liệu chung của công ty và năm tài chính. Chúng tôi đưa vào các biểu đồ và đồ thị để cho mọi người thấy sự tăng trưởng và tiến bộ trong kinh doanh của họ so với trừ thuế của họ.
* **Deadlines và todo**

    Để thúc đẩy và giúp mọi người gửi kê khai đúng hạn, chúng tôi sẽ thêm thời hạn kê khai và biểu mẫu kê khai. Những điều này cung cấp cho người dùng định hướng rõ ràng khi có thể làm theo hướng dẫn từng bước.
* **Cộng đồng**

    Chúng tôi muốn thúc đẩy sự hợp tác giữa khách hàng. Bởi vì nhiều khách hàng của khách hàng làm việc trong các lĩnh vực liên quan, có giá trị trong việc tạo ra một cộng đồng nhỏ. Người dùng có thể chọn tham gia để tạo profile (như facebook) - chứa thông tin cơ bản và upload ảnh sau đó kết nối với những người khác.

* * * * *

### Thiết kế UX

Sau khi đã nghiên cứu chiến lược, nghĩ ra rất nhiều ý tưởng mới, đã đến lúc bắt đầu suy nghĩ về một số giải pháp thiết kế.

#### Flow (các bước chuyển màn hình) & cấu trúc màn hình

Trong các cuộc họp, chúng tôi đã tạo một loạt Sơ đồ trang web. Đó là cách tốt để xác định cấu trúc phân cấp và kết nối các phần khác nhau của nền tảng. Vẽ ra được cái sơ đồ này cực kỳ hữu ích bởi vì nền tảng vẽ ra chi tiết sau này sẽ được soi lại về bản này xem có bị thừa thiếu gì không.

![](https://cdn-images-1.medium.com/max/2000/1*Ffipr374-Ij6CeEQOeqLeA.png)![](https://cdn-images-1.medium.com/max/2000/1*Ffipr374-Ij6CeEQOeqLeA.png)

Cũng trong lúc thảo luận, chúng tôi đã thực hiện rất nhiều phác thảo bố cục, để hình dung các tính năng trừu tượng. Nhưng chúng tôi cần một mức độ chi tiết hơn thế. Chúng tôi đã sử dụng các bản phác thảo, URL và Sơ đồ trang web để tạo một Wireframe có độ chính xác thấp.

![](https://cdn-images-1.medium.com/max/2000/1*TP9NNgChGc8AfUFBUpfeKQ.png)![](https://cdn-images-1.medium.com/max/1400/1*TP9NNgChGc8AfUFBUpfeKQ.png)

Sau khi hoàn thành Wireframe có độ chính xác thấp, chúng tôi tin tưởng rằng màn hình đã sẵn sàng để vẽ ra UX/UI chi tiết hơn.

#### Nguyên mẫu tương tác

Tiếp theo là Wireframes có độ chính xác cao. Mỗi màn hình được thiết kế tỉ mỉ với nội dung thực tế. Sau đó, một Prototype tương tác được tạo ra để test và xác nhận các lựa chọn thiết kế của chúng tôi. Test đã cho thấy các vấn đề về flow màn hình và bố cục màn hình - nhưng không có gì quá quan trọng. Việc thiết kế Ũ/UI theo mô-đun làm cho giao diện màn hình dễ dàng cập nhật.

![](https://cdn-images-1.medium.com/max/2000/1*12pwNHmrQ7KR7lmUaj8UNg.png)

### Thiết kế giao diện người dùng

Một trong những mục tiêu chính là sắp xếp nền tảng tương đồng với Thương hiệu. Nền tảng hiện tại chưa được cập nhật gì trong mấy năm gần đây. Do đó điều cấp bách nhất cần phải làm là giao diện, font và màu sắc cần được làm lại cho tươi mới hơn.

![](https://cdn-images-1.medium.com/max/2000/1*ZeS9Q9U-z6ivwflVbDizXw.png)

Bản tóm tắt ý tưởng sáng tạo từ khách hàng chỉ rõ cần thiết kế một nền tảng cảm thấy vững chắc và đầy đủ chức năng. Người dùng có xu hướng dành nhiều thời gian trên nền tảng này. Điều này tác động đến việc chúng tôi lựa chọn từng thiết kế cho phù hợp từng hoàn cảnh.

Chúng tôi đã căn chỉnh nền tảng với tính thẩm mỹ tối thiểu của thương hiệu, sử dụng màu sắc tinh tế và tập trung mạnh vào nội dung thông tin và loại thông tin. Chúng tôi đã cẩn thận tạo ra một giao diện cân bằng giữa hình thức và chức năng.

![](https://cdn-images-1.medium.com/max/2000/1*loYhlrr3BTN4Qmp2zVpHVA.png)

### Bắt đầu phát triển code

Khách hàng cũng có một đội code chuyên code hệ thống cũ, và đội này cũng được đưa vào đội làm sản phẩm mới. Họ đã tham gia vào quá trình từ ngày đầu tiên. Họ cung cấp thông tin chi tiết có giá trị và họ là chìa khóa để tránh đưa ra thiết kế xây dựng quá phức tạp.

Chúng tôi đã tạo ra các thiết kế màn hình bằng cách sử dụng phương pháp Thiết kế dựa trên thành phần. Ngoài ra, chúng tôi tự tạo sẵn một bộ UI chuẩn, dùng lại được nhiều lần cho nhiều dự án, tất cả chúng đều là các control cơ bản nhất. Mỗi khi dự án thay đổi điều bạn cần làm chỉ là đổi Font chữ và Màu nền. Điều này làm cho phát triển app trở nên dễ dàng chỉ copy paste.

***Đọc thêm*** : *[*Cách chúng tôi đang sử dụng Thiết kế dựa trên thành phần*](https://medium.com/@wereheavyweight/how-were-using-component-based-design-5f9e3176babb)

![](https://cdn-images-1.medium.com/max/2000/1*CdZ5QRXV5oQD7A31Nc8WIQ.png)

Mỗi lần chúng tôi thường xuyên đưa nhóm trở lại với nhau để kiểm tra tiến độ của các nhà phát triển. Chúng tôi đã trao đổi phản hồi và thực hiện các thay đổi nhỏ đối với thiết kế khi cần thiết.

* * * * *

### Các kết quả đạt được

Sự ra mắt của nền tảng trực tuyến mới đã được nhiệt tình hưởng ứng một cách áp đảo. Khách hàng không thể hạnh phúc hơn. Họ đã muốn làm mới lại nền tảng online hiện có trong một thời gian dài. Nhìn thấy nó đã thành hiện thực trong một thời gian ngắn như vậy hiến khách hàng rất hài lòng.

![](https://cdn-images-1.medium.com/max/2000/1*Kv0P5FRklw_cNpd8uRM_Jw.png)

Hình. Tổng quan về doanh thu & bảng dashboard sổ sách kế toán

Hàng ngàn người dùng đang tận hưởng các tính năng mới và giao diện mới riêng biệt. Họ được trao quyền nắm rõ, xây dựng và mở rộng hoạt động kinh doanh của họ. Họ có thể kết thúc năm tài chính của công ty họ theo cách hoàn hảo nhất.

![](https://cdn-images-1.medium.com/max/2000/1*41oqRkPS9_NdXthIDfbTxA.png)

Hình. cộng đồng

Nền tảng mới là một phần quan trọng trong chiến lược tăng trưởng của khách hàng - và nó đã được đền đáp;

> Kể từ khi ra mắt nền tảng, khách hàng đã chào đón nhiều khách hàng mới và mở ra hai văn phòng mới để đáp ứng nhu cầu tăng trưởng.

### Hãy cộng tác!

Chúng tôi cũng muốn nói chuyện với bạn về việc giải quyết vấn đề thiết kế của bạn. Hãy cùng cộng tác và định hình sản phẩm của bạn thành một thứ tuyệt vời. Liên lạc với chúng tôi nhé.

*Tìm hiểu thêm về chúng tôi: *[*www.heavyweight.nl*](https://heavyweight.nl/)* .*[](https://heavyweight.nl/)

#### Bạn muốn xem nhiều thiết kế nữa của chúng tôi làm ra?

Đi đến trang [Dribbble](https://dribbble.com/wereheavyweight) để xem chúng tôi đang làm gì mỗi tuần nhé.


Đây là một bài dịch, bạn có thể tham khảo bài gốc tại đây: https://medium.muz.li/design-for-systems-eadce219d76d