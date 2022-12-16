Sự khác biệt giữa thuộc tính atomic và nonatomic là một câu hỏi yêu thích của người phỏng vấn. Những từ khóa này xác định cách các thuộc tính hoạt động khi chúng được truy cập từ nhiều luồng cùng một lúc.
## 1. Atomic
Atomic là cơ chế độc quyền, chỉ có một thread duy nhất được truy cập thuộc tính tại một thời điểm. Khi nhiều thread tham chiếu đến nó thì thread này thay đổi giá trị xong thì thread khác mới được quyền thay đổi, đảm bảo chỉ một thread được thay đổi giá trị ở một thời điểm. Vì vậy, atomic là an toàn.

Giả sử chúng ta có một thuộc tính firstName là atomic:
![](https://images.viblo.asia/c00ab23b-9117-46f1-a03d-9059f266b399.JPG)
Nó sẽ đảm bảo rằng giá trị của thuộc tính vẫn nhất quán trong suốt vòng đời. Trong iOS, default là atomic
Ví dụ về thuộc tính atomic:
![](https://images.viblo.asia/dbe66e21-a331-45a4-9dd8-75246cd7a555.JPG)
Phương thức getter, setter: 
![](https://images.viblo.asia/85a4aa9d-b4d6-4fc1-8147-960cc8a8e136.JPG)
=> Ưu điểm: luôn nhận được giá trị hợp lệ, an toàn
=> Nhược điểm: chậm, vì nó đảm bảm thread đã hoàn toàn hoàn thành.
## 2. Nonatomic
Thuộc tính nonatomic, nhiều thread truy cập cùng thời điểm có thể thay đổi thuộc tính, không có cơ chế nào để bảo vệ thuộc tính. Vì vậy thuộc tính nonatomic không an toàn.

Ví dụ:
![](https://images.viblo.asia/a20e229c-ebee-4d2d-8985-cb842d827cf0.JPG)
Phương thức getter, setter:
![](https://images.viblo.asia/8c9314f0-44a6-4dda-a26c-bd3cf9d3cfd6.JPG)
=> Ưu điểm: nhanh, vì không cần kiểm soát quyền truy cập của thread.
=> Nhược điểm: không an toàn, thuộc tính không được đảm bảo dù có nhận được giá trị hợp lệ hay không.
## 3. Tổng kết
Tóm lại, nonatomic truy xuất nhanh hơn, nếu đảm bảo biến nào đó chỉ chạy trên một thread nhất định ở một thời điểm nhất định thì dùng nonatomic để tốc độ nhanh hơn. Để biến được bảo vệ khi có nhiều thread cùng đọc/ ghi thì dùng atomic.