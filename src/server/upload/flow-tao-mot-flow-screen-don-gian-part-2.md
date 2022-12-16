Bài trước chúng ta đã cùng nhau tạo một flow có một form cho phép User nhập thông tin. Ở bài viết này, chúng ta tiếp tục xử lý sau khi người dùng nhập firstname, lastname và click vào button **Finish**
### Mục tiêu bài học
* Tìm thông tin Firstname, Lastname trong Contact
* Cho phép User update hoặc tạo mới một Contact
### Sử dụng đối tượng **Get Records** để lấy ra contact
1. Từ tab *Elements* của Toolbox, tìm đối tượng **Get Records** kéo thả vào Canvas
2. Nhập các giá trị như bên dưới
    | Field | Value |
    | -------- | -------- |
    | Label     | Find a Match     |
    | API Name     | Find_a_Match     |
    | Object     | Contact     |
3. Tại *Filter Contact Records > Condition Requirements* chọn **All Conditions Are Met (AND)**
4. Nhập điều kiện như dưới
    | Field | Operator | Value |
    | -------- | -------- | -------- |
    | FirstName      | Equals      | {!contact.FirstName}      | 
5. Click *Add Condition* thêm điều kiện bên dưới
    | Field | Operator | Value |
    | -------- | -------- | -------- |
    | LastName       | Equals      | {!contact.LastName}      | 
    
    ![image.png](https://images.viblo.asia/6584cc1c-1417-4002-9a38-b611e4be555b.png)
    
7. Click **Done**
8. Tạo connect node Từ *Contact Info* Screen tới *Find a Match*
    ![image.png](https://images.viblo.asia/9dedfdb2-ffe0-49fd-a2e7-d1cf99e28224.png)
9. Lưu lại flow

Ở bài này chúng ta đã tạo đối tượng *Get Record* , lấy ra các contact có Firstname và Lastname tương ứng với Firstname và Lastname người dùng nhập tại *Contact Info* Screen.
Ở bài tiếp theo, chúng ta sẽ kiểm tra xem contact có tồn tại hay chưa? và đã có contact sẽ update lại info, còn ngược lại cho phép người dùng tạo một contact mới.

**Phần 1** [Flow: Tạo một Flow Screen đơn giản (Part 1)](https://viblo.asia/p/flow-tao-mot-flow-screen-don-gian-part-1-naQZRBOjZvx)