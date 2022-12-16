Ở [phần 3](https://viblo.asia/p/tim-hieu-va-ap-dung-jmeter-vao-cong-viec-qa-phan-3-m68Z0MgMlkG), chúng ta đã tìm hiểu cách để tối ưu một Testplan cũng như khá kĩ về User Define Variables , thì ở phần này chúng ta sẽ đi vào những khái niệm cần thiết khác cho một QA để áp dụng được JMeter vào công việc kiểm thử performance của mình.

# Timer
Theo mặc định, JMeter sẽ gửi các yêu cầu mà không có khoảng tạm dừng nào giữa chúng với nhau. Điều này có thể dẫn đến việc server kiểm thử bị quá tải vì có quá nhiều yêu cầu (chẳng hạn mấy nghìn yêu cầu) liên tiếp trong khoảng thời gian ngắn (chẳng hạn vài giây). 

Vì thế khi kiểm thử performance thật sự, Timer luôn được cấu hình để cho phép JMeter "tạo độ trễ" giữa các yêu cầu mà một thread tạo ra. Hay nói cách khác, bằng cách sử dụng timer bạn có thể giải quyết được vấn đề quá tải của server kiểm thử.

Có khá nhiều loại timer, tuy nhiên trong bài viết này mình chỉ trình bày các timer phổ biến hay dùng trong JMeter nhất:

## Constant Timer:
Constant timer được dùng để tạo độ trễ mỗi yêu cầu của người dùng trong CÙNG MỘT khoảng thời gian. 

Tiếp tục ở ví dụ [phần 2](https://viblo.asia/p/tim-hieu-va-ap-dung-jmeter-vao-cong-viec-qa-phan-2-maGK7DXDZj2) nhưng thay vì mỗi user chỉ lặp lại 2 lần thì ở đây ta sẽ lặp lại tầm 1000 lần và thêm độ trễ giữa từng yêu cầu sẽ cố định là 5000 mili giây. 

Để thực hiện kiểm thử cho ngữ cảnh trên, ta sẽ dùng Contstant Timer bằng cách nhấp phải chọn **Thread Group --> Add --> Timer --> Constant Timer** . 

![](https://images.viblo.asia/62aa072d-04a2-434e-aa44-1ebb5fd43a50.png)

Sau đó cấu hình 5000 mili giây vào trường **Thread Delay**.

![](https://images.viblo.asia/1d29676e-9fe3-4910-af33-f7e51b832628.png)

Để dễ quan sát kết quả độ trễ, chúng ta cần thêm một listener **View Results in Table** để đọc kết quả dạng bảng bằng cách nhấp phải chọn **Thread Group --> Add -> Listener -> View Result in Table**. 

![](https://images.viblo.asia/93935dee-c11d-4ccf-8776-22c8c7307fc7.png)

Bây giờ bạn có thể chạy lại Thread group của mình và chọn xem báo cáo ở dạng **View Result in Table** và để ý giá trị ở cột **Start Time**. Thử so sánh khoảng cách thời gian giữa 2 yêu cầu liên tiếp nhau, bạn sẽ thấy độ trễ giữa chúng là 5000 mili giây như chúng ta đã thiết lập ở trên. 

![](https://images.viblo.asia/c3ade0a4-1331-4d85-a035-0b9444f31531.png)

## Các Timer khác

**Uniform Random Timer:** Dùng để tạo độ trễ từng yêu cầu của người dùng trong một khoảng thời gian ngẫu nhiên. Tương tự như tạo Constant Timer, bạn chỉ việc nhấp phải chọn
**Thread Group --> Add --> Timer --> Uniform Random Timer**: 

![](https://images.viblo.asia/e99486c2-429d-4b75-90d4-d144eeacfcaa.png)

Trong đó, 2 tham số chính bạn cần nắm để tạo một **Uniform Random Timer** gồm:

* **Random Delay Maximum**:  Là số lượng mili giây ngẫu nhiên tối đa để trì hoãn.
*  **Constant Delay Offset (milliseconds)**: Giá trị cộng thêm vào tính bằng mili giây.

==> Tổng độ trễ sẽ là tổng giá trị ngẫu nhiên và giá trị bù vào. 

**Gaussian Random Timer**: Dùng để tạo độ trễ cho từng yêu  cầu của người dùng trong một khoảng thời gian ngẫu nhiên. Đơn giản, bạn chỉ cần nhấp phải chọn **Thread Group --> Add --> Timer --> Gaussian Random Timer**: 

![](https://images.viblo.asia/09a34311-bd0f-4571-aebd-21d613fef7d5.png)

Trong đó: 
* **Deviations (milliseconds)**: Là một tham số của hàm phân phối Gaussian.
*  **Constant Delay Offset (milliseconds)**: Là giá trị bổ sung tính bằng mili giây

==> Tổng độ trễ sẽ là tổng giá trị của tham số hàm phân phối Gaussian và giá trị bổ sung.

Ngoài ra, đôi lúc bạn có thể cần sử dụng các timer sau, tùy theo nhu cầu của mình:

* **BeanShell Timer** - được dùng khi cần tạo thời gian trễ giữa từng yêu cầu.
* **BSF Timer** - được dùng để tạo độ trễ giữa mỗi yêu cầu bằng ngôn ngữ kịch bản BSF.
* **JSR223 Timer** - được dùng để tạo độ trễ giữa mỗi yêu cầu bằng ngôn ngữ kịch bản JSR223.


..............................................................

**Tài liệu tham khảo:** Chuỗi bài viết được tham khảo bằng cách dịch lại từ Guru99 và JMeterVN và có chỉnh sửa theo những gì mình vừa tìm hiểu và thực hành:

https://jmetervn.com/2016/12/09/user-defined-variables/
https://www.guru99.com/timers-jmeter.html