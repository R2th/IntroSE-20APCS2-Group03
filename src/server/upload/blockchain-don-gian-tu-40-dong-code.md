Quay trở lại hơn 20 năm trước, sự xuất hiện của internet được xem là một cuộc cách mạng trên thế giới. Internet giúp chúng ta có thể cập nhật thông tin vào bất cứ thời điểm nào ở bất cứ đâu trên thế giới, làm thay đổi toàn bộ cục diện cho cả thế giới nói chung và ngành báo chí, truyền thông nói riêng. Và ở thời điểm hiện tại, có một cuộc cách mạng mới được ví như internet của hơn 20 năm trước, các chuyên gia và nhà phân tích đề cập đến ngành tài chính ngân hàng - **công nghệ blockchain.**

Sau 20 năm, điều gì đã khiến cho thế giới phải nhìn lại một lần nữa như là một cách mạng mới?

**Blockchain** - Theo tìm kiếm của Google, "Blockchain: a digital ledger in which transactions made in bitcoin or another cryptocurrency are recorded chronologically and publicly". Có thể tạm hiểu đó là một sổ cái kỹ thuật số, trong đó các giao dịch được giám sát một cách chặt chẽ.

Trong bài viết này như tiêu đề của nó, chúng ta sẽ không đi tìm hiểu về Blockchain là gì? Và nếu bạn đang đọc bài viết này lần đầu nghe về Blockchain hay còn khá mơ hồ về nó hãy bớt chút thời gian "ctrl + N" mở tab mới và tìm hiểu thêm đã nhé! Chúng ta sẽ tạo một [Blockchain đơn giản với ít hơn 50 dòng code Python](https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-40-lines-of-code-RQqKLzm4l7z).
## 1. Blockchain cơ bản nhất
Chúng ta sẽ bắt đầu bằng cách xác định những block sẽ trông như thế nào. Trong blockchain, mỗi block sẽ được tổ chức và quản lý theo một mốc thời gian và mã số index. Trong ứng dụng nhỏ này, chúng ta sẽ lưu trữ cả hai, và để đảm bảo tính toàn vẹn trong suốt quá trình hoạt động, mỗi block sẽ có một mã hash nhận dạng tương ứng. Cũng giống như bitcoin, mã hash của block sẽ là một mã bảo mật cho mã index của chính block đó và cũng là mốc thời gian, dữ liệu và mã hash của block trước đó. Tùy ứng dụng sẽ có những dữ liệu cần lưu trữ khác nhau.

```python
import hashlib as hasher

class Block:
  def __init__(self, index, timestamp, data, previous_hash):
    self.index = index
    self.timestamp = timestamp
    self.data = data
    self.previous_hash = previous_hash
    self.hash = self.hash_block()

  def hash_block(self):
    sha = hasher.sha256()
    sha.update(str(self.index) +
      str(self.timestamp) +
      str(self.data) +
      str(self.previous_hash))
    return sha.hexdigest()
```

Chúng ta vừa định nghĩa xong một block, để hoàn thành Blockchain, ta cần phải thêm các block vào chuỗi thực tế. Mỗi khối sẽ yêu cầu xác thực thông tin từ phần trước. Tuy nhiên để có thể hoạt động như vậy, chúng ta cần tạo block đầu tiên làm block gốc. Block đầu tiên chúng ta cần phải tạo thủ công. Chúng ta viết một hàm khởi tạo một block gốc. Để đơn giản, block này có chỉ số index là 0 và nó có dữ liệu tùy ý.

```python
def create_genesis_block():
    return Block(0, date.datetime.now(), "Genesis Block", "0")
```

Tiếp theo, chúng ta viết hàm định nghĩa các block tiếp theo
## 2. Thêm các Block vào Blockchain
Bây giờ chúng ta cần một hàm để tạo các block mới. Chức năng này sẽ lấy các  block trước đó trong chuỗi như là một tham số truyền vào để tạo ra block mới. Khi các block mới được tạo ra với tham số truyền vào từ block trước đó, tính toàn vẹn của blockchain tăng lên. Nếu chúng ta không làm điều này, sẽ dễ dàng thay đổi các block cũ và thay thế chuỗi bằng một cái mới hoàn toàn.

```python
def next_block(last_block):
    this_index = last_block.index + 1
    this_timestamp = date.datetime.now()
    this_data = "Hello world! I'm block" + str(this_index)
    this_hash = last_block.hash
    return Block(this_index, this_timestamp, this_data, this_hash)
```

Phần lớn công việc đã xong, giờ chúng ta hoàn thành chương trình và run để tạo block.
## 3.  Hoàn thành chương trình
[Blockchain của chúng ta](https://viblo.asia/p/xay-dung-mot-blockchain-don-gian-40-lines-of-code-RQqKLzm4l7z) sẽ bắt đầu bằng block genesis đã được định nghĩa ở trên, chúng ta sẽ thêm 20 khối bằng vòng lặp for:

```python
blockchain = [create_genesis_block()]
previous_block = blockchain[0]

num_of_blocks_to_add = 20

for i in range(0, num_of_blocks_to_add):
  block_to_add = next_block(previous_block)
  blockchain.append(block_to_add)
  previous_block = block_to_add

  print "Block #{} da duoc them vao blockchain".format(block_to_add.index)
print "Hash: {}\n".format(block_to_add.hash)

```

Kết quả chương trình: 
![](https://images.viblo.asia/c5623681-0bb7-40e2-a12a-78479a23e418.png)

Source code đầy đủ:  Link [Github](https://github.com/ducanhtran/Blockchain_python)

Tham khảo:  [Techinasia](https://www.techinasia.com/talk/blockchain-50-lines-code)  (Gerald Nash)