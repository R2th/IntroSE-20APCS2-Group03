![](https://images.viblo.asia/12d94e09-7969-4855-b6fe-d081739fdd0b.png)

Sự ra đời của Bitcoin hứa hẹn mở ra một tương lai mới của ngành tài chính, ngân hàng khi người dùng không cần phụ thuộc vào bên trung gian, chịu phí giao dịch cao hay chờ cả tuần trời để nhận được tiền được gửi về từ người thân ở nước ngoài. Tuy nhiên, Bitcoin cũng bị mang tiếng xấu khi tiếp tay cho các hoạt đồng ngầm như rửa tiền hay mua bán vũ khí do tính chất ẩn danh của nó. Vậy, Bitcoin có thực sự hoàn toàn ẩn danh như chúng ta đã tưởng ?

> Bitcoin is a secure and anonymous digital currency --- WikiLeaks

> Bitcoin won’t hide you from the NSA’s prying eyes --- Wired UK

## 1. Về mặt thuật ngữ

**Anonymous** theo từ điển Cambridge giải nghĩa như sau:  `without the name of the author, giver etc being known or given` (dịch là vô danh).

**Pseudonymity** tạm dịch là khuyết danh.

Khi tham gia vào mạng Bitcoin, người dùng được định danh bằng địa chỉ tài khoản (address). Tuy không phải là tên thật nhưng cũng không hoàn toàn là vô danh trên mạng, nên nếu xét về mặt thuật ngữ chính cống thì Bitcoin chỉ được xem là **Pseudonymity** thay vì **Anonymous** . Tuy nhiên để đơn giản, chúng ta thường gọi Bitcoin là một hệ thống ẩn danh.

## 2. Tính ẩn danh

Một hệ thống hoàn toàn ẩn danh là một hệ thống đảm bảo rằng từ định danh trên hệ thống không thể hoặc rất khó để truy ra thông tin thật của các thành phần tham gia. Liệu Bitcoin có đảm bảo điều đó hay không ?

- Khi một node phát tán giao dịch của địa chỉ lên mạng, các node khác có thể biết địa chỉ IP của node từ đó truy ra vị các thông tin chẳng hạn như vị tri địa lý :fearful: 
- Bạn đi mua BTC trên các sàn giao dịch và cần cung cấp các thông tin như thẻ tín dụng, email ... Thông tin cá nhân.
- Ví như bạn mua đi mua 1 cốc cà phê bằng Bitcoin, người chủ quán sẽ biết được địa chỉ bitcoin này là của bạn.
- Các thông tin về mọi giao dịch (người gửi, người nhận, giá trị) đều được public trên blockchain. Nếu tài khoản của bạn bị gán với định danh thật thì người ta có thể xem được toàn bộ lịch sử giao dịch của bạn.

## 3. Mixing

**Một số lưu ý**:
- Thông thường, các input của giao dịch đến từ một tài khoản. Tuy nhiên, giao thức Bitcoin không yêu cầu các input của một giao dịch phải cùng đến từ 1 tài khoản. 
- Địa chỉ được trả lại tiền thừa trong output của giao dịch không nhất thiết phải giống địa chỉ ở input.Thường thì ở các ví địa chỉ ở output sẽ là một địa chỉ khác của người gửi.
- Tuy đã đổi địa chỉ sau mỗi lần giao dịch nhưng việc input của giao dịch chỉ có một tài khoản nên việc truy vết người nhận cũng như giá trị giao dịch cũng không mấy khó khăn.

**Mixing** là dịch vụ sẽ gộp nhiều input từ nhiều tài khoản khác nhau, điều đó sẽ khiến việc truy vết output nào của tài khoản nào sẽ khó khăn hơn rất nhiều.

![](https://images.viblo.asia/879ca440-d5e5-4ed3-94d4-f5982ecee576.png)

Chúng ta cùng quan sát hình minh họa bên trên khi giao dịch 2 sử dụng giao thức **CoinJoin**:
- Giao dịch 2 có 3 input: 1 của địa chỉ **1C3**, 2 của **1A1**
- Giao dịch có 2 output đều có giá trị 0.8 BTC, đều này sẽ gây khó khăn hơn cho việc truy vết giao dịch.

Độ khó sẽ càng tăng cao hơn khi input giao dịch đến từ 10-20 hay thậm chí 50 tài khoản khác nhau :smirk: 

Các bạn có thể tham khảo thêm 2 giao dịch sau sử dụng lần lượt [2 input](https://chain.localbitcoins.com/tx/c38aac9910f327700e0f199972eed8ea7c6b1920e965f9cb48a92973e7325046) và [3 input](https://chain.localbitcoins.com/tx/92a78def188053081187b847b267f0bfabf28368e9a7a642780ce46a78f551ba).

Có 2 loại dịch vụ **Mixing**:
1. Tập trung (Centralized): Bạn cần tin tưởng vào dịch vụ, các dịch vụ tập trung kiểu này có thể lừa đảo (với dịch vụ ko uy tín) hoặc sử dụng trái phép các thông tin giao dịch của bạn như cung cấp cho bên thứ 3 chẳng hạn. Các dịch vụ tương đối nổi tiếng như [SmartMix](https://smartmix.io/) hay [ChipMixer](https://chipmixer.com/)
2. Phi tập trung (Decentralized): Giải quyết được các vấn đề tồn tại của các dịch vụ **Mixing tập trung**. Phần này chúng ta sẽ tìm hiểu về [CoinJoin](https://en.bitcoin.it/wiki/CoinJoin).



Các ví có tích hợp **CoinJoin** như [Wasabi](https://www.wasabiwallet.io/) hay [Samourai](https://samouraiwallet.com/dojo). Các ví này còn tích hợp thêm giao thức **TOR** để ẩn địa chỉ IP của bên gửi :clap:

## 4. ZeroCoin/ZeroCash

### Zero Knowledge Proof (ZKP)

Trước khi tìm hiểu ZeroCoin/ZeroCash là gì ? Chúng ta sẽ cùng xem qua **Zero Knowledge Proof** (Một cơ chế quan trọng được dùng trong ZeroCoin/ZeroCash).

ZKP có 2 thành phần: **Verifier** và **Prover**. Cơ chế ZKP đạt được khi **Prover** chứng minh cho **Verifier** rằng mình biết điều này nhưng không cần tiết lộ chi tiết về thông tin.

Nghe có vẻ hơi khó hiểu :confused: Chúng ta sẽ có minh họa bằng một ví dụ đơn giản sau:
- Alice có 2 quả bóng kích thước giống hệt nhau, chỉ khác về màu sắc. Tuy nhiên, cô bị mù màu nên không thể phân biệt được sự khác nhau về màu sắc giữa 2 quả bóng và cho rằng 2 quả bóng không khác gì nhau.
- Bob nói với Alice rằng: "2 quả bóng này có màu khác nhau đấy". Nhưng làm sao Alice có thể biết được rằng Bob không nói dối ?
- Alice sẽ quy ước với Bob về số hiệu của 2 quả bóng (quả bên tay trái là quả số 1, quả bên tay phải là quả số 2 chẳng hạn). 
- Tiếp đó,cô dấu 2 quả bóng sau lưng và xáo chúng đi rồi đưa ra 1 quả bóng cho Bob xem. Cứ như vậy nhiều lần, nếu lần nào Bob cũng nói đúng số hiệu của quả bóng thì Alice tin được rằng Bob không nói dối do nếu Bob nói dối thì xác xuất đoán mò mỗi lần là 0.5 (nếu nhiều lần thì xác xuất đoán mò đúng hết của Bob sẽ là cực kỳ thấp) .
- Bob đã chứng minh cho Alice tin rằng 2 quả bóng có màu khác nhau nhưng không cần tiết lộ chi tiết về màu sắc của 2 quả bóng.

![](https://images.viblo.asia/b1075da0-6d21-441a-a359-0b37c86d29be.png)

Nếu muốn tìm hiểu chi tiết hơn về **Zero Knowledge Proof** thì các bạn có thể tham khảo bài viết  [Zero Knowledge Proof và privacy trên Blockchain - Part 1](https://viblo.asia/p/zero-knowledge-proof-va-privacy-tren-blockchain-part-1-Do754pq05M6) của tác giả [Nguyen Anh Tien](https://viblo.asia/u/vigov5).


### ZeroCoin

ZeroCoin là giao thức được đề xuất bởi một nhóm các nhà khoa học thuộc các đại học hàng đầu thế giới như MIT, Tel Aviv, Johns Hopkins nhằm tăng tính riêng tư, ẩn danh trên mạng Bitcoin. ZeroCoin sử dụng các thuật toán mã hóa và cơ chế ZKP nhằm ẩn giấu hoàn toàn nguồn gốc các giao dịch, ngăn chặn sự truy vết giao dịch và định danh tác nhân trên mạng. 

Mục tiêu của các nhà phát triển ZeroCoin nguyên văn là:
> Our goal is to build a cryptocurrency where your neighbors, friends and enemies can’t see what you bought or for how much.

Nôm na là xây dựng một hệ thống tiền kỹ thuật số hoàn toàn ẩn danh, nơi mà bạn sẽ không thể bị truy vết :metal:

**Lưu ý**: ZeroCoin chưa được triển khai trên mạng Bitcoin vì khi implement ZeroCoin cần phải thực hiện ở tầng giao thức, độ phức tạp cao cũng như cần sự đồng thuận từ cộng đồng cũng như đội ngũ phát triển.

#### Ý tưởng

Ý tưởng của ZeroCoin nhằm giúp ẩn danh trên Bitcoin là đổi từ một lượng Bitcoin này thành một lượng Bitcoin tương ứng thông qua đồng trung gian có tên là **zerocoin**. Từ đó, việc truy vết giao dịch sẽ là bất khả thi vì lượng Bitcoin ban đầu không có liên hệ gì với lượng Bitcoin được chuyển đổi. Hình thức này có sự tương đồng với việc rửa tiền được thực hiện bởi các cá nhân hay tổ chức phi pháp.

![](https://images.viblo.asia/72a81213-2085-4222-a03e-f7d1228f5253.png)

#### Cụ thể quá trình 

**Quy đổi bitcoin ra zerocoin**

1. Tạo một số seri **S** và một số bí mật **r**.
2. Tính Commit(S, r). Commitment scheme là một thuật toán ở mã, trong phạm vi bài viết chúng ta sẽ không tìm hiểu chi tiết về thuật toán này. Nếu muốn tìm hiểu thêm các bạn có thể tham khảo ở [đây](https://en.wikipedia.org/wiki/Commitment_scheme)
3. Publish commitment lên blockchain. List commiment được ký hiệu {c1, c2, ..., cn}.

![](https://images.viblo.asia/aa8b5ecf-9158-4e03-8675-e0d6212528b0.png)

**Quy đổi lại zerocoin thành bitcoin**

Với giao dịch quy đổi lại **zerocoin** thành **bitcoin**, người dùng cần chứng minh mình là người đã tạo ra lượng **zerocoin** đó. Nói chi tiết hơn là chứng minh mình là người biết số bí mật **r** của một trong các commitment đang được lưu trên blockchain.

1. Tạo giao dịch có kèm theo số seri **S** (tiết lộ S). Có nghĩa là: "Tôi biết một số **r** mà **Commit(S, r)** thuộc {c1, c2, ..., cn}".
2. Miner sẽ xác nhận giao dịch. Với số seri **S**, miner có thể kiểm tra xem **S** có thuộc một trong các **commitment** hay không nhưng sẽ không biết cụ thể số seri **S** là thuộc **commitment** nào ? (Miner chỉ biết **S** chứ không biết **r**).
3. Kiểm tra số seri **S** đã được dùng trong giao dịch nào chưa ? (tránh double-spend).
4. Output giao dịch là lượng bitcoin quy đổi.

![](https://images.viblo.asia/386e0b93-c72e-424e-bced-f63323cf4387.png)

**Tính ẩn danh**

Yếu tố làm nên sự ẩn danh của zerocoin qua 2 quá trình trên:
- Trong suốt quá trình, **r** không bị lộ.
- Không ai biết số seri **S** nào tương ứng với lượng **zerocoin** nào. Từ đó mất dấu liên hệ giữa đồng Bitcoin ban đầu dùng đổi quy đổi thành **zerocoin** và đồng Bitcoin mới.

**Hạn chế**

-  Phức tạp, cần phải triển khai ở tầng giao thức (protocol). Cần sự đồng thuận của đông đảo cộng đồng và đội ngũ phát triển.
- Do dùng cơ chế quy đổi và các hàm mã hóa nên zerocoin rất chậm (khoảng 2 tx/s).
- Chưa ẩn được giá trị của giao dịch.

### ZeroCash

ZeroCash là người kế nhiệm của ZeroCoin nhằm khắc phục các hạn chế của người anh em. ZeroCash là nền tảng để đội ngũ phát triển tạo ra 1 đồng coin mới là [Zcash](https://z.cash/).


Đặc điểm của ZeroCash:
- Sử dụng một kỹ thuật mới có tên là `zero-knowledge succinct noninteractive arguments of knowledge` (zk-SNARKs).
- Nhanh hơn ZeroCoin.
- Ẩn đi giá trị input giao dịch.

Về chi tiết kỹ thuật của **ZeroCash** được áp dụng trong  [Zcash](https://z.cash/), xin phép được hẹn các bạn ở một bài viết không xa.


## Kết luận

Trong bài viết này, mình đã giới thiệu về các khái niệm, các phương thức, giao thức ẩn danh áp dụng trên Bitcoin. Tất nhiên vẫn còn thiếu sót một số cái tên chưa được đề cập đến như [CoinWitness](https://bitcointalk.org/index.php?topic=277389.0), v..v. Phần mô tả giao thức ZerCoin cũng mới chỉ tiếp cận về mặt khái niệm, tư tưởng chứ chưa đi sâu, chi tiết các hoạt động của thuật toán. Trong một ngày không xa, hẹn gặp lại mọi người trong bài viết về **Zcash** :vulcan_salute: 

## Tài liệu tham khảo 
[Bitcoin and Cryptocurrency Technologies](https://www.coursera.org/learn/cryptocurrency)

[Bitcoin Magazine](https://link.sun-asterisk.vn/tHdZ07)

[BitCoin Wiki](https://en.bitcoin.it/wiki/CoinJoin)

 [Zero Knowledge Proof và privacy trên Blockchain - Part 1](https://viblo.asia/p/zero-knowledge-proof-va-privacy-tren-blockchain-part-1-Do754pq05M6)
 
https://medium.com/cobo-vault/bitcoin-mixing-a-brief-research-into-centralized-vs-decentralized-390ea83fa6ad