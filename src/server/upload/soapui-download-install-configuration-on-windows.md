Ở bài trước mình đã giới thiệu cơ bản với các bạn về SoapUI: https://viblo.asia/p/soapui-la-gi-gioi-thieu-ve-soapui-testing-OeVKBkyJZkW

Hôm nay mình sẽ chia sẻ cơ bản về Download, Install, & Configuration on Windows nhé 

Dưới đây là yêu cầu phần mềm và phần cứng cho các nền tảng khác nhau.
![](https://images.viblo.asia/2b1a46cd-fccb-4325-8f29-590d12a8de54.PNG)

Trong hướng dẫn này, cài đặt được thực hiện trên Môi trường Windows. Quá trình này vẫn tương tự đối với các hệ điều hành khác.

Đây là lộ trình cho quá trình cài đặt
![](https://images.viblo.asia/e8408213-30fc-475d-8d39-c38961885b2e.PNG)

# Part A: Downloading
Vào Trang sau: https://www.soapui.org/downloads/latest-release/

Kéo xuống và chọn trình tải xuống dựa trên hệ điều hành của bạn. Trong hướng dẫn này, mình sẽ cài đặt SOAP UI trên hệ điều hành Microsoft Windows 64-bit.

![](https://images.viblo.asia/66cdece1-9a5c-46c3-919e-f3d43f39107b.PNG)
Click vào download để tự động tải xuống 

![](https://images.viblo.asia/c40d79f0-5daa-47f8-bfca-c2cd58f5c047.png)

# Part B: Installing
**Step 1**: 

Sau khi download xong, thực hiện giải nén như sau:

![](https://images.viblo.asia/3a139ed9-c9fc-4e38-b8ea-62c1b305ee8d.png)



**Step 2**: 

Sau đó click button next

![](https://images.viblo.asia/737bd2cf-52fc-4ce8-8a38-a773f68b7e49.png)

**Step 3**: 

Tiếp theo chọn thư mục lưu mà bạn muốn, nếu không thì để mặc định cũng không sao, sau đó click next 
![](https://images.viblo.asia/8530b971-f1d4-441e-9d77-bbbc2ec1acf2.png)


**Step 4**: 

Chọn các tiêu chí mà bạn muốn cài đặt , sau đó click next 

- Giao diện người dùng SOAP  theo mặc định và người dùng không thể tự cấu hình.

- Source  - Bật, nếu bạn muốn có quyền truy cập vào mã nguồn của SOAP-UI. Chúng tôi đã không chọn nó.

- Hermes JS - Bật, nếu ứng dụng yêu cầu kiểm tra JMS.

- Tutorial  - Bật, nếu bạn muốn truy cập hướng dẫn SOAP-UI Đăng cài đặt.

![](https://images.viblo.asia/5028c625-3cb7-42c4-82a2-3007667a8f44.png)



**Step 5**: 

Click vào chấp nhận điều khoản sau đó click vào button next 
![](https://images.viblo.asia/d1caedd6-c006-43e1-9742-520d420efe76.png)

**Step 6**: 

Chọn thư mục lưu data của ứng dụng nếu không để nguyên và click button next 
![](https://images.viblo.asia/bf02fc5c-f793-4f4d-a073-4a61fce71429.png)

**Step 7**: 

Chọn vị trí thư mục menu đầu tiên, sau đó click button next
![](https://images.viblo.asia/4c86e8c8-c408-4e8f-abdd-cb75f7f61983.png)

**Step 8**: 

Click vào check box, click next:
![](https://images.viblo.asia/772d397f-3b24-47df-9e80-a9254235578a.png)

**Step 9**: 

Click finish để hoàn thành cài đặt 
![](https://images.viblo.asia/fc3b922d-6db4-4c49-ac8f-db61bf4fe980.png)

**Step 10**: 

Hiển thị màn hình SOAPUI sau khi hoàn thành 
![](https://images.viblo.asia/cf42d1cc-b16b-49c1-851f-3e3163c3f391.png)

1. Menu Bar

2. Quick access toolbar

3. Project Navigation Area

4. Workspace Properties

5. Log area

# Part C: Configuring

Đầu tiên chúng ta hãy hiểu cấu trúc project trong SOAP UI.

Bước đầu tiên trong SOAP UI là tạo một workspace. Có thể có một số projects được liên kết với một workspace. Người dùng có thể tạo nhiều workspace. 

- Đối với Mỗi dự án, chúng tôi có thể tạo một số bộ test suites.

- Đối với Mỗi Bộ test suites, có thể có một số test cases được đính kèm với nó.

- Đối với mỗi test cases, có thể có một số test steps  được liên kết với nó.

- Dưới đây là hình ảnh đại diện của workspace làm việc trong SOAP-UI.

![](https://images.viblo.asia/939278a6-5fcc-4e3a-8210-ab4d29584111.png)

**Step 1**: 

Đầu tiên tạo 1 workspace: 
![](https://images.viblo.asia/326fd9c6-0a94-494b-8a49-08a3ec18b58f.png)

**Step 2**: 

Nhập tên workspace sau đó click ok
![](https://images.viblo.asia/510d2172-d2d6-4260-a367-258296e028e9.png)

**Step 3**: 
1. Chọn đường dẫn mà workspace  được lưu
2. Tên của XML không gian làm việc, phải được đặt khi người dùng muốn mở workspace trong tương lai.
3. Nhấp vào để lưu'.

![](https://images.viblo.asia/00548d82-886b-4213-9806-7862593ccd92.png)

**Step 4**: 

Workspace được tạo như hình bên dưới. Chúng tôi cũng có thể truy cập các thuộc tính workspace trong Tab ' 'Workspace Properties' Tab.

![](https://images.viblo.asia/28618292-de3a-4fab-9afa-b5bc5e758a25.png)

Trên đây là cách cấu hình thành công SOAP-UI sau khi tải xuống và cài đặt để tiếp tục sử dụng, theo link hướng dẫn video sau:

https://youtu.be/30_E2B2BdG4

# File menu quan trọng mà bạn nên biết: 

## FILE MENU:
Thanh file menu được sử dụng thường xuyên nhất trong SOAP-UI, là rất quan trọng để điều hướng trong khi làm việc trên các project . Trước tiên, hãy nhìn file menu:
![](https://images.viblo.asia/48b437cc-908a-43e7-bf42-ba8c4242200f.png)

1. 'New SOAP Project' : Tạo mới 1 Project.
2. 'New REST Project' : Tạo 1 dự án mới thông qua import REST Request.
3. 'Import Project' : Import Project bằng XML.
4. 'Save All Projects' : Cho phép người dùng lưu tất cả các dự án đã mở chỉ bằng một cú nhấp chuột.
5. 'Close All Open Projects' : Đóng tất cả các dự án đã mở trong workspace đó.
6. 'Rename Workspace': Đổi tên workspace.
7. 'Switch Workspace': Có thể di chuyển, kéo thả các workspaces linh hoạt.
8. 'Preferences': Cho phép người dùng tùy chỉnh giao diện người dùng SOAP. 
9. 'Save Preferences':  Cho phép người dùng lưu các cài đặt tùy chỉnh của họ. Khi giao diện người dùng SOAP được mở vào lần tiếp theo, nó sẽ sử dụng các tùy chọn do người dùng lưu.

## FILE >> PREFERENCES >> HTTP SETTINGS:

![](https://images.viblo.asia/fb685c4d-8217-4202-ac04-802d064b4b2d.png)
1. Biểu thị Phiên bản HTTP được sử dụng cho yêu cầu và phản hồi.
2. Cho phép người dùng có thể được xác định trước bằng cách sử dụng tùy chọn này. Nếu không được xác định, nó sử dụng http client mặc định.
3. Cho phép người dùng chỉ định phương pháp nén. Nó có thể là gzip hoặc deflate hoặc none
4. 'If Checked', cho phép phản hồi nén từ máy chủ.
5. 'If Checked', vô hiệu hóa giải nén các phản hồi đã nén.
6. 'If Checked' , đóng kết nối HTTP cho mỗi Yêu cầu SOAP.
7. 'If Checked', cho phép người dùng chỉ định thông tin xác thực cho các yêu cầu gửi đi.
8. Cho phép người dùng giới hạn số byte tối đa được đọc từ một phản hồi. ZERO tương ứng với kích thước không giới hạn.

## FILE >> PREFERENCES >> WSDL SETTINGS:

![](https://images.viblo.asia/b97cf541-505b-4b35-926f-04883f569d92.png)
1. Bộ nhớ đệm WSDLs Bật và tắt bộ nhớ đệm của WSDL.
2. Tạo các giá trị mẫu trong các yêu cầu.
3. Cho phép người dùng luôn bao gồm các yếu tố tùy chọn trong các yêu cầu đã tạo.
4. Thông báo phản hồi được in trong trình chỉnh sửa phản hồi.
5. Cho phép người dùng chỉ định một thư mục chứa các tệp giản đồ (.xsd) trong khi xác thực các yêu cầu WSDL. Khi thay đổi nội dung của thư mục này, giao diện người dùng SOAP yêu cầu khởi động lại.
6. Với mục đích bảo toàn không gian, kích thước thư tối thiểu được nén trong tệp dự án SoapUI.

## FILE >> PREFERENCES >> UI SETTINGS:

![](https://images.viblo.asia/ca58be46-430c-48b1-b9d9-bb72022a80b3.png)
1. Đóng tất cả các dự án trong khi khởi chạy SOAP UI để có thời gian khởi động tốt hơn và tiêu tốn ít bộ nhớ hơn.
2. Hiển thị mô tả bất cứ khi nào có sẵn.
3. Tự động lưu tất cả các projects trong khi thoát SOAP UI.
4. Trước khi lưu, SOAP UI tạo một bản sao lưu của dự án. Nếu được bật, thư mục sao lưu phải được đề cập.
5. Hiển thị và mở rộng các tab nhật ký khi khởi động giao diện người dùng SOAP.
6. Hiển thị hộp thoại 'trang khởi động' khi khởi động giao diện người dùng SOAP.
7. Khi tắt mẹo công cụ, tắt mẹo công cụ khi người dùng di chuột qua các tùy chọn / nút trong khi điều hướng.

## HELP:

![](https://images.viblo.asia/a8e48943-e683-447d-b8c3-2364f2d1d822.png)
1. Hiển thị trang chủ của trợ giúp trực tuyến có tại www.soapui.org
2. Cho phép người dùng đã đăng ký đăng câu hỏi trong diễn đàn và nhận trợ giúp trực tuyến từ cộng đồng.
3. Kiểm tra các bản cập nhật và cài đặt gần đây nếu có.
4. Cho phép người dùng điều hướng đến trang chủ của www.soapui.org
5. Hiển thị thông tin về phiên bản và phiên bản của giao diện người dùng SOAP.

# Kết Luận
Bài viết này chỉ hy vọng giúp các bạn biết cách Download SOAPUI, Install, & Configuration on Windows. Bạn có thể tham khảo Website ở link tài liệu tham khảo bên dưới để có thể học và thực hành một cách tốt nhất!

​
Tài liệu tham khảo:
https://www.guru99.com/soapui-installation-configuration.html