### 1. AWS KMS là gì?
**KMS** là viết tắt của Key Management Service, đây là một service của AWS. Giúp ta dễ dàng tạo và kiểm soát khóa chính của khách hàng - customer master keys (**CMK**).<br>
Vậy CMK là gì? Nó là tài nguyên chính trong AWS KMS. Bạn có thể sử dụng CMK để mã hóa, giải mã và mã hóa lại dữ liệu. Nó cũng có thể tạo các khóa dữ liệu mà bạn có thể sử dụng bên ngoài AWS KMS. Thông thường, bạn sẽ sử dụng CMK đối xứng (**symmetric CMKs**), nhưng bạn có thể tạo và sử dụng CMK không đối xứng (**asymmetric CMKs**) để mã hóa (encryption) hoặc ký (signing).<br>

Trong phạm vi bài viết này mình sữ dụng CMK đối xứng để tạo cũng như mã hóa và giải mã các khóa dữ liệu (**data keys**). Data key là gì thì mình sẽ giải thích ở phía sau.
### 2. Envelope encryption
Khi bạn mã hóa dữ liệu của mình, dữ liệu của bạn sẽ được bảo vệ, nhưng bạn phải bảo vệ khóa mã hóa của mình. Một chiến lược là mã hóa nó. Mã hóa phong bì (**Envelope encryption**) là thực hiện mã hóa dữ liệu bản rõ (**plaintext**) bằng một khóa dữ liệu (**data key**), và sau đó mã hóa khóa dữ liệu dưới một khóa khác.<br>
Bạn thậm chí có thể mã hóa khóa mã hóa dữ liệu dưới một khóa mã hóa khác và mã hóa khóa mã hóa đó dưới một khóa mã hóa khác (Đọc hơi rối nhưng có thể hiểu nôm na là thực hiện mã hóa khóa nhiều lớp :D). Tuy nhiên, cuối cùng, một khóa phải vẫn ở dạng bản rõ để bạn có thể giải mã các khóa và dữ liệu của mình. Khóa mã hóa khóa bản rõ cấp cao nhất này được gọi là khóa chính (**master key**).<br><br>
![](https://images.viblo.asia/16b1a3bb-7519-4ee5-8de2-9b9093fdfe96.png)<br><br>
AWS KMS giúp bạn bảo vệ các khóa chính của mình bằng cách lưu trữ và quản lý chúng một cách an toàn. Các khóa chính được lưu trữ trong AWS KMS, được gọi là khóa chính của khách hàng - customer master keys (CMK). <br><br>
![](https://images.viblo.asia/95a0f068-1801-4ea9-9f3a-f674d599a5c6.png)<br><br>
Mặc dù CMK về nguyên lý nó là bản rõ nhưng không ai có thể nhìn thấy, trích xuất, tải về hoặc quản lý nó, thậm chí khi bạn tạo 1 CMK trên AWS KMS console thì những gì bạn nhìn thấy cũng chỉ là **keyID** (tức là định danh duy nhất cho CMK của bạn). Để sử dụng AWS KMS CMK, bạn phải gọi API AWS KMS.
### 3.Data keys
Ở trên mình có nhắc khá nhiều về data keys, vậy data keys là gi?
Data keys( khóa dữ liệu) là khóa mã hóa mà bạn có thể sử dụng để mã hóa dữ liệu, bao gồm một lượng lớn dữ liệu và các khóa mã hóa dữ liệu khác.

Bạn có thể sử dụng CMK đối xứng để tạo, mã hóa và giải mã khóa dữ liệu. Tuy nhiên, AWS KMS không lưu trữ, quản lý hoặc theo dõi khóa dữ liệu của bạn hoặc thực hiện các hoạt động mật mã với khóa dữ liệu. Bạn phải sử dụng và quản lý khóa dữ liệu bên ngoài AWS KMS.<br>
#### 3.1 Create a data key
Để tạo khóa dữ liệu, sữ dụng hoạt động **GenerateDataKey**. AWS KMS sử dụng CMK đối xứng mà bạn chỉ định để tạo khóa dữ liệu. Thao tác này trả về bản sao nguyên văn của khóa dữ liệu (**plaintext data key**) và bản sao của khóa dữ liệu được mã hóa theo CMK (**encrypted data key**). Hình ảnh sau đây cho thấy hoạt động này.<br><br>
![](https://images.viblo.asia/03792a89-38c0-44ef-ba8a-d5739e03f3ee.png)<br><br>
AWS KMS cũng hỗ trợ thao tác **GenerateDataKeyWithoutPlaintext**, thao tác này chỉ trả về khóa dữ liệu được mã hóa (**encrypted data key**). Khi bạn cần sử dụng khóa dữ liệu (**plaintext data key**), hãy yêu cầu AWS KMS giải mã nó (như mục 3.3 bên dưới).
#### 3.2 Encrypt data with a data key
AWS KMS không thể sử dụng khóa dữ liệu để mã hóa dữ liệu. Nhưng bạn có thể sử dụng khóa dữ liệu bên ngoài AWS KMS, điều đó có nghĩa bạn cần kết hợp khóa dữ liệu này với việc sử dụng **OpenSSL** hoặc thư viện mật mã như **AWS Encryption SDK** để mã hóa dữ liệu của bạn.<br>
Sau khi sử dụng khóa dữ liệu bản rõ để mã hóa dữ liệu, thì **ko nên lưu lại data key** mà hãy quên nó đi. Việc mình cần làm là lưu lại data đã được mã hóa (**ciphertext**) cùng khóa dữ liệu đã được mã hóa (**encrypted data key**) để sau này có thể giải mã.<br><br>
![](https://images.viblo.asia/34dc6e4e-8df5-4ad7-9649-64268b901282.png)<br><br>
#### 3.3 Decrypt data with a data key
Để giải mã dữ liệu của bạn, đầu tiên phải giải mã encrypted data key bằng hoạt động Decrypt của AWS KMS. AWS KMS sử dụng CMK của bạn để giải mã khóa dữ liệu (encrypted data key) và sau đó nó trả về khóa dữ liệu bản rõ (plaintext data key). Sử dụng khóa dữ liệu bản rõ để giải mã dữ liệu của bạn và sau đó xóa khóa dữ liệu bản rõ đi.

Sơ đồ sau đây cho thấy cách sử dụng thao tác Giải mã để giải mã khóa dữ liệu được mã hóa.<br><br>
![](https://images.viblo.asia/34a79e0e-8d77-4ea4-9486-e18c6250366d.png)
<br>

**Ngoài ra, AWS KMS còn cho phép ta encrypted một plaintext data key có sẵn, tức là ta tự tạo ra 1 plaintext data key để mã hóa dữ liệu, sau đó nhờ AWS KMS decrypted plaintext data key này thành encrypted data key.**

Trên đây là một ví dụ về ứng dụng của AWS KMS trong việc mã hóa và giãi mã dữ liệu, hy vọng có thể giúp mọi người hiểu rõ hoạt động của nó để có thể ứng dụng dự án của mình, cảm ơn mọi người đã đọc bài :) <br>

**Tài liệu tham khảo**: https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#master_keys