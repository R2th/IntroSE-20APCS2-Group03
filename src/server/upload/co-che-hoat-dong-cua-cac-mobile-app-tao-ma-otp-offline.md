Bài viết được lược dịch có chỉnh sửa từ nguồn: https://blog.usejournal.com/how-authy-google-authenticator-and-other-offline-otp-generation-app-works-a76be96304e4

Ngày nay, với những nhu cầu tăng cao về việc bảo mật tài khoản cá nhân, chắc hẳn bạn đã ít nhiều nghe nói đến 2FA (two-factor authentication). Ý tưởng ở đây là trang bị thêm một lớp mật khẩu nữa cho tài khoản online của bạn, ví dụ như Github, Chatwork, Gmail, Facebook, Twitter, các tài khoản thanh toán trực tuyến... để gia tăng độ tin cậy, phòng chống việc xâm nhập trái phép.
Khi kích hoạt 2FA bằng cách sử dụng các ứng dụng di động như Google Authenticator hoặc Authy, quy trình mỗi lần chúng ta đăng nhập tài khoản thường sẽ như sau:

- nhập username và password đúng, submit form login lần 1
- nhập mã OTP (one-time password) được sinh ra từ mobile app 2FA, submit form lần 2. Sau khi server xác thực mã OTP bạn nhập là đúng thì mới tạo phiên làm việc mới.

Một điều thú vị ở đây, bạn đã bao giờ quan sát và tự hỏi làm thế nào để các ứng dụng 2FA tạo ra các mã OTP khác nhau, hợp lệ trong những khoảng thời gian nhất định p (thường là 30 giây, 1 phút hoặc lâu hơn tùy mục đích), và quan trọng hơn các ứng dụng này có thể hoạt động offline, không cần kết nối mạng, không cần giao tiếp với server? Làm thế nào để các mã OTP được sinh ra độc lập ở phía client rồi sau đó được server xác thực là hợp lệ?

Cụ thể, có 2 đối tượng sẽ tham gia vào quá trình này:
- Ứng dụng di động hoặc một thiết bị chạy script phục vụ cho việc tạo mã OTP
- Website, hoặc server, đảm nhận việc xác thực mã OTP

Để đảm bảo sự hoạt động của cơ chế xác thực 2FA, chúng ta cần giải quyết 3 vấn đề:

1. Tham số đầu vào dùng để tạo OTP. Nó sẽ thay đổi sau mỗi khoảng thời gian p và có thể truy cập offline.
2. Giải thuật để chuyển đổi tham số đó thành mã OTP.
3. Phương pháp để bảo mật mã OTP, sao cho nếu có người khác biết được kịch bản 2 bước như trên thì họ cũng không thể tạo ra được OTP hợp lệ.

Sau đây chúng ta sẽ xem xét từng vấn đề.

## 1. Tham số đầu vào

Vấn đề này khá đơn giản. Có thể sử dụng nhãn thời gian làm tham số bởi vì nó dễ dàng được truy cập bởi các thiết bị, hệ thống máy tính và chúng ta điều chỉnh được để nó thay đổi sau những khoảng thời gian p.

Mình sẽ sử dụng các đoạn mã `JavaScript` để minh họa cho ý tưởng và giải thuật trong bài viết này. Đầu tiên, chúng ta cần sử dụng hàm `setInterval` để sinh ra nhãn thời gian thay đổi định kỳ:

```javascript
var myInterval = setInterval(function() {
  const date = new Date();
  const timestamp = date.getTime();
  const otp_valid_for_secs = 5;

  const factor = otp_valid_for_secs * 1000;
  
  // As timestamp changes every milisecond, 
  // we devide it by a factor for our purpose
  let otp_changing_parameter = parseInt(timestamp/factor);

  console.log(otp_changing_parameter);
}, 1000)
```

Bởi vì nhãn thời gian thay đổi mỗi một milisecond, chúng ta sẽ chia cho 1000 để nhận được giá trị thay đổi sau mỗi giây. Nếu bạn muốn thay đổi tham số này sau mỗi `n` giây, đơn giản là hãy thay đổi hằng số `otp_valid_for_secs` ở đoạn script trên thành `n`. Hàm `setInterval` sẽ chạy đoạn code này mỗi giây, và vì chúng ta đang đặt n = 5 nên bạn sẽ nhìn thấy tham số được in ra console giống nhau mỗi 5 giây, sau đó sẽ tăng thêm 1 đơn vị.

Chúng ta có thể sử dụng trực tiếp tham số này làm OTP hay không? Câu trả lời là không bởi vì bất kì ai cũng có thể truy cập được giá trị này bằng cách chạy đoạn script trên.
Nếu như bổ sung thêm một số ngẫu nhiên mà cả client và server đều biết vào mã OTP này thì sao? Cũng không được nốt, bởi vì dựa trên việc quan sát một dãy các tham số tạo ra theo thời gian, chúng ta có thể đoán được số ngẫu nhiên kia là gì và tham số tiếp theo sẽ như thế nào.

Do vậy, bài toán đặt ra là làm sao để bản thân mã OTP và quy luật thay đổi của mã này không dự đoán được, kể cả khi người nào đó biết được cơ chế của sự thay đổi.

## 2. Giải thuật

Đây là lúc chúng ta cần một giải thuật phù hợp. Nó cần đáp ứng được yêu cầu có thể chuyển đổi tham số đầu vào thành mã OTP, và kể cả khi người nào đó thu thập được rất nhiều mã OTP sau một khoảng thời gian quan sát thì anh ta cũng không thể dự đoán được mã xuất hiện tiếp theo là gì.

Hàm băm là cách rất tốt để đạt được điều này, bởi vì kể cả khi bạn biết được quy luật về việc thay đổi tham số đầu vào, bạn cũng không biết được đầu ra sẽ thay đổi như thế nào.

Như đã nói ở trên, chúng ta sẽ sử dụng nhãn thời gian làm đầu vào cho hàm băm để tạo ra mã OTP. Có nhiều giải thuật băm khác nhau như MD5, SHA1, SHA256. Mình sẽ chọn cách implement với SHA256. Để cài đặt SHA256 với JavaScript, mình có sưu tầm được một [script nhỏ gọn](https://geraintluff.github.io/sha256/) và sẽ sử dụng nó body của hàm `sha256` bên dưới.

```javascript
const timestamp = "" + 313447520;

function sha256(ascii) {
  // insert function sha256's body here
}

const hashed_value = sha256(timestamp);

console.log(hashed_value);
// 80504f4b70d0749acad11fb2fbe537a2d582398548a375a073f0828024eb2d9f
```

Kết quả thu được là một chuỗi output khá dài (64 ký tự), không phù hợp để sử dụng luôn làm mã OTP. Thay vào đó, chúng ta có thể lấy 6 ký tự cuối cùng của string này và chuyển đổi thành số nguyên. Vì hash string output ở dạng cơ số 16 (hexa), trong khi số nguyên dự định dùng làm mã OTP ở dạng cơ số 10, việc chuyển đổi 6 ký tự hexa có thể cho kết quả là số nguyên có 7 - 8 chữ số. Nếu cần mã OTP với kích thước nhỏ hơn, bạn có thể sử dụng ít ký tự hexa hơn.

```javascript
const hashed_value = "80504f4b70d0749acad11fb2fbe537a2d582398548a375a073f0828024eb2d9f";

const last_six_characters = hashed_value.substr(hashed_value.length - 6);
const otp = parseInt(last_six_characters, 16);

let otp_string = otp.toString();

// If length is less than 8, add 0 in beginning
while(otp_string.length < 8) {
  otp_string = "0" + otp_string;
}

console.log(otp_string);
// 15412639
```

Bây giờ, chúng ta đã có được một con số khả dĩ để sử dụng làm mã OTP. Nó sẽ thay đổi mỗi 5 giây. Nhưng dễ thấy, bất kì ai khác cũng có thể tạo được nhãn thời gian đầu vào và áp dụng giải thuật SHA256 như chúng ta vừa làm để có được mã OTP giống y nguyên như vậy. Nghĩa là mã OTP của chúng ta vẫn chưa đủ tốt, cần phải bổ sung thêm phương pháp bảo mật nào đó để nó trở nên an toàn hơn.

## 3. Mã OTP an toàn

Giải pháp ở đây là nối chuỗi nhãn thời gian với một khóa bí mật mà chỉ client và server biết, sau đó mới thực hiện băm SHA256 để mã hóa chuỗi đầu vào ấy. Kết quả thu được sẽ rất khác so với chỉ băm một mình nhãn thời gian.

```javascript
const timestamp = "" + 313447520;
const secret_key = "the-very-secret-key";

const hashed_value = sha256(timestamp + secret_key);
const last_six_characters = hashed_value.substr(hashed_value.length - 6);

const otp = parseInt(last_six_characters, 16);

let otp_string = otp.toString();

while(otp_string.length < 8) {
  otp_string = "0" + otp_string;
}

console.log(otp_string);
// 03452219
```

Đến đây, việc còn lại của bạn là chia sẻ khóa bí mật với client ở lần cài đặt ứng dụng đầu tiên, khi ấy client có thể tạo mã OTP độc lập, hợp lệ và server có thể xác thực mà hai đối tượng này không cần kết nối trực tiếp với nhau.

## 4. Tài liệu tham khảo

* https://geraintluff.github.io/sha256/
* https://www.quora.com/How-does-the-Google-Authenticator-app-for-Android-work-offline
* https://authy.com/blog/understanding-2fa-the-authy-app-and-sms/
* https://security.stackexchange.com/questions/47901/how-does-authys-2fa-work-if-it-doesnt-connect-to-the-server