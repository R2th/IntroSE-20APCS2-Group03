## 1. Các phương pháp thực hiện sercurity testing
### **1.1 Khám phá**

Mục đích của giai đoạn này là xác định phạm vi hệ thống và các dịch vụ đang sử dụng. Nó không có ý định phát hiện lỗ hổng, nhưng phát hiện phiên bản phần mềm hoặc phần mềm không được hỗ trợ. Do đó cho biết lỗ hổng tiềm ẩn.

### **1.2 Quét lỗ hổng**

 **Khái niệm**
 
 Quét lỗ hổng là hình thức quét dựa trên thông tin xác thực nhằm loại bỏ một số thông báo không chính xác (thông qua sử dụng thông tin đăng nhập được cung cấp để xác thực- chẳng hạn như tài khoản).
Trong giai đoạn khám phá, giai đoạn này sẽ tìm kiếm các vấn đề bảo mật đã biết bằng cách sử dụng các công cụ tự động phù hợp với các lỗ hổng đã biết.
Mức độ rủi ro được thiết lập tự động bởi công cụ không có xác minh hoặc thủ công bởi nhà cung cấp thử nghiệm.

**Giới thiệu các công cụ quét lỗ hổng bảo mật**

Ngày nay có rất nhiều công cụ hỗ trợ việc quét lỗ hổng bảo mật. Dưới đây là 2 công cụ khá phổ biến, dễ sử dụng và mang lại hiệu quả cao.
1. CyStack Scanning: Tự động dò quét và phát hiện lỗ hổng bảo mật

CyStack Scanning App của CyStack thực hiện việc phân tích và phát hiện hơn 200 lỗ hổng web nguy hiểm dựa trên tiêu chuẩn bảo mật OWASP 4.0. Ứng dụng sẽ liên tục được cập nhật hàng ngày bởi các chuyên gia
![](https://images.viblo.asia/ea4e379e-7cdd-43a5-9d0f-ea817fcdfe7c.png)

2.Protecting: Tường lửa ứng dụng Web giúp ngăn chặn các hình thức tấn công từ tin tặc và mã độc

CyStack Protecting là mọt network có khả năng phân tích và ngăn chặn các cuộc tấn công mạng vào website thông qua việc phân tích, bóc tách các HTTP/s request. Ngăn chặn các cuộc tấn cong mạng, các Bad Request trước khi có thể xâm nhập vào website.
![](https://images.viblo.asia/cfe2b5eb-e7c2-4a3f-92b0-7b9f766cee5c.png)

### **1.3 Đánh giá tổn thất**

Sử dụng tính năng quét tìm kiếm để xác định các lỗ hổng bảo mật và đặt các phát hiện tại bối cảnh của môi trường đang được kiểm tra. Việc này sẽ loại bỏ các kết quả giả khỏi báo cáo và quyết định các mức độ rủi ro cần được áp dụng cho mỗi phát hiện để cải thiện

### **1.4 Đánh giá an ninh**

Xây dựng dựa trên Đánh giá tổn thất bằng cách thêm xác minh thủ công để xác nhận hiển thị, nhưng không bao gồm việc khai thác lỗ hổng để truy cập thêm. Việc xác minh có thể dưới dạng quyền truy cập được ủy quyền vào hệ thống để xác nhận cài đặt hệ thống và kiểm tra nhật ký, phản hồi hệ thống, thông báo lỗi, code, v.v.

Quy trình đánh giá an ninh

Bước 1: Kiểm tra hệ thống sơ bộ

Bước 2: Đưa ra những phương pháp đánh giá

Bước 3: Tiến hành kiểm tra và đánh giá hệ thống an ninh mạng

Bước 4: Báo cáo kết quả

Bước 5: Hỗ trợ khắc phục các lỗ hổng an ninh


### **1.5 Kiểm tra sự xâm nhập**

Kiểm tra sự xâm nhập là đánh giá độ an toàn bằng cách tấn công vào lỗ hổng trên hệ thống. Những lỗ hổng này có thể tồn tại trong hệ điều hành mở, dịch vụ và lỗi ứng dụng, cấu hình không phù hợp, hoặc rủi ro từ hành vi người dùng. Các đánh đó rất hữu ích trong việc xác định tính hiệu quả của cơ chế phòng thủ, cũng như sự tuân thủ của người dùng cuối với chính sách bảo mật.

Thông tin về bất cứ lỗ hổng bảo mật nào được khai thác thành công qua kiểm tra thâm nhập được tổng hợp và trình bày tới các nhà quản lý hệ thống công nghệ thông tin để giúp các chuyên gia đưa ra các chiến lược và biện pháp ưu tiên khắc phục. Mục địch cơ bản của việc kiểm tra xâm nhập là để đo tính khả thi của hệ thống hoặc sự thỏa hiệp của người dùng cuối và đánh giá bất kỳ hậu quả có liên quan như sự cố tài nguyên hoặc các hoạt động liên quan.


### **1.6 Kiểm tra an ninh**

Được điều khiển bởi chức năng Kiểm tra hoặc Đánh giá Rủi ro để xem xét một vấn đề kiểm soát cụ thể. Loại kiểm tra này có thể sử dụng bất kỳ phương pháp nào đã được thảo luận trước đó (đánh giá tổn thất, đánh giá bảo mật, kiểm tra thâm nhập).

### **1.7 Đánh giá bảo mật**

Xác minh rằng các tiêu chuẩn an ninh đã được áp dụng cho các thành phần hoặc sản phẩm của hệ thống. Điều này thường được hoàn thành thông qua phân tích khoảng cách và sử dụng các đánh giá xây dựng hoặc mã hoặc thông qua cách xem xét các tài liệu thiết kế và sơ đồ kiến trúc. Hoạt động này không sử dụng bất kỳ phương pháp nào trước đó 

Các phương pháp kiểm tra bảo mật cho website

 **Hộp đen (Blackbox)**

Phương pháp kiểm tra hộp đen các lỗi bảo mật trên ứng dụng web là việc kiểm tra khả năng bảo mật của ứng dụng từ bên ngoài. Quan sát các dữ liệu được gửi đến ứng dụng và các dữ liệu từ ứng dụng xuất ra mà không cần hiểu đến hoạt động bên trong của nó. Quá trình xử lý dữ liệu từ bên ngoài đến ứng dụng có thể thực hiện bằng thủ công hoặc sử dụng công cụ tự động gửi đến ứng dụng.

Kiểm tra bảo mật cho website thủ công là quá trình kiểm tra mà người kiểm tra phải xác định vị trị dữ liệu cần được gửi đến đến ứng dụng bằng cách sử dụng các intercepting proxy và tập dữ liệu cần đệ trình đến ứng dụng tương ứng với các vị trí đệ trình đã xác định trước đó

**Hộp trắng (Whitebox)**

Phương pháp kiểm tra hộp trắng các lỗi bảo mật trên ứng dụng web là quá trình kiểm tra trực tiếp mã nguồn của ứng dụng web để tìm ra các lỗi bảo mật. Quá trình quan sát và kiểm tra mã nguồn có thể thực hiện thủ công hoặc thực hiện bằng công cụ. Quá trình thực hiện bằng công cụ tức là quá trình mà công cụ sẽ thực hiện quét toàn bộ mã nguồn của ứng dụng và dựa trên tập nhận biết các hàm, các chỉ dẫn có khả năng gây ra lỗi bởi ngôn ngữ lập trình phát triển ứng dụng web.


## 2. Áp dụng sercurity testing trong kiểm thử



|Quy trình kiểm thử | Sercurity testing |
| -------- | -------- | -------- |
| Phân tích yêu cầu    | Phân tích bảo mật cho các yêu cầu và kiểm tra tình trạng lạm dụng / trường hợp sử dụng sai  |
| Thiết kế   |Phân tích rủi ro bảo mật cho thiết kế. Xây dựng kế hoạch kiểm tra bao gồm các bài kiểm tra an ninh     |
|Coding & kiểm thử đơn vị   | Kiểm thử hộp trắng    |
| Kiểm thử  tích hợp  | Kiểm thử hộp đen   |
| Kiểm thử hệ thống    |Kiểm thử hộp đen, quét lỗ hổng |
| Thực hiện   | Kiểm tra thâm nhập, quét lỗ hổng         |
| Support   | Phân tích tác động  |

## 3. Quy trình thực hiện sercurity testing

1. Hiểu ngữ cảnh:

Khi nói đến sercurity testing trước hết chúng ta phải hiểu các quy tắc liên quan đến tuân thủ bảo mật và quy tắc của tổ chức và tác động của nó đối với việc sử dụng và bảo trì ứng dụng cụ thể.

2. Phân tích kiến trúc bảo mật:

Thực hiện một nghiên cứu về các loại tính năng bảo mật, sẽ là một phần của ứng dụng.

3. Chọn loại kiểm tra bảo mật:

Sau khi xác định danh sách các lỗ hổng bảo mật và điểm yếu có thể có trong ứng dụng sẽ tiến hành chọn loại thử nghiệm bảo mật, . Đối với điều này, tất cả thông tin liên quan đến thiết lập hệ thống, hệ điều hành, mạng, cơ sở dữ liệu, phần cứng, vv sẽ được thu thập.

4. Thực hiện mô hình hóa đe dọa

người kiểm thử sẽ mô hình hóa đe dọa, tìm ra các lỗ hổng và tạo ra các bản ghi chi tiết về các mối đe dọa/lỗ hổng đó

5. Tạo một kế hoạch kiểm tra:

Bước tiếp theo sẽ là tạo một kế hoạch kiểm tra để thực hiện kiểm tra bảo mật sau khi xác định danh sách các mối đe dọa và lỗ hổng tiềm năng.

6. Xây dựng ma trận truy xuất nguồn gốc:

Một ma trận truy xuất nguồn gốc sẽ được tạo ra cho mỗi mối đe dọa / rủi ro / lỗ hổng được xác định.

7. Xác định và lựa chọn công cụ bảo mật:

Bước tiếp theo là lựa chọn một công cụ sẽ được sử dụng để thử nghiệm. Sử dụng các công cụ Tự động hóa để kiểm tra bảo mật có thể hiệu quả hơn so với kiểm tra thủ công. Có nhiều công cụ tự động hóa có sẵn để thực hiện kiểm tra bảo mật các ứng dụng web.

8. Tiến hành các trường hợp thử nghiệm:

Ở bước này sẽ thực hiện trường hợp thử nghiệm sau đó xác định các khiếm khuyết.

9. Chuẩn bị trường hợp kiểm thử:

Người kiểm thử sau đó sẽ chuẩn bị trường hợp kiểm thử để kiểm tra bảo mật.

10. Báo cáo:

Bước cuối cùng sẽ là đệ trình báo cáo chi tiết cuối cùng của thử nghiệm bảo mật. Báo cáo này sẽ chứa danh sách các mối đe dọa và điểm yếu được xác định. Báo cáo sẽ xác định các vấn đề đã được giải quyết và cách chúng được giải quyết. Nó cũng sẽ làm nổi bật các vấn đề vẫn còn mở.

***Tài liệu tham khảo:***
https://www.guru99.com/what-is-security-testing.html