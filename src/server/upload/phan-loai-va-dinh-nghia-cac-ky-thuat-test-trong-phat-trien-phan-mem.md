![](https://images.viblo.asia/df8ce4dd-c62f-4c5c-88de-6843367f6126.png)

Ở bài viết này các kỹ thuật test sẽ được phân loại dựa theo static testing/ dynamic testing & black box testing/ white box testing ở hai giai đoạn chính là phát triển và test. 

White box Testing chú trọng vào cấu tạo logic bên trong của phần mềm để xác nhận xử lý và chạy mệnh lệnh phân vùng hay xử lý dữ liệu đã được thực hiện đúng hay chưa.

Black box Testing không chú trọng vào cấu tạo logic bên trong của phần mềm, chỉ chú trọng vào dữ liệu đầu vào (Input) và kết quả thực tế (Actual Results) để xác nhận phần mềm có chạy đúng hay không. Từ việc không thể xem được nội dung xử lý phần mềm ở giữa 2 quá trình Input & Output, nên mới có tên gọi là Test hộp đen. 

Dynamic Testing: tên gọi chung của các phương pháp được thực hiện mà không cho chạy phần mềm, tiến hành test với trạng thái là source code trước khi build và tài liệu yêu cầu phát triển. Thông thường dynamic testing được thực hiện trong giai đoạn phát triển.

Static Testing:  tên gọi chung của test cho phép chạy thực tế phần mềm đã tạo để xác nhận. Thông thường test động được thực hiện trong giai đoạn test.

Giai đoạn phát triển: trong giai đoạn này chủ yếu là tiến hành review. Review là xác nhận nội dung như là tài liệu yêu cầu phát triển hay source code, sau đó chỉ ra các vấn đề rồi đưa feedback đến cho người tạo phần mềm. Có thể nói đây là test trong công đoạn phát triển. Những phần như là Inspection nêu ra ở trên cũng là một loại review.

Giai đoạn test sẽ có nhiều loại test được thực hiện, thông thường việc test trong giai đoạn test được gọi là test phần mềm.

# Vậy, những kỹ thuật test nào sẽ được thực hiện ở giai đoạn phát triển? 
Inspection: là review với tính công thức cao, phân chia vai trò chính xác, phải ghi chép lại tất cả các lỗi được tìm thấy, đảm bảo các lỗi sau đó được sửa
Technical Review: review do người phụ trách (reviewer) review có kiến thức chuyên môn, thực hiện xác nhận vấn đề mang tính kỹ thuật. Được tiến hành theo process review được quyết định từ trước
Review phi công thức: review được thực hiện không có công thức, không có phương pháp quy định cụ thể
Walk through:  review được tiến hành theo cách người tạo sẽ giải thích đối tượng review, sau đó sẽ yêu cầu comment tới người phụ trách review, đặt câu hỏi, ghi chú những lỗi có thể có, sự vi phạm các chuẩn phát triển
Desk debug: công việc xác nhận bằng mắt source code của phần mềm và sửa những chỗ sai đã phát hiện ra. Nhiều trường hợp bản thân người tạo ra source code phát hiện và sửa lỗi.

# Test thực hiện ở giai đoạn unit test
Test xác nhận chức năng: test xác nhận từng module hoạt động đúng với bản thiết kế chi tiết hay bản specs chức năng
Flow test điều khiển: test dựa trên cấu trúc logic của chương trình, xác nhận xem mệnh lệnh hay rẽ nhánh được thực hiện đúng chưa
Flow test dữ liệu: test xác nhận dữ liệu hay biến số có thực hiện theo trình tự Định nghĩa > Sử dụng > Biến mất hay không (sử dụng tool phân tích tĩnh) 

# Test thực hiện ở giai đoạn test tích hợp, test chức năng
Test di chuyển trạng thái: test xác nhận hoạt động dựa trên sơ đồ di chuyển trạng thái, biểu di chuyển trạng thái
Test xác nhận chức năng: test xác nhận chức năng thực hiện trên nhiều module hay có liên kết với cùng module, có chạy theo bản thiết kế chi tiết 

# Test thực hiện ở giai đoạn system test
1.    Test xác nhận:  xác nhận lại các mục đã được test một lần rồi, cũng có trường hợp chia nhỏ hơn để test như dưới đây:
Test hồi quy: là test xác nhận sau khi sửa/ thay đổi phần mềm, các phần thay đổi hay phần có liên quan có chạy đúng hay không
Test check degrade: là test xác nhận cả phần bug mới chưa trộn lẫn vào, cả phần không liên quan trực tiếp đến phần thay đổi, sau khi thực hiện thay đổi/ sửa phần mềm
Smoke test: là test xác nhận trước khi thực hiện test phần mềm, đối tượng test có chất lượng với giá trị trong việc test hay không. Thực hiện đơn giản test giai đoạn trước,và từ đó test mang tính đối tượng của test thực hiện, và thực hiện xác nhận.
Test check release: là test xác nhận hoạt động đối với sản phẩm giao hàng 

2.    Test đánh giá: là test phán đoán mức độ với chất lượng khó phân định được, hay không được một cách đơn thuần, cũng có trường hợp test phân chia chi tiết như dưới đây:
Security test: test xác nhận việc không tồn tại yếu kém, hay xử lý đối với sự tấn công từ bên ngoài với ý đồ xấu
Usability test: Kiểm thử để xác định mức độ sản phẩm phần mềm được hiểu, dễ học, dễ hoạt động và hấp dẫn người dùng dưới điều kiện đặt tả 
Test tính chấp nhận lỗi: test xác nhận duy trì chức năng đã được chỉ định trong trường hợp phát sinh lỗi

3.    Test loading:  là test thực hiện loading đối với hệ thống phần mềm đang tạo
Test tính năng: test xác nhận năng lực xử lý (throughput or response time) có thỏa mãn specs hay không
Test logic: test xác nhận xem có phát sinh vấn đề ở năng lực xử lý hay tỉ lệ vận hành (tần suất phát sinh lỗi, thời gian phục hồi…)
Test dung lượng lớn (test column): test xác nhận có thể xử lý dữ liệu (dữ liệu lớn) hoặc dữ liệu có dung lượng lớn 
Test vùng ghi nhớ (storage test): Test xác nhận thao tác dưới trạng thái resource không đủ (trạng thái bộ nhớ còn lại ít)
Test tần suất cao: Test xác nhận không có vấn đề trong trường hợp thực hiện xử lý lại với khối lượng lớn
Test loading (stress test): test xác nhận thao tác dưới trạng thái mức độ stress cao tuyệt đối (trong một thời gian ngắn cho phép xử lý dữ liệu có dung lượng lớn)

4.     Test môi trường: test chú ý vào platform hoặc thiết bị ngoại vi liên quan đến phần mềm. Có trường hợp phân chia chi tiết hơn để test như sau:
Test cấu trúc: Test xác nhận đảm bảo không ảnh hưởng tới hoạt động của phần mềm với môi trường hoạt động nhiều hoạt động cấu trúc phần mềm với phần cứng
Test tính hoán đổi: test xác nhận xem có thể liên kết chính xác với phần mềm hay phần cứng bên ngoài để trao đổi dữ liệu được không
Test tính tương thích: test xác nhận không ảnh hưởng kiểu phát sinh lỗi với môi trường bên ngoài được sử dụng đồng thời

5.    Test xác nhận chức năng: Test xác nhận hoạt động của các chức năng tạo nên phần mềm đúng bản thiết kế chi tiết nhằm thỏa mãn yêu cầu khách hàng 

6.    Các loại test khác: ngoài những loại test trên còn có
Ad hoc test (random test) : test thực hiện mà không thực hiện thiết kế test 
Test dạng tìm kiếm:  test dựa trên kinh nghiệm của người phụ trách test
Test dựa vào rủi ro: test xác nhận tính ưu tiên từ phần có rủi ro cao sau khi phán đoán rủi ro của đối tượng test

# Test dựa vào user
Test tiếp nhận: xác nhận mang tính công thức xem phần mềm đối tượng đã thỏa mãn yêu cầu của user hay chưa, sau đó thực hiện phán đoán và phê chuẩn tiếp nhận
Test vận hành: với môi trường thao tác thực tế, thực hiện xác nhận xem phần mềm có hoạt động đúng hay không
Test alpha: những người không phải kỹ sư phát triển thực hiện chạy sản phẩm ở giai đoạn thử và xác nhận không có bug
Test beta: user thông thường không phải kỹ sư phát triển thực hiện thao tác với sản phẩm trước khi release, xác nhận tính sử dụng và không có lỗi

Bài viết được tham khảo từ nhiều nguồn: 
https://www.slideshare.net/qnv96/tm-hiu-cc-k-thut-kim-th-phn-mm-67545445
https://viblo.asia/p/kiem-thu-phan-mem-cac-cap-do-phan-i-l5XRBVoVRqPe