Một ứng dụng luôn có các API được tạo đẹp mắt, đúng quy chuẩn có lẽ là 1 điều thật tuyết vời đối với mọi chúng ta đúng không!!!
![](https://images.viblo.asia/6a0c33da-848f-4630-91d4-895ace353fe2.jpeg)

Facebook, Google, GitHub, Netflix và một vài gã khổng lồ công nghệ khác đã và đang cho các nhà phát triển và sản phẩm có cơ hội tiêu thụ dữ liệu của họ thông qua API và trở thành nền tảng cho họ.

Ngay cả khi bạn không viết API cho các nhà phát triển và sản phẩm khác, ứng dụng của bạn luôn có các API được tạo thủ công rất tốt và tiện lợi cho chúng ta :).

Có một cuộc tranh luận kéo dài trên internet về những cách tốt nhất để thiết kế API và đó là một trong những sắc thái nhất. Và dĩ nhiên như mọi cuộc thảo luận khác luông không có hướng dẫn chính thức được xác định cho nó.

API là một giao diện thông qua đó nhiều developer tương tác với dữ liệu. Một API được thiết kế tốt luôn rất dễ sử dụng và làm cho cuộc sống của developer rất trơn tru và nhanh chóng (Khoẻ).

API là GUI dành cho developer , nếu nó khó hiểu hoặc không dài dòng, thì developer sẽ bắt đầu tìm giải pháp thay thế hoặc ngừng sử dụng nó. Kinh nghiệm của các developer là số liệu quan trọng nhất để đo lường chất lượng của các API.

Có thể nói "API giống như một nghệ sĩ biểu diễn trên sân khấu và người dùng của nó là khán giả (là chúng ta)."

# Terminologies (Thuật Ngữ)
Các chú ý quan trọng liên quan đến API REST:

   * Resource (Tài nguyên) là một đối tượng hoặc đại diện của một cái gì đó mà nó có một số dữ liệu liên quan với nó và có thể có một tập hợp các phương thức để vận hành trên nó. Ví dụ. động vật, trường học và nhân viên là tài nguyên và xóa, thêm và cập nhật là các hoạt động được thực hiện trên các tài nguyên này.
    * Collections (Bộ sưu tập) là một tập hợp các Resource, ví dụ: công ty là tập hợp các nguồn lực của công ty.
    * URL (Bộ định vị Resource đồng nhất) là một đường dẫn qua đó Resource có thể được định vị và các hành động có thể được thực hiện trên đó.

# API Endpoint (Hậu tố) 
Mình không biết phải nói như thế nào cho chuẩn vì thế hãy nhìn vào bài toán sau:
- Hãy để cuốn sách viết một vài API cho các công ty có một số nhân viên để hiểu thêm.
/getAllEmprocod là một API sẽ phản hồi với danh sách nhân viên. Một vài API nữa xung quanh một công ty sẽ trông như sau:
    * /addNewEmployee
    * /updateEmployee
    * /deleteEmployee
    * /deleteAllEmployees
    * /promoteEmployee
    * /promoteAllEmployees
Và sẽ có hàng tấn điểm API Endpoint khác như thế này cho các request khác nhau. Tất cả những thứ đó sẽ chứa nhiều hành động dư thừa. Do đó, tất cả các API Endpoint này sẽ rất nặng nề để duy trì khi số lượng API tăng.
# What is wrong?
URL chỉ nên chứa resources(danh từ), không phải hành động hoặc động từ. Đường dẫn API /addNewEmployee chứa hành động addNew cùng với tên resource Nhân viên.
# Cách chính xác là gì?
API /companies endpoint là một ví dụ tốt không chứa hành động. Nhưng câu hỏi là: Làm thế nào để tôi nói với máy chủ về các hành động được thực hiện trên resource của công ty và liệu có nên thêm, xóa hoặc cập nhật không?

Đây là nơi mà các phương thức HTTP (GET, POST, DELETE, PUT), còn được gọi là động từ, đóng một vai trò quan trọng.

Resource phải luôn ở dạng số nhiều trong API endpoint và nếu chúng ta muốn truy cập chi tiết của resource, chúng tôi luôn có thể chuyển ID trong URL.

   * Phương thức GET đường dẫn /companies sẽ nhận được danh sách của tất cả các công ty.
    * Phương thức GET đường dẫn /companies 34 sẽ nhận được thông tin chi tiết về công ty 34.
    * Phương thức XÓA đường dẫn  /companies 34 34 sẽ xóa công ty 34.
Trong một vài trường hợp khác, nếu chúng ta có resource trong một resource, ví dụ: nhân viên của một công ty, thì một vài API endpoint sẽ là:
    * GET /companies/3/employees sẽ nhận được danh sách tất cả nhân viên từ công ty 3.
    * GET /companies/3/employees/45 lấy thông tin chi tiết về nhân viên 45, người thuộc công ty 3.
    * DELETE /companies/3/employees/45 xóa nhân viên 45, người thuộc công ty 3.
    * POST /companies tạo một công ty mới và trả lại các chi tiết của công ty mới được tạo.
    
Bây giờ API có chính xác và nhất quán hơn đúng không?
# Kết luận
Các đường dẫn phải chứa dạng resource số nhiều và phương thức HTTP sẽ xác định loại hành động được thực hiện trên resource.

renference: [RESTful API Designing Guidelines](https://medium.com/better-programming/restful-api-designing-guidelines-the-best-practices-39454135f61)