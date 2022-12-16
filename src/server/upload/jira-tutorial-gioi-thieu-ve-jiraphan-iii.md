**3.Tạo và làm việc với Sub-Task trong JIRA**


Tiếp nối loạt bài giới thiệu về JIRA, trong phần này chúng tôi sẽ giới thiệu về Tạo và làm việc với các Sub-task trong JIRA.

Thế nào là sub-task? Sub-task chính là 1 công việc nhỏ được phân chia từ một công việc chính(task) để có thể chỉ định và theo dõi riêng lẻ.

Ví dụ đối với QA, khi nhận được yêu cầu của khách hàng, thường có công việc chính là viết Tcs, nhưng việc viết TCs này cần 1 tuần để hoàn thành.Vì thế công việc chính này được chia thành các khối công việc và assign cho 1 số người nhất định.

Trong trường hợp này, chúng ta có thể tạo 1 issue trên JIRA với loại hình là Task như sau: 'Create TCs' và các sub-task dưới đây:

1.  Create TCs for Login function – assigned to resource 1
1.  Create TCs for Signup function – assigned to resource 2
1.  Create TCs for Logout function – assigned to resource 1
1.  Cteate TCs for Home screen -– assigned to resource 2

Ví dụ 2.Liên quan đến bug, nếu gặp phải 1 lõi cần thay đổi mã code để sửa lỗi, developer ó thể sử dụng sub-task để theo dõi và fix bug, tại đây việc fix bug(sub-task) trở thành nhiệm vụ phụ trong việc tìm ra bug(Type là Bug)

Bạn có thể tạo sub-task bằng 2 cách
Tạo 1 sub-task cho 1 vấn đề(issue) hoặc Chuyển đổi 1 issue thành 1 sub-task và chọn 1 task cha.Thực hiện 2 phương án đó trong JIRA như thế nào ?

**Phương thức 1**.Tạo 1 sub-task dưới 1 issue cha

Với điều kiện là issue cha đó đã được tạo trước đó, dưới đây là các bước để tạo sub-task:

1.Mở 1 issue.Click 'More' drop-down ở trên menu TOP.Chọn 'Create sub-task' trên danh sách xổ xuống

![](https://images.viblo.asia/aaea40b1-c2a1-4d98-b18d-3f5abe9d748e.jpg)

2.Màn hình 'Tạo sub-task' hiển thị cùng với issue cha.MÀn hình này giống với màn hình tạo issue , ngoại trừ:

**Project**: Mục này không tồn tại, bởi vì sub-task sẽ theo dự án mà issue cha cua nó đã tạo từ trước

**Issue Type** : Mục này auto sẽ là subtask.Menu xổ cuống cũng có 'Technical Task' thay thế.Trong trường hợp ví dụ 2 sẽ sử dụng 'Technical Task' có vẻ sẽ hợp lý hơn. 

![](https://images.viblo.asia/9031300e-a672-412d-b379-75ded91911e7.jpg)

3.Nhập thông tin như mong muốn , sau đó click 'Create' button để tạo sub-task.Sau khi được tạo thì , link liên kết tới Sub-task sẽ được xuất hiện trong phần 'Sub-task' của issue gốc như bên dưới:

![](https://images.viblo.asia/7fa30e53-ac2b-40bd-9b88-d6156b98d9d7.jpg)

**Chú ý:**  Bạn có thể chọn thêm mới 1 sub-task bằng cách click dấu '+'  trên phần nhiệm vụ phụ (subtask) hiển thị ảnh trên


4.Click vào link subtask, màn hình sub-task detail hiển thị như dưới đây:

![](https://images.viblo.asia/c13c0420-5144-4bfa-805a-4c7c7aea4a56.jpg)


**Phương thức 2**: Chuyển đổi 1 issue thành 1 sub-task

1. Mở 1 vấn đề đã tạo.Đi tới dropdown và chọn 'Convert to Sub-task'.Màn hình sau đây được hiển thị:
- Nhập ID issue hoặc bạn có thể tìm kiếm bằng cách sử dụng liên kết được cung cấp.
- Khi thông báo trên màn hình chỉ định: Chỉ các vấn đề loại không thuộc loại nhiệm vụ đã tồn tại trong cũng 1 dự án được chọn.
- Chọn loại sub-task hoặc technical task
- Click Next

![](https://images.viblo.asia/3f3877e2-42c1-440e-a580-46c71e372517.jpg)

2. Tiếp tục click Next với bước 2,3
3. Ở bước 4 sẽ hiển thị Tóm tắt chuyển đổi.Chịn Finish để chuyển đổi 1 issue sang sub-task.

![](https://images.viblo.asia/25710589-fc4d-4667-b1aa-ee83c8db4ab0.jpg)

4. Vấn đề này bây giờ sẽ được hiển thị trong phần 'Sub-task' của Phần chính


**Một số điểm cần chú ý:**

1. Bạn có thể có nhiều sub-task trong 1 vấn đề
2. Bạn không thể tạo sub-task cho sub-task
3. Khi bạn tạo 1 sub-task dưới 1 task cha, thì task cha đó không thể convert thành sub-task
4. Tuy nhiên, một subtask có thể được chuyển thành một vấn đề cha. Để làm như vậy, hãy chuyển đến tùy chọn “More-> Convert to Issue”. Màn hình sau đây xuất hiện. Quá trình này tương tự như phương pháp 2 trong quá trình tạo vấn đề. Chọn loại vấn đề mới và làm theo tất cả các bước để chuyển đổi sub-task thành một vấn đề.

![](https://images.viblo.asia/36e18a47-166d-40c4-b811-3d12a1522352.jpg)

5. Đối với 1 issue và sub-task, Phần 'Time tracking' se3x hiển thị thời gian hợp nhất của issue và sub-task

![](https://images.viblo.asia/5792828b-43e0-4979-8bfc-06a938dbab78.jpg)

6. Trong 1 sub-task , bạn có thể chọn hiển thị tất cả các sub-tasks hoặc chỉ hiển thị các tác vụ đang mở bằng cách click vào drop-down bên cạnh dấu '+'

![](https://images.viblo.asia/a04e4bc9-1678-498b-a059-348cf6f1bb69.jpg)

7. Bạn có thể làm việc trên sub-task của mình mà không cần điều hướng khỏi issue gốc .Bằng cách click vào biểu tượng setting như hình bên dưới.Bạn có thể thực hiện các hành động mình mong muốn như trong danh sách xổ xuống.

![](https://images.viblo.asia/593dc0d1-ae9b-4aee-b3f5-3fbeec26d5f6.jpg)

Trên đây là tất cả những điều cần biết về sub-task in JIRA.Hẹn các bạn trong loạt bài tiếp theo!