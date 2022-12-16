Hiện nay, "test automation pyramid" - hay còn được gọi là "Kim tự tháp test tự động" (Ví dụ có thể kể đến như [bài viết này](https://watirmelon.blog/testing-pyramids/), [hay bài viết này](https://martinfowler.com/bliki/TestPyramid.html)) là những ý tưởng khá phổ biến, nhưng có thể thấy được những vấn đề nghiêm trọng với chúng. Những điều được đề cập tới trong bài viết này là một hướng suy nghĩ khác để có thể sử dụng những khía cạnh hữu ích của "kim tự tháp", đồng thời giảm thiểu những vấn đề mà chiến lược này đem lại:

1. Thay vì mô hình hoá như một kim tự tháp, hãy mô hình quá tình huống như một quả cầu đồng tâm, bởi "bề mặt ngoài" của một hệ thống phức tạp thường có rất nhiều "khu vực" phải để tâm tới.
2. Hãy thử xây dựng nó bằng cách tham khảo một quả cầu đặc biệt mang tên "Trái đất", quá đỗi quen thuộc với tất cả chúng ta, bởi chúng ta đang sống trên bề mặt "thân thiện" và "mến khách" của nó;
3. Tiếp đến, hãy minh hoạ "Trái đất" này với hình dạng kim tự tháp ngược để dồn toàn bộ sự quan tâm và và chú ý của chúng ta lên bề mặt của sản phẩm, "Nơi sinh sống của tất cả mọi người" để chỉ ra sự đối lập với hình dạng kim tự tháp của "Kim tự tháp test tự động" (Mô hình ít quan tâm tới trải nghiệm của người dùng).
4. Kết hợp các yếu tố động (dynamic) cũng như tĩnh (static) vào cả dữ liệu chứ không chỉ riêng code.
5. Chúng ta phải thừa nhận rằng có thể chúng ta chưa test trực tiếp ngay cả level thấp nhất của các công nghệ (Chẳng hạn như Chrome, hay Node.js, hay Android OS). Trên thực tế, chúng ta thường được khuyến khích rằng nên tin tưởng vào những công nghệ này, bởi vì chúng ta không thể tác động được nhiều tới nó.
6. Chúng ta sử dụng khía cạnh địa lý để giải thích trực quan hơn tại sao một chiến lược tooling tốt có thể truy nhập và test sản phẩm ở cấp độ ngầm, dù không nhất thiết ở level thấp hơn của các nền tảng chúng ta đang dựa vào.


![](https://images.viblo.asia/cfe7e8ea-5a84-4c42-99e9-59c2e3db4666.png)


## Những phép tương trợ tốt đáp ứng những lý luận ở cấp độ sâu
Kim tự tháp nguyên bản (là một hình tam giác) là một tương trợ địa lý hình học không ngữ cảnh. Về cơ bản, nó được giải thích rằng: "Chỉ là một hình tam giác có nhiều diện tích ở phía dưới hơn là phần chóp đỉnh, vậy nên chúng ta nên thực hiện nhiều bài test tự động ở các cấp thấp hơn là các cấp cao hơn." Đây không phải một cuộc tranh luận. Chẳng có gì trong bản chất của một hình tam giác có thể nói cho chúng ta biết nó liên quan tới những vấn đề của công nghệ như thế nào. Đây chỉ đơn giản là một hình dạng phù hợp với một khẳng định mà các tác giả muốn truyền tải. Là ký hiệu học với các ngữ nghĩa yếu.

Và dĩ nhiên, không sai khi sử dụng các hình dạng tuỳ ý về mặt ngữ nghĩa để truyền tải thông tin (các hình dạng của chữ "W" và chữ "M" là đối lập nhau, theo một cách nào đó, và chẳng ai quan tâm rằng những điều chúng đại diện lại khôn đối lập). Dù gì thì, đây là một hình thức truyền tải ngữ nghĩa yếu. Một hình thức mạnh hơn là sử dụng tất cả các hình dạng có thể đáp ứng được những lý luận ở mức độ sâu hơn về những chủ đề hiện có.

Mô hình Trái đất tròn - The Round Earth đang cố gắng chỉ ra điều đó. Bằng cách hình dung công nghệ như quả cầu đồng tâm, chúng ta có thể hiểu rằng khối lượng những khả năng, không gian trạng thái của sản phẩn có xu hướng tăng đáng kể với mỗi lớp - layer. Tất nhiên, điều này có thể không cần thiết, bởi sẽ có rất nhiều vấn đề phức tạp có thể "bị khoá" ở những level cao hơn bởi chính những level thấp hơn. Tuy nhiên, đây là những mối nguy hiểm thực sự hiện hữu trong kho công nghệ của chính chúng ta. Một ví dụ về rủi ro này trong thực tế đã phát hiện ra rằng email HTML đánh bại tính bảo mật của Email PGP. Rất tiếc. Càng có nhiều chuông, còi báo và các layer, càng có nhiều khả năng bị rò rỉ thông tin).

Khi diễn giả đem tới cho mọi người về mô hình Trái đất tròn, mọi người thường bắt đầu nói về hang động, hố lún, lở đất và một số câu chuyện đùa về núi lửa và công ty của họ phải sống thế nào trên một "điểm nóng" trên "Trái đất này". Dù chỉ là những chuyện đùa, nhưng chúng cũng chỉ ra sự tương trợ là hữu ích, và liên quan tới những vấn đề thực sự trong công nghệ.

## Mô hình Round Reath chỉ ra những vấn đề trong testing ở nhiều cấp độ

Mô hình kim tự tháp nguyên bản có Unit test ở dưới cùng. Ở cuối trong mô hình Round Earth là framework application, môi trường vẫn hành, và môi trường phát triển - hay nói cách khác, Nền tảng - mà chúng ta - không - test. Có thể có ai đó sẽ test, có thể họ sẽ không. Nhưng bạn có thể không biết và thậm chí không nghĩ tới điều này. Một ví dụ thực tế: Tác giả bài viết đã từng viết code trình biên dịch cho video game trong 16,384 bytes bộ nhớ. Anh ấy cần quản lý từng byte bộ nhớ. Giờ thì ngày ấy không còn nữa, tác giả viết mã Perl và hầu như không quan tâm tới bộ nhớ. 

Nói một cách thực tế, tất cả những sự phát triển đều dựa trên một giả định của "Bedrock". Những giả định này thường an toàn, giống như dung nham hay khí radon hoặc nước ngầm bị nhiễm độc phá vỡ "bedrock". Chúng ta có thể thấy rằng, level công nghệ thấp hơn làm suy yếu thiết kế của chúng ta. Chúng ta phải nhận thức được những rủi ro đó, những không đồng nghĩa với việc chúng ta test nền tảng của chúng ta hoàn toàn trọn vẹn.

Ở level cao hơn, chúng ta có thể test unit code tự viết. Cụ thể hơn là, các Dev có thể làm điều này. Dù là khả thi nếu để cho những non-Dev check unit test, nhưng đây lại là một task đơn giản hơn rất nhiều cho team Dev. Nhưng, nhận thức rằng các Dev làm việc "dưới mặt đất" khi họ test ở level thấp. Nghĩ ở khía cạnh các user sống ở trên đỉnh, dưới ánh sáng, khi mà các Dev chôn vùi trong các Spec detail của chính họ. Các Dev gặp khó khăn khi nhìn nhận sản phẩm từ quan điểm của các User.

Trong khi địa lý có thể là những thảm hoạ, nhưng cũng có thể tĩnh lặng hơn trên cả một bề mặt đầy giông bão nhất. Unit test thường cho phép kiếm tra một cách tổng thể các đầu vào, và thường thì không có quá nhiều những input đầu vào đáng lo lắng. Bước vào hệ thống ở một level cao hơn - tương tác với các sub system - vẫn có nghĩa là chúng ta đang test thông qua các API hoặc các dòng lệnh được kiểm soát, thay vì là những giao diện đồ hoạ được thiết kế riêng cho tương tác giữa tay và mắt. Đây là lúc mà các tools có cơ hội được toả sáng. Hãy nghĩ các test tool như là những chiếc tàu ngầm dưới cơn bảo, bởi các công cụ thực sự đem đến hiệu quả rõ rệt nếu không hoạt động thông qua GUI.

## Mô hình Trái đất tròn gợi nhớ chúng ta về data
Data xuất hiện trong mô hình này, theo nghĩa bóng, là dòng năng lượng. Dòng năng lượng trên bề mặt (ánh sáng mặt trời, gió và nước) và thậm chí những dòng năng lượng chảy ngầm (nước ngầm, dung nham, động đất). Data là vô cùng quan trọng. Khi chúng ta test, chúng ta phải đối mặt với data tồn tại trong các database và trên cả micro-services, một số data đám mây. Đây là những data được build vào trong code, tự động. Vậy nên, data không phải những thứ user type hay cách họ click các button. Có thể thấy rằng unit-level và sub-system-level test thường bỏ qua kích thước của dữ liệu, và điều này có thể được phản ánh tốt hơn trên concept Trái đất tròn.

## Mô hình Trái đất tròn gợi cho chúng ta về khả năng kiểm thử
Một sản phẩm phức tạp có thể được design cùng với testing trong khi tư duy. Một sản phẩm có tính kiểm thử là, trong rất nhiều chức năng, một trong số đó có thể phân tách (Tách rời và test từng modul và chức năng nhỏ này), có thể quan sát và kiểm soát những hành vi của những modul, chức năng này. Điều này thường đòi hỏi việc cho phép các tester truy cập sâu hơn vào từng phần của sản phẩm thông qua command-line interface (Hoặc một số API) và ghi log lại một cách toàn diện.

## Những khía cạnh trào phúng
- Chất lượng trên đòi hòi chất lượng dưới
- Chất lượng trên làm giảm sự phụ thuộc vào những mô hình test high-level đắt tiền.
- Mô hình test low-level không tốn kém sẽ làm giảm sự phụ thuộc vào mô hình test high-level đắt tiền.
- Rủi ro tăng lên với người dùng


Nguồn: https://www.satisfice.com/blog/archives/4947