# Hướng dẫn tạo EC2 Instance Amazon
<br>
<br>
<br>

### I. Giới thiệu Amazon EC2 là gì?
<br>
<br>

**1. Amazon EC2 là gì**

Amazon EC2 (Elastic Cloud) là một trong những gói dịch vụ của AWS cung cấp giải pháp điện toán đám mây cho phép người dùng có thể tạo, thiết lập và sử dụng một server một cách dễ dàng.
 
Do Amazon EC2 là một giải pháp điện toán đám mây nên nó giảm tối thiểu các bước cài đặt và cấu hình một server. Ngoài ra, khi có nhu cầu người dùng có thể dễ dàng scale công năng của server một cách dễ dàng. Điều này rất khó khăn nếu bạn mua và setup một server vật lý.

<br>
 
**2. Amazon EC2 Instance là gì**
 
Amazon EC2 Instance là một cloud server. Với một tài khoản bạn có thể tạo và sử dụng nhiều Amazon EC2 Instance. Các Amazon EC2 Instance được chạy trên cùng một server vật lý và chia sẻ memory, CPU, ổ cứng... Tuy nhiên do tính chất của cloud service nên mỗi một Instance được hoạt động giống như một server riêng lẻ.

<br>
<br>

### II. Các thao tác tạo EC2 Instance Amazon

<br>
<br>

**Bước 1:** 

<br>
Sau khi đăng nhập thành công tài khoản aws và vào giao diện AWS Management Console, chọn region. Đây chính là khu vực địa lý mà bạn sẽ khởi tạo EC2. Mình thì đang chọn US West (Oregon)

<br>

![](https://images.viblo.asia/58fb52e4-fced-4a85-8be2-10a26e931b8e.png)

<br>

**Bước 2:**
<br>

Từ service chọn EC2

<br>

![](https://images.viblo.asia/84aafc6f-2805-4160-a990-99518ea971b6.png)

<br>

**Bước 3:** 

<br>

Từ EC2 Console -> Instances -> Launch Instance

<br>

![](https://images.viblo.asia/ec735b75-99cd-411b-a153-b222e05ee708.png)

<br>

**Bước 4: Chọn OS - AMI**

<br>

AMI là một file image hệ điều hành đã được AWS cài đặt các phần mềm OS cần thiết theo nhu cầu đóng gói thành template cho bạn sử dụng.

Ta thấy AWS cung cấp khá nhiều các AMI khác nhau. Tùy vào nhu cầu của hệ thống cũng như mong muốn của người sử dụng mà ta sẽ lựa chọn chúng. Để sử dụng ta chỉ cần select là xong
<br>

![](https://images.viblo.asia/4e5ee2d8-567b-4c2d-8cdd-271891ee0d35.png)

<br>

**Bước 5: Chọn Instance type**

<br>

**Instance type**: Bạn cần lựa chọn các thông số phần cứng cho instance của bạn.

Như của mình đang sử dụng tài khoản miễn phí 12 tháng của AWS Free Tier.

<br>

![](https://images.viblo.asia/de184109-eea7-4f96-9579-3008cee56257.png)

<br>

Ấn Next: Configure Instance Details

<br>

**Bước 6: Configure Instance** 

<br>

Ở đây là các cấu hình cho instance mà chúng ta sẽ tạo ra. 
Để hiểu hơn về các thông số, các bạn có thể bấm vào biểu tượng chữ "i" (information) cạnh các thông số.

<br>

![](https://images.viblo.asia/f05ad899-e1ce-4344-b5b1-9ad420021c62.png) 

<br>

Sau khi cấu hình xong ta chọn Next: Add Storage

<br>

**Bước 7: Add storage**

<br>

Bước này là bước mình chọn ổ cứng/ loại ổ cứng và dung lượng.
Có một số lưu ý tùy chọn:

**Delete on termination**: Nếu mình chọn tùy chọn này thì ổ cứng sẽ bị xóa khi ta terminate instance

<br>

![](https://images.viblo.asia/7fa51677-7bc0-443f-9cb0-6521d35bce56.png)

<br>

Cuối cùng ta chọn nút: Next Add Tags

<br>

**Bước 8: Add tags**

<br>

AWS cho phép ta gán tag cho EC2 với mục đích là quản lý các instance, dịch vụ một cách dễ dàng hơn

<br>

![](https://images.viblo.asia/c493348a-b0fa-428b-bf88-c8b4f7fa4b1c.png)

<br>

Xong xuôi ta tiếp tục ấn Next: Configure Security Group

<br>

**Bước 9: Configure Security Group**

<br>

Ở bước này có một lưu ý:

Trong phần source là địa chỉ IP nguồn được phép truy cập vào Instance. Nếu để mặc định hoặc giá trị 0.0.0.0/0 thì tất cả IP public đều có thể truy cập vào port dịch vụ instance

<br>

![](https://images.viblo.asia/a148ba86-203c-4d5c-bc1b-38529f62f590.png)

<br>

Cuối cùng ấn  Review and Launch

<br>

**Bước 10: Review and Launch**

<br>

Bước này cho phép ta review lại toàn bộ các cấu hình của mình . Nếu mọi thứ đều đúng thì bấm nút Launch 

<br>

![](https://images.viblo.asia/33e5c3b0-1d1e-4c64-a3ca-77cafd77fb5a.png)

<br>

Sau đó AWS sẽ hỏi bạn có muốn sử dụng KeyPair không? (Dùng để kết nối ssh đến Instance). Nếu chưa có thì ta cần Create new keypair rồi download về máy. Đó chính là một file .pem

<br>

![](https://images.viblo.asia/f37bab51-ccbd-4960-bb33-a9277f52d818.png)

<br>

Sau khi xong xuôi bấm launch Instances

Kết quả sau khi hoàn thành việc tạo instance là đây

<br>

![](https://images.viblo.asia/bcd3b808-fb76-4d6d-8a4f-d3751686508f.png)

<br>

### Như vậy là mình đã hướng dẫn các bạn cài xong EC2 Amazon Instance. Hi vọng bài viết của mình sẽ hữu ích đối với các bạn.