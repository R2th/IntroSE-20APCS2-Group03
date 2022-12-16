# A. Vòng đời của bug/defect là gì?
DEFECT LIFE CYCLE hoặc Bug Life Cycle là tập hợp các trạng thái cụ thể mà Bug trải qua trong toàn bộ vòng đời của nó. Mục đích tạo ra quy trình cho một vòng đời bug/defect là để những người chịu trách nhiệm cho bug/defect đó dễ dàng quản lý và thay đổi trạng thái cho đến khi bug/defect được loại bỏ hoàn toàn khỏi hệ thống

**Các trạng thái của bug xuyên suốt 1 vòng đời**

Các trạng thái của một bug/defect thường sẽ thay đổi tùy từng dự án. Dưới đây là sơ đồ vòng đời của một bug/defect, bao gồm tất cả các trạng thái có thể:

1. New: Khi một lỗi mới được ghi lại và đăng lần đầu tiên. Nó được gán một trạng thái là “New”
2. Assigned: Một khi bug đã được đăng bởi tester thì test leader sẽ phê duyệt lỗi và chuyển giao lỗi cho nhóm phát triển
3. Open: Dev bắt đầu phân tích và thực hiện sửa lỗi
4. Fixed: Khi Dev hiện đã sửa xong lỗi bằng cách sửa code và đã xác nhận là sửa xong, bug có thể được chuyển sang trạng thái "Fixed/Đã sửa".
5. Pending retest: Sau khi sửa lỗi, dev bàn giao lại bug cho bên tester. Vì quá trình kiểm thử vẫn đang được diễn ra bởi các tester nên trạng thái được chỉ định là ""pending retest/kiểm tra lại đang chờ xử lý".
6. Retest: Tester thực hiện test lại chương trình ở giai đoạn này để kiểm tra xem lỗi đã được fixed hay chưa và thay đổi trạng thái thành "Re-test/Kiểm tra lại".
![](https://images.viblo.asia/24d3a21a-0f35-4a5e-976f-1d0b35c3ce77.png)
7. Verified: Tester kiểm tra lại lỗi sau khi dev đã fixed. Nếu không có lỗi được phát hiện trong phần mềm, thì lỗi đã được sửa và trạng thái được gán là "Verified/đã được xác minh".
8. Reopen: Nếu lỗi vẫn tồn tại ngay cả sau khi dev đã sửa lỗi, tester sẽ thay đổi trạng thái thành "Reopen/mở lại". Bug 1 lần nữa quay lại chu kỳ mới.
9. Closed: Nếu lỗi không còn tồn tại thì tester sẽ gán trạng thái "Closed/Đã đóng".
10. Duplicate: Nếu lỗi được lặp lại hai lần hoặc lỗi tương ứng với cùng một khái niệm về lỗi, trạng thái được thay đổi thành "Duplicate/trùng lặp".
11. Rejected: Nếu dev cảm thấy lỗi không phải là khiếm khuyết thực sự thì nó sẽ thay đổi lỗi thành "Rejected/Loại bỏ".
12. Deferred: Nếu lỗi hiện tại không phải là ưu tiên chính và nếu dự kiến sẽ được sửa trong bản phát hành tiếp theo, thì trạng thái "Deferred/Trì hoãn" được gán cho các lỗi đó
13. Not a bug: Nếu nó không ảnh hưởng đến chức năng của ứng dụng thì trạng thái được gán cho lỗi là "Not a bug/Không phải là lỗi".


# B. Giải thích về vòng đời của bug/defect
![](https://images.viblo.asia/8406eb3b-3a86-48c8-a3b1-a376034a0cc1.png)
1. Tester tìm thấy bug/defect
2. Gán trạng thái cho bug: New/Mới
3. Chuyển bug sang cho Quản lý dự án để phân tích
4. Quản lý dự án quyết định xem bug có hợp lệ không
5. Nếu như lỗi không hợp lệ, trạng thái sẽ được chuyển thành "Rejected/Đã từ chối."
6. Nếu lỗi không bị rejected thì bước tiếp theo là kiểm tra xem nó có nằm trong phạm vi không. Giả sử chúng ta có một chức năng khác - chức năng email cho cùng một ứng dụng và bạn thấy có vấn đề với điều đó. Nhưng nó không nằm trong scope của lần phát hành ứng dụng lần này, trạng thái của bug đó có thể chuyển thành “Postponed/hoãn”.
7. Tiếp theo, người quản lý cần xác minh xem đã có bug nào tương tự đã được tìm ra trước đó hay chưa. Nếu đã có rồi, bug này được chuyển trạng thái thành “Duplicate/trùng lặp”.
8. Nếu không có vấn đề gì phát sinh trong khi dev fix bug thì bug này được chuyển sang trạng thái là “In- progress/đang tiến hành”.
9. Khi code được fixed. Bug sẽ được gán trạng thái là “Fixed/đã sửa xong”
10. Tiếp theo, tester sẽ test lại phần code vừa được sửa. Nếu như các phần test cases liên quan đều passed thì bug đó được đóng lại hay được chuyển trạng thái thành “Closed”. Nếu các trường hợp kiểm thử thất bại một lần nữa, lỗi được mở lại/re-opened và lại được chuyển giao sang cho dev
11. Hãy xem xét một tình huống trong lần release đầu tiên, một lỗi được tìm thấy theo thứ tự Fax đã được sửa và gán trạng thái đóng. Trong lần nâng cấp thứ hai, lỗi tương tự lại xuất hiện trở lại. Trong những trường hợp như vậy, một khiếm khuyết kín sẽ được mở lại.

Trên đây là toàn bộ về Vòng đời của Bug, tham khảo thêm link dưới để xem video mô tả

Link tham khảo: https://www.guru99.com/defect-life-cycle.html