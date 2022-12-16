<div align="center">
    
# Lời mở đầu
    
</div>

![](https://images.viblo.asia/f0bafe2f-3d91-4174-9aaa-dfbfa7ecff05.jpg)

- Xin chào các bạn, mình lại quay trở lại rồi đây. Là một người dùng linux thì chắc hẳn bạn đã ít nhất 1 lần gặp phải dòng thông báo **"`You don't have permission to ...`"** và khi bạn lên google tìm cách giải quyết thì đây là một cách rất dễ để tìm thấy:

    ```bash
    sudo chmod -R 777 path-to-file-or-folder
    ```
 
    Sau khi bạn chạy câu lệnh đó xong thì vấn đề của bạn đã được giải quyết :scream::scream::scream: nhưng liệu bạn đã thực sự hiểu về con số **777** thần thánh kia chưa?
    
- Nếu chưa biết thì bài viết này viết ra là dành cho bạn, còn nếu đã biết rồi thì hãy cùng nhau ôn lại kiến thức một chút nhé. Bắt đầu thôi nào!

<div align="center">
    
# Nội dung
    
</div>

## Tại sao lại cần phải phân quyền?

- Trong cuộc sống nói chung và trong các hệ điều hành nói riêng thì việc phân quyền là vô cùng cần thiết, nó diễn ra hàng ngày mà có thể chúng ta không để ý đến. Lấy một ví dụ đơn giản là khi bạn mua một món đồ về (bằng tiền của bạn nhé) thì 
    - Bạn sẽ có toàn quyền đối với món đồ đó (dùng/bán/vứt đi/...) 
    - Nếu người khác muốn xem, muốn mượn thì đều phải hỏi ý kiến bạn, và hành động có đồng ý cho mượn/cho xem ấy chính là một hình thức của phân quyền. 
    - Nếu như không được sự đồng ý mà vẫn cố tình lấy/xem thì chính là vi phạm, và trong hệ điều hành thì hành vi này sẽ bị ngăn chặn.

    => dùng một ví dụ đơn giản như vậy cho các bạn có thể dễ hình dung, và bây giờ thì bắt đầu đến với hệ thống máy tính, hãy coi ***món đồ*** ở trên là một file/folder trong hệ thống thì bạn sẽ cần phải cấp quyền cho ai được phép xem/sửa/xóa/... file/folder đó của bạn.

## Lý thuyết phân quyền trong linux như thế nào?

Khi phân quyền trong hệ thống linux, chúng ta cần chú ý đến hai điều: 

- **Permission Groups**: những user trọng hệ thống sẽ được chia thành 3 nhóm cơ bản như sau:
    - Owner: chủ sở hữu file
    - Group: một nhóm được gán quyền nào cho file thì những user nằm trong nhóm sẽ có quyền đó. 
    - Other: những user còn lại (không thuộc 2 loại trên)

- **Permission Type**: có 3 loại quyền cơ bản trong linux là **đọc, ghi** và **thực thi** file như bảng bên dưới
        
| Quyền | Ký hiệu | Dạng số | Mô tả |
| -------- | -------- | -------- | -------- |
| Read     | r     | 4     | Đọc file |
| Write     | w     | 2     | Ghi//sửa gile |
| Execute     | x     | 1     | Thực thi file |
    
- Đến đây thì chắc các bạn đã đoán được ý nghĩa của con số 7 rồi đúng không nào (nó chính là tổng của 3 con số trên, tức là toàn bộ quyền **đọc, ghi** và **thực thi**), quá quyền lực phải không. Nhưng tại sao lại là **777** thì chúng ta hãy tiếp tục đến với cách kiểm tra quyền hiện tại của file nhé. Nếu các bạn đã quen với câu lệnh **ls** để liệt kê danh sách file/folder thì chỉ cần thêm tùy chọn **-l** để xem được chi tiết phân quyền như sau:

    ![](https://images.viblo.asia/2147c016-f2ae-47ca-b6ec-8d3aa7e81656.png)

    Nói sơ qua về các giá trị phía trên như sau: 
    - Cột 1 (-rw-rw-r--): 
        - **'-'** đầu tiên là để xác định loại file: **'-'** tức là file thông thường, **'d'** thì là thư mục, **'c'** thì là thiết bị và **'l'** (L nhé, không phải I đâu) là liên kết.
        - **'rw-'**: bộ 3 đầu tiên là quyền hạn của Owner.
        - **'rw-'**: bộ 3 tiếp theo là quyền hạn của Group.
        - **'r--'**: bộ 3 cuối này là quyền hạn của Other.
    - Cột 2 (số 1): số này để chỉ số lượng liên kết với file, số 1 ở đây có nghĩa là nó chỉ có 1 liên kết cứng trỏ tới chính nó.
    - Cột 3: chủ sở hữu của file
    - Cột 4: nhóm group sở hữu file.
    - Những cột tiếp theo là dung lượng, thời gian tạo và tên file/folder thôi.
 
 - Sau khi đã hiều về phân quyền trong hệ thống linux thì chúng ta quay lại với câu lệnh ở trên, mỗi số sẽ tương ứng với quyền hạn của lần lượt Owner/Group/Other.
     ```bash 
     chmod -R 777
     ```
    Ở đây tức là bạn đã cho một user bất kỳ có toàn bộ quyền hạn đối với file của bạn, một hành động khá là **VÔ TRÁCH NHIỆM**. 
    - Nếu bạn bảo máy này có mỗi bạn dùng, chả có user nào khác thì ok, 
    - Nhưng chả nhẽ bạn chỉ làm việc với mỗi môi trường local, còn môi trường server thì sao, khi đó hành động này có thể tạo ra lỗ hổng để người khác tấn công vào server của bạn.
    
    => vì vậy hãy tập cho mình thói quen đừng **777** bừa bãi nhé.
    
 
<div align="center">
    
# Kết luận
    
</div>

- Sau bài viết này, hy vọng các bạn đã biết cách phân quyền trong linux nói chung và Ubuntu nói riêng một cách hợp lý, tránh trường hợp spam **777** dẫn đến những hậu quả đáng tiếc sau này, nhất là khi làm việc với server thay vì môi trường local. 
- Nếu trong bài viết có vấn đề gì về việc diễn đạt khiến các bạn khó hiểu, đừng ngần ngại comment xuống dưới, mình sẽ cố gắng sửa và giải thích rõ hơn cho các bạn. Rất cảm ơn các bạn đã dành thời gian ủng hộ những bài viết của mình.

<div align="center">
    
# Tài liệu tham khảo
    
</div>

- https://help.ubuntu.com/community/FilePermissions
- https://www.linux.com/training-tutorials/understanding-linux-file-permissions/