## 1. Giới thiệu
Như các bạn đã biết EC2 instance là một trong những core service của AWS. Nếu các bạn đã từng học và có 1 số demo nhỏ, thì các bạn sẽ chỉ tạo ra những ec2 on demand instance, tuy nhiên có rất nhiêu loại instance khác mà các bạn chưa biết đến mục đích cũng như những hiệu quả mà nó mang lại vì vậy hôm nay mình sẽ nói qua những instance type trong ec2
## 2. EC2 Instance Launch Types
### 2.1. On Demand Instance
- On demand là một trong những loại mà mình thường hay sử dụng nhất vì nó khá là an toàn cũng như là thuận tiện. Bạn sử dụng bao nhiêu thì bạn trả tiền bấy nhiêu cụ thể ở đây là sẽ tính tiền theo giờ. Nó khá là thuận tiện khi bạn muốn sử dụng một instance mà không có kế hoạch lên trước, bạn có thể dùng bất cứ lúc nào và xóa lúc bất cứ lúc nào nếu bạn mong muốn.
- Về giá thì On Demand có mức giá khá là cao so với các loại khác tuy nhiên bạn không cần phải trả bất cứ phí gì trước, cứ start xong là trả tiền thôi.
### 2.2. Reserved Instances
- Là 1 loại instance mà bạn muốn đăng kí sử dụng trong một khoảng thời gian dài, do là nó đã được đặt từ trước vì thế aws đã có mức discount 70% so với giá của on demand đối với loại instance này. Vì vậy bạn sẽ cần phải trả trước để cam kết sẽ sử dụng lâu dài, bạn có thể trả trước ngay 1 lúc hoặc có thể đặt trước, ngoài ra khi bạn không dùng đến thì bạn có thể bảo lưu 1 hoặc 3 năm tùy ý bạn.
- Khi đã đăng kí sử dụng reserved instance bạn phải xác định loại instance type bạn sẽ sử dụng như a1.medium hay t2.micro ...
- Thường loại Reserved Instance này khá hữu dụng khi bạn cần tạo 1 database, thì việc này khá là hợp lí vì nó sẽ giảm giá cho bạn đến 75%
Tuy nhiên Reserved Instance sẽ chia ra làm 2 loại để các bạn có thể linh hoạt hơn trong việc sử dụng chúng.
- Dưới đây là mô hình tổng thể về Reserved Instances
- ![](https://images.viblo.asia/98ac3d5f-bb45-4fda-bf4e-b921a8b6b884.png)

- Về Reserved Instance sẽ chia ra làm 3 type là **Standard**,  **Convertible** và **Scheduled**, Bây giờ chúng ta sẽ đi chi tiết từng loại nhé:

### 2.2.1  Standard Reserved
* Nó cung cấp giảm giá lên đến 75% theo yêu cầu. Ví dụ: bạn đang thanh toán tất cả các khoản trả trước cho hợp đồng 3 năm.
* Nó hữu ích khi Ứng dụng của bạn ở trạng thái ổn định.

### 2.2.2 Convertible Reserved
* Nó cung cấp giảm giá lên đến 54% theo yêu cầu.
* Nó cung cấp tính năng có khả năng thay đổi các thuộc tính của RI(Reserved Instances) miễn là việc trao đổi dẫn đến việc tạo ra các Phiên bản dành riêng có giá trị bằng hoặc lớn hơn.
* Giống như Phiên bản dành riêng tiêu chuẩn, nó cũng hữu ích cho các ứng dụng trạng thái ổn định.

### 2.2.3 Scheduled Reserved

* Phiên bản dành riêng đã lên lịch có sẵn để khởi chạy trong khoảng thời gian cụ thể mà bạn đặt trước.
* Nó cho phép bạn khớp việc đặt trước dung lượng của mình với một lịch trình định kỳ có thể dự đoán được chỉ yêu cầu một phần nhỏ của ngày, một tuần hoặc một tháng.

## 2.3 Spot Instance
* Nó cho phép bạn đặt giá thầu với bất kỳ mức giá nào bạn muốn, chẳng hạn như dung lượng và tiết kiệm tốt hơn nếu ứng dụng của bạn có thời gian bắt đầu và kết thúc linh hoạt.
* Phiên bản Spot rất hữu ích cho những ứng dụng có thời gian bắt đầu và kết thúc linh hoạt.
* Nó rất hữu ích cho những ứng dụng khả thi với giá tính toán rất thấp.
* Nó rất hữu ích cho những người dùng có nhu cầu khẩn cấp về dung lượng tính toán bổ sung lớn.
* Phiên bản giao ngay EC2 cung cấp ít chiết khấu hơn so với giá Theo yêu cầu(On Demand).
* Phiên bản Spot được sử dụng để tối ưu hóa chi phí của bạn trên đám mây AWS và mở rộng thông lượng ứng dụng của bạn lên đến 10X.
* Phiên bản Spot EC2 sẽ tiếp tục tồn tại cho đến khi bạn chấm dứt các phiên bản này.
* 
![](https://images.viblo.asia/f1db8dbc-0b88-4ab6-ad66-b7e61865003f.png)

## 2.4 Dedicated Hosts
* Máy chủ chuyên dụng(Dedicated Hosts) là máy chủ vật lý có dung lượng phiên bản EC2 hoàn toàn dành riêng cho việc sử dụng của bạn.
* Máy chủ EC2 vật lý là máy chủ chuyên dụng có thể giúp bạn giảm chi phí bằng cách cho phép bạn sử dụng giấy phép phần mềm ràng buộc máy chủ hiện có của mình. Ví dụ: Vmware, Oracle, SQL Server tùy thuộc vào giấy phép mà bạn có thể mang sang AWS và sau đó họ có thể sử dụng Máy chủ chuyên dụng.
* Máy chủ chuyên dụng được sử dụng để giải quyết các yêu cầu tuân thủ và giảm máy chủ lưu trữ bằng cách cho phép sử dụng giấy phép máy chủ ràng buộc máy chủ hiện có của bạn.
* Nó có thể được mua dưới dạng Đặt chỗ với giá giảm tới 70% theo yêu cầu(On-Demand).

## Tài liệu tham khảo
1. https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Instances.html
2. https://cafedev.vn/