# Mở đầu
Đối với một số bạn mới biết tới khái niệm SSL/TLS thì có thể thấy nó rất mơ hồ. Và có thể không biết nó có thật sự quan trọng hay không hay chỉ là thiên hạ đồn hay sếp yêu cầu thì phải dùng SSL.

![image.png](https://images.viblo.asia/b0ec1ca8-bffc-4972-ad1d-230129896dac.png)

Trong bài viết này mình sẽ giải thích vì sao cần có SSL và vai trò của nó quan trọng như thế nào thông qua một ví dụ hư cấu chút về câu chuyện của Romeo và Juliet như sau.
# Chuyện tình của Romeo và Juliet
"Romeo và Juliet" là một vở bi kịch của nhà văn William Shakespeare kể về mối tính giữa Romeo và Juliet. Chuyện tình của 2 người bị ngăn cấm vì hiềm khích dòng họ, lại càng bùng lên dữ dỗi khi Romeo giết chết người anh em họ Tybalt của gia đình nhà Juliet.

Hãy khoan bàn thêm về câu chuyện trên, vấn đề đặt ra ở đây là làm sao để Romeo gửi thư cho Juliet khi gia đình cô đã thuê hacker để đọc lén thư trao đổi giữa 2 người.

## Ngày đầu tiên
Sau khi trở về từ đêm dạ hội, nơi mà 2 người gặp nhau lần đầu và va phải tiếng sét ái tình. Romeo gửi thư cho Juliet. Romeo không hề biết hacker đã luôn lén đọc thư gửi cho Juliet và biết được chuyện của 2 người.

Như vậy việc gửi thư không có mã hóa như vậy hoàn toàn có thể bị nghe lén và thậm chí thay đổi nội dung trước khi tới được người nhận.

Hầu gái thân cận của Juliet cũng biết chuyện và nói với cô rằng gia đình đang thuê hack theo dõi và lén đọc thư của 2 người. Do đó cả 2 phải tìm cách khác để trao đổi với nhau.

## Ngày thứ 2
Romeo phát hiện vấn đề trên và quyết định sẽ mã hóa thư của mình bằng một mã khóa (key). Romeo sau khi viết thư đã mã hóa nó và gửi cho Juliet. Hacker vẫn tiếp tục lén đọc trộm thư nhưng lần này bức thư đã bị mã hóa và không có mã khóa để giải mã, do đó không thể đọc được nội dung bức thư.

Tuy nhiên khi Juliet nhận được thư thì nàng cũng không có mã khóa nên cũng không thể giải mã được bức thư để đọc nội dung.
![image.png](https://images.viblo.asia/9401da16-cc79-4700-bd65-e69e1329c088.png)

## Ngày thứ 3
Romeo lần này sau khi mã hóa thư của mình bằng mã khóa, thì gửi kèm thêm mã khóa (key) để Juliet có thể giải mã. Nhưng đương nhiên Hacker cũng sẽ xem được cả bức thư và mã khóa. Do đó họ dễ dàng giải mã được bức thư và đọc hết nội dung trao đổi của 2 người.
![image.png](https://images.viblo.asia/da398ffe-1b94-4e69-bbd3-e24f39a368a7.png)


***Cách mã hóa mà Romeo sử dụng bên trên gọi là mã hóa đối xứng (Symmetric Encryption). Và rõ ràng nó không giải quyết được bài toán bảo mật thông tin nêu trên.***

Và đó là lúc khái niệm **Mã khóa bất đối xứng** (Asymmetric Encryption) ra đời!
# Mã hóa bất đối xứng
Thay vì dùng một khóa duy nhất để mã hóa và giải mã nội dung, mã hóa bất đối xứng sử dụng một cặp khóa gọi là khóa riêng (**Private Key**) và khóa công khai (**Public Key**). 

Để dễ hiểu và dễ hình dung, ta coi Private Key là chìa khóa, còn Public Key là Ổ khóa. Chỉ có Private Key mới mở được ổ khóa Public Key.

![image.png](https://images.viblo.asia/88dd3e18-c361-4ab5-8a69-8de5566f124f.png)

Ý tưởng ở đây là bạn sẽ dùng ổ khóa (Public Key) để mã hóa dữ liệu, và dữ liệu đó chỉ có thể được giải mã bằng chìa khóa của bạn (Private Key). Ổ khóa (Public Key) có thể được dùng công khai nhưng chìa khóa (Private Key) sẽ luôn cần được bảo mật không được để lộ ra ngoài.

## Ví dụ về mã hóa bất đối xứng trong kết nối SSH bằng Key

Bạn tạo ra một SSH Key bằng lệnh ```ssh-keygen``` để tạo ra cặp key với khóa riêng (**Private Key**) là ```id_rsa``` và khóa công khai (**Public Key** hay **Public Lock**) là ```id_rsa.pub```.
![image.png](https://images.viblo.asia/0ed6c92c-14cc-45fe-a844-6e6e2b6242b6.png)

Lúc này bạn sẽ ngắt mọi kết nối tới server ngoại trừ một cổng vào được khóa bởi khóa công khai của bạn (Public Key hay Public Lock). Khóa này chỉ có khóa riêng của bạn có thể mở được.

Việc bạn tạo một cổng vào được khóa bởi khóa công khai, chính việc tạo một bản ghi chưa khóa công khai (Public Key) vào file ```~/.ssh/authorized_keys``` trên server.
![image.png](https://images.viblo.asia/dbd3288e-895b-4b9e-8e9b-059897d57aa0.png)

Như vậy bạn thấy khóa công khai của bạn (Public Lock) ai cũng có thể thấy được nhưng không ai mở được vì không có chìa khóa của nó. 

Khi bạn kết nối SSH với server bạn cần chỉ ra đường dẫn của file Private Key trong câu lệnh ssh: ```ssh -i id_rsa user1@server1``` để unlock:
![image.png](https://images.viblo.asia/07d18bd1-2706-4ba9-9c24-90339ff39b6f.png)

***Đây là một ví dụ điển hình về mã hóa bất đối xứng. Ta sẽ tiếp tục câu chuyện của Romeo và Juliet nhé!***
## Quay lại bài toán gửi thư của Romeo và Juliet
Phương án gửi kèm khóa với bức thư của Romeo quá rủi ro vì Hacker có thể xem được cả khóa và thư thì có thể giải mã bức thư trong phút mốt!

**Bây giờ Romeo đã học được kỹ thuật xịn xò hơn, dùng mã hóa bất đối xứng!!!!**

Romeo và Juliet cùng tạo ra bộ chìa và ổ khóa của riêng mình:
![image.png](https://images.viblo.asia/69917f54-7d3f-4310-8bf1-6e28fc6b1a94.png)

Khi Romeo muốn gửi thư cho Juliet thì cần thông báo để Juliet gửi cho Romeo ổ khóa của mình (Juliet Public Lock). Hacker vẫn như thường lệ lấy được bản sao của ổ khóa này.
![image.png](https://images.viblo.asia/46e35815-56a9-43d6-ba94-1c0179f6f800.png)

Romeo nhận được ổ khóa của Juliet thì gói chìa khóa của mình (Romeo Private Key) vào hộp và khóa lại bằng ổ khóa của Juliet (Juliet Public Lock). ***Bản chất là mã hóa Romeo Private Key bằng Juliet Public Key***.

Lúc này tên hacker cũng sẽ thấy được chiếc hộp nhưng không có cách nào để mở vì không có chìa khóa của chiếc khóa này (chỉ có Juliet là người có chìa mổ ổ khóa Juliet Public Lock). **Bản chất là không có Juliet Private Key để giải mã nội dung được mã hóa bằng Juliet Public Key!**
![image.png](https://images.viblo.asia/0abe6096-f906-4a1b-a8c8-cb7e5547ab9a.png)

Sau khi nhận được chiếc hộp, Juliet dùng khóa riêng của mình để mở khóa và lấy được chìa khóa của Romeo.

***Như vậy Romeo đã gửi được Private Key của mình tới Juliet mà không hề bị sao chép bởi tên hacker.***

Romeo tiếp viết thư và khóa nó lại bằng khóa công khai của Romeo (Romeo Public Lock) và gửi hộp thư cho Juliet. Tên hacker có thể lấy được toàn bộ hộp thư nhưng không thể mở được vì không có khóa của Romeo. Còn Juliet từ trước đó đã nhận được khóa của Romeo do đó có thể mở hộp và đọc thư tình của Romeo.
![image.png](https://images.viblo.asia/780e57e3-f187-479f-a437-41bc4e954d91.png)

Tuyệt vời! Có học có khác, Romeo áp dụng mã hóa bất đồng bộ đã tìm được cách gửi thư cho người yêu mà không sợ bị đọc trộm nữa!!

***Nhưng câu truyện chưa dừng ở đây :)***

## Hacker cũng đi tầm sư học đạo
Không chấp nhận được khi nhìn thấy Romeo và Juliet tình tứ gửi thư qua lại cho nhau, tên hacker lên mạng tìm hiểu và tìm dc chiêu mới khá là cao thâm.

Hacker cho dựng một hộp thư gần với hộp thư của Juliet và ngụy trang mọi thứ giống hệt của Juliet. Hắn cũng tạo luôn một bộ khóa và chìa giả mạo (Hacker Private Key và Hacker Public Lock) giống hệt bộ ổ chìa và ổ khóa của Juliet.
![image.png](https://images.viblo.asia/16c6a410-5957-47b5-aba2-6cb53beb6c26.png)

Romeo vẫn chưa hề hay biết gì, vẫn thông báo cho Juliet gửi khóa công khai cho mình (Juliet Public Lock). Nhưng lúc này Romeo thực tế đang trao đổi với tên Hacker chứ không phải Juliet. Hacker vui mừng biết cá đã cắn câu, hắn gửi khóa công khai của hắn (Hacker Public Lock) cho Romeo.
![image.png](https://images.viblo.asia/b264d610-ee98-41cd-9e03-585c5fa79b97.png)

Romeo ngây thơ nghĩ rằng đã nhận được ổ khóa của Juliet rồi nên yên tâm gói khóa riêng của mình (Romeo Private Key) và hộp và khóa lại bằng ổ khóa vừa nhận được, thực chất là ổ khóa của Hacker (Hacker Public Lock) và gửi đi:
![image.png](https://images.viblo.asia/bca059e0-ccb6-4e15-9d6f-449820e32726.png)

Tên Hacker dễ dàng mở được hộp thư được khóa bởi khóa công khai của chính hắn và lấy được chìa khóa riêng của Romeo (Romeo Private Key).

Romeo tiếp tục viết thư cho Juliet và khóa lại trong hộp bằng ổ khóa của mình (Romeo Public Lock) và gửi đi.
![image.png](https://images.viblo.asia/5d83f9a1-2cc8-4283-a867-feb34bd743c8.png)

Tên Hacker nhận được hộp thư được khóa bởi khóa của Romeo (Romeo Public Lock) và hắn thì đã có được chìa khóa của Romeo từ trước đó rồi. Vậy là hắn dễ dàng mở khóa và đọc được nội dung bức thư!
![image.png](https://images.viblo.asia/d9eaa32e-d6a4-434f-8023-5d52c3937903.png)


***Câu chuyện tới đây thì nghe có vẻ khó cho Romeo quá, làm sao để phát hiện được việc hộp thư của Hacker kia là giả mạo khi mọi thứ đều có vẻ giống hệt??***

# Sử dụng Certificate trong trao đổi thông tin
Trong ví dụ trên, Romeo đã nhận được Public Lock của Hacker thay vì Public Lock của Juliet nhưng vì chủ quan không kiểm tra kỹ nên không hề hay biết. 

Thực chất việc nhận Romeo được Public Lock của Juliet không phải chỉ là nhận ổ khóa có tên Juliet, mà là kèm một chứng thư (certificate) xác nhận ổ khóa đó đúng là của Juliet. Và chứng thư đó phải có chữ ký xác nhận của đơn vị có uy tín.

Tên hacker đã làm giả một chứng thư (certificate) với mọi thông tin đúng như của Juliet, chỉ khác một điều duy nhất. Đó là chứng thư này do hắn tự ký (Self Sign) chứ không phải đơn vị quản lý chứng thư (Certificate Authority) uy tín nào cả.

![image.png](https://images.viblo.asia/44fe7076-e86a-46f4-8b3c-cc49424e2a57.png)

Khi nhìn vào Chứng tư tự ký (Self-Sign Certificate) thì người ta sẽ dễ dàng phát hiện đó không phải là một chứng thư an toàn, và không hề đáng tin cậy.

Quay lại bài toán thực tế, khi bạn vào các trang web sử dụng fake certificate như thế này thì trình duyệt sẽ tự phát hiện và cảnh báo cho bạn. 

***Vậy làm sao để tạo ra một Certificate mà trình duyệt có thể tin cậy được?***

Đó là lúc khái niệm **Certificate Authority** (CA) xuất hiện để giải quyết vấn đề.

## Certificate Authority
CA là các tổ chức lớn và nổi tiếng có thể xác minh và ký xác nhận chứng thư cho bạn. Một số nhà cung cấp dịch vụ CA lớn và phổ biến hiện nay có thể kể đến:
- Symantec
- GlobalSign
- Digicert

## Thủ tục xin ký xác nhận chứng thư
Bạn tạo một yêu cầu ký xác nhận chứng thư (Certificate Signing Request) sử dụng Private Key đã tạo trước đó và Domain Name của web mà bạn muốn tạo chứng thư. 

**Cách tạo private key:**
```
openssl genrsa -out my-website.key 2048
```
Kết quả thu được file Private Key `my-website.key`

**Cách tạo CSR (Certificae Signing Request):**
```
openssl req -new -key my-website.key -out my-website.csr -subj "/C=VN/ST=HN/O=myorg/CN=my-website.com/"
```
Kết quả ta có file Prive Key `my-website.key` và file CSR `my-website.csr`. 

Bạn cần gửi file `my-website.csr` cho CA để ký chứng thư. Đơn vị CA sẽ verify thông tin của bạn và khi hoàn thành kiểm tra thông tin thì thực hiện ký xác nhận cho chứng thư và gửi lại cho bạn. 

Lúc này bạn đã có một Chứng thư (**Certificate**) được xác nhận bởi một **CA** và được trình duyệt tin cậy đó đúng là website của bạn. 

Nếu Hacker cũng cố thử thực hiện việc xin ký xác nhận này thì sẽ failed vì không xác thực được thông tin và yêu cầu đó sẽ bị từ chối. Và do đó website giả mạo của Hacker sẽ không có Certificate có hiệu lực. 


## Làm sao để trình duyệt biết được thông tin CA nào là đáng tin cậy
Ví dụ chúng ta xin ký xác nhận bởi GlobalSign, làm sao để trình duyệt biết được GlobalSign là một CA hợp lệ? 

Và làm sao để trình duyệt biết được rằng chứng thư nó nhận được là của GlobalSign ký chứ không phải một đơn vị CA fake nào nói đó là GlobalSign?

Bản chất các CA cũng có một cặp Public Key / Private Key của nó. Các Public Key của các CA được gán sẵn trong các trình duyệt. Do đó trình duyệt có thể xác minh được các Chứng tư được ký bởi CA đó có hợp lệ hay không.

## Tiếp tục quay lại việc gửi thư của Romeo
Việc gia đình Juliet thuê hacker đã được hầu gái của Juliet phát hiện và báo cho cả 2 người. Romeo đã phát hiện ra rằng anh đã bị lừa gửi thư tới địa chỉ fake với thông tin giả mạo. Do đó Romeo nhận được khóa công khai từ phía Juliet thì anh cần verify lại thông tin certificate xem có đúng của Juliet hay không thì mới tiếp tục việc gửi khóa và gửi thư của mình. Luồng gửi nhận sẽ thực hiện như sau:
![image.png](https://images.viblo.asia/6d6230d2-311e-4567-9bfa-70827746d3bf.png)

Như vậy sử dụng SSL/TLS trong việc gửi nhận thông tin giữa client/server là rất quan trọng. Nó giúp việc truyền dữ liệu được an toàn hơn, chống nghe lén và giả mạo. Hầu hết các trang web bây giờ đều sử dụng HTTPS để hỗ trợ SSL/TLS, đặc biệt là các trang của các ngân hàng hay tổ chức lớn.

Một điều quan trọng nữa được nhắc đến ở đây là Certificate, nó cũng dc sử dụng trong quá trình cài đặt Kubernetes. Do vậy hiểu rõ cách thức hoạt động của certificate là rất cần thiết cho việc tìm hiểu về Kubernetes Certificate.