# Lời nói đầu
Bitcoin hay blockchain hẳn giờ không hề xa lạ đối với bất kể lập trình viên nào, thậm chí đến cả những người non-tech .Vào khoảng 2 tuần trước, khi về nhà nghỉ ngơi sau một tuần học tập ở Hà Nội, mẹ mình có hỏi mình "bờ lóc trên với bít coi là gì hả con sao tao thấy tivi suốt ngày nói thế?  ", chắc mẹ nghĩ rằng thằng con học công nghệ thông tin thì chắc chắn phải biết tuy nhiên  thực sự vì tại thời điểm đó mình mới chỉ biết hai điều `Bitcoin` là một đồng tiền số và `Blockchain` là công nghệ để làm ra nó. Và khi đó mình cũng tự hỏi cái này có gì hay mà cả thế giới đang điên đảo vì nó vậy ?

 ![](https://images.viblo.asia/e4c48d2d-4ddf-4a33-9b13-b38704322377.png)``
 
# Một hình thức giao dịch mới
Chúng ta hãy lấy một ví dụ đơn giản như thế này:
> Chuyển tiền qua ngân hàng là một hình thức vô cùng nhanh gọn và tiện lợi, khi đó ngân hàng được chúng ta coi như là một bên trung gian , người làm chứng cho 2 bên trong cái giao dịch này, người có thể theo dõi tường tận mọi thông tin về giao dịch cũng như là người chứng thực cho giao dịch. Một ngày của người làm chứng này khá bận rộn khi phải trở thành trung gian cho hàng trăm hàng nghìn giao dịch. Nhưng hãy thử tưởng tượng, một ngày đẹp trời, người làm chứng của chúng ta không còn công bằng, khi đấy chỉ có mà kêu trời vì anh ý là người nắm mọi thông tin về giao dịch này

 Vậy có cách nào  để mở cho cái nút thắt của các giao dịch này?

=> Và câu trả lời chính là công nghệ đã tạo ra đồng tiền số bitcoin(đồng tiền khiến bao kẻ lên tiên cũng như bao người ra đê ) :      `**Blockchain**` 

Blockchain đã mở nút thắt cho giao dịch,  khi mà không cần một bên trung gian làm chứng giao dịch nữa, giờ đây, tất cả mọi người đều có cho mình một `cuốn sổ cái` có thể xem tất cả giao dịch

Và cũng chính những người có trong mạng lưới này đóng vai trò vào việc `ghi chép`, `kiểm chứng` cho `cuốn sổ cái` này 

![](https://images.viblo.asia/6d3a24be-4306-4d7d-a4a6-a54f32101d4a.jpg)


# Cách thức làm việc
Lan man một hồi thì tóm váy lại thì cuốn sổ cái này làm việc như thế nào, ghi chép ra sao mà có thể tự tin nói rằng mọi người có thể tin tưởng vào nó ?

![](https://images.viblo.asia/a26e49e1-ad95-43af-aee9-9cf06fb6fe2b.jpg)

Lại thêm một ví dụ nữa:
> Có 4 người người bạn là anh Thắng, chị Hương, anh Hùng và anh Bắc , 4 người này tham gia vào cùng một mạng blockchain, mỗi người sẽ được phát một quyển sổ để ghi chép mọi giao dịch trong mạng này. Một ngày nắng đẹp chị Hương mua cho a Thắng một ly ![](https://images.viblo.asia/61d75fcb-6624-40e7-ba5e-399a951611b4.jpg)  và sau đó chị Hương sẽ thông báo lên mạng của các người bạn mình rằng mình vừa hối lộ a Thắng. A Hùng và a Bắc nghe vậy liền kiểm tra xem đúng có phải bà này mua đúng không hay chỉ là cái vỏ không để làm màu. Sau khi kiểm tra đầy đủ, và xác nhận đúng là hàng thật a Hùng và a Bắc đành phải ghi vào sổ cái của mình " Chị Hương hối lộ a Thắng một freeze trà xanh"

Từ ví dụ trên chúng ta có thể hình dung ra cách thức làm việc của blockchain: Khi có một giao dịch được tạo ra, nó sẽ được phát tán trên mạng và đến khi nào nó được xác nhận và đưa vào một block thông qua một quá trình gọi là đào (mining)  và khi đó nó đã trở thành một phần của blockchain, được ghi trong mỗi quyển sổ của các thành viên tham gia mạng. Ở ví dụ trên , 2 người là a Hùng và Bắc sẽ là các thợ mỏ (miner) kiêm kế toán, những người này kiểm tra giao dịch bằng những thuật toán đòi hỏi phải tính lượng phép tính khổng lồ gọi là thuật toán đồng thuận. Và tất nhiên, người nào giải mã được đầu tiên ra block tiếp theo được cho vào blockchain sẽ được hướng một phần thưởng coi như công sức tính toán. Block được thêm mới đó như là một container chứa tất cả các giao dịch trọng mạng trong một khoảng thời gian nhất định

# Block là gì ?
![](https://images.viblo.asia/539c1f01-5ea4-47b1-9b20-a01ae611f7e5.png)

Block cơ bản bao gồm một tiêu đề chứa siêu dữ liệu và theo sau đó là một danh sách trải dài các giao dịch, và quan trọng hợn nó được link với các block trước  đó (block mẹ) điều này chính là mấu chốt khiến blockchain rất khó có thể sửa, xóa khi đã được lưu vào


##     Tiêu đề block
Tiêu đề block bao gồm 3 bộ dữ liệu block. Đầu tiên là một tham chiếu tới block mẹ. Bộ thứ 2 lần lượt là difficulty (độ khó), timestamp (nhãn thời gian), và nonce(số dùng một lần).Phần thứ 3 được gọi là gốc merkle, có thể coi nó là một bản tóm tắt về dánh sách các giao dịch chứa trong block

## Định danh block
* Định danh chính của một block chính là mã hash mật mã của nó , một mã được tạo ra sau khi đã băm tiêu đề block bằng thuật toán SHA256. Mã băm block xác định một block một cách duy nhất và rõ ràng, nó có thể được tạo ra bằng bất kì nút nào trong mạng chỉ với việc băm tiêu đề của block
* Ta cũng có thể tìm block dựa vào chiều cao của nó trong blockchain. Tuy nhiên không giống như mã băm block, độ cao này không phải là một định danh tuyệt đối. Một block luôn có một độ cao nhất định tuy nhiên một độ cao không xác định duy nhất một block (điều này liên quan đến phân nhánh block - mình sẽ đề cập trông bài viết tiếp theo)
## Liên kết các block trong blockchain
Mỗi kho một block mới được xác thực và được ghi vào blockchain thì các bản sao cục bộ ở các node đầy đủ cũng tự cập nhật. Khi một node nhận được block mới, việc đầu tiên của nó là xác thực block đó và sau đó là liên kết nó với blockchain đã có. Để xác thiết lập một liên kết, node sẽ tìm tới mã băm của block kế trước
![](https://images.viblo.asia/8deae47c-271a-4bf1-bcb5-311457a88ac3.PNG)
![](https://images.viblo.asia/1c68bade-3bd2-479b-adf0-039a5277dcf7.PNG)

Đây là 2 block gần kề nhau , các bạn có thể thấy chúng được liên kết với nhau bằng previousHash, block 277317 có previousHash là Hash của block trước nó 277316. Nhờ vậy việc thay đổi một block trong blockchain là một việc vô cùng khó khăn vì khi thay đổi một block các block con cháu sẽ không còn đúng đắn, và hành đồng đó sẽ bị phát hiện và loại bỏ


# Kết
Đây là những chia sẻ của một newbie đang mò mẫm trên con đường tìm hiểu một công nghệ trend hiện nay, nó chỉ là những định nghĩa đơn giản, nhưng mong nhờ nó có thể khơi dậy niềm đam mê tìm hiểu, xây dựng công nghệ này của các bạn. Mình rất mong nhận được các đóng góp của các bạn
# References
https://github.com/bitcoinbook/bitcoinbook

http://w2.blockchain-tec.net/blockchain/blockchain-by-melanie-swan.pdf

http://www.giaosucan.com/