**1. Giới thiệu chung**

Chủ đề của bài viết là sự khác biệt giữa Performance Testing, Load Testing và Stress Testing với những ví dụ đi kèm. Nếu bạn muốn tìm hiểu sâu hơn về riêng Performance Testing, bạn có thể tham khảo thêm chuỗi bài viết ở đường link [sau đây](https://www.softwaretestinghelp.com/introduction-to-performance-testing-loadrunner-training-tutorial-part-1/).

Trong lĩnh vực kiểm thử phần mềm, chúng ta bắt gặp các thuật ngữ như Performance Testing, Load Testing và Stress Testing, … Những thuật ngữ này thường bị hiểu nhầm và diễn giải là các khái niệm tương tự nhau. Tuy nhiên, có một sự khác biệt đáng kể giữa ba loại test này và đó là điều quan trọng cho một tester để hiểu được dự khác biệt đó.

Trong hướng dẫn này, chúng ta sẽ thảo luận về từng loại test này để hiểu sự khác biệt chính xác giữa chúng.

![](https://images.viblo.asia/d2935661-5a23-44bb-95cb-d81572712c54.png)

**2. Performance Testing**

***2.1. Performance Testing là gì***

Test hiệu năng là bài test được thực hiện để xác định các thành phần của hệ thống đang hoạt động như thế nào trong một tình huống nhất định.

Việc sử dụng tài nguyên, khả năng mở rộng và độ tin cậy của sản phẩm cũng được xác nhận theo bài test này. Bài test này là tập hợp con của kỹ thuật kiểm tra hiệu năng, tập trung vào giải quyết các vấn đề hiệu năng trong thiết kế và kiến trúc của một sản phẩm phần mềm.

![](https://images.viblo.asia/fa3013bd-db0a-4685-89df-4f799f22e1de.png)

Hình bên trên giải thích rõ ràng cho chúng ta rằng test hiệu năng (Performance Testing) là là một khái niệm lớn và bao gồm cả Load Testing và Stress Testing. Các loại test khác có trong test hiệu năng là Spike testing, Volume testing, Endurance testing, và Scalability testing. Vì vậy, kiểm tra năng về cơ bản là một thuật ngữ rất rộng.

***2.2. Mục đích của Performance Testing***

Mục tiêu chính của test hiệu năng bao gồm thiết lập hành vi chuẩn (benchmark behavior) của hệ thống. Có một số điểm chuẩn được đã được định nghĩa sẵn cần được đáp ứng trong quá trình kiểm tra hiệu năng.

Kiểm tra hiệu năng không nhằm mục đích tìm ra lỗi trong ứng dụng. Nó cũng không có khái niệm như đã vượt qua hoặc đã bị lỗi khi chạy bài test. Thay vào đó, nó giải quyết nhiệm vụ quan trọng là thiết lập điểm chuẩn (benchmark) và tiêu chuẩn (standard) cho một ứng dụng. Kiểm tra hiệu năng nên được thực hiện rất chính xác. Giám sát chặt chẽ hiệu năng của ứng dụng / hệ thống là đặc điểm chính của kiểm tra hiệu năng.

Điểm chuẩn và tiêu chuẩn của ứng dụng nên được đặt theo các thuộc tính như tốc độ, thời gian phản hồi, thông lượng, sử dụng tài nguyên và độ ổn định. Tất cả các thuộc tính này được kiểm tra trong một bài kiểm tra hiệu năng.

***2.3. Ví dụ về  Performance Testing***

Chẳng hạn, bạn có thể kiểm tra hiệu năng mạng của ứng dụng thông qua biểu đồ Tốc độ kết nối so với độ trễ. Độ trễ là chênh lệch thời gian giữa dữ liệu cần tiếp cận từ nguồn đến đích. Một trang 70kb sẽ không mất quá 15 giây để tải trong trường hợp kết nối tồi tệ nhất của modem 28,8kbps (độ trễ là 1000 mili giây), trong khi trang có cùng kích thước sẽ xuất hiện trong vòng 5 giây cho kết nối trung bình 256kbps DSL (độ trễ là 100 mili giây). Một kết nối T1 1,5 mbps (độ trễ là 50 mili giây) sẽ có điểm chuẩn hiệu năng là 1 giây để đạt được mục tiêu này.

Một ví dụ khác là mô hình Yêu cầu - Phản hồi. Chúng ta có thể đặt điểm chuẩn là chênh lệch thời gian giữa việc tạo yêu cầu và xác nhận phản hồi phải nằm trong phạm vi x ms (mili giây) và y ms, trong đó x và y là các chữ số tiêu chuẩn.

Một bài test hiệu suất thành công nên dự kiến hầu hết các vấn đề về hiệu năng, có thể liên quan đến cơ sở dữ liệu, mạng, phần mềm, phần cứng, ...

![](https://images.viblo.asia/8a894ad2-f53c-4104-8ee4-1e8e89eb7925.png)

**3. Load Testing**

***3.1. Load Testing là gì***

Load Testing là kiểm tra hệ thống bằng cách tăng tải liên tục và đều đặn cho hệ thống cho đến khi đạt đến giới hạn ngưỡng. Nó là một tập hợp con của test hiệu năng. 

Kiểm tra tải có thể dễ dàng thực hiện bằng cách sử dụng bất kỳ công cụ tự động hóa phù hợp nào có sẵn trên thị trường. WAPT và LoadRunner là hai công cụ nổi tiếng hỗ trợ kiểm tra tải. Load Testing cũng nổi tiếng bởi các tên như 

Kiểm tra khối lượng và kiểm tra độ bền.

Tuy nhiên, kiểm tra khối lượng chủ yếu tập trung vào cơ sở dữ liệu. Trong khi đó, kiểm tra độ bền thực hiện kiểm tra hệ thống bằng cách giữ nó dưới một tải trọng đáng kể trong một khoảng thời gian duy trì.

Mục đích duy nhất của kiểm tra tải (Load Testing) là gán cho hệ thống công việc lớn nhất mà nó có thể xử lý để kiểm tra độ bền của hệ thống và theo dõi kết quả. Một thực tế thú vị ở đây là đôi khi hệ thống được cung cấp một tác vụ trống để xác định hành vi của hệ thống trong tình huống không tải.

Các thuộc tính được theo dõi trong kiểm tra tải bao gồm hiệu suất cao nhất, thông lượng máy chủ, thời gian đáp ứng dưới các mức tải khác nhau (dưới ngưỡng ngắt), tính thỏa đáng của môi trường H/W, có bao nhiêu ứng dụng người dùng có thể xử lý mà không ảnh hưởng đến hiệu suất.

![](https://images.viblo.asia/8d126f51-f95c-4779-8aac-94b851eae1f9.png)

***3.2. Mục đích của Load Testing***

Các mục tiêu của kiểm tra tải bao gồm:
* Phơi bày các khiếm khuyết của một ứng dụng liên quan đến lỗi tràn bộ đệm, rò rỉ bộ nhớ và quản lý sai bộ nhớ. Các vấn đề cuối cùng sẽ xuất hiện do thử nghiệm tải có thể bao gồm các vấn đề cân bằng tải, vấn đề băng thông, công suất của hệ thống hiện tại, ...
* Để xác định giới hạn trên của tất cả các thành phần của ứng dụng như cơ sở dữ liệu, phần cứng, mạng, … để ứng dụng có thể quản lý tải được dự đoán trong tương lai.
* Để đặt SLA cho ứng dụng.

***3.3. Ví dụ về Load Testing***

Chúng ta hãy xem xét việc kiểm tra chức năng email của một ứng dụng, có thể bị tràn ngập với 1000 người dùng cùng một lúc. Hiện nay, 1000 người dùng có thể kích hoạt các giao dịch email (đọc, gửi, xóa, chuyển tiếp, trả lời) theo nhiều cách khác nhau.

Nếu chúng ta thực hiện một giao dịch cho mỗi người dùng mỗi giờ, thì đó sẽ là 1000 giao dịch mỗi giờ. Bằng cách mô phỏng 10 giao dịch / người dùng, chúng ta có thể tải thử nghiệm máy chủ email bằng cách chiếm 10000 giao dịch / giờ.

Một ví dụ khác về kiểm tra tải được hiển thị trong hình dưới đây:

![](https://images.viblo.asia/edb8289a-8ad9-489f-bb1f-e649b5850fa3.png)

Hình trên mô tả một bài kiểm tra tải được thực hiện trong công cụ có tên là JMeter. Bài test này được thực hiện để xác định có bao nhiêu người dùng mà một hệ thống có thể xử lý. Trong thử nghiệm này, 100 người dùng được thêm sau mỗi 30 giây cho đến khi tải đạt 1000 người dùng. Mỗi bước mất 30 giây để hoàn thành và JMeter đợi trong 30 giây trước khi bắt đầu bước tiếp theo.

Khi tải đạt 1000 luồng, tất cả chúng sẽ tiếp tục chạy trong 300 giây (5 phút) cùng nhau và cuối cùng dừng 10 luồng sau mỗi 3 giây.

**4. Stress Testing**

***4.1. Stress Testing là gì***

Dưới Stress Testing, các hoạt động khác nhau để làm quá tải các tài nguyên hiện có với các công việc dư thừa khác nhau sẽ được thực hiện trong nỗ lực phá vỡ hệ thống. Thử nghiệm tiêu cực ([negative testing](https://www.softwaretestinghelp.com/what-is-negative-testing/)), bao gồm loại bỏ các thành phần khỏi hệ thống cũng được thực hiện như một phần của Stress Testing.

Stress Testing còn được gọi là kiểm tra độ mỏi (fatigue testing), bài test này sẽ nắm bắt được tính ổn định của ứng dụng bằng cách kiểm tra nó vượt quá khả năng băng thông của nó.

Do đó, về cơ bản, Stress Testing đánh giá hành vi của một ứng dụng vượt quá tải tối đa và các điều kiện bình thường.

![](https://images.viblo.asia/b3fa2d29-ad0b-4081-aa4b-112d892ae891.png)

Mục đích của Stress Testing là để xác định sự thất bại của hệ thống và theo dõi cách hệ thống phục hồi. Thách thức ở đây là thiết lập một môi trường được kiểm soát trước khi khởi chạy bài test để chúng ta có thể nắm bắt chính xác hành vi của hệ thống nhiều lần trong các tình huống khó lường nhất.

Các vấn đề cuối cùng xuất hiện do Stress Testing có thể bao gồm các vấn đề đồng bộ hóa, rò rỉ bộ nhớ, ... 

Nếu Stress Testing kiểm tra cách hệ thống xử lý trong tình huống tăng đột ngột số lượng người dùng , sau đó nó được gọi là bài kiểm tra việc tăng đột biến.

Nếu Stress Testing là để kiểm tra tính bền vững của hệ thống trong một khoảng thời gian thông qua việc tăng số lượng người dùng một các chậm rãi, thì nó được gọi là bài test ngâm.

***4.2. Mục đích của Stress Testing***

Mục tiêu của Stress Testing là phân tích các báo cáo sau sự cố để xác định hành vi của ứng dụng sau thất bại.

Thách thức lớn nhất là đảm bảo để hệ thống không bị ảnh hưởng đến an toàn của các dữ liệu nhạy cảm sau sự cố. Trong một bài stress testing thành công, hệ thống sẽ trở lại trạng thái bình thường cùng với tất cả các thành phần của nó ngay cả sau sự cố nghiêm trọng nhất.

***4.3. Ví dụ về Stress Testing***

Ví dụ, một trình xử lý văn bản như Writer1.1.0 của OpenOffice.org được sử dụng để phát triển các chữ cái, bản trình bày, bảng tính, ... Mục đích của việc stress test của chúng ta là tải nó với các ký tự thừa.
Để làm điều này, chúng tôi sẽ liên tục paste (dán) một dòng dữ liệu, cho đến khi nó đạt đến giới hạn ngưỡng của nó để xử lý một khối lượng lớn văn bản. Ngay khi kích thước ký tự đạt 65.535 ký tự, đơn giản là nó sẽ từ chối chấp nhận nhiều dữ liệu hơn.

Kết quả kiểm tra căng thẳng trên Writer 1.1.0 tạo ra kết quả rằng nó không bị sập dưới ứng suất và nó xử lý tình huống một cách nhẹ nhàng, đảm bảo rằng ứng dụng hoạt động chính xác ngay cả trong các điều kiện căng thẳng nghiêm ngặt.

Một ví dụ khác về stress test mô tả bài test tăng đột biến thông qua việc tăng đột ngột 7000 người dùng được hiển thị bên dưới:

![](https://images.viblo.asia/39b2cece-d2b5-4d34-a5bf-af16b5fde668.png)

**5. Câu hỏi thường gặp**

Đã có nhiều các cuộc thảo luận về Performance Testing, Stress Testing và Load Testing, bây giờ chúng ta hãy xem xét một số câu hỏi thường gặp liên quan mà một tester luôn tìm kiếm câu trả lời.

**Câu hỏi 1)** Kiểm tra tải và kiểm tra hiệu năng có giống nhau không?

**Trả lời:** Câu trả lời cho điều này là ‘Không”. Chúng không giống nhau.

Đến bây giờ bạn phải hiểu rõ sự khác biệt giữa kiểm tra hiệu năng và kiểm tra tải. Bạn có thể tham khảo tóm tắt dạng bảng ở bên dưới đây để xem cách kiểm tra hiệu năng và tải có các mục tiêu, thuộc tính phạm vi khác nhau để nghiên cứu và các vấn đề cần khám phá.

**Câu hỏi 2)** Đây có phải là một bài test không hợp lý khi thực hiện Stress Testing cùng lúc khi bạn thực hiện Load Testing không?

**Trả lời:** Đây cũng là một câu hỏi phổ biến trong nhiều cuộc phỏng vấn test phần mềm và kiểm tra chứng chỉ vì có không hợp lý khi thực hiện kiểm tra căng thẳng và kiểm tra tải một cách song song hay không? Câu trả lời cho điều này là “Không”. Không phải là không hợp lý khi thực hiện stress testing cùng một lúc khi bạn đang thực hiện kiểm tra tải.


Không có bài kiểm tra nào là thừa. Là một tester, công việc của bạn là tìm ra những vấn đề. Tuy nhiên, thực tế của việc test phần mềm có thể được áp dụng và mọi vấn đề mà bạn phát hiện trong tình huống này có thể không được khắc phục.

**Câu hỏi 3) **Kiểm tra phục hồi (Recovery Testing) có phải là một phần của kiểm tra hiệu năng (Performance Testing) không?

**Trả lời:** Có, kiểm tra phục hồi được phân loại theo kiểm tra hiệu năng và đôi khi nó cũng được tiến hành với kiểm tra tải (Load Testing). Trong bài test khôi phục, nó đánh giá một ứng dụng có khả năng phục hồi tốt như thế nào từ các lỗi, sự cố, lỗi phần cứng và các vấn đề tương tự khác.

Trong hoạt động này, phần mềm buộc phải thất bại và sau đó nó được xác minh nếu nó có thể phục hồi đúng cách hay không. Ví dụ, khởi động lại hệ thống đột ngột khi một ứng dụng đang chạy và sau đó xác minh tính toàn vẹn dữ liệu của ứng dụng.

**Câu hỏi # 4)** Kiểm tra hiệu năng có yêu cầu có kiến thức lập trình không?

**Trả lời:** Kiểm thử hiệu năng không yêu cầu bạn phải có kiến thức lập trình ở mức cao. Tuy nhiên, có kiến ​​thức cơ bản về lập trình là một lợi thế bổ sung.

Ví dụ, nếu bạn đang sử dụng JMeter, thì tốt nhất là bạn nên biết các nguyên tắc cơ bản của Java. Nó có thể giúp bạn gỡ lỗi một số thứ và bạn cũng có thể viết kịch bản của riêng mình nếu cần.

**Câu hỏi # 5)** Bài test tăng đột biến (Spike Testing) trong bài test hiệu năng là gì?

**Trả lời:** Trong thử nghiệm tăng đột biến (Spike Testing), tải bị tăng hoặc giảm đột ngột bởi một số lượng lớn người dùng và sau đó hành vi hệ thống được quan sát. Spike Testing chủ yếu được thực hiện để kiểm tra xem hệ thống có thể xử lý các thay đổi đột ngột về tải không.

**6. Sự khác biệt giữa Load Testing và Stress Testing**

Tóm tắt lại, chúng ta hãy cùng xem sự khác biệt chính giữa kiểm tra tải (Load Testing), kiểm tra căng thẳng (Stress Testing) cũng như kiểm tra hiệu năng (Performance Testing) trong bảng dưới đây:

|  | **Performance Testing** | **Load testing** | **Stress Testing** |
| -------- | -------- | -------- |-------- |
| **Miền**    | Bao hàm của Load testing và Stress testing    |Nằm trong performance testing     |Nằm trong performance testing   |
| **Phạm vi**    | Phạm vi rất rộng. Bao gồm - Kiểm tra tải, Kiểm tra căng thẳng, kiểm tra năng lực, kiểm tra khối lượng, kiểm tra độ bền, kiểm tra tăng đột biến, kiểm tra khả năng mở rộng và kiểm tra độ tin cậy, ...    |Phạm vi hẹp hơn so với thử nghiệm hiệu năng. Bao gồm kiểm tra khối lượng và kiểm tra độ bền.     |Phạm vi hẹp hơn so với thử nghiệm hiệu năng. Bao gồm kiểm tra ngâm và kiểm tra tăng đột biến.  |
| **Mục đích chính**    | Để thiết lập điểm chuẩn và tiêu chuẩn cho ứng dụng.   |Để xác định giới hạn trên của hệ thống, hãy đặt SLA của ứng dụng và xem cách hệ thống xử lý khối lượng tải nặng.     |Để xác định cách hệ thống hoạt động dưới tải trọng lớn và cách nó phục hồi từ thất bại. Về cơ bản, để chuẩn bị ứng dụng của bạn cho lưu lượng truy cập tăng đột biến.  |
| **Giới hạn tải**    | Cả hai - cả ngưỡng dưới và trên ngưỡng nghỉ ngơi.ngưỡng trên của điểm break.   |Từ dưới đến điểm break.     |Trên điểm break.   |
| **Những thuộc tính được thực thi**    | Sử dụng tài nguyên, độ tin cậy, khả năng mở rộng, thời gian đáp ứng, thông lượng, tốc độ, ...  |Hiệu suất cao nhất, thông lượng máy chủ, thời gian đáp ứng dưới các mức tải khác nhau (dưới ngưỡng ngắt), tính thỏa đáng của môi trường H/W, số lượng ứng dụng người dùng có thể xử lý, yêu cầu cân bằng tải, ...     |Tính ổn định vượt quá dung lượng băng thông, thời gian đáp ứng (trên ngưỡng ngắt), ...   |
| **Những vấn đề được chỉ ra sau bài test này**    | Tất cả các lỗi về hiệu năng bao gồm thời gian chạy, phạm vi để tối ưu hóa, các vấn đề liên quan đến tốc độ, độ trễ, thông lượng, ... Về cơ bản - mọi thứ liên quan đến hiệu năng!   |Vấn đề cân bằng tải, vấn đề băng thông, vấn đề dung lượng hệ thống, thời gian đáp ứng kém, vấn đề thông lượng, ...     |Các lỗ hổng bảo mật với tình trạng quá tải, vấn đề dò ghỉ dữ liệu ở tình trạng quá tải, chậm, rò rỉ bộ nhớ, ...  |

**7. Sự khác biệt giữa Load, Stress và Volume Testing**

Đến bây giờ chúng tôi đã biết về load testing và stress testing cùng với sự khác biệt giữa hai loại test này. Bây giờ chúng ta hãy khám phá volume testing là gì và nó khác với load testing và stress testing như thế nào.
Kiểm tra khối lượng (volume testing) cũng là một loại kiểm tra hiệu năng tập trung chủ yếu vào cơ sở dữ liệu.

Trong kiểm tra khối lượng, nó kiểm tra xem hệ thống hoạt động như thế nào đối với một khối lượng dữ liệu nhất định. Do đó, các cơ sở dữ liệu được nhồi với dung lượng tối đa và mức hiệu suất của chúng như thời gian đáp ứng và thông lượng máy chủ được theo dõi.

Để cho đơn giản, sự khác biệt giữa kiểm tra tải, căng thẳng và khối lượng được hiển thị dưới đây:

| **Volume testing** | **Load testing** | **Stress testing** |
| -------- | -------- | -------- |
| Một khối lượng lớn của dữ liệu.     |Một số lượng lớn của người dùng.     | Quá nhiều dữ liệu, quá nhiều người dùng dẫn đến hệ thống quá tải.     |

**8. Kết luận**

Trong hướng dẫn này, chúng ta đã thấy và hiểu thông qua các ví dụ về cách kiểm tra hiệu năng, kiểm tra tải và kiểm tra căng thẳng khác nhau như thế nào và phạm vi của từng loại test là gì.

Chúng ta cũng đã có một cái nhìn ngắn gọn về nhiều danh mục của kiểm tra hiệu năng như kiểm tra tăng đột biến, kiểm tra khôi phục, kiểm tra khối lượng, ... và hiểu mỗi loại này khác nhau như thế nào.

Liên kết tham khảo:

https://www.softwaretestinghelp.com/what-is-performance-testing-load-testing-stress-testing/