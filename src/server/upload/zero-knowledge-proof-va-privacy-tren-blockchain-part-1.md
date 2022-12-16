# Giới thiệu
![](https://images.viblo.asia/d1aae0a7-2860-4f34-9e28-11f9aa31eec4.jpg)

(Image source: ico-check.com)

*Sợ anh biết lại sợ anh không biết*

*Muốn anh biết lại muốn anh không biết*

*Điều buồn nhất là*

*Là anh biết lại làm như không biết*

["Điều buồn nhất" - Kai Đinh](https://www.nhaccuatui.com/bai-hat/dieu-buon-nhat-kai-dinh.b5SY8h3VxhLI.html)


Vâng, đây quả thực là những lời ca chất chứa đầy tâm trạng rối bời của một người đang yêu đơn phương, muốn đối phương biết được tình cảm của mình nhưng lại sợ khi lộ ra rồi thì tất cả sẽ tan thành mây khói :sweat_smile:. Mới nghe thì thật là mâu thuẫn biết bao nhưng trong thực tế quả thực là chúng ta có thể gặp những trường hợp này: Chúng ta cần chứng minh chúng ta biết về một kiến thức (bí mật) nào đó nhưng lại không muốn người ta biết cụ thể nó là như thế nào (đau đầu nhỉ :joy:). Đơn cử, việc demo sản phẩm chính là một hình thức như vậy nhưng phần nào việc demo cũng đã để lộ ra khá nhiều thông tin rồi.

Trong bài blog này, mình xin phép tổng hợp những kiến thức mà mình tìm hiểu được về Zero Knowledge Proof (ZKP) và zkSNARKs, một protocol (?) cho phép chúng ta làm được điều gần như mâu thuẫn ở trên cùng với hiện trạng kết hợp của công nghệ này trên nền tảng Blockchain. Để hiểu rõ được đến ngọn nguồn kẽ tóc thì cần phải có kiến thức toán khá vững, một điều khá khó với một đứa ngu toán như mình nên những phần cao siêu quá, mình sẽ bỏ qua, bạn có thể đọc thêm ở các tài liệu tham khảo. Nếu có gì sai mong được mọi người chỉ bảo. Ok, let's go.


# Cơ bản về Proof System

Trong thực tế chúng ta đã bắt gặp rất nhiều Proof System (tạm dịch: hệ thống bằng chứng): **Verifier** (người kiểm tra) với nhiệm vụ là kiểm tra xem **Prover** (người chứng minh) có hiểu biết về một **proof** (bằng chứng) hoặc thông tin, kiến thức nào đó không. Sau khi đã xác thực được việc này thì sẽ cho phép Prover được truy cập vào những tài nguyên của hệ thống với những quyền hạn khác nhau. Ví dụ:

- Khi đăng nhập vào website/app, người dùng cần cung cấp username/password để chứng minh là họ biết thông tin đăng nhập account đó (tuy nhiên không nhất thiết đảm bảo là người đó là chủ sở hữu)
- Khi bạn ra cây ATM rút tiền cũng tương tự, bạn cần điền vào số tài khoản và mã PIN mới có thể thực hiện được thao tác trên tài khoản đó

Trong những nghiên cứu trước đây người ta luôn giả sử rằng Prover là người xấu, luôn tìm cách đánh lừa người kiểm tra nhằm by-pass hệ thống (ví dụ bằng cách hacking, SQLi, vân vân). Thế nhưng ngược lại, Verifier là người xấu thì sao ?. Trong trường hợp đăng nhập hệ thống, về cơ bản người dùng sẽ đưa thông tin này lên server, server sẽ hash password và kiểm tra với hash đã lưu trong server, nếu trùng nhau thì OK. Thế nhưng có những nguy cơ tiềm ẩn trong quá trình xác thực như sau:
- Trong quá trình gửi password lên, password bị lộ do môi trường truyền thông tin không an toàn
- Không có gì đảm bảo là server sẽ thực hiện hash password rồi mới lưu (hoặc lưu luôn dưới dạng plain-text :scream:)
- Không có gì đảm bảo là những dữ liệu đó sẽ được an toàn, không bị lộ (thực tế đã chứng minh: https://en.wikipedia.org/wiki/List_of_data_breaches) một cách vô ý hoặc cố ý

Với những tồn tại trên, việc cần có một giao thức kiểm tra mà phía Verifier không biết gì về những kiến thức mà phía Prover đang nắm giữ là cần thiết. Chính xác hơn, từ những bằng chứng mà người chứng minh đưa ra, người kiểm tra không có cách nào lần ra được kiến thức nguồn (do đó mới có tên gọi **Zero Knoledge Proof (ZKP)** - bằng chứng không có thông tin).

Để có thể hoạt động được ZKP cần thoả mãn những tính chất sau:

- **Completeness** (tính trọn vẹn): Nếu mệnh đề là đúng thì một người kiểm tra trung thực sẽ bị thuyết phục bởi một người chứng minh trung thực rằng mệnh đề đó là đúng
- **Soundness** (tính đúng đắn): Nếu người chứng minh là không trung thực thì họ không thể thuyết phục được người kiểm tra rằng mệnh đề đúng bằng cách dối trá
- **Zero-Knowledge** (tính không có thông tin): Nếu mệnh đề là đúng thì người kiểm tra chỉ biết là nó đúng và không thể biết được chính xác mệnh đề đó là gì

# Vài ví dụ về ZKP

 Chúng ta cùng xem xét một vài ví dụ đơn giản để hiểu rõ hơn về ZKP trong thực tế:
 
 ## Hang của Alibaba
 
 ![](https://images.viblo.asia/e9220960-f39d-47cb-89d8-129d30e94fed.png)
 
> Image Source: Scott Twombly (YouTube channel)
 
 Đây là một cái hang hình tròn với 1 cánh cửa ngăn đôi ở cuối hang. Prover (P) sẽ chứng minh cho Verifier (V) là mình biết mật khẩu mở cửa mà không cần nói cho (P) biết cụ thể mật khẩu là gì. Ta sẽ thực hiện việc này theo các bước sau:
 
- (P) đi vào hang và chọn đi theo hướng A hoặc B tuỳ ý và đi đến chỗ cánh cửa.
- (V) đi vào cửa hang và yêu cầu: "(P) hãy xuất hiện ở cửa B". Khi đó sẽ có 2 trường hợp
    - Nếu ban đầu (P) đi vào đường B thì (P) chỉ cần quay đầu trở lại
    - Nếu ban đầu (P) đi vào đường A thì cách duy nhất để (P) có thể xuất hiện ở đầu B là (P) phải biết mật khẩu cửa để đi từ đầu A sang đầu B
- Giả sử là (P) xuất hiện ở đầu B thật, vậy ta sẽ có 50% xác xuất là (P) không biết mật khẩu cửa

Vậy là thế nào để  ta có thể chắc chắn được (P) biết mật khẩu ? Đơn giản, ta hãy thực hiện việc kiểm tra này thật nhiều lần. Nếu lần 2 (P) vẫn đúng thì xác suất đúng sẽ là: `0.5 * 0.5 = 0.25`, lần 3 sẽ là `0.5 * 0.5 * 0.5 = 0.125` và cứ tiếp tục như vậy. Sau 100 lần chẳng hạn thì xác suất ăn may của (P) sẽ là cực kì nhỏ và lúc này, ta hầu như có thể chắc chắn là (P) biết mật khẩu cửa thực sự.

Chúng ta cùng kiểm tra lại 3 tính chất của ZKP:

- **Completeness** (tính trọn vẹn): Nếu (P) biết mật khẩu cửa thì (V) sẽ bị thuyết phục (bằng cách kiểm tra nhiều lần).
- **Soundness** (tính đúng đắn): Nếu (P) ăn may 1,2  lần thì bằng cách thử lại nhiều lần, ta đã loại bỏ được khả năng này.
- **Zero-Knowledge** (tính không có thông tin): (V) không hề biết thực sự mật khẩu là gì.

## Người mù màu và hai quả bóng

![](https://images.viblo.asia/80567e6a-f71a-4538-bc22-d7d62a62e589.jpeg)

> Image Source: Hacker Noon

Những người bị bệnh mù màu khi được đưa ra 2 quả bóng có màu khác nhau thì với họ, họ cũng không thể phân biệt được. Vậy làm thế nào để một người bình thường (Prover) có thể chứng minh cho một người mù màu (Verifier)  rằng họ biết là 2 quả bóng khác màu mà không lộ ra là quả bóng nào là quả nào và có màu gì ?

Ta thực hiện như sau:
- Người bị mù màu sẽ giấu 2 quả bóng sau lưng, sau đó đưa ra 1 quả cho người bình thường xem
- Sau đó người bị mù màu sẽ giấu quả bóng vừa đưa ra về sau lưng, rồi đưa quả bóng còn lại (hoặc chính quả bóng vừa đưa ra) cho người bình thường xem và yêu cầu người bình thường trả lời là anh ta đã đánh tráo quả bóng hay không.
- Lặp đi lặp lại việc này nhiều lần.

Nếu người mù màu tráo bóng thì ta có thể nhận ra ngay bằng việc nhìn vào màu của chúng, nếu không thì có 50% xác suất là chúng ta đoán mò (bóng giống nhau nhưng chúng ta lại kêu là khác nhau). Tương tự như ví dụ trên, bằng cách lặp đi lặp lại nhiều lần, người bị mù màu có thể giảm xác suất này xuống và cuối cùng bị thuyết phục là người bình thường biết là 2 quả bóng khác nhau.

Và tất nhiên, các tính chất của ZKP vẫn được đảm bảo.

- **Completeness** (tính trọn vẹn): Người bình thường thuyết phục được người bị mù màu là hai quả bóng khác nhau.
- **Soundness** (tính đúng đắn): Người bình thường không thể đoán mò.
- **Zero-Knowledge** (tính không có thông tin): Người mù màu không biết quả bóng nào là quả nào và có màu gì.

## Các ví dụ khác

Ngoài ra còn các ví dụ khác về áp dụng ZKP trong tìm người trong tranh, sudoku,... bạn có thể xem thêm trong phần tham khảo.

# Schnorr Identification Protocol

Trong tất cả những ví dụ trên, cái mà Prover muốn chứng minh đều là **proof of knowledge** (tức là người chứng minh có hiểu biết về một kiến thức, thông tin nào đó) nhưng đều vẫn đang ở dạng analog chứ chưa phải là ở dạng dữ liệu máy tính. Và đến những năm 1980s, khi mà Claus-Peter Schnorr đưa ra 
**Schnorr Identification Protocol** thì ta mới có thể thấy ZKP có thể tích hợp như thế nào vào hệ thống mật mã hiện đại như thế nào.

## Interactive

**Interactive** ở đây có ý nghĩa là cần có sự tương tác của cả hai phía Verifier và Prover trong quá trình thực hiện giao thức (nghĩa là 2 phía cần online cùng lúc để thực hiện việc này). Trong ví dụ sau đây *Alice* là **Prover** và *Bob* là **Verifier**

### Setup (Cài Đặt)
Ở phaser này Alice sẽ cần tạo cho mình một cặp $PK_A$ là khoá công khai, và $SK_A$ là khoá bí mật tương ứng.

$$PK_A = g^a \bmod p, SK_A = a$$

Alice sẽ giữ bí mật giá trị $a$. Việc chọn khoá như trên có nhiều điểm tương tự với [Diffie-Hellman](http://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) và thuật toán chữ ký  [(EC)DSA](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm).

### Protocol (Giao thức)

- Alice chọn một số ngẫu nhiên $k$ trong khoảng $1,...,q$ và tính $h = g^k \bmod p$ rồi gửi cho Bob.
- Bob sau đó chọn một số $c$ ngẫu nhiên trong khoảng $1,...,q$ và gửi lại cho Alice
- Alice tính $s = ac + k \bmod q$ rồi gửi lại cho Bob
- Bob kiểm tra $g^s \equiv PK_A^c \cdotp h \bmod p$. Nếu điều này đúng, chứng tỏ Alice biết về số $a$.

Ghi chú: về việc chọn các giá trị $(p, q, g)$ bạn có thể đọc thêm ở [đây](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm#Key_generation). Các giá trị này được biết trước.

### Prove (Chứng Minh)

Ta có thể chứng minh dễ dành như sau:

$$\begin{aligned}
g^s &\equiv PK_A^c \cdot h \bmod p \\
g^{ac + k} &\equiv (g^a)^c  \cdot g^k \bmod p \\
g^{ac + k} &\equiv g^{ac + k} \bmod p
\end{aligned}$$

Như vậy, Alice đã chứng minh được rằng mình biết về khoá bí mật $a$ mà không cần phải tiết lộ $a$ cho Bob biết.

Ở đây có một điểm cần phải lưu ý, đó là giá trị $k$ mà Alice chọn cho mỗi lần là phải ngẫu nhiên, nếu không thì Bob có thể biết được giá trị $a$ thông qua việc chọn hai số $c_1$ và $c_2$ gửi cho Alice. Nếu $k$ ở hai lần giống nhau, ta sẽ có:

$$\begin{aligned}
s_1 &= a(c_1) + k \bmod q \\
s_2 &= a(c_2) + k \bmod q
\end{aligned}$$

Ta tính:

$$\begin{aligned}
(s_1  - s_2)/(c_1 - c_2) &\bmod q \\
= [(ac_1 + k) - (ac_2 + k)]/(c_1 - c_2) &\bmod q \\
= (ac_1 - ac_2)/(c_1 - c_2) &\bmod q \\
= a(c_1 - c_2)/(c_1 - c_2) &\bmod q \\
&= a
\end{aligned}$$

Việc không có một bộ sinh số ngẫu nhiên tốt như trong trường hợp trên đã dẫn đến việc [Sony bị lộ khoá bí mật dùng để ký cho PS3.](https://www.bbc.com/news/technology-12116051) vì $k$ trong trường hợp này là dễ đoán.

## Non-interactive

Như trong giao thức trên, cả Alice và Bob cần phải online cùng lúc để thực hiện giao thức (chọn $c$ và $s$).  Fiat và Shamir vào năm 1980s đã chuyển giao thức này từ dạng tương tác sang thành không tương tác (non-interactive) như sau (nghĩa là không cần đến sự có mặt của B).
Cụ thể, ở bước chọn $c$, ta sẽ thay thế bằng một **hash function** (hàm băm) và $M$ một chuỗi tuỳ ý:

- Alice chọn một số ngẫu nhiên $k$ trong khoảng $1,...,q$ và tính $h = g^k \bmod p$ rồi gửi cho Bob. (như trên)
- Alice chọn một số $c = H(h || M )$ ngẫu nhiên trong khoảng $1,...,q$ và gửi lại.

Như vậy, vừa đảm bảo được điều kiện $c$ là ngẫu nhiên, và Alice khi cần, chỉ cần public $H$ cùng với $M$ để xác thực thì tất cả đều có thể kiểm chứng được.

Và tất nhiên, giao thức dù ở dạng tương tác hay không tương tác thì đều thoả mãn đủ bộ 3 tính chất của ZKP.

# Tạm kết
Ở phần tới, chúng ta sẽ tìm hiểu về zk-SNARK, cụ thể nó là gì, cách mà Z-Cash đã implement trên blockchain của họ, cùng 1 vài ví dụ sơ khai về việc ứng dụng của nó vào bảo vệ tính riêng tư (privacy) trên blockchain như thế nào nhé. Stay-tune !

# Tham khảo
- https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol
- https://unhashed.com/cryptocurrency-coin-guides/what-are-zksnarks/
- https://blog.ethereum.org/2016/12/05/zksnarks-in-a-nutshell/
- https://blockgeeks.com/guides/what-is-zksnarks/
- https://media.consensys.net/introduction-to-zksnarks-with-examples-3283b554fc3b
- https://github.com/ConsenSys/zero-knowledge-proofs
- https://blog.ethereum.org/2017/01/19/update-integrating-zcash-ethereum/
- https://hackernoon.com/how-to-prove-that-you-know-something-without-revealing-it-zero-knowledge-proofs-zcash-ethereum-43ce35d4d1c5
- https://medium.com/@adamluc/digital-identity-privacy-and-zero-knowledge-proofs-zk-snarks-3d092b509990 (Part 1)
- https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c (Part 2)
- https://blog.cryptographyengineering.com/2014/11/27/zero-knowledge-proofs-illustrated-primer/ (Part 1)
- https://blog.cryptographyengineering.com/2017/01/21/zero-knowledge-proofs-an-illustrated-primer-part-2/ (Part 2)
- https://pdfs.semanticscholar.org/8d69/c06d48b618a090dd19185aea7a13def894a5.pdf