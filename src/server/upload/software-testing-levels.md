Có nhiều cấp độ khác nhau trong quá trình thử nghiệm. Bài viết này sẽ chia sẻ ngắn gọn về định nghĩa của các cấp độ kiểm thử đó.

![](https://images.viblo.asia/26af80e3-7e9d-4930-a53e-08a3ea7af88e.png)

### 1. Unit Testing

Loại thử nghiệm này được thực hiện bởi nhà phát triển  trước khi thiết lập được bàn giao cho nhóm đảm bảo chất lượng để chính thức thực hiện các trường hợp thử nghiệm. 

Kiểm thử đơn vị được thực hiện trên các đơn vị riêng lẻ của source code. Các nhà phát triển sử dụng dữ liệu thử nghiệm khác với dữ liệu thử nghiệm của nhóm đảm bảo chất lượng.

Mục tiêu của kiểm thử đơn vị là cô lập từng phần của chương trình và chỉ ra rằng các phần riêng lẻ hoạt động chính xác về các yêu cầu và chức năng.


**Hạn chế của Unit Testing**

Unit Testing không thể bắt từng lỗi trong ứng dụng, không thể đánh giá mọi kịch bản xảy ra trong mọi ứng dụng phần mềm. 

Có giới hạn về số lượng kịch bản và dữ liệu thử nghiệm mà nhà phát triển có thể sử dụng để xác minh mã nguồn. Sau khi đã hết tất cả các tùy chọn, không còn lựa chọn nào khác ngoài việc dừng kiểm tra đơn vị và hợp nhất phân đoạn mã với các đơn vị khác.

### 2. Integration Testing

Integration Testing được định nghĩa là kiểm tra các phần kết hợp của ứng dụng để xác định xem chúng có hoạt động chính xác không. 

Kiểm thử tích hợp có thể được thực hiện theo hai cách: Thử nghiệm tích hợp từ dưới lên và thử nghiệm tích hợp từ trên xuống.


| No |  Integration Testing Method | 
| -------- | -------- | -------- |
| 1     | Tích hợp từ dưới lên: Thử nghiệm này bắt đầu bằng thử nghiệm đơn vị, tiếp theo là thử nghiệm kết hợp các đơn vị cấp cao hơn được gọi là mô-đun hoặc bản build.     | Text     |
| 2     | Tích hợp từ trên xuống: Trong thử nghiệm này, các mô-đun cấp cao nhất được thử nghiệm trước và dần dần, các mô-đun cấp thấp hơn sẽ được thử nghiệm sau đó.     | Text     |



Trong môi trường phát triển phần mềm toàn diện, kiểm tra từ dưới lên thường được thực hiện trước, sau đó là kiểm tra từ trên xuống. 
Quá trình kết thúc với nhiều thử nghiệm của ứng dụng hoàn chỉnh, tốt nhất là trong các tình huống được thiết kế để bắt chước các tình huống thực tế.

### 3. System Testing

 System Testing là kiểm tra toàn bộ hệ thống. Khi tất cả các thành phần được tích hợp, toàn bộ ứng dụng sẽ được kiểm tra nghiêm ngặt để thấy rằng nó đáp ứng các tiêu chuẩn chất lượng.

System Testing rất quan trọng vì những lý do sau:

- System Testing là bước đầu tiên trong Vòng đời phát triển phần mềm, trong đó toàn bộ ứng dụng được kiểm tra.
- Ứng dụng sẽ được kiểm tra kỹ lưỡng để xác minh rằng nó đáp ứng các thông số kỹ thuật và chức năng.
- Ứng dụng được thử nghiệm trong một môi trường rất gần với môi trường thực tế nơi ứng dụng sẽ được triển khai.

### 4. Regression Testing

Bất cứ khi nào có thay đổi trong ứng dụng phần mềm, có thể các chức năng khác trong ứng dụng đã bị ảnh hưởng bởi thay đổi này.  Mục đích của Regression Testing là để đảm bảo rằng một sự thay đổi, chẳng hạn như sửa lỗi sẽ không dẫn đến một lỗi khác được phát hiện trong ứng dụng.

Regression Testing rất quan trọng vì những lý do sau:
- Giảm thiểu các lỗ hổng trong ứng dụng khi có các thay đổi được thực hiện.
- Kiểm tra các thay đổi mới để xác minh rằng các thay đổi được thực hiện không ảnh hưởng đến bất kỳ khu vực nào khác của ứng dụng.
- Phạm vi kiểm tra được tăng lên mà không ảnh hưởng đến thời gian .
- Tăng tốc độ để tiếp thị sản phẩm.

### 5. Acceptance Testing

Đây được cho là loại thử nghiệm quan trọng nhất, vì nó được thực hiện bởi Nhóm Đảm bảo chất lượng (Quality Assurance Team), người sẽ đánh giá xem ứng dụng có đáp ứng các thông số kỹ thuật dự định hay không và đáp ứng yêu cầu của khách hàng. 

Nhóm QA sẽ có một tập hợp các kịch bản được viết sẵn và các trường hợp thử nghiệm sẽ được sử dụng để kiểm tra ứng dụng.

Nhiều ý tưởng sẽ được chia sẻ về ứng dụng và nhiều thử nghiệm có thể được thực hiện trên nó để đánh giá độ chính xác của nó và lý do tại sao dự án được bắt đầu. Các bài kiểm tra chấp nhận không chỉ nhằm chỉ ra các lỗi chính tả đơn giản, lỗi thẩm mỹ hoặc các lỗ hổng giao diện, mà còn chỉ ra bất kỳ lỗi nào trong ứng dụng sẽ dẫn đến sự cố hệ thống hoặc lỗi lớn trong ứng dụng.

Bằng cách thực hiện các thử nghiệm chấp nhận trên một ứng dụng, nhóm thử nghiệm sẽ giảm cách ứng dụng sẽ thực hiện trong sản xuất. Ngoài ra còn có các yêu cầu pháp lý và hợp đồng để chấp nhận hệ thống.

![](https://images.viblo.asia/330b71e7-8470-432a-afc1-c5ac1c8ce9d9.png)

### 6. Alpha Testing

Thử nghiệm này là giai đoạn thử nghiệm đầu tiên và sẽ được thực hiện giữa các đội (developer and QA teams). Kiểm thử đơn vị, kiểm thử tích hợp và kiểm tra hệ thống (Unit testing, Integration testing and System testing) khi kết hợp với nhau được gọi là kiểm tra Alpha. 

### 7. Beta Testing

Thử nghiệm này được thực hiện sau khi thử nghiệm Alpha đã được thực hiện thành công. Thử nghiệm Beta còn được gọi là thử nghiệm trước khi phát hành. Các phiên bản thử nghiệm Beta của phần mềm được phân phối lý tưởng cho nhiều đối tượng trên Web, một phần để cung cấp cho chương trình thử nghiệm "thế giới thực" và một phần để cung cấp bản xem trước của phiên bản tiếp theo. Trong giai đoạn này, người dùng sẽ được thử nghiệm như sau:
- Người dùng sẽ cài đặt, chạy ứng dụng và gửi phản hồi của họ cho nhóm dự án. Lỗi đánh máy, dòng ứng dụng khó hiểu và thậm chí là sự cố.
- Nhận được phản hồi, nhóm dự án có thể khắc phục các sự cố trước khi phát hành phần mềm cho người dùng thực tế.
- Bạn càng khắc phục được nhiều vấn đề giải quyết vấn đề người dùng thực, chất lượng ứng dụng của bạn sẽ càng cao.

Có một ứng dụng chất lượng cao hơn khi bạn phát hành nó sẽ làm tăng sự hài lòng của khách hàng.

### 8. Non-Functional Testing

![](https://images.viblo.asia/a7d05542-0956-460e-9cd2-9e609021245a.png)

Phần này dựa trên việc kiểm tra một ứng dụng từ các thuộc tính phi chức năng của nó. Kiểm tra phi chức năng bao gồm kiểm tra một phần mềm từ các yêu cầu không có chức năng về bản chất nhưng quan trọng như hiệu suất, bảo mật, giao diện người dùng, v.v.

Một số loại thử nghiệm phi chức năng quan trọng và thường được sử dụng sẽ được trình bày dưới đây.

**Performance Testing**

Nó chủ yếu được sử dụng để xác định bất kỳ tắc nghẽn hoặc vấn đề hiệu suất hơn là tìm lỗi trong phần mềm. Có nhiều nguyên nhân khác nhau góp phần làm giảm hiệu suất của phần mềm.
- Độ trễ mạng
- Xử lý phía khách hàng
- Xử lý giao dịch cơ sở dữ liệu
- Cân bằng tải giữa các máy chủ
- Kết xuất dữ liệu

Kiểm tra hiệu suất được coi là một trong những loại thử nghiệm quan trọng và bắt buộc về các khía cạnh sau.
- Tốc độ (tức là Thời gian đáp ứng, hiển thị và truy cập dữ liệu)
- Sức chứa
- Ổn định
- Khả năng mở rộng

Kiểm tra hiệu suất có thể là định tính hoặc định lượng và có thể được chia thành các loại phụ khác nhau như Load testing and Stress testing.

**Load testing**

Đây là một quá trình kiểm tra hành vi của một phần mềm bằng cách áp dụng tải tối đa về mặt truy cập phần mềm và thao tác dữ liệu đầu vào lớn. Nó có thể được thực hiện ở cả điều kiện tải bình thường và cao điểm. Loại thử nghiệm này xác định dung lượng tối đa của phần mềm và hành vi của phần mềm vào thời gian cao điểm.

**Stress testing**

Stress testing bao gồm kiểm tra hành vi của một phần mềm trong điều kiện bất thường. 

Ví dụ: nó có thể bao gồm lấy đi một số tài nguyên hoặc áp dụng tải vượt quá giới hạn tải thực tế.

Mục đích của Stress testing là kiểm tra phần mềm bằng cách áp dụng tải cho hệ thống và tiếp quản các tài nguyên được sử dụng bởi phần mềm để xác định điểm phá vỡ. Thử nghiệm này có thể được thực hiện bằng cách thử nghiệm các kịch bản khác nhau như:

* Tắt hoặc khởi động lại các cổng mạng một cách ngẫu nhiên

* Bật hoặc tắt cơ sở dữ liệu

* Chạy các quy trình khác nhau tiêu tốn tài nguyên như CPU, bộ nhớ, máy chủ, v.v.

**Security Testing**
Kiểm tra bảo mật bao gồm kiểm tra một phần mềm để xác định bất kỳ sai sót và lỗ hổng nào từ quan điểm bảo mật và lỗ hổng. Dưới đây là các khía cạnh chính mà kiểm tra bảo mật cần đảm bảo.



Nguồn tham khảo: https://www.tutorialspoint.com/software_testing/software_testing_levels.htm