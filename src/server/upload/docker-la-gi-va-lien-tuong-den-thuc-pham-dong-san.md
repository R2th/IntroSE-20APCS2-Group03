# Docker?
> Docker là nền tảng giúp đóng gói và triển khai ứng dụng nhanh chóng

Hiểu nôm na,
* Docker sử dụng công nghệ ảo hóa, đóng gói tất cả tài nguyên, môi trường cần thiết để chạy ứng dụng của bạn trong một container.
* Container chia sẻ, dùng chung Ram, CPU với máy chủ (host OS) nhưng độc lập hoàn toàn về tài nguyên khác, biến môi trường, tiến trình, ... từ đó không ảnh hưởng đến máy chủ bên ngoài.
![](https://images.viblo.asia/6a6a2e67-2d96-4664-b71f-9c0f625ba998.png)
## Lợi ích của docker:
* Cài đặt dễ dàng: docker đã tối ưu việc cài đặt dễ dàng trên các nền tảng Mac OS, Windows, Linux, Tham khảo (Trang chủ Docker)
* Tốn ít tài nguyên: mỗi container chỉ đóng gói tối giản tài nguyên cần chạy cho ứng dụng, dung lượng có thể chỉ 1-2MB so với 5-10Gb của máy ảo truyền thống.
* Nhanh: Khởi động container không mất quá 5 giây.
* Đóng gói: Toàn bộ tài nguyên được đóng gói, không bị phụ thuộc bên ngoài.
* Mở rộng: từ việc đóng gói tuyệt vời nên khả năng mở rộng dễ dàng, ko rằng buộc, scale hệ thống nhanh gọn.
* Linh động, đồng nhất: Các lập trình viên có thể sử dụng mọi môi trường đế triển khai docker với cùng image, linh động trong khi deploy ứng dụng.


## Liên tưởng đến thực phẩm chế biến sẵn ngoài siêu thị

Thực phẩm chế biến sẵn?
> Là các hộp thực phẩm có đầy đủ thịt cá, rau, củ, gia vị để thực hiện một món ăn, đóng gói sẵn để tiết kiệm thời gian đi chợ ( siêu thị bán rất nhiều), mỗi món một hộp, nhanh, gọn.

![](http://anastar.vn/uploads/plugin/news/261/d-an-th-c-ph-m-ch-bi-n-s-n-du-an-thuc-pham-che-bien-san-1.png)

### Thứ nhất?
Docker đóng gói toàn bộ ứng dụng của bạn để tạo ra một image , từ đó mỗi khi cần triển khai ứng dụng, bạn chỉ cần khởi tạo container sinh ra từ image.
Tương tự, các gói thực phẩm chế biến sẵn cũng như image, mỗi khi bạn muốn ăn, chỉ cần chọn gói thực phẩm và nấu.

### Thứ hai?
Docker không bắt buộc tất cả các container sinh ra từ image đều giống nhau, có thể tùy biến một vài tham số khi tạo container.
Tương tự, các gói thực phẩm chế biến sẵn là vậy, bạn vẫn có thể thêm đường, thêm muối nếu bạn muốn khi nấu.

### Thứ ba?
Docker sử dụng Docker Hub để lưu và chia sẻ image, bạn chọn image bạn muốn và pull(tải) về.
Tương tự, các gói thực phẩm được bày bán trong siêu thị, bạn chọn thứ mình muốn và mua về.