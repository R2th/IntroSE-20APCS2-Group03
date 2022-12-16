- Katalon Studio cho phép người dùng viết automation test theo Script của testcase. Bằng cách sử dụng  Groovy / Java có thể dễ dàng chỉnh sửa các test scripts.
- Hướng dẫn này giúp bạn hiểu qua các bước cần thiết để tự viết một kịch bản basic automation test rất cơ bản bằng Katalon Studio. Sau khi đi qua bài viết này, bạn sẽ có thể hiểu và có thể sử dụng các `import statements` và các `built-in keywords` để viết test script. Tôi khuyên bạn nên có một số nền tảng kịch bản cơ bản, tốt nhất là sử dụng Groovy, để sử dụng hiệu quả khả năng tạo script.
- Ví dụ chúng ta có step by step sau:
  + Open the browser.
  + Navigate to [Yop mail] website
  + Enter an new email adress
  + Click on [Check for new mails] button
  + Verifying new email
  + Close the browser

### 1. Create Test case
Select **File > New > Test Case** từ menu để tạo test case. Nhập tên của test case & Description (nếu cần), sau đó click on OK button

![](https://images.viblo.asia/319577ab-c6a8-417e-bb87-0cda42aa1cc8.png)

### 2. Script View
- Khi một new test case mới được tạo, bạn switch sang chế độ **Script view**. Các bước kiểm tra được chỉ định trong chế độ Manual view được tự động dịch sang Groovy script trong chế độ **Script view**.

![](https://images.viblo.asia/21d23eb7-151e-4ffb-92d5-d78d53778434.png)
- Các import statement trong test script cho phép tham chiếu đến các classes được sử dụng. Mở rộng phần `import` vào để xem tất cả các lớp được nhập mặc định của Katalon Studio. Tên sau `as` trong mỗi câu lệnh nhập là một bí danh cho class. Bạn có thể thay đổi bí danh cho mỗi class. Các lớp này là cần thiết để tạo test script.
- Katalon Studio là một công cụ tự động hóa hỗ trợ kiểm tra dựa trên `keyword-driven testing`. Tất cả các từ khóa được nhóm thành các gói `WebUI`, `Mobile` và `WebService` tương ứng. Nhấn `Ctrl + Space` để xem các packages và chức năng này từ các classes đã nhập..

### 3. Create a Web application

- Trong kịch bản này, bạn sẽ tạo một test script cho ứng dụng Web, do đó bạn có thể sử dụng các từ khóa tích hợp `Web UI built-in keywords`. Để sử dụng `Web UI built-in keywords` tích hợp, hãy nhập cú pháp sau vào trình chỉnh sửa.
- Sau khi nhập ký tự dấu chấm (.), Tất cả các `built-in keywords` và mô tả để kiểm tra giao diện người dùng web xuất hiện như dưới đây:

![](https://images.viblo.asia/a9202807-341e-4545-b9cb-22019fdc20b0.png)

### 4. Select the Open browser 

Select từ khóa `Open browser`. Từ khóa này mở trình duyệt và điều hướng đến URL được chỉ định nếu được cung cấp. Chi tiết cho một từ khóa đã chọn được hiển thị trong màn hình bật lên.

![](https://images.viblo.asia/e1d9455e-065d-40b3-97f9-1825927bb7f1.png)

### 5. Open URL Website
Nhập từ khóa `navigateToUrl`. Từ khóa này điều hướng đến một URL được chỉ định. Ví dụ ở đây tôi nhập URL sau (http://www.yopmail.com/en/)

![](https://images.viblo.asia/51f2283b-44ea-47ef-a7d2-1e34bb0b757a.png)

### 6. Enter an new email adress
- Chúng ta cần phải tại 1 object (HomePage_Email_Input) trong `Object Repository`

![](https://images.viblo.asia/3e962828-54a4-41b9-ad68-abda64a8001f.png)

- Bước tiếp theo chúng ta cần config xpath để tìm element input email trên [HomePage], follow theo step by step sau:
  + Tại [editor của object] page 
  + Quan sát [Selection method] 
  + Select [XPath] radio
  + Nhập value vào Selection Editor (như image bên dưới)
  
![](https://images.viblo.asia/839c05dd-6074-477a-afe2-73dd7b38da1e.png)

- Bây giờ chúng ta quay lại `Script View` và dùng đoạn mã như hình bên dưới để nhập new email vào `HomePage_Email_Input`

![](https://images.viblo.asia/c6ca3338-2967-4870-acd9-a430f50988a0.png)

### 7. Click on [Check for new mails] button
- Tạo Object cho HomePage_CheckMail_Button

![](https://images.viblo.asia/3c9d3d3b-e76d-4721-952c-fd37a0c42f87.png)

- Tiếp theo chúng ta sẽ viết script cho click on Button

![](https://images.viblo.asia/7544f300-3164-4af2-a426-cfd7c03e3127.png)

### 8. Verifying new email
Bây giờ chúng ta sẽ verify element này tồn tại hay chưa


![](https://images.viblo.asia/f898bfe8-be37-472e-861c-ea32acc69f2a.png)

![](https://images.viblo.asia/5456614b-4234-4b9b-9c12-05c30ee439ab.png)

![](https://images.viblo.asia/c73293b9-fb78-4545-85df-6ec5d2a4be6e.png)

### 9. Close the browser
Cuối cùng chúng ta Close browser

![](https://images.viblo.asia/0d95152e-6605-4cca-9cb8-eb8799cd3e67.png)

### 10. Video
Đây là Video result của 9 steps mình đã làm ở trên nhé
https://drive.google.com/open?id=1N0fxUueiEYFdfHbgQ6Kb_NF8hg72-bFF

**Nguồn tham khảo:**
- https://www.softwaretestingmaterial.com/creating-test-case-using-script-mode/