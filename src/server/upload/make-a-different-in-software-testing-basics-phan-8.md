> **Phần 8 - Unit, Integration and Functional Testing**

Đối với bất kỳ ứng dụng phần mềm nào, cả Unit testing (kiểm thử đơn vị) và Integration testing (kiểm thử tích hợp) đều rất quan trọng vì mỗi tester đều sử dụng các quy trình nhất định để thực hiện kiểm thử ứng dụng phần mềm. Nhưng một trong chúng (kiểm thử đơn vị, kiểm thử tích hợp) hoặc cả hai đều không thể thay thế được Functional testing (kiểm thử chức năng).

Bây giờ sẽ lấy một ví dụ đơn giản để bắt đầu đi tìm hiểu, chúng ta sẽ dùng màn hình đăng nhập.

![](https://images.viblo.asia/5bf14f64-4ff9-4a9c-8023-54a28b968468.png)

Hầu hết mọi ứng dụng web đều yêu cầu người dùng / khách hàng đăng nhập. Đối với yêu cầu này, mọi ứng dụng web phải có trang “Đăng nhập” gồm có các yếu tố sau:
* Account/Username
* Password
* Login/Sign in Button
* Forgot Password

**Đối với kiểm thử đơn vị, cần phải thử nghiệm các trường hợp sau đây.**
* Max/min length: phải thực hiện kiểm thử cho trường tên người dùng và mật khẩu. 
* Valid value: phải kiểm tra cho các trường hợp giá trị đưa vào là hợp lệ hoặc không hợp lệ 
* Enable/ Disable: Nút Đăng nhập chỉ được cho phép bấm vào sau khi người dùng đã nhập các giá trị hợp lệ (đảm bảo đúng định dạng, độ dài) vào cả hai trường tên người dùng và mật khẩu. Liên kết Quên mật khẩu luôn luôn có thể bấm vào được.

**Đối với kiểm thử tích hợp, cần phải thử nghiệm các trường hợp sau đây.**
* Người dùng thấy thông báo đăng nhập thành công sau khi nhập các giá trị hợp lệ và nhấn nút Đăng nhập.
* Người dùng sẽ được điều hướng đến trang chủ hoặc một trang cụ thể theo phân quyền (nếu có) sau khi nhập giá trị hợp lệ và nhấp vào nút Đăng nhập.

Bây giờ, sau khi kiểm thử đơn vị và tích hợp đã được thực hiện, chúng ta hãy xem các trường hợp thử nghiệm bổ sung được xem xét để thử nghiệm chức năng:

1. Liệt kê các trường hợp và kết quả mong muốn để thực hiện kiểm thử, vd: người dùng có thể đăng nhập bằng cách nhấp vào nút Đăng nhập sau khi nhập các giá trị tên người dùng và mật khẩu hợp lệ không?
2. Có thông báo đăng nhập thành công xuất hiện sau khi đăng nhập thành công không?
3. Có thông báo lỗi nào xuất hiện khi thông tin đăng nhập không hợp lệ không?
4. Có bất kỳ cookie hay session lưu trữ thông tin cho các trường đăng nhập không?

Còn nhiều trường hợp như trên hơn nữa, nó được liệt kê đầy đủ ra bởi các tester để chuẩn bị cho việc thực hiện kiểm thử chức năng. Có rất nhiều kịch bản/ trường hợp kiểm thử chưa được kiểm tra ngay cả sau khi thử nghiệm đơn vị và tích hợp.

### Unit Testing

Như tên cho thấy, mức này liên quan đến việc thử nghiệm một đơn vị/ mô-đun. Đơn vị này có thể là phần nhỏ nhất của ứng dụng có thể kiểm chứng được.

Các nhà phát triển phần mềm là những người viết các trường hợp để kiểm thử đơn vị. Mục đích ở đây là để phù hợp với các yêu cầu và kết quả mong muốn của từng mô-đun.

Dưới đây là một vài điểm quan trọng về kiểm thử đơn vị và lợi ích của nó:

* Kiểm thử đơn vị được thực hiện trước khi các nhà phát triển phần mềm thử nghiệm tích hợp bằng cách sử dụng các kỹ thuật kiểm tra hộp trắng.
* Kiểm tra đơn vị không chỉ kiểm tra hành vi hợp lệ. vd: kiểm thử kết quả đầu ra chính xác trong trường hợp đầu vào hợp lệ, và còn kiểm thử cho trường hợp trả về lỗi với đầu vào không hợp lệ.
* Tìm kiếm các vấn đề/ lỗi ở giai đoạn đầu (kiểm thử đơn vị) rất hữu ích và giảm được chi phí tổng thể dự án. Nếu thử nghiệm đơn vị được hoàn thành trước khi tích hợp mã, các vấn đề tìm thấy ở giai đoạn này có thể được giải quyết dễ dàng hơn và tác động của chúng cũng ít đi.
* Các kiểm thử đơn vị sẽ kiểm tra các đoạn mã nhỏ hoặc các hàm riêng lẻ với mục đích tìm được  vấn đề/ lỗi. Việc này là độc lập và không ảnh hưởng đến các trường hợp kiểm tra khác.
* Một lợi thế quan trọng khác là các trường hợp kiểm thử đơn vị đơn giản hóa và làm cho việc thử nghiệm mã dễ dàng hơn. Và việc giải quyết các vấn đề tìm thấy (nếu có) ở giai đoạn sau cũng trở nên dễ dàng hơn vì chỉ những mã có thay đổi mới nhất sẽ được kiểm tra ở giai đoạn sau này.
* Kiểm thử đơn vị còn tiết kiệm thời gian, chi phí và nó có thể tái sử dụng và dễ bảo trì trong tương lai.

### Integration Testing

Mặc dù mỗi mô-đun của phần mềm được kiểm thử đơn vị, nhưng các lỗi vẫn có thể tồn tại vì nhiều lý do như:
- Một mô-đun nói chung được xây dựng bởi một nhà phát triển phần mềm, anh ấy có hiểu biết và logic lập trình có thể khác với các lập trình viên khác. Kiểm thử tích hợp trở nên cần thiết để xác minh các mô-đun phần mềm hoạt động thống nhất với nhau khi đã được tích hợp.
- Tại thời điểm phát triển mô-đun, có thể có thay đổi yêu cầu từ khách hàng. Các yêu cầu mới này có thể không được kiểm thử đơn vị và do đó việc kiểm thử tích hợp sẽ trở nên cần thiết.
- Xử lý ngoại lệ không đầy đủ có thể gây ra lỗi khi các mô-đun được tích hợp với nhau, ...

![](https://images.viblo.asia/a2c7273f-ae0b-4c26-a133-10315f041613.png)

Kiểm thử tích hợp là sẽ kiểm tra sự tích hợp của các phần khác nhau trong hệ thống với nhau. Hai chức năng hoặc mô-đun khác nhau của hệ thống được tích hợp trước và sau đó là kiểm thử tích hợp được thực hiện.

Mục đích của kiểm thử tích hợp là kiểm tra chức năng, độ tin cậy và hiệu suất của hệ thống khi đã được tích hợp.

Kiểm thử tích hợp được thực hiện trên các chức năng/ mô-đun mà chúng đã được kiểm thử đơn vị thành công trước và sau đó kiểm thử tích hợp để xác định liệu sự kết hợp của các chức năng/ mô-đun có cho đầu ra như mong muốn hay không?

Kiểm thử tích hợp có thể được thực hiện bởi tester - người thử nghiệm độc lập hoặc cũng bởi các nhà phát triển.

Có 3 loại phương pháp trong kiểm thử tích hợp khác nhau như sau:

**Phương pháp tích hợp Big Bang**

Trong phương pháp này, tất cả các mô-đun hoặc đơn vị được tích hợp và kiểm tra tổng thể cùng một lúc. Điều này thường được thực hiện khi toàn bộ hệ thống đã sẵn sàng tất cả để thử nghiệm tích hợp tại một thời điểm duy nhất.

Thuận lợi:
- Mọi thứ tích hợp được kiểm tra cùng một lúc
- Thuận tiện cho các hệ thống nhỏ

Bất lợi:
- Vì thử nghiệm tích hợp chỉ có thể bắt đầu sau khi tất cả các mô-đun được thiết kế, nhóm thử nghiệm sẽ có ít thời gian hơn để thực hiện trong giai đoạn thử nghiệm
- Vì tất cả các mô-đun được kiểm tra cùng một lúc, các mô-đun có độ nguy hiểm cao sẽ không được ưu tiên trong giai đoạn kiểm thử

**Phương pháp tiếp cận từ trên xuống (Top down)**
![](https://images.viblo.asia/455a7902-d722-49d2-a0e1-dadb31e1e9f1.png)

Các đơn vị/ mô-đun đã được tích hợp sẽ được kiểm tra từ đầu đến cuối cấp theo từng bước một.

Phương pháp tiếp cận từ trên xuống là một cách tích hợp có tính tổ chức vì nó phù hợp với cách mọi thứ xảy ra trong môi trường thực tế.

Thuận lợi:
- Các lỗi thuộc từng mô-đun nhỏ dễ được phát hiện hơn
- Các mô-đun quan trọng được kiểm thử dựa vào mức độ ưu tiên, các lỗi ở mô-đun chính có thể được tìm thấy và xử lý sớm

Bất lợi:
- Các mô-đun ở mức thấp hơn có thể không được kiểm tra đầy đủ 

**Phương pháp tiếp cận dưới lên (Bottom up)**
![](https://images.viblo.asia/8ad9051a-a9c9-4909-b152-2881724d286e.png)

Các đơn vị/ mô-đun được kiểm tra từ dưới lên trên, từng bước, cho đến khi tất cả các cấp của các đơn vị/ mô-đun được tích hợp và kiểm thử dưới dạng như một đơn vị.

Thuận lợi:
- Các lỗi thuộc từng mô-đun nhỏ dễ được phát hiện hơn
- Không lãng phí thời gian chờ đợi cho đến khi tất cả các mô-đun được phát triển xong (không giống như cách tiếp cận Big Bang)

Bất lợi:
- Các mô-đun quan trọng (ở cấp cao nhất của kiến trúc phần mềm) kiểm soát luồng ứng dụng được kiểm tra cuối cùng nên chỉ có thể được xác định cuối cùng khi tất cả các đơn vị đã được tích hợp hoàn chỉnh, điều nãy dẫn đến mô-đun quan trọng có thể dễ bị lỗi.

### Functional testing
Chức năng của ứng dụng được kiểm tra dựa vào kỹ thuật kiểm tra hộp đen để tạo ra kết quả mong muốn khi cung cấp đầu vào nhất định được gọi là "Kiểm thử chức năng".

Chủ yếu được giao cho nhóm QA / tester. Kiểm tra chức năng liên quan đến verification và validation của việc xây dựng một ứng dụng từ quan điểm, mong muốn của người dùng (lý do ứng dụng được tạo ra).

**Các loại thử nghiệm chức năng:**
* Positive functional testing: Thử nghiệm này thực hiện các chức năng của ứng dụng với đầu vào hợp lệ và cũng xác minh rằng các kết quả đầu ra là chính xác.
* Negative functional testing: Thử nghiệm này bao gồm việc thực hiện chức năng ứng dụng bằng cách sử dụng kết hợp các đầu vào không hợp lệ, một số điều kiện hoạt động không mong muốn và có thể dùng đến một số trường hợp “ngoài giới hạn” khác.

Trong các quy trình kiểm thử phần mềm, chúng ta sẽ thực hiện điều này bằng cách viết các trường hợp thử nghiệm theo các yêu cầu và kịch bản. Đối với bất kỳ chức năng nào, số lượng trường hợp thử nghiệm được viết có thể thay đổi từ một đến nhiều.

Các trường hợp thử nghiệm về cơ bản bao gồm các phần sau:
* Mô tả trường hợp thử nghiệm
* Điều kiện tiên quyết (nếu có)
* Các bước thực hiện
* Dữ liệu kiểm thử
* Kết quả đầu ra mong đợi
* Ghi chú (nếu có)

### Kiểm thử đơn vị, tích hợp và chức năng khác nhau như thế nào?


|  | Kiểm thử đơn vị | Kiểm thử tích hợp | Kiểm thử chức năng |
| -------- | -------- | -------- | -------- |
| Định nghĩa và mục đích     | Thử nghiệm các đơn vị hoặc mô-đun nhỏ nhất riêng lẻ.     | Kiểm thử tích hợp của hai hoặc nhiều đơn vị/ mô-đun kết hợp với nhau.    | Kiểm thử các hành vi của toàn bộ ứng dụng dựa theo yêu cầu.     |
| Độ phức tạp | Không phức tạp vì nó chỉ bao gồm các mã/ đoạn mã nhỏ nhất. | Hơi phức tạp hơn so với các trường hợp kiểm thử đơn vị . | Phức tạp hơn nhiều so với các trường hợp kiểm thử đơn vị và tích hợp. |
| Người thực hiện | Được thực hiện bởi các nhà phát triển. | Cũng có thể là các nhà phát triển hoặc QA / tester thực hiện.  | Được thực hiện bởi QA / tester. |
| Kỹ thuật kiểm thử | Kỹ thuật kiểm thử hộp trắng. | Cả hai kỹ thuật hộp đen và hộp trắng được sử dụng, cộng với thử nghiệm hộp xám. | Kỹ thuật kiểm thử hộp đen. |
| Giai đoạn thực hiện | Được thực hiện sau khi thêm một hàm mới. | Được thực hiện sau kiểm thử đơn vị. | Được thực hiện sau khi thử nghiệm tích hợp được thực hiện hoặc khi ứng dụng đã được xây dựng đầy đủ, sẵn sàng để sử dụng. |
| Đặc điểm chính | Các mô-đun hoặc đơn vị riêng lẻ. | Tích hợp các mô-đun hoặc đơn vị. | Toàn bộ chức năng của ứng dụng. |
| Lỗi / Sự cố sẽ được tìm thấy | Kiểm thử đơn vị tìm các vấn đề mà có thể xảy ra thường xuyên trong các mô-đun. | Kiểm thử tích hợp tìm thấy các vấn đề có thể xảy ra trong khi tích hợp các mô-đun khác nhau. | Kiểm thử chức năng tìm thấy các vấn đề mà không cho phép ứng dụng thực hiện chức năng nào đó của nó. Điều này bao gồm một số vấn đề dựa trên kịch bản. |
| Để lọt lỗi | Không có cơ hội để lọt lỗi. | Ít có cơ hội để lọt lỗi. | Nhiều cơ hội để lọt lỗi khi danh sách chức năng phải test là không xác định được |



### Kết luận
Kiểm thử đơn vị, tích hợp và chức năng: Cả ba đều có liên kết với nhau. Để đạt được mức độ bao phủ đầy đủ, cần phải có các trường hợp kiểm thử đơn vị cho các đường dẫn/ dòng mã, kiểm thử chức năng và kiểm thử tích hợp để đảm bảo rằng các mô-đun hoạt động đúng và có liên kết làm việc được với nhau.

>  Bài viết đươc tham khảo từ ngồn **[ Software Testing Help](https://www.softwaretestinghelp.com/the-difference-between-unit-integration-and-functional-testing//)**
###
**Những phần trước cùng chủ đề "Make a Different in Software Testing Basics":**

>* Phần 1 - **[Functional Testing and Non-Functional Testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-1-djeZ1awQZWz)**
>* Phần 2 - **[Re-testing and Regression testing](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-2-1Je5EMg15nL)**
>* Phần 3 - **[Boundary value analysis and Equivalence partitioning](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-3-4P856XvRZY3)**
>* Phần 4 - **[Verification and Validation](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-4-oOVlYdXvZ8W)**
>* Phần 5 - **[Test Case and Test Scenario](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-5-6J3Zg2xEKmB)**
>* Phần 6 - **[Quality Assurance and Quality Control](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-6-oOVlY12yl8W)**
>* Phần 7 - **[User Story and Requirement](https://viblo.asia/p/make-a-different-in-software-testing-basics-phan-7-6J3ZgJyRKmB)**