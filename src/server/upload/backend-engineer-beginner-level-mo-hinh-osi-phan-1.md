![image.png](https://images.viblo.asia/ae6a3d80-e7a3-431e-9af6-a27c0acc6b95.png)
# **NỘI DUNG**
1. Giới thiệu về Mô hình OSI (Open Systems Interconnection)
2. Cấu trúc và Phương thức hoạt động của Mô hình OSI
3. Tổng kết

## 1. Giới thiệu về Mô hình OSI (Open Systems Interconnection)
Trong con đường tìm hiểu để trở thành 1 Backend Engineer thì mình thấy đa số mọi người thường ít quan tâm đến Mô hình OSI nhất nên hôm nay mình sẽ giới thiệu cho mọi người về Mô hình này một cách ngắn gọn và dễ hiểu nhất.

![image.png](https://images.viblo.asia/394b922e-7f30-46ac-981f-b2d3ad25d88a.png)

Mình sẽ lấy ví dụ đây là một hệ thống mạng của 1 quán caffe gồm 1 **Router A** và 4 thiết bị đang kết nối là **Desktop B, Laptop C, Smart Phone D, Smart Watch F** đang trao đổi và kết nối với **Router A** bằng giao thức **HTTP**. Thì các bạn có thể thấy mỗi thiết bị trong mạng sẽ chắc chắn có các thông tin sau nếu muốn kết nốt với **Router A**.

 **Laptop C** 
- MAC Address: XYZ (Địa chỉ vật lý của thiết bị)
- IP Address: 10.0.0.3 (Địa chỉ IP của thiết bị trong mạng)

Và nhờ các thông tin trên mà khi kết nối với **Router A** thì **Laptop C** đang truy cập đến các trang web, API thông qua giao thức **HTTP** . Và hệ thống mạng của quán caffe đang hoạt động được là nhờ **Mô hình OSI**. Mô hình cho phép sự tương giao (**interoperability**) giữa các hệ máy (**platform**) đa dạng được cung cấp bởi các nhà sản xuất khác nhau. Mô hình cho phép tất cả các thành phần của mạng hoạt động hòa đồng, bất kể thành phần ấy do ai tạo dựng.

**=> Vậy Mô hình OSI là Mô hình kết nối các hệ thống mở**

## **2. Cấu trúc và Phương thức hoạt động của Mô hình OSI**
![image.png](https://images.viblo.asia/9664e828-f25c-40e3-8455-e11d0c0a9349.png)

a, Cấu trúc Mô hình OSI

Mô hình OSI thì được cấu trúc theo các tầng và gồm **7 tầng** và nếu là 1 **Request** thì mô hình sẽ hoạt động từ **7 -> 1** và là **Response** thí mô hình sẽ hoạt động từ **1 -> 7**.

1. **Application layer** (Tầng ứng dụng)
2. **Presentation layer** (Tầng trình bày)
3. **Session layer** (Tầng phiên)
4. **Transport layer** (Tầng vận chuyển)
1. **Network layer** (Tần Mạng)
1.  **Datalink layer** (Tầng Liên kết)
1. **Physical layer** (Tầng Vật lý)

*(Còn phần 2)*