**1. Testing là gì**
- Thường thì mọi người hiểu khái niệm test chỉ là chạy test, chạy phần mềm nhưng đó chỉ là một phần không phải tất cả các hoạt động test.
- Các hoạt động test tồn tại trước và sau khi chạy PM bao gồm: lên kế hoạch và kiểm soát, chọn điều kiện test, thiết kế và chạy test case, test kết quả, đánh giá tiêu chí kế hoạch, báo cáo trong quy trình test và các hoạt động đóng sau khi giai đoạn test hoàn thành.
- Test bao gồm cả review tài liệu, source code, phân tích.
- Cả dynamic và static testing được sử dụng đồng thời để đạt được mục đích giống nhau và sẽ cung cấp thông tin để cái tiến hệ thống đang được test và các quy trình.

**1.1. Các mục tiêu điển hình của Testing**
- Để đánh giá các sản phẩm như requirements, user stories, design and code.
- Để xác minh xem tất cả các yêu cầu đã được thực hiện đầy đủ chưa?
- Để xác thực xem đối tượng test đã hoành thành chưa và hoạt động như người dùng và các bên liên quan khác mong đợi chưa?
- Để xây dựng sự tự tin  về mức độ chất lượng.
- Để ngăn ngừa lỗi.
- Để tìm failures và lỗi
- Cung cấp đầy đủ thông tin cho các bên liên quan để cho phép họ đưa ra quyết định sáng suốt, đặc biệt là về mức độ chất lượng của đối tượng test.
- Để giảm mức độ rủ ro về chất lượng phần mềm không đầy đủ
- Tuân tủ các yêu cầu hoặc tiêu chuyển theo hopwjd odongf, pháp lý hoặc theo quy trình để xác minh đối tượng test tuân thủ các yêu cầu hoặc tiêu chuẩn đó
Các mục đích khác nhau trong từng giai đọng test:
- Trong component testing, một mục tiêu có thể là tìm ra càng nhiều lỗi các tốt để các defect cơ bản được xác định và khắc phục sớm. Một mục tiêu khác có thể là tăng độ bao phủ test của các thành phần.
- Trong quá trình test chấp nhận(acceptance testing), một mục tiêu có thể là xác nhận rằng hệ thống hoạt đọng như mong đợt và đáp ứng các yêu cầu. Một mục tiêu khác của test này có thể là cung cấp thông tin cho các bên liên quan về rủi ro của phát hành hệ thống tại một thời điểm nhất định.

**1.2. Sự khác nhau giữa Testing và Debugging**

| Testing | Debugging|
| -------- | -------- |
|Test động tìm ra các hỏng học gọi là lỗi.|Debugging là hoạt động phát triển phần mềm để tìm, phân tích và sửa các lỗi đó     |
|-Test xác nhận xem các bản sửa lỗi có giải quyết được chính xác lỗi không||

Ví dụ: Testing đo đạc được chất lượng của phần mềm( VD: Chất lượng của Nhật: 1bug/ 1000KLOC (K=1000 Line of code), 15/ KLOC)

**1.3. Testing bao nhiêu là đủ**

Phụ thuộc vào RISK:
- Rủi ro của việc không nhìn thấy các lỗi quan trọng
- Rủi ro của việc phát sinh chi phí lỗi
- Rủi ro của việc phát hành phần mềm chưa được kiểm tra
- Nguy cơ mất uy tín và thị trường
- Nguy cơ thiếu một cánh cửa thị trường
- Rủi ro trong việc test quá mức, test không hiệu quả
Thời gian test luôn bị giới hạn– Sử dụng RISK để xác định:
- Test gì trước?
- Test gì nhiều hơn?
- Làm thế nào để kiểm tra kỹ lưỡng từng hạng mục
-  Cái gì không test?
-  Phân bố thời gian hợp lý cho việc testing bằng việc phân thứ tự ưu tiên

**2. Tại sao lại cần Testing?**

- Đảm bảo các thực hiện, chức năng của hệ thống chạy đúng
- Đảm bảo các chất lượng của hệ thống: độ tin cậy, tính sử dụng, bảo trì, tái sử dụng, khả năng test…
- Chất lượng được đo đạc bằng lỗi được tìm thấy trong các yêu cầu và đặt tính về chức năng và phi chức năng
Ví dụ độ đo:
Công sức tìm lỗi: số lỗi/ thời gian bỏ ra
Tỷ lệ lỗi lọt sang KH= số lỗi KH tìm đc / Tổng số lỗi ( đội dự án + KH)

- Có thể giảm rủ ro cho các vấn đề có thể xảy ra trong quá trình vận hành phần mềm.
- Khi phát hiện lỗi và sau đó sửa lỗi đó, điều này góp phần vào chất lượng của các thành phần hoặc hệ thống.
- Test PM cũng là 1 yêu cầu trong hợp đồng và các yêu cầu pháp lý hoặc chuẩn công nghiệp.

**2.1. Đóng góp của Testing vào PM**

- Kiểm thử đóng góp vào sự thành công trong việc phát triển và bảo trì phần mềm tổng thể.

Ví dụ:

| Giai đoạn | Đóng góp|
| -------- | -------- |
|Test than gia vào đánh giá yêu cầu hoặc sàng lọc yêu cầu người dùng có thể phát hiện lỗi|Giảm nguy cơ chức năng không chính xác hoặc không thể kiểm chứng đang được phát triển |
|Tester làm việc chặt chẽ với designer trong khi hệ thống đang được thiết kế có thể tăng hiển biết và cách test nó|Giảm nguy cơ lỗi thiết kế cơ bản và cho phét các xét nghiệm được xác định ở giai đoạn đầu|
|Tester làm việc chặt chẽ với developer trong khi code có thể tăng sự hiển biết và cach test nó|Giảm nguy cơ lỗi trong code và các bài test|
|Tester xác minh và xác thực phần mềm trước khi phát hành có thể phát hiện lỗi|Tăng khả năng phần mềm đáp ứng nhu cầu của các bên liên quan và đáp ứng các yêu cầu|

**2.2. Phân biệt đảm bảo chất lượng(Quality Assurance) và Testing**

![](https://images.viblo.asia/2458b48b-d80f-4f81-b669-d1b12d962277.PNG)
![](https://images.viblo.asia/38bb2b09-4d97-405c-8a00-1284606e9ad1.PNG)

Đảm bảo chất lượng và Test không giống nhau, nhưng chúng có liên quan
- Quản lý chất lượng(Quality management) bao gồm tất cả các hoạt động chỉ đạo và kiểm soát một tổ chức về chất lượng, bao gồm cả đảm bảo chất lượng và kiểm soát chất lượng.
- Đảm bảo chất lượng thường tập trung vào việc tuân thủ các quy trình thích hợp, để đảm bảo rằng mức độ chất lượng phù hợp sẽ đạt được.
- Đảm bảo chất lượng góp phần ngăn ngừa defect
- Kiểm soát chất lượng liên quan đến các hoạt động khác nhau, bao gồm các hoạt động test, hỗ trợ đạt được mức chất lượng phù hợp. Các hoạt động test là một phần của quy trình bảo trì hoặc phát triển phần mềm tổng thể.
- Vì đảm bảo chất lượng liên quan đến việc thực hiện đúng toàn bộ quy trình, đảm bảo chất lượng hỗ trợ test thích hợp.

**2.3. Phân biệt Errors, Defects and Failures**

![](https://images.viblo.asia/8000d67a-6da6-4100-abd5-6b6e0b340a2a.PNG)

Error: một hành động của con người tạo ra một kết quả không chính xác
Defects/Fault: một biểu hiện của một lỗi trong phần mềm(sai tài liệu) 
Failures: độ lệch giữa phần mềm thực tế sai khác với mong đợi

Lỗi(Errors) có thể xảy ra vì nhiều lý do, chẳng hạn như:
- Áp lực về thời gian
- Người tham gia dự án thiếu kinh nghiệm hoặc không đủ kỹ năng
- Thông tin sai lệch giữa những người tham gia dự án, bao gồm cả thông tin sai lệch về các yêu cầu và thiết kế.
- Độ phức tạp của code, thiết kế, kiến trức, vấn đề cơ bản cần giải quyết và/hoặc các công nghệ được sử dụng
- Những hiểu lầm về giao diện giữa hệ thống và liên hệ thống, đặt biệt là khi các tương tác giữa hệ thống và liên hệ thống đó có số lượng lớn
- Công nghệ mới, lạ
- Ngoài các lỗi gây ra do lỗi trong code, các lỗi cũng có thể được gây ra bởi các điều kiện môi trường

Không phải tất cả các kế quả test không mong muốn đều là Failure:
- False có thể xảy ra do sai trong cách thực hiện các test hoặc do lỗi trong dữ liệu test, môi trường hoặc các phần mềm test khác hoặc vì lý do khác. Tình huống nghịch đảo cũng có thể xảy ra, trong đó các lỗi hoặc defect tương tự dẫn đến lỗi sai.

Cái giá của defect:
- Chi phí tìm kiếm và sửa chữa các lỗi tăng lên đáng kể trong suốt vòng đời
-  Phần mềm có chất lượng kém mất chi phí nhiều hơn để sử dụng
-  Người dùng mất thời gian nhiều hơn để hiểu những gì để làm
-  Người dùng thực hiện nhiều sai phạm trong khi sử dụng nó
-  Gây áp lực về tinh thần
-  Năng suất thấp

**2.4. Defects, Root Causes và Effects**

- Nguyên nhân gốc rẻ của defect là những hành động hoặc điều kiện sớm nhất góp phần tạo ra nhiều defect
- Xác định nguyên nhân gốc rễ của sự failure có thể
+ Giảm sự xuất hiện của các defect tương tự trong tương lai
+ Cải tiến quy trình ngăn chặn một số lượng đánh kể các defect trong tương lai

**3. 7 nguyên lý cơ bản của testing**

**3.1. Kiểm thử chứng minh sự hiển diện của lỗi**

- Test có thể chỉ ra lỗi, nhưng không thể chứng minh rằng phần mềm không có lỗi.
- Test làm giảm xác suất của các lỗi chưa được khám phá vẫn còn trong phần mềm nhưng ngay cả khi không có 1 lỗi nào được tìm thấy, nó cũng không phỉa là một bằng chứng về tính đúng đắn phần mềm.

**3.2. Kiểm thử toàn bộ là không thể**

- Test tất cả mọi thứ (tất cả các kết hợp của đầu vào và điều kiện) là không khả thi
- Thay vì test tất cả, phân tích rủi ro và sắp xếp thứ tự ưu tiên nên được sử dụng để taaph trung trong testing

**3.3. Kiểm thử càng sớm càng tốt**

- Các hoạt động test nên bắt đầu càng sớm càng tốt trong chu kỳ phần mềm hoặc toàn bộ vòng đời phát triển và nên tập trung vào mục tiêu được xác định
- Thực hiện test và review càng sớm thì lỗi càng càng được phát hiện khi đó ít tồn công để tìm và sửa chữa.
- 
**3.4. Lỗi thường được phân bố tập trung**

- Một số lượng nhỏ các mô-đun thường có chứa hầu hết các lỗi được phát hiện trong quá trình test trước khi phát hành, hoặc là chịu trách nhiệm cho hầu hết các failure của hệ thống.
- Quy tắc 80/20: Module lỗi thường chứa 80% lỗi. (80% số lượng lỗi được tìm thấy trong 20% tính năng của hệ thống)

**3.5. Nghịch lý thuốc trừ sâu**

- Nếu các case test tương tự được lặp đi lặp lại nhiều lần, không có lỗi mới nào có thể được tìm thấy.
- Để khắc phục nghịch lý thuốc trừ sâu này, các test case cần phải được thường xuyên rà soát và sửa đổi; Test mới và khác đi để tìm ra nhiều lỗi tiềm ẩn hơn

**3.6. Kiểm thử phụ thuộc vào ngữ cảnh**

- Test được thực hiện khác nhau trong bối cảnh khác nhau
- VD: Phần mềm an toàn qua trọng được test khác nhau với một trang web thương mại điện tử

**3.7. Quan niệm về "hết lỗi" trong phần mềm**

- Tất cả các yêu cầu được chỉ định và sửa tất cả các lỗi được tìm thấy vẫn có thể tạo ra một hệ thống khó sử dụng, không đáp ứng nhu cầu và mong đợi của người dùng, hoặc kém hơn so với các hệ thống cạnh tranh khác. (Việc không tìm thấy lỗi trên sản phẩm không đồng nghĩa với việc sản phẩm đã sẵn sàng để tung ra thị trường)