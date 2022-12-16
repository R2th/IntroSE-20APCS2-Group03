Trong thời đại ngày nay, dần dần mô hình quản lý dự án truyền thống Waterfall dần bị thay thế bởi những mô hình Agile, khi mà dự án cần sự linh hoạt cao, đáp ứng được tốt hơn yêu cầu của khách hàng ngày càng khó tính. Ngoài scrum là một mô hình Agile rất phổ biến, bài viết này sẽ đề cập đến Extreme Programming, một mô hình cũng dần phổ biến bởi nhiều đặc tính nổi trội của nó. Vậy Extreme Programming là gì, chúng ta hãy cùng tìm hiểu.

Extreme Programming (Lập trình cực hạn) - hay thường được gọi tắt là “XP” - là một mô hình Agile tập trung vào phát triển phần mềm. Trong khi Scrum tập trung vào cấp độ quản lý dự án trên phương diện thiết đặt ưu tiên công việc và lấy phản hồi, XP lại tập trung vào các thực hành tốt nhất (Best Practices) về phát triển phần mềm. Do đó, sẽ có rất nhiều tham chiếu liên quan đến phần mềm trong phần thảo luận sau. Đối với các giá trị và nguyên tắc của Tuyên ngôn Agile, bạn hãy xem liệu bạn có cách nào để áp dụng các giá trị và thực hành của XP vào những loại dự án tri thức khác được không.

### Những giá trị cốt lõi của XP

Những giá cốt lõi của XP là: đơn giản, kết nối, phản hồi, can đảm và tôn trọng; Những giá trị cơ bản này tự thể hiện trong các thực hành được thực hiện trong suốt vòng đời XP.
* **Đơn giản**: là một giá trị tập trung vào việc giảm độ phức tạp, những tính năng thừa và sự lãng phí. Đội XP đề cao châm ngôn: “Hãy tìm thứ đơn giản nhất có thể hoạt động được” và xây dựng giải pháp đó trước.
* **Kết nối**: giá trị này tập trung vào việc đảm bảo toàn thể đội dự án biết được mình cần làm gì và mọi người đang làm gì. Ví dụ, cuộc họp hàng này là một công cụ kết nối quan trọng (Những cuộc họp này sẽ được giải thích ở chương 5).
* **Phản hồi**: Đội dự án nên có được sự nhận xét, phản hồi sớm. Việc nhận thất bại sớm có thể rất hữu ích, đặc biệt nếu nó mang lại thông tin mới trong khi chúng ta còn thời gian để cải thiện sản phẩm.
* **Can đảm**: Sẽ cần có sự can đảm để cho những người khác soi xét công việc của mình. Trong lập trình theo cặp (Pair Programming - được mô tả ở phần sau), các thành viên trong đội dự án chia sẻ code và cần thường xuyên đơn giản hóa cũng như điều chỉnh những code này. Tuy được hỗ trợ bằng việc áp dụng build tự động và unit test, lập trình viên vẫn cần có sự tự tin nhất định để đưa ra những thay đổi quan trọng.
* **Tôn trọng**: Tôn trọng là giá trị trọng yếu của các dự án XP, nơi mọi người làm việc cùng nhau như một đội và mọi cá nhân có trách nhiệm với thành công cũng như thất bại của dự án. Giá trị này cũng liên quan đến lập trình theo cặp; các cá nhân trong đội cần ghi nhớ rằng mọi người có cách làm việc khác nhau và cần tôn trọng sự khác biệt đó.
Hình dưới đây mô tả quy trình của XP:

![](https://images.viblo.asia/68b99570-95cc-417c-a368-240bdab83693.png)

Như mô tả trong biểu đồ trên, đội dự án (XP team) dựa trên “nhu cầu của người dùng” (được gọi là User stories) để lên kế hoạch cho các phát hành và vòng lặp (Iterations). Vòng lặp thông thường kéo dài 2 tuần, lập trình viên làm việc theo cặp để viết code trong suốt những vòng lặp này. Tất cả các phần mềm phát triển đề được kiểm tra nghiêm ngặt và thường xuyên. Sau đó, khi được khách hàng phê duyệt, phần mềm được phân phối dưới dạng các bản phát hành nhỏ.

“Mũi nhọn” (Spike)  là khoảng công việc dùng để giảm thiểu các vấn đề cũng như các mối đe dọa, và “mũi nhọn kiến trúc” (architectural spikes) là các vòng lặp dùng để chứng minh cách tiếp cận công nghệ. Các mũi nhọn này được kết hợp với quá trình lên kế hoạch phát hành.

### Các vai trò trong đội dự án XP

XP có các vai trò khác biệt so với Scrum - các vai trò trong XP là Huấn luyện viên (Coach), Khách hàng (Customer), Lập trình viên (Programmer), và Kiểm định viên (Tester). Hãy xem cách mỗi vai trò tham gia vào một dự án XP.


#### Huấn luyện viên (Coach)

Huấn luyện viên hoạt động như một nhà tư vấn cho đội dự án, hướng dẫn quy trình và giúp đỡ các thành viên đi đúng hướng. Huấn luyện viên cũng là người điều phối - giúp đỡ đội dự án trở nên hiệu quả hơn - kết nối và thúc đẩy việc giao tiếp trong nội bộ mỗi đội dự án cũng như giữa các đội dự án. Vai trò này có nhiều trách nhiệm tương đồng với Scrum Master. Mặc dù định nghĩa chính thức của hai thuật ngữ này khác nhau, nhưng chúng thường được sử dụng thay thế cho nhau.

Thêm vào đó, huấn luyện viên có thể cũng là một nhà quản lý, điều hành việc kết nối với bên ngoài và điều phối các hoạt động trong đội dự án. Tuy vậy, đây không phải là một vai trò chính thức trong XP

#### Khách hàng (Customer)

Trong một đội dự án XP, khách hàng là đại diện nghiệp vụ, là người cung cấp các yêu cầu, danh sách ưu tiên và định hướng nghiệp vụ cho dự án. Người này xác định sản phẩm sẽ được xây dựng, xác định độ ưu tiên của các tính năng, và xác nhận xem liệu sản phẩm có hoạt động đúng hay không. Vai trò này tương tự với “Product Owner” (Chủ sở hữu sản phẩm) trong Scrum.

#### Lập trình viên (Programmers)

Lập trình viên là những nhà phát triển, những người xây dựng sản phẩm bằng cách viết và tích hợp code để đáp ứng những yêu cầu từ người dùng.

#### Kiểm định viên (Testers)

Kiểm định viên cung cấp sự đảm bảo về chất lượng và giúp đỡ khách hàng xác định cũng như viết “Kiểm thử chấp thuận” (Acceptance Tests) cho các nhu cầu của khách hàng (User stories). Vai trò này cũng có thể được đảm nhiệm bởi nhà phát triển (lập trình viên), nếu họ có những kĩ năng cần thiết.

Trên đây là những cái nhìn sơ lược về mô hình Extreme Programming hay còn gọi là Lập trình cực hạn. Ở bài viết tiếp theo, chúng ta sẽ tiếp tục tìm hiểu sâu hơn cách nó vận hành và những practices của nó. Hẹn gặp lại các bạn trong bài viết tiếp theo trong series này.