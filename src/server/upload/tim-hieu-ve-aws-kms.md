## 1. AWS KMS là gì?
KMS là viết tắt của Key Management Service. Đây là service dùng để create và quản lý key.

Ở KMS bạn có thể lựa chọn tạo symetric key (khóa đối xứng) hoặc asymetric key (khóa bất đối xứng) để làm CMK (Customer Master Key). Sau khi tạo key thì có thể thiết đặt key policy để control quyền access và sử dụng key. Bạn có thể sử dụng kết hợp với AWS CloudTrail để lưu lại log Ai đã sử dụng key khi nào.

Ngoài ra, bạn cũng có thể tự tạo key rồi import vào KMS để quản lý cũng được nhé. Nhưng mình chưa nghĩ ra trường hợp nào thì việc import key sẽ tốt hơn. Theo mình thấy service người ta đã support đầy đủ từ việc tạo khóa luôn rồi thì mình cứ dùng thôi. Dù sao thì dùng công nghệ của AWS cũng an tâm nữa.

AWS đảm bảo key của bạn được quản lý hoàn toàn bảo mật. Tức là ngay cả các kỹ sư của AWS cũng không thể biết được key của bạn. Đồng thời AWS luôn bảo đảm backup lại key để không bị mất key của bạn. 

## 2. AWS KMS thường được ứng dụng như thế nào?
KMS là service tạo và quản lý key nên nó được sử dụng trong các ứng dụng cần mã hóa và giải mã dữ liệu.

Nói một chút về symetric và asymetric key. Symetric là bạn gen ra 1 key vừa dùng để mã hóa và giãi mã dữ liệu. Asymetric key là pare key, bao gồm private key và public key. Public key dùng để mã hóa, private key dùng để giãi mã (nó giống với cơ chế bảo mật SSL).

Vậy việc mã hóa, giải mã dữ liêu sẽ được thực hiện như thế nào đối với KMS?

Tùy vào requirement mà cách ứng dụng sẽ khác nhau. Nhưng để hiểu hơn về cách dùng thì mình sẽ nêu ra 1 vài solution như sau:

### 2.1 Chỉ sử dụng KMS để encryption, decryption và quản lý key
Bạn sẽ sử dụng KMS SDK API và dùng CMK để encrypt, decryption data.
Về example thì bạn xem ở link này.

https://docs.aws.amazon.com/sdk-for-ruby/v3/developer-guide/kms-example-encrypt-data.html

Tuy nhiên, nhược điểm của cách này đó là store lưu trữ của KMS rất ít. Nên mỗi request truyền lên bị limit tối đa 4KB. Do đó, cách này không phù hợp nếu bạn muốn encrypt, decrypt data lớn nhé.
Ngoài ra, nó có một hạn chế nữa đó là data input phải ở dạng string. Vì thế, nó cũng không phù hợp lắm nếu data của bạn ở dạng nhiều field như 1 Object.

### 2.2 Sử dụng AWS KMS kết hợp với AWS Encryption SDK API
AWS Encryption SDK API là 1 API do AWS cung cấp để thực hiện mã hóa, giải mã data. Bạn có thể tham khảo thêm thông tin ở đây.

https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/introduction.html

Để giải quyết nhược điểm của cách 2.1 thì bạn có thể sử dụng phương pháp mã hóa phong bì (Envelope encryption). 
Đó là, sử dụng data key của SDK API để mã hóa dữ liệu của bạn. Sau đó data key của SDK API sẽ được mã hóa bằng KMS CMK. Kết quả SDK API sẽ return cho bạn formatted messsage.
Formatted message này sẽ bao gồm data đã mã hóa của bạn và data key đã mã hóa. Bạn sẽ lưu formatted message này vào DB. Khi cần giải mã thì bạn truyền formatted message này lên cho SDK API. SDK API sẽ dùng KMS CMK để giải mã data key, và lại dùng data key để giãi mã data của bạn và trả về cho bạn.

Về cơ chế envelope encryption thì bạn có thể đọc thêm ở link này.

https://docs.aws.amazon.com/encryption-sdk/latest/developer-guide/concepts.html#envelope-encryption

Như vậy, với cơ chế mã hóa phong bì thì KMS chỉ được sử dụng để mã hóa data key thôi. Nên sẽ không gặp các nhược điểm mình nêu ở trên nữa.

Tuy nhiên, cần lưu ý rằng để sử dụng KMS kết hợp với SDK API thì khi config SDK API bạn phải define KMS CMK làm provider master key hoặc keyring của SDK API. Việc define provider master key/kerying thì hiện tại chỉ support cho Java, JavaScript, C, Python. Theo mình thì đây là một nhược điểm của nó.

Đồng thời bạn cũng cần lưu ý rằng khi kết hợp KMS với Encryption SDK API thì chỉ có thể sử dụng symetric key làm KMS CMK thôi nhé.

À ngoài ra có một điểm nữa là mình vẫn chưa tìm hiểu được là liệu dùng SDK API thì có support việc truyền vào data ở dạng Object hay không hoặc nếu truyền vào nhiều string thì nó có mã hóa hết các string 1 lần rồi mới mã hóa data key hay không. Nếu nó cứ mã hóa 1 string thì phải call KMS 1 lần thì sẽ không tốt cho performance.

### 2.3 Sử dụng AWS KMS kết hợp với OpenSSL
Theo mình đây là cách có thể giải quyết được các nhược điểm của phương pháp 2.1 và 2.2.

Đây là phương pháp thay vì sử dụng SDK API của AWS thì chúng ta tự code API để mã hóa data. Sau đó lại call lên KMS để mã hóa key của mình.

Ưu điểm của phương pháp này đó là có thể khắc phục tất cả nhược điểm của 2 phương pháp nêu trên:
- Có thể mã hóa data khối lượng lớn
- Không bị giới hạn ngôn ngữ
- Data truyền vào thì có thể mã hóa hết 1 lượt rồi mới gọi lên KMS 
- Có thể sử dụng symetric hoặc asymertic key để làm KMS CMK

Tuy nhiên nhược điểm của nó đó là mình tự code cơ chế mã hóa, giãi mã nên nếu có bug trong thuật toán thì sẽ bị lộ data. Tuy nhiên, hiện nay có khá nhiều thư viện OpenSSL chất lượng rồi nên mình nghĩ nó cũng khó xảy ra và không phải là nhược điểm lớn.


## 3. Kết luận
Cả 3 cách mình nêu ở trên đều là mã hóa ở Server, nên nó có nhược điểm chung là :
- Data truyền từ client đến server là data plaintext 

Nếu đường truyền của bạn là SSL/TLS thì cũng an tâm phần nào. Tuy nhiên cần lưu ý vẫn có cách chặn request từ client để xem request nhé. Đây sẽ nhược điểm lớn tùy vào spec ứng dụng của bạn như thế nào.

- Người cầm server có thể xem được data của user

Thật ra vẫn có cách khắc phục nhược điểm này nhưng cực kỳ tốn kém. Đó là thay vì tạo 1 account cho server thì bạn phải tạo account cho mỗi user. 

- Nếu server bị hack thì lộ data của user

Tùy vào cách quản lý server của bạn mà tỷ lệ bị hack server sẽ khó hay dễ nhé (ví dụ cách quản lý account, cách đặt password chẳng hạn)

AWS KMS đã đạt chứng chỉ PCIDSS Level 1 rồi, nên nếu bạn ứng dụng tốt thì product của bạn cũng có thể đạt chuẩn bảo mật quốc tế này.

Đây là chuẩn bảo mật rất có giá trị, vì thế nếu đạt được nó thì những data mà ứng dụng của bạn có thể lưu trữ cũng như độ tin cậy của ứng dụng sẽ tăng lên rất nhiều.