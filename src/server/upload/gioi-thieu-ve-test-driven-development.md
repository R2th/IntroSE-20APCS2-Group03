Ngày nay, những mô hình phát triển phần mềm hướng kiểm thử (test oriented) theo tinh thần Agile – đã và đang được áp dụng rộng rãi. Và chúng ta thường được nghe đến thuật ngữ Test-Driven Development (TDD) ngày càng được phổ biến rộng rãi. Hôm nay chúng ta sẽ tìm hiểu về khái niệm này
# Test Driven Development (TDD)
Chính xác với nghĩa đen của nó: “Test-Driven Development” có thể được tạm hiểu là mô hình phát triển với trọng tâm hướng về việc kiểm thử. TDD được xây dựng theo hai tiêu chí: Test-First (Kiểm thử trước) và Refactoring (Điều chỉnh mã nguồn) . Trong đó, khi một yêu cầu cho một chức năng nào đó (requirement) được đặt ra:

* Developer chuẩn bị các test case hoặc test scenario cho yêu cầu đó trước tiên và chạy thử các test case hoặc test scenario đó lần đầu tiên. Tất nhiên, việc chạy thử này sẽ đưa ra 1 kết quả thất bại vì hiện tại chức năng đó chưa được xây dựng (và thông qua kết quả đó, ta cũng kiểm tra được là test cases được viết đúng).
* Theo đó, dựa vào mong muốn (expectation) của test case hoặc test scenario, developer sẽ xây dựng một lượng mã nguồn (source code) vừa đủ để lần chạy thứ 2 của kịch bản đó thành công.
* Nếu trong lần chạy thứ 2 vẫn đưa ra 1 kết quả thất bại, điều đó có nghĩa là thiết kế chưa ổn và developer lại chỉnh sửa mã nguồn (refactoring) và chạy lại test case đến khi thành công.
* Khi test case được chạy thành công, người developer tiến hành chuẩn hóa đoạn mã nguồn (base-line code) và tiếp tục regression với test case đó và chuyển sang test case tiếp theo. Việc chuẩn hóa bao gồm thêm các comment, loại bỏ các dư thừa, tối ưu các biến…

![](https://images.viblo.asia/bd101b5b-1763-4fd7-b7a0-6b044a00b9bf.gif)

Những quá trình này sẽ đuợc lặp đi lặp lại nhiều lần cho đến khi một function hoặc lớn hơn là một phần mềm được hoàn thành. Trong TDD có một câu rất hay đó là "Any failures in the test run are marked and more Application code is written/re-factored to make these tests pass" nôm na thì là tất cả những lần test case fail đều được đánh dấu lại và sẽ góp phần làm để code được viết thêm hoặc re-factor đến khi nào những test case đó pass. Và khi tất cả những test case đã pass, thì chúng ta có thể make sure rằng ứng dụng hoặc function đó đã được phát triển đúng theo yêu cầu 


Có hai cấp độ TDD:

* **Acceptance TDD (ATDD)**  . Với ATDD, bạn viết một bộ acceptance test case duy nhất hoặc đặc tả hành vi (behavior specìfication) tùy thuộc vào thuật ngữ ưa thích của bạn và sau đó chỉ cần code đủ để thực hiện thử nghiệm đó. Mục tiêu của ATDD là xác định các yêu cầu chi tiết, thực hiện các yêu cầu của bạn trên cơ sở just-in-time (JIT). ATDD còn được gọi là Behavior-Driven Development (BDD).
* **Developer TDD** . Với TDD của Developer, bạn viết bộ test case dành cho developer, đôi khi được gọi không chính xác là unit test, và sau đó chỉ code đủ để thực hiện pass tất cả những test case đó. Mục tiêu của nhà phát triển TDD là làm rõ một thiết kế chi tiết và có thể thực hiện được thiết kế cho yêu cầu của bạn trên cơ sở JIT. Developer TDD thường được gọi đơn giản là TDD.

## Benefits of TDD
1. Unit test chứng minh rằng source code thực sự hoạt động
1. Có thể dễ dàng thiết kế lại code của chương trình
1. Tái cấu trúc cho phép cải thiện thiết kế code
1. Sẽ chuẩn bị được một bộ unit test case có thể dùng để regression nhiều lần
1. Giảm chi phí của các lỗi khi nó được phát hiện sớm 

## Drawbacks of TDD
1. Developer có thể coi đó là một sự lãng phí thời gian
1. Test case có thể giúp xác minh đuợc các mục tiêu class và method chứ không phải dựa trên những gì code thực sự nên làm
1. Test trở thành một phần của chi phí bảo trì dự án (vì phải viết test trước rồi mới code sau)
1. Phải update lại các test case khi requirement thay đổi

# TDD and Agile
Trong quá trình hình thành, TDD có liên quan mật thiết đến khái niệm “Test-First Programming” trong mô hình eXtreme Programming “XP” thuần túy Agile. Tuy nhiên, bằng việc ứng dụng đa dạng và linh hoạt, TDD cũng có những đặc điểm và tùy biến của riêng nó 

![](https://images.viblo.asia/ada85f3c-65f7-41be-9fd2-653c62be07d9.png)

TDD đáp ứng “Tuyên ngôn về Agile” khi bản thân quy trình TDD thúc đẩy tính thực tiễn của sản phẩm, tương tác với người dùng. Để phát huy tối đa những lợi ích mà TDD mang lại, độ lớn của 1 đơn vị tính năng phần mềm (unit of function) cần đủ nhỏ để kịch bản kiểm thử dễ dàng được xây dựng và đọc hiểu, công sức debug kịch bản kiểm thử khi chạy thất bại cũng giảm thiểu hơn.

Thực tế cho thấy một số sự kết hợp giữa TDD và mô hình Agile khác như Scrum có thể hỗ trợ và tối ưu lợi ích của nhau. Ví dụ, việc chia nhỏ Backlog thành các User Story của Scrum khiến việc xây dựng kịch bản kiểm thử hướng TDD trở nên dễ dàng và thuận tiện. Thêm vào đó, cả Scrum và TDD tương đồng trong việc loại bỏ sự chuyên hóa về vai trò của bộ đôi Developer – Tester. Vì lý do đó, đôi lúc có thể bạn sẽ thấy vừa TDD vừa Scrum được áp dụng trong cùng 1 dự án.

# TDD and Traditional Testing
TDD chủ yếu vẫn là một kỹ thuật đặc tả với tác dụng là đảm bảo rằng source code của bạn được test kỹ lưỡng ở mức xác nhận. Tuy nhiên,trên thực tế có nhiều thứ để test hơn thế. Đặc biệt là ở những quy mô lớn, bạn vẫn sẽ cần phải xem xét các kỹ thuật khác của agile testing như pre-production intergration và investigate testing . Phần lớn những kỹ thuật test này cũng có thể được thực hiện sớm trong dự án của bạn nếu bạn có thể áp dụng nó cho dự án để bổ sung thêm cho TDD (và bạn nên). 

Với traditional testing, có thể xem như bạn test thành công là khi bạn tìm thấy một hoặc nhiều bug. Điều này cũng tương tự với TDD; khi test failed, bạn đã đạt được tiến bộ bởi vì bây giờ bạn biết rằng bạn cần giải quyết vấn đề gì. Quan trọng hơn, bạn có một thước đo thành công rõ ràng khi các test case không còn failed nữa mà đã passed. TDD làm tăng sự tự tin của bạn rằng hệ thống của bạn thực sự đáp ứng các yêu cầu được xác định cho nó, rằng hệ thống của bạn thực sự hoạt động và do đó bạn có thể code với sự tự tin to lớn.

Cũng như traditional testing, hệ thống càng lớn thì rủi ro càng nhiều và các phần test của bạn càng cần phải kỹ lưỡng hơn. Với cả traditional testing và TDD, bạn không cần phấn đấu cho testing hoàn hảo, thay vào đó bạn đang thử nghiệm tầm quan trọng của hệ thống. Để diễn giải Mô hình hóa Agile (AM) , bạn nên "testing with purpose" và biết lý do tại sao bạn đang test cái gì đó và nó cần được test đến mức độ nào. Một tác dụng phụ thú vị của TDD là bạn có thể đạt được 100% test coverage - mỗi dòng code đều được test - điều mà traditional testing không thể đảm bảo (mặc dù điều này rất đuợc khuyến khích). Nói chung tôi nghĩ rằng khá chuẩn xác khi nói rằng mặc dù TDD là một kỹ thuật đặc tả chi tiết, nhưng tác dụng của nó có thể mang lại giá trị là test coverage của source code tốt hơn đáng kể so với các kỹ thuật test truyền thống.   

![](https://images.viblo.asia/e657852b-9588-43fd-af61-a402b4b08826.png)

# TDD and Documentation

Có một sự thật không thể chối cãi được là hầu hết các lập trình viên không đọc tài liệu bằng văn bản cho một hệ thống, thay vào đó họ thích làm việc với code hơn. Và không có gì sai với điều này. Khi cố gắng hiểu một class hoặc một hệ thống, hầu hết các lập trình viên trước tiên sẽ tìm sample code đã có trước đó. Nếu bạn viết unit test đủ tốt nó sẽ cung cấp một đặc tả chi tiết và đầy hoạt động về functional code của bạn - và kết quả là unit test sẽ thực sự trở thành một phần quan trọng trong tài liệu kỹ thuật của dự án nói chung và của bạn nói riêng. Hàm ý là tất mọi người đều cần những tài liệu thực sự chuyên nghiệp và rõ ràng về những expectation của dự án. Tương tự, acceptance test có thể tạo thành một phần quan trọng của tài liệu yêu cầu của bạn. Điều này rất có ý nghĩa khi bạn dừng lại và suy nghĩ về nó. Acceptance test sẽ xác định chính xác những gì các bên liên quan mong đợi về hệ thống của bạn, do đó họ có thể làm rõ các yêu cầu quan trọng cho hệ thống. Vì vậy bộ regression test suite của bạn thực sự có thể trở thành những chi tiết thông số kỹ thuật dành cho developer khi code, đặc biệt với cách tiếp cận test-first.

Vậy các bạn có thể đặt câu hỏi, Liệu các test case, regression test suite, acceptance test case có cung cấp đủ tất cả tài liệu cần thiết không? Rất có thể là không, nhưng chúng sẽ tạo thành một phần rất  quan trọng của nó. Ví dụ: bạn có thể thấy rằng bạn vẫn cần những tài liệu về thông tin người dùng, tổng quan hệ thống, hoạt động và một tài liệu hỗ trợ khác . Bạn thậm chí có thể thấy rằng bạn thường xuyền yêu cầu phải có tài liệu tóm tắt tổng quan về quy trình kinh doanh mà hệ thống của bạn hỗ trợ. Khi bạn tiếp cận tài liệu với một tâm trí cởi mở, tôi nghĩ  bạn sẽ thấy rằng kết quả khi áp dụng TDD sẽ bao gồm phần lớn nhu cầu tài liệu của bạn cho developers và cả stakeholders. 

# Summary
Test-Driven Development (TDD) là một kỹ thuật phát triển trong đó trước tiên bạn phải viết test case, test scenario thất bại trước khi bạn code cho một chức năng mới. TDD đang nhanh chóng được các agile software developers phát triển source code cho các ứng dụng của nó và thậm chí còn được các DBA Agile chấp nhận để phát triển cơ sở dữ liệu . TDD nên được coi là bổ sung cho Agile Model Driven Development (AMDD) và cả hai cách tiếp cận này có thể và nên được sử dụng cùng nhau. TDD không thay thế traditional testing, thay vào đó, nó xác định và đảm bảo được cách chứng minh unit test đã hoạt động hiệu quả trên source code. Một tác dụng phụ của TDD là các test result cũng chính là các ví dụ cho cách hoạt động của một function nào đó , do đó cung cấp luôn một đặc tả hoạt động cho code và giúp chúng ta rất nhiều trong khi tạo document cho dự án. TDD là một hoạt động cực kỳ tốt trong thực tế và điều đó đã được chứng mình trong rất nhiều các dự án lớn nhỏ, do đó TDD nên là một hướng tiếp cận mà tất cả các nhà phát triển phần mềm nên xem xét áp dụng.

Nguồn tham khảo :  http://agiledata.org


http://toolsqa.com