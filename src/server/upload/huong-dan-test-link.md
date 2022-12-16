## **1. Testlink là gì?**
* Testlink là tool quản lý được sử dụng rộng rãi dựa trên mã nguồn mở. Nó kết hợp đồng thời cả hai Requirements specification (yêu cầu đặc tả) và Test specification (kiểm tra đặc tả). Người dùng có thể tạo một test project và tài liệu test case sử dụng tool này. Chúng ta có thể tạo tài khoản cho nhiều người dùng và assign những quyền người dùng khác nhau.
* Người dùng có thể quản lý test case. Testlink hỗ trợ cả hai việc: thực hiện test case bằng tay và tự động thực thi test case.
* Với tool này thì người kiểm thử có thể sử dụng để xuất ra file test report và tài liệu Test plan trong 1 phút. Nó hỗ trợ xuất ra file Test report của MS Word, Excel, HTML formats.
## **2. Lợi ích của Testlink**
* Hỗ trợ nhiều project
* Dễ dàng import hoặc export test case
* Dễ dàng tích hợp với nhiều tool quản lý defect
* Tự động thực hiện test case thông qua XML-RPC (eXtensible Markup Language - Remote Procedure Call)
* Dễ dàng lọc test case theo keywords, version và testcase ID
* Dễ dàng để assign test case tới nhiều user
* Dễ dàng xuất ra test plan, test report
## **3. Tạo một test project trên Testlink**
Tạo 1 test project bao gồm:
* Test plan
* Test case
* Test scenario
* Test suites
### **3.1. Tạo project**
**Bước 1**: Đăng nhập tài khoản Admin vào màn hình đăng nhập <br>

![](https://images.viblo.asia/0776adb0-8838-4ffe-abc3-46da713b6473.png)

**Bước 2**: Khi đăng nhập vào lần đầu tiên nó sẽ trực tiếp điều hướng tới trang tạo project. Mặt khác chọn Test Project Management” link trên trang chính và nhấn vào 'create' button. <br>
**Bước 3**: Điền thông tin vào trang test project sau đó ấn Create để tạo <br>
Name: Tên của project <br>
Prefix: Sử dụng làm mã các testcase <br>
Description: Mô tả sơ lược về project <br>
Enhanced features: Thực hiện các chức năng nâng cao bằng việc click vào các ô checkbox <br>
Issuae tracker intergration: Tích hợp theo dỗi vấn đề <br>
Availability: Cho phép kích hoạt và công khai project 

![](https://images.viblo.asia/3919ab5f-2c3d-4da3-83fc-d6179d7bfef7.png) 

### **3.2. Tạo test plan**
**Bước 1**: Click vào "“Test Plan Management” link trên màn hình

![](https://images.viblo.asia/74746254-7671-4eb5-bd50-b3b77d15b39b.png)

**Bước 2**: Click vào 'Create' button trên trang quản lý test plan

![](https://images.viblo.asia/4b2f9265-5302-4861-996a-7dfe0eab9469.png)

**Bước 3**: Nhập tất cả những yêu cầu chi tiết trong page và click "Create" để lưu lại

![](https://images.viblo.asia/df878b8d-8d4f-47ed-8ec4-375701df1089.png)

### **3.3. Tạo Build Creation**
**Bước 1**: Click on “Builds/Releases” hiển thị như hình dưới.

![](https://images.viblo.asia/9851c017-16cc-458c-a522-48c5a6139c75.png)

**Bước 2**: Click vào 'create' button

![](https://images.viblo.asia/70b0114b-16b5-4d2d-a929-8f60d70eeb73.png)

**Bước 3**: Nhập các thông tin chi tiết như trong hình dưới và click vào 'Create' button.

![](https://images.viblo.asia/ed2b605b-8cdc-49f5-aaed-440e65ce0b2e.png)

### **3.4. Tạo test suites**
**Bước 1**: Click vào “Test specification” link trên màn hình sẽ di chuyển tới trang Test specification của project.

![](https://images.viblo.asia/6ec2422b-c30c-4feb-beaf-6e6fd7159340.png)

**Bước 2**: Click vào setting icon phía bên phải panel nó sẽ hiển thị test suite. Click vào Create button cho Test suite.

![](https://images.viblo.asia/08eefb51-4aca-451f-aba7-101ed7c937ed.png)

**Bước 3**: Thực hiện nhập nội dung chi tiết test suite khi trang test suite được mở sau đó click vào 'create test suite' button rồi nhấn "Save"

![](https://images.viblo.asia/c639c264-5954-45c9-afea-23a0a0d0d783.png)

### **3.5. Tạo test case**
**Bước 1**: Tạo một thư mục test suite bên trái cấu trúc cây thư mục. <br> 
**Bước 2**: Click vào icon setting phía bên phải cửa sổ, danh sách test case sẽ được hiển thị bên phải cửa sổ.

![](https://images.viblo.asia/21d8074c-fe24-4912-9b26-112d189cdebb.png)

**Bước 3**: Click vào test case 'Create' button để mở trang test case.

![](https://images.viblo.asia/ec98cbba-c174-4277-b7aa-822f48437e3a.png)

**Bước 4**: Nhập chi tiết mục đích của test case và nội dung test case. <br>
**Bước 5**: Sau khi nhập chi tiết click vào 'Create' button nó sẽ lưu lại test case. <br>
**Bước 6**: Bây giờ click vào button 'Create steps' trong test case 

![](https://images.viblo.asia/e016e07e-5357-49ce-8a25-e0cefa0a4e55.png)

**Bước 7**: Nhập chi tiết cụ thể các bước để thực hiện test case. Bao gồm Step action và Expected result

![](https://images.viblo.asia/ce90c9bf-6738-4196-9bd3-f7eb14819c30.png)

**Bước 8**: Click vào Save button để add thêm steps, hoặc click vào 'Save & exit' button để lưu các steps và thoát khỏi cửa sổ.

### **3.6. Assigning Testcase to Test Plan**
**Bước 1**: Click vào 'Add/ Remove Test case

![](https://images.viblo.asia/0ffa2012-bc84-43fc-886a-a6e110aa6b49.png)

**Bước 2**: Click vào checkbox của test plan mà bạn muốn gán cho test case nào, sau đó click vào 'Add selected' button.

![](https://images.viblo.asia/9dc9e229-19bb-48a4-973c-407ecaeee0a1.png)

### **3.7. Writing requirement**
**Bước 1**: Click vào requirement link trên thanh công cụ để hiển thị trang requirement. <br>
**Bước 2**: Click vào 'Create' button trên trang này.

![](https://images.viblo.asia/671c064d-5f82-4369-b739-98ac2dde4d1b.png)

**Bước 3**: Nhập Document ID, tiêu đề và mô tả về requirment như hình dưới sau đó click 'save' button

![](https://images.viblo.asia/778900fe-02e9-467e-b9f8-90eb8ecd93f5.png)
**Bước 4**: Requirement sẽ được tạo và hiển thị phía bên trái trang <br>
**Bước 5**: Click vào create button sau đó nhập tất cả nội dung chi tiết của requirement rồi click vào 'save' button

![](https://images.viblo.asia/bd12a409-d0eb-4b99-b922-66eedac70b93.png)

### **3.8. Executing a Test case**
Các trạng thái của test case có thể thay đổi: 'Passed', 'Failed', 'Blocked'. Ban đầu trạng thái sẽ là 'not run, nhưng một khi bạn update nó, nó sẽ không thể quay lại trạng thái 'not run' lần nữa.
**Bước 1**: Click vào 'Test Excution' link trên thanh công cụ để chuyển tới trang test excution.

![](https://images.viblo.asia/04ca8f23-bff9-47f7-854a-ceaaac66d4e1.png)

**Bước 2**: Chọn test case bạn muốn thực hiện hiển thị ở bên trái cửa sổ. <br>
**Bước 3**: Chọn trạng thái sau khi đã thực hiện (pass/fail/blocked) sau đó nhập ghi chú của test case đã thực hiện.

![](https://images.viblo.asia/4cb21a04-8c8e-4820-a491-cbe16f640901.png)

**Bước 4**: Click vào save excution để update kết quả test case thực hiện ở trạng thái đã chọn.

![](https://images.viblo.asia/9adf6104-e087-43e2-8c3e-acfb67d25230.png) <br>
***Tài liệu tham khảo:*** <br>
https://www.youtube.com/watch?v=kXFEEXN4ZSU <br>
https://www.guru99.com/testlink-tutorial-complete-guide.html <br>
Cám ơn mọi người đã đọc!