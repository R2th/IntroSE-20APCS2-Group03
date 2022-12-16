## I.Tham số hóa trong JMeter là gì ?
- Tham số hóa trong JMeter là sử dụng nhiều bộ Input Data khác nhau cho mỗi lần kiểm thử. Nhờ vậy có thể mô phỏng được thao tác của nhiều người dùng khác nhau trên server.
- Ví dụ: 
    - Khi thực hiện scenario cho hành động Login vào hệ thống, thông thường JMeter có thể hỗ trợ tất cả các lần với thông tin của 1 user (user name + password).
    - Thay vào đó, JMeter cũng sẽ có tính năng thực hiện với 50, 100 hoặc 1000... người dùng với thông tin khác nhau để có thể login, register, hoặc giả lập có 100, 200... lượt tìm kiếm với keywords khác nhau.

## II. Cấu hình CSV data config trên JMeter
### 1. Thêm elements
Để thực hiện một scenario test, ta phải thêm các elements cần thiết (như phần trước) trước khi bắt đầu  một test plan.
- Thêm Group :**Add** → **Thread User** → **Thread group**
- HTTP Request Defaults: **Add** → **Config elements** → **HTTP Request Defaults**
- CSV data set config: **Add** → **Config element** → **CSV data set config**
- Listeners: **Add** → **Listeners** → **View Results Tree** 

### 2. Cấu hình giá trị cho CSV data set config
Các elements trong CSV data set config bao gồm:
![image.png](https://images.viblo.asia/bee3db91-3a4d-4ff3-a969-9f385d4331c4.png)
- **Filename**: Tên của tệp dữ liệu mà chúng ta sẽ sử dụng .csv
- **Variable Names**: Được mô tả như danh sách tất cả các tên biến (phân cách bởi dấu phẩy) theo thứ tự giống với vị trí các biến trong file CSV.  (Chúng ta sẽ để trống trường này, JMeter sẽ hỗ trợ bằng việc lấy hàng đầu tiên từ tệp CSV để làm biến cho mỗi cột)
- **Delimiter**: Được sử dụng để tách từng bảng ghi trong tệp CSV.
- **Allow quote data ?** : Chọn "TRUE" trong trường hợp bạn muốn bỏ qua dấu kép và cho phép các phần tử như vậy chứa dấu phân cách.
- **Recycle on EOF?** : Khi số lượng thread lớn hơn số lượng data được sử dụng trong file CSV, chọn "TRUE" nếu bạn muốn tiếp tục thực hiện kiểm thử bằng cách quay lại đọc từ đầu file.
- **Stop thread on EOF?** : Nếu chọn "SET", khi chạy đến end of file thì thread sẽ tự động dừng lại.
- **Sharing mode**: Định nghĩa hành vi chia sẻ của file CSV. Giá trị mặc định thường là "All threads".
    -  **All threads**: Nếu trong trường hợp kiểm thử với nhiều element CSV config cùng tham chiếu đến một CSV thì CSV Data Set Config kế tiếp sẽ tiếp tục đọc file CSV đã được mở từ CSV data set config trước đó.
    -  **Current thread group**: Nếu trong script có nhiều hơn một element CSV data set config cùng tham chiếu đến một file, CSV data set config kế tiếp sẽ mở lại file cho từng thread group.
    -  **Current thread**: Mỗi file csv được mở riêng biệt cho từng thread khi chọn option này.
## III. Thực hiện test plan với Data set config
### 1. Cấu hình CSV data set config 
- Thực hiện kiểm thử hoạt động login vào trang web https://vnexpress.net/ với nhiều bộ account (email/password) khác nhau.
- Điều cần thiết nhất là chuẩn bị một file CSV.

![image.png](https://images.viblo.asia/bc2a709f-494c-45a2-b753-566972a1349c.png)
- Tạo một Thread group có tên *loginVnExpress* và thêm CSV Data Set Config
- Tiếp theo chúng ta sẽ cấu hình CSV data set config trong JMeter

    ![image.png](https://images.viblo.asia/418ba19b-d9db-43ab-a527-1e5462533b30.png)
    - **Filename**: Đường dẫn đến file CSV. Cần chú ý rằng JMeter scripts và file CSV nên được đặt trong cùng một chỗ. Nhấp vào nút Browse... để chọn đường dẫn.
    - **Variable Names (comma-delimited)**: Cung cấp tên biến tùy ý theo file CSV của bạn. Ở đây, các biến được dùng sẽ là "email" và "password".
    - **Delimiter**: ','
    - **Reccycle on EOF**: True
    - **Stop thread on EOF**: False
    - **Sharing Mode**: All threads
### 2. Thêm các request (HTTP Request)
- Ở đây, mình sẽ mô phỏng các steps của người dùng thực để có thể login vào trang web. Vì vậy chúng ta sẽ có 3 request là gotoHome/gotoLogin/login
- Với mỗi request, sẽ có URL, path, method, request data tương ứng.
    - **gotoHome**:
    
    ![image.png](https://images.viblo.asia/ee0e5018-3974-41ab-9312-311aa8e8093a.png)
    - **gotoLogin**:
    
    ![image.png](https://images.viblo.asia/e3256e2d-e89b-4fb7-ab77-8652d1eea229.png)
    - **login**:
    
    ![image.png](https://images.viblo.asia/737762da-07ff-495a-8c77-1cc5cf2b3f98.png)
- Cái chúng ta cần quan tâm nhất ở đây là Parameters của request *\login*. Tất nhiên, parameters phải chính xác theo các biến (name và value tương ứng) : 
    - csrf:	${csrf}	
    - myvne_email:	${email}
    - myvne_password:	${password}
    - view_app:	0
 - Email và Password, thay vì điền trực tiếp ta sử dụng với biến ${email} và ${password} đã được khai báo ở mục **Variable Names** của CSV data set config.
### 3. Run test plan
- Trong file csv ví dụ, mình có 4 records data tương ứng với 4 account, vì vậy mình sẽ setting Thread properties với giả định 4 users chạy đồng thời.

![image.png](https://images.viblo.asia/e7edec0a-1041-483d-8203-7e51b38fd55e.png)
- Và đừng quên thêm Listeners để xem kết quả sau khi chạy nhé, ở đây mình sẽ xem kết quả ở dạng **View Results Tree** để có thể kiểm tra chi tiết từng request. Sau khi chạy, chúng ta sẽ được:

![image.png](https://images.viblo.asia/e8733e78-7c01-43fb-8c00-8a219e0c7392.png)
- Cùng check xem, request login có lấy data từ file csv không nhé.

![image.png](https://images.viblo.asia/2dcc92cc-186e-47ca-ad02-1f243927a6ba.png)
- Như kết quả, có 1 request *login ***Passed** và 3 requests **Failed**. Vì chỉ account đầu tiên với giá trị email= "totrinh290996@gmail.com" and password= "Abcd123". Nên kết quả trả về **Passed** còn 3 account còn lại, mình chưa đăng ký, vì vậy sẽ **Failed**.
### Note
- Trong test plan của mình có 2 điểm cần chú ý. *(Những phần này các bạn có thể tìm hiểu thêm theo keyword dưới hoặc mình sẽ update link sau nhé)*
    - Để có thể check được xem request "Passed" hay "Failed" thông thường server sẽ trả về response code, tuy nhiên với API phía trên luôn trả về response code: 200 nên chúng ta cần config thêm Response Assertion để check được request login nào đúng.
    ![image.png](https://images.viblo.asia/fe1ea0ce-d024-4d4c-9915-44360787c395.png)
    - Trong phần Parameter của request *login*, chúng ta có 1 biến là ***csrf= ${csrf}*** . Để có thể có giá trị *csrf* tương ứng, bạn phải setting thêm Regular Expression Extractor để có thể gọi.
    ![image.png](https://images.viblo.asia/da2e8623-07f7-469f-91cb-8edf97023900.png)
-----
Tài liệu tham khảo
1. https://softwaretester.info/dynamic-data-for-jmeter/
2. https://www.blazemeter.com/blog/jmeter-parameterization-the-complete-guide
3. https://viblo.asia/p/tham-so-hoa-trong-jmeter-su-dung-csv-data-set-config-4P856jvL5Y3