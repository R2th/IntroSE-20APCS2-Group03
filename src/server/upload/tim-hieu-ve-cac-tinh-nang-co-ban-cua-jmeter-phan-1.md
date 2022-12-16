![](https://images.viblo.asia/e67b3838-6aeb-4c82-952f-2a502e2821f4.jpg)

Tìm hiểu về các tính năng cơ bản là điều cần thiết và có lợi nhất khi bắt đầu sử dụng một công cụ bất kỳ nào đó. Vì vậy, trong bài viết này chúng ta sẽ thảo luận về một số tính năng cơ bản của Jmeter nhưng rất quan trọng để sử dụng nó.

Nếu bạn là người mới và chỉ mới bắt đầu học Jmeter, thì đừng vội tiếp cận với những chức năng, khái niệm quá phức tạp, rối rắm. Bạn sẽ bị lẫn lộn và đột nhiên bạn sẽ nhận thấy Jmeter trông giống như một con rồng lớn vô cùng đáng sợ (Và bạn không phải là Khaleesi, chắc chắn).

## Điều kiện tiên quyết

Nếu bạn chưa quen với Jmeter, hãy đọc các bài viết được đề cập dưới đây trước khi tiếp tục.

[Giới thiệu về Jmeter - Công cụ kiểm tra hiệu suất.](http://www.testingjournals.com/jmeter-introduction/)

[Jmeter: Hướng dẫn cài đặt hoàn chỉnh](http://www.testingjournals.com/jmeter-installation-and-setup-guide/)

Màn hình hiển thị bên dưới sẽ xuất hiện khi bạn mở Jmeter 3.0

![](https://images.viblo.asia/99b47fe1-e722-4ea5-8c34-2a9075153211.png)

Để bắt đầu với việc chuẩn bị script đầu tiên của bạn trong Jmeter, bạn sẽ cần phải hiểu chức năng của các tính năng Jmeter được đề cập dưới đây:

1) Test Plan

2) Thread Group

3) HTTP(S) Test Script Recorder

4) Recording Controller

5) HTTP Request Defaults

6) HTTP Cookie Manager

7) User Defined Variables

8) Listeners

## Test Plan trong Jmeter

Một Test plan - kế hoạch thử nghiệm trong màn hình Jmeter là một shelter, nơi bạn có thể giữ tất cả các cấu hình cần thiết để thực thi script, các Test Step và các element để ghi lại các kết quả. Có rất nhiều cấu hình và các phần tử Test mà bạn có thể thêm vào trong một Test Plan, nhưng ở đây chúng ta sẽ chỉ thảo luận về những phần cần thiết để chạy một Jmeter script cơ bản.

![](https://images.viblo.asia/28780b21-785e-4de6-86a1-f676cd674cc6.png)

Để thêm một element bất kỳ hoặc một cài đặt tương ứng nào, bạn sẽ cần phải Nhấp chuột phải vào Test Plan và sẽ thấy hộp tùy chọn mở ra. Đầu tiên bạn sẽ thấy là “add” giống như trong hình ảnh được hiển thị, các tùy chọn này có thể được thêm vào như một phần của Test Plan.

- **Threads(Users)** : Thread Group được thêm vào Test Plan từ tùy chọn hoạt động như điểm bắt đầu của một Jmeter Performance script bất kỳ.

- **Test Fragment** : Một dạng đặc biệt của controller nhưng vẫn ở vẫn ở cấp Thread Group. Nó không phải là một phần của việc thực thi test trừ khi được tham chiếu bởi một trong hai Module Controller hoặc Include Controller.

Urghh !!! Đúng ? OK, hãy để tôi giải thích theo cách đơn giản nhất. Sử dụng các Test Fragments, nhiều modules của Test script phức tạp có thể được cấu hình trong một test plan duy nhất và có thể chạy đồng thời như là một phần của single Load test.

Làm thế nào?? sẽ thấy sau. Hãy tập trung vào cấu hình cơ bản trước.

- **Config Element** : Tất cả các cấu hình cần thiết để chạy một test script được thêm vào từ tùy chọn. Ví dụ: Đọc giá trị Test Data từ tệp CSV, Cookie Manager, Cache Manager, Lưu trữ biến do người dùng xác định, yêu cầu mặc định HTTP & FTP và nhiều thứ khác.

- **Timers**: Theo mặc định, Jmeter thực thi mà không bị tạm dừng. Bộ hẹn giờ có thể được thêm vào để làm chậm thời gian xác định trước khi thực hiện từng sampler.

- **Pre Processors** : Được sử dụng để thực thi một số hành động trước khi Sampler Request được gửi đến máy chủ.

- **Post Processors** : Được sử dụng để thực hiện một số hành động sau khi Sampler Request được thực thi và được gửi đến máy chủ.

- **Assertions** : Tất cả màu xanh lá cây và không có lỗi trong response? Tuyệt vời, Jmeter script của bạn đã được thực thi thành công. Đợi đã, Bạn có nhìn vào response để xác nhận không? Đừng dựa vào tỷ lệ bug hoặc màu xanh để đánh giá mức độ thành công của bạn.Có thể là bạn có thể không nhận được kết quả mong đợi nhưng Jmeter sẽ cho thấy rằng bài test của bạn đã pass.

Bạn có thể tự động hóa quá trình này bằng cách thêm Assertions. Mỗi khi bạn chạy script, “Assertions” sẽ tìm thấy pattern phù hợp trong response và dựa trên thành công / thất bại đó đểquyết định.

- **Listeners** : Nó được sử dụng để giới thiệu response được lấy từ máy chủ cho mỗi lần thực hiện.

## Thread Group

Một Thread Group trong Jmeter là điểm khởi đầu của bất kỳ một Test plan nào. Nó bao gồm tập hợp các Threads (Users) được sử dụng để thực hiện cùng một script. Ngoài "Number Of Threads", bạn cũng có thể sử dụng "Ramp-Up period tính bằng giây" và số lần lặp lại. Bạn cũng có thể đặt lịch trình cho việc thực hiện bằng cách cung cấp "Duration tính bằng giây", “Start Time” và “End Time”.

Nói một cách đơn giản, một Thread Group được sử dụng để lưu trữ tất cả các cấu hình cần thiết để chạy Jmeter Performance Script của bạn.

**Làm thế nào để thêm Thread Group từ Test plan?**

Thêm Thread Group là bước đầu tiên để xây dựng Jmeter script của bạn. Để thêm Thread Group: Kích chuột phải vào Test Plan> Add> Threads (Users)> Thread Group.

![](https://images.viblo.asia/6a8125b3-7511-4993-8a38-cb4c46d78755.png)

Khi Thread Group được thêm vào, màn hình của bạn sẽ trông như sau:

![](https://images.viblo.asia/710de493-084e-4021-9a0a-73a465638bd3.png)

## HTTP(S) Test Script Recorder

HTTP(S) Test Script Recorder được sử dụng để ngăn chặn và nắm bắt các hành động của bạn trong khi bạn đang điều hướng chức năng trên trình duyệt. Lưu ý rằng, Jmeter phụ thuộc vào máy chủ proxy của nó để ghi lại các hành động được thực hiện trên trình duyệt. Vì vậy, trước khi bắt đầu cài đặt proxy của trình duyệt, bạn cần thay đổi bản ghi để khớp với Jmeter's.

Khi bạn bắt đầu ghi và thực hiện các thao tác trên trình duyệt, Jmeter sẽ bắt đầu tạo Test sample request và lưu trữ chúng trực tiếp bên dưới Thread Group.

## Làm thế nào để thêm HTTP (S) Test Script Recorder?

Nhấp chuột phải vào WorkBench > Add > Non-Test Elements > HTTP(S) Test Script Recorder.

![](https://images.viblo.asia/f6ba4cf3-deee-44ec-93fc-a807f6e8bebc.png)

Bây giờ, chúng ta hãy hiểu một số tính năng cần thiết của Script Recorder.

![](https://images.viblo.asia/0d20f69c-a875-4116-b593-f8714bc45d02.png)

- **Port**: Trường này chứa giá trị Port mà Jmeter proxy sẽ sử dụng để nghe. Hãy mặc định nó sẽ có giá trị "8888", nhưng nó có thể được thay đổi.

- **Target Controller** : Để xác định nơi bạn muốn Jmeter lưu trữ tất cả các yêu cầu được ghi lại.Theo mặc định, nó có giá trị “Recording Controller”, nhưng bạn có thể thay đổi nó thành “Thread Group” hoặc bất kỳ bộ điều khiển nào khác.

- **Grouping**: Tùy chọn này được sử dụng để nhóm các yêu cầu được ghi lại cho mỗi hành động (nhấp). Theo mặc định, nó sẽ có giá trị là "Do not group samplers", đó là nơi Jmeter lưu trữ tất cả các requests mà không cần group.

- C**apture HTTP Headers** : Có.

- **Patterns to Include / Exclude** : Các mẫu biểu thức chính quy được cung cấp sẽ được kiểm tra đối với URL đang được ghi lại. Nếu tìm thấy kết quả phù hợp, Jmeter sẽ thực hiện hành động để kết nhập hoặc loại trừ yêu cầu đó.

- **Nút Start / Stop** : Được sử dụng để khởi tạo / dừng máy chủ proxy.

## Recording Controller

Recording Controller là một bộ chứa trong đó HTTP Test Script Recorder lưu trữ tất cả các samplers. Lưu ý rằng, nó không đóng vai trò nào trong thực thi.

## Làm thế nào để thêm Recording Controller ?

Nhấp chuột phải vào Thread Group từ Test Plan > Add > Logic Controller > Recording Controller.


***Bài viết được dịch lại từ nguồn: http://www.testingjournals.com/understanding-basic-jmeter-features/***