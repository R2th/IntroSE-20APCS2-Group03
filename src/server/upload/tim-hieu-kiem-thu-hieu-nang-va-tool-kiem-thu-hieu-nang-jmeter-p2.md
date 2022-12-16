## Thực hiện PERFORMANCE TESTING: Jmeter Tool
* Mở Jmeter
* Chạy file jmeter.bat

![](https://images.viblo.asia/5c25cdd8-f889-4668-89fd-f560c416200f.png)

Trước khi thực hiện kiểm thử hiệu năng cho bất kỳ 1 hệ thống nào, bạn cũng cần phải xác định được **Mục tiêu của việc kiểm thử này là gì?**
Để minh họa cho một kế hoạch kiểm thử hiệu năng, tôi thực hiện phân tích hiệu suất của máy chủ website Vietnamnet (http://vietnamnet.vn/): Máy chủ Vietnamnet có thể xử lý bao nhiêu yêu cầu mỗi phút?

## Jmeter Tool- Test Plan
**Test Plan  trong Jmeter** - kế hoạch kiểm thử là một shelter, nơi giữ tất cả các cấu hình cần thiết để thực thi script, các Test Step và các element để ghi lại các kết quả.

![](https://images.viblo.asia/b2b46424-ba4e-4a23-9607-e809b5c22ab4.png)

## PERFORMANCE TESTING – Jmeter Tool
**Thread Group** được sử dụng để lưu trữ tất cả các cấu hình cần thiết để chạy Jmeter Performance Script của bạn.
* Nó bao gồm tập hợp các Threads (Users) được sử dụng để thực hiện cùng một script. 
* Ngoài "Number Of Threads", bạn cũng có thể sử dụng "Ramp-Up period tính bằng giây" và số lần lặp lại. 
* Bạn cũng có thể đặt lịch trình cho việc thực hiện bằng cách cung cấp "Duration tính bằng giây", “Start Time” và “End Time”.

**Add new Thread Group** : 
![](https://images.viblo.asia/ede7a8c6-71b3-49de-8338-0410027e81c0.png)

**Khi Thread Group được thêm vào, màn hình của bạn sẽ trông như sau**:
![](https://images.viblo.asia/ede7a8c6-71b3-49de-8338-0410027e81c0.png)

### Đặt số lượng user đồng thời truy cập
* **Number of Threads**: Bạn có thể nhập nhiều threads để giả lập. Mối user độc lập được đại diện bởi một thread vì vậy bạn muốn giả lập với 5 user đồng thời bạn cần nhập giá trị 5 cho thuộc tính này
* **Ram-Up Period**: Cho biết thời gian đưa ra bởi
 jmeter để tạo tất cả những thread cần thiết.
Nếu bạn thiết lập 10s tại ramp-up period cho 5 thread thì Jmeter sẽ thực hiện trong 10s để tạo ra 5 thread. Ngoài ra bằng cách thiết lập cho nó giá trị 0 tất cả các threads có thể được tạo 1 lần.
* **Forever**: Nếu bạn chọn option này thì Jmeter sẽ quyết định thời gian gửi request
* **Loop Count**: Bằng cách chỉ rõ giá trị của nó Jmeter cho biết rằng có bao nhiêu lần    		kiểm thử được lặp với điều kiện là Forever check box được uncheck.

## PERFORMANCE TESTING – Jmeter Tool
**HTTP(S) Test Script Recorder** được sử dụng để ngăn chặn và nắm bắt các hành động của bạn trong khi bạn đang điều hướng chức năng trên trình duyệt.
*  Lưu ý , Jmeter phụ thuộc vào máy chủ proxy của nó để ghi lại các hành động được thực hiện trên trình duyệt. Vì vậy, trước khi bắt đầu cài đặt proxy của trình duyệt, bạn cần thay đổi bản ghi để khớp với Jmeter's.
* Khi bạn bắt đầu ghi và thực hiện các thao tác trên trình duyệt, Jmeter sẽ bắt đầu tạo Test sample request và lưu trữ chúng trực tiếp bên dưới Thread Group.

**Thêm HTTP (S) Test Script Recorder**
![](https://images.viblo.asia/bf4e75fe-7742-495f-9010-3da2c27e5ae1.png)

**Một số tính năng cần thiết của Script Recorder**
![](https://images.viblo.asia/71736af4-e2dd-4619-880b-8216b57007f6.png)
* **Port**: Trường này chứa giá trị Port mà Jmeter proxy sẽ sử dụng để nghe. Hãy mặc định nó sẽ có giá trị "8888", nhưng nó có thể được thay đổi.
* **Target Controller** : Để xác định nơi bạn muốn Jmeter lưu trữ tất cả các yêu cầu được ghi lại.Theo mặc định, nó có giá trị “Recording Controller”, nhưng bạn có thể thay đổi nó thành “Thread Group” hoặc bất kỳ bộ điều khiển nào khác.
* **Grouping**: Tùy chọn này được sử dụng để nhóm các yêu cầu được ghi lại cho mỗi hành động (nhấp). Theo mặc định, nó sẽ có giá trị là "Do not group samplers", đó là nơi Jmeter lưu trữ tất cả các requests mà không cần group.
* **Capture HTTP Headers** : Có.
* **Patterns to Include / Exclude** : Các mẫu biểu thức chính quy được cung cấp sẽ được kiểm tra đối với URL đang được ghi lại. Nếu tìm thấy kết quả phù hợp, Jmeter sẽ thực hiện hành động để kết nhập hoặc loại trừ yêu cầu đó.
* **Nút Start / Stop** : Được sử dụng để khởi tạo / dừng máy chủ proxy.

![](https://images.viblo.asia/8b583302-70a1-4b98-bfbf-c76fc8dc3720.png)

Chọn Start và ấn OK:
![](https://images.viblo.asia/8b583302-70a1-4b98-bfbf-c76fc8dc3720.png)

**Recording Controller** là một bộ chứa trong đó HTTP Test Script Recorder lưu trữ tất cả các samplers. Lưu ý rằng, nó không đóng vai trò nào trong thực thi.
![](https://images.viblo.asia/8b583302-70a1-4b98-bfbf-c76fc8dc3720.png)
PERFORMANCE TESTING-  JMETER : Change Proxy của trình duyệt

Chọn như bên dưới:
![](https://images.viblo.asia/625ec680-8d89-4a5c-b0b7-c6d8b7659a75.png)

Đặt localhost và port:
![](https://images.viblo.asia/96bc8647-7362-4b96-9689-40f69bba9bd0.png)

### Thêm Listeners để theo dõi những kết quả trong quá trình test
* Muốn thêm một Listener cho một hành động, ta click chuột phải vào hành động đó rồi chọn Add Listener Listeners muốn thêm. Để theo dõi quá trình chạy, ta thêm các Listener với các chức năng tương ứng sau:
* View Results in Table: Cho phép theo dõi các thông tin về số thứ tự yêu cầu, thời gian bắt đầu mỗi yêu cầu, người sử dụng (ảo) thực hiện yêu cầu, thời gian phản hồi của mỗi yêu cầu, dung lượng mỗi yêu cầu trả về.
* View Results Tree: Cho phép theo dõi thông tin của dữ liệu mà Server trả về cho mỗi người dùng dưới các dạng khác nhau.
* Graph Results: Trả về đồ thị biểu diễn những thông số về: Số lượng yêu cầu, lượng yêu cầu được xử lý mỗi phút, giá trị trung bình, giá trị trung vị của toàn bộ thời gian phản hồi từ server.
* Summary Report: Cung cấp báo cáo về các giá trị: thời gian phản hồi thấp nhất/cao nhất, số yêu cầu xảy ra lỗi, lưu lượng trung bình.


**Tạo Report để xem Thông số**
![](https://images.viblo.asia/1a0fd3e4-6e27-40b6-9fdb-b2c26cb0ad8d.png)

### Phân tích kết quả-Summary Report
![](https://images.viblo.asia/c86676db-676c-44fd-950e-f42142c19fb2.png)

Bảng thống kê kết quả gồm
*  Label : tên request
*  Sample : số request
*  Average : thời gian trung bình xử lý các requestMin : thời gian nhỏ nhất xử lý
*  requestMax : thời gian lớn nhất xử lý
*  requestStd. Dev: độ lệch chuẩn của thời gian xử lý các
*  requestError : phần trăm bị lỗi của các request( lỗi kết nối hoặc lỗi cho đầu ra không mong muốn)
* Thoughput : số request/s của serveravg.
* bytes : số bytes trung bình của
* responseKB/sec = (avg.bytes*thoughput)/1024

Phân tích kết quả- Graph Results

![](https://images.viblo.asia/f92ffd05-f103-41fd-8f40-6917a2028f47.png)

Những thông số của graph này được biểu thị bằng những màu sắc khác nhau:
* Đen : Tổng số samples hiện tại đang gửi
* Đỏ : Độ lệch chuẩn hiện tại
* Xanh lá : tỷ số throughput hiện tại đại diện cho số request là server đã xử lý
* Xanh dương : Trung bình samples hiện tại
Để phân tích kết quả của bất cứ kịch bản test nào, chúng ta cũng nên tập trung vào 2 chỉ số là: Throughput và Deviation (độ lệch chuẩn)