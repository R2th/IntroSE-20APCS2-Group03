Trong quá trình mình tìm hiểu mạng blockchain Hyperledger Fabric, mình có biết được một loại chứng chỉ là X.509. <br>
Tuy nhiên, sau khi tìm hiểu mình mới phát hiện ra là X.509 không hề xa lạ mà vẫn được ta sử dụng hàng ngày trong việc lướt web. Vậy nên bài viết này sẽ giải thích rõ về X.509 !

# 1. X.509 là gì ?
> *In cryptography, X.509 is a standard defining the format of public key certificates. (Wikipedia)*

<br>

**X.509** ra đời vào năm 1988, và phiên bản mới nhát là v3, là một định dạng tiêu chuẩn cho chứng nhận khoá công khai (Public Key Certificate), được sử dụng phổ biến trong nhiều giao thức mạng (bao gồm cả TLS/SSL là nền tảng của HTTPS) và là một phần trong [PKI](https://en.wikipedia.org/wiki/Public_key_infrastructure) (Public Key Infrastructure). 

#### PKI gồm 4 thành phần:
- Chứng chỉ số
- Khoá công khai/ bí mật
- Cơ quan phát hành chứng chỉ (CA)
- Danh sách chứng chỉ bị thu hồi (CRL)


#### **X.509** có nhiệm vụ: 
- Xác thực danh tính: giống như một quyển hộ chiếu số, nhằm thông báo với các bên thứ 3 rằng thực thể này là hợp pháp và đáng tin cậy. Cert này ràng buộc danh tính của chủ sở hữu với public key của họ. Bất cứ ai có thể xác minh danh tính này bằng chữ ký của CA trong cert.
- Mã hoá - giải mã

> *Có thể bản chưa biết: chứng chỉ SSL thực chất là chứng chỉ X.509*
# 2. Cặp khoá và chữ ký số
Mỗi **X.509** đều bao gồm: **khoá công khai**, **chữ ký số**, thông tin về thực thể liên kết đến nó và cả thực thể phát hành (CA):
- **Khoá công khai** và khoá bí mật là 1 cặp với nhau, tuy nhiên thì khoá bí mật phải được giấu kín khác với khoá công khai nằm trong chứng chỉ **X.509**. Cặp khoá này có tác dụng:
    * Cho phép người dùng tạo ra chữ ký số bằng khoá bí mật và có thể dùng khoá công khai để xác thực.
    * Cho phép một bên có thể gửi thông điệp mã hoá bằng khoá công khai và chỉ bên giữ khoá bí mật có thể giải mã được.
- **Chữ ký số**: được CA (đáng tin cậy) tạo ra bằng khoá bí mật cùng với tất cả các thông tin nằm trên chứng chỉ. Khi một chứng chỉ được ký bởi CA, các bên thứ 3 dùng nó để xác minh định danh của thực thể sở hữu chứng chỉ.
- Mỗi **X.509** bao gồm 2 trường thể hiện thực thể sở hữu và thực thể phát hành chứng chỉ.

Ngoài ra thì còn những thông tin khác như **version** và **validity period**.  Ta cùng check xem chúng thế nào ở dưới đây.

# 3. Các trường và phần mở rộng
Nhìn chung, **X.509** gồm các trường cơ bản: 
   
   ![](https://www.researchgate.net/profile/Sufyan_Al-Janabi2/publication/335857977/figure/fig1/AS:804054724784130@1568712993614/X509-certificate-V3-34.ppm)
<br>

Nhằm review các trường nằm trong **X.509**, ta sẽ truy cập chứng chỉ của trang [Viblo](https://viblo.asia/followings) bằng trình duyệt chrome.  <br>

![](https://images.viblo.asia/495ec904-c542-4e04-a792-c07255a47cf8.png)

Ta nhấn vào biểu tượng khoá trên thanh URL và chọn **Certificate**

### Subject
![](https://images.viblo.asia/7ce29dc6-6f79-45f2-ac0a-7367bf7b9179.png)

Group đầu tiên là thông tin của trang web gồm tên tổ chức, địa điểm,... của tổ chức host trang web này.

### Issuer
![](https://images.viblo.asia/bf96d372-9d20-427e-96f8-c20585f8a572.png)

Tiếp theo là thông tin về thực thể phát hành. Tuy nhiên trong trường hợp này, chính CloudFare phát hành chứng chỉ này nên các thông tin không thay đổi ngoại trừ **Common Name** là tên của CA thay vì là URL như ở trên

### Khoá, chữ ký và thời hạn
- Tiếp theo là 

    - **Serial Number**: do CA gán, là định danh duy nhất của chứng chỉ, 
    - **X.509 Version**
    - **Signature Algorithm**: thuật toán SHA256 để tạo ra chữ ký
    -  Khoảng **thời gian hiệu lực** của chứng chỉ: **X.509** sẽ bị thu hồi sau **Not Valid After**
      
![](https://images.viblo.asia/bc41e921-66fa-41ae-baee-4b1d3ae3355e.png)

- Tiếp, ta có các trường, **Public Key**, **Signature** (được ký bởi CA) và các thông tin liên quan như thuật toán sinh khoá, kích thước khoá,...

![](https://images.viblo.asia/f6f967a9-f65b-4162-9a57-a2df5c00741d.png)

Ngoài ra, đối với v3, còn có thêm phần mở rộng nhằm bổ sung thông tin mà CA đặt vào phục vụ một vài chức năng khác ví dụ như: 
- Trường **Subject Alternative Name** ràng buộc khoá công khai với nhiều định danh.
- Trường **Fingerprints** nhận diện tính duy nhất của chứng chỉ. <br> ...

# 4. Chuỗi Certificate
CA có 2 loại: **Root CAs** (RCA) và **Intermediate CAs** (ICA). Thông thường Certificate cần phân phối đến hàng trăm triệu user nên **RCA**  phân quyền cho các **ICA** làm việc này bằng cách cấp phát certificate, tạo ra một chuỗi "đáng tin". Bằng việc này, vừa giảm tải cho **RCA** vừa giảm thiểu tổn thương nếu **RCA** bị lỗi.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Chain_of_trust.svg/1024px-Chain_of_trust.svg.png)
- Ban đầu, Root CA phát hành cert cho **ICA** được ký bằng khoá bí mật và đảm bảo rằng các thông tin trong nó là hợp lệ. Nếu **RCA**  đáng tin thì **ICA** cũng nên đáng tin cậy.
- **ICA** ký các end-entity cert.
- Đây là một chuỗi "đáng tin" vì nếu khoá công khai của **RCA**  đáng tin thì có thể xác thực được chữ ký ở **ICA**. Và giờ **ICA** đáng tin, tương tự, chữ ký ở end-entity có thể được check.
- Tuy có thể xác thực được end-entity và **ICA**, nhưng do Root Cert được tự ký nên không thể xác thực được rằng RCA có đáng tin cậy hay không. Vì vậy, đây là công việc của con người.<br>

Đối với thực tế, cert sẽ được sử dụng theo chiều ngược lại:
- End-entity nắm giữ cần xac minh cert. Vậy ai đã phát hành và họ có đáng tin không ?
- Là 1 CA, vậy liệu họ có đáng tin ?
- Nếu có, done.
- Nếu không, vậy ai đã phát hành cert cho CA này và họ có đáng tin ?
- ....
- Tiếp tục như  vậy cho đến khi gặp 1 CA đáng tin hoặc cert là tự ký và bởi 1 CA không đáng tin (-> xác minh fail)

# 5. Vòng đời
![](https://images.viblo.asia/581250b6-a8e3-4596-a1a2-47fc184ea08f.png)

1. Một cặp khoá công khai/bí mật sẽ được sinh ra.
2. Phát hành chứng nhận bao gồm khoá công khai và chữ kỹ sinh ra từ khoá bí mật.
3. Chứng nhận được sử dụng trong mạng. Mỗi khi chứng chỉ được sử dụng để xác minh danh tính, trước tiên bên thứ 3 sẽ kiểm tra xem liệu nó có nằm trong CRL để chắc chắn chứng chỉ này vẫn còn hiệu lực.
4. Khoá bí mật bị tổn thương (bị lộ hoặc mất) -> chứng nhận bị thu hồi, và CRL sẽ thêm 1 tham chiếu đến nó.
5. Chứng nhận hết hạn -> Phát hành lại chứng nhận.
6. Cặp khoá công khai/bí mật hết hạn -> Chứng nhận hết hiệu lực

# 6. Use cases
Do **X.509** được coi là tiêu chuẩn nên là chứng chỉ được sử dụng phổ biến nhất trong:
- SSL/TSL và giao thức HTTPS.
- Gửi các email được ký và mã hoá qua giao thức S/MIME.
- Ký số trên mạng Internet, mạng permissoned blockchain, ...
- Quản trị các ID điện tử offline.
- Bầu cử.
- Supply chain.

# Tổng kết
**X.509 Certificate** cho phép 3rd Party đảm bảo danh tính của một thực thể là đáng tin để cấp quyền cho thực thể đó, được sử dụng rộng rãi trong các mạng permissioned. 
Trên đây mình đã giải thích cấu trúc, chức năng, cách thức sử dụng của **X.509 Certificate**. Cảm ơn các bạn theo dõi đến cuối ! <br>


# Tài liệu tham khảo
- [Stackexchange.com](https://security.stackexchange.com/questions/186068/x-509-certificate-chain-signatures-verification)
- [Ssl.com](https://www.ssl.com/faqs/what-is-an-x-509-certificate/)
- [Wikipedia](https://en.wikipedia.org/wiki/X.509)
- [Hyperledger Fabric documents](https://hyperledger-fabric.readthedocs.io/en/release-2.0/identity/identity.html)