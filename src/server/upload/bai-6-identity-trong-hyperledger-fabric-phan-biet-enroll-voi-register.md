## 1. Nhắc lại Identity trong Hyperledger Fabric.
Như chúng ta đã biết, mọi thứ trong Fabric Network đều có 1 identity, từ các thành phần của mạng trong như orderer, peers,... đến user như admin của Org đến client đều có 1 identity. Một identity là mộ X.509 digital certificate, nó dùng để xác định quyền truy cập vào các tài nguyên của một tác nhân.
Để một identity được xem là hợp lệ thì nó phải được phát hành bởi một "trusted authority", trong Fabric là Membership Service Provider. 
![](https://images.viblo.asia/68cb83d9-2a0a-460b-a869-1d98ac6edfcb.png)

Tưởng tượng nếu bạn đi vào một của siêu thị chỉ chấp nhận thanh toán bằng Visa hoặc Mastercard, nhưng bạn chỉ có thẻ tích điểm của CGV, không quan trong là thẻ đó có phải của bạn hay không, nó vẫn sẽ không được chấp nhận. PKIs  và MSPs  trong Fabric làm việc với nhau theo cách này, PKIs sẽ cung cấp một list các identies và MSPs sẽ cho biết cái nào trong số chúng là thành viên của một tổ chức nhất định đã tham gia vào network.

Trong Fabric, PKI chính là các Certificate Authorities (CA), CA sẽ phát hành các digital certifcate cho các thành phần, sau đó các thành phần này sẽ dùng nó trong các message trao đổi của mình với môi trường network. 

CA's Certificate Revocation List là một danh sách tham chiếu của các các certificate không còn hợp lệ. 

Digital certificate là một tài liệu chứa một bộ các thuộc tính liên quan đến chủ nhân của nó. 
Ví dụ, Mary Morris làm ở Manufacturing Division của  Mitchell Cars ở Detroit, Michigan  sẽ có thể sẽ có một digital certificate với một thuộc tính **SUBJECT** gồm **C=US**, **ST=Michigan** **L=detroit**, **O=Mitchell Cars**, **OU=Manufacturing** **CN=Mary Morris /UID=123456** như sau:
![](https://images.viblo.asia/41abf679-7235-4272-bf77-10a97d1c3c11.png)
Tất cả các thông tin trên đều được ghi lại bằng một thuật toán mã hóa ("secret writting")
## 2. Enroll và Register
Có bao giờ bạn thắc mắc rằng **enroll** và **register** khác nhau ở điểm nào chưa? Tại sao phải tách thành 2 bước mà không gom thành một bước luôn cho gọn ?

Nếu như bạn để ý, trong các project Hyperledger Fabric, sau khu đã dựng xong network và install, instantiate xong chaincode đầy đủ. Đến bước phát triển app, bạn sẽ phải thực hiện enrollAdmin và registerUser. 

Tại sao lạ là enrollAdmin và registerUser mà không là enrollUser và registerAdmin ?

Bạn hãy nhìn vào 2 đoạn code bên dưới 
```javascript
# enrollAdmin.js

// Enroll the admin user, and import the new identity into the wallet.
const enrollment = await ca.enroll({
    enrollmentID: 'admin',
    enrollmentSecret: 'adminpw'
});

const identity = await X509WalletMixin.createIdentity(
'ORG1MSP',
enrollment.certificate,
enrollment.key.toBytes()
);
 
await wallet.import(admin, identity);

console.log(`Successfully enrolled admin user admin and imported it into the wallet-org1`);
```

```javascript
# registerUser.js

//Register the user, enroll the user, and import the new identity into the wallet.
const secret = await ca.register(
    {
        affiliation: '',
        enrollmentID: 'user01',
        role: 'client',
        attrs: [{ name: 'username', value: 'user01', ecert: true }]
    },
    adminIdentity
);

const enrollment = await ca.enroll({
    enrollmentID: 'user01',
    enrollmentSecret: secret
});

const userIdentity = X509WalletMixin.createIdentity(
     'ORG1MSP',
      enrollment.certificate,
      enrollment.key.toBytes()
);

await wallet.import('user01', userIdentity);

console.log(`Successfully registered and enrolled user user01 and imported it into the wallet`);
```
Vậy có nghĩa là khi bạn đã dựng xong một network hoàn chỉnh, thì trên network lúc này đã có sẵn một **certificate** mặc định có  **enrollmentID:'admin'**, **enrollSecret:'adminpw'** cho bạn mà không cần phải **register** nữa, bạn chỉ cần **enroll**  cái **certificate** đó vể sau đó dùng function **X509WalletMixin.createIdentity()** để tạo một identity từ certififcate vừa lấy về và sau đó lưu vào wallet.

Còn đối với 1 user bình thường, bạn sẽ cần có 1 thêm một bước ở trên đầu là **register**, trong hàm này ngoài truyền các attributes mặc định, bạn có có thể định nghĩa thêm các attribute khác bằng ```attrs: [{ name: 'username', value: 'user01', ecert: true }]``` để bổ sung thêm các thuộc tính mà bạn muốn thêm vào cho certificate. Sau khi **register** xong CA sẽ trả về một **secret** cho user đó, bạn dùng **secret** này để **enroll** về cái certificate vừa được **register**, sau đó **createIdentity** tương tự admin.

Điều này gợi ý cho ta một điều nếu bạn có nhiều server khác nhau với mục đích nâng cao hiệu suất của dự án, bạn chỉ cần lưu lại enrollmentID và enrollmentSecret của từng user sau khi register xong, tất cả server hoàn toàn có thể enroll để có được một bản sao y bản chính identity của user đó.