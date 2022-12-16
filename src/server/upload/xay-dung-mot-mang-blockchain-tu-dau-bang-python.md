![](https://images.viblo.asia/914b417f-6795-4242-85ad-ac777d5a7356.jpg)

Trong bài hướng dẫn ngày hôm nay chúng ta sẽ đi từ những bước đầu tiên để xây dựng lên một mạng blockchain đơn giản bằng ngôn ngữ python. Giúp chúng ta sẽ có cái nhìn tổng quát nhất về cách thức một blockchain hoạt động.

Bằng cách sử dụng microframework Flask để tạo ra các điểm endpoint, sau đó chạy trên nhiều máy để tạo một mạng phi tập trung. Chúng ta sẽ học cách xây dựng một giao diện người dùng đơn giản để tương tác với blockchain và lưu trữ thông tin cho mọi trường hợp sử dụng, chẳng hạn như thanh toán ngang hàng, trò chuyện hoặc thương mại điện tử. 

Mục tiêu là sẽ xây dựng một ứng dụng cho phép người dùng chia sẻ thông tin bằng cách đăng các bài post. Nội dung sẽ được lưu trữ trên blockchain, nên nó sẽ không thể thay đổi và tồn tại vĩnh viễn. Người dùng sẽ tương tác với ứng dụng thông qua một giao diện web đơn giản.

Chúng ta sẽ sử dụng cách tiếp cận từ dưới lên. Bắt đầu bằng cách xác định cấu trúc dữ liệu mà chúng tôi sẽ lưu trữ trong blockchain. Mỗi bài post sẽ bao gồm ba yếu tố cần thiết:
* Content
* Author
* Timestamp

Sau đây chúng ta sẽ đi luôn vào các bước thực hiện:

# Lưu trữ các giao dịch trong các blocks
Ở đây chúng ta sẽ lưu trữ theo định dạng được sử dụng rộng rãi đó là JSON. Và dưới đây là những gì một bài post sẽ được lưu trữ trong blockchain:
```
{ 
  "author": "some_author_name", 
  "content": "Some thoughts that author wants to share", 
  "timestamp": "The time at which the content was created"
}
```

Thuật ngữ `data` trong blockchain thường thay thế bằng `transaction`. Nên ở đây chúng ta thống nhất sử dụng  thuật ngữ `transaction` để chỉ `data` trong ứng dụng này.

Các transaction sẽ được đóng gói thành block. Một block có thể chứa một hoặc nhiều transaction. Các blocks chứa các transactions được tạo thường xuyên và được thêm vào blockchain. Do có nhiều blocks nên mỗi block sẽ có một `ID` duy nhất:

```python
class Block:
    def __init__(self, index, transactions, timestamp):
        """
        Constructor cho một `Block` class.
        :param index: Chỉ số ID duy nhất của một block.
        :param transactions: Danh sách các transactions.
        :param timestamp: Thời gian tạo block.
        """
        self.index = index 
        self.transactions = transactions 
        self.timestamp = timestamp
```

# Thêm chữ ký số vào các blocks
Để ngăn các dữ liệu giả mạo được lưu trữ trên bên trong các blocks và để phát hiện ra điều này chúng ta sẽ sử dụng hàm băm.

**Hàm băm** là một hàm lấy dữ liệu có kích thước bất kỳ và tạo ra dữ liệu có kích thước cố định, thường được sử dụng để xác định dữ liệu đầu vào. Hàm băm lý tưởng thường có những đặc điểm sau là:
* Dễ dàng để tính toán.
* Cùng một dữ liệu sẽ luôn dẫn đến cùng một giá trị băm.
* Phải có tính ngẫu nhiên thống nhất tức là ngay cả một thay đổi bit trong dữ liệu cũng sẽ thay đổi giá trị băm đáng kể.

Kết quả của những tính chất trên là:
* Hầu như không thể đoán được dữ liệu đầu vào được băm. (Cách duy nhất là thử tất cả các trường hợp đầu vào có thể)
* Nếu bạn biết cả đầu vào và giá trị băm, bạn chỉ cần truyền đầu vào qua hàm băm để xác minh giá trị băm được cung cấp có đúng hay không.

Có nhiều hàm băm phổ biến khác nhau. Đây là một ví dụ trong Python ta sử dụng hàm băm `SHA-256`:
```python
>>> from hashlib import sha256
>>> data = b"Some variable length data"
>>> sha256(data).hexdigest()
'b919fbbcae38e2bdaebb6c04ed4098e5c70563d2dc51e085f784c058ff208516'
>>> sha256(data).hexdigest() # bất kể bạn chạy nó bao nhiêu lần, kết quả sẽ là cùng một chuỗi 256 ký tự
'b919fbbcae38e2bdaebb6c04ed4098e5c70563d2dc51e085f784c058ff208516'
>>>  data = b"Some variable length data2" # Đã thêm một ký tự ở cuối.
'9fcaab521baf8e83f07512a7de7a0f567f6eef2688e8b9490694ada0a3ddeec8'

# Note: giá trị băm đã thay đổi hoàn toàn !
```

Chúng ta sẽ lưu trữ giá trị băm của khối vào một trường bên trong đối tượng `Block` và nó sẽ hoạt động giống như chữ ký số (hoặc chữ ký) của dữ liệu chứa trong đó:

```python
from hashlib import sha256
import json

def compute_hash(block):
    """
    Chuyển đối tượng block thành dạng string JSON sau đó trả về giá trị băm.
    """
    block_string = json.dumps(self.__dict__, sort_keys=True)
    return sha256(block_string.encode()).hexdigest()
```

# Nối các blocks thành chain(chuỗi)

Chúng ta cần một cách để đảm bảo rằng bất kỳ thay đổi nào trong các blocks trước đó sẽ làm mất hiệu lực toàn bộ chain. Cách làm của Bitcoin là tạo ra sự phụ thuộc giữa các khối liên tiếp bằng cách xâu chuỗi chúng với giá trị băm của block ngay trước. Có nghĩa là sẽ lưu giá trị băm của block trước đó trong block hiện tại khi thêm mới vào một trường có tên là `previous_hash`.

Sẽ có câu hỏi: vậy còn block đầu tiên thì sao? block đó được gọi là **block genesis** và nó có thể được tạo thủ công hoặc thông qua một số logic nào đó.

```python
from hashlib import sha256
import json
import time


class Block:
    def__init__(self, index, transactions, timestamp, previous_hash):
       """
        Constructor cho một `Block` class.
        :param index: Chỉ số ID duy nhất của một block.
        :param transactions: Danh sách các transactions.
        :param timestamp: Thời gian tạo block.
        :param previous_hash: Chứa giá trị băm của block đứng trước trong chain.
        """
        self.index = index
        self.transactions = transactions
        self.timestamp = timestamp
        self.previous_hash = previous_hash # thêm trường previous_hash

    def compute_hash(self):
        """
        Chuyển đối tượng block thành dạng string JSON sau đó trả về giá trị băm.
        """
        block_string = json.dumps(self.__dict__, sort_keys=True)
        return sha256(block_string.encode()).hexdigest()

class Blockchain:

    def __init__(self):
        """
        Constructor của class `Blockchain`.
        """
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        """
        Hàm generate ra `block genesis` và thêm nó vào chain. Block này có index 
        bằng 0, previous_hash là 0 và một giá trị băm hợp lệ.
        """
        genesis_block = Block(0, [], time.time(), "0")
        genesis_block.hash = genesis_block.compute_hash()
        self.chain.append(genesis_block)

    @property
    def last_block(self):
        """
        Một cách đơn giản để lấy block cuối cùng trong chain. Chú ý chain sẽ luôn 
        có một block đó chính là block genesis
        """
        return self.chain[-1]
```

Bây giờ, nếu nội dung của bất kỳ khối nào trước đó thay đổi:
* Giá trị băm của khối trước đó sẽ thay đổi.
* Điều này sẽ dẫn đến sự không phù hợp với trường previous_hash trong khối tiếp theo.
* Vì dữ liệu đầu vào để tính toán giá trị băm của bất kỳ khối nào cũng bao gồm cả trường previous_hash, nên giá trị băm của khối tiếp theo cũng sẽ thay đổi.

Cuối cùng, toàn bộ chain theo khối thay thế bị vô hiệu và cách duy nhất để khắc phục là tính toán lại toàn bộ chain.

# Triển khai thuật toán Proof-Of-Work(Bằng chứng công việc)

Dù vậy vẫn có một vấn đề đó là giá trị băm của tất cả các block tiếp theo có thể được tính lại khá dễ dàng để tạo ra một blockchain khác hợp lệ. Để ngăn chặn điều này, chúng ta có thể khai thác tính bất đối xứng của hàm băm mà chúng ta đã thảo luận ở trên để thực hiện nhiệm vụ tính toán giá trị băm khó khăn và ngẫu nhiên hơn. Điều này có nghĩa là: Thay vì chấp nhận bất kỳ giá trị băm nào cho block, chúng ta thêm một số ràng buộc cho nó. Hãy thêm một ràng buộc rằng giá trị băm của chúng ta sẽ bắt đầu bằng **n** các số 0 phía trước trong đó **n** là số nguyên dương.

Ở đây ta sẽ thêm một số dữ liệu giả mà ta có thể thay đổi. Ta sẽ thêm một trường mới là trường **nonce** . Số nonce là một số mà chúng ta có thể tiếp tục thay đổi cho đến khi chúng ta có được một hàm băm thỏa mãn ràng buộc. Việc nonce thỏa mãn các ràng buộc đóng vai trò là bằng chứng cho thấy một số tính toán đã được thực hiện. Kỹ thuật này là phiên bản đơn giản hóa của thuật toán [Hashcash](https://en.wikipedia.org/wiki/Hashcash) được sử dụng trong Bitcoin. Số lượng số 0 được chỉ định trong ràng buộc xác định độ khó của thuật toán PoW (số lượng số 0 càng lớn, càng khó để tìm ra nonce).

Ngoài ra do tính bất đối xứng nên Proof-of-work(PoW) khó tính toán nhưng rất dễ xác minh một khi bạn tìm ra nonce (bạn chỉ cần chạy lại hàm băm):

```python
class Blockchain:
    # độ khó của thuật toán POW
    difficulty = 2
    
    
    ......
    

    def proof_of_work(self, block):
        """
        Hàm thử các giá trị khác nhau của nonce để lấy giá trị băm thỏa mãn
        """
        block.nonce = 0

        computed_hash = block.compute_hash()
        while not computed_hash.startswith('0' * Blockchain.difficulty):
            block.nonce += 1
            computed_hash = block.compute_hash()

        return computed_hash
```

# Thêm block vào Chain
Để thêm một block vào chain, trước tiên chúng ta phải xác minh rằng:
* Dữ liệu không bị giả mạo (proof of work được cung cấp là chính xác).
* Thứ tự của các giao dịch được giữ nguyên.

```python
class Blockchain:

   .....

    def add_block(self, block, proof):
        """
        Chức năng thêm block vào chain sau khi xác minh. Xác minh bao gồm:
        * Check nếu proof is đúng.
        * Trường previous_hash đúng và là giá trị băm của block 
        mới nhất trong chain.
        """
        previous_hash = self.last_block.hash

        if previous_hash != block.previous_hash:
            return False

        if not Blockchain.is_valid_proof(block, proof):
            return False

        block.hash = proof
        self.chain.append(block)
        return True

    def is_valid_proof(self, block, block_hash):
        """
        Kiểm tra xem block_hash có phải là giá trị băm hợp lệ của block hay không 
        và thỏa mãn các tiêu chí độ khó.
        """
        return (block_hash.startswith('0' * Blockchain.difficulty) and
                block_hash == block.compute_hash())
```

# Mining

Các transactions ban đầu sẽ được lưu trữ dưới dạng một nhóm các transactions chưa được xác nhận. Quá trình đưa các transactions chưa được xác nhận vào một block và tính toán POW được gọi là Mining các blocks. Khi nonce thỏa mãn các ràng buộc được tìm ra, chúng ta có thể nói rằng một block đã được mined và nó có thể được đưa vào blockchain.

Trong hầu hết các loại tiền điện tử (bao gồm Bitcoin), những người miners  có thể được trao một số tiền điện tử như một phần thưởng cho việc sử dụng sức mạnh tính toán của họ để tính toán POW. Đây là function mining:

```python
class Blockchain:

    def __init__(self):
        self.unconfirmed_transactions = [] # list transactions chưa được xác nhận
        self.chain = []
        self.create_genesis_block()



    ....



    def add_new_transaction(self, transaction):
        self.unconfirmed_transactions.append(transaction)

    def mine(self):
        """
        Hàm thêm transactions pending
         vào blockchain bằng các thêm chúng vào block và đưa ra PoW.
        """
        if not self.unconfirmed_transactions:
            return False

        last_block = self.last_block

        new_block = Block(index=last_block.index + 1,
                          transactions=self.unconfirmed_transactions,
                          timestamp=time.time(),
                          previous_hash=last_block.hash)

        proof = self.proof_of_work(new_block)
        self.add_block(new_block, proof)
        self.unconfirmed_transactions = []
        return new_block.index
```

Ok đây là code của phần xửa lý:  [source code](https://github.com/satwikkansal/python_blockchain_app/blob/3d252de03586ebb96acb689842ca2d451c0eec47/node_server.py)

# Tạo giao diện
Phần này chúng ta sẽ tạo giao diện cho node blockchain để tương tác với ứng dụng chúng ta vừa xây dựng. Ở đây sẽ sử dụng một microframework Python phổ biến được gọi là Flask để tạo API REST tương tác và gọi các actions khác nhau trong node blockchain của chúng ta. Nếu bạn đã từng làm việc với bất kỳ framework web nào trước đây, code dưới đây sẽ không khó theo dõi.

```python
from flask import Flask, request
import requests

# Khởi tại ứng dụng flask
app =  Flask(__name__)

# Khởi tạo object Blockchain
blockchain = Blockchain()
```

Chúng ta cần một route để ứng dụng có thể tạo mới một transaction và ở đây chính là bài post

```python
@app.route('/new_transaction', methods=['POST'])
def new_transaction():
    tx_data = request.get_json()
    required_fields = ["author", "content"]

    for field in required_fields:
        if not tx_data.get(field):
            return "Invalid transaction data", 404

    tx_data["timestamp"] = time.time()

    blockchain.add_new_transaction(tx_data)

    return "Success", 201
```

Sẽ có một route  trả về bản sao của chain. Và route này ứng dụng sẽ sử dụng để để truy vấn tất cả dữ liệu cần hiển thị:

```python
@app.route('/chain', methods=['GET'])
def get_chain():
    chain_data = []
    for block in blockchain.chain:
        chain_data.append(block.__dict__)
    return json.dumps({"length": len(chain_data),
                       "chain": chain_data})
```

Còn đây là route để gửi một request yêu cầu mine - xác thực các transaction chưa được xác thực(nếu có). Chúng ta sẽ sử dụng nó để bắt đầu một lệnh mine từ chính ứng dụng của chúng ta:

```python
@app.route('/mine', methods=['GET'])
def mine_unconfirmed_transactions():
    result = blockchain.mine()
    if not result:
        return "No transactions to mine"
    return "Block #{} is mined.".format(result)

@app.route('/pending_tx')
def get_pending_tx():
    return json.dumps(blockchain.unconfirmed_transactions)
```
# Thiết lập cơ chế đồng thuận và phân tán

Có một vấn đề blockchain mà chúng ta đã triển khai đang chạy trên một máy tính. Mặc dù chúng ta đã liên kết các block bằng giá trị băm và áp dụng POW thì vẫn không thể tin tưởng vào một thực thể duy nhất (trong trường hợp ở đây là một máy duy nhất). Chúng ta cần dữ liệu được phân tán tức cần nhiều node để duy trì blockchain. Vì vậy, để chuyển từ một node đơn sang mạng ngang hàng, trước tiên chúng ta hãy tạo một cơ chế để cho một node mới có thể biết về các  peers(đồng nghiệp) khác trong mạng:

```python
# Chứa địa chỉ host của các thành viên tham gia khác của mạng
peers = set()

# route thêm một peer mới vào mạng
@app.route('/register_node', methods=['POST'])
def register_new_peers():
    # Địa chỉ host đến các node ngang hàng 
    node_address = request.get_json()["node_address"]
    if not node_address:
        return "Invalid data", 400

    # Thêm địa chỉ node vào danh sách
    peers.add(node_address)

    # Trả lại blockchain mới
    return get_chain()


@app.route('/register_with', methods=['POST'])
def register_with_existing_node():
    """
    Trong nội bộ gọi đến route `register_node` để
    đăng ký node hiện tại với node từ xa được chỉ định trong
    request và cập nhật lại mạng blockchain
    """
    node_address = request.get_json()["node_address"]
    if not node_address:
        return "Invalid data", 400

    data = {"node_address": request.host_url}
    headers = {'Content-Type': "application/json"}

    # Reuqest đăng ký với node từ xa và lấy thông tin
    response = requests.post(node_address + "/register_node",
                             data=json.dumps(data), headers=headers)

    if response.status_code == 200:
        global blockchain
        global peers
        # update chain và các peers
        chain_dump = response.json()['chain']
        blockchain = create_chain_from_dump(chain_dump)
        peers.update(response.json()['peers'])
        return "Registration successful", 200
    else:
        # Nếu có lỗi xảy ra, API sẽ trả lại response
        return response.content, response.status_code


def create_chain_from_dump(chain_dump):
    blockchain = Blockchain()
    for idx, block_data in enumerate(chain_dump):
        block = Block(block_data["index"],
                      block_data["transactions"],
                      block_data["timestamp"],
                      block_data["previous_hash"])
        proof = block_data['hash']
        if idx > 0:
            added = blockchain.add_block(block, proof)
            if not added:
                raise Exception("The chain dump is tampered!!")
        else:  # block này là một block genesis nên không cần verification
            blockchain.chain.append(block)
    return blockchain
```

Một node mới tham gia vào mạng có thể gọi hàm `register_with_existing_node`  để đăng ký với các node hiện có trong mạng. Điều này sẽ giúp ích những điều sau:

- Request node từ xa để thêm một peer mới vào danh sách các peer đã có.
- Dễ dàng Khởi tạo blockchain của node mới bằng cách lấy của node từ xa.
- Đồng bộ hóa lại blockchain với mạng nếu node đó không kết nối với mạng nữa.

Tuy nhiên có một vấn đề với nhiều node do thao tác có chủ ý hoặc lý do vô ý (như độ trễ mạng), bản sao của chain một vài nút có thể khác nhau. Trong trường hợp đó các node cần phải đồng ý với một số phiên bản của chain để duy trì tính toàn vẹn của toàn bộ hệ thống. Nói cách khác, chúng ta cần đạt được sự đồng thuận.

Một thuật toán đồng thuận đơn giản có thể đồng ý với chain hợp lệ dài nhất khi các chain của các node tham gia trong mạng xuất xuất hiện rẽ nhánh. Lý do đằng sau phương pháp này là chain dài nhất chứng tỏ số lượng công việc được thực hiện nhiều nhất (hãy nhớ PoW rất khó tính):

```python
class Blockchain

   ....
   
   
    def check_chain_validity(cls, chain):
        """
        Là một hàm helper để check nếu toàn bộ blockchain là đúng
        """
        result = True
        previous_hash = "0"

        # Lặp lại qua tất cả các block
        for block in chain:
            block_hash = block.hash
            # xóa trường đã băm để tính toán lại giá trị băm
            # sử dụng `compute_hash` method.
            delattr(block, "hash")

            if not cls.is_valid_proof(block, block.hash) or \
                    previous_hash != block.previous_hash:
                result = False
                break

            block.hash, previous_hash = block_hash, block_hash

        return result

def consensus():
    """
   Thuật toán đồng thuận đơn giản ở đấy là nếu một chuỗi hợp lệ dài hơn được
   tìm thấy, chain của chúng ta sẽ thay thế bằng nó.
    """
    global blockchain

    longest_chain = None
    current_len = len(blockchain.chain)

    for node in peers:
        response = requests.get('{}/chain'.format(node))
        length = response.json()['length']
        chain = response.json()['chain']
        if length > current_len and blockchain.check_chain_validity(chain):
              # Chain hợp lệ dài hơn được tìm thấy!
            current_len = length
            longest_chain = chain

    if longest_chain:
        blockchain = longest_chain
        return True

    return False
```

Tiếp đến chúng ta cần phát triển một cách để bất kỳ node nào thông báo cho mạng rằng nó đã mining ra một block để mọi người có thể cập nhật blockchain của họ và chuyển sang mining các block khác. Các node khác có thể chỉ cần xác minh PoW và thêm block mới được khai thác vào chain tương ứng của mình (hãy nhớ rằng việc xác minh là dễ dàng khi biết được nonce):

```python
# Route này để thêm khối người khác vừa mined.
# Đầu tiên cần xac minh block và sau đó là thêm vào chain
@app.route('/add_block', methods=['POST'])
def verify_and_add_block():
    block_data = request.get_json()
    block = Block(block_data["index"],
                  block_data["transactions"],
                  block_data["timestamp"],
                  block_data["previous_hash"])

    proof = block_data['hash']
    added = blockchain.add_block(block, proof)

    if not added:
        return "The block was discarded by the node", 400

    return "Block added to the chain", 201


def announce_new_block(block):
    """
    Một hàm thông báo cho mạng sau khi một block đã được mined.
    Các block khác chỉ có thể xác minh PoW và thêm nó vào
    chuỗi tương ứng.
    """
    for peer in peers:
        url = "{}add_block".format(peer)
        requests.post(url, data=json.dumps(block.__dict__, sort_keys=True))
```

Hàm `announce_new_block`  nên được gọi  sau mỗi block được mined bởi các node để các peer khác có thể thêm nó vào chain của họ. 

```python
@app.route('/mine', methods=['GET'])
def mine_unconfirmed_transactions():
    result = blockchain.mine()
    if not result:
        return "No transactions to mine"
    else:
        # Đảm bảo chúng ta có chain dài nhất trước khi thông báo với mạng
        chain_length = len(blockchain.chain)
        consensus()
        if chain_length == len(blockchain.chain):
            # thông báo block được mined gần đây vào mạng
            announce_new_block(blockchain.last_block)
        return "Block #{} is mined.".format(blockchain.last_block.index
```

# Xây dựng ứng dụng web
Vậy là máy chủ blockchain đã được thiết lập. Bạn có thể thấy [source code ở đây](https://github.com/satwikkansal/python_blockchain_app/blob/631346a130a4effc374fc63f58a08de94bae3c8a/node_server.py).

Bây giờ là lúc bắt đầu phát triển giao diện của ứng dụng web. Chúng ta đã sử dụng template **Jinja2** để hiển thị các view và một số CSS để làm cho mọi thứ trở nên đẹp mắt.

Ứng dụng cần kết nối với một node trong mạng blockchain để tìm nạp dữ liệu và cũng để gửi dữ liệu mới.

```python
import datetime
import json

import requests
from flask import render_template, redirect, request

from app import app

# Node mà chúng ta sẽ kết nối để fetch dữ liệu về
CONNECTED_NODE_ADDRESS = "http://127.0.0.1:8000"

posts = []
```

Hàm `fetch_posts`:

```python
def fetch_posts():
    """
    Hàm get chain từ node, phân tíc dữ liệu và lưu trữ cục bộ
    """
    get_chain_address = "{}/chain".format(CONNECTED_NODE_ADDRESS)
    response = requests.get(get_chain_address)
    if response.status_code == 200:
        content = []
        chain = json.loads(response.content)
        for block in chain["chain"]:
            for tx in block["transactions"]:
                tx["index"] = block["index"]
                tx["hash"] = block["previous_hash"]
                content.append(tx)

        global posts
        posts = sorted(content,
                       key=lambda k: k['timestamp'],
                       reverse=True)
```

Ứng dụng có một biểu mẫu HTML để nhập đầu vào của người dùng và sau đó thực hiện request POST đến node được kết nối để thêm transaction vào nhóm transactions chưa được xác nhận. Transaction sau đó được mining bởi mạng và cuối cùng được tìm nạp sau khi reload trang:

```python
@app.route('/submit', methods=['POST'])
def submit_textarea():
    """
    Route để tạo transaction mới
    """
    post_content = request.form["content"]
    author = request.form["author"]

    post_object = {
        'author': author,
        'content': post_content,
    }

    # Submit transaction
    new_tx_address = "{}/new_transaction".format(CONNECTED_NODE_ADDRESS)

    requests.post(new_tx_address,
                  json=post_object,
                  headers={'Content-type': 'application/json'})

    # Trả về homepage
    return redirect('/')
```


# Chạy ứng dụng
Đến đây chúng ta đã hoàn thành! [source code](https://github.com/satwikkansal/python_blockchain_app/tree/ibm_blockchain_post)

Cìa đặt:

```shell
$ cd python_blockchain_app
$ pip install -r requirements.txt
```

Chạy một node blockchain trên cổng 8000
```shell
$ export FLASK_APP=node_server.py
$ flask run --port 8000
```
chạy ứng dụng web:
```shell
$ python run_app.py
```
Ứng dụng sẽ chạy tại http://localhost:5000 .

![](https://images.viblo.asia/776d77c9-8dcc-4b72-8520-11f772087dfd.png)

![](https://images.viblo.asia/00150b94-d69e-4228-8053-558ce10fb0d1.png)

![](https://images.viblo.asia/d35703e0-9a9f-4d9e-a09a-d21af8e6da9a.png)


# Chạy nhiều node

Ta sẽ chạy nhiều node bằng cách chạy trên các cổng khac nhau. Vả sử dụng `register_with` để đăng ký thành một mạng ngang hàng:

```shell
# already running
$ flask run --port 8000 &
# spinning up new nodes
$ flask run --port 8001 &
$ flask run --port 8002 &
```


```shell
$ curl -X POST \
  http://127.0.0.1:8001/register_with \
  -H 'Content-Type: application/json' \
  -d '{"node_address": "http://127.0.0.1:8000"}'

$ curl -X POST \
  http://127.0.0.1:8002/register_with \
  -H 'Content-Type: application/json' \
  -d '{"node_address": "http://127.0.0.1:8000"}'
```


Bạn có thể chạy ứng dụng ( python run_app.py) và tạo transaction(đăng bài qua giao diện web) và khi bạn mined các transaction, tất cả các node trong mạng sẽ cập nhật chain. Và các node cũng có thể được kiểm tra bằng cách gọi bằng cURL hoặc Postman.

```shell
$ curl -X GET http://localhost:8001/chain
$ curl -X GET http://localhost:8002/chain
```

# Authenticate transactions
Bạn có thể đã nhận thấy một lỗ hổng trong ứng dụng là: Bất kỳ ai cũng có thể thay đổi name và post bất kỳ content nào. Ngoài ra post  dễ bị giả mạo trong khi gửi transaction lên mạng blockchain. Một cách để giải quyết điều này là tạo ra tài khoản người dùng, bằng mật mã khóa công khai . Mỗi người dùng mới cần một public key và private key để có thể đăng post trong ứng dụng:

- Mỗi transaction mới được gửi (đăng post) được ký bằng private key của người dùng. Chữ ký này được thêm vào dữ liệu transaction cùng với thông tin người dùng.
- Trong giai đoạn xác minh khi mining các giao dịch, chúng ta có thể xác minh xem chủ sở hữu được yêu cầu của bài đăng có giống với chủ sở hữu được chỉ định trong dữ liệu transaction hay không và thông báo không được sửa đổi nếu không đúng. Điều này có thể được thực hiện bằng cách sử dụng chữ ký và public key  của chủ sở hữu submit bài post.


# kết luận

Hướng dẫn này bao gồm các nguyên tắc cơ bản của một Public blockchain. Nếu bạn đã theo dõi đến đấy thì giờ bạn đã có thể triển khai một blockchain từ đầu và xây dựng một ứng dụng đơn giản, cho phép người dùng chia sẻ thông tin trên blockchain. Mong rằng bài viết sẽ đem lại cho các bạn những kiến thức bổ ích rất vui và hẹn gặp lại ở những bài viết tiếp theo.



-----


###### **Nguồn**: https://developer.ibm.com/tutorials/develop-a-blockchain-application-from-scratch-in-python/