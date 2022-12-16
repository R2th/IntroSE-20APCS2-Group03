AAVEGOTCHI là một NFTs game nổi lên từ một cuộc thi hackathon được tổ chức bởi Aave Protocol (https://aave.com/), tưởng chừng chỉ là một sản phẩm đơn giản với đồ hoạ pixel rẻ tiền tuy nhiên nó đang chứng tỏ mình sẽ là một trong những người tiên phong trong việc **gamification** defi.

![](https://images.viblo.asia/b7e131a6-9621-4101-a288-83f9b94c5807.png)

# Giới thiệu

* Đầu tiên chúng ta sẽ giải thích về **gamification** : Các bạn có thể hiểu đây là một thuật ngữ dùng cho một xu hướng quản lý mới, khi mà các ứng dụng trong đời thực được đưa vào game nhằm để cho người dùng dễ tìm hiểu, nghiên cứu nhằm tăng hiệu suất cho ứng dụng đó. Và tại đây **Aavegotchi** đã đem game hoá các ứng dụng defi (**aave**) nhằm giúp người dùng dễ sử dụng hơn.
* Aavegotchi ban đầu được xây dựng trên Ethereum nhưng vì chi phí gas quá cao trong thời gian gần đây nên các nhà phát triển đã dần di dời sang Polygon network (Tiền thân là Matic).

# Token của Aavegotchi
## Tokenomics
Cũng giống như các Dapp khác, **Aavegotchi** có một token cho riêng mình có symbol là **GHST**. Tuy nhiên token này mặc dù là 1 ERC20 nhưng lại có cơ chế supply hoàn toàn khác với các loại token khác **Link**, **Band**, ...

**GHST** là một dạng dynamic supply tức là sẽ không có số lượng giới hạn token **GHST** sẽ được sinh ra, vậy nhiều người sẽ đặt câu hỏi rằng vậy nó sẽ khiến **GHST** bị lạm phát ?

Và đó chính là lí do **bonding curve** được ra đời:
(Token Bonding curve được áp dụng để public sale ngay sau khi hoàn thành các vòng privatesale gọi vốn ban đầu, và từ giờ trở đi, token mới được sinh ra chỉ là nhờ vào bonding curve)
![](https://images.viblo.asia/ee2d934d-6a4c-46c0-a358-7a4017363bb3.png)

Token Bonding curve (**TBC**) được hiểu rằng nó sẽ làm cho giá của token (GHST) tăng lên khi lượng cung tăng và giảm khi lượng cung giảm. Có thể hiểu là nếu càng nhiều người mua thì giá trị token sẽ ngày một tăng và những người mua đầu sẽ có lợi nhất.

Công thức của **Bonding curve**:

![](https://images.viblo.asia/926db7a3-cba6-4f59-a5b1-a81515fec004.png)

Dựa theo công thức trên thì **ReverseTokenBalance** sẽ là **DAI** còn **ContinuousTokenSupply** se là **GHST**

TBC của GHST có tỉ lệ là 33% do đó việc pump lên r dump xuống đối với **GHST** là khá khó khăn
Và do đó chart của GHST tương đối đều có thể nói là dần đi đến stable:
![](https://images.viblo.asia/321686ed-7a39-4219-97aa-a2a485e121c8.png)

## Sử dụng GHST trong Aavegotchi

Để dễ hiểu nhất thì các bạn hãy đổi sang mạng kovan và vào thẳng đây chơi thử: https://testnet.aavegotchi.com/play

![](https://images.viblo.asia/2c4cf8cb-8611-49aa-9dda-995593c46cd7.png)

Hiện tại với kinh nghiệm của mình thì mình đang sử dụng GHST cho 3 mục đích:
- Mua **Portals** : Đây là những cánh cổng để có thể triệu hồi các Gotchis (Đây là linh hồn của trò chơi, mỗi người sẽ có các Gotchis - NFT để nuôi dùng để tham gia các game sau này)
- Mua **wearables** để tăng sức mạnh cho Gotchi
- Stake để sinh ra FRENS để mua ticket quay xổ số hoặc có thể bán trực tiếp các ticket trên opensea


## Stake GHST
Với những holder GHST , thay vì để đấy họ có thể stake GHST để sinh ra FRENS (ERC20 nhưng không có khả năng trading). Có rất nhiều cách có thể tối ưu lượng FRENS sinh ra:

Đầu tiên với option là layer2 Polygon, chúng ta có thể lựa chọn là stake trên Ethereum hoặc trên Polygon (Matic), tuy nhiên để tối ưu lượn gas phải trả thì mình recommend nên sử dụng trên Polygon, tuy nhiên chúng ta sẽ phải swap **GHST** từ Ethereum sang Polygon thông qua bridge:
![](https://images.viblo.asia/7747a099-27ad-4415-8f23-0e112ec2b49f.png)

Lượng FRENS sinh ra 1 ngày sẽ tương ứng với lượng GHST chúng ta stake với cả Ethereum và Polygon (Matic).

Để tối ưu hơn nữa chúng ta có thể cung cấp liquidity cho 2 pool :
- GHST - ETH trên Uniswap
- GHST - QUICK trên Quickswap trên polygon mainnet

Và mình là người đơn giản thì mình stake trên Polygon:

![](https://images.viblo.asia/6edff27a-297a-4ac0-b971-4ce3c4c24cb6.png)

# NFT Gotchi

Các Gotchis được triệu hồi từ việc mua các Portal sẽ là các NFT, và các NFT này sẽ gắn liền với các token lending AAVE.

Sau khi mua portal chúng ta sẽ mở ra để có thể nhận về Gotchi, hãy nhận Gotchi được cho là hiếm nhất để sau này có thể farm GHST và tham gia các mini game để nhận thêm GHST:

![](https://images.viblo.asia/fff5e07d-ce64-40ac-9fe4-68033c2fa921.png)

Tạm gác lại các thuộc tính của Gotchi, cái này mình sẽ dành cho các bạn tự tìm hiểu, sau đây mình sẽ hướng dẫn cách có thể triệu hồi được Gotchi này:

1.  Xác định loại Gotchi : Trên đầu của mỗi Gotchi sẽ là biểu tượng của loại token cần Stake để có thể triệu hồi được Gotchi, điều đặc biệt ở đây là loại token stake.
2.  Lấy token để triệu hồi: Để triệu hồi được Gotchi chúng ta sẽ phải dùng một trong 2 loại là **aToken** nếu sử dụng trên mainnet Ethereum hoặc **maToken** nếu sử dụng trên Polygon (Matic). Tuy nhiên tất cả sẽ phải đi từ aToken, để lấy được aToken chúng ta sẽ phải Deposit trên Aave và sẽ nhận được aToken tương ứng: 

    * **aToken** chính là lượng token được mint sau khi chúng ta **Deposit** vào trong nền tảng **AAVE**. Ví dụ: Sau khi deposit **DAI** vào Aave chúng ta sẽ được một lượng **aDAI** tương ứng. Lượng aDAI này chúng ta có thể withdraw lượng DAI đã stake vào AAVE bất cứ lúc nào, tuy nhiên chúng ta sẽ cần lượng **aDAI** này để có thể triệu hồi được Gotchi hệ DAI
    * **maToken** đây chính là token trên layer2 Polygon(Matic) tương ứng được mint 1:1 từ aToken sang. Chúng ta sẽ phải mint thông qua một bridge: https://aavegotchi.com/bridge 

3. Stake và triệu hồi Gotchi: Để có thể triệu hồi được Gotchi chúng ta cần phải có một lượng tối thiếu token yêu cầu.

Trò chơi hiện tại đang trong quá trình Pre nên chưa có nhiều minigame hấp dẫn người chơi, nhưng hứa hẹn sau này sẽ có nhiều điều thú vị chờ đón

# Kết luận

Sau khi hoàn thành việc triệu hồi Gotchi, chúng ta đã thực hiện kha khá các thao tác đối với các ứng dụng Defi:
 - Cung cấp thanh khoản cho uniswap và quickswap để lấy nhiều FRENS
 - Sử dụng Bridge để swap token giữa 2 chain khác nhau từ Ethereum sang Polygon
 - Lending trên AAVE lấy aToken để triệu hồi Gotchi
 - Bán các NFT trên Opensea (dùng FRENS để mua các ticket để mở đồ bán hoặc bán ticket)

Như vậy, qua một trò chơi chúng ta đã tác động với phần lớn các use case của các ứng dụng Defi - một cách hướng dẫn người dùng phổ thông một cách không hề cứng nhắc.