![](https://images.viblo.asia/0a26f117-494a-4006-a1b2-8e3c7c9dfd00.png)
Ở bài viết này, tôi sẽ không đi sâu quá về unit test, mà chỉ cùng thảo luận về unit test dưới góc nhìn của 1 PQA.
Bạn có thể đã gặp rất nhiều câu hỏi, đại khái như: *Code của tôi chạy hoàn hảo. Sao tôi phải test?* Đừng nghĩ rằng developer nào cũng biết unit test và cách viết unit test. Một thực tế, một cậu bạn tui, học đúng chuyên ngành ra, đã đi làm nhiều năm, không biết unit test là gì. Bạn có thể sẽ cười khẩy? Thằng bạn đó gà ư? Không hề, chỉ là cậu ấy biết nó nôm na là "viết code test" :laughing:

Trên thực tế, các công ty công nghệ lớn trên thế giới như Facebook, Google, Rockstar, Sony…Họ thuê những developer thông minh nhất trên thế giới, nhưng các developer đó vẫn viết ra những mã không bảo mật.
Google thậm chí sẽ trao khoản tiền thưởng lên đến 30.000USD cho các nhà phát triển phát hiện ra các vấn đề bảo mật ở các ứng dụng có trên 100 triệu lượt tải trên Play Store.

Có nghĩa là, câu hỏi ở trên đã có đáp án rồi đó. Không có chuyện "code hoàn hảo". 
"Vậy chúng ta sẽ phải test gì?". Chúng ta có thể test tất cả mọi thứ, ngoại trừ code của bên thứ ba, vì họ đã tự test rồi.
![](https://images.viblo.asia/f3b3f163-5a90-486b-8bb8-c0beb7cd8793.png)

Bạn hẳn đã nghe đến phương trình về sự tương đương giữa khối lượng và năng lượng E = mC2 của nhà vật lý thiên tài người Đức Albert Einstein. Vì trình độ của mình gà lắm, nên chúng ta sẽ không bàn chuyện vật lý ở đây nha. Hãy hiểu đơn giản hơn thôi, code càng nhiều thì càng nhiều lỗi.
![](https://images.viblo.asia/390d70ce-4b34-4bc5-a62d-706aae439143.png)

Tản mạn vậy thôi nha. Quay trở lại topic chính, chúng ta sẽ cùng nhìn nhận những vấn đề sau:
* Unit test là gì? 
* Khái niệm Code Coverage
* Tại sao chúng ta cần viết Unit Test
* Estimate unit test
* Hiểu nhầm về Unit Test

# 1. Unit test là gì?
**Unit Testing** là một phương pháp kiểm thử phần mềm mà ở đó từng đơn vị riêng lẻ (**Individual Unit**) của source code được test để kiểm tra xem chúng có đảm bảo chất lượng để sử dụng không.
**Unit Test** còn gọi là **Component Test**
**Unit Test** cần được thiết kế để kiểm tra function một cách độc lập. Nôm na: A cần B để chạy. Ngay cả khi B có lỗi, thì Unit Test của A VẪN SẼ PASS nếu không có vấn đề gì với A.

Unit test thường do lập trình viên/developer thực hiện và chỉ thực sự hiệu quả khi:
- Được vận hành lặp lại nhiều lần
- Tự động hoàn toàn
- Độc lập với các Unit test khác
Có rất nhiều phần mềm hỗ trợ thực thi unit test với giao diện trực quan. Thông thường, trạng thái của unit được biểu hiện bằng các màu khác nhau: màu xanh (pass), màu vàng (ignore) và màu đỏ (fail).
![](https://images.viblo.asia/5011802c-2622-4cdb-b399-0c6d21007f38.png)

# 2. Code coverage
Khi tiếp cận với Unit test, bạn sẽ nghe đến Code coverage. Vậy code coverage là gì?

**Code coverage** là một phương pháp đánh giá được dùng để mô tả mức độ mà source code của một chương trình đã được thực thi, khi mà một bộ Test (test suite) cụ thể chạy. 

Là phương pháp thống kê dựa vào số lượng code được kiểm tra. 

Ví dụ: Nếu code coverage của bạn là 90%, điều đó có nghĩa là 90% các dòng codes trong project của bạn đã được gọi khi chạy Test.

Trong code coverage có thể phân chia thành các loại sau:
- Bao phủ dòng lệnh (Statement coverage/Command coverage) - C0
- Bao phủ các nhánh (Branch/Decision coverage) - C1
- Bao phủ điều kiện (Condition coverage) - C2
- Bao phủ đường dẫn (Path coverage)
![](https://images.viblo.asia/64ee9a8d-523b-4063-836e-09358dcd1984.png)
Như hình vẽ mô tả, 100% Decision coverage sẽ bao phủ 100% Statement coverage, hay 100% Path coverage sẽ cover 100% Decision coverage.

Bạn có thể tìm rất nhiều nguồn tài liệu viết chi tiết về Code coverage, nên chúng ta sẽ không bàn sâu thêm nữa.

# 3.Tại sao chúng ta cần viết Unit Test?
- Nâng cao chất lượng code (dễ sử dụng, dễ hiểu, có thể tái sử dụng nhiều hơn)
- Dễ dàng phát hiện bug từ sớm
- Dễ dàng thích ứng với thay đổi
- Dễ dàng debug khi có lỗi
- Dễ dàng tích hợp. Giúp CI/CD thực sự trở nên hiệu quả
=> Giảm Effort, Cost, Risk

# 4. Thời gian unit test bao nhiêu là đủ?
Vậy tại sao PQA lại cần biết unit test là gì?
Việc đó sẽ hỗ trợ chúng ta trong việc review các kế hoạch dự án đề ra, xem liệu estimate đã đủ/đúng chưa? Hiểu về unit test cũng sẽ giúp chúng ta tư vấn được 1 vòng đời dự án hoàn chỉnh, hướng tới nâng cao chất lượng sản phẩm, bằng việc cân đối effort, cost.

Thông thường, các dự án thường viết unit test ở mức C1.
Thời gian estimate trung bình cho unit test là 0.6-0,7h unit test/1h code.

Bạn thấy đó, thời gian bỏ ra để có thể viết unit test và mang lại hiệu quả (tức là phải từ mức C1 trở lên), thì thời gian ngốn 60-70% thời gian một developer bỏ ra để code rồi đó.

Ở đây, chúng ta có thể tham khảo một vài con số để estimate dev effort:
- 20 – số ngày trong 1 tháng (đã trừ thứ 7 chủ nhật và lễ)
- 5 – số tiếng trong 1 ngày (= 8 tiếng * 62%)
- 10% – task management (Task quản lý của PM – TL)
- 10% – buffer risk (Sai số nếu xảy ra risk)
Nếu 1 anh dev code (+UT) được 20 line Java trong 1 tiếng liên tục thì 1 tháng sẽ code được : 20 * 5 * 20 = 2000 => KLOC = 2000. 1 ngày có 8 tiếng, trong đó sẽ bao gồm nhiều task khác như mail, họp, nghỉ ngơi … khi estimate chỉ nên tính 5, cao lắm thì 6, còn nếu tính 8 chắc chắn phải OT mới keep được deadline.

# 5. Hiểu nhầm về Unit Test :worried:
## Hiểu nhầm 1: Code Coverage 100% là việc viết test đã hoàn hảo?
***Facts:***
Code Coverage chỉ cho biết đoạn code nào đã được chạy qua, khi chạy test
Logic của code đã thật sự đúng hay không, Test đã thực sự cover được hết các trường hợp hay chưa, sẽ phụ thuộc vào chất lượng của test, hay năng lực của người viết Test
=> Code Coverage không phải là con số có thể phản ánh đúng chất lượng của Test, nhưng là thước đo tốt nhất chúng ta có thể có để đánh giá tiến độ của việc viết Test.

## Hiểu nhầm 2: Unit test khiến kéo dài thời gian phát triển?
![](https://images.viblo.asia/05be95c1-7071-437f-9d69-e056557d5758.png)
Bạn có thể thấy mối liên hệ giữa chi phí dành để fix bug dựa trên thời điểm bug được detect (phát hiện).
Phát hiện càng muộn, chi phí để fix càng lớn.
Bạn chắc đã tự có câu trả lời cho việc "tiến hành Unit test có khiến kéo dài thời gian phát triển không".

Hẹn gặp lại các bạn ở một bài chia sẻ khác nhé :kissing_heart::kissing_heart::kissing_heart: