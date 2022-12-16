### 1. Tổng quan về theo dõi lỗi

Theo dõi lỗi (Defect tracking) là một trong những khía cạnh quan trọng của vòng đời lỗi (Defect life cycle).
Trong quy trình theo dõi lỗi, khi tester log bug, ngoài việc mô tả cách tái hiện bug, tester cũng phải cung cấp một số thông tin phân loại để hỗ trợ phân loại lỗi được chính xác hơn. Điều này sẽ giúp cho quá trình theo dõi lỗi hiệu quả hơn.
Hai tham số (parameters) chính tạo thành cơ sở của việc theo dõi và giải quyết lỗi hiệu quả là:
* Mức độ ưu tiên của lỗi trong testing - Priority.
* Mức độ nghiêm trọng của lỗi trong testing - Severity.

Hai khái niệm này thường bị nhầm lẫn với nhau, cả team test và team dev cũng thường bị nhầm lẫn khi sử dụng hai khái niệm này.

### 2. Độ ưu tiên - Priority

Mức độ ưu tiên xác định thứ tự mà chúng ta nên giải quyết một Bug. Thực tế thì developer không thể fix hết tất cả các bug của sản phẩm cùng 1 lúc, vì vậy câu hỏi được đặt ra là chúng ta có nên sửa nó ngay bây giờ, hay nó có thể để sau được không? Trạng thái ưu tiên này được xác định bởi tester để developer có thể sắp xếp khoảng thời gian sửa lỗi vào giai đoạn nào cho phù hợp. Nếu bug có mức ưu tiên cao thì người lập trình phải khắc phục sớm nhất.

**Các loại mức độ ưu tiên**

Thông thường mức độ ưu tiên của bug được chia thành 3 mức cơ bản nhất:
* **High**: Các chức năng chính hay toàn bộ chức năng của phần mềm không hoạt động được gây ảnh hưởng đến việc kinh doanh của khách hàng hoặc hệ thống. Các bug/defect ở trường hợp này cần được sửa trong vòng 24h sau khi phát hiện lỗi.
* **Medium**: End-user có thể sử dụng các chức năng chính trên hệ thống/ phần mềm nhưng một số chức năng đôi khi không sử dụng được. Tuy nhiên đó là các chức năng phụ, ít được sử dụng. Các bug này sẽ được fix sau khi đã fix các bug có độ ưu tiên "High".
* **Low**: Những bug hầu như không ảnh hưởng đến việc kinh doanh của khách hàng và trải nghiệm của người dùng đối với phần mềm/ứng dụng. Các bug này sẽ được fix sau khi đã xử lý, sửa chữa các lỗi có độ ưu tiên "High" và "Medium".

### 3. Mức độ nghiêm trọng - Severity

Đó là phạm vi mà lỗi có thể ảnh hưởng đến phần mềm. Nói cách khác, nó định nghĩa tác động mà một khiếm khuyết nhất định có trên hệ thống. Ví dụ: Nếu ứng dụng hoặc trang web gặp sự cố khi nhấp vào liên kết từ xa, trong trường hợp này, việc nhấp vào liên kết từ xa bởi người dùng rất hiếm, nhưng tác động của ứng dụng bị lỗi nghiêm trọng. Vì vậy, mức độ nghiêm trọng là cao, nhưng ưu tiên là thấp.

**Các loại mức độ nghiêm trọng**

Mỗi dự án hay sản phẩm có tiêu chí đánh giá độ nghiêm trọng khác nhau nhưng thông thường sẽ có 4 mức độ khác nhau từ nghiêm trọng nhất đến ít nghiêm trọng hơn:
* **Critical - Mức độ nghiêm trọng**: Những lỗi nghiêm trọng khiến người dùng không thể sử dụng được ứng dụng như hệ thống sập, dữ liệu bị mất, ứng dụng không cài đặt được...
* **Major/High - Mức độ cao**: Chức năng chính của sản phẩm không hoạt động
* **Medium - Mức độ trung bình**: Sản phẩm hoặc ứng dụng hoạt động không đáp ứng tiêu chí nhất định hoặc vẫn còn bộc lộ một số hành vi không mong muốn, tuy nhiên các chức năng khác của hệ thống không bị ảnh hưởng.
* **Low - Mức độ thấp**: Lỗi xảy ra hầu như không ảnh hưởng gì đến chức năng, nhưng vẫn là lỗi và vẫn cần được sửa. Ví dụ như các lỗi về sai text, sai vị trí button

### 4. Sự khác nhau giữa mức độ nghiêm trọng và mức độ ưu tiên



|Độ ưu tiên | Độ nghiêm trọng | 
| -------- | -------- |
| Được định nghĩa là thứ tự lỗi mà dev nên giải quyết     | Được định nghĩa là mức độ tác động mà lỗi ảnh hưởng đến chức năng của phần mềm/ hệ thống     | 
| Mức độ ưu tiên có ba loại chính: High, Medium, Low | Mức độ nghiêm trọng có 4 loại chính: Critical, Major/High, Minor/Moderate, Low |
| Độ ưu tiên gắn liền với schedule | Độ nghiêm trọng gắn liền với chức năng hoặc chất lượng |
| Độ ưu tiên cho biết khi nào lỗi sẽ được sửa chữa | Độ nghiêm trọng cho biết mức độ nghiêm trọng của lỗi đối với chức năng, hệ thống |
| Sẽ được quyết định trong cuộc họp/ trao đổi với khách hàng/manager | QA/tester sẽ quyết định mức độ nghiêm trọng của lỗi |
| Được quyết định bởi mức độ ảnh hưởng đến việc kinh doanh của khách hàng | Được quyết định bởi chức năng của hệ thống, phần mềm |
| Giá trị của độ ưu tiên mang tính chủ quan và nó có thể thay đổi tùy thuộc vào tình hình của dự án | Giá trị của độ nghiêm trọng mang tính khách quan và hầu như không thay đổi trong suốt dự án |
| Mức độ ưu tiên cao - Mức độ nghiêm trọng thấp cho thấy, lỗi phải được khắc phục ngay lập tức nhưng lỗi không ảnh hưởng đến ứng dụng | Mức độ nghiêm trọng cao - Mức độ ưu tiên thấp cho thấy lỗi phải được sửa nhưng không cần ưu tiên sửa ngay lập tức |
| Status được dựa trên yêu cầu của khách hàng | Status được dựa trên tính kỹ thuật của sản phẩm |

### 5. Phương pháp đánh giá mức độ của Bug trong quản lý Bug

Mức độ nghiêm trọng và mức độ ưu tiên thường được điền bởi người log bug, nhưng nên được cả nhóm xem xét có thể được xác định dựa trên các tiêu chí sau:
* *Độ nghiêm trọng cao - Mức độ ưu tiên cao*
Ví dụ như trên một trang web Thương mại điện tử, mỗi khách hàng nhận được thông báo lỗi trên mẫu đặt hàng và không thể đặt hàng, hoặc trang danh sách sản phẩm bị Lỗi 500.
* *Mức độ nghiêm trọng cao - Độ ưu tiên thấp*
Điều này xảy ra khi lỗi gây ra các vấn đề lớn, nhưng nó chỉ xảy ra trong điều kiện hoặc tình huống rất hiếm, ví dụ như khách hàng sử dụng các trình duyệt cũ rất cũ không thể tiếp tục mua sản phẩm. Bởi vì số lượng khách hàng có trình duyệt rất cũ rất thấp, nên không phải là ưu tiên cao để khắc phục sự cố.
* *Mức độ ưu tiên cao - Mức độ nghiêm trọng thấp*
Điều này có thể xảy ra khi: ví dụ, logo hoặc tên của công ty không được hiển thị trên trang web. Điều này khiến cho hình ảnh của công ty bị ảnh hưởng. Vì vậy phải khắc phục sự cố càng sớm càng tốt, mặc dù nó không gây ra nhiều thiệt hại.
* *Mức độ ưu tiên thấp - Mức độ nghiêm trọng thấp*
Đối với những trường hợp lỗi không gây ra thảm họa và chỉ ảnh hưởng đến số lượng khách hàng rất nhỏ, cả Độ nghiêm trọng và Mức độ ưu tiên đều thấp, ví dụ: trang chính sách bảo mật mất nhiều thời gian để tải. Không nhiều người xem trang chính sách bảo mật và tải chậm không ảnh hưởng đến khách hàng nhiều.

### 6. Kết luận

Việc xác định mức độ nghiêm trọng và mức độ ưu tiên có thể khác nhau tùy thuộc vào từng dự án và tổ chức. Khi log bug, trách nhiệm của tester là gán và cập nhập mức độ ưu tiên và mức độ nghiêm trọng phù hợp cho từng lỗi. Việc hiểu đúng về mức độ nghiêm trọng, độ ưu tiên của một con bug cho thấy người kiểm thử thực sự hiểu rõ và quan tâm đến chất lượng sản phẩm cũng như thể hiện sự chuyên nghiệp của một kỹ sư kiểm thử.

### 7. Tài liệu tham khảo

https://www.softwaretestinghelp.com/how-to-set-defect-priority-and-severity-with-defect-triage-process/

https://www.guru99.com/defect-severity-in-software-testing.html