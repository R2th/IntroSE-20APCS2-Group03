Khi học về cách sử dụng JMeter để test trường hợp Login thành công, các bạn chắc hẳn đều được dạy cách thêm 2 Parameters là username và password. Nhưng đó là Login với 1 tài khoản, vậy nếu như chúng ta phải Login với 100 hay 1000 tài khoản, chúng ta sẽ làm như thế nào? :thinking:

Tạo HTTP Request Login và duplicate lên 100 hay 1000 lần? :scream:.  No, we will not do this wayy

Sẽ có cách thông minh hơn chỉ với một HTTP Request mà chúng ta có thể giải quyết được bài toán này. Đó là sử dụng file CSV.
Bài viết hôm nay chúng ta cùng tìm hiểu cách config với file CSV nhé :smirk:

# CSV DATA CONFIG

Chúng ta sẽ thử demo login các trang web sau: https://www.hogodoc.com/HoGo/login

##  Chuẩn bị file CSV

Đầu tiên, để chuẩn bị file CSV chúng ta phải có những account đã đăng ký tại trang web. Mình đã có sẵn một số account như sau:
test01@gmail.com / 123456
tes02@gmail.com / 123456
Vì trang web này yêu cầu password mã hóa MD5, vì thế chúng ta sẽ chúng ta sẽ đổi nó sang dạng MD5 như sau: e10adc3949ba59abbe56e057f20f883e
Tiếp theo, bật Notepad hoặc excel,... để tao ra file csv. Mình sẽ sử dụng Notepad ++. Chúng ta sẽ có 2 cột đó là USERNAME và PASSWORD. Chúng ta thực hiện điền thông tin như sau:

![image.png](https://images.viblo.asia/c2f5b308-829d-4dba-ac60-7fe1e9003211.png)

Sau đó save file này lại.

##  CSV DATA CONFIG

1.  Open Apache JMeter, sau đó tạo Thread Group

![image.png](https://images.viblo.asia/d112488f-b1c3-460a-9015-895e99033d70.png)

2. Sau đó tạo một HTTP Request và đổi tên của nó thành Login

![image.png](https://images.viblo.asia/d3b8eca6-dbe0-4d21-a035-376fb15d1502.png)

3. Tạo HTTP Header manager

![image.png](https://images.viblo.asia/e2915fa6-b799-4846-ae7b-29a95636eb81.png)

4. Chuột phải vào Test plan và tạo CSV Data set config

![image.png](https://images.viblo.asia/65f224cd-5758-4ab3-9f9f-0c27c57b3d6c.png)

5. Input các fields trong CSV Data set config 

* Import file csv vào Filename
* Variables Names: USERNAME,PASSWORD
Mình sẽ giải thích cho các bạn tất cả các trường còn lại sau khi chúng ta config xong file csv nhé :yum:

![image.png](https://images.viblo.asia/bb94d034-348d-4df0-874e-fc81a317a6b1.png)

6. Input Thead Group:

* Loop count: 2

![image.png](https://images.viblo.asia/21b477f1-9a46-4ccb-8f14-4c2cdc08fc8d.png)

7. Input HTTP Request

* Protocol: HTTPS
* Server Nam or IP: www.hogodoc.com
* Method: POST
* Path: HoGo/api/v1/Login
* Parameters:
EmailAddress: ${USERNAME 
Password: ${PASSWORD
KeepMeLogin: true

![image.png](https://images.viblo.asia/4bde1dd9-e3d7-40e3-9dbc-f08f423834ad.png)

8. Input HTTP Header manager

* Content-Type: application/x-www-form-urlencoded

![image.png](https://images.viblo.asia/153b8400-97ff-42e6-ac5e-a97b8cc0be53.png)

9. Add Listener > View Result Tree and run

![image.png](https://images.viblo.asia/815110f8-3261-4a22-b211-c0f12ea84df9.png)

Sau đó Run và xem kết quả:

![image.png](https://images.viblo.asia/a324a5a1-75f5-4a2f-adf3-5877eb85a2e9.png)
 
 Kết quả trả về 200 là công. Check Response như sau:
 
 ![image.png](https://images.viblo.asia/2f17e6cf-8231-4d26-b51e-bf80d96a6a4d.png)
 
##  Giải thích về các attributes ở CSV Data Set Config

![image.png](https://images.viblo.asia/a1a85d75-54b0-478a-9583-1eb0aed78065.png)

**1. Filename:**
* Chỉ ra địa chỉ của file CSV. Chúng ta có thể add manual hoặc browser file

**2. File encoding:**
khi click vào trường này chúng ta sẽ nhìn thấy một list như sau:
![image.png](https://images.viblo.asia/44c8a0d6-76f4-4e1c-9789-3a1494115e47.png)
Trường này giúp chúng ta xác định định dạng của text trong file csv để tranh lỗi font. Ví dụ nếu trong file csv có sử dụng tiếng Việt, chúng ta sẽ chọn UTF - 8

**3. Variable Names:**
* Liệt kê các biến ở file CSV và mặc định sẽ được ngăn cách nhau bằng dấu phẩy (không có dấu cách)
* Nếu trường này để trống thì dòng đầu sẽ được mặc định là tên biến

**4. Delimiter:** được sử dụng để tách từng bản ghi trong tệp csv. Bạn cần đảm bảo xác định tên biến theo thứ tự chính xác khi bạn cung cấp giá trị trong file csv.

**5. Allow quoted data?:** Nếu được bật, thì các giá trị có thể được đặt trong ”- dấu ngoặc kép - cho phép các giá trị chứa dấu phân cách.

**6. Recycle on EOF?:** Nếu số lượng thread lớn hơn số lượng Test Data, bạn có muốn tiếp tục thực hiện kiểm thử bằng cách quay trở lại đọc từ đầu không?

**7. Stop thread on EOF?:** Nếu chọn “Set”, khi chạy đến EOF sẽ khiến cho thread bị dừng lại.

**8. Sharing mode:** Tại đây bạn có thể định nghĩa hành vi chia sẻ của file CSV. Mặc định sẽ chọn là "All threads"

**9. All threads:** Nếu trong script của bạn có nhiều hơn 1 element CSV Data Set Config cùng tham chiếu đến 1 file thì CSV Data Set Config kế tiếp sẽ tiếp tục đọc CSV File đã được mở từ CSV Data Set Config trước.

– Current Thread Group : Nếu trong script của bạn có nhiều hơn 1 element CSV Data Set Config cùng tham chiếu đến 1 file thì CSV Data Set Config kế tiếp sẽ mở lại csv file cho từng trhread group

– Current Thread : Mỗi file csv được mở riêng biệt cho từng thread khi chọn option này.

Do đó, khi sử dụng nhiều CSV Data Set Config, hãy đảm bảo sử dụng kết hợp chính xác giữa Sharing Mode, Recycle on EOF & Stop Thread on EOF để nhận kết quả mong muốn.

Như vậy chúng ta đã đi cùng nhau tìm hiểu cách Config CSV với Apache JMeter, chùng tìm hiểu thêm nhiều kiến thức hơn với JMeter của mình ở các post khác nhé. :sunglasses: