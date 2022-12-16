# Tổng quan File Server Resource Manager
File Server Resource Manager hay còn được viết tắt FSRM, đây là một trong những dịch vụ được tích hợp trên nền tảng Windows Server 2016/2019.

File Server Resource Manager được xem như là bộ công cụ quản trị cho phép người quản trị hệ thống cụ thể hơn là quản trị dịch vụ File Server có thể kiểm soát, phân loại và khởi tạo các chính sách liên quan đến vấn đề lưu trữ trên hệ thống File Server. Ngoài ra File Server Resource Manager hỗ trợ phân ngạch dung lượng và áp đặt lên các Folder

File Server Resource Manager hỗ trợ người quản trị giám sát hiệu quả các tài nguyên dữ liệu lưu trữ trên File Server. Ngăn chặn và kịp thời phát hiện những hành vi vi phạm chính sách đặt ra trước đó. File Server Resource Manager có thể triển khai trên 02 môi trường mạng bao gồm Workgroup hoặc Domain. 

 
## Tính năng cơ bản FSRM

Khởi tạo các phân ngạch dung lượng cho người dùng trên các Volume hoặc các Folder
Kiểm soát và thông báo các vấn đề liên quan đến hạn ngạch dung lượng như tình trạng dung lượng đầy hoặc vượt quá định mức cho phép sử dụng
Khởi tạo các chính sách và áp dụng lên các hạn ngạch cho Folder và những Sub Folders trong một Volume hoặc Folder.
Theo dõi, kiểm soát các loại dữ liệu mà người dùng lưu trữ thoả mãn các chính sách cấu hình như ban đầu.
Sử dụng các Template có sẵn hoặc thiết kế xây dựng riêng cho tổ chức doanh nghiệp.
Lập các báo cáo lưu trữ định kỳ có thể giúp xác định rõ định hướng về cách sử dụng tài nguyên lưu trữ.
Ghi nhận việc lưu trữ dữ liệu trái phép vi phạm các chính sách đối với user hoặc các nhóm người dùng.
Báo cáo tự động thông qua việc cấu hình mail theo giao thức SMTP
 

### Cài đặt File Server Resource Manager
1- Vào Server Manager > Add roles and features 
2- Giao diện Before You Begin > Next (3 lần)
3- Tại giao diện Select server roles > Chọn File Server Resource Manager như hình bên dưới > Chọn Next (2 lần)
![](https://images.viblo.asia/56d90517-dd3d-483b-9c1c-da16aea8de11.PNG)

4- Tại giao diện Confirm installation selections > Chọn Install
![](https://images.viblo.asia/5ddeea02-2692-4c24-b218-98b1671ff5af.PNG)

5- Tại giao diện Installation progress > Chọn Close
![](https://images.viblo.asia/dfce582e-c859-478c-b623-3049bda97feb.PNG)


Cấu hình File Server Resource Manager
Tạo Quota Templates
1- Vào Server Manager > Mục Tools > Chọn File Server Resource Manager
![](https://images.viblo.asia/5faeee3a-b129-4db0-99dc-e1211e858f74.PNG)

2- Tại mục Quota Templates > R_Click chọn Create Quota Template…
![](https://images.viblo.asia/7789457b-caff-47eb-a607-0d54d2825f4f.PNG)


3- Cấu hình các thông tin như hình bên dưới giới hạn Quota cho Folder Phòng HCNS là 2Mb. Sau đó chọn OK

Template name: Tên Template 
Space limit: Hạn ngạch quy định
Hard Quota: Không cho phép người dùng sử dụng quá hạn ngạch quy định.
Soft Quota: Cho người dùng sử dụng vượt quá hạn ngạch (Sử dụng Monitor kiểm soát việc vượt quá quota cho phép)
Notification Threshold: Cảnh báo người dùng khi sử dụng đến 1 ngưỡng mức nào đó. Mặc định là 85% space limit
![](https://images.viblo.asia/186f0b5f-30b6-41ea-8e4d-bf3c30102bd6.PNG)


4- Kiểm tra đảm bảo Quota Templates được khởi tạo thành công.
![](https://images.viblo.asia/434000fd-22da-4c38-b8b8-3b715c1f14d4.PNG)

Cấu hình Quotas trên Folder
1- Tại giao diện File Server Resource Manager > R_Click mục Quota > Create Quota…
![](https://images.viblo.asia/7db8de93-b35b-41f5-8228-3aeadf11bf53.PNG)


2- Cấu hình các thông số như hình bên dưới. Sau đó chọn Create

Quota path: Chỉ đường dẫn về Folder P.HCNS
Derive Properties from this quota template: chọn Quota Templates vừa tạo
![](https://images.viblo.asia/bdbd6a2f-1b80-45ce-9b81-df683099b724.PNG)


3- Đảm bảo cấu hình thành công Quota cho folder P.HCNS
![](https://images.viblo.asia/b33ae1f6-9917-494a-97c0-3e069444859b.PNG)


4- Kiểm tra kết quả cấu hình Quota cho Folder trên máy Client
![](https://images.viblo.asia/da9ffc72-6e1e-4540-a367-14f25d4003b0.PNG)

## Cấu hình tính năng File Screening Management

Nội dung bài lab áp dụng tính năng FSM tạo chính sách không cho phép người dùng trong hệ thống lưu trữ các dữ liệu có định dạng mở rộng là các file: exe, vbs, mp4.

1- Tại giao diện File Server Resource Manager

2- R_Click mục File Screening Management > chọn Create File Group

3- Tại mục File to include thêm các file có định dạng *.mp4, *.exe, *.vbs vào File Group. Cấu hình các thông tin như hình bên dưới sau đó chọn OK. 

![](https://images.viblo.asia/9fac58c1-6af9-4731-bcfa-52584dbe9f5f.PNG)

4- Đảm bảo File Group được khởi tạo thành công
![](https://images.viblo.asia/3f10d93c-6624-42d8-8c3c-72515f916f40.PNG)

5- Tiếp theo cần tạo File Screen Templates định nghĩa hành động cho nhóm File Group vừa tạo bên trên. Hành động có 2 loại: 

Cho phép lưu trữ các dữ liệu có định dạng như nội dung File Group vừa tạo (Active screening)
Không cho phép lưu trữ các dữ liệu có định dạng như nội dung File Group vừa tạo (Passive screening)
R_Click vào mục File Screen Templates chọn Create File Screen Template…
![](https://images.viblo.asia/cf58e7d5-9f91-4588-bf86-03f7a4838c62.PNG)

6- Khai báo theo thông tin như hình bên dưới. Sau đó chọn OK

Template name: Đặt tên
Screening type: Chọn loại hành động
File Group: Chọn file group bao gồm các định dạng file mở rộng
![](https://images.viblo.asia/a36bddcd-ad79-4db7-bc30-221029b5316c.PNG)


7- Đảm bảo File Screen Templates được tạo thành công
![](https://images.viblo.asia/0e08ddd6-929f-43d6-8533-35fcf9e0392e.PNG)



8- Sau khi khởi tạo cấu hình File Group và File Screen Templates hoàn tất, bước tiếp theo cần xác định Folder nào chịu sự ràng buộc bởi các hành động cho phép hoặc không cho phép từ hệ thống FSRM

Tại giao diện FSRM. R_Click lên mục File Screens chọn Create File Screen…
![](https://images.viblo.asia/b8374db9-6555-4521-839d-3d7e1ac12687.PNG)



9- Tại File screen path: Chọn đến Folder cần áp dụng (Trong bài Lab chọn Folder File Server)

Tại mục Derive propertive from this screen template chọn File Screen Templates vừa tạo bên trên có tên Deny 1. Sau đó chọn Create
![](https://images.viblo.asia/ed01ffa2-b641-44a6-aa9b-173fec7e96bc.PNG)


10- Đảm bảo File Screens được tạo thành công
![](https://images.viblo.asia/0d6c8820-1a1a-445c-a9a5-6a932c6b1d0a.PNG)

11- Kiểm tra kết quả từ phía Client

Tại máy người dùng (Client1) thực hiện lưu trữ các file có định dạng mở rộng: exe, vbs, mp4 lên File Server.

Đảm bảo việc thực hiện lưu trữ các dữ liệu có định dạng trên thất bại.(Access Denied)

![](https://images.viblo.asia/faea81d3-7bae-4cce-ba23-545597796a13.PNG)



Nguồn:
[https://tranhieuit.com/mcsa-2019-file-server-resource-manager/ ](https://tranhieuit.com/mcsa-2019-file-server-resource-manager/)