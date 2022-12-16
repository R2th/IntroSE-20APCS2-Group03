# 1. Tạo số ngẫu nhiên 
Swift 4.1 import  các API C để tạo các số ngẫu nhiên, như trong đoạn mã dưới đây:

![](https://images.viblo.asia/a5d96ced-c11d-4db9-91d2-28f54629de27.PNG)
arc4random_uniform(: ) :  trả về 1 số ngẫu  nhiên từ 0 - 9. Nhưng yêu cầu chúng ta import Foundation, và rất tiếc là không hoạt động trên Linux
Swift 4.2 giải quyết vấn đề này bằng cách thêm một random API vào thư viện chuẩn. 
![](https://images.viblo.asia/2b4c310c-2b67-4557-896b-fa2116d03901.PNG)
Đoạn code trên được thực hiện như sau:
1. Chúng ta sử dung  random(in:) để tạo ngẫu nhiên một số trong khoảng.
2. randomElement() trả về nil nếu khoảng giá trị là rỗng, nên chúng ta cần sử dụng if let để unwrap
3. Sử dụng  random(in:)  với một số loại dữ liệu cụ thể.

![](https://images.viblo.asia/1e8834b2-e338-41ff-8fd6-dc1aefb0e2ea.PNG)
# 2. Tìm kiếm thành phần động
Swift 4.1 sử dụng dấu ngoặc vuông để thực hiện gọi với custom subcript: 
![](https://images.viblo.asia/b0e48213-60c3-435f-aa6c-ae731658f420.PNG)
Subcript trong trường hợp này trả về nôi dung của một phần tử private trong class Nguoi
Còn với Swift 4.2 sử dụng "Dynamic Member LookUp" cung cấp việc sử dụng dấu chấm thay vì ngoặc vuông
![](https://images.viblo.asia/8a386e1a-1b1b-48bb-babc-bc43852f9997.PNG)
1. Chúng ta đánh dấu class Person kiểu @DynamicMemberLookup để cho phép sử dụng dấu chấm với custom subcript
2. Tiếp theo chúng ta cần implement subscript(dynamicMember:) 
3. Chúng ta có thể gọi ra bằng dấu chấm thay vì dấu ngoặc vuông như trước.
# 3. Enum với Collection
Swift 4.1 không cung cấp, nên bạn phải thực hiện bằng cách sau rất phức tạp:
![](https://images.viblo.asia/e72f8ac7-03af-4c97-b4cf-997414a0913a.PNG)
Ở đây chúng ta phải đùng 1 mảng sessions để thực hiện lăp các phần tử.  Nhưng với Swift 4.2 chúng ta sẽ giải quyết nó một cách đơn giản hơn. 
![](https://images.viblo.asia/d4f4e1e7-9673-46a8-ac4f-1b9d0c419b18.PNG)
Cách mà swift 4.2  đã thực hiện như sau:
1. Enum cần implement CaseIterable để sử dụng array trong enum này.
2. Chúng ta thực hiện chạy vòng lặp thông qua allCases , và in các phần tử ra.

# 4. Xóa phần tử trong Collection
Chúng ta thường muốn xóa các phần tử cụ thể trong Collection. Với Swift 4.1 chúng ta thực hiện như sau:
![](https://images.viblo.asia/467960a1-7686-40d8-a28e-90075d7bc280.PNG)
Lọc từ greetings  ra một mảng ngắn hơn. Điều này không ảnh hưởng đến mảng ban đầu, nên bạn có thẻ sử dụng greetings
Với Swift 4.2 sẽ ngắn gọn hơn rất nhiều; 
![](https://images.viblo.asia/41afa22b-2e4d-46ee-8beb-6c89ad041496.PNG)
# 5.  Compiler Directives
Swift 4.2 xác định  Compiler Directives 
![](https://images.viblo.asia/819bf5b9-2e54-400b-af76-2ed5cfdccb92.PNG)
Cách mà nó đã hoạt động : 
1. Sử dung #Warning như một lời nhắc rằng hàm đươc dùng để thêm phần tử vào Number 
2. Sử dụng #error để yêu cầu người dùng nhập username và password trước khi đăng nhập
# 6. Cập nhật Memory Layout
Swift 4.2 sử dụng Key Path để truy vấn MemoryLayout của bộ nhớ lưu trữ 
![](https://images.viblo.asia/45303ffd-7f98-4a4a-b834-77515fb9a139.PNG)
Các bước thực hiện: 
1. Bạn khai báo một tọa độ ngang và dọc của một điểm 
2. Bạn khai báo các thuộc tính của đường tròn
3.  Sử dụng key path để lấy offsets  của circle ' store memory
4.  Sẽ trả về nil nếu chúng không được lưu trong bộ nhớ 

Nguồn : https://www.raywenderlich.com/194066/whats-new-in-swift-4-2