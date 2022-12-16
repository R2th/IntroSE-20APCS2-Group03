## 1. Mở đầu
<hr>

Trong công việc hằng ngày của mỗi lập trình viên, chắc hẳn các bạn cũng đã được nghe được biết về thứ có tên là `Mã hóa` hoặc `Hàm băm`. Những khái niệm hay "chức năng" này thường xuyên xuất hiện trong công việc của chúng ta nhưng không phải ai cũng hiểu rõ về nó hay về ứng dụng của nó như thế nào. Bài viết này của mình sẽ giới thiệu lại cho các bạn về hai khái niệm trên cũng như nó được áp dụng trong thực tế như nào.

## 2. Mã hóa là gì ?
<hr>

Bạn có thể hiểu đơn giản mã hóa là phương pháp biến đổi một chuỗi **A** thành một chuỗi **B** mới dựa trên các phép toán học. Ví dụ:

![](https://images.viblo.asia/31a025a7-ce52-45ef-bf3e-4a5ade7000e5.png)

Như bạn thấy ảnh trên sẽ gồm 4 thành phần:
- Chuỗi đầu vào là `hello`
- Chuỗi mới khá là loằng ngoằng `rSvYHFgXSY4G3s4oKFc/UQ==` sau khi đi qua `HÀM MÃ HÓA`
- `HÀM MÃ HÓA` ở đây đơn giản là áp dụng một thuật toán mã hóa như `AES`, `DES`, `Twofish`, `Blowfish`, ... . Vì bài này mình chỉ mang tính chất giới thiệu nên mình sẽ không đi sâu vào bất cứ thuật toán nào cả còn nếu muốn tìm hiểu bạn có thể tìm kiếm trên mạng có rất nhiều bài viết liên quan.
- Cuối cùng là chuỗi `-the-secret-key-` được gọi là **Khóa mã hóa** dùng để mã hóa. **Khóa mã hóa** này được dùng để kết hợp với `HÀM MÃ HÓA` để biến chuỗi ban đầu thành chuỗi mới như trong ảnh ở trên.

Vậy mã hóa là quá trình như trên vậy nếu muốn thu được lại chuỗi `hello` ban đầu từ cái chuỗi loằng ngoằng kia thì phải làm như thế nào ?. Câu trả lời là ta cũng sẽ sử dụng một `HÀM GIẢI MÃ` kết hợp với một **Khóa giải mã** tương tự như quá trình trong ví dụ ở trên với chuỗi ban đầu là chuỗi loằng ngoằng của chúng ta còn kết quả thu được là chuỗi `hello`. Nhưng tùy vào loại thuật toán mã hóa mà ta sẽ có một cặp **Khóa mã hóa** và **Khóa giải mã** khác nhau.

## 3. Các loại thuật toán mã hóa
<hr>


### a. Mã hóa khóa bí mật

- Đối với mã hóa khóa bí mật thì **Khóa mã hóa** và **Khóa giải mã** là giống nhau. Nghĩa là với ví dụ trên ta sẽ sử dụng chuỗi `-the-secret-key-` vừa để kết hợp với `HÀM MÃ HÓA` để thu được chuỗi mới và cũng đồng thời dùng nó kết hợp với `HÀM GIẢI MÃ` để thu được lại chuỗi `hello` ban đầu. Và đúng như tên gọi của nó khi khóa này phải được giữ bí mật và không được chia sẻ công khai với người khác trừ nhưng người mà bạn muốn.
- Đối với mã hóa khóa bí mật thì ta có một số thuật toán như `AES`, `DES`, `Blowfish`, `Twofish`, ... bạn có thể tìm thấy rất nhiều các thuật toán khác trên mạng

![](https://images.viblo.asia/5107cf09-eb2e-4d64-b9da-7f7ad4584fa6.png)

### b. Mã hóa khóa công khai

- Khác với phương pháp trên thì ở phương pháp này **Khóa mã hóa** và **Khóa giải mã** là khác nhau. Nghĩa là bạn có thể dùng **Khóa mã hóa** kết hợp với `HÀM MÃ HÓA` để thu được chuỗi loằng ngoằng. Còn với trường hợp ngược lại là thu được chuỗi ban đầu `hello` từ chuỗi loằng ngoằng thì ta sẽ dùng một khóa **khác hoàn toàn** và đem kết hợp với `HÀM GIẢI MÃ`.
- Điều đặc biệt là hai khóa này thường sẽ đi với nhau thành một cặp chứ bạn không thể chọn bất kì được và 2 khóa này thường được gọi là **Khóa công khai (public-key)** và **Khóa bí mật (private-key)**. Đồng thời hai khóa nói trên có thể đổi vị trí cho nhau trong việc mã hóa và giải mã. Hay nói cách khác bạn có thể dùng **Public key** để mã hóa và **Private key** để giải mã hay ngược lại đều được.
- Tương tự thì cũng có rất nhiều các thuật toán mã hóa thuộc loại này như `RSA`, `ElGamal`, `Diffie-Hellman`.

![](https://images.viblo.asia/4e17a278-d87c-4f18-ba19-52e079ad08c9.png)

![](https://images.viblo.asia/01d57697-42a1-4703-ad7e-35255d66d723.png)

### c. Mã hóa một chiều

- Hay chúng ta thường gọi là **Hash** hay **Hàm  băm** là một phương pháp trong mật mã học mà chúng ta có thể nhầm lẫn với 2 loại mã hóa nói trên. Các thuật toán liên quan đến hàm băm rất quen thuộc với mỗi lập trình viên chúng ta như `MD5`, `SHA`, ...
- Điểm khác biệt giữa hàm băm với 2 loại mã hóa trên là nó không có **khóa** nghĩa là bạn chi cần cho chuỗi đầu vào bất kì trực tiếp qua `HĂM BĂM` sẽ thu được một chuỗi mới mà không cần dùng đến **Khóa nào cả** và chúng ta không thể dịch ngược trực tiếp từ chuỗi loằng ngoằng về lại bản gốc ban đầu

![](https://images.viblo.asia/72fd8216-ea09-45b2-805d-32c191f44db3.png)

Hi vọng với một chút giải thích cơ bản của mình ở trên thì các bạn có thể nắm được cơ bản về các kiểu thuật toán mã hóa cũng như khác nhau giữa chúng và có cái nhìn tổng quan về cách chúng hoạt động ra sao. Còn nếu bạn vẫn chưa hiểu thì sau đây phần ứng dụng mình sẽ giải thích thêm về chúng.

## 4. Ứng dụng
<hr>

Khi truyền thông tin đi từ người A đến người B có thể xảy ra trường hợp thông tin đó bị người C ở giữa xem trộm, chính vì thế sự ra đởi của mã hóa sẽ giúp chúng ta đảm bảo một số yếu tố sau:
- Tính bí mật: thông tin gốc chỉ có thể xem bởi người có quyền (ở đây là người có khóa giải mã và hàm giải mã)
- Tính toàn vẹn: đảm bảo tính toàn vẹn đối với thông tin được truyền đi (không bị sửa, xóa)
- Tính xác thực: đảm bảo người mà bạn truyền tin đến đúng với người mà bạn mong muốn

Để dễ hiểu nhất cho bạn thì chúng ta sẽ đi từ ví dụ về ứng dụng cơ bản nhất với mỗi loại phương pháp mã hóa trên

### a. Mã hóa một chiều

- Nếu bạn từng làm chức năng đăng nhập thì chắc hẳn bạn cũng biết đến việc **hash** hay **băm** mật khẩu của người dùng trước khi lưu vào database. Cách làm này nhằm đảm bảo mật khẩu của người dùng trong trường hợp chẳng may database bị lộ thì tin tặc cũng không biết được mật khẩu chính xác của người dùng để thực hiện đăng nhập. Ví dụ nếu chúng ta sử dụng thuật toán băm `MD5` thì với mật khẩu người dùng là `random password` chúng ta sẽ thu được chuỗi là `2c056b7275e0a47e179746779886b684` và lưu nó trong database. Vì hàm băm là một chiều cho nên lần sau khi người dùng đăng nhập ta chỉ cần đem băm mật khẩu mà người dùng cung cấp và so sánh nó với chuỗi băm mà chúng ta lưu trong database. Ngoài ra để tăng tính an toàn cho mật khẩu ta cũng có thể đem mật khẩu của người dùng kết hợp với một chuỗi tùy chọn sau đó mới đem băm và lưu vào database
- Ngoài ứng dụng trên ra nếu bạn hay download file hoặc tài liệu trên mạng sẽ thấy có rất nhiều trang khi ta download thì file mà chúng ta download sẽ đi kèm một đoạn mã gọi là `checksum` như sau:

![](https://images.viblo.asia/e1d77997-7197-4697-8932-0b5aeffe6301.png)

Như bạn thấy thì ngoài các thông tin liên quan đến file mà chúng ta download thì ở cuối có một cột là `sha256sum`. Đây là kết quả của của việc băm file đó bằng thuật toán `SHA-256`. Sau khi chúng ta tải file về thì thông thường trình download của chúng ta sẽ tự động kiểm tra bằng cách đem file nhận được đem đi băm và so sánh với mã nói trên. Nếu mã giống nhau file hợp lệ và không bị chỉnh sửa. Còn nếu nó khác nhau thì có nghĩa là bạn đã bị thay thế file trên đường truyền bởi virus cũng nên :D :D :D. 

### b. Mã hóa bất đối xứng

- Nếu bạn đã từng sử dụng một remote Git server như Github, Gitlab hay Bitbbucket hoặc một server Git do công ty bạn tự dựng thì chắc hẳn bạn đã từng gặp phải trường hợp cần nhập username và password đối vỡi mỗi lần muốn push code hay pull code từ server đó về. Tuy nhiên để tránh phải nhập username và password mỗi lần như vậy thì thông thường ta sẽ thêm `RSA public key` của mình vào server đó. Cặp **public-private key** này thường được chúng ta sinh ra trên máy tính cá nhân với 2 file lần lượt là :
    - **id_rsa**: chứa private key và chúng ta cần bảo vệ private key này không cho ai nó lộ ra ngoài
    - **id_rsa.pub**: chưa public key và đây là key mà chúng ta sẽ thêm vào server git

Sau này mỗi khi chúng ta muốn tương tác với server thì trước hết sẽ cần phải tạo một kết nối đến nó giống như khi chúng ta sử dụng username và password. Tuy nhiên khi bạn đã có cặp **private-public key** và **public key** đã được thêm trên server thì khi chúng ta mới tạo kết nối sẽ diễn ra quá trình xác thực căn bản như sau (ở đây mình muốn giải thích cho các bạn về việc ứng dụng mã hóa `RSA` trong SSH nên sẽ chỉ nói về phần này):
- Đầu tiền khi tạo kết nối ta sẽ gửi kèm với định danh của chúng ta là **public key**
- Server sẽ kiểm tra danh sách các **public key** mà nó có và tất nhiên vì chúng ta đã thêm **public key** này từ trước đó nên server sẽ tìm thấy. Server sẽ dùng **public key** mà chúng ta cung cấp này để mã hóa một `challenge` hoặc các bạn có thể hiểu đơn giản là một chuỗi giữ liệu nào đó ví dụ `abcdef`  và gửi lại cho client
- Ở client vì chuỗi `abcdef` nói trên được mã hóa bằng thuật toán bất đối xứng `RSA` và **public key** mà chúng ta đăng kí với server nên tất nhiên bằng cách sử dụng **private key** trên máy chúng ta để giải mã sẽ thua được chuỗi `abcdef` đó. Sau khi giải mã ta sẽ gửi lại chuỗi cho Server và lúc này Server có thể xác thực cho yêu cầu kết nối của chúng ta. Ở đây vì cặp **private-public key** này là do chính ta sinh ra và cho nên nếu bất cứ giữ liệu nào được mã hóa bằng **public key** thì chỉ có thể giải mã bằng **private key** tương ứng.

![](https://images.viblo.asia/4572f3ec-3f73-4ac6-9ee0-3ae7db6ec557.png)

### c. Mã hóa đối xứng

- Có lẽ một trong những ứng dụng quen thuộc nhất của mã hóa đối xứng mà chúng ta ai cũng đang sử dụng đó là `HTTPs` tuy nhiên mình cũng sẽ không đi sâu vào cách mà `HTTPs` hoạt động mà chỉ vào phần ứng dụng mã hóa bất đối xứng. Ở đây khi chúng ta sử dụng `HTTP` thông thường thì giữ liệu mà chúng ta trao đổi với WebServer sẽ dưới dạng plain text như sau:

![](https://images.viblo.asia/039a6177-4c4e-40c3-8a8b-fe46c169b26c.png)

Còn nếu sử dụng `HTTPs` thì bạn có thể hình dung là giữa máy tính của bạn và WebServer đang sử dụng chung một thuật toán mã hóa đối xứng và một khóa bí mật chia sẻ giữa máy tính của bạn và WebServer. Khóa bí mật này sẽ chỉ tồn tại chi trong phiên làm việc của bạn. Sau khi đã thống nhất được thuật toán sử dụng và khóa bí mật dùng chung thì toàn bộ giữ liệu được gửi từ máy chúng ta lên WebServer và ngược lại sẽ được mã hóa toàn bộ (*việc thỏa thuận này có gồm cả mã hóa bất đối xứng nhưng mình sẽ không nói đến, nếu muốn bạn có thể tìm hiểu kĩ hơn về `HTTPs` trên mạng*):

![](https://images.viblo.asia/3c2e916a-430a-4f3e-bce1-f71321b2c5e4.png)

Việc mã hóa này sẽ đảm bảo thông tin trao đổi giữa chúng ta và WebServer sẽ không thể bị ai đó đứng giữa xem trộm.

## 5. Kết bài
<hr>

Mong rằng qua bài viết của mình, bạn có thể có cái nhìn rõ hơn về ứng dụng của mật mã học trong cuộc sống cũng như hiểu hơn về cách mà nó hoạt động. Cám ơn bạn đã đọc bài !!!