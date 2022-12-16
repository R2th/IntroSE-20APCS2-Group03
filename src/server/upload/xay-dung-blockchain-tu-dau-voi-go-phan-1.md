# Giới thiệu
- Đây là series xây dựng một Blockchain **cơ bản nhất** bằng **Go**
- Series tham khảo từ EBook  [**“Build a Blockchain from Scratch in Go”**](https://web3coach.gumroad.com/l/build-a-blockchain-from-scratch-in-go)
- [!] Mình cũng là newbie nên nếu có sai sót các bạn đóng góp bằng cách comment nhé 😄

# Bạn sẽ học được gì từ series này?
- Xây dựng một hệ thống p2p **đơn giản**
- Event-based architecture
- Cách mà server có thể tự kết nối tự động (BTC, ETH, XRP)
- Ngôn ngữ lập trình Golang <3
- Các thuật toán mã hoá **cơ bản**.

# Giới thiệu về Go
- Go là một ngôn ngữ lập trình mới do Google thiết kế và phát triển.
- Ngôn ngữ ngắn gọn.
- Có tốc độ biên dịch nhanh.
Trong series này mình sẽ sử dụng Golang để code nên bạn nào đã có kiến thức cơ bản về golang (syntax, ...) đều có thể đọc được nhé. 

Ngoài ra các bạn có thể xem thêm về Go tại đây: https://go.dev/tour/ 

# Tìm hiểu về blockchain
- Đối với người dùng: Blockchain như một cuốn sổ, ghi lại toàn bộ giao dịch, ai cũng có thể sở hữu 1 bản sao giống hệt nhau
- Với dân lập trình: Blockchain như database phân tán trên nhiều nodes, mỗi nodes chứa dữ liệu hoàn toàn giống nhau
Chắc các bạn ai cũng nghe qua hoặc biết về Bitcoin (BTC) rồi đúng hông, thì BTC là một sản phẩm của blockchain.

![image.png](https://images.viblo.asia/f0a0c581-dbef-47ab-a763-74f403f1919c.png)
- Blockchain -> là một chuỗi các khối được nối vào nhau, mỗi khối được nối với khối trước đó thông qua “hash”.

-> Để thay đổi dữ liệu trong  Blockchain là một điều vô cùng khó, gần như không thể.

# Tìm hiểu Genesis block
![image.png](https://images.viblo.asia/0ebcdbf7-4c45-41b2-b455-2f3eb2c14788.png)
Mỗi block đều sẽ có một header chứa các thông tin của block đó (nonce, timestamp, parent_hash, ... ) và sẽ có chứa các giao dịch (transaction) bên trong, và block đầu tiên của một chain được gọi là **Genesis block**. Mọi block chain đều có **Genesis block**

# Câu chuyện bắt đầu
Tìm hiểu các kiến thức cơ bản như vậy là đủ rùi, giờ mình bắt đầu đi vào câu chuyện nhé, lưu ý bạn phải đi qua hết các phần để hiểu rõ & đi cùng mình xuyên suốt câu chuyện nhé <3.

Repo được sử dụng trong series: https://github.com/lequocbinh04/the-simple-blockchain

Câu chuyện **John và quán Bar của anh ấy** bắt đầu:

Vào những năm 90, John đã làm trùm CSDL SQL, anh ấy biết cách tạo các CSDL với mức độ khó cao, tối ưu truy vấn, anh ấy có thể get hàng tỉ record chỉ dưới 0.1ms. Nhưng thời thế thay đổi, đã đến lúc anh ấy phải bắt kịp sự đổi mới và bắt tay dựng Web 3.0 và ứng dụng nó vào quán Bar của mình, do ở thời kì sơ khai John cho rằng CSDL chưa cần quá phức tạp nên anh ấy quyết định chỉ dùng một file json đơn giản nhưng lại hiệu quả cho quán bar của anh ấy.

Bài học rút ra: 
[🔑] Block chain là một cơ sở dữ liệu.

# User đầu tiên
Monday, March 18.

John đã tạo cho mình 1 triệu token đầu tiên.

Trong blockchain, token là một đơn vị bên trong blockchain database, nó có thể được quy đổi ra USD hay VND, tỉ lệ quy đổi của nó phụ thuộc vào lượng cung và lượng cầu của token. Mọi blockchain đều có **"Genesis"** file. File này được sử dụng để phân phối các token đầu tiên cho những người tham gia vào blockchain đó sớm.

Nào bắt đầu nhé, cùng tạo file genesis.json.

John bắt đầu với việc tạo một file genesis, anh tạo mới một file `./database/genesis.json`, anh ấy định nghĩa database của **The Blockchain Bar** sẽ có 1 triệu token và toàn bộ sẽ thuộc về John:
```json
{
  "chain_id": "the-simple-blockchain-ledger",
  "genesis_time": "2022-11-10T00:00:00.000000000Z",
  "balances": {
    "john": 1000000
  }
}
```

Và đương nhiên các token này phải có một ứng dụng đi kèm. Nên John quyết định, quán bar của mình từ giờ sẽ thanh toán bằng token TBB (The blockchain bar). John sẽ chỉ định giá ban đầu cho TBB, để đổi chúng qua USD, VND hay các loại fiat khác. Sau đó anh ấy in lại menu và dán nó trước cửa:

```shell
1 TBB token = 1€

| Item                      | Price   |
| ------------------------- | ------- |
| Vodka shot                | 1 TBB   |
| Orange juice              | 5 TBB   |
| Burger                    | 2 TBB   |
| Crystal Head Vodka Bottle | 950 TBB |
```

John cũng quyết định sẽ tự thưởng cho bản thân 100 TBB mỗi ngày, như là tiền cho một ý tưởng tuyệt vời, và để trả công cho việc bảo trì & nâng cấp TBB. 

## Fun fact
Những ETH ban đầu trên mạng Ethereum hiện nay cũng được tạo và phân phối cho nhà đầu tư sớm và developers tương tự như cách John đã làm.

# Tổng kết
### Tóm lại
[🔑] Block chain là một cơ sở dữ liệu. 

Tổng cung của token, số dư ban đầu của user, và các setting của blockchain sẽ được đặt ở Genesis file.

### Kết bài
Code của series: https://github.com/lequocbinh04/the-simple-blockchain

Nếu thấy hay hoặc có bất kì câu hỏi nào hãy để lại ở phần bình luận nhé. Ngoài ra hãy Up vote cho tớ nếu các bạn thấy bài viết thực sự hữu ích nhenn, cảm ơn mọi người nhiều.