### Mục tiêu học
Sử dụng Flow builder tạo một flow screen đơn giản.
* Tạo một Form cho phép User nhập lastname và firstname
* Gửi thông tin User nhập tới Salesforce
* Update hoặc tạo mới một contact
### Mở Flow Builder và tạo một đối tượng Screen
1. Tại màn hình Setup, nhập **Flows** vào trong ô *Quick Find*  và Click vào tab Flows
2. Click vào button **New Flow**, chọn **Screen Flow** và chọn **Freeform**
3. Tại tab **Elements** của Toolbox, kéo đối tượng **Screen** vào vùng soạn thảo **Canvas**
 ![image.png](https://images.viblo.asia/8b659761-5ed2-40bd-9b7a-0473f567d998.png)
4. Mở màn hình thuộc tính của đối tượng **Screen**, nhập *Contact Info* vào ô Label, *Contact_Info* sẽ tự động được điền vào ô API name
![image.png](https://images.viblo.asia/4d1b561a-a0d3-4f74-a0c7-82c1e1689b68.png)
5. Click vào **Done**, liên kết 2 đối tượng Start (Screen Flow) và Screen (Contact Info) lại với nhau bằng một **connect node**.
 ![image.png](https://images.viblo.asia/67d85ef1-7769-444b-91c9-09f36dcc6091.png)
6. Click vào button **Save** và nhập các giá trị như bên dưới
    | Field | Value |
    | -------- | -------- |
    | Flow Label     | New Contact     |
    | Flow API Label     | New_Contact     |
7. Click vào button **Save** để lưu lại
### Tạo một biến lưu giá trị của contact
1. Từ Toolbox chọn tab **Manager**
    ![image.png](https://images.viblo.asia/a36c77e5-3880-4791-bdc6-7be960d8eed3.png)
2. Click vào **New Resource**
3. Tại *Resource Type* chọn **Variable**
4. Nhập *contact* vào ô API name
5. Tại *Data Type* chọn **Record**
6. Nhập giá trị *Contact* vào Object
7. Click button Done,  Biến số record  *contact* sẽ được thêm vào tab **Manager** của Toolbox
    ![image.png](https://images.viblo.asia/689574ff-eb2b-43b1-bd35-c0082caf7d3b.png)
8. Click vào **Save** lưu lại flow
### Thêm Form nhập thông tin vào màn hình
1. Tại màn của sổ soạn thảo Canvas, click vào đối tượng screen **Contact Info**
2. Từ Screen Components, kéo đối tượng input **Name** vào màn hình
    ![image.png](https://images.viblo.asia/d1d65c99-677b-4056-a998-d5b9f94b87ba.png)
3. Tại màn hình property của đối tượng input **Name**, nhập *contactName* vào API name
    ![image.png](https://images.viblo.asia/63dddfee-c974-4a48-b922-39a7caa6ec4b.png)
4. Kéo xuống, click vào **Advanced** và chọn *Manually assign variables
5. Thông tin user nhập vào Firstname và Lastname sẽ được lưu vào biến record *contact*
    a. Nhập *{!contact.Firstname}* và mục FirstName
    b. Nhập *{!contact.Lastname}* và mục LastName
6. Click vào button **Done** và **Save** để lưu lại Flow
### Tạo một Record Choice Set cho Account
1. Từ tab **Manager** của Toolbox, click voà **New Resource**, chọn **Record Choice Set** từ Resouce Type
2. Nhập các giá trị như bên dưới    
    | Field  | Field |
    | -------- | -------- |
    | API Name     | accounts     |
    | Object      | Account       |
    | Condition Requirements      | NoneーGet All Account Records    |
    | Choice Label     | Name      |
    | Data Type     | Text      |
    | Choice Value     | Id     |
3. Tại mục *Store More Account Field Values*
    a. Ở ô Field chọn Id
    b. Nhập *{!contact.AccountId}* vào Variable
4. Click vào button **Done**. Một Record Choice Sets accounts sẽ hiển thị ở tab **Manager**
5. Click **Save** đê lưu lại Flow
    ![image.png](https://images.viblo.asia/59cb79a1-a92e-4224-bb25-c6e6b8416399.png)
### Thêm Dropdown Account vào Screen
1. Tại của sổ Canvas, click vào đối tượng Screen *Contact Info*
2. Tại *Screen Components*, tìm *PickList* và kéo vào màn hình ngay sau *Name*
    ![image.png](https://images.viblo.asia/88c30dab-18bb-49b7-9c3c-7dee3406c56d.png)
3. Tại cửa sổ Property của PickList nhập các giá trị như bên dưới
    | Field  | Field |
    | -------- | -------- |
    | Label      | Account      |
    | API Name     | Account      |
    | Data Type     | Text       |
    
    ![image.png](https://images.viblo.asia/de8a387f-3aa9-4874-b4b4-06903da15688.png)
4. Tại danh sách **Choice** của *Configure Choice* chọn *{!accounts}* 
5. Click vào button **Done**
6. Click **Save** đê lưu lại Flow
### Thêm toggler button vào màn hình
Trong trường hợp contact được tìm thấy đã tồn tại, user có thể chọn update hoặc thêm mới contact bằng cách on/off toggle button.
1. Tại của sổ Canvas, click vào đối tượng Screen *Contact Info*
2. Tại *Screen Components*, kéo thả đối tượng **Toggle** vào ngay dưới **Account**
    ![image.png](https://images.viblo.asia/5925bb94-8355-4862-b007-e49ee2786d46.png)
3. Tại cửa sổ Property của Toggle nhập các giá trị như bên dưới
    | Field  | Field |
    | -------- | -------- |
    | Label      | If this contact already exists, update the existing record.      |
    | API Name     | update_toggle      |
    | Active Label     | Update existing       |
    | Inactive Label     | Create other contact       |
    | Manually assign variables    | Off       |
    | Revisited Screen Values    | Use values from when the user last visited this screen    |   
4. Click vào button **Done**
5. Click **Save** đê lưu lại Flow
### Run Flow và hiển thị màn hình
1. Phía trên Canvas, click vào button **Run** để chạy flow
    ![image.png](https://images.viblo.asia/f8ea1f34-fed5-4eb5-a440-92895f6cb999.png)
2. Nhập thông tin Contact và click voà button **Finish**

Làm tới đây, bạn đã có thể tạo một form cho phép User nhập thông tin contact, và chọn một Account từ danh sách Account hiện có từ dropdown.
Hiện tại, sau khi click vào button **Finish** thì chưa có action nào xảy ra cả. Ở phần tiếp theo, chúng ta sẽ so sánh thông tin User nhập vào với thông tin contact đang đã tồn tại trước đó.

**Phần 2** [Flow: Tạo một Flow Screen đơn giản (Part 2)](https://viblo.asia/p/flow-tao-mot-flow-screen-don-gian-part-2-WAyK8B3nlxX)