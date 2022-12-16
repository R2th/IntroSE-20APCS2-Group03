Bài gốc: https://thanhle.blog/en/blog/chiec-transaction-tren-blockchain-ben-trong-co-gi

## Tại sao nên đọc bài này?

- Hiểu rõ hơn bên trong blockchain nó chạy làm sao?
- ~~Coin của tôi luôn chuyển trong blockchain ra sao?~~ Đợi bài sau nha 😅


💁‍♂️  Bài này mình sẽ nói chủ yếu các khái niệm ở bên EVM blockchain (ETH, BNB Chain, Polygon,…) nên có thể nó sẽ không đúng với các chain khác (Solana, NEAR, DOT,…)


## Transaction là gì?

> An Ethereum transaction refers to an action initiated by an externally-owned account, in other words an account managed by a human, not a contract. For example, if Bob sends Alice 1 ETH, Bob's account must be debited and Alice's must be credited. This state-changing action takes place within a transaction.
> 

![Nguồn: [https://ethereum.org/en/developers/docs/transactions/](https://ethereum.org/en/developers/docs/transactions/)](https://images.viblo.asia/ad8982d8-fbae-4b61-a33d-e0d227f5659c.png)

Nguồn: [https://ethereum.org/en/developers/docs/transactions/](https://ethereum.org/en/developers/docs/transactions/)

Hiểu cơ bản thì Transaction là một action thực hiện bởi một externally-owned account (Account của người thật, hok phải Smart Contract) gửi lên blockchain network, từ đó thay đổi `state` của network. `World state (t) + transaction = New world state (t + 1)`

Hiểu ngược lại, nếu không có transaction thì state của network giữ nguyên, không có gì thay đổi cả

## Transaction có gì?

Một chiếc transaction được gửi đi sẽ có những data sau

- `to` người nhận, có thể bạn gửi tiền cho một `address` khác, có thể bạn execute một `smart contract` khác. Hoặc không có thì khả năng cao transaction này dùng để tạo một `smart contract`
- `signature` chữ kí, cái này để biết chính xác thằng nào là thằng gửi cái transaction này đi
- `value` native token gửi trong transaction đó. Nếu bên Ethereum thì là ETH, BNB chain thì là BNB, Polygon thì là MATIC,…
- `data` cái này optional, dùng làm input để execute một `smart contract`, kiểu call `smart contract` là gửi *30 CAKE cho thằng Y* đi thì `30 CAKE cho thằng Y` chính là `data` .Nếu bạn gửi Native token cho ai đó thì không cần cái field này
- `gasLimit` Gas tối đa được sử dụng để chạy transaction này. Gas là gì thì đợi giải thích sau
- `maxPriorityFeePerGas` Đù cái này mình cũng mới biết 🙃, nói chung là dùng để tip cho thằng validator nào pick cái transaction này mà chạy

```jsx
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

## Gas

Gas là một đơn vị dùng để tính `computational effort` trong blockchain. Hiểu nôm na thì khi bạn chạy một transaction thì cái network phải tính toán gì đó để từ đó gen ra cái `New world state` , mà tính cái đó thì tốn `computation effort` , tốn điện. Do đó khái niệm gas được sinh ra để trả phí cho `computation effort` , cái transaction nào phức tạp, tốn nhiều `computation effort` thì phải trả nhiều tiền gas hơn và ngược lại.

![Nguồn: https://ethereum.org/en/developers/docs/gas/](https://images.viblo.asia/ca904186-5cbb-4834-a59a-3f5d1e329557.png)

Nguồn: [https://ethereum.org/en/developers/docs/gas/](https://ethereum.org/en/developers/docs/gas/)


💁‍♂️ **Ai là người trả tiền gas?**

Thằng init cái transaction đó sẽ phải trả tiền gas. Cái này là điểm khác biệt cực kì lớn giữa web3 và web2.
Đối với web2, đã có một thằng mua sẵn con server, trả tiền cho nó chạy để nó handle transaction rồi nên user không phải trả (Hoặc tụi nó thu lại bằng cách khác)
Còn với web3, thì con server là chạy chung, do đó transaction của thằng nào thì thằng đó tự trả - Độc lập, tự do 🤔


Nó khá giống xăng xe ngoài đường vậy, bạn đổ xe đầy bình, chạy xong từ A → B còn dư bao nhiêu xăng thì nó trả lại

Tại sao cần `gasLimit` vì phòng trường hợp ông nào code bug dẫn tới burn hết mọe gas → tốn tiền → user complain. Do đó `gasLimit` sinh ra để đề phòng những trường hợp như vậy.

Chưa tới chợ mà hết xăng? Nếu bạn set `gasLimit` quá nhỏ, có thể không đủ để trả cho `computation effort` nên nó chạy dc 1 quãng thì đứt gách, với trường hợp này thì transaction sẽ được revert lại, đồng thời gas của bạn cũng bị burn hết nhé, không lấy lại được đâu 😛

Tiền gas, tùy vào cung cầu mà giá gas sẽ thay đổi. Vì tối đa hiện tại ETH chỉ handle được 30tx/giây nên nếu tại một thời điểm có nhiều giao dịch hơn vậy, thì thằng nào trả nhiều tiền hơn sẽ được verify và cho vào block trước.

Do đó phí cho một giao dịch sẽ phụ thuộc vào `gas + tiền gas` của giao dịch đó mà không phụ thuộc vào giá trị của một giao dịch. Ví dụ bạn gửi 1$ thì vẫn có thể phải trả 50$ tiền phí mà bạn gửi 1 000 000 000$ thì cũng phải trả 50$ tiền phí.

## Vòng đời của một transaction

![image.png](https://images.viblo.asia/84a5733c-89b3-4df1-be6f-47439f7c8e8d.png)

1. Một transaction được gen ra, thường qua frontend app, nó sẽ sinh ra mớ data cho transaction của bạn (Gửi cho ai, bao gồm những data gì, gas limit phù hợp,…)
2. Với data đó, sẽ cần bạn sign cái transaction (để bảm bảo là, tao là chủ cái tài khoản này, và tao cam đoan đống data tao gửi lên blockchain là của tao và chỉ duy nhất tao làm được điều này). Thường là qua MetaMask, CoinBase wallet,…, nói chung thằng nào giữ key thì thằng đó mới sign được
3. Sau khi submit transaction vào network, nó sẽ cần xếp hàng ở `Transaction pool` , nhớ lúc nãy mình nói chứ? ETH chỉ có thể handle được tối đa 30tx/giây nên nếu nhiều hơn sẽ cần phải xếp hàng.
4. Bây giờ mấy ông validator/miner (những người sẽ execute và verify transaction) sẽ pick ra em transaction nào thơm ngon nhất 🤤, VD như thằng nào trả phí gas cao nhất, tip cao nhất rồi bắt đầu execute/verify
5. Nếu có một ông nào đó đã verify được một block, sẽ broadcast cho toàn network là “*tao verify được đống transaciton này rồi nhé, phí giao dịch tao lấy, các em lấy block mới về mà lưu lại, lo mà verify đống tx tiếp theo đi, anh chỉ làm mẫu một lần thôi đấy* 😎”
6. Ok vậy là giờ transaction đã được verify, cả network đồng ý đây sẽ là `state` mới và tiếp tục công việc ở bước 3

*Mình định sẽ giải thích kỹ hơn hơn về bên trong một tx làm sao mà token, coin có thể luân chuyển trong nhưng nó sẽ đụng vào concept của Smart Contract nên có lẽ để bài sau nhé!*

## Nimbus 🌩️

Nhân tiện, đối với một transaction và dưới góc nhìn của technical thì nó quá khó để cho một người như mẹ 👩 hay bà ngoại 👵 mình có thể hiểu và biết những thứ bên trong transaction là gì. Do đó mình có build một tool tên là **Nimbus** để có thể giải thích hoặc là lược bỏ những thứ không-cần-hiểu như vậy.

Trong tool có một phần là Transaction Explain, nó sẽ giúp mọi người hiểu ngắn gọn là transaction này làm gì, chuyển tiền cho ai, ai chuyển tiền cho mình

![Nimubs](https://images.viblo.asia/22a4e4c6-f916-4672-8336-43ff0bd34f3c.png)

👇 Check it out 👇

https://getnimbus.xyz/