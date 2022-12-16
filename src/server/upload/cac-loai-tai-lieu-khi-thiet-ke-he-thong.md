Với BrSE hoặc comtor, khi tham gia vào một dự án thì  thường được đọc rất nhiều tài liệu về dự án. Tuy nhiên, để phân biệt các tài liệu đó đang thuộc những loại nào của công đoạn nào thì có thể nhiều bạn không để ý, vậy nên bài viết này mình sẽ nói qua về 3 công đoạn khi xây dựng, phát triển một hệ thống phần mềm là 要件定義/Định nghĩa yêu cầu, 外部設計/External design, 内部設計/Internal design. Và thứ tự thực hiện các công đoạn này sẽ như sau:

**Định nghĩa yêu cầu → External design (ED) → Internal design (ID)**
            
 Có rất nhiều bài viết chi tiết về khái niệm, nội dung các công đoạn trên nên trong phạm vi bài viết này, mình chỉ khái quát, tóm tắt lại những ý chính để các bạn chưa từng tham gia làm việc ở các công đoạn này có thể hiểu và phân biệt được sự khác nhau của chúng. Tất cả nội dung đều được mình tổng hợp từ các nguồn khác nhau nên có thể không tránh khỏi sai sót, hy vọng được các bạn đọc chỉ ra giúp mình nhé.
 
## Định nghĩa yêu cầu (Requirements Definition)

Là việc thu thập, tóm tắt những yêu cầu, mong muốn của khách hàng về những tính năng có trong hệ thống. 

 ---> Tóm tắt: Là đưa những yêu cầu của khách hàng được định nghĩa thành tài liệu.

Ví dụ:
   - Các yêu cầu chức năng như "Xác thực mật khẩu", "Search trong database",...
   - Đặc tả kỹ thuật cho "Nhập dữ liệu", "Xuất dữ liệu",...
   - Các yêu cầu phi chức năng như "Tính bảo trì", "Tính hoạt động",...
   - Luồng nghiệp vụ
   - ...
 
 Bằng cách tạo Danh sách đề xuất - RFP (Request for proposals) và tiến hành điều tra chi tiết cũng như trao đổi với phía khách hàng, chúng ta sẽ đưa ra được những danh sách yêu cầu thực sự cần thiết. Vì quá trình phát triển được tiến hành dựa trên những nội dung tóm tắt ở đây, nên có thể giảm bớt số lần thay đổi specs (Change request) do bỏ sót bằng việc xem xét kỹ lưỡng các định nghĩa yêu cầu ở giai đoạn này.
 
**Tài liệu định nghĩa yêu cầu**

Tài liệu định nghĩa yêu cầu là nơi ghi chép lại các kết quả sau khi xem xét các định nghĩa yêu cầu.

Về cơ bản thì sẽ có các mục sau đây:

1. Tổng quan hệ thống
       - Hệ thống làm về cái gì?
       - Tại sao cần thiết phải có hệ thống này?
       - Mục đích của hệ thống này là gì?
       
 2. Sơ đồ cấu trúc hệ thống
       - Sơ đồ khái niệm hệ thống
       - Luồng nghiệp vụ hệ thống
       - Sơ đồ use case
      
 3. Yêu cầu chức năng
       - Danh sách tính năng của hệ thống
       - Chi tiết các tính năng
    
 4. Yêu cầu dữ liệu đầu vào/đầu ra
       - Danh sách dữ liệu đầu vào
       - Chi tiết dữ liệu đầu vào (field, type,...)
       - Danh sách dữ liệu đầu ra
       - Chi tiết dữ liệu đầu ra (field, type,...)
       
  5. Yêu cầu phi chức năng
       - Yêu cầu bảo mật
       - Yêu cầu chất lượng, hiệu suất
       
 6. Other
      - Schedule sơ lược
      - Sơ đồ Stakeholder (relationship diagram) 

## External design (ED)

(Thực hiện sau khi hầu như những yêu cầu của khách hàng được đáp ứng)

Thiết kế bên ngoài là việc thiết kế chi tiết cấu trúc hệ thống dựa vào tài liệu định nghĩa yêu cầu.

Không giống như "Tài liệu định nghĩa yêu cầu" được chia sẻ từ phía khách hàng, External design (hay còn gọi là 基本設計書/Tài liệu thiết kế cơ bản) được xây dựng dựa trên quan điểm của lập trình viên. Tuy nhiên, khách hàng có thể sẽ tham gia việc review tài liệu này.

 ---> Tóm tắt: Là thiết kế hệ thống hướng về phía người dùng
 
 External design chủ yếu được phân thành 3 loại sau đây:
 
 **1. 方式設計/Thiết kế phương pháp**
 
 Gọi tắt là Architectural design. Dễ hình dung thì nó là việc trả lời thứ tự các câu hỏi: Bạn sẽ " sử dụng cái gì", "bằng quy trình nào" để xây dựng lên hệ thống "như thế nào".
 
  - Sử dụng cái gì?
        + Thiết lập phương châm phát triển. Cụ thể là cấu hình phần cứng, phần mềm, ...
        + Chỉ định ngôn ngữ, nền tảng flatform để phát triển
   
  - Bằng quy trình nào?
        + Thể chế nhân sự (resource)
        + Schedule phát triển
        + Công cụ quản lý dự án
       
   - Hệ thống như thế nào?
        + Sơ đồ cấu trúc hệ thống
     
 **2. 機能設計/Thiết kế tính năng**
    
 Chia hệ thống thành các mô-đun và thiết kế các thông số kỹ thuật phía bên ngoài của các mô-đun đó. Giai đoạn này thường sử dụng nhiều sơ đồ UML (Unified Modeling Language)
 
 Thiết kế chi tiết của từng mô-đun sẽ được mô tả ở tài liệu Internal design.
 
   - Sơ đồ di chuyển màn hình
   - Sơ đồ thiết kế layout màn hình (UI)
   - Scenario
   - Bussiness/Logic
   - Bảng danh sách các tính năng (function)
   - Thiết kế database: Sơ đồ ER, định nghĩa Table
  
 **3. Thiết kế khác**
 
 Các phần khác này có thể là "Thiết kế bảo mật", "Thiết kế vận hành", "Thiết kế kiểm thử",...
 
### 基本設計書/Tài liệu thiết kế cơ bản

Sau khi hoàn thành việc thiết kế bên ngoài (external design) thì kết quả sẽ được tổng hợp vào các tài liệu và được gọi là Tài liệu thiết kế cơ bản.

- Tổng quan hệ thống
   + Scenario
   + Bussiness/Logic

 - Cấu trúc hệ thống
   + Sơ đồ cấu trúc hệ thống
   + Luồng nghiệp vụ/Sơ đồ hoạt động
   + Sơ đồ cấu hình phần cứng/phần mềm
   + Sơ đồ cấu hình network
  
  - Bảng danh sách tính năng
  
  - Đặc tả database
    + Sơ đồ ER
    + Tài liệu định nghĩa table
    
  - Thiết kế UI
    + Sơ đồ di chuyển màn hình
    + Sơ đồ thiết kế layout màn hình
    
  - Other
    + Thể chế/resource phát triển
    + Schedule phát triển
    + Công cụ quản lý dự án
 
## Internal design (ID)

Cũng còn được gọi là Tài liệu thiết kế chi tiết/詳細設計書.

Các loại tài liệu cơ bản:

* Thuyết minh, phân chia chức năng
       - Class diagram
* Data flow
      - DFD (Data flow diagram)
 * Modules details
      - Module name
      - Vai trò
      - Parameter, respone
      - Sơ lược xử lý
      - Note

## Bắt đầu implement

Sau khi xong Tài liệu Internal design thì Developer có thể bắt đầu triền khai phát triển. Sau khi implement xong, dựa vào Tài liệu test được viết ở giai đoạn External design để tiến hành thực hiện Unit test --> Test tích hợp.

Nguồn tham khảo tại [đây](https://qiita.com/chocode/items/fd51dd8f561e2a0fbd70)