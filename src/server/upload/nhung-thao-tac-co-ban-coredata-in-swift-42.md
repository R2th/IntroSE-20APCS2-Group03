# 1. Cách tạo file CoreData trong project của bạn<br>
## 1.1 Tạo tự động<br>
Khi tạo Project bạn click vào nút “Use Core Data”

![](https://images.viblo.asia/502f744f-dbf2-454b-84c6-050fb4af1e61.png)<br>
Đoạn code được xcode tự động sinh ra:
![](https://images.viblo.asia/8026eee1-63bf-4d99-bacc-4336dce64482.png)<br>
## 1.2 Tạo thủ công(Trường hợp bạn quên click vào nút Use CoreData)<br>
Trong Project, bạn chọn  New File  và chọn file Data Model và đặt tên: PetPat.<br>![](https://images.viblo.asia/1ecd498f-aff4-4c19-845a-41642d5932d4.png)<br>
Ta được file như sau: ![](https://images.viblo.asia/bafde284-e699-44d9-87c5-ef58e77caa5f.png)<br>
Trong file AppDelegate bạn viết đoạn code sau:<br>
![](https://images.viblo.asia/ec0addc2-ba95-480b-a129-0810559dda6d.png)<br>
(Đoạn code tương tự như đoạn code sinh ra tự đông)
## 2. Tạo thực thể :
![](https://images.viblo.asia/85e982c5-ed1d-4e28-9ff8-1ef1611f0d56.png)<br>
Khi các bạn lựa chọn PetPat.xcdatamodeld có 3 chế độ codegen:
- Chế độ Manual/None<br>
Đây là chế độ mặc đinh ở Xcode 8, chế độ này dùng khi bạn  muốn tự động tạo và duy trì các thay đổi của các lớp con kế thừa NSMnanagedObject
Các bạn tạm thời cứ chọn chế độ Manual/None. Các chế độ kia mình sẽ nói rõ ở phần 2.Sau đó bạn chọn Create NSManagedObject Subclasss tưng động sẽ sinh ra 2 file: 
Friend+CoreDataProperties.swift
Friend+CoreDataClass.swift<br>![](https://images.viblo.asia/3d392ca6-4edb-41ab-afbd-1146745b3dfd.png)<br>
File: Friend+CoreDataClass.swift<br>
![](https://images.viblo.asia/67a78d97-0b9f-4614-82ab-9baa03e22d14.png)<br>
File: Friend+CoreDataProperties.swift
![](https://images.viblo.asia/67a78d97-0b9f-4614-82ab-9baa03e22d14.png)<br>
Friend+CoreDataProperties.swift (CoreDataProperties) và  Friend+CoreDataClass.swift(CoreDataClass) là 2 thành phần của ManagerObject. File CoreDataClass là nơi các bạn tuỳ chỉnh code
<br>
# Sơ đồ tổng quát cơ bản về Core Data
![](https://images.viblo.asia/85b10d6f-4439-4168-b86b-859345ff1fed.png)<br>
- NSMnanagedObject là một lớp thực hiện các hành vi cơ bản của một đối tượng
- NSManagedObjectContext quản lý các object, các thay đổi của các object được lưu giữ trong bộ nhớ trong không gian chứa.<br>
MỘt object chỉ tồn tại 1 và chỉ 1 context nhưng các bản ghi của object có thể tồn tại trong nhiều context khác nhau. Do đó một đối tượng là duy nhất cho một context cụ thể.
The context có vai trò trung tâm trong quản lý vòng đời của các đối tương(bao gồm cả lỗi), để xác nhận , xử lý các mối quan hệ nghịch đảo , hoàn tác.<br>
Thông qua context bạn có thể lấy các đối tượng từ persistent store làm thay đổi các đối tượng đó,có thể huỷ bỏ các thay đổi đó rồi đưa chúng trở lại persistent store.<br>
Bạn có thể chèn các đối tượng mới và xoá các đối tượng mà bạn đã tìm nạp và commit các sửa đổi với persistent store.<br>
- NSPersistentContainer: Một vùng chứa đóng gói theo ngăn xếp dữ liệu của bạn
Về cơ bản nó đại diện cho kho lưu dữ liệu của bạn. Bạn phải yêu cầu persistent container để lấy ra các vùng chứa (NSManagedObjectContext) mà bạn sử dụng để lưu trữ các đối tượng quản lý của mình.

Ok lý thuyết thế là đủ bây giờ làm thử demo:<br>
# Thực hành với Core Data
- Các bạn Tạo giao diện như sau:<br>![](https://images.viblo.asia/789e1bf2-1c5d-4040-8836-2a3bb4d17bed.png)
- Các bạn viết các đoạn code như sau: 
![](https://images.viblo.asia/129b9c68-b315-416e-bb23-126d228fc489.png)<br>
![](https://images.viblo.asia/5acf77e9-84ac-4ef3-9821-a109770bf647.png)<br>
- func refresh():
![](https://images.viblo.asia/8b98ce35-ab72-4bae-825c-1dfb30e50130.png)<br>
**- Tìm kiếm dữ liệu**
![](https://images.viblo.asia/05f7d59a-8220-428e-be40-712e779a91bd.png)<br>

**Bạn có thể tham khảo sourcode ở đây**: 
https://drive.google.com/file/d/18fYRdp53-jL7CfdPtZIPh9TcJytP5zrB/view?usp=sharing
<br>

**Nguồn Tham khảo:**
- https://developer.apple.com/documentation/coredata<br>
- https://www.raywenderlich.com/3444-beginning-core-data