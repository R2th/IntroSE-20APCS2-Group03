Cuộc cách mạng công nghiệp 4.0 ra đời kéo theo nhiều sự thay đổi và xu hướng mới được hình thành. Riêng đối với lĩnh vực CNTT cũng không nằm ngoài vùng ảnh hưởng mạnh mẽ. Chính làn sóng 4.0 đã mang chúng ta đến với những khái niệm, thuật ngữ và công nghệ vốn từng rất xa lạ trở nên quen tai và gần gũi biết bao nhiêu.

Blockchain - có lẽ không còn lạ lẫm gì nữa, thứ vốn được thiết kế để chống lại việc thay đổi của dữ liệu. Nghĩa là khi một khối thông tin được ghi vào hệ thống Blockchain thì không có cách nào thay đổi được. Chỉ có thể bổ sung thêm khi đạt được sự đồng thuận của tất cả "mọi người". *(Phần lý thuyết cụ thể các bạn tìm hiểu thêm nha).*

Vốn biết một số ngôn ngữ đã chuyển mình và chiếm vị thế đáng kể trên bản đồ các ngôn ngữ phổ biến. Tuy nhiên, trong phạm vi bài viết này, mình thử dùng Java để thiết kế một blockchain đơn giản và hash dữ liệu của block xem như thế nào.

Nhưng trước hết, chúng ta hãy nhắc lại một vài lý thuyết cơ bản về Blockchain:
* Genesis block - Block (khối) đầu tiên trong blockchain, tức là khối luôn được hard-code vào trong các ứng dụng blockchain.
* Mỗi khối đều chứa thông tin về thời gian khởi tạo và được liên kết với khối trước đó, kèm theo đó là một mã thời gian và dữ liệu giao dịch
* Hash (Hàm băm) là một hàm toán học nhằm chuyển dữ liệu thành dãy số có độ dài cố định. Các hàm băm khác nhau sẽ sử dụng các thuật toán khác nhau để tạo ra các giá trị băm nhưng kết quả sẽ như nhau nếu cùng dữ liệu đầu vào. Nhưng với bất kỳ thay đổi nhỏ nào ở đầu vào (input), giá trị băm được tạo ra sẽ hoàn toàn khác so với giá trị trước đó.

Nào, bây giờ hãy bắt tay vào code vài dòng xem Blockchain với Java sẽ như thế nào nhé!

Chúng ta sẽ tạo một class Block. Mỗi Block sẽ có:
* Danh sách các giao dịch (int)
* Hash khối trước đó (String [])
* Hash (int)

Class Block có nội dung như sau:
```
package bthanhtung.blockchain.demo;

import java.util.Arrays;

public class Block {
	private int previousHash;
	private String[] transactions;

	private int blockHash;

	public Block(int previousHash, String[] transactions) {
		this.previousHash = previousHash;
		this.transactions = transactions;
		Object[] contents = { Arrays.hashCode(transactions), previousHash };
		this.blockHash = Arrays.hashCode(contents);
	}

	public int getPreviousHash() {
		return previousHash;
	}

	public String[] getTransactions() {
		return transactions;
	}

	public int getBlockHash() {
		return blockHash;
	}

	public void setPreviousHash(int previousHash) {
		this.previousHash = previousHash;
	}

	public void setTransactions(String[] transactions) {
		this.transactions = transactions;
	}

	public void setBlockHash(int blockHash) {
		this.blockHash = blockHash;
	}
}
```
Việc quan trọng nhất - tạo một Blockchain, ta bắt đầu bằng cách tạo Khối Genesis. Vì khối Genesis là khối đầu tiên trong chuỗi, chúng ta sẽ hard-code các giao dịch và giá trị băm trước đó. 
Các giao dịch trong một blockchain thực tế chắc chắn sẽ sử dụng các lớp giao dịch và các cấu trúc dữ liệu khác nhau. Để đơn giản, chúng ta nên viết chúng dưới dạng chuỗi.

Nội dung class Blockchain như sau:
```
package bthanhtung.blockchain.demo;

import java.util.ArrayList;

public class Blockchain {
	ArrayList<Block> blockchain = new ArrayList<>();

	public static void main(String[] args) {
		String[] genesisTransactions = {"CR7 sent M10 1368 Bitcoins", "M10 sent 10 Bitcoins to KingEric" };
		Block genesisBlock = new Block(0, genesisTransactions);
		System.out.println("Genesis-Block hash: " + genesisBlock.getBlockHash());
		
		String[] block2Transactions = { "KingEric sent 10 bitcoins to CR7", "CR7 sent 10 bitcoins to RoyKeane" };
		Block block2 = new Block(genesisBlock.getBlockHash(), block2Transactions);
		System.out.println("Block-2 hash: " + block2.getBlockHash());
		
		String[] block3Transactions = { "RoyKeane sent 999 bitcoins to R10" };
		Block block3 = new Block(block2.getBlockHash(), block3Transactions);
		System.out.println("Block-3 hash: " + block3.getBlockHash());
	}
}
```
Check code không có lỗi thì ta cứ Chạy thử, kết quả như sau:
```
Genesis-Block hash: 1227693096
Block-2 hash: 1742338478
Block-3 hash: 803309770
```
Nếu dữ liệu một block có thay đổi thì sao.? Thử sửa CR7 thành RONALDO của biến ***genesisTransactions***. Chà, kết quả hoàn toàn thay đổi đấy chứ:
```
Genesis-Block hash: -1884893303
Block-2 hash: -1370247921
Block-3 hash: 1985690667
```
Đó là cách một blockchain được hình thành, mỗi hàm hash của khối mới sẽ trỏ đến hàm hash của khối trước đó. Hệ thống hash này đảm bảo rằng không có giao dịch nào có thể bị giả mạo vì nếu bất kỳ thành phần nào của giao dịch thay đổi, thì hash của khối cũng như kết quả của bất kỳ hash nào cũng thay đổi.

Nguồn tham khảo:
[hackernoon.com/building-your-own-blockchain-in-java](https://hackernoon.com/building-your-own-blockchain-in-java-a-how-to-guide-y4313yku)