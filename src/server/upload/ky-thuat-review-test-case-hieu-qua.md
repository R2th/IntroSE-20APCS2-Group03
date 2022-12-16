Mình đã từng mơ hồ không biết tự viết test case thì có đủ case, quan điểm test có chính xác so với tài liệu đặc tả, hợp lý với yêu cầu của người dùng chưa? Tuy nhiên, khi trải qua một vài dự án thật, các dự án mà "review test case" trở thành một task chính trong quy trình kiểm thử phần mềm, bản thân mình đã nhận ra việc review test case quan trọng, cần thiết và hữu ích như thế nào.

Review test case để đảm bảo rằng mỗi chức năng được đề cập trong tài liệu đặc tả phần mềm và câu chuyện người dùng đều được đề cập. Không chỉ kiểm tra chính tả, ngữ pháp mà test case cũng luôn cần phải được chuẩn hóa, theo sát những tiêu chuẩn, đúng template khi thực hiện. Do đó, review làm tăng chất lượng test case và nâng cao chất lượng sản phẩm phần mềm.

### 1. Quy trình review test case
Quy trình review test case thường được thực hiện bởi:
* Tự review.
* Review chéo bởi QA/tester khác.
* Review bởi supervisor.

Cùng thảo luận về cách review test case và những người tham gia vào quá trình review nhé.

### 1.1. Tự review
Quá trình này được thực hiện bởi chính QA/tester - người viết ra test case sẽ tự mình review bằng cách rà soát lại test case, tài liệu spec, tài liệu quy chuẩn của dự án...xem đã đầy đủ, chính xác, tối ưu chưa? Có thể thực hiện chỉnh sửa, thay đổi và bàn giao để tiến hành các bước review tiếp theo.

• Ưu điểm: Không mất quá nhiều thời gian vì người viết hiểu bộ test case của mình nên dễ dàng rà soát hơn, giảm thiểu được nhiều lỗi cơ bản để không mất thêm thời gian của người review sau đó.

• Nhược điểm: Không đạt hiệu quả cao do cách nhìn nhận vấn đề chỉ từ 1 người.

### 1.2. Review chéo bởi QA/tester khác.
Đây là cách các QA/tester cùng team dự án review chéo test case với nhau. Tuy họ không viết test case nhưng có kiến thức và độ hiểu biết về những phần tương tự của hệ thống đang kiểm thử. Bước này còn gọi là Maker/Checker review.

• Ưu điểm:
- Giúp việc review test case đạt hiệu quả cao hơn vì quan điểm, cách nhìn nhận đến từ nhiều phía,  nên tăng tính chính xác, độ bao phủ của test case.
- Mọi người cùng tìm hiểu và biết được nhiều phần, chức năng của hệ thống, có thể thực hiện kiểm thử phần đó sau khi review test case, hoặc support/back up nhau khi cần thiết. Tạo điều kiện hiểu sâu về hệ thống, tránh trường hợp QA/tester chỉ có hiểu biết về chức năng chính được assign.

• Nhược điểm: Mất nhiều thời gian tìm hiểu chức năng để có thể review chéo với nhau.

### 1.3. Review bởi supervisor.
Ở bước này người review (supervisor) có thể là test leader, người quản lý trực tiếp của QA/tester viết test case, cũng có thể là bên đối tác, khách hàng tùy thuộc vào quy trình của các dự án.

• Ưu điểm: Supervisor thường là người có kinh nghiệm hơn và có nhiều cách nhìn hơn nên khi review test case sẽ đem lại hiệu quả cao. Ngoài ra QA/tester viết test case có thể học hỏi được thêm nhiều kinh nghiệm sau khi được supervisor review giúp.

• Nhược điểm: Đôi khi người được review sẽ sửa đổi luôn dù chưa cảm thấy thuyết phục, hoặc vì quá tin tưởng supervisor mà không ý kiến.

### 2. Checklist vài lỗi hay gặp khi review test case
![](https://images.viblo.asia/c2599d1c-ec42-4365-8a76-00acbd80b6d2.png)

* Lỗi chính tả: Có thể gây khó chịu cho người đọc, đôi khi lỗi chính tả làm ý nghĩa của câu bị khác đi, gây nhầm lẫn nghiêm trọng khi kiểm thử hoặc rất khó để hiểu.
* Lỗi ngữ pháp: Khi ngữ pháp không đúng thì test case có thể được hiểu sai, dẫn đến kết quả test bị sai.
* Template format: Việc không tuân theo format làm mất rất nhiều thời gian để chuẩn hóa, và không ngoài việc gây khó chịu cho người khác. Nên ngay từ đầu viết test case, chúng ta nên theo template chuẩn để dễ dàng thêm mới test case, chỉnh sửa. Thể hiện sự thống nhất giữa file test case.
* Tiêu chuẩn/hướng dẫn: Kiểm tra xem test case đã tuân theo đúng các tiêu chuẩn, hướng dẫn được đề ra không.
* Ngôn ngữ: Nhất quán ngôn ngữ được sử dụng, cách dùng từ đơn giản, ngắn gọn, dễ hiểu.
* Phạm vi chức năng: Test case phải đầy đủ, bao phủ hết theo tài liệu đặc tả, quan điểm người dùng. Tránh bỏ sót những case quan trọng. Đặc biệt chú ý phần test case cho những chức năng có liên quan đến nhau. 
* Trùng lặp: Review để loại bỏ các test case trùng lặp nhau. Các item giống nhau có thể gộp lại thành 1 test case sẽ tiết kiệm thời gian viết, review test case, thực hiện test, report bug và file test case cũng ngắn gọn hơn.
* Dư thừa: Những test case không cần thiết, không hiệu quả trong việc phát hiện lỗi hoặc bị dư thừa do thay đổi yêu cầu spec cũng cần được lược bỏ đi. Đảm bảo rằng các test case được viết dựa trên môi trường và thiết bị cụ thể trong phạm vi dự án yêu cầu.
* Tính thống nhất: Kiểm tra xem cách viết test case có thống nhất từ trên xuống, giữa các file test case khác nhau, giữa các QA/tester cho phù hợp (nếu cần thiết).
* Test case ID: Đảm bảo mỗi test case phải có ID để dễ dàng theo dõi, quản lý.
* Kiểm tra xem test case đã đầy đủ, chính xác: mô tả mục đích chung, điều kiện tiên quyết, các bước tiến hành, kết quả mong đợi, dữ liệu kiểm thử. 
* Đảm bảo test case có số bước thực hiện phù hợp, không nên quá nhiều bước. Cũng như test case không nên quá dài, chỉ nên tập trung vào những mục đích chính, tránh dài dòng, dàn trải.

Sau khi quá trình review, người review sẽ note lại tất cả những điểm cần trao đổi, chỉnh sửa để đưa ra thảo luận cùng với người viết test case và thống nhất với nhau. Các test case có thể thay đổi dựa trên yêu cầu của mỗi dự án, khách hàng, test leader, quá trình review cũng sẽ có những thay đổi cho phù hợp.

### 3. Những điểm cần lưu ý/Mẹo khi review test case
* Trong khi review, luôn đối chiếu với tài liệu đặc tả yêu cầu.
* Nếu không chắc chắn về bất kỳ test case hoặc kết quả mong đợi nào, nên thảo luận với người viết test case, leader, khách hàng trước khi đưa ra quyết định.
* Nếu có thể thì nên thử thực hiện các test case trên môi trường test để hiểu rõ hơn về kết quả và các bước thực hiện.
* Khi gặp vấn đề gì nên trao đổi trực tiếp với người viết test case, để làm rõ các vấn đề, cho người đó thấy những góp ý, phản hồi, đánh giá khi review là đúng, hoàn toàn thuyết phục.
* Chú ý version của bản test case khi review phải là bản mới nhất, tránh mất thời gian, nhẫm lẫn không đáng có.

Đôi khi QA/tester viết test case theo lối mòn, dựa theo kinh nghiệm, tính chủ quan cá nhân dẫn đến những khuyết điểm. Việc review test case sẽ phần nào hạn chế được những khuyết điểm đó, và giúp ngăn ngừa những lỗi của phần mềm. Qua đây, nhận thấy task review test case có ý nghĩa rất quan trọng, không chỉ với quy trình kiểm thử mà cả với quy trình phát triển phần mềm. Chính việc review cũng giúp chúng ta thêm tỉ mỉ, cẩn thận, tích lũy được nhiều kinh nghiệm cho bản thân.

Bài viết này mình có xen lẫn vài kinh nghiệm từ dự án đã làm và có tham khảo http://www.softwaretestingclass.com/test-case-review-process-tips-and-tricks/