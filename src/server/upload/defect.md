## **1. Defect là gì?**
- Là một điều kiện trong phần mềm mà không đáp ứng được yêu cầu hoặc sự kì vọng của người dùng cuối.
- Nói cách khác lỗi là những sai sót trong coding hoặc trong tư duy của người lập trình dẫn đến trục trặc hoặc kết quả chương trình không chính xác.
Một chương trình có chứa số lượng lớn các lỗi được cho là lỗi.
Báo cáo chi tiết các lỗi trong phần mềm được gọi là báo cáo lỗi.
Ứng dụng theo dõi lỗi được gọi là công cụ theo dõi lỗi.
Quá trình tìm lý do gây lỗi gọi là gỡ lỗi.
Quá trình cố tình đưa lỗi và một chương trình để ước tính thử nghiệm bằng cách giám sát các lỗi được gọi là bebugging
- Phân loại bug theo các tiêu chí sau:
+ Mức độ nghiêm trọng/ Độ ảnh hưởng
+ Xác suất/ Tính rõ ràng
+ Độ ưu tiên/ Tính cần thiết
+ Kích thước liên quan của chất lượng
+ Chức năng liên quan
+ Pha phát hiện
+ Pha Injected
## **2. Defect Severity**
- Mức độ nghiêm trọng hay tác động là một phân loại các lỗi của phần mềm để chỉ ra mức độ tác động tiêu cực đến sự phát triển của phần mềm.
- Các thuật ngữ về lỗi hiện nay:
+ Quan trọng: Các lỗi ảnh hưởng đến các chức năng quan trọng hay dữ liệu quan trọng. Nó không có cách khắc phục.
+ Lớn: Lỗi ảnh hưởng đến các chức năng chính hoặc các dữ liệu quan trọng.Lỗi này có thể khắc phục nhưng nó không rõ ràng và khó.
+ Nhỏ: Lỗi ảnh hưởng đến các chức năng nhỏ hoặc các dữ liệu không quan trọng.Nó có thể được giải quyết dễ dàng.
+ Lỗi thông thường: Lỗi không ảnh hưởng đến các chức năng hay dữ liệu. Lỗi này thậm chí không cần phải giải quyết.
## **3. Defect Probability**
- Xác suất lỗi biểu thị khả năng người dùng gặp lỗi.
+ Cao: Gặp bởi tất cả hoặc gần như tất cả những người sử dụng tính năng
+ Trung bình: Gặp bởi 50% những người sử dụng tính năng.
+ Thấp: Gặp ở rất thấp hoặc thậm chí là không bởi người dùng sử dụng tính năng.
## **4. Defect Priority**
- Lỗi ưu tiên: cho biết tầm quan trọng hoặc khẩn cấp của việc sửa chữa lỗi.
Các lỗi ưu tiên được phát hiện bởi các Tester nhưng nó thường được hoàn thành bởi quản lý dự án.
- Phân loại các mức độ ưu tiên:
+ Urgent (Khẩn cấp): Phải được fix ngay trong bước xây dựng tiếp theo
+ High (Cao): Phải được fix trong bất kì bước xây dựng nào nhưng phải bao gồm các bản tách ra.
+ Normal (Trung bình): Phải sửa lỗi sau khi tách ra hoặc bản tách ta tiếp theo.
+ Low (Thấp): Có thể hoặc không cần fix ở tất cả.
## **5. Defect Life Cycle**
- Là hành trình của lỗi kể từ khi nó được phát hiện cho đến khi nó được đóng lại.
The Life Cycle khác từ tổ chức đến tổ chức và được điều chỉnh bởi các quy trình kiểm thử phần mềm hoặc các dự án tiếp theo và các công cụ quản lý lỗi đang được sử dụng.
![](https://viblo.asia/uploads/cacde6ea-050c-45d5-bfd9-aef25d532330.png)

- **New**: khiếm khuyết tiềm năng đó được nâng lên và chưa được xác nhận.
- **Assigned**: giao lại cho một đội ngũ phát triển để giải quyết nó.
- **Active**: Các Defect đang được giải quyết bởi các nhà phát triển và điều tra đang được tiến hành. Ở giai đoạn này có hai khả năng xảy ra: Deferred hoặc Rejected
- **Test**: Các Defect đã được fix và sẵn sàng để thử nghiệm
- **Verified**: Các Defect được kiểm tra lại và thử nghiệm đã được xác nhận qua QA.
- **Closed**: Các trạng thái cuối cùng của những defect có thể được đóng lại sau khi QA test lại hoặc có thể bị đóng nếu các defect là trùng lặp hoặc coi như không phải là defect.
- **Reopened**: Khi defect chưa được fix và QA sẽ reopen defect đó 
- **Deferred**: Khi một defect không thể được giải quyết trong chu kỳ đặc biệt nó được hoãn lại để phát hành trong tương lai.
- **Rejected**: Khi defect đó: bị lặp, không phải là 1 defect hoặc không tái hiên được. 

***Tài liệu tham khảo:*** 

https://www.tutorialspoint.com/software_testing_dictionary/defect_life_cycle.htm

http://softwaretestingfundamentals.com/software-testing-life-cycle/