# I. Lời giới thiệu
* Mục tiêu của seri này là giúp cho các bạn hiểu và tiếp cận công nghê Blockchain bằng ngôn ngữ Java. Trong phần 1, chúng ta sẽ đi tìm hiểu cách tạo ra blockchain đơn giản. 
* Nội dung của bài viết được tham khảo tại [đây](https://medium.com/programmers-blockchain/create-simple-blockchain-java-tutorial-from-scratch-6eeed3cb03fa)
# II. Nội dung chính
### 1. Tạo ra Blockchain
* Blockchain có thể hiểu đơn giản chỉ là một chuỗi / danh sách các khối. Mỗi khối trong blockchain sẽ có chữ ký số riêng, chứa chữ ký số của khối trước đó và một vài dữ liệu kèm theo (dữ liệu này có thể là các giao dịch...)
![](https://images.viblo.asia/217d19f1-5878-4429-bfa7-d84f6835d234.png)
* Trong hình trên, hash chính là chữ ký số.
* Mỗi khối không chỉ chứa hash của khối trước nó mà nó còn chứa một phần hash của chính nó, giá trị này được tính toán dựa theo hash của khối trước đó. Nếu dữ liệu của khối trước đó bị thay đổi và kéo theo sự thay đổi của hash thì tất cả các giá trị hash của các khối sau này cũng sẽ thay đổi. Tính toán và so sánh các giá trị hash cho phép chúng ta biết một khối có hợp lệ hay không. Thay đổi bất kỳ dữ liệu nào trong danh sách sẽ làm thay đổi chữ ký và phá vỡ chuỗi.
### 2. Tạo ra Block class
```
import java.util.Date;
	

	public class Block {
	

		public String hash;
		public String previousHash;
		private String data; //our data will be a simple message.
		private long timeStamp; //as number of milliseconds since 1/1/1970.
	

		//Block Constructor.
		public Block(String data,String previousHash ) {
			this.data = data;
			this.previousHash = previousHash;
			this.timeStamp = new Date().getTime();
		}
	}
```
* Biến hash chứa chữ ký số, biến previousHash chứa hash của khối trước và biến data chứa dữ liệu của khối.
### 3. Tạo ra chữ ký số
* Có nhiều giải thuật để tạo ra chữ ký số và chúng ta sẽ chọn SHA256 làm ví dụ. Hàm tạo chữ ký số như sau:
```
import java.security.MessageDigest;

public class StringUtil {
	//Applies Sha256 to a string and returns the result. 
	public static String applySha256(String input){		
		try {
			MessageDigest digest = MessageDigest.getInstance("SHA-256");	        
			//Applies sha256 to our input, 
			byte[] hash = digest.digest(input.getBytes("UTF-8"));	        
			StringBuffer hexString = new StringBuffer(); // This will contain hash as hexidecimal
			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);
				if(hex.length() == 1) hexString.append('0');
				hexString.append(hex);
			}
			return hexString.toString();
		}
		catch(Exception e) {
			throw new RuntimeException(e);
		}
	}	
}
```
* Hàm này sẽ lấy chuỗi đầu vào và sử dụng thuật toán SHA256 để tạo ra chữ ký dạng string. Chúng ta sẽ tạo ra một phương thức trong Block class để tính hash và hash cần phải được tính toán từ tất cả các thành phần mà chúng ta không muốn bị can thiệp của khối. Các giá trị sẽ được lựa chọn lần lượt là *previousHash*, *data* và *timestamp*.
```
public String calculateHash() {
	String calculatedhash = StringUtil.applySha256( 
			previousHash +
			Long.toString(timeStamp) +
			data 
			);
	return calculatedhash;
}
public Block(String data,String previousHash ) {
		this.data = data;
		this.previousHash = previousHash;
		this.timeStamp = new Date().getTime();
		this.hash = calculateHash(); //Making sure we do this after we set the other values.
	}
```
### 4. Kiểm tra
* Khối đầu tiên được gọi là khối nguyên thủy, và bởi vì không có khối nào trước nó nên chúng ta sẽ thêm “0” thay cho giá trị *previousHash*.
```
public class NoobChain {
	

		public static void main(String[] args) {
			
			Block genesisBlock = new Block("Hi im the first block", "0");
			System.out.println("Hash for block 1 : " + genesisBlock.hash);
			
			Block secondBlock = new Block("Yo im the second block",genesisBlock.hash);
			System.out.println("Hash for block 2 : " + secondBlock.hash);
			
			Block thirdBlock = new Block("Hey im the third block",secondBlock.hash);
			System.out.println("Hash for block 3 : " + thirdBlock.hash);
			
		}
	}
```
* Kết quả đầu ra sẽ như sau:

![](https://images.viblo.asia/99c5c4ba-5451-4ed9-88d7-cb5219ecf52f.png)
* Bây giờ mỗi khối đều có chữ ký số riêng dựa trên thông tin của nó và chữ ký của khối trước nó. Chúng ta sẽ lưu các khối trong một ArrayList và dùng Gson để chuyển qua dạng json.
```
import java.util.ArrayList;
	import com.google.gson.GsonBuilder;
	

	public class NoobChain {
		
		public static ArrayList<Block> blockchain = new ArrayList<Block>(); 
	

		public static void main(String[] args) {	
			//add our blocks to the blockchain ArrayList:
			blockchain.add(new Block("Hi im the first block", "0"));		
			blockchain.add(new Block("Yo im the second block",blockchain.get(blockchain.size()-1).hash)); 
			blockchain.add(new Block("Hey im the third block",blockchain.get(blockchain.size()-1).hash));
			
			String blockchainJson = new GsonBuilder().setPrettyPrinting().create().toJson(blockchain);		
			System.out.println(blockchainJson);
		}
	

	}
```
### 5. Cách kiểm tra sự toàn vẹn của blockchain được tạo
* Chúng ta sẽ tạo ra phương thức *isChainValid()* để so sánh giá trị hash của tất cả các khối trong chuỗi. Phương thức này sẽ kiểm tra biến hash với giá trị hash đã được tính toán và giá trị hash của khối trước đó với biến *previousHash*.
```
public static Boolean isChainValid() {
		Block currentBlock; 
		Block previousBlock;
		
		//loop through blockchain to check hashes:
		for(int i=1; i < blockchain.size(); i++) {
			currentBlock = blockchain.get(i);
			previousBlock = blockchain.get(i-1);
			//compare registered hash and calculated hash:
			if(!currentBlock.hash.equals(currentBlock.calculateHash()) ){
				System.out.println("Current Hashes not equal");			
				return false;
			}
			//compare previous hash and registered previous hash
			if(!previousBlock.hash.equals(currentBlock.previousHash) ) {
				System.out.println("Previous Hashes not equal");
				return false;
			}
		}
		return true;
	}
```
* Bất cứ sự thay đổi nào trong các khối của blockchain đều dẫn đến kết quả *false*.
# III. Kết luận
* Hy vọng với bài viết này, các bạn sẽ có thêm những hiểu biết nhất định về công nghệ Blockchain và có thể tiếp cận nó một cách dễ dàng hơn.
* Hẹn gặp lại các bạn vào bài viết tiếp theo!