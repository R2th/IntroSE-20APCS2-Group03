# 1. Test Driven Development (TDD) là gì?
TDD là cách phát triển phần mềm từ Test case, Test case sẽ được viết trước để xác định những yêu cầu cơ bản cần có. Nói cách khác, Test case cho từng chức năng sẽ được tạo để kiểm tra trước khi code, nếu Test case fail thì development sẽ check và update code để pass được Test case đã tạo trước đó .Mục đích chính của TDD là viết code rõ ràng, đơn giản và ít lỗi.

TDD bắt đầu bằng việc thiết kế và viết test cho mọi chức năng nhỏ của ứng dụng. Theo cách tiếp cận TDD, đầu tiên là test sẽ được viết để validate đoạn code sẽ làm cái gì, làm đúng hay chưa.

Ở quy trình kiểm thử phần mềm thông thường, chúng ta viết code rồi mới viết test. Test có thể lỗi vì test sau khi yêu cầu đã được code xong. Để pass đoạn test này thì developer phải refactor lại code.
![](https://images.viblo.asia/c6718491-4841-4cbc-84f1-e2143d6a1426.PNG)
Khái niệm đơn giản của TDD là viết và chạy đúng các đoạn test bị lỗi trước khi viết code mới. Điều này giúp ta tránh được việc lặp code vì chúng ta chỉ viết những đoạn code ngắn để pass một yêu cầu nhỏ cần test.

TDD là một quy trình phát triển và kiểm thử tự động trước khi thực sự bắt tay vào phát triển ứng dụng (nôm na là trước khi code). Bởi thế mà TDD đôi khi còn được gọi với cái tên Test First Development
# 2. Ứng dụng TDD như thế nào?
**Sau đây là các bước để thực hành TDD:**

1. Tạo test
2. Chạy test và check xem có lỗi hay không
3. Viết code
4. Chạy test và refactor code (đương nhiên là refactor để pass test)
5. Lặp lại các bước trên

![](https://images.viblo.asia/837a36ee-1a96-4bb6-85e8-5cd7d2deaa65.PNG)

**Một vòng lặp của TDD có thể xác định như sau:**

1. Viết test
2. Chạy test
3. Sửa code để test chạy đúng
4. Lặp lại 3 bước trên

**Một số điều cần làm rõ về TDD:**

1. TDD không phải tập trung về testing hay là về design
2. TDD không có nghĩa là "viết các kịch bản test rồi xây dựng một hệ thống sao cho nó pass các kịch bản test này "
3. TDD không có nghĩa là test nhiều hơn

# 4. TDD Với Testing truyền thống
Cách tiếp cận kiểu TDD là một kỹ thuật đặc biệt. Nó đảm bảo rằng mã nguồn của bạn luôn được kiểm tra kỹ lưỡng ở mức độ xác nhận (confirm input/output)

Với kiểm thử truyền thống, kiểm thử thành công có nghĩa là tìm ra lỗi. Nó cũng giống như TDD. Có lỗi tức là mọi thứ vẫn đang trong tiến trình, vì bạn biết rằng bạn cần giải quyết vấn đề.

TDD đảm bảo rằng hệ thống đáp ứng đúng yêu cầu, bạn có thể hoàn toàn tự tin vào hệ thống.

TDD tập trung vào production để đảm bảo kiểm thử chính xác. Kiểm thử truyền thống thì tập trung vào việc thiết kế test case.

TDD, độ coverage là 100%. Mọi dòng code đều được test, không giống như kiểm thử truyền thống.

Trong mô hình Agile, bạn nên "kiểm thử có mục đích". Bạn nên biết tại sao bạn kiểm thử và mức độ kiểm thử là như thế nào

# 5. Acceptance TDD và Developer TDD là gì?
**Có 2 mức độ của TDD:**

**Acceptance TDD (ATDD) (kiểm thử chấp nhận):** với ATDD bạn viết một kiểm thử chấp nhận. Đoạn test này đáp ứng yêu cầu của spec hoặc thỏa mãn hành vi của hệ thống. Sau đó thì viết code đủ để đáp ứng đoạn test này. Kiểm thử chấp nhận tập trung vào hành vi tổng thể của hệ thống. ATDD còn được gọi là Behavioral Driven Development (BDD).

**Developer TDD:** bạn viết test (unit test...) và viết code đủ để pass đoạn test đó. Unit test tập trung vào mỗi chức năng nhỏ của hệ thống. Developer TDD được gọi là TDD.

![](https://images.viblo.asia/85d410e4-62a2-4e36-8e1e-d7f897e3ab8c.PNG)

**TDD đang mở rộng  thông qua Phát triển theo hướng mô hình Agile (AMDD)**

TDD rất tốt trong việc xác nhận và đặc tả chi tiết. Nó không thành công trong việc nói đến thông qua các vấn đề lớn hơn như thiết kế tổng thể, sử dụng hệ thống hoặc giao diện người dùng. AMDD giải quyết các vấn đề mở rộng Agile mà TDD không giải quyết được.

Do đó AMDD được sử dụng cho các vấn đề lớn hơn.

**So sánh TDD với AMDD**

**Về TDD	:**

+ TDD rút ngắn thời gian lập trình	
+ TDD dùng cho spec detail	
+ TDD đảm bảo chất lượng code
+ TDD dùng cho lập trình viên	
+ TDD giới hạn chỉ ở phạm vi phần mềm	

**Về AMDD:**

+ AMDD rút ngắn thời gian mô hình hóa
+ AMDD áp dụng cho vấn đề quy mô lớn
+ AMDD đảm bảo chất lượng liên lạc giữa developer và các bên liên quan
+ AMDD dùng cho các nhà phân tích nghiệp vụ, stakeholder và chuyên viên dữ liệu
+ AMDD có phạm vi rộng hơn, bao gồm cả stakeholder, nhằm hướng đến một nhận thứ chung

# 6. Các lỗi thường gặp khi áp dụng TDD
- Không quan tâm đến các test bị fail
- Quên đi thao tác tối ưu sau khi viết code cho test pass
- Thực hiện tối ưu code trong lúc viết code cho test pass => không nên như vậy
- Đặt tên các test khó hiểu và tối nghĩa
- Không bắt đầu từ các test đơn giản nhất và không theo các baby step.
- Chỉ chạy mỗi test đang bị fail hiện tại
- Viết một test với kịch bản quá phức tạp

# 7. Các ví dụ tham khảo về TDD
- Part I – Test-Driven Development by example – Kent Beck.
- Part III – Test-Driven Development: A practical guide – David Astels.

    Các bạn có thể đọc tham khảo 1 ví dụ chi tiết tại bài viết sau: 
https://phambinh.net/bai-viet/tdd-la-gi-code-it-bug-hon-voi-tdd/

# 8. Các công cụ hỗ trợ
cppUnit, csUnit (.Net), CUnit, DUnit (Delphi), DBFit, DBUnit, HTMLUnit, HTTPUnit, JMock, JUnit, NDbUnit, NUnit, OUnit, PHPUnit, PyUnit (Python), SimpleTest, TestNG, Test::Unit (Ruby), VBUnit, XTUnit.

# Kết Luận:
Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về TDD Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn, thực hành tốt về TDD và áp dụng hiệu quả nó vào công việc của bạn. Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học và thực hành một cách tốt nhất!

Tài liệu tham khảo:

https://www.guru99.com/test-driven-development.html

https://phambinh.net/bai-viet/tdd-la-gi-code-it-bug-hon-voi-tdd/ 

http://blog.co-mit.com/post/9/T%C3%ACm+hi%E1%BB%83u+m%C3%B4+h%C3%ACnh+TDD+%28Test+-+Driven+Development%29+v%C3%A0+c%C3%A1ch+%C3%A1p+d%E1%BB%A5ng