Trong [phần 1](https://viblo.asia/p/huong-dan-test-bao-mat-cho-ung-dung-di-dong-phan-1-GrLZDQwBlk0) của bài viết, mình đã đi vào phân tích và chỉ ra những thách thức đối với việc test an ninh cho ứng dụng di động nói chung. Trong phần này mình sẽ đi sâu hơn để đưa ra những chiến lược và hướng dẫn cụ thể đối với việc test an ninh cho ứng dụng di động.

**4. Chiến lược cho việc test an ninh cho ứng dụng di động**

Sau khi tất cả những bước phân tích ở phần 1 đã được thực hiện cho ứng dụng của bạn, công việc tiếp theo của một QA là chỉ ra chiến thuật cho việc thực thi test.

Bên dưới mình sẽ đưa ra một vài gợi ý để hỗ trợ việc đưa ra chiến lược cho việc thực hiện test bảo mật.

**Bản chất của ứng dụng:**

* Nếu bạn đang làm việc trên một ứng dụng liên quan đến giao dịch tiền, thì bạn cần tập trung nhiều hơn vào các khía cạnh bảo mật hơn là các khía cạnh chức năng của ứng dụng. Nhưng nếu ứng dụng của bạn giống như một dịch vụ hậu cần hoặc một ứng dụng giáo dục hoặc ứng dụng truyền thông xã hội thì nó có thể không cần đến việc kiểm tra bảo mật chuyên sâu.
* Nếu bạn đang tạo một ứng dụng mà bạn đang thực hiện giao dịch tiền hoặc chuyển hướng đến các trang web của ngân hàng để chuyển tiền thì bạn cần kiểm tra từng chức năng của ứng dụng. Do đó, dựa trên tính chất và mục đích của ứng dụng của bạn, bạn có thể quyết định mức độ của việc kiểm tra bảo mật cần được thực hiện.

**Thời gian cần thiết cho việc test:**

* Tùy thuộc vào tổng thời gian được phân bổ cho việc test, bạn cần quyết định thời gian dành cho test bảo mật. Nếu bạn nghĩ rằng bạn cần nhiều thời gian hơn phân bổ thì hãy nói chuyện với quản lý của bạn và BA (Business Analyst) càng sớm càng tốt.
* Dựa trên thời gian được phân bổ, bạn hãy ưu tiên các nỗ lực test của bạn cho phù hợp.

**Những nỗ lực cần thiết để test:**

* Test bảo mật khá phức tạp khi so sánh với chức năng hoặc giao diện người dùng hoặc các kiểu test khác vì hầu như không có bất kỳ hướng dẫn nào được đưa ra cho nó.
* Theo kinh nghiệm thực tế thì tốt nhất là có tối đa 2 QA thực hiện test bảo mật chứ không cần tất cả. Do đó, những nỗ lực cần thiết cho việc test bảo mật này cần phải được truyền đạt tốt và được cả nhóm đồng ý.

**Chuyển giao kiến thức:**

* Hầu hết thời gian, chúng ta cần dành thêm thời gian để thực hành thêm về lập trình hoặc các dịch vụ web hoặc các công cụ để hiểu thêm các khía cạnh về bảo mật (và các bài test liên quan) của ứng dụng. Do đó, điều này sẽ cần thêm thời gian và cần được tính vào trong kế hoạch dự án.

**5. Những hướng dẫn cho việc test an ninh cho ứng dụng di động** 

***5.1. Test bảo mật thủ công với các bài kiểm tra mẫu***

Test bảo mật của một ứng dụng có thể được thực hiện thủ công và thông qua tự động hóa. Do công việc test bảo mật là một chút phức tạp, do đó sẽ tốt hơn nếu bạn có thể sử dụng các công cụ tự động hóa. Việc test bảo mật thủ công là công việc ít tốn thời gian.

Trước khi bắt đầu test bảo mật thủ công trên ứng dụng, hãy đảm bảo rằng tất cả các test case liên quan đến bảo mật đã sẵn sàng, được xem xét và có phạm vi bao phủ 100%. Bạn nên xem xét các test case của mình ít nhất với BA (Business Analyst) của dự án.

Tạo ra các test case dựa trên những “thách thức” ở trên và bao gồm mọi thứ đúng từ mẫu của điện thoại cho đến phiên bản hệ điều hành, bất cứ điều gì liên quan đều ảnh hưởng đến tính bảo mật của ứng dụng của bạn.

Tạo ra môi trường kiểm thử cho việc test bảo mật là rất khó khăn, đặc biệt đối với ứng dụng dành cho thiết bị di động. Do đó nếu bạn có chuyên môn về lĩnh vực kiểm tra đám mây (cloud testing), bạn cũng có thể sử dụng nó.

Ví dụ đối với một ứng dụng dịch vụ hậu (logistics) cần có mục đích là để theo dõi các lái xe và những đơn hàng thực hiện vào một ngày nhất định thì việc kiểm tra an ninh của ứng dụng không dừng lại ở phía ứng dụng mà chúng ta sẽ còn cần thực hiện kiểm tra bảo mật cho dịch vụ web (REST service). Những đơn hàng được thực hiện là các mặt hàng đắt tiền như máy chạy bộ, máy giặt, tivi, ... và do đó có một mối quan tâm an ninh lớn.

Dưới đây là một số bài test an ninh mẫu mà đã thực hiện thực tế trên một số ứng dụng kiểu logistics:
* Kiểm tra nếu những dữ liệu cụ thể cung cấp cho một lái xe được hiển thị sau khi đăng nhập.
* Kiểm tra nếu dữ liệu được hiển thị cụ thể và riêng biệt cho các lái xe khi có nhiều hơn một lái xe đăng nhập vào điện thoại tương ứng của họ.
* Kiểm tra nếu các bản cập nhật được gửi bởi lái xe theo trạng thái gửi nhận hàng, ..., chỉ được cập nhật trong cổng thông tin cho lái xe cụ thể đó chứ không phải tất cả.
* Kiểm tra nếu các lái xe được hiển thị dữ liệu theo quyền truy cập của họ.
* Kiểm tra nếu sau một chu kỳ thời gian xác định, phiên sử dụng của lái xe có bị hết hạn và anh ta được yêu cầu phải đăng nhập lại hay không.
* Kiểm tra nếu chỉ cần xác minh (đăng ký trên trang web của công ty), lái xe được phép đăng nhập vào hệ thống.
* Kiểm tra nếu các lái xe không được phép gửi vị trí GPS giả từ điện thoại của họ. Để kiểm tra chức năng như vậy, bạn có thể tạo một tệp DDMS giả và đưa ra một vị trí giả mạo.
* Kiểm tra nếu tất cả các file nhật ký ứng dụng không chứa mã xác thực, có thể là các file nhật ký ứng dụng hoặc nhật ký điện thoại hoặc file nhật ký hệ điều hành.

***5.2. Kiểm tra bảo mật dịch vụ web***

Cùng với chức năng, định dạng dữ liệu và các phương thức khác nhau như GET, POST, PUT, … thì việc kiểm tra bảo mật các dịch vụ web cũng quan trọng không kém. Điều này có thể được thực hiện cả bằng thủ công và tự động hóa.

Ban đầu, khi ứng dụng chưa sẵn sàng, việc kiểm tra các dịch vụ web rất khó khăn nhưng không kém phần quan trọng. Và ở giai đoạn ban đầu khi tất cả các dịch vụ web chưa sẵn sàng, chúng ta không nên sử dụng công cụ tự động hóa.

Chúng ta nên đề nghị sự trợ giúp từ các nhà phát triển và để họ tạo một trang web giả để thử nghiệm dịch vụ web. Khi tất cả các dịch vụ web của bạn đã sẵn sàng và ổn định, hãy dừng sử dụng việc test thủ công. Việc cập nhật đầu vào cho các dịch vụ web theo từng test case là một việc rất tốn thời gian, do đó tốt hơn là sử dụng các công cụ tự động hóa.

Các bạn có thể sử dụng SoapUI Pro để test dịch vụ web, nó là một công cụ trả phí với một vài tính năng thú vị cho tất cả các phương thức dịch vụ web REST.

![](https://images.viblo.asia/1e35bfb6-ad8d-4014-9ca0-516915d5211c.png)

Sau đây là một số bài test bảo mật liên quan đến các dịch vụ web:
* Kiểm tra nếu mã thông báo xác thực đăng nhập đã được mã hóa.
* Kiểm tra nếu mã thông báo xác thực chỉ được tạo nếu những chi tiết của lái xe đã được gửi đến dịch vụ web là hợp lệ.
* Kiểm tra nếu sau khi mã thông báo được tạo, việc nhận hoặc gửi dữ liệu qua toàn bộ dịch vụ web khác (ngoại trừ xác thực) sẽ không được thực hiện nếu không có mã thông báo.
* Kiểm tra nếu sau một khoảng thời gian nếu cùng một mã thông báo được sử dụng cho dịch vụ web thì một lỗi tương ứng có được hiển thị khi mã thông báo hết hạn hay không.
* Kiểm tra xem khi mã thông báo thay đổi được gửi đến dịch vụ web thì sẽ không có giao dịch dữ liệu nào được thực hiện, ...

***5.3. Kiểm tra bảo mật ứng dụng (khách hàng)***

Điều này thường được thực hiện trên ứng dụng thực tế được cài đặt trên điện thoại của bạn. Thận trọng khi thực hiện kiểm tra bảo mật với nhiều phiên người dùng chạy song song.

Kiểm tra phía ứng dụng không chỉ được thực hiện theo mục đích ứng dụng mà còn cả kiểu điện thoại và các tính năng dành riêng cho hệ điều hành sẽ ảnh hưởng đến bảo mật thông tin. Dựa trên những thách thức được đề cập ở phần 1, bạn có thể tạo ra ma trận cho các test case của mình. Ngoài ra, thực hiện một vòng kiểm tra cơ bản của tất cả các test case trên điện thoại đã root hoặc bẻ khóa.

Các cải tiến bảo mật có thể khác nhau tùy theo phiên bản hệ điều hành. Do đó bạn hãy thử kiểm tra tất cả các phiên bản hệ điều hành được hỗ trợ.

***5.4. Các cụ tự động hóa***

Những tester nhận ra  việc kiểm tra bảo mật trên một ứng dụng di động thường không khuyến khích thực hiện vì các ứng dụng này thường được phát triển để có thể chạy trên nhiều thiết bị và hệ điều hành. Do đó, việc sử dụng các công cụ để nâng cao tính tự động hóa giúp ích rất nhiều không chỉ trong việc tiết kiệm thời gian quý báu của họ mà những nỗ lực của họ có thể dành cho những người dùng khác trong khi các bài kiểm tra chạy tự động ở background.

Bạn cũng hãy chắc chắn rằng có băng thông sẵn có để tìm hiểu và sử dụng các công cụ này. Các công cụ bảo mật có thể không nhất thiết cần được sử dụng cho một bài test khác. Do đó việc sử dụng công cụ phải được người quản lý hoặc chủ sở hữu sản phẩm chấp nhận.

Sau đây là danh sách các công cụ kiểm tra bảo mật thông dụng và sẵn có nhất cho các ứng dụng di động:
* OWA SP Zed Attack Proxy Project
* Android Debug Bridge
* iPad File Explorer
* Clang Static Analyzer
* QARK
* Smart Phone Dumb Apps

***V.5. Kiểm tra các ứng dụng Web, Ứng dụng gốc (Native) và Ứng dụng lai (Hybrid)***

Việc kiểm tra bảo mật là khác nhau đối với web, ứng dụng gốc và ứng dụng lai bởi vì mã nguồn và kiến trúc ứng dụng là hoàn toàn khác nhau đối với cả 3 loại này.

![](https://images.viblo.asia/fefce874-8cd6-44c2-ba9c-9922305a255f.png)

**Ứng dụng Web:** 

* Việc test an ninh gần tương đồng như test an ninh cho một website.
* Việc test gần như tương đương cho các nền tảng khác nhau do chúng đều dùng chung việc truy cập đến cùng website.

**Ứng dụng gốc (Native):**

* Việc test an ninh được thực hiện dựa trên nền tảng. Một ứng dụng gốc được phát triển sử dụng những được điểm của hệ đièu hành xác định, do đó những đặc điểm an ninh của hệ điều hành đó sẽ ảnh hưởng đến ứng dụng đó.
* Những bài test ở đây sẽ biến đổi theo nển tảng và do đó những nỗ lực được thực hiện là xác định.

**Ứng dụng lai (Hybrid):**

* Việc test an ninh được thực hiện dưới sự cân nhắc như một ứng dụng web nhưng sẽ thêm vào những ảnh hưởng an ninh của những thành phần native trong ứng dụng.
* Những bài test cho những ứng dụng lai cũng gần như tương tự nhau ngoại trừ một số bài test xác đinh liên quan đến nền tảng do việc sử dụng các thành phần native trong ứng dụng.

**6. Kết luận**

Kiểm tra bảo mật các ứng dụng di động là một thách thức thực sự đòi hỏi nhiều kiến thức và thực hành. Khi so sánh với các ứng dụng máy tính hoặc ứng dụng web, nó là rất rộng lớn và phức tạp.

Do đó, điều rất quan trọng là suy nghĩ từ quan điểm của một hacker và sau đó phân tích ứng dụng của bạn. 60% nỗ lực được dành cho việc tìm kiếm các chức năng dễ bị đe dọa của ứng dụng của bạn và sau đó việc test sẽ trở nên dễ dàng hơn một chút.

**7. Liên kết tham khảo**

https://www.softwaretestinghelp.com/mobile-app-security-testing-guide/#