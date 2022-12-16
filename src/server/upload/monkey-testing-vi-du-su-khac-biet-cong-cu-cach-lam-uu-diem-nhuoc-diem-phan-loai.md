Monkey testing  là một kỹ thuật được sử dụng trong kiểm thử phần mềm để kiểm tra ứng dụng hoặc sản phẩm bằng cách cung cấp dữ liệu ngẫu nhiên và quan sát nếu hệ thống hoặc ứng dụng gặp sự cố hoặc báo lỗi. Monkey testing cũng được gọi là `Fuzz Testing sometimes.`
* Trong Monkey Testing, dữ liệu ngẫu nhiên được nhập vào ứng dụng để kiểm tra hành vi của ứng dụng và xem liệu nó có báo lỗi không
* Trong Monkey Testing, người kiểm tra hoặc đôi khi nhà phát triển cũng được coi là một con khỉ và cho rằng nếu một con khỉ sử dụng máy tính thì nó sẽ nhập một số dữ liệu ngẫu nhiên mà không có bất kỳ kiến thức hay hiểu biết nào.
* Ở đây các bài kiểm tra được thực hiện rất ngẫu nhiên và nó có thể không đúng.
* Monkey Testing không theo bất kỳ trường hợp thử nghiệm.
* Do thử nghiệm ngẫu nhiên như vậy, người kiểm tra có thể không thể tạo lại các vấn đề hoặc lỗi.
![](https://images.viblo.asia/d970fc8a-3a95-40a5-9942-b021a40835c4.jpg)

### Nguồn gốc của Monkey testing

Monkey testing được sử dụng lần đầu tiên vào năm 1983 trên Mac để kiểm tra MacWrite và MacPaint.
![](https://images.viblo.asia/439bc94f-379f-4547-8e85-c0b28e7b5f22.jpg)

Macintosh ban đầu có 128K byte bộ nhớ và sau khi phân bổ bộ nhớ cho hệ thống và chỉ hiển thị 90K bộ nhớ cho các ứng dụng.

MacWrite và MacPaint đã phải sử dụng bộ đệm ngoài màn hình nhưng kích thước gấp 3 lần màn hình để hoạt động. Cần phải kiểm tra ứng dụng này trong điều kiện bộ nhớ thấp để kiểm tra xem chúng có bị sập không.

Tuy nhiên, rất khó để tái tạo các điều kiện của 1 lần crash.

Vì vậy, Steve Capps và nhóm đã sử dụng chú khỉ, Khỉ là một chương trình mà họ nghĩ ra để tham gia các sự kiện ngẫu nhiên cho MacWrite và MacPaint. Khỉ có thể được chạy song song / đồng thời với các chương trình khác, nhập dữ liệu và thực hiện các hành động trong các chương trình khác.

Điều này sẽ thực hiện nhanh hơn một người dùng thông thường. Điều này tương tự như một con khỉ đập vào bàn phím đẩy các phím ngẫu nhiên, nhấp và kéo chuột ngẫu nhiên.

Nhóm đã phát triển nó để tạo ra một tỷ lệ phần trăm cụ thể của các lệnh, nhấp chuột vào menu, các sự kiện cửa sổ, vv trong số tất cả các sự kiện ngẫu nhiên để họ có thể nhắm mục tiêu thử nghiệm theo yêu cầu của họ.

Là một thiết bị thử nghiệm, The Monkey hoạt động khá hiệu quả và nhóm nghiên cứu cảm thấy thú vị khi thấy các bản vẽ được tạo ra bởi The Monkey mặc dù các tác phẩm viết rất ngớ ngẩn.

Lúc đầu, Monkey rất giỏi trong việc làm hỏng các ứng dụng nhưng một khi lỗi đã được sửa, nó khiến khỉ khó tìm ra khuyết điểm hơn.

### Ưu điểm của Monkey testing

* Monkey testing là một cách tiếp cận rất tốt để tìm ra một số lỗi mới có thể không xảy ra trong các tình huống đã nêu.
* Monkey testing cũng có thể là một cách tốt để thực hiện tress testing and load testing vì các kịch bản được kiểm tra nói chung là ngẫu nhiên và adhoc.
* Nó rất dễ thực hiện vì nó chỉ cần một số dữ liệu ngẫu nhiên để chạy với một số thử nghiệm ngẫu nhiên.
* Thực hiện các trường hợp thử nghiệm và thiết lập các chi phí môi trường là rất ít trong Monkey testing
* Bằng cách sử dụng các công cụ, quá trình kiểm tra Monkey có thể được tự động hóa.
* Monkey testing có thể được thực hiện cho các ứng dụng máy tính để bàn, ứng dụng web cũng như các ứng dụng di động.

### Nhược điểm của Monkey testing
* Thử nghiệm được thực hiện trong quá trình Monkey testing là ngẫu nhiên đến mức không thể hoặc rất khó để tạo lại bất kỳ lỗi nào.
* Nó rất khó khăn và tốn thời gian để phân tích các vấn đề bất ngờ được tìm thấy trong Monkey testing
* Người kiểm thử gặp khó khăn trong việc xác định các kịch bản kiểm tra chính xác và họ cũng không thể đảm bảo tính chính xác của các trường hợp kiểm thử.
* Monkey testing có thể tiêu tốn rất nhiều thời gian trước khi tìm ra lỗi vì nó không có bất kỳ thử nghiệm nào được xác định trước.

### Ví dụ / Loại Monkey testing

> Có ba loại Monkey testing

`Dumb monkey tests:`

* Trong các Dumb monkey tests: người kiểm tra không có kiến thức về sản phẩm hoặc ứng dụng.
* Họ không có bất kỳ ý tưởng nào về đầu vào của mình cho dù nó hợp lệ hay không hợp lệ.
* Chúng còn được gọi là khỉ không biết gì.

`Smart monkey tests:`

* Trong Smart monkey tests, người kiểm tra có ý tưởng tốt về hệ thống hoặc ứng dụng.
* Họ biết chính xác chức năng của sản phẩm.
* Họ cung cấp các đầu vào hợp lệ để thực hiện thử nghiệm.

`Brilliant monkey tests:`

* Trong thử nghiệm Brilliant Brilliant, người kiểm tra có ý tưởng công bằng về cách người dùng đang sử dụng sản phẩm.
* Họ thực hiện thử nghiệm của họ với phối cảnh người dùng.

### Sự khác biệt giữa Thử nghiệm Fuzz và Monkey testing

* Về mặt kỹ thuật,  Monkey testing đề cập đến các hành động ngẫu nhiên đang được thực hiện trong khi thử nghiệm ứng dụng.
* Kiểm tra Fuzz đề cập đến việc sử dụng dữ liệu ngẫu nhiên khi kiểm tra ứng dụng để xem chúng tôi có gặp lỗi không.
* Đây là hai loại thử nghiệm riêng biệt
* Tuy nhiên, trong một khoảng thời gian, các tên đã được sử dụng thay thế cho nhau và thử nghiệm Monkey được sử dụng để chỉ phong cách thử nghiệm nói chung.

### Cách thực hiện Monkey testing

Có nhiều cách khác nhau để thử nghiệm Monkey có thể được thực hiện. Một số kỹ thuật phổ biến được đưa ra dưới đây.

`Dumb monkey tests:`
Trong Dumb monkey tests, Người quản lí thử nghiệm chỉ định một người kiểm thử không biết về mô-đun / ứng dụng để kiểm tra sản phẩm. Người kiểm thử được yêu cầu kiểm tra ứng dụng bằng trực giác và nhập dữ liệu ngẫu nhiên mà tester cảm thấy phù hợp.

Trong trường hợp này, hành vi của người thử nghiệm có thể giống như một người dùng không rành về kỹ thuật nhưng đang cố gắng sử dụng ứng dụng.

* Người kiểm thử có thể kiểm tra ứng dụng theo sự hiểu biết của họ và nhập dữ liệu không hợp lệ.
* Các hành vi ứng dụng sau đó được ghi chú để xem nếu nó hoạt động như mong đợi.
* Loại thử nghiệm này rất hữu ích vì những người thử nghiệm biết về ứng dụng có thể có xu hướng nhập dữ liệu hợp lệ khi thử nghiệm, thực hiện theo các bước thích hợp và có thể không thử nghiệm các điều kiện khác với những điều họ đã nghĩ trước đó.
![](https://images.viblo.asia/bb4efb96-b3bf-4c83-a85d-152c431a41d3.jpg)

`Smart monkey tests:`
Trong Smart monkey tests, Trưởng nhóm kiểm thử hoặc Người quản lý chỉ định một người kiểm thử hiểu ứng dụng, để kiểm tra ứng dụng.

Vì họ biết về sản phẩm, họ sẽ nhập dữ liệu ngẫu nhiên để kiểm tra ứng dụng mà họ biết là không hợp lệ và thực hiện các hành động ngẫu nhiên.
Điều này có lợi trong việc thử nghiệm ứng dụng một cách nhanh chóng.
Điều này đảm bảo rằng ứng dụng hoạt động như mong đợi trong các điều kiện hợp lệ và xử lý dữ liệu không hợp lệ đúng cách.

`Brilliant monkey tests:`
Trong thử nghiệm Brilliant Monkey, một người kiểm thử có kiến thức về miền, được chỉ định để kiểm tra ứng dụng bởi  Người quản lý.

Nhà phát triển hoặc người kiểm thử không có kiến thức về miền có thể mong đợi chuỗi các bước sẽ được thực hiện theo một cách nhất định và họ có thể có hiểu biết cụ thể về dữ liệu đang được nhập.

Tuy nhiên, trong lĩnh vực / đời thực, người dùng cuối có chuyên môn về miền thực sự có thể thực hiện các tác vụ theo một trình tự khác với dữ liệu khác nhau. Ví dụ: Một người kiểm thử có kiến thức về lĩnh vực Ngân hàng có thể được yêu cầu nhập dữ liệu ngẫu nhiên để kiểm tra ứng dụng ngân hàng.

Do đó, ứng dụng được kiểm tra bởi một người có kiến thức về tên miền là có lợi vì họ sẽ nhập dữ liệu ngẫu nhiên từ phối cảnh tên miền.

### Công dụng của Monkey testing

Monkey testing cũng có thể được tự động hóa bằng phần cứng hoặc tốt hơn là phần mềm để bắt chước hành động của một con khỉ nhập dữ liệu ngẫu nhiên.
Dữ liệu ngẫu nhiên và được biên dịch trước có thể được sử dụng để kiểm tra ứng dụng cho các vấn đề OWASP.
Nó có thể được sử dụng để kiểm tra cơ sở dữ liệu bằng cách bắt đầu một giao dịch và nhập dữ liệu ngẫu nhiên hoặc thực hiện các hành động ngẫu nhiên và sau đó quay lại để xem liệu nó có bị sập hoặc nếu có bất kỳ hỏng hóc cơ sở dữ liệu nào xảy ra.

### Sự khác biệt giữa thử nghiệm Monkey và thử nghiệm Adhoc

Monkey testing tương tự như Kiểm tra Adhoc và có thể được coi là một loại kiểm tra Adhoc. Đây là hai kỹ thuật thử nghiệm khác nhau. Khi mã hóa hoàn tất, kiểm tra adhoc được thực hiện bởi nhà phát triển hoặc người kiểm tra dựa trên kiến thức về phần mềm của họ.

Không có sự chuẩn bị hay kế hoạch nào được thực hiện trước khi thử nghiệm adhoc được thực hiện. Các trường hợp kiểm tra không được đề cập trong quá trình kiểm tra adhoc.

Họ chủ yếu kiểm tra nếu chương trình cơ bản hoạt động mà không gặp sự cố.

| Monkey Testing | 	Ad hoc Testing | 
| -------- | -------- | -------- |
| Loại - Trường hợp kiểm tra không được sử dụng trong Monkey testing vì đây là bản chất ngẫu nhiên   | Loại - Thử nghiệm Adhoc cũng là ngẫu nhiên và không dựa vào hoặc sử dụng Các trường hợp thử nghiệm. | 
| Mục tiêu - Các thử nghiệm được thực hiện ngẫu nhiên với dữ liệu ngẫu nhiên hoặc không hợp lệ để kiểm tra xem ứng dụng có gặp sự cố không   | Mục tiêu - Mục đích của người thử nghiệm trong thử nghiệm Adhoc là đánh sập ứng dụng hoặc tìm lỗi bằng cách sử dụng ứng dụng một cách ngẫu nhiên     | 
| Thông thường người kiểm tra sẽ không có kiến thức về ứng dụng và họ không kiểm tra theo một đường dẫn cụ thể. Họ kiểm tra ngẫu nhiên bằng cách nhấp vào các đối tượng ngẫu nhiên và nhập dữ liệu ngẫu nhiên để kiểm tra xem ứng dụng có lỗi hay không   |Người kiểm tra kiểm tra bất cứ điều gì họ nghĩ là bắt buộc theo kiến thức của họ về ứng dụng, trong thử nghiệm Adhoc     |
| Monkey testing có thể được thực hiện bởi bất kỳ ai, ngay cả những cá nhân không quen thuộc với máy tính hoặc ứng dụng. Nó tương tự như cho một con khỉ một máy đánh chữ.    |Thử nghiệm Adhoc được thực hiện bởi nhà phát triển hoặc người thử nghiệm có kiến thức tốt về ứng dụng.     |

### Công cụ Monkey testing

Có một số công cụ giúp tự động hóa quá trình Monkey testing. Điều này giúp thực hiện Monkey testing đạt hiệu quả.

Các công cụ Monkey testing được phát triển để tạo dữ liệu ngẫu nhiên hoặc sử dụng dữ liệu ngẫu nhiên được điền trước và nhập dữ liệu vào ứng dụng. Họ cũng được lập trình để có thể thực hiện các hành động ngẫu nhiên. Sau đó, họ quan sát và báo cáo đầu ra của ứng dụng.

Thiết lập công cụ Monkey testing đòi hỏi một số nỗ lực nhưng một khi đã thiết lập xong, việc tự động hóa sẽ giúp Monkey testing đạt hiệu quả.

`Công cụ MonkeyRunner cho Android`
Công cụ MonkeyRunner được sử dụng để Monkey testing một ứng dụng Android.

Bạn có thể cài đặt, thực thi chương trình Android, gửi dữ liệu / tổ hợp phím và ghi lại ảnh chụp màn hình và lưu trữ trên máy tính - tất cả điều này có thể được thực hiện thông qua chương trình Python với MonkeyRunner.

Bạn có thể điều khiển trình giả lập Android hoặc thiết bị bằng API, API được cung cấp bởi công cụ Monkeyrunner.

Mặc dù công cụ Monkeyrunner được phát triển để thực hiện kiểm tra chức năng và kiểm tra mức khung của ứng dụng hoặc thiết bị, nó có thể được sử dụng để chạy các bộ kiểm tra và random testing.

 `UI Monkeyiser Monkey cho Android`
 Giao diện người dùng UI Exerciser Monkey khác với monkeyrunner tool.  Công cụ MonkeyRunner điều khiển thiết bị Android từ bên ngoài mã android trong khi UI Biseriser Monkey chạy trong ADB Shell bên trong thiết bị hoặc trình giả lập.

Có thể sử dụng UI Monkeyiser Monkey để tạo các sự kiện của người dùng và hệ thống trong luồng ngẫu nhiên giả.

Monkey testing không được sử dụng rộng rãi trong toàn ngành vì nhiều lý do như thiếu thời gian, nguồn lực, ưu tiên cao hơn cho các hình thức thử nghiệm khác mang lại kết quả tốt hơn và lợi tức đầu tư.

Nên thực hiện các hình thức kiểm tra khác trước, để đảm bảo tính ổn định của ứng dụng trước khi sử dụng Monkey testing

Nguồn :http://tryqa.com/what-is-monkey-testing-advantages-and-disadvantages/