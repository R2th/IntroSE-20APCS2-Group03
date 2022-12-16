# Mức độ nghiêm trọng (Severity) là gì?
Mức độ nghiêm trọng (Severity) được định nghĩa là mức độ ảnh hưởng của bug đối với hoạt động của ứng dụng đang được kiểm thử
Ảnh hưởng lớn hơn đối với chức năng hệ thống sẽ dẫn đến việc gán mức độ nghiêm trọng cao hơn cho bug. QA nên thường xuyên xác định mức độ nghiêm trọng của lỗi. 

# Độ ưu tiên (Priority) là gì?
Độ ưu tiên được định nghĩa là thứ tự của các lỗi cần được sửa. Độ ưu tiên càng cao thì càng nên giải quyết lỗi đó sớm.

Các lỗi khiến phần mềm/ ứng dụng không hoạt động được cần đặt độ ưu tiên cao hơn các lỗi ở các chức năng nhỏ. 

# Phân loại mức độ nghiêm trọng và độ ưu tiên 

## Mức độ nghiêm trọng có thể phân thành 4 loại 


* Critical ( rất nghiêm trọng) : Lỗi gây ra ngừng hoạt động của hệ thống, không thể tiến hành kiểm thử thêm được gì. 
* Major ( Nghiêm trọng) : Lỗi nghiêm trọng làm ngừng hoạt động của một phần hệ thống. Một số phần vẫn hoạt động bình thường.
* Medium ( Trung Bình) : Lỗi gây ra các hành vi không mong muốn nhưng hệ thống vẫn hoạt động bình thường
* Low ( Nhỏ) : Một số lỗi nhỏ không ảnh hưởng tới các hoạt động khác hoặc lỗi UI 

## Độ ưu tiên có thể phân thành 3 loại: 

* Low ( thấp): Lỗi gây ra gây khó chịu cho người dùng, việc sửa lỗi có thể được thực hiện nhanh chóng hoặc  khi lỗi nghiêm trọng hơn đã được sửa hoặc lỗi UI 
* Medium( trung bình): Các lỗi không ảnh hưởng nhiều đến các phần khác, vẫn có thể kiểm thử được các phần khác cho đến khi phiên bản mới được tạo ra. 
* High: Lỗi ảnh hưởng đến toàn hệ thống, cần được sửa càng sớm càng tốt, nếu không sửa thì không thể sử dụng được các hoạt động khác

# Mẹo để xác định mức độ nghiêm trọng( serverity) của bug

* Xác định tần suất xuất hiện: Trong một số trường hợp, nếu sự xuất hiện của một lỗi nhỏ thường xuyên xảy ra thì nên đặt mức độ nghiêm trọng cao hơn. Vì vậy, từ quan điểm của người dùng, tần suất xuất hiện ảnh hưởng đến mức độ nghiêm trọng dù là lỗi nhỏ.
* Cô lập lỗi: cô lập lỗi, tìm ra ảnh hưởng của lỗi đối với hệ thống sẽ dễn dàng xác định mưcs độ nghiêm trọng hơn.

![](https://images.viblo.asia/6471bdbc-1663-4562-965d-2ee80d292d93.gif)


# Sự khác biệt chính giữa độ ưu tiên và mức độ nghiêm trọng


| Độ ưu tiên| Mức độ nghiêm trọng |
| -------- | -------- |
| Được định nghĩa là sự sắp xếp thứ tự mà lập trình viên nên sửa lỗi    | Được định nghĩa là mức độ ảnh hưởng của lỗi đối với hoạt động của hệ thống     |
|Có 3 loại:    Thấp, trung bình, cao | Có 5 loại: Rất nghiêm trọng, nghiêm trọng,  Bình thường, nhỏ, rất nhỏ   |
| Liên quan đến việc lập kế hoạch    | Liên quan đến tiêu chuẩn và các chức năng khác    |
| Độ ưu tiên cho biết lỗi nên được sửa sớm ở mức nào| Mức độ nghiêm trọng cho thấy mức độ nghiêm trọng của lỗi trên chức năng sản phẩm     |
| Độ ưu tiên của lỗi được quyết định với sự tư vấn của người quản lý / khách hàng     | QA xác định mức độ nghiêm trọng của bug    |
| Ưu tiên được xác định  bởi nghiệp vụ    | Mức độ nghiêm trọng được điều khiển bởi chức năng   |
| Mức độ ưu tiên cao và mức độ nghiêm trọng thấp cho thấy, lỗi phải được khắc phục trên cơ sở ngay lập tức nhưng không ảnh hưởng đến ứng dụng | Mức độ nghiêm trọng cao và tình trạng ưu tiên thấp cho thấy lỗi phải được sửa chữa nhưng không phải trên cơ sở ngay lập tức    |


# Ví dụ 
![](https://images.viblo.asia/8bb1ab96-83e7-4010-8bc9-dea534c4e63a.png)

Hãy xem một ví dụ về mức độ nghiêm trọng thấp và mức độ ưu tiên cao và ngược lại
* Mức độ nghiêm trọng thấp với mức độ ưu tiên cao: Lỗi logo cho bất kỳ trang web giao hàng nào, có thể có mức độ nghiêm trọng thấp vì nó sẽ không ảnh hưởng đến chức năng của trang web nhưng có thể được ưu tiên cao vì bạn không muốn tiếp tục gửi hàng nữa với trang web có logo sai.
* Mức độ nghiêm trọng rất cao với mức độ ưu tiên thấp: Tương tự như vậy, đối với trang web khai thác chuyến bay, lỗi chức năng đặt chỗ có thể có mức độ nghiêm trọng cao nhưng có thể là mức độ ưu tiên thấp vì nó có thể được sửa trong lần tiếp theo.       

# Bộ ba lỗi, mức độ nghiêm trọng và độ ưu tiên 

Rất nhiều nhóm kiểm thử đối mạt với vấn đề hạn chế nguồn lực. Vì vậy, khi có số lượng lớn lỗi và số người kiểm thử hạn chế, việc liên kết giữa lỗi, mức độ nghiêm trọng và độ ưu tiên giúp giải quyết được nhiều lỗi hơn. 

# Cách xác định bộ ba lỗi, mức độ nghiêm trọng và độ ưu tiên

![](https://images.viblo.asia/47e8f0ec-036f-4ba2-8b5e-39c49b9edb80.png)

Hầu hết các hệ thống sử dụng độ ưu tiên làm tiêu chí chính để đánh giá lỗi. Tuy nhiên, tốt hơn nên xem xét mức độ nghiêm trọng.

Quá trình xử lý bao gồm các bước sau

* Xem xét tất cả các bug bao gồm cả các bug bị từ chối sửa
* Đánh giá ban đầu về lỗi dựa trên nội dung của nó và các cài đặt mức độ ưu tiên và mức độ nghiêm trọng tương ứng
* Ưu tiên các lỗi dựa trên các đầu vào
* Chỉ định lỗi cần sửa để release xác bởi người quản lý sản phẩm
* Assign lại lỗi cho chủ sở hữu / nhóm để thực hiện


# Nguyên tắc mà mọi tester nên xem xét trước khi chọn mức độ nghiêm trọng

Mức độ nghiêm trọng được đánh giá bởi người kiểm thử trong khi độ ưu tiên được đánh giá bởi người quản lý sản phẩm hoặc nhóm phân loại. Để phân loại độ ưu tiên, bắt buộc người kiểm thử phải chọn đúng mức độ nghiêm trọng.

* Hiểu rõ khái niệm độ ưu tiên và mức độ nghiêm trọng
* Luôn chỉ định mức độ nghiêm trọng dựa trên loại bug vì điều này sẽ ảnh hưởng đến mức độ ưu tiên của nó
* Hiểu cách một kịch bản ( scenaraio) cụ thể hoặc testcases sẽ ảnh hưởng đến người dùng cuối
* Cần xem xét cần bao nhiêu thời gian để sửa lỗi dựa trên độ phức tạp và thời gian để xác minh lỗi
# Kết luận 

Việc xác định mức độ nghiêm trọng và độ ưu tiên  sai có thể làm trì hoãn quá trình phát triển phần mềm và làm giảm hiệu suất chung của nhóm. Vì vậy, người có trách nhiệm cần phải xác định chính xác mức độ nghiêm trọng và độ ưu tiên của lỗi.

Nguồn tham khảo

https://www.guru99.com/defect-severity-in-software-testing.html