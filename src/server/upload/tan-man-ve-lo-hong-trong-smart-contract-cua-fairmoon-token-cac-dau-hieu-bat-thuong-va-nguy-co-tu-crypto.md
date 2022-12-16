Hôm nay (19/05/2021) là một ngày đen tối đối với cộng đồng crypto khi:
- Giá của hầu hết các đồng tiền ảo đều giảm 50% trong 1 ngày.
- Venus bị lợi dụng cơ chế cho vay, chiếm đoạt gần 100 triệu USD
- Update: Ngày 20/5, thêm 1 dự án farming trên BSC là Bunny bị hack cũng bằng cách lợi dụng cơ chế cho vay để thao túng giá. Trước khi bị hack, giá trị token khóa trong các pool farm là ~ 4 tỷ USD. Hiện tại tất cả các Pool đều đã về 0. Giá token từ 150 USD về 1USD =)) Hacker kiếm được 1 tý USD

Nhưng trước khi sự kiện này diễn ra vài giờ đồng hồ, có một sự kiện cũng được cộng đồng rất chú ý đó là RugOnWar aka Shally - 1 chuyên gia audit smart contract - một nhân vật có ảnh hưởng khá lớn trong cộng đồng -  sở hữu kênh Twitter hơn 100.000 follow, sáng lập RugETH đồng thời được cho là người đứng sau Fairmoon Token  đã biến mất sau khi bán toàn bộ token và rút hết thanh khoản (ước tính trị giá 2 triệu USD).

Anh tôi để lại lời nhắn: "Tôi làm như vậy để các bạn biết là đừng tin ai cả =))"
![1](https://user-images.githubusercontent.com/49134028/118962333-763b6d00-b98f-11eb-8453-619ebbd7d5fd.png)

Trong bài viết này mình sẽ cùng lục lại quá khứ phân tích lỗ hổng trong contract của Fairmoon, các giao dịch đáng ngờ, mối liên quan giữa các giao dịch đáng ngờ với đội phát triển, và vì sao có lỗ hổng tồn tại nhưng vẫn rất nhiều người lao theo và đi tới cái kết là tay trắng.

## Highlights
- Đôi nét “FAIRMOON incident”.
- Lỗ hổng trong hợp đồng Fairmoon
- Một nhóm ví đã bán FAIRMOON thu về 2 triệu USD
- Sự liên quan của nhóm ví trên với đội dev của Fairmoon
- Câu trả lời của Fairmoon và sự thật phũ phàng

## FAIRMOON incident
### Tổng quan
- FAIRMOON là một BSC (Binance Smart Chain) token được fork từ hợp đồng của Safemoon (1 cái tên cực kì nổi tiếng vì đã tăng giá trị gấp 2 triệu lần trong vòng 2 tháng. Vốn hóa có thời điểm đạt 6 tỷ USD).
- FAIRMOON được bán presale trên DxSale
- Ngày 27/3, FAIRMOON được list trên nền tảng PancakeSwap
- Ngày 28/3, FAIRMOON được WARONRUGS (WOR) - một auditor nổi tiếng thực hiện audit và đánh giá cao. Điều nay gây sự chú ý lớn tới cộng đồng
- Trong vài ngày tiếp theo, Fairmoon tuyên bố là đối tác với WOR
- Ngày 1/4, vốn hóa thị trường của Fairmoon đạt 100 triệu USD
- Cũng trong 1/4, Fairmoon thực hiện đốt 100 triệu token (trị giá ~ 100k USD) để góp phần đẩy giá đồng tiền và marketing
- Fairmoon tăng trưởng ổn định trong những ngày tiếp theo
### Dump and dump =))
- Ngày 07/04, lần bán tháo đầu tiên, giá token - 49%
- Ngày 08/04, lần báo tháo thứ 2, giá token - 46 %
- Đêm 08/04, lần báo tháo thứ 3, giá token -75%
- Ngày 09/4, WOR thông báo bug, giá token xuống không phanh.
- Những ngày tiếp theo, Fairmoon vẫn tăng trưởng trở lại, đạt lại mức vốn hóa 20~40M
- Sáng ngày 19/5, phí giao dịch bị tăng thành 100%. Nghĩa là người mua sẽ bỏ tiền nhận về 0 token.
- Trưa 19/5, Fairmoon bị tháo thanh khoản,  giá token giảm 95.54%. WarOnRugs chính thức "rugs"

![](https://images.viblo.asia/c71b7f03-f935-467b-b817-29761701300c.png)

Contract: https://bscscan.com/token/0xca578afee65fd2268d383f8fc4a9fc6ae1d2def0#readContract

### Fairmoon Bug
Fairmoon fork từ Safemoon, bao gồm cả cơ chế thu phí mỗi giao dịch để add vào thanh khoản Pancake.
Mỗi khi thanh khoản được add, sẽ cần tính toán lại thanh khoản, điều chỉnh phí cho các giao dịch tiếp sau đó. Có một ngưỡng thanh khoản được thiết lập. Khi giao dịch càng lớn, càng đạt gần ngưỡng thanh khoản, chi phí giao dịch càng đắt (lên tới 50% giá trị giao dịch)

Khi dev Fairmoon fork code của Safemoon, họ thực hiện thay đổi tổng cung (5,000,000,000 thay vì 1,000,000,000,000,000). Nhưng ngưỡng thanh khoản không được đổi (maybe là 1 turn không tính toán, hoặc cố tình đến từ đội dev).  Điều này dẫn đến một lỗ hổng lớn.  Fairmoon có thể bán được 5% tổng cung / 1 giao dịch thay vì 0.00025% giống người mẹ Safemoon.

Điều này tạo điều kiện cho "cá mập" lộng hành. Sẽ có những giao dịch ảnh hưởng tới 50% giá trị token :v
![](https://images.viblo.asia/3b6eac20-7182-4c4f-adf2-c4dee30a1c51.png)
Câu hỏi đặt ra là nếu tồn tại 1 nguy cơ lớn như thế, thì tại sao WOR khi audit không phát hiện ra?

## Những giao dịch đáng ngờ
Ở đây chúng ta sẽ đưa ra 1 mạng lưới các ví có quan hệ với nhau.
(Tại thời điểm xảy ra incident, 1BNB có giá 500USD, 1 ETH có giá 2100 USD)

Fact: Tại thời điểm mình viết bài này hình như BNB tụt còn 300 (từ 550 trong 1 ngày) thui. =)) Khá toang

### Những giao dịch đầu tiên
Tại thời điểm Fairmoon list Pancake, một ví đã thực hiện mua 500.000.000 token (~10% tổng cung). Trải dài trên khoảng 20 giao dịch. Có thể check ở đây:

https://bscscan.com/token/0xfe75cD11E283813eC44B4592476109Ba3706cef6?a=0x485d2f761089b01623d3d6d31fd06e7c75d0373c

Sau khi gom được 1 lượng token lớn như thế. Ví này chuyển token tới 4 ví  khác lần lượt 131M, 149M, 119M, 113M tokens
- https://bscscan.com/tx/0x6a4bb984c5f6d830cf1f32b25ac879a030a3309f03c58722af9d47eb63c1b604
- https://bscscan.com/tx/0xcebfb0b97a3ef9b6c418deea093c74b0b849e837c0d99521802552be1b850a85
- https://bscscan.com/tx/0xa156e918a955fbc587ee5b04374768b9e30f4870daaf7b3fa734629cf6e21b20
- https://bscscan.com/tx/0x012e53429ad832d166e141aeb19539bc04129a284af310834452171886a85d00

Lúc này trông network sẽ như này
![](https://images.viblo.asia/843bb0d1-c19b-4cc0-a986-4339b90c0b40.png)
### Event đốt token
1/4, Fairmoon thực hiện đốt token.
Kiểm tra transaction nhận thấy token được đốt từ 1 trong 5 ví ở mạng lưới trên
https://bscscan.com/tx/0xbdf360065afc3fe84baaf063998b8e398e8ab232b596246ce6455aa8de6e594b

Thực hiện lọc các transaction tới địa chỉ dead (dùng để đốt), chỉ thấy duy nhất giao dịch từ ví ...25c5

Ủa, vậy nếu ví này không liên quan đến đội dev, thì hẳn là đã có 1 nhà đầu tư cực kì hào phóng đã đốt số token này (~ 2% tổng cung)
### Event airdrop
Sau khi đốt token, team Fairmoon tổ chức sự kiện airdrop cho 2 người may mắn. Mỗi người sẽ nhận được 5m token.

Kiểm tra trên bscScan:
- https://bscscan.com/tx/0xdad4eb53fb02fe38ce435bdb93b75300822261e27dbb34aa135162b80c4cd95f
- https://bscscan.com/tx/0x79334f5ca35f10f230cb9e1a6086bc0d23a9499c7de9f9ffaf5f2462656ad17f

Cả 2 giao dịch đều đến từ ví đã mua 10% tổng cung ban đầu.

Điều này càng làm tăng nghi vấn mối quan hệ giữa đội dev và ví này
### Những lần sell token khiến nhiều người ra đảo
Những lần sell-token lớn đều đến từ các ví trong mạng
![](https://images.viblo.asia/baa6fcf9-b506-4006-a544-5301d64a0cef.png)
- Lần 1: Ví "...0d0d" thực hiện 2 lần bán, 1 lần trị giá 1162 BNB (580K USD), 1 lần trị giá 694BNB (347K USD)
- Lần 2: Ví "...ee0b" bán token trị giá 937BNB (470K USD)
- Lần 3: Ví "...4e3e" bán 761BNB (380K USD)
- Lần 4: ví "...25c5" - ví đã từng đốt token bán 37 BNB (18K USD)
- Sau đó toàn bộ BNB thu được (3591 BNB ~ 2tr100 USD) được chuyển về ví ban đầu
https://bscscan.com/tx/0x2f2a5b10357f3d969700019825b14760124499e9bcd01702ea796604fb7d8a21
### Chuyển BNB sang ETH
Sau khi các giao dịch lớn bên trên được thực thi, WOR thông báo có bug trong hợp đồng Fairmoon. Điều này khiến các nhà đầu tư bắt đầu bán tháo.

Vốn hóa Fairmoon tụt giống còn ~5M (Giảm 20 lần)

Nhưng trong khi các nhà đầu tư hoảng sợ, thì ví bên trên còn đang bận chuyển tiền sang ETH sau đó chuyển lên Binance.

- Chuyển BNB sang ETH: https://bscscan.com/token/0x2170ed0880ac9a755fd29b2688956bd959f933f8?a=0x485d2f761089b01623d3d6d31fd06e7c75d0373c
- Chuyển ETH lên binance: https://bscscan.com/tx/0x45c45ef8b680d67f0aa137fb697a6065c45e0d7631f94ce28c109f9a68837b43

Không biết là liệu ví này có bán ETH không hay hold. Nếu hold thì có thể đã có thêm 1 pha x2 tài sản khi ETH đã chạm ngưỡng 4000 USD =))).

Và chart của Fairmoon trông như này:
![screenshot_3](https://user-images.githubusercontent.com/49134028/118962923-1a251880-b990-11eb-88cf-740504e00c2f.png)
## Sau hàng loạt những yếu tố đáng nghi, câu trả lời từ phía Fairmoon là gì?
> As the community grew rapidly, Miley helped form our partnership with WarOnRugs and was our main point of contact between both communities. The majority of our leadership and community only heard about the project and joined after the partnership was announced

>As we kept growing, Miley mostly worked independently on different aspects of the project and relayed updates with the team. She directly developed our current website under her ownership, and coordinated our Twitter giveaway with the generosity of our larger holders.

>After our original Fairmoon contract developer found an economic bug in our liquidity protocol, he carefully brought it to our top leadership’s attention to Tommy, then No Mercy, then eventually Miley. When Miley understood the issue, she shared this information with her large holder contacts, then WoR, and dumped her bags on us, going radio silent, and deleting her account. WoR relayed the bug information immediately on twitter.

Đại khí là phía đại diện của Fairmoon thông báo có 1 thành viên trong team là Miley đã biết được lỗ hổng và thực hiện "phản bội" team, bán token chạy mất

Để xoa dịu cộng đồng, đội Dev tiếp tục đốt token như một hành động đẩy giá, và dần dần mọi người quên đi sự kiện bán tháo bên trên.

## Sự thật phũ phàng
Trong những ngày tiếp theo, đội phát triển Fairmoon đẩy mạnh marketing, và tuyệt nhiên không ai đề cập tới lỗ hổng to đùng trong hợp đồng vẫn đang còn tồn tại.

- Ngày 18/05, WOR thông báo sẽ có 1 sự kiện lớn sắp ra mắt ở Fairmoon và RugETH (1 token NFT được tạo sau khi nhà sáng lập ETH kéo thanh khoảng 13500 ETH của Shib)
- Nhờ good news, giá cả 2 token được đẩy lên nhanh chóng
- 19/05:  Fee trong contract bị sửa từ 2% lên 100%. Điều này đồng nghĩa khi bạn thực hiện 1 giao dịch, bạn sẽ mất tiền mà không nhận lại bất kì thứ gì.
https://bscscan.com/token/0xca578afee65fd2268d383f8fc4a9fc6ae1d2def0?a=#readContract
![](https://images.viblo.asia/c71b7f03-f935-467b-b817-29761701300c.png)
- Và sau 2 tiếng, fee được chuyển về 0% thì BUM:
![screenshot_5](https://user-images.githubusercontent.com/49134028/118960955-feb90e00-b98d-11eb-948d-77ff42683363.png)

- Sau đó không có sau đó nữa

Một Idol trong làng chống lừa đảo chính thức trở thành kẻ lừa đảo.  WarOnRugs đã chính thức "rugs"
![45f6c042faac7a0eb8bc37616c3970f1](https://user-images.githubusercontent.com/49134028/118960945-fcef4a80-b98d-11eb-8917-207337b59247.png)
## Tản mạn
Ủa sao rõ ràng code có bug, mà sao người ta vẫn nhảy vào mua nhỉ. Câu trả lời là hầu hết những người đầu tư đều không có quá nhiều kiến thức, và không đánh giá được nguy cơ. Mình biết rất nhiều người tham gia các nhóm đầu tư, bảo mua gì mua đó. Bán gì bán đó...

Bức ảnh có âm thanh cực mạnh:
![hhh](https://user-images.githubusercontent.com/49134028/118960937-fb258700-b98d-11eb-83ce-73d46e4a449c.jpg)

Trong khoảng 2 tháng gần đây, số lượng dự án lừa đảo trên block-chain đặc biệt là nền tảng BSC ngày càng nhiều.

Mỗi ngày có hàng trăm dự án ra đời. Và đa số là lừa đảo. 

Vây nên cách tốt nhất là hãy tìm hiểu trước khi đưa ra 1 quyết định ảnh hưởng trực tiếp tới túi tiền

Nếu được hãy học cách đọc smart contract, thực ra nó cũng không có gì là khó khăn

Quan trọng hơn là đừng tin bố con thằng nào cả. Ai rồi cũng sẽ scam thôi :v

## How to Audit smart contract
Có thể tham khảo tại đây.
https://blockgeeks.com/guides/audit-smart-contract/