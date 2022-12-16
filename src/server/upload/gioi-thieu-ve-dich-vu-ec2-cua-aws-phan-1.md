Hôm nay, mình lại quay lại với series chia sẻ các kiến thức về cloud. Nội dung quan trọng tiếp theo của AWS đó là dịch vụ compute EC2.

Bài này mình sẽ giới thiệu về dịch vụ EC2, về các dòng máy, các kiểu trả phí của dịch vụ này. Bạn muốn hiểu sâu hơn về AWS, hãy đọc phần 2 nhé.

## 1. WHAT IS EC2 ?

- EC2 viết tắt của từ **E**LASTIC **C**LOUD **C**OMPUTE = **EC2**
- EC2 cung cấp các máy tính để thực hiện việc tính toán, chúng ta chỉ có thể điều khiển nó từ xa thông qua SSH, RDP, ...
- Các máy tính này đều cung cấp một giao diện web, gọi là web console, được ảo hóa từ các hạ tầng của AWS, và được cung cấp cho người dùng dưới dạng dịch vụ thông qua Internet.
- Mỗi máy ảo được gọi là 1 instance. Mỗi instance được cấp một lượng phần cứng nhất định, như CPU, RAM, phụ thuộc vào dòng instance nào.

![](https://images.viblo.asia/09cbb0fa-b3a5-4224-90a8-f131592d0120.png)

## 2. INSTANCE TYPE, INSTANCE FAMILY ?
Có 5 dòng EC2:
| General Purpose | Compute Optimized | Memory Optimized | Accelerated Compute | Storage Optimized |
| -------- | -------- | -------- |-------- |-------- |

### 1. General Purpose
![](https://images.viblo.asia/035da7b8-5a11-4ba4-952d-665d80a8c498.png)

* Đúng như tên gọi loại này được dùng cho **mục đích chung**.
* Thường dùng cho Bastion, Workspace.
* Khối lượng công việc không quá đặc biệt.
* Mặt bằng giá rẻ hơn các dòng khác

### 2. Compute Optimized
![](https://images.viblo.asia/353b55c8-8dd3-4626-8e8f-4e1190fc0571.png)

*  C = CPU
* Sử dụng cho các tác vụ phải phân tích, tính toán, xử lý nhiều, dùng nhiều core CPU.
* Tỉ lệ CPU/RAM cao so với các dòng khác
* Chi phí cho mỗi core CPU là rẻ nhất.

### 3. Memory Optimized
![](https://images.viblo.asia/e4c91fd7-5a48-48fe-b21e-72e89bb2daeb.png)

* R = RAM
* Dùng cho các tác vụ sử dụng nhiều memory như Database, Cache, ...
* Tỉ lệ RAM/CPU cao so với các dòng khác
* Chi phí trên mỗi GB/RAM là rẻ nhất.

### 4. Accelerated Compute
![](https://images.viblo.asia/2600ec4a-e94b-4380-a89b-789e6a903a13.png)

* Chuyên cho các tính toán hiệu năng cao như AI, Deep Learning, Video Encoder
* Cung cấp GPU khủng cho các tính toán phức tạp.

### 5. Storage Optimized
![](https://images.viblo.asia/4285f620-a039-47c0-af04-9c7835e30234.png)

* Sử dụng cho các tác vụ đọc ghi vào ổ đĩa có tốc độ cao
* Thông lượng đĩa cao
* Như MapReduce, Hadoop, Distributed File System


-----


Trong thực tế, khi xây dựng hạ tầng trên Cloud, bài toán tối ưu chi phí rất quan trọng. Việc lựa chọn đúng dòng máy, cấu hình sẽ làm tối ưu hóa chi phí cho hạ tầng.

Chúng ta cũng có thể sử dụng công cụ CloudWatch để theo dõi, giám sát việc sử dụng tài nguyên của hệ thống. Dựa vào các thông số thu thập được như CPU, Network, IO. Từ đó có thể là căn cứ để chọn một instance phù hợp.

## 3. PRICING MODEL
AWS có những kiểu trả phí sau:

### 1. On-demand
- Dùng bao nhiêu trả bấy nhiêu.
- Không mất chi phí ban đầu.
- Không có ràng buộc.

-----
Sử dụng on-demand nếu ta muốn sử dụng các instance:

* trong một thời gian ngắn, 
* với mục đích là testing, development.
* ứng dụng không dự đoán đc workload

### 2. Reserved Instance
- Đặt trước một lượng tài nguyên compute của AWS cho dịch vụ của mình. AWS sẽ đảm bảo tài nguyên cho bạn và không ai được động vào phần tài nguyên đó
- Nắm rõ hệ thống workload là bao nhiêu
- Hình thức trả phí này bạn phải thanh toán trước.
- Cam kết thời hạn at least 1 năm
- Thanh toán càng nhiều, càng được giảm nhiều, tiết kiệm khoảng 40 - 60% chi phí. Tùy thuộc vào số tiền bạn trả trước là bao nhiêu và thời hạn.

### 3. Spot Instance
- Hiếm khi tài nguyên của AWS được sử dụng hết 100%, nên sẽ có những tài nguyên dư thừa, AWS đã đề xuất hình thức này => vừa tiết kiệm cho KH, giảm sự lãng phí với tài nguyên đang nhàn rỗi của mình.
- Bạn đưa ra 1 mức giá mà bạn sẵn sàng trả cho 1h chạy instance, gọi là Bid Price.
- Amazon sẽ đưa ra một mức giá, gọi là Spot Price. Là Giá cho mỗi giờ chạy Spot Instance.
- Khi Spot Price thay đổi, và < hơn Bid Price, instance sẽ được chạy theo yêu cầu. 
- Giá Spot thay đổi định kì, 1h 1 lần, phụ thuộc vào nhu cầu sử dụng tài nguyên của EC2. 
- Khi nhu cầu sử dụng của EC2 tăng lên, hoặc AWS hết tài nguyên, Spot Price sẽ tăng lên, khi nó > hơn Bid Price. Instance sẽ bị terminate, xóa đi, trả lại tài nguyên cho AWS.
- Thông thường những ứng dụng chạy Spot Instance phải xử lý việc bị stop đột ngột, không bị mất mát dữ liệu, và tiếp tục cho đến khi instance hoạt động lại.

Như vậy là mình đã giới thiệu tổng quan dịch vụ EC2, các mô hình trả phí. Để việc đọc hiệu quả, mình xin chia sẻ sâu hơn về EC2 ở bài viết sau. 

Để hiểu hơn, các bạn hãy thực hành với 1 instance, lưu ý những chi phí có thể phát sinh. Lời khuyên là các bạn nên review lại và remove hết các instance mà mình đã tạo. 

Thanks for reading, welcome your feedback and see you!