Hello ! Xin chào ! Ok ! Bạn đã click vào bài viết này , vậy thì có lẽ bạn - cũng giống như tôi - cũng đã ít nhất nghe về, cũng như có hứng thú với sự phát triển khủng khiếp trong thời gian gần đây của tiền ảo. Và có thể bạn cũng sẽ muốn tìm hiểu về Blockchains - một trong những công nghệ nền tảng đứng sau nó.

Nhưng để hiểu về Blockchains thì quả thực là không dễ - hay ít nhất là đối với tôi. Tôi đã tốn khá nhiều công sức để theo dõi hàng loạt các video, các loại tutorial , và thực sự bực mình với việc chúng chứa quá ít ví dụ để hiểu.

Tôi thích việc học thông qua thực hành. Nó bắt buộc ta phải đối diện với vấn đề ở tầng coding - việc này giúp cho ta hiểu rõ vấn đề hơn. Và nếu bạn theo tôi cho đến cuối bài viết này, bạn sẽ có (ít nhất) 1 Blockchains có-thể-hoạt-động-được và hiểu 1 cách cơ bản làm thế nào mà nó hoạt động được.

## Một chút khái niệm trước khi bắt đầu 

Đơn giản nhất, blockchain là một chuỗi (chain) tuần tự các bản ghi (được gọi là Blocks). Và các block này là *immutable* (tức là một khi được tạo ra thì chúng không thể bị thay đổi nữa). Trong thực tế, các block này được sử dụng để lưu trữ các giao dịch (transaction), file hoặc bất cứ dữ liệu (data) nào bạn muốn. ĐIỀU QUAN TRỌNG là các block được nối (chain) với nhau sử dụng *hash* 

> Nếu bạn chưa biết hash là gì, có thể đọc thêm ở [đây](https://learncryptography.com/hash-functions/what-are-hash-functions)
    
## Step 1 : Build 1 blockchain

Xài 1 cái texteditor nào đó mà bạn thích (Vim ❤️), đặt 1 cái tên bất kì cho model (blockchain.rb :D )

### Prototype 1 blockchain

Đầu tiên , dựng 1 class `Blockchain` với constructor sẽ tạo một mảng rỗng ( để lưu trữ blockchain của ta), mà một cái mảng rỗng nữa để chứa các transactions. Đây có thể coi như là blueprint của class chúng ta sẽ xây dựng

```
class BlockChain
  def initialize
    @chain = Array.new
    @current_transactions = Array.new
  end

  def new_block
    # Thêm một block vào chain
  end

  def new_transaction
    # Thêm một transaction vào list transaction
  end

  class << self
    def hash(block)
      # Trả về hash của một block
    end        
  end

  def last_block
    # Trả về block cuối trong chain
  end
end
```

class `BlockChain` sẽ đảm nhiệm việc quản lý chain. Nó sẽ chứa các transaction và có thêm một vài helper method để thêm block vào chain. Hãy bắt đầu với từng method một.

### Một Block sẽ trông như thế nào ?

Mỗi một `Block` sẽ có *index*, một *timestamp* (ở dạng Unix time), một *list các transation*, và *proof* (sẽ giải thích sau), và cuối cùng là ***1 hash của Block trước nó***.

Đây là ví dụ về định dạng của 1 Block:

```
block = {
    'index': 1,
    'timestamp': 1506057125.900785,
    'transactions': [
        {
            'sender': "8527147fe1f5426f9dd545de4b27ee00",
            'recipient': "a77f5cdfa2934df3954a5c7c7da5df1f",
            'amount': 5,
        }
    ],
    'proof': 324984774000,
    'previous_hash': "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
}
```

Lúc này, ý tưởng về một `chuỗi` là rất rõ ràng - mỗi một block mới - ngoài việc chứa thông tin của chính nó - sẽ chứa thêm cả hash của Block trước đó. **Đây là điều thiết yếu nhất vì nó là thứ tạo nên tính immutability của blockchain** : Nếu một kẻ tấn công vào một Block trong chuỗi, thì khi đó tất cả các Block phía sau sẽ chứa thông tin (hash) sai.

### Thêm một transaction vào Block

Ta cần một cách nào đó để thêm các transaction vào Block. Hàm `new_transaction` sẽ chịu trách nhiệm cho việc này:

```
def new_transaction(sender, recipient, amount)
  @current_transactions << {
    sender: sender,
    recipient: recipient,
    amount: amount
  }
  return last_block[:index] + 1
end
```

Sau khi `new_transaction` thêm một transaction vào list, nó sẽ trả về `index` của block mà transaction sẽ được thêm vào - `chú ý  đây là index kế tiếp`. Giá trị này sẽ có ích về sau này.

### Tạo một block mới 

Khi `BlockChain` được khởi tạo, ta cần tạo cho nó một block ban đầu. Ta cũng cần thêm vào một `proof` cho block nguyên thủy này - là kết quả của quá trình mining (*có thể coi như là kết quả của công việc*). Ta sẽ quay lại với mining sau.

Cùng với việc khởi tạo một block ban đầu trong constructor , ta sẽ xem xét chi tiết implementation cho các method `new_block`, `new_transaction`, `hash`:

```
class BlockChain
  require 'digest'

  def initialize
    @chain = Array.new
    @current_transactions = Array.new

    new_block(previous_hash: 1, proof: 100)
  end

  def new_block(proof:, previous_hash: nil)
    block = {
      index: @chain.length + 1,
      timestamp: Time.current,
      transactions: @current_transactions,
      proof: proof,
      previous_hash: previous_hash || self.class.hash(@chain[-1])
    }

    @current_transactions = Array.new
    @chain << block
    return block
  end

  def new_transaction(sender, recipient, amount)
    @current_transactions << {
      sender: sender,
      recipient: recipient,
      amount: amount
    }
    return last_block[:index] + 1
  end

  class << self
    def hash(block)
      Digest::SHA256.hexdigest(block.to_json)
    end
  end

  def last_block
    @chain[-1]
  end
end
```

Đoạn code trên có thể coi là gần như đầy đủ - ta đã gần xong trong việc mô tả 1 blockchain ở mức sơ khai nhất. Nhưng đến bây giờ, có lẽ bạn vẫn thắc mắc là bằng cách nào các block mới được khởi tạo và ta sẽ làm gì với chúng.

### Hiểu về khái niệm "Proof of work"

Thuật toán `proof of work` (PoW) là *cách mà một Block mới được tạo hoặc được mined (đào)*. Mục đích của PoW là tìm ra một con số để giải quyết một vấn đề cụ thể nào đó. Con số đó phải *khó để tìm được, nhưng cũng phải dễ để xác minh* - đối với tất cả mọi người trong mạng network. 

Nghe rất khó hiểu phải không ??? Hãy cùng xem qua ví dụ nhỏ dưới đây.

Đặt ra bài toán rằng 1 hash của một số integer `x` nhân với một số `y` *phải* kết thúc với `0`.   
Nói cách khác - cặp số của ta phải thỏa mãn: `hash(x*y)=aho4d0sl...0`.   
Với ví dụ này, coi `x=5`, khi đó công việc của ta ở đây là phải tìm ra số `y` nhỏ nhất thỏa mãn bài toán trên :

```
require 'digest'

x = 5  # ví dụ ^^
y = 0  # bắt đầu tìm kiếm  y

while Digest::SHA256.hexdigest((x*y).to_json)[-1] != "0"
  y += 1
end

puts "Kết quả là: #{y}"
```

Kết quả được in ra sẽ là `y = 21`, hay nói cách khác `hash(5*21) = 1253e9373e781b7500266caa55150e08e210bc8cd8cc70d89985e3600155e860`

Trong Bitcoin, thuật toán PoW được gọi là ***Hashcash***. Và nó cũng không quá khác biệt với ví dụ ở trên của chúng ta - dĩ nhiên là ở mức độ khó hơn :) Nó là 1 `thuật toán` để các thợ đào (miner) cùng đua tranh để giải, từ đó có quyền tạo một block mới. Độ khó của thuật toán được xác định bởi số lượng character phải tìm trong chuỗi string đó. Cuối cùng, các miner sẽ nhận được phần thưởng cho đáp án của mình bằng coin - trong một transaction.

> Nhớ - các máy khác trong network cần phải có khả năng kiểm chứng (verify) giải pháp của miner một cách dễ dàng.

### Implement PoW

Hãy cùng implement một thuật toán tương tự trong Blockchain của chúng ta. Luật của ta bây giờ sẽ khác một chút:

> Tìm một số `p` mà khi `hash` nó cùng với kết quả của block trước đó, sẽ trả ra 1 hash mới với 4 số `0` đứng đầu 

```
class BlockChain

  ...
  def proof_of_work(last_proof)
    proof = 0
    while !self.class.valid_proof(last_proof, proof)
      proof += 1
    end
    return proof
  end
  
  ...
  class << self
    def valid_proof(last_proof, proof)
      guess = "#{last_proof}#{proof}"
      guess_hash = Digest::SHA256.hexdigest(guess.to_json)
      return guess_hash[0..3] == "0000"
    end
  end
  ...
  
end
```

Nếu muốn điều chỉnh độ khó của thuật toán, ta có thể thay đổi số lượng số `0` cần validate. Với ví dụ này thì 4 là đủ (bạn có thể thử và thấy rằng chỉ cần thêm 1 số thôi cũng sẽ làm việc tính toán tăng thời gian lên khá nhiều @@).

Class của ta đã gần hoàn thiện và giờ thì ta đã sẵn sàng để đưa nó vào sử dụng.

## Step 2: Xây dựng API cho blockchain

Với 1 ứng dụng demo như thế này, ta chỉ cần 3 method để thể hiện các phương thức cần thiết nhất:

- `/transaction/new` để tạo một transaction mới cho block.
- `/mine` để bảo server đào 1 block mới.
- `/chain` để trả về Blockchain đầy đủ.

Xây dựng 1 controller `block_chain_controller`:

```
class BlockChainController < ApplicationController
  def mine
    render json: {message: 'We will mine a new Block'}
  end

  def new_transaction
    render json: {message: 'We will add a new transaction'}
  end

  def full_chain    # Trả về chuỗi block_chain 
    response = SampleApp::Application.block_chain.to_json

    render json: response, status: 200
  end
end
```

... với routing 

```
...

namespace :block_chain do
  get :mine
  post :new_transaction
  get :full_chain
end
```

### Transaction Endpoint

Đây là format của 1 request cho 1 transaction mà user gửi lên server:

```
{
  "sender": "user address",
  "recipient": "another address",
  "amount": 5
}
```


Vì chúng ta đã có sẵn method để thêm transaction vào block, phần còn lại khá là đơn giản. Quay trở lại với `new_transaction` cho controller:

```
def new_transaction
  transaction_params = params.permit(:sender, :recipient, :amount)

  index = SampleApp::Application.block_chain.new_transaction(
    transaction_params[:sender],
    transaction_params[:recipient],
    transaction_params[:amount]
  )

  response = {message: "Transaction will be added to Block #{index}"}

  render json: response, status: 201
end
```

### Mining Endpoint

Phần này còn dễ hơn nữa :) Và nó có nhiệm vụ là làm 3 việc:
- Tính toán PoW
- Trả công cho miner bằng cách thêm 1 transaction đánh dấu việc trả cho chúng ta 1 coin
- Gắn thêm 1 Block vào chain

```
  def mine
    # Ta chạy thuật toán để lấy proof tiếp theo ...
    last_block = SampleApp::Application.block_chain.last_block
    last_proof = last_block[:proof]

    proof = SampleApp::Application.block_chain.proof_of_work(last_proof)

    # Nhận lấy phần thưởng cho việc tìm ra proof.
    # sender bằng "0" để kí hiệu rằng node này là dành cho việc đào được coin mới.
    SampleApp::Application.block_chain.new_transaction(
      0,
      "node_identifier",  # => Trên thực tế, đây là địa chỉ node của ta
      1
    )

    # Đóng dấu Block mới bằng việc thêm nó vào chain
    previous_hash = BlockChain.hash(last_block)
    block = SampleApp::Application.block_chain.new_block(proof: proof, previous_hash: previous_hash)

    response = {
      message: 'New Block Forged',
      index: block[:index],
      transactions: block[:transactions],
      proof: block[:proof],
      previous_hash: block[:previous_hash]
    }

    render json: response, status: 200
  end
```

Chú ý rằng `recipient` của mined block chính là địa chỉ của node của ta.   
Đến bước này, code đã gần hoàn chỉnh và ta có thể test thử - ta có thể thử với 1 client kiểu như cURL trên linux hoặc Postman.

## Step 3: Chạy thử blockchain

Chạy server Rails

```
$ rails server

=> Booting Puma
=> Rails 5.0.7 application starting in development on http://localhost:3000
=> Run `rails server -h` for more startup options
Puma starting in single mode...
* Version 3.11.4 (ruby 2.4.1-p111), codename: Love Song
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://0.0.0.0:3000
Use Ctrl-C to stop

```
<br><br>
Bắt đầu thử với API đầu tiên - đào một block bằng cách tạo `GET` request tới `localhost:3000/block_chain/mine`:

![](https://images.viblo.asia/9e8dccbe-8b0e-4a52-9844-a8b3e2ff6492.png)

Tiếp đó, tạo một transaction mới bằng cách tạo một `POST` request tới `localhost:3000/block_chain/new_transaction` với body chứa thông tin của transaction:


![](https://images.viblo.asia/97c1b466-5f5d-4fb2-93fd-119499e1e5ef.png)

Tiếp tục đào thêm nhiều block và tạo nhiều transaction mới , sau đó xem lại toàn bộ kết quả dựa theo API thứ 3: `localhost:3000/block_chain/full_chain`.  
Ta có thể thấy 1 đoạn chain tương tự như thế này:

```
{
    "chain": [
        {
            "index": 1,
            "timestamp": "2018-05-03T07:08:24.332Z",
            "transactions": [],
            "proof": 100,
            "previous_hash": 1
        },
        {
            "index": 2,
            "timestamp": "2018-05-03T07:08:28.268Z",
            "transactions": [
                {
                    "sender": 0,
                    "recipient": "node_identifier",
                    "amount": 1
                }
            ],
            "proof": 35493,
            "previous_hash": "e8f9a4bf0f97d03a2c275760744c63ca7d6175ee090659bc95f1ef799d59b870"
        },
        {
            "index": 3,
            "timestamp": "2018-05-03T07:16:20.573Z",
            "transactions": [
                {
                    "sender": "do4d0dk0gk3nvobm50fmv04mfglb0",
                    "recipient": "\"someone else address\"",
                    "amount": "5"
                },
                {
                    "sender": "do4d0dk0gk3nvobm50fmv04mfglb0",
                    "recipient": "\"someone else address\"",
                    "amount": "5"
                },
                {
                    "sender": 0,
                    "recipient": "node_identifier",
                    "amount": 1
                }
            ],
            "proof": 35694,
            "previous_hash": "ee507263b637113d74fad784cc830d2ac3f7843f1f1d4e206fd446df4ba01ea6"
        },
        {
            "index": 4,
            "timestamp": "2018-05-03T07:16:25.130Z",
            "transactions": [
                {
                    "sender": "do4d0dk0gk3nvobm50fmv04mfglb0",
                    "recipient": "\"someone else address\"",
                    "amount": "5"
                },
                {
                    "sender": 0,
                    "recipient": "node_identifier",
                    "amount": 1
                }
            ],
            "proof": 34596,
            "previous_hash": "876a2d07da34722771d6157f49d8a423fa5c222824df21f7734b3ec37842479c"
        },
        {
            "index": 5,
            "timestamp": "2018-05-03T07:16:25.970Z",
            "transactions": [
                {
                    "sender": 0,
                    "recipient": "node_identifier",
                    "amount": 1
                }
            ],
            "proof": 35284,
            "previous_hash": "88326603fe0b5e8d797ad917afb58e272c6ad4c80f6252493af70a208f037c60"
        }
    ],
    "current_transactions": []
}
```

## Step 4: Đồng thuận (consensus)

Đây là một tính năng rất hay. Ta đã có một blockchain cơ bản - cho phép nhận các transaction và cho phép đào Block mới. Nhưng toàn bộ ý nghĩa của Blockchains đó là chúng nên được tổ chức theo dạng *phân tán (decentralized)*. Và một khi ở dạng phân tán, vậy thì làm cách nào ta đảm bảo tất cả các chain đều thể hiện cho một chain duy nhất ? Đây là vấn đề về tạo sự đồng thuận (*Consensus*), và ta sẽ phải implement thuật toán Consensus nếu ta muốn có nhiều hơn 1 node tham gia vào network.

### Đăng kí thêm 1 node mới 

Trước khi ta có thể implement thuật toán Consensus, ta cần có một cách để cho phép một node biết về các node xung quanh nó. Mỗi node trong mạng cần giữ một bản đăng kí danh tính (registry) của các node khác trong mạng. Do đó, ta cần có thêm 2 endpoint:

- `/nodes/register` - chấp nhận 1 list các node.
- `/nodes/resolve` - cho phép ta implement thuật toán Consensus - thuật toán này sẽ giúp giải quyết mọi conflict, giữ cho các node có được chain đúng và đồng bộ.

Ta cần chỉnh sửa lại constructor của `BlockChain` và cung cấp thêm method để đăng kí các node:

```
class BlockChain
  attr_accessor :nodes, :chain
  
  def initialize
    ...
    @nodes = Set[]
  end
  
  ...
  def register_node(address)
    @nodes << address
  end
end
```

Chú ý lại là ta sử dụng `Set` để lưu trữ các nodes, điều này sẽ giúp danh sách các node là uniq - nếu ta có thêm cùng 1 địa chỉ vào node nhiều lần, nó cũng sẽ chỉ tính là 1 địa chỉ duy nhất.

### Implement thuật toán Consensus 

Như đã đề cập, một conflict xảy ra khi 1 node có chain khác với các node khác. Để giải quyết, ta cần tạo ra một luật : *nếu có conflict xảy ra, lấy chain nào valid và dài nhất*. Sử dụng thuật toán này, ta sẽ giữ được sự đồng thuận giữa các node trong network, nhất là khi có tranh chấp xảy ra:

```
class BlockChain

  .......
  class << self 
    # Hàm này sẽ kiểm tra xem 1 blockchain có valid hay không.
    def valid_chain(chain)
      last_block = chain[0]
      current_index = 1

      while current_index < chain.length
        block = chain[current_index]
        # Kiểm tra xem hash của block có chính xác không ?
        return false if block[:previous_hash] != self.class.hash(last_block)
        # Kiểm tra xem Proof of Work có chính xác
        return false unless self.class.valid_proof(last_block[:proof], block[:proof])

        last_block = block
        current_index += 1
      end

      return true
    end
  end
   
  ...
  # Đây là thuật toán Consensus của ta: nó sẽ thực hiện bằng cách thay thế chain của ta bằng chain dài nhất trong network
  # Trả về true nếu chain hiện tại bị thay thế
  def resolve_conflicts
    new_chain = nil

    max_length = @chain.length # tính toán độ dài chain dài nhất, khởi đầu là chain hiện tại

    for node in @nodes
      response = Net::HTTP.new(node).request # => For DEMO purporse: implement request để lấy chain hàng xóm được rút ngắn :)     

      length = response[:length]
      chain = response[:chain]

      if (length > max_length && self.class.valid_chain(chain)) # Nếu chain hàng xóm dài hơn của ta và valid => thay thế
        max_length = length
        new_chain = chain
      end
    end

    # Cuối cùng, trả về true nếu chain hiện tại bị thay thế, trả về false nếu ngược lại
    if new_chain
      @chain = new_chain
      return true
    end
    return false
  end

end
```

Hàm đầu tiên - `valid_chain` - có trách nhiệm kiểm tra xem 1 chain có valid hay không bằng cách duyệt qua từng block và verify cả hash và proof.

Hàm `resolve_conflicts` sẽ duyệt qua tất cả các node hàng xóm, *download* về chain hiện tại của họ, và kiểm tra xác thực. *Nếu có một chain nào valid và dài hơn chain hiện tại , thì ta sẽ thay thế bằng chain đó*.

Đó là implement cho 2 hàm trong class `BlockChain`, giờ ta sẽ implement thêm 2 API endpoint trong controller

```
class BlockChainController < ApplicationController
  ...
  def register_nodes
    nodes = params[:nodes]

    for node in nodes
      SampleApp::Application.block_chain.register_node(node)
    end

    response = {
      message: 'New nodes have been added',
      total_nodes: SampleApp::Application.block_chain.nodes
    }

    return json: response, status: 200
  end

  def resolve
    replaced = SampleApp::Application.block_chain.resolve_conflicts

    message = replaced ? 'Our chain was replaced' : 'Our chain is authoritative'

    response = {
      message: message,
      chain: SampleApp::Application.block_chain.chain
    }

    return json: response, 200
  end
end
```

Bước này, để test, bạn có thể chạy server trên mạng LAN, kiếm thêm 1, 2 cái máy để chạy thử. Hoặc đơn giản hơn là chạy server test trên các cổng khác nhau 

![](https://images.viblo.asia/79d7f95d-3f0b-4f08-8a7a-23323542f595.png)

Sau đó, tạo một vài Block mới trong node 2 (cổng 3001), rồi gọi `/nodes/resolve` từ node 1 (cổng hiện tại - 3000). Khi đó, chain trên cổng hiện tại sẽ bị thay thế :

![](https://images.viblo.asia/8b63d710-0936-4429-a798-69d84a44564f.png)

----------------------------------------

Vậy là kết thúc - bạn có thể bày trò nghịch bằng cách rủ một vài bạn bè cùng nghịch thử Blockchain của chính mình :)

Tôi hi vọng rằng bài viết trên sẽ có thể tạo chút hứng thú cho các bạn. Tôi đã cực kì phấn khích với Cryptocurrencies vì tôi tin rằng Blockchains sẽ nhanh chóng thay đổi cách chúng ta nghĩ về mọi mặt của đời sống từ kinh tế, chính trị ... cho tới những vấn đề nhỏ hơn và gần gũi hơn.

## Tài liệu 

Source dịch (+ mã nguồn in Python): https://hackernoon.com/learn-blockchains-by-building-one-117428612f46