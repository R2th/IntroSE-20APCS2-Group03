<sup><sup><sup><sup><sup>i don't even care enough to rant anymore. Just get this over with, ffs</sup></sup></sup></sup></sup>


### Trước khi  bắt đầu

Yếu tố quan trọng nhất chúng ta cần ghi nhớ trong quá trình tìm hiểu về blockchain, đó là, đây là khái niệm nhằm chỉ một chuỗi *không thể bị biến đổi*, *có thứ tự*  những bản ghi được gọi là Blocks. Những Block này có thể chứa thông tin về giao dịch, hồ sơ, hay bất kỳ loại dữ liệu nào mà bạn muốn. Điều quan trọng ở đây là, chúng được *xâu chuỗi*  với nhau bằng các chuỗi *hash*.

Nếu bạn không thật sự hiểu chuỗi hash là gì thì có thể xem qua giải thích ngắn gọn [tại đây](https://learncryptography.com/hash-functions/what-are-hash-functions)

Quay trở lại với bài viết của chúng ta

##### Bài hướng dẫn này dành cho đối tượng nào? 
Bạn nên có chút kiến thức đủ để đọc hiểu và viết vài đoạn code Python cơ bản, vì ngôn ngữ được sử dụng trong bài sẽ là Python, đồng thời bạn cũng nên hiểu về cách thức hoạt động của HTTP request, vì chúng ta sẽ liên lạc tới Blockchain thông qua HTTP.

#####  Bạn sẽ cần có gì?
Bạn cần cài đặt [Python 3.6](https://www.python.org/downloads/) (và cả `pip` nữa). Bạn cũng sẽ cần phải cài đặt Flask và bộ thư viện Request:
```
 pip install Flask==0.12.2 requests==2.18.4 
 ```
 Về phần HTTP Client, bạn có thể sử dụng [Postman](https://www.getpostman.com/) hoặc cURL, hoặc bất kì công cụ nào bạn muốn, điều này không quan trọng.
 
 ##### Code tham khảo ở đâu?
 Bạn có thể tham khảo source code [tại đây](https://github.com/dvf/blockchain)
 
 Rồi, thế là xong phần giới thiệu, giờ ta đi vào chi tiết cụ thể
 
 
 ### Bước 1: Xây dựng một Blockchain
 
 Bạn có thể dùng bất kỳ IDE hoặc bộ text editor nào tùy ý, bản thân tác giả thì thích dùng [PyCharm](https://www.jetbrains.com/pycharm/). Tạo một file mới, đặt tên là `blockchain.py` đi. Trước khi bắt đầu, xin nhắc lại một lần nữa là bạn có thể tham khảo source code [tại đây](https://github.com/dvf/blockchain)
 
 #### Thể hiện một Blockchain
 
 Chúng ta sẽ tạo một class `Blockchain` mà trong constructor của nó khởi tạo một list rỗng ban đầu để lưu trữ blockchain của chúng ta, và một list khác để lưu trữ các giao dịch. Class của chúng ta đại loại sẽ như thế này
 ```python
 class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        
    def new_block(self):
        # Creates a new Block and adds it to the chain
        pass
    
    def new_transaction(self):
        # Adds a new transaction to the list of transactions
        pass
    
    @staticmethod
    def hash(block):
        # Hashes a Block
        pass

    @property
    def last_block(self):
        # Returns the last Block in the chain
        pass
 ```
 Class `Blockchain` của chúng ta sẽ chịu trách nhiệm quản lý cả chuỗi. Nó sẽ lưu trữ các giao dịch và có một vài helper method để add thêm block mới vào trong chuỗi. Giờ ta hãy bắt tay vào viết một vài method nào.
 
 #### Một Block trông sẽ như thế nào?
 Mỗi Block sẽ có một chỉ số *index*,  một dấu mốc *timestamp*, một *danh sách các giao dịch*, một *bằng chứng* (ta sẽ nói về khái niệm này sau), mà *chuỗi hash của Block trước nó*.
 Dưới đây là một ví dụ về Block, nó sẽ có dạng kiểu như thế này:
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
Đến chỗ này, hẳn bạn đã thấy ý tưởng về một *chuỗi* là như thế nào - mỗi một block sẽ chứa bên trong bản thân nó, chuỗi *hash* của Block trước nó. **Nên nhớ đặc điểm này là rất quan trọng vì nó mang lại tính chất không thể bị biến đổi cho các blockchain**: Nếu như có kẻ tấn công là hư hại một Block trong chuỗi thì **tất cả** các Block tiếp theo đều sẽ chứa mã hash không chính xác.

*Nếu chưa thật sự hiểu đoạn này, bạn hãy dành thời gian để suy nghĩ nó cho thật thông suốt đã - vì đây chính là tư tưởng chủ đạo đằng sau blockchain.*

#### Thêm giao dịch vào trong một Block
Chúng ta sẽ cần phải xây dựng một phương thức để thêm giao dịch vào trong một Block, hãy gọi nó là phương thức `new_transaction()`, nội dung của nó cũng khá là trực tiếp:

```
class Blockchain(object):
    ...
    
    def new_transaction(self, sender, recipient, amount):
        """
        Creates a new transaction to go into the next mined Block
        :param sender: <str> Address of the Sender
        :param recipient: <str> Address of the Recipient
        :param amount: <int> Amount
        :return: <int> The index of the Block that will hold this transaction
        """

        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })

        return self.last_block['index'] + 1
```
Cũng khá dễ hiểu thông phải không, sau khi hàm `new_transaction()` thêm một giao dịch vào trong danh sách, nó sẽ trả về số *index* của Block mà giao dịch sẽ được thêm vào - *chính là block sẽ được đào tiếp theo*. Thông tin này ssau này sẽ rất hữu ích, đối với user gửi giao dịch.

#### Tạo Block mới

Khi `Blockchain` của chúng ta được khởi tạo, chúng ta cần seed sẵn cho nó một Block khởi điểm - một Block mà trước nó không có gì hết. Chúng ta cũng cần phải thêm một "bằng chứng" - là kế quả của việc đào - vào trong Block khởi điểm của chúng ta (hay còn gọi là chứng cứ làm việc). Chúng ta sẽ bàn về việc đào sau.

Ngoài việc tạo Block khởi điểm, chúng ta cũng cần phải viết các phương thức `new_block()`, `new_transaction()` và `hash()` :
```
import hashlib
import json
from time import time


class Blockchain(object):
    def __init__(self):
        self.current_transactions = []
        self.chain = []

        # Create the genesis block
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain
        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }

        # Reset the current list of transactions
        self.current_transactions = []

        self.chain.append(block)
        return block

    def new_transaction(self, sender, recipient, amount):
        """
        Creates a new transaction to go into the next mined Block
        :param sender: <str> Address of the Sender
        :param recipient: <str> Address of the Recipient
        :param amount: <int> Amount
        :return: <int> The index of the Block that will hold this transaction
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })

        return self.last_block['index'] + 1

    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def hash(block):
        """
        Creates a SHA-256 hash of a Block
        :param block: <dict> Block
        :return: <str>
        """

        # We must make sure that the Dictionary is Ordered, or we'll have inconsistent hashes
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()
import hashlib
import json
from time import time


class Blockchain(object):
    def __init__(self):
        self.current_transactions = []
        self.chain = []

        # Create the genesis block
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain
        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash or self.hash(self.chain[-1]),
        }

        # Reset the current list of transactions
        self.current_transactions = []

        self.chain.append(block)
        return block

    def new_transaction(self, sender, recipient, amount):
        """
        Creates a new transaction to go into the next mined Block
        :param sender: <str> Address of the Sender
        :param recipient: <str> Address of the Recipient
        :param amount: <int> Amount
        :return: <int> The index of the Block that will hold this transaction
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        })

        return self.last_block['index'] + 1

    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def hash(block):
        """
        Creates a SHA-256 hash of a Block
        :param block: <dict> Block
        :return: <str>
        """

        # We must make sure that the Dictionary is Ordered, or we'll have inconsistent hashes
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()
```
Đoạn code trên đã có kèm comment và các đoạn *docstrings*, có lẽ các bạn có thể tự đọc hiểu. Tới đây chúng ta đã gần hoàn thành việc thể hiện blockchain của chúng ta rồi. Phần tiếp theo, chúng ta sẽ tìm hiểu xem các block mới của chúng ta được tạo ra, rèn hay đào như thế nào