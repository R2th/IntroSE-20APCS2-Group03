### I. Test Driven Development (TDD) là gì?
TDD có thể xem là một cách lập trình trong thực tiễn mà hướng dẫn developer viết code mớới chỉ khi một đoạn test tự động bị lỗi (failed), tránh lặp code. TDD nghĩa là "*Test Drivent Development*". Mục đích chính của TDD là viết code rõ ràng, đơn giản và ít lỗi.

TDD bắt đầu bằng việc **thiết kế** và viết test cho mọi chức năng nhỏ của ứng dụng. Theo cách tiếp cận TDD, đầu tiên là test sẽ được viết để validate đoạn code sẽ làm cái gì, làm đúng hay chưa.

Ở quy trình kiểm thử phần mềm thông thường, chúng ta viết code rồi mới viết test. Test có thể lỗi vì test đã được viết trước khi code. Để pass đoạn test này thì developer phải refactor lại code.

![](https://images.viblo.asia/0c7f78f2-e2d2-41f9-9c97-ede5bf207e8d.png)

Khái niệm đơn giản của TDD là viết và chạy đúng các đoạn test bị lỗi trước khi viết code mới. Điều này giúp ta tránh được việc lặp code vì chúng ta chỉ viết những đoạn code ngắn để pass pha test thôi.
TDD là một quy trình phát triển và kiểm thử tự động trước khi thực sự bắt tay vào phát triển ứng dụng (nôm na là trước khi code). Bởi thế mà TDD đôi khi còn được gọi với cái tên **Test First Development**

### II. Ứng dụng TDD như thế nào?
Sau đây là các bước để thực hành TDD:

1. Tạo test
2. Chạy test và check xem có lỗi hay không
3. Viết code
4. Chạy test và refactor code (đương nhiên là refactor để pass test)
5. Lặp lại các bước trên

![](https://images.viblo.asia/4efa2cf1-4828-4364-9aa3-526dc7fd3456.png)

Một vòng lặp của TDD có thể xác định như sau:
1. Viết test
2. Chạy test
3. Sửa code để test chạy đúng
4. Lặp lại 3 bước trên

Một số điều cần làm rõ về TDD:
* TDD không phải tập trung về *testing* hay là về *design*
* TDD không có nghĩa là "viết vài đoạn test rồi dựng một hệ thống sao cho nó pass mấy cái đoạn test này"
* TDD không có nghĩa là test nhiều hơn

### III. TDD Vs. Kiểm thử truyền thống
Cách tiếp cận kiểu TDD là một kỹ thuật đặc biệt. Nó đảm bảo rằng mã nguồn của bạn luôn được kiểm tra kỹ lưỡng ở mức độ xác nhận (confirm input/output)

* Với kiểm thử truyền thống, kiểm thử thành công có nghĩa là tìm ra lỗi. Nó cũng giống như TDD. Có lỗi tức là mọi thứ vẫn đang trong tiến trình, vì bạn biết rằng bạn cần giải quyết vấn đề
* TDD đảm bảo rằng hệ thống đáp ứng đúng yêu cầu, bạn có thể hoàn toàn tự tin vào hệ thống
* TDD tập trung vào production để đảm bảo kiểm thử chính xác. Kiểm thử truyền thống thì tập trung vào pha thiết kế test case.
* TDD, độ coverage là 100%. Mọi dòng code đều được test.
* Trong mô hình Agile, bạn nên "kiểm thử có mục đích". Bạn nên biết tại sao bạn kiểm thử và mức độ kiểm thử là như thế nào

### IV. Acceptance TDD và Developer TDD
Có 2 mức độ của TDD:
1. Acceptance TDD (ATDD) (kiểm thử chấp nhận): với ATDD bạn viết một kiểm thử chấp nhận. Đoạn test này đáp ứng yêu cầu của spec hoặc thỏa mãn hành vi của hệ thống. Sau đó thì viết code đủ để đáp ứng đoạn test này. Kiểm thử chấp nhận tập trung vào hành vi tổng thể của hệ thống. ATDD còn được gọi là Behavioral Driven Development (BDD).

2. Developer TDD: bạn viết test (unit test...) và viết code đủ để pass đoạn test đó. Unit test tập trung vào mỗi chức năng nhỏ của hệ thống. Developer TDD được gọi là TDD.

![](https://images.viblo.asia/b380359e-aa19-499f-bcca-09e8fa04204f.png)

### V. Scaling TDD với Agile Model Driven Development (AMDD)
TDD rất ổn với một spec chi tiết. Tuy nhiên khi nói đến thiết kế tổng thể, sử dụng hệ thống hoặc UI thì nó khá là fail. Và đó là lúc ta cần AMDD.

AMDD được dùng cho những vẫn đề quy mô hơn.
Vòng đời của AMDD

![](https://images.viblo.asia/eb253ca1-1d9c-4025-a274-84a640da0a51.png)

Ở phát triển hướng mô hình (Model-driven Development), model được tạo trước khi viết code. Trong hình trên, mỗi một box biểu diễn một hoạt động trong việc phát triển (có thể là TDD, có thể là lên yêu cầu, ...)

Một trong những quá trình của TDD là các đoạn test dự đoán/tưởng tượng sẽ được thi hành trong tuần đầu tiên của dự án. Mục đích của nó là xác định phạm vi và kiến trúc của hệ thống. Những yêu cầu ở cấp độ cao và việc mô hình hóa kiến trúc chính là lời giải cho giai đoạn này.

Quá trình này không phải là một đặc tả chi tiết của phần mềm / hệ thống mà là khám phá các yêu cầu của phần mềm / hệ thống nhằm xác định chiến lược chung của dự án.

1. Sprint 0: Tầm nhìn
Có 2 hoạt động chính:

* Hình dung yêu cầu khởi điểm
  Xác định các yêu cầu và phạm vi hệ thống có thể mất nhiều ngày, tập trung vào mô hình sử dụng, domain, UI
  
* Hình dung kiến trúc khởi điểm
  Xác định kiến trúc hệ thống cũng tốn kha khá thời gian, nó cho phép thiết lập kỹ thuật cho dự án, tập trung vào biểu đồ công nghệ, flow UI, domain modal và change spec.

2. Iteration modeling:
Lên kế hoạch công việc cho mỗi sprint.
* Quy trình được dùng
* Các công việc cần ưu tiên
* Thảo luận cách cài đặt các yêu cầu, mô hình hóa được dùng cho mục đích này
* Phân tích và thiết kế cho mỗi yêu cầu

3. Model storming:
Còn được gọi là *Just in time Modeling*.
Kinh nghiệm của tôi là phần lớn trường hợp pha này chỉ có vài người, 2 hoặc 3, thảo luận vấn đề trên giấy hoặc bảng trắng.  Các thành viên đặt câu hỏi cho nhau từ 5-10 phút, thông tin được ghi lại trên bảng, tiếp tục khai thác vấn đề cho đến khi giải quyết xong. Mô hình này gọi là *Just In Time*, tức là bạn gặp vấn đề, bạn tìm vài ông đồng đội đến giúp bạn, đơn giản vậy thôi.

4. Test Driven Development (TDD).
* Thúc đẩy quá trình kiểm thử ứng dụng và spec chi tiết
* Cả kiểm thử chấp nhận và unit test đều là đầu vào cho TDD
* TDD giúp viết code đơn giản và rõ ràng, maintain dễ hơn
5. Reviews.
* Phần này thì tùy chọn
* Có thể áp dụng cho từng sprint hoặc cho cả dự án

### VI. Test Driven Development (TDD) Vs. Agile Model Driven Development (AMDD)


| TDD | AMDD |
| -------- | -------- |
| TDD rút ngắn thời gian lập trình     | AMDD rút ngắn thời gian mô hình hóa   |
| TDD dùng cho spec detail| AMDD áp dụng cho vấn đề quy mô lớn |
| TDD đảm bảo chất lượng code | AMDD đảm bảo chất lượng liên lạc giữa developer và các bên liên quan  |
| TDD dùng cho lập trình viên     | AMDD dùng cho các nhà phân tích nghiệp vụ, stakeholder và chuyên viên dữ liệu  |
| TDD giới hạn chỉ ở phạm vi phần mềm   | AMDD có phạm vi rộng hơn, bao gồm cả stakeholder, nhằm hướng đến một nhận thứ chung  |

### VII. Ví dụ
Trong ví dụ này ta định nghĩa class Password, class này cần thỏa mãn các điều kiện sau:

* password từ 5 - 10 ký tự
Đầu tiên ta viết code để đáp ứng yêu cầu này

![](https://images.viblo.asia/011c86ef-9867-45a3-a78c-95e5ce58f31f.png)

Kịch bản 1: Để chạy test, ta tạo class PasswordValidator ();

![](https://images.viblo.asia/d17a2e17-550e-4e54-a3bc-afac4e64b857.png)

Chạy class trên thì được output là *PASSED*:

![](https://images.viblo.asia/fce87497-5c59-4263-b7b1-776ccfdf9f34.png)

Kịch bản 2: Chúng ta thấy phương thức TestPasswordLength () không cần tạo object PasswordValidator. 

![](https://images.viblo.asia/9576597b-dfe0-4438-91d2-5b99fd0c237e.png)

Ta sẽ xóa dòng  ```PasswordValidator pv = new PasswordValidator ()```. Ta có thể gọi *isValid()* trực tiếp bởi PasswordValidator. IsValid ("Abc123"). 

Do đó ta refactor như sau:

![](https://images.viblo.asia/1f6d73d7-1fb6-42ab-92f3-23645e17424c.png)

Kịch bản 3: sau khi refactor thì output lại lỗi vì chúng ta đã remove phần tạo object, nó báo là không có tham chiếu đến phương thức non-static *isValid()*

![](https://images.viblo.asia/844d8ae4-5c91-413f-acda-2cb7444f9b2d.png)

Nên ta lại thay đổi phương thức này bằng cách thêm *static* trước Boolean thành ```public static boolean isValid (String password)```. Refactor class PasswordValidator ():

![](https://images.viblo.asia/c51e3cad-6768-47e2-b2bb-cd0e0aad7473.png)

Output: PASSED

![](https://images.viblo.asia/3cc46f18-deb4-4e9c-9eb8-5b353b3cf2d9.png)

### VIII. Lợi ích của TDD
* Báo bug sớm
Dùng TDD bạn có thể dựng một test suite mà có thể chạy bất cứ khi nào

* Code có design đẹp hơn, rõ ràng hơn
  * Giúp hiểu rõ cách đoạn code hoạt động và tương tác với module khác
  * Design đẹp hơn, code dễ maintain hơn
  * Viết ít code hơn
  * TDD buộc bạn phải viết production code để pass test dựa theo yêu cầu người dùng

* Tự tin refactor
  * Nếu bạn refactor code thì có thể lại break cái hành vi cũ của nó, dùng TDD thì cho kết quả nhanh hên bạn tự tin refactor mà không sợ code mới xảy ra lỗi

* Tốt cho teamwork

* Tốt cho developer
Dù developer sẽ mất thời gian hơn để viết TDD test case, nhưng lại giảm được thời gian debug và phát triển chức năng mới.

### IX. Tổng kết
* TDD là quy trình chỉnh sửa code để pass test đã thiết kế từ trước
* Tập trung vào production code hơn là design test case
* Còn gọi là "Test First Development."
* TDD bao gồm refactor code
* TDD giúp code rõ ràng, dễ hiểu

Tổng hợp từ:

[https://www.guru99.com/test-driven-development.html](https://www.guru99.com/test-driven-development.html)
[http://www.agilemodeling.com/essays/amdd.htm](http://www.agilemodeling.com/essays/amdd.htm)