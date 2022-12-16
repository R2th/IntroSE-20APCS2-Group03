## Mục đích
Bài này viết dành cho các bác muốn tìm hiểu về công nghệ nằm dưới Bitcoin, đi vào từng những khái niệm đơn giản đến phần công nghệ nằm dưới nó mang đến một cái nhìn tổng quan về công nghệ Blockchain sử dụng trong cái gọi là Bitcoin Protocol. 

## Tổng quan 
Chắc ae vào đọc bài  viblo.asia này thì chắc cũng là ae trong ngành IT cả thì cũng chẳng lạ lẫm với cụm từ Bitcoin được rất nhiều người nhắc đến gần đây, nên ở bài này mình sẽ không nhắc lại Bitcoin là gì nữa mà sẽ viết theo dựa trên phụ lục mình đưa ra dưới đây:
1. Tại sao lại gọi là Blockchain? Blockchain để làm gì? Cách thức một giao dịch được diễn ra?
1.1 Phân tích cấu tạo của một Block ( một khối )
1.2 Phân tích cách các giao dịch được thực hiện trong mạng lưới
1.3 Cách thức để mạng lưới chấp nhận một giao dịch

## 1.Tại sao lại gọi là Blockchain? Blockchain để làm gì? Cách thức một giao dịch được diễn ra?
Cái này mình cần hiểu cấu trúc của một Block trong Blockchain và bài này mình sẽ tìm hiểu về cấu trúc của một Block trong Bitcoin Protocol. 
Blockchain hiểu đơn giản là để ghi lại tất cả các giao dịch được diễn ra trên mạng lưới. Và khi đã được ghi lại thì nó gần như là không thể xóa bỏ.
### 1.1 Cấu trúc của một Block
Một Block còn  có một số trường nữa nhưng cái mình cần quan tâm là 6 trường ở dưới đây vì 1 Block chính là giá trị Hash của 6 trường dưới đây.
Thuật toán Hash sử dụng ở đây là thuật toán SHA-256. Mình cũng giải thích luôn thuật toán này một chút.
> Thuật toán SHA-256 là thuật toán băm một chiều. Tức các bạn đưa vào một input là một chuỗi, 1 ảnh, .... thì qua thuật toán nó sẽ cho ra một output có độ dài 256 bits. Và không thể tìm được input ấy kể cả khi mình có mã băm output. Lưu ý: Bạn đưa vào input là cái gì, nặng bao nhiêu đi chăng nữa nó cũng chỉ cho ra một output 256 bits thôi.
Các bác có thể tự mình thử dùng thuật toán này ở link dưới đây:
https://passwordsgenerator.net/sha256-hash-generator/


|Tên  | Giải thích| 
| -------- | -------- |
| Version | Ghi lại phiên bản của Bitcoin Protocol khi tạo Block | 
| Previous Block Hash     | Ghi lại hash của Block đứng ngay trước   | 
| Merkle Root     | Là hash của tất cả các transactions trong Block   |
|Timestamp     | Ghi lại thời gian tạo Block    |
| Bits    | Ghi lại độ khó của Block    | 
| Nonce     | Là 1 số ngẫu nhiên ( Mình sẽ giải thích ở bên dưới ) | 

Trường Version và Timestamp chắc ae cũng hiểu rồi nên mình xin phép được giải thích các trường còn lại trong Block.
#### Previous Block Hash
> Trường này để ghi lại Hash của Block  ngay trước nó để Bitcoin tạo thành hình như cái xích nối các mắt xích lại với nhau khiến cho việc "Khi đã tạo ra 1 block rồi thì rất khó có thể thay đổi thông tin của Block đó". Bởi 1 Block là hash của 6 trường bên trên nên nếu Block trước bị thay đổi => hash của Block trước cũng bị thay đổi => giá trị trường Previous Block Hash cũng bị thay đổi theo và cứ thế cứ thế nếu block thứ n bị thay đổi thì block n+1, n+2,.... n+n cũng bị thay đổi theo. Và cũng chính từ đặc điểm Block trước kết nối với Block sau thành một chuỗi thế này nên nguời ta gọi là Blockchain ( Block: khối , Chain: chuỗi, Blockchain: tạm dịch là chuỗi khối)

![](https://images.viblo.asia/c3927206-b857-465b-ae3c-0888fb2f7306.png)

#### Merkle Root 
Để giao dịch thực hiện trên mạng lưới Blockchain thì nó cần được đưa vào một khối. Trường này ghi lại giá trị hash của tất cả các giao dịch trong khối theo hình thức cây Merkle như thế này:
![](https://images.viblo.asia/5201275b-b65f-4e37-b243-6ec60ed16e20.png)

Các giao dịch được hash lại với nhau rồi cuối cùng tạo thành một hash hợp nhất lại ( Do sử dụng thuật toán SHA-256 như  mình trình bày ở bên trên nên cho dù hash bao nhiêu lần thì kết quả trả ra cho Merkle Root vẫn chỉ là 256 bits thôi nhé) khiến cho mọi sự thay đổi nhỏ trong cây cũng sẽ làm cho giá trị của merkle root thay đổi. và dẫn đến Block hash cũng thay đổi theo. Cây Merkle tree ae thấy ở đây thì hiện tại số các giao dịch có như trên hình là số chẵn, không biết có cao nhân nào comment giải thích giúp mình trường hợp số lẻ sẽ như thế nào không nhỉ?? Hoặc là bạn nào muốn biết thì comment dưới này mình sẽ giải đáp nhé =))

#### Bits và Nonce
Ghi lại độ khó của (cái gì đó). Hiểu cái này mình lại phải đi tìm hiểu về cách thức 1 Block hợp lệ được tạo ra. Và để một Block được coi là hợp lệ thì người tạo ra Block phải tìm ra Block hash, và để tìm ra Blockhash thì người ta cần tìm ra được giá trị của cả 6 trường bên trên, trong đó có  một  trường chứa một giá trị ngẫu nhiên (Chính là trường Nonce). Cùng nhìn lại  cách BlockHash được tạo ra: 
```
BlockHash = Hash(Version + Previous Block Hash + Merkle Root + Timestamp + Bits + Nonce)  
```
Trường Bits chính là trường ghi lại độ khó của công việc tìm ra số ngẫu nhiên Nonce. ( Và đây cũng chính là công việc của các Miner hay còn gọi là các thợ đào Bitcoin)
Điểm qua một chút về công việc của người đào Bitcoin thì  giống như dưới đây.

![](https://images.viblo.asia/6a0c8b7e-7adc-4d6e-b97f-45d7ece55501.gif)

Bộ đếm Nonce sẽ đếm tăng dần từ 0,1,2,3,.... cho đến khi nào nó hợp lệ thì thôi. Cứ mỗi lần tăng thêm 1 đơn vị thì máy tính sẽ phải tính toán lại giá trị Hash của Block. Thông qua thuật toán SHA-256 nên số Nonce tăng thêm 1 đơn vị thôi cũng cho ra một giá trị BlockHash khác hoàn toàn với giá trị Hash vừa rồi. Nên người đào Bitcoin có một máy có sức mạnh tính toán Hash càng cao thì sẽ càng có nhiều cơ hội tìm ra số Nonce sớm hơn. Và số Nonce thích hợp sẽ là số khi kết hợp lại với 5 trường kia sẽ cho ra 1 giá trị Hash có giá trị nhỏ hơn trường Bits.
( Đọc đến đây ai có thắc mắc cái gì sai sai không ạ :)) ? )

![](https://images.viblo.asia/b14885f5-0d26-4838-b897-75b476981282.png)

Như vậy trong mạng lưới Bitcoin, các máy đào Bitcoin sẽ tranh nhau tìm ra số Nonce thích hợp để tạo ra 1 Block mới. (Người tạo ra Block sẽ được nhận thưởng từ hệ thống (Transaction từ coinbase) Và tất cả phần phí từ các giao dịch có trong Block. 
Phần thưởng từ coinbase sẽ giảm dần từ những Block đầu tiên được tạo ra, Block đầu tiên (Genesis Block) do Nakamoto Satoshi- Người tạo ta Bitcoin đã được nhận thưởng 50 Bitcoin và hiện tại người tạo ra Block sẽ nhận được 12.5 Bitcoin. Hiện tại ở Bitcoin thì trung bình cứ 10 phút thì 1 block mới được tạo ra. Và cái này có thể config được. Cứ mỗi khoảng 2 tuần ( 2048 block) thì hệ thống sẽ tự động tính toán lại mức độ khó dễ, và bằng việc thay đổi giá trị của trường Bits, Bitcoin Protocol có thể điều chỉnh lại được độ khó của thuật toán tím ra giá trị Block Hash để luôn giữ mức 10 phút/1 block kể cả khi có nhiều hay ít người tham gia vào công việc đào Bitcoin. Hiện tại số lượng người tham gia vào giải toán là rất lớn nên việc tìm ra Block Hash cực kì khó khăn, nếu hiện tại mà đào bằng máy cá nhân thì cũng có rất ít khả năng chúng ta sẽ đào được một Block. Việc đào Bitcoin chính là việc tính ra số Hash nên nếu ngày xưa người ta dùng CPU để đào thì hiện tại người ta sử dụng GPU ( card đồ họa) để đào sẽ mang lại hiệu quả gấp nhiều lần . Do card đồ họa chuyên dùng để tính toán hash để làm chuyển động các pixel màu để hiển thị. Hiện tại thì cũng đã có máy chuyên dụng để đào Bitcoin tên là ASIC đến từ Trung Quốc dưới đây và nó có sức mạnh tính toán hash vượt xa so với máy tính cá nhân chúng ta đang dùng. Cụ thể mạnh hơn bao nhiêu thì phụ thuộc vào từng loại và mình cũng chưa tìm hiểu ae nhé :))

![](https://images.viblo.asia/7333041c-68c1-4d25-8ef1-cf5cc873db2a.jpg)

Không chỉ thế, khi đào Bitcoin trở lên khó khăn thì nhiều nhóm người đã lên ý tưởng là liên kết với nhau để tạo thành một "Mining Pool" Tạm dịch là một cụm đào trông như ảnh dưới đây để tăng tỷ lệ đào được Bitcoin. Lượng Bitcoin đào được sẽ chia như thế nào thì tùy từng Mining Pool nhé. Và hiện tại các Mining Pool lớn tập trung ở Trung Quốc ae nhé.

![](https://images.viblo.asia/e396f406-0c76-4d19-83c8-2dedf40bea0e.jpg)

### 1.2 Okay , tiếp đến mình sẽ tìm hiểu về cách thức truyền thông tin trong mạng lưới các máy ngang hàng của Bitcoin nhé 
Ở mô hình Web ae đang sử dụng là mô hình client-sever thì mối quan hệ truyền tin chỉ có 1-1 Client -> sever và Sever -> client như thế này:

![](https://images.viblo.asia/3b4b880e-28fc-4607-9a1b-c247baaa8cf4.jpg)

Còn ở mô hình các máy ngang hàng như trong mô hình Blockchain sẽ như thế này:

![](https://images.viblo.asia/4d1dc265-c965-42d8-afbd-cd47c6d36f12.jpg)

Các máy liên kết với nhau và truyền thông tin qua nhau. Cụ thể như nếu gọi mỗi một máy tham gia vào hệ thống là một Node và bạn đang muốn gửi một thông báo đến node rằng "Tôi muốn gửi một giao dịch cho anh 'Chó cũng học code' 1 bitcoin"
> Nếu từ node của bạn 1 phát gửi thông tin cho tất cả các node khác có trong hệ thống và các node khác cũng đồng thời làm vậy thì sẽ sảy ra hiện tượng nghẹn cổ chai ở nhiều nơi nên ...Mỗi một Node sẽ có một list các "hàng xóm" của mình và việc truyền tin sẽ chỉ sảy ra ở mình -> các hàng xóm của mình mà thôi,và cứ thế anh hàng xóm của mình nhận được tin sẽ xác thực xem giao dịch mà mình gửi có hợp lệ không. Và nếu hợp lệ sẽ gửi tiếp đến các hàng xóm của anh ấy rồi hàng xóm của anh lại tiếp tục check và gửi cho đến khi truyền đến tất cả các node. Và nó sẽ được thực hiện khá nhanh do mô hình truyền thông tin theo hình cây nhị phân như thế . Cho dù tăng số lượng lên gấp 2 lần đi nữa thì cũng chỉ mất thêm 1 lần gửi ...

 ![](https://images.viblo.asia/dbd8aaae-ad7f-4ce7-9d35-42725a2d04a0.png)
 
 ### 1.3 Cách thức để mạng lưới chấp nhận một giao dịch
 Giả sử như giao dịch vừa nãy ta gửi cho bạn "Chó cũng học code" 1 bitcoin vừa rồi là hợp lệ và giao dịch đã được gửi đi tất cả các Node trong mạng lưới. 
 Trong mạng lưới sẽ bao gồm những Mining Node tạm gọi là những máy chuyên để đào Bitcoin trong mạng lưới. Các node này sẽ gom các giao dịch vào một list gọi là "gì ý mình cũng quên rồi =)) " rồi sẽ chọn ra những giao dịch mình muốn thêm vào để tạo thành 1 Block ( khoảng 1500 giao dịch gì đó cũng tùy ạ)  đa số sẽ chọn các giao dịch có phí giao dịch cao để có thể hưởng lợi nhiều hơn. Nhân tiện cũng nói luôn là 1 Block chỉ có dung lượng Max là 1 MB thôi nhé =)) ( Có ai giải thích vì sao không nhỉ =)) ) và tiến hành tính toán giá trị BlockHash. Lại chạy hàm tín giá trị Nonce chạy từ 0,1,2,3,..... Và khi đã tìm ra Blockhash thì sẽ thêm Block đó vào chính Blockchain trên loval của máy mình và tiếp tục (với hình thức giống như gửi thông tin giao dịch) gửi đến các hàng xóm của mình, các hàng xóm check Block ấy có hợp lệ không, nếu hợp lệ sẽ thêm Block đó vào Blockchain của mình rồi tiếp tục gửi đi .....
 
Bài này là bài đầu tiên mình viết nên chắc sẽ có nhiều thiếu sót. Có gì ae comment dưới này nhé =))) 
-Vì cộng đồng Viblo.