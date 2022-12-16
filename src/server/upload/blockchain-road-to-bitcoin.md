![elon_musk_on_the_phone](https://drive.google.com/uc?export=view&id=18ijxwIEP9waobCTPUxTqeqJgpaBtd2uX)

Chắc mọi người hẳn đã không còn xa lạ gì với anh chàng tỷ phú đã ném vỡ cửa kính ô tô nhà mình cùng với siêu năng lực điều khiển vật giá chỉ bằng lời nói, người đã đẩy định giá Bitcoin trên thị trường vượt ngưỡng 50K dolar/coin với những bài twitter để đời :satisfied:

![elon_musk_twitter](https://drive.google.com/uc?export=view&id=1j06gyQ6aivkSm0NSt7sqNqmqhyPLyMjL) 

Ô thế Bitcoin là gì ấy nhờ? Nó hoạt động kiểu gì mà hay vậy?  Cứ bình tĩnh, tôi với bạn đang có cùng thắc mắc đấy, kéo xuống đọc tiếp nào.

### Ông cho tôi vài đồng thử xem

![bitcoin](https://drive.google.com/uc?export=view&id=1pyr41Y7GX0VSE4Sq-0zL_NdMDtizs9KP)

Hmm đây 01010110101... , tất nhiên rồi nó là tiền ảo mà, nó không phải là đồng xu vàng lấp lánh như ông nghĩ đâu. Tuy nhiên nó có thể được chứa trong 1 chiếc **ví (wallet)** của riêng ông, đó là nơi mà ông có thể gửi tiền vào thông qua các **giao dịch (transaction)** qua ví của 1 người khác hoặc ngược lại thông qua 1 cơ chế thông minh **(smart contract)**. Trong thực tế ông không thực hiện 1 giao dịch đơn lẻ, mà phải nhóm nhiều giao dịch vào 1 **khối (block)**, các khối này sau đó được các **thợ mỏ (miner)**  khai thác hay còn gọi là **đào (mine)** thông qua 1 thuật toán nhằm biến các giao dịch bên trong khối đó thành hợp lệ :money_with_wings: :money_with_wings: :money_with_wings: **--->** :moneybag:.  
Giờ đây sau khi 1 khối đã được đào, thì giao dịch ông tạo ra mới chính thức có hiệu lực, khối mới được đào sẽ được liên kết với các khối cũ, từ đây tạo ra 1 **chuỗi các khối (blockchain)** . Đây cũng được xem như là lịch sử giao dịch từ trước đến giờ và do 1 số tính chất mà nó là ***không thể thay đổi (immutable)*** mà tôi sẽ đề cập lý do sau.

Nghe lùng bùng hết cả lỗ tai nhỉ, tin tôi đi tôi còn chẳng thể hiểu 1 từ nào trong số này khi mà tôi mới đọc lần đầu đâu. Trước khi đi vào chi tiết hơn hãy cùng điểm lại các từ khóa quan trọng nhé: **Wallet, Transaction, Block, Blockchain, Smart Contract --- Miner and Mine** 

### Mô phỏng

#### 1. Tiền từ trên trời rơi xuống

![bitcoin_left](https://drive.google.com/uc?export=view&id=1XvuNl2CyB9ErJK7Tl7l2beJCOGR9aybH)

Khi 1 Miner **đào** thành công 1 khối, anh ta sẽ thêm vào 1 transaction trong đó **tự** chuyển vào tài khoản của chính mình 1 số tiền từ **thượng đế**, và 1 số tiền **tip** nho nhỏ cho mỗi transaction trong khối đã đào.

**Thượng đế** ở đây chính là hệ thống, nó sẽ quy định mức tiền thưởng cho khối được đào tiếp theo mà tất cả các Miner phải tuân thủ (nếu không muốn khối đã bỏ công sức ra đào bị reject), đây chính là cách mà coin được tạo ra.

*Note: Bitcoin quy định chỉ có 21 triệu đồng tiền được phép tồn tại, hãy hỏi người tạo ra nó tại sao

#### 2. Thế làm sao tôi gửi tiền cho ông?

![wallet](https://drive.google.com/uc?export=view&id=1JX5ZqgpO-PiFVRyavXlrGMrUNKjhoOIN)

Đó là lý do ông cần tậu 1 chiếc **ví** cho mình đấy, cách làm cũng đơn giản thôi, ông chỉ cần tạo ra 1 địa chỉ khác với số còn lại trong khối **blockchain** là được. Nó hoàn toàn giống với địa chỉ nhà ông vậy, bất kì ai cũng có thể đến và đặt vào hộp thư nhà ông và điều ngược lại nếu như ông biết địa chỉ nhà người khác. Ông có thể tạo ra bao nhiêu chiếc ví tùy thích, nó là miễn phí, điểm mấu chốt ở đây là với mỗi ví được tạo ra, ông sẽ có 1 chìa khóa gọi là **private key** mà tôi sẽ giải thích tại sao nó lại cần thiết ở phần sau.

![wallet](https://drive.google.com/uc?export=view&id=1TovpTqRwNCryj7SyHr5crqYIfZCvUfEL)

Cái hay nằm ở chỗ nó chỉ là 1 chuỗi dài những ký tự, nó chả nói lên ông là ai hay ông là cái gì. Tránh được con mắt của những kẻ tò mò như trên mạng xã hội ngày nay.

##### 2.1 Mạng ngang hàng (Peer to Peer)

![wallet](https://drive.google.com/uc?export=view&id=1xw0jE4zcVlYq6Sz7mciMynZOhFFc3eKp)

Đồ án web đã làm mấy ông ám ảnh với từ khóa client-server rồi đúng không, đổi gió qua peer-to-peer thử xem nào.

Công nghệ này cho phép 2 người dùng có thể trao đổi dữ liệu trực tiếp (Torrent), với điều kiện là họ phải đang nắm giữ pubic-id (ipv4, ipv6) của đối phương (kiểu như bluetooth vậy). Tôi xin phép chỉ dừng lại ở việc định nghĩa, ông có thể tham khảo thêm [thư viện](https://www.npmjs.com/package/peerjs) mà tôi đã từng sử dụng.

#### 3. Cái gì!!! Không có ai trung gian giữ tiền hết sao?

Nghe vô lý quá nhỉ, thế tiền ở đâu ra để gửi? Rồi ai làm chứng cho tôi nếu tôi gửi 1 khoản tiền cho người khác? Thanks to 'Satoshi' người đã giải được bài toán tưởng chừng như vô lý này.

![gif](https://media.giphy.com/media/5dSVztOWsEYYIYEX3m/giphy.gif)

##### 3.1 Private Key

![gif](https://media.giphy.com/media/QvSGhHq8CrVzq/giphy.gif)

Với mỗi giao dịch ông tạo ra, ông sẽ khóa nó lại với private key của mình, private key này với public key (địa chỉ ví) của ông có quan hệ mật thiết với nhau, mỗi **public key** chỉ có 1 **private key** hợp lệ được tạo ra và điều này có thể kiểm tra được.

Khi một giao dịch được tạo ra, có cấu trúc dạng JSON như sau:

``` json
{
    "transaction_id": "{hash_all_of_data_bellow}",
    "transaction_inputs": [...], // Số tiền nạp vào cho giao dịch này
    "transaction_outputs": [...], // Địa chỉ ví và số tiền sẽ gửi (phải nhỏ hơn hoặc bằng input),
    ...
}
```

Điều đặc biệt của thuật toán là sau khi được mã hóa bằng cả 2 (pubKey and priKey), bất kỳ ai cũng có thể kiểm tra tính đúng đắn của nó bằng pubicKey của ông, nếu ông có tình dùng sai privateKey, nó sẽ không bao giờ vượt qua được.

Đây cũng là bước kiểm định 1 **Block** hợp lệ trước khi Miner đào và thêm nó vào chuỗi.  


##### 3.2 Blockchain

Ầu right mới qua màn gửi xe thôi nhé ông, giờ trong trường hợp ai đó đã đào thành công 1 khối thì sao? Làm sao để tôi biết được khối đó hợp lệ?

![block_chain](https://drive.google.com/uc?export=view&id=1GZHU_AkT-0wuHWmbACWvt0K2ws61A2EZ)

Mỗi khối sau khi đào sẽ có 1 **nonce**, số này chính là mật mã đến cánh cửa thiên đường, nơi mà **thượng đế** chấp thuận gửi cho ông 1 số coin sau những nỗ lực mà ông bỏ ra. Giả sử như số này đúng, lặp lại bước 2.1, nếu tất cả đều thành công thì khối này hợp lệ, ông nối nó vào Blockchain, sau khi có khoảng 51% tổng số người tham gia mạng lưới làm việc này, khối này chính thức có hiệu lực. Chủ nhân của khối này nhận được bitcoin từ hệ thống.

---

Chính nhờ những thuật toán kể trên mà việc giả mạo gần như là bất khả thi, chỉ cần bạn thay đổi 1 kí tự trong chuỗi thôi thì kết quả đã hoàn toàn khác so với ban đầu rồi, đây cũng chính là tính chất **immutable** như tôi đã đề cập


### Cầm cuốc lên nào

Khi 1 ai đó thêm thành công 1 khối mới là chuỗi và được mọi người chấp thuận, trò chơi được tái khởi động.

Luật được quy định như sau

- Tìm ra con số **nonce** tương ứng với quy luật (theo luật của bitcoin **nonce** là 1 chuỗi chữ số bắt đầu bởi n số 0, n là thay đổi theo mỗi màn chơi)
- Khối của bạn đào ra phải được chấp thuận bởi đa số người tham gia (>= 51%)

#### 1. Sổ xố kiến thiết

![gif](https://media.giphy.com/media/1jARfPtdz7eE0/giphy.gif)

Khi bắt đầu trò chơi, người chơi tìm cho mình những transaction được người tham gia gửi lên và thêm nó vào khối của mình, bao gồm cả transaction chứa tiền thưởng của hệ thống, sau khi gom đủ lúa cho khối bước chuẩn bị hoàn thành.

Người chơi chọn 1 **nonce**  từ 1 -> vô cùng, sao cho khi hash số này với hash của block ta ra được con số theo luật đã đề ra của trò chơi. Lặp lại việc này cho đến khi tìm ra con số đúng.
 
Người chơi tìm ra **nonce** sẽ tự thêm khối này vào khối của mình, sau đó gửi nó đến tất cả người tham gia khác.

#### 2. Chạy đua

![gif](https://media.giphy.com/media/7kn27lnYSAE9O/giphy.gif)

Trong cùng 1 lúc có thể có nhiều hơn 1 người chơi tìm ra con số thần thánh này, nên người chiến thắng sẽ được quyết định bằng luật đa số. Tức là khối nhiều người chấp thuận nhất sẽ chiến thắng.

### Sự thật

Việc thử lần lượt từng con số yêu cầu rất nhiều sức mạnh tính toán và tiêu thu 1 lượng năng lượng khổng lồ, việc này dẫn đến sự ra đời của của nhiều kiểu chơi khác nhau như tập hợp nhiều máy tính lại để đào (chia để trị) với ý tưởng là mỗi máy sẽ đảm nhận thử 1 tập hợp số khác nhau => Giảm thời gian tìm ra **nonce**

Top 3 party hiện nay đều thuộc về nước bạn

![top_crypto](https://drive.google.com/uc?export=view&id=1Nc899vb0_3j6fVJIR-tjg_o5uFhvE4jc)

Ông cũng có thể mua lại Bitcoin từ người khác và đợi chênh lệch tỉ giá xảy ra, đây là cách chơi phổ biến nhất hiện nay vì không đời nào ông đua nổi với những siêu máy tính đào coin ngoài kia đâu.

Còn rất nhiều đồng tiền khác trên thế giới, chúng mới hơn và sử dụng những thuật toán đồng thuận tối ưu hơn so với Bitcoin

![top_crypto](https://drive.google.com/uc?export=view&id=16mA8uNOByHH5GBxlCmwcDuUzAECRugg1)

### Bitcoin và xa hơn nữa

##### 1. Đồng tiền chung và sự biến mất của ngân hàng

Bitcoin nói riêng và tiền ảo nói chung chỉ là 1 cách áp dụng của thuật toán đồng thuận, sẽ ra sao nếu thuật toán này tối ưu hơn và được áp dụng trong lưu trữ tiền tệ với privateKey là sinh trắc học của chúng ta.

##### 2. Chống tham nhũng

Với lịch sử giao dịch công khai và không thể thay đổi, đây sẽ là công cụ chống tham nhũng tuyệt vời của loài người.

### Kết

 Và còn ti tỷ các khía cạnh khác về đồng tiền này mà với kiến thức hạn hẹp của mình chưa thể liệt kê hết được. Mình đã làm 1 project cá nhân mô phỏng lại cách mà hệ thống tiền ảo hoạt động, mình mong là sẽ có cơ hội chia sẻ với mọi người ở bài viết sau.

 Cùng mình bàn luận các chủ đề tiếp theo nào, mình có 1 số gợi ý dành cho bạn, comment phía bên dưới nhé:

 1. Code làm sao để tester thất nghiệp
 2. Các vấn đề nhức nhối trong lập trình
 3. Mindset thế nào là tốt trong lập trình
 4. OOP (Object Oriented) mix FP (Functional Programming), why not?
 5. Sai lầm của dân IT trong  việc chinh phục phụ nữ :satisfied:

Hope you guy enjoy my article.

![gif](https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif)