# Clean Architecture là gì?
Clean Architecture là kiến trúc phần mềm thiết kế dựa trên Dependency Rule, được đề xuất vào năm 2012 bởi Robert C. Martin.

Clean architecture không bị giới hạn trong một ứng dụng mà nó còn có thể được áp dụng cho cả một hệ thống (tập các ứng dụng). Đây cũng là một trong những điểm vượt trội so với MVC, MVP hay MVVM.
# Sơ đồ Clean Architecture
![image.png](https://images.viblo.asia/be6b962f-7cb5-4ce4-b54a-51ffaeda2c0b.png)
Đầu tiên thì ta cần biết Dependency rule là gì?, ta sẽ tìm hiểu nó thông qua sơ đồ ở trên:
- Mô hình sẽ chia thành nhiều vòng tròn, mỗi vòng tròn tương ứng với 1 layer.
- Vị trí của vòng tròn nói lên cấp (level) của chúng, vòng tròn càng xa tâm thì có cấp càng cao.
- Dependency rule là quy tắc quy định rằng:
    -  Layer trong (level thấp hơn) không được chứa source code của layer ngoài (có level cao) hơn.
    -  Bất cứ thay đổi ở layer ngoài không làm ảnh hưởng tới layer trong, có nghĩa là sự phụ thuộc hướng vào trong.
- Clean architecture thông thường chia thành 4 layer: entities, use cases, interface adapters và Frameworks and drivers. Nhưng tuỳ theo hệ thống, chúng ta có thể chia thành nhiều layer hơn nhưng phải tuyệt đối tuân thủ vào dependency rule.
- Khi chúng ta đi vào trong từ layer level cao xuống các layer thấp hơn, mức độ trừu tượng hoá sẽ được tăng lên (mức độ phụ thuộc giảm đi).
## 1. Entities
- Entities chứa business logic của cả hệ thống (tập các app) chứ không bị bó buộc trong 1 app nào cả. Nói một cách dễ hiểu Entities sẽ đảm nhận nhiệm vụ định nghĩa các POJO chứa các thông tin liên quan đến business của ứng dụng.
- Do entities có phạm vị hệ thống nên sự thay đổi hoạt động (không phải business logic) của một ứng dụng không làm ảnh hưởng tới entities. Do đó, entities có thể chạy độc lập mà không sợ bị lỗi.

Ví dụ: Chúng ta xây dựng app tin tức. Ta tạo ra 1 class News, thì News chính là một entity của hệ thống
## 2. Use Cases
- Use cases chứa application specific business rules, thực hiện các use case của 1 ứng dụng dựa trên các entity object của entities.
- Use cases không chứa source code của interface adapters và frameworks and drivers.
- Use cases cũng không bị ảnh hưởng bởi sự thay đổi interface adapters và frameworks and drivers.
- Use cases thể hiện business logic của ứng dụng. Do đó khi requirement của ứng dụng thay đổi, code trong layer này cũng sẽ bị thay đổi.

Ví dụ: Use Cases thêm, sửa, xóa bài viết.
## 3. Interface adapters
- Interface adapters là layer dùng để chuyển đổi dữ liệu của ở entites và use cases thành định dang thuận tiện nhất để làm việc với các tác vụ như database, web service… Do đó, interface adapters cũng có thể chứa các framwork có sẵn để làm việc.
- Use cases, entities và các framework được sử dụng để chuyển đổi dữ liệu.

Ví dụ: Ứng dụng sử dụng Room Database
- Entities và use cases không thể chứa source code về Room Database.
- Interface adapter tạo ra các đối tượng như table, SQL query… để làm việc thuận tiện nhất với yêu cầu của ứng dụng.
- Ngoài interface adapters, không thành phần nào của clean architecture làm việc với Room Database.
## 4. Frameworks and drivers
- Đây là layer ngoài cùng, nó là nơi chúng ta đi vào chi tiết hoá yêu cầu của ứng dụng như UI, application behavior, interaction… và cũng có thể bao gồm các Framework được xây dựng để phục vụ việc chi tiết hoá như UI framework…
- Chúng ta chỉ viết code liên quan đến việc chi tiết hoá như UI design…

Ví dụ 4: Với Android, trong frameworks and drivers:
+ Chúng ta sẽ import những UI dependency như material… và sử dụng code trong interface adapter để tạo ra UI.
+ Ngoài ra, chúng ta cũng sẽ thực hiện các tác vụ như điều hướng giữa các screen, thực hiện tương tác với user, chỉnh setting cho app…
# Ưu điểm của Clean Architecture
- Giúp business logic trở nên rõ ràng.
- Với việc tách biệt thành các layer và tuân theo dependecy rule, hệ thống của chúng ta sẽ dễ dàng test, maintain và thay đổi.
- Khi một thành phần như giao diện, database work…bị lỗi thời, chúng ta có thể dễ dàng thay thế nó với effort bỏ ra là ít nhất.
# Nhược điểm của Clean Architecture
- Clean architecture do phân tách cấu trúc thành nhiều tầng nên dẫn đến việc số lượng code sinh ra là rất lớn, không phù hợp cho các dự án nhỏ.
- Khó hiểu, khó áp dụng với những người mới bắt đầu.
# Tạo một project theo Clean Architecure
Để tạo 1 project theo Clean Architecture thì có rất nhiều cách, nhưng ở đây mình sẽ hướng dẫn một cách đơn giản và được nhiều người sử dụng.

Ta sẽ chia project thành 3 module tương ứng với 3 layer chính theo level từ thấp đến cao là: Domain, Data, Presentation.
![image.png](https://images.viblo.asia/e37ff4d0-fa17-48a0-85c7-93231954070f.png)
- Domain Layer: Sẽ thực thi business logic độc lập với các layer khác và chỉ là một kotlin packet thuần túy không có sự phụ thuộc cụ thể vào android.
- Data Layer: Sẽ phân phối dữ liệu cần thiết cho ứng dụng vào Domain Layer bằng cách triển khai interface của Domain Layer.
- Presentation Layer: Sẽ bao gồm Domain Layer và Data Layer, và là lớp dành riêng cho android thực thi logic giao diện người dùng, ở layer này ta có thể kết hợp thêm các architecture như MVP, MVVM,...

Ban đầu ta sẽ có 1 project như thế này.
![image.png](https://images.viblo.asia/6dbd458b-84c6-4126-93f0-350b9a21d9fb.png)

Ta sẽ tạo thêm module Domain.

![image.png](https://images.viblo.asia/7bfea488-c0da-4bdd-bb29-8ca60fdf9693.png)
![image.png](https://images.viblo.asia/c1ca2d96-c942-45a0-9a8e-a460ab6d5b65.png)

Tiếp theo ta sẽ tạo module Data.

![image.png](https://images.viblo.asia/f55d0b6e-8356-46d1-b28c-d1339b2ff75d.png)![image.png](https://images.viblo.asia/fd667af8-993d-4967-9773-a68228ff9a86.png)

Còn module Presentation ta sẽ sử dụng module app ban đầu ta có, vậy ta sẽ có project với 3 module đã nêu ở trên.
![image.png](https://images.viblo.asia/611ad693-3341-4cf7-8a58-18f943bbde56.png)

Ta tiếp tục import module Domain trong file build.gradle của module Data.
![image.png](https://images.viblo.asia/cfd28dba-da7f-49c7-bfbd-0c408231294a.png)

Import module Domain và Data trong file build.gradle của module Presentation.
![image.png](https://images.viblo.asia/bce4ef76-5e8a-4276-9bab-3183eafa5271.png)

Vậy là ta đã tạo được một khung chương trình theo Clean Architecture, dưới đây là flow của chương trình có sử dụng ViewModel.
![image.png](https://images.viblo.asia/c1e182dc-1455-4f70-8374-f42d4860ea62.png)


Tài liệu tham khảo:https://itlifelang.github.io/2020/07/16/clean-architecture/, 
https://topdev.vn/blog/gioi-thieu-ve-clean-architecture-phan-1/, https://proandroiddev.com/kotlin-clean-architecture-1ad42fcd97fa