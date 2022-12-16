## A. Thử nghiệm hướng phát triển (TDD) là gì

*TDD có thể được định nghĩa là một thực hành lập trình để hướng dẫn các nhà phát triển viết mã mới chỉ khi một thử nghiệm tự động thất bại*. Điều này tránh sự trùng lặp của mã. TDD có nghĩa là Thử nghiệm hướng dẫn phát triển. Mục tiêu chính của TDD là làm cho mã rõ ràng hơn, đơn giản và không có lỗi.

Phát triển dựa trên thử nghiệm bắt đầu bằng việc thiết kế và xây dựng các thử nghiệm cho mọi chức năng nhỏ của ứng dụng. Trong phương pháp TDD, đầu tiên, thử nghiệm được xây dựng nhằm xác định và xác nhận những gì mã hóa sẽ làm

Trong quy trình Kiểm thử phần mềm thông thường, trước tiên chúng tôi xây dựng mã hóa và sau đó thử nghiệm. Các thử nghiệm có thể thất bại vì các thử nghiệm được xây dựng ngay cả trước khi phát triển. Để vượt qua bài kiểm tra, nhóm phát triển phải phát triển và tái cấu trúc mã. Tái cấu trúc mã có nghĩa là thay đổi một số mã mà không ảnh hưởng đến hành vi của nó.

![](https://images.viblo.asia/667463c3-ce10-477d-8141-4d5aa582b656.png)

*Khái niệm đơn giản của TDD là viết và sửa các bài kiểm tra thất bại trước khi viết mã mới (trước khi phát triển)*. Điều này giúp tránh trùng lặp mã khi chúng ta viết một lượng nhỏ mã tại một thời điểm để vượt qua các bài kiểm tra. (Các thử nghiệm không có gì ngoài các điều kiện yêu cầu mà chúng ta cần kiểm tra để hoàn thành chúng).

Phát triển dựa trên thử nghiệm là một quá trình phát triển và chạy thử nghiệm tự động trước khi phát triển ứng dụng thực tế. Do đó, đôi khi TDD còn được gọi là Phát triển thử nghiệm trước

## B. Hoạt động thử nghiệm TDD

### 1. Cách thực hiện kiểm thử TDD

***a. Các bước sau xác định cách thực hiện kiểm tra TDD***

- Thêm một bài kiểm tra.
- Chạy tất cả các bài kiểm tra và xem xét nếu có bài kiểm tra mới thất bại.
- Viết mã lệnh.
- Chạy thử nghiệm và Cấu trúc lại mã lệnh
- Lặp lại.

![](https://images.viblo.asia/61ec8249-8c92-43b4-9420-5399fef40007.png)

***b. Chu kỳ TDD***

- Viết một bài kiểm tra
- Làm cho nó chạy.
- Thay đổi mã để làm cho nó đúng, tức là cấu trúc lại mã (Refactor)
- Lặp lại quá trình.

***c. Một số giải thích về TDD***

- TDD không phải là về "Thử nghiệm" hay về "Thiết kế".
- TDD không có nghĩa là "viết một số bài kiểm tra, sau đó xây dựng một hệ thống vượt qua các bài kiểm tra.
- TDD không có nghĩa là "làm nhiều thử nghiệm."

### 2. So sánh TDD và Kiểm tra truyền thống

- Phương pháp TDD chủ yếu là một kỹ thuật đặc tả. Nó đảm bảo rằng mã nguồn của bạn được kiểm tra kỹ lưỡng ở mức xác nhận.

- Với thử nghiệm truyền thống, một thử nghiệm thành công tìm thấy một hoặc nhiều khiếm khuyết. Nó giống như TDD. Khi thử nghiệm thất bại, bạn đã đạt được tiến bộ, bởi vì bạn biết rằng bạn cần giải quyết vấn đề.

- TDD đảm bảo rằng hệ thống của bạn thực sự đáp ứng các yêu cầu được xác định cho nó. Nó giúp xây dựng sự tự tin về hệ thống.

- Trong TDD tập trung nhiều hơn vào mã hóa để xác minh xem thử nghiệm có hoạt động đúng không. Trong thử nghiệm truyền thống, tập trung nhiều hơn vào thiết kế trường hợp thử nghiệm. Liệu thử nghiệm sẽ cho thấy việc thực hiện đúng / không đúng của ứng dụng để đáp ứng các yêu cầu.

- Trong TDD, bạn đạt được thử nghiệm 100% bao phủ. Mỗi dòng mã được kiểm tra, không giống như kiểm tra truyền thống.

- Sự kết hợp của cả thử nghiệm truyền thống và TDD sẽ mang đến tầm quan trọng của thử nghiệm hệ thống hơn là sự hoàn hảo của hệ thống.

- Trong mô hình Agile (AM), bạn nên "thử nghiệm với mục đích". Bạn nên biết lý do tại sao bạn đang thử nghiệm một cái gì đó và mức độ cần được kiểm tra.

### 3. Phân loại TDD

Có hai cấp độ TDD: TDD chấp nhận (ATDD) và TDD dành cho nhà phát triển 

**a. TDD chấp nhận (Acceptance TDD-ATDD)**

Với ATDD, bạn viết một bài kiểm tra chấp nhận duy nhất. Thử nghiệm này đáp ứng yêu cầu của đặc điểm kỹ thuật hoặc đáp ứng hành vi của hệ thống. Sau đó, viết mã sản phẩm hoặc mã chức năng vừa đủ để hoàn thành bài kiểm tra chấp nhận đó. Kiểm tra chấp nhận tập trung vào hành vi tổng thể của hệ thống. ATDD còn được gọi là Phát triển hướng hành vi (Behavioral Driven Development-BDD).

**b. TDD cho nhà phát triển**

Với Nhà phát triển, chúng ta viết thử nghiệm đơn, ví dụ như thử nghiệm đơn vị và sau đó chỉ cần đủ mã sản phẩm để thực hiện thử nghiệm đó. Bài thử nghiệm đơn vị tập trung vào mọi chức năng nhỏ của hệ thống. Nhà phát triển TDD được gọi đơn giản là TDD.

Mục tiêu chính của ATDD và TDD là xác định các yêu cầu chi tiết, có thể thực hiện được cho giải pháp trên cơ sở đúng lúc (Just in time - JIT). JIT có nghĩa là chỉ thực hiện những yêu cầu cần xem xét trong hệ thống. Vì vậy, sẽ tăng hiệu quả.

![](https://images.viblo.asia/2d79bb3a-0538-495d-a77c-c163bd6fe76a.png)

## C. Mở rộng quy mô TDD thông qua phát triển dựa trên mô hình Agile (AMDD)

TDD là rất tốt ở đặc điểm kỹ thuật chi tiết và xác nhận. TDD không suy nghĩ thông qua các vấn đề lớn hơn như thiết kế tổng thể, sử dụng hệ thống hoặc giao diện người dùng. 
AMDD giải quyết các vấn đề mở rộng quy mô Agile mà TDD không có. Do đó AMDD được sử dụng cho các vấn đề lớn hơn.

Vòng đời của AMDD như bên dưới

![](https://images.viblo.asia/6dc1b320-e83d-45ae-a00b-3d4d6e14252a.png)

Trong mô hình điều khiển Phát triển (MDD), các mô hình mở rộng được tạo trước khi mã nguồn được viết. Mà lần lượt có một cách tiếp cận nhanh lẹ?

Trong hình trên, mỗi hộp đại diện cho một hoạt động phát triển.

Hình dung là một trong quá trình của TDD dự đoán hoặc tưởng tượng các thử nghiệm sẽ được thực hiện trong tuần đầu tiên của dự án. Mục tiêu chính của hình dung là xác định phạm vi của hệ thống và kiến trúc của hệ thống. Yêu cầu cấp cao và mô hình kiến trúc được thực hiện để hình dung thành công.

Đây là quá trình mà không phải là một đặc tả chi tiết của phần mềm hoặc hệ thống được thực hiện mà là khám phá các yêu cầu của phần mềm hoặc hệ thống xác định chiến lược tổng thể của dự án.

**1. Vòng lặp 0 (Interation 0): Hình dung**

Có hai kích hoạt chính.

- Hình dung yêu cầu ban đầu

Có thể mất vài ngày để xác định các yêu cầu cấp cao và phạm vi của hệ thống. Trọng tâm chính là khám phá mô hình sử dụng, mô hình miền ban đầu và mô hình giao diện người dùng (UI).

- Hình dung kiến trúc ban đầu.

Cũng mất vài ngày để xác định kiến trúc của hệ thống. Nó cho phép thiết lập các hướng kỹ thuật cho dự án. Trọng tâm chính là khám phá sơ đồ công nghệ, luồng Giao diện người dùng (UI), mô hình miền và những trường hợp thay đổi.

**2.Mô hình lặp ( Iteration modeling)**

Ở đây nhóm phải lập kế hoạch công việc sẽ được thực hiện cho mỗi lần lặp.

- Quy trình Agile được sử dụng cho mỗi lần lặp, tức là trong mỗi lần lặp, mục công việc mới sẽ được thêm ưu tiên.
- Công việc ưu tiên cao hơn đầu tiên sẽ được xem xét. Các mục công việc được thêm vào có thể được sắp xếp lại hoặc loại bỏ khỏi ngăn xếp các mục bất cứ lúc nào.
- Nhóm thảo luận về cách họ sẽ thực hiện từng yêu cầu. Mô hình được sử dụng cho mục đích này.
- Phân tích mô hình và thiết kế được thực hiện cho từng yêu cầu sẽ thực hiện cho lần lặp đó.

**3.Mô hình Storming (Model storming )**

- Ở đây liên quan đến một nhóm gồm 2/3 thành viên thảo luận về các vấn đề trên giấy hoặc bảng trắng.

- Một thành viên trong nhóm sẽ yêu cầu người khác làm mẫu với họ. Mô hình này sẽ mất khoảng 5 đến 10 phút. Nơi các thành viên trong nhóm tập hợp lại để chia sẻ

- Họ khám phá các vấn đề cho đến khi họ không tìm thấy nguyên nhân chính của vấn đề. Chỉ trong thời gian đó, nếu một thành viên trong nhóm xác định vấn đề muốn giải quyết thì sẽ nhanh chóng giúp đỡ các thành viên khác trong nhóm.

- Các thành viên khác trong nhóm sau đó khám phá vấn đề và sau đó mọi người tiếp tục như trước. Nó cũng được gọi là mô hình độc lập.

**4. Kiểm tra hướng phát triển (TDD)**

- Nó thúc đẩy thử nghiệm xác nhận mã ứng dụng của bạn và đặc điểm kỹ thuật chi tiết.

- Cả thử nghiệm chấp nhận (yêu cầu chi tiết) và thử nghiệm dành cho nhà phát triển (thử nghiệm đơn vị) đều là đầu vào cho TDD.

- TDD làm cho mã đơn giản và rõ ràng hơn. Nó cho phép nhà phát triển duy trì ít tài liệu hơn.


**5. Nhận xét**

- Đây là tùy chọn. Nó bao gồm kiểm tra mã và đánh giá mô hình.

- Điều này có thể được thực hiện cho mỗi lần lặp hoặc cho toàn bộ dự án.

- Đây là một lựa chọn tốt để cung cấp thông tin phản hồi cho dự án.

### D. So sánh kiểm tra hướng phát triển (TDD) với Phát triển theo mô hình Agile (AMDD)

| TDD | AMDD |
| -------- | -------- |
| TDD rút ngắn vòng phản hồi lập trình     | AMDD rút ngắn vòng phản hồi mô hình hóa     |
| TDD là đặc điểm kỹ thuật chi tiết     | AMDD hoạt động cho các vấn đề lớn hơn     |
| TDD thúc đẩy phát triển mã chất lượng cao     | AMDD thúc đẩy giao tiếp chất lượng cao với các bên liên quan và nhà phát triển     |
| TDD nói chuyện với các lập trình viên     | AMDD nói chuyện với nhà phân tích kinh doanh, các bên liên quan và các chuyên gia dữ liệu     |
| TDD không định hướng trực quan     | AMDD định hướng trực quan     |
| TDD có phạm vi giới hạn đối với công việc phần mềm     | AMDD có phạm vi rộng bao gồm các bên liên quan. Nó liên quan đến việc làm theo hướng hiểu biết chung     |
| Cả hai đều hỗ trợ phát triển tiến hóa     | ---     |


### E. Ưu điểm của TDD

**1. Thông báo lỗi sớm.**

Các nhà phát triển kiểm tra mã của họ nhưng trong cơ sở dữ liệu, điều này thường bao gồm các kiểm tra thủ công hoặc các tập lệnh trong một lần. Sử dụng TDD mà bạn xây dựng, theo thời gian, một bộ các bài kiểm tra tự động mà bạn và bất kỳ nhà phát triển nào khác có thể chạy lại theo ý muốn.

**2. Thiết kế tốt hơn, rõ ràng hơn và mã mở rộng hơn.**

- Nó giúp hiểu cách mã sẽ được sử dụng và cách nó tương tác với các mô-đun khác.

- Nó dẫn đến quyết định thiết kế tốt hơn và mã duy trì nhiều hơn.

- TDD cho phép viết những cụm mã nhỏ với trách nhiệm duy nhất thay vì các thủ tục nguyên khối với nhiều trách nhiệm. Điều này làm cho mã đơn giản hơn để hiểu.

- TDD buộc viết mã sản phẩm để vượt qua các bài kiểm tra dựa trên yêu cầu của người dùng.

**3. Tự tin để tái cấu trúc**

- Nếu cấu trúc lại mã, có thể có khả năng phá vỡ mã. Vì vậy, có một bộ các bài kiểm tra tự động, bạn có thể sửa các lỗi đó trước khi phát hành. Cảnh báo thích hợp sẽ được đưa ra nếu các vi phạm được tìm thấy khi sử dụng các bài kiểm tra tự động.

- Sử dụng TDD, sẽ đưa ra mã nhanh hơn, có thể mở rộng hơn với ít lỗi hơn, có thể được cập nhật với rủi ro tối thiểu.

**4. Tốt cho làm việc nhóm**

Trong trường hợp không có bất kỳ thành viên nào trong nhóm, các thành viên khác trong nhóm có thể dễ dàng nhận và làm việc với mã. Nó cũng hỗ trợ chia sẻ kiến ​​thức, do đó làm cho nhóm hiệu quả hơn về tổng thể.

**5. Hữu ích cho nhà phát triển**

Mặc dù các nhà phát triển phải dành nhiều thời gian hơn để viết các trường hợp thử nghiệm TDD, nhưng sẽ mất ít thời gian hơn để gỡ lỗi và phát triển các tính năng mới. Bạn sẽ viết rõ ràng hơn, mã ít phức tạp hơn.


**Tóm lược:**

*- Phát triển dựa trên thử nghiệm là một quá trình sửa đổi mã để vượt qua thử nghiệm được thiết kế trước đó.*

*- Nhấn mạnh hơn vào mã sản phẩm hơn là thiết kế trường hợp thử nghiệm.*

*- Trong Kỹ thuật phần mềm, đôi khi nó được gọi là "Thử nghiệm phát triển trước tiên tiên".*

*- TDD bao gồm tái cấu trúc mã, tức là thay đổi hoặc thêm một số lượng mã vào mã hiện có mà không ảnh hưởng đến hành vi của mã.*

*- TDD khi được sử dụng, mã trở nên rõ ràng và dễ hiểu hơn.*

***Tài liệu tham khảo:***

https://www.guru99.com/test-driven-development.html