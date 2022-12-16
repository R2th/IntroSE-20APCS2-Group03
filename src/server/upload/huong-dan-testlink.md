# TestLink là gì?

TestLink là công cụ quản lý kiểm tra nguồn mở dựa trên web được sử dụng rộng rãi nhất. Nó đồng bộ hóa cả requirements specification và test specification với nhau. Người dùng có thể tạo project test và tài liệu test bằng cách sử dụng công cụ này. Với Test-Link, bạn có thể tạo một tài khoản cho nhiều người dùng và gán các vai trò người dùng khác nhau. Người dùng có thể quản lý test case. 
Testlink hỗ trợ cả 2 cách thực hiện test bằng tay và test tự động. Tester có thể tạo Test Plan và Test Report 1 cách nhanh chóng với công cụ này. Nó hỗ trợ export test report ra file ở các định dạng khác nhau như Excel, MS word và định dạng HTML. Ngoài ra, nó còn hỗ trợ tích hợp với nhiều tool quản lý bug phổ biến như JIRA, MANTIS, BUGZILLA, TRAC, v.v.

# Ưu điểm của TestLink

- Hộ trợ 1 lúc nhiều project
- Dễ dàng export và import các Test case
- Dễ dàng tích hợp với nhiều tool quản lý defect
- Thực hiện tự động các test case thông qua XML-RPC
- Dễ dàng lọc các test case với version, keywords, test case ID 
- Dễ dàng gán các test case cho nhiều người dùng
- Dễ dàng tạo test plan và test reports ở các định dạng khác nhau
- Cung cấp thông tin đăng nhập cho nhiều người dùng và gán vai trò cho họ


# Login to TestLink
**STEP 1:** Mở trang chủ Testlink và nhập thông tin đăng nhập

**STEP 2:** Login
1. Nhập userID - admin
2. Nhập password
3. Click button login


![](https://images.viblo.asia/05572954-b01b-463d-a041-a22826f4e159.png)


# Tạo project test

**STEP 1:** Trong cửa sổ chính, nhấp vào Test Project Management, nó sẽ mở một cửa sổ khác

![](https://images.viblo.asia/b445fcb2-d966-49bc-9166-263c5b287b89.png)


**STEP 2:** Click button "Create" góc bên phải để tạo project mới

![](https://images.viblo.asia/ea21554d-a178-4e76-b781-494f11d8710c.png)

**STEP 3:** Nhập tất cả các trường bắt buộc trong cửa sổ vừa mở ra như category cho project, tên của project, prefix, description, vv...

![](https://images.viblo.asia/5c49e542-2646-43d0-bdaf-52487ca0c29e.png)


Sau khi tạo thành công sẽ hiển thị như ảnh dưới

![](https://images.viblo.asia/3a60987e-8089-4608-ab7a-4fef63b3e6f5.png)


# Tạo test plan

Test plan chứa đầy đủ thông tin như phạm vi kiểm thử, các mốc kiểm thử, test suites và test case. Khi bạn đã tạo xong project test thì bước tiếp theo là tạo test plan.

**STEP 1:** Từ home page, click vào Test Plan Management từ home page


![](https://images.viblo.asia/6c96fdc5-5384-488e-976f-fcea78ccc004.png)


**STEP 2:** 1 cửa sổ khác sẽ được mở ra, ở cuối trang bạn click vào button "Create"

![](https://images.viblo.asia/311eceb6-9512-4962-bd54-e85bd743b758.png)

**STEP 3:** Điền đầy đủ các trường bắt buộc như Name, description, create from existing test plan, vv... trong cửa sổ mới mở và click vào button "Create"

![](https://images.viblo.asia/29b9a976-f00a-40bb-89a3-105a0b51dc02.png)


**STEP 4:** Test plan có tên "Guru 99" đã được tạo thành công

![](https://images.viblo.asia/25a9016b-de8c-4489-95df-4a271b0008a7.png)


# Build Creation

Bản build là bản phát hành riêng của phần mềm

**STEP 1:** Click vào Builds/Releases dưới Test Plan từ home page

![](https://images.viblo.asia/92496f18-68ab-404b-92d1-74ea48f6127d.png)


**STEP 2:** Trong cửa sổ tiếp theo, điền tất cả các trường cần thiết cho bản sản phẩm được phát hành và click vào button "Create" 

1. Nhập tên title
2. Nhập description cho bản phần mềm được release
3. Check vào ô Active
4. Check vào ô Open
5. Chọn ngày release sản phẩm
6. Click vào button "Create"


![](https://images.viblo.asia/c1bf2f2c-b97a-4a87-bdf9-40c4068b940e.png)

Sau khi release phần mềm thì nó sẽ như ảnh dưới

![](https://images.viblo.asia/bb41ea38-9491-4620-acd3-b180b0d2732b.png)


# Tạo Testsuite

Test suite là tập hợp các trường hợp kiểm thử có thể đang kiểm tra hoặc xác nhận cùng một thành phần. Các bước sau sẽ giải thích cách tạo test suite cho dự án của bạn.

**STEP: 1** Click vào option "Test specification" từ home page

![](https://images.viblo.asia/820202c9-21a2-422d-9d54-41592b7bee74.png)

**STEP 2:** Ở phía bên phải của bảng điều khiển, click vào biểu tượng cài đặt ![](https://images.viblo.asia/e74a4985-1dcc-4ddf-87b6-3ab309abcea5.png)  Nó sẽ hiển thị 1 loạt các hoạt động test

**STEP 3:** Click button "Create" cho test suite

![](https://images.viblo.asia/38a83aa1-2c98-41a2-968b-f649a101ad7d.png)

**STEP 4:** Điền đầy đủ các thông tin cho test suite và click button "Save"

1. Nhập tên test suite
2. Nhập thông tin cho test suite của bạn
3. Click button "Save" để lưu lại phần chi tiết của test suite


![](https://images.viblo.asia/86b08508-aa72-428b-b046-e35c844aacc1.png)

Bạn có thể nhìn thấy test suite từ Guru 99 đã tạo thành công

![](https://images.viblo.asia/16bdf809-0acb-40b2-9487-48a78fa2aeb3.png)


Test suite của bạn đã xuất hiện ở phía bên trái của phần thư mục


# Creating a Testcase

Test case là bộ các bước kiểm thử theo 1 kịch bản cụ thể với kết quả dự kiến. Các bước dưới đây sẽ giải thích cách tạo test case cùng với các bước kiểm thử.

**STEP 1:** Click vào thư mục Test suite ở bên trái của panel 


![](https://images.viblo.asia/894aa1c2-4951-4356-9101-a09e5d520add.png)

**STEP 2:** Click vào icon cài đặt bên phải của panel. Danh sách các hoạt động test case sẽ được hiển thị trên bảng bên phải.

![](https://images.viblo.asia/ecba36ad-463e-481d-9235-eff432d44b27.png)


**STEP 3:** Trong cửa sổ mới mở, để tạo test case, click vào button tạo hoạt động test case

![](https://images.viblo.asia/c941e9c1-36b7-4425-acc3-fe6a14035cd0.png)


**STEP 4:** Nhập details trong phần đặc tả test case 

![](https://images.viblo.asia/d888c97f-3a4a-4d25-aa0c-794d5a4c30cf.png)

**STEP 5:** Sau khi nhập details, click button "Create" để lưu details. Test case cho Guru99 đã tạo thành công

![](https://images.viblo.asia/8478c104-8926-4ad0-aa75-ab85b580519d.png)

**STEP 6:** Click vào test case từ thư mục, như được hiển thị ở trên, nó sẽ mở ra 1 cửa sổ mới. Click vào button "Create steps" trong test case. Nó sẽ mở ra một trình soạn thảo các bước

![](https://images.viblo.asia/9d0bb835-8d9f-4c87-bb8b-928b588fcafa.png)


**STEP 7:** Nó sẽ mở một cửa sổ khác trên cùng 1 trang, trong cửa sổ đó bạn phải nhập các detail sau:
1. Nhập step action cho test case của bạn
2. Nhập details cho step action
3. Click save và thêm step action khác hoặc thoát tab nếu không có thêm test step được add thêm

![](https://images.viblo.asia/d224f121-809f-4c77-87ed-0d50f4462254.png)


**STEP 8:** Sau khi lưu và thoát test step, nó sẽ hiển thị như bên dưới

![](https://images.viblo.asia/9e41dd81-f16d-4d7e-8a56-cc9a109880df.png)

# Assigning test case cho test plan

Đối với test case để được thực thi, nó cần được chỉ định cho test plan. Ở đây chúng ta sẽ xem làm thế nào chúng ta có thể chỉ định một test case cho test plan.

**STEP: 1** Click vào icon setting ![](https://images.viblo.asia/e74a4985-1dcc-4ddf-87b6-3ab309abcea5.png) trên panel. Nó sẽ hiển thị 1 loạt danh sách hoạt động 

**STEP 2:** Click button "Add to test Plans"

![](https://images.viblo.asia/7d81e9f2-a39f-4041-8b76-fd70902d20aa.png)


**STEP 3:** Cửa sổ mới sẽ được mở ra, tìm kiếm project "Guru99" của bạn 

1. Check vào checkbox 
2. Click button "Add"

![](https://images.viblo.asia/6cd7ce2d-4f0c-4c31-ac13-69625f0ce316.png)

Xong khi hoàn thành thì test case sẽ được assign vào test plan của bạn

# Tạo Users và assign Roles trên TestLink

Testlink cung cấp tính năng quản lý và ủy quyền người dùng.

Dưới đây là danh sách các vai trò mặc định trong Testlink và các quyền:



| Role | Test cases | Test Metrics |
| -------- | -------- | -------- |
| Guest     | View     | View     |
| Tester    | Execute     | View    |
| Senior Tester    | Edit & Execute     | View     |
| Leader & Admin    | Edit & Execute    | Edit & Execute   |


**STEP 1:** Từ trang home page, click users/roles icon từ thanh điều hướng

![](https://images.viblo.asia/87c3cef8-7d76-4b58-b1ba-6986709c0c78.png)

**STEP 2:** Click button "Create"

![](https://images.viblo.asia/50cf21de-9407-40ad-96f5-4dc00a2ba07b.png)

**STEP 3:** Điền tất cả các trường details của users và click button "Save"

![](https://images.viblo.asia/e7999628-960d-4d5d-aff6-783bde43061a.png)

Nhìn vào danh sách dưới đây, chúng ta có thể thấy users đã tạo thành công

![](https://images.viblo.asia/cbf833b3-d385-42ed-84c9-7b3b12775b37.png)

**STEP 4:** Phân bố vai trò trong dự án cho user

1. Click vào tab "Assign Test Project Roles"
2. Chọn project name
3. Chọn user role từ dropdown


![](https://images.viblo.asia/462d1158-7166-4d58-8712-4934f236b685.png)

# Viết requirements

**STEP 1:** Từ thanh điều hướng chọn "Requirements Link", nó sẽ mở ra trang Requirement

![](https://images.viblo.asia/16ca102f-c886-411e-aa9d-99e4ce840074.png)

**STEP 2:** Từ trang requirement, ở phía bên phải của panel, click button "Create"

![](https://images.viblo.asia/001426e7-1f21-4891-9d90-0884a6a6ac02.png)

**STEP 3:** Cửa sổ mới sẽ mở ra, nhập tất cả details 

1. Document ID
2. Title name
3. Requirement description
4. Click button "Save"

Đối với phần Type ở dưới, bạn có thể chọn option từ dropdown, ở đây chúng tôi đang chọn "User Requirement Specification"

![](https://images.viblo.asia/987d5203-9b64-44c5-9835-816883f083b0.png)


**STEP 4:** Nó sẽ tạo ra Requirement specification và hiển thị bên trái side panel trong dự án "Guru99"

![](https://images.viblo.asia/1d32f6fb-1672-4a76-9536-4e9f89b77fb9.png)

**STEP 5:** Chọn button setting từ home page requirement specification. Nó sẽ mở ra 1 cửa sổ khác

![](https://images.viblo.asia/234492f4-9832-49b8-b505-9b82f9e9a9ee.png)

**STEP 6:** Click button "Create" ở dưới Requirement Operations

![](https://images.viblo.asia/5c080b20-ae18-4767-b060-79dc1ec8357a.png)

**STEP 7:** Điền tất cả các trường bắt buộc và click button "Save"

1. Nhập documentID
2. Nhập title name
3. Nhập description
4. Nhập Status, gồm có: whether it's in draft, rework, review, not testable, vv... Ở đây chúng tôi chọn valid
5. Nhập Type, có các kiểu: user interface, non-functional, informational, feature, vv... Ở đây chúng tôi chọn use case
6. Nhập vào ô Number of test cases needed (số test case cần)


**Note:** Để thêm requirement bạn có thể đánh vào checkbox và click button Save

Ở phía bên trái của bảng điều khiển, chúng ta có thể thấy rằng yêu cầu được thêm vào.

![](https://images.viblo.asia/2f6db627-7b87-421b-8659-8e74ad001d66.png)

## Assigning requirement cho test-cases

Trong TestLink, Requirement có thể được kết nối với test case. Đây là một tính năng rất quan trọng để theo dõi phạm vi kiểm tra dựa trên các yêu cầu. Trong test reports, bạn có thể xác minh những yêu cầu nào không được covered và hành động nào không được đánh dấu trong test suites để có phạm vi thử nghiệm tối đa.

**STEP 1:** Từ test specification section mở bất kì test case nào và click vào icon requirement


![](https://images.viblo.asia/c845a060-f9e7-4ef4-9849-b08afac80064.png)


**STEP 2:** Để assign requirements specification cho test case bạn có thể theo dõi theo các bước sau

1. Scroll dropdown và chọn requirement specification
2. Tick vào checkbox requirement 
3. Click button "Assign"


![](https://images.viblo.asia/d241ad43-3027-49ef-9a3a-d15be111e5ff.png)


Sau đó click vào button "Assign", cửa sổ sẽ xuất hiện với nội dung "Assigned Requirement."


![](https://images.viblo.asia/6eea8531-dedc-464a-a79d-6d536131150f.png)

# Thực hành 1 test case

Trong TestLink, chúng ta có thể run 1 test case và thay đổi trạng thái thực hiện của test case. Status của test case có thể đặt là "Blocked" "Passed", hoặc "Failed". Ban đầu nó sẽ ở trạng thái "Not run" nhưng sau khi bạn update, nó không thể thay đổi thành trạng thái "not run" được nữa.

**STEP 1:** Từ thanh điều hướng, click vào link "Text Execution". Nó sẽ hướng bạn đến panel "Test Execution"

![](https://images.viblo.asia/d99a6e32-58e9-4be7-a19e-f8f18c8024ce.png)

**STEP 2:** Chọn test case mà bạn muốn chạy thử từ bảng điều khiển bên trái

![](https://images.viblo.asia/43d36a87-f0e4-4661-8332-687a9c3bddc2.png)

**STEP 3:** Khi bạn đã chọn các test case, nó sẽ mở 1 cửa sổ

![](https://images.viblo.asia/b84576be-581f-45c2-98e1-5a81189a7e18.png)

**STEP 4:** Thực hiện theo các bước sau

1. Nhập các ghi chú liên quan đến test case được thực hiện
2. Chọn trạng thái của nó


![](https://images.viblo.asia/55ac9eb4-94b1-4f87-bdba-e23e8ca6c202.png)

**STEP 5:** Trên cùng một trang, bạn phải điền chi tiết tương tự về việc thực hiện test-case. Điền chi tiết, chọn trạng thái và sau đó click vào button "save execution"

![](https://images.viblo.asia/56c7c90f-1378-450c-b63f-6bc33f06a337.png)

# Tạo test reports

Liên kết kiểm tra hỗ trợ các định dạng báo cáo thử nghiệm khác nhau như

- HTML
- MS Word
- MS Excel
- OpenOffice Writer
- OpenOffice Calc

**STEP 1:** Từ thanh điều hướng, click option "Test Reports"

![](https://images.viblo.asia/db3c48a7-100b-444c-b389-ac5b0232d917.png)

**STEP 2:** Từ panel bên trái, chọn link "Test Report"

![](https://images.viblo.asia/b205f17d-8bcd-4db5-89e3-b655e3f43c5d.png)

**STEP 3:** Để tạo báo cáo, hãy làm theo các bước sau:

1. Mark and unmark option mà bạn muốn đánh dấu trong test report của bạn
2. Click vào folder project của bạn

![](https://images.viblo.asia/90725dca-6bfc-476c-a8ae-ccfca1a5ec28.png)

Test report tạo xong sẽ nhìn như sau:

![](https://images.viblo.asia/4f468d7f-9226-4a95-b07c-246d2839d819.png)

# Export Test case/ Test Suite

Testlink cung cấp các tính năng export các dự án test projects/test suites trong TestLink của bạn và sau đó bạn có thể nhập chúng vào một dự án TestLink khác trên máy chủ hoặc hệ thống khác. Để làm được điều đó bạn phải làm theo bước sau:

**STEP 1:** Chọn test case mà bạn muốn export trong trang Test specification

![](https://images.viblo.asia/eb861597-15cf-4687-9e18-670b75c40ec1.png)


**STEP 2:** Bây giờ click vào icon ![](https://images.viblo.asia/e74a4985-1dcc-4ddf-87b6-3ab309abcea5.png) ở phía bên phải của bảng điều khiển, nó sẽ hiển thị tất cả hoạt động có thể được thực hiện trên test case.

**STEP 3:** Click button "Export"

![](https://images.viblo.asia/67b4ece5-cb91-44ed-882a-3b4e344a5705.png)


**STEP 4:** Nó sẽ mở ra 1 cửa sổ khác, đánh dấu option theo yêu cầu và click vào tab export 

![](https://images.viblo.asia/aec6010c-3a2e-4bb0-859c-c599c28b02cd.png)

Theo dõi XML được tạo

![](https://images.viblo.asia/50ef0252-1cec-4d66-aaa6-28d826f1f0bd.png)

# Importing Test case/ Test suite

**STEP 1:** Chọn thư mục Test suite mà bạn muốn import test case

![](https://images.viblo.asia/c065a931-d529-492f-8c61-6b76dcf55ccf.png)

**STEP 2:** Click vào icon setting ![](https://images.viblo.asia/e74a4985-1dcc-4ddf-87b6-3ab309abcea5.png) bên phải panel, nó sẽ hiển thị tất cả hoạt động có thể thực thi test suite/test case

**STEP 3:** Click vào button import trong danh sách hoạt động

![](https://images.viblo.asia/da13a61e-f358-42c8-9632-acf89052443f.png)


**STEP 4:** Browse and attach XML file test case mà bạn đã export từ test link và click vào button upload

1. Sử dụng tùy chọn browse để đính kèm tệp test case XML mà bạn muốn export từ testlink
2. Click vào upload file

![](https://images.viblo.asia/6b0c1802-0528-41bb-aea6-abf9e96924b7.png)

Khi bạn upload 1 file, nó sẽ mở ra cửa sổ thông báo bạn đang import test case

![](https://images.viblo.asia/13d83006-ad87-4914-928b-17144fd31094.png)

**STEP 5:** Test case sẽ được upload và hiển thị bên phải panel

![](https://images.viblo.asia/017c4280-8893-46ca-88fa-3fc3bbdb3878.png)

# Tổng kết

Trong hướng dẫn này, chúng tôi đã đề cập đến các khía cạnh khác nhau của TestLink - như cách bạn có thể sử dụng Testlink làm test management. Nó giải thích cho bạn từng bước cách quản lý test plan cho dự án của bạn, cách tạo người dùng và gán cho họ vai trò phù hợp hoặc thậm chí cách import hoặc export các test case cho dự án của bạn. Các tính năng hữu ích khác như tạo báo cáo, xác định yêu cầu, v.v. cũng được thể hiện tốt trong hướng dẫn này.



*Nguồn dịch: https://www.guru99.com/testlink-tutorial-complete-guide.html#12*