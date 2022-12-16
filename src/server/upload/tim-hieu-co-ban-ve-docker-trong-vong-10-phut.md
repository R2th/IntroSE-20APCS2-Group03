### 1. Docker là gì?
Docker là một nền tảng container hóa đóng gói ứng dụng của bạn và tất cả các phụ thuộc của nó với nhau dưới dạng một container docker để đảm bảo ứng dụng của bạn hoạt động trơn tru trong mọi môi trường.
![](https://images.viblo.asia/559bb7b9-688a-4d78-a346-8fc28bd7e6b6.png)
### 2. Ứng dụng
- Tạo ra các container cho các ứng dụng phần mềm
vd: container ở mức độ linux, mức độ JVM, application server,...
- Vận chuyển container đến các môi trường phát triển
- Chia sẻ container

### 3. Khẩu quyết
- **Build, ship and deploy any application, anywhere**
	+ Build: đóng gói ứng dụng trong 1 container
	+ Ship: vận chuyển container
	+ Deploy: triển khai, chạy container
	+ Bất cứ ứng dụng nào chạy đc trên Linux
	+ Tất cả mọi nơi: Laptop, máy chủ, máy ảo, cloud instance…
	Đặc điểm:
	+ Đóng gói phần mềm dễ dàng
	+ Deploy nhanh
	+ Không cần cấu hình và cài đặt môi trường rườm rà

Tình huống: Chúng ta thường xuyên thấy cảnh lấy code của đồng nghiệp về chạy và bị lỗi còn thằng kia bảo chạy trên máy nó ngon lành cành đào ???
Docker cung cấp giải pháp xử lý:
- **Image**: component để triển khai ứng dụng bao gồm mã nguồn, thư viện, framework, file
- **Trừu tượng hóa giải pháp và đóng gói vào 1 image kèm theo dependencies**
=> Tránh conflict môi trường triển khai
- **Batteries included but replaceable**
	+ 1 component có thể đc thay thế bằng cách implement cùng 1 interface có sẵn
	+ Docker tạo ra 1 Framework đc phân chia thành các mô-đun có khả năng mở rộng cao

### 4. Một số khái niệm cơ bản
- **Image**:
	+ Khuôn mẫu, lớp chứa các file cần thiết để tạo nên 1 container
	+ Chứa những tài nguyên có sẵn
	+ Không được tiếp cận vào CPU, memory, storage
- **Container**:
	+ Tồn tại trên host với 1 IP
	+ Đc deploy, chạy và xóa bỏ thông qua remote client
- **Docker engine**:
	+ Tạo và chạy container
	+ Chạy lệnh trong chế độ daemon
	+ Linux trở thành máy chủ Docker
	+ Container đc deploy, chạy và xóa bỏ thông qua remote client
- **Docker daemon**
	+ Tiền trình chạy ngầm quản lý các container
- **Docker client**
	+ Kiểm soát hầu hết các workflow của Docker
	+ Giao tiếp với các máy chủ Docker thông qua daemon
- **Docker Hub (Registry)**
	+ Chứa các component Docker
	+ Cho phép lưu, sử dụng, tìm kiếm image
	+ Vai trò "Ship"

### 5. Điểm mạnh
- **Deploy nhanh hơn**:
	+ Hệ thống augumented file system
	+ Thêm các layer bên trên root kernel
	vd: muốn deploy MongoDB thì ghi lên 1 lớp layer, muốn deploy NodeJS thì ghi lên 1 lớp layer khác phía trên
	+ Dễ dàng tổng hợp các layer thành 1
- **Độc lập**:
	+ Lỗi xảy ra với 1 container không ảnh hưởng đến các container khác
- **Cơ động**
	+ Tránh conflict môi trường
	+ Trao đổi giữa các máy
	+ Nhất quán khi chạy trên các máy khác
- **Chụp ảnh hệ thống (snapshot)**
	+ Lưu snapshot thành container hoặc image
	+ tag, đặt tên
	+ Clone 1 container từ snapshot
- **Kiểm soát việc sử dụng tài nguyên (CPU, RAM, storage,...)**
- **Đơn giản hóa sự phụ thuộc lẫn nhau giữa các ứng dụng (dependenc**y)
	+ Xác định dependency ở Dockerfile
- **Tính thuận tiện cho việc chia sẻ:**
	+ Chỉ cần truy cập Docker Hub (public/private registry)
	+ Dockerfile
### 6. Một số lầm tưởng
- KHÔNG phải là công cụ quản lý thiết lập hay thiết lập tự động
- KHÔNG phải giải pháp ảo hóa phần cứng (VMWware,...)
- KHÔNG phải là 1 nền tảng điện toán đám mây
- KHÔNG phải là 1 deployment framework
- KHÔNG phải là 1 công cụ quản lý workload
- KHÔNG phải là 1 môi trường phát triển

Nguồn tham khảo: 
1. https://nickjanetakis.com/blog/what-does-build-ship-and-run-any-app-anywhere-really-mean
2. https://techtalk.vn/blog/posts/docker-la-gi