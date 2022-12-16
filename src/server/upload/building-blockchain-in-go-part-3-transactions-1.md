## Introduction
Giao dịch chính là trái tim của Bitcoin và mục đích duy nhất của blockchain là lưu trữ các giao dịch một cách an toàn và đáng tin cậy, vì vậy không ai có thể sửa đổi chúng sau khi chúng đã được tạo ra. Trong bài viết này chúng ta sẽ bắt đầu implement các transaction. Nhưng vì đây là một chủ đề lớn, nên tôi sẽ chia thành hai phần: trong phần này, chúng ta sẽ thực hiện cơ chế chung của giao dịch và trong phần thứ hai chúng ta sẽ đi vào chi tiết.
Nếu bạn đã từng phát triển một ứng dụng web, để thực hiện thanh toán, bạn có thể tạo các bảng này trong một DB:  `accounts` và `transactions` . Một tài khoản sẽ lưu trữ thông tin về người dùng, bao gồm thông tin cá nhân và số dư, và một giao dịch sẽ lưu trữ thông tin về việc chuyển tiền từ tài khoản này sang tài khoản khác. Nhưng trong Bitcoin, thanh toán được thực hiện theo cách hoàn toàn khác nhau :
> 1. No accounts.
> 2. No balances.
> 3. No addresses.
> 4. No coins.
> 5. No senders and receivers.

Vì blockchain là một cơ sở dữ liệu mở và công khai nên chúng ta không muốn lưu trữ thông tin nhạy cảm về chủ sở hữu ví. Tiền xu không lưu trữ trong tài khoản. Các giao dịch không chuyển tiền từ địa chỉ này sang địa chỉ khác. Không có trường hoặc thuộc tính giữ tài khoản số dư. Chỉ có giao dịch. Nhưng có những gì bên trong một giao dịch?

## Bitcoin Transaction
Một giao dịch là sự kết hợp của inputs and outputs:
```
type Transaction struct {
	ID   []byte
	Vin  []TXInput
	Vout []TXOutput
}
```
Trong đó: 
- ID: id của transaction đó
- TXInput : mảng các TxInput
- TXOutput : mảng các TxOutput
Đầu vào của 1 giao dịch là đầu ra của một giao dịch trước đó. Đầu ra là nơi mà đồng tiền thực sự được lưu trữ. Sơ đồ dưới đây thể hiện kết nối các giao dịch:
![](https://images.viblo.asia/320260aa-bc08-4792-84a9-5c5f96a37893.png)

## TxOutput
```
type TXOutput struct {
	Value        int
	ScriptPubKey string
}
```
Giả sử : A gửi cho B 100 bitcoins. Thì TxOutput ở đây chính là Value = 100 đó, còn ScriptPubKey là public key của A được hash.
Value thể hiện lượng giá trị mà TxOutput đó mang, và ScriptPubKey thể hiện quyền sở hữu của A với TxOutput này.
1 điểm chú ý là TxOutput không bị mất đi, mà nó chỉ chuyển từ trạng thái chưa được giao dịch sang được giao dịch. Với ví dụ ở đầu bài viết, khi giao dịch giữa A và B được thực hiện, TxOutput này dành cho A sẽ không bị mất đi, mà chỉ được đánh dấu là đã được sử dụng, và 1 TxOutput mới cho B sẽ được tạo ra.

## TXInput
```
type TXInput struct {
	Txid      []byte
	Vout      int
	ScriptSig string
}
```
Trong đó:
- Txid lưu trữ ID của giao dịch đó.
- Vout lưu trữ index của một đầu ra trong giao dịch.
- ScriptSig là một script mà cung cấp dữ liệu được sử dụng trong ScriptPubKey của ouput.

## The egg
Chắc các bạn cũng đã nghe đến 1 câu hỏi kinh điển "Con gà có trước hay quả trứng có trước?".
Trong Bitcoin, quả trứng xuất hiện trước con gà. Tức là ouput đến trước input.
Khi một miner bắt đầu khai thác mỏ một block, nó thêm một giao dịch coinbase đến nó. 1 coinbase transaction là một loại hình giao dịch đặc biệt, không yêu cầu các ouput phải tồn tại trước đó. Nó tạo ra output (tức là, "coins"). Quả trứng mà ko cần gà. Đây là phần thưởng cho các thợ mỏ sau khi khai thác block mới.
Như bạn đã biết, có một khối block nguyên thùy ở đầu của blockchain. Nó là khối đc tạo ra đầu ra đầu tiên trong blockchain. Và không có kết quả đầu ra được yêu cầu vì không có giao dịch trước và không có đầu ra như vậy.
Chúng ta hãy đi tạo 1 coinbase transaction như sau:
```
func NewCoinbaseTX(to, data string) *Transaction {
	if data == "" {
		data = fmt.Sprintf("Reward to '%s'", to)
	}

	txin := TXInput{[]byte{}, -1, data}
	txout := TXOutput{subsidy, to}
	tx := Transaction{nil, []TXInput{txin}, []TXOutput{txout}}
	tx.SetID()

	return &tx
}
```
1 coinbase transaction chỉ có 1 input. Txid là rỗng, Vout = -1, ScriptSig đc lưu trữ tùy ý.
subsidy là số tiền thường. 

## Storing Transactions in Blockchain
Từ bây giờ, mỗi khối phải lưu trữ ít nhất một giao dịch và không thể khai thác các khối mà không có giao dịch. Điều này có nghĩa là chúng ta nên loại bỏ trường `Data` của Block và lưu trữ transactions:
```
type Block struct {
	Timestamp     int64
	Transactions  []*Transaction
	PrevBlockHash []byte
	Hash          []byte
	Nonce         int
}
```
NewBlock và NewGenesisBlock cũng phải được thay đổi cho phù hợp:
```
func NewBlock(transactions []*Transaction, prevBlockHash []byte) *Block {
	block := &Block{time.Now().Unix(), transactions, prevBlockHash, []byte{}, 0}
	...
}

func NewGenesisBlock(coinbase *Transaction) *Block {
	return NewBlock([]*Transaction{coinbase}, []byte{})
}
```
Tiếp theo chúng ta cần phải tạo ra 1 blockchain mới:
```
func CreateBlockchain(address string) *Blockchain {
	...
	err = db.Update(func(tx *bolt.Tx) error {
		cbtx := NewCoinbaseTX(address, genesisCoinbaseData)
		genesis := NewGenesisBlock(cbtx)

		b, err := tx.CreateBucket([]byte(blocksBucket))
		err = b.Put(genesis.Hash, genesis.Serialize())
		...
	})
	...
}
```

## Proof-of-Work
Thuật toán Proof-of-Work phải xem xét các giao dịch được lưu trữ trong một khối, để đảm bảo tính nhất quán và độ tin cậy của blockchain như là một lưu trữ của giao dịch. Vì vậy, bây giờ chúng ta phải sửa đổi method ProofOfWork.prepareData :
```
func (pow *ProofOfWork) prepareData(nonce int) []byte {
	data := bytes.Join(
		[][]byte{
			pow.block.PrevBlockHash,
			pow.block.HashTransactions(), // This line was changed
			IntToHex(pow.block.Timestamp),
			IntToHex(int64(targetBits)),
			IntToHex(int64(nonce)),
		},
		[]byte{},
	)

	return data
}
```
Thay vì sử dụng `pow.block.Data`, bây giờ chúng ta sử dụng `pow.block.HashTransactions()` :
```
func (b *Block) HashTransactions() []byte {
	var txHashes [][]byte
	var txHash [32]byte

	for _, tx := range b.Transactions {
		txHashes = append(txHashes, tx.ID)
	}
	txHash = sha256.Sum256(bytes.Join(txHashes, []byte{}))

	return txHash[:]
}
```
Một lần nữa, chúng ta đang sử dụng hash như là một cơ chế cung cấp sự đại diện duy nhất của dữ liệu. Chúng ta muốn tất cả các giao dịch trong một khối được xác định bởi một hash duy nhất. Để lấy được nó, chung ta lấy hash của mỗi giao dịch, nối chúng lại sẽ tạo ra 1 mã hash của cái tổ hợp được nối đó. 
Hãy kiểm tra xem mọi thứ có đúng không nào:
```
$ blockchain_go createblockchain -address Ivan
00000093450837f8b52b78c25f8163bb6137caf43ff4d9a01d1b731fa8ddcc8a

Done!
```
Tốt! Chúng ta đã nhận được phần thưởng khai thác đầu tiên. Nhưng làm thế nào để chúng ta check được số dư (balance)?

## Unspent Transaction Outputs
Chúng ta cần phải tìm ra tất cả các output của giao dịch không chủ ý (UTXO). Unspent có nghĩa là các output này không được tham chiếu trong bất input nào. Trong cái sơ đồ ở bên trên thì:
1. tx0, output 1;
2. tx1, output 0;
3. tx3, output 0;
4. tx4, output 0.
Trước tiên, chúng ta hãy xác định các method `locking-unlocking` trên input và output:
```
func (in *TXInput) CanUnlockOutputWith(unlockingData string) bool {
	return in.ScriptSig == unlockingData
}

func (out *TXOutput) CanBeUnlockedWith(unlockingData string) bool {
	return out.ScriptPubKey == unlockingData
}
```
Bước tiếp theo - tìm kiếm các giao dịch chứa các kết quả đầu ra chưa được giải quyết - khá khó:
```
func (bc *Blockchain) FindUnspentTransactions(address string) []Transaction {
  var unspentTXs []Transaction
  spentTXOs := make(map[string][]int)
  bci := bc.Iterator()

  for {
    block := bci.Next()

    for _, tx := range block.Transactions {
      txID := hex.EncodeToString(tx.ID)

    Outputs:
      for outIdx, out := range tx.Vout {
        // Was the output spent?
        if spentTXOs[txID] != nil {
          for _, spentOut := range spentTXOs[txID] {
            if spentOut == outIdx {
              continue Outputs
            }
          }
        }

        if out.CanBeUnlockedWith(address) {
          unspentTXs = append(unspentTXs, tx)
        }
      }

      if tx.IsCoinbase() == false {
        for _, in := range tx.Vin {
          if in.CanUnlockOutputWith(address) {
            inTxID := hex.EncodeToString(in.Txid)
            spentTXOs[inTxID] = append(spentTXOs[inTxID], in.Vout)
          }
        }
      }
    }

    if len(block.PrevBlockHash) == 0 {
      break
    }
  }

  return unspentTXs
}
```
Hàm trả về một list các giao dịch chứa unspent outputs.. Để tính toán balance , chúng ta cần thêm một function để thực hiện các giao dịch và trả về output:
```
func (bc *Blockchain) FindUTXO(address string) []TXOutput {
       var UTXOs []TXOutput
       unspentTransactions := bc.FindUnspentTransactions(address)

       for _, tx := range unspentTransactions {
               for _, out := range tx.Vout {
                       if out.CanBeUnlockedWith(address) {
                               UTXOs = append(UTXOs, out)
                       }
               }
       }

       return UTXOs
}
```
Bây giờ chúng ta có thể thực hiện lệnh `getbalance`:
```
func (cli *CLI) getBalance(address string) {
	bc := NewBlockchain(address)
	defer bc.db.Close()

	balance := 0
	UTXOs := bc.FindUTXO(address)

	for _, out := range UTXOs {
		balance += out.Value
	}

	fmt.Printf("Balance of '%s': %d\n", address, balance)
}
```
Số dư tài khoản là tổng các giá trị output của các giao dịch unspent bị khoá bởi địa chỉ tài khoản.
Hãy kiểm tra số dư của chúng ta sau khi khai thác genesis block:
```
$ blockchain_go getbalance -address Ivan
Balance of 'Ivan': 10
```

## Sending Coins
Bây giờ, chúng ta muốn gửi một số coin cho người khác. Đối với điều này, chúng ta cần phải tạo ra một giao dịch mới, đặt nó vào một khối, và khai thác khối. Cho đến nay, chúng ta chỉ thực hiện giao dịch coinbase (đó là một loại giao dịch đặc biệt), bây giờ chúng ta cần một giao dịch chung:
```
func NewUTXOTransaction(from, to string, amount int, bc *Blockchain) *Transaction {
	var inputs []TXInput
	var outputs []TXOutput

	acc, validOutputs := bc.FindSpendableOutputs(from, amount)

	if acc < amount {
		log.Panic("ERROR: Not enough funds")
	}

	// Build a list of inputs
	for txid, outs := range validOutputs {
		txID, err := hex.DecodeString(txid)

		for _, out := range outs {
			input := TXInput{txID, out, from}
			inputs = append(inputs, input)
		}
	}

	// Build a list of outputs
	outputs = append(outputs, TXOutput{amount, to})
	if acc > amount {
		outputs = append(outputs, TXOutput{acc - amount, from}) // a change
	}

	tx := Transaction{nil, inputs, outputs}
	tx.SetID()

	return &tx
}
```
Trước khi tạo ra 1 output mới, thì đầu tiên phải tìm ra tất cả unspent outputs và chắc chắn rằng chúng lưu trữ đầy đủ value. Method `FindSpendableOutputs ` sẽ xử lý việc này:
```
func (bc *Blockchain) FindSpendableOutputs(address string, amount int) (int, map[string][]int) {
	unspentOutputs := make(map[string][]int)
	unspentTXs := bc.FindUnspentTransactions(address)
	accumulated := 0

Work:
	for _, tx := range unspentTXs {
		txID := hex.EncodeToString(tx.ID)

		for outIdx, out := range tx.Vout {
			if out.CanBeUnlockedWith(address) && accumulated < amount {
				accumulated += out.Value
				unspentOutputs[txID] = append(unspentOutputs[txID], outIdx)

				if accumulated >= amount {
					break Work
				}
			}
		}
	}

	return accumulated, unspentOutputs
}
```
Cuối cùng, hãy thực hiện lệnh `send`:
```
func (cli *CLI) send(from, to string, amount int) {
	bc := NewBlockchain(from)
	defer bc.db.Close()

	tx := NewUTXOTransaction(from, to, amount, bc)
	bc.MineBlock([]*Transaction{tx})
	fmt.Println("Success!")
}
```
Và kiểm tra xem việc send coins có hoạt động được không:
```
$ blockchain_go send -from Ivan -to Pedro -amount 6
00000001b56d60f86f72ab2a59fadb197d767b97d4873732be505e0a65cc1e37

Success!

$ blockchain_go getbalance -address Ivan
Balance of 'Ivan': 4

$ blockchain_go getbalance -address Pedro
Balance of 'Pedro': 6
```
Ngon! Bây giờ, hãy tạo nhiều giao dịch hơn và đảm bảo rằng gửi từ nhiều output đều hoạt động tốt:
```
$ blockchain_go send -from Pedro -to Helen -amount 2
00000099938725eb2c7730844b3cd40209d46bce2c2af9d87c2b7611fe9d5bdf

Success!

$ blockchain_go send -from Ivan -to Helen -amount 2
000000a2edf94334b1d94f98d22d7e4c973261660397dc7340464f7959a7a9aa

Success!
```
Bây giờ coin của Helen bị khóa trong 2 output : 1 từ Pedro , 1 từ Ivan. Hãy gửi chúng cho ai đó khác:
```
$ blockchain_go send -from Helen -to Rachel -amount 3
000000c58136cffa669e767b8f881d16e2ede3974d71df43058baaf8c069f1a0

Success!

$ blockchain_go getbalance -address Ivan
Balance of 'Ivan': 2

$ blockchain_go getbalance -address Pedro
Balance of 'Pedro': 4

$ blockchain_go getbalance -address Helen
Balance of 'Helen': 1

$ blockchain_go getbalance -address Rachel
Balance of 'Rachel': 3
```
Đc rồi đấy. Giờ test những case fail xem nào:
```
$ blockchain_go send -from Pedro -to Ivan -amount 5
panic: ERROR: Not enough funds

$ blockchain_go getbalance -address Pedro
Balance of 'Pedro': 4

$ blockchain_go getbalance -address Ivan
Balance of 'Ivan': 2
```

## References:
1. https://jeiwan.cc/posts/building-blockchain-in-go-part-4/
2. [Full code](https://github.com/Jeiwan/blockchain_go/tree/part_4)
3. [Transaction](https://en.bitcoin.it/wiki/Transaction)
4. [Coinbase](https://en.bitcoin.it/wiki/Coinbase)