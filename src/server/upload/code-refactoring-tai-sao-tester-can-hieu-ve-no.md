Định nghĩa `Refactoring` được dùng để mô tả sự sắp xếp dọn dẹp lại code cũng như thiết kế lại code.

Trong bài viết này, chúng ta sẽ tìm hiểu định nghĩa của `Refactoring`, thảo luận về nhu cầu refactoring và ảnh hưởng của nó tới các thành viên trong nhóm. Và tất nhiên, chúng ta sẽ thảo luận để trả lời câu hỏi : **‘Là tester, tại sao bạn cần hiểu về refactoring ?’**


![](https://images.viblo.asia/bc19fe32-6071-416d-831f-f5d69f2b42b3.jpg)

# Giới thiệu về refactoring
Refactoring là một quá trình cải thiện code hoặc cơ sở dữ liệu trong thời gian duy trì các chức năng sẵn có. Về mặt lý tưởng, là cải thiện lại những đoạn code không hiệu quả hay quá phức tạp để chúng trở lên hiệu quả, đơn giản và dễ đọc hơn.

**Code refactoring là cần thiết**

Nếu chúng ta đang maintain chức năng của một ứng dụng nào đó, câu hỏi được đặt ra là : ‘Tại sao cần bận tâm tới refactoring ?’. có khá nhiều lý do mà module hoặc một nhóm code nào đó cần phải cải thiện. Ví dụ như :

Code smells
Nợ kỹ thuật/Technical debt
Phương pháp phát triển phần mềm Agile

Chúng ta sẽ thảo luận chi tiết những điểm này ở phần dưới đây

**#1) Code smells**

Như với đồ ăn, khi nó bốc mùi là ta biết được nó sắp hỏng và tương lại chẳng hay ho gì, với code cũng tương tự. Code bốc mùi thể hiện rằng có những vấn đề nghiêm trọng tồn tại trong đó và có thể nảy sinh ra bất cứ lúc nào.

Vài dấu hiệu nhận biết cơ bản như :

* Trùng lặp code
* Khai báo biến nhưng không thấy sử dụng
* Thiết kế code quá phức tạp
* Tồn tại nhiều câu lệnh điều kiện hay vòng lặp
* Thay đổi code chỗ này thì ảnh hưởng tới chỗ khác
…
Càng về lâu về dài, code smell các lộ rõ những vấn đề nó mang theo. Cuối cùng thì, code smell sẽ ảnh hưởng tới quá trình phát triển, maintain và hiệu suất của hệ thống.

**#2) Nợ kỹ thuật/ Technical Debt**

Trong quá trình phát triển phần mềm, do giới hạn của thời gian, nguồn lực nên chúng ta thường đi lối tắt để đạt kết quả.

Giả sử ta cần thêm một tính năng vào module có sẵn. Sau khi bàn bạc, nhóm chốt ra 2 phương án để thêm tính năng. Phương án A, dự kiến mất 2 sprint để hoàn thành cho cẩn thận (phương án dài hơi, lâu dài). Phương án B là chỉ mất 5 ngày là hoàn thành bằng cách chắp vá code, phục vụ kết quả mong muốn là chính (phương án ngắn hạn).

Nếu team bị áp lực thời gian, họ sẽ chọn phương án B để hoàn thành, và đưa phương án A vào backlog để thực hiện trong tương lai. Với hành động vậy, team đang tạo ra vấn đề cho chính họ.

Nói một cách nôm na, technical debt trong phát triển phần mềm đề cập tới việc làm thêm việc hoặc vượt mức cần thiết để sửa những sai sót.

**#3) Đi theo phương pháp phát triển phần mềm Agile**

Với Agile, nó có xu hướng bám theo số lượng công việc đạt được. Tuy nhiên, với những đoạn code không rõ ràng, thiết kế tốt hay dễ bảo trì thì việc mở rộng chức năng về sau là rất khó khăn. Nếu code thay đổi mà không refactoring cẩn thận, nó có thể góp phần cho code smell hay technical debt hơn.

Mối liên hệ giữa được mô tả như hình bên dưới

![](https://images.viblo.asia/53cdf0fc-6758-48d9-ad23-3b55a870433d.jpg)

**Tại sao QA cần hiểu về refactoring ?**

Từ nãy tới giờ chúng ta bàn luận về những thứ liên quan tới coding và là những thứ developer cần quan tâm.

Vậy tại sao ta lại nói về những thứ đó trong khuôn khổ kiểm thử phần mềm ?

**#1) Unit testers / Developers**

Trong quá trình refactoring, code mới được thêm vào, class cũ bị thay đổi, class mới được thêm dẫn tới unit test có thể sẽ bị lỗi. Hơn nữa, với những hệ thống cổ, có khi còn không có unit test để mà lỗi. Vậy nên cần tạo unit test mới.

**#2) Testers**

Khi chức năng được refactor xong (giả sử là không thêm tính năng mới nào)

* Là một tester, với việc refactoring code đồng nghĩa việc in-depth testing + regression testing.

* User acceptance tests rất quan trọng và cần pass trước khi release bản build đó.

* Thêm đó, các phương án test khác như load tests, security test … cũng cần thiết.

**#3) Automation Test Engineers**

Refactoring có thể khiến cho các script chạy tự động bị lỗi. Lý do có thể như sau :

* Nếu các phần tử của trang bị thay đổi, và script Selenium của bạn đang test dựa trên các phần từ đó, script sẽ fail và cần được cập nhật.

* Sau một vài thay đổi, có cái thêm cái xoá sẽ dẫn tới script bị fail. Script cũng sẽ có thể fail và cần được cập nhật

Vậy nên khuyến khích việc test tự động nên được cài đặt một khi tính năng đã ổn định, còn không sẽ mất nhiều thời gian sửa khi mở rộng tính năng.

Để trở thành người phát triển test tự động, kỹ sư cần suy nghĩ như developer, tập trung vào việc tạo ra những đoạn code sạch và dễ dàng bảo trì. Hầu hết các IDE như IntelliJ IDEA, Eclipse … đều có sẵn tính năng refactoring để sử dụng.

Dưới đây là 1 ảnh  refactoring menu của IntelliJ IDEA (Community Edition).

![](https://images.viblo.asia/288c6349-9e9c-4d43-8e1d-46a1b5061e5a.png)

**#4) Test leads / QA leads**

* Test leads/ QA leads có thể cần phải làm việc cùng nhau với cả team bao gồm developer, product analyst, và có thể cả các bên liên quan để đảm bảo kế hoạch kiểm thử được thiết kế thật cẩn thận.

* Việc nắm rõ những chức năng có sẵn là rất cần thiết, dựa trên những chức năng có sẵn, nghiệp vụ, user flows và user acceptance tests cần phải lưu lại tài liệu. Khi test lại chức năng được refactor, mọi kịch bản đều phải được kiểm tra cùng với regression testing ở những vùng bị ảnh hưởng.

* Cần chủ động trong quá trình lên kế hoạch kiểm thử, nếu nhận thấy bất cứ vấn đề gì trong tương lai, cần thông báo sớm để ngăn chặn trước khi quá trình kiểm thử diễn ra.

* Đừng ngần ngại việc để thành viên ở nhóm khác hay người dùng đầu cuối tham gia việc kiểm thử.


### Case Studies
**Case Study #1**

**Task**: Refactor một module để thay thế những giá trị hard-coded bằng việc sử dụng biến và thêm comment cho công cụ tự động sinh tài liệu sử dụng.

**Thách thức**: Không quá lớn, module có sẵn tài liệu, yêu cầu, user flows và test cases, unit tests cũng đã có sẵn.

**Tiếp cận**: Test cases sẽ được sửa lại, các nơi bị ảnh hưởng sẽ được kiểm tra. Mọi vấn đề sẽ được giải quyết trước khi release.

**Case Study #2**

**Task**: Refactor phương thức lữu trữ

Phương thức lưu trữ cũ đã được thiết kế vài năm về trước, ban đầu nó được sử dụng trong nội bộ với khả năng phục vụ dưới 10 phiên làm việc đồng thời.

Bây giờ công ty muốn đưa sản phẩm ra ngoài thị trường dưới dạng Software as a Service với mong muốn phục vụ 300 phiên làm việc đồng thời.

Team đã thực hiện kiểm tra và kết luận hệ thống sẽ sập khi số phiên phục vụ tới con số 25. Họ review lại code và đề nghị refactor phần lõi để có thể phục vụ tới 500 phiên làm việc mà không bị lỗi.

Một vài nguyên nhân đã được xác định, như có nhiều truy vấn lồng nhau, join nhiều bảng, hay sử dụng `select *` thay vì chỉ select những cột cần thiết …

Với những nguyên nhân trên, ứng dụng sử dụng nhiều dữ liệu hơn mức cần thiết dẫn tới chậm chạp và xảy ra lỗi khi phục vụ quá nhiều phiên.

**Thử thách**:

**#1) Project manager / product analyst**

**Thu thập yêu cầu**: Do hệ thống đã cũ, nên không có tài liệu được ghi chép, hơn nữa cũng không có change log mỗi lần cập nhật thêm chức năng hay logic thay đổi.

**Lập kế hoạch**: Khi mà yêu cầu chưa được rõ ràng, việc thiết lập kế hoạch khá vất vả.

**#2) Developers**

* Thiếu thông tin về yêu cầu, nghiệp vụ.
* Dọn dẹp code cũ mà không gây ảnh hưởng.
* Không nắm chắc được những nơi bị ảnh hưởng hay sự phụ thuộc của chúng.
* Khó tự dự kiến được thời gian thực hiện.
* Cần viết unit tests mới.

**#3) Testers**

* Thiếu thông tin về yêu cầu, nghiệp vụ trong quá trình lên kế hoạch kiểm thử.
* Thiếu thông tin về những chức năng bị ảnh hưởng.
* Khí dự kiến được thời gian thực hiện.

**#4) Các bên liên quan**

* Thiếu tài liệu thông tin yêu cầu, user flows và thời gian deadline chặt = Rủi ro cao.

**Và dưới đây là cách mà team thực hiện để giảm thiểu rủi ro và thực hiện** :

(i) Team làm việc cộng tác với nhau để thu thập yêu cầu: PM, PA và tester nói chuyện với người dùng cuối để hiểu và lưu lại tài liệu về các chức năng, user flows. Developers thì kiểm tra lại code và thêm thông tin vào tài liệu của đội kia. Mọi thứ phải hoàn thành trước khi sprint bắt đầu.

(ii) Xây dựng môi trường thử nghiệm để kiểm tra sự thay đổi: Xây dựng lên 2 môi trường thử nghiệm là Gamma và Phi. Gamma sẽ sử dụng code cũ trong khi Phi sẽ chứa những đoạn code mới nhất sau mỗi lần refactor.
Khi có 2 môi trường chạy đồng thời, giúp team so sánh được khi test ở 2 môi trường, khiến việc phát hiện bug dễ dàng.

(iii) Người dùng cuối và các bên liên quan tham gia kiểm thử sớm: Việc này giúp bất kỳ lỗi nào được phát hiện ra sẽ được sửa chữa sớm.

(iv) Xác định bản demo cho các bên liên quan trước khi release, với 80% user flows đã kiểm tra, không có lỗi nghiêm trọng nào.

(v) Đặt ngày phát hành dự kiến: Đặt ra ngày release giúp tăng động lực cho team cùng hướng tới một điểm cuối.

### Kết luận

Tổng hợp lại, refactoring code là quá trình dọn dẹp, làm đơn giản hoá module mà không làm thay đổi chức năng vốn có của nó. Việc refactoring có thể đơn giản như thêm comment, thêm định nghĩa, xoá bỏ biến tĩnh … hoặc có thể phức tạp hơn với những hệ thống cũ.

Một module hay một vài mẩu code nào đó cần phải refactor bởi code smell, technical debt, hay bởi chính cách Agile.

Với tester, refactor code đồng nghĩa việc : in depth testing + regression testing

In-depth testing yêu cầu kiểm thử tất cả user flows để đảm bảo rằng mọi chức năng hoạt động như trước khi sửa. Regression testing yêu cầu đảm bảo nâng cấp module không vô tình làm hỏng module khác.

Test leads / QA leaders có thể phải làm việc với cả team gồm developers, PA, đặc biệt ở những dự án cũ. Hãy chủ động khi lập kế hoạch kiểm thử, nếu dự đoán được vấn đề sẽ xảy ra của môi trường test, công cụ test mới … hãy thông báo sớm để ngăn ngừa việc chậm chễ khi quá trình kiểm thử bắt đầu.

Nguồn dịch: https://www.softwaretestinghelp.com/code-refactoring/