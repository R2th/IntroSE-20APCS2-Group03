Textbox Email rất phổ biến trong một số Form Sign in, Sign up,....

Mình xin phép chia sẻ một số Testcase cho trường Email.

# 1. Bài toán đặt ra
Kiểm thử Textbox nhập email giả sử yêu cầu email phải dựa vào các tiêu chí sau:

1. Là trường bắt buộc
2.  Phần local part có độ dài từ 4 - 64 ký tự
3. Độ dài tối đa của email là 256 ký tự
    
# 2. Testcase cho trường email
## 2.1. Valid cases
*  Nhập normal email với ký tự hợp lệ:
    - Ký tự chữ
    - Ký tự số
    - Ký hiệu hợp lệ : gạch dưới ( _ ), dấu chấm (.), gạch ngang ( - )
*   Với độ dài của local part, sử dụng phân vùng tương đương và phân tích giá trị biên ta có các case sau :
    - Local part có 4 ký tự ( Min length)
    - Local part có 5 ký tự ( Min length + 1)
    - Local part có 63 ký tự ( Max length -1)
    - Local part có 64 ký tự (Max length)
*   Với độ dài của email, sử dụng phân vùng tương đương và phân tích giá trị biên ta có các case sau :
    - Email có độ dài là 255 ký tự ( Max length -1 )
    - Email có độ dài là 256 ký tự ( Max length )
*   Có chứa spaces đầu và cuối giá trị email
*   Không phân biệt hoa thường

## 2.2. Invalid cases 

* Không nhập địa chỉ email
* Nhập địa chỉ email với các ký tự đặc biệt : ~!#$%^&(),<>, vv và các icon
*  Với độ dài của local part, sử dụng phân vùng tương đương và phân tích giá trị biên ta có các case sau :
    - Local part có 3 ký tự ( Min length - 1)
    - Local part có 65 ký tự ( Max length + 1)
*   Với độ dài của email, sử dụng phân vùng tương đương và phân tích giá trị biên ta có các case sau :
    - Email có độ dài là 257 ký tự ( Max length+1 )
*  Nhập địa chỉ email không đúng format:
    - Nhập 2 địa chỉ email vơi format:
        + mail 1, mail 2
        + mail 1mail 2
        + mail 1.mail 2
        + mail 1 - mail 2
    - Nhập email thiếu "@"
    - Nhập email thừa "@"
    - Email có ".." trong email
    - Email có "." ở đầu/ cuối địa chỉ email
    - Email có "@" cuối địa chỉ email
    - Email có "-" trước/ sau dấu "@"
* Nhập email với địa chỉ IP không hợp lệ
* Nhập tên miền không hợp lệ 
 Bạn có thể tìm hiểu về cách thức hoạt động của tên miền tại đây http://en.wikipedia.org/wiki/Domain_Name_System#Domain_name_syntax
* Nhập câu lệnh SQL injection
* Nhập câu lệnh HTML
* Nhập UNICODE

## Chú ý: Khi nhập địa chỉ email phải đảm bảo:
1. Là mail cá nhân/ mail công ty của bản thân
2. Là mail test chung của dự án
3. Không được nhập email của khách hàng
4. Không được nhập email không xác định nó có tồn tại không

## 2.3. Ví dụ EMAIL
### Valid email-------------------------------- Reason 
* email@domain.com------------------------------ Email hợp lệ
* firstname.lastname@domain.com-----------Email chứa dấu chấm trong local part  
* email@subdomain.domain .com ------------Email chứa dấu chấm với tên miền phụ
* Firstname+lastname@domain.com-------- Dấu hiệu được coi là ký tự hợp lệ 
* email@123.123.123.123------------------------ Tên miền là địa chỉ IP hợp lệ 
* email@[123.123.123.123] --------------------- Dấu ngoặc vuông quanh địa chỉ IP được coi là hợp lệ 
* "email"@domain.com- ------------------------- Báo giá xung quanh email được coi là hợp lệ 
* 1234567890@domain.com-------------------- Kỹ thuật số trong địa chỉ là 
* email@domain-one.com------------------------Dash trong tên miền hợp lệ là 
* email@domain.name  -------------------------- .name là hợp lệ Tên miền cấp cao nhất 
* email@domain.co.jp ----------------------------- Chấm vào tên miền cấp cao nhất cũng được coi là hợp lệ (sử dụng co.jp làm ví dụ ở đây) 
* Firstname-lastname@domain.com----------Dash trong trường địa chỉ hợp lệ 

### Invalid email-------------------------------------Reason 
* plainaddress -------------------------------------------------Missing @ đăng nhập và domain
* #@%^%#$@#$@#.com --------------------------------- Rác
* @domain.com ----------------------------------------------- Thiếu tên người dùng 
* JoeSmith< email@domain.com> ---------------------- Mã hóa html trong email không hợp lệ 
* email.domain.com ----------------------------------------- Thiếu "@" 
* email@domain@domain.com ------------------------ Thừa  "@" 
* .email@domain.com---------------------------------------Dấu chấm "." ở đầu giá trị email
* email.@domain.com -------------------------------------- Dấu chấm "." trước "@" không hợp lệ
* email..email@domain.com ----------------------------- Nhiều dấu chấm".." ở phần local part 
* & #12354;& #12356; & #12353; & #12360; & #12362; @ domain.com - Unicode char làm địa chỉ 
* email@domain.com (Joe Smith) ---------------------------- Email theo dõi văn bản không được phép gửi 
* email@domain ---- --------------------------------------------- Thiếu tên miền cấp cao nhất ( .com/ .net/ .org/ etc) 
* email@-domain.com------------------------------------------- Dấu gạch ngang "-:  trước "@" không hợp lệ 
* email@domain.web ------------------------------------------- .web không phải là một tên miền cấp cao hợp lệ 
* email@111.222.333.44444---------------------------------- Email định dạng IP không hợp lệ 
* @domain..com -------------------------------------------------- Nhiều dấu chấm ".."' trong phần tên miền không hợp lệ

## Bài viết được tham khảo tại nguồn
https://www.testingvn.com/viewtopic.php?f=15&t=3193