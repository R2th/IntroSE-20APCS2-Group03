## Tại sao nên đọc bài này

- Overview về Web3 layer, cụ thể thì làm “blockchain” là làm ở đâu
- Hiểu thêm về cách Web3 vận hành

## Web3 stack

Lúc mới bắt đầu định viết thì thấy mấy bài này ở cũng khá nhiều rồi (Cả tiếng Anh lẫn tiếng Em) nên mình sẽ làm hơi khác đi một xíu. Mỗi phần sẽ bao gồm

- Layer này là gì? Dùng để làm gì
- Kĩ năng cần để work ở layer này
- Cơ hội nghề nghiệp


💡 *Web3 stack này sẽ được chia và viết theo hướng Technical (Nghĩa là giải quyết vấn đề technical gì và kĩ năng làm việc ở stack đó).
Nếu các bạn muốn nhìn theo góc nhìn về Biz hay định nghĩa cơ bản thì kéo xuống đọc bài của Coinbase sẽ ok hơn nhé*


![Web3 Stack theo định nghĩa của Alchemy](https://images.viblo.asia/d2b23134-6f46-4e8b-b05b-fae2dc9d336d.png)

Web3 Stack theo định nghĩa của Alchemy

Let’s get started 🚀

## Network layer

**Định nghĩa**: Network layer là cái tầng cơ bản nhất ở Blockchain hay Web3. Nó sẽ thực hiện việc kết nối các node lại tạo thành một network hoàn chỉnh. Nhận transaction và phân phối cho các node. Quy định thuật toán động thuận và hiện thực các thuật toán về trả thưởng, staking,…

Nói đơn giản thì nó như mạng viễn thông kiểu (Viteo, Mobi, Vina) vậy, kết nối cuộc gọi với hai bên, charge phí,…

**Problem nó giải quyết**: Hiện thực được một mạng lưới Decentralize

- Handle một node join/leave network
- Handle transaction
- Handle khi các node trả về kết quả khác nhau

**Kĩ năng cần thiết**:

- Thuật toán đỉnh kao - Để có thể hiện thực được lý thuyết về đồng thuận (Consensus), Mining, Mã hóa transaction, blocks,…
- Network đỉnh kao - Làm sao để các node kết nối tốt với nhau? Một transaction được submit thì broadcast cho các node khác như thế nào?
- Ngôn ngữ: Chủ yếu là C, Go, Rust… - Nói chung mấy cái hard core á

**Cơ hội nghề nghiệp**: Quá hard core nên mình cũng không biết. Mà ai làm được mấy cái này thì cũng toàn là không phải người bình thường nữa rồi

![image.png](https://images.viblo.asia/822c3d7d-d933-45bd-bf0f-3567afc0b19a.png)

Hiện tại chia làm hai trường phái chính là

- EVM blockchain - Nói chung là con cháu của Ethereum hết, dùng Solidity để viết Smart Contract
- Non-EVM blockchain - Những thằng muốn chứng tỏ mình là Ethereum killer. Thường dùng Rust hay một vài ngôn ngữ khác để viết Smart Contract

Đã có một network decentralized, vậy layer tiếp theo là gì?

## Interactive layer

![image.png](https://images.viblo.asia/7c50b2ac-b032-49cc-a02e-3a91ca6b496b.png)

**Định nghĩa**: Giúp kết nối vào cái Decentralized network ở trên, có transaction thì bắn vào network, đồng thời cũng expose ra data một cách “Dễ hiểu” hơn

Nếu Network như là mạng viễn thông, thì tầng này như cái Sim của các bạn vậy, giúp support connect vào cái sóng của mạng viễn thông các bạn dùng

**Problem nó giải quyết**: Tuy có một network chạy hoàn chỉnh rồi, nhưng nó lại khó tiếp cận vì hiện tại network có một số vấn đề như

- Cả cái network to quá, cầm về chạy méo nổi - Tầm 2-3TB, 16 GB Ram, CPU mấy nhân đó, network cáp quang ổn định
- Maintain một node kết nối ổn định cũng khá mệt mỏi - Cúp điện thì sao, sụt nguồn thì sao, rớt mạng thì sao,…
- Transaction submit vào network rồi nhưng méo biết nó thành công hay thành thụ?

**Kĩ năng cần thiết**:

- Network, DevOps - Cái này chủ yếu liên quan tới việc vận hành một node và expose data ra bên ngoài

**Cơ hội nghề nghiệp**:

- Mình nghĩ là khá nhiều, biết DevOps tốt + Blockchain concept là có thể làm được
- Mảng bên Blockchain Explorer giờ thì tụi Etherscan là bá chủ ròi

## Presentation Layer

![image.png](https://images.viblo.asia/154758cb-e262-4bbf-9ce7-43baeefbceb8.png)

**Định nghĩa**: Nói chung là một đống thư viện để có thể dễ dàng tương tác với thằng Interactive Layer bên trên

Nếu Interactive Layer bên trên tương tự như cái Sim, thì tầng này như con ĐT của của các bạn đó. Kết nối với Sim để tương tác với mạng viễn thông

**Problem nó giải quyết**: Có một node chạy trong network rồi, giờ cơn bản là làm sao submit data hay read data từ node đó ra. Ngoài ra còn cần để tương tác với ví để sign transaction nữa

**Kĩ năng cần thiết**:

- Kĩ năng chọn thư viện phù hợp - Mình thấy đã có kha khá thư viện làm những việc như trên rồi, nên chủ yếu là chọn cái phù hợp để dùng thôi

**Cơ hội nghề nghiệp**:

Đã là một Web3 Developer rồi thì ít nhất phải biết từ tầng này thì mới code được. Nên cái này là basic layer cần biết để có thể làm nhiều thứ khác. Mà cơ hội nghề nghiệp cho cái “Làm nhiều thứ khác” thì nhiều nhiều lắm. Đọc ở section dưới nhé

À trên hình là nó còn chia theo 3 use case nữa:

- Web3 Native Libraries - Kết nối giữa frontend tới Node
- Developer Environment - Set up môi trường để develop
- File Storage - Dùng để lưu file, về cơ bản là file lớn quá lưu lên blockchain không hợp lý nên mới sinh ra thằng này. Chả ai lưu hình trong DB đâu nhỉ 🤔

## Decentralized Application (dApp)

![Tầng cuối rồi](https://images.viblo.asia/822b0bca-c61e-47bd-a51d-9267fd9c7615.png)

Tầng cuối rồi

**Định nghĩa**:  Nói chung ở tầng này rồi thì mỗi app sẽ solve những problem của riêng nó mà nó muốn solve như là

- Lending, exchange
- Identity
- NFT, NFT market
- Data analytics

Tầng này là ở tầng ứng dụng rồi, bạn có con dt sóng sánh tràn viền, tiền bạc đầy đủ, bạn dùng nó để tán gái, scam, hay tele-sale là quyền ở bạn

**Problem nó giải quyết**: Nó muốn giải quyết problem gì thì nó giải quyết problem đó. Chỉ có một câu hỏi nên trả lời là tại sao problem đó nên giải quyết ở Blockchain, Web3 mà không phải là Web 2?

**Kĩ năng cần thiết**:

- Hiểu rõ tối thiểu từ tầng Presentation Layer và sử dụng nó
- Code Smart Contract (Solidity, Rust, Move,…)

**Cơ hội nghề nghiệp**: Vô vàn, việc không nhẹ nhưng lương cao. Thường khi nói các bạn làm việc ở Web3 nghĩa là các bạn đang làm ở layer này

## Lời kết

Nói chung thì Web3 vẫn là thứ gì đó khá mới mẻ, hiện tại thì nhìn stack như vậy nhưng tương lại chắc chắn sẽ còn có nhiều thay đổi. Việc hiểu stack trên sẽ giúp bạn hiểu được:

- Thứ mình đang làm là nằm ở tầng nào
- Tại sao dùng X mà không dùng Y

Và mình tin hai câu hỏi trên thì mọi người cần nắm được dù là ở Web 3 hay Web 2 đi nữa

## Nguồn tham khảo
https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack?__cf_chl_f_tk=AsGtONauPhkwNknhLlL3bqlzr6AUhhRkZi1CJQWpnmw-1667264466-0-gaNycGzNCqU
https://alchemy.com/blog/web3-stack

## Bài viết "lan quyên"
https://thanhle.blog/en/blog/tai-khoan-o-web2-va-web-3
https://thanhle.blog/blog/chiec-transaction-tren-blockchain-ben-trong-co-gi