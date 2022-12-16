# 1. Giới thiệu về Katalon

Katalon Studio là một giải pháp về automation test để giúp giải quyết thách thức thiếu tích hợp giữa các open-source test automation trong bối cảnh các giải pháp thương mại không phù hợp. Nó cung cấp một tập hợp các tính năng toàn diện và tích hợp, từ record lại các bước kiểm tra, tạo các script đến việc executing testcase và report kết quả kiểm tra cho Web và mobile. Katalon Studio cách mạng hóa việc sử dụng các khung tự động kiểm thử nguồn mở như Selenium và Appium bằng cách loại bỏ sự phức tạp kỹ thuật của chúng để cho phép người kiểm tra setup, create, run, report và quản lý các bài kiểm tra tự động của họ một cách hiệu quả. Nó cũng cung cấp một giải pháp thay thế khả thi cho các giải pháp tự động thử nghiệm thương mại không phù hợp với nhiều đội vừa và nhỏ. Katalon Studio được cung cấp cho cộng đồng test automation thử nghiệm miễn phí.

- Setup Project:
  + Cung cấp các templates để viết testcase, object repository and keywords.
  + Hỗ trợ đầy đủ thử nghiệm trên Web, Android, iOS và API trên tất cả các hệ điều hành.
  + Dễ dàng tích hợp với Jenkins, GIT và JIRA

- Create Tests:
  + Record lại hành động và tạo script tự động bằng từ khóa tích hợp.
  + Cho phép xây dựng  test script nâng cao hoặc từ khóa tùy chỉnh dễ dàng.

- Execute Tests:
  + Runs test cases or test suites bằng cách sử dụng nhiều cấu hình và bộ dữ liệu
  + Cung cấp bảng điều khiển tích hợp CI với các tham số khác nhau để thực hiện từ xa.
  + Run test được trên nhiều trình duyệt.

- View Reports:
  + Nhiều report, đăng nhập nâng cao và ảnh chụp màn hình.
  + Thực hiện report có thể tùy chỉnh để thích hợp với quy trình công việc của bạn.

- Test Maintenance:
  + Tự động cập nhật tất cả các testcase và suites liên quan khi các đối tượng được thay đổi
  + Cho phép dễ dàng quản lý và maintenance các testcase, data và keywords
  + Tích hợp với GIT để cho phép các thành viên trong team dễ dàng chia sẻ công việc với nhau.


- Bạn có thể download Katalon tại đây: https://www.katalon.com/

# 2. Tạo new project trong Katalon.

**Step #1: Create a new project**
- Tạo 1 project trong Katalon Studio thì như hình bên dưới nhé
 +  ![](https://images.viblo.asia/a8c7595c-f971-4c62-b133-e632a54f7e7f.png)
 + ![](https://images.viblo.asia/aee82b5d-7978-4084-9d4b-8ffddac4bc01.png)
  

**Step #2: Create Testcase**
- Tạo một testcase, trong đó tất cả các bước kiểm tra cần thiết của một scenario sẽ được viết:
- ![](https://images.viblo.asia/eb708957-5de5-4d7e-92e7-35f506ee9491.png)
- ![](https://images.viblo.asia/f3fdb9ac-4ee6-4e78-b99b-b44c3c81de54.png)

- Trường hợp thử nghiệm mới được tạo dưới ngôn ngữ Groogy (còn gọi là test script) có thể xem, chỉnh sửa trong Katalon Studio bởi một trong hai chế độ: Manual View và Script View.
- Bạn có thể bắt đầu viết logic kiểm tra của mình từ đầu.


**Step #3: Composing automation test case**
- Đối với người mới bắt đầu, tôi khuyên bạn nên sử dụng chức năng Record – Playback để làm quen với quy trình viết kịch bản. Katalon Studio Recorder có khả năng tạo các bước kiểm tra nhanh chóng và người dùng chỉ có thể tập trung vào các bước xác thực.
 1. Click on the [Record Toolbar] button để mở [Record] dialog.
 2. Enter [http://www.m.yopmail.com/en/] cho URL field
 3. Select Chrome trong dialog để bắt đầu record
- ![](https://images.viblo.asia/e0a2abc5-da51-47d9-b9eb-4e333c7f8aef.png)
- ![](https://images.viblo.asia/2f4e4f53-9d48-4907-8515-02ac4fa41630.png)

- Khi bạn mở [Record] dialog, bạn có thể nhìn thấy tất cả các actions và elements đã được ghi lại. Nhấp vào OK để hoàn tất việc record và tạo các tạo phẩm thử nghiệm cần thiết và các test script.
- ![](https://images.viblo.asia/ce1c87d9-3a5c-4c74-89a0-dd0c92f1661d.png)
- ![](https://images.viblo.asia/06b5ef51-60b6-44ec-b816-08d9c5c68a0c.png)
- ![](https://images.viblo.asia/7bd8bf47-1a16-49ef-b499-f85068d687ae.png)
- ![](https://images.viblo.asia/37da4a0f-e0b8-4daf-ae84-67c0642127db.png)
- Các kịch bản kiểm tra được ghi có thể được phát lại ngay lập tức và bạn có thể bắt đầu automation test  ngay lập tức. Nhấp vào [Run] button với Chrome browser để bắt đầu chạy testcase của bạn.
- ![](https://images.viblo.asia/a038eb21-ef26-4b13-b089-f149a8ebd51b.png)

**Step #4: Generate a report**
- Để tạo test report, chúng ta cần phải có **Test suite**. Test suite trong Katalon Studio là nơi bạn có thể nhóm các testcase để chạy chúng cùng nhau.
 + Để tạo Test suite trong Katalon Studio, chúng ta click on [New Toobar] button và Select New Test suite item.
 + ![](https://images.viblo.asia/368b309c-71f0-41c6-9d32-33c50f954fb3.png)

 + Trong [New Test Suite] dialog, Nhập Name (được yêu cầu) và Description mô tả tùy chọn về bộ thử nghiệm của bạn (không bắt buộc), nhấp OK để tạo Test suite mới:
 + ![](https://images.viblo.asia/1edf6dbf-9e71-4b82-99ec-b1545f8c847e.png)


 + Từ [Test suite] UI, click on [Add] button và kiểm tra "Basic" test case khi click on [OK] button để tạo report.
 + ![](https://images.viblo.asia/0d70e813-4f0a-45e0-9211-7e90663e5719.png)


 + Thực hiện [Test suite] này như chúng tôi đã làm với testcase của mình bằng cách nhấp vào Execution toolbar. Sau khi thực hiện, bạn sẽ nhận thấy rằng một thư mục report mới được tạo. Trong thư mục này, mỗi mục con biểu thị một thực thi với tên cho biết thời gian bắt đầu thực hiện. Nhấp vào mục báo cáo đầu tiên để xem nó.
 + ![](https://images.viblo.asia/11cc560f-20fb-459c-bb67-f03e8d07dc44.png)


 + The test report’s detail được hiển thị như bên dưới
 + ![](https://images.viblo.asia/978d7eec-28fb-4f0d-b4a9-d1f8997a6b27.png)

**Nguồn tham khảo:**
 -  https://www.softwaretestingmaterial.com/katalon-studio-tutorial/
 -  https://www.utest.com/tools/katalon
 -  https://docs.katalon.com/katalon-studio/docs/index.html#support