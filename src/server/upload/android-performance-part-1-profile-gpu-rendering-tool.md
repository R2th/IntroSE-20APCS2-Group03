## 1. Introduction
Mọi ứng dụng là khác nhau và có những vấn đề hiệu suất khác nhau. Đôi khi để có ứng dụng tốt nhất, bạn cần phân tích cấu hình của ứng dụng để tìm và khắc phục các sự cố về hiệu suất.
Để khám phá nguyên nhân gây ra sự cố hiệu suất cụ thể ứng dụng của bạn, có thể sử dụng các công cụ thu thập dữ liệu về hành vi thực thi ứng dụng của bạn. Hiểu và phân tích những gì bạn thấy sau đó cải thiện code của bạn. Android Studio và điện thoại cung cấp các công cụ định hình để ghi lại và trực quan hóa hiệu suất về: rendering, tính toán, memory và pin của ứng dụng

Ở bài này mình sẽ hướng dẫn bạn sử dụng Profile GPU Rendering tool trên thiết bị của mình để để trực quan hóa một ứng dụng mất bao lâu để vẽ khung (frames) lên màn hình.
Chú ý: bạn cần một máy android có API nhỏ nhất là 16 (Android 4.1) - máy ảo cũng được.
Ứng dụng của bạn phải vẽ màn hình đủ nhanh để người dùng thấy mượt mà, chuyển tiếp, phản hồi. Thông thường các thiết bị hiện đại cố gắng hiển thị 60 khung hình mỗi giây (tốc độ khung hình 60 FPS), cung cấp 16 mili giây cho mỗi khung hình. Do đó ứng dụng của bạn phải thực hiện công việc của mình trong 16 mili giây hoặc ít hơn cho mỗi lần làm mới màn hình.
Quang trọng: nên test trên thiết bị thật thay vì máy ảo có thể dữ liệu không thật sự đúng. Luôn kiểm tra trên thiết bị có API thất nhất mà ứng dụng của bạn có thể chạy.

Những khái niệm bạn nên biết:
- CPU: Bộ xử lý trung tâm máy tính là mạch điện tử bên trong thực hiện các hoạt động số học, logic, điều khiển, và input/output.
- GPU: Bộ xủ lý đồ họa GPU là một mạch điện tử chuyên dụng được thiết kế đẻ thao tác và hiển thị hình ảnh một cách nhanh chóng.
- Frame rate: Tốc độ khung hình (Tính bằng khung hình trên giây hoặc FPS) là tần số (tốc độ) mà tại đó các hình ảnh liên tiếp, được gọi là khung hình, được hiển thị trong màn hình hoạt hình. Điện thoại thường hiển thị 60 frames mỗi giây, xuất hiện dưới dạng chuyển động mượt mà đến mắt người.
- Display list: Là một chuỗi các lệnh đồ họa xác định hình ảnh đầu ra là là một chuỗi các nguyên thủy (đường và hình dạng cơ bản)
Rendering pipeline: Một mô hình khái niệm mô tả các bước mà một hệ thống đồ họa thực hiện khi nó hiển thị thông tin đồ họa trên màn hình. Ở mức cao nhất pipeline tạo một Display list từ các hướng dẫn chương trình trong CPU, chuyển Display list cho GPU và GPU thực hiện Display list để vẽ màn hình
## 2. Run profile GPU Rendering Tool
Đưa điểm ảnh lên màn hình sẽ gồm 4 phần cứng sau đảm nhiệm:
- CPU tính toán danh sách cần hiển thị. Mỗi danh sách hiển thị là một chuỗi các lệnh đồ họa xác định hình ảnh đầu ra.
- GPU hiển thị hình ảnh cho màn hình.
- Bộ nhớ lưu trữ hình ảnh và dữ liệu.
- Pin cung cấp năng lượng điện cho các phần cứng trên điện thoại.

Mỗi phần cứng trên đều có những ràng buộc và giới hạn nhất định, nếu bị vượt qua thì có thể khiến ứng dụng bị chậm, hiệu suất hiển thị kém hoặc làm cạn kiệt pin.
Profile GPU Rendering tool cung cấp một bản trình bày trực quan về thời gian hiển thị các khung (frame) của UI so với chuẩn 16 frames trên một giây. Tool này hiển thị một thanh màu cho mỗi frame. Mỗi thanh bar có phân đoạn màu cho biết thời gian tương đối mã mỗi giai đoạn rendering pipeline mất đi.
![](https://images.viblo.asia/66ffbae3-4d95-4678-844b-07fc18edbed6.png)
Những ưu điểm mang lại:
- Xem cách màn hình hoạt động một cách dễ dàng so với target 16ms một khung hình
- Xác định xem thời gian bất kỳ của phần nào của đường rendering và có thể biết chỗ nào nổi bật không.
- Tìm kiếm các đột biến liên quan đến người dùng hoặc chương trình.
### 2.1 Disable Instant Run
Trong khi định hình một ứng dụng hãy tắt Instant Run trong Android Studio.  Có một tác động nhỏ về performance khi sử dụng Instant Run, cái này có thể can thiệp vào thông tin cung cấp bởi performance profiling tools. Ngoài ra các phương thức sơ khai được tạo ra trong khi sử dụng Instant Run có thể làm phức tạp stack traces.

1. Mở cửa sổ **Setting or Preferences**: Trong Window or Linux, select **File > Setting** từ thanh menu. Trong Mac OSX select **Android studio > Preferences** từ thanh menu.
2. Điều hướng tới **Build, Execution, Deployment > Instant Run**
3. Bỏ chọn checkbox **Restart activity on code change**
### 1.2 Install and run the Recycler View app
Đây là một ứng dụng dùng RecyclerView để hiện thị danh sách các từ.
1. Download ứng dụng RecyclerView từ [link](https://viblo.asia/posts/aWj53eQbZ6m/edit)
2. Mở ứng dụng bằng Android studio. Và bạn có thể cần gỡ các phiên bản trước của nó nếu có.
3. Tương tác với ứng dụng và xem ứng dụng có mượt mà không.
4. Trong MainActivity thay đổi giới hạn vòng for từ 20 đến 200 và tương tác. điều này có làm bạn thay đổi cách cảm nhận về hiệu suất của ứng dụng này không :)
### 1.3 Bật the Profile GPU Rendering tool
Đảm bảo rằng Developer options được bật và cho phép USB Debugging nếu được nhắc.
Di chuyển tới **Setting -> Developer options**
Scoll và tìm **Profile GPU rendering** sau đó chọn **On screen as bars** bằng cách tick vào checkbox

![](https://images.viblo.asia/00876ead-cb3f-437b-aec1-7d95decd1372.png)
Sau đó chuyển sang ứng dụng RecyclerView và tương tác với nó.

Lưu ý những điều dưới đây:
- Mỗi thanh (chiều dọc nhỏ) đại diện cho một khung hình được hiển thị
- Nếu một thanh vượt lên trên đường màu xanh lá cây nằm ngang thì khung hình sẽ mất hơn 16ms để hiển thị. Lý tưởng nhất là các thanh đều ở dưới đường màu xanh lá cây.

Đây không phải là một yêu cầu tuyệt đối. Ví dụ khi bạn tải hình ảnh lần đầu tiên, thanh có thể vượt lên trên đường màu xanh nhưng người dùng không nhận thấy vấn đề gì vì họ có thể chờ đội một lát để hình ảnh được tải. Có một số thanh cao hơn mức cho phép không có nghĩa là ứng dụng của bạn có vấn đề hiệu suất. Nhưng nếu chắc chắn ứng dụng có vấn đề về hiệu suất thì các thanh có chiều cao sẽ cho chúng ta gợi ý về nơi bắt đầu tìm kiếm.
- Màu sắc trong mỗi thanh đại diện cho giai đoạn khác nhau trong render frame. Các màu trực quan hóa tương quan giữa chúng. Xem hình dưới đây

![](https://images.viblo.asia/e23264cc-f9bd-4e49-abbb-e7e91766722d.png)
(Chú thích này cho Android 6.0 trở lên, bạn cũng có thể xem cho các phiên bản Android cũ hơn ở [đây](https://developer.android.com/studio/profile/inspect-gpu-rendering#profile_rendering))

Chúng ta cùng xem những chi tiết của các loại màu dưới đây - Lần lượt từ **phải qua trái**.
- **Màu cam - Swap - buffers**: Thể hiện thời gian CPU đang chờ GPU hoàn thành công việc. Nếu phần này của thanh cao thì GPU đang làm quá nhiều việc.
- **Màu đỏ - Command issue**: Thể hiện thời gian render 2D của Android khi nó phát lệnh OpenGL để vẽ và vẽ lại display list. Chiều cao của thanh tỉ lệ với tổng thời gian cần thiết cho tất cả các display list.
- **Xanh dương - Sync and upload**: Thể hiện thời gian cần thiết để tải thông tin bitmap lên GPU. Nếu phần này thanh mà cao, ứng dụng sẽ mất nhiều thời gian để tải số lượng lớn đồ họa.
- **Tím - Draw**: Thể hiện thời gian được sử dụng để tạo và cập nhật display list lên view. Nếu phần này thanh cao thì có thể rất nhiều Custom View đang được vẽ hoặc nhiều công việc trong onDraw.
- **Xanh - Measure and layout**: Thể hiện thời gian cho các callbacks onLayout và onMeasure trong hệ thống cấp bậc View. Nếu phần này cao thì chỉ ra răng hệ thống phân cấp đang mất nhiều thời gian để xử lý.
- **Xanh - Animation**: Thể hiện thời gian đánh giá Animation. Nếu phần này cao thì ứng dụng của bạn có thể đang sử dụng một custom animation chưa đủ tốt.
- **Xanh - Input handling**: Thể hiện thời gian mà ứng dụng dùng để thực thi code bên trong một callback của input event. Nếu phần này cao thì ứng dụng mất nhiều thời gian để xử lý dữ liệu nhập của người dùng.
- **Xanh - Misc. time / Vsync delay**: Biểu thị thời gian ứng dụng dành cho khoảng giữa các frame liên tiếp. Nó có thể chỉ ra nhiều xử lý xảy ra trong UI thread có thể giảm tải sang một thread khác.

Ví dụ với trường hợp Xanh - input handling nếu thanh này cao vượt mức cho phép thì hãy xem xét khi nào và làm thế nào ứng dụng yêu cầu user nhập liệu và chúng ta có thể xử lý hiệu quả hơn không.

Lưu ý rằng khi RecyclerView có thể hiện thị trong phần Input handling của thanh. RecyclerView cuộn ngay lập tức khi nó xử lý sự kiện chạm. Vì lý do này sự kiện chạm phải nhanh nhất có thể.
## 3. Summary
Vậy bạn thử dùng  Profile GPU Rendering xem sao.

Nếu bạn dành thời gian sử dụng Profile GPU Rendering Tool trên ứng dụng của mình, nó sẽ giúp bạn xác định phần nào của tương tác UI chậm hơn dự kiến và sau đó ta có thể thực hiện hành động để cái thiện độc độ UI của ứng dụng.
p/s Khi hệ thống và công nghệ Android được cải thiện, các khuyến nghị này có thể thay đổi :)