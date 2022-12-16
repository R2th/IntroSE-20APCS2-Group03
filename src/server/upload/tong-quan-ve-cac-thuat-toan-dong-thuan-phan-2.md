Tiếp tục với các consensus đầy mới lạ nào . Bài viết chỉ mang tính chất giới thiệu là chính nên sẽ không đi sâu vào phân tích . Trong tương lai hi vọng sẽ có những bài chi tiết hơn để gửi đến bạn đọc gần xa.

![](https://images.viblo.asia/a07c28f9-4f23-4218-adcd-92f4da1d46d2.png)


## 8. Delayed Proof-of-Work
#### Ưu điểm 
- Tiết kiệm năng lượng
- Tăng cường tính bảo mật

#### Nhược điểm
- Chỉ các blockchains sử dụng PoW hoặc PoS mới có thể là một phần của sự đồng thuận này.
- Khi chế độ **Notaries Active** thì phải điều chỉnh lại hashrate cho các node khác nhau ( bao gồm cả node thường và notary node ) phần này sẽ được giải thích bên dưới 

#### Được sử dụng 
- Komodo

**Type :** Đồng thuận hợp tác (Collaborative consensus) .

#### Giải thích 
Delayed Proof of Work (dPoW) là một phương pháp đồng thuận lai cho phép một blockchain tận dụng bảo mật của một blockchain thứ hai. Điều này sẽ đạt được thông qua một nhóm các notary node ( có thể hiểu là các node nhân chứng ) , Các node này sẽ add data từ blockchain thứ nhất vào blockchain thứ hai 

![](https://images.viblo.asia/8a4b21b1-453d-4ebe-98d4-7f315b0c98fa.png)

Blockchain dựa trên dPoW có thể sử dụng Proof of Work (PoW) hoặc Proof of Stake (PoS) để hoạt động hay nó có thể tự gắn vào bất kỳ blockchain chạy PoW nào mong muốn. Mà hashrate của Bitcoin hiện tại là cao nhất trong các blockchain sử dụng PoW . Hình minh họa dưới đây cho thấy mối quan hệ giữa các blockchain trong dPoW :
![](https://images.viblo.asia/bfe132bf-d1e0-41f0-a45f-48345d243e26.png)

Có 2 loại node trong hệ thống dPoW đó là notary nodes và normal nodes. Sẽ có 64 notary nodes được bầu bởi dPoW blockchain stakeholders để thêm (notarize) các khối được xác thực từ blockchain dPoW vào blockchain PoW. Khi một khối đã được hoàn thành, hash của nó được thêm vào giao dịch Bitcoin được ký bởi 33 notary nodes, tạo ra một bản record dPoW block hashes trên blockchain Bitcoin, và chúng cũng đã công chứng ( notarize ) bởi các nhóm chính các node trong notary nodes

Để ngăn chặn mining wars giữa các notary node (điều mà sẽ làm giảm hiệu quả của network ), Komodo đã sử dụng một phương pháp khai thác theo **Round-robin** hoạt động với hai chế độ. Chế độ **"No Notary"** cho phép tất cả các node trên mạng mine blocks, tương tự như cơ chế PoW truyền thống; tuy nhiên, trong chế độ **"Notaries Active"**, các **notaries** sẽ khai thác lần lượt. Trong sơ đồ này,bằng cách mỗi notary được phép khai thác một khối với mức độ khó hiện tại, trong khi các nút notary khác phải khai thác ở mức độ khó cao hơn 10 lần và tất cả các normal node sẽ luôn khai thác với độ khó gấp 100 lần các notary node. Và điều này dẫn đến hashrate của các notary miner sẽ khác với các normal miner.

Hệ thống dPoW cũng được thiết kế để cho phép blockchain tiếp tục hoạt động mà không cần notary nodes. Trong tình huống như vậy, blockchain dPoW có thể tiếp tục hoạt động dựa trên phương pháp đồng thuận ban đầu của nó; tuy nhiên, nó sẽ không còn mang tính bảo mật cao của của blockchain thứ 2 gắn vào.

![](https://images.viblo.asia/0e2fa897-695b-40ee-9374-47655fe2c66c.png)
Delayed Proof of Work cho phép tăng cường bảo mật và giảm mức sử dụng năng lượng cho bất kỳ blockchain nào sử dụng phương pháp đồng thuận này. Ví dụ, vì Komodo sử dụng thuật toán băm Equihash để ngăn chặn việc khai thác bằng ASIC và dựa vào phương pháp khai thác **round-robin** cho các notary node, điều này sẽ giảm khả năng các miner phải cạnh tranh nhau dẫn đến việc lãng phí điện và tiền mua phần cứng mạnh .

## 9. Proof of Capacity aka Proof of Space
#### Ưu điểm 
- Tương tự như PoW nhưng sử dụng space thay vì tính toán. Như vậy thân thiện với môi trường nhiều.
- Có thể được sử dụng để phát hiện malware, bằng cách xác định xem bộ đệm L1 của bộ xử lý có trống không.
- Có thể được sử dụng như các biện pháp anti-spam và từ chống denial of service attack.

#### Nhược điểm
- Người tham gia hệ thống đc ít lợi nhuận.

#### Được sử dụng 
- Burstcoin, Chia, SpaceMint

**Type :** Đồng thuận hợp tác (Collaborative consensus) .

#### Giải thích 
Proof-of-space (PoSpace) hoặc cũng có thể gọi là Proof-of-capacity (PoC) là một phương pháp bằng cách phân bổ bộ nhớ hoặc dung lượng ổ đĩa để giải quyết bài toán do nhà cung cấp dịch vụ đưa ra. Khái niệm này được xây dựng bởi Dziembowski et al. vào năm 2015. 

Proof of Space khá giống với Proof of Work, ngoại trừ việc thay vì sử dụng khả năng tính toán thì sẽ khả năng lưu trữ. 

Proof-of-space là một phần dữ liệu mà **prover** gửi đến **prover** khác để xác minh rằng mình đã dành một lượng không gian nhất định. Một cách để triển khai PoSpace là sử dụng [hard-to-pebble graphs](https://en.wikipedia.org/wiki/Graph_pebbling). Sau đó một trình xác minh sẽ yêu cầu prover đánh label cho hard-to-pebble graph. Prover sẽ commits các label. Sau đó trình xác minh sẽ yêu cầu prover mở một số vị trí ngẫu nhiên trong commit.

Proof of Space được cho là một giải pháp công bằng hơn , tích kiệm hơn so với Proof of Work.

Tài liệu : [Proof of Space](https://en.wikipedia.org/wiki/Proof_of_space)

## Proof of History

#### Sử dụng 
- Solana
{@embed: https://www.youtube.com/watch?v=rywOYfGu4EA&feature=emb_logo}

#### Giải thích 
Ý tưởng ở đây là thay vì tin tưởng vào timestamp của giao dịch, thì chúng ta chứng minh rằng giao dịch này xảy ra trước hoặc sau một sự kiện nào đó.

Ví dụ khi chúng ta chụp ảnh với trang bìa của một tạp trí, điều đó có nghiã là chúng ta đang tạo một bằng chứng cho thấy rằng bức ảnh của chúng ta được chụp sau khi tờ báo đó được xuất bản. Với Proof of History, bạn có thể tạo một " bản ghi lịch sử " chứng minh rằng một sự kiện đã xảy ra tại một thời điểm cụ thể.

Triển khai cụ thể đó là sử dụng hàm băm (SHA256) chạy liên tục với đầu ra trước đó được sử dụng làm đầu vào tiếp theo. Vì thế, chúng ta có thể chắc chắn rằng thời gian thực đã trôi qua

![](https://images.viblo.asia/23328ed1-f93a-4a27-a2e0-1c4904f88160.png)

Tài liệu : [Proof of History](https://medium.com/solana-labs/proof-of-history-a-clock-for-blockchain-cf47a61a9274)

## 10. Proof of Stake Velocity

#### Sử dụng 
- [Reddcoin](https://www.reddcoin.com/)

#### Giải thích 
Proof of Stake Velocity (PoSV) được đề xuất thay thế cho Proof of Work (PoW) và Proof of Stake (PoS) để tăng tính bảo mật của mạng peer-to-peer và confirm các transaction của Reddcoin ( một loại cryptocurrency ). Bản chất họ định nghĩa từ velocity là vận tốc và được hiểu là tốc độ tiền được trao đổi trong một nền kinh tế .Vận tốc càng cao thì thấy nền kinh tế đó càng phát triển .PoSV được thiết kế để khuyến khích cả việc tích trữ và trao đổi như một loại tiền tệ thực sự. Tóm lại là càng giao dịch nhiều càng có lợi cho người dùng .

Tài liệu : [Proof of Stake Velocity](https://www.reddcoin.com/papers/PoSV.pdf)

## 11. Proof of Importance
#### Sử dụng 
- [Nem](https://nem.io/)

#### Giải thích 
Mạng lưới đồng thuận của NEM không chỉ phụ thuộc vào số lượng coin mà còn phụ thuộc vào việc trả tiền cho việc vận hành. Khi stacking việc được lựa chọn phụ thuộc vào nhiều yếu tố khác nhau, bao gồm sự "nổi tiếng", balance và số lượng giao dịch được thực hiện từ node đó. Điều này được gọi là **tính toán quan trọng** ( importance calculation ). Nó mang đến một góc nhìn bao quát hơn về một thành viên tham gia hệ thống.

Để đủ điều kiện tham gia **tính toán quan trọng**, node đó cần có ít nhất 10.000 XEM trong số dư của mình. Hiện chỉ có khoảng dưới 9 tỷ XEM đang lưu hành, đạt được mục tiêu đó thực sự không quá khó. Có thể ngưỡng 10.000 XEM này sẽ được thay đổi trong tương lai, nhưng hiện tại, nó vẫn như vậy. Nhưng việc tính toán tầm quan trọng được thực hiện bằng cách sử dụng một thuật toán cụ thể, không chỉ bằng xác suất và số lượng họ staking.

Điều quan trọng cần lưu ý về proof of importance của NEM đó là nó có khả năng chống lại sự thao túng . Các cuộc tấn công Sybil và loop attack sẽ ít cơ hội thành công hơn bằng cách sử dụng các cơ chế cơ bản của sự đồng thuận này. Mặc dù nghe có vẻ giống proof of stack nhưng đc đánh giá trên nhiều tiêu chí hơn.

Tài liệu : [Proof of Importance](https://nemplatform.com/wp-content/uploads/2020/05/NEM_techRef.pdf#section.7)

## 12. Proof of Burn
#### Sử dụng 
- Slimcoin, TGCoin (Third Generation Coin)
#### Giải thích
Proof of Burn thực chất đó là gửi coin đến một địa chỉ nơi chúng không thể khôi phục được. Bằng cách này bạn có được quyền để mine trên hệ thống ngoài ra còn phải dựa trên việc chọn ngẫu nhiên nữa .

Tùy thuộc vào việc proof of burn được triển khai thế nào, các miner có thể đốt coin của blockchain hiện tại hoặc một blockchain khác như bitcoin. Bạn càng đốt nhiều coin, bạn càng có nhiều cơ hội được chọn để khai thác khối tiếp theo.

Theo thời gian, tỉ lệ của bạn trong hệ thống sẽ giảm, vì vậy bạn sẽ phải đốt thêm coin để tăng tỷ lệ bạn được chọn . (Quá trình này bắt chước quy trình khai thác bitcoin, nơi bạn phải liên tục đầu tư vào các thiết bị máy tính hiện đại hơn để duy trì sức mạnh băm.)

Mặc dù đây là một giải pháp thay thế thú vị cho Proof of work, nhưng nó lại làm lãng phí tài nguyên không cần thiết.

## 13. Proof Of Activity
#### Sử dụng 
- [Decred](https://www.decred.org/)
#### Giải thích
Để tránh việc xảy ra siêu lạm phát (điều xảy ra khi có quá nhiều coin trên hệ thống) bitcoin sẽ chỉ tạo ra 21 triệu bitcoin. Điều đó có nghĩa là, đến một lúc nào đó, phần thưởng khối bitcoin sẽ kết thúc và những người khai thác bitcoin sẽ chỉ nhận được phí giao dịch.

Một số người đã suy đoán điều này có thể gây ra các vấn đề bảo mật do mọi người hành động đều vì lợi ích cá nhân và làm hỏng hệ thống. Vì vậy, bằng chứng về hoạt động đã được tạo ra như một cấu trúc có thể thay thế cho consensus của bitcoin hiện tại. Proof of activity là một phương pháp lai kết hợp cả bằng proof of work và và proof of stack.

Trong Proof of activity, khai thác bắt đầu theo kiểu proof of work truyền thống, với các thợ mỏ đua nhau giải một câu đố mật mã. Khi số coin không phát hành nữa thì hệ thống chuyển sang proof of stack. Càng sở hữu nhiều đồng coin, càng có nhiều khả năng được chọn.

## 14. Proof of Time
#### Sử dụng 
- [Chronologic](https://chronologic.network/)
#### Giải thích
Bằng chứng về thời gian được giới thiệu bởi Chronologic. Họ đang lên kế hoạch xây dựng một blockchain riêng. Như tuyên bố của nhà phát triển chính của họ:

Về ý tưởng họ tạo ra một kiến trúc Kiến trúc **Ethereum Alarm Clock** được mô tả gồm hai thành phần là symbiotic và differential. Thành phần đầu tiên là  Ethereum Alarm Clock thực chất là các hợp đồng thông minh. Chúng được triển khai vào chuỗi chính Ethereum và hoạt động một cách đáng tin cậy. Thành phần thứ hai là **TimeNode network**. TimeNodes là các tác nhân thực thi ngoài chuỗi chịu trách nhiệm xử lý logic của các lần thực thi. 

![](https://images.viblo.asia/ae7f4ebe-de13-4a37-956e-654c08972663.png)

Tài liệu : [Proof of Time](https://chronologic.network/uploads/Chronologic_Whitepaper.pdf)

## 15. Proof of Existence
#### Sử dụng 
- [Poex.io](https://poex.io/) 
- HeroNode 
- [DragonChain](https://dragonchain.com/)
#### Giải thích
Proof of Existence là một service xác minh sự tồn tại của các tệp máy tính tại một thời điểm cụ thể thông qua các giao dịch được đánh dấu thời gian trong blockchain bitcoin.

Nó đã được đưa ra vào năm 2013 như là một dự án nguồn mở. Nó được phát triển bởi Manuel Araoz và Esteban Ordano.

## 16. Ouroboros
#### Sử dụng
- [Cardano](https://www.cardano.org/)
#### Giải thích
Nó là một biến thể của Proof-of-stake (được bổ xung thêm tính bảo mật) được Cardano sử dụng.

Tài liệu : [Ouroboros](https://eprint.iacr.org/2016/889.pdf)
## 17. Proof of Retrievability
#### Sử dụng 
- [Microsoft](https://www.youtube.com/watch?v=uJqe6XUEWd4)
#### Giải thích
Proof of Retrievability (POR) được mô tả là phương thức chứng minh tính toàn vẹn của file F mà client tải về theo nghĩa client có thể khôi phục đc nó. Vì POR có độ phức tạp khi truyền thấp hơn so với việc truyền trực tiếp file, vì thế nó là giải pháp hấp dẫn cho các hệ thống lưu trữ từ xa có độ đảm bảo cao. Nó có thể thực sự hữu ích như một thuật toán đồng thuận cho các hệ thống Cloud.

Tài liệu : [Proof of Retrievability](https://eprint.iacr.org/2008/175.pdf)

## Reference
ConsensusPedia: [An Encyclopedia of 30+ Consensus Algorithms](https://medium.com/hackernoon/consensuspedia-an-encyclopedia-of-29-consensus-algorithms-e9c4b4b7d08f)