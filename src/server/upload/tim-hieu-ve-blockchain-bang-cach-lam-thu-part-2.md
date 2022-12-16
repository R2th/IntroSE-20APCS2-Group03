Trong bài [viết lần trước](https://viblo.asia/p/tim-hieu-ve-blockchain-bang-cach-lam-thu-part-1-YWOZr07Y5Q0), chúng ta đã cùng tìm hiểu đến đoạn làm thế nào để tạo ra một Block mới và cách biểu diễn Block  trong blockchain của chúng ta. Có lẽ tiếp theo, chúng ta sẽ băn khoăn xem, liệu chúng ta có thể đào (mine) và tạo ra Bock mới như thế nào, nhưng trước hết, chúng ta phải hiểu về Proof-of-Work (`PoW` - tạm dịch nôm na là `bằng chứng công việc`).

#### Tìm hiểu về Proof of Work

Thuật toán Proof of Work (`PoW`) là cách mà Blocks mới được tạo ra hay "đào" trong chuỗi blockchain. Mục đích của `PoW ` là tìm ra đáp án cho một bài toán. Đáp án này phải *khó có thể giải ra nhưng rất dễ dàng chứng thực* bởi bất kỳ ai trong mạng blockchain. Đây chính là ý tưởng cốt lõi của `PoW`.

Hãy cùng xem 1 ví dụ đơn giản để hiểu về khái niệm này.

Hãy giả sử như, chúng ta đã quy định rằng mã *hash* của một số nguyên *x* nhân với một số nguyên *y* phải có chữ số cuối bằng *0*. Hay nói một cách khác thì `hash(x * y) = ac23dc...0` Và trong ví dụ đơn giản này của chúng ta, hãy giả sử như x là một số biết trước (`x = 5`). Thử thực thi bài toán này bằng Python:

```python
from hashlib import sha256
x = 5
y = 0  # We don't know what y should be yet...
while sha256(f'{x*y}'.encode()).hexdigest()[-1] != "0":
    y += 1
print(f'The solution is y = {y}')
```
Kết quả của chúng ta ở đây thu được là `y = 21`. Có thể dễ dàng kiểm tra thấy : 
```
hash(5 * 21) = 1253e9373e...5e3600155e860
```
là một chuỗi *hash* có chữ số cuối là *0*.

Với Bitcoin, thuật toán `Proof-of-Work` được dùng là [Hashcash](https://en.wikipedia.org/wiki/Hashcash). Về bản chất nó cũng không khác nhiều lắm so với ví dụ đơn giản của chúng ta ở trên. Nó sẽ là một bài toán mà các "miner" của chúng ta phải đua nhau tìm lời giải, độ khó của bài toán tùy thuộc vào số lượng ký tự phải tìm kiếm trong chuỗi. Khi các miner tìm ra lời giải, họ sẽ được thưởng một coin, thông qua transaction. Hệ thống có thể *dễ dàng* chứng thực được lời giải họ đưa ra là đúng.

#### Implement thuật toán Proof of Work đơn giản

Bây giờ, chúng ta hãy thử triển khai thực hiện việc áp dụng một dạng Proof of Work đơn giản cho hệ thống blockchain của chúng ta. Bài toán mà chúng ta đặt ra sẽ tương tự như ví dụ ở trên

> Tìm số *p* sao cho khi đem nó hash cùng với đáp án của Block liền trước sẽ được một chuỗi *hash* bắt đầu bằng 4 ký tự *0*

```python
import hashlib
import json

from time import time
from uuid import uuid4


class Blockchain(object):
    ...
        
    def proof_of_work(self, last_proof):
        """
        Simple Proof of Work Algorithm:
         - Find a number p' such that hash(pp') contains leading 4 zeroes, where p is the previous p'
         - p is the previous proof, and p' is the new proof
        :param last_proof: <int>
        :return: <int>
        """

        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1

        return proof

    @staticmethod
    def valid_proof(last_proof, proof):
        """
        Validates the Proof: Does hash(last_proof, proof) contain 4 leading zeroes?
        :param last_proof: <int> Previous Proof
        :param proof: <int> Current Proof
        :return: <bool> True if correct, False if not.
        """

        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
         return guess_hash[:4] == "0000"
```
Để điều chỉnh độ khó của bài toán, ta có thể điều chỉnh số lượng ký tự cần so sánh ( ở đây đang là 4 ký tự ). Bạn sẽ thấy, chỉ cần thêm hay bớt 1 ký tự, độ khó của chúng ta sẽ thay đổi cực kỳ nhiều.

Đến đây thì class Blockchain của chúng ta đã gần như hoàn thiện, và chúng ta đã có thể tiến hành việc tương tác với nó qua HTTP request.

### Bước 2: Blockchain dưới dạng API

Để làm mọi chuyện đơn giản hơn, ở đây chúng ta sẽ sử dụng Python Flask Framework - một micro-framework của python cho phép chúng ta mapping endpoint tới các hàm Python một cách dễ dàng và nhanh chóng.

Chúng ta sẽ viết 3 phương thức :
 - `/transactions/new` dùng để tạo một *transaction* mới đến một Block
 - `/mine` dùng để báo cho server của chúng ta bất đầu tiến hành "đào" một Block
 - `/chain` dùng để  trả về toàn bộ Blockchain.

#### Cài đặt Flask

"Server" của chúng ta sẽ tạo thành một "nốt" trong mạng lưới blockchain. Trước tiên là hãy tạo một bộ khung cho nó đã:

```
import hashlib
import json
from textwrap import dedent
from time import time
from uuid import uuid4

from flask import Flask


class Blockchain(object):
    ...


# Instantiate our Node
app = Flask(__name__)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()


@app.route('/mine', methods=['GET'])
def mine():
    return "We'll mine a new Block"
  
@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    return "We'll add a new transaction"

@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```
Giải thích sơ qua một chút về đoạn code trên của chúng ta:
- **Line 15:** Khởi tạo node của chúng ta. Bạn có thể đọc thêm về Flask tại [đây](http://flask.pocoo.org/docs/0.12/quickstart/#a-minimal-application)
- **Line 18:** Đặt một tên ngẫu nhiên cho node của chúng ta.
- **Line 21:** Khởi tạo class `Blockchain`.
- **Line 24-26:** Tạo endpoint `/mine` là một `GET` request.
- **Line 28-30:** Tạo endpoint `/transactions/new` là một `POST` request, vì chúng ta sẽ gửi dữ liệu qua đây.
- **Line 32-38:** Tạo endpoint `/chain`, endpoint này sẽ trả về toàn bộ Blockchain.
- **Line 40-41:** Chạy server của chúng ta trên cổng `5000`.

#### Endpoint Transaction

Một request transaction sẽ có dạng như thế này. Đây chính là những gì user sẽ gửi lên server của chúng ta
```
{
 "sender": "my address",
 "recipient": "someone else's address",
 "amount": 5
}
```
Vì ở đây, chúng ta đã có phương thức phục vụ cho việc thêm một transaction vào một block rồi, nên mọi việc khá đơn giản.
```python
import hashlib
import json
from textwrap import dedent
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request

...

@app.route('/transactions/new', methods=['POST'])
def new_transaction():
    values = request.get_json()

    # Check that the required fields are in the POST'ed data
    required = ['sender', 'recipient', 'amount']
    if not all(k in values for k in required):
        return 'Missing values', 400

    # Create a new Transaction
    index = blockchain.new_transaction(values['sender'], values['recipient'], values['amount'])

    response = {'message': f'Transaction will be added to Block {index}'}
    return jsonify(response), 201
```
#### Endpoint Mining

Logic của chúng ta sẽ được xử lý nhiều ở trong endpoint này, và thật ra nó cũng khá đơn giản. Ở đây, chúng ta sẽ phải làm ba việc :
 - Tính toán `Proof-of-Work`
 - Thưởng cho người tìm ra  bằng cách tạo một transaction thêm vào 1 coin
 - Tạo ra một Block mới bằng cách thêm nó vào chain.

```python
import hashlib
import json

from time import time
from uuid import uuid4

from flask import Flask, jsonify, request

...

@app.route('/mine', methods=['GET'])
def mine():
    # We run the proof of work algorithm to get the next proof...
    last_block = blockchain.last_block
    last_proof = last_block['proof']
    proof = blockchain.proof_of_work(last_proof)

    # We must receive a reward for finding the proof.
    # The sender is "0" to signify that this node has mined a new coin.
    blockchain.new_transaction(
        sender="0",
        recipient=node_identifier,
        amount=1,
    )

    # Forge the new Block by adding it to the chain
    previous_hash = blockchain.hash(last_block)
    block = blockchain.new_block(proof, previous_hash)

    response = {
        'message': "New Block Forged",
        'index': block['index'],
        'transactions': block['transactions'],
        'proof': block['proof'],
        'previous_hash': block['previous_hash'],
    }
    return jsonify(response), 200
```

Hãy chú ý rằng người nhận block mới được đào là địa chỉ node của chúng ta. Và phần lớn những gì chúng ta thực hiện ở đây chỉ là tương tác với những phương thức trong class `Blockchain` của chúng ta. Đến đây coi như là xong, chúng ta đã bắt đầu có thể tương tác với blockchain của mình.

#### TO BE CONTINUE ...