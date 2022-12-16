DEFECT LIFE CYCLE hoặc Bug Life Cycle là tập hợp các trạng thái cụ thể mà Bug trải qua trong toàn bộ vòng đời của nó. Mục đích tạo ra quy trình cho một vòng đời bug/defect là để những người chịu trách nhiệm cho bug/defect đó dễ dàng quản lý và thay đổi trạng thái cho đến khi bug/defect được loại bỏ hoàn toàn khỏi hệ thống.

Mục tiêu chính của tester không chỉ là tìm ra bug/ khiếm khuyết của phần mềm mà còn phải theo dõi lỗi đó cho đến khi close nó. Vì vậy, vòng đời của bug là từ lúc tester tìm thấy bug đó đến khi close nó.

## 1. Sơ đồ vòng đời của bug

![](https://images.viblo.asia/9da6b87c-c7f6-4964-ae0e-054a041d2366.jpg)
Sơ đồ vòng đời của bug

### Mô tả chi tiết từng trạng thái của Bug xuyên suốt 1 vòng đời


***NEW (Mới)***

Khi tester thực thi test case và đầu ra của test case đó không đúng như kết quả mong đợi, thì họ sẽ gọi đó là bug. Nghĩa là có sự khác biệt giữa kết quả mong đợi và kết quả thực tế thì gọi là bug. Do đó bug này cần phải được fix. Nhưng tester không phải là người fix bug mà là lập trình viên sẽ fix nó. 

Tester sẽ báo bug này như thế nào? Họ sẽ đi đến chỗ của lập trình viên và nói rằng: Này anh, tôi đã tìm thấy 1 bug, hãy fix nó sớm nhé? Câu trả lời là không. Tester cần log bug này lên cho Team Lead và Team Lead sẽ assign cho developer fix bug này sau khi đã phân tích. (Có nhiều công ty, tester sẽ trực tiếp gán bug cho developer chứ không thông qua Team Lead). 

→  Khi tester tìm thấy bug thì nó sẽ có trạng thái là NEW.

***OPEN***

Lỗi được log lên bởi tester. Team lead cần xác minh lại bug đó xem có đúng là bug hay không, thì bug có trạng thái OPEN. Sơ đồ dưới đây là những hoạt động cần được thực hiện bởi team lead: 

![](https://images.viblo.asia/83e0ad17-09cd-4b04-845e-884fdbe17743.jpg)
Hoạt động cần được thực hiện bởi team lead

***REJECTED (Từ chối)***

Một bug được đánh dấu là Rejected khi bug đó không hợp lệ. Nghĩa là thỉnh thoảng tester có thể hiểu sai chức năng và có thể đánh dấu chức năng là bug. Trong trường hợp này, bug sẽ bị reject sau khi team lead kiểm tra lại. 

→ Khi tester báo cáo một bug nhưng nó lại là chức năng của ứng dụng thì team lead sẽ đánh dấu nó là REJECTED (H1).

***DUPLICATE (Trùng lặp)***

Nếu bug là hợp lệ, thì sau đó team lead sẽ kiểm tra xem lỗi đó đã được log người khác hay chưa. Nếu đã có người khác log nó, thì team lead sẽ đánh dấu nó là DUPLICATE. Còn nếu nó chưa được báo cáo bởi tester khác thì team lead sẽ thực hiện tìm kiếm nó trong scope. 

Như chúng ta đã biết, chúng ta làm việc trong một team. Có khả năng rằng cùng một phần mềm hoặc một module sẽ được gán cho nhiều hơn một tester, trong trường hợp này lỗi tương tự có thể được tìm thấy bởi nhiều tester. 

Vì vậy, team lead cần đảm bảo rằng, cùng một lỗi sẽ không được báo cáo 2 lần hoặc nhiều hơn thế. 

→ Nếu cùng một bug dược báo cáo bởi hai hay nhiều tester thì lỗi được báo cáo sau sẽ được đánh dấu là DUPLICATE.

***POSTPONED (Hoãn lại)***

Nếu bug không bị duplicate, nhưng lại không thuộc bản release hiện tại thì sẽ được đánh dấu là Deferred. Nghĩa là giả sử bạn đang làm theo mô hình agile, và họ chia yêu cầu dự án thành các sprint, ví dụ chia thành 10 sprint: sprint 1, sprint 2, ..., sprint 10. Hiện tại đang ở sprint 1, nhưng bug bạn tìm thấy lại có liên quan đến tính năng sẽ được phát triển ở sprint 2, thì bug này sẽ được đánh dấu là DEFERRED. Deferred bug là một bug, nhưng nó sẽ được sửa chữa trong bản release tương lai. 

→ Khi một bug là một phần của bản release tương lai thì nó sẽ được đánh dấu là DEFERRED.

***ASSIGNED (Gán bug)***

Khi bug tìm thấy là hợp lệ, duy nhất và thuộc bản release hiện tại, thì team lead sẽ gán bug đó cho developer.

***FIX***

Khi nhận được bug từ team lead, developer sẽ thực hiện thay đổi để fix bug cho đúng với yêu cầu, và đẩy lại cho tester kiểm tra lại lỗi đó.

***RE-TESTING (Test lại)***

Sau khi fix xong bug, và chức năng/tính năng đã sẵn sàng để kiểm thử, thì tester sẽ thực hiện lại những test case lỗi và xác minh lại xem nó đã chạy đúng hay chưa. Việc này gọi là RE-TESTING.

***CLOSED***

Khi bug đã được fix, đã được kiểm thử lại và nó chạy đúng như yêu cầu thì tester sẽ đánh dấu nó là CLOSED.

***RE-OPENED***

Có 2 tình huống mà chúng ta cần phải re-open lại bug: 

- Tình huống 1: Khi developer fix bug và tester thực hiện test lại nó, nhưng sau khi re-test, bug đó vẫn xảy ra thì tester sẽ RE-OPEN lại bug và assign cho developer.

- Tình huống 2: Có trường hợp lỗi đã fix và được close xuất hiện lại. Trong trường hợp này, tester cần RE-OPEN lại bug đã close và gán nó cho developer.

## 2. Giải thích về vòng đời của bug/defect

![](https://images.viblo.asia/9a990e11-def0-41dc-99c3-0e0ff06481c5.jpg)

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

***Bài dịch và tham khảo từ nguồn https://www.guru99.com/defect-life-cycle.html và software-testing-tutorials-automation.com/2016/12/bug-life-cycle.html***