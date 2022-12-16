Ngày nay, kiểm thử phần mềm đang ngày càng phát triển và là một trong những ngành nghề hot được nhiều các bạn sinh viên đặc biệt là các bạn sinh viên nữ lựa chọn. Kiểm thử phần mềm là một phần rất quan trọng trong quá trình phát triển phần mềm, nó góp phần đảm bảo độ tin cậy và chất lượng của một phần mềm.

![](https://images.viblo.asia/ca08c1eb-4535-4968-b8ff-0a3c5f54f3ba.jpg)

## I.Kiểm thử phần mềm là gì?

Kiểm thử phần mềm là hoạt động nhằm tìm kiếm, phát hiện các lỗi của phần mềm được được kiểm thử về thiết kế, mã nguồn, chức năng, dữ liệu, bảo mật, thân thiện với người dùng, tài liệu kèm theo, môt trường hoạt động, tốc độ hoạt động, khả năng tải của hệ thống, … Kiểm thử phần mềm thường được chia thành các nhóm là Nhóm thuộc về chức năng (Functionality), Nhóm không thuộc chức năng (Non-Functionality), Nhóm thuộc về cấu trúc (Structural) và Nhóm liên quan đến các thay đổi (Change Related).

## II. Khi nào cần kiểm thử phần mềm?

Tùy thuộc vào từng phương pháp, việc kiểm thử có thể được thực hiện bất cứ lúc nào trong quá trình phát triển phần mềm. Theo truyền thống thì các nỗ lực kiểm thử được tiến hành sau khi các yêu cầu được xác định và việc lập trình được hoàn tất nhưng trong Agile (là một tập hợp các phương pháp phát triển phần mềm linh hoạt dựa trên việc lặp đi lặp lại và gia tăng giá trị) thì việc kiểm thử được tiến hành liên tục trong suốt quá trình xây dựng phần mềm. Như vậy, mỗi một phương pháp kiểm thử bị chi phối theo một quy trình phát triển phần mềm nhất định.

![](https://images.viblo.asia/18ff9ee2-aad5-4698-b89f-479adc76c6aa.jpg)

## III. Những lưu ý khi tham gia vào kiểm thử phần mềm 

Để đảm bảo chất lượng của việc kiểm thử thì ngoài việc yêu cầu người Tester cần phải luôn luôn năng động, không ngừng học hỏi và tìm hiểu những kiến thức, công nghệ mới thì cũng có một số lưu ý quan trọng người Tester nên biết khi tham gia test.

**Dưới đây là 20 vấn để một Tester cần chú ý khi tham gia vào quá trình test:
**

*  Học cách phân tích thông qua kết quả test của bạn. Đừng bỏ qua các kết quả test của bạn. Kết quả test cuối cùng có thể "pass" hoặc "fail" nhưng việc giải quyết sự cố về nguyên nhân chính của kết quả "fail" sẽ chỉ ra cho bạn cách giải quyết vấn đề. Tester sẽ được tôn trọng hơn nếu họ không những chỉ chỉ ra được lỗi mà còn đưa ra được các giải pháp cho vấn đề đó .

* Hiểu hết toàn bộ mức độ test khi test bất kỳ ứng dụng nào. Mặc dù việc đảm bảo test coverage bằng 100% có thể là bất khả thi, bạn vẫn có thể luôn cố gắng để đạt được kết quả gần với con số đó.

* Để đảm bảo test coverage tối đa, hãy chia nhỏ ứng dụng mà bạn test thành các module (dựa trên chức năng), sau đó viết test case trên từng module riêng rẽ. Nếu có thể, hãy chia nhỏ các module thành các module con.
Chẳng hạn: Giả sử bạn đã chia ứng dụng web của bạn thành các module, trong đó có một module là "accept user information" (tiếp nhận thông tin người dùng). Bạn có thể chia màn hình này thành các phần nhỏ hơn nữa để viết test case: Kiểm thử giao diện người dùng (GUI), kiểm thử bảo mật, kiểm thử chức năng....Với từng phần đó, bạn lần lượt áp dụng các test case phù hợp cho từng trường, từng đối tượng trong form sẽ giúp bạn "quét" hầu hết các trường hợp cần thiết, đảm bảo chất lượng được test case. Khi đó, tỉ lệ test coverage không những được đảm bảo tối đa, mà còn phản ánh đúng được chất lượng testing của bạn.

* Trong khi viết test case, đầu tiên là viết các test case của các chức năng được dự tính trước ứng với các điều kiện hợp lệ của các yêu cầu. Sau đó mới viết các test case cho các kiều kiện không hợp lệ. Điều này sẽ giúp bạn corver hết các hành vi được mong đợi cũng như không mong đợi của ứng dụng trong khi test.

* Suy nghĩ chắc chắn. Bắt đầu test ứng dụng với dự định tìm ra các bug/error. Đừng nghĩ trước rằng sẽ không có bất kỳ bugs nào trong ứng dụng. Nếu bạn kiểm tra ứng dụng với ý định tìm ra lỗi thì chắc chắn rằng bạn cũng sẽ tìm ra được những lỗi khó phát hiện khác.

* Viết các test case trong giai đoạn phân tích và thiết kế yêu cầu. Theo cách này bạn có thể đảm bảo tất cả các yêu cầu đều có thể được test.

* Tạo sẵn test case và chuyển đến deverloper trước khi coding. Đừng giữ test case cùng với việc đợi đến khi có ứng dụng cuối cùng rồi mới đưa ra test, vì nghĩ rằng bạn có thể đưa ra nhiều lỗi hơn. Hãy để deverloper phân tích kỹ lưỡng các test case để xây dựng lên một ứng dụng chất lượng. Điều này cũng sẽ tiết kiệm được nhiều thời gian làm việc.

* Nếu có thể xác định và nhóm các test case của bạn cho việc test hồi quy. Điều này sẽ đảm bảo việc test hồi quy bằng thủ công nhanh và hiệu quả.

* Ứng dụng yêu cầu thời gian phản hồi cần được kiểm tra một cách kỹ lương về performance. Test performance là một phần rất quan trọng trong các ứng dụng. Trong test thủ cộng thì điều này hầu như là bị bỏ qua, bởi các tester thiếu khối lượng dữ liệu lớn trong khi thực hiện test performance. Nên tìm hết các hướng để test hiệu suất cho ứng dụng của bạn. Nếu không thể tạo dữ liệu test thủ công thì nên viết một vài scrips cơ bản để tạo dữ liệu test cho test hiệu suất hoặc hỏi deverloper để viết giúp.

* Những người lập trình không nên test trên chính mã viết của ứng dụng. Tiêu chuẩn Test unit của ứng dụng nên đầy đủ từ người phát triển trước khi chuyển ứng dụng cho các Tester. Nhưng các tester không nên tạo áp lực cho các lập trình viên về việc chuyển sản phẩm cho test. Để họ có thời gian. Tất cả mọi người, từ Leader đến Manager biết khi nào thì module được chuyển cho test và họ tất nhiên có thể ước lượng được thời gian test. Đây là một tình huống điển hình trong các dự án theo mô hinh Agile.

* Vượt ra ngoài phạm vi kiểm thử. Kiểm tra ứng dụng cái gì nó cần làm và không được làm.

* Trong khi test hồi quy sử dụng biểu đồ lỗi trước đó (số lỗi được tìm thấy dựa vào các modul khác). Phần lỗi trong module đã được kiểm tra rồi có thể có lợi để dự đoán trước hầu hết các phần lỗi có thể xảy ra của ứng dụng.

* Ghi lại các điều kiện mới, các khái niệm bạn biết được trong khi test. Luôn mở một file text trong khi test các ứng dụng. Ghi ra các tiến trình test, quan sát kỹ càng nó. Sử dụng các quan sát này khi chuẩn bị cho báo cáo hoàn tất test. Thói quen tốt này sẽ giúp cung cấp chi tiết các báo cáo hoàn tất test hoàn toàn rõ ràng.

* Nhiều khi các tester hoặc deverloper thực hiện thay đổi mã code cơ bản trong các ứng dụng đang test. Đây là bước yêu cầu trong môi trường phát triển hoặc trong môi trường test để tránh trường hợp xử lý riêng lẻ như các dự án của ngân hàng. Ghi lại tất cả các code thay đổi cho mục đích test và lúc hoàn tất cuối cùng phải chắc rằng bạn đã hoàn tất tất cả các điều thay đổi này từ tài liệu triển khai bên phía khách hàng.

* Giữ các deverloper tránh xa khỏi môi trường test. Đây là bước cần thiết để tìm ra bất kỳ lỗi khó thấy nào bị thay đổi từ tài liệu hoặc từ môi trường triển khai. Thỉnh thoảng các deverloper thay đổi một vài hệ thống hoặc cấu hình ứng dụng nhưng quên đề cập điều này trong các bước thực hiện. Nếu deverloper không được tiếp cận với môi trường test, họ sẽ không thể ngẫu nhiên mà thay đổi tình hình trong môi trường test và những lỗi khó tìm thấy có thể được bắt ngay.

* Một cách tốt để đánh giá người tester giỏi từ các cụm yêu cầu và thiết kế phần mềm. Điều này có được là từ việc các tester có thể lấy kiến thức đáng tin cậy về kết quả của ứng dụng trong việc bao quá hết được chi tiết test. Nếu bạn đang không được yêu cầu về phần chu kỳ phát triển này thì hãy yêu cầu người hướng dẫn bạn hoặc người quản lý đáp ứng cho nhóm test của bạn bằng các cuộc họp hoặc tiến trình giải quyết.

* Nhóm test nên chia sẻ các kinh nghiệm test với các nhóm khác trong một tổ chức.

* Tăng cường trao đổi với deverloper để hiểu nhiều hơn về thông tin sản phẩm. Bất cứ lúc nào có thể trao đổi trực tiếp để giải quyết các tranh luận một cách nhanh chóng và để tránh có bất kỳ sự hiểu lầm nào. Nhưng mặc dù khi bạn đã hiểu hết các yêu cầu và các cách giải quyết từ bất kỳ các cuộc tranh luận nào cũng nên chắc rằng cuộc giao tiếp như trên được viết ra và chuyển bằng mail. Đừng lưu lại bất kỳ thứ gì bằng lời nói.

* Không thực hiện những công việc có độ ưu tiên cao khi không có đủ thời gian. Ưu tiên công việc test của bạn từ cao đến thấp và phù hợp với kế hoạch công việc của bạn. Phân tích tất cả các rủi ro liên quan đến độ ưu tiên làm việc của bạn.

* Viết toàn bộ, mô tả, báo cáo lỗi rõ ràng. Đừng chỉ cung cấp các dấu hiệu lỗi tìm được mà cũng phải cung cấp các tác động của lỗi và tất cả các giải pháp có thể. Đừng quên việc test là một công việc sáng tạo và thử thách. cuối cùng nó phụ thuộc vào kỹ năng và kinh nghiệm của bạn, vậy bạn vận dụng sự thử thách này như thế nào.

**Trên đây là một số chia sẻ về những lưu ý đối với một Tester khi thực hiện testing, nhất là với những bạn Teser mới.**

Link tham khảo: http://www.softwaretestinghelp.com/practical-software-testing-tips-to-test-any-application/