Bài viết này là tiếp nối của phần trước [HƯỚNG DẪN TỪNG BƯỚC TẠO EC2 INSTANCE TRONG AWS](https://viblo.asia/p/huong-dan-tung-buoc-tao-ec2-instance-trong-aws-4dbZNYk8KYM) 

## A. Spot instance là gì

*Một Spot Instance là một đề nghị từ AWS; nó cho phép một AWS business trả giá trên tính toán dung lượng  AWS chưa sử dụng. Giá hàng giờ cho một phiên bản Spot được quyết định bởi AWS và nó dao động tùy thuộc vào cung và cầu đối với các phiên bản Spot.*

Spot instance chạy bất cứ khi nào giá thầu của bạn vượt quá giá thị trường hiện tại. Giá của một Spot Instance thay đổi dựa trên loại Instance và vùng sẵn sàng trong đó instance có thể được cung cấp.

Khi giá thầu vượt quá giá trên thị trường của instance được gọi là “giá giao ngay”, instance của bạn vẫn chạy. Khi giá giao ngay vượt quá giá thầu, AWS sẽ tự động chấm dứt íntance của bạn. Do đó, cần thiết  lập kế hoạch các trường hợp các spot instance trong kiến trúc ứng dụng của bạn một cách cẩn thận.


## B. Tạo một Spot request

Để khởi chạy một Spot instance, trước tiên bạn phải tạo Spot request.

Thực hiện theo các bước dưới đây để tạo Spot request:

- Trên Dashboard của EC2, chọn “Spot Requests” từ khung bên trái bên dưới Instance.
- Nhấp vào nút “Request Spot Instances” như ảnh bên dưới.

![](https://images.viblo.asia/ad92badb-2ea4-4210-a7be-63a885bbaf51.png)

Màn hình Spot instance launch wizard sẽ mở ra. Bây giờ bạn có thể tiếp tục với việc chọn các tham số và cấu hình instance.

### 1. Tìm loại Instance

Bước đầu tiên là "Find instance types"

![](https://images.viblo.asia/a41ac9b0-56de-4d8d-b638-07462fcfb0e9.png)

**Bước 1**. Chọn một AMI

AMI là một mẫu bao gồm nền tảng và phần mềm được cài đặt trong instance. Chọn AMI mong muốn từ danh sách hiện có. 
Ở ví dụ, đang chọn Amazon Linux AMI.

![](https://images.viblo.asia/1ae2b28e-7471-41e3-aab6-361ab805d3ea.png)

**Bước 2**. Chọn Capacity Unit 

Capacity Unit: là yêu cầu ứng dụng. Bạn có thể quyết định khởi chạy một Instance dựa trên loại Instance, vCPU hoặc Customize your unit như lựa chọn về các yêu cầu vCPU / bộ nhớ / lưu trữ.
Ở ví dụ, đang chọn một Instance.

![](https://images.viblo.asia/80d33534-e8ab-4f50-8793-02f1bffcd5fe.png)

Nếu bạn muốn tùy chỉnh dung lượng, bạn có thể thêm lựa chọn

- vCPU
- Memory
- Instance storage

![](https://images.viblo.asia/710adf04-3a1f-44a7-93c2-8cfdaf3a6324.png)

**Bước 3**. Target Capacity

Target Capacity mô tả số lượng spot instance bạn muốn duy trì trong yêu cầu. 

Ở ví dụ này, đang chọn 1.

![](https://images.viblo.asia/0e7339a5-3aa6-499c-91d2-7c86912f5361.png)

**Bước 4**. Bid Price

Giá thầu - đây là mức giá tối đa sẵn sàng trả cho instance. Chúng ta sẽ đặt một mức giá cụ thể cho mỗi instance (giá tính trong 1 giờ). Đây là cách đơn giản nhất để tính toán dựa trên yêu cầu kinh doanh của chúng ta. Chúng ta sẽ thấy trước cách chúng ta nên xác định giá thầu để giá thầu của chúng ta luôn duy trì ở mức cao và không vượt quá spot price để instance của chúng ta tiếp tục chạy.

![](https://images.viblo.asia/db08d4ed-4912-4665-aff6-16082f81123d.png)

### 2. Cấu hình Spot instance

Bước tiếp theo là định cấu hình Instance, trong bước này của trình hướng dẫn, sẽ định cấu hình các tham số phiên bản như VPC, subnets, v.v.

**Bước 1**. Allocation Strategy

Chiến lược phân bổ -  nó quyết định làm thế nào yêu cầu tại chỗ của bạn được thực hiện từ nhóm tại chỗ của AWS. Có hai loại chiến lược:

- Diversified: Đa dạng - ở đây, các thể hiện tại chỗ được cân bằng trên tất cả các nhóm tại chỗ
- Lowest price: Giá thấp nhất - tại đây, các phiên bản giao ngay được đưa ra từ nhóm có ưu đãi giá thấp nhất

Đối với hướng dẫn này, chúng tôi sẽ chọn Giá thấp nhất làm chiến lược phân bổ của chúng tôi.

![](https://images.viblo.asia/195a8133-c832-402b-82aa-fcf99c2864eb.png)

**Bước 2**. Chọn VPC

Chúng ta sẽ chọn từ danh sách các VPC có sẵn mà chúng ta đã tạo trước đó. Chúng ta cũng có thể tạo một VPC mới trong bước này.

![](https://images.viblo.asia/2e65b0d2-370f-413b-9a37-737d1af54660.png)

**Bước 3**. Security group

Tiếp theo, chúng tôi sẽ chọn nhóm bảo mật. Chúng ta có thể chọn một SG đã có sẵn hoặc tạo một SG mới.

![](https://images.viblo.asia/619d6c69-9473-462a-a967-ef46245246dc.png)

**Bước 4**. Availability Zone

Vùng khả dụng - chúng ta sẽ chọn AZ nơi chúng ta muốn đặt instance của chúng ta dựa trên kiến trúc ứng dụng. 
Ở ví dụ, đang chọn AZ- us-East-1a.

![](https://images.viblo.asia/749eb614-84de-4d0a-9f03-3e49d8489e71.png)

**Bước 5**. Subnets

Mạng con- chúng ta sẽ chọn mạng con từ danh sách danh sách đã có sẵn của chúng ta.

![](https://images.viblo.asia/d87a35cc-01b4-44ed-8d74-c8b8e0b76bf4.png)

**Bước 6**. Public IP

Chúng ta sẽ chọn gán IP công khai ngay khi nó khởi chạy. Trong bước này, bạn có thể chọn nếu bạn muốn AWS tự động gán IP hoặc bạn muốn thực hiện thủ công sau đó. Bạn cũng có thể bật / tắt tính năng “Auto assign Public IP” ở bước này.

![](https://images.viblo.asia/010ed500-96a7-4485-9efa-27db6443944b.png)

**Bước 7**. Key pair

Cặp khóa- Cặp khóa là một bộ khóa công khai.

AWS lưu trữ khóa riêng trong instance, và bạn được yêu cầu tải xuống khóa công khai. Hãy chắc chắn rằng bạn tải xuống khóa và giữ nó an toàn và bảo mật; Nếu nó bị mất, bạn không thể tải lại.

Sau khi chọn IP công khai, ở đây chúng tôi đang chọn một khóa mà chúng tôi đã tạo trong hướng dẫn trước.

![](https://images.viblo.asia/a74f3350-0c27-4ea1-9ef4-a8f110e44377.png)

### 3. Review

Khi hoàn tất việc xác định cấu hình yêu cầu spot instance trong 2 bước trước đó trong trình hướng dẫn. Ở bước này sẽ xem xét cấu hình tổng thể của instance

![](https://images.viblo.asia/d92273e8-a4b9-404c-8118-1467580db4a7.png)

Chúng ta có thể tải file JSON chứa tất cả các cấu hình. Mẫu file JSON bên dưới:

![](https://images.viblo.asia/c894ea4f-3876-40a7-9ce0-68710754cab3.png)

Sau khi kiểm tra xong, chúng ta có thể tiến hành khởi chạy bằng cách nhấn vào nút “Launch”

![](https://images.viblo.asia/0973e0f5-dab1-441b-80a9-ce93bf9650dd.png)

Khi nhấn vào Launch, sẽ hiển thị thông báo yêu cầu tạo 

![](https://images.viblo.asia/16441c91-9dd3-4160-a4f5-e710d3df378a.png)

Trình hướng dẫn tạo spot instance sẽ đóng và trang sẽ tự động quay trở lại Bảng điều khiển EC2.

Bạn có thể thấy hiển thị bên dưới rằng Trạng thái yêu cầu đang là “open”, có nghĩa là nó đang được đánh giá từ phía AWS. AWS EC2 sẽ kiểm tra xem phiên bản bắt buộc có sẵn trong nhóm tại chỗ không.

![](https://images.viblo.asia/8d32dbfa-7312-4148-aa72-a5362d825fde.png)

Sau một vài phút, bạn có thể thấy trạng thái được thay đổi thành “active” và bây giờ spot request đã được thực hiện thành công. Bạn có thể lưu ý các thông số cấu hình dưới đây.

![](https://images.viblo.asia/a5ec7c39-ac0b-4754-b191-cf2be1e1b0c0.png)

*Tóm tắt:*

Trên đây là các bước thực hiện để tạo 1 spot instance. Các Spot instance là một cách tuyệt vời để tiết kiệm chi phí cho các trường hợp không phải là ứng dụng quan trọng. Một ví dụ phổ biến là tạo ra một nhóm các trường hợp tại chỗ cho một tác vụ như xử lý hình ảnh hoặc mã hóa video. Trong những trường hợp như vậy, bạn có thể giữ một cụm các instance dưới một bộ cân bằng tải.

Nếu giá thầu vượt quá giá giao ngay và instance của bạn bị chấm dứt từ phía AWS, bạn có thể có các instance khác thực hiện công việc xử lý cho bạn. Bạn có thể tận dụng tỷ lệ tự động mở rộng cho kịch bản này. Tránh sử dụng các phiên bản Spot cho các ứng dụng quan trọng trong kinh doanh như cơ sở dữ liệu, v.v.

*Tài liệu tham khảo:*

https://www.guru99.com/creating-amazon-ec2-instance.html