![](https://images.viblo.asia/b4b10f08-73e6-4d05-80c4-7550e724c9e5.png)
Trong bài viết này, tôi sẽ cung cấp một cách tổng quan về cách mà các view tạo bằng code trong XML được hiển thị như thế nào trên màn hình điện thoại bằng pixel.
Như các bạn đã biết, kiến trúc của hệ điều hành android gồm 4 tầng. Khi tạo một ứng dụng thì chúng ta thường chỉ quan tâm tới tầng trên cùng là tầng application, vì vậy để tạo ra được một ứng dụng có hiệu năng tốt nhất thì bạn cần biết các phần bên dưới thực hiện công việc như thế nào. Nếu bạn không biết phần cứng đang làm gì, bạn sẽ không thể sử dụng nó một cách hiệu quả nhất.
Đầu tiên chúng ta hãy cũng xem lại những điều cơ bản về vòng đời của một view
# 1. Vòng đời của một view
Một điều mà chắc chúng ta ai cũng đều biết là mỗi view sẽ có một vòng đời riêng. Tuy nhiên, trong một màn hình có nhiều view, các view lồng nhau,... thì vòng đời của từng view sẽ được gọi như thế nào ? Đây là một điều vô cùng quan trọng để chúng ta có thể tạo ra những ứng dụng có hiệu năng tốt nhất. Chúng ta hãy cùng xem vòng đời của một view
![](https://images.viblo.asia/b56bac0b-4dac-4d9d-826f-5072523f9564.png)

Mỗi phương thức trong vòng đời của view sẽ có mục đích sử dụng khác nhau. Bây giờ hãy cùng đi sâu vào chi tiết của một vài phương thức quan trọng nhất. `onMeasure ()` là một phương thức được gọi để xác định các yêu cầu kích thước cho view này và tất cả các phần tử con của nó. `onLayout ()` là phương thức được gọi khi view gán kích thước và vị trí cho tất cả các phần tử con của nó. o`nDraw ()` được gọi khi view sẵn sàng hiển thị nội dung của nó.

Tôi sẽ không đi sâu vào chi tiết của mọi phương thức.  Để biết thêm chi tiết, hãy xem[ bài viết](https://proandroiddev.com/the-life-cycle-of-a-view-in-android-6a2c4665b95e) này.

# 2. Rasterization
Rasterization là quá trình chuyển đổi một số đối tượng như một chuỗi ký tự, các nút hoặc các đa giác thành các điểm ảnh( pixel ) trên màn hình điện thoại. Rasterization là một quá trình tốn rất nhiều thời gian. Vì vậy, GPU (Bộ xử lý đồ họa) ra đời để tăng tốc quá trình rasterization. GPU được thiết kế theo cách chỉ sử dụng các đối tượng cụ thể như đa giác v.v. 
CPU chịu trách nhiệm cung cấp nội dung cho GPU trước khi nó có thể hiển thị mọi thứ trên màn hình của bạn.

![](https://images.viblo.asia/1ee3a98e-f2ce-4644-b2e0-b250cab485bc.png)

Quá trình chuyển dữ liệu từ CPU sang GPU này được thực hiện bởi một API phổ biến có tên OpenGL ES. Tại bất kỳ thời điểm nào, các đối tượng UI, như nút, đường dẫn, v.v., cần được vẽ lên màn hình. Đầu tiên, chúng được chuyển đổi thành đa giác và kết cấu bởi CPU, và sau đó, chúng được chuyển sang GPU để rasterize.

# 3. Ví dụ
Hãy cùng xem một ví dụ đơn giản về việc hiển thị một nút trên màn hình. Vì vậy, ở đây nút hoặc bất kỳ đối tượng UI nào khác trước tiên cần được chuyển đổi thành đa giác và kết cấu bởi CPU trước khi đưa nó vào GPU.

Quá trình chuyển đổi các đối tượng UI thành lưới rất tốn thời gian. Và sau khi chuyển đổi, quá trình tải thông tin này từ CPU lên GPU thông qua API OpenGL ES cũng là một quá trình mất nhiều thời gian.

![](https://images.viblo.asia/9e64373c-a6f8-4fcf-94ad-18162ee34807.png)

Những hoạt động này không dễ dàng và rất tốn thời gian. Khi OpenGL ES tải nội dung lên GPU, lưới biểu thị đối tượng UI vẫn ở trên GPU. Vì vậy, trong tương lai, nếu bạn muốn vẽ lại nút trên màn hình, chúng tôi sẽ cần tham chiếu lưới đã có và cho OpenGL ES biết cách vẽ.

Mẹo: Tối ưu hóa để hiển thị hiệu suất có nghĩa là lấy càng nhiều dữ liệu càng tốt trên GPU và để nó ở đó và tham chiếu nó càng lâu càng tốt mà không cần sửa đổi.
# 4. Hiển thị danh sách
Khi một view cần được hiển thị, một danh sách hiển thị được tạo cho khung nhìn đó. Khi view đó cần được hiển thị ra màn hình, chúng ta cần  hiển thị đó bằng cách gửi các lệnh vẽ của nó tới GPU.

![](https://images.viblo.asia/9136dcaf-cd07-49bb-9ad3-066f9c72f4d5.png)

Danh sách hiển thị chứa tất cả thông tin để hiển thị chế độ xem trên GPU. Nó có thể chứa các tài sản GPU, GPU có thể cần thiết hoặc các lệnh cần được thực thi cho hai OpenGL để hiển thị từng tài khoản một.

Trong tương lai, nếu có sự thay đổi về thuộc tính của chế độ xem, chúng ta chỉ cần thực hiện danh sách hiển thị đó thêm một lần nữa. Nhưng trong tương lai, nếu có sự thay đổi trực quan của chế độ xem, thì danh sách hiển thị trước đó không còn hợp lệ - vì vậy chúng tôi cần tạo lại danh sách hiển thị và thực hiện lại để cập nhật màn hình.

Mẹo: Nếu tại bất kỳ thời điểm nào, nội dung của chế độ xem thay đổi, nó sẽ lặp lại quá trình tạo lại và thực hiện cập nhật lại danh sách hiển thị. Vì vậy, hiệu suất phụ thuộc vào mức độ phức tạp của view.

Giả sử có sự thay đổi kích thước của view. Sau đó, `onMeasure()` bắt đầu được gọi, nó sẽ hỏi mọi view trong cấu trúc phân cấp xem kích thước mới của chúng là gì. Và nếu có sự thay đổi vị trí của view, phương thức `therequestLayout ()` sẽ được gọi. Hoặc nếu một nhóm view định vị lại các con của nó, được gọi và đi qua toàn bộ hệ thống phân cấp nơi mọi trẻ em cần được định vị.

Vì mỗi giai đoạn mất thời gian riêng, nó có thể không có tác động lớn. Nhưng trong trường hợp có các view hoặc nhóm view khác tùy thuộc vào chúng, chúng có thể có tác động đến hiệu suất.
![](https://images.viblo.asia/4bdf9b0b-2acf-45b4-b91c-051c20dba387.png)

Mẹo: Vì vậy, để các ứng dụng hoạt động tốt hơn, chúng tôi cần duy trì hệ thống phân cấp chế độ xem ở dạng phẳng giúp giảm thời gian để cập nhật view.
Tôi nghĩ rằng bạn đã có một cái nhìn tổng quan cơ bản về cách hiển thị. Nếu bạn muốn biết thêm những thứ như các thành phần nào được sử dụng trong khi kết xuất, đường dẫn hiển thị là gì và cách đồng bộ hóa xảy ra giữa UI và phần cứng, vui lòng kiểm tra trên Android Android Internals để hiển thị View.

# 5. Tham khảo
https://medium.com/better-programming/understand-how-view-renders-in-android-763f0adfb95c