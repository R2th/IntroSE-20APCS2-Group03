Tadaaa :) 

Phần 1 cho ai chưa đọc đây nha: https://viblo.asia/p/use-case-diagram-va-ly-do-su-dung-trong-kiem-thu-phan-mem-p1-obA46PBXLKv

Tiếp tục nói về vấn đề sử dụng use case diagram nha! Việc sử dụng Use case diagram là không bắt buộc, tuy nhiên cá nhân mình thấy tester vẫn nên biết và ứng dụng nó trong kiểm thử phần mềm. Sẽ có câu hỏi đặt ra là: 🤨
* Tại sao tester nên sử dụng nó trong kiểm thử phần mềm?
* Có gì thay đổi trong cách làm việc khi tester ứng dụng use case diagram không?

Qua quá trình học hỏi và làm việc thì mình cũng đã đúc kết được một số tác dụng khi sử dụng Use case diagram như sau:

## 1. Support cho việc viết test case và thực hiện test
Thông thường, tài liệu use case diagram sẽ do BA làm. Tuy nhiên không phải dự án nào BA cũng vẽ cái này, do đó tester cũng có thể tự vẽ. Và tester thường sẽ dựa vào tài liệu phân tích hệ thống, design, SRS để viết test case.

- Với SRS: Cách viết SRS của BA tại mỗi công ty có thể khác nhau. Ví dụ với công ty của mình, các bạn BA viết SRS trên file excel  và chia theo từng màn hình riêng, đang không có sự tương tác giữa các màn với nhau.
- Về phía tester, bao gồm cả các bạn học ở trung tâm: Các bạn hay có lối mòn là tập trung vào test chức năng riêng của một màn nào đó, và chú trọng vào validate rất nhiều. Trong khi các case function chạy như thế nào; tương tác giữa các function với nhau có ổn định không; thực tế xung quanh mỗi function có rất nhiều case lắt léo và các bạn hay bị miss.

Vậy nên nếu vẽ được use case diagram này thì sẽ hạn chế được những khuyết điểm đó cả ở phía BA và tester. Có thể dựa vào use case diagram để viết test case, tránh miss các case đặc biệt mà chỉ người dùng mới nghĩ ra.

*Do đặc điểm của use case là đứng dưới góc nhìn của người dùng, mà người dùng thì có nhiều ông kỳ quặc lắm 😒*

Mình phân biệt các loại test như này:

- Unit test: test riêng từng chức năng, từng màn hình
- Intergration test: test 1 vài chức năng với nhau
- System test: test cả 1 luồng chức năng của hệ thống

Khi mình viết test case thì thường viết theo từng màn hình, từng chức năng riêng. Nhưng nếu mình có use case thì mình sẽ viết và thực hiện test các chức năng liền mạch nhau hơn.

Giả sử: Trong trường hợp mình cần test các case liên tiếp từ case 1 đến case 1000 thì nó gần như là mình intergration test rồi trong khi theo plan của team phát triển thì lúc đó có thể chưa đến giai đoạn intergration test. 

⇒ Vậy nên nếu mình biết, vẽ được các use case và viết test case theo flow của use case như vậy thì hệ thống sẽ được đảm bảo hơn.
## 2. Support cho giai đoạn system test, UAT
Trong trường hợp mình không có nhiều thời gian để viết system test case ở giai đoạn system test. Khi đó có thể dựa vào use case diagram để test các tính năng chính, nhằm đảm bảo các tính năng hoạt động ổn định.

Use case diagram được vẽ đứng dưới góc nhìn của các user, các actor. Do đó nó sẽ phù hợp hơn với các hệ thống có nhiều cấp user và hỗ trợ nhiều cho giai đoạn system test và UAT.
## 3. Giúp phân tích hệ thống, đưa ra các QA kịp thời
Đôi khi BA không đưa ra hết được mối quan hệ giữa các actor và chức năng.

⇒ Tester có thể vẽ và dựa vào use case diagram để đưa ra các QA kịp thời cho những phần cảm thấy chưa hợp lý. Tránh được trường hợp hệ thống đang phát triển rồi mới thấy cái A, cái B bất hợp lý; lúc đó mới lại đi QA và team lại mất thời gian chờ hoặc pending phần đang làm lại.
## 4. Support hiểu dự án nhanh hơn với những người mới join
Trong trường hợp mình là người vào sau thì việc nhìn vào use case diagram cũng sẽ giúp mình hiểu dự án nhanh hơn. Nó giống như 1 bản overview ấy.
## 5. Support việc retest khi đang làm phase mới hoặc trong giai đoạn maintenance (bảo trì hệ thống)
Giả sử: Phase 1 của dự án đã làm xong, đến phase 2 mình không test nữa mà sẽ có 1 bạn tester khác vào test.
- Nếu dev update một chức năng mới ở phase 2 và nó liên quan đến chức năng của phase 1 → khi đó mình sẽ nhìn vào use case diagram để biết được chức năng sẽ bị ảnh hưởng là ở use case nào, và khi test lại thì sẽ không chỉ test ở 1 màn hình có chức năng đó mà mình sẽ test lại cả cái use case đấy. Điều đó để đảm bảo chức năng mới không làm ảnh hưởng đến các chức năng cũ của hệ thống
- Hoặc sau đến giai đoạn maintenance, có update hay sửa gì đó chẳng hạn. Lúc đó ngay cả khi mình làm dự án từ đầu cũng rất khó để tự đánh giá được xem những phần sửa sẽ ảnh hưởng đến các case nào.

⇒ Do đó  use case sẽ hỗ trợ mình trong việc đánh giá xem các case bị ảnh hưởng là case nào, mình cần phải test lại những case nào …

-----
Nhìn chung thì mục đính cuối cùng của việc sử dụng use case diagram vẫn là để đảm bảo hệ thống hoạt động đúng và ổn định hơn thui :)

Theo mình thì tester nên ứng dụng use case diagram trong kiểm thử. Tuy nhiên nó không bắt buộc và cũng tùy thuộc vào mỗi người. Do đó các bạn có thể tham khảo xem sao nhaaa >.O

Bài viết là ý kiến cá nhân và có thể có nhiều thiếu xót hoặc có những ý kiến trái chiều. Vậy nên mọi người đọc xong có gì thì đóng góp ý kiến cho mình để mình cải thiện thêm nha 😚

Bái baiii!!!

Mình sẽ quay lại trong bài viết tiếp theooo …