Mình tham gia project React native và gặp một vấn đề liên quan đến tạo public key RSA của iOS. Trên cùng lib của react-native, nó generate ra 2 puclic key có thông số khởi tạo giống nhau, nhưng lại khác nhau về độ dài chuỗi. Với độ dài RSA 2048 bit, độ dài chuỗi public key của Android là 192 ký tự, còn iOS là 160 ký tự . Public key RSA của Android được server verify thành công, còn public key của iOS không verify. 
<br>Sau thời gian tìm tòi, mình đã tìm được câu trả lời cho vấn đề này. Để khởi tạo public key, cả 2 Android và iOS đều sử dụng framework Security của riêng OS. Android sử dụng theo format của ASCII tạo ra public key full format và cũng là chuẩn phổ biến openssl phía Server đang sử dụng. iOS tạo ra 1 public key thu gọn theo format ASN.1, nên phía Server không thể verify được. ASN.1 được sử dụng trong X.509, một đề nghị của ITU (International Telecommunication Union) định nghĩa một framework về chứng thực (certificate) được sử dụng trên giao thức HTTPS để duyệt trình web an toàn. Quay lại với bài toán của mình, chúng ta có thể 2 cách xử lý bài toán trên:<br>
1. Client( iPhone) có thể decode và chuyển sang format ASCII để Server có thể verify.<br>
2. Giải quyết từ phía Server theo format X.509, client thông báo để Server có thể phân biệt thiết bị client đang chạy là iOS hay Android.<br>

Dưới đây là cách giải quyết vấn đề trên từ phía client mình tìm kiếm được, ở đây là iOS:<br>
Trước hết là một method để mã hóa các trường có độ dài ASN.1:<br><br>
![](https://images.viblo.asia/98cd15ee-9bbd-4866-bc19-812ef720b943.png)
Sau đó là sử dụng Base64 để encode và gắn thêm header cho public key:<br><br>
![](https://images.viblo.asia/d0773cf9-27e1-4932-a8f8-5d723a661f52.png)
Cuối cùng ta truyền public key vào method đã tạo phía trên để có publickey hoàn chỉnh:<br><br>
![](https://images.viblo.asia/67986282-385d-490c-9172-45bcc3c253d0.png)
Bạn có thể tham khảo source code dưới đây: <br>
https://github.com/SelfLender/react-native-biometrics/pull/3/files<br>
Bạn có thể tìm kiếm thêm cách xử lý ở phía server theo openssl format X.509:<br>
http://php.net/manual/en/ref.openssl.php<br>
Dưới đây là các link tham khảo:<br>
https://blog.wingsofhermes.org/?p=42<br>
https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One<br>