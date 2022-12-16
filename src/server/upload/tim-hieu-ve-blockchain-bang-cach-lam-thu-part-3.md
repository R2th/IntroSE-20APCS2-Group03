### Bước 3: Tương tác với Blockchain của chúng ta

Ở phần trước, chúng ta đã có các API của Blockchain sẵn sàng rồi, giờ ta có thể đơn giản là gọi cURL hoặc dùng Postman để tương tác với các API đó.

Trước hết hẵn khởi động server của chúng ta lên trước đã:

```python
$ python blockchain.py
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Và giờ, ta hãy thử bắt đầu thực hiện việc "đào" bằng cách tạo một request GET gửi tới `http://localhost:5000/mine` :
![](https://images.viblo.asia/98ccc1e7-c578-4911-9f74-728c8ea23f1b.png)

Sau đó, ta hãy thực hiện một giao dịch mới bằng cách tạo một request POST gửi tới `http://localhost:5000/transactions/new` với phần body chứa cấu trúc giao dịch của chúng ta:
![](https://images.viblo.asia/517c3dbd-9042-4d24-b854-fcfe256c97b6.png)

Nếu không thích dùng Postman, bạn hoàn toàn có thể tạo một request cURL tương đương:

```
$ curl -X POST -H "Content-Type: application/json" -d '{
 "sender": "d4ee26eee15148ee92c6cd394edd974e",
 "recipient": "someone-other-address",
 "amount": 5
}' "http://localhost:5000/transactions/new"
```

Chúng ta hãy khởi động lại server, và "đào" thêm 2 coin nữa, lúc này tổng cộng ta có 3 coin. Hãy thử kiểm tra toàn bộ chuỗi blockchain của ta, bằng cách gọi đến `http://localhost:5000/chain`:

```
{
  "chain": [
    {
      "index": 1,
      "previous_hash": 1,
      "proof": 100,
      "timestamp": 1506280650.770839,
      "transactions": []
    },
    {
      "index": 2,
      "previous_hash": "c099bc...bfb7",
      "proof": 35293,
      "timestamp": 1506280664.717925,
      "transactions": [
        {
          "amount": 1,
          "recipient": "8bbcb347e0634905b0cac7955bae152b",
          "sender": "0"
        }
      ]
    },
    {
      "index": 3,
      "previous_hash": "eff91a...10f2",
      "proof": 35089,
      "timestamp": 1506280666.1086972,
      "transactions": [
        {
          "amount": 1,
          "recipient": "8bbcb347e0634905b0cac7955bae152b",
          "sender": "0"
        }
      ]
    }
  ],
  "length": 3
}
```

### Bước 4: Sự đồng thuận

Mọi việc tới đây đang khá suôn sẻ phải không. Chúng ta đã tạo ra được một Blockchain cơ bản cho phép chúng ta thực hiện giao dịch và tiến hành "đào" coin. Thế nhưng một đặc điểm mấu chốt của Blockchain là nó phải được `phân tán` (`decentralized`). Và nếu như nó được `phân tán`, thì làm sao để ta có thể đảm bảo rằng tất cả đều biểu thị cùng một chuỗi blockchain? Đây chính là vấn đề về `sự đồng thuận`, và chúng ta sẽ cần phải triển khai một `Giải Thuật Đồng Thuận` (Consensus Algorithm) nếu như ta muốn có nhiều hơn một node trong mạng blockchain của mình.

#### Đăng ký một node mới

Trước khi bắt tay vào triển khai `Giải Thuật Đồng Thuận`, chúng ta cần phải có cách để cho phép một node biết được các node lân cận với nó trong cả mạng. Mỗi node trong mạng blockchain của chúng ta sẽ cần phải lưu một bản đăng ký của các node khác trong mạng. Để làm được điều đó, trước tiên chúng ta sẽ cần phải có thêm vài endpoint mới:
* `/nodes/register` để chấp nhận danh sách các node mới dưới dạng các URL.
* `/nodes/resolve` để triển khai `Giải Thuật Đồng Thuận` của chúng ta, qua đó giải quyết các xung đột (conflict) - để đảm bảo rằng một node phản ánh đúng chuỗi của chúng ta.

Chúng ta sẽ cần phải sửa lại một chút hàm constructor của class Blockchain của chúng ta và cung cấp method dành cho việc đăng ký các node:

```
...
from urllib.parse import urlparse
...


class Blockchain(object):
    def __init__(self):
        ...
        self.nodes = set()
        ...

    def register_node(self, address):
        """
        Add a new node to the list of nodes

        :param address: <str> Address of node. Eg. 'http://192.168.0.5:5000'
        :return: None
        """

        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)
```

Ở đây, có một điểm cần nói thêm một chút. Chúng ta đã dùng hàm `set()` để lưu giữ danh sách các node. Đây là một cách đơn giản để đảm bảo rằng cho dù ta có add thêm một node vào bao nhiêu lần đi chăng nữa, nó cũng sẽ chỉ xuất hiện duy nhất một lần.

#### Triển khai Giải Thuật Đồng Thuận

Như đã nói ở trước, xung đột xảy ra là khi một node có chứa một chuỗi khác với chuỗi của node khác. Để giaỉ quyết xung đột này, ta sẽ đặt ra luật rằng `chuỗi hợp lệ dài nhất chính là chuỗi chuẩn`. Sử dụng giải thuật này, ta có thể đạt được sự đồng thuận giữa các node trong mạng.

```
...
import requests


class Blockchain(object)
    ...
    
    def valid_chain(self, chain):
        """
        Determine if a given blockchain is valid

        :param chain: <list> A blockchain
        :return: <bool> True if valid, False if not
        """

        last_block = chain[0]
        current_index = 1

        while current_index < len(chain):
            block = chain[current_index]
            print(f'{last_block}')
            print(f'{block}')
            print("\n-----------\n")
            # Check that the hash of the block is correct
            if block['previous_hash'] != self.hash(last_block):
                return False

            # Check that the Proof of Work is correct
            if not self.valid_proof(last_block['proof'], block['proof']):
                return False

            last_block = block
            current_index += 1

        return True

    def resolve_conflicts(self):
        """
        This is our Consensus Algorithm, it resolves conflicts
        by replacing our chain with the longest one in the network.

        :return: <bool> True if our chain was replaced, False if not
        """

        neighbours = self.nodes
        new_chain = None

        # We're only looking for chains longer than ours
        max_length = len(self.chain)

        # Grab and verify the chains from all the nodes in our network
        for node in neighbours:
            response = requests.get(f'http://{node}/chain')

            if response.status_code == 200:
                length = response.json()['length']
                chain = response.json()['chain']

                # Check if the length is longer and the chain is valid
                if length > max_length and self.valid_chain(chain):
                    max_length = length
                    new_chain = chain

        # Replace our chain if we discovered a new, valid chain longer than ours
        if new_chain:
            self.chain = new_chain
            return True

        return False
```

Phương thức đầu tiên `valid_chain()` chịu trách nhiệm kiểm tra xem một chuỗi có hợp lệ hay không bằng cách chạy vòng lặp qua từng block trong chuỗi và xác thực cả chuỗi hash và bằng chứng.

Phương thức `resolve_conflict()` thực hiện việc chạy vòng lặp qua tất cả các node lần cận, tải về chuỗi của các node đó và xác thực chúng bằng phương thức như trên. **Nếu như ta tìm thấy một chuỗi hợp lệ, và có độ dài lớn hơn chuỗi của ta, ta sẽ thay chuỗi của mình bằng chuỗi đó.**

Quay trở lại với Blockchain của chúng ta, ta hãy viết thêm 2 endpoint mới cho API của mình, một dùng cho việc add các node lân cận, và một một dùng cho việc giải quyết xung đột:

```
@app.route('/nodes/register', methods=['POST'])
def register_nodes():
    values = request.get_json()

    nodes = values.get('nodes')
    if nodes is None:
        return "Error: Please supply a valid list of nodes", 400

    for node in nodes:
        blockchain.register_node(node)

    response = {,
        'message': 'New nodes have been added',
        'total_nodes': list(blockchain.nodes),
    }
    return jsonify(response), 201


@app.route('/nodes/resolve', methods=['GET'])
def consensus():
    replaced = blockchain.resolve_conflicts()

    if replaced:
        response = {
            'message': 'Our chain was replaced',
            'new_chain': blockchain.chain
        }
    else:
        response = {
            'message': 'Our chain is authoritative',
            'chain': blockchain.chain
        }

    return jsonify(response), 200
```

Tới đây, ta có thể tést thử bằng cách bật thêm một máy khác và tạo ra một node mới tham gia vào mạng blockchain của chúng ta. Hay nếu như không có sẵn, thì bạn có thể chạy trên cùng một máy nhưng với port khác. Giả sử như chúng ta đã làm thế, và giờ đây ta có hai node tham gia vào mạng : `http://localhost:5000` và `http://localhost:5001`.

![](https://images.viblo.asia/57d68ae0-6ed7-4365-9a58-017465ff9028.png)

Và để làm cho chuỗi của node thứ 2 dài hơn, chúng ta hãy cho nó thực hiện việc đào thêm vài coin nữa. Sau đó, chúng ta hãy cho node một gọi một request GET tới `/nodes/resolve` . Vì chuỗi của node 2 hợp lệ và đang dài hơn, chuỗi của node 1 sẽ được thay thế.

![](https://images.viblo.asia/39eb7a1a-87e1-4e1c-9198-2eea2949c813.png)


Và như thế, ứng dụng Blockchain của chúng ta vậy là đã hoàn thành. Bạn có thể mời vài bạn bè của mình cùng tham gia, và test thử các tính năng của blockchain trên đây, xem có đúng như trong quảng cáo hay không.

Tác giả của bài viết có update, là dự định sẽ có phần 2, follow up để nói về  cơ chế xác thực giao dịch của Blockchain, cũng như vài cách mà bạn có thể áp dụng Blockchain vào các sản phẩm thực tế. Nhưng hiện tại thì phần 2 đó chưa có. Bạn có thể xem source bài viết tại đây:

[Learn Blockchains by Building One](https://hackernoon.com/learn-blockchains-by-building-one-117428612f46)