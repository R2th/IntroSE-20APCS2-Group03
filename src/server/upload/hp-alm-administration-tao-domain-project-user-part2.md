Ở bài trước chúng ta đã biết căn bản về ALM định nghĩa và ưu nhược điểm trong bài https://viblo.asia/p/introduction-to-hp-almquality-center-Do754j10ZM6

Ở bài này chúng ta sẽ được học về cách tạo Domain, Project & User để làm việc với ALM

Vậy để làm việc được với ALM bạn cần:

+ Create Domain
+ Create Project
+ Create Users

Trong lần thực hành này chúng ta sẽ tạo một site ALM administrator như một người dùng cuối có quyền truy cập vào trang Admin

## 1. Làm thế nào để tạo một domain
'Bước 1' Khởi chạy ALM và click vào ' Site administration' từ trang chủ. Người dùng sẽ nhập thông tin đăng nhập đã tạo trong khi cài đặt.
![](https://images.viblo.asia/634e5d46-8f78-4579-8b5d-17d1ccb7b179.PNG)

'Bước 2' Bảng điều khiển quản trị được hiển thị. Nhấp vào Create Domain
![](https://images.viblo.asia/e50ec3d4-cc69-4f18-9bdd-f98da722cc6a.PNG)

'Bước 3' Trong pop-up tạo domain ta thực hiện nhập tên Domain (ví dụ tên domain nhập là "Banking") và click OK
![](https://images.viblo.asia/6c9c712e-2ba3-4f03-972a-35f12942394a.PNG)

'Bước 4' Domain đã được tạo sẽ hiển thị như dưới
![](https://images.viblo.asia/1d5a968a-1fef-4efc-ab2d-f2adb05441f7.PNG)

## 2. Làm thế nào để tạo một project
'Bước 1' Chọn Domain của dự án sẽ được tạo, ví dụ Domain là "Banking" thì thực hiện nhấp chuột vào domain đó rồi chọn ' Create Project' như hình dưới
![](https://images.viblo.asia/80895bd1-7f14-4291-af26-49338e2bd84d.PNG)

'Bước 2' Sau khi popup create project được mở ta chọn mục 'Create and Empty Project' sau đó click 'Next' button
![](https://images.viblo.asia/9fb0a579-90f0-47a0-b013-f0328160bdcb.PNG)

'Bước 3' Nhập tên project và click 'Next' như dưới đây
![](https://images.viblo.asia/cb1395c3-7b89-4b0f-b18f-beee8f82b0ba.PNG)

'Bước 4' Chọn loại Cơ sở dữ liệu thích hợp và nhập thông tin sau. Trong trường hợp này, chúng tôi đã chọn 'MS-SQL' vì chúng tôi đã cài đặt Hp-ALM với MS-SQL là backend. Nếu bạn đã cài đặt ALM với Oracle làm máy chủ cơ sở dữ liệu của bạn, vui lòng chọn 'oracle'.

(1) Database server name

(2) Database Admin User Name

(3) Database Admin Password sau đó click 'Next'.
![](https://images.viblo.asia/d615a3f8-0c40-4432-85fc-60cab4fa43f6.PNG)

'Bước 5' Chọn ' Admin'user và nhấn 'Next'. Không có người dùng khác nào được hiển thị vì chúng tôi chưa tạo bất kỳ người dùng nào trong ALM
![](https://images.viblo.asia/2af275a7-80c6-48ab-a787-13fd4fe05c7b.PNG)

' Bước 6' Khi Summary dialog được hiển thị ta click vào ' Create' button. Bạn cũng sẽ nhận thấy rằng có 2 check boxes trong cửa sổ này

Activate Project – Nếu không check, project sẽ vẫn tạo nhưng người dùng sẽ không thể truy cập vào project

Enable Versioning – Điều này sẽ cho phép tính năng kiểm soát phiên bản hạn chế người dùng chỉnh sửa cùng một mục công việc (requirements, tests) cùng một lúc để tránh ghi đè các thay đổi do người dùng thực hiện so với người dùng khác.
![](https://images.viblo.asia/1f0a6eaa-2582-4b8d-94a9-0cdecf75b4ee.PNG)

' Bước 7' Trạng thái của project đã được tạo sẽ hiển thị như dưới đây
![](https://images.viblo.asia/b0120fd8-442c-4c61-8e5b-eb20fad30f39.PNG)

' Bước 8' The project 'TEST_BANK' đã được tạo thành công với domain là ' BANKING' như hình dưới
![](https://images.viblo.asia/95ba559e-7d99-486f-93c5-34ef5eb5a907.PNG)

## 3. Làm thế nào để tạo một user ##
' Bước 1' Để truy cập HP ALM, cần tạo hồ sơ người dùng. Để tạo người dùng, quản trị viên trang web phải nhấp vào tab 'Site users'.
![](https://images.viblo.asia/6cf37a83-3308-45b7-aa29-37285c0d3a29.PNG)

' Bước 2' Click vào ' Add user' icon từ ' Site users' tab như dưới đây
![](https://images.viblo.asia/bb95fcfc-aebc-4fd4-b5c6-f6ddde985fd7.PNG)

' Bước 3' 'Add user' diaglog box được mở thì thực hiện nhập thông tin chi tiết và click 'OK'
![](https://images.viblo.asia/08eecfb5-3359-4619-b1c9-4d1c22db7eb9.PNG)

' Bước 4' Người dùng đã thêm sẽ được hiển thị trong 'danh sách người dùng' được highlighted bên dưới cùng với những người dùng hiện có khác.
![](https://images.viblo.asia/135ec99b-e146-4b6e-b288-a9c5b7e2b4f1.PNG)

' Bước 5' Nào bây giờ ta sẽ cần map giữa người dùng với project khi người dùng mới được tạo sẽ không có quyền truy cập tới bất kì project nào. Như vậy chỉ có một người dùng duy nhất có quyền truy cập vào nhiều project.

Ví dụ như trường hợp này thì người dùng 'Test' được tạo và map với project ' TEST_BANK' với domain là ' BANKING' do vậy người dùng này mới có quyền truy cập vào project và thực hiện các bước tiếp theo.

Tài liệu tham khảo: https://www.guru99.com/hp-alm-create-domain-project-user.html