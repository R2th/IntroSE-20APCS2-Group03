Chào mọi người , dạo gần đây mình bắt đầu nghe về cụm từ microservice. Ủa nó là cái gì vậy, ứng dụng của nó như thế nào.Có nên ứng dụng nó vào việc lập trình không. Do vậy mình đã lên mạng tìm hiểu và thử nghịch ngợm nó 1 xíu. Về các ưu điểm mình tìm hiểu của microservice có thể tóm gọn bằng 2 từ phân tán và linh hoạt. Mình đọc ,tìm hiểu và tóm tắt luôn của ổng Moises Macero nhé. Nếu anh em tìm và đọc trên mạng chúng ta sẽ nhận ra rằng đa phần các ứng dụng trong cái guide đó không phù hợp với một dự án thực tế,khi chúng ta muốn áp dụng vào cái gì đó lớn lao hơn thì mấy cái guide đó không phù hợp. 

- Các mục lớn chúng ta sẽ tìm hiểu dù có không thể hiểu được hoàn toàn nhưng cũng được cái là áp dụng phương pháp phát triển nó ngầu :
+ Ta sẽ sử dụng *Spring boot* để demo.
+ Phát triển theo phương pháp *Test-Driven development*(nguyên tắc sẽ là viết unit test trước khi hoàn thành các logic function. rõ ràng nó sẽ chạy fail vì lúc này ta mới chỉ khai báo method chứ đã viết gì vào trong đâu,sau đó ta mới hoàn thành các logic dần dần để testcase chạy đúng. Túm váy một câu: tao viết hết cái sai ra trước rồi tao sửa).
+ Tiếp đó *sẽ ốp microservice* nhé. Vì microservice nghe qua tên ta đã có thể mường tượng được rằng sẽ tách nhỏ service, mà tách rồi hệ thống vẫn hoạt động được,có 1 số phương pháp tách như sau:Service discovery,API gateway,load balancing.
+ Rồi còn 2 khái niệm nữa là : Event-Driven system và end-to-end testing: 2 cái này hiện giờ mình chưa thấy khoái lắm , nếu hay mình sẽ update ở phần sau
-Cùng bắt tay vào code nhé, sử dụng comand để chạy mình chưa bao giờ thử còn với mình,mình sử dụng netbean 11 để code spring nhé. Ae lên spring initializer generate ra 1 project maven nhé các thông số hãy chọn maven rồi, java 8 là được, dependece cứ để trống nhé.
- Scope của ứng dụng ta đang viết như sau. Để kiếm tra năng lực cũng như nâng cao kĩ năng tính toán của người dùng hằng ngày.chương trình sẽ hiện lên phép nhân 2 chữ số, còn người dùng sẽ nhập name và giá trị kết quả,người dùng tính nhẩm và fill kết quả nhé mọi người.Và rồi chương trình sẽ trả về là đúng hay sai. OK clear ý tưởng của bài toán rồi nhé.
Bắt tay từng phương pháp thôi. Vừa rồi anh em đã tải code trên Spring init rồi nhỉ, mở ra và viết các package,class cần thiết thôi nào.
+ Class Multiplication:![](https://images.viblo.asia/51fec5ce-1168-4e7b-8539-3eea2c243192.png)
+ một interface ![](https://images.viblo.asia/9a5e9ce5-9bfe-4d96-a96b-25765922209b.png)
+ Một application: ![](https://images.viblo.asia/338b0afc-1f68-4332-84d2-5591284cc0fc.png)
+ Quan trọng nhất theo kiểu Test-Driven development thì ta cần lập test trước nè :![](https://images.viblo.asia/faeb760e-225f-47db-958d-892f3cfefc0b.png)
+ anh em có thể xem source code tại đây và cho mình star lấy động lực nhé.
 https://github.com/quangnhse05858/Social-multipli-app-V1
 Tạm dừng V1 tại đây nhé, đây là blog đầu tiên của mình ae cần clear chỗ nào thì comment để mình biết ,khắc phục và bổ sung ở ver tiếp nhé.