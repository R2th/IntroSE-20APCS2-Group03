Chào mừng các bạn đã trở lại với Part 2 của Tương tác với smartcontract trên blockchain bằng Go – part 2.
Như ở phần một tôi đã giới thiệu cho các bạn về smartcontract, cách deploy nó và đã hướng dẫn sử dụng Go lang để đọc dữ liệu từ smartcontact đó.
Tại part 2 này, sẽ nâng cao hơn, tôi sẽ giới thiệu cho các bạn về cách tạo transaction để thay đổi dữ liệu của smartcontact.

Hãy cùng xem lại smartcontract
```
//path: contract/Anime.sol
pragma solidity ^0.4.19;

/
  The Anime contract does this and that...
 /
contract Anime {
    address public owner;
    mapping (address => uint) public treasures;
  
    function Anime () {
        owner = msg.sender;
        // otakuToken = 1000000;
        treasures[owner] = 100;
    }

    function register(address user, uint amount) public {
        if (msg.sender != user) return;
        treasures[user] = amount;
    }
    

    function getTreasure(address a) public constant returns(uint) {
        if (treasures[a] != 0)
          return treasures[a];
        return 0;
    }

    function addTreasure(address a ,uint amount) public {
        if (msg.sender != owner) return;
        if (amount > 10)
          treasures[a] += amount;
        else
          return;
    }

    function sendTreasure(address receiver, uint amount) public {
        if (msg.sender != owner) return;
        if (amount < 0) return;
        if (treasures[receiver] != 0) return;
        treasures[receiver] += amount;
        treasures[owner] -= amount;
    }
}
```

Với function getTreasure(address a) ta đã dùng ở part 1  chỉ dùng để đọc dữ liệu hoàn toàn miễn phí và không cần tạo transaction thì addTreasure(), sendTreasure  với  chức năng dùng để thay đổi dữ liệu thì ta sẽ phải tạo transaction và điều này sẽ mất phí khi thực hiện.
## Signer
Tại phần này ta sẽ tạo thêm một package nữa với tên là signer, cái tên đã nói lên chức năng của package này, nó sẽ giúp ta ký xác nhận lên những transaction để đây ra ngoài network cho các miner xử lý và gắn dữ liệu mới lên blockchain. Cấu trúc của signer như sau:
```
type Signer struct {
	Keystore   string `json:"keystorepath"`
	Passphrase string `json:"passphrase"`
	opts       bind.TransactOpts
}
```
Trong đó Kystore là đường dẫn đến kystore cho address bạn muốn sửa dụng, passphrase là password bạn sử dụng để unlock account. Và opts chính là thành phần có thể coi như private key của address đó. Privatekey sẽ được sử dụng để ký cho transaction.
```
func (self Signer) Sign(tx types.Transaction) (types.Transaction, error) {
	return self.opts.Signer(types.HomesteadSigner{}, self.GetAddress(), tx)
}
```
Và function Sign trong singer sẽ được dùng để ký transaction, để ý trong tham số truyền vào của function này chính là transaction (có type transaction trong package types của go-ethereum).


## Ký transaction và gửi ra ngoài network
Trở lại với package blockchain ta sẽ thấy 2 function sau:
```
func (self Blockchain) AddTreasure(owner string, amount big.Int) (types.Transaction, error) {

	opts, cancel, err := self.getTransactOpts(nil, nil)
	defer cancel()

	if err != nil {
		return nil, err
	} else {
		tx, err := self.buildTx(
			opts,
			"addTreasure",
			self.signer.GetAddress(),
			amount)
		if err != nil {
			return nil, err
		} else {
			// fmt.Println("raw tx: ", tx)
			return self.signAndBroadcast(tx, self.signer)
		}
	}
	return nil, errors.New("add done")
}

func (self Blockchain) signAndBroadcast(tx types.Transaction, singer Signer) (types.Transaction, error) {
	if tx == nil {
		panic(errors.New("Nil tx is forbidden here"))
	} else {
		signedTx, err := singer.Sign(tx)
		if err != nil {
			return nil, err
		}
		// log.Println("raw tx: ", signedTx)
		ctx := context.Background()
		err = self.ethclient.SendTransaction(ctx, signedTx)
		if err != nil {
			log.Println("failed to broadcast tx: ", err)
		}
		log.Println("send done!")
		return signedTx, nil
	}
}
```
Trong đó function addTreasure với đầu ra là một transaction chưa được ký (raw transaction). Trong function này transaction sẽ được build ra bởi các thông tin như tên function trên smartcontract (addTreasure), tham số truyền vào (address, amount).
Sau bước này nếu không có lỗi gì ta sẽ ký vào gửi transaction được ký ra network bằng function signAndBroadcast(), trong function này ta có thể thấy hai hành động chính là singer.Sign(tx) và self.ethclient.SendTransaction(ctx, signedTx). Đây chính là bước ký và gửi.
Và sau function này thì ta sẽ thu được transaction hash trả về, các bạn có thể xem thông tin chi tiết của transaction bằng cách search transaction hash trên https://ropsten.etherescan.io khi sử dụng testnet hoặc https://etherscan.io/ khi sử dụng mainnet.
## Kết luận
Smart Contact là một sự đột phá trong công nghệ, có thể ứng dụng rất nhiều để xử lý các bài toán thực tế trong cuộc sống yêu cầu sự minh bạch và chính xác. Cùng với Go và qua 2 phần, tôi đã giới thiệu với các bạn cách tương tác với khá cơ bản với smart contract (đọc và ghi dữ liệu). Mong rằng qua bài viết có thể giúp các bạn có thêm những hiểu biết về blockchain cũng như Go
Toàn bộ source code được lưu lại tại [đây](https://github.com/tuanhnt1712/smartcontract)

Thanks for reading ^^