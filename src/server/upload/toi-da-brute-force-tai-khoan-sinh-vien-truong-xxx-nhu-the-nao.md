- Bruteforce có lẽ là 1 hình thức tấn công chắc hẳn cũng không còn gì lạ lẫm đối với các website không được bảo mật kĩ càng nữa rồi, đấy là cách tấn công mạng mà sẽ xoay quanh 1 vòng lặp tạo ra các ký tự nhằm khai thác ra mật khẩu của nạn nhân.
    - Nếu đã là sinh viên thì chắc hẳn ai ai cũng sẽ được cung cấp 1 tài khoản để xem thời khoá biểu hoặc đăng ký học phần, có username là mssv và password mặc định sẽ là ngày tháng năm sinh hoặc 1 chuỗi kí tự nào đó. 
    - Và điều đầu tiên mà bạn nhận được khi nhận được tài khoản là gì ??, có phải là "CÁC EM NHỚ ĐỔI MẬT KHẨU LẦN ĐẦU ĐĂNG NHẬP NHA =)))" hoặc đại loại như vậy.
    - Tuy cách khai thác này không có gì mới mẻ, nhưng đa số các bạn sinh viên vẫn còn đang chủ quan khi vẫn giữ nguyên pass mặc định (câu chuyện mà mình sắp kể nạn nhân sẽ có password là ngày tháng năm sinh nha :sweat_smile: ), đó cũng là điều kiện để các bạn có thể sẽ dính phải cuộc tấn công brute-force.
    - Rồi thử nghĩ nếu 1 ngày khi bạn vào công nợ của mình và nhận ra có vài điều bất thường, chẳng hạn có thêm dăm 3 môn hoặc điều gì đó mới mẻ thì đã quá muộn rồi.
- Đáng lẽ sẽ không có bài viết này nếu trong buổi chiều nay mình bị đứa bạn cùng phòng nhờ vã xem hộ thời khoá biểu :v: Và cũng sẽ không có chuyện gì xảy ra nếu như nó không để password mặc định ạ :1234: . Rồi mình tự nghĩ, có khi nào trường này một số cũng có cùng suy nghĩ như thế, và thế là câu chuyện chính thức bắt đầu.

# 1. Mở đầu
- Ở đây là sẽ đặt tên cho web mà mình tấn công vào là là **Victim** cho dễ gọi nhé.
- Mình sẽ sử dụng ngôn ngữ **python** và module sẽ là **requests** để gửi giả lập gói tin.
- **Lưu ý: Đây chỉ là bài viết nhằm mục đích nghiên cứu học tập, không khuyến khích thực hiện ( nhất là đối với web nhà trường, chính phủ =(( ) vì thế nên mình sẽ không đi sâu vào nhiều.**
# 2. Bắt đầu
## 2.1. Phân tích gói tin
- Đầu tiên mình sẽ truy cập vào url cổng thông tin sinh viên của **Victim**.
- Mình sẽ thử đăng nhập vớ vẩn gì đó, web sẽ báo là sai tài khoản mật khẩu và quan sát **POST** gửi lên ta sẽ thấy được các thông tin mà mình đã nhập ở phần **form data** và **status_code** trả về sẽ là **200** ( có nghĩa là chưa đăng nhập thành công ).

- ![](https://images.viblo.asia/158578cb-ba10-4752-b7d4-a85662a16a48.PNG)
- ![](https://images.viblo.asia/410f0e3f-3088-4030-aa2b-e14b2247bc47.png)
- ![](https://images.viblo.asia/09cc71ae-0480-44ae-bf9a-444e16eaf0a0.PNG)

- Điều bất thường ở đây là **"Mật khẩu không được mã hoá :v"** và cũng **chã có 1 cái token nào để xác thực cả** ( thường thì các website khác đều phải có token hoặc captcha để xác thực, và mật khẩu còn được mã hoá random theo CryptoJS (biến thể của base64) -> cái này mấy cái web do ASC làm thì mình chịu, trình thấp nên không giải ra được pass :v ).
- Nếu mật khẩu của bạn đang sử dụng tất cả các chữ cái thường và không có ký tự đặc biệt hoặc chữ số, chỉ mất 2-10 phút là một cuộc tấn công **brute-force** có thể crack mật khẩu này. Ngược lại, một mật khẩu có sự kết hợp của cả chữ hoa và chữ thường cùng với một vài chữ số ( giả sử có 8 chữ số ) sẽ mất hơn 14-15 năm để bị crack. ( Nhưng đây là ngày tháng năm sinh ạ, các bạn cứ tính xác suất sẽ ra thôi nha :heart_eyes: )
- Kết luận: **Mật khẩu không mã hoá, không token, không xác thực** -> ezz :smiley: 
## 2.2. Thực hiện code
- Mình sẽ tạo 1 file python để thực hiện code nhé.
- Đầu tiên mình sẽ import requests vào để sử dụng và khai báo các biến sử dụng.
```
import requests
s = requests.Session() # Lấy session hiện tại
url = '{url_victim}' # url_victim là url của website
f = open('bruteforce.txt', 'a') 
# Tạo ra 1 file.txt để ghi vào các tài khoản đã brute được
```
- Trước đó mình đã gửi thử khoảng 50 request post bằng python + có sử dụng VPN, fake ip và vẫn thấy bình thường mà không bị chặn IP hay vấn đề gì cả, thế nên mình tiếp tục ....
    - Vấn đề bây giờ là mã sinh viên ở đâu để test :v 
 
 ![](https://images.viblo.asia/b6d8ce8d-d8a5-4dba-8629-d99d3277341b.PNG) 
 (Hình minh hoạ)
 
=> Mỗi web sinh viên đều thường sẽ có các post thông báo danh sách các kiểu => Sau khi vào trang thông báo của **Victim** dò 1 số danh sách và mình lấy 1 mã sinh viên bất kì, bắt đầu mình phân tích mã sinh viên này ( ví dụ như mã sinh viên ở dưới ).
  
 ![](https://images.viblo.asia/f4186922-6a28-4b02-948f-fb5042e2e84c.png)

- Như ta thấy, 2 số đầu có thể là mã khoá học, các số tiếp theo có thể là mã ngành mã khoa blabla gì đó rồi đến 3 số cuối là các số > 100, nhưng mình lười nên chỉ lấy phần > 100 để kiểm tra thôi :v

    - **Ý tưởng:**
- Username sẽ nằm trong khoản {các số đầu tiên} + 3 số cuối -> không biết, nhưng mình sẽ thử chạy tầm 50 tài khoản đầu  (từ 500 đến 550 nhé ) xem tìm được không và sẽ tăng mức độ dò lên :v
- Mỗi lần gửi payload lên sẽ là 1 username và pass khác nhau do đó mình sẽ sử dụng 3 vòng for lồng vào nhau để kiểm tra dữ liệu ( username= {mã các số đầu}+{3 số cuối};  pass = ngày+tháng+năm(2 số đầu của mã sinh viên để kiểm tra năm bao nhiêu)). (tất cả phải được convert thành chuỗi string)
( Mình sẽ không public code nhé )
- Mỗi lần lặp như vậy sẽ tăng ngày, tháng lên để kiểm tra tiếp
    - Payload của mình sẽ là như thế này
```
  payload = { 'txtusername': '{các số đầu của mã sinh viên}' + '{3 số cuối}',
 # mình sử dụng vòng lặp for để tăng dần 3 chữ số cuối mã sinh viên lên
                        'txtpassword': passwdLogin,
                        # passLogin = '{ngày}' + '{tháng}' + '{năm}'
                        'btnDangNhap': 'Đăng nhập', }  
```

- Lấy status_code của response trả về xem đã đăng nhập thành công chưa 

```
respone = s.post(url, data=payload, allow_redirects=False)
# allow_redirects=False 
# -> không cho phép redirect để xác định lấy được status_code 302 found hay chưa
``` 
''
    - Như lúc đầu mình đã nói, nếu status_code trả về 200 có nghĩa là chưa đăng nhập thành công ngược lại status_code trả về 302 thì đã đăng nhập được.
    ![](https://images.viblo.asia/a21ceb2c-ed07-492c-a958-0cf6a14c4a58.PNG)

```
if respone.status_code == 302:
    print('----------Find a username: ' + usernameLogin)
    print('----------Password: ' + passwdLogin)
    f.writelines('\n' + usernameLogin + '\n' + passwdLogin + '\n')
    # Ghi tài khoản và mật khẩu vào file txt
```
- Cuối cùng không quên đóng file lại ạ
`f.close()`

**=> Vì gửi số lượng lớn request trong lần tấn công brute-force này, đó cũng chính là 1 cuộc tấn Ddos với nhiều lưu lượng truy cập cùng 1 lúc.**

# 3. Kết quả
- Sau khi chạy code và không nằm ngoài "thần cơ dự toán của mình", 5p sau có hơn 4-5 tài khoản đã được mình ghi vào trong file và tất nhiên là đăng nhập thành công cả rồi.
- Sau khi test thử treo máy khoảng 15p cho 100 tài khoản thì trung bình mình sẽ thu được 30-35 tài khoản ( Phải mà treo máy cả ngày có mà thu về cả trắm sinh viên :(( )

![](https://images.viblo.asia/69c2fac9-7977-4f1a-b6e4-227a586d1032.png)

- Vậy là mình đã brute-force thành công tài khoản sinh viên của **Victim** mà không gặp vấn đề gì khó khăn cả. Tuy đây chỉ là phương pháp tấn công thông thường nhưng cũng phải khiến cho hàng trăm sinh viên phải đau đầu mà nghĩ cho mình 1 mật khẩu mạnh mẽ hơn rồi =))
- Sau đó mình đã report với trường và đã fix rồi thông ra thông báo cho sinh viên nhanh chóng đổi pass ổn thoả rồi ạ.
    - Và câu chuyện của mình đến đây là kết thúc, nếu có sai sót trong quá trình viết bài thì mong mọi người hãy bỏ qua nhé. Cảm ơn mọi người đã theo dõi hết câu chuyện rảnh rỗi của mình ạ!!
# 4. Tài liệu
- Requests Python : https://requests.readthedocs.io/
- Phòng chống tấn công Brute-Force : https://securitybox.vn/6958/tim-hieu-tan-cong-brute-force-attack-va-cach-phong-chong/