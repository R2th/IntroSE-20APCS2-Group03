![](https://academy.binance.com/_next/image?url=https%3A%2F%2Fimage.binance.vision%2Fuploads%2F4dc404895e764b2aa577167157119233.png&w=750&q=75)

**TL;DR**

Ethereum 2.0 là một bản nâng cấp đã được mong đợi từ lâu, hứa hẹn những cải tiến quan trọng. Nổi bật nhất là [Proof of Stake (PoS)](https://en.wikipedia.org/wiki/Proof_of_stake), shard chains và beacon chain. Từng bước một, chúng sẽ đến tay người dùng một cách lần lượt kể từ ngày 1/12/2020. 
Bên cạnh đó, sẽ có những điểm thay đổi nhỏ khác cũng hết sức đáng, tạo ra những ảnh hưởng nhất định đến cộng đồng người dùng rộng lớn.

# Giới thiệu
Từ sự ra đời của Ethereum, các công nghệ mới liên tục phát triển dựa trên nó với hình thức [Dapp](https://ethereum.org/en/developers/docs/dapps/) hoặc mạng blockchain mới dựa trên Ethereum. DeFi - xu hướng nổi đình đám của năm nay, cũng là một trong số chúng.

Tuy nhiên, tính khả mở của mạng bắt đầu nảy sinh vấn đề, thể hiện rõ nhất ở số lượng giao dịch cũng như phí giao dịch (gas) tăng một cách chóng mặt. Vốn được coi là cuộc cách mạng của Internet - Web 3.0, Ethereum, nếu không giải quyết được bài toán kinh tế, thì hoàn toàn không có nhiều giá trị thực tiễn.
Và đó là lý do Ethereum 2.0 ra đời, hứa hẹn giải quyết đến đề về sự khả mở. 

# 1. Khác biệt của Ethereum 2.0
Ethereum 2.0 (còn được gọi là Serenity) sẽ nâng cấp về tốc độ, hiệu suất và tính khả mở mà không hề đánh đổi về tính bảo mật, và phi tập trung vốn có. Sự nâng cấp này sẽ mất vài năm đề tiến hành (theo cách bảo mật và phi tập trung).

Vậy hãy điểm qua những sự khác biệt lớn của Ethereum 2.0 so với phiên bản hiện tại.

## Proof of Stake
![](https://static.ffbbbdc6d3c353211fe2ba39c9f744cd.com/wp-content/uploads/2020/11/26153303/PoS-vs-PoW.jpg)

[Proof of work (PoW)](https://en.wikipedia.org/wiki/Proof_of_work) là cách giúp mạng bảo mật và tạo ra các block mới bằng việc thưởng cho các miner (người tạo ra và xác thực các block đó). Không may, khi mạng blockchain lớn dần, đồng nghĩa với sức mạnh tính toán cũng cao hơn để mining ra một 1 block. Tính khả mở là bài toán đau đầu cho các mạng blockchain dùng PoW.

[Proof of Stake (PoS)](https://en.wikipedia.org/wiki/Proof_of_stake) thay thế miner bằng validator. Trong Ethereum 2.0, các validator (những người đã cọc ít nhất 32ETH vào một contract đặc biệt) có 2 nhiệm vụ là tạo block và xác thực các block (do validator khác tạo). Phần thưởng (nếu không gian lận) sẽ phụ thuộc vào lượng ETH mà validator này đã cọc. Staking được cho là cách tốt để thưởng/phạt các validator. Ví dụ, một validator có thể bị phạt một phần khoản cọc nếu họ offline, hay thậm chí toàn bộ với những hành vi cố tình gian lận. 

=> Giống như trước, một block chỉ được thêm vào mạng blockchain khi nó được các validator khác xác thực. Tuy nhiên, quá trình này rõ ràng yêu cầu sức mạnh tính toán không đáng kể (so với mining).



## Shard Chains
Hiện tại, bất cứ ai muốn truy cập Ethereum cần thông qua một node. Mỗi node chứa một bản sao của toàn bộ các giao dịch từng tồn tại trong mạng.
Shard chains thì khác ở chỗ, chỉ chứa một phần của blockchain, cho phép các node chỉ cần quản lý một "lát cắt" của mạng. Theo dự đoán, Ethereum 2.0 sẽ có 64 shards, đồng nghĩa thông lượng được tăng lên gấp 64 lần. 

## Beacon Chain
Với việc các shard chains hoạt động song song, vậy thứ gì đảm bảo rằng chúng đồng bộ với nhau? Đó chính là nhiệm vụ của **beacon**. Nó đưa sự đồng thuận đến với các shard chain vốn đang làm việc song song với nhau.

Vì lý do đó, beacon nắm vai trò trung tâm và là tính năng mới đầu tiên xuất hiện trên bản cập nhật Ethereum 2.0. Nếu không có nó, việc chia sẻ thông tin giữa các shards là bất khả thi, và lúc đó tính khả mở cũng không còn nữa.

> Một khi cả 3 tính năng mới được cập nhật, Ethereum 2.0 có thể đạt tới 100,000 giao dịch/s, so với hiện tại chỉ tối đa 15 giao dịch/s.

# 2. Roadmap cập nhật Ethereum 2.0
Như đã đề cập, Ethereum 2.0 sẽ không được cập nhật toàn bộ trong một lần, mà được chia ra làm 3 giai đoạn gắn với những tính năng nhất định để đảm bảo không gây ra lỗi.

## Giai đoạn 0
Giai đoạn này gồm sự ra mắt của beacon chain (như đã nêu ở trên, do nó là trung tâm của shard chain), nhưng không bao gồm shard chains. 
Bên cạnh đó, các validator được phép ứng tuyển bằng cách cọc ETH vào một contract. Điểm lưu ý ở đây, ETH này sẽ bị khoá và không thể rút ra cho đến khi shard chains được triển khai đầy đủ (trong giai đoạn tiếp theo).

*Giai đoạn này bắt đầu từ 1/12/2020. Contract yêu cầu tối thiểu 524,288 ETH để hoạt động.*
## Giai đoạn 1/1.5
Kết hợp giữa 2 giai đoạn 1 và 1.5. Giai đoạn 1 mang đến shard chains, cho phép validator tạo block qua PoS. Giai đoạn 1.5 là lúc mainnet của Ethereum triển khai shard chain và bắt đầu chuyển giao từ PoW sang PoS.

*Dự kiến bản cập nhật này được triển khai trong năm 2021.*

## Giai đoạn 2
Giai đoạn cuối cùng, khi Ethereum 2.0 hỗ trợ hoàn toàn shard chain và trở thành mạng Ethereum chính thức. Lúc đó, smart contract có thể hoạt động được trên shard chain, cho phép các Dapp và công nghệ mới được phát triển trên Ethereum 2.0.

*Giai đoạn này dự kiến được tiến hành trong năm 2021 hoặc muộn hơn.*


> Để có cái nhìn chi tiết về shard chains hay baecon chain, bạn đọc có thể tham khảo ở https://ethereum.org/en/eth2
# 3. Tác động của Ethereum 2.0
## Tác động về giá ETH
Giá ETH đang phản ứng tích cực với bản nâng cấp này. Tuy nhiên, nó cũng một phần do xu hướng tăng giá crypto chung và sự bùng nổ DeFi.
Tương lai của ETH được dự đoán là khá sáng sủa, và đương nhiên, còn phụ thuộc vào những ứng dụng thực tế trên mạng Ethereum.

![](https://pbs.twimg.com/media/Enk9qJBXIAAG5Su?format=jpg&name=small)

## Tính bảo mật
Bản cập nhật này tuy đã được tính đến bảo mật nhưng vẫn chưa chắc chắn là an toàn cho người dùng. Một số chuyên gia tranh cãi rằng PoS thậm chí còn mang tính tập trung hoá hơn PoW.
Cho đến nay, Ethereum Foundation vẫn đang thuê các tổ chức khác để kiểm chứng tính bảo mật.

## Staking
Một điểm nổi bật trong Ethereum 2.0 là staking. Thực tế, nó khá khó tiếp cận với người dùng phổ thông bởi ngưỡng tối thiểu để trở thành validator là 32ETH (tương đương với $19,000 tại thời điểm viết bài). Tuy nhiên, lúc đó, những dịch vụ staking pool sẽ nở rộ, phát sinh những vấn đề về tính phi tập trung của mạng.


# Kết luận
Bản nâng cấp này là minh chứng rõ nhất cho việc Ethereum đang trải qua quá trình thay đổi để đáp ứng với nhu cầu của cộng đồng. 


# Tài liệu tham khảo
* https://en.wikipedia.org/wiki/Proof_of_stake
* https://ethereum.org/en/developers/docs/dapps/
* https://academy.binance.com/en/articles/what-is-ethereum-2-0-and-why-does-it-matter
* https://decrypt.co/resources/what-is-ethereum-2-0