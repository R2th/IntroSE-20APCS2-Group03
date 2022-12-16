**4.Quản lý issues, sử dụng tiến trình công việc và tính năng báo cáo**

Chúng ta đã biết  các loại issue khác nhau và cách tạo chúng trong loạt bài Hướng dẫn JIRA trước đây của  tôi. Đây là hướng dẫn tiếp theo của JIRA trong loạt bài này, nơi chúng ta sẽ tìm hiểu cách sử dụng chúng, tiến trình công việc và tính năng báo cáo của JIRA.

Vấn đề khi đã tạo có thể được truy cập bằng cách tìm kiếm ID, duyệt mục menu "Issues" hoặc chuyển đến chi tiết dự án và kiểm tra tab issue.

Khi bạn truy cập một issue và nhấp vào liên kết của nó, màn hình  chi tiết sẽ được hiển thị. Tất cả các hành động có thể được thực hiện trên các issues cụ thể có sẵn trong tiêu đề của màn hình chi tiết issue:

![](https://images.viblo.asia/f66cb7c0-c8e9-4e31-a2c7-9695c19aeb94.jpg)

Bây giwof chúng ta sẽ đi từ phải sang trái và thảo luận các options.

*4.1.Quản lý issues trong JIRA*

1.**Edit**

Ở option này chúng ta có thể chỉnh sửa 1 issue.Click vào button Edit và chỉnh sửa thông tin như dưới đây.Chọn button 'Update' khi xong.Tương tự như khi đăng ký issue, các thuộc tính sao cho chúng hợp lệ như mong muốn:

![](https://images.viblo.asia/5a1298b2-49ba-4cf5-825c-934f0c88101b.jpg)

2.**Comment**

Đây là cách hữu dụng nhất để ghi lại quá trình của issue và communicate với thành viên khác, Nhập comment cua bạn và tùy chọn để hạn chế lượng người xem.

![](https://images.viblo.asia/7f9d31c2-2151-450e-9be4-58089314cea7.jpg)

3.**Assign**

Đây là tùy chọn bạn cần khi bạn muốn thay đổi quyền sở hữu của một issue. Nhập thông tin Người nhận, nhận xét (mọi thứ bạn muốn liên lạc) và chọn lượng người xem nhận xét. Khi issue được gán cho người dùng, một email tự động sẽ được gửi (nếu tùy chọn này được quản trị viên chọn) và issue xuất hiện trên trang tổng quan của người được chỉ định khi đăng nhập.

![](https://images.viblo.asia/77731805-c4c6-4627-ac69-6e5d905d7d5b.jpg)

4.**More**

Hiển thị thêm các mục sau khi click More

![](https://images.viblo.asia/d96e5192-715c-471c-80f6-ded945742708.jpg)

*Agile Board, Rank to Top, Rank to Bottom* : Liên quan đến các dự án Agile - các chi tiết trong đó sẽ được đưa ra trong một bài viết sau.

*Attach Files, Attach Screenshots*: Cho phép bạn đính kèm tệp vào một issue. Tùy chọn ảnh chụp màn hình sẽ tự động chụp ảnh chụp màn hình. Tất cả bạn cần làm là một màn hình in trên máy tính của bạn và bạn có thể trực tiếp sao chép nó vào  JIRA.

*Add Vote, Voters, Stop watching, Watchers* : Bỏ phiếu là một quá trình mà người dùng JIRA có thể thực hiện để hỗ trợ giải quyết vấn đề một cách thuận lợi hoặc không thuận lợi. Các tùy chọn trong phần này tạo điều kiện giống nhau. Bạn cũng có thể chọn để xem một issue- khi bạn làm như vậy, tất cả các thay đổi  sẽ được thông báo cho bạn.

*Create Sub-Task, Convert to Sub-task*: Phần này đã có trong phần 3 của loạt bài, mời các bạn xem lại.

*Labels*: Khái niệm này tương tự như “Nhãn” mà chúng tôi tìm thấy trên nhiều trang blog và blog khác nhau. Bạn có thể phân loại các isue dựa trên Phiên bản và Thành phần chính thức, nhưng khi cần một cái gì đó chính thức hơn, tùy chọn này có thể được sử dụng. Ví dụ: tất cả các issue được nêu ra để theo dõi nhận xét đánh giá ngang hàng có thể được gắn nhãn “đánh giá ngang hàng” để xem và theo dõi chúng một cách dễ dàng.

5.**Log work**: Đây là cách để theo dõi tiến trình của bạn ở 1 issue nào đó theo thời gian.Khi sử dụng option này, hộp thoại sau sẽ được mở.Như bạn thấy, thông tin chi tiết về khoảng thời  gian mà bạn sử dụng cho issue này, thời gian còn lại là bao nhiêu, vvv, tất cả sẽ được log ở đây.

![](https://images.viblo.asia/62bf8b26-3861-4f93-bd82-01d1fe5abe03.jpg)

6.**Move**

Các issue trong JIRA có thể chuyển qua các pjorect.Tuy nhiên việc di chuyển từ pjoretc này sang pjorect khác phải có nghĩa là luồng mục đích khác, loại issue khác, 1 trạng thái khác.Do đó, nên phân tích kỹ lưỡng cách thức di chuyển sẽ ảnh hưởng đến vấn đề này trước khi tiếp tục với điều này.

![](https://images.viblo.asia/e6f23eb4-8470-4611-b1ce-6e9a4d3f6c09.jpg)

7.**Link**

Đây là một tính năng rất linh hoạt của JIRA cho phép bạn liên kết một cách hợp lý các issue với nhau và thiết lập các mối quan hệ / phụ thuộc.

Một ví dụ trong trường hợp này có thể được sử dụng trong các dự án QA là khi một lỗi ngăn cản bạn làm việc một yêu cầu nhất định. Bạn có thể sử dụng tùy chọn này để hiển thị sự phụ thuộc.

Khi liên kết này được truy cập, hộp thoại sau sẽ mở ra. Sử dụng hộp thoại này rất đơn giản:

![](https://images.viblo.asia/2b26f0c4-3263-408c-82cc-597f9275d540.jpg)

Có thể chọn loại liên kết khác nhau từ  danh sách "This issue". Danh sách chứa:

![](https://images.viblo.asia/26259904-4f3b-45c1-8657-65c17b297797.jpg)

Sau đó bạn có thể add thêm 'Web-link' để tham chiếu

8.**Clone** 

Tạo 1 issue mới giống hệt như issue hiện tại

![](https://images.viblo.asia/915699ee-1a6f-44ca-baa5-1e3ba55cd80f.jpg)

Khi một vấn đề được nhân bản:

Bản tóm tắt của issue  duplicate được bắt đầu bằng prefix  “CLONE”.
Sẽ có một liên kết được thiết lập giữa issue gốc và issue Clone.

9.**Email issue**

Click vào biểu tượng Share. Nhập thông tin cho người nhận thông tin về issue trong hộp thoại bên dưới mở ra. Một email có thông tin chi tiết về issue JIRA sẽ được gửi đi.

![](https://images.viblo.asia/7beeff71-4df8-4f03-9e30-149e93487e1a.jpg)

10.**Export**

JIRA cũng sẽ cung cấp cách viết thông tin về issue ra các tệp bên ngoài. Để làm như vậy, hãy nhấp vào nút “Export” ở góc ngoài cùng bên phải và bạn sẽ thấy các định dạng mà bạn có thể tải xuống vấn đề JIRA:

![](https://images.viblo.asia/005f9a38-d246-4064-8186-d180c0b68154.jpg)


**Làm thế nào để di chuyển một issue JIRA thông qua các giai đoạn khác nhau của quy trình làm việc?**

1) Một issue được tạo ra trong JIRA luôn ở trạng thái “Open” khi tạo.

2) Các giai đoạn công việc mà nó phụ thuộc vào loại dự án và luồng công việc được giao cho dự án trong khi tạo.

3) Chỉ quản trị viên mới có thể chọn điều này và một khi được chọn, nó không thể thay đổi và tất cả các issue trong dự án sẽ đi qua cùng một quy trình làm việc.

4) Khi nút “Start Progress” được nhấp vào, trạng thái issue sẽ thay đổi thành “In Progress” và thay đổi nhãn của nút thành “Stop Progress” khi được nhấp sẽ hoàn nguyên trạng thái trở về “Open”.

5) Nhấp vào nút “Workflow” sẽ hiển thị cho bạn một hộp danh sách các giai đoạn tiếp theo mà một issue có thể xảy ra.

6) Nếu issue cần được đặt thành "Resolved" trực tiếp, thì có nút "Resolve issue" . Khi nhấp vào nó, bạn sẽ có thể chọn lý do cho biết issue đã được fix.

![](https://images.viblo.asia/0d6c9c22-5e54-4c35-8155-14adadcf5294.jpg)

7) Để xem luồng công việc mà issue nhất định đi qua, hãy nhấp vào liên kết “View workflow” bên cạnh trường trạng thái của issue trong trang chi tiết issue Ví dụ, đối với issue  này, luồng công việc được hiển thị là:

![](https://images.viblo.asia/55b681b0-d5fa-4c8e-ab47-1db00d8e0742.jpg)

**Báo cáo trong JIRA**:
JIRA cũng đi kèm với một tính năng báo cáo . Có nhiều loại báo cáo . Duyệt qua một dự án nào đó  bạn muốn nhận báo cáo và chuyển đến tab "Reports". Ở đây bạn sẽ thấy danh sách tất cả các báo cáo có thể trình bày cho bạn. Chọn báo cáo và thiết lập các tiêu chí dữ liệu và bạn sẽ có một báo cáo tùy chỉnh được thực hiện .
Ngoài ra, đối với một công cụ quản lý issue, người dùng sẽ mong đợi các tính năng tìm kiếm  và JIRA cũng phù hợp với điều này. Vì vậy, hãy chắc chắn tận dụng điều đó để mang lại lợi ích cho bạn.

![](https://images.viblo.asia/ac8f635f-c0b8-4245-9d4c-556facaa9c95.jpg)