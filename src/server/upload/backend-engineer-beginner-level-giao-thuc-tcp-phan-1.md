![image.png](https://images.viblo.asia/2d516df5-d0b9-4308-b3d1-05851662377c.png)
Trong bài viết này mình sẽ giới thiệu các bạn về giao thức TCP dưới góc nhìn của một lập trình viên Backend Engineer mình sẽ rút ra các cốt lõi đễ các bạn có thể dễ dàng nhớ mà không đi sâu về khái niệm gây khó hiểu.

## **1. Tổng quan về Giao thức TCP**

**Giao thức TCP** được cài đặt ở **tầng 4 Transport** và **Giao thức HTTP** được cài đặt ở **tầng 7 Application**  trong **Mô hì[](https://viblo.asia/p/backend-engineer-beginner-level-mo-hinh-osi-phan-1-Ljy5VDXVZra)nh OSI**.

![2021-08-31_16-33-35.png](https://images.viblo.asia/8be45d85-1acc-4d18-b9b7-f3d8dfe40230.png)

Theo như hình các bạn có thể thấy **Giao thức HTTP** được xây dựng bên trên **Giao thức TCP** nên giao thức HTTP sẽ có đầy đủ các đặc tính của TCP. Và lưu ý ở đây thì các Giao thức HTTP mà mình để cập ở đây là các Ver 1.0, 1.1, 2.0 **riêng 3.0** thì không còn dùng giao thức TCP nữa mà dùng **Giao thức QUIC**

## **2. Cách thức hoạt động của TCP**

Mình có 1 mô hình minh họa như sau:

![image.png](https://images.viblo.asia/374620f1-6c68-4474-a06b-8f3e3279fb98.png)

Ở đây mình có **1 máy tính cá nhân** và **1 máy chủ** và làm thế nào để 2 thiết bị này có thể giao tiếp được với nhau trong mạng máy tính sử dụng **Giao thức TCP**. Để TCP có thể truyền dữ liệu thì giữa 2 thiết bị sẽ phải có Tạo ra 1 kết nối **Connection** và để tạo ra một kết nối trên thì ta phải thực hiện **Quá trình Three-WayHandshake (Bắt tay ba bước)** để có thể khởi tạo được 1 kết nối **Connection**.

### *Quá trình Three-WayHandshake (Bắt tay ba bước)

**STEP 1:** Máy tính cá nhân sẽ gửi 1 tin nhắn **SYN** đến máy chủ gồm các thông tin:

+ **SEQ # (Sequence Number):** SEQ # là ở mỗi thiết bị sẽ có các dãy SEQ # dùng để **định danh cho tin nhắn** mà gửi ra từ nó và sẽ có 1 con số ngẫu nhiên được cấp phép cho SEQ # đầu tiên tức là tin nhắn đầu tiên của máy tính cá nhân và máy chủ, từ tin nhắn thứ 2 trở đi thì SEQ # sẽ tăng dần theo 1 logic nào đó. Trông ví dụ mình sẽ lấy là **9001** và mỗi lần **tăng 1 đơn vị**.
+ **ACK # (Acknowledgement Number):** là một con số chứa **SEQ # kế tiếp của thiết bị đích** (ở đây là máy chủ). Trông ví dụ vì là tin nhắn đầu tiên nên ACK # sẽ là 0.
+ **SYN # (SYN Number):** chỉ có 2 giá trị là **0 và 1**. Nếu là tin nhắn SYN thì sẽ là 1 và ngược lại không phải sẽ là 0. Trông ví dụ thì tin nhắn đầu là tin nhắn SYN nên sẽ là 1.

**=> Step 1** có ý nghĩa máy tính cá nhân hỏi máy chủ ***Bạn có muốn nói chuyện với tôi hay không ??***


**STEP 2:** Thì máy chủ sẽ trả lời tin nhắn yêu cầu của máy tính cá nhân bằng 1 tin nhắn **SYN-ACK** gồm các thông tin sau:

+ **SEQ # (Sequence Number):**  sẽ tương tự nhưng đây là SEQ #  của máy chủ. Trông ví dụ mình sẽ chọn là **5001** và mỗi lần **tăng 1 đơn vị**.
+ **ACK # (Acknowledgement Number):** sẽ tương tự trên nhưng là của Máy tính cá nhân. Trông ví dụ mình đã chọn là 9001 và tăng 1 đơn vị nên ở đây sẽ **là 9002**
+ **SYN # (SYN Number):** Trông ví dụ thì tin nhắn đầu máy chủ trả lời  là tin nhắn SYN-ACK nên sẽ là 1.

**=> Step 2** có ý nghĩa máy chủ trả lời máy tính cá nhân ***Tôi đồng ý nói chuyện với Bạn***

**STEP 3:** Khi máy tính cá nhân nhận được lời đồng ý thì sẽ gửi  tin nhắn ACK thông báo đã nhận được lời đông ý của máy chủ để tạo kết nối **Connection**, các thông tin gồm:
+ **SEQ # (Sequence Number):**  sẽ tương tự nhưng đây là SEQ #  của máy tính cá nhân là **9002**.
+ **ACK # (Acknowledgement Number):** sẽ tương tự trên nhưng là của Máy chủ là **5002**.
+ **SYN # (SYN Number):**  tin nhắn là ACK nên không còn là tin nhắn SYN nên sẽ là 0.

Vậy sau khi thực hiện quá trình **Three-WayHandshake** chúng ta đã tạo được kết nối **Connection** giữa máy tính cá nhân và máy chủ. Điều này giúp TCP có đặc điểm **Truyền thông tin dựa trên Connection Based**


### *Truyền thông tin trên kết nối Connection Based


Mình nghĩ 1 bài viết có thể bao gồm hết TCP nhưng chắc phải có thêm phần để mình truyền đạt đầy đủ rõ ràng về TCP. Hẹn các bạn bài viết sau =))