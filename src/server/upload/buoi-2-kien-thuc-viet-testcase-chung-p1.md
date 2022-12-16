# ~~Nội dung ~~
## <div align="left">1.	HƯỚNG DẪN TEST CHỨC NĂNG	

-----


### 1.1 MỤC ĐÍCH TEST CHỨC NĂNG	<br>
### 1.2 PHƯƠNG PHÁP TEST CHỨC NĂNG	
    1.2.1 Nhập các bộ dữ liệu hợp lệ và không hợp lệ (V-I)	
     1.2.2 Việc xử lý luồng nghiệp vụ (Flow) – F	
     1.2.3 Xử lý thao tác (A)		
### 1.3 TEST CASE VỀ CHỨC NĂNG CHUNG TRONG CÁC DỰ ÁN		<br>
1.3.1 Đăng nhập		<br>
1.3.2 Đăng Xuất		<br>
1.3.3 Thay đổi mật khẩu		<br>
1.3.4 Thay đổi thông tin cá nhân		<br>
## 2.	HƯỚNG DẪN TEST GIAO DIỆN		<br>
    
### 
-----


### 2.1 MỤC ĐÍCH TEST GIAO DIỆN	17
### 2.2 PHƯƠNG PHÁP TEST GIAO DIỆN		<br>
### 2.3 CÁC ĐIỀU KHIỂN  TRÊN FORM		<br>
### 2.4 CÁC LỖI THƯỜNG GẶP KHI TEST UI	</div>


-----


# *# 1.	HƯỚNG DẪN TEST CHỨC NĂNG*
### 1.1 MỤC ĐÍCH TEST CHỨC NĂNG 
•	Mục đích của test chức năng tập trung vào sự đảm bảo các yêu cầu của khách hàng và việc test được thực hiện thông qua các chức năng và nguyên tắc thực hiện các thao tác. <br>
•	Mục đích của test chức năng là kiểm tra việc chương trình chấp nhận các dữ liệu hợp lệ nhập vào, quá trình xử lý cũng như các thao tác thực hiện là hợp lệ và đúng so với các yêu cầu.  
•	Test Function kiểm tra các đối tượng sau:
```
	Việc xử lý các chức năng với việc nhập các bộ dữ liệu hợp lệ (valid data)  - V
	Việc xử lý các chức năng với việc nhập các bộ dữ liệu không hợp lệ (invalid data) – I
	Việc xử lý mối liên hệ giữa các chức năng theo luồng nghiệp vụ (flow) -F 
	Việc xử lý các thao tác (action) – A
```
## ~~## 1.2 PHƯƠNG PHÁP TEST CHỨC NĂNG~~


-----


## 1.2.1 Nhập các bộ dữ liệu hợp lệ và không hợp lệ (V-I)  <br>
•	Để quản lý và tìm kiếm cơ sở dữ liệu thì phải có chức năng tạo (hay thêm mới) dữ liệu. Các chức năng thêm mới thường chứa các thuộc tính có kiểu dữ liệu là Text, Date,  Number <br>
### *###  Kiểu dữ liệu là Text*

![image.png](https://images.viblo.asia/97ab1f8a-7f54-4fa8-b3d4-9cf76709340e.png) <br>
![image.png](https://images.viblo.asia/3071c366-9570-4d0f-b1ea-4eecf2e1e50f.png) <br>
![image.png](https://images.viblo.asia/99bbcee4-ff6a-4625-9aed-0880ca1bc6fc.png) <br>
### *### Kiểu dữ liệu là data <br>*
![image.png](https://images.viblo.asia/409892ce-8e8b-407d-bc29-603081f55b7c.png) <br>
![image.png](https://images.viblo.asia/18186138-b4e1-4572-8d1d-705164163a16.png) <br>
![image.png](https://images.viblo.asia/82aee66c-36e6-489e-9115-7cf1eaa9ff05.png) <br>
### *### Kiểu dữ liệu là  NUMBER*
![image.png](https://images.viblo.asia/f5c6cd0d-ecb8-4ce2-8b30-109ca194aed1.png)
![image.png](https://images.viblo.asia/0f54f414-bf19-4aad-a925-f41ea9f90707.png)
![image.png](https://images.viblo.asia/5e28f9cd-39e1-4cf4-bd30-fece9a4acd18.png)
## 1.2.2 Việc xử lý luồng nghiệp vụ (Flow) – F 
Các chức năng  được xử lý liên quan với nhau theo 1 luồng nghiệp vụ (Flow). Với đầu vào là kết quả một chức năng và cho kết quả đầu ra liên quan đến 1 chức năng khác. Ở đây nêu ra 1 số Test case về việc xử lý luồng nghiệp vụ 
```
Các bạn muốn lấy bản word IB hoặc để lại cmt cho mình nhé; Vì trên này mình tạo bảng bị rối 

```