Một câu hỏi rất phổ biến mà người có mong muốn làm kiểm thử phần mềm là Tester (người kiểm thử phần mềm) có nhất thiết phải biết code không ??

Người kiểm thử phần mềm thường được chia thành hai loại:
**QA (Quality Analyst):** QA, Tester kiểm tra các chức năng, thiết kế của dự án . QA, Tester chỉ kiểm tra phần mềm sau giai đoạn phát triển. Vai trò QA không mang tính kỹ thuật như lập trình viên và có thể không yêu cầu biết code.

**SDET (Kỹ sư thiết kế phần mềm đang thử nghiệm):** Mặt khác, SDET là người hiểu rõ hoạt động bên trong của sản phẩm. Họ hiểu các khái niệm cơ sở dữ liệu, ngôn ngữ lập trình, v.v. và họ cũng tham gia vào thiết kế sản phẩm, thiết kế dữ liệu và giao diện người dùng. SDET phải làm việc trong giai đoạn phát triển và đòi hỏi kiến thức về code. Vì vậy, vai trò của SDET khó khăn hơn và nó liên quan đến công việc của cả hai, nhà phát triển cũng như Tester. Automation Testers  (những người sử dụng các công cụ như QTP, Selenium) cũng có thể được phân loại là SDET.

![](https://images.viblo.asia/36ab38a0-eb84-4b52-894e-a4b0019e7b34.png)

Vậy dựa trên vai trò của Tester, có thể xác định liệu Tester có nên yêu cầu kiến thức về code hay không? Hãy trả lời thêm vài câu hỏi liên quan đến nó.

Chúng ta sẽ thấy những điều sau trong hướng dẫn này.

- Những kỹ năng cần thiết để trở thành một tester tốt?
- Người tester nên biết gì?
- Cần bao nhiêu kiến thức về code để trở thành một tester giỏi?


#### Các thuộc tính của một tester tốt
Phương pháp kiểm thử phần mềm thay đổi tùy theo nhu cầu và thông số kỹ thuật của sản phẩm phần mềm. Một QA hay Tester đóng vai trò quan trọng trong việc hoàn thành quá trình kiểm thử.

Các thuộc tính của tester tốt là;

- Kiến thức kiểm thử tốt
- Tư duy logic tốt
- Có kiến thức tốt về kỹ năng lập trình.

#### Người kiểm tra yêu cầu bao nhiêu kiến thức code
Viết code và debug là công việc của dev.
Sau đó, câu hỏi đặt ra, tại sao kiến thức code là cần thiết cho tester?

Hãy xem một số lý do, tại sao biết code trở nên cần thiết cho tester.

![](https://images.viblo.asia/61202fad-dd53-4f8b-a366-1875fa727a96.png)

Kiểm thử phần mềm về cơ bản bao gồm hai cách tiếp cận Kiểm tra thủ công và Kiểm thử tự động. Ở cấp độ nâng cao, kiểm thử có thể được phân loại thành hộp trắng, hộp đen hoặc kiểm thử hộp xám. Các kỹ thuật kiểm tra khác nhau đòi hỏi một bộ kỹ năng khác nhau của Tester.

<br>

- Trong khi thực hiện kiểm thử hộp đen, không yêu cầu Tester phải biết về code. Tester chỉ đơn giản kiểm tra phần mềm bằng cách nhập dữ liệu và sau đó kiểm tra đầu ra.

- Kiểm thử hộp trắng hoặc kiểm tra code yêu cầu kiến thức về code. Biết các khái niệm lập trình khác nhau như C, C #, C ++, khái niệm RDBMS, v.v. có thể hữu ích.

- Tester có yêu cầu về code khi họ dùng kiểm thử hộp trắng hoặc kiểm thử tự động. Điều này là do kiểm thử tự động bao gồm statement coverage, code coverage, độ phức tạp, v.v ... tất cả các khái niệm này cần có kiến thức tốt về kỹ năng lập trình và cơ sở dữ liệu.

- SQL (Ngôn ngữ truy vấn có cấu trúc) - Đôi khi kiểm thử cần xác minh cơ sở dữ liệu. Vì vậy, Tester cần có kiến ​​thức cơ bản về các lệnh SQL như của –'select', 'create', 'update 'and v.v.

- SQL –injection, "SQL injection" là một trong những kỹ thuật được sử dụng để hack cơ sở dữ liệu bằng cách chèn các lệnh không mong muốn. Một kiến thức tốt về các lệnh JavaScript và SQL sẽ có ích trong kiểm thử để tránh các mối đe dọa bảo mật phần mềm như vậy.

- Agile Testing-trong Agile Testing, toàn bộ nhóm chịu trách nhiệm về chất lượng của phần mềm. Trong suốt quá trình Agile, Tester sẽ làm việc với một hoặc nhiều development để thực hiện test. Vì vậy, để tạo ra kịch bản test auto, bắt buộc Tester phải biết code.

<br>

**Một số lời khuyên quan trọng cho QA**

 Ngoài những kiến thức về manual testing, thì biết thêm các ngôn ngữ như JavaScript, SQL v.v. sẽ giúp bạn có thêm kiến thức giúp công việc kiểm thử được thuận lợi hơn.
 
 <br>Nếu biết chút về code sẽ giúp các bạn sớm phát hiện lỗi khi dev sửa code hoặc nhanh chóng phát hiện bug, khoanh vùng có thể xảy ra lỗi tốt hơn tránh rủi ro và lack bug khi thay đổi yêu cầu từ phía Khách hàng.
 

 <br>Là một tester, bạn nên xây dựng kiến thức cơ bản về các ngôn ngữ lập trình như Java, Kiến thức về các khái niệm SQL, khái niệm DBMS, sẽ tốt hơn cho bạn trong công việc.
 
Bên cạnh đó, có một số mẹo chung có thể giúp ích khi kiểm thử:
- Kĩ năng giao tiếp
- Tư duy phân tích
- Năng khiếu

Biết về code trong kiểm thử phần mềm giúp ích rất nhiều cho QA hoặc tester trong suốt sự nghiệp của họ.

#### Tóm lại

Nếu không biết 1 chút gì về code thì mình nghĩ nên nắm vững các kiến thức cơ bản về test, các kĩ năng test, chịu khó tìm tòi và hỏi mọi người trong team để hiểu hơn về dự án. Từ đó mình sẽ biết rõ việc mình cần làm là gì. Có thể tham khảo từ những người đi trước, người đã có kinh nghiệm để biết thêm các case mà đôi khi mình không thể nghĩ ra.

<br>Người kiểm thử phần mềm thường được chia thành hai loại:

- QA, Testers: Không yêu cầu kiến thức mã hóa
- SDET: Đòi hỏi kiến thức về code


**Các thuộc tính của Tester tốt là:**

- Kiến thức basic tốt
- Tư duy logic tốt 
- Có kiến thức tốt về kỹ năng lập trình.


Tester yêu cầu kiến thức code tốt là khi họ đi sâu vào Auto test


*Nguồn dịch:* https://www.guru99.com/testers-write-code.html