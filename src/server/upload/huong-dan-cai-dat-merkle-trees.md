Liệu có cách nào để hiểu một vấn đề tốt hơn là thực hành ?
Trong bài viết này ta sẽ tiến hành cài đặt Merkle Tree với ngôn ngữu Python !

**Recommned** <br>
- *Nếu bạn chưa hiểu về Merkle Tree có thể xem lại bài viết trước:*
[Cách Merkle tree giải quyết các vấn đề trong một mạng phân tán](https://viblo.asia/p/cach-merkle-tree-giai-quyet-cac-van-de-trong-mot-mang-phan-tan-4dbZNMRvKYM)
- *Mã nguồn chương trình trong bài này các bạn có thể tìm ở*: https://github.com/duyhung2201/MerkleTrees/

## 1. Cài đặt cấu trúc cơ bản Merkle Tree

```
from hashlib import sha256

class MerkleNode:
    """
    Nếu là nút lá thì lưu mã hash, giá trị phần dữ liệu và nút cha.
    Nếu là nút cha thì lưu thêm 2 nút con
    """
    def __init__(self, hash, chunk=None):
        self.chunk = chunk
        self.hash = hash
        self.parent = None
        self.left_child = None
        self.right_child = None


class MerkleTree:
    """
    Lưu nút lá và tính root hash
    """
    def __init__(self, data_chunks):
        self.leaves = []

        for chunk in data_chunks:
            node = MerkleNode(self.compute_hash(chunk), chunk=chunk)
            self.leaves.append(node)

        self.root = self.build_merkle_tree(self.leaves)

    def build_merkle_tree(self, leaves):
        """
        Tạo Merkle trees từ các nút lá. 
        Nếu số lượng nút lá lẻ, nút cuối sẽ được nhân đôi để ghép cặp chính nó.
        """
        num_leaves = len(leaves)
        if num_leaves == 1:
            return leaves[0]

        parents = []

        i = 0
        while i < num_leaves:
            left_child = leaves[i]
            right_child = leaves[i + 1] if i + 1 < num_leaves else left_child

            parents.append(self.create_parent(left_child, right_child))

            i += 2

        return self.build_merkle_tree(parents)

    def create_parent(self, left_child, right_child):
        """
        Tạo nút cha từ 2 nút con.
        """
        parent = MerkleNode(
            self.compute_hash(left_child.hash + right_child.hash), left_child.chunk + right_child.chunk)
        left_child.parent, right_child.parent = parent, parent
        parent.left_child, parent.right_child = left_child, right_child
        
        print ("---------")
        print("Left child {}: {}, Right child {}: {}, Parent {}: {}".format(
            left_child.chunk, left_child.hash, right_child.chunk, right_child.hash, parent.chunk, parent.hash))
        return parent

    @staticmethod
    def compute_hash(data):
        data = data.encode('utf-8')
        return sha256(data).hexdigest()
```

Cấu trúc cây của ta là cây nhị phân. Trong trường hợp có 1 nút bị lẻ (không có nút anh em cùng nút cha) thì nó sẽ được nhân bản để tự ghép cặp với chính mình trong việc tìm ra mã hash của nút cha. Hàm `build_merkle_tree` là hàm đệ quy, sinh ra cây theo bottom-up, từ nút lá đến root. <br>

Hãy check xem ouput của ta thế nào: 
```
>>> file = "01234567" # some file
>>> chunks = list(file) # chia file thành các chunks
>>> chunks
['0', '1', '2', '3', '4', '5', '6', '7']
>>> merkle_tree = MerkleTree(chunks) # tạo merkle tree bottom-up
---------
Left child 0: 5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9, Right child 1: 6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b, Parent
 01: fa13bb36c022a6943f37c638126a2c88fc8d008eb5a9fe8fcde17026807feae4
---------
Left child 2: d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35, Right child 3: 4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce, Parent
 23: 70311d9d203b2d7e4ff70d7fce219f82a4fcf73a110dc80187dfefb7c6e4bb87
---------
Left child 4: 4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a, Right child 5: ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d, Parent
 45: 67d62ee831ff99506ce1cd9435351408c3a845fca2dc0f34d085cdb51a37ec40
---------
Left child 6: e7f6c011776e8db7cd330b54174fd76f7d0216b612387a5ffcfb81e6f0919683, Right child 7: 7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451, Parent
 67: ac6621607d32037664f03f92a4aae94d4c97f6bbcf438ff20509311681e6b259
---------
Left child 01: fa13bb36c022a6943f37c638126a2c88fc8d008eb5a9fe8fcde17026807feae4, Right child 23: 70311d9d203b2d7e4ff70d7fce219f82a4fcf73a110dc80187dfefb7c6e4bb87, Pare
nt 0123: 862532e6a3c9aafc2016810598ed0cc3025af5640db73224f586b6f1138385f4
---------
Left child 45: 67d62ee831ff99506ce1cd9435351408c3a845fca2dc0f34d085cdb51a37ec40, Right child 67: ac6621607d32037664f03f92a4aae94d4c97f6bbcf438ff20509311681e6b259, Pare
nt 4567: f4685cb09ef9f1c86b2d8f544d89f1c1d3592a3654beb8feecad11e9545e0e72
---------
Left child 0123: 862532e6a3c9aafc2016810598ed0cc3025af5640db73224f586b6f1138385f4, Right child 4567: f4685cb09ef9f1c86b2d8f544d89f1c1d3592a3654beb8feecad11e9545e0e72, 
Parent 01234567: e11a20bae8379fdc0ed560561ba33f30c877e0e95051aed5acebcb9806f6521f

>>> print(merkle_tree.root.hash) # In ra kết quả root hash
e11a20bae8379fdc0ed560561ba33f30c877e0e95051aed5acebcb9806f6521f
```

Có thể thấy thì cấu trúc cây của ta lúc này:<br>

![](https://images.viblo.asia/1da887a9-bc83-4cc5-9b48-9c08587e511b.png)

Vậy là ta đã có Merkle Tree, bây giờ làm thế nào sử dụng cây tìm ra Merkle Path nhỉ ?
## 2. Tìm Merkle Path
Merkle Path bao gồm những mã hash dùng để ghép cặp trong quá trình tính toán Merkle Root.<br> Ví dụ khi ta muốn xác thực nút "5", Merkle Path sẽ bao gồm mã hash của nút "4", nút "67", nút "0123" và nút "01234567".
Từ đó, ta có thể tự tính toán để tính ra root hash và so khớp với root hash ("01234567") đã được trả về xem liệu dữ liệu ở nút 5 có đáng tin cậy. <br>
=> **Câu hỏi đặt ra là tại sao server đã xác định được nút "5" có tồn tại rồi nhưng vẫn phải gửi về Merkle Path ?**<br>
**Trả lời**: Đó chính là vì MerklePath được coi như bằng chứng chứng minh Server là đáng tin. Như bài viết trước đã nói, việc làm giả bằng chứng, đồng nghĩa với việc tính toán lại các mã hash trong MerklePath để trùng khớp với root hash yêu cầu một khối lượng tính toán khổng lồ và đến nay vẫn được coi là không khả thi.<br>

### Tìm MerklePath
Ta viết thêm 1 hàm nhằm trả về MerklePath cho bất cứ dữ liệu nào cần xác thực. Hãy thêm đoạn code này vào dưới hàm `create_parent`:
```
def getMerklePath(self, chunk):
        """
        Kiểm tra xem nút có tồn tại và tìm Merkle path cho nó.
        """

        hash = self.compute_hash(chunk)

        for leaf in self.leaves:
            if leaf.hash == hash:
                print("leaf exist")
                return self.generateMerklePath(leaf)
        
        return False

    def generateMerklePath(self, node, path = []):
        """
        Sinh ra Merkle Path từ dưới lên trên.
        """

        if node == self.root:
            path.append(node.hash)
            return path

        isLeft = (node.parent.left_child == node)
        if isLeft:

            path.append((node.parent.right_child.hash, not isLeft))
            return self.generateMerklePath(node.parent, path)
        else:
            path.append((node.parent.left_child.hash, not isLeft))
            return self.generateMerklePath(node.parent, path)
```

- Việc đầu tiên cần làm là check xem dữ liệu cần xác thực có phải là 1 trong những nút lá của cây. 
- Nếu có, một khi nút lá được xác định, ta sẽ thêm nút anh em của nó vào MerklePath và đệ quy với nút cha bằng hàm `generateMerklePath`

Test xem Merkle Tree cho nút "2" thế nào:
```
>>> file = "01234567"
>>> chunks = list(file)
>>> merkle_tree = MerkleTree(chunks)
>>> print(merkle_tree.root.hash)
e11a20bae8379fdc0ed560561ba33f30c877e0e95051aed5acebcb9806f6521f
>>> chunk_hash = MerkleTree.compute_hash("2")
>>> chunk_hash
d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35
>>> merklePath = merkle_tree.getMerklePath(chunk_hash)
>>> merklePath
[('4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce', False), ('fa13bb36c022a6943f37c638126a2c88fc8d008eb5a9fe8fcde17026807feae4', True), ('f4685cb09ef9f1c86b2d8f544d89f1c1d3592a3654beb8feecad11e9545e0e72', False), 'e11a20bae8379fdc0ed560561ba33f30c877e0e95051aed5acebcb9806f6521f']
```

Theo thứ tự, MerklePath sẽ gồm 4 phần tử:
- Đầu tiên là mã hash của nút "3" và giá trị false biểu thị nó là nút con bên phải.
- Mã hash của nút "12" và true biểu thị nó là nút con bên trái.
- Mã hash của nút "4567" và gái trị false biểu thị nó là nút con bên phải
- Root Hash nhằm so khớp kết quả tính toán.

### Xác thực với Merkle Path
```
def verifyMerklePath(self, chunk, path):
        """
        Xác minh xem nút có tồn tại không bằng Merkle Path.
        """

        sumHash = self.compute_hash(chunk)
        
        for hashNode in path[:-1]:
            hash = hashNode[0]
            isLeft = hashNode[1]
            if isLeft:
                sumHash = self.compute_hash(hash + sumHash)
            else:
                sumHash = self.compute_hash(sumHash + hash)

        return sumHash == path[-1]
```

Hãy thử xác thực nút "2" ở bên trên:
```
>>> verifyMerklePath(chunk_hash, merklePath)
True
```
Có vẻ đúng như mong muốn. Thế còn với dữ liệu giả thì sao?
```
>>> tampered_chunk = "20" # gỉa dữ liệu từ 2 sang 20
>>> tampered_chunk_hash = MerkleTree.compute_hash(tampered_chunk)
>>> merklePath = merkle_tree.getMerklePath(tampered_chunk_hash) 
False
```
Do `tampered_chunk` không tồn tại trong Merkle Tree nên sẽ bị trả về `False`. <br>
Còn nếu giả sử server không đáng tin và trả về cho ta Merkle Path sai:

```
>>> some_chunk = "3"
>>> chunk_hash = MerkleTree.compute_hash(some_chunk)
>>> merklePath = merkle_tree.getMerklePath(chunk_hash)
>>> merklePath
[('d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35', True), ('fa13bb36c022a6943f37c638126a2c88fc8d008eb5a9fe8fcde17026807feae4', True), ('f4685cb09ef9f1c86b2d8f544d89f1c1d3592a3654beb8feecad11e9545e0e72', False), 'e11a20bae8379fdc0ed560561ba33f30c877e0e95051aed5acebcb9806f6521f']
>>> merklePath[0][0] = "0"*64 # giả sử server troll và gửi về Merkle Path giả
>>> tamperedMerklePath = merklePath
>>> tamperedMerklePath
[('0000000000000000000000000000000000000000000000000000000000000000', True), ('fa13bb36c022a6943f37c638126a2c88fc8d008eb5a9fe8fcde17026807feae4', True), ('f4685cb09ef9f1c86b2d8f544d89f1c1d3592a3654beb8feecad11e9545e0e72', False), 'e11a20bae8379fdc0ed560561ba33f30c877e0e95051aed5acebcb9806f6521f']
>>> verifyMerklePath(chunk_hash, tamperedMerklePath)
False
```

Trong trường hợp này, MerklePath sai và hệ thống trả về `False`, thể hiện là server không đáng tin. Ta nên report và xác mình ở server khác.


## 3. Merkle Tree được sử dụng thế nào ?
Ta đã đi từ khái quát đến cài đặt Merkle Tree. Nhìn chung, mô hình cơ bản của Merkle Tree là như vậy, nhưng với mỗi use case sẽ có một chút biến đổi. Điểm chung của chúng đều dùng Merkle Tree nhằm:  
- Xác thực dữ liệu.
- Xác thực tính nhất quán.
- Đồng bộ dữ liệu.

Một số use case phổ biến trong thực tế: <br>
### Tiền kỹ thuật số
Một số loại tiền (như Bitcoin, Ethereum) sử dụng lưu trữ các giao dịch trong Merkle Trees nhằm xác thực tính nhất quán, đảm bảo version mới đã bao gồm các giao dịch từ version cũ.

### Hệ quản lý version
Hệ thống như Git và Mercurial dùng Merkle tree để quản lý phiên bản các file và thư mục. Nó đơn giản hoá bằng cách so sánh mã hash của các file và thư mục giữa 2 commit để xác định những thay đổi ở đâu. 

### Cấp chứng chỉ 
Merkle Tree được sử dụng trong nhật ký chứng chỉ. Bạn có thể tìm hiểu thêm ở [đây](https://www.certificate-transparency.org/log-proofs-work)

### Cơ sở dữ liệu
Một vài cơ sở dữ liệu phân tán phi quan hệ như Apache Cassandra hay Amazon DynamoDB dùng Merkle Trees nhằm xác định những sự không nhất quán trong những bản sao dữ liệu. Từ đó update các bản sao với version mới. Quá trình này được mô tả trong tài liệu của [Cassandra](https://docs.datastax.com/en/archived/cassandra/3.0/cassandra/operations/opsRepairNodesManualRepair.html)

## Kết luận
Trong bài viết này, ta đã tìm hiểu xem cách thức Merkle Tree hoạt động thông qua việc cài đặt và một vài Usecase trong thực tế.

## Tài liệu tham khảo
- https://www.codementor.io/blog/merkle-trees-5h9arzd3n8
- https://www.codeproject.com/Articles/1176140/Understanding-Merkle-Trees-Why-use-them-who-uses-t
- Mastering Bitcoin: Unlocking Digital Cryptocurrencies - Andreas Antonopoulos